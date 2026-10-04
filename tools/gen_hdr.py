#!/usr/bin/env python3
"""Procedural HDR sky environments (Radiance .hdr, RLE RGBE, 4096x2048 equirect) for the four tracks. Original; matches the in-game sky gradient/sun."""
import numpy as np, sys, os, itertools
from scipy import fft as sfft
OUT = '/workspace/pack/g1/env'
TH = {'meadow': dict(top=0x2f8fff, hor=0xd4efff, sun=0xfff1c9, dir=(0.5, 0.55, 0.3), ground=0x6cc24a, k=1.0),
      'harbor': dict(top=0x34509e, hor=0xffb88a, sun=0xffc48a, dir=(-0.6, 0.28, 0.5), ground=0x59677a, k=0.9),
      'mesa': dict(top=0xff9b4a, hor=0xffe7b0, sun=0xfff0c0, dir=(0.3, 0.7, -0.4), ground=0xe0a65a, k=1.1),
      'frost': dict(top=0x6aa8f0, hor=0xeaf5ff, sun=0xf4f9ff, dir=(0.2, 0.4, 0.7), ground=0xeef6ff, k=1.1),
      # Starlight Cup skies (match THEMES.dusk/neon/ember/aurora in trackview.js)
      'dusk': dict(top=0x2a1f5e, hor=0xff9a62, sun=0xff8a4a, dir=(-0.7, 0.14, 0.45), ground=0x3f7a3a, k=0.8),
      'neon': dict(top=0x050818, hor=0x2a2f7a, sun=0x8aa8ff, dir=(0.4, 0.5, -0.5), ground=0x1c2a40, k=0.25),
      'ember': dict(top=0x3a0f2a, hor=0xff5a1f, sun=0xff7a30, dir=(-0.5, 0.1, 0.4), ground=0x8a4a2a, k=0.8),
      'aurora': dict(top=0x02081c, hor=0x123550, sun=0xcfe8ff, dir=(0.2, 0.35, 0.7), ground=0xc6d8ee, k=0.3)}
def hexrgb(c): return np.array([(c >> 16) & 255, (c >> 8) & 255, c & 255], np.float32) / 255.0
def lin(c): return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
def fn(h, w, beta, seed):
    a = np.random.default_rng(seed).standard_normal((h, w), dtype=np.float32); F = sfft.rfft2(a); fy = np.fft.fftfreq(h)[:, None]; fx = np.fft.rfftfreq(w)[None, :]; f = np.sqrt(fx * fx + fy * fy); f[0, 0] = 1; F *= f ** (-beta); F[0, 0] = 0
    o = sfft.irfft2(F, s=(h, w)).astype(np.float32); return (o - o.mean()) / o.std()
def make(name, W=4096, H=2048):
    t = TH[name]; seed = sum(map(ord, name))
    j, i = np.mgrid[0:H, 0:W].astype(np.float32); phi = ((i + .5) / W - .5) * 2 * np.pi; el = (.5 - (j + .5) / H) * np.pi
    dx, dy, dz = np.cos(phi) * np.cos(el), np.sin(el), np.sin(phi) * np.cos(el)
    top, hor, sunc, gr = [lin(hexrgb(t[k])) for k in ('top', 'hor', 'sun', 'ground')]
    sd = np.array(t['dir'], np.float32); sd /= np.linalg.norm(sd)
    tt = np.clip(dy, 0, 1)[..., None]; c = hor + (top - hor) * (tt ** 0.55)
    s = np.clip(dx * sd[0] + dy * sd[1] + dz * sd[2], 0, 1)[..., None]
    c = c + sunc * ((s ** 600) * 60.0 * t['k'] + (s ** 12) * 0.9 + (s ** 3) * 0.12)   # HDR sun disk
    # clouds (fbm projected like the in-game shader) -- only above horizon
    uvx, uvy = dx / (dy + 0.25), dz / (dy + 0.25); lowfreq = fn(H, W, 1.7, seed) * 0.5 + fn(H, W, 1.0, seed + 1) * 0.35 + fn(H, W, 0.5, seed + 2) * 0.15
    cl = np.clip((lowfreq - 0.15) / 0.9, 0, 1); cl = (cl * cl * (3 - 2 * cl)) * np.clip((dy - 0.02) / 0.23, 0, 1); cl = cl[..., None] * 0.8
    cloud_c = (hor * 0.3 + 0.7) * (0.85 + 0.5 * np.clip(s, 0, 1) ** 2 * 3)
    c = c * (1 - cl) + cloud_c * cl
    # below horizon: ground colour lit by sky, fades to haze at the horizon
    below = np.clip(-dy * 6, 0, 1)[..., None]; gcol = gr * 0.55 + hor * 0.25
    c = c * (1 - below) + gcol * below
    return np.maximum(c, 0)
def rgbe(c):
    m = c.max(-1); e = np.zeros(m.shape, np.int32); nz = m > 1e-32
    mant, ex = np.frexp(m[nz]); e[nz] = ex; scale = np.zeros_like(m); scale[nz] = mant * 256.0 / m[nz]
    rgb = np.clip((c * scale[..., None]).astype(np.int32), 0, 255); out = np.zeros(c.shape[:2] + (4,), np.uint8); out[..., :3] = rgb; out[..., 3] = np.where(nz, e + 128, 0); return out
def rle_line(ch):
    b = bytearray()
    for val, grp in itertools.groupby(ch.tolist()):
        n = len(list(grp))
        while n > 0:
            if n >= 4:
                k = min(n, 127); b += bytes([128 + k, val]); n -= k
            else:
                b += bytes([n]) + bytes([val]) * n if False else b''
                # literal run of n bytes (n<4) -> write as non-run chunk
                b += bytes([n, *([val] * n)]); n = 0
    return bytes(b)
def write_hdr(path, rgbe_img):
    H, W, _ = rgbe_img.shape
    with open(path, 'wb') as f:
        f.write(b'#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n' + f'-Y {H} +X {W}\n'.encode())
        for y in range(H):
            f.write(bytes([2, 2, W >> 8, W & 255]))
            for ch in range(4): f.write(rle_line(rgbe_img[y, :, ch]))
if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for n in (sys.argv[1:] or list(TH)):
        img = rgbe(make(n)); p = f'{OUT}/{n}.hdr'; write_hdr(p, img); print(n, round(os.path.getsize(p) / 1048576, 1), 'MB', flush=True)
