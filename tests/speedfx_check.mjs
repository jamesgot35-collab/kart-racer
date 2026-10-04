// Speed lines overlay: appears when boosting / near top speed (Standard tier), stays hidden on the Performance tier.
import { serve, launch } from '../tools/apptest.mjs';
const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const { srv, port } = await serve(); let ok = true;
for (const tier of ['standard', 'performance']) {
  const { b, pg, logs } = await launch(844, 390, { mobile: true });
  await pg.goto(`http://localhost:${port}/index.html?shot=1`); await pg.waitForSelector('#goBtn');
  await pg.evaluate((tier) => { const st = __app.save.settings; st.quality = tier; st.qualityChosen = true; st.hq = false; localStorage.setItem('sparkdrift.save.v1', JSON.stringify(__app.save)); }, tier); await pg.reload(); await pg.waitForSelector('#goBtn');
  await pg.evaluate(() => document.querySelector('#goBtn').click()); await pg.waitForFunction("__app.screen==='menu'", { timeout: 90000 });
  await pg.evaluate(() => { __app.mode = 'quick'; __app.cfg.track = 'meadow'; __app.startRace(); }); await pg.waitForFunction("__app.race && __app.race.state==='racing'", { timeout: 180000, polling: 300 });
  await pg.evaluate(() => { const k = __app.race.localKart; k.sim.addBoost(6, 1.3, 'pad'); }); await sleep(2500);
  const o = await pg.evaluate(() => { const e = document.getElementById('speedfx'); return e ? +e.style.opacity : -1; }); await pg.screenshot({ path: `/workspace/kart-racer/shots/speedfx_${tier}.png` });
  const pass = tier === 'standard' ? o > 0.3 : o <= 0.01; ok = ok && pass; console.log(tier, 'speedfx opacity', o, pass ? 'PASS' : 'FAIL', 'errors', logs.slice(0, 3)); await b.close();
}
srv.close(); process.exit(ok ? 0 : 1);
