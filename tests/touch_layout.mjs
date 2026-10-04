// Touch layout variants: Large size + left-handed; checks buttons are on-screen, >=44 px, non-overlapping, and still respond. -> shots/*_touch_large_lefty.png
import { serve, launch } from '../tools/apptest.mjs'; import fs from 'fs';
const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const { srv, port } = await serve(); let bad = 0; const out = {};
for (const [ori, w, h] of [['landscape', 844, 390], ['portrait', 390, 844], ['landscape_small_phone', 667, 320]]) for (const [size, lefty] of [['m', false], ['l', true], ['s', false]]) {
  const { b, pg, logs } = await launch(w, h, { mobile: true });
  await pg.goto(`http://localhost:${port}/index.html?autostart=1&track=meadow&laps=3`); await pg.waitForFunction('window.__app && __app.race', { timeout: 120000, polling: 300 });
  await pg.evaluate((size, lefty) => { const s = __app.save.settings; s.touchSize = size; s.lefty = lefty; __test.applySettings && __test.applySettings(); const t = document.querySelector('#touch'); t.classList.toggle('lefty', lefty); t.style.setProperty('--ts-user', ({ s: 0.88, m: 1, l: 1.18 })[size]); }, size, lefty); await sleep(500);
  const r = await pg.evaluate((w, h) => { const q = (id) => { const e = document.querySelector(id); const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }; const o = {}; for (const [k, id] of Object.entries({ slider: '#tcSlider', gas: '#tcGas', drift: '#tcDrift', item: '#tcItem', brake: '#tcBrake' })) o[k] = q(id); return o; }, w, h);
  const names = Object.keys(r); let errs = [];
  for (const n of names) { const a = r[n]; if (a.x < -1 || a.y < -1 || a.x + a.w > w + 1 || a.y + a.h > h + 1) errs.push(n + ' off-screen'); if (n !== 'slider' && (a.w < 44 || a.h < 44)) errs.push(n + ' <44px'); }
  for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) { const a = r[names[i]], c = r[names[j]]; if (a.x < c.x + c.w - 2 && c.x < a.x + a.w - 2 && a.y < c.y + c.h - 2 && c.y < a.y + a.h - 2) errs.push(names[i] + ' overlaps ' + names[j]); }
  const tag = `${ori}_${size}${lefty ? '_lefty' : ''}`; out[tag] = { errs, r }; console.log(errs.length ? 'FAIL' : 'PASS', tag, errs.join('; ')); if (errs.length) bad++;
  if (size === 'l') await pg.screenshot({ path: `/workspace/kart-racer/shots/${ori}_touch_large_lefty.png` });
  await b.close();
}
fs.writeFileSync('tests/results/touch_layout.json', JSON.stringify(out, null, 1)); srv.close(); process.exit(bad ? 1 : 0);
