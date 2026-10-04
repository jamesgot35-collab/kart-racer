#!/usr/bin/env python3
"""Procedural HQ PBR texture generator for Sparkdrift GP (original; no external sources).
Outputs to /workspace/pack/g1/tex/<track>/{ground,road}_{albedo.jpg,normal.png,rough.jpg}. Ground tiles 4096^2; road is 2048x4096 (u across, v along)."""
import numpy as np, sys, os, time
from PIL import Image
from scipy import fft as sfft
OUT = '/workspace/pack/g1/tex'
def rng(s): return np.random.default_rng(s)
def fnoise(h, w, beta, seed, lo=0.0):
    """Periodic (tileable) 1/f^beta noise, zero mean unit std."""
    r = rng(seed); a = r.standard_normal((h, w), dtype=np.float32)
    F = sfft.rfft2(a, workers=-1); fy = np.fft.fftfreq(h)[:, None].astype(np.float32); fx = np.fft.rfftfreq(w)[None, :].astype(np.float32)
    f = np.sqrt(fx * fx * (h / w) ** 0 + fy * fy); f[0, 0] = 1.0
    F *= (f ** (-beta))
    if lo > 0: F *= (f > lo)
    F[0, 0] = 0
    o = sfft.irfft2(F, s=(h, w), workers=-1).astype(np.float32); o -= o.mean(); o /= (o.std() + 1e-8); return o
def sm(x, a, b): t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)
def hexrgb(c): return np.array([(c >> 16) & 255, (c >> 8) & 255, c & 255], np.float32) / 255.0
def normal_from_height(hm, strength):
    gx = (np.roll(hm, -1, 1) - np.roll(hm, 1, 1)) * 0.5 * strength; gy = (np.roll(hm, -1, 0) - np.roll(hm, 1, 0)) * 0.5 * strength
    # OpenGL convention: +G = towards image top (v up); image rows grow downward so dh/dv = -gy
    n = np.stack([-gx, gy, np.ones_like(gx)], -1); n /= np.linalg.norm(n, axis=-1, keepdims=True); return n
def save(img, path, kind):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if kind == 'jpg': Image.fromarray(np.clip(img * 255 + 0.5, 0, 255).astype(np.uint8)).save(path, quality=92, subsampling=0, optimize=True)
    elif kind == 'png': Image.fromarray(np.clip((img * 0.5 + 0.5) * 255 + 0.5, 0, 255).astype(np.uint8)).save(path, compress_level=6, optimize=False)
    elif kind == 'gray': Image.fromarray(np.clip(img * 255 + 0.5, 0, 255).astype(np.uint8), 'L').save(path, quality=90, optimize=True)
    print('  wrote', path, round(os.path.getsize(path) / 1048576, 1), 'MB', flush=True)
def down2(a): return a.reshape(a.shape[0] // 2, 2, a.shape[1] // 2, 2, *a.shape[2:]).mean((1, 3))
# ------------------------------------------------------------------ ground
def ground(track, N=4096):
    s = {'meadow': 11, 'harbor': 22, 'mesa': 33, 'frost': 44}[track]
    low = fnoise(N, N, 1.6, s + 1); mid = fnoise(N, N, 1.1, s + 2); hi = fnoise(N, N, 0.35, s + 3); vhi = fnoise(N, N, 0.0, s + 4)
    if track == 'meadow':
        base = hexrgb(0x6cc24a); dark = hexrgb(0x3f8f35); light = hexrgb(0x9ad45a); dirt = hexrgb(0x8a6b3f)
        t = sm(mid * 0.6 + low * 0.6, -1.2, 1.4)[..., None]; col = dark + (light - dark) * t
        blades = (hi * 0.7 + vhi * 0.5); col *= (1 + blades[..., None] * 0.10)
        patch = sm(low * 0.9 + mid * 0.4, 1.35, 1.9)[..., None]; col = col * (1 - patch * 0.55) + dirt * patch * 0.55
        r = rng(s + 9); n = 5200; ys = r.integers(0, N, n); xs = r.integers(0, N, n); cl = np.array([[1, 1, .95], [1, .86, .25], [1, .55, .75], [.7, .6, 1]], np.float32)[r.integers(0, 4, n)]
        rad = r.integers(2, 5, n)
        for y, x, c, rr in zip(ys, xs, cl, rad):
            y0, y1, x0, x1 = max(0, y - rr - 1), min(N, y + rr + 2), max(0, x - rr - 1), min(N, x + rr + 2); yg, xg = np.mgrid[y0:y1, x0:x1]; a = np.clip(1.4 - np.sqrt((yg - y) ** 2 + (xg - x) ** 2) / rr, 0, 1)[..., None] * 0.85
            col[y0:y1, x0:x1] = col[y0:y1, x0:x1] * (1 - a) + c * a
        height = hi * 0.6 + vhi * 0.4 + mid * 0.5; rough = 0.88 - 0.1 * sm(blades, 0.5, 2.0); ns = 3.0
    elif track == 'harbor':
        tile = 512; yy, xx = np.mgrid[0:N, 0:N]; ty, tx = yy // tile, xx // tile; fy, fx = yy % tile, xx % tile
        joint = ((fy < 6) | (fx < 6)).astype(np.float32); joint = np.maximum(joint, 0)
        r = rng(s + 5); tint = r.uniform(0.9, 1.1, (N // tile, N // tile)).astype(np.float32)[ty, tx]; hueshift = r.uniform(-0.03, 0.03, (N // tile, N // tile)).astype(np.float32)[ty, tx]
        base = hexrgb(0x59677a); col = base[None, None, :] * tint[..., None] * (1 + mid[..., None] * 0.045 + hi[..., None] * 0.035); col[..., 2] += hueshift * 0.5; col[..., 0] -= hueshift * 0.3
        stain = sm(low * 0.8 + mid * 0.6, 1.0, 2.2)[..., None]; col = col * (1 - stain * 0.28)
        crack = (np.abs(fnoise(N, N, 1.0, s + 6)) < 0.012).astype(np.float32) * sm(mid, 0.3, 1.2); col *= (1 - crack[..., None] * 0.6)
        oil = sm(fnoise(N, N, 2.0, s + 7), 1.9, 2.6)[..., None]; col = col * (1 - oil * 0.5) + np.array([0.15, 0.1, 0.25], np.float32) * oil * 0.15
        col *= (1 - joint[..., None] * 0.45); height = hi * 0.25 + vhi * 0.25 - joint * 3.0 - crack * 2.0; rough = 0.85 - 0.25 * oil[..., 0] + 0.05 * joint; ns = 2.2
    elif track == 'mesa':
        yy, xx = np.mgrid[0:N, 0:N].astype(np.float32); warp = low * 40 + mid * 6
        rip = np.sin((xx * 0.5 + yy * 0.2 + warp) * 2 * np.pi / 256 * 5) * 0.5 + 0.5
        sand = hexrgb(0xe0a65a); red = hexrgb(0xb8693a); pale = hexrgb(0xf0c987)
        t = sm(low * 0.9 + mid * 0.5, -1.0, 1.4)[..., None]; col = red + (pale - red) * t; col = col * 0.45 + sand * 0.55
        col *= (1 + (rip[..., None] - 0.5) * 0.12 + hi[..., None] * 0.05 + vhi[..., None] * 0.04)
        r = rng(s + 8); n = 9000; ys = r.integers(0, N, n); xs = r.integers(0, N, n); shade = r.uniform(0.5, 1.2, n); rad = r.integers(2, 7, n)
        peb = np.zeros((N, N), np.float32)
        for y, x, sh, rr in zip(ys, xs, shade, rad):
            y0, y1, x0, x1 = max(0, y - rr), min(N, y + rr), max(0, x - rr), min(N, x + rr); yg, xg = np.mgrid[y0:y1, x0:x1]; m = ((yg - y) ** 2 + (xg - x) ** 2 <= rr * rr); col[y0:y1, x0:x1][m] *= sh; peb[y0:y1, x0:x1][m] = 1
        height = rip * 1.2 + hi * 0.35 + peb * 2.5; rough = 0.93 - 0.08 * peb; ns = 3.2
    else:  # frost
        base = hexrgb(0xeef6ff); ice = hexrgb(0xbfdcf4); shadow = hexrgb(0xc8dcf0)
        t = sm(low * 0.8 + mid * 0.5, -0.8, 1.6)[..., None]; col = shadow + (base - shadow) * t
        icep = sm(fnoise(N, N, 1.5, s + 6) * 0.7 + mid * 0.5, 1.4, 2.4)[..., None]; col = col * (1 - icep * 0.6) + ice * icep * 0.6
        r = rng(s + 7); spark = (r.random((N, N)) > 0.9992).astype(np.float32); spark = np.maximum(spark, np.roll(spark, 1, 0) * 0.5); col += spark[..., None] * 0.35
        col *= (1 + hi[..., None] * 0.012 + vhi[..., None] * 0.015); height = low * 1.4 + mid * 0.7 + hi * 0.2; rough = 0.72 - 0.35 * icep[..., 0] - 0.25 * spark; ns = 2.0
    col = np.clip(col, 0, 1); d = f'{OUT}/{track}'
    save(col, f'{d}/ground_albedo.jpg', 'jpg'); save(normal_from_height(height.astype(np.float32), ns), f'{d}/ground_normal.png', 'png'); save(down2(np.clip(rough, 0, 1).astype(np.float32)), f'{d}/ground_rough.jpg', 'gray')
# ------------------------------------------------------------------ road (2048 wide x 4096 long)
def road(track):
    W, H = 2048, 4096; s = {'meadow': 111, 'harbor': 122, 'mesa': 133, 'frost': 144}[track]
    base = {'meadow': 0x4f535c, 'harbor': 0x3b4352, 'mesa': 0x8a6a52, 'frost': 0x6b7a8c}[track]; b = hexrgb(base)
    agg = fnoise(H, W, 0.15, s + 1); fine = fnoise(H, W, 0.0, s + 2); mid = fnoise(H, W, 1.0, s + 3); low = fnoise(H, W, 1.8, s + 4)
    col = b[None, None, :] * (1 + agg[..., None] * 0.09 + fine[..., None] * 0.07 + mid[..., None] * 0.04 + low[..., None] * 0.03)
    u = (np.arange(W, dtype=np.float32) / W)[None, :]; v = (np.arange(H, dtype=np.float32) / H)[:, None]
    rut = np.exp(-((u - 0.33) / 0.05) ** 2) + np.exp(-((u - 0.67) / 0.05) ** 2); rut = rut * 0.55 * (0.6 + 0.4 * sm(mid, -1, 1))
    col *= (1 - rut[..., None] * (0.16 if track != 'frost' else 0.28))
    rough = np.full((H, W), 0.86, np.float32) - rut * (0.14 if track != 'frost' else 0.38) + fine * 0.03
    height = agg * 0.9 + fine * 0.6 + mid * 0.2 - rut * 0.9
    if track == 'harbor':
        seam = np.zeros((H, W), np.float32); seam[(np.arange(H) % 256) < 3, :] = 1; col *= (1 - seam[..., None] * 0.35); height -= seam * 2.0
    if track == 'mesa':
        gr = sm(fnoise(H, W, 0.4, s + 6), 1.2, 2.2); col = col * (1 - gr[..., None] * 0.2) + hexrgb(0xb89878) * gr[..., None] * 0.2; height += gr * 1.5
    if track == 'frost':
        r = rng(s + 7); salt = (r.random((H, W)) > 0.9985).astype(np.float32); salt = np.maximum(salt, np.roll(salt, 1, 1) * 0.6); col += salt[..., None] * 0.28; rough -= salt * 0.3
        wet = sm(mid + low, 0.2, 1.6); col *= (1 - wet[..., None] * 0.12); rough -= wet * 0.2
    # markings (match the low-res canvas layout: edge lines at 3.5%/96.5%, centre dashes every 1/4 length)
    line = np.zeros((H, W), np.float32); e = int(0.0234 * W)
    line[:, int(0.035 * W):int(0.035 * W) + e] = 1; line[:, int(0.965 * W) - e:int(0.965 * W)] = 1
    dash_col = {'meadow': (1, 1, 1), 'harbor': (1, .78, .31), 'mesa': (1, .94, .78), 'frost': (1, 1, 1)}[track]
    dash = np.zeros((H, W), np.float32); cx = W // 2
    for y in range(0, H, 1024): dash[y + 128:y + 640, cx - 24:cx + 24] = 1
    worn = sm(agg * 0.6 + fine * 0.8 + mid * 0.3, -0.6, 0.9)  # paint wear
    paint = np.maximum(line, dash) * (0.35 + 0.65 * worn)
    pc = np.where(dash[..., None] > 0, np.array(dash_col, np.float32)[None, None, :], np.ones(3, np.float32)[None, None, :]) * 0.92
    col = col * (1 - paint[..., None] * 0.9) + pc * paint[..., None] * 0.9; rough = rough * (1 - paint * 0.5) + 0.55 * paint * 0.5; height += paint * 0.4
    col = np.clip(col, 0, 1); d = f'{OUT}/{track}'
    save(col, f'{d}/road_albedo.jpg', 'jpg'); save(normal_from_height(height.astype(np.float32), 2.4), f'{d}/road_normal.png', 'png'); save(down2(np.clip(rough, 0, 1)), f'{d}/road_rough.jpg', 'gray')
if __name__ == '__main__':
    which = sys.argv[1:] or ['meadow', 'harbor', 'mesa', 'frost']
    for t in which:
        t0 = time.time(); print(t, flush=True); ground(t); road(t); print(' ', t, round(time.time() - t0), 's', flush=True)
