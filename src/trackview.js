// Renders a TrackCore: sky, ground, road, curbs, walls, themed props (instanced), landmarks, boxes, coins, pads.
import * as THREE from 'three';
import { Merger, MODEL_G as G, addRim } from './models.js';
const TAU = Math.PI * 2;
function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const hex = (c) => new THREE.Color(c);
export const THEMES = {
  meadow: { skyTop: 0x2f8fff, skyHor: 0xd4efff, sun: 0xfff1c9, sunDir: [0.5, 0.55, 0.3], ground: 0x6cc24a, off: 0x93b04a, road: 0x4f535c, curb1: 0xe8403a, curb2: 0xffffff, wall1: 0xf2c94c, wall2: 0xd49a2a, fog: 0xcfeaff, fogD: 0.0016, hemiSky: 0xcfe8ff, hemiGnd: 0x6b9a4a, exposure: 1.0 },
  harbor: { skyTop: 0x34509e, skyHor: 0xffb88a, sun: 0xffc48a, sunDir: [-0.6, 0.28, 0.5], ground: 0x59677a, off: 0x7a7b78, road: 0x3b4352, curb1: 0xffa21a, curb2: 0x1d2a44, wall1: 0xe5533c, wall2: 0x2f90a8, fog: 0xf2b08c, fogD: 0.0017, hemiSky: 0xffd4b0, hemiGnd: 0x3c4a66, exposure: 1.02 },
  mesa: { skyTop: 0xff9b4a, skyHor: 0xffe7b0, sun: 0xfff0c0, sunDir: [0.3, 0.7, -0.4], ground: 0xe0a65a, off: 0xc98648, road: 0x8a6a52, curb1: 0xb4442c, curb2: 0xf5dfb0, wall1: 0xb4553a, wall2: 0x8f3f2a, fog: 0xffd9a0, fogD: 0.0016, hemiSky: 0xffe0b0, hemiGnd: 0xa86a3a, exposure: 1.05 },
  frost: { skyTop: 0x6aa8f0, skyHor: 0xeaf5ff, sun: 0xf4f9ff, sunDir: [0.2, 0.4, 0.7], ground: 0xeef6ff, off: 0xc9dff2, road: 0x6b7a8c, curb1: 0x2aa6d6, curb2: 0xffffff, wall1: 0xbfe6ff, wall2: 0x8cc8f0, fog: 0xe0eefb, fogD: 0.0018, hemiSky: 0xe6f3ff, hemiGnd: 0x9ab4cf, exposure: 1.0 },
};
function canvasTex(w, h, fn, repeat = true) { const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); fn(g, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; } return t; }
function noise(g, w, h, n, a, cols) { const r = rng(7); for (let i = 0; i < n; i++) { g.fillStyle = cols[(r() * cols.length) | 0]; g.globalAlpha = a * (0.4 + r() * 0.6); const s = 1 + r() * 3; g.fillRect(r() * w, r() * h, s, s); } g.globalAlpha = 1; }
function groundTex(th) {
  return canvasTex(512, 512, (g, w, h) => {
    const base = hex(th.ground); g.fillStyle = '#' + base.getHexString(); g.fillRect(0, 0, w, h); const r = rng(11);
    for (let i = 0; i < 260; i++) { const c = base.clone().offsetHSL((r() - 0.5) * 0.03, (r() - 0.5) * 0.06, (r() - 0.5) * 0.08); g.fillStyle = '#' + c.getHexString(); g.globalAlpha = 0.35; const rad = 10 + r() * 38; g.beginPath(); g.arc(r() * w, r() * h, rad, 0, TAU); g.fill(); }
    g.globalAlpha = 1; noise(g, w, h, 2500, 0.35, ['#ffffff', '#000000', '#' + base.clone().offsetHSL(0, 0.1, -0.1).getHexString()]);
  });
}
function roadTex(th, id) {
  return canvasTex(256, 512, (g, w, h) => {
    const base = hex(th.road); g.fillStyle = '#' + base.getHexString(); g.fillRect(0, 0, w, h); noise(g, w, h, 5000, 0.28, ['#ffffff', '#000000', '#888888']);
    // soft wheel ruts
    g.globalAlpha = 0.12; g.fillStyle = '#000'; g.fillRect(w * 0.28, 0, w * 0.1, h); g.fillRect(w * 0.62, 0, w * 0.1, h); g.globalAlpha = 1;
    g.fillStyle = 'rgba(255,255,255,0.9)'; g.fillRect(w * 0.035, 0, 6, h); g.fillRect(w * 0.965 - 6, 0, 6, h);
    g.fillStyle = id === 'mesa' ? 'rgba(255,240,200,0.8)' : id === 'harbor' ? 'rgba(255,200,80,0.85)' : 'rgba(255,255,255,0.8)'; for (let y = 0; y < h; y += 128) g.fillRect(w / 2 - 3, y + 16, 6, 64);
    if (id === 'harbor') { g.globalAlpha = 0.07; g.fillStyle = '#000'; for (let y = 0; y < h; y += 32) g.fillRect(0, y, w, 2); g.globalAlpha = 1; }
  });
}
function checkerTex() { return canvasTex(128, 32, (g, w, h) => { const n = 16; for (let y = 0; y < 4; y++) for (let x = 0; x < n; x++) { g.fillStyle = (x + y) % 2 ? '#101010' : '#f5f5f5'; g.fillRect(x * w / n, y * h / 4, w / n, h / 4); } }, false); }
function textTex(txt, w = 512, h = 128, bg = '#101827', fg = '#ffffff', accent = '#ffd23f') { return canvasTex(w, h, (g) => { const gr = g.createLinearGradient(0, 0, w, 0); gr.addColorStop(0, bg); gr.addColorStop(1, bg); g.fillStyle = gr; g.fillRect(0, 0, w, h); g.fillStyle = accent; g.fillRect(0, 0, w, 8); g.fillRect(0, h - 8, w, 8); g.fillStyle = fg; g.font = '900 ' + (h * 0.5) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, w / 2, h / 2 + 4); }, false); }
function padTex() { return canvasTex(128, 256, (g, w, h) => { g.fillStyle = '#0b2a52'; g.fillRect(0, 0, w, h); for (let i = 0; i < 3; i++) { const y = i * 85 + 10; g.fillStyle = i % 2 ? '#38e1ff' : '#ffd23f'; g.beginPath(); g.moveTo(w * 0.1, y + 70); g.lineTo(w * 0.5, y); g.lineTo(w * 0.9, y + 70); g.lineTo(w * 0.9, y + 90); g.lineTo(w * 0.5, y + 28); g.lineTo(w * 0.1, y + 90); g.fill(); } }); }
function boxTex() { return canvasTex(128, 128, (g, w, h) => { const gr = g.createLinearGradient(0, 0, w, h); ['#ff4d6d', '#ffd23f', '#37e08a', '#35a7ff', '#b66bff'].forEach((c, i, a) => gr.addColorStop(i / (a.length - 1), c)); g.fillStyle = gr; g.fillRect(0, 0, w, h); g.fillStyle = 'rgba(255,255,255,0.28)'; g.fillRect(0, 0, w, 10); g.fillRect(0, 0, 10, h); g.fillRect(w - 10, 0, 10, h); g.fillRect(0, h - 10, w, 10); g.fillStyle = '#fff'; g.font = '900 96px system-ui'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowColor = '#000a'; g.shadowBlur = 8; g.fillText('?', w / 2, h / 2 + 6); }, false); }

function ribbon(tc, latA, latB, y, vScale, step = 1, color = null) {
  const N = tc.N, rows = []; for (let i = 0; i <= N; i += step) rows.push(i % N); if (rows[rows.length - 1] !== 0 || rows.length < 2) rows.push(0);
  const pos = [], uv = [], idx = [], col = []; let k = 0; const c = color ? hex(color) : null;
  rows.forEach((i, r) => { const px = tc.p[i][0], pz = tc.p[i][1], nx = tc.tz[i], nz = -tc.tx[i]; const v = (r === rows.length - 1 ? tc.length : i * tc.step) / vScale; pos.push(px + nx * latA, y, pz + nz * latA, px + nx * latB, y, pz + nz * latB); uv.push(0, v, 1, v); if (c) col.push(c.r, c.g, c.b, c.r, c.g, c.b); if (r > 0) { const a = (r - 1) * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); } });
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); if (c) g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); g.setIndex(idx); g.computeVertexNormals(); // winding fixed by flipping if needed
  const n = g.attributes.normal; if (n.getY(0) < 0) { const ix = g.index.array; for (let i = 0; i < ix.length; i += 3) { const t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; } g.computeVertexNormals(); } return g;
}
function pathStrip(pts, tx, tz, latA, latB, y, vScale) { const pos = [], uv = [], idx = []; pts.forEach((p, i) => { const nx = tz[i], nz = -tx[i]; pos.push(p[0] + nx * latA, y, p[1] + nz * latA, p[0] + nx * latB, y, p[1] + nz * latB); const v = i * 2 / vScale; uv.push(0, v, 1, v); if (i > 0) { const a = (i - 1) * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); } }); const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals(); if (g.attributes.normal.getY(0) < 0) { const ix = g.index.array; for (let i = 0; i < ix.length; i += 3) { const t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; } g.computeVertexNormals(); } return g; }
// vertical wall strip along an offset line with per-segment alternating colours
function wallStrip(tc, lat, h, c1, c2, skip, seg = 6, thick = 0.9) {
  const pos = [], col = [], idx = []; const N = tc.N; const a = hex(c1), b = hex(c2); let n = 0;
  const side = Math.sign(lat);
  for (let i = 0; i < N; i++) {
    const j = (i + 1) % N; const P = (q, l) => [tc.p[q][0] + tc.tz[q] * l, tc.p[q][1] - tc.tx[q] * l];
    const A = P(i, lat), B = P(j, lat); if (skip && (skip(A[0], A[1]) || skip(B[0], B[1]))) continue;
    const A2 = P(i, lat + side * thick), B2 = P(j, lat + side * thick); const c = (Math.floor(i * tc.step / seg) % 2) ? a : b; const dark = c.clone().multiplyScalar(0.72);
    const quad = (p0, p1, y0, y1, cc) => { pos.push(p0[0], y0, p0[1], p1[0], y0, p1[1], p1[0], y1, p1[1], p0[0], y1, p0[1]); for (let q = 0; q < 4; q++) col.push(cc.r, cc.g, cc.b); idx.push(n, n + 1, n + 2, n, n + 2, n + 3, n, n + 2, n + 1, n, n + 3, n + 2); n += 4; };
    quad(A, B, 0, h, c); quad(A2, B2, 0, h, dark); quad(A, B, h, h, c); // inner face, outer face
    // top
    pos.push(A[0], h, A[1], B[0], h, B[1], B2[0], h, B2[1], A2[0], h, A2[1]); const tcl = c.clone().multiplyScalar(1.15); for (let q = 0; q < 4; q++) col.push(tcl.r, tcl.g, tcl.b); idx.push(n, n + 1, n + 2, n, n + 2, n + 3, n, n + 2, n + 1, n, n + 3, n + 2); n += 4;
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); g.setIndex(idx); g.computeVertexNormals(); return g;
}
function curbStrip(tc, th, minK) {
  const N = tc.N; const pos = [], col = [], idx = []; let n = 0; const c1 = hex(th.curb1), c2 = hex(th.curb2);
  for (const side of [-1, 1]) for (let i = 0; i < N; i++) {
    const j = (i + 1) % N; const kk = Math.abs(tc.k[i]); if (kk < minK) continue; // only on corners
    const inner = (tc.k[i] > 0 ? 1 : -1); if (side !== inner && kk < minK * 1.8) continue;
    const P = (q, l) => [tc.p[q][0] + tc.tz[q] * l, tc.p[q][1] - tc.tx[q] * l]; const l0 = side * tc.halfW, l1 = side * (tc.halfW + 1.3);
    const A = P(i, l0), B = P(j, l0), C = P(j, l1), D = P(i, l1); const c = (Math.floor(i * tc.step / 3) % 2) ? c1 : c2;
    pos.push(A[0], 0.07, A[1], B[0], 0.07, B[1], C[0], 0.07, C[1], D[0], 0.07, D[1]); for (let q = 0; q < 4; q++) col.push(c.r, c.g, c.b); idx.push(n, n + 1, n + 2, n, n + 2, n + 3, n, n + 2, n + 1, n, n + 3, n + 2); n += 4;
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); g.setIndex(idx); g.computeVertexNormals(); return g;
}
const std = (o) => new THREE.MeshStandardMaterial(o);

// ---------------------------------------------------------------- themed prop builders (return merged geometry w/ vertex colors)
function mergeToGeo(M) { const m = M.build(new THREE.MeshBasicMaterial()); return m ? m.geometry : null; }
const LP = { sph: new THREE.SphereGeometry(1, 9, 6), cyl: new THREE.CylinderGeometry(1, 1, 1, 9, 1), cone: new THREE.ConeGeometry(1, 1, 9, 1), cap: new THREE.CapsuleGeometry(1, 1, 2, 7) };
const PROPS = {
  meadow: {
    tree: () => { const M = new Merger(); M.add(LP.cyl, { p: [0, 1.2, 0], s: [0.35, 1.2, 0.35], c: 0x7a4a26 }); M.add(LP.sph, { p: [0, 3.4, 0], s: [1.9, 1.7, 1.9], c: 0x3fae44 }); M.add(LP.sph, { p: [0.7, 4.3, 0.2], s: [1.2, 1.1, 1.2], c: 0x58c455 }); return mergeToGeo(M); },
    tree2: () => { const M = new Merger(); M.add(LP.cyl, { p: [0, 1, 0], s: [0.3, 1, 0.3], c: 0x8a5a30 }); M.add(LP.cone, { p: [0, 3.4, 0], s: [1.6, 3, 1.6], c: 0x2e8f4a }); M.add(LP.cone, { p: [0, 4.8, 0], s: [1.1, 2.2, 1.1], c: 0x3da85a }); return mergeToGeo(M); },
    flower: () => { const M = new Merger(); for (let i = 0; i < 5; i++) { const a = i * 1.3; M.add(LP.cyl, { p: [Math.sin(a) * 0.8, 0.3, Math.cos(a) * 0.8], s: [0.04, 0.3, 0.04], c: 0x2f8f3a }); M.add(LP.sph, { p: [Math.sin(a) * 0.8, 0.65, Math.cos(a) * 0.8], s: [0.22, 0.22, 0.22], c: [0xff5d8f, 0xffd23f, 0xffffff, 0xb66bff, 0xff8a3a][i] }); } return mergeToGeo(M); },
    bale: () => { const M = new Merger(); M.add(LP.cyl, { p: [0, 0.6, 0], r: [0, 0, Math.PI / 2], s: [0.6, 0.55, 0.6], c: 0xe8c04a }); return mergeToGeo(M); },
    rock: () => { const M = new Merger(); M.add(LP.sph, { p: [0, 0.4, 0], s: [0.9, 0.55, 0.7], c: 0x9aa3a8 }); return mergeToGeo(M); },
  },
  harbor: {
    lamp: () => { const M = new Merger(); M.add(LP.cyl, { p: [0, 3, 0], s: [0.1, 3, 0.1], c: 0x2b3446 }); M.add(LP.sph, { p: [0, 6.2, 0], s: [0.45, 0.45, 0.45], c: 0xffe39a }); M.add(G.box, { p: [0, 0.2, 0], s: [0.5, 0.4, 0.5], c: 0x2b3446 }); return mergeToGeo(M); },
    stack: () => { const M = new Merger(); const cs = [0xe5533c, 0x2f90a8, 0xf2b53a, 0x3a5fb0, 0x6fb86a]; for (let i = 0; i < 6; i++) { const lv = (i / 3) | 0; M.add(G.sbox, { p: [(i % 3 - 1) * 2.7, 1.3 + lv * 2.6, 0], s: [2.6, 2.5, 6], c: cs[(i * 7 + lv * 3) % 5] }); } return mergeToGeo(M); },
    crate: () => { const M = new Merger(); M.add(G.box, { p: [0, 0.8, 0], s: [1.6, 1.6, 1.6], c: 0xb88a52 }); M.add(G.box, { p: [1.3, 0.5, 0.6], s: [1, 1, 1], c: 0xa87a42 }); return mergeToGeo(M); },
    bollard: () => { const M = new Merger(); M.add(LP.cyl, { p: [0, 0.5, 0], s: [0.32, 0.5, 0.32], c: 0xffc83a }); return mergeToGeo(M); },
    bldg: () => { const M = new Merger(); M.add(G.sbox, { p: [0, 7, 0], s: [8, 14, 8], c: 0x3a4a68 }); for (let y = 0; y < 5; y++) for (let x = -1; x <= 1; x++) M.add(G.sbox, { p: [x * 2.2, 3 + y * 2.4, 4.05], s: [1.2, 1.2, 0.05], c: (x + y) % 3 ? 0xffd88a : 0x7a8aa8 }); return mergeToGeo(M); },
    boat: () => { const M = new Merger(); M.add(G.box, { p: [0, 0.3, 0], s: [2, 0.8, 6], c: 0xf5f0e6 }); M.add(LP.cyl, { p: [0, 3.5, 0], s: [0.08, 3.2, 0.08], c: 0xcfd6df }); M.add(LP.cone, { p: [0, 3.2, 0.4], s: [1.4, 2.8, 0.1], c: 0xff6b5a }); return mergeToGeo(M); },
  },
  mesa: {
    pillar: () => { const M = new Merger(); const cs = [0xc2623e, 0xd97f4b, 0xe6a05a, 0xb4553a]; for (let i = 0; i < 4; i++) M.add(LP.cyl, { p: [0, 5 + i * 5, 0], s: [8 - i * 0.6 + (i % 2) * 0.8, 5, 8 - i * 0.6 + (i % 2) * 0.8], c: cs[i] }); M.add(LP.cyl, { p: [0, 20.4, 0], s: [8.2, 0.5, 8.2], c: 0xe6c27a }); return mergeToGeo(M); },
    cactus: () => { const M = new Merger(); M.add(LP.cap, { p: [0, 1.6, 0], s: [0.45, 1.5, 0.45], c: 0x3f9a52 }); M.add(LP.cap, { p: [0.8, 2.0, 0], s: [0.28, 0.6, 0.28], c: 0x3f9a52 }); M.add(LP.cyl, { p: [0.4, 1.5, 0], r: [0, 0, Math.PI / 2], s: [0.2, 0.4, 0.2], c: 0x3f9a52 }); M.add(LP.cap, { p: [-0.8, 1.7, 0], s: [0.26, 0.5, 0.26], c: 0x3f9a52 }); M.add(LP.cyl, { p: [-0.4, 1.3, 0], r: [0, 0, Math.PI / 2], s: [0.18, 0.4, 0.18], c: 0x3f9a52 }); return mergeToGeo(M); },
    rock: () => { const M = new Merger(); M.add(LP.sph, { p: [0, 0.8, 0], s: [1.8, 1.1, 1.4], c: 0xb4553a }); M.add(LP.sph, { p: [1.2, 0.5, 0.4], s: [1, 0.7, 0.9], c: 0xc2623e }); return mergeToGeo(M); },
    dune: () => { const M = new Merger(); M.add(LP.sph, { p: [0, 0, 0], s: [9, 2.4, 6], c: 0xe9b768 }); return mergeToGeo(M); },
    bones: () => { const M = new Merger(); M.add(LP.cap, { p: [0, 0.3, 0], r: [0, 0, Math.PI / 2], s: [0.12, 1.2, 0.12], c: 0xf1e9d6 }); M.add(LP.sph, { p: [1.3, 0.3, 0], s: [0.3, 0.3, 0.3], c: 0xf1e9d6 }); return mergeToGeo(M); },
  },
  frost: {
    pine: () => { const M = new Merger(); M.add(LP.cyl, { p: [0, 0.8, 0], s: [0.3, 0.8, 0.3], c: 0x6b4a2c }); for (let i = 0; i < 4; i++) { M.add(LP.cone, { p: [0, 2.2 + i * 1.4, 0], s: [2.0 - i * 0.4, 2.4, 2.0 - i * 0.4], c: 0x2a7a58 }); M.add(LP.cone, { p: [0, 2.7 + i * 1.4, 0], s: [1.5 - i * 0.32, 1.5, 1.5 - i * 0.32], c: 0xf2f9ff }); } return mergeToGeo(M); },
    crystal: () => { const M = new Merger(); M.add(LP.cone, { p: [0, 2.2, 0], s: [0.8, 4.4, 0.8], c: 0x9fdcff }); M.add(LP.cone, { p: [1, 1.4, 0.3], r: [0, 0, -0.3], s: [0.6, 2.8, 0.6], c: 0xbfeaff }); M.add(LP.cone, { p: [-0.9, 1.1, -0.2], r: [0, 0, 0.35], s: [0.5, 2.2, 0.5], c: 0x7fcaf5 }); return mergeToGeo(M); },
    mound: () => { const M = new Merger(); M.add(LP.sph, { p: [0, 0, 0], s: [3.5, 1.4, 3], c: 0xffffff }); return mergeToGeo(M); },
    rock: () => { const M = new Merger(); M.add(LP.sph, { p: [0, 0.5, 0], s: [1.3, 0.8, 1.0], c: 0x7b8794 }); M.add(LP.sph, { p: [0, 1.0, 0], s: [1.0, 0.4, 0.8], c: 0xffffff }); return mergeToGeo(M); },
    igloo: () => { const M = new Merger(); M.add(LP.sph, { p: [0, 0, 0], s: [2.4, 1.8, 2.4], c: 0xf4faff }); M.add(LP.cyl, { p: [0, 0.4, 2.3], r: [Math.PI / 2, 0, 0], s: [0.7, 0.8, 0.7], c: 0xdcecf8 }); return mergeToGeo(M); },
  },
};
const SCATTER = { // [prop, count, minOff, maxOff, scaleMin, scaleMax, yOffset]
  meadow: [['tree', 150, 6, 60, 0.9, 1.7], ['tree2', 90, 8, 70, 0.9, 1.6], ['flower', 260, 1.5, 22, 0.8, 1.6], ['bale', 40, 2, 14, 0.9, 1.2], ['rock', 40, 5, 50, 0.6, 1.5]],
  harbor: [['lamp', 90, 2, 5, 1, 1], ['stack', 26, 12, 55, 0.9, 1.3], ['crate', 60, 3, 25, 0.8, 1.3], ['bollard', 80, 1.5, 3.5, 1, 1.1], ['bldg', 22, 60, 130, 0.8, 1.7]],
  mesa: [['pillar', 28, 22, 140, 0.7, 1.9], ['cactus', 120, 4, 60, 0.8, 1.7], ['rock', 90, 3, 70, 0.7, 1.9], ['dune', 22, 25, 90, 0.8, 1.7], ['bones', 12, 3, 20, 1, 1.4]],
  frost: [['pine', 210, 5, 75, 0.9, 1.8], ['crystal', 50, 4, 45, 0.8, 1.8], ['mound', 100, 3, 40, 0.8, 1.6], ['rock', 50, 5, 40, 0.8, 1.8], ['igloo', 4, 16, 40, 1, 1.2]],
};

export class TrackView {
  constructor(tc, scene, renderer, opts = {}) {
    this.tc = tc; this.scene = scene; this.group = new THREE.Group(); scene.add(this.group); this.th = THEMES[tc.theme]; this.anim = []; this.hq = !!opts.hq; this.opts = opts; this.disposables = []; this.tex = {};
    const th = this.th; scene.background = new THREE.Color(th.fog); scene.fog = new THREE.FogExp2(th.fog, th.fogD);
    this._sky(renderer); this._lights(); this._ground(); this._road(); if (opts.hqTex) this._applyHQ(opts.hqTex); this._curbsWalls(); this._shortcut(); this._startLine(); this._props(); this._landmark(); this._boxesCoinsPads(); this._water();
  }
  add(o) { this.group.add(o); return o; }
  _sky(renderer) {
    const th = this.th; const sd = new THREE.Vector3(...th.sunDir).normalize();
    const mat = new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false, fog: false, uniforms: { top: { value: hex(th.skyTop) }, hor: { value: hex(th.skyHor) }, sunDir: { value: sd }, sunCol: { value: hex(th.sun) }, time: { value: 0 } },
      vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); gl_Position.z = gl_Position.w; }',
      fragmentShader: `varying vec3 vD; uniform vec3 top,hor,sunCol,sunDir; uniform float time;
      float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
      void main(){ vec3 d=normalize(vD); float t=clamp(d.y,0.0,1.0); vec3 c=mix(hor,top,pow(t,0.55));
        float s=max(dot(d,sunDir),0.0); c+=sunCol*(pow(s,600.0)*3.0+pow(s,12.0)*0.35);
        if(d.y>0.02){ vec2 uv=d.xz/(d.y+0.25)*2.2+vec2(time*0.01,0.0); float cl=n(uv)*0.55+n(uv*2.1)*0.3+n(uv*4.3)*0.15; cl=smoothstep(0.52,0.85,cl); c=mix(c,mix(vec3(1.0),hor,0.3),cl*0.75*smoothstep(0.02,0.25,d.y)); }
        gl_FragColor=vec4(c,1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }` });
    this.skyMat = mat; this.sky = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), mat); this.sky.scale.setScalar(1500); this.sky.renderOrder = -10; this.sky.frustumCulled = false; this.group.add(this.sky);
    // environment lighting from the same sky
    const pm = new THREE.PMREMGenerator(renderer); const es = new THREE.Scene(); const em = mat.clone(); es.add(new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), em)); this.envTex = pm.fromScene(es, 0.02).texture; this.scene.environment = this.envTex; if (this.opts.hqEnv) { this.envTex = pm.fromEquirectangular(this.opts.hqEnv).texture; this.scene.environment = this.envTex; this.hqEnvApplied = true; } pm.dispose();
  }
  _lights() {
    const th = this.th; this.hemi = new THREE.HemisphereLight(th.hemiSky, th.hemiGnd, 1.15); this.sun = new THREE.DirectionalLight(th.sun, 2.6); const sd = new THREE.Vector3(...th.sunDir).normalize(); this.sun.position.copy(sd).multiplyScalar(100);
    this.rimL = new THREE.DirectionalLight(0xbfe0ff, 0.9); this.rimL.position.copy(sd).multiplyScalar(-60).add(new THREE.Vector3(0, 40, 0)); this.add(this.hemi); this.add(this.sun); this.add(this.rimL);
  }
  _ground() {
    const th = this.th, tc = this.tc; const t = groundTex(th); t.repeat.set(120, 120); this.tex.ground = t;
    const m = std({ map: t, roughness: 0.95, metalness: 0, color: 0xffffff }); this.groundMat = m;
    const g = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000), m); g.rotation.x = -Math.PI / 2; g.position.y = -0.02; this.add(g); this.groundMesh = g;
    // off-road band
    const offMat = std({ color: th.off, roughness: 1, metalness: 0 }); const tOff = groundTex({ ground: th.off }); tOff.repeat.set(1, 1); offMat.map = tOff;
    this.add(new THREE.Mesh(ribbon(tc, -tc.limit, -tc.halfW, 0.01, 24), offMat)); this.add(new THREE.Mesh(ribbon(tc, tc.halfW, tc.limit, 0.01, 24), offMat)); tOff.wrapS = tOff.wrapT = THREE.RepeatWrapping;
    offMat.map.repeat.set(0.6, 1); offMat.map.needsUpdate = true;
  }
  _applyHQ(h) { // swap the 512px canvas textures for 2K/4K PBR sets (albedo + normal + roughness)
    const g = h.ground, r = h.road; if (g) { g.albedo.repeat.set(120, 120); g.normal.repeat.set(120, 120); g.rough.repeat.set(120, 120); const m = this.groundMat; m.map = g.albedo; m.normalMap = g.normal; m.normalScale = new THREE.Vector2(0.9, 0.9); m.roughnessMap = g.rough; m.roughness = 1; m.needsUpdate = true; this.tex.ground = g.albedo; }
    if (r) { const m = this.roadMat; m.map = r.albedo; m.normalMap = r.normal; m.normalScale = new THREE.Vector2(0.8, 0.8); m.roughnessMap = r.rough; m.roughness = 1; m.needsUpdate = true; this.tex.road = r.albedo; }
    this.hqApplied = true; for (const set of [g, r]) if (set) for (const k in set) this.disposables.push(set[k]);
  }
  _road() {
    const th = this.th, tc = this.tc; const rt = roadTex(th, tc.id); this.tex.road = rt;
    this.roadMat = std({ map: rt, roughness: 0.82, metalness: 0.0, envMapIntensity: 0.5 }); const road = new THREE.Mesh(ribbon(tc, -tc.halfW, tc.halfW, 0.03, 12, 1), this.roadMat); this.add(road);
  }
  _curbsWalls() {
    const th = this.th, tc = this.tc;
    this.add(new THREE.Mesh(curbStrip(tc, th, 0.0045), std({ vertexColors: true, roughness: 0.7 })));
    const scNear = tc.sc ? (x, z) => { const q = tc.nearestSc(x, z); return q && q.d < tc.sc.half + 6 && q.u > -0.05 && q.u < 1.05 && (q.u < 0.12 || q.u > 0.88); } : null;
    const wm = std({ vertexColors: true, roughness: 0.8, metalness: 0.05, envMapIntensity: 0.6, side: THREE.DoubleSide }); const h = tc.theme === 'mesa' ? 3.2 : tc.theme === 'frost' ? 1.6 : tc.theme === 'harbor' ? 1.4 : 1.1;
    this.add(new THREE.Mesh(wallStrip(tc, tc.limit, h, th.wall1, th.wall2, scNear, 6, tc.theme === 'mesa' ? 6 : 1.2), wm)); this.add(new THREE.Mesh(wallStrip(tc, -tc.limit, h, th.wall1, th.wall2, scNear, 6, tc.theme === 'mesa' ? 6 : 1.2), wm));
  }
  _shortcut() {
    const tc = this.tc, sc = tc.sc; if (!sc) return; const th = this.th;
    const col = { rough: 0xb08a5a, sand: 0xe7c27a, ice: 0xbfe6ff }[sc.surf] || 0xb08a5a; const mat = std({ color: col, roughness: sc.surf === 'ice' ? 0.12 : 1, metalness: sc.surf === 'ice' ? 0.2 : 0, envMapIntensity: sc.surf === 'ice' ? 1.6 : 0.4 });
    this.add(new THREE.Mesh(pathStrip(sc.p, sc.tx, sc.tz, -sc.half, sc.half, 0.04, 14), mat));
    // side rails (low) except near main road
    const rail = (side) => { const M = new Merger(); for (let i = 0; i < sc.n; i += 2) { const p = sc.p[i], nx = sc.tz[i], nz = -sc.tx[i]; const x = p[0] + nx * (sc.half + 0.7) * side, z = p[1] + nz * (sc.half + 0.7) * side; const d = tc.nearestGlobal(x, z); if (d.d < tc.limit + 2.5) continue; M.add(G.cyl, { p: [x, 0.5, z], s: [0.35, 0.5, 0.35], c: side > 0 ? th.wall1 : th.wall2 }); M.add(G.cyl, { p: [x, 1.05, z], s: [0.18, 0.18, 0.18], c: 0xffffff }); } return M.build(std({ vertexColors: true, roughness: 0.7 })); };
    const r1 = rail(1), r2 = rail(-1); if (r1) this.add(r1); if (r2) this.add(r2);
    // entrance arch
    const e = sc.p[3], tx = sc.tx[3], tz = sc.tz[3]; const sign = new THREE.Mesh(new THREE.PlaneGeometry(10, 2.5), new THREE.MeshBasicMaterial({ map: textTex('SHORTCUT', 512, 128, '#14213d', '#ffd23f', '#ff4d6d'), toneMapped: false, side: THREE.DoubleSide })); sign.position.set(e[0], 7.2, e[1]); sign.rotation.y = Math.atan2(tx, tz) + Math.PI / 2; this.add(sign);
    const post = new Merger(); for (const s of [-1, 1]) post.add(G.cyl, { p: [e[0] + tz * s * 6.4, 3.4, e[1] - tx * s * 6.4], s: [0.35, 3.4, 0.35], c: 0xffd23f }); const pm = post.build(std({ vertexColors: true, roughness: 0.5 })); if (pm) this.add(pm);
    const arr = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 5), new THREE.MeshBasicMaterial({ map: padTex(), toneMapped: false })); arr.rotation.x = -Math.PI / 2; arr.position.set(e[0], 0.09, e[1]); arr.rotation.z = -Math.atan2(tx, tz) + Math.PI; this.add(arr);
  }
  _startLine() {
    const tc = this.tc, th = this.th; const a = {}; tc.at(0, 0, a); const ck = checkerTex(); ck.wrapS = ck.wrapT = THREE.ClampToEdgeWrapping;
    const line = new THREE.Mesh(new THREE.PlaneGeometry(tc.width, 3), new THREE.MeshBasicMaterial({ map: ck, toneMapped: false })); line.rotation.x = -Math.PI / 2; line.rotation.z = -a.heading; line.position.set(a.x, 0.08, a.z); this.add(line);
    // gantry
    const M = new Merger(); const nx = a.tz, nz = -a.tx; for (const s of [-1, 1]) M.add(G.box, { p: [a.x + nx * s * (tc.halfW + 1.2), 3.6, a.z + nz * s * (tc.halfW + 1.2)], s: [1.1, 7.2, 1.1], c: 0x2b3446 }); M.add(G.box, { p: [a.x, 7.4, a.z], r: [0, a.heading, 0], s: [tc.width + 3.6, 1.2, 1.1], c: 0x2b3446 }); const gm = M.build(std({ vertexColors: true, roughness: 0.4, metalness: 0.5 })); this.add(gm);
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(tc.width + 1, 3.2), new THREE.MeshBasicMaterial({ map: textTex(tc.meta.name.toUpperCase(), 1024, 200, '#0e1a33', '#ffffff', '#ffd23f'), toneMapped: false, side: THREE.DoubleSide })); banner.position.set(a.x, 6.3, a.z); banner.rotation.y = a.heading + Math.PI; this.add(banner);
    // grandstand-like crowd blocks beside the line
    const cm = new Merger(); const rr = rng(5); for (const s of [-1, 1]) for (let k = 0; k < 40; k++) { const row = (k / 10) | 0, col = k % 10; const cc = [0xff4d6d, 0xffd23f, 0x35a7ff, 0x37e08a, 0xb66bff, 0xffffff][(rr() * 6) | 0]; cm.add(LP.sph, { p: [a.x + nx * s * (tc.limit + 3.5 + row * 1.8) + a.tx * (col - 5) * 1.5, 1.4 + row * 1.0, a.z + nz * s * (tc.limit + 3.5 + row * 1.8) + a.tz * (col - 5) * 1.5], s: [0.5, 0.55, 0.5], c: cc }); } for (const s of [-1, 1]) cm.add(G.sbox, { p: [a.x + nx * s * (tc.limit + 8), 0.8, a.z + nz * s * (tc.limit + 8)], r: [0, a.heading, 0], s: [1.2 * 0 + 17, 1.4, 6.5], c: 0x4a5368 });
    const cmm = cm.build(std({ vertexColors: true, roughness: 0.8 })); this.add(cmm); this.crowd = cmm;
  }
  _props() {
    const tc = this.tc, th = this.th, defs = SCATTER[tc.theme], builders = PROPS[tc.theme]; const R = rng(tc.theme.length * 977 + 13);
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, metalness: 0.0, envMapIntensity: 0.6 }); addRim(mat, 0xffffff, 2.4, 0.18);
    const dummy = new THREE.Object3D(); const L = tc.length;
    const totalI = {}; this.propMeshes = [];
    for (const [name, count, mn, mx, s0, s1] of defs) {
      const geo = builders[name](); const pts = []; let tries = 0;
      while (pts.length < count && tries++ < count * 30) {
        const s = R() * L; const side = R() < 0.5 ? -1 : 1; const off = tc.limit + mn + R() * (mx - mn); const a = tc.at(s, side * off, {}); const d = tc.nearestGlobal(a.x, a.z); if (d.d < tc.limit + mn - 0.5) continue;
        if (tc.sc) { const q = tc.nearestSc(a.x, a.z); if (q && q.d < tc.sc.half + 4) continue; }
        pts.push([a.x, a.z, R() * TAU, s0 + R() * (s1 - s0), R()]);
      }
      if (!pts.length) continue; const im = new THREE.InstancedMesh(geo, mat, pts.length);
      pts.forEach((p, i) => { dummy.position.set(p[0], name === 'dune' ? -0.4 : 0, p[1]); dummy.rotation.set(0, p[2], 0); dummy.scale.setScalar(p[3]); if (name === 'dune' || name === 'mound') dummy.scale.set(p[3], p[3] * (0.8 + p[4] * 0.5), p[3]); dummy.updateMatrix(); im.setMatrixAt(i, dummy.matrix); const c = new THREE.Color().setHSL(0, 0, 0.88 + p[4] * 0.2); im.setColorAt(i, c); });
      im.instanceMatrix.needsUpdate = true; if (im.instanceColor) im.instanceColor.needsUpdate = true; im.frustumCulled = false; this.add(im); this.propMeshes.push(im);
      if (name === 'lamp' && tc.theme === 'harbor') { /* glow sprites */ const gl = new THREE.InstancedMesh(new THREE.SphereGeometry(0.9, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffe39a, transparent: true, opacity: 0.35, depthWrite: false, fog: false }), pts.length); pts.forEach((p, i) => { dummy.position.set(p[0], 6.2 * p[3], p[1]); dummy.rotation.set(0, 0, 0); dummy.scale.setScalar(p[3]); dummy.updateMatrix(); gl.setMatrixAt(i, dummy.matrix); }); gl.frustumCulled = false; this.add(gl); }
    }
    // far hills ring
    const hm = new Merger(); const hc = { meadow: [0x5fb34a, 0x3e9a4f, 0x7acb5b], harbor: [0x45546e, 0x354560, 0x56688a], mesa: [0xd0803f, 0xb4553a, 0xe09a54], frost: [0xcfe3f5, 0xa9c8e6, 0xe9f4ff] }[tc.theme];
    let cx = 0, cz = 0; for (let i = 0; i < tc.N; i += 4) { cx += tc.p[i][0]; cz += tc.p[i][1]; } cx /= Math.ceil(tc.N / 4); cz /= Math.ceil(tc.N / 4);
    let maxR = 0; for (let i = 0; i < tc.N; i += 4) maxR = Math.max(maxR, Math.hypot(tc.p[i][0] - cx, tc.p[i][1] - cz)); this.center = [cx, cz]; this.radius = maxR;
    for (let i = 0; i < 46; i++) { const a = (i / 46) * TAU + R() * 0.1, r = maxR + 260 + R() * 220; const hh = 60 + R() * 120, ww = 100 + R() * 140; hm.add(LP.sph, { p: [cx + Math.cos(a) * r, -hh * 0.35, cz + Math.sin(a) * r], s: [ww, hh, ww], c: hc[(R() * hc.length) | 0] }); }
    const hmm = hm.build(std({ vertexColors: true, roughness: 1 })); if (hmm) this.add(hmm);
  }
  _water() {
    if (this.tc.theme !== 'harbor') return; const tc = this.tc;
    // deck plane replaces the ground colour; sea is below
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000, 1, 1), new THREE.MeshStandardMaterial({ color: 0x1c7a9a, roughness: 0.18, metalness: 0.1, envMapIntensity: 1.6 })); sea.rotation.x = -Math.PI / 2; sea.position.y = -0.9; this.add(sea); this.sea = sea;
    this.groundMesh.visible = false;
    const deckMat = std({ map: this.tex.ground, color: 0xffffff, roughness: 0.9 }); this.tex.ground.repeat.set(1, 1); this.tex.ground.repeat.set(0.07, 0.07);
    const deck = new THREE.Mesh(ribbon(tc, -(tc.limit + 70), tc.limit + 70, -0.01, 14), deckMat); this.add(deck);
    // harbor-edge dock bollards already; also add wooden pier edge
  }
  _landmark() {
    const tc = this.tc, lm = tc.meta.landmark; if (!lm) return; const L = tc.length; const f = tc.reverse ? 1 - lm.f : lm.f; const a = tc.at(f * L, 0, {}); const nx = a.tz, nz = -a.tx; const side = tc.mirror ? -1 : 1; const px = a.x + nx * lm.lat * side, pz = a.z + nz * lm.lat * side;
    const g = new THREE.Group(); g.position.set(px, 0, pz); this.add(g); this.landmark = g;
    if (lm.type === 'windmill') {
      const M = new Merger(); M.add(G.cyl, { p: [0, 10, 0], s: [4.2, 10, 4.2], c: 0xf4ead4 }); M.add(G.cone, { p: [0, 22.5, 0], s: [5.4, 5.2, 5.4], c: 0xc8432e }); M.add(G.cyl, { p: [0, 1, 0], s: [5, 1.2, 5], c: 0x8f8a80 }); M.add(G.box, { p: [0, 7, 4.1], s: [2, 3, 0.3], c: 0x6b4a2c }); g.add(M.build(std({ vertexColors: true, roughness: 0.7 })));
      const bl = new THREE.Group(); bl.position.set(0, 19.5, 4.6); const B = new Merger(); for (let i = 0; i < 4; i++) { const ang = i * Math.PI / 2; B.add(G.sbox, { p: [Math.cos(ang) * 8, Math.sin(ang) * 8, 0], r: [0, 0, ang], s: [14, 1.6, 0.3], c: 0xf2f2f2 }); B.add(G.sbox, { p: [Math.cos(ang) * 8, Math.sin(ang) * 8, -0.05], r: [0, 0, ang], s: [14, 0.5, 0.4], c: 0xc8432e }); } bl.add(B.build(std({ vertexColors: true, roughness: 0.7, side: THREE.DoubleSide }))); g.add(bl); this.anim.push((dt, t) => { bl.rotation.z = t * 0.5; });
      g.rotation.y = Math.atan2(-nx * side, -nz * side); g.scale.setScalar(1.4);
    } else if (lm.type === 'lighthouse') {
      const M = new Merger(); for (let i = 0; i < 6; i++) M.add(G.cyl, { p: [0, 3 + i * 5, 0], s: [6 - i * 0.55, 3.2, 6 - i * 0.55], c: i % 2 ? 0xf5f0e6 : 0xe5533c }); M.add(G.cyl, { p: [0, 35, 0], s: [4, 0.6, 4], c: 0x2b3446 }); M.add(G.cone, { p: [0, 40, 0], s: [4, 4, 4], c: 0x2b3446 }); M.add(G.cyl, { p: [0, 0.5, 0], s: [9, 1, 9], c: 0x8a8f99 }); g.add(M.build(std({ vertexColors: true, roughness: 0.6 })));
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(2.2, 12, 10), new THREE.MeshBasicMaterial({ color: 0xfff1b0, fog: false })); lamp.position.y = 37; g.add(lamp);
      const beam = new THREE.Mesh(new THREE.ConeGeometry(14, 200, 20, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff1b0, transparent: true, opacity: 0.18, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, fog: false })); const bp = new THREE.Group(); beam.rotation.z = Math.PI / 2; beam.position.x = 100; bp.add(beam); bp.position.y = 37; g.add(bp); this.anim.push((dt, t) => { bp.rotation.y = t * 0.7; }); g.scale.setScalar(1.3);
    } else if (lm.type === 'arch') {
      const M = new Merger(); const rc = [0xc2623e, 0xd97f4b, 0xb4553a]; M.add(G.cyl, { p: [-14, 14, 0], s: [8, 14, 8], c: rc[0] }); M.add(G.cyl, { p: [14, 12, 0], s: [8, 12, 8], c: rc[1] }); for (let i = 0; i <= 12; i++) { const a2 = (i / 12) * Math.PI; M.add(G.cyl, { p: [Math.cos(a2) * -14, 22 + Math.sin(a2) * 8, 0], s: [4.2, 5, 4.2], c: rc[i % 3] }); } M.add(G.cyl, { p: [0, 33, 0], s: [20, 3, 7], c: 0xe6a05a }); g.add(M.build(std({ vertexColors: true, roughness: 0.95 }))); g.scale.setScalar(1.3); g.rotation.y = Math.atan2(-nx * side, -nz * side);
    } else if (lm.type === 'waterfall') {
      const M = new Merger(); M.add(G.sph, { p: [0, 20, 0], s: [34, 34, 22], c: 0x9db8d4 }); M.add(G.sph, { p: [18, 14, 8], s: [18, 20, 14], c: 0xb8d0e6 }); M.add(G.sph, { p: [-20, 12, 6], s: [16, 18, 14], c: 0x8fb0d0 }); g.add(M.build(std({ vertexColors: true, roughness: 0.6 })));
      const wt = canvasTex(64, 256, (c, w, h) => { const gr = c.createLinearGradient(0, 0, w, 0); gr.addColorStop(0, '#9fe4ff'); gr.addColorStop(0.5, '#ffffff'); gr.addColorStop(1, '#9fe4ff'); c.fillStyle = gr; c.fillRect(0, 0, w, h); const r = rng(3); c.fillStyle = 'rgba(255,255,255,0.7)'; for (let i = 0; i < 40; i++) c.fillRect(r() * w, r() * h, 3, 12 + r() * 30); });
      const fall = new THREE.Mesh(new THREE.PlaneGeometry(14, 32), new THREE.MeshBasicMaterial({ map: wt, transparent: true, opacity: 0.85, fog: true })); fall.position.set(0, 18, 12); g.add(fall); this.anim.push((dt) => { wt.offset.y -= dt * 0.6; }); g.rotation.y = Math.atan2(-nx * side, -nz * side);
    }
  }
  _boxesCoinsPads() {
    const tc = this.tc; this.boxes = []; const lats = [-6, -3, 0, 3, 6];
    for (const s of tc.rows) for (const l of lats) { const a = tc.at(s, l, {}); this.boxes.push({ x: a.x, z: a.z, s, active: true, respawn: 0, scale: 1 }); }
    const bm = new THREE.MeshBasicMaterial({ map: boxTex(), transparent: true, opacity: 0.93, toneMapped: false }); this.boxMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), bm, this.boxes.length); this.boxMesh.frustumCulled = false; this.add(this.boxMesh);
    this.coins = []; for (const s0 of tc.coinGroups) for (let k = 0; k < 5; k++) { const ss = s0 + k * 6; const a = tc.at(ss, Math.sin(k * 0.9 + s0) * 4, {}); this.coins.push({ x: a.x, z: a.z, active: true, respawn: 0 }); }
    const cg = new THREE.CylinderGeometry(0.55, 0.55, 0.14, 18); cg.rotateX(Math.PI / 2); this.coinMesh = new THREE.InstancedMesh(cg, std({ color: 0xffc928, emissive: 0xb07a00, emissiveIntensity: 0.6, metalness: 0.8, roughness: 0.25 }), this.coins.length); this.coinMesh.frustumCulled = false; this.add(this.coinMesh);
    this.pads = tc.pads.map(s => { const a = tc.at(s, 0, {}); return { x: a.x, z: a.z, s, heading: a.heading, hw: 3.4, hl: 5 }; });
    const pt = padTex(); this.padTex = pt; for (const p of this.pads) { const m = new THREE.Mesh(new THREE.PlaneGeometry(p.hw * 2, p.hl * 2), new THREE.MeshBasicMaterial({ map: pt, toneMapped: false })); m.rotation.x = -Math.PI / 2; m.rotation.z = -p.heading + Math.PI; m.position.set(p.x, 0.09, p.z); this.add(m); }
    if (tc.sc) { const e = tc.sc.p[1]; this.scPad = { x: e[0], z: e[1], heading: Math.atan2(tc.sc.tx[1], tc.sc.tz[1]), hw: 2.4, hl: 4.5 }; this.pads.push(this.scPad); }
    this.tmpO = new THREE.Object3D();
  }
  update(dt, t, camPos) {
    this.skyMat.uniforms.time.value = t; for (const f of this.anim) f(dt, t); if (this.padTex) this.padTex.offset.y = -((t * 1.4) % 1);
    const o = this.tmpO; const bc = new THREE.Color();
    this.boxes.forEach((b, i) => { if (!b.active) { b.respawn -= dt; if (b.respawn <= 0) { b.active = true; b.scale = 0.01; } } if (b.active && b.scale < 1) b.scale = Math.min(1, b.scale + dt * 3);
      o.position.set(b.x, 1.5 + Math.sin(t * 2 + i) * 0.18, b.z); o.rotation.set(t * 0.9 + i, t * 1.3, 0); const sc = b.active ? b.scale : 0; o.scale.setScalar(Math.max(sc, 0.0001)); o.updateMatrix(); this.boxMesh.setMatrixAt(i, o.matrix); });
    this.boxMesh.instanceMatrix.needsUpdate = true;
    this.coins.forEach((c, i) => { if (!c.active) { c.respawn -= dt; if (c.respawn <= 0) c.active = true; } o.position.set(c.x, 1.0, c.z); o.rotation.set(0, t * 3 + i * 0.7, 0); o.scale.setScalar(c.active ? 1 : 0.0001); o.updateMatrix(); this.coinMesh.setMatrixAt(i, o.matrix); }); this.coinMesh.instanceMatrix.needsUpdate = true;
    if (this.sea) { this.sea.position.y = -0.9 + Math.sin(t * 0.8) * 0.08; }
    if (this.sky && camPos) this.sky.position.copy(camPos);
    if (this.groundMesh && camPos) { this.groundMesh.position.x = camPos.x - (camPos.x % 33.33); this.groundMesh.position.z = camPos.z - (camPos.z % 33.33); }
  }
  dispose() { this.scene.remove(this.group); this.group.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) { const ms = Array.isArray(o.material) ? o.material : [o.material]; ms.forEach(m => { if (m.map) m.map.dispose(); m.dispose(); }); } }); if (this.envTex) this.envTex.dispose(); }
}
export { rng, canvasTex, textTex };
