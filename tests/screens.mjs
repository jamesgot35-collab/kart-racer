// Screenshot set: every main screen and a race on each track, in portrait (390x844) and landscape (844x390) mobile emulation.
import { serve, launch } from '../tools/apptest.mjs'; import fs from 'fs';
const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const clk = (pg, sel) => pg.evaluate((q) => { const e = document.querySelector(q); if (e) e.click(); return !!e; }, sel);
const { srv, port } = await serve(); const all = []; const only = process.argv[2];
for (const [ori, w, h] of [['landscape', 844, 390], ['portrait', 390, 844]]) {
  if (only && only !== ori) continue;
  const { b, pg, logs } = await launch(w, h, { mobile: true, dpr: 2 }); const sh = (n) => pg.screenshot({ path: `/workspace/kart-racer/shots/${ori}_${n}.png` });
  await pg.goto(`http://localhost:${port}/index.html?shot=1`); await pg.waitForSelector('#goBtn'); await sleep(1500); await sh('01_title');
  await clk(pg, '#goBtn'); await pg.waitForFunction("__app.screen==='menu'", { timeout: 90000, polling: 300 }); await sleep(2500); await sh('02_menu');
  await pg.evaluate(() => __test.show('garage')); await sleep(2500); await sh('03_garage_racer');
  await pg.evaluate(() => { document.querySelectorAll('.tabs button, .tab').forEach(t => { if (/kart/i.test(t.textContent)) t.click(); }); }); await sleep(2000); await sh('04_garage_kart');
  await pg.evaluate(() => { document.querySelectorAll('.tabs button, .tab').forEach(t => { if (/paint/i.test(t.textContent)) t.click(); }); }); await sleep(2000); await sh('05_garage_paint');
  await pg.evaluate(() => { __app.mode = 'quick'; __test.show('setup'); }); await sleep(1200); await sh('06_setup');
  await pg.evaluate(() => __test.show('settings')); await sleep(1000); await sh('07_settings');
  await pg.evaluate(() => __test.show('lobby')); await sleep(1000); await sh('08_lobby');
  for (const track of ['meadow', 'harbor', 'mesa', 'frost']) {
    await pg.evaluate((t) => { __app.mode = 'quick'; __app.cfg.track = t; __app.startRace(); }, track); await pg.waitForFunction('__app.race', { timeout: 120000, polling: 300 }); await sleep(1500); await sh(`10_${track}_grid`);
    await pg.waitForFunction('__app.race.state==="racing"', { timeout: 120000, polling: 300 }); await pg.evaluate(() => __test.makeAuto(__app.race)); await sleep(14000); await sh(`11_${track}_race`);
    if (track === 'harbor') { await clk(pg, '.pausebtn'); await sleep(800); await sh('12_pause'); await clk(pg, '#rs'); }
    if (track === 'meadow') { await pg.evaluate(() => __app.race.finishRace()); await sleep(2800); await sh('13_results'); }
    await pg.evaluate(() => { __test.endRace(); }); await sleep(300);
  }
  all.push({ ori, errors: logs }); console.log(ori, 'errors', logs.length, logs.slice(0, 4)); await b.close();
}
fs.writeFileSync('tests/results/screens.json', JSON.stringify(all, null, 1)); srv.close();
