// Arcade kart simulation (fixed step). Heading theta (body) and travel heading phi are separate so drifting slides.
import { P } from './stats.js';
const TAU = Math.PI * 2; const clamp = (v, a, b) => Math.max(a, Math.min(b, v)); const lerp = (a, b, t) => a + (b - a) * t;
const angDiff = (a, b) => { let d = a - b; while (d > Math.PI) d -= TAU; while (d < -Math.PI) d += TAU; return d; };
export class KartSim {
  constructor(st, track) {
    this.st = st; this.track = track; this.x = 0; this.z = 0; this.th = 0; this.phi = 0; this.s = 0; this.bx = 0; this.bz = 0; this.steer = 0;
    this.drift = { on: false, dir: 0, charge: 0, tier: 0, hopped: false, hopT: 0 }; this.hopY = 0; this.hopV = 0; this.grounded = true;
    this.boostT = 0; this.boostMul = 1; this.boostKind = ''; this.spinT = 0; this.spinTotal = 0; this.spinDir = 1; this.shrinkT = 0; this.starT = 0; this.ghostT = 0; this.slipT = 0; this.stallT = 0; this.invulT = 0;
    this.hint = 0; this.q = {}; this.surf = 'road'; this.lap = -1; this.lastS = 0; this.prog = 0; this.draft = { t: 0, on: false, sling: 0, slingT: 0 }; this.topScale = 1; this.wrongT = 0; this.stuckT = 0; this.scrape = 0; this.shake = 0; this.events = [];
    this.yawRate = 0; this.lat = 0; this.onSc = false; this.slip = 0; this.fwdSpeed = 0; this.airT = 0; this.lastRowId = -1; this.throttle = 0;
  }
  place(x, z, heading) { this.x = x; this.z = z; this.th = this.phi = heading; this.s = 0; const q = this.track.query(x, z, -1, this.q); this.hint = q.idx; this.lastS = q.s; this.prog = this.lap * this.track.length + q.s; }
  ev(name, data) { this.events.push({ name, data }); }
  get speedKmh() { return Math.abs(this.s) * 4; }
  get boosting() { return this.boostT > 0; }
  get protected() { return this.starT > 0 || this.ghostT > 0 || this.invulT > 0; }
  addBoost(sec, mul, kind) { if (mul >= this.boostMul || this.boostT <= 0 || sec > this.boostT) { if (this.boostT <= 0 || mul >= this.boostMul) { this.boostMul = Math.max(this.boostT > 0 ? this.boostMul : 1, mul); this.boostT = Math.max(this.boostT, sec); this.boostKind = kind; } else this.boostT = Math.max(this.boostT, sec); } }
  spin(sec, speedLoss = 0.5, dir = 0) { if (this.starT > 0 || this.ghostT > 0) return false; if (this.invulT > 0 && sec > 0.5) return false; this.spinT = sec; this.spinTotal = sec; this.spinDir = dir || (Math.random() < 0.5 ? -1 : 1); this.s *= (1 - speedLoss); this.drift.on = false; this.drift.charge = 0; this.drift.tier = 0; this.boostT = Math.min(this.boostT, 0.2); this.invulT = sec + 0.8; this.shake = Math.max(this.shake, 0.6); this.ev('spin', { sec }); return true; }
  step(dt, inp) {
    const st = this.st, tr = this.track, d = this.drift; this.events.length = 0; const surfIn = this.surf;
    // ---- timers
    for (const k of ['boostT', 'spinT', 'shrinkT', 'starT', 'ghostT', 'slipT', 'stallT', 'invulT']) if (this[k] > 0) { this[k] -= dt; if (this[k] < 0) this[k] = 0; }
    if (this.boostT <= 0) this.boostMul = 1;
    if (this.shake > 0) this.shake = Math.max(0, this.shake - dt * 2.4);
    // ---- surface
    const q = tr.query(this.x, this.z, this.hint, this.q); this.hint = q.idx; this.surf = q.surface; this.lat = q.lat; this.onSc = !!q.sc;
    let topMul = 1, accMul = 1, gripMul = 1, latMul = 1;
    if (this.starT <= 0) {
      if (this.surf === 'off') { topMul = st.offTop; accMul = P.offroad.accelMul; gripMul = 0.64; latMul = 0.75; }
      else if (this.surf === 'rough') { topMul = P.offroad.rough; accMul = 0.85; gripMul = 0.85; }
      else if (this.surf === 'sand') { topMul = 0.82; accMul = 0.85; gripMul = 0.7; latMul = 0.8; }
      else if (this.surf === 'ice') { topMul = 1.0; accMul = 0.9; gripMul = 0.3; latMul = 0.5; }
    }
    if (this.boostT > 0 && this.surf === 'off') topMul = lerp(topMul, 1, 0.5);
    // ---- top speed
    let top = st.vmax * topMul * this.topScale; if (this.shrinkT > 0) top *= P.item.jolt.speedMul; if (this.starT > 0) top *= P.item.nova.mul; if (this.draft.on) top *= P.draft.topMul;
    if (this.boostT > 0) top = Math.max(top, st.vmax * this.topScale * this.boostMul * (this.surf === 'off' && this.starT <= 0 ? 0.9 : 1));
    if (this.draft.sling > 0) { top *= P.draft.slingshotMul; this.draft.sling -= dt; }
    // ---- throttle/brake
    let thr = this.spinT > 0 ? 0 : (this.stallT > 0 ? 0 : inp.throttle || 0); const brk = inp.brake || 0; this.throttle = thr;
    const aMul = this.boostT > 0 ? 2.4 : this.draft.on ? 1.1 : 1; const inRecover = this.spinT > 0 ? 0.3 : 1;
    if (thr > 0 && this.s >= -0.1) {
      if (this.s < top) { const a = st.a0 * (1 - Math.pow(Math.max(0, this.s) / top, 2)) * accMul * aMul * thr; this.s += Math.max(a, 1.5 * accMul) * dt; } else this.s = Math.max(top, this.s - 14 * dt);
    } else if (this.s > top) this.s = Math.max(top, this.s - 14 * dt);
    if (brk > 0) { if (this.s > 0.5) this.s = Math.max(0, this.s - P.brake * brk * dt); else this.s = Math.max(-P.reverseMax, this.s - 9 * brk * dt); }
    else if (thr <= 0) { const sg = Math.sign(this.s); this.s -= sg * P.coastDrag * dt * (this.spinT > 0 ? 3 : 1); if (Math.sign(this.s) !== sg) this.s = 0; }
    if (this.s < 0 && thr > 0.1) this.s = Math.min(0, this.s + P.brake * dt);
    // ---- steering
    const target = this.spinT > 0 ? 0 : clamp(inp.steer || 0, -1, 1); this.steer += (target - this.steer) * Math.min(1, dt * (this.slipT > 0 ? 3 : 11)); let steer = this.steer;
    if (this.slipT > 0) steer = steer * 0.2 + Math.sin(this.slipT * 14) * 0.7;
    const sp = Math.abs(this.s); const latCap = st.latAccel * latMul; let omegaMax = Math.min(st.yawMax, latCap / Math.max(sp, 1)) * Math.min(1, sp / 5); const sgn = this.s >= 0 ? 1 : -1;
    // drift state machine
    if (inp.driftPressed && this.grounded && this.spinT <= 0 && !d.on && sp > 6) { this.hopV = 6.2; this.grounded = false; this.hopY = 0.001; d.hopped = true; d.hopT = 0.35; this.ev('hop', {}); }
    if (d.hopped) { d.hopT -= dt; if (!inp.drift || (d.hopT < -0.35 && this.grounded)) d.hopped = false; if (inp.drift && this.grounded && !d.on && sp >= P.drift.minSpeed && Math.abs(steer) > 0.2 && this.spinT <= 0) { d.on = true; d.dir = steer > 0 ? 1 : -1; d.charge = 0; d.tier = 0; d.hopped = false; this.ev('driftStart', {}); } }
    if (d.on) {
      if (!inp.drift || sp < 11 || this.spinT > 0) { this.endDrift(); }
      else {
        const al = steer * d.dir; const mult = P.drift.chargeNoSteerMul + (P.drift.chargeFullSteerMul - P.drift.chargeNoSteerMul) * clamp(al, 0, 1);
        if (this.surf !== 'off') d.charge += dt * mult; const tcs = P.drift.chargeSec; let tier = d.charge >= tcs[2] ? 3 : d.charge >= tcs[1] ? 2 : d.charge >= tcs[0] ? 1 : 0;
        if (tier > d.tier) { d.tier = tier; this.ev('driftTier', { tier }); }
      }
    }
    // yaw
    let omega;
    if (d.on) { const al = steer * d.dir; const f = al >= 0 ? lerp(1, P.drift.innerYawMul, al) : lerp(1, P.drift.outerYawMul, -al); omega = -d.dir * P.drift.baseYaw * Math.min(st.yawMax * 1.2, 1.35 * latCap / Math.max(sp, 1)) * f; }
    else omega = -steer * omegaMax * sgn;
    this.yawRate = omega; this.th += omega * dt;
    // limit body/travel angle
    let diff = angDiff(this.th, this.phi); const maxA = d.on ? (P.drift.angleDeg * Math.PI / 180) * (0.8 + 0.3 * clamp(steer * d.dir, -1, 1)) : 0.5;
    if (Math.abs(diff) > maxA) { this.th = this.phi + Math.sign(diff) * maxA; diff = Math.sign(diff) * maxA; }
    // travel heading follows the body
    const k = d.on ? st.driftGrip : P.grip.normal * gripMul * (this.slipT > 0 ? 0.4 : 1);
    this.phi += angDiff(this.th, this.phi) * Math.min(1, k * dt); this.slip = Math.abs(angDiff(this.th, this.phi));
    // speed scrub from slip/understeer
    if (!d.on && sp > 8) { const demand = Math.abs(omega) * sp / Math.max(latCap, 1); this.s -= Math.sign(this.s) * Math.max(0, demand - 0.8) * 8 * dt; }
    if (d.on) this.s -= Math.sign(this.s) * 0.4 * dt * (sp / st.vmax);
    if (this.spinT > 0) { this.th += this.spinDir * (Math.PI * 2 * 2 / this.spinTotal) * dt; this.phi += angDiff(this.th, this.phi) * 0.02; }
    // ---- hop vertical
    if (!this.grounded) { this.hopY += this.hopV * dt; this.hopV -= 28 * dt; if (this.hopY <= 0) { this.hopY = 0; this.hopV = 0; this.grounded = true; this.ev('land', {}); } this.airT += dt; } else this.airT = 0;
    // ---- integrate
    const fx = Math.sin(this.phi), fz = Math.cos(this.phi);
    this.x += (fx * this.s + this.bx) * dt; this.z += (fz * this.s + this.bz) * dt; const bd = Math.exp(-6 * dt); this.bx *= bd; this.bz *= bd;
    // ---- walls
    this.scrape = Math.max(0, this.scrape - dt * 4);
    const w = tr.constrain(this.x, this.z, this.hint);
    if (w) {
      const pen = w.pen + 1.1; this.x = w.x + w.nx * 1.1; this.z = w.z + w.nz * 1.1; const vx = fx * this.s, vz = fz * this.s; const vn = vx * w.nx + vz * w.nz; // normal points back inside
      if (vn < 0) {
        const ang = Math.abs(vn) / Math.max(sp, 0.1); // sin of impact angle
        if (this.starT <= 0 || true) {
          if (ang < 0.42) { this.s -= Math.sign(this.s) * P.bump.wallScrapeLoss * sp * dt * 6; this.scrape = 1; this.ev('scrape', { v: sp }); }
          else { const loss = P.bump.wallHeadOnLoss * clamp((ang - 0.42) / 0.5, 0.2, 1); this.s *= (1 - loss); this.shake = Math.max(this.shake, clamp(ang, 0.3, 1)); this.ev('wallHit', { v: sp, ang }); }
          // reflect travel direction partially
          const tx = vx - vn * w.nx * 1.0, tz = vz - vn * w.nz * 1.0; const nv = Math.hypot(tx + w.nx * Math.abs(vn) * 0.25, tz + w.nz * Math.abs(vn) * 0.25);
          this.phi = Math.atan2(tx + w.nx * Math.abs(vn) * 0.25, tz + w.nz * Math.abs(vn) * 0.25); this.th += angDiff(this.phi, this.th) * 0.35; if (this.drift.on && ang > 0.42) this.endDrift();
        }
      }
      if (this.s >= 0 && this.s < 4) this.s = Math.max(this.s, 4 * (thr > 0 ? 1 : 0));
    }
    // ---- progress
    const q2 = tr.query(this.x, this.z, this.hint, this.q); this.hint = q2.idx; this.surf = q2.surface; const sNow = q2.s; const L = tr.length;
    if (this.lastS > 0.75 * L && sNow < 0.25 * L) { this.lap++; this.ev('lap', { lap: this.lap }); } else if (this.lastS < 0.25 * L && sNow > 0.75 * L) this.lap--;
    this.lastS = sNow; this.prog = this.lap * L + sNow;
    const tdot = fx * q2.m.tx + fz * q2.m.tz; if (!q2.sc && tdot < -0.25 && sp > 8) this.wrongT += dt; else this.wrongT = Math.max(0, this.wrongT - dt * 2);
    if (sp < 2 && this.spinT <= 0) this.stuckT += dt; else this.stuckT = 0;
    this.fwdSpeed = this.s;
  }
  endDrift() {
    const d = this.drift; if (!d.on) return; const t = d.tier; d.on = false; d.charge = 0; d.tier = 0;
    if (t >= 1) { this.addBoost(P.drift.boostSec[t - 1], P.drift.boostMul[t - 1], 'drift' + t); this.ev('driftBoost', { tier: t }); this.shake = Math.max(this.shake, 0.15 * t); } else this.ev('driftCancel', {});
  }
}
