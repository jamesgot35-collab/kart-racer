// Steering-assist evaluation: a deliberately mediocre simulated thumb (lookahead steering with gain 1.0, 0.25 low-frequency noise, 0.2 s reaction delay, full throttle, no drift)
// drives 90 s on each track with assist off/low/high. Reports wall hits and progress. Assist must reduce wall hits without reducing progress.
import { serve, launch } from '../tools/apptest.mjs'; import fs from 'fs';
const { srv, port } = await serve(); const { b, pg } = await launch(480, 300, {});
await pg.goto(`http://localhost:${port}/simtest.html`); await pg.waitForFunction('window.ready', { timeout: 60000 });
const out = {}; let tot = { off: 0, low: 0, high: 0 }, prog = { off: 0, low: 0, high: 0 };
for (const id of ['meadow', 'harbor', 'mesa', 'frost', 'dusk', 'neon', 'ember', 'aurora']) {
  out[id] = {};
  for (const mode of ['off', 'low', 'high']) {
    const r = await pg.evaluate((id, mode) => {
      window.runSim(id, 0.1, { laps: 3 }); const race = window.race; race.opts.assist = mode; const k = race.localKart; const tr = race.track; let seed = 12345; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
      let noise = 0, tgt = 0, delayed = [], tmp = {}; const dt = 1 / 60;
      for (let i = 0; i < 100 * 60; i++) {
        if (race.state === 'racing') { if (i % 40 === 0) tgt = (rnd() - 0.5) * 1.6; noise += (tgt - noise) * 0.03; const s = k.sim; const h = tr.at(s.lastS + 22 + s.s * 0.25, 0, tmp).heading; let e = s.th - h; while (e > Math.PI) e -= 2 * Math.PI; while (e < -Math.PI) e += 2 * Math.PI; const cmd = Math.max(-1, Math.min(1, e * 1.1 + noise * 1.4)); delayed.push(cmd); const c = delayed.length > 20 ? delayed.shift() : 0; race.input.steer = c; race.input.throttle = 1; race.input.brake = 0; race.input.drift = false; race.input.driftPressed = false; }
        race.update(dt);
      }
      return { walls: race.wallHits || 0, prog: Math.round(k.sim.prog), assistFrames: race.assistOn || 0 };
    }, id, mode);
    out[id][mode] = r; tot[mode] += r.walls; prog[mode] += r.prog;
  }
  console.log(id.padEnd(8), ['off', 'low', 'high'].map(m => `${m}: walls ${out[id][m].walls}, prog ${out[id][m].prog}m`).join(' | '));
}
console.log('TOTAL wall hits', JSON.stringify(tot), 'progress', JSON.stringify(prog));
const ok = tot.low <= tot.off && tot.high <= tot.off && prog.low >= prog.off * 0.97; console.log(ok ? 'PASS' : 'FAIL');
fs.writeFileSync('tests/results/assist_eval.json', JSON.stringify({ out, tot, prog }, null, 1)); await b.close(); srv.close(); process.exit(ok ? 0 : 1);
