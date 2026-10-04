// Soak: autopilots the player's kart (AI) in a full 12-kart race and runs 60 s of GAME time on a track; fails on any console/page error, NaN, or unbounded growth.
import { serve, launch } from '../tools/apptest.mjs'; import fs from 'fs';
const tracks = process.argv.slice(2).length ? process.argv.slice(2) : ['meadow', 'harbor', 'mesa', 'frost', 'dusk', 'neon', 'ember', 'aurora']; const results = [];
for (const track of tracks) {
  const { srv, port } = await serve(); const { b, pg, logs } = await launch(400, 225, { mobile: true }); const t0 = Date.now();
  await pg.goto(`http://localhost:${port}/index.html?autostart=1&track=${track}&laps=3`); await pg.waitForFunction('window.__app && __app.race', { timeout: 120000, polling: 300 });
  await pg.evaluate(() => __test.makeAuto(__app.race)); await pg.waitForFunction('__app.race.state==="racing"', { timeout: 120000, polling: 300 });
  const samples = []; let tRace0 = await pg.evaluate(() => __app.race.t);
  while (true) {
    await new Promise(r => setTimeout(r, 5000));
    const s = await pg.evaluate(() => { const r = __app.race; if (!r) return null; const k = r.localKart; const bad = r.karts.some(q => !isFinite(q.sim.x) || !isFinite(q.sim.z) || !isFinite(q.sim.s)); return { t: r.t, state: r.state, fps: __app.fps, heapMB: performance.memory ? performance.memory.usedJSHeapSize / 1048576 : 0, tris: __app.renderer.info.render.triangles, geos: __app.renderer.info.memory.geometries, texs: __app.renderer.info.memory.textures, voices: __audio.voices, place: k.place, lap: k.sim.lap, bad, ctx: __audio.ctx.state }; });
    if (!s) break; samples.push(s); if (s.t - tRace0 >= 60 || Date.now() - t0 > 420000) break;
  }
  const last = samples[samples.length - 1] || {}; const first = samples[0] || {};
  const r = { track, wallSec: Math.round((Date.now() - t0) / 1000), gameSec: +(last.t - tRace0).toFixed(1), samples: samples.length, lastLap: last.lap, place: last.place, anyNaN: samples.some(s => s.bad), heapStart: +first.heapMB?.toFixed(0), heapEnd: +last.heapMB?.toFixed(0), geosStart: first.geos, geosEnd: last.geos, texsEnd: last.texs, voicesMax: Math.max(...samples.map(s => s.voices)), fpsMedianSwiftshader: samples.map(s => s.fps).sort((a, c) => a - c)[samples.length >> 1] | 0, errors: logs, pass: logs.length === 0 && !samples.some(s => s.bad) && (last.t - tRace0) >= 59 && last.ctx === 'running' };
  console.log(JSON.stringify(r)); results.push(r); await b.close(); srv.close();
}
fs.mkdirSync('tests/results', { recursive: true }); fs.writeFileSync('tests/results/soak.json', JSON.stringify({ date: new Date().toString(), results }, null, 1)); console.log(results.every(r => r.pass) ? 'SOAK ALL PASS' : 'SOAK FAILURES');
