// Pure track geometry (no three.js): spline sampling, spatial queries, surfaces, progress, racing line.
const TAU = Math.PI * 2;
export function catmull(pts, perSeg = 24, closed = true, alpha = 0.5) {
  const n = pts.length, out = [];
  const P = (i) => closed ? pts[((i % n) + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    const d = (a, b) => Math.pow(Math.hypot(b[0] - a[0], b[1] - a[1]) + 1e-6, alpha);
    const t0 = 0, t1 = t0 + d(p0, p1), t2 = t1 + d(p1, p2), t3 = t2 + d(p2, p3);
    for (let k = 0; k < perSeg; k++) {
      const t = t1 + (t2 - t1) * (k / perSeg);
      const lerp = (a, b, ta, tb) => [(a[0] * (tb - t) + b[0] * (t - ta)) / (tb - ta), (a[1] * (tb - t) + b[1] * (t - ta)) / (tb - ta)];
      const A1 = lerp(p0, p1, t0, t1), A2 = lerp(p1, p2, t1, t2), A3 = lerp(p2, p3, t2, t3);
      const B1 = lerp(A1, A2, t0, t2), B2 = lerp(A2, A3, t1, t3);
      out.push(lerp(B1, B2, t1, t2));
    }
  }
  if (!closed) out.push(pts[n - 1].slice());
  return out;
}
export function resample(dense, spacing, closed = true) {
  const pts = closed ? dense.concat([dense[0]]) : dense; const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = cum[cum.length - 1]; const n = Math.max(8, Math.round(total / spacing)); const step = total / n; const out = []; let j = 0;
  for (let i = 0; i < (closed ? n : n + 1); i++) {
    const s = i * step; while (j < cum.length - 2 && cum[j + 1] < s) j++;
    const f = (s - cum[j]) / (cum[j + 1] - cum[j] + 1e-9);
    out.push([pts[j][0] + (pts[j + 1][0] - pts[j][0]) * f, pts[j][1] + (pts[j + 1][1] - pts[j][1]) * f]);
  }
  return { pts: out, length: total, step };
}
const wrap = (i, n) => ((i % n) + n) % n;

export class TrackCore {
  constructor(def, opts = {}) {
    this.def = def; this.mirror = !!opts.mirror; this.reverse = !!opts.reverse;
    let ctrl = def.pts.map(p => [this.mirror ? -p[0] : p[0], p[1]]);
    let scPts = def.shortcut ? def.shortcut.pts.map(p => [this.mirror ? -p[0] : p[0], p[1]]) : null;
    if (this.reverse) { ctrl = ctrl.slice().reverse(); if (scPts) scPts = scPts.slice().reverse(); }
    this.halfW = def.width / 2; this.off = def.offroad; this.limit = this.halfW + this.off; this.width = def.width;
    const dense = catmull(ctrl, 28, true); const r = resample(dense, 2.0, true);
    this.p = r.pts; this.N = r.pts.length; this.length = r.length; this.step = r.step;
    const N = this.N; this.tx = new Float32Array(N); this.tz = new Float32Array(N); this.k = new Float32Array(N); this.s = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const a = this.p[wrap(i - 1, N)], b = this.p[wrap(i + 1, N)]; let dx = b[0] - a[0], dz = b[1] - a[1]; const l = Math.hypot(dx, dz); this.tx[i] = dx / l; this.tz[i] = dz / l; this.s[i] = i * this.step;
    }
    for (let i = 0; i < N; i++) { const j = wrap(i + 1, N), h = wrap(i - 1, N); let a1 = Math.atan2(this.tx[j], this.tz[j]) - Math.atan2(this.tx[h], this.tz[h]); while (a1 > Math.PI) a1 -= TAU; while (a1 < -Math.PI) a1 += TAU; this.k[i] = a1 / (2 * this.step); }
    // smooth curvature a bit
    const ks = this.k.slice(); for (let it = 0; it < 3; it++) for (let i = 0; i < N; i++) ks[i] = (ks[wrap(i - 1, N)] + ks[i] * 2 + ks[wrap(i + 1, N)]) / 4; this.k = ks;
    // grid
    this.cell = 30; this.grid = new Map(); for (let i = 0; i < N; i++) this._ins(this.grid, this.p[i][0], this.p[i][1], i);
    // shortcut
    this.sc = null;
    if (scPts) {
      const sd = resample(catmull(scPts, 20, false), 2.0, false); this.sc = { p: sd.pts, n: sd.pts.length, length: sd.length, half: (def.shortcut.width || 11) / 2, surf: def.shortcut.surface || 'rough', tx: [], tz: [] };
      for (let i = 0; i < this.sc.n; i++) { const a = sd.pts[Math.max(0, i - 1)], b = sd.pts[Math.min(this.sc.n - 1, i + 1)]; const dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz); this.sc.tx.push(dx / l); this.sc.tz.push(dz / l); }
      this.sc.grid = new Map(); for (let i = 0; i < this.sc.n; i++) this._ins(this.sc.grid, sd.pts[i][0], sd.pts[i][1], i);
      const a = this.nearestGlobal(sd.pts[0][0], sd.pts[0][1]), b = this.nearestGlobal(sd.pts[this.sc.n - 1][0], sd.pts[this.sc.n - 1][1]);
      this.sc.i1 = a.i; this.sc.i2 = b.i; this.sc.s1 = this.s[a.i]; this.sc.s2 = this.s[b.i];
      if (this.sc.s2 < this.sc.s1) throw new Error("shortcut spans start line in " + def.id);
    }
    // special zones (defined in fractions of lap) -> metres
    const fr = (f) => (this.reverse ? 1 - f : f) * this.length;
    this.zones = (def.zones || []).map(z => { let a = fr(z.f0), b = fr(z.f1); if (a > b) [a, b] = [b, a]; return { ...z, s0: a, s1: b }; });
    this._buildRacingLine();
  }
  _ins(grid, x, z, i) { const key = Math.floor(x / this.cell) * 100003 + Math.floor(z / this.cell); let a = grid.get(key); if (!a) { a = []; grid.set(key, a); } a.push(i); }
  _cands(grid, x, z, out) { out.length = 0; const cx = Math.floor(x / this.cell), cz = Math.floor(z / this.cell); for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) { const a = grid.get((cx + dx) * 100003 + cz + dz); if (a) for (const i of a) out.push(i); } return out; }
  nearestGlobal(x, z) {
    const c = this._cands(this.grid, x, z, this._tmp || (this._tmp = []));
    let best = -1, bd = 1e18;
    if (!c.length) { for (let i = 0; i < this.N; i += 2) { const d = (this.p[i][0] - x) ** 2 + (this.p[i][1] - z) ** 2; if (d < bd) { bd = d; best = i; } } }
    else for (const i of c) { const d = (this.p[i][0] - x) ** 2 + (this.p[i][1] - z) ** 2; if (d < bd) { bd = d; best = i; } }
    return this.refine(best, x, z);
  }
  nearestWindow(x, z, hint, win = 40) {
    let best = hint, bd = 1e18; for (let o = -win; o <= win; o++) { const i = wrap(hint + o, this.N); const d = (this.p[i][0] - x) ** 2 + (this.p[i][1] - z) ** 2; if (d < bd) { bd = d; best = i; } }
    return this.refine(best, x, z);
  }
  refine(i, x, z) {
    // project onto neighbouring segments
    const N = this.N; let bi = i, bt = 0, bd = 1e18;
    for (const j of [wrap(i - 1, N), i]) {
      const a = this.p[j], b = this.p[wrap(j + 1, N)]; const ex = b[0] - a[0], ez = b[1] - a[1]; const l2 = ex * ex + ez * ez;
      let t = ((x - a[0]) * ex + (z - a[1]) * ez) / l2; t = Math.max(0, Math.min(1, t)); const px = a[0] + ex * t, pz = a[1] + ez * t; const d = (px - x) ** 2 + (pz - z) ** 2;
      if (d < bd) { bd = d; bi = j; bt = t; }
    }
    const j2 = wrap(bi + 1, N); const tx = this.tx[bi] * (1 - bt) + this.tx[j2] * bt, tz = this.tz[bi] * (1 - bt) + this.tz[j2] * bt; const tl = Math.hypot(tx, tz) || 1;
    const px = this.p[bi][0] + (this.p[j2][0] - this.p[bi][0]) * bt, pz = this.p[bi][1] + (this.p[j2][1] - this.p[bi][1]) * bt;
    const nx = tz / tl, nz = -tx / tl; // right-hand normal
    const lat = (x - px) * nx + (z - pz) * nz;
    return { i: bi, t: bt, s: (bi + bt) * this.step, lat, d: Math.sqrt(bd), tx: tx / tl, tz: tz / tl, nx, nz, px, pz, idx: bi + bt };
  }
  nearestSc(x, z) {
    const sc = this.sc; const c = this._cands(sc.grid, x, z, this._tmp2 || (this._tmp2 = []));
    let best = -1, bd = 1e18; for (const i of c) { const d = (sc.p[i][0] - x) ** 2 + (sc.p[i][1] - z) ** 2; if (d < bd) { bd = d; best = i; } }
    if (best < 0) return null;
    let bi = best, bt = 0, bdd = 1e18;
    for (const j of [Math.max(0, best - 1), best]) {
      if (j + 1 >= sc.n) continue; const a = sc.p[j], b = sc.p[j + 1]; const ex = b[0] - a[0], ez = b[1] - a[1]; const l2 = ex * ex + ez * ez; let t = ((x - a[0]) * ex + (z - a[1]) * ez) / l2; t = Math.max(0, Math.min(1, t));
      const px = a[0] + ex * t, pz = a[1] + ez * t; const d = (px - x) ** 2 + (pz - z) ** 2; if (d < bdd) { bdd = d; bi = j; bt = t; }
    }
    const j2 = Math.min(sc.n - 1, bi + 1); const a = sc.p[bi], b = sc.p[j2]; const px = a[0] + (b[0] - a[0]) * bt, pz = a[1] + (b[1] - a[1]) * bt;
    const tx = sc.tx[bi], tz = sc.tz[bi]; const nx = tz, nz = -tx; const lat = (x - px) * nx + (z - pz) * nz;
    const u = (bi + bt) / (sc.n - 1);
    return { u, lat, d: Math.sqrt(bdd), tx, tz, nx, nz, px, pz, i: bi };
  }
  // Full query: where is this point relative to the track?
  query(x, z, hint = -1, out = {}) {
    const m = hint >= 0 ? this.nearestWindow(x, z, hint, 45) : this.nearestGlobal(x, z);
    out.m = m; out.s = m.s; out.lat = m.lat; out.idx = m.i; out.surface = 'road'; out.wall = false; out.sc = null; out.zone = null;
    const al = Math.abs(m.lat); let inSc = false;
    if (this.sc) {
      const q = this.nearestSc(x, z);
      if (q && Math.abs(q.lat) < this.sc.half + 0.5 && q.u >= 0 && q.u <= 1 && (al > this.limit - 2 || Math.abs(q.lat) < this.sc.half)) {
        // inside shortcut corridor (also while still on the main road near entry: prefer main surface if on road)
        if (al > this.halfW) { inSc = true; out.sc = q; out.s = this.sc.s1 + (this.sc.s2 - this.sc.s1) * q.u; out.surface = this.sc.surf; }
      }
    }
    if (!inSc) {
      if (al <= this.halfW) out.surface = 'road'; else if (al <= this.limit) out.surface = 'off'; else { out.surface = 'off'; out.wall = true; }
      // shortcut walls: allowed if within shortcut corridor
      if (out.wall && this.sc) { const q = this.nearestSc(x, z); if (q && Math.abs(q.lat) < this.sc.half + 0.5 && q.u > -0.02 && q.u < 1.02) { out.wall = false; out.sc = q; out.surface = this.sc.surf; } }
    } else if (Math.abs(out.sc.lat) > this.sc.half) out.wall = true;
    // zones such as ice
    for (const z0 of this.zones) if (m.s >= z0.s0 && m.s <= z0.s1 && (!z0.onlyRoad || out.surface === 'road') && (z0.lat === undefined || (m.lat >= z0.lat[0] && m.lat <= z0.lat[1]))) { out.zone = z0; if (z0.surface) out.surface = z0.surface; }
    return out;
  }
  // Constrain a point to the corridor; returns {x,z,nx,nz,pen} if pushed.
  constrain(x, z, hint = -1) {
    const m = hint >= 0 ? this.nearestWindow(x, z, hint, 45) : this.nearestGlobal(x, z);
    const al = Math.abs(m.lat); let pen = al - this.limit; let nx = -Math.sign(m.lat) * m.nx, nz = -Math.sign(m.lat) * m.nz;
    if (this.sc) {
      const q = this.nearestSc(x, z);
      if (q && q.u > -0.02 && q.u < 1.02) {
        const penSc = Math.abs(q.lat) - this.sc.half;
        if (penSc < pen || (al > this.halfW && penSc < 0)) { // shortcut region is closer/allowed
          if (penSc <= 0 && pen > 0) return null; pen = penSc; nx = -Math.sign(q.lat) * q.nx; nz = -Math.sign(q.lat) * q.nz;
        }
      }
    }
    if (pen <= 0) return null;
    return { x: x + nx * pen, z: z + nz * pen, nx, nz, pen };
  }
  at(s, lat = 0, out = {}) {
    s = ((s % this.length) + this.length) % this.length; const f = s / this.step; const i = Math.floor(f) % this.N, t = f - Math.floor(f), j = wrap(i + 1, this.N);
    const px = this.p[i][0] + (this.p[j][0] - this.p[i][0]) * t, pz = this.p[i][1] + (this.p[j][1] - this.p[i][1]) * t;
    let tx = this.tx[i] * (1 - t) + this.tx[j] * t, tz = this.tz[i] * (1 - t) + this.tz[j] * t; const l = Math.hypot(tx, tz) || 1; tx /= l; tz /= l;
    out.x = px + tz * lat; out.z = pz - tx * lat; out.tx = tx; out.tz = tz; out.heading = Math.atan2(tx, tz); out.k = this.k[i] * (1 - t) + this.k[j] * t; out.i = i; return out;
  }
  _buildRacingLine() {
    const N = this.N, lim = this.halfW - 3.2; const o = new Float32Array(N);
    // minimum-curvature style relaxation on lateral offsets
    for (let it = 0; it < 400; it++) {
      for (let i = 0; i < N; i++) {
        const a = wrap(i - 3, N), b = wrap(i + 3, N);
        const ax = this.p[a][0] + this.tz[a] * o[a], az = this.p[a][1] - this.tx[a] * o[a]; const bx = this.p[b][0] + this.tz[b] * o[b], bz = this.p[b][1] - this.tx[b] * o[b];
        const mx = (ax + bx) / 2, mz = (az + bz) / 2; const nx = this.tz[i], nz = -this.tx[i];
        let target = (mx - this.p[i][0]) * nx + (mz - this.p[i][1]) * nz; target = Math.max(-lim, Math.min(lim, target));
        o[i] += (target - o[i]) * 0.4;
      }
    }
    this.lineOff = o;
    // speed profile (units m/s) using lateral accel limit; backward braking pass
    const aLat = 24, vmax = 60, brake = 22; const v = new Float32Array(N);
    for (let i = 0; i < N; i++) { const kk = Math.abs(this._lineK(i)); v[i] = Math.min(vmax, kk > 1e-4 ? Math.sqrt(aLat / kk) : vmax); }
    for (let pass = 0; pass < 2; pass++) for (let i = N * 2; i >= 0; i--) { const a = wrap(i, N), b = wrap(i + 1, N); const lim2 = Math.sqrt(v[b] * v[b] + 2 * brake * this.step); if (v[a] > lim2) v[a] = lim2; }
    this.lineV = v;
  }
  _lineK(i) { // curvature of the offset line
    const N = this.N, a = wrap(i - 2, N), b = wrap(i + 2, N); const P = (j) => [this.p[j][0] + this.tz[j] * this.lineOff[j], this.p[j][1] - this.tx[j] * this.lineOff[j]];
    const A = P(a), B = P(i), C = P(b); const ab = Math.hypot(B[0] - A[0], B[1] - A[1]), bc = Math.hypot(C[0] - B[0], C[1] - B[1]), ac = Math.hypot(C[0] - A[0], C[1] - A[1]);
    const area = Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0])) / 2; const den = ab * bc * ac; return den > 1e-6 ? -4 * area / den * Math.sign((B[0] - A[0]) * (C[1] - B[1]) - (B[1] - A[1]) * (C[0] - B[0])) : 0;
  }
  linePoint(s, extraLat = 0, out = {}) {
    s = ((s % this.length) + this.length) % this.length; const f = s / this.step; const i = Math.floor(f) % this.N, t = f - Math.floor(f), j = wrap(i + 1, this.N);
    const lo = this.lineOff[i] * (1 - t) + this.lineOff[j] * t + extraLat; return this.at(s, lo, out);
  }
  lineSpeed(s) { const f = (((s % this.length) + this.length) % this.length) / this.step; const i = Math.floor(f) % this.N; return this.lineV[i]; }
  lineCurv(s) { const f = (((s % this.length) + this.length) % this.length) / this.step; const i = Math.floor(f) % this.N; return this._lineK(i); }
  minSeparation() { // sanity: min distance between non-neighbouring samples (corridor overlap check)
    let m = 1e9, at = null; const N = this.N;
    for (let i = 0; i < N; i += 2) for (let j = i + 1; j < N; j += 2) { const ds = Math.min(j - i, N - (j - i)) * this.step; if (ds < 120) continue; const d = Math.hypot(this.p[i][0] - this.p[j][0], this.p[i][1] - this.p[j][1]); if (d < m) { m = d; at = [i, j]; } }
    return { min: m, at };
  }
}
