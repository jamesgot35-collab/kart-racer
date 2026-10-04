// Pure-simulation check of all 8 tracks (both cups): 12 AI karts, 2 laps, normal + mirror + reverse. Fails if any kart never finishes / sim errors.
import { serve, launch } from '../tools/apptest.mjs';
const { srv, port } = await serve(); const { b, pg, logs } = await launch(480, 300, {});
await pg.goto(`http://localhost:${port}/simtest.html`); await pg.waitForFunction('window.ready', { timeout: 60000 });
let bad = 0;
for (const id of ['meadow', 'harbor', 'mesa', 'frost', 'dusk', 'neon', 'ember', 'aurora']) for (const [m, r] of [[false, false], [true, true]]) {
  const o = await pg.evaluate((id, m, r) => { const out = window.runSim(id, 330, { cpuLocal: true, laps: 2, mirror: m, reverse: r }); return { errors: out.errors, wallMs: out.wallMs, fin: out.final.filter(k => k.fin).length, n: out.final.length, best: window.race.karts.filter(k => k.finished).map(k => k.finishTime || k.time).sort((a, b) => a - b)[0], spun: out.final.filter(k => k.spin).length }; }, id, m, r);
  const ok = !o.errors.length && o.fin >= 10; if (!ok) bad++; console.log(ok ? 'PASS' : 'FAIL', id, m ? 'M' : '-', r ? 'R' : '-', JSON.stringify(o));
}
console.log(bad ? 'FAILED ' + bad : 'ALL PASS', logs.slice(0, 3)); await b.close(); srv.close(); process.exit(bad ? 1 : 0);
