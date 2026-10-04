// Full-flow test: a real 1-lap quick race to the results screen (autopilot), then a time trial (ghost saved), then a Grand Prix race 1 -> cup standings.
import { serve, launch } from '../tools/apptest.mjs'; import fs from 'fs';
const { srv, port } = await serve(); const { b, pg, logs } = await launch(400, 225, { mobile: true }); const out = { steps: [] }; const log = (...a) => { console.log(...a); out.steps.push(a.join(' ')); };
await pg.goto(`http://localhost:${port}/index.html`); await pg.waitForSelector('#goBtn'); await pg.evaluate(() => document.querySelector('#goBtn').click()); await pg.waitForFunction("__app.screen==='menu'", { timeout: 90000, polling: 300 });
const coins0 = await pg.evaluate(() => __app.save.coins);
async function runRace(mode, label) {
  await pg.evaluate((m) => { __app.mode = m; __app.cfg = { track: 'meadow', laps: 1, mirror: false, reverse: false, items: true }; if (m === 'gp') __app.cup = { idx: 0, pts: {}, results: [] }; __app.startRace(); }, mode);
  await pg.waitForFunction('__app.race && __app.race.state==="racing"', { timeout: 150000, polling: 300 }); await pg.evaluate(() => __test.makeAuto(__app.race));
  const t0 = Date.now(); await pg.waitForFunction("document.querySelector('#nx')", { timeout: 600000, polling: 1000 });
  const r = await pg.evaluate(() => ({ rows: document.querySelectorAll('table.res tr').length, title: document.querySelector('.topbar h2').textContent, coins: __app.save.coins, races: __app.save.stats.races, ghosts: Object.keys(__app.save.ghosts || {}).length, cup: __app.cup && __app.cup.idx, nx: document.querySelector('#nx').textContent }));
  log(label, 'results after', Math.round((Date.now() - t0) / 1000) + 's wall', JSON.stringify(r)); await pg.screenshot({ path: `/workspace/kart-racer/shots/flow_${label}_results.png` }); return r;
}
const q = await runRace('quick', 'quick'); await pg.evaluate(() => __test.endRace()); await pg.evaluate(() => __test.show('menu'));
const tt = await runRace('tt', 'timetrial'); await pg.evaluate(() => __test.endRace()); await pg.evaluate(() => __test.show('menu'));
const gp = await runRace('gp', 'grandprix');
const checks = [['quick race reaches results with 12 rows', q.rows >= 12], ['coins awarded & persisted', q.coins > coins0], ['race counted', q.races >= 1], ['time trial saves a ghost', tt.ghosts >= 1], ['grand prix shows cup standings & next race', gp.cup === 1 && /Next race/.test(gp.nx)], ['no console errors', logs.length === 0]];
for (const [n, ok] of checks) log(ok ? 'PASS' : 'FAIL', n); out.checks = checks.map(([n, ok]) => ({ n, ok })); out.errors = logs;
fs.writeFileSync('tests/results/flows.json', JSON.stringify(out, null, 1)); await b.close(); srv.close();
