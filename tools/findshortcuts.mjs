import { runTurtle, shiftStart } from '../src/turtle.js';
import { TrackCore } from '../src/trackcore.js';
import fs from 'fs';
const progs = JSON.parse(fs.readFileSync(new URL('./progs.json', import.meta.url)));
const out = {};
function build(cfg) {
  let r = null, fix = cfg.fix;
  if (fix === 'auto') { let b = 1e9; const st = cfg.prog.map((c, i) => c[0] === 'F' ? i : -1).filter(i => i >= 0);
    for (const a of st) for (const c of st) { if (a >= c) continue; try { const t = runTurtle(cfg.prog, [a, c]); const sc = Math.abs(t.adj[0]) + Math.abs(t.adj[1]); if (sc < b) { b = sc; r = t; } } catch (e) {} } }
  else r = runTurtle(cfg.prog, fix);
  const pts = shiftStart(r.pts, cfg.start || 0).map(p => [p[0] * (cfg.scale || 1), p[1] * (cfg.scale || 1)]);
  return pts;
}
for (const [name, cfg] of Object.entries(progs)) {
  const pts = build(cfg);
  const tc = new TrackCore({ id: name, pts, width: 15, offroad: 9 });
  const L = tc.length, step = tc.step, N = tc.N, lim = tc.limit, scHalf = 5.5; let cands = [];
  for (const sd of [1, -1]) for (let i = Math.floor(0.12 * N); i < 0.9 * N; i += 2) for (let span = 100; span <= 300; span += 10) {
    const j = i + Math.round(span / step); if (j > 0.93 * N) break;
    const E = tc.at(tc.s[i], sd * (tc.halfW - 1)), X = tc.at(tc.s[j], sd * (tc.halfW - 1));
    const E1 = tc.at(tc.s[i] + 10, sd * (lim + 5)), X1 = tc.at(tc.s[j] - 10, sd * (lim + 5));
    const chord = Math.hypot(X1.x - E1.x, X1.z - E1.z); if (chord < 40) continue;
    const arc = span - 20; if (arc / chord < 1.35) continue;
    // chord interior clearance
    let ok = true; const m = Math.ceil(chord / 3);
    for (let k = 1; k < m && ok; k++) { const f = k / m; const x = E1.x + (X1.x - E1.x) * f, z = E1.z + (X1.z - E1.z) * f; const q = tc.nearestGlobal(x, z); if (Math.abs(q.lat) < lim + scHalf + 2.5 && k > 4 && k < m - 4) ok = false; if (q.d < lim + 1 && k > 4 && k < m - 4) ok = false; }
    if (!ok) continue;
    // straight-line sanity: chord must not pass near sample of road far in arclength
    cands.push({ sd, i, j, span, chord: Math.round(chord), ratio: +(arc / chord).toFixed(2), score: -Math.abs(arc - chord / (cfg.scSurf === 'ice' ? 1.0 : 0.8) - 85), s1: Math.round(tc.s[i]), s2: Math.round(tc.s[j]), E0: [E.x, E.z], E1: [E1.x, E1.z], X1: [X1.x, X1.z], X0: [X.x, X.z] });
  }
  cands.sort((a, b) => b.score - a.score);
  console.log(name, 'L', L.toFixed(0), 'cands', cands.length); for (const c of cands.slice(0, 4)) console.log('  ', c.sd, 's', c.s1, '->', c.s2, 'span', c.span, 'chord', c.chord, 'ratio', c.ratio, 'score', c.score.toFixed(0));
  out[name] = cands.slice(0, 600);
}
fs.writeFileSync('/tmp/shortcuts.json', JSON.stringify(out));
