// Renders 1024px portraits of every playable racer from the real in-game character models (high-quality pack).
import { serve, launch } from './apptest.mjs'; import fs from 'fs';
const out = '/workspace/pack/g1/portraits'; fs.mkdirSync(out, { recursive: true });
const { srv, port } = await serve(); const { b, pg, logs } = await launch(640, 480, { dpr: 1 });
await pg.goto(`http://localhost:${port}/index.html`); await pg.waitForSelector('#goBtn'); await pg.evaluate(() => document.querySelector('#goBtn').click()); await pg.waitForFunction("__app.screen==='menu'", { timeout: 60000, polling: 300 });
const names = await pg.evaluate(() => [...document.querySelectorAll('script')].length && fetch('src/gamedata.json').then(r => r.json()).then(d => d.characters.map(c => c.name)).catch(() => null));
const list = names || await pg.evaluate(() => __app.names);
console.log('characters', list.length); let n = 0, bytes = 0;
for (const name of list) { const url = await pg.evaluate((nm) => __app.showroom.portrait(nm, 1024), name); const buf = Buffer.from(url.split(',')[1], 'base64'); const f = `${out}/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`; fs.writeFileSync(f, buf); bytes += buf.length; n++; }
console.log('wrote', n, 'portraits', (bytes / 1048576).toFixed(1), 'MB; errors', logs.length, logs.slice(0, 3)); await b.close(); srv.close();
