// Compares render load of the Performance vs Standard tier on the same track (draw calls, triangles, DPR, particle pool) and checks the low-end auto-default.
import { serve, launch } from '../tools/apptest.mjs'; import fs from 'fs';
const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const { srv, port } = await serve(); const res = {};
for (const tier of ['performance', 'standard']) {
  const { b, pg, logs } = await launch(844, 390, { mobile: true, dpr: 3 });
  await pg.goto(`http://localhost:${port}/index.html?shot=1`); await pg.waitForSelector('#goBtn');
  await pg.evaluate((tier) => { const st = __app.save.settings; st.quality = tier; st.qualityChosen = true; st.hq = false; localStorage.setItem('sparkdrift.save.v1', JSON.stringify(__app.save)); }, tier);
  await pg.reload(); await pg.waitForSelector('#goBtn');
  await pg.evaluate(() => document.querySelector('#goBtn').click()); await pg.waitForFunction("__app.screen==='menu'", { timeout: 90000 });
  await pg.evaluate(() => { __app.mode = 'quick'; __app.cfg.track = 'neon'; __app.startRace(); }); await pg.waitForFunction("__app.race && __app.race.state==='racing'", { timeout: 180000, polling: 300 }); await sleep(4000);
  res[tier] = await pg.evaluate(() => ({ pr: __app.pr(), calls: __app.renderer.info.render.calls, tris: __app.renderer.info.render.triangles, fps: __app.fps, aa: __app.renderer.getContextAttributes().antialias, particlesAdd: __app.race.fx.add && __app.race.fx.add.n })); res[tier].logs = logs.slice(0, 3);
  console.log(tier, JSON.stringify(res[tier])); await b.close();
}
// low-end auto-default
const { b, pg } = await launch(844, 390, { mobile: true }); await pg.evaluateOnNewDocument(() => { Object.defineProperty(navigator, 'deviceMemory', { get: () => 2 }); Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 4 }); });
await pg.goto(`http://localhost:${port}/index.html?shot=1`); await pg.waitForSelector('#goBtn'); res.lowEndDefault = await pg.evaluate(() => __app.save.settings.quality); console.log('low-end device default tier ->', res.lowEndDefault); await b.close();
fs.writeFileSync('tests/results/perf_tiers.json', JSON.stringify(res, null, 1)); srv.close();
const ok = res.performance.calls < res.standard.calls && res.performance.pr <= 1 && res.lowEndDefault === 'performance'; console.log(ok ? 'PASS' : 'FAIL'); process.exit(ok ? 0 : 1);
