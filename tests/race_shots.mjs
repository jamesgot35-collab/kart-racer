import { serve, launch } from '../tools/apptest.mjs';
const [,, track = 'meadow', w = '844', h = '390', out = '/tmp/r'] = process.argv;
const { srv, port } = await serve(); const { b, pg, logs } = await launch(+w, +h, { mobile: true, dpr: 1 });
const t0 = Date.now(); await pg.goto(`http://localhost:${port}/index.html?autostart=1&track=${track}&shot=1`);
await pg.waitForFunction('window.__app && __app.race', { timeout: 60000 }); console.log('race created after', Date.now() - t0, 'ms');
await new Promise(r => setTimeout(r, 1200)); await pg.screenshot({ path: out + '_grid.png' });
await pg.waitForFunction('__app.race.state==="racing"', { timeout: 90000, polling: 300 });
// hold steer-less run, press drift now and then
await new Promise(r => setTimeout(r, 9000)); await pg.screenshot({ path: out + '_race.png' });
console.log(JSON.stringify(await pg.evaluate(() => { const r = __app.race, k = r.localKart; return { t: r.t, spd: k.sim.s, place: k.place, fps: __app.fps, pr: __app.pr(), calls: __app.renderer.info.render.calls, tris: __app.renderer.info.render.triangles, lvl: __audio.level(), voices: __audio.voices, lap: k.sim.lap, failed: __audio.stats.failed }; })));
console.log(logs.slice(0, 20).join('\n')); await b.close(); srv.close();
