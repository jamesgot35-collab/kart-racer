#!/usr/bin/env python3
"""Original generative score: 5 pieces (menu + 4 tracks) x 6 synchronised stems. Writes lossless 48k/24-bit FLAC (HQ) and AAC (standard)."""
import sys, os, json, subprocess, time
import numpy as np, soundfile as sf
from synthlib import *
import synthlib as S

MODES = {"ionian": [0, 2, 4, 5, 7, 9, 11], "aeolian": [0, 2, 3, 5, 7, 8, 10], "dorian": [0, 2, 3, 5, 7, 9, 10]}
IV = {"r": 0, "3": 2, "5": 4, "7": 6, "o": 7, "lo": -7, "9": 8, "2": 1, "4": 3, "6": 5}
SECTIONS = ["A", "A", "B", "B", "A", "A", "C", "B"]

class Song:
    def __init__(s, cfg, bars=64):
        s.cfg = cfg; s.bars = bars; s.bpm = cfg["bpm"]; s.beat = 60 / s.bpm; s.stepT = s.beat / 4; s.barT = s.beat * 4
        s.N = int(round(bars * s.barT * SR)); s.tail = int(3.0 * SR)
        s.mode = MODES[cfg["mode"]]; s.root = cfg["root"]; s.rng = np.random.default_rng(cfg["seed"])
        s.swing = cfg.get("swing", 0.0)
    def newbuf(s): return np.zeros((2, s.N + s.tail))
    def fold(s, b):
        t = b[:, s.N:]; o = b[:, :s.N].copy(); o[:, :t.shape[1]] += t; return o
    def deg(s, d, octv=0): return s.root + 12 * (d // 7) + s.mode[d % 7] + 12 * octv
    def sect(s, bar): return SECTIONS[(bar // 8) % 8]
    def chord_root(s, bar): return s.cfg["prog"][s.sect(bar)][bar % 8]
    def tpos(s, bar, st, jitter=0.0):
        sw = s.swing * s.stepT if st % 2 == 1 else 0.0
        return int((bar * 16 + st) * s.stepT * SR + (sw + s.rng.uniform(-jitter, jitter)) * SR)
    def chord_tones(s, bar, octv=0, n=4):
        r = s.chord_root(bar); return [s.deg(r + o, octv) for o in (0, 2, 4, 6)[:n]]

def render_drums(S_):
    c = S_.cfg["drums"]; buf = S_.newbuf(); kicks = []
    lanes = {
        "kick": lambda: kick(**c.get("kick", {})), "snare": lambda: snare(**c.get("snare", {})), "clap": lambda: clap(),
        "hat": lambda: hat(False, c.get("hatBright", 7000)), "ohat": lambda: hat(True), "shaker": lambda: shaker(), "rim": lambda: rimshot(),
        "tomh": lambda: tom(150), "toml": lambda: tom(100), "doum": lambda: darbuka("doum"), "tek": lambda: darbuka("tek"), "ka": lambda: darbuka("ka"),
        "bells": lambda: sleighbells(), "crash": lambda: crash(),
    }
    gain = {"kick": 1.0, "snare": 0.8, "clap": 0.7, "hat": 0.5, "ohat": 0.45, "shaker": 0.4, "rim": 0.55, "tomh": 0.7, "toml": 0.7, "doum": 0.9, "tek": 0.6, "ka": 0.5, "bells": 0.5, "crash": 0.6}
    pan = {"hat": 0.25, "ohat": -0.2, "shaker": -0.3, "rim": 0.3, "tomh": 0.2, "toml": -0.2, "ka": 0.2, "tek": -0.15, "bells": 0.3, "clap": 0.0}
    samples = {k: [lanes[k]() for _ in range(3)] for k in lanes}
    for bar in range(S_.bars):
        sec = S_.sect(bar); last = (bar % 8 == 7); first = (bar % 8 == 0)
        pat = c["pat"][sec]
        for lane, p in pat.items():
            if last and lane in c.get("fillMute", []): continue
            for st, ch in enumerate(p):
                if ch == ".": continue
                v = 1.0 if ch == "x" else 0.45
                v *= S_.rng.uniform(0.9, 1.0)
                smp = samples[lane][int(S_.rng.integers(3))]
                pos = S_.tpos(bar, st, 0.002 if lane not in ("kick",) else 0.0)
                mixin(buf, smp, pos, gain[lane] * v * c.get("gain", {}).get(lane, 1.0), pan.get(lane, 0.0))
                if lane == "kick": kicks.append(pos)
        if last and c.get("fill", True):  # snare/tom fill in the last half bar
            for i, st in enumerate(range(10, 16)):
                smp = samples["snare" if c.get("fillKind", "snare") == "snare" else ("tomh" if i % 2 == 0 else "toml")][i % 3]
                mixin(buf, smp, S_.tpos(bar, st), (0.35 + 0.1 * i) * (0.8 if c.get("fillKind") == "tom" else 1.0), pan=-0.15 + 0.06 * i)
        if first and bar > 0 and (bar // 8) in (2, 4, 7):
            mixin(buf, samples["crash"][0], S_.tpos(bar, 0), 0.55)
    out = S_.fold(buf)
    out = reverb(out, wet=c.get("verb", 0.10), rt60=0.9, damp=5000, seed=3, tail=False)
    return out, [k % S_.N for k in kicks]

def pat_notes(S_, name, inst_fn, octv, gain_key, pans=0.0, vel=1.0, plucked=False, strum=0.0):
    """Generic rhythmic note stem: per bar patterns of (step, interval, len) following chord roots."""
    c = S_.cfg[name]; buf = S_.newbuf()
    for bar in range(S_.bars):
        sec = S_.sect(bar); pat = c["pat"][sec]
        r = S_.chord_root(bar)
        for (st, iv, ln) in pat:
            if isinstance(iv, (list, tuple)): offs = iv
            else: offs = [IV[iv]]
            for j, off in enumerate(offs):
                m = S_.deg(r + off, octv); f = float(mtof(m)); dur = ln * S_.stepT
                x = inst_fn(f, dur)
                pos = S_.tpos(bar, st, 0.003) + int(j * strum * SR)
                mixin(buf, x, pos, vel * S_.rng.uniform(0.88, 1.0) / (1 + 0.25 * (len(offs) - 1)), pans)
    return buf

def render_bass(S_):
    c = S_.cfg["bass"]; fn = {"fm": fm_bass, "saw": lambda f, d: bass_saw(f, d, c.get("cut", 900)), "sub": sub_bass, "pluck": lambda f, d: pluck(f, d, 0.2, 0.994) * 1.3}[c["inst"]]
    buf = pat_notes(S_, "bass", fn, c.get("oct", -3), "bass")
    return S_.fold(buf)

def render_chords(S_):
    c = S_.cfg["chords"]; N = S_.N; buf = S_.newbuf()
    inst = c["inst"]
    def chord_fn(f, d): 
        return {"epiano": epiano, "pad": lambda f, d: pad(f, d, 4, c.get("cut", 2400)), "pluck": lambda f, d: pluck(f, d, 0.55, 0.997),
                "glass": glass, "bell": lambda f, d: bell(f, d, 2.0, 1.2, 1.2)}[inst](f, d)
    for bar in range(S_.bars):
        sec = S_.sect(bar); r = S_.chord_root(bar); pat = c["pat"][sec]
        for (st, ln) in pat:
            tones = [S_.deg(r + o, c.get("oct", 0)) for o in (0, 2, 4, 6 if c.get("seventh", True) else 7)]
            for j, m in enumerate(tones):
                x = chord_fn(float(mtof(m)), ln * S_.stepT)
                mixin(buf, x, S_.tpos(bar, st, 0.004) + int(j * c.get("strum", 0.0) * SR), 0.5 * S_.rng.uniform(0.85, 1.0), pan=-0.5 + j * 0.33)
    return S_.fold(buf)

def lead_fn(S_):
    c = S_.cfg["lead"]
    return {"marimba": lambda f, d: marimba(f, d) * 1.1, "whistle": whistle, "reed": reed, "saw": lambda f, d: sawlead(f, d, c.get("cut", 3500)),
            "bell": lambda f, d: bell(f, d, 3.5, 2.2, 0.7) * 0.8, "pluck": lambda f, d: pluck(f, d, 0.7, 0.997) * 1.2}[c["inst"]]
def render_lead(S_):
    c = S_.cfg["lead"]; buf = S_.newbuf(); fn = lead_fn(S_)
    for blk in range(S_.bars // 2):
        bar0 = blk * 2; sec = S_.sect(bar0); sec_i = bar0 // 8
        hooks = c["hooks"][sec]; hook = hooks[(blk % 4) % len(hooks)]
        octv = c.get("oct", 1) + (1 if (sec_i in c.get("hiSections", ())) else 0)
        for (st, off, ln) in hook:
            bar = bar0 + st // 16; sst = st % 16
            r = S_.chord_root(bar); m = S_.deg(r + off, octv)
            # snap strong-beat notes to chord tones for consonance
            if sst in (0, 8) and (off % 7) in (1, 3, 5): m = S_.deg(r + off + (1 if off % 7 in (3, 5) else -1) , octv) if False else m
            f = float(mtof(m)); x = fn(f, ln * S_.stepT)
            mixin(buf, x, S_.tpos(bar, sst, 0.003), 0.8 * S_.rng.uniform(0.9, 1.0), pan=c.get("pan", 0.1))
    out = S_.fold(buf)
    if c.get("delay"): out = pingpong(out, S_.beat * c["delay"], 0.45, 5, 0.35)
    return out

def render_counter(S_):
    c = S_.cfg["counter"]; buf = S_.newbuf()
    fn = {"marimba": lambda f, d: marimba(f, d), "pluck": lambda f, d: pluck(f, d, 0.6, 0.995), "saw": lambda f, d: sawlead(f, d, 2600) * 0.6, "bell": lambda f, d: bell(f, d, 3.01, 1.5, 0.45), "reed": reed}[c["inst"]]
    for bar in range(S_.bars):
        sec = S_.sect(bar); r = S_.chord_root(bar); pat = c["pat"][sec]; rate = c.get("rate", 2)  # steps per note
        if pat is None: continue
        tones = [0, 2, 4, 7, 9, 11]  # chord tone offsets in degrees (root,3,5,8,10,12)
        for i, st in enumerate(range(0, 16, rate)):
            idx = pat[(i + (bar % 2) * (16 // rate // 2 if c.get("alt", False) else 0)) % len(pat)]
            if idx is None: continue
            m = S_.deg(r + tones[idx], c.get("oct", 1)); x = fn(float(mtof(m)), rate * S_.stepT * 0.9)
            mixin(buf, x, S_.tpos(bar, st, 0.002), 0.55 * S_.rng.uniform(0.8, 1.0), pan=0.45 if (i % 2) else -0.45)
    out = S_.fold(buf)
    if c.get("delay"): out = pingpong(out, S_.beat * c["delay"], 0.4, 4, 0.3)
    return out

def render_fx(S_):
    c = S_.cfg["fx"]; buf = S_.newbuf(); rs = S_.rng
    for blk in range(S_.bars // 8):
        b0 = blk * 8; sec = S_.sect(b0)
        # riser over last 2 bars of each 8-bar section (plus crash on downbeat of next)
        if c.get("riser", True) and (blk % 1 == 0):
            d = 2 * S_.barT; x = riser(d); mixin(buf, x, S_.tpos(b0 + 6, 0), 0.5, 0.0)
        if blk in (2, 4, 7) or c.get("crashAll"):
            mixin(buf, impact(1.4), S_.tpos(b0, 0), 0.5)
            mixin(buf, crash(2.2), S_.tpos(b0, 0), 0.5, 0.1)
    for bar in range(S_.bars):
        sec = S_.sect(bar)
        for (kind, pat, g) in c.get("perc", {}).get(sec, []):
            for st, ch in enumerate(pat):
                if ch == ".": continue
                x = {"clap": clap(), "shaker": shaker(), "bells": sleighbells(), "rim": rimshot(), "tek": darbuka("tek"), "ka": darbuka("ka"), "ohat": hat(True), "tamb": sleighbells(0.18) * 0.8}[kind]
                mixin(buf, x, S_.tpos(bar, st, 0.003), g * (1.0 if ch == "x" else 0.5) * rs.uniform(0.85, 1.0), pan={"clap": 0, "shaker": -0.3, "bells": 0.35}.get(kind, 0.2))
    out = S_.fold(buf)
    out = reverb(out, wet=0.35, rt60=2.0, seed=7, tail=False)
    return out

STEM_FN = {"drums": None, "bass": render_bass, "chords": render_chords, "lead": render_lead, "counter": render_counter, "fx": render_fx}
FINISH = {  # per stem: highpass, reverb wet, rt60, duck depth, level
    "drums": dict(hp=30, verb=0, duck=0, lvl=0.85), "bass": dict(hp=28, verb=0, duck=0.45, lvl=1.0),
    "chords": dict(hp=120, verb=0.9, rt=2.2, duck=0.4, lvl=1.3), "lead": dict(hp=180, verb=0.8, rt=1.6, duck=0.12, lvl=0.9),
    "counter": dict(hp=200, verb=0.7, rt=1.4, duck=0.25, lvl=1.7), "fx": dict(hp=100, verb=0, duck=0, lvl=0.4),
}

def render_song(cfg, name, bars=64, outdir="/workspace/build"):
    t0 = time.time(); S_ = Song(cfg, bars)
    stems = {}
    d, kicks = render_drums(S_); stems["drums"] = d
    for k in ("bass", "chords", "lead", "counter", "fx"): stems[k] = STEM_FN[k](S_)
    duck_depth = cfg.get("duck", 1.0)
    for k, x in stems.items():
        f = FINISH[k]
        x = hp(x, f["hp"], 2)
        if f["verb"] and k in ("chords", "lead", "counter"): x = reverb(x, wet=f["verb"] * cfg.get("verbMul", 1.0), rt60=f.get("rt", 1.6), seed=hash(k) % 97, tail=True)
        if f["duck"] and kicks and duck_depth > 0:
            x = x * duck_curve(x.shape[1], kicks, f["duck"] * duck_depth, 0.16)[None, :]
        stems[k] = x * f["lvl"] * cfg.get("lvl", {}).get(k, 1.0)
    mix = sum(stems.values()); peak = np.abs(mix).max()
    # loudness: aim for a mix of about -16 LUFS with -1.5 dBFS true-ish peak via soft limiter on the sum
    g = 0.84 / peak
    stems = {k: v * g for k, v in stems.items()}
    mix = sum(stems.values())
    os.makedirs(f"{outdir}/hq/music/{name}", exist_ok=True); os.makedirs(f"{outdir}/std/music/{name}", exist_ok=True)
    meta = {"bpm": cfg["bpm"], "bars": bars, "loopSeconds": S_.N / SR, "stems": list(stems.keys()), "sections": [SECTIONS[(b // 8) % 8] for b in range(0, bars, 8)]}
    for k, v in list(stems.items()) + [("master", mix)]:
        wav = f"{outdir}/tmp/{name}_{k}.wav"; sf.write(wav, v.T.astype(np.float32), SR, subtype="PCM_24")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-c:a", "flac", "-compression_level", "5", f"{outdir}/hq/music/{name}/{k}.flac"], check=True)
        if k != "master":
            br = "72k" if k in ("chords", "lead", "counter", "drums", "fx") else "56k"
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-c:a", "aac", "-b:a", br, "-ar", "44100", "-movflags", "+faststart", f"{outdir}/std/music/{name}/{k}.m4a"], check=True)
        os.remove(wav)
    json.dump(meta, open(f"{outdir}/std/music/{name}/meta.json", "w"))
    print(f"{name}: {time.time()-t0:.1f}s loop={S_.N/SR:.1f}s peak={np.abs(mix).max():.2f}", flush=True)

# --------------------------------------------------------------------------- piece definitions
P = lambda **k: k
def hooks_menu():
    return {"A": [[(0,4,2),(2,2,2),(4,4,2),(6,5,2),(8,4,4),(14,2,2),(16,2,2),(18,4,2),(20,5,2),(22,4,2),(24,2,4),(28,0,4)],
                  [(0,2,3),(3,4,3),(6,5,2),(8,6,4),(12,4,2),(14,2,2),(16,4,3),(19,5,3),(22,4,2),(24,2,3),(27,1,1),(28,0,4)]],
            "B": [[(0,5,2),(2,5,2),(4,4,2),(6,2,2),(8,4,6),(14,5,2),(16,6,2),(18,5,2),(20,4,2),(22,2,2),(24,4,6),(30,2,2)],
                  [(0,7,4),(4,6,2),(6,5,2),(8,4,4),(12,2,2),(14,4,2),(16,5,4),(20,4,2),(22,2,2),(24,0,8)]],
            "C": [[(0,4,8),(8,2,8),(16,5,8),(24,4,8)]]}
CFG = {}
CFG["menu"] = P(bpm=108, root=60, mode="ionian", seed=11, swing=0.08, duck=0.8,
  prog={"A": [0,4,5,3,0,4,3,4], "B": [3,4,2,5,3,4,0,0], "C": [5,3,0,4,5,3,4,4]},
  drums=P(kick=dict(f0=160,f1=50,decay=0.2), pat={
      "A": dict(kick="x..x..x...x.x...", snare="....x.......x...", hat="x.x.x.x.x.x.x.x.", ohat="..............x.", shaker="oxoxoxoxoxoxoxox"),
      "B": dict(kick="x.....x.x.....x.", snare="....x.......x...", clap="....x.......x...", hat="xxxxxxxxxxxxxxxx", ohat="..x...x...x...x.", shaker="o.o.o.o.o.o.o.o."),
      "C": dict(rim="..x...x...x...x.", hat="x.x.x.x.x.x.x.x.", shaker="o.o.o.o.o.o.o.o.")}, fillMute=["hat"], verb=0.08),
  bass=P(inst="fm", oct=-2, pat={"A": [(0,"r",2),(3,"o",1),(4,"r",1),(6,"5",2),(8,"r",2),(11,"o",1),(12,"3",1),(14,"5",2)],
                                "B": [(0,"r",3),(4,"5",1),(6,"r",1),(8,"o",3),(12,"5",2),(14,"7",2)], "C": [(0,"r",8),(8,"5",8)]}),
  chords=P(inst="epiano", oct=-1, strum=0.012, pat={"A": [(0,2),(3,2),(6,2),(10,2),(12,3)], "B": [(0,6),(8,6)], "C": [(0,15)]}),
  lead=P(inst="marimba", oct=1, delay=0.75, pan=0.15, hooks=hooks_menu(), hiSections=(1,5)),
  counter=P(inst="marimba", oct=1, rate=2, delay=0.75, pat={"A": [0,1,2,1,3,2,1,2], "B": [0,2,3,2,0,2,3,4], "C": None}),
  fx=P(perc={"A": [("bells","x...x...x...x...",0.2)], "B": [("clap","....x.......x...",0.4),("shaker","xxxxxxxxxxxxxxxx",0.15)], "C": []}))

CFG["buttercup"] = P(bpm=122, root=60, mode="ionian", seed=21, swing=0.05, duck=0.5, verbMul=1.1,
  prog={"A": [0,3,5,4,0,3,4,4], "B": [3,0,4,5,3,0,4,4], "C": [5,4,3,0,5,4,3,4]},
  drums=P(kick=dict(f0=140,f1=52,decay=0.16,click=0.2), snare=dict(tone=200,nz=0.7,decay=0.12), pat={
      "A": dict(kick="x.......x.......", snare="........x.......", hat="x.x.x.x.x.x.x.x.", shaker="o.xoo.xoo.xoo.xo", rim="..x.....x.x....."),
      "B": dict(kick="x...x...x...x...", snare="....x.......x...", clap="....x.......x...", hat="x.xxx.xxx.xxx.xx", ohat="......x.......x.", shaker="oxoxoxoxoxoxoxox"),
      "C": dict(kick="x.......x.......", rim="....x.......x...", shaker="o.o.o.o.o.o.o.o.")}, verb=0.12),
  bass=P(inst="pluck", oct=-2, pat={"A": [(0,"r",3),(4,"5",1),(6,"r",1),(8,"r",3),(12,"3",1),(14,"5",2)], "B": [(0,"r",2),(2,"r",1),(4,"5",2),(8,"o",2),(10,"7",2),(12,"5",2),(14,"3",2)], "C": [(0,"r",4),(8,"5",4)]}),
  chords=P(inst="pluck", oct=-1, strum=0.018, seventh=False, pat={"A": [(0,4),(4,2),(8,4),(12,2)], "B": [(0,2),(2,2),(4,2),(6,2),(8,2),(10,2),(12,2),(14,2)], "C": [(0,8),(8,8)]}),
  lead=P(inst="whistle", oct=1, delay=0.75, pan=0.1, hiSections=(5,7), hooks={
      "A": [[(0,4,3),(3,2,1),(4,4,4),(8,5,2),(10,4,2),(12,2,4),(16,2,3),(19,4,1),(20,6,4),(24,5,2),(26,4,2),(28,2,4)],
            [(0,2,2),(2,4,2),(4,6,4),(8,4,2),(10,5,2),(12,4,4),(16,4,2),(18,2,2),(20,0,4),(24,1,2),(26,2,2),(28,4,4)]],
      "B": [[(0,7,4),(4,6,2),(6,5,2),(8,4,4),(12,5,2),(14,6,2),(16,7,6),(22,6,2),(24,4,8)],
            [(0,4,2),(2,5,2),(4,6,2),(6,7,2),(8,9,4),(12,7,4),(16,6,4),(20,5,2),(22,4,2),(24,2,8)]],
      "C": [[(0,4,6),(8,2,6),(16,5,6),(24,4,8)]]}),
  counter=P(inst="pluck", oct=1, rate=2, delay=0.75, alt=True, pat={"A": [0,1,2,1,0,1,2,3], "B": [2,3,4,3,2,1,2,3], "C": None}),
  fx=P(perc={"A": [("tamb","..x...x...x...x.",0.25)], "B": [("tamb","x.x.x.x.x.x.x.x.",0.2),("clap","....x.......x...",0.35)], "C": []}))

CFG["lantern"] = P(bpm=126, root=57, mode="aeolian", seed=31, swing=0.0, duck=1.0, verbMul=1.2,
  prog={"A": [0,5,2,6,0,5,2,6], "B": [3,5,6,0,3,5,6,6], "C": [0,0,5,5,2,2,6,6]},
  drums=P(kick=dict(f0=165,f1=46,decay=0.24,click=0.4), snare=dict(tone=180,nz=0.8,decay=0.2), hatBright=8000, pat={
      "A": dict(kick="x...x...x...x...", clap="....x.......x...", snare="....x.......x...", hat="..x...x...x...x.", shaker="xoxoxoxoxoxoxoxo"),
      "B": dict(kick="x...x...x...x..x", clap="....x.......x...", snare="....x.......x..x", hat="xxxxxxxxxxxxxxxx", ohat="..x...x...x...x.", shaker="oxoxoxoxoxoxoxox"),
      "C": dict(kick="x.......x.......", hat="..x...x...x...x.", shaker="o.o.o.o.o.o.o.o.")}, fillKind="tom", verb=0.1),
  bass=P(inst="saw", oct=-2, cut=1100, pat={"A": [(i,"r",1) for i in range(16) if i not in (4,12)] + [(4,"o",1),(12,"o",1)], "B": [(0,"r",2),(2,"r",1),(3,"r",1),(4,"o",1),(6,"r",1),(8,"r",2),(10,"r",1),(11,"5",1),(12,"o",1),(14,"5",1),(15,"r",1)], "C": [(0,"r",8),(8,"r",8)]}),
  chords=P(inst="pad", oct=-1, cut=2800, pat={"A": [(0,16)], "B": [(0,8),(8,8)], "C": [(0,16)]}),
  lead=P(inst="saw", oct=1, cut=4200, delay=0.75, pan=0.05, hiSections=(5,7), hooks={
      "A": [[(0,4,3),(3,4,1),(4,5,4),(8,4,2),(10,2,2),(12,4,4),(16,4,3),(19,5,1),(20,6,4),(24,5,2),(26,4,2),(28,2,4)],
            [(0,2,4),(4,4,4),(8,5,2),(10,4,2),(12,2,4),(16,1,4),(20,2,4),(24,4,6),(30,2,2)]],
      "B": [[(0,7,2),(2,7,2),(4,6,2),(6,5,2),(8,4,2),(10,4,2),(12,5,4),(16,6,2),(18,6,2),(20,5,2),(22,4,2),(24,2,8)],
            [(0,9,3),(3,7,1),(4,6,4),(8,7,2),(10,6,2),(12,4,4),(16,5,6),(22,4,2),(24,2,8)]],
      "C": [[(0,2,8),(8,4,8),(16,5,8),(24,6,8)]]}),
  counter=P(inst="saw", oct=1, rate=1, delay=0.75, pat={"A": [0,2,4,2,0,2,4,2,0,3,2,3,0,2,3,2], "B": [0,2,3,2,4,2,3,2,0,2,3,4,3,2,1,2], "C": [0,None,None,None,2,None,None,None]}),
  fx=P(perc={"A": [("ohat","..x...x...x...x.",0.2)], "B": [("clap","....x.......x...",0.3),("shaker","xxxxxxxxxxxxxxxx",0.12)], "C": []}))

CFG["mirage"] = P(bpm=118, root=50, mode="dorian", seed=41, swing=0.1, duck=0.3, verbMul=1.0,
  prog={"A": [0,0,3,3,0,0,6,6], "B": [0,6,3,4,0,6,3,0], "C": [0,0,0,0,6,6,3,3]},
  drums=P(kick=dict(f0=120,f1=44,decay=0.18,click=0.12), hatBright=6500, pat={
      "A": dict(doum="x.....x...x.....", tek="..x...x...x...x.", ka="....x.......x.x.", shaker="o.xoo.xoo.xoo.xo", kick="x.......x......."),
      "B": dict(doum="x..x..x...x.x...", tek="..x.x.x...x.x.x.", ka=".x..x..x.x..x..x", kick="x...x...x...x...", snare="........x.......", shaker="xoxoxoxoxoxoxoxo"),
      "C": dict(doum="x.......x.......", tek="....x.......x...", shaker="o.o.o.o.o.o.o.o.")}, fillKind="tom", verb=0.12),
  bass=P(inst="saw", oct=-2, cut=600, pat={"A": [(0,"r",6),(8,"r",2),(10,"5",2),(12,"r",4)], "B": [(0,"r",2),(3,"r",1),(4,"5",2),(8,"r",2),(11,"7",1),(12,"5",2),(14,"4",2)], "C": [(0,"r",16)]}),
  chords=P(inst="pluck", oct=-1, strum=0.022, seventh=False, pat={"A": [(0,6),(6,2),(8,6),(14,2)], "B": [(0,3),(3,3),(6,2),(8,3),(11,3),(14,2)], "C": [(0,16)]}),
  lead=P(inst="reed", oct=1, delay=0.75, pan=0.1, hiSections=(5,7), hooks={
      "A": [[(0,4,3),(3,5,1),(4,4,2),(6,2,2),(8,1,4),(12,2,2),(14,4,2),(16,5,3),(19,4,1),(20,2,4),(24,1,2),(26,0,2),(28,1,4)],
            [(0,2,2),(2,4,2),(4,5,4),(8,4,2),(10,2,2),(12,1,4),(16,0,6),(22,1,2),(24,2,8)]],
      "B": [[(0,7,2),(2,6,2),(4,5,2),(6,4,2),(8,5,4),(12,4,2),(14,2,2),(16,4,4),(20,5,2),(22,6,2),(24,7,8)],
            [(0,4,3),(3,5,1),(4,6,2),(6,5,2),(8,4,4),(12,2,2),(14,1,2),(16,0,8),(24,2,8)]],
      "C": [[(0,0,8),(8,2,8),(16,4,8),(24,2,8)]]}),
  counter=P(inst="pluck", oct=1, rate=2, delay=0.75, alt=True, pat={"A": [0,2,1,2,0,2,3,2], "B": [3,2,1,2,0,1,2,3], "C": None}),
  fx=P(perc={"A": [("tek","..x...x...x...x.",0.15)], "B": [("shaker","xxxxxxxxxxxxxxxx",0.14),("clap","....x.......x...",0.2)], "C": []}))

CFG["frost"] = P(bpm=110, root=52, mode="aeolian", seed=51, swing=0.0, duck=0.5, verbMul=1.4,
  prog={"A": [0,2,5,3,0,2,6,6], "B": [5,6,0,0,5,6,2,4], "C": [0,0,5,5,3,3,6,6]},
  drums=P(kick=dict(f0=130,f1=46,decay=0.3,click=0.15), snare=dict(tone=170,nz=0.9,decay=0.24), hatBright=9000, pat={
      "A": dict(kick="x.......x.x.....", snare="........x.......", bells="x.......x.......", hat="..x...x...x...x."),
      "B": dict(kick="x..x....x.x.....", snare="........x.......", clap="........x.......", hat="x.x.x.x.x.x.x.xx", bells="x.x.x.x.x.x.x.x.", shaker="oooooooooooooooo"),
      "C": dict(kick="x...............", bells="x.......x.......")}, fillKind="tom", verb=0.18),
  bass=P(inst="sub", oct=-1, pat={"A": [(0,"r",6),(6,"o",2),(8,"r",6),(14,"5",2)], "B": [(0,"r",3),(4,"5",1),(6,"r",1),(8,"o",3),(12,"5",2),(14,"r",2)], "C": [(0,"r",16)]}),
  chords=P(inst="glass", oct=0, seventh=True, pat={"A": [(0,16)], "B": [(0,8),(8,8)], "C": [(0,16)]}),
  lead=P(inst="bell", oct=1, delay=0.75, pan=0.1, hiSections=(5,7), hooks={
      "A": [[(0,4,4),(4,2,2),(6,4,2),(8,5,6),(14,4,2),(16,2,4),(20,4,2),(22,5,2),(24,4,8)],
            [(0,2,3),(3,4,1),(4,5,4),(8,4,2),(10,2,2),(12,1,4),(16,0,4),(20,2,2),(22,4,2),(24,2,8)]],
      "B": [[(0,7,2),(2,6,2),(4,7,4),(8,9,4),(12,7,2),(14,6,2),(16,5,4),(20,4,2),(22,5,2),(24,7,8)],
            [(0,4,2),(2,5,2),(4,6,4),(8,7,4),(12,6,2),(14,5,2),(16,4,6),(22,2,2),(24,0,8)]],
      "C": [[(0,4,12),(16,2,12)]]}),
  counter=P(inst="bell", oct=1, rate=2, delay=0.75, pat={"A": [0,2,3,2,1,2,3,4], "B": [2,3,4,3,2,3,5,3], "C": [0,None,None,None,2,None,None,None]}),
  fx=P(perc={"A": [("bells","..x...x...x...x.",0.18)], "B": [("bells","x.x.x.x.x.x.x.x.",0.16),("clap","........x.......",0.3)], "C": []}))

if __name__ == "__main__":
    names = sys.argv[1:] or list(CFG.keys())
    bars = 64
    if names and names[0] == "--quick": names = names[1:] or ["menu"]; bars = 8
    for n in names: render_song(CFG[n], n, bars=bars, outdir="/workspace/build" if bars == 64 else "/workspace/build/quick")
