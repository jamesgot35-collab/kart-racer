import { serve, launch } from '/workspace/kart-racer/tools/apptest.mjs';
const { srv, port } = await serve(); const { b, pg, logs } = await launch(844, 390);
await pg.goto(`http://localhost:${port}/index.html`); await new Promise(r => setTimeout(r, 1500)); await pg.screenshot({ path: '/tmp/a_title.png' });
await pg.click('#goBtn'); await new Promise(r => setTimeout(r, 3000)); await pg.screenshot({ path: '/tmp/a_menu.png' });
console.log(JSON.stringify(await pg.evaluate(() => ({ st: __audio.ctx && __audio.ctx.state, stats: __audio.stats, scr: __app.screen }))));
console.log(logs.slice(0, 15).join('\n')); await b.close(); srv.close();
