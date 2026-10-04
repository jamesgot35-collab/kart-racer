// Race orchestration: grid, countdown, kart sim loop, items, hazards, ranking, camera, effects and audio events.
import * as THREE from 'three';
import DATA from './gamedata.json';
import { buildTrack } from './tracks.js';
import { TrackView } from './trackview.js';
import { buildKart, animateDriver } from './models.js';
import { finalStats, P } from './stats.js';
import { KartSim } from './kart.js';
import { AI } from './ai.js';
import { FX, rgba } from './fx.js';
import { Hazards } from './hazards.js';
import { ItemSystem } from './items.js';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v)); const lerp = (a, b, t) => a + (b - a) * t; const TAU = Math.PI * 2;
const angDiff = (a, b) => { let d = a - b; while (d > Math.PI) d -= TAU; while (d < -Math.PI) d += TAU; return d; };
const STEP = 1 / 60; const POINTS = [15, 12, 10, 8, 7, 6, 5, 4, 3, 2, 1, 0];
let glowTex = null; function getGlowTex() { if (glowTex) return glowTex; const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 1, 32, 32, 31); gr.addColorStop(0, 'rgba(255,255,255,0.9)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); glowTex = new THREE.CanvasTexture(c); return glowTex; }
let shadowTex = null; function getShadowTex() { if (shadowTex) return shadowTex; const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 2, 32, 32, 31); gr.addColorStop(0, 'rgba(0,0,0,0.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); shadowTex = new THREE.CanvasTexture(c); return shadowTex; }
export const SURF_DUST = { road: 0xb8bcc4, off: 0x9c8a5a, rough: 0xb59a6a, sand: 0xe3c283, ice: 0xe8f6ff };

export class Race {
  constructor(o) {
    Object.assign(this, { scene: o.scene, renderer: o.renderer, camera: o.camera, audio: o.audio, ui: o.ui || (() => { }), net: o.net || null });
    this.opts = o; this.laps = o.laps || 3; this.itemsOn = o.itemsOn !== false; this.rnd = o.rnd || Math.random; this.netId = o.netId || 'L'; this.quality = o.quality || 1; this.t = 0; this.state = 'grid'; this.cdT = 3.999; this.stateT = 0; this.acc = 0; this.goTime = 0; this.finishedCount = 0; this.results = null; this.cam = { yaw: 0, pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 62, shake: 0, back: false, introT: 0 };
    this.track = buildTrack(o.trackId, { mirror: !!o.mirror, reverse: !!o.reverse }); this.view = new TrackView(this.track, this.scene, this.renderer, { hq: o.hq, hqTex: o.hqTex, hqEnv: o.hqEnv, lod: o.lod || 1 });
    this.fx = new FX(this.scene, this.quality); this.hazards = new Hazards(this); this.items = new ItemSystem(this);
    this.karts = []; this.ranked = []; this.localKart = null; this.input = { steer: 0, throttle: 0, brake: 0, drift: false, driftPressed: false, itemDown: false, itemUp: false, look: false, gas: false };
    this.shadowMat = new THREE.MeshBasicMaterial({ map: getShadowTex(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3 }); this.shadowGeo = new THREE.PlaneGeometry(1, 1); this.shadowGeo.rotateX(-Math.PI / 2);
    this.rivalEng = [null, null, null]; this.sfxCd = new Map(); this.statsRace = { coins: 0, hits: 0, boosts: 0, drifts: 0, shortcuts: 0, maxTier: 0 }; this.announced = {}; this.lastPosCall = 0; this.timeline = [];
    const L = this.track.length; this.L = L; this.hazOk = true;
    o.players.forEach((p, i) => this.addKart(p, i));
    this.rank(); this.setupAudio(); this.cam.introT = 0; this.updateVisuals(0); this.positionCamera(0, true);
  }
  // ------------------------------------------------------------------ setup
  addKart(p, slot) {
    const tc = this.track; const ch = DATA.characters.find(c => c.name === p.name) || DATA.characters[0]; const st = finalStats(p.build, ch.cls); const sim = new KartSim(st, tc);
    const row = Math.floor(slot / 2), col = slot % 2; const s = tc.length - 7 - row * 8.5 - (col ? 3 : 0); const lat = col ? 3.6 : -3.6; const a = tc.at(s, lat, {}); sim.lap = -1; sim.place(a.x, a.z, a.heading);
    const vis = buildKart(p.build, p.name); this.scene.add(vis.root); const sh = new THREE.Mesh(this.shadowGeo, this.shadowMat); sh.scale.set(3.4, 1, 4.6); sh.position.y = 0.06; this.scene.add(sh); let glow = null; if (this.view && this.view.th.night >= 0.9) { const hx = (DATA.paintColors[p.build.paint] || { hex: '#66ccff' }).hex; this._glowMats = this._glowMats || {}; const gm = this._glowMats[hx] || (this._glowMats[hx] = new THREE.MeshBasicMaterial({ map: getGlowTex(), color: new THREE.Color(hx), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.85, polygonOffset: true, polygonOffsetFactor: -4, fog: false })); glow = new THREE.Mesh(this.shadowGeo, gm); glow.position.y = 0.08; glow.scale.set(3.0, 1, 4.0); this.scene.add(glow); }
    const k = { id: p.id ?? slot, name: p.name, cls: ch.cls, build: p.build, st, sim, vis, shadow: sh, glow, slot, human: !!p.human, local: !!p.local, remote: !!p.remote, auth: !p.remote, cpu: !p.human, ai: null, item: null, roll: null, holding: null, shield: null, lockT: 0, braceT: 0, coins: 0, place: slot + 1, finished: false, finishT: 0, finishOrder: 0, lastHitBy: null, shieldMesh: null, dispName: p.dispName || p.name, rev: 0, rpm: 0.1, gear: 0, gasAt: null, startRes: null, padCd: 0, hazCd: 0, lastBumpSnd: 0, tgt: null, lastLap: -1, auto: false, bark: {} };
    if (k.cpu && k.auth) k.ai = new AI(k, this, p.skill ?? (0.82 + this.rnd() * 0.16)); if (k.local) this.localKart = k; this.karts.push(k); return k;
  }
  hazardOkForCpu(k) { const g = this.hazards.list.find(h => h.type === 'gate'); if (!g) return true; const ph = (this.t + g.off) % g.cycle; return ph < 1.8 || Math.random() < 0.15; }
  nearestAhead(k, maxD) { let b = null, bd = maxD; for (const o of this.karts) { if (o === k) continue; const d = o.sim.prog - k.sim.prog; if (d > 0 && d < bd && Math.abs(o.sim.lat - k.sim.lat) < 8) { bd = d; b = o; } } return b; }
  nearestBehind(k, maxD) { let b = null, bd = maxD; for (const o of this.karts) { if (o === k) continue; const d = k.sim.prog - o.sim.prog; if (d > 0 && d < bd && Math.abs(o.sim.lat - k.sim.lat) < 8) { bd = d; b = o; } } return b; }
  setupAudio() {
    const A = this.audio; if (!A || !A.ready) return; this.snd = {}; const lk = this.localKart; this.audioOn = true;
    if (lk) this.engine = A.createEngine(lk.cls, { vol: 1 }); A.setReverb(this.track.theme); A.startAmbience(this.track.meta.amb);
    const L = (n) => A.loop(n, { vol: 0 }); this.loops = { wind: L('wind_loop'), skid_road: L('skid_road'), skid_snow: L('skid_snow'), skid_sand: L('skid_sand'), spark: L('spark_loop'), off: L('offroad_loop'), draft: L('draft_loop'), nova: L('nova_loop'), crowd: L('crowd_loop') };
    A.setMusicState('grid', false);
  }
  sfx(name, k, o = {}) { const A = this.audio; if (!A || !A.ready) return; if (!k || k === this.localKart) A.play(name, { ...o }); else A.at(name, k.sim.x, k.sim.z, o); }
  sfxPos(name, x, z, o = {}) { const A = this.audio; if (A && A.ready) A.at(name, x, z, o); }
  say(key, o) { const A = this.audio; if (A && A.ready) A.announce(key, o); }
  // Steering assist (default on for touch): nudges the kart back toward the road when it is heading into a wall / the grass near the track edge.
  assistSteer(k, steerIn) {
    const mode = this.opts.assist; if (!mode || mode === 'off') return steerIn; const s = k.sim; if (this.state !== 'racing' || s.drift.on || s.spinT > 0 || s.onSc || s.s < 8 || !s.grounded) return steerIn;
    const tr = this.track, hw = tr.halfW; const lat = s.lat, a = Math.abs(lat); const start = 0.75 * hw; if (a < start) return steerIn;
    const t = tr.at(s.lastS, 0, this._asTmp || (this._asTmp = {})); let rel = s.th - t.heading; while (rel > Math.PI) rel -= 2 * Math.PI; while (rel < -Math.PI) rel += 2 * Math.PI;
    const out = Math.sin(rel) * Math.sign(lat); if (out <= 0.02) return steerIn; // already heading back in / parallel
    const excess = clamp((a - start) / Math.max(1, tr.limit - start), 0, 1); const outward = clamp(out / 0.22, 0, 1); const strength = mode === 'high' ? 0.7 : 0.4;
    const corr = Math.sign(lat) * strength * Math.pow(excess, 0.7) * outward; this.assistOn = (this.assistOn || 0) + 1;
    return clamp(steerIn + corr, -1, 1);
  }
  bark(k, key, o) { if (k === this.localKart && this.audio && this.audio.ready) this.audio.bark(k.name, key, o); else if (k && k.auth !== undefined && this.audio && this.audio.ready && Math.hypot(k.sim.x - this.localKart.sim.x, k.sim.z - this.localKart.sim.z) < 30) this.audio.bark(k.name, key, { ...o, cooldown: 14, vol: 0.5, pan: 0 }); }
  // ------------------------------------------------------------------ control
  start() { this.state = 'grid'; this.stateT = 0; this.cam.introT = 0; if (this.audio && this.audio.ready) { this.say('get_ready', { force: true }); } }
  beginCountdown() { this.state = 'countdown'; this.cdT = 3.999; this.stateT = 0; this.cdLast = 4; if (this.audio && this.audio.ready) this.audio.setMusicState('grid'); }
  // ------------------------------------------------------------------ main update (called each frame with real dt)
  update(dtReal) {
    const dt = Math.min(dtReal, 0.1); this.acc += dt; let n = 0;
    while (this.acc >= STEP && n < 6) { this.step(STEP); this.acc -= STEP; n++; } if (n >= 6) this.acc = 0;
    this.view.update(dt, this.t, this.camera.position); this.updateVisuals(dt); this.positionCamera(dt); this.fx.update(dt); this.updateAudio(dt);
  }
  step(dt) {
    this.stateT += dt;
    if (this.state === 'grid') { this.cam.introT += dt; if (this.cam.introT > (this.opts.introSec ?? 2.6)) { this.beginCountdown(); } }
    if (this.state === 'countdown') {
      this.cdT -= dt; const c = Math.ceil(this.cdT); if (c !== this.cdLast && c >= 0 && c <= 3) { this.cdLast = c; if (c > 0) { this.say(['', 'one', 'two', 'three'][c], { force: true }); this.audio && this.audio.ready && this.audio.play('cd_beep'); this.ui('cd', { n: c }); } }
      for (const k of this.karts) { if (!k.auth) continue; const inp = this.getInput(k); if (inp.throttle > 0.1 && k.gasAt === null) { k.gasAt = this.cdT; } k.rev = lerp(k.rev, inp.throttle > 0.1 ? 1 : 0, 0.15); }
      if (this.cdT <= 0) this.go();
    }
    if (this.state === 'racing' || this.state === 'finished') this.t += dt;
    if (this.state === 'racing' || this.state === 'finished') this.simKarts(dt);
    else for (const k of this.karts) { if (k.remote) continue; k.sim.step(0, { throttle: 0 }); }
    this.hazards.update(this.t); if (this.state !== 'grid' && this.state !== 'countdown') { this.items.update(dt); for (const e of this.hazards.telegraph(this.t)) { const a = this.track.at(e.s, 0, {}); this.sfxPos(e.snd, a.x, a.z, { ref: 40, vol: 0.9, rate: e.rate || 1 }); } }
  }
  go() {
    this.state = 'racing'; this.t = 0; this.goTime = performance.now(); this.say('go', { force: true }); if (this.audio && this.audio.ready) { this.audio.play('cd_go'); this.audio.setMusicState('race', false, this.musicOpts()); this.audio.musicDuckFor(0.8, 0.7); } this.ui('go', {});
    for (const k of this.karts) { if (!k.auth) continue; const w = P.startBoost.windowSec; if (k.gasAt !== null && k.gasAt > w) { k.sim.stallT = P.startBoost.earlyStallSec; k.startRes = 'stall'; this.sfx('start_stall', k); if (k === this.localKart) this.ui('start', { res: 'stall' }); } else if (k.gasAt !== null && k.gasAt >= -0.12) { k.sim.addBoost(P.startBoost.boostSec, P.startBoost.boostMul, 'start'); k.startRes = 'boost'; k.sim.s = Math.max(k.sim.s, 2); this.sfx('start_boost', k); if (k === this.localKart) { this.ui('start', { res: 'boost' }); this.say('perfect_start', { delay: 0.6 }); this.statsRace.boosts++; } } else k.startRes = 'none'; k.pendingStart = k.gasAt === null; }
  }
  getInput(k) {
    if (k.ai && !k.auto) return k.ai.input(STEP);
    if (k.auto && k.ai) return k.ai.input(STEP);
    if (k === this.localKart) { const i = this.input; const inp = { steer: this.assistSteer(k, i.steer), throttle: i.throttle, brake: i.brake, drift: i.drift, driftPressed: i.driftPressed, look: i.look }; return inp; }
    return { steer: 0, throttle: 0, brake: 0, drift: false };
  }
  simKarts(dt) {
    const L = this.L, i0 = this.input;
    // rubber-banding reference: the local human (or leader among humans)
    let ref = this.localKart ? this.localKart.sim.prog : (this.karts[0] && this.karts[0].sim.prog);
    for (const k of this.karts) {
      if (k.remote) { this.stepRemote(k, dt); continue; }
      const s = k.sim; const inp = this.getInput(k);
      if (k === this.localKart) { // consume edges
        if (i0.itemDown) { this.items.press(k); i0.itemDown = false; } if (i0.itemUp) { this.items.release(k); i0.itemUp = false; } k.backHeld = i0.brake > 0.5; i0.driftPressed = false;
        if (this.state === 'racing' && k.pendingStart && inp.throttle > 0.1 && this.t < 0.12 && k.gasAt === null) { /* late-but-in-window start */ s.addBoost(P.startBoost.boostSec, P.startBoost.boostMul, 'start'); k.pendingStart = false; this.ui('start', { res: 'boost' }); this.sfx('start_boost', k); }
      }
      if (k.ai && !k.auto && this.state === 'racing' && this.opts.rubber !== false) { const gap = s.prog - ref; const r = P.rubber; const f = clamp(gap / r.rangeM, -1, 1); s.topScale = r.cpuBaseMul * (f > 0 ? lerp(1, r.cpuMulMin, f) : lerp(1, r.cpuMulMax, -f)) * (0.97 + 0.04 * k.ai.skill) * (this.opts.cpuMul || 1); if (this.state === 'racing' && k.ai.skill > 0.98) s.topScale *= 1.0; }
      else if (k.ai && k.auto) s.topScale = k.autoScale ?? 0.9;
      if (!k.finished || k.auto) { if (this.itemsOn) { this.items.updateRoll(k, dt); this.items.tickHold(k, dt); } s.step(dt, inp); } else s.step(dt, inp);
      if (k.holding) k.holding.t = k.holding.t;
      this.afterStep(k, dt);
    }
    this.collisions(dt); this.rank(); this.updateDraft(dt);
    if (this.state === 'racing') this.checkEnd(dt);
  }
  stepRemote(k, dt) {
    const s = k.sim, t = k.tgt; if (!t) return; const age = Math.min(0.25, (performance.now() - t.at) / 1000); const px = t.x + Math.sin(t.phi) * t.s * age, pz = t.z + Math.cos(t.phi) * t.s * age; const f = Math.min(1, dt * 12); const dx = px - s.x, dz = pz - s.z; if (dx * dx + dz * dz > 2500) { s.x = px; s.z = pz; } else { s.x += dx * f; s.z += dz * f; }
    s.th += angDiff(t.th, s.th) * f; s.phi += angDiff(t.phi, s.phi) * f; s.s = lerp(s.s, t.s, f); s.steer = lerp(s.steer, t.steer, f); s.hopY = t.hopY; s.drift.on = t.dr > 0; s.drift.dir = t.dd; s.drift.tier = t.dr > 0 ? t.dr - 1 : 0; s.boostT = t.boost ? 0.2 : 0; s.boostMul = 1.2; s.spinT = t.spin; s.starT = t.star; s.ghostT = t.ghost; s.shrinkT = t.shrink; s.lap = t.lap; s.prog = t.prog; s.lastS = t.ls; s.lat = t.lat; s.surf = t.surf || 'road'; k.finished = t.fin; k.item = t.item ? { id: t.item, n: 1 } : null; k.shield = t.shield; s.slipT = t.slip || 0;
  }
  afterStep(k, dt) {
    const s = k.sim, tc = this.track, local = k === this.localKart; const evs = s.events; const A = this.audio;
    for (const e of evs) this.simEvent(k, e);
    k.padCd -= dt; k.hazCd -= dt;
    // item boxes & coins
    if (this.itemsOn && !k.roll && !k.item) for (const b of this.view.boxes) { if (!b.active) continue; const dx = b.x - s.x, dz = b.z - s.z; if (dx * dx + dz * dz < 4.4) { b.active = false; b.respawn = 6; this.items.startRoll(k); if (this.net) this.net.send('box', { i: this.view.boxes.indexOf(b) }); this.fx.burst(b.x, 1.5, b.z, 0xffd23f, 14, 7); this.sfx('itembox', k); break; } }
    else if (this.itemsOn) for (const b of this.view.boxes) { if (!b.active) continue; const dx = b.x - s.x, dz = b.z - s.z; if (dx * dx + dz * dz < 4.4) { b.active = false; b.respawn = 6; if (this.net) this.net.send('box', { i: this.view.boxes.indexOf(b) }); this.fx.burst(b.x, 1.5, b.z, 0xffd23f, 10, 6); this.sfx('itembox', k, { vol: 0.5 }); } }
    for (const c of this.view.coins) { if (!c.active) continue; const dx = c.x - s.x, dz = c.z - s.z; if (dx * dx + dz * dz < 4.5) { c.active = false; c.respawn = 40; k.coins++; if (local) { this.statsRace.coins++; this.sfx('coin', k, { rate: 1 + Math.min(0.5, (this.statsRace.coins % 8) * 0.04) }); this.ui('coin', {}); } } }
    // pads
    if (k.padCd <= 0 && s.grounded) for (const p of this.view.pads) { const dx = s.x - p.x, dz = s.z - p.z; const sn = Math.sin(p.heading), cs = Math.cos(p.heading); const al = dx * sn + dz * cs, la = dx * cs - dz * sn; if (Math.abs(al) < p.hl && Math.abs(la) < p.hw) { s.addBoost(P.boostPad.sec, P.boostPad.mul, 'pad'); k.padCd = 0.8; this.sfx('boost_pad', k); this.fx.ring(p.x, 0.4, p.z, 0x38e1ff); if (local) { this.shakeCam(0.25); } if (p === this.view.scPad) { /* shortcut entry */ } break; } }
    // hazards
    if (k.hazCd <= 0 && !s.protected) { const h = this.hazards.check(k, this.t); if (h) { k.hazCd = 1.0; if (h.bounce) { s.s = -Math.abs(s.s) * 0.25 * h.along * -1; s.s = Math.min(s.s, 3); s.x -= h.tx * h.along * 2.2; s.z -= h.tz * h.along * 2.2; s.shake = 0.7; this.sfx('wall_hit', k); this.sfx('horn', k, { vol: 0.6 }); } else if (s.spin(h.spin, h.loss)) { this.onEvent('hit', { k, o: { x: h.x, z: h.z }, kind: h.kind }); } } }
    // shortcut notice
    if (local) { if (s.onSc && !k.inSc) { k.inSc = true; this.statsRace.shortcuts++; this.sfx('shortcut_found', k); this.say('shortcut', { delay: 0.2 }); this.ui('shortcut', {}); } else if (!s.onSc) k.inSc = false; if (s.wrongT > 2 && this.state === 'racing') { this.say('wrong_way'); this.ui('wrong', {}); } else this.ui('wrongOff', {}); }
    // finish
    if (!k.finished && s.lap >= this.laps && this.state !== 'grid') { k.finished = true; k.finishT = this.t; k.finishOrder = ++this.finishedCount; if (k.ai) k.auto = true; this.onEvent('finish', { k }); }
    // lap milestones
    if (s.lap !== k.lastLap) { k.lastLap = s.lap; if (s.lap >= 1 && !k.finished) this.onEvent('lap', { k, lap: s.lap }); }
  }
  simEvent(k, e) {
    const s = k.sim, local = k === this.localKart, A = this.audio;
    switch (e.name) {
      case 'hop': this.sfx('hop', k); break; case 'land': this.sfx('land', k, { vol: 0.5 }); break;
      case 'driftStart': this.sfx('drift_tick1', k, { vol: 0.35, rate: 0.7 }); break;
      case 'driftTier': this.sfx('drift_tick' + e.data.tier, k); if (local) { this.ui('tier', { tier: e.data.tier }); if (e.data.tier === 3) this.statsRace.maxTier = 3; } break;
      case 'driftBoost': this.sfx('boost_t' + e.data.tier, k); if (local) { this.statsRace.boosts++; this.statsRace.drifts++; this.shakeCam(0.2 + 0.12 * e.data.tier); this.bark(k, e.data.tier >= 2 ? 'boost2' : 'boost1', { cooldown: 9 }); if (e.data.tier === 3) this.say('great_drift', {}); this.ui('boost', { tier: e.data.tier }); } break;
      case 'spin': if (local) { this.shakeCam(0.6); if (A && A.ready) A.musicMuffle(1.4, 700); } this.sfx('spin_whirl', k); break;
      case 'wallHit': if (local) this.wallHits = (this.wallHits || 0) + 1; this.sfx('wall_hit', k, { vol: clamp(e.data.ang * 1.1, 0.4, 1) }); if (e.data.v > 25) this.sfx('crash_big', k, { vol: 0.5 }); if (local) this.shakeCam(clamp(e.data.ang, 0.3, 0.9)); this.fx.burst(s.x, 0.8, s.z, 0xffe3a0, 6, 5); break;
      case 'scrape': this.sfx('wall_scrape', k, { min: 0.18, vol: clamp(e.data.v / 40, 0.2, 0.8) }); this.fx.spark(s.x, 0.6, s.z, 0, Math.sin(s.phi) * s.s, Math.cos(s.phi) * s.s); break;
      case 'podBoost': this.sfx('pod_use', k); break;
    }
  }
  onEvent(type, d) {
    const A = this.audio, lk = this.localKart; const k = d.k; const local = k === lk;
    switch (type) {
      case 'roll': if (local) this.ui('roll', {}); break;
      case 'rollTick': if (local) this.sfx('roulette_tick', k, { rate: 0.9 + (d.tick % 5) * 0.06, vol: 0.5 }); break;
      case 'itemGot': if (local) { this.sfx('item_ready', k); this.ui('item', { id: d.id }); } break;
      case 'use': {
        const id = d.id; const map = { pod: null, trio: 'pod_use', nova: 'nova_start', veil: 'veil_on', jolt: 'jolt_arm', disc: 'disc_launch', peel: 'peel_drop', spill: 'spill_drop', rocket: 'rocket_launch' }; if (map[id]) this.sfx(map[id], k); if (id === 'nova') { this.bark(k, 'item', { cooldown: 3 }); if (local && A && A.ready) A.setMusicState('race', false, this.musicOpts({ star: true })); } if (id === 'rocket' || id === 'disc') this.bark(k, 'attack', { cooldown: 8 }); else if (id === 'pod' || id === 'trio' || id === 'veil') this.bark(k, 'item', { cooldown: 12 }); if (local) this.ui('use', { id }); if (this.net && k.auth) this.net.send('use', { k: k.id, id, tid: id === 'rocket' ? this.lastRocketTarget : undefined }); break; }
      case 'steal': this.sfx('steal', d.k); if (d.from === lk) { this.ui('stolen', {}); this.bark(lk, 'overtaken', { cooldown: 5 }); } break;
      case 'shieldUp': this.sfx('shield_up', k, { vol: 0.6 }); break;
      case 'discBounce': this.sfxPos('disc_bounce', d.o.x, d.o.z, { ref: 25 }); break; case 'discPop': this.sfxPos('disc_pop', d.o.x, d.o.z, { ref: 25 }); this.fx.burst(d.o.x, 0.6, d.o.z, 0x6fc3ff, 10, 6); break;
      case 'peelLand': this.sfxPos('peel_throw', d.o.x, d.o.z, { ref: 25, vol: 0.5 }); break;
      case 'slip': this.sfx('spill_slip', k); if (local) { this.shakeCam(0.2); } break;
      case 'hit': {
        const kind = d.kind; const snd = { disc: 'disc_hit', peel: 'peel_hit', rocket: 'rocket_explode', sheep: 'bump_heavy_a', crane: 'crash_big', boulder: 'crash_big', icicle: 'wall_hit', gate: 'wall_hit' }[kind] || 'bump_med_a'; this.sfx(snd, k); this.fx.burst(k.sim.x, 1.0, k.sim.z, kind === 'rocket' ? 0xff7a2a : 0xffe08a, 22, 9); if (kind === 'rocket') this.fx.ring(k.sim.x, 0.6, k.sim.z, 0xff7a2a);
        if (local) { k.lastHitAt = this.t; this.statsRace.hits++; this.bark(k, 'hit', { cooldown: 3 }); this.ui('hit', { kind }); } else this.bark(k, 'spin', { cooldown: 12 }); if (this.net && k.auth) this.net.send('hit', { k: k.id, by: d.o && d.o.owner ? d.o.owner.id : -1, kind }); break; }
      case 'hitOther': if (d.k === lk) { this.bark(lk, 'taunt', { cooldown: 6 }); this.ui('hitOther', {}); } break;
      case 'rocketExplode': this.fx.burst(d.k.sim.x, 1.2, d.k.sim.z, 0xffa24a, 30, 12); break;
      case 'lock': if (d.k === lk) { this.say('rocket_incoming'); this.ui('lock', {}); this.sfx('rocket_lock', lk); } break;
      case 'rocketBeep': this.sfx('rocket_lock', lk, { vol: 0.55, rate: 1.3, min: 0.05 }); break;
      case 'rocketBlocked': this.sfx('brace_ok', d.k, { vol: 0.5 }); break;
      case 'braceOk': this.sfx('brace_ok', d.k); this.fx.ring(d.k.sim.x, 1, d.k.sim.z, 0x6fe3ff); if (d.k === lk) { this.ui('brace', {}); this.bark(lk, 'item', { cooldown: 4 }); } break;
      case 'joltArm': if (lk && lk.sim.prog > d.k.sim.prog) this.say('storm_incoming'); this.ui('joltArm', {}); break;
      case 'joltFire': this.sfx('jolt_zap', lk); break;
      case 'joltHit': this.sfx('jolt_shrink', d.k); if (d.k === lk) { this.shakeCam(0.5); this.ui('hit', { kind: 'jolt' }); this.bark(lk, 'hit', { cooldown: 3 }); if (A && A.ready) A.musicMuffle(1.2, 900); } break;
      case 'joltBlocked': this.sfx('brace_ok', d.k, { vol: 0.5 }); break;
      case 'lap': {
        if (!d.k.auth) break; if (local) { const lap = d.lap; if (lap === this.laps - 1) { this.say('final_lap', { force: true }); this.sfx('finallap', k); if (A && A.ready) A.setMusicState('race', false, this.musicOpts({ finalLap: true })); this.bark(k, 'final', { cooldown: 2 }); this.ui('finalLap', {}); } else { this.say('lap_' + (lap + 1)); this.sfx('lap_chime', k); this.ui('lapMsg', { lap: lap + 1 }); } this.timeline.push({ lap, t: this.t }); this.lapSplit = this.t; this.lastPosCall = this.t + 2.6; setTimeout(() => { if (this.state === 'racing' && k.place <= 12 && k.place >= 1) this.say('pos_' + k.place, {}); }, 2600); } break; }
      case 'finish': {
        if (!d.k.auth) break; this.ui('finishKart', { k: d.k }); if (local) { this.say('race_complete', { force: true }); this.sfx(d.k.place <= 3 ? 'fanfare_win' : d.k.place <= 8 ? 'fanfare_mid' : 'fanfare_lose', k); this.bark(k, d.k.place <= 3 ? 'win' : 'lose', { cooldown: 1 }); if (A && A.ready) { A.setMusicState('results'); } setTimeout(() => this.say(d.k.place === 1 ? 'you_win' : d.k.place <= 6 ? 'pos_' + d.k.place : 'better_luck'), 1800); } if (this.net) this.net.send('fin', { k: d.k.id, t: d.k.finishT }); break; }
    }
  }
  musicOpts(extra = {}) { const lk = this.localKart; return { pos: lk ? lk.place : 6, n: this.karts.length, finalLap: lk && lk.sim.lap >= this.laps - 1, ...extra }; }
  shakeCam(v) { this.cam.shake = Math.max(this.cam.shake, v); }
  // ------------------------------------------------------------------ interactions
  collisions(dt) {
    const R = P.bump.kartRadius * 2; const ks = this.karts;
    for (let i = 0; i < ks.length; i++) for (let j = i + 1; j < ks.length; j++) {
      const a = ks[i], b = ks[j]; if (!a.auth && !b.auth) continue; const A = a.sim, B = b.sim; if (A.ghostT > 0 || B.ghostT > 0) continue; const dx = B.x - A.x, dz = B.z - A.z; const d2 = dx * dx + dz * dz; if (d2 > R * R || d2 < 1e-6) continue;
      const d = Math.sqrt(d2), nx = dx / d, nz = dz / d; const va = { x: Math.sin(A.phi) * A.s + A.bx, z: Math.cos(A.phi) * A.s + A.bz }, vb = { x: Math.sin(B.phi) * B.s + B.bx, z: Math.cos(B.phi) * B.s + B.bz }; const rel = (vb.x - va.x) * nx + (vb.z - va.z) * nz; const pen = R - d;
      const ma = A.st.mass * (A.shrinkT > 0 ? 0.6 : 1), mb = B.st.mass * (B.shrinkT > 0 ? 0.6 : 1);
      if (a.auth) { A.x -= nx * pen * (mb / (ma + mb)); A.z -= nz * pen * (mb / (ma + mb)); } if (b.auth) { B.x += nx * pen * (ma / (ma + mb)); B.z += nz * pen * (ma / (ma + mb)); }
      if (rel < 0) {
        const jn = -(1 + P.bump.restitution) * rel / (1 / ma + 1 / mb); if (a.auth) { A.bx -= jn / ma * nx; A.bz -= jn / ma * nz; } if (b.auth) { B.bx += jn / mb * nx; B.bz += jn / mb * nz; }
        const imp = -rel; const lossA = lerp(P.bump.heavyLoss, P.bump.lightLoss, mb / (ma + mb)), lossB = lerp(P.bump.heavyLoss, P.bump.lightLoss, ma / (ma + mb));
        if (a.auth && imp > 2) A.s *= (1 - lossA * clamp(imp / 12, 0.2, 1)); if (b.auth && imp > 2) B.s *= (1 - lossB * clamp(imp / 12, 0.2, 1));
        // star hits
        if (A.starT > 0 && B.starT <= 0 && b.auth) { B.spin(1.2, 0.5); B.shrinkT = 0; this.onEvent('hit', { k: b, o: { owner: a, x: B.x, z: B.z }, kind: 'star' }); this.onEvent('hitOther', { k: a, victim: b, kind: 'star' }); }
        if (B.starT > 0 && A.starT <= 0 && a.auth) { A.spin(1.2, 0.5); this.onEvent('hit', { k: a, o: { owner: b, x: A.x, z: A.z }, kind: 'star' }); this.onEvent('hitOther', { k: b, victim: a, kind: 'star' }); }
        if (imp > P.bump.spinImpactSpeed && A.starT <= 0 && B.starT <= 0) { const lighter = ma < mb * 0.95 ? a : mb < ma * 0.95 ? b : null; if (lighter && lighter.auth) lighter.sim.spin(P.bump.spinSec, 0.2); }
        const nowT = this.t; if (nowT - a.lastBumpSnd > 0.25 && nowT - b.lastBumpSnd > 0.25) { a.lastBumpSnd = b.lastBumpSnd = nowT; const heavy = ma + mb > 3.6; const nm = imp > 12 ? (heavy ? 'bump_heavy_' : 'bump_med_') : (imp > 5 ? 'bump_med_' : 'bump_light_'); const pk = (a === this.localKart || b === this.localKart) ? this.localKart : a; this.sfx(nm + (Math.random() < 0.5 ? 'a' : 'b'), pk, { vol: clamp(imp / 10, 0.3, 1) }); if (pk === this.localKart) { this.shakeCam(clamp(imp / 22, 0.1, 0.5)); this.bark(pk, 'overtaken', { cooldown: 15 }); } this.fx.burst((A.x + B.x) / 2, 0.8, (A.z + B.z) / 2, 0xfff0b0, 6, 4); }
      }
    }
  }
  updateDraft(dt) {
    const D = P.draft; for (const a of this.karts) { if (!a.auth) continue; const A = a.sim; let hit = false; for (const b of this.karts) { if (b === a) continue; const dx = b.sim.x - A.x, dz = b.sim.z - A.z; const f = dx * Math.sin(A.phi) + dz * Math.cos(A.phi); if (f < D.minDist || f > D.maxDist) continue; const lat = Math.abs(dx * Math.cos(A.phi) - dz * Math.sin(A.phi)); if (lat < D.lateral && b.sim.s > 14 && A.s > 14) { hit = true; break; } }
      if (hit) { A.draft.t += dt; } else { if (A.draft.t > D.slingshotAfterSec && A.s > 14) { A.draft.sling = D.slingshotSec; if (a === this.localKart) this.sfx('slingshot', a); } A.draft.t = Math.max(0, A.draft.t - dt * 2); } A.draft.on = A.draft.t > D.chargeSec; }
  }
  rank() {
    const ks = this.karts.slice(); ks.sort((a, b) => { if (a.finished && b.finished) return a.finishOrder - b.finishOrder; if (a.finished) return -1; if (b.finished) return 1; return b.sim.prog - a.sim.prog; });
    ks.forEach((k, i) => { const prev = k.place; k.place = i + 1; if (k === this.localKart && prev !== k.place && this.state === 'racing') { if (k.place < prev) { this.sfx('pos_up', k, { vol: 0.5 }); if (k.place === 1) { this.say('lead'); this.bark(k, 'overtake', { cooldown: 5 }); } else this.bark(k, 'overtake', { cooldown: 12 }); } else if (k.place > prev && prev > 0) this.sfx('pos_down', k, { vol: 0.4 }); if (this.audio && this.audio.ready && !k.finished) this.audio.setMusicState('race', false, this.musicOpts()); } }); this.ranked = ks;
  }
  checkEnd(dt) {
    const humans = this.karts.filter(k => k.human && !k.cpu); const allDone = humans.length ? humans.every(k => k.finished) : this.karts.every(k => k.finished);
    if (allDone && !this.endT) this.endT = this.t; if (!this.endT && this.karts.filter(k => k.finished).length >= 1 && humans.length && this.t - Math.min(...this.karts.filter(k => k.finished).map(k => k.finishT)) > 50) this.endT = this.t;
    if (this.endT && this.t - this.endT > (humans.length ? 3.2 : 1)) { this.finishRace(); }
  }
  finishRace() {
    if (this.state === 'finished') return; this.state = 'finished'; const res = this.ranked.map((k, i) => ({ id: k.id, name: k.name, disp: k.dispName, place: i + 1, time: k.finished ? k.finishT : null, human: k.human, local: k.local, coins: k.coins, prog: k.sim.prog })); this.results = res; this.ui('results', { results: res });
  }
  // ------------------------------------------------------------------ visuals
  updateVisuals(dt) {
    const t = this.t, camP = this.camera.position;
    for (const k of this.karts) {
      const s = k.sim, v = k.vis; const near = Math.hypot(s.x - camP.x, s.z - camP.z) < 160; v.root.visible = near; k.shadow.visible = near; if (k.glow) k.glow.visible = near; if (!near) continue;
      let yaw = s.th; v.root.position.set(s.x, s.hopY, s.z); v.root.rotation.y = yaw;
      const lean = clamp(-s.steer * 0.05 - (s.drift.on ? -s.drift.dir * 0.09 : 0), -0.2, 0.2); v.body.rotation.z = lerp(v.body.rotation.z, lean, Math.min(1, dt * 10)); const sq = clamp((s.boostT > 0 ? 0.05 : 0) + (k.throttleLast || 0) * 0.02, 0, 0.1); v.body.rotation.x = lerp(v.body.rotation.x, -sq + clamp(s.hopY * 0.12, 0, 0.1), Math.min(1, dt * 8));
      const shr = s.shrinkT > 0 ? 0.55 : 1; k.scaleCur = lerp(k.scaleCur ?? 1, shr, Math.min(1, dt * 8)); v.root.scale.setScalar(k.scaleCur);
      for (const w of v.wheels) { if (w.front) w.pivot.rotation.y = -s.steer * 0.5 + (s.drift.on ? -s.drift.dir * 0.2 : 0); w.spin.rotation.x += (s.s / w.rad) * dt; }
      if (v.driver) animateDriver(v.driver, s.steer, s.spinT > 0 || s.shake > 0.3 ? 1 : 0, k.place === 1 ? 1 : 0, dt, t);
      // star / ghost looks
      if (s.starT > 0) { v.paintMat.emissive.setHSL((t * 1.6) % 1, 1, 0.45); v.paintMat.emissiveIntensity = 0.9; } else if (v.paintMat.emissiveIntensity > 0 && v.paintMat.userData.star) { v.paintMat.emissiveIntensity = 0; } v.paintMat.userData.star = s.starT > 0; if (s.starT <= 0 && !v.paintMat.userData.pearl) { v.paintMat.emissive.setHex(0); }
      v.root.traverse(o => { if (o.material && o.material.transparent !== (s.ghostT > 0) && !o.material.userData.keep) { } });
      k.shadow.position.set(s.x, 0.06, s.z); k.shadow.rotation.y = yaw; if (k.glow) { k.glow.position.set(s.x, 0.08, s.z); k.glow.rotation.y = yaw; } const sc = k.scaleCur * (1 - clamp(s.hopY * 0.2, 0, 0.4)); k.shadow.scale.set(3.4 * sc, 1, 4.6 * sc);
      // shield trailing mesh
      if (k.shield) { if (!k.shieldMesh) { const src = k.shield === 'disc' ? this.items.meshes.disc : this.items.meshes.peel; k.shieldMesh = src.clone(); k.shieldMesh.material = src.material; this.scene.add(k.shieldMesh); k.shieldKind = k.shield; } const a = t * 5; k.shieldMesh.position.set(s.x - Math.sin(s.th) * 2.4 + Math.cos(a) * 0.3, 0.5, s.z - Math.cos(s.th) * 2.4 + Math.sin(a) * 0.3); k.shieldMesh.rotation.y = a; } else if (k.shieldMesh) { this.scene.remove(k.shieldMesh); k.shieldMesh = null; }
      this.kartFx(k, dt);
    }
  }
  kartFx(k, dt) {
    const s = k.sim, fx = this.fx; const camP = this.camera.position; if (Math.hypot(s.x - camP.x, s.z - camP.z) > 70) return; const sn = Math.sin(s.th), cs = Math.cos(s.th); const rx = cs, rz = -sn; // right-side vector (visual)
    const rearZ = k.vis.shape.zr, wx = k.vis.shape.wx; const vx = Math.sin(s.phi) * s.s, vz = Math.cos(s.phi) * s.s;
    if (s.drift.on && s.grounded) { const tier = s.drift.tier; for (const sd of [-1, 1]) { const px = s.x + sn * (rearZ - 0.2) - rx * sd * wx * -1, pz = s.z + cs * (rearZ - 0.2) - rz * sd * wx * -1; if (Math.random() < 0.9) fx.spark(px, 0.15, pz, tier, vx, vz); } if (Math.random() < 0.4) fx.dust(s.x - sn * 1.2, s.z - cs * 1.2, vx, vz, SURF_DUST[s.surf] || 0xb8bcc4, 0.8); }
    if (s.boostT > 0) { const col = s.boostKind === 'drift3' ? 0xc16bff : s.boostKind === 'drift2' ? 0xff9a2e : s.boostKind === 'pad' ? 0x38e1ff : s.boostKind === 'start' ? 0xffffff : s.boostKind === 'pod' ? 0x37e08a : 0x4db8ff; for (const sd of [-0.45, 0.45]) fx.flame(s.x + sn * (k.vis.shape.ex[1] - 0.2) + rx * sd, 0.5, s.z + cs * (k.vis.shape.ex[1] - 0.2) + rz * sd, -vx * 0.3, -vz * 0.3, col); }
    if (s.starT > 0 && Math.random() < 0.5) fx.add.emit(s.x + (Math.random() - 0.5) * 2, 0.8 + Math.random(), s.z + (Math.random() - 0.5) * 2, 0, 1.5, 0, 0.5, 0.8, 0.1, rgba(0xffe14a, 1), rgba(0xff6ad5, 0), 0, 1);
    if (s.spinT > 0 && Math.random() < 0.5) fx.dust(s.x, s.z, 0, 0, 0xfff0d0, 0.9);
    if ((s.surf === 'off' || s.surf === 'sand' || s.surf === 'rough') && s.s > 8 && Math.random() < 0.6) fx.dust(s.x - sn * 1.1, s.z - cs * 1.1, vx, vz, SURF_DUST[s.surf], 1);
    else if (s.surf === 'ice' && s.s > 10 && Math.random() < 0.3) fx.dust(s.x - sn * 1.1, s.z - cs * 1.1, vx, vz, 0xeaf6ff, 0.7);
    if (this.track.theme === 'frost' && s.surf === 'road' && s.s > 15 && Math.random() < 0.15) fx.dust(s.x - sn * 1.1, s.z - cs * 1.1, vx, vz, 0xffffff, 0.6);
  }
  positionCamera(dt, snap) {
    const lk = this.localKart || this.karts[0]; if (!lk) return; const s = lk.sim, c = this.cam, cam = this.camera; const aspect = cam.aspect; const portrait = aspect < 1;
    if (this.state === 'grid' && !snap) { // intro flyover
      const u = clamp(c.introT / (this.opts.introSec ?? 2.6), 0, 1); const e = u * u * (3 - 2 * u); const a = this.track.at(this.L - 20, 0, {}); const ang = lerp(2.6, 0, e); const R0 = lerp(22, portrait ? 9.5 : 7.4, e); const h = lerp(11, portrait ? 4.0 : 3.2, e);
      const yaw = s.th + ang; c.pos.set(s.x - Math.sin(yaw) * R0, h, s.z - Math.cos(yaw) * R0); c.look.set(s.x + Math.sin(s.th) * 4, 1.2, s.z + Math.cos(s.th) * 4); c.yaw = s.th; cam.position.copy(c.pos); cam.lookAt(c.look); cam.fov = 60; cam.updateProjectionMatrix(); return;
    }
    const back = this.input.look; const target = angDiff(s.th * 0.45 + s.phi * 0.55, 0); const wantYaw = s.th + angDiff(s.phi, s.th) * 0.55;
    if (snap) c.yaw = wantYaw; else c.yaw += angDiff(wantYaw, c.yaw) * (1 - Math.exp(-dt * (s.drift.on ? 4 : 6.5)));
    const yaw = c.yaw + (back ? Math.PI : 0); const spd = clamp(Math.abs(s.s) / (s.st.vmax * 1.2), 0, 1); const dist = (portrait ? 8.6 : 6.4) + spd * 0.9 + (s.boostT > 0 ? 0.6 : 0); const h = (portrait ? 4.1 : 3.0) + spd * 0.3;
    const px = s.x - Math.sin(yaw) * dist, pz = s.z - Math.cos(yaw) * dist; const k = snap ? 1 : 1 - Math.exp(-dt * 12);
    c.pos.x += (px - c.pos.x) * k; c.pos.y += (h + s.hopY * 0.5 - c.pos.y) * k; c.pos.z += (pz - c.pos.z) * k;
    const lx = s.x + Math.sin(yaw) * 5.5, lz = s.z + Math.cos(yaw) * 5.5; c.look.x += (lx - c.look.x) * k; c.look.y = 1.2 + s.hopY * 0.3; c.look.z += (lz - c.look.z) * k;
    c.shake = Math.max(c.shake - dt * 2.2, s.shake * 0.5); const sh = c.shake * 0.35; const jx = (Math.random() - 0.5) * sh, jy = (Math.random() - 0.5) * sh;
    cam.position.set(c.pos.x + jx, c.pos.y + jy, c.pos.z); cam.lookAt(c.look); const fovT = (portrait ? 68 : 60) + spd * 7 + (s.boostT > 0 ? 8 : 0) + (s.draft.on ? 2 : 0); c.fov += (fovT - c.fov) * (snap ? 1 : 1 - Math.exp(-dt * 5)); if (Math.abs(cam.fov - c.fov) > 0.05) { cam.fov = c.fov; cam.updateProjectionMatrix(); }
    const h2 = this.renderer.domElement.height; this.fx.setScale(h2 / (2 * Math.tan(cam.fov * Math.PI / 360)));
  }
  // ------------------------------------------------------------------ audio per frame
  updateAudio(dt) {
    const A = this.audio; if (!A || !A.ready) return; const lk = this.localKart; if (!lk) return; const s = lk.sim; A.setListener(this.camera.position.x, this.camera.position.z, this.cam.yaw);
    const f = Math.abs(s.s) / (s.st.vmax * 1.08); const thr = this.state === 'countdown' ? lk.rev : (s.spinT > 0 ? 0.1 : (this.input.throttle || (this.input.gas ? 1 : 0)));
    const G = [0, 0.2, 0.4, 0.6, 0.8, 1.2]; let gi = 0; while (gi < 4 && f > G[gi + 1]) gi++; const within = clamp((f - G[gi]) / (G[gi + 1] - G[gi]), 0, 1);
    let rpmT = this.state === 'countdown' ? 0.12 + 0.55 * lk.rev : (0.2 + gi * 0.1 + within * 0.34 + (s.boostT > 0 ? 0.05 : 0)); if (f < 0.04) rpmT = 0.1 + 0.08 * thr; if (s.stallT > 0) rpmT = 0.09;
    lk.rpm += (rpmT - lk.rpm) * (1 - Math.exp(-dt * (rpmT > lk.rpm ? 9 : 4.5))); lk.throttleLast = thr;
    if (this.engine) this.engine.update(lk.rpm, thr, s.boostT > 0 ? 1 : 0, 1);
    const L = this.loops || {}; const sv = (h, v, rate) => { if (h) { h.setVol(v, 0.07); if (rate) h.setRate(rate, 0.1); } };
    sv(L.wind, clamp(f * f * 0.55, 0, 0.55), 0.8 + f * 0.6); const slide = clamp((s.slip - 0.12) * 4, 0, 1) * (s.s > 8 ? 1 : 0); const skidV = (s.drift.on ? 0.45 : 0) + slide * 0.35; const key = s.surf === 'ice' ? 'skid_snow' : s.surf === 'sand' || s.surf === 'off' ? 'skid_sand' : 'skid_road';
    for (const kk of ['skid_road', 'skid_snow', 'skid_sand']) sv(L[kk], kk === key && s.grounded ? clamp(skidV, 0, 0.6) : 0, 0.9 + f * 0.25); sv(L.spark, s.drift.on && s.drift.tier > 0 ? 0.25 + 0.12 * s.drift.tier : 0, 0.9 + 0.1 * s.drift.tier);
    sv(L.off, (s.surf === 'off' || s.surf === 'rough' || s.surf === 'sand') && s.s > 4 ? clamp(f * 0.7, 0, 0.6) : 0); sv(L.draft, s.draft.on ? 0.45 : 0); sv(L.nova, s.starT > 0 ? 0.4 : 0); sv(L.crowd, this.crowdVol());
    // rivals engines: nearest three karts
    this.rivalT = (this.rivalT || 0) - dt; if (this.rivalT <= 0 && this.state !== 'grid') { this.rivalT = 0.6; const others = this.karts.filter(k => k !== lk).map(k => ({ k, d: Math.hypot(k.sim.x - s.x, k.sim.z - s.z) })).sort((a, b) => a.d - b.d).slice(0, 3); others.forEach((o, i) => { const slot = this.rivalEng[i]; if (!slot || slot.kart !== o.k) { if (slot && slot.eng) slot.eng.stop(); const eng = A.createEngine(o.k.cls, { spatial: true, vol: 0.6 }); this.rivalEng[i] = eng ? { kart: o.k, eng } : null; } }); }
    for (const sl of this.rivalEng) { if (!sl) continue; const k = sl.kart, ks = k.sim; const d = Math.hypot(ks.x - this.camera.position.x, ks.z - this.camera.position.z); const f2 = Math.abs(ks.s) / (ks.st.vmax * 1.08); let g2 = 0; while (g2 < 4 && f2 > G[g2 + 1]) g2++; const w2 = clamp((f2 - G[g2]) / (G[g2 + 1] - G[g2]), 0, 1); const rpm = this.state === 'countdown' ? 0.12 : 0.2 + g2 * 0.1 + w2 * 0.34; const vol = clamp(1 / (1 + d / 12), 0, 1) * 0.9; const rx = -Math.cos(this.cam.yaw), rz = Math.sin(this.cam.yaw); const pan = d > 0.5 ? ((ks.x - this.camera.position.x) * rx + (ks.z - this.camera.position.z) * rz) / d : 0; sl.eng.setPan(pan * 0.85); sl.eng.update(rpm, 0.8, ks.boostT > 0 ? 1 : 0, vol); }
  }
  crowdVol() { const lk = this.localKart; if (!lk) return 0; const a = this.track.at(0, 0, {}); const d = Math.hypot(lk.sim.x - a.x, lk.sim.z - a.z); return clamp(1 - d / 140, 0, 1) * 0.5; }
  // ------------------------------------------------------------------ net
  snapshot(k) { const s = k.sim; return { x: s.x, z: s.z, th: s.th, phi: s.phi, s: s.s, steer: s.steer, hopY: s.hopY, dr: s.drift.on ? s.drift.tier + 1 : 0, dd: s.drift.dir, boost: s.boostT > 0, spin: s.spinT, star: s.starT, ghost: s.ghostT, shrink: s.shrinkT, lap: s.lap, prog: s.prog, ls: s.lastS, lat: s.lat, surf: s.surf, fin: k.finished, item: k.item ? k.item.id : null, shield: k.shield, slip: s.slipT, ft: k.finishT }; }
  applySnapshot(id, snap) { const k = this.karts.find(q => q.id === id); if (!k || !k.remote) return; k.tgt = { ...snap, at: performance.now() }; if (snap.fin && !k.finished) { k.finished = true; k.finishT = snap.ft; k.finishOrder = ++this.finishedCount; } }
  dispose() {
    for (const k of this.karts) { this.scene.remove(k.vis.root); this.scene.remove(k.shadow); if (k.glow) this.scene.remove(k.glow); if (k.shieldMesh) this.scene.remove(k.shieldMesh); } this.view.dispose(); this.hazards.dispose(); this.items.dispose(); this.fx.dispose(this.scene);
    if (this.engine) this.engine.stop(); for (const r of this.rivalEng) if (r) r.eng.stop(); if (this.audio && this.audio.ready) { this.audio.stopAllLoops(); this.audio.stopAmbience(); }
  }
}
