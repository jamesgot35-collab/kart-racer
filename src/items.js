// Item system: Turbo Pod, Pod Trio, Rebound Disc, Peel Trap, Slick Spill, Hornet Rocket, Storm Jolt, Nova Core, Phantom Veil.
import * as THREE from 'three';
import { Merger, MODEL_G as G, addRim } from './models.js';
import { P } from './stats.js';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const ITEM_INFO = {
  pod: { name: 'Turbo Pod', color: '#37e08a' }, trio: { name: 'Pod Trio', color: '#37e08a' }, disc: { name: 'Rebound Disc', color: '#35a7ff' }, peel: { name: 'Peel Trap', color: '#ffd23f' }, spill: { name: 'Slick Spill', color: '#9b6bff' },
  rocket: { name: 'Hornet Rocket', color: '#ff4d4d' }, jolt: { name: 'Storm Jolt', color: '#fff25a' }, nova: { name: 'Nova Core', color: '#ffb02e' }, veil: { name: 'Phantom Veil', color: '#b9a7ff' },
};
const TABLE = { // rank band -> weights
  1: { pod: 16, trio: 5, disc: 22, peel: 26, spill: 15, veil: 12 },
  2: { pod: 15, trio: 10, disc: 18, peel: 12, spill: 8, veil: 12, nova: 5, rocket: 12 },
  3: { pod: 12, trio: 14, disc: 10, peel: 6, spill: 4, veil: 10, nova: 10, rocket: 14, jolt: 14 },
  4: { pod: 10, trio: 16, disc: 5, veil: 8, nova: 14, rocket: 16, jolt: 16 },
};
export function rollItem(rank, n, rnd = Math.random, hasJolt = false) {
  const band = rank <= 2 ? 1 : rank <= 5 ? 2 : rank <= 8 ? 3 : 4; const t = { ...TABLE[band] }; if (n <= 4) { delete t.jolt; if (rank > 1) t.rocket = (t.rocket || 0); } if (rank < P.item.rocket.minRankToGet) delete t.rocket; if (rank < P.item.jolt.minRankToGet) delete t.jolt; if (hasJolt) delete t.jolt;
  let sum = 0; for (const k in t) sum += t[k]; let r = rnd() * sum; for (const k in t) { r -= t[k]; if (r <= 0) return k; } return 'pod';
}
const mk = (build, o = {}) => build.build(addRim(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.4, metalness: 0.25, ...o }), 0xffffff, 2.2, 0.5));
function discMesh() { const M = new Merger(); M.add(G.cyl, { p: [0, 0.3, 0], s: [0.75, 0.12, 0.75], c: 0x35a7ff }); M.add(G.tor, { p: [0, 0.3, 0], r: [Math.PI / 2, 0, 0], s: [0.78, 0.78, 1.2], c: 0xffffff }); M.add(G.cyl, { p: [0, 0.38, 0], s: [0.3, 0.1, 0.3], c: 0xffd23f }); return mk(M, { emissive: 0x0a3a66, emissiveIntensity: 0.8 }); }
function peelMesh() { const M = new Merger(); for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; M.add(G.cone, { p: [Math.sin(a) * 0.35, 0.3, Math.cos(a) * 0.35], r: [0.5 * Math.cos(a), 0, -0.5 * Math.sin(a)], s: [0.22, 0.75, 0.22], c: 0xffd23f }); } M.add(G.sph, { p: [0, 0.2, 0], s: [0.35, 0.2, 0.35], c: 0xf0b800 }); return mk(M); }
function spillMesh() { const M = new Merger(); M.add(G.cyl, { p: [0, 0.04, 0], s: [1.8, 0.04, 1.8], c: 0x20103a }); M.add(G.cyl, { p: [0.4, 0.08, 0.2], s: [0.8, 0.04, 0.7], c: 0x6a3bd0 }); M.add(G.sph, { p: [-0.8, 0.12, -0.5], s: [0.28, 0.12, 0.28], c: 0x9b6bff }); const m = mk(M, { roughness: 0.1, metalness: 0.6, envMapIntensity: 1.6 }); return m; }
function rocketMesh() { const M = new Merger(); M.add(G.cap, { p: [0, 0, 0], r: [Math.PI / 2, 0, 0], s: [0.38, 0.9, 0.38], c: 0xf5f5f5 }); M.add(G.cone, { p: [0, 0, 1.05], r: [Math.PI / 2, 0, 0], s: [0.4, 0.8, 0.4], c: 0xff4d4d }); for (let i = 0; i < 3; i++) { const a = i * 2.094; M.add(G.sbox, { p: [Math.sin(a) * 0.35, Math.cos(a) * 0.35, -0.9], r: [0, 0, -a], s: [0.05, 0.5, 0.5], c: 0xff4d4d }); } const m = mk(M); const g = new THREE.Group(); g.add(m); return g; }
export class ItemSystem {
  constructor(race) { this.race = race; this.objs = []; this.nextId = 1; this.group = new THREE.Group(); race.scene.add(this.group); this.jolt = null; this.meshes = { disc: discMesh(), peel: peelMesh(), spill: spillMesh(), rocket: rocketMesh() }; this.beepT = 0; }
  dispose() { this.race.scene.remove(this.group); }
  // ------------------------------------------------ pickup & roulette
  startRoll(k) { if (k.item || k.roll) return; k.roll = { t: 0, dur: 1.5, last: -1 }; this.race.onEvent('roll', { k }); }
  updateRoll(k, dt) {
    if (!k.roll) return; k.roll.t += dt; const tick = Math.floor(k.roll.t / 0.09); if (tick !== k.roll.last) { k.roll.last = tick; this.race.onEvent('rollTick', { k, tick }); }
    if (k.roll.t >= k.roll.dur) { const rank = k.place, n = this.race.karts.length; const id = rollItem(rank, n, this.race.rnd, !!this.jolt); k.roll = null; k.item = { id, n: id === 'trio' ? 3 : 1 }; this.race.onEvent('itemGot', { k, id }); }
  }
  // ------------------------------------------------ button handling
  press(k) {
    if (k.sim.spinT > 0 && false) return; const R = this.race;
    if (k.lockT > 0 && k.item && k.sim.protected === false) { // Perfect Brace
      for (const o of this.objs) if (o.type === 'rocket' && o.target === k && !o.dead) { const d = o.tProg - o.rs; if (d < 26) { k.braceT = P.item.rocket.braceWindowSec + 0.2; k.item.n--; if (k.item.n <= 0) k.item = null; R.onEvent('braceTry', { k }); return; } }
    }
    if (!k.item) return; const id = k.item.id; k.pressT = R.t;
    if (id === 'disc' || id === 'peel') { k.holding = { id, t: 0 }; return; }
    this.fire(k, id, {});
  }
  release(k) { if (!k.holding) return; const h = k.holding; k.holding = null; if (!k.item || k.item.id !== h.id) return; this.fire(k, h.id, { held: h.t > 0.22, back: !!k.backHeld }); }
  tickHold(k, dt) { if (k.holding) { k.holding.t += dt; if (k.holding.t > 0.22 && !k.shield) { k.shield = k.holding.id; this.race.onEvent('shieldUp', { k }); } } if (!k.holding && k.shield) k.shield = null; }
  fire(k, id, o) {
    const R = this.race, s = k.sim; if (R.net && k.auth) R.net.send('use', { k: k.id, id, back: !!o.back, held: !!o.held }); const consume = () => { k.item.n--; if (k.item.n <= 0) k.item = null; k.shield = null; };
    switch (id) {
      case 'pod': s.addBoost(P.item.pod.sec, P.item.pod.mul, 'pod'); s.ev('podBoost', {}); consume(); R.onEvent('use', { k, id }); break;
      case 'trio': if (k.trioCd > 0) return; s.addBoost(P.item.podTrio.sec, P.item.podTrio.mul, 'pod'); k.trioCd = 0.6; consume(); R.onEvent('use', { k, id }); break;
      case 'nova': s.starT = P.item.nova.sec; s.shrinkT = 0; consume(); R.onEvent('use', { k, id }); break;
      case 'veil': { s.ghostT = P.item.veil.sec; consume(); let best = null, bd = P.item.veil.stealRange; for (const o2 of R.karts) { if (o2 === k || !o2.item || o2.sim.starT > 0 || o2.shield) continue; const d = o2.sim.prog - s.prog; if (d > 0 && d < bd && Math.hypot(o2.sim.x - s.x, o2.sim.z - s.z) < bd + 5) { bd = d; best = o2; } } if (best) { k.item = best.item; best.item = null; best.roll = null; R.onEvent('steal', { k, from: best }); } R.onEvent('use', { k, id }); break; }
      case 'jolt': this.jolt = { owner: k, t: P.item.jolt.armSec }; consume(); R.onEvent('use', { k, id }); R.onEvent('joltArm', { k }); break;
      case 'disc': this.spawnDisc(k, o.back); consume(); R.onEvent('use', { k, id }); break;
      case 'peel': if (o.held && !o.back) this.spawnPeel(k, true); else this.spawnPeel(k, false); consume(); R.onEvent('use', { k, id }); break;
      case 'spill': this.spawnSpill(k); consume(); R.onEvent('use', { k, id }); break;
      case 'rocket': this.spawnRocket(k); consume(); R.onEvent('use', { k, id }); break;
    }
  }
  _add(o) { o.id = o.id || (this.race.netId + '-' + this.nextId++); this.objs.push(o); if (o.mesh) { this.group.add(o.mesh); } return o; }
  spawnDisc(k, back, net) { const s = k.sim; const dir = s.th + (back ? Math.PI : 0); const sp = P.item.disc.speed; const m = this.meshes.disc.clone(); m.material = this.meshes.disc.material; return this._add({ type: 'disc', owner: k, x: s.x + Math.sin(dir) * 2.4, z: s.z + Math.cos(dir) * 2.4, vx: Math.sin(dir) * sp, vz: Math.cos(dir) * sp, bounces: P.item.disc.bounces, life: P.item.disc.lifeSec, arm: 0.15, mesh: m, id: net && net.id }); }
  spawnPeel(k, thrown) { const s = k.sim; const m = this.meshes.peel.clone(); m.material = this.meshes.peel.material; const o = { type: 'peel', owner: k, mesh: m, arm: 0.35, life: 60 }; if (thrown) { o.x = s.x + Math.sin(s.th) * 2.5; o.z = s.z + Math.cos(s.th) * 2.5; o.tx = s.x + Math.sin(s.th) * P.item.peel.throwDist; o.tz = s.z + Math.cos(s.th) * P.item.peel.throwDist; o.fx = o.x; o.fz = o.z; o.flight = 0.6; o.ft = 0; } else { o.x = s.x - Math.sin(s.th) * 2.6; o.z = s.z - Math.cos(s.th) * 2.6; } return this._add(o); }
  spawnSpill(k) { const s = k.sim; const m = this.meshes.spill.clone(); m.material = this.meshes.spill.material; return this._add({ type: 'spill', owner: k, x: s.x - Math.sin(s.th) * 2.8, z: s.z - Math.cos(s.th) * 2.8, arm: 0.3, life: P.item.spill.lifeSec, mesh: m }); }
  spawnRocket(k) {
    const R = this.race, s = k.sim; const ranked = R.ranked; let target = null; const idx = ranked.indexOf(k); if (idx > 0) target = ranked[idx - 1]; const m = this.meshes.rocket.clone(); const o = { type: 'rocket', owner: k, rs: s.prog + 3, lat: s.lat, speed: P.item.rocket.speed, target, straight: !target, life: target ? 9 : 3.5, mesh: m, dir: s.th, x: s.x, z: s.z };
    if (target) { target.lockT = P.item.rocket.lockSec + 1.2; R.onEvent('lock', { k: target, by: k }); } return this._add(o);
  }
  // ------------------------------------------------ update
  update(dt) {
    const R = this.race, tc = R.track; const t = R.t;
    if (this.jolt) { this.jolt.t -= dt; if (this.jolt.t <= 0) { const own = this.jolt.owner; for (const k of R.karts) { if (k === own || k.sim.prog <= own.sim.prog) continue; if (k.sim.starT > 0 || k.sim.ghostT > 0) { R.onEvent('joltBlocked', { k }); continue; } k.sim.shrinkT = P.item.jolt.shrinkSec; k.sim.s *= 0.82; k.shield = null; k.holding = null; if (k.item && (k.item.id === 'disc' || k.item.id === 'peel')) { /* shield dropped */ } R.onEvent('joltHit', { k }); } R.onEvent('joltFire', { k: own }); this.jolt = null; } }
    for (let i = this.objs.length - 1; i >= 0; i--) {
      const o = this.objs[i]; o.life -= dt; if (o.arm > 0) o.arm -= dt;
      if (o.type === 'disc') {
        o.x += o.vx * dt; o.z += o.vz * dt; const w = tc.constrain(o.x, o.z, o.hint); if (w) { o.x = w.x + w.nx * 0.8; o.z = w.z + w.nz * 0.8; const d = o.vx * w.nx + o.vz * w.nz; o.vx -= 2 * d * w.nx; o.vz -= 2 * d * w.nz; o.bounces--; R.onEvent('discBounce', { o }); if (o.bounces < 0) { o.dead = true; R.onEvent('discPop', { o }); } }
        if (!o.dead && o.arm <= 0) for (const k of R.karts) { if (!k.auth) continue; if (Math.hypot(k.sim.x - o.x, k.sim.z - o.z) < 1.6) { this.hitKart(k, o, P.item.disc.spinOutSec, P.item.disc.speedLoss, 'disc'); o.dead = true; break; } }
        if (!o.dead) for (const o2 of this.objs) if (o2 !== o && o2.type === 'disc' && !o2.dead && Math.hypot(o2.x - o.x, o2.z - o.z) < 1.3 && o.arm <= 0 && o2.arm <= 0) { o.dead = o2.dead = true; R.onEvent('discPop', { o }); }
        if (o.mesh) { o.mesh.position.set(o.x, 0.2, o.z); o.mesh.rotation.y += dt * 14; }
      } else if (o.type === 'peel') {
        if (o.flight) { o.ft += dt; const u = Math.min(1, o.ft / o.flight); o.x = o.fx + (o.tx - o.fx) * u; o.z = o.fz + (o.tz - o.fz) * u; o.y = Math.sin(u * Math.PI) * 2.2; if (u >= 1) { o.flight = 0; o.y = 0; R.onEvent('peelLand', { o }); } } else o.y = 0;
        if (o.arm <= 0 && !o.flight) for (const k of R.karts) { if (!k.auth) continue; if (Math.hypot(k.sim.x - o.x, k.sim.z - o.z) < 1.5) { this.hitKart(k, o, P.item.peel.spinOutSec, P.item.peel.speedLoss, 'peel'); o.dead = true; break; } }
        if (o.mesh) { o.mesh.position.set(o.x, o.y || 0, o.z); o.mesh.rotation.y += dt * 2; }
      } else if (o.type === 'spill') {
        if (o.arm <= 0) for (const k of R.karts) { if (!k.auth) continue; if (k.sim.slipT <= 0 && k.sim.ghostT <= 0 && k.sim.starT <= 0 && k.sim.grounded && Math.hypot(k.sim.x - o.x, k.sim.z - o.z) < P.item.spill.radius) { k.sim.slipT = P.item.spill.slipSec; k.sim.s *= (1 - P.item.spill.speedLoss); R.onEvent('slip', { k, o }); } }
        if (o.mesh) { o.mesh.position.set(o.x, 0.04, o.z); o.mesh.scale.setScalar(Math.min(1, o.life < 2 ? o.life / 2 : 1)); }
      } else if (o.type === 'rocket') this.updateRocket(o, dt);
      if (o.life <= 0 || o.dead) { if (o.mesh) this.group.remove(o.mesh); this.objs.splice(i, 1); }
    }
    for (const k of R.karts) { if (k.lockT > 0) k.lockT -= dt; if (k.braceT > 0) k.braceT -= dt; if (k.trioCd > 0) k.trioCd -= dt; }
  }
  hitKart(k, o, sec, loss, kind) { const R = this.race; if (k.sim.protected && !(k.sim.invulT > 0 && k.sim.starT <= 0 && k.sim.ghostT <= 0 && false)) { if (k.sim.starT > 0 || k.sim.ghostT > 0) return; } if (k.sim.spin(sec, loss)) { k.lastHitBy = o.owner; k.shield = null; k.holding = null; R.onEvent('hit', { k, o, kind }); if (o.owner && o.owner !== k) R.onEvent('hitOther', { k: o.owner, victim: k, kind }); } }
  updateRocket(o, dt) {
    const R = this.race, tc = R.track, L = tc.length; const tg = o.target; let hit = false;
    if (o.straight) { o.rs += o.speed * dt; const a = tc.at(o.rs, o.lat, {}); o.x = a.x; o.z = a.z; o.dir = a.heading; for (const k of R.karts) if (k !== o.owner && k.auth && Math.hypot(k.sim.x - o.x, k.sim.z - o.z) < 2.2) { tg_hit(this, k, o); o.dead = true; break; } }
    else {
      o.tProg = tg.sim.prog; o.rs += o.speed * dt; const gap = o.tProg - o.rs; o.lat += (tg.sim.lat - o.lat) * Math.min(1, dt * 3.5);
      const a = tc.at(o.rs, o.lat, {}); o.x = a.x; o.z = a.z; o.dir = a.heading;
      if (gap < 4) { // homing in on the target directly
        const dx = tg.sim.x - o.x, dz = tg.sim.z - o.z; const d = Math.hypot(dx, dz); o.x += dx * Math.min(1, 0.5); o.z += dz * Math.min(1, 0.5); o.dir = Math.atan2(dx, dz); if (d < 3.2 || gap < -1) hit = true;
      }
      if (tg.braceT > 0 && gap < 22 && gap > -2) { o.dead = true; R.onEvent('braceOk', { k: tg, o }); tg.braceT = 0; tg.item = tg.item; return; }
      if (hit) { o.dead = true; if (tg.auth) tg_hit(this, tg, o); else R.onEvent('rocketHitRemote', { k: tg, o }); }
      if (!o.dead && o.rs - o.owner.sim.prog > 420) o.dead = true;
    }
    if (o.mesh) { o.mesh.position.set(o.x, 0.9, o.z); o.mesh.rotation.y = o.dir; }
    this.beepT -= dt; const loc = R.localKart; if (loc && o.target === loc && this.beepT <= 0) { const gap = o.tProg - o.rs; this.beepT = clamp(gap / 220, 0.07, 0.4); R.onEvent('rocketBeep', { k: loc, gap }); }
  }
}
function tg_hit(sys, k, o) { const R = sys.race; if (k.sim.starT > 0 || k.sim.ghostT > 0) { R.onEvent('rocketBlocked', { k }); return; } if (k.braceT > 0) { R.onEvent('braceOk', { k, o }); k.braceT = 0; return; } if (k.sim.spin(P.item.rocket.spinOutSec, 0.7)) { k.lastHitBy = o.owner; k.shield = null; k.holding = null; R.onEvent('hit', { k, o, kind: 'rocket' }); R.onEvent('rocketExplode', { k, o }); if (o.owner !== k) R.onEvent('hitOther', { k: o.owner, victim: k, kind: 'rocket' }); } }
