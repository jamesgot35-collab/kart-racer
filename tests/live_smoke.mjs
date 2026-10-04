// Loads the published site in headless Chrome, taps start, starts a race, reports errors + timings.
import { launch } from '../tools/apptest.mjs'; import fs from 'fs';
const url = process.argv[2] || 'https://jamesgot35-collab.github.io/kart-racer/'; const { b, pg, logs } = await launch(844, 390, { mobile: true }); const t0 = Date.now();
await pg.goto(url, { waitUntil: 'load', timeout: 60000 }); const tLoad = Date.now() - t0; await pg.waitForSelector('#goBtn', { timeout: 30000 }); const tTitle = Date.now() - t0;
await pg.evaluate(() => document.querySelector('#goBtn').click()); await pg.waitForFunction("__app.screen==='menu'", { timeout: 60000, polling: 300 }); const tMenu = Date.now() - t0;
await pg.screenshot({ path: '/workspace/kart-racer/shots/live_menu_landscape.png' });
await pg.evaluate(() => { __app.mode = 'quick'; __app.cfg.track = 'meadow'; __app.startRace(); }); await pg.waitForFunction("__app.race && __app.race.state==='racing'", { timeout: 90000, polling: 300 }); const tRace = Date.now() - t0;
const r = { url, tLoad, tTitle, tMenu, tRace, audio: await pg.evaluate(() => __audio.stats), timing: await pg.evaluate(() => __app.timing), errors: logs }; console.log(JSON.stringify(r, null, 1)); fs.writeFileSync('/workspace/kart-racer/tests/results/live_smoke.json', JSON.stringify(r, null, 1)); await b.close();
