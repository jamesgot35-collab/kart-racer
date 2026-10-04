// CPU drivers: follow the racing line with a look-ahead, brake to the curvature speed profile, drift corners, use items, take shortcuts.
import { P } from './stats.js';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const TAU = Math.PI * 2; const angDiff = (a, b) => { let d = a - b; while (d > Math.PI) d -= TAU; while (d < -Math.PI) d += TAU; return d; };
export class AI {
  constructor(kart, race, skill) { this.k = kart; this.race = race; this.skill = skill; this.lane = (Math.random() - 0.5) * 4; this.laneT = 0; this.itemT = 1 + Math.random() * 2; this.mode = 'main'; this.driftHold = false; this.dd = 0; this.useSc = Math.random() < 0.35 + skill * 0.45; this.scDecided = false; this.mistake = 0; this.nextMistake = 6 + Math.random() * 14; this.tmp = {}; this.startDelay = Math.random() * 0.18; this.stuckT = 0; }
  input(dt) {
    const k = this.k, s = k.sim, R = this.race, tc = R.track; const inp = { steer: 0, throttle: 1, brake: 0, drift: false, driftPressed: false }; const sp = Math.abs(s.s); const L = tc.length;
    const prog = s.lastS; const look = 9 + sp * 0.42; let tx, tz;
    // shortcut decision
    const sc = tc.sc; const nearEntry = sc && prog > sc.s1 - 40 && prog < sc.s1 + 6;
    if (sc) {
      if (prog < sc.s1 - 60 || prog > sc.s2 + 10) { this.scDecided = false; if (this.mode !== 'main' && !s.onSc) this.mode = 'main'; }
      if (nearEntry && !this.scDecided) { this.scDecided = true; this.mode = (this.useSc && R.hazardOkForCpu(k)) ? 'sc' : 'main'; }
    }
    if (this.mode === 'sc' && sc) {
      let u = s.q && s.q.sc ? s.q.sc.u : 0; if (!s.q.sc) { u = 0; } const idx = clamp(Math.round(u * (sc.n - 1)) + Math.round(look / 2), 0, sc.n - 1); const pt = sc.p[idx]; tx = pt[0]; tz = pt[1];
      if (s.q.sc && u > 0.97) this.mode = 'main';
      if (!s.q.sc && prog > sc.s1 + 8) this.mode = 'main';
    } else {
      const a = tc.linePoint(prog + look, this.lane * clamp(1 - Math.abs(tc.lineCurv(prog + look)) * 80, 0.2, 1), this.tmp); tx = a.x; tz = a.z;
    }
    // mistakes (small drifting off-line) for a human feel
    this.nextMistake -= dt; if (this.nextMistake < 0) { this.mistake = 1.2; this.nextMistake = 8 + Math.random() * 18 / (0.3 + this.skill); this.mistakeDir = Math.random() < 0.5 ? -1 : 1; } if (this.mistake > 0) { this.mistake -= dt; }
    const want = Math.atan2(tx - s.x, tz - s.z); const err = angDiff(want, s.th);
    let steer = clamp(-err * 2.4, -1, 1); if (this.mistake > 0 && this.skill < 0.95) steer = clamp(steer + this.mistakeDir * 0.35, -1, 1);
    // speed
    let vTarget = tc.lineSpeed(prog + look * 0.9 + sp * 0.6) * (0.9 + this.skill * 0.12) * 1.04; if (this.mode === 'sc') vTarget = Math.min(vTarget, 40); if (s.surf === 'ice') vTarget *= 0.85;
    if (sp > vTarget * 1.1 && !s.drift.on && s.boostT <= 0) { inp.throttle = 0; inp.brake = clamp((sp - vTarget * 1.1) / 8, 0, 0.9); } else if (sp > vTarget * 1.02 && !s.drift.on) inp.throttle = 0.4;
    // drift management
    const wn = P.drift.baseYaw * Math.min(s.st.yawMax * 1.2, 1.35 * s.st.latAccel / Math.max(sp, 1));
    const kA = tc.lineCurv(prog + 12 + sp * 0.3), kB = tc.lineCurv(prog + 30 + sp * 0.3), kC = tc.lineCurv(prog + 46 + sp * 0.3);
    const inWin = (k) => { const need = Math.abs(k) * sp; return need > 0.8 * wn && need < 1.25 * wn; };
    if (s.drift.on) {
      const kHere = tc.lineCurv(prog + 6); const done = Math.abs(tc.lineCurv(prog + 14)) < 0.006 || sp < 14 || (s.drift.tier >= 3 && Math.abs(kHere) < 0.01);
      inp.drift = !done && s.surf !== 'off' && Math.abs(s.lat) < tc.halfW + 1 && s.drift.charge < 6; inp.throttle = 1; inp.brake = 0; steer = clamp(steer, -1, 1);
      if (this.skill < 0.9 && Math.random() < 0.0015) inp.drift = false;
    } else if (inWin(kA) && inWin(kB) && Math.sign(kA) === Math.sign(kB) && Math.abs(kC) > 0.006 && sp > 22 && s.grounded && s.spinT <= 0 && this.skill > 0.55 && !R.opts.noDrift && s.surf !== 'ice' && !s.drift.hopped && this.mode === 'main') {
      if (!this.driftReq || this.driftReq < 0) { this.driftReq = 0.6; inp.driftPressed = true; inp.drift = true; this.driftDir = kA > 0 ? -1 : 1; }
    }
    if (s.drift.hopped && !s.drift.on && this.driftDir) { inp.drift = true; steer = this.driftDir * Math.max(Math.abs(steer), 0.3); }
    if (this.driftReq !== undefined) this.driftReq -= dt;
    inp.steer = steer;
    // start boost
    if (R.state === 'countdown') { inp.throttle = 0; if (R.cdT < 0.18 + this.startDelay && R.cdT > -0.3 && this.skill > 0.6) inp.throttle = 1; if (R.cdT > 0.3) inp.throttle = 0; }
    // unstick
    if (sp < 3 && R.state === 'racing' && s.spinT <= 0) { this.stuckT += dt; if (this.stuckT > 2.2) { const a = tc.at(s.lastS + 6, 0, this.tmp); s.x = a.x; s.z = a.z; s.th = s.phi = a.heading; s.s = 8; this.stuckT = 0; s.bx = s.bz = 0; } } else this.stuckT = 0;
    // items
    this.itemT -= dt; if (k.item && this.itemT <= 0 && R.state === 'racing') this.useItem(k, inp);
    k.backHeld = false; return inp;
  }
  useItem(k, inp) {
    const R = this.race, s = k.sim, id = k.item.id; const L = R.track.length; const ahead = R.nearestAhead(k, 45), behind = R.nearestBehind(k, 28); const calm = Math.abs(R.track.lineCurv(s.lastS + 15)) < 0.006;
    const done = () => { this.itemT = 0.6 + Math.random() * 1.8; };
    // mercy window: right after the human was hit, CPUs hold offensive items for a few seconds so they can't chain-hit them
    if (R.localKart && k !== R.localKart && R.t - (R.localKart.lastHitAt ?? -99) < 4.5 && (id === 'nova' || id === 'rocket' || id === 'jolt' || id === 'disc')) { this.itemT = 1.0; return; }
    if (id === 'pod' || id === 'trio') { if (calm && s.boostT <= 0) { R.items.press(k); R.items.release(k); done(); } else this.itemT = 0.3; }
    else if (id === 'nova' || id === 'rocket' || id === 'jolt') { R.items.press(k); done(); }
    else if (id === 'veil') { if (ahead || Math.random() < 0.02) { R.items.press(k); done(); } else this.itemT = 0.5; }
    else if (id === 'disc') { if (ahead && Math.abs(ahead.sim.lat - s.lat) < 4) { k.backHeld = false; R.items.press(k); k.holding && (k.holding.t = 0.05); R.items.release(k); done(); } else if (behind && Math.abs(behind.sim.lat - s.lat) < 4) { k.backHeld = true; R.items.press(k); R.items.release(k); k.backHeld = false; done(); } else { if (!k.holding) R.items.press(k); k.holdFor = (k.holdFor || 0) + 0.5; this.itemT = 0.5; if (k.holdFor > 8) { R.items.release(k); k.holdFor = 0; done(); } } }
    else if (id === 'peel' || id === 'spill') { if (behind || ahead && id === 'peel' && Math.random() < 0.4) { R.items.press(k); if (k.holding) { k.holding.t = 0.05; } k.backHeld = id === 'peel' ? !ahead : true; R.items.release(k); k.backHeld = false; done(); } else { this.itemT = 0.8; k.holdFor = (k.holdFor || 0) + 0.8; if (k.holdFor > 10) { R.items.press(k); R.items.release(k); k.holdFor = 0; done(); } } }
  }
}
