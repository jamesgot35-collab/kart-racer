// Renders the online "Can't connect" help screens (entry + error states) and runs the connection check. -> shots/*_lobby_help*.png
import { serve, launch } from '../tools/apptest.mjs';
const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const { srv, port } = await serve();
for (const [ori, w, h] of [['landscape', 844, 390], ['portrait', 390, 844]]) {
  const { b, pg, logs } = await launch(w, h, { mobile: true, dpr: 2 });
  await pg.goto(`http://localhost:${port}/index.html?shot=1`); await pg.waitForSelector('#goBtn'); await pg.evaluate(() => document.querySelector('#goBtn').click()); await pg.waitForFunction("__app.screen==='menu'", { timeout: 90000 });
  await pg.evaluate(() => { __app.net = null; __test.show('lobby'); }); await sleep(800);
  await pg.evaluate(() => document.querySelector('#helpBtn').click()); await sleep(600); await pg.evaluate(() => document.querySelector('#diag').click()); await sleep(7500);
  const txt = await pg.evaluate(() => document.querySelector('#diagOut').innerText); console.log(ori, 'diag:', txt.replace(/\n/g, ' | '));
  await pg.screenshot({ path: `/workspace/kart-racer/shots/${ori}_lobby_help_entry.png` });
  await pg.evaluate(() => { __app.net = { status: 'error', error: "Found the matchmaking server but couldn't open a direct link to the host. This usually means a strict network (school, work, some mobile carriers) is blocking peer-to-peer, or the code is wrong.", errKind: 'nat', close() { }, members: [], stats: {}, cfg: {} }; __test.show('lobby'); __app.net.status = 'error'; }); await sleep(800);
  await pg.screenshot({ path: `/workspace/kart-racer/shots/${ori}_lobby_help_error.png` });
  console.log(ori, 'errors', logs.slice(0, 3)); await b.close();
}
srv.close();
