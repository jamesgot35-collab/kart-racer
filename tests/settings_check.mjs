import { serve, launch } from '../tools/apptest.mjs';
const { srv, port } = await serve(); const { b, pg, logs } = await launch(844, 390, { mobile: true });
await pg.goto(`http://localhost:${port}/index.html?shot=1`); await pg.waitForSelector('#goBtn'); await pg.evaluate(() => document.querySelector('#goBtn').click()); await pg.waitForFunction("__app.screen==='menu'", { timeout: 90000 });
await pg.evaluate(() => __test.show('settings')); await new Promise(r => setTimeout(r, 800));
const r = await pg.evaluate(() => { const before = [...document.querySelectorAll('#asSeg button')].map(b => b.className + ':' + b.textContent); document.querySelector('#asSeg button[data-a=high]').click(); return { before, after: __app.save.settings.assist }; });
await pg.screenshot({ path: '/tmp/settings.png' }); console.log(JSON.stringify(r), 'errors', logs); await b.close(); srv.close();
