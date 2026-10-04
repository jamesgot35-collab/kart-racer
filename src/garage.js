// Garage: racer select, kart bodies, wheels (style/size/colour/finish), wing, exhaust, bumper, paint/finish/two-tone, decals. Live stats.
import DATA from './gamedata.json';
import { finalStats } from './stats.js';
import { defaultBuild } from './models.js';
import * as SAVE from './save.js';
import { ICONS } from './icons.js';
import { CHAR_VOICE } from './audio.js';
const STAT_NAMES = { S: 'Speed', A: 'Accel', H: 'Handling', G: 'Grip', W: 'Weight' };
const fx = (v) => (v > 0 ? '+' : '') + v.toFixed(1);
export function mountGarage(app, T) {
  const s = app.save, audio = app.audio, sr = app.showroom; const d = app.screenEl(); let tab = app.garageTab || 'racer'; let body = s.sel.body; let char = s.sel.char; let draft = { ...s.builds[body] };
  const charObj = () => DATA.characters.find(c => c.name === char); const stats = () => finalStats(draft, charObj().cls); const base = () => finalStats(defaultBuild(body), charObj().cls);
  const unowned = () => { const out = []; if (!SAVE.owns(s, 'body', body)) out.push(['body', body]); for (const k of ['wheel', 'spoiler', 'exhaust', 'bumper']) if (!SAVE.owns(s, k, draft[k])) out.push([k, draft[k]]); return out; };
  const total = () => unowned().reduce((a, [k, n]) => a + SAVE.priceOf(k, n), 0);
  const commit = () => { if (unowned().length === 0) { s.builds[body] = { ...draft }; s.sel.body = body; s.sel.char = char; app.persist(); } };
  const refresh3d = () => sr.setKart(draft, char);
  const priceTag = (kind, name) => { const p = SAVE.priceOf(kind, name); if (SAVE.owns(s, kind, name)) return p ? '<div class="pr" style="color:#7bffb0">Owned</div>' : '<div class="pr" style="color:#7bffb0">Free</div>'; return `<div class="pr">${ICONS.coin}${p}</div>`; };
  const partChip = (kind, list, cur) => list.map(x => { const fxs = ['S', 'A', 'H', 'G', 'W'].filter(k => x[k]).map(k => `${k}${fx(x[k])}`).join(' '); const own = SAVE.owns(s, kind, x.name); return `<div class="chip ${cur === x.name ? 'on' : ''} ${own ? '' : 'locked'}" data-kind="${kind}" data-name="${x.name}">${own ? '' : `<div class="lk">${ICONS.lock}</div>`}<div class="n">${x.name}</div><div class="d">${fxs || 'no change'}${x.off ? ' · off-road ' + fx(x.off) : ''}</div>${priceTag(kind, x.name)}</div>`; }).join('');
  const swatches = (list, cur, attr) => list.map((c, i) => `<div class="sw ${cur === i ? 'on' : ''}" ${attr}="${i}" title="${c.name}" style="background:${c.hex === 'rainbow' ? 'conic-gradient(red,orange,yellow,lime,cyan,blue,magenta,red)' : c.hex}"></div>`).join('');
  const body_ = () => {
    if (tab === 'racer') return `<div class="chips">${DATA.characters.filter(c => c.playable).map(c => `<div class="pcard ${c.name === char ? 'on' : ''}" data-char="${c.name}"><img src="${sr.portrait(c.name)}" alt=""><div class="n">${c.name}<br><span class="pill ${c.cls}">${c.cls}</span></div></div>`).join('')}</div><div style="font-size:12px;color:var(--mut)" id="charInfo"></div>`;
    if (tab === 'kart') return `<div class="chips">${DATA.bodies.map(b => { const own = SAVE.owns(s, 'body', b.name); return `<div class="chip ${b.name === body ? 'on' : ''} ${own ? '' : 'locked'}" data-body="${b.name}" style="min-width:150px">${own ? '' : `<div class="lk">${ICONS.lock}</div>`}<div class="n">${b.name}</div><div class="d">${b.family} · S${b.S} A${b.A} H${b.H} G${b.G} W${b.W}</div><div class="d">${b.desc}</div>${priceTag('body', b.name)}</div>`; }).join('')}</div>`;
    if (tab === 'wheels') return `<div class="chips">${partChip('wheel', DATA.wheels, draft.wheel)}</div><div class="row wrap" style="gap:14px"><div><div class="d" style="font-size:11px;color:var(--mut);font-weight:800">SIZE</div><div class="seg" id="sizes">${DATA.wheelSizes.map((z, i) => `<button data-size="${i}" class="${draft.size === i ? 'on' : ''}">${z.size}</button>`).join('')}</div></div><div><div style="font-size:11px;color:var(--mut);font-weight:800">RIM FINISH</div><div class="seg" id="rimfin">${DATA.rimFinishes.map((z, i) => `<button data-rf="${i}" class="${draft.rimFinish === i ? 'on' : ''}">${z}</button>`).join('')}</div></div></div><div style="font-size:11px;color:var(--mut);font-weight:800">RIM COLOUR</div><div class="chips">${swatches(DATA.rimColors, draft.rim, 'data-rim')}</div>`;
    if (tab === 'wing') return `<div class="chips">${partChip('spoiler', DATA.spoilers, draft.spoiler)}</div>`;
    if (tab === 'exhaust') return `<div class="chips">${partChip('exhaust', DATA.exhausts, draft.exhaust)}</div>`;
    if (tab === 'bumper') return `<div class="chips">${partChip('bumper', DATA.bumpers, draft.bumper)}</div>`;
    if (tab === 'paint') return `<div style="font-size:11px;color:var(--mut);font-weight:800">PAINT</div><div class="chips">${swatches(DATA.paintColors, draft.paint, 'data-paint')}</div><div class="row wrap" style="gap:14px"><div><div style="font-size:11px;color:var(--mut);font-weight:800">FINISH</div><div class="seg" id="fin">${DATA.paintFinishes.map((z, i) => `<button data-fin="${i}" class="${draft.finish === i ? 'on' : ''}">${z}</button>`).join('')}</div></div><div><div style="font-size:11px;color:var(--mut);font-weight:800">TWO-TONE</div><div class="chips" style="padding:0"><div class="chip ${draft.twoTone < 0 ? 'on' : ''}" data-tt="-1" style="min-width:60px"><div class="n">None</div></div>${DATA.twoTone.map((z, i) => `<div class="chip ${draft.twoTone === i ? 'on' : ''}" data-tt="${i}" style="min-width:90px"><div class="n">${z}</div></div>`).join('')}</div></div></div>${draft.twoTone >= 0 ? `<div style="font-size:11px;color:var(--mut);font-weight:800">ACCENT COLOUR</div><div class="chips">${swatches(DATA.paintColors, draft.paint2, 'data-paint2')}</div>` : ''}`;
    if (tab === 'decals') return `<div class="chips"><div class="chip ${draft.decal < 0 ? 'on' : ''}" data-decal="-1" style="min-width:60px"><div class="n">None</div></div>${DATA.decals.map((z, i) => `<div class="chip ${draft.decal === i ? 'on' : ''}" data-decal="${i}" style="min-width:110px"><div class="n">${z}</div></div>`).join('')}</div><div style="font-size:11px;color:var(--mut);font-weight:800">DECAL COLOUR</div><div class="chips">${['#ffffff', '#111111', '#ffd23f', '#ff4d6d', '#4db8ff', '#37e08a', '#b66bff', '#ff8a2e'].map(c => `<div class="sw ${draft.decalColor === c ? 'on' : ''}" data-dc="${c}" style="background:${c}"></div>`).join('')}</div>`;
    return '';
  };
  const statsHtml = () => { const st = stats(), b = base(); return ['S', 'A', 'H', 'G', 'W'].map(k => { const dlt = st[k] - b[k]; return `<div class="stat"><span>${STAT_NAMES[k]}</span><div class="bar"><i style="width:${st[k] * 10}%"></i>${dlt > 0.05 ? `<i class="d" style="position:absolute;left:${b[k] * 10}%;top:0;width:${dlt * 10}%;background:#7bffb0"></i>` : ''}</div><span>${st[k].toFixed(1)}</span></div>`; }).join('') + `<div style="font-size:11px;color:var(--mut);margin-top:2px">Top ${Math.round(st.vmax * 4)} km/h · 0→90% in ${st.t90.toFixed(1)}s · class ${charObj().cls}</div>`; };
  const draw = () => {
    const un = unowned(), tot = total();
    d.innerHTML = `<div class="topbar"><h2>Garage</h2>${T.html(document.createElement('div'), app.coinsBadge()).innerHTML}</div><div class="grow" id="spacer"></div>
    <div class="panel col" id="gpanel" style="padding:10px 12px;gap:8px;max-height:56vh"><div class="tabs">${['racer', 'kart', 'wheels', 'wing', 'exhaust', 'bumper', 'paint', 'decals'].map(t => `<div class="tab ${tab === t ? 'on' : ''}" data-tab="${t}">${t}</div>`).join('')}</div>
    <div class="row wrap" style="align-items:flex-start;gap:14px"><div class="col grow scroll" id="gbody" style="min-width:min(100%,360px);flex:2;gap:6px;max-height:34vh">${body_()}</div><div class="col" style="flex:1;min-width:210px;gap:5px">${statsHtml()}</div></div>
    <div class="row"><button class="btn ghost" id="back">Back</button><div class="grow"></div>${un.length ? `<button class="btn" id="buy" ${s.coins < tot ? 'disabled' : ''}>Buy & equip · ${tot}◉</button>` : `<span style="font-weight:800;color:#7bffb0">Saved ✓</span>`}</div></div>`;
    d.querySelector('.topbar').lastElementChild.id = 'coinsBadge';
    wire();
  };
  const sel = (q, fn) => d.querySelectorAll(q).forEach(e => e.onclick = () => { app.ui('ui_click'); fn(e); });
  const wire = () => {
    sel('[data-tab]', e => { tab = e.dataset.tab; app.garageTab = tab; draw(); });
    sel('[data-char]', e => { char = e.dataset.char; s.sel.char = char; app.persist(); draw(); refresh3d(); const id = CHAR_VOICE[char]; app.audio.preloadVoices([id], ['ready', 'taunt', 'win']).then(() => app.audio.bark(char, 'ready', { cooldown: 0 })); });
    sel('[data-body]', e => { body = e.dataset.body; draft = { ...s.builds[body] }; draw(); refresh3d(); });
    sel('[data-kind]', e => { draft[e.dataset.kind] = e.dataset.name; commit(); draw(); refresh3d(); });
    sel('[data-size]', e => { draft.size = +e.dataset.size; commit(); draw(); refresh3d(); }); sel('[data-rf]', e => { draft.rimFinish = +e.dataset.rf; commit(); draw(); refresh3d(); }); sel('[data-rim]', e => { draft.rim = +e.dataset.rim; commit(); draw(); refresh3d(); });
    sel('[data-paint]', e => { draft.paint = +e.dataset.paint; commit(); draw(); refresh3d(); }); sel('[data-paint2]', e => { draft.paint2 = +e.dataset.paint2; commit(); draw(); refresh3d(); }); sel('[data-fin]', e => { draft.finish = +e.dataset.fin; commit(); draw(); refresh3d(); }); sel('[data-tt]', e => { draft.twoTone = +e.dataset.tt; commit(); draw(); refresh3d(); });
    sel('[data-decal]', e => { draft.decal = +e.dataset.decal; commit(); draw(); refresh3d(); }); sel('[data-dc]', e => { draft.decalColor = e.dataset.dc; commit(); draw(); refresh3d(); });
    const ci = d.querySelector('#charInfo'); if (ci) { const c = charObj(); ci.innerHTML = `<b>${c.name}</b> · ${c.cls} · ${c.setname}<br>${c.personality}`; }
    const buy = d.querySelector('#buy'); if (buy) buy.onclick = () => { let ok = true; for (const [k, n] of unowned()) ok = SAVE.buy(s, k, n) && ok; if (ok) { app.ui('ui_buy'); commit(); app.toast('Purchased!'); } else app.ui('ui_error'); draw(); };
    d.querySelector('#back').onclick = () => { app.ui('ui_back'); if (unowned().length) { draft = { ...s.builds[body] }; } app.show('menu'); };
  };
  draw(); refresh3d(); sr.spin = true; app.garagePanel = d.querySelector('#gpanel');
  const rot = () => { }; 
}
