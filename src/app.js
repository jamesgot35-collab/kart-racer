import * as THREE from 'three';
import DATA from './gamedata.json';
import { TRACK_DEFS } from './trackdefs.js';
import { buildTrack, TRACK_ORDER, CUPS, ALL_TRACKS } from './tracks.js';
import { Race } from './race.js';
import { AudioEngine } from './audio.js';
import { Input } from './input.js';
import { Showroom } from './showroom.js';
import { ICONS } from './icons.js';
import { ITEM_INFO } from './items.js';
import { finalStats, statBars } from './stats.js';
import { KART_HQ, defaultBuild, buildKart } from './models.js';
import * as SAVE from './save.js';
import { mountGarage } from './garage.js';
import { mountLobby } from './lobbyui.js';
import { P } from './stats.js';

const $ = (s, r = document) => r.querySelector(s); const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ORD = (n) => n + (['th', 'st', 'nd', 'rd'][(n % 100 > 10 && n % 100 < 14) ? 0 : (n % 10 < 4 ? n % 10 : 0)]);
export const app = { v: '1.2.0', save: SAVE.load(), screen: 'boot', race: null, quality: 1, ghost: null, cup: null, mode: 'quick', cfg: {}, hqState: { on: false, bytes: 0 } };
window.__app = app;
const params = new URLSearchParams(location.search);
// ------------------------------------------------------------------ renderer
const TIER_AA = () => { const q = app.save.settings.quality; return q !== 'performance'; };
const canvas = $('#gl'); const renderer = new THREE.WebGLRenderer({ canvas, antialias: (TIER_AA()), powerPreference: 'high-performance', alpha: false, preserveDrawingBuffer: params.has('shot') });
renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05; const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(62, 1, 0.3, 2600);
app.renderer = renderer; app.scene = scene; app.camera = camera;
// quality tiers: performance (safe default for low-end phones) / standard / high
(function detectTier() { const st = app.save.settings; if (!st.qualityChosen) { st.qualityChosen = true; const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4; const lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4; if (lowMem || lowCpu) st.quality = 'performance'; try { SAVE.save(app.save); } catch (e) { } } })();
const TIER = { performance: { prCap: 1.0, particles: 0.4, lod: 0.5, aa: false }, standard: { prCap: 1.75, particles: 1, lod: 1, aa: true }, high: { prCap: 2.5, particles: 1.2, lod: 1, aa: true } };
const assistMode = () => app.save.settings.assist || ((window.matchMedia && matchMedia('(pointer:coarse)').matches) ? 'low' : 'off');
const DIFFS = { easy: { skill: -0.12, mul: 0.93 }, normal: { skill: 0, mul: 1 }, hard: { skill: 0.03, mul: 1.035 } }; const DIFF = () => DIFFS[app.save.settings.diff] || DIFFS.normal;
app.tier = () => TIER[app.save.settings.quality] || TIER.standard;
let pr = Math.min(window.devicePixelRatio || 1, app.tier().prCap); let prMax = pr; app.pr = () => pr;
function resize() { const w = innerWidth, h = innerHeight; renderer.setPixelRatio(pr); renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); const rot = $('#rotate'); const portrait = h > w; if (rot) rot.classList.toggle('hidden', true); }
addEventListener('resize', resize); addEventListener('orientationchange', () => setTimeout(resize, 200)); resize();
const showroom = new Showroom(renderer); app.showroom = showroom;
const audio = new AudioEngine({ base: 'audio/' }); app.audio = audio; window.__audio = audio; audio.hq = !!app.save.settings.hq;
const input = new Input($('#touch'), app.save.settings); app.input = input; input.autoOn = app.save.settings.autoGas;
input.onPause = () => { if (app.race && app.race.state === 'racing' && !app.paused) showPause(); };
// ------------------------------------------------------------------ helpers
export const T = {
  fmt: SAVE.fmtTime, ord: ORD, icon: (k) => ICONS[k] || '', coinSvg: ICONS.coin,
  html(el, h) { el.innerHTML = h; return el; },
};
function setLoading(on, title, frac, sub) { const l = $('#loading'); l.classList.toggle('hidden', !on); if (title) $('#ldTitle').textContent = title; if (frac !== undefined) $('#ldFill').style.width = Math.round(frac * 100) + '%'; $('#ldSub').textContent = sub || ''; }
app.setLoading = setLoading;
function toast(msg, color) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = msg; if (color) d.style.color = color; $('#toasts').appendChild(d); setTimeout(() => d.remove(), 2000); while ($('#toasts').children.length > 3) $('#toasts').firstChild.remove(); }
app.toast = toast;
function centerMsg(html, ms = 1100) { const c = $('#center'); c.innerHTML = html; clearTimeout(centerMsg.t); centerMsg.t = setTimeout(() => { c.innerHTML = ''; }, ms); }
function persist() { SAVE.save(app.save); }
app.persist = persist;
function ui(sfx) { if (audio.ready) audio.play(sfx, { bus: 'ui', min: 0.03 }); }
app.ui = ui;
function applySettings() { const s = app.save.settings; audio.setVolumes({ master: s.master, music: s.music, sfx: s.sfx, voice: s.voice, engine: s.engine }); input.autoOn = s.autoGas; input.s.steerSens = s.steerSens; const tz = $('#touch'); if (tz) { tz.classList.toggle('lefty', !!s.lefty); tz.style.setProperty('--ts-user', ({ s: 0.88, m: 1, l: 1.18 })[s.touchSize || 'm']); } }
app.applySettings = applySettings;
// ------------------------------------------------------------------ screens
const screens = $('#screens');
function show(name, p) { app.screen = name; screens.innerHTML = ''; $('#hud').classList.add('hidden'); $('#touch').classList.add('hidden'); const f = SCREENS[name]; if (f) f(p || {}); }
app.show = show; app.TRACK_DEFS = TRACK_DEFS; app.onHostLost = () => { if (app.race) { endRace(); toMenuMusic(); } app.toast('The host left the room', '#ff8a8a'); if (app.net) { app.net.close(); app.net = null; } show('menu'); };
const SCREENS = {};
function screenEl(cls = '') { const d = document.createElement('div'); d.className = 'screen ' + cls; screens.appendChild(d); return d; }
app.screenEl = screenEl;
function coinsBadge() { return `<div class="coins" id="coinsBadge">${ICONS.coin}<span>${app.save.coins}</span></div>`; }
app.coinsBadge = coinsBadge; app.refreshCoins = () => { const b = $('#coinsBadge span'); if (b) b.textContent = app.save.coins; };

SCREENS.title = () => {
  const d = screenEl('center'); d.style.justifyContent = 'center'; d.style.alignItems = 'center'; d.style.textAlign = 'center';
  d.innerHTML = `<div class="col" style="align-items:center;gap:18px"><div class="logo" style="font-size:min(15vw,84px)"><span class="a">Spark</span><span class="b">drift</span><br><span class="a" style="font-size:.55em;letter-spacing:.3em">GP</span></div>
  <div style="color:var(--mut);font-weight:700;max-width:420px">Arcade kart racing built for phones. Drift, boost, outsmart 11 rivals.</div>
  <button class="btn" id="goBtn" style="font-size:20px;padding:16px 38px">Tap to start</button>
  <div style="font-size:12px;color:var(--mut)">🎧 Headphones recommended — the sound is half the game.<br>v${app.v} · vertical slice · free & open (see CREDITS)</div></div>`;
  $('#goBtn').onclick = async () => { await bootAudio(); const rm = params.get('room'); if (rm) { app.pendingRoom = rm; show('lobby'); } else show('menu'); };
};
async function bootAudio() {
  setLoading(true, 'Warming up the engines', 0.05, 'Starting audio');
  try {
    await audio.unlock(); if (audio.hq) await loadHQManifest(); await audio.loadManifest(); applySettings(); setLoading(true, 'Warming up the engines', 0.3, 'Loading menu sounds');
    await audio.preloadSfx(['ui_click', 'ui_hover', 'ui_confirm', 'ui_back', 'ui_error', 'ui_toggle', 'ui_tick', 'ui_buy', 'ui_unlock', 'ui_whoosh', 'coin', 'lobby_join', 'lobby_leave', 'lobby_ready']); setLoading(true, 'Warming up the engines', 0.6, 'Loading menu music');
    if (await audio.loadMusic('menu')) { audio.startMusic('menu', 'menu'); } audio.startAmbience('menu'); audio.setReverb('menu');
  } catch (e) { console.warn('audio boot', e); }
  setLoading(false);
}
app.bootAudio = bootAudio;
SCREENS.menu = () => {
  const d = screenEl(); const s = app.save; showroom.setKart(s.builds[s.sel.body], s.sel.char); showroom.spin = true;
  d.innerHTML = `<div class="topbar"><div class="logo" style="font-size:34px"><span class="a">Spark</span><span class="b">drift</span> <span class="a" style="font-size:.6em">GP</span></div>${coinsBadge()}</div>
  <div class="grow row" style="align-items:flex-end;padding-bottom:6px"><div class="col" style="width:min(100%,320px)" id="menuBtns">
    <button class="btn" data-a="gp">Grand Prix <span style="opacity:.7;font-size:12px">· Seedling Cup</span></button>
    <button class="btn blue" data-a="quick">Quick race</button>
    <button class="btn blue" data-a="tt">Time trial · ghost</button>
    <button class="btn blue" data-a="daily">Daily challenge</button>
    <button class="btn blue" data-a="online">Versus · room code</button>
    <div class="row"><button class="btn ghost grow" data-a="garage">Garage</button><button class="btn ghost grow" data-a="settings">Settings</button></div>
  </div></div>`;
  d.querySelectorAll('[data-a]').forEach(b => b.onclick = () => { ui('ui_confirm'); const a = b.dataset.a; if (a === 'garage') show('garage'); else if (a === 'settings') show('settings'); else if (a === 'online') show('lobby'); else { app.mode = a; show('setup'); } });
};
SCREENS.garage = () => mountGarage(app, T);
SCREENS.lobby = () => mountLobby(app, T);
SCREENS.settings = () => {
  const s = app.save.settings, d = screenEl(); const sl = (k, label) => `<div><div class="row sp"><b>${label}</b><span id="v_${k}">${Math.round(s[k] * 100)}%</span></div><input type="range" min="0" max="100" value="${Math.round(s[k] * 100)}" data-k="${k}"></div>`;
  d.innerHTML = `<div class="topbar"><h2>Settings</h2>${coinsBadge()}</div><div class="panel grow scroll" style="padding:14px;margin-bottom:10px"><div class="col">
  ${sl('master', 'Master volume')}${sl('music', 'Music')}${sl('sfx', 'Effects')}${sl('engine', 'Engines')}${sl('voice', 'Voices & announcer')}
  <div class="toggle"><span>Auto-accelerate after GO<br><small style="color:var(--mut)">GAS pedal still works for the start boost</small></span><div class="sw2 ${s.autoGas ? 'on' : ''}" data-t="autoGas"></div></div>
  <div class="toggle"><span>Tilt steering (phone)<br><small style="color:var(--mut)">Overrides the slider when you tilt</small></span><div class="sw2 ${s.tilt ? 'on' : ''}" data-t="tilt"></div></div>
  <div class="toggle"><span>Screen shake</span><div class="sw2 ${s.shake ? 'on' : ''}" data-t="shake"></div></div>
  <div><b>Touch controls</b><div class="row wrap" style="margin-top:6px;gap:10px"><div class="seg" id="tsSeg">${[['s', 'Small'], ['m', 'Medium'], ['l', 'Large']].map(([k, n]) => `<button data-ts="${k}" class="${(s.touchSize || 'm') === k ? 'on' : ''}">${n}</button>`).join('')}</div><div class="toggle" style="gap:8px"><span>Left-handed layout</span><div class="sw2 ${s.lefty ? 'on' : ''}" id="lefty"></div></div></div></div>
  <div><div class="row sp"><b>Steering sensitivity</b><span id="v_ss">${s.steerSens.toFixed(2)}</span></div><input type="range" min="80" max="160" value="${Math.round(s.steerSens * 100)}" id="ss"></div>
  <div><b>Steering assist</b><div style="font-size:12px;color:var(--mut);margin:2px 0 6px">Gently steers you away from walls and the grass when you head into them. Never touches your steering in the middle of the road or while drifting.</div><div class="seg" id="asSeg">${['off', 'low', 'high'].map(k => `<button data-a="${k}" class="${assistMode() === k ? 'on' : ''}">${k[0].toUpperCase() + k.slice(1)}</button>`).join('')}</div></div>
  <div><b>Graphics & audio quality</b><div class="seg" style="margin-top:6px" id="qSeg"><button data-q="performance" class="${s.quality === 'performance' ? 'on' : ''}">Performance</button><button data-q="standard" class="${s.quality === 'standard' ? 'on' : ''}">Standard</button><button data-q="high" class="${s.quality === 'high' ? 'on' : ''}">High</button></div>
  <div style="font-size:12px;color:var(--mut);margin-top:6px" id="hqInfo"></div><div class="row" style="margin-top:8px"><button class="btn small blue" id="hqBtn">Download high-quality pack</button><span id="hqStat" style="font-size:12px;color:var(--mut)"></span></div></div>
  <div class="toggle"><span>Unlock everything (demo)<br><small style="color:var(--mut)">Marks all parts as owned — for testing the garage</small></span><div class="sw2 ${app.save.unlockAll ? 'on' : ''}" data-t="unlockAll"></div></div>
  <div class="row wrap"><button class="btn small ghost" id="rst">Reset save</button><button class="btn small ghost" id="cred">Credits</button></div>
  <div style="font-size:11px;color:var(--mut)">Sparkdrift GP v${app.v} · pad: left stick steer · A/RT gas · X drift · Y item · B brake · LB/RB look back · Start pause. Keys: arrows/WASD, Space drift, E item, C look back.</div>
  </div></div><div class="row"><button class="btn ghost" id="back">Back</button></div>`;
  d.querySelectorAll('input[data-k]').forEach(i => i.oninput = () => { s[i.dataset.k] = i.value / 100; $('#v_' + i.dataset.k).textContent = i.value + '%'; applySettings(); persist(); });
  $('#tsSeg').querySelectorAll('button').forEach(b => b.onclick = () => { ui('ui_click'); s.touchSize = b.dataset.ts; $('#tsSeg').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); applySettings(); persist(); });
  $('#lefty').onclick = () => { ui('ui_toggle'); s.lefty = !s.lefty; $('#lefty').classList.toggle('on', s.lefty); applySettings(); persist(); };
  $('#ss').oninput = (e) => { s.steerSens = e.target.value / 100; $('#v_ss').textContent = s.steerSens.toFixed(2); applySettings(); persist(); };
  d.querySelectorAll('[data-t]').forEach(t => t.onclick = async () => { const k = t.dataset.t; ui('ui_toggle'); if (k === 'unlockAll') { app.save.unlockAll = !app.save.unlockAll; t.classList.toggle('on', app.save.unlockAll); } else { s[k] = !s[k]; t.classList.toggle('on', s[k]); } if (k === 'tilt') { const ok = await input.enableTilt(s.tilt); if (!ok) { s.tilt = false; t.classList.remove('on'); toast('Tilt not available'); } } applySettings(); persist(); });
  const hqRefresh = () => { const tierTxt = { performance: 'Performance: lower resolution, no anti-aliasing, fewer particles and scenery. Smoothest on older or low-memory phones (the default there). ', standard: 'Standard: balanced look; resolution adapts automatically to hold your frame rate. ', high: '' }[s.quality] || ''; $('#hqInfo').textContent = s.quality !== 'high' ? tierTxt + 'High quality (desktop / recent iPad & iPhone Pro) adds lossless audio and 4K textures.' : (app.hqState.manifest ? `High quality uses lossless 48 kHz stems (≈${(app.hqState.manifest.totalBytes / 1048576).toFixed(0)} MB total across all 8 tracks and the menu, fetched per track on demand and cached) plus 2K/4K textures and HDR skies. Recommended on desktop / recent iPad & iPhone Pro; it needs ~300 MB RAM during a race.` : 'High quality pack manifest not loaded.'); $('#qSeg').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.q === s.quality)); };
  $('#asSeg').querySelectorAll('button').forEach(b => b.onclick = () => { ui('ui_toggle'); s.assist = b.dataset.a; persist(); $('#asSeg').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); });
  $('#qSeg').querySelectorAll('button').forEach(b => b.onclick = async () => { ui('ui_click'); const prev = s.quality; const nq = b.dataset.q; if (nq === prev) return; if ((prev === 'performance') !== (nq === 'performance')) { s.quality = nq; s.hq = nq === 'high'; persist(); toast('Applying graphics mode… reloading', '#ffd23f'); setTimeout(() => location.reload(), 700); return; } s.quality = nq; await setQuality(s.quality); persist(); hqRefresh(); });
  $('#hqBtn').onclick = async () => { ui('ui_confirm'); await prefetchHQ((f, txt) => { $('#hqStat').textContent = txt; }); };
  loadHQManifest().then(hqRefresh); hqRefresh();
  $('#rst').onclick = () => { if (confirm('Reset all progress?')) { app.save = SAVE.reset(); persist(); show('menu'); } };
  $('#cred').onclick = () => { window.open('CREDITS.md', '_blank'); }; $('#back').onclick = () => { ui('ui_back'); show('menu'); };
};
// ------------------------------------------------------------------ quality / HQ pack
async function loadHQManifest() { if (app.hqState.manifest) return app.hqState.manifest; try { const r = await fetch('hq-manifest.json'); app.hqState.manifest = await r.json(); audio.hqBase = (p) => { const m = app.hqState.manifest; const rec = m.files[p] || m.files[p.replace('.wav', '.flac')]; return rec ? m.repos[rec.r] + p : m.repos[m.default] + p; }; } catch (e) { app.hqState.manifest = null; } return app.hqState.manifest; }
async function setQuality(q) { const hq = q === 'high'; const changed = !!app.save.settings.hq !== hq; app.save.settings.hq = hq; if (changed && audio.ctx && audio.ctx.sampleRate !== (hq ? 48000 : 32000)) { app.save.settings.quality = q; persist(); toast('Switching audio engine… reloading', '#ffd23f'); setTimeout(() => location.reload(), 700); return; } audio.hq = hq; if (hq) await loadHQManifest(); KART_HQ.on = hq; app.save.settings.quality = q; prMax = Math.min(window.devicePixelRatio || 1, app.tier().prCap); pr = Math.min(pr, prMax); resize(); }
async function prefetchHQ(cb) { const m = await loadHQManifest(); if (!m) { cb(0, 'HQ manifest unavailable'); return; } const keys = Object.keys(m.files).filter(k => (k.startsWith('music/') && !k.endsWith('/master.flac')) || k.startsWith('voice/announcer')); let done = 0, bytes = 0; const total = keys.reduce((a, k) => a + m.files[k].b, 0); await audio.unlock(); const q = keys.slice(); const worker = async () => { while (q.length) { const k = q.shift(); const url = audio.hqBase(k); try { const c = await caches.open('sdgp-hq-v1'); let r = await c.match(url); if (!r) { r = await fetch(url, { mode: 'cors' }); if (r.ok) await c.put(url, r.clone()); } if (r.ok) await r.arrayBuffer(); } catch (e) { } bytes += m.files[k].b; done++; cb(bytes / total, `${(bytes / 1048576).toFixed(0)} / ${(total / 1048576).toFixed(0)} MB`); } }; await Promise.all([worker(), worker(), worker(), worker()]); cb(1, 'Downloaded & cached'); }
// ------------------------------------------------------------------ race setup
SCREENS.setup = () => {
  const cfg = app.cfg = { track: app.cfg.track || 'meadow', laps: app.cfg.laps || 3, mirror: false, reverse: false, items: true, ...app.cfg }; const mode = app.mode; const d = screenEl();
  cfg.cup = cfg.cup || 'seed'; const cupDef = CUPS.find(c => c.id === cfg.cup) || CUPS[0]; const title = { gp: 'Grand Prix · ' + cupDef.name, quick: 'Quick race', tt: 'Time trial', daily: 'Daily challenge' }[mode];
  if (mode === 'daily') { const day = Math.floor(Date.now() / 86400000); const h = (n) => { const x = Math.sin(day * 12.9898 + n * 78.233) * 43758.5453; return x - Math.floor(x); }; cfg.track = ALL_TRACKS[day % ALL_TRACKS.length]; cfg.mirror = h(1) > 0.5; cfg.reverse = h(2) > 0.7; cfg.laps = 2; cfg.items = true; cfg.daily = day; }
  const art = { meadow: 'linear-gradient(#5db8ff,#c9ecff 55%,#6bc24a 56%)', harbor: 'linear-gradient(#34509e,#ffb88a 55%,#2f6f8a 56%)', mesa: 'linear-gradient(#ff9b4a,#ffe7b0 55%,#e0a65a 56%)', frost: 'linear-gradient(#6aa8f0,#eaf5ff 55%,#eef6ff 56%)', dusk: 'linear-gradient(#3a2a6e,#ff8a5a 55%,#3d6a35 56%)', neon: 'linear-gradient(#0a0c2e,#2a3aa0 55%,#162036 56%)', ember: 'linear-gradient(#6a1a2a,#ff6a2a 55%,#8a4a22 56%)', aurora: 'linear-gradient(#071a3a,#2fe0a8 50%,#c9dff2 56%)' };
  const cards = ALL_TRACKS.map(id => { const def = TRACK_DEFS[id]; const best = app.save.bests[id + (cfg.mirror ? 'm' : '') + (cfg.reverse ? 'r' : '')]; return `<div class="card ${cfg.track === id ? 'on' : ''}" data-t="${id}"><div class="art" style="background:${art[id]}"></div><div class="t"><b>${def.name}</b><span>${def.cup} · ${def.theme} · ${(measured(id) / 1000).toFixed(2)} km</span><br><span>Best: ${SAVE.fmtTime(best)}</span></div></div>`; }).join('');
  d.innerHTML = `<div class="topbar"><h2>${title}</h2>${coinsBadge()}</div>
  <div class="grow col scroll" style="gap:10px"><div class="row wrap" id="cards" style="align-items:stretch">${mode === 'gp' ? `<div class="seg" id="cupSeg" style="width:100%;margin-bottom:4px">${CUPS.map(c => `<button data-cup="${c.id}" class="${cfg.cup === c.id ? 'on' : ''}">${c.name}</button>`).join('')}</div>` + cupDef.tracks.map((id, i) => `<div class="card on" style="min-width:140px;cursor:default"><div class="art" style="background:${art[id]};height:60px"></div><div class="t"><b>${i + 1}. ${TRACK_DEFS[id].name}</b></div></div>`).join('') : cards}</div>
  <div class="panel" style="padding:12px"><div class="row wrap" style="gap:14px"><div><div style="font-size:11px;color:var(--mut);font-weight:800">LAPS</div><div class="seg" id="laps">${[1, 2, 3, 4, 5].map(n => `<button data-n="${n}" class="${cfg.laps === n ? 'on' : ''}">${n}</button>`).join('')}</div></div>
  ${mode === 'tt' || mode === 'daily' ? '' : `<div><div style="font-size:11px;color:var(--mut);font-weight:800">CPU RIVALS</div><div class="seg" id="diff">${['easy', 'normal', 'hard'].map(k => `<button data-d="${k}" class="${(app.save.settings.diff || 'normal') === k ? 'on' : ''}">${k[0].toUpperCase() + k.slice(1)}</button>`).join('')}</div></div>`}
  ${mode === 'tt' || mode === 'daily' ? '' : `<div class="toggle" style="gap:8px"><span>Items</span><div class="sw2 ${cfg.items ? 'on' : ''}" data-o="items"></div></div>`}
  ${mode === 'gp' || mode === 'daily' ? '' : `<div class="toggle" style="gap:8px"><span>Mirror</span><div class="sw2 ${cfg.mirror ? 'on' : ''}" data-o="mirror"></div></div><div class="toggle" style="gap:8px"><span>Reverse</span><div class="sw2 ${cfg.reverse ? 'on' : ''}" data-o="reverse"></div></div>`}</div>
  <div style="font-size:12px;color:var(--mut);margin-top:6px">${mode === 'tt' ? 'Solo run against your best ghost. No items, no rivals.' : mode === 'daily' ? 'Today\'s fixed track & setup (same for everyone on this date). Leaderboard: <b>local to this device</b> — an online board needs the backend described in the production plan.' : '12 racers: you + 11 CPU rivals with light rubber-banding.'}</div></div></div>
  <div class="row"><button class="btn ghost" id="back">Back</button><div class="grow"></div><button class="btn" id="go" style="font-size:18px;padding:14px 34px">Start</button></div>`;
  d.querySelectorAll('#diff button').forEach(b => b.onclick = () => { ui('ui_toggle'); app.save.settings.diff = b.dataset.d; persist(); d.querySelectorAll('#diff button').forEach(x => x.classList.toggle('on', x === b)); });
  d.querySelectorAll('[data-cup]').forEach(b => b.onclick = () => { ui('ui_click'); cfg.cup = b.dataset.cup; show('setup'); });
  d.querySelectorAll('[data-t]').forEach(c => c.onclick = () => { ui('ui_click'); cfg.track = c.dataset.t; show('setup'); });
  d.querySelectorAll('#laps button').forEach(b => b.onclick = () => { ui('ui_toggle'); cfg.laps = +b.dataset.n; d.querySelectorAll('#laps button').forEach(x => x.classList.toggle('on', x === b)); });
  d.querySelectorAll('[data-o]').forEach(t => t.onclick = () => { ui('ui_toggle'); cfg[t.dataset.o] = !cfg[t.dataset.o]; show('setup'); });
  $('#back').onclick = () => { ui('ui_back'); show('menu'); };
  $('#go').onclick = () => { ui('ui_confirm'); if (mode === 'gp') { app.cup = { idx: 0, pts: {}, results: [], id: cupDef.id, name: cupDef.name, tracks: cupDef.tracks }; cfg.track = cupDef.tracks[0]; cfg.mirror = cfg.reverse = false; } startRace(); };
};
const _meas = {}; function measured(id) { if (!_meas[id]) _meas[id] = buildTrack(id).length; return _meas[id]; }
const CPU_NAMES = DATA.characters.filter(c => c.free).map(c => c.name);
app.CPU_NAMES = CPU_NAMES; function makeCpuBuild(i) { const bodies = DATA.bodies.map(b => b.name); const r = (n) => Math.floor(Math.random() * n); const b = defaultBuild(bodies[i % bodies.length]); b.paint = r(DATA.paintColors.length); b.finish = r(5); b.wheel = DATA.wheels[r(DATA.wheels.length)].name; b.size = 1 + r(3); b.rim = r(DATA.rimColors.length); b.spoiler = DATA.spoilers[r(DATA.spoilers.length)].name; b.exhaust = DATA.exhausts[r(DATA.exhausts.length)].name; b.bumper = DATA.bumpers[r(DATA.bumpers.length)].name; if (r(3) === 0) { b.twoTone = r(8); b.paint2 = r(32); } if (r(2) === 0) { b.decal = r(24); b.decalColor = '#ffffff'; } return b; }
async function prepareAudioFor(trackId, chars, onP) {
  if (!audio.ready) return; const def = TRACK_DEFS[trackId]; const steps = []; const names = Object.keys(audio.sfxMan); const ann = Object.keys(audio.voiceMan.announcer).filter(k => !k.startsWith('welcome') && k !== 'room_ready' && k !== 'player_joined' && k !== 'player_left' && k !== 'unlocked' && k !== 'pod_ready');
  let done = 0; const total = 5; const tick = (t) => { done++; onP && onP(done / total, t); };
  await audio.preloadSfx(names); tick('Sound effects'); await audio.preloadEngines(['light', 'medium', 'heavy']); tick('Engines'); await audio.preloadAnnouncer(ann); tick('Announcer');
  const barks = ['boost1', 'boost2', 'hit', 'spin', 'item', 'attack', 'overtake', 'overtaken', 'final', 'lose', 'shortcut', 'ready', 'taunt', 'win']; const ids = chars.map(c => c.id); await Promise.all(chars.map(c => audio.preloadVoices([c.id], c.local ? barks : ['spin', 'overtake', 'overtaken', 'taunt', 'hit']))); tick('Voices');
  await audio.load(`amb/${def.amb}.wav`, `amb/${def.amb}.flac`); await audio.loadMusic(def.music); tick('Music');
}
import { CHAR_VOICE } from './audio.js';
import { loadHQTrackTextures, loadHQEnv } from './hqgfx.js';
async function startRace(opts = {}) {
  const cfg = app.cfg; const s = app.save; const track = cfg.track; const def = TRACK_DEFS[track]; setLoading(true, def.name, 0.02, 'Preparing race');
  await new Promise(r => setTimeout(r, 30)); if (app.race) endRace();
  const solo = app.mode === 'tt'; const myBuild = s.builds[s.sel.body]; const me = { id: 0, name: s.sel.char, build: myBuild, human: true, local: true };
  let players = [me]; const slotMe = solo ? 0 : 6;
  if (!solo) { const pool = CPU_NAMES.filter(n => n !== s.sel.char); const rivals = []; let i = 0; while (rivals.length < 11) { rivals.push({ id: rivals.length + 1, name: pool[i % pool.length], build: makeCpuBuild(i + 3), cpu: true, human: false, skill: Math.min(1, 0.84 + Math.random() * 0.15 + DIFF().skill) }); i++; } players = rivals.slice(); players.splice(slotMe, 0, me); }
  const net = opts.net || null; if (net) players = net.players;
  const chars = players.map(p => ({ id: CHAR_VOICE[p.name], local: !!p.local })).filter((v, i, a) => a.findIndex(x => x.id === v.id) === i);
  const tA = performance.now(); await prepareAudioFor(track, chars, (f, t) => setLoading(true, def.name, 0.1 + f * 0.8, 'Loading ' + t)); app.timing = { audioPrepMs: Math.round(performance.now() - tA), decodedBuffers: audio.stats.decoded };
  KART_HQ.on = !!s.settings.hq; const q = app.tier().particles; let hqTex = null, hqEnv = null; if (s.settings.hq) { try { await loadHQManifest(); audio.hqManifest = app.hqState.manifest; setLoading(true, def.name, 0.88, 'Loading high-quality textures'); hqTex = await loadHQTrackTextures(TRACK_DEFS[track].theme, renderer, audio, (f) => setLoading(true, def.name, 0.88 + f * 0.08, 'Loading high-quality textures')); hqEnv = await loadHQEnv(track, audio); } catch (e) { console.warn('HQ textures unavailable', e); toast('HQ textures unavailable — using standard', '#ffd23f'); } } await new Promise(r => setTimeout(r, 10));
  const race = new Race({ scene, renderer, camera, audio, trackId: track, laps: cfg.laps, mirror: cfg.mirror, reverse: cfg.reverse, itemsOn: solo ? false : cfg.items, players, quality: q, hq: s.settings.hq, ui: onRaceUi, netId: net ? net.myId : 'L', rnd: net ? net.rnd : Math.random, introSec: 2.6, hqTex, hqEnv, lod: app.tier().lod, cpuMul: DIFF().mul, assist: assistMode() });
  race.net = net ? net.link : null; app.race = race; app.paused = false; if (net) { net.attach(race); setLoading(true, def.name, 0.95, 'Waiting for other racers…'); net.loaded(); await net.goP; }
  if (solo) { const key = ghostKey(); const g = s.ghosts[key]; if (g) { app.ghost = makeGhost(g, myBuild, s.sel.char); } else app.ghost = null; app.rec = { t: 0, a: [] }; }
  else app.ghost = null;
  race.state = 'grid'; screens.innerHTML = ''; setLoading(false); buildHud(race); $('#hud').classList.remove('hidden'); $('#touch').classList.remove('hidden'); input.active = true; input.reset(); race.input = input.state; app.screen = 'race'; app.resultsShown = false;
  audio.stopMusic(0.6); if (audio.musicBufs && audio.musicMeta && audio.musicMeta.piece === def.music) { audio.startMusic(def.music, 'grid', def.mrate || 1); } race.start();
}
app.startRace = startRace; app.makeCpuBuild = makeCpuBuild;
function ghostKey() { const c = app.cfg; return c.track + (c.mirror ? 'm' : '') + (c.reverse ? 'r' : '') + c.laps; }
function makeGhost(g, build, name) {
  const k = buildKart(build, name); k.root.traverse(o => { if (o.material) { const m = o.material.clone(); m.transparent = true; m.opacity = 0.38; m.depthWrite = false; o.material = m; } }); scene.add(k.root); k.root.visible = false; return { k, d: g, i: 0 };
}
function updateGhost(race) { const gh = app.ghost; if (!gh || race.state !== 'racing') return; const f = race.t * 10; const i = Math.floor(f); const a = gh.d; if (i + 1 >= a.length / 3) { gh.k.root.visible = false; return; } const u = f - i; const x0 = a[i * 3] / 10, z0 = a[i * 3 + 1] / 10, h0 = a[i * 3 + 2] / 100; const x1 = a[i * 3 + 3] / 10, z1 = a[i * 3 + 4] / 10, h1 = a[i * 3 + 5] / 100; let dh = h1 - h0; while (dh > Math.PI) dh -= 6.2832; while (dh < -Math.PI) dh += 6.2832; gh.k.root.visible = true; gh.k.root.position.set(x0 + (x1 - x0) * u, 0, z0 + (z1 - z0) * u); gh.k.root.rotation.y = h0 + dh * u; for (const w of gh.k.wheels) w.spin.rotation.x += 0.5; }
function recordGhost(race, dt) { const r = app.rec; if (!r || race.state !== 'racing') return; r.t += dt; const lk = race.localKart; while (r.a.length / 3 < Math.floor(race.t * 10) + 1) { r.a.push(Math.round(lk.sim.x * 10), Math.round(lk.sim.z * 10), Math.round(lk.sim.th * 100)); } }
function endRace() { if (!app.race) return; if (app.ghost) { scene.remove(app.ghost.k.root); app.ghost = null; } if (app.net) { app.net.detach && app.net.detach(); } app.race.dispose(); app.race = null; input.active = false; $('#center').innerHTML = ''; $('#fxlines').classList.add('hidden'); }
app.endRace = endRace;
// ------------------------------------------------------------------ HUD
let hud = {};
function buildHud(race) {
  const h = $('#hud'); h.innerHTML = `<div class="pos" id="hPos">7<small>th</small><span class="of">/12</span></div><div class="lap" id="hLap">LAP 1/3</div><div class="time" id="hTime">0:00.00</div>
  <div class="slot" id="hSlot"></div><div class="lock" id="hLock">▲ ROCKET LOCK ▲</div><div class="mini"><canvas id="hMini" width="248" height="248"></canvas></div><div class="coin" id="hCoin">${ICONS.coin}<span>0</span></div>
  <div class="charge" id="hCharge"><i></i><i></i><i></i></div><div class="spd"><span id="hSpd">0</span><small>KM/H</small></div>`;
  const pb = document.createElement('button'); pb.className = 'pausebtn'; pb.textContent = 'II'; pb.onclick = () => showPause(); h.appendChild(pb); pb.style.pointerEvents = 'auto'; pb.style.display = 'block';
  hud = { pos: $('#hPos'), lap: $('#hLap'), time: $('#hTime'), slot: $('#hSlot'), lock: $('#hLock'), mini: $('#hMini'), coin: $('#hCoin span'), charge: $('#hCharge'), spd: $('#hSpd'), last: {} };
  const tc = race.track; const c = hud.mini; const g = c.getContext('2d'); hud.g = g; const pts = tc.p; let minx = 1e9, maxx = -1e9, minz = 1e9, maxz = -1e9; for (const p of pts) { minx = Math.min(minx, p[0]); maxx = Math.max(maxx, p[0]); minz = Math.min(minz, p[1]); maxz = Math.max(maxz, p[1]); }
  const W = c.width, pad = 22; const sc = (W - pad * 2) / Math.max(maxx - minx, maxz - minz); hud.map = { sc, ox: pad + ((W - pad * 2) - (maxx - minx) * sc) / 2, oz: pad + ((W - pad * 2) - (maxz - minz) * sc) / 2, minx, maxz, minz, maxx };
  const off = document.createElement('canvas'); off.width = off.height = W; const og = off.getContext('2d'); og.lineJoin = 'round'; og.lineCap = 'round'; const P2 = (p) => mm(p[0], p[1]); const dl = (line, w, col) => { og.beginPath(); line.forEach((p, i) => { const q = P2(p); i ? og.lineTo(q[0], q[1]) : og.moveTo(q[0], q[1]); }); og.closePath(); og.lineWidth = w; og.strokeStyle = col; og.stroke(); };
  dl(pts.filter((_, i) => i % 2 === 0), 15, 'rgba(255,255,255,.25)'); dl(pts.filter((_, i) => i % 2 === 0), 10, 'rgba(255,255,255,.9)'); if (tc.sc) { og.beginPath(); tc.sc.p.forEach((p, i) => { const q = P2(p); i ? og.lineTo(q[0], q[1]) : og.moveTo(q[0], q[1]); }); og.setLineDash([6, 6]); og.lineWidth = 6; og.strokeStyle = '#ffd23f'; og.stroke(); og.setLineDash([]); }
  const a = tc.at(0, 0, {}); const q = P2([a.x, a.z]); og.fillStyle = '#ff4d6d'; og.fillRect(q[0] - 7, q[1] - 7, 14, 14); hud.mapBase = off;
}
function mm(x, z) { const m = hud.map; return [m.ox + (x - m.minx) * m.sc, m.oz + (m.maxz - z) * m.sc]; }
// Speed lines: radial streaks fade in near top speed and while boosting (skipped on the Performance tier to save fill-rate)
let speedFx = null, sfxT = 0;
function updateSpeedFx(race, dt) {
  if (app.save.settings.quality === 'performance' || app.save.settings.reduceFx) { if (speedFx) speedFx.style.opacity = 0; return; }
  if (!speedFx) { speedFx = document.createElement('div'); speedFx.id = 'speedfx'; document.body.insertBefore(speedFx, $('#hud')); }
  const lk = race.localKart; if (!lk || race.state !== 'racing') { speedFx.style.opacity = 0; return; } const s = lk.sim;
  const f = Math.max(0, Math.min(1, (s.s / lk.st.vmax - 0.86) / 0.3)); const target = Math.max(f * 0.45, s.boostT > 0 ? 0.8 : 0, s.draft && s.draft.sling > 0 ? 0.7 : 0);
  speedFx.dataset.v = (speedFx.dataset.v ? +speedFx.dataset.v : 0) + (target - (+speedFx.dataset.v || 0)) * Math.min(1, dt * 6); const o = +speedFx.dataset.v; speedFx.style.opacity = o.toFixed(2);
  sfxT -= dt; if (sfxT <= 0 && o > 0.03) { sfxT = 0.07; speedFx.style.transform = `rotate(${(Math.random() * 360) | 0}deg) scale(1.6)`; speedFx.classList.toggle('boost', s.boostT > 0); }
}
function updateHud(race, dt) {
  const lk = race.localKart; if (!lk || !hud.last) return; const s = lk.sim; const L = hud.last;
  const pos = lk.place; if (L.pos !== pos) { L.pos = pos; hud.pos.innerHTML = `${pos}<small>${ORD(pos).replace(/^\d+/, '')}</small><span class="of">/${race.karts.length}</span>`; }
  const lap = clamp(s.lap + 1, 1, race.laps); const lt = `LAP ${lap}/${race.laps}`; if (L.lap !== lt) { L.lap = lt; hud.lap.textContent = lt; } hud.time.textContent = race.state === 'racing' || race.state === 'finished' ? SAVE.fmtTime(race.t).slice(0, -1) : '0:00.00';
  const sp = Math.round(Math.abs(s.s) * 4); if (L.sp !== sp) { L.sp = sp; hud.spd.textContent = sp; }
  const itemKey = lk.roll ? 'roll:' + (Math.floor(lk.roll.t / 0.09) % 8) : lk.item ? lk.item.id + lk.item.n : ''; if (L.item !== itemKey) { L.item = itemKey; const sl = hud.slot; sl.classList.toggle('roll', !!lk.roll); sl.classList.toggle('has', !!lk.item); if (lk.roll) { const keys = ['pod', 'disc', 'peel', 'rocket', 'nova', 'spill', 'jolt', 'veil']; sl.innerHTML = ICONS[keys[Math.floor(lk.roll.t / 0.09) % 8]]; } else if (lk.item) sl.innerHTML = ICONS[lk.item.id] + (lk.item.n > 1 ? `<span class="cnt">${lk.item.n}</span>` : ''); else sl.innerHTML = '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="14" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3" stroke-dasharray="4 5"/></svg>'; input.elItem && input.elItem.classList.toggle('has', !!lk.item); }
  hud.coin.textContent = race.statsRace.coins; const ch = hud.charge; const dr = s.drift; const chk = dr.on ? 'c' + dr.tier : ''; if (L.ch !== chk) { L.ch = chk; ch.classList.toggle('on', dr.on); ch.children[0].className = dr.tier >= 1 ? 'f1' : ''; ch.children[1].className = dr.tier >= 2 ? 'f2' : ''; ch.children[2].className = dr.tier >= 3 ? 'f3' : ''; }
  hud.lock.classList.toggle('on', lk.lockT > 0);
  const fl = $('#fxlines'); const boosting = s.boostT > 0 || s.starT > 0; fl.classList.remove('hidden'); fl.classList.toggle('on', boosting); fl.classList.toggle('hit', s.spinT > 0.6);
  // minimap
  const g = hud.g, W = hud.mini.width; g.clearRect(0, 0, W, W); g.drawImage(hud.mapBase, 0, 0); const dot = (k, me) => { const q = mm(k.sim.x, k.sim.z); g.beginPath(); g.fillStyle = me ? '#ffd23f' : (k.place < lk.place ? '#ff6b6b' : '#7fd0ff'); g.arc(q[0], q[1], me ? 8 : 5.5, 0, 6.3); g.fill(); g.lineWidth = me ? 3 : 1.5; g.strokeStyle = me ? '#fff' : 'rgba(0,0,0,.6)'; g.stroke(); if (me) { g.beginPath(); g.moveTo(q[0] + Math.sin(k.sim.th) * 14, q[1] - Math.cos(k.sim.th) * 14); g.lineTo(q[0] + Math.sin(k.sim.th + 2.5) * 8, q[1] - Math.cos(k.sim.th + 2.5) * 8); g.lineTo(q[0] + Math.sin(k.sim.th - 2.5) * 8, q[1] - Math.cos(k.sim.th - 2.5) * 8); g.fillStyle = '#fff'; g.fill(); } };
  for (const k of race.karts) if (k !== lk) dot(k, false); dot(lk, true);
}
function onRaceUi(type, d) {
  const lk = app.race && app.race.localKart;
  switch (type) {
    case 'cd': centerMsg(`<div class="big">${d.n}</div>`, 900); break;
    case 'go': centerMsg('<div class="big" style="color:#37e08a">GO!</div>', 900); break;
    case 'start': if (d.res === 'boost') toast('⚡ Perfect start!', '#7bffb0'); else if (d.res === 'stall') toast('Too early — wheelspin!', '#ff8a8a'); break;
    case 'tier': toast(['', 'Blue spark', 'Orange spark', 'PURPLE spark!'][d.tier], ['', '#4db8ff', '#ff9a2e', '#c16bff'][d.tier]); break;
    case 'boost': toast(['', 'Mini-turbo', 'Super-turbo', 'ULTRA TURBO'][d.tier], '#fff'); break;
    case 'lapMsg': centerMsg(`<div class="msg">Lap ${d.lap}</div>`, 1300); break;
    case 'finalLap': centerMsg('<div class="msg" style="color:#ff6b6b">Final lap!</div>', 1700); break;
    case 'shortcut': toast('Shortcut!', '#ffd23f'); break;
    case 'wrong': centerMsg('<div class="msg" style="color:#ff6b6b">Wrong way</div>', 600); break;
    case 'hit': toast(d.kind === 'rocket' ? 'Hit by a rocket!' : d.kind === 'jolt' ? 'Storm Jolt!' : 'Spun out!', '#ff8a8a'); break;
    case 'hitOther': toast('Direct hit!', '#7bffb0'); break;
    case 'lock': toast('Rocket lock! Hit ITEM to brace', '#ff4d4d'); break;
    case 'brace': toast('Perfect brace!', '#7bffb0'); break;
    case 'stolen': toast('Item stolen!', '#b9a7ff'); break;
    case 'coin': break;
    case 'item': if (d.id) toast(ITEM_INFO[d.id].name, ITEM_INFO[d.id].color); break;
    case 'joltArm': toast('Storm Jolt charging…', '#fff25a'); break;
    case 'results': showResults(d.results); break;
  }
}
// ------------------------------------------------------------------ pause / results
function showPause() {
  const r = app.race; if (!r || app.paused) return; const online = !!app.net; if (!online) app.paused = true; const d = screenEl('center'); d.style.justifyContent = 'center'; d.style.alignItems = 'center'; d.style.background = 'rgba(5,10,24,.6)';
  d.innerHTML = `<div class="panel col" style="padding:18px;min-width:min(86vw,320px)"><h2>Paused</h2><button class="btn" id="rs">Resume</button>${online ? '<div style="font-size:12px;color:var(--mut)">Online race keeps running while this menu is open.</div>' : '<button class="btn blue" id="rt">Restart race</button>'}<button class="btn ghost" id="qt">Quit to menu</button></div>`;
  if (audio.ctx && !online) audio.ctx.suspend();
  $('#rs').onclick = () => { app.paused = false; d.remove(); if (audio.ctx) audio.ctx.resume(); };
  if ($('#rt')) $('#rt').onclick = () => { app.paused = false; d.remove(); if (audio.ctx) audio.ctx.resume(); if (app.net) return; startRace(); };
  $('#qt').onclick = async () => { app.paused = false; d.remove(); if (audio.ctx) await audio.ctx.resume(); endRace(); if (app.net) { app.net.close(); app.net = null; } toMenuMusic(); show('menu'); };
}
async function toMenuMusic() { audio.stopMusic(0.5); audio.stopAllLoops(); audio.setReverb('menu'); if (await audio.loadMusic('menu')) audio.startMusic('menu', 'menu'); audio.startAmbience('menu'); }
function showResults(res) {
  if (app.resultsShown) return; app.resultsShown = true; const s = app.save; const me = res.find(r => r.local); const solo = app.mode === 'tt'; const place = me.place; const cfg = app.cfg;
  const PTS = [15, 12, 10, 8, 7, 6, 5, 4, 3, 2, 1, 0]; const BON = [80, 60, 45, 35, 28, 22, 18, 14, 10, 7, 4, 2]; const reward = solo ? 20 + me.coins : (BON[place - 1] || 0) + me.coins + 20; s.coins += reward; s.stats.races++; if (place === 1) s.stats.wins++; s.stats.coinsEarned += reward;
  const key = cfg.track + (cfg.mirror ? 'm' : '') + (cfg.reverse ? 'r' : ''); let newBest = false; if (me.time && (!s.bests[key] || (cfg.laps === 3 && me.time < s.bests[key]))) { if (cfg.laps === 3) { s.bests[key] = me.time; newBest = true; } }
  if (solo && me.time) { const gk = ghostKey(); const old = s.ghosts[gk]; if (!old || me.time < s.ghosts[gk + 't']) { s.ghosts[gk] = app.rec.a; s.ghosts[gk + 't'] = me.time; newBest = true; } }
  if (cfg.daily) { const dk = 'd' + cfg.daily; s.daily[dk] = s.daily[dk] && s.daily[dk] < me.time ? s.daily[dk] : me.time; }
  let cupHtml = ''; let nextLabel = app.net ? 'Back to lobby' : 'Race again';
  if (app.mode === 'gp' && app.cup) { const cup = app.cup; for (const r of res) cup.pts[r.name] = (cup.pts[r.name] || 0) + PTS[r.place - 1]; cup.idx++; const st = Object.entries(cup.pts).sort((a, b) => b[1] - a[1]); const lastRace = cup.idx >= 4; nextLabel = lastRace ? 'Finish cup' : 'Next race'; cupHtml = `<div class="panel" style="padding:10px"><b>Cup standings (${cup.idx}/4)</b><table class="res">${st.slice(0, 6).map(([n, p], i) => `<tr class="${n === s.sel.char ? 'me' : ''}"><td>${i + 1}</td><td>${n}</td><td>${p} pts</td></tr>`).join('')}</table></div>`; if (lastRace) { const rank = st.findIndex(x => x[0] === s.sel.char) + 1; const trophy = rank === 1 ? 'Gold' : rank === 2 ? 'Silver' : rank === 3 ? 'Bronze' : 'None'; cupHtml += `<div class="panel" style="padding:10px"><b>${cup.name || 'Seedling Cup'} result: ${ORD(rank)} — ${trophy} trophy</b></div>`; if (rank <= 3) { s.coins += [300, 200, 120][rank - 1] + (cup.id === 'star' ? [100, 60, 40][rank - 1] : 0); } } }
  persist(); audio.ready && audio.setMusicState('results');
  setTimeout(() => {
    $('#touch').classList.add('hidden'); $('#hud').classList.add('hidden'); input.active = false; const d = screenEl(); d.style.background = 'linear-gradient(rgba(5,10,24,.35),rgba(5,10,24,.85))'; d.innerHTML = `<div class="topbar"><h2>${place === 1 ? '🏆 Victory!' : 'Race complete'} — ${ORD(place)}</h2>${coinsBadge()}</div>
    <div class="grow row wrap scroll" style="align-items:flex-start;gap:10px"><div class="panel grow" style="padding:10px;min-width:260px"><table class="res">${res.slice(0, 12).map(r => `<tr class="${r.local ? 'me' : ''}"><td>${r.place}</td><td>${r.disp}</td><td class="n">${r.time ? SAVE.fmtTime(r.time) : '—'}</td></tr>`).join('')}</table></div>
    <div class="col" style="min-width:230px;flex:1"><div class="panel" style="padding:12px"><div class="row sp"><b>Coins earned</b><span class="coins">${ICONS.coin}+${reward}</span></div><div style="font-size:12px;color:var(--mut);margin-top:6px">${me.coins} collected · placing bonus ${solo ? 0 : BON[place - 1]} · finish +20${newBest ? '<br><b style="color:var(--y)">New personal best!</b>' : ''}</div></div>${cupHtml}</div></div>
    <div class="row wrap"><button class="btn ghost" id="mn">Menu</button><div class="grow"></div><button class="btn" id="nx">${nextLabel}</button></div>`;
    $('#mn').onclick = async () => { ui('ui_back'); endRace(); if (app.net) { app.net.close(); app.net = null; } app.cup = null; await toMenuMusic(); show('menu'); };
    $('#nx').onclick = async () => { ui('ui_confirm'); if (app.net) { endRace(); await toMenuMusic(); show('lobby'); return; } if (app.mode === 'gp' && app.cup) { if (app.cup.idx >= 4) { endRace(); app.cup = null; await toMenuMusic(); show('menu'); return; } app.cfg.track = (app.cup.tracks || TRACK_ORDER)[app.cup.idx]; } startRace(); };
    if (audio.ready) audio.play(place <= 3 ? 'fanfare_win' : 'fanfare_mid', { bus: 'ui', vol: 0.6 });
  }, 1200);
}
// ------------------------------------------------------------------ main loop
let last = performance.now(), fpsAcc = 0, fpsN = 0, lowT = 0, highT = 0, skip = 0, frameCount = 0; app.fps = 60; app.frameSkip = false;
function frame(now) {
  requestAnimationFrame(frame); let dt = (now - last) / 1000; last = now; if (dt > 0.25) dt = 0.25; frameCount++;
  const race = app.race;
  if (race && !app.paused) {
    input.poll(race.state === 'racing' && input.autoOn); race.update(dt); updateSpeedFx(race, dt); updateGhost(race); recordGhost(race, dt); if (frameCount % 2 === 0 || !app.frameSkip) updateHud(race, dt);
    if (app.frameSkip && frameCount % 2) { adapt(dt); return; }
    renderer.render(scene, camera);
  } else if (!race) { if (['menu', 'garage', 'title', 'setup', 'settings', 'lobby', 'boot', 'results'].includes(app.screen)) showroom.render(dt, innerWidth, innerHeight, app.screen === 'garage' ? (innerWidth > innerHeight ? -1.0 : 'garage') : app.screen === 'menu' ? 0.9 : 0); }
  else renderer.render(scene, camera);
  adapt(dt);
}
function adapt(dt) {
  fpsAcc += dt; fpsN++; if (fpsAcc < 0.5) return; const fps = fpsN / fpsAcc; app.fps = fps; fpsAcc = 0; fpsN = 0; if (!app.race || app.paused) { lowT = highT = 0; return; }
  const target = app.frameSkip ? 30 : 60; if (fps < target * 0.86) { lowT += 0.5; highT = 0; } else if (fps > target * 0.97) { highT += 0.5; lowT = 0; } else { lowT = highT = 0; }
  if (lowT >= 1.5) { lowT = 0; if (pr > 0.62) { pr = Math.max(0.62, pr - 0.15); resize(); } else if (!app.frameSkip) { app.frameSkip = true; const st = app.save.settings; if (!app.perfSuggested && !params.has('shot')) { app.perfSuggested = true; if (st.quality === 'standard') { st.quality = 'performance'; persist(); toast('Running slowly — switched to Performance graphics for your next race (change in Settings)', '#ffd23f'); } else if (st.quality === 'high') toast('Running slowly — try Standard or Performance graphics in Settings', '#ffd23f'); } } }
  else if (highT >= 8 && pr < prMax && !app.frameSkip) { highT = 0; pr = Math.min(prMax, pr + 0.1); resize(); }
}
requestAnimationFrame(frame);
// ------------------------------------------------------------------ boot
(async function boot() {
  KART_HQ.on = !!app.save.settings.hq; applySettings(); if (app.save.settings.quality === 'high') { await setQuality('high'); }
  $('#loading').classList.add('hidden'); show('title');
  // test hooks
  if (params.has('autostart')) { setTimeout(async () => { await bootAudio(); app.mode = params.get('mode') || 'quick'; app.cfg.track = params.get('track') || 'meadow'; app.cfg.laps = +(params.get('laps') || 3); startRace(); }, 100); }
})();
import { AI } from './ai.js';
window.__test = { makeAuto(race) { const k = race.localKart; k.ai = new AI(k, race, 0.92); k.auto = true; }, startRace, show, endRace, toast, centerMsg, input, T, SAVE, setQuality, prefetchHQ };
