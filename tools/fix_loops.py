#!/usr/bin/env python3
"""Loop hygiene: remove DC from engine loops (circular-safe) and heal wrap-around discontinuities with a short quadratic ramp. Applies to std WAV and HQ FLAC."""
import soundfile as sf, numpy as np, glob, sys
def fix(path):
    x, sr = sf.read(path, always_2d=True); info = sf.info(path); changed = False
    for c in range(x.shape[1]):
        y = x[:, c].copy(); d = np.abs(np.diff(y)); p99 = np.percentile(d, 99) + 1e-9
        if 'engine' in path: y -= y.mean(); changed = True
        step = y[-1] - y[-2]; target = y[0] - step; err = target - y[-1]
        if abs(y[0] - y[-1]) > 1.0 * p99:
            n = min(600, len(y) // 8); r = (np.arange(1, n + 1) / n) ** 2; y[-n:] += err * r; changed = True
        x[:, c] = y
    if changed:
        pk = np.abs(x).max()
        if pk > 0.98: x *= 0.98 / pk
        sf.write(path, x, sr, subtype=info.subtype)
    return changed
files = []
for root in sys.argv[1:]:
    files += glob.glob(f'{root}/engine/*.*') + [f for f in glob.glob(f'{root}/sfx/*loop*.*')] + glob.glob(f'{root}/amb/*.*')
n = 0
for f in sorted(files):
    if f.endswith(('.wav', '.flac')): n += fix(f)
print('processed', len(files), 'changed', n)
