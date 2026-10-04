// Random-search new closed turtle layouts that pass closure + separation + curvature checks. usage: node tools/randtrack.mjs seed count
import { runTurtle, shiftStart } from '../src/turtle.js';
import { TrackCore } from '../src/trackcore.js';
let seed = +(process.argv[2] || 1); const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const pick = (a) => a[(rnd() * a.length) | 0];
const want = +(process.argv[3] || 5); const dirSign = +(process.argv[4] || 1);
const out = [];
for (let tries = 0; tries < 60000 && out.length < want; tries++) {
  const nTurn = 9 + ((rnd() * 7) | 0); const angs = []; let net = 0;
  for (let i = 0; i < nTurn; i++) { const a = pick([30, 45, 60, 60, 90, 90, 90, 120, 150, 180]); const sg = rnd() < 0.72 ? dirSign : -dirSign; angs.push([sg, a]); net += sg * a; }
  if (net !== 360 * dirSign) continue;
  const prog = [['F', 200 + rnd() * 250]];
  for (const [sg, a] of angs) { prog.push([sg > 0 ? 'L' : 'R', a, 32 + ((rnd() * 60) | 0)]); prog.push(['F', 30 + ((rnd() * 220) | 0)]); }
  const straights = prog.map((c, i) => c[0] === 'F' ? i : -1).filter(i => i >= 0);
  let best = null;
  for (const a of straights) for (const b of straights) { if (a >= b) continue; try { const t = runTurtle(prog, [a, b]); const sc = Math.abs(t.adj[0]) + Math.abs(t.adj[1]); if (!best || sc < best.sc) best = { sc, fix: [a, b], t }; } catch (e) { } }
  if (!best) continue;
  const pts = shiftStart(best.t.pts, 0);
  let tc; try { tc = new TrackCore({ id: 'x', pts, width: 15, offroad: 9 }); } catch (e) { continue; }
  const sep = tc.minSeparation().min; if (sep < 88) continue; if (tc.length < 1700 || tc.length > 2500) continue;
  let minR = 1e9; for (let i = 0; i < tc.N; i++) { const k = Math.abs(tc.k[i]); if (k > 1e-5) minR = Math.min(minR, 1 / k); } if (minR < 30) continue;
  const xs = pts.map(p => p[0]), zs = pts.map(p => p[1]); const bb = [Math.max(...xs) - Math.min(...xs), Math.max(...zs) - Math.min(...zs)];
  if (Math.max(...bb) / Math.min(...bb) > 2.4) continue;
  const longest = Math.max(...best.t.prog.filter(c => c[0] === 'F').map(c => c[1])); if (longest < 200) continue;
  out.push({ prog: best.t.prog.map(c => c.map(v => typeof v === 'number' ? Math.round(v * 10) / 10 : v)), fix: best.fix, len: Math.round(tc.length), sep: Math.round(sep), minR: Math.round(minR), bb: bb.map(Math.round), turns: nTurn });
}
console.log(JSON.stringify(out));
