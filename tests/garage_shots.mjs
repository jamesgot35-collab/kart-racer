import { serve, launch } from '../tools/apptest.mjs';
const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const { srv, port } = await serve();
for (const [ori, w, h] of [['landscape', 844, 390], ['portrait', 390, 844]]) {
  const { b, pg, logs } = await launch(w, h, { mobile: true, dpr: 2 });
  await pg.goto(`http://localhost:${port}/index.html?shot=1`); await pg.waitForSelector('#goBtn'); await pg.evaluate(() => document.querySelector('#goBtn').click()); await pg.waitForFunction("__app.screen==='menu'", { timeout: 90000, polling: 300 });
  await pg.evaluate(() => __test.show('garage')); await sleep(2500); await pg.screenshot({ path: `/workspace/kart-racer/shots/${ori}_03_garage_racer.png` });
  await pg.evaluate(() => { document.querySelectorAll('.tab').forEach(t => { if (/wheels/i.test(t.textContent)) t.click(); }); }); await sleep(1500); await pg.screenshot({ path: `/workspace/kart-racer/shots/${ori}_04_garage_wheels.png` });
  console.log(ori, logs); await b.close();
}
srv.close();
