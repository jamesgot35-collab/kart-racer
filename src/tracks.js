import { TRACK_DEFS } from './trackdefs.js';
import { runTurtle, shiftStart } from './turtle.js';
import { TrackCore } from './trackcore.js';
export const TRACK_ORDER = ['meadow', 'harbor', 'mesa', 'frost'];
export function trackPoints(def) {
  const r = runTurtle(def.prog, def.fix);
  return shiftStart(r.pts, def.start || 0).map(p => [p[0] * (def.scale || 1), p[1] * (def.scale || 1)]);
}
export function buildTrack(id, opts = {}) {
  const def = TRACK_DEFS[id]; const full = { ...def, pts: trackPoints(def) };
  const tc = new TrackCore(full, opts); tc.id = id; tc.theme = def.theme; tc.meta = def;
  // content placement (fractions of lap -> metres), adjusted away from corners
  const L = tc.length; const fr = (f) => (opts.reverse ? 1 - f : f) * L;
  const calm = (s, win = 70) => { // nudge s to the lowest-curvature spot nearby
    let best = s, bk = 1e9; for (let o = -win; o <= win; o += 4) { const k = Math.abs(tc.lineCurv(s + o)) + Math.abs(tc.k[((Math.round((s + o) / tc.step) % tc.N) + tc.N) % tc.N]) * 0.5 + Math.abs(o) * 0.00004; if (k < bk) { bk = k; best = s + o; } } return ((best % L) + L) % L; };
  tc.rows = def.rows.map(f => { let s = calm(fr(f)); if (s < 130 || s > L - 30) s = 140 + (s < 130 ? 0 : 0); return s; }).sort((a, b) => a - b);
  tc.pads = def.pads.map(f => calm(fr(f), 50));
  tc.coinGroups = def.coinGroups.map(f => fr(f));
  return tc;
}
export function measureAll() {
  const out = {}; for (const id of TRACK_ORDER) { const t = buildTrack(id); out[TRACK_DEFS[id].name] = { length: t.length, minSep: t.minSeparation().min, shortcut: t.sc ? { len: t.sc.length, s1: t.sc.s1, s2: t.sc.s2, saves: (t.sc.s2 - t.sc.s1) - t.sc.length } : null }; }
  return out;
}
