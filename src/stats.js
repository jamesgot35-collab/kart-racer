import PHYS from '../design/physics.json';
import DATA from './gamedata.json';
export const P = PHYS;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const KEYS = ['S', 'A', 'H', 'G', 'W'];
export function findBody(name) { return DATA.bodies.find(b => b.name === name) || DATA.bodies[0]; }
export function modOf(build) {
  const w = DATA.wheels.find(x => x.name === build.wheel) || DATA.wheels[0]; const sz = DATA.wheelSizes[build.size ?? 2];
  const sp = DATA.spoilers.find(x => x.name === build.spoiler) || DATA.spoilers[0]; const ex = DATA.exhausts.find(x => x.name === build.exhaust) || DATA.exhausts[0]; const bu = DATA.bumpers.find(x => x.name === build.bumper) || DATA.bumpers[0];
  const m = { S: 0, A: 0, H: 0, G: 0, W: 0 }; for (const k of KEYS) m[k] = clamp(w[k] + sz[k] + sp[k] + ex[k] + bu[k], -PHYS.modCapPerStat, PHYS.modCapPerStat);
  return { m, off: w.off, tire: w.tire };
}
export function finalStats(build, cls = 'Medium') {
  const b = findBody(build.body); const cm = PHYS.class[cls]; const { m, off, tire } = modOf(build); const s = {};
  for (const k of KEYS) s[k] = clamp(b[k] + cm[k] + m[k], 1, 10);
  s.vmax = PHYS.topSpeed.base + PHYS.topSpeed.perStat * s.S; s.t90 = PHYS.accel.t90Base - PHYS.accel.t90PerStat * s.A; s.a0 = 1.472 * s.vmax / s.t90;
  s.yawMax = PHYS.steer.yawRateMaxDeg * (0.72 + 0.03 * s.H) * Math.PI / 180; s.latAccel = PHYS.steer.latAccelBase + PHYS.steer.latAccelPerGrip * s.G;
  s.mass = PHYS.bump.massBase + PHYS.bump.massPerWeight * s.W; s.offTop = clamp(PHYS.offroad.topMul + 0.1125 * off, 0.4, 0.95); s.tire = tire; s.slipMul = (tire === 'Trail' || tire === 'Mud') ? 0.5 : 1;
  s.cls = cls; s.base = b; s.driftGrip = PHYS.grip.driftSlide + 0.1 * (s.G - 5);
  return s;
}
export function statBars(build, cls) { const s = finalStats(build, cls); return { S: s.S, A: s.A, H: s.H, G: s.G, W: s.W }; }
