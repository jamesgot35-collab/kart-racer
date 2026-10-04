"""Small numpy synthesis library used by the offline audio generators (music, sfx, engines, ambience)."""
import numpy as np, scipy.signal as ss
SR = 48000
NT = 4096
rng = np.random.default_rng(12345)

def _tables():
    t = np.arange(NT) / NT
    T = {}
    for shape in ("saw", "square", "tri", "pulse"):
        arr = []
        for idx in range(10):
            fmax = 20 * 2 ** (idx + 1); H = int(min(SR / 2 / fmax, 400)); H = max(H, 2)
            h = np.arange(1, H + 1)
            S = np.sin(2 * np.pi * np.outer(t, h))
            if shape == "saw":   w = S @ (1.0 / h) * (2 / np.pi)
            elif shape == "square": o = (h % 2 == 1); w = S @ (o / h) * (4 / np.pi)
            elif shape == "tri": o = (h % 2 == 1); sg = np.where(((h - 1) // 2) % 2 == 0, 1.0, -1.0); w = S @ (o * sg / h ** 2) * (8 / np.pi ** 2)
            else:  # 25% pulse
                d = 0.25; C = np.sin(2 * np.pi * np.outer(t - d, h)); w = (S @ (1.0 / h) - C @ (1.0 / h)) * (2 / np.pi)
            w = w - w.mean(); w = w / (np.abs(w).max() + 1e-9); arr.append(w)
        T[shape] = arr
    return T
TAB = _tables()

def mtof(m): return 440.0 * 2 ** ((np.asarray(m, dtype=np.float64) - 69) / 12)
def osc(freq, n, shape="saw", ph0=0.0):
    f = np.broadcast_to(np.asarray(freq, dtype=np.float64), (n,))
    fm = float(np.mean(f)); idx = int(np.clip(np.floor(np.log2(max(fm, 20) / 20)), 0, 9))
    phase = ph0 + np.cumsum(f) / SR
    pos = (phase % 1.0) * NT; i0 = pos.astype(np.int64); fr = pos - i0
    tab = TAB[shape][idx]
    return tab[i0 % NT] * (1 - fr) + tab[(i0 + 1) % NT] * fr
def sine(freq, n, ph0=0.0):
    f = np.broadcast_to(np.asarray(freq, dtype=np.float64), (n,)); return np.sin(2 * np.pi * (ph0 + np.cumsum(f) / SR))
def noise(n): return rng.standard_normal(n)
def sos(kind, fc, order=2, fs=SR):
    fc = np.clip(fc, 20, fs * 0.45)
    return ss.butter(order, fc, btype=kind, fs=fs, output="sos")
def lp(x, fc, order=2): return ss.sosfilt(sos("low", fc, order), x, axis=-1)
def hp(x, fc, order=2): return ss.sosfilt(sos("high", fc, order), x, axis=-1)
def bp(x, lo, hi, order=2): return ss.sosfilt(ss.butter(order, [max(20, lo), min(hi, SR * 0.45)], btype="band", fs=SR, output="sos"), x, axis=-1)
def adsr(n, a, d, s, r_total_len=None, dur=None, r=0.08):
    """n total samples; note held until dur seconds then releases over r seconds."""
    t = np.arange(n) / SR
    dur = n / SR - r if dur is None else dur
    env = np.where(t < a, t / max(a, 1e-4), s + (1 - s) * np.exp(-(t - a) / max(d, 1e-3)))
    rel = np.where(t > dur, np.exp(-(t - dur) / max(r / 4, 1e-3)), 1.0)
    return env * rel
def expdec(n, tau): return np.exp(-np.arange(n) / (tau * SR))
def softclip(x, drive=1.0): return np.tanh(x * drive) / np.tanh(drive) if drive > 0 else x
def norm(x, peak=0.9): m = np.abs(x).max(); return x * (peak / m) if m > 0 else x
def pan_gains(p): a = (p + 1) * np.pi / 4; return np.cos(a), np.sin(a)
def mixin(buf, x, start, gain=1.0, pan=0.0):
    start = int(start)
    if start >= buf.shape[1] or start + len(x) <= 0: return
    s0 = max(0, -start); e = min(len(x), buf.shape[1] - start)
    gl, gr = pan_gains(pan)
    seg = x[s0:e] * gain
    buf[0, start + s0:start + e] += seg * gl; buf[1, start + s0:start + e] += seg * gr
def reverb_ir(rt60=1.6, pre=0.012, damp=6000, seed=1, width=1.0):
    r = np.random.default_rng(seed); n = int(rt60 * 1.2 * SR)
    t = np.arange(n) / SR
    env = np.exp(-6.91 * t / rt60)
    ir = np.stack([r.standard_normal(n) * env, r.standard_normal(n) * env])
    ir = ss.sosfilt(sos("low", damp, 1), ir, axis=-1)
    # high frequencies decay faster
    fast = ss.sosfilt(sos("low", 1800, 1), ir, axis=-1); k = np.exp(-t * 2.2 / max(rt60, .1)); ir = fast + (ir - fast) * k
    ir = np.concatenate([np.zeros((2, int(pre * SR))), ir], axis=1)
    mid = ir.mean(axis=0, keepdims=True); ir = mid + (ir - mid) * width
    return ir / np.sqrt((ir ** 2).sum(axis=1, keepdims=True)).mean()
def reverb(buf, wet=0.25, rt60=1.6, damp=6000, seed=1, tail=True):
    ir = reverb_ir(rt60, damp=damp, seed=seed)
    L = buf.shape[1]
    out = np.stack([ss.fftconvolve(buf[0], ir[0]), ss.fftconvolve(buf[1], ir[1])])
    if not tail: out = out[:, :L]
    else:
        # wrap tail around so the loop is seamless
        o = out[:, :L].copy(); ex = out[:, L:]; o[:, :ex.shape[1]] += ex[:, :L]; out = o
    return buf + wet * out[:, :L] * 0.18
def pingpong(buf, delay, fb=0.4, taps=6, wet=0.3):
    d = int(delay * SR); out = np.zeros_like(buf)
    for k in range(1, taps + 1):
        g = fb ** k * wet; sh = d * k
        src = buf if k % 2 == 1 else buf[::-1]
        r = np.roll(src, sh, axis=1); out += r * g
    return buf + out
def duck_curve(n, hits, depth=0.6, rel=0.18, atk=0.004):
    c = np.ones(n)
    for h in hits:
        h = int(h)
        L = int(rel * 4 * SR); end = min(n, h + L)
        if h >= n: continue
        t = np.arange(end - h) / SR
        shape = 1 - depth * np.exp(-t / rel) * np.minimum(1, t / atk)
        c[h:end] = np.minimum(c[h:end], shape)
    return c

# ---------- instruments (mono arrays) ----------
def vib(n, rate=5.5, depth=0.006, delay=0.15):
    t = np.arange(n) / SR; return 1 + depth * np.sin(2 * np.pi * rate * t) * np.clip((t - delay) / 0.3, 0, 1)
def pluck(freq, dur, bright=0.5, decay=0.996):
    L = int(round(SR / freq)); n = int((dur + 0.1) * SR)
    x = np.zeros(n); burst = rng.uniform(-1, 1, L)
    burst = lp(burst, 2000 + 6000 * bright, 1)
    x[:L] = burst
    a = np.zeros(L + 2); a[0] = 1; a[L] = -decay * 0.5; a[L + 1] = -decay * 0.5
    y = ss.lfilter([1.0], a, x)
    return y / (np.abs(y).max() + 1e-9)
def bell(freq, dur, ratio=3.5, idx=2.5, tau=0.5):
    n = int((dur + tau * 2) * SR); t = np.arange(n) / SR
    env = np.exp(-t / tau); ienv = np.exp(-t / (tau * 0.6))
    mod = np.sin(2 * np.pi * freq * ratio * t)
    return np.sin(2 * np.pi * freq * t + idx * ienv * mod) * env
def marimba(freq, dur=0.4):
    n = int(max(dur, 0.5) * SR); t = np.arange(n) / SR
    y = np.sin(2 * np.pi * freq * t) * np.exp(-t / 0.22) + 0.35 * np.sin(2 * np.pi * freq * 4 * t) * np.exp(-t / 0.05) + 0.12 * np.sin(2 * np.pi * freq * 9.2 * t) * np.exp(-t / 0.025)
    return y * np.minimum(1, t / 0.002)
def epiano(freq, dur=0.5):
    n = int((dur + 0.5) * SR); t = np.arange(n) / SR
    env = np.exp(-t / 0.7) * np.minimum(1, t / 0.004)
    y = np.sin(2 * np.pi * freq * t + 1.4 * np.exp(-t / 0.15) * np.sin(2 * np.pi * freq * 2 * t)) + 0.3 * np.sin(2 * np.pi * freq * 3 * t) * np.exp(-t / 0.1)
    rel = np.where(t > dur, np.exp(-(t - dur) / 0.08), 1); return y * env * rel
def whistle(freq, dur, breath=0.05):
    n = int((dur + 0.12) * SR); f = freq * vib(n, 5.6, 0.007, 0.12)
    y = sine(f, n) + 0.12 * sine(2 * f, n); y += breath * bp(noise(n), 2000, 5000)
    return y * adsr(n, 0.035, 0.1, 0.8, dur=dur, r=0.1)
def reed(freq, dur):
    n = int((dur + 0.12) * SR); f = freq * vib(n, 5.2, 0.009, 0.1)
    y = osc(f, n, "pulse") * 0.7 + osc(f * 1.004, n, "saw") * 0.3
    y = bp(y, 350, 3200) + 0.4 * bp(y, 900, 1300)
    return y * adsr(n, 0.02, 0.2, 0.75, dur=dur, r=0.1)
def sawlead(freq, dur, cutoff=3500, det=0.006):
    n = int((dur + 0.15) * SR); f = freq * vib(n, 5.0, 0.004, 0.2)
    y = osc(f, n, "saw") + osc(f * (1 + det), n, "saw") + 0.7 * osc(f * 0.5, n, "pulse")
    env = adsr(n, 0.008, 0.2, 0.7, dur=dur, r=0.12)
    y = lp(y, cutoff, 2) * 0.5
    return y * env
def pad(freq, dur, voices=4, cutoff=2400, det=0.012):
    n = int((dur + 0.5) * SR); y = np.zeros(n)
    for i in range(voices):
        d = (i - (voices - 1) / 2) * det; y += osc(freq * (1 + d), n, "saw", ph0=i * 0.23)
    y = lp(y, cutoff, 2) / voices
    return y * adsr(n, 0.25, 0.4, 0.85, dur=dur, r=0.4)
def bass_saw(freq, dur, cutoff=900, grit=1.5):
    n = int((dur + 0.08) * SR); y = osc(freq, n, "saw") * 0.7 + osc(freq * 0.5, n, "square") * 0.5
    env = adsr(n, 0.004, 0.15, 0.8, dur=dur, r=0.05)
    cut = lp(y, cutoff, 2); y = softclip(cut * 1.6, grit)
    return y * env
def sub_bass(freq, dur):
    n = int((dur + 0.1) * SR); y = sine(freq, n) + 0.45 * sine(freq * 2, n) + 0.15 * sine(freq * 3, n)
    return y * adsr(n, 0.006, 0.2, 0.9, dur=dur, r=0.08)
def fm_bass(freq, dur):
    n = int((dur + 0.08) * SR); t = np.arange(n) / SR
    y = np.sin(2 * np.pi * freq * t + 2.2 * np.exp(-t / 0.08) * np.sin(2 * np.pi * freq * t))
    return y * adsr(n, 0.003, 0.25, 0.7, dur=dur, r=0.05)
def glass(freq, dur):
    n = int((dur + 1.0) * SR); t = np.arange(n) / SR
    y = np.sin(2 * np.pi * freq * t) + 0.4 * np.sin(2 * np.pi * freq * 2.76 * t) * np.exp(-t / 0.6) + 0.2 * np.sin(2 * np.pi * freq * 5.4 * t) * np.exp(-t / 0.25)
    return y * adsr(n, 0.5, 0.5, 0.7, dur=dur, r=0.5) * 0.7

# ---------- drums ----------
def kick(f0=170, f1=48, decay=0.22, click=0.35, length=0.5, drive=2.0):
    n = int(length * SR); t = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-t / 0.035)
    ph = 2 * np.pi * np.cumsum(f) / SR
    y = np.sin(ph) * np.exp(-t / decay) * np.minimum(1, t / 0.0015)
    y += click * hp(noise(n), 3000) * np.exp(-t / 0.004)
    return softclip(y * 1.4, drive) * 0.9
def snare(tone=185, nz=0.9, decay=0.16, bright=4000):
    n = int(0.45 * SR); t = np.arange(n) / SR
    body = np.sin(2 * np.pi * (tone + 90 * np.exp(-t / 0.02)) * t) * np.exp(-t / 0.07)
    z = bp(noise(n), 1400, 9000) * np.exp(-t / decay)
    z = z + 0.4 * hp(noise(n), bright) * np.exp(-t / (decay * 0.7))
    return softclip(0.7 * body + nz * z, 1.3) * 0.8
def clap(decay=0.2):
    n = int(0.5 * SR); z = bp(noise(n), 900, 3500); env = np.zeros(n)
    for off in [0, 0.011, 0.023]:
        o = int(off * SR); env[o:] += np.exp(-np.arange(n - o) / (0.008 * SR)) * 0.6
    o = int(0.034 * SR); env[o:] += np.exp(-np.arange(n - o) / (decay * 0.5 * SR))
    return softclip(z * env * 1.6, 1.2) * 0.7
def hat(open_=False, bright=7000):
    n = int((0.35 if open_ else 0.09) * SR); t = np.arange(n) / SR
    z = hp(noise(n), bright, 3) * np.exp(-t / (0.12 if open_ else 0.02))
    z += 0.25 * hp(np.sign(sine(6200, n) + sine(9100, n) + sine(11300, n)), 6000) * np.exp(-t / (0.08 if open_ else 0.015))
    return z * 0.5
def shaker(n_ms=70):
    n = int(n_ms / 1000 * SR); t = np.arange(n) / SR
    return bp(noise(n), 4500, 11000) * np.minimum(1, t / 0.012) * np.exp(-t / 0.03) * 0.5
def tom(f=110, decay=0.3):
    n = int(0.6 * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(f * (1 + 0.8 * np.exp(-t / 0.05))) / SR) * np.exp(-t / decay) * 0.9
def rimshot():
    n = int(0.12 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 820 * t) + 0.7 * np.sin(2 * np.pi * 1740 * t) + 0.4 * bp(noise(n), 2500, 6000)) * np.exp(-t / 0.012) * 0.6
def darbuka(kind="doum"):
    n = int(0.4 * SR); t = np.arange(n) / SR
    if kind == "doum": return np.sin(2 * np.pi * np.cumsum(95 * (1 + 0.5 * np.exp(-t / 0.04))) / SR) * np.exp(-t / 0.16) * 0.95
    if kind == "tek": return (np.sin(2 * np.pi * 480 * t) * np.exp(-t / 0.02) + 0.6 * bp(noise(n), 1500, 7000) * np.exp(-t / 0.018)) * 0.7
    return (np.sin(2 * np.pi * 330 * t) * np.exp(-t / 0.045) + 0.3 * bp(noise(n), 800, 3000) * np.exp(-t / 0.03)) * 0.6
def sleighbells(dur=0.25):
    n = int(dur * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for f in [4200, 5300, 6100, 7400, 8800]:
        y += np.sin(2 * np.pi * f * t + rng.uniform(0, 6)) * np.exp(-t / 0.06) * rng.uniform(0.5, 1.0)
    y += 0.5 * hp(noise(n), 6000) * np.exp(-t / 0.05); return y * 0.25
def crash(dur=1.6):
    n = int(dur * SR); t = np.arange(n) / SR
    return hp(noise(n), 4500, 2) * np.exp(-t / 0.55) * 0.5 * np.minimum(1, t / 0.002)
def riser(dur, lo=300, hi=9000):
    n = int(dur * SR); t = np.arange(n) / SR; z = noise(n)
    bands = [hp(z, f) for f in (600, 1500, 3000, 6000)]
    w = np.stack([np.clip((t / dur) * 4 - i, 0, 1) for i in range(4)])
    y = sum(b * wi for b, wi in zip(bands, w))
    return y * (t / dur) ** 2 * 0.45
def impact(dur=1.2):
    n = int(dur * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * np.cumsum(70 * (1 + 2 * np.exp(-t / 0.06))) / SR) * np.exp(-t / 0.4) + 0.4 * lp(noise(n), 900) * np.exp(-t / 0.3)) * 0.9

def to_stereo(x): return np.stack([x, x])
def write_wav(path, buf, sr=SR, subtype="PCM_24"):
    import soundfile as sf
    sf.write(path, buf.T if buf.ndim == 2 else buf, sr, subtype=subtype)
