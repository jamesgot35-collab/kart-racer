// Deterministic (time-driven) hazards so every client sees the same state without sync traffic.
import * as THREE from 'three';
import { Merger, MODEL_G as G, addRim } from './models.js';
const hash = (i) => { const x = Math.sin(i * 12.9898 + 4.1414) * 43758.5453; return x - Math.floor(x); };
const mat = (o = {}) => addRim(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.7, metalness: 0.05, ...o }), 0xffffff, 2.4, 0.2);
export class Hazards {
  constructor(race) {
    this.race = race; const tc = this.tc = race.track; this.scene = race.scene; this.list = []; this.group = new THREE.Group(); this.scene.add(this.group); const L = tc.length;
    const fr = (f) => (tc.reverse ? 1 - f : f) * L; const calm = (s) => { let best = s, bk = 1e9; for (let o = -50; o <= 50; o += 4) { const k = Math.abs(tc.k[(((Math.round((s + o) / tc.step)) % tc.N) + tc.N) % tc.N]) + Math.abs(o) * 0.00005; if (k < bk) { bk = k; best = s + o; } } return ((best % L) + L) % L; };
    let n = 0;
    for (const h of tc.meta.hazards || []) {
      const id = n++; if (h.type === 'sheep') this.list.push(this._sheep(id, calm(fr(h.f))));
      else if (h.type === 'crane') this.list.push(this._crane(id, calm(fr(h.f))));
      else if (h.type === 'boulder') this.list.push(this._boulder(id, calm(fr(h.f))));
      else if (h.type === 'icicle') this.list.push(this._icicle(id, calm(fr(h.f))));
      else if (h.type === 'gate' && tc.sc) this.list.push(this._gate(id));
    }
  }
  _sign(s, color = 0xffd23f) { const a = this.tc.at(s - 28, this.tc.halfW + 2.2, {}); const M = new Merger(); M.add(G.cyl, { p: [a.x, 1.2, a.z], s: [0.1, 1.2, 0.1], c: 0x3a3f4a }); M.add(G.cone, { p: [a.x, 2.7, a.z], r: [0, Math.PI / 6, 0], s: [0.95, 0.9, 0.95], c: color }); const m = M.build(mat()); this.group.add(m); }
  _sheep(id, s) {
    const tc = this.tc; this._sign(s); const sheep = []; const root = new THREE.Group(); this.group.add(root);
    const M = new Merger(); M.add(G.sph, { p: [0, 0.75, 0], s: [0.8, 0.65, 1.0], c: 0xf7f3ea }); M.add(G.sph, { p: [0.3, 1.0, -0.2], s: [0.45, 0.4, 0.45], c: 0xfffcf4 }); M.add(G.sph, { p: [-0.3, 1.0, 0.2], s: [0.45, 0.4, 0.45], c: 0xfffcf4 }); M.add(G.sph, { p: [0, 1.0, 0.95], s: [0.34, 0.36, 0.4], c: 0x2a2a30 }); for (const [x, z] of [[-0.4, 0.5], [0.4, 0.5], [-0.4, -0.5], [0.4, -0.5]]) M.add(G.cyl, { p: [x, 0.25, z], s: [0.09, 0.25, 0.09], c: 0x2a2a30 }); const geo = M.build(mat());
    for (let i = 0; i < 4; i++) { const m = geo.clone(); m.material = geo.material; root.add(m); sheep.push(m); }
    return { type: 'sheep', id, s, cycle: 15, off: 3 + id * 4, root, sheep, update: (t) => this._upSheep(this.list.find(x => x.id === id), t), check: (k, t) => this._chkSheep(this.list.find(x => x.id === id), k, t) };
  }
  _sheepPos(h, t, i) {
    const tc = this.tc, ph = (t + h.off) % h.cycle, ci = Math.floor((t + h.off) / h.cycle); const side = ci % 2 ? 1 : -1; let u; if (ph < 8) u = -1; else if (ph < 10) u = 0; else if (ph < 15) u = (ph - 10) / 5; else u = 1; // -1 hidden, 0 waiting, 0..1 crossing
    const e = tc.limit - 0.5; const lat = ph < 10 ? side * (e + 1.0) : side * (e + 1.0) - side * (e * 2 + 2) * u; const ds = (i - 1.5) * 4.2;
    return { lat, ds, ph, u, hidden: ph < 8 || ph >= 15 };
  }
  _upSheep(h, t) { const tc = this.tc; h.sheep.forEach((m, i) => { const p = this._sheepPos(h, t, i); m.visible = !p.hidden || p.ph >= 15 && false; if (p.hidden) { m.visible = false; return; } const a = tc.at(h.s + p.ds, p.lat, {}); m.position.set(a.x, 0.08 * Math.abs(Math.sin(t * 9 + i * 2)) * (p.ph >= 10 ? 1 : 0), a.z); const ci = Math.floor((t + h.off) / h.cycle); const side = ci % 2 ? 1 : -1; m.rotation.y = Math.atan2(a.tz * 0 + (-side) * a.tz * -1, 0) + a.heading + (-side * Math.PI / 2) * 1; }); }
  _chkSheep(h, k, t) { const tc = this.tc; for (let i = 0; i < 4; i++) { const p = this._sheepPos(h, t, i); if (p.hidden || p.ph < 10) continue; const a = tc.at(h.s + p.ds, p.lat, {}); if (Math.hypot(a.x - k.sim.x, a.z - k.sim.z) < 1.9) return { x: a.x, z: a.z, kind: 'sheep', spin: 0.8, loss: 0.4 }; } return null; }
  _crane(id, s) {
    const tc = this.tc, side = 1; const a = tc.at(s, side * (tc.limit + 3), {}); const root = new THREE.Group(); root.position.set(a.x, 0, a.z); root.rotation.y = a.heading; this.group.add(root); // local +x = left (lat>0)
    const M = new Merger(); M.add(G.sbox, { p: [0, 12, 0], s: [1.6, 24, 1.6], c: 0xffb81c }); M.add(G.sbox, { p: [0, 24.5, 0], s: [1.6, 1.2, 1.6], c: 0xffb81c }); M.add(G.sbox, { p: [0, 0.6, 0], s: [4, 1.2, 4], c: 0x4a4f5a });
    const reach = (tc.limit + 3); M.add(G.sbox, { p: [-reach / 2 + 2, 24.6, 0], s: [reach + 8, 0.9, 1.0], c: 0xffb81c }); const tower = M.build(mat({ metalness: 0.2 })); root.add(tower);
    const hang = new THREE.Group(); root.add(hang); const cm = new Merger(); cm.add(G.cyl, { p: [0, 0, 0], s: [0.05, 1, 0.05], c: 0x222222 }); const cable = cm.build(mat()); hang.add(cable);
    const C = new Merger(); C.add(G.sbox, { p: [0, 0, 0], s: [3, 2.6, 5.4], c: [0xe5533c, 0x2f90a8, 0xf2b53a][id % 3] }); for (let i = -2; i <= 2; i++) C.add(G.sbox, { p: [0, 0, i * 1.0], s: [3.06, 2.4, 0.08], c: 0x00000030 }); const box = C.build(mat({ roughness: 0.5 })); hang.add(box);
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.6, 2.2, 28), new THREE.MeshBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.0, side: THREE.DoubleSide, depthWrite: false })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.12; this.group.add(ring);
    return { type: 'crane', id, s, cycle: 6, off: id * 2.3, hang, cable, box, ring, root, update: (t) => this._upCrane(this.list.find(x => x.id === id), t), check: (k, t) => this._chkCrane(this.list.find(x => x.id === id), k, t) };
  }
  _cranePos(h, t) { const ph = (t + h.off) % h.cycle; const lat = 5.8 * Math.sin((t + h.off) * 0.85); let y = 6.5, danger = false; if (ph > 2.3 && ph < 3.0) y = 6.5 - (ph - 2.3) / 0.7 * 5.2; else if (ph >= 3.0 && ph < 4.4) { y = 1.3; danger = true; } else if (ph >= 4.4 && ph < 5.0) y = 1.3 + (ph - 4.4) / 0.6 * 5.2; const warn = ph > 1.4 && ph < 4.4; return { lat, y, danger, warn, ph }; }
  _upCrane(h, t) { const tc = this.tc; const p = this._cranePos(h, t); const a = tc.at(h.s, p.lat, {}); h.hang.position.set(0, 0, 0); const root = h.root; // place hanging container in world via inverse of root transform
    const wp = new THREE.Vector3(a.x, p.y, a.z); root.worldToLocal(wp); h.hang.position.copy(wp); h.hang.rotation.y = 0; h.cable.position.y = 12.5; h.cable.scale.set(1, 12.5 - p.y + 0.0001, 1); h.cable.position.y = (24.5 - 1.3) / 2 + 0.6; h.cable.scale.y = 24.5 - p.y; h.cable.position.set(0, (24.5 + 0) / 2 * 0 + (24.5 - p.y) / 2, 0); h.cable.parent.updateMatrix();
    h.ring.position.set(a.x, 0.12, a.z); h.ring.material.opacity = p.warn ? 0.35 + 0.35 * Math.sin(t * 14) : 0; h.ring.rotation.z = a.heading; }
  _chkCrane(h, k, t) { const p = this._cranePos(h, t); if (!p.danger) return null; const a = this.tc.at(h.s, p.lat, {}); if (Math.abs(a.x - k.sim.x) < 2.4 && Math.abs(a.z - k.sim.z) < 3.4 && Math.hypot(a.x - k.sim.x, a.z - k.sim.z) < 3.6) return { x: a.x, z: a.z, kind: 'crane', spin: 1.0, loss: 0.5 }; return null; }
  _boulder(id, s) {
    this._sign(s, 0xff7a2a); const mesh = new THREE.Group(); const M = new Merger(); M.add(G.sph, { p: [0, 0, 0], s: [2.2, 2.2, 2.2], c: 0x9a6a4a }); M.add(G.sph, { p: [1.2, 1.0, 0.5], s: [0.9, 0.9, 0.9], c: 0xb88060 }); M.add(G.sph, { p: [-0.8, -0.9, 1.0], s: [0.8, 0.8, 0.8], c: 0x7a4a30 }); M.add(G.sph, { p: [-1.0, 0.8, -1.1], s: [0.7, 0.7, 0.7], c: 0xa87858 }); const b = M.build(mat({ roughness: 0.95 })); mesh.add(b); this.group.add(mesh);
    const sh = new THREE.Mesh(new THREE.CircleGeometry(2.4, 20), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35, depthWrite: false })); sh.rotation.x = -Math.PI / 2; sh.position.y = 0.11; this.group.add(sh);
    return { type: 'boulder', id, s, cycle: 10, off: id * 3.1, mesh, b, sh, update: (t) => this._upBoulder(this.list.find(x => x.id === id), t), check: (k, t) => this._chkBoulder(this.list.find(x => x.id === id), k, t) };
  }
  _boulderPos(h, t) { const ph = (t + h.off) % h.cycle, ci = Math.floor((t + h.off) / h.cycle); const side = ci % 2 ? 1 : -1; const e = this.tc.limit - 1.8; const u = ph < 2 ? -1 : ph < 5 ? (ph - 2) / 3 : 2; const lat = side * e - side * 2 * e * Math.min(Math.max(u, 0), 1); return { lat, rolling: u >= 0 && u <= 1, warn: ph < 2, u, side, ph }; }
  _upBoulder(h, t) { const tc = this.tc; const p = this._boulderPos(h, t); const a = tc.at(h.s, p.lat, {}); h.mesh.visible = p.rolling || p.ph < 2 && false; if (p.rolling) { h.mesh.position.set(a.x, 2.2 + Math.abs(Math.sin(t * 6)) * 0.15, a.z); h.b.rotation.x = -p.side * t * 4; h.b.rotation.z = t * 2; } else if (p.warn) { h.mesh.visible = true; const w = tc.at(h.s, p.side * (tc.limit + 3.5), {}); h.mesh.position.set(w.x, 2.2 + 2.0 * Math.max(0, 1 - p.ph / 2) * 0, w.z); h.mesh.position.y = 2.2 + Math.sin(t * 40) * 0.08; }
    h.sh.visible = p.rolling || p.warn; h.sh.position.set(h.mesh.position.x, 0.11, h.mesh.position.z); h.sh.material.opacity = p.warn ? 0.2 + 0.2 * Math.sin(t * 12) : 0.35; }
  _chkBoulder(h, k, t) { const p = this._boulderPos(h, t); if (!p.rolling) return null; const a = this.tc.at(h.s, p.lat, {}); if (Math.hypot(a.x - k.sim.x, a.z - k.sim.z) < 3.0) return { x: a.x, z: a.z, kind: 'boulder', spin: 1.2, loss: 0.6 }; return null; }
  _icicle(id, s) {
    const M = new Merger(); M.add(G.cone, { p: [0, 0, 0], r: [Math.PI, 0, 0], s: [1.0, 5.4, 1.0], c: 0xcff1ff }); M.add(G.cone, { p: [0.8, -0.8, 0.3], r: [Math.PI, 0, 0.1], s: [0.5, 3.2, 0.5], c: 0xa8e0ff }); const ice = M.build(mat({ roughness: 0.1, metalness: 0.1, envMapIntensity: 1.6 })); ice.visible = false; this.group.add(ice);
    const sh = new THREE.Mesh(new THREE.RingGeometry(0.6, 1.1, 24), new THREE.MeshBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false })); sh.rotation.x = -Math.PI / 2; sh.position.y = 0.12; this.group.add(sh);
    return { type: 'icicle', id, s, cycle: 7.5, off: id * 2.1, ice, sh, fx: 0, update: (t) => this._upIcicle(this.list.find(x => x.id === id), t), check: (k, t) => this._chkIcicle(this.list.find(x => x.id === id), k, t) };
  }
  _iciclePos(h, t) { const ph = (t + h.off) % h.cycle, ci = Math.floor((t + h.off) / h.cycle); const lat = (hash(ci * 7 + h.id) - 0.5) * 2 * (this.tc.halfW - 3.2); const sOff = (hash(ci * 3 + h.id * 5) - 0.5) * 30; return { lat, sOff, ph, ci, warn: ph < 1.5, falling: ph >= 1.5 && ph < 1.7, down: ph >= 1.7 && ph < 3.0, impact: ph >= 1.5 && ph < 1.62 }; }
  _upIcicle(h, t) { const tc = this.tc; const p = this._iciclePos(h, t); const a = tc.at(h.s + p.sOff, p.lat, {}); h.sh.position.set(a.x, 0.12, a.z); h.sh.visible = p.warn || p.falling; h.sh.material.opacity = p.warn ? 0.25 + 0.5 * (p.ph / 1.5) : 0; const sc = p.warn ? 0.6 + 1.6 * (p.ph / 1.5) : 2.2; h.sh.scale.setScalar(sc);
    if (p.falling || p.down) { h.ice.visible = true; const y = p.falling ? 24 * (1 - (p.ph - 1.5) / 0.2) + 2.6 : 2.6; h.ice.position.set(a.x, y, a.z); h.ice.scale.setScalar(p.down ? Math.max(0.01, 1 - (p.ph - 2.4) / 0.6) : 1); } else h.ice.visible = false;
    h.lastCi = p.ci; }
  _chkIcicle(h, k, t) { const p = this._iciclePos(h, t); if (!p.impact) return null; const a = this.tc.at(h.s + p.sOff, p.lat, {}); if (Math.hypot(a.x - k.sim.x, a.z - k.sim.z) < 2.7) { return { x: a.x, z: a.z, kind: 'icicle', spin: 0.9, loss: 0.5 }; } return null; }
  _gate(id) {
    const tc = this.tc, sc = tc.sc, i = 9; const p = sc.p[i]; const tx = sc.tx[i], tz = sc.tz[i]; const root = new THREE.Group(); root.position.set(p[0], 0, p[1]); root.rotation.y = Math.atan2(tx, tz); this.group.add(root);
    const M = new Merger(); for (const s of [-1, 1]) { M.add(G.sbox, { p: [s * (sc.half + 0.6), 1.5, 0], s: [0.9, 3, 0.9], c: 0x2b3446 }); } M.add(G.sbox, { p: [sc.half + 0.6, 3.2, 0], s: [0.5, 0.9, 0.5], c: 0x1a1d24 }); root.add(M.build(mat()));
    const arm = new THREE.Group(); arm.position.set(-(sc.half + 0.6), 1.9, 0); const AM = new Merger(); for (let k = 0; k < 6; k++) AM.add(G.sbox, { p: [(k + 0.5) * (sc.half * 2 + 1.2) / 6, 0, 0], s: [(sc.half * 2 + 1.2) / 6, 0.45, 0.45], c: k % 2 ? 0xffffff : 0xe03a2c }); arm.add(AM.build(mat())); root.add(arm);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 8), new THREE.MeshBasicMaterial({ color: 0x33ff66, fog: false })); lamp.position.set(sc.half + 0.6, 3.5, 0); root.add(lamp);
    return { type: 'gate', id, i, arm, lamp, cycle: 6, off: 1, p, tx, tz, update: (t) => this._upGate(this.list.find(x => x.id === id), t), check: (k, t) => this._chkGate(this.list.find(x => x.id === id), k, t) };
  }
  _gateClosed(h, t) { const ph = (t + h.off) % h.cycle; return ph >= 3.5; }
  _gateAmt(h, t) { const ph = (t + h.off) % h.cycle; if (ph < 3.2) return 0; if (ph < 3.5) return (ph - 3.2) / 0.3; if (ph < 5.8) return 1; return 1 - (ph - 5.8) / 0.2; }
  _upGate(h, t) { const a = this._gateAmt(h, t); h.arm.rotation.z = (1 - a) * 1.45; h.lamp.material.color.setHex(a > 0.5 ? 0xff3b30 : 0x33ff66); }
  _chkGate(h, k, t) { if (this._gateAmt(h, t) < 0.6) return null; const dx = k.sim.x - h.p[0], dz = k.sim.z - h.p[1]; const along = dx * h.tx + dz * h.tz; const lat = dx * h.tz - dz * h.tx; if (Math.abs(along) < 1.4 && Math.abs(lat) < this.tc.sc.half) { return { x: h.p[0], z: h.p[1], kind: 'gate', bounce: true, along: Math.sign(along) || 1, tx: h.tx, tz: h.tz }; } return null; }
  update(t) { for (const h of this.list) h.update(t); }
  check(kart, t) { for (const h of this.list) { const r = h.check(kart, t); if (r) { r.h = h; return r; } } return null; }
  telegraph(t) { const out = []; for (const h of this.list) { if (h.type === 'sheep') { const p = this._sheepPos(h, t, 0); if (p.ph >= 8 && p.ph < 8.05) out.push({ h, snd: 'item_ready', s: h.s }); } if (h.type === 'crane') { const p = this._cranePos(h, t); if (p.ph > 1.4 && p.ph < 1.45) out.push({ h, snd: 'horn', s: h.s }); } if (h.type === 'boulder') { const p = this._boulderPos(h, t); if (p.ph < 0.05) out.push({ h, snd: 'wall_hit', s: h.s, lp: 500 }); if (p.ph > 2 && p.ph < 2.05) out.push({ h, snd: 'crash_big', s: h.s, lp: 900 }); } if (h.type === 'icicle') { const p = this._iciclePos(h, t); if (p.ph >= 1.5 && p.ph < 1.53) out.push({ h, snd: 'disc_pop', s: h.s, rate: 1.6 }); } } return out; }
  dispose() { this.scene.remove(this.group); this.group.traverse(o => { if (o.geometry) o.geometry.dispose(); }); }
}
