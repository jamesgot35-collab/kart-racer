// Renders a contact sheet of all playable racers (in-game character models) -> shots/roster_sheet.png
import { serve, launch } from '../tools/apptest.mjs'; import fs from 'fs';
const { srv, port } = await serve(); const { b, pg, logs } = await launch(640, 480, { dpr: 1 });
await pg.goto(`http://localhost:${port}/index.html?shot=1`); await pg.waitForSelector('#goBtn'); await pg.evaluate(() => document.querySelector('#goBtn').click()); await pg.waitForFunction("__app.screen==='menu'", { timeout: 90000 });
const res = await pg.evaluate(async () => { const d = await fetch('src/gamedata.json').then(r => r.json()).catch(() => null); const names = d ? d.characters.map(c => c.name) : __app.names; const out = []; for (const n of names) out.push([n, __app.showroom.portrait(n, 256)]); return out; });
fs.mkdirSync('shots', { recursive: true });
const html = `<body style="margin:0;background:#12182c"><div style="display:flex;flex-wrap:wrap;width:1536px">${res.map(([n, u]) => `<div style="width:256px;color:#fff;font:14px sans-serif;text-align:center"><img src="${u}" width=256 height=256><br>${n}</div>`).join('')}</div>`;
const p2 = await b.newPage(); await p2.setViewport({ width: 1536, height: 1180 }); await p2.setContent(html); await new Promise(r => setTimeout(r, 800)); await p2.screenshot({ path: 'shots/roster_sheet.png' });
console.log('names', res.length, logs.slice(0, 3)); await b.close(); srv.close();
