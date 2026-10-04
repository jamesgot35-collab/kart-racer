import { runTurtle, shiftStart } from '../src/turtle.js';
import { TrackCore } from '../src/trackcore.js';
import fs from 'fs';
const progs = JSON.parse(fs.readFileSync(new URL('./progs.json', import.meta.url)));
for (const [name, cfg] of Object.entries(progs)) {
  try {
    let r = null, fix = cfg.fix;
    if (fix === 'auto') { let bestScore = 1e9; const straights = cfg.prog.map((c, i) => c[0] === 'F' ? i : -1).filter(i => i >= 0);
      for (const a of straights) for (const b of straights) { if (a >= b) continue; try { const t = runTurtle(cfg.prog, [a, b]); const sc = Math.abs(t.adj[0]) + Math.abs(t.adj[1]); if (sc < bestScore) { bestScore = sc; r = t; fix = [a, b]; } } catch (e) {} }
      if (!r) throw new Error('no feasible closure'); } else r = runTurtle(cfg.prog, fix);
    r.pts = r.pts.map(p => [p[0] * (cfg.scale || 1), p[1] * (cfg.scale || 1)]);
    const pts = shiftStart(r.pts, cfg.start || 0);
    const tc = new TrackCore({ id: name, pts, width: cfg.width || 15, offroad: cfg.off || 9 });
    let minR = 1e9; for (let i = 0; i < tc.N; i++) { const k = Math.abs(tc.k[i]); if (k > 1e-5) minR = Math.min(minR, 1 / k); }
    const sep = tc.minSeparation(); let xs = pts.map(p => p[0]), zs = pts.map(p => p[1]);
    console.log(name.padEnd(10), 'fix', fix.join(','), 'net', r.net, 'len', tc.length.toFixed(0), 'minR', minR.toFixed(0), 'sep', sep.min.toFixed(0), 'bbox', (Math.max(...xs) - Math.min(...xs)).toFixed(0), 'x', (Math.max(...zs) - Math.min(...zs)).toFixed(0), 'adj', r.adj.map(v => v.toFixed(0)).join(','));
    fs.writeFileSync(`/tmp/track_${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${Math.min(...xs) - 40} ${Math.min(...zs) - 40} ${Math.max(...xs) - Math.min(...xs) + 80} ${Math.max(...zs) - Math.min(...zs) + 80}" width="800"><polyline fill="none" stroke="#333" stroke-width="${cfg.width || 15}" points="${tc.p.map(p => p.join(',')).join(' ')}"/><circle cx="${tc.p[0][0]}" cy="${tc.p[0][1]}" r="9" fill="red"/></svg>`);
  } catch (e) { console.log(name, 'ERR', e.message); }
}
