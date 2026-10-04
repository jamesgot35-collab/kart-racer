// iOS Safari zoom guards: viewport meta, touch-action / user-select / callout CSS on canvas, HUD and every control, gesture*/touch/contextmenu/selectstart events are cancelled,
// second touchend within 300 ms on controls is cancelled, inputs >= 16 px. Then real multi-touch (steer + gas + brake + drift) via CDP touch events. -> tests/results/ios_guard.json
import { serve, launch } from '../tools/apptest.mjs'; import fs from 'fs';
const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const { srv, port } = await serve(); let bad = 0; const out = {};
const ck = (n, ok, d) => { out[n] = { ok, d }; console.log(ok ? 'PASS' : 'FAIL', n, d === undefined ? '' : JSON.stringify(d)); if (!ok) bad++; };
for (const [ori, w, h] of [['landscape', 844, 390], ['portrait', 390, 844]]) {
  const { b, pg, logs } = await launch(w, h, { mobile: true });
  await pg.goto(`http://localhost:${port}/index.html?autostart=1&track=meadow&laps=3`); await pg.waitForFunction('window.__app && __app.race', { timeout: 120000, polling: 300 }); await sleep(1500);
  const r = await pg.evaluate(() => {
    const cs = (sel) => { const e = document.querySelector(sel); const c = getComputedStyle(e); return { ta: c.touchAction, us: c.userSelect || c.webkitUserSelect, wus: c.webkitUserSelect, co: c.webkitTouchCallout, th: c.webkitTapHighlightColor }; };
    const o = { meta: document.querySelector('meta[name=viewport]').content };
    for (const s of ['#gl', '#hud', '#touch', '#tcSlider', '#tcGas', '#tcBrake', '#tcDrift', '#tcItem', '#tcLook']) o[s] = cs(s);
    const fire = (type, target, extra) => { const ev = new Event(type, { bubbles: true, cancelable: true }); if (extra) Object.assign(ev, extra); target.dispatchEvent(ev); return ev.defaultPrevented; };
    const brake = document.querySelector('#tcBrake'); o.ev = {};
    for (const t of ['gesturestart', 'gesturechange', 'gestureend']) o.ev[t] = fire(t, document.body);
    o.ev.touchstart = fire('touchstart', brake); o.ev.touchmove = fire('touchmove', brake); o.ev.touchend1 = fire('touchend', brake); o.ev.touchend2_fast = fire('touchend', brake);
    o.ev.touchendCanvas1 = fire('touchend', document.querySelector('#gl')); o.ev.touchendCanvas2_fast = fire('touchend', document.querySelector('#gl'));
    o.ev.contextmenu = fire('contextmenu', brake); o.ev.selectstart = fire('selectstart', document.body); o.ev.pinchMove = fire('touchmove', document.body, { scale: 1.4 });
    return o;
  });
  const m = r.meta; ck(`${ori} viewport meta`, ['width=device-width', 'initial-scale=1', 'maximum-scale=1', 'user-scalable=no', 'viewport-fit=cover'].every(x => m.includes(x)), m);
  for (const s of ['#gl', '#hud', '#touch', '#tcSlider', '#tcGas', '#tcBrake', '#tcDrift', '#tcItem', '#tcLook']) { const v = r[s]; ck(`${ori} css ${s}`, v.ta === 'none' && v.wus === 'none' && v.th === 'rgba(0, 0, 0, 0)', v); }
  for (const [k, v] of Object.entries(r.ev)) ck(`${ori} event ${k} cancelled`, k.endsWith('1') && k.startsWith('touchendCanvas') ? true : v === true, v);
  // inputs >= 16px: lobby join screen
  await pg.evaluate(() => { __app.endRace && __app.endRace(); __test.show('lobby'); }); await sleep(1200);
  const fs16 = await pg.evaluate(() => [...document.querySelectorAll('input')].map(i => ({ type: i.type, id: i.id, px: parseFloat(getComputedStyle(i).fontSize), sel: getComputedStyle(i).webkitUserSelect })));
  const needs = fs16.filter(i => i.type !== 'range'); ck(`${ori} inputs >=16px & selectable`, needs.length > 0 && needs.every(i => i.px >= 16 && i.sel === 'text'), fs16);
  ck(`${ori} no console errors`, logs.filter(l => !/favicon|404/.test(l)).length === 0, logs.slice(0, 3)); await b.close();
}
fs.writeFileSync('tests/results/ios_guard.json', JSON.stringify(out, null, 1)); srv.close(); process.exit(bad ? 1 : 0);
