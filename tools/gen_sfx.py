#!/usr/bin/env python3
"""Synthesises the SFX library, engine loops and ambience beds. Std: mono 32k 16-bit wav (ambience 22.05k). HQ: 48k 24-bit stereo FLAC masters."""
import os, sys, json, subprocess
import numpy as np, scipy.signal as ss, soundfile as sf
from synthlib import *
OUT = "/workspace/build"; R = np.random.default_rng(7)
def T(n): return np.arange(n) / SR
def N(sec): return int(sec * SR)
def fade(x, a=0.002, r=0.01):
    n = len(x); e = np.ones(n); na = min(n, int(a * SR)); nr = min(n, int(r * SR))
    e[:na] = np.linspace(0, 1, na); e[n - nr:] *= np.linspace(1, 0, nr); return x * e
def chirp(f0, f1, dur, shape="exp"):
    n = N(dur); t = T(n)
    f = f0 * (f1 / f0) ** (t / dur) if shape == "exp" else f0 + (f1 - f0) * t / dur
    return np.sin(2 * np.pi * np.cumsum(f) / SR)
def tone(f, dur, tau=None, harm=(1.0,), atk=0.003):
    n = N(dur); t = T(n); y = sum(h * np.sin(2 * np.pi * f * (i + 1) * t) for i, h in enumerate(harm))
    e = np.exp(-t / (tau or dur / 3)); return y * e * np.minimum(1, t / atk)
def pnoise(n, shape_fn, seed=0):
    r = np.random.default_rng(seed); k = n // 2 + 1; f = np.arange(k) * SR / n
    mag = shape_fn(np.maximum(f, 1.0)); mag[0] = 0
    spec = mag * np.exp(1j * r.uniform(0, 2 * np.pi, k)); x = np.fft.irfft(spec, n); return x / (np.abs(x).max() + 1e-9)
def bandshape(lo, hi, slope=2.0, peak=None):
    def fn(f):
        m = 1.0 / (1 + (lo / f) ** slope) / (1 + (f / hi) ** slope)
        return m
    return fn
def mono(x): return np.asarray(x, dtype=np.float64)
def widen(x, amt=0.003):
    d = int(amt * SR); return np.stack([x, np.roll(x, d)]) if d else np.stack([x, x])
def sweep_noise(dur, f0, f1, q=0.2, bands=6):
    n = N(dur); z = noise(n); t = T(n); fc = f0 * (f1 / f0) ** (t / dur); out = np.zeros(n)
    # time-varying band-pass via crossfaded fixed bands (log spaced)
    cents = np.geomspace(min(f0, f1), max(f0, f1), bands)
    for c in cents:
        band = bp(z, c * 0.6, c * 1.6, 2)
        w = np.exp(-0.5 * (np.log(fc / c) / q) ** 2); out += band * w
    return out / (np.abs(out).max() + 1e-9)
def metal(f, dur, parts=(1, 2.76, 5.4, 8.9), tau=0.12):
    n = N(dur); t = T(n); return sum(np.sin(2 * np.pi * f * p * t) * np.exp(-t / (tau / (1 + 0.5 * i))) / (1 + i * 0.5) for i, p in enumerate(parts))
def cat(*xs, gap=0.0):
    g = np.zeros(N(gap)); out = []
    for x in xs: out += [x, g]
    return np.concatenate(out)
def place(dur, items):
    y = np.zeros(N(dur) + SR)
    for t0, x, g in items:
        s = N(t0); y[s:s + len(x)] += x[:len(y) - s] * g
    return y[:N(dur)]

SFX = {}; LOOPS = set()
def sfx(name, loop=False, hq_stereo=True):
    def deco(fn): SFX[name] = fn; (LOOPS.add(name) if loop else None); return fn
    return deco

# ---------------- UI
@sfx("ui_click")
def _(): return fade(tone(1500, .05, .015) * .8 + hp(noise(N(.05)), 4000) * expdec(N(.05), .004) * .3)
@sfx("ui_hover")
def _(): return fade(tone(1000, .04, .012) * .5)
@sfx("ui_confirm")
def _(): return place(.5, [(0, tone(659, .3, .12, (1, .3)), .8), (.07, tone(988, .4, .16, (1, .3)), .8)])
@sfx("ui_back")
def _(): return place(.4, [(0, tone(784, .2, .08, (1, .3)), .8), (.07, tone(523, .3, .12, (1, .3)), .8)])
@sfx("ui_error")
def _(): return place(.4, [(0, lp(osc(150, N(.12), "saw"), 900), .8), (.14, lp(osc(130, N(.2), "saw"), 800), .8)]) * np.r_[np.ones(N(.4))]
@sfx("ui_toggle")
def _(): return fade(tone(1250, .06, .02) * .7)
@sfx("ui_tick")
def _(): return fade(tone(1800, .02, .006) * .5)
@sfx("ui_buy")
def _(): return place(1.2, [(0, bell(1319, .1, 3.5, 1.5, .25), .6), (.09, bell(1760, .1, 3.5, 1.5, .25), .6), (.18, bell(2093, .3, 3.5, 1.5, .4), .6), (.2, hp(noise(N(.5)), 5000) * expdec(N(.5), .15), .12)])[:N(1.0)]
@sfx("ui_unlock")
def _(): return place(1.6, [(i * .1, bell(f, .2, 3.01, 1.2, .7), .55) for i, f in enumerate([523, 659, 784, 1047, 1319])] + [(.5, hp(noise(N(1.0)), 6000) * expdec(N(1.0), .3), .1)])[:N(1.5)]
@sfx("ui_whoosh")
def _(): return fade(sweep_noise(.4, 400, 5000) * np.sin(np.pi * T(N(.4)) / .4) ** 1.5 * .7)
@sfx("lobby_join")
def _(): return place(.5, [(0, bell(880, .1, 3, 1, .2), .6), (.1, bell(1320, .2, 3, 1, .3), .6)])[:N(.5)]
@sfx("lobby_leave")
def _(): return place(.5, [(0, bell(1100, .1, 3, 1, .2), .6), (.1, bell(740, .2, 3, 1, .3), .6)])[:N(.5)]
@sfx("lobby_ready")
def _(): return place(.45, [(0, tone(1047, .2, .08, (1, .4)), .6), (.08, tone(1568, .3, .12, (1, .4)), .6)])
# ---------------- Countdown / race flow
@sfx("cd_beep")
def _(): return fade(tone(440, .3, .5, (1, .5, .25, .12)) * np.minimum(1, (.3 - T(N(.3))) / .02) * .8, .004, .02)
@sfx("cd_go")
def _(): return fade(tone(880, .8, .9, (1, .5, .3, .15)) * np.minimum(1, (.8 - T(N(.8))) / .08) * .8 + .3 * hp(noise(N(.8)), 3000) * expdec(N(.8), .12), .004, .05)
@sfx("lap_chime")
def _(): return place(1.0, [(0, bell(784, .2, 3, 1.2, .5), .6), (.12, bell(988, .2, 3, 1.2, .5), .6), (.24, bell(1319, .4, 3, 1.2, .6), .6)])[:N(1.0)]
@sfx("finallap")
def _():
    n = N(1.8); t = T(n); y = np.zeros(n)
    for i, f in enumerate([392, 392, 523, 659, 784]):
        s = N(.18 * i if i < 4 else .8); seg = N(.5 if i < 4 else 1.0)
        v = sum(osc(f * m, seg, "saw") for m in (1, 1.004, .5)) * .3; v = lp(v, 3000) * adsr(seg, .01, .2, .8, dur=seg / SR - .15, r=.12)
        y[s:s + seg] += v[:n - s]
    y += .4 * hp(noise(n), 6000) * expdec(n, .35) * (t > .75); return y * .7
@sfx("coin")
def _(): return place(.3, [(0, tone(1976, .08, .03, (1, .3)), .6), (.06, tone(2637, .18, .07, (1, .3)), .6)])
@sfx("itembox")
def _(): return place(.7, [(i * .05, bell(f, .08, 3.2, 1.0, .25), .45) for i, f in enumerate([880, 1109, 1319, 1760, 2217])])[:N(.6)]
@sfx("roulette_tick")
def _(): return fade(tone(700, .04, .012, (1, .5)) * .7)
@sfx("item_ready")
def _(): return place(.6, [(0, bell(1047, .1, 3, 1.2, .3), .6), (.07, bell(1568, .3, 3, 1.2, .4), .6), (.1, hp(noise(N(.3)), 6000) * expdec(N(.3), .08), .08)])[:N(.6)]
@sfx("boost_pad")
def _(): return fade(sweep_noise(.55, 500, 6000) * np.sin(np.pi * T(N(.55)) / .55) * .6 + .35 * chirp(300, 1200, .55) * np.sin(np.pi * T(N(.55)) / .55), .01, .05)
@sfx("hop")
def _(): return fade(chirp(260, 520, .14) * expdec(N(.14), .08) * .8 + .1 * hp(noise(N(.14)), 2000) * expdec(N(.14), .02))
@sfx("land")
def _(): return fade(chirp(130, 60, .18) * expdec(N(.18), .06) + .4 * lp(noise(N(.18)), 1200) * expdec(N(.18), .03))
for i, f in enumerate([880, 1175, 1568]):
    def mk(i=i, f=f):
        @sfx(f"drift_tick{i+1}")
        def _(): return place(.3, [(0, tone(f, .14, .05, (1, .4, .2)), .7), (0, hp(noise(N(.14)), 5000) * expdec(N(.14), .02), .25), (.06 * (i + 1) / 2, tone(f * 1.5, .12, .05, (1, .3)), .5)])
    mk()
@sfx("spark_loop", loop=True)
def _():
    n = N(1.0); x = np.zeros(n)
    for _i in range(70):
        s = R.integers(0, n - 400); L = R.integers(30, 300); x[s:s + L] += R.uniform(.3, 1) * R.standard_normal(L) * expdec(L, .0008 + R.uniform(0, .001) * SR / SR)
    return hp(x, 3500) * .5
@sfx("skid_road", loop=True)
def _():
    n = N(1.2); base = pnoise(n, lambda f: bandshape(1600, 4200, 3)(f) * (1 + 4 * np.exp(-0.5 * ((f - 2600) / 300) ** 2)), 1)
    am = 1 + .25 * np.sin(2 * np.pi * 5 * T(n)) + .15 * np.sin(2 * np.pi * 13 * T(n)); return base * am * .7
@sfx("skid_snow", loop=True)
def _(): n = N(1.2); return pnoise(n, bandshape(500, 3500, 2), 2) * (1 + .5 * pnoise(n, bandshape(20, 40, 4), 3)) * .8
@sfx("skid_sand", loop=True)
def _(): n = N(1.2); return pnoise(n, bandshape(2500, 7000, 2), 4) * .7
@sfx("offroad_loop", loop=True)
def _():
    n = N(1.2); x = pnoise(n, bandshape(40, 500, 3), 5) * .8; g = np.zeros(n)
    for _i in range(160):
        s = R.integers(0, n - 300); L = R.integers(60, 250); g[s:s + L] += R.uniform(.2, 1) * R.standard_normal(L) * expdec(L, .001 * SR / SR + .0006)
    return x + .5 * bp(g, 600, 3500)
@sfx("wind_loop", loop=True)
def _(): n = N(2.0); return pnoise(n, lambda f: bandshape(120, 2500, 1.5)(f) * (1 + 2 * np.exp(-0.5 * ((f - 600) / 250) ** 2)), 6) * (1 + .3 * np.sin(2 * np.pi * T(n) / 2.0)) * .8
@sfx("draft_loop", loop=True)
def _(): n = N(1.5); return pnoise(n, bandshape(300, 1400, 2), 8) * (1 + .5 * np.sin(2 * np.pi * T(n) / 1.5 * 2)) * .6
@sfx("slingshot")
def _(): return fade(sweep_noise(.7, 300, 5000) * np.sin(np.pi * T(N(.7)) / .7) ** .7 * .7 + .3 * chirp(200, 900, .7) * expdec(N(.7), .4))
@sfx("start_boost")
def _(): return place(1.0, [(0, kick(180, 50, .25, .5, .6), .9), (0, sweep_noise(.9, 400, 7000) * np.sin(np.pi * T(N(.9)) / .9) ** .6, .6), (0, chirp(180, 700, .9) * expdec(N(.9), .5), .3)])[:N(1.0)]
@sfx("start_stall")
def _():
    items = []; t0 = 0
    for i in range(7):
        L = N(.08 + .02 * i); pop = lp(osc(70 - i * 6, L, "saw"), 400) * expdec(L, .04 + .01 * i); items.append((t0, pop, .8 - i * .08)); t0 += .1 + .05 * i
    return place(1.2, items)
for tier, (dur, f0, f1, sub) in enumerate([(.7, 600, 4000, 0), (1.0, 400, 6000, 0.4), (1.4, 250, 7500, 1.0)], start=1):
    def mk(tier=tier, dur=dur, f0=f0, f1=f1, sub=sub):
        @sfx(f"boost_t{tier}")
        def _():
            n = N(dur); t = T(n); env = np.minimum(1, t / .04) * np.exp(-t / (dur * .55))
            y = sweep_noise(dur, f0, f1) * env * .7 + chirp(200 * tier, 500 * tier + 400, dur) * env * .25 * (0.6 + 0.4 * tier / 3)
            if sub: y += chirp(80, 40, dur) * np.exp(-t / .35) * sub * .7
            if tier >= 2: y += .12 * chirp(1200, 2400 * tier / 2, dur) * env
            if tier == 3: y += .2 * hp(noise(n), 7000) * np.exp(-t / .5)
            return y
    mk()
@sfx("pod_use")
def _(): return place(1.0, [(0, tone(900, .1, .02) + chirp(500, 1500, .1) * expdec(N(.1), .05), .5), (.04, sweep_noise(.8, 500, 5000) * np.sin(np.pi * T(N(.8)) / .8) ** .7, .6)])[:N(1.0)]
def thud(f=80, tau=.09, nz=.35, dur=.3, metalf=0):
    n = N(dur); y = chirp(f * 2, f, dur) * expdec(n, tau) + nz * lp(noise(n), 1600) * expdec(n, tau * .5)
    if metalf: y += .35 * metal(metalf, dur, tau=.1)
    return fade(y)
for nm, (f, tau, nz, mf) in {"bump_light": (150, .05, .3, 900), "bump_med": (110, .07, .4, 600), "bump_heavy": (70, .12, .55, 380)}.items():
    for v in "ab":
        def mk(nm=nm, f=f, tau=tau, nz=nz, mf=mf, v=v):
            @sfx(f"{nm}_{v}")
            def _(): return thud(f * (1.07 if v == "b" else 1), tau, nz, .35, mf * (1.18 if v == "b" else 1))
        mk()
@sfx("wall_scrape", loop=True)
def _(): n = N(.8); return (pnoise(n, bandshape(700, 5000, 2), 9) * .8 + .35 * pnoise(n, lambda f: np.exp(-0.5 * ((f - 1500) / 120) ** 2) + np.exp(-0.5 * ((f - 2300) / 140) ** 2), 10)) * .7
@sfx("wall_hit")
def _(): return thud(60, .16, .7, .5, 300)
@sfx("crash_big")
def _(): return place(1.0, [(0, thud(50, .22, .8, .8, 250), 1.0), (.02, hp(noise(N(.4)), 2500) * expdec(N(.4), .1), .3)])[:N(1.0)]
@sfx("spin_whirl")
def _():
    n = N(.9); t = T(n); f = 1200 * np.exp(-t / .5) + 300 + 70 * np.sin(2 * np.pi * 9 * t)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .5) * .6 + .25 * np.sin(4 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .3); return fade(y)
# ---------------- Items
@sfx("disc_launch")
def _(): return place(.5, [(0, sweep_noise(.3, 800, 5000) * np.sin(np.pi * T(N(.3)) / .3), .6), (0, chirp(900, 300, .3) * expdec(N(.3), .12), .5)])[:N(.4)]
@sfx("disc_bounce")
def _(): return fade(chirp(500, 1100, .12) * expdec(N(.12), .05) * .8 + tone(2200, .12, .03) * .3)
@sfx("disc_pop")
def _(): return place(.5, [(0, tone(1400, .1, .03, (1, .5)) + hp(noise(N(.1)), 3000) * expdec(N(.1), .02), .7), (.03, chirp(900, 300, .25) * expdec(N(.25), .1), .4)])[:N(.4)]
@sfx("disc_hit")
def _(): return place(1.0, [(0, thud(90, .1, .6, .35, 500), .9), (.02, chirp(1300, 280, .8) * expdec(N(.8), .35), .5)])[:N(1.0)]
@sfx("peel_drop")
def _(): return fade(chirp(500, 150, .15) * expdec(N(.15), .06) * .8 + .2 * lp(noise(N(.15)), 800) * expdec(N(.15), .04))
@sfx("peel_throw")
def _(): return fade(sweep_noise(.25, 600, 3000) * np.sin(np.pi * T(N(.25)) / .25) * .6)
@sfx("peel_hit")
def _(): return place(.9, [(0, chirp(700, 120, .5) * (1 + .3 * np.sin(2 * np.pi * 14 * T(N(.5)))) * expdec(N(.5), .25), .6), (0, lp(noise(N(.3)), 1500) * expdec(N(.3), .08), .5), (.5, thud(100, .08, .4, .3), .5)])[:N(.9)]
@sfx("spill_drop")
def _(): return place(.6, [(i * .07, chirp(300 + 200 * i, 120, .12) * expdec(N(.12), .05), .5) for i in range(4)])[:N(.55)]
@sfx("spill_slip")
def _():
    n = N(.8); return fade(pnoise(n, bandshape(1200, 5000, 3), 11) * np.exp(-T(n) / .5) * (1 + .4 * np.sin(2 * np.pi * 8 * T(n))) * .8 + .3 * chirp(900, 400, .8) * expdec(n, .4))
@sfx("jolt_arm")
def _():
    n = N(1.6); t = T(n); y = lp(noise(n), 300) * (t / 1.6) ** 2 * 1.0 + .35 * np.sin(2 * np.pi * np.cumsum(60 + 140 * (t / 1.6) ** 2) / SR) * (t / 1.6) + .15 * hp(noise(n), 3000) * (t / 1.6) ** 3
    return fade(y * .8, .05, .02)
@sfx("jolt_zap")
def _():
    n = N(.9); t = T(n); zap = hp(noise(n), 1500) * np.exp(-t / .08) * 1.0 + np.sin(2 * np.pi * 120 * t) * np.exp(-t / .3) * .5 + np.sign(np.sin(2 * np.pi * 60 * t)) * lp(noise(n), 200) * np.exp(-t / .4) * .3
    return softclip(zap, 1.5) * .8
@sfx("jolt_shrink")
def _(): return fade(chirp(1400, 200, .7) * expdec(N(.7), .4) * .7 + .2 * chirp(2800, 400, .7) * expdec(N(.7), .3))
@sfx("nova_start")
def _(): return place(1.3, [(i * .07, bell(f, .2, 3.0, 1.2, .6), .5) for i, f in enumerate([523, 659, 784, 1047, 1319, 1568, 2093])] + [(.3, hp(noise(N(.9)), 5000) * expdec(N(.9), .25), .12)])[:N(1.3)]
@sfx("nova_loop", loop=True)
def _():
    n = N(2.0); t = T(n); y = np.zeros(n)
    for i, f in enumerate([523, 659, 784, 1047]): y += np.sin(2 * np.pi * f * t) * (.5 + .5 * np.sin(2 * np.pi * (2 + i * .5) * t)) * .15
    return y + .12 * pnoise(n, bandshape(3000, 9000, 2), 12)
@sfx("nova_end")
def _(): return place(1.0, [(i * .08, bell(f, .2, 3.0, 1.0, .5), .5) for i, f in enumerate([1568, 1319, 1047, 784, 523])])[:N(.9)]
@sfx("veil_on")
def _(): return fade(sweep_noise(.7, 3000, 800) * np.sin(np.pi * T(N(.7)) / .7) * .5 + chirp(900, 300, .7) * np.sin(np.pi * T(N(.7)) / .7) * .25)
@sfx("veil_off")
def _(): return fade(sweep_noise(.5, 800, 3500) * np.sin(np.pi * T(N(.5)) / .5) * .5 + chirp(300, 800, .5) * np.sin(np.pi * T(N(.5)) / .5) * .25)
@sfx("steal")
def _(): return place(.5, [(0, chirp(500, 1600, .15) * expdec(N(.15), .1), .6), (.12, tone(1800, .2, .08, (1, .4)), .5)])[:N(.4)]
@sfx("rocket_launch")
def _(): return place(1.2, [(0, sweep_noise(1.0, 300, 3500) * np.exp(-T(N(1.0)) / .5), .8), (0, thud(60, .15, .7, .4), .8), (0, chirp(150, 450, 1.0) * expdec(N(1.0), .6), .25)])[:N(1.2)]
@sfx("rocket_loop", loop=True)
def _():
    n = N(1.0); t = T(n); return pnoise(n, bandshape(100, 3500, 2), 13) * .8 + .3 * np.sin(2 * np.pi * 180 * t) * (1 + .5 * np.sin(2 * np.pi * 40 * t))
@sfx("rocket_lock")
def _(): return fade(tone(1760, .09, .05, (1, .3)) * .8)
@sfx("rocket_explode")
def _(): return place(2.0, [(0, thud(45, .3, 1.0, 1.0, 200), 1.0), (0, hp(noise(N(1.2)), 800) * expdec(N(1.2), .35), .5), (.1, lp(noise(N(1.5)), 400) * expdec(N(1.5), .6), .6)])[:N(1.8)]
@sfx("brace_ok")
def _(): return place(.7, [(0, metal(1500, .5, tau=.25), .5), (.02, tone(2200, .2, .08, (1, .4)), .4)])[:N(.6)]
@sfx("shield_up")
def _(): return place(.4, [(0, tone(660, .25, .1, (1, .4)), .5), (.04, tone(990, .25, .1, (1, .4)), .5)])
@sfx("item_denied")
def _(): return fade(lp(osc(120, N(.18), "saw"), 700) * .6)
# ---------------- Crowd / fanfares
def crowd(dur, swell=True, seed=0):
    n = N(dur); base = pnoise(n, lambda f: bandshape(250, 3200, 2)(f) * (1 + 2 * np.exp(-0.5 * ((f - 900) / 350) ** 2)), seed)
    t = T(n); env = np.sin(np.pi * t / dur) ** 1.2 if swell else 1
    claps = np.zeros(n)
    for _i in range(int(dur * 25)):
        s = R.integers(0, n - 800); L = R.integers(100, 700); claps[s:s + L] += R.standard_normal(L) * expdec(L, .0008 + .0003 * R.uniform())
    return (base * .7 + .5 * bp(claps, 1000, 6000)) * env
@sfx("crowd_cheer")
def _(): return crowd(2.2, True, 1) * .9
@sfx("crowd_gasp")
def _(): n = N(.9); t = T(n); return pnoise(n, bandshape(400, 2500, 2), 2) * np.sin(np.pi * t / .9) ** 2 * (t / .9) * .8
@sfx("crowd_loop", loop=True)
def _():
    n = N(8.0); return pnoise(n, lambda f: bandshape(200, 2600, 2)(f) * (1 + 1.5 * np.exp(-0.5 * ((f - 700) / 300) ** 2)), 3) * (.6 + .4 * np.sin(2 * np.pi * T(n) / 8.0 * 2)) * .7
@sfx("applause_loop", loop=True)
def _():
    n = N(4.0); c = np.zeros(n)
    for _i in range(500):
        s = R.integers(0, n - 700); L = R.integers(80, 600); c[s:s + L] += R.standard_normal(L) * expdec(L, .0006 + .0004 * R.uniform())
    return bp(c, 800, 7000) * .5 + pnoise(n, bandshape(500, 3000, 2), 5) * .25
def jingle(notes, step, wave="saw", cut=3500, tail=.8):
    n = N(len(notes) * step + tail); y = np.zeros(n)
    for i, (f, L) in enumerate(notes):
        seg = N(L * step + .15)
        v = (osc(f, seg, wave) + osc(f * 1.005, seg, wave) + .5 * osc(f * .5, seg, "square")) * .25; v = lp(v, cut) * adsr(seg, .01, .2, .8, dur=L * step, r=.1)
        b = bell(f * 2, L * step, 3.0, 1.0, .6)[:seg] * .15
        s = N(i * step); y[s:s + seg] += v[:n - s] + b[:n - s] if len(b) >= seg else v[:n - s]
    return y
@sfx("fanfare_win")
def _(): return jingle([(523, 1), (659, 1), (784, 1), (1047, 2), (784, 1), (1047, 1), (1319, 4)], .17, tail=1.2) * .8
@sfx("fanfare_mid")
def _(): return jingle([(523, 1), (659, 1), (784, 2), (659, 1), (784, 3)], .2, tail=.8) * .8
@sfx("fanfare_lose")
def _(): return jingle([(392, 1), (370, 1), (349, 1), (330, 4)], .24, "square", 1800, tail=.8) * .7
@sfx("pos_up")
def _(): return fade(sweep_noise(.25, 800, 4000) * np.sin(np.pi * T(N(.25)) / .25) * .45)
@sfx("pos_down")
def _(): return fade(sweep_noise(.25, 3000, 600) * np.sin(np.pi * T(N(.25)) / .25) * .4)
@sfx("shortcut_found")
def _(): return place(.7, [(0, tone(880, .12, .05, (1, .4)), .5), (.09, tone(1175, .12, .05, (1, .4)), .5), (.18, tone(1760, .3, .12, (1, .4)), .5)])[:N(.6)]
@sfx("horn")
def _(): return fade(place(.7, [(0, lp(osc(392, N(.2), "square"), 2500) * .5, 1), (.25, lp(osc(392, N(.25), "square"), 2500) * .5, 1)]), .004, .02)
@sfx("trophy")
def _(): return place(1.6, [(0, jingle([(784, 1), (988, 1), (1175, 1), (1568, 3)], .15, "saw", 4500), .7), (.7, hp(noise(N(.9)), 5000) * expdec(N(.9), .3), .1)])[:N(1.5)]
@sfx("engine_start")
def _():
    n = N(1.2); t = T(n); y = np.zeros(n); k = 0
    # starter whirr then catch
    f = 20 + 70 * (t / .6).clip(0, 1) ** .7; y += lp(osc(f, n, "saw"), 600) * .5 * (t < .6)
    y += lp(osc(40 + 15 * np.sin(2 * np.pi * 6 * t), n, "saw"), 500) * np.minimum(1, np.maximum(0, (t - .5) / .15)) * np.exp(-np.maximum(0, t - .9) / .15) * .8
    return fade(softclip(y, 1.5), .01, .05)

# ---------------- Engines (spectral, seamless loops)
ENGINES = {  # class: (f_lo, f_hi, brightness exponent, noise level, odd emphasis, growl)
    "light": (55, 210, 0.9, 0.18, 0.55, 0.15), "medium": (40, 160, 1.15, 0.12, 0.35, 0.3), "heavy": (28, 110, 1.45, 0.1, 0.2, 0.55)}
def engine_loop(cls, layer, seconds=2.0):
    f_lo, f_hi, bright, nz, odd, growl = ENGINES[cls]; fund = f_lo * (f_hi / f_lo) ** (layer / 5)
    n = int(seconds * SR); fund = round(fund * seconds) / seconds  # integer cycles per loop
    nh = int((SR / 2 - 200) / fund); nh = min(nh, 400)
    k = np.arange(1, nh + 1); fk = k * fund
    # exhaust pulse spectrum: roll-off with cutoff that rises with layer, formant boost
    cutoff = 450 + 2600 * (layer / 5) ** bright
    amp = 1.0 / k ** 0.85 * 1 / (1 + (fk / cutoff) ** 2.2)
    amp *= 1 + odd * ((k % 2 == 1) * 1.0 - .5)
    form = 1 + 1.8 * np.exp(-0.5 * ((fk - (350 + 700 * layer / 5)) / 220) ** 2); amp *= form
    ph = np.random.default_rng(100 + layer).uniform(0, 2 * np.pi, nh)
    t = np.arange(n) / SR; y = np.zeros(n)
    # chunked additive synthesis (loop periodic by construction)
    for s in range(0, nh, 40):
        y += (amp[s:s + 40, None] * np.sin(2 * np.pi * fk[s:s + 40, None] * t[None, :] + ph[s:s + 40, None])).sum(axis=0)
    # cylinder irregularity: amplitude modulation at fund/2..fund/4 (integer cycles)
    mod_f = max(1.0 / seconds, round(fund / (3 if cls != "light" else 2) * seconds) / seconds)
    y *= 1 + growl * .35 * np.sin(2 * np.pi * mod_f * t) + growl * .18 * np.sin(2 * np.pi * mod_f * 1.5 * t + .7)
    y = y / (np.abs(y).max() + 1e-9)
    y = softclip(y * (1.2 + .9 * layer / 5), 1.4 + .5 * layer / 5)
    nzl = pnoise(n, lambda f: bandshape(300 + 600 * layer, 2000 + 3800 * layer / 5, 2)(f) * (f > 100), 50 + layer) * (nz * (.4 + .6 * layer / 5))
    y = y / (np.abs(y).max() + 1e-9) + nzl
    # periodic low-pass tilt (FFT domain): reduce >6k
    Y = np.fft.rfft(y); fr = np.fft.rfftfreq(n, 1 / SR); Y *= 1 / (1 + (fr / (5200 + 3000 * layer / 5)) ** 2); y = np.fft.irfft(Y, n)
    return y / (np.abs(y).max() + 1e-9) * .85, fund

# ---------------- Ambience beds (12 s loops)
def bird(f0, dur=.25, syl=4, seed=0):
    r = np.random.default_rng(seed); out = np.zeros(N(dur + .1)); t0 = 0
    for i in range(syl):
        L = N(dur / syl * .8); f = f0 * (1 + .25 * r.random()) * np.exp(np.linspace(0, r.uniform(-.3, .4), L)); y = np.sin(2 * np.pi * np.cumsum(f) / SR + 4 * np.sin(2 * np.pi * np.cumsum(f * .5) / SR) * 0.02) * np.hanning(L)
        s = int(i * dur / syl * SR); out[s:s + L] += y * .6
    return out
def amb_bed(dur, wind_cut, wind_lvl, seed):
    n = N(dur); wind = pnoise(n, lambda f: bandshape(60, wind_cut, 2)(f) * (1 + 1.5 * np.exp(-0.5 * ((f - wind_cut / 3) / (wind_cut / 6)) ** 2)), seed)
    gust = 0.55 + .45 * np.sin(2 * np.pi * T(n) / dur * 2 + 1.0) * np.sin(2 * np.pi * T(n) / dur * 3)
    return wind * gust * wind_lvl
def scatter(n, sounds, count, seed, gain=1.0):
    r = np.random.default_rng(seed); y = np.zeros(n + SR)
    for _i in range(count):
        s = sounds[int(r.integers(len(sounds)))]; p = int(r.integers(0, n)); seg = s[:len(y) - p]; y[p:p + len(seg)] += seg * r.uniform(.4, 1) * gain
    y[:SR] += y[n:n + SR]  # wrap for loop
    return y[:n]
def make_amb(name):
    dur = 12.0; n = N(dur)
    if name == "meadow":
        birds = [bird(f, d, s, i) for i, (f, d, s) in enumerate([(3200, .3, 4), (4300, .22, 3), (2600, .4, 5), (5200, .18, 3), (3700, .35, 6)])]
        ins = pnoise(n, bandshape(3500, 9000, 3), 20) * (.5 + .5 * np.sin(2 * np.pi * T(n) * 38)) * .08
        L = amb_bed(dur, 900, .5, 21) + scatter(n, birds, 22, 22, .35) + ins; R_ = amb_bed(dur, 900, .5, 23) + scatter(n, birds, 22, 24, .35) + ins
        cow = scatter(n, [bell(620, .1, 1.4, .6, .3) * .4 for _ in range(2)], 4, 25, .3); L += cow * .7; R_ += cow * .4
    elif name == "harbor":
        waves = pnoise(n, bandshape(80, 1200, 2), 30) * (.45 + .55 * np.sin(2 * np.pi * T(n) / dur * 3 + 1) ** 2)
        gull = []
        for i in range(3):
            m = N(.55); t = T(m); f = 1000 + 500 * np.sin(2 * np.pi * 7 * t) * np.exp(-t / .3) + 600 * np.exp(-t / .2); g = (np.sin(2 * np.pi * np.cumsum(f) / SR) + .4 * np.sin(4 * np.pi * np.cumsum(f) / SR)) * np.hanning(m) * (1 + .4 * np.sin(2 * np.pi * 60 * t)); gull.append(g * .5)
        horn = lp(osc(98, N(2.4), "saw") + osc(123, N(2.4), "saw"), 500) * adsr(N(2.4), .3, .5, .7, dur=1.8, r=.5) * .3
        buoy = [bell(520, .3, 1.5, .8, .9) * .3]
        L = waves * .5 + amb_bed(dur, 700, .25, 31) + scatter(n, gull, 5, 32, .25) + scatter(n, buoy, 4, 33, .35)
        L[N(4.5):N(4.5) + len(horn)] += lp(horn, 400) * .5; R_ = waves * .5 + amb_bed(dur, 700, .25, 34) + scatter(n, gull, 5, 35, .25) + scatter(n, buoy, 4, 36, .35); R_[N(4.5):N(4.5) + len(horn)] += lp(horn, 450) * .4
    elif name == "mesa":
        hawk = []
        m = N(.9); t = T(m); sc = bp(noise(m), 1400, 4500) * np.hanning(m) * (1 + .5 * np.sin(2 * np.pi * 25 * t)) ; hawk.append(sc * .35 * (np.exp(-t / .5) + .2))
        sand = hp(pnoise(n, bandshape(2000, 8000, 3), 40), 2500) * (.4 + .6 * np.abs(np.sin(2 * np.pi * T(n) / dur * 7))) * .09
        L = amb_bed(dur, 1100, .6, 41) + scatter(n, hawk, 2, 42, .5) + sand; R_ = amb_bed(dur, 1100, .6, 43) + scatter(n, hawk, 2, 44, .5) + sand
    elif name == "frost":
        creak = []
        m = N(.6); t = T(m); f = 220 - 120 * t / .6 + 15 * np.sin(2 * np.pi * 30 * t); cr = lp(np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * (1 + .3 * noise(m)), 900) * np.hanning(m) * .12; creak.append(cr)
        L = amb_bed(dur, 1600, .9, 51) + scatter(n, creak, 3, 52, 1.0) + .05 * pnoise(n, bandshape(2500, 8000, 3), 53); R_ = amb_bed(dur, 1600, .9, 54) + scatter(n, creak, 3, 55, 1.0) + .05 * pnoise(n, bandshape(2500, 8000, 3), 56)
    else:  # menu
        room = pnoise(n, bandshape(80, 700, 2), 60) * .25
        crowd_ = pnoise(n, bandshape(300, 2400, 2), 61) * .12 * (.6 + .4 * np.sin(2 * np.pi * T(n) / dur * 2))
        L = room + crowd_; R_ = pnoise(n, bandshape(80, 700, 2), 62) * .25 + pnoise(n, bandshape(300, 2400, 2), 63) * .12
    out = np.stack([L, R_]); return out / (np.abs(out).max() + 1e-9) * .8

# ---------------- output
def save(name, x, loop=False, std_sr=32000, lufs_target=None):
    x = np.asarray(x, dtype=np.float64)
    if x.ndim == 1: st = widen(x, 0.0015) if name.startswith(("boost", "slingshot", "jolt", "rocket", "veil", "crowd", "applause", "ui_whoosh", "nova", "wind")) else np.stack([x, x])
    else: st = x
    pk = np.abs(st).max(); assert np.isfinite(pk) and pk > 0, name
    st = st / pk * (0.89 if pk > 0.89 else 1.0) if pk > .89 else st
    sd = f"{OUT}/hq/sfx"; os.makedirs(sd, exist_ok=True); os.makedirs(f"{OUT}/std/sfx", exist_ok=True)
    sf.write(f"{sd}/{name}.flac", st.T.astype(np.float32), SR, subtype="PCM_24")
    m = st.mean(axis=0); m = ss.resample_poly(m, 2, 3) if std_sr == 32000 else ss.resample_poly(m, 147, 320)
    sf.write(f"{OUT}/std/sfx/{name}.wav", m.astype(np.float32), std_sr, subtype="PCM_16")
    return dict(file=f"{name}.wav", loop=name in LOOPS, dur=round(len(x if x.ndim == 1 else x[0]) / SR, 3))
if __name__ == "__main__":
    only = sys.argv[1:]; man = {}
    for name, fn in SFX.items():
        if only and name not in only: continue
        man[name] = save(name, fn())
    json.dump(man, open(f"{OUT}/std/sfx/manifest.json", "w"), indent=0) if not only else None
    if not only:
        eng = {}
        for cls in ENGINES:
            for layer in range(6):
                y, fund = engine_loop(cls, layer); name = f"{cls}_{layer}"
                os.makedirs(f"{OUT}/std/engine", exist_ok=True); os.makedirs(f"{OUT}/hq/engine", exist_ok=True)
                sf.write(f"{OUT}/hq/engine/{name}.flac", np.stack([y, np.roll(y, 37)]).T.astype(np.float32), SR, subtype="PCM_24")
                sf.write(f"{OUT}/std/engine/{name}.wav", ss.resample_poly(y, 2, 3).astype(np.float32), 32000, subtype="PCM_16")
                eng[name] = dict(fund=fund, dur=2.0)
            print("engine", cls, flush=True)
        json.dump(eng, open(f"{OUT}/std/engine/manifest.json", "w"))
        amb = {}
        for nm in ["meadow", "harbor", "mesa", "frost", "menu"]:
            a = make_amb(nm); os.makedirs(f"{OUT}/std/amb", exist_ok=True); os.makedirs(f"{OUT}/hq/amb", exist_ok=True)
            sf.write(f"{OUT}/hq/amb/{nm}.flac", a.T.astype(np.float32), SR, subtype="PCM_24")
            sf.write(f"{OUT}/std/amb/{nm}.wav", ss.resample_poly(a.mean(axis=0), 147, 320).astype(np.float32), 22050, subtype="PCM_16")
            amb[nm] = dict(dur=12.0); print("amb", nm, flush=True)
        json.dump(amb, open(f"{OUT}/std/amb/manifest.json", "w"))
    print("done", len(man))
