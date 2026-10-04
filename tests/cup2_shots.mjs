// Starlight Cup screenshots: grid + mid-race for dusk/neon/ember/aurora in landscape and portrait -> shots/{ori}_cup2_{track}_{grid,race}.png; fails on console errors.
import { serve, launch } from '../tools/apptest.mjs';
const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const { srv, port } = await serve(); let bad = 0;
for (const [ori, w, h] of [['landscape', 844, 390], ['portrait', 390, 844]]) {
  const { b, pg, logs } = await launch(w, h, { mobile: true, dpr: 2 }); const sh = (n) => pg.screenshot({ path: `/workspace/kart-racer/shots/${ori}_${n}.png` });
  await pg.goto(`http://localhost:${port}/index.html?shot=1`); await pg.waitForSelector('#goBtn'); await sleep(1500);
  await pg.evaluate(() => document.querySelector('#goBtn').click()); await pg.waitForFunction("__app.screen==='menu'", { timeout: 90000, polling: 300 }); await sleep(1500);
  for (const track of ['dusk', 'neon', 'ember', 'aurora']) {
    await pg.evaluate((t) => { __app.mode = 'quick'; __app.cfg.track = t; __app.startRace(); }, track); await pg.waitForFunction('__app.race', { timeout: 120000, polling: 300 }); await sleep(1500); await sh(`cup2_${track}_grid`);
    await pg.waitForFunction('__app.race.state==="racing"', { timeout: 120000, polling: 300 }); await pg.evaluate(() => __test.makeAuto(__app.race)); await sleep(14000); await sh(`cup2_${track}_race`);
    await pg.evaluate(() => __app.endRace && __app.endRace()).catch(() => {}); await pg.evaluate(() => __test.show('menu')).catch(() => {}); await sleep(800);
  }
  const errs = logs.filter(l => !/favicon|404/.test(l)); console.log(errs.length ? 'FAIL' : 'PASS', ori, errs.slice(0, 3).join(' | ')); if (errs.length) bad++; await b.close();
}
srv.close(); process.exit(bad ? 1 : 0);
