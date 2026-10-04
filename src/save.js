import DATA from './gamedata.json';
import { defaultBuild } from './models.js';
const KEY = 'sparkdrift.save.v1';
export const STARTER_COINS = 600;
function fresh() {
  const builds = {}; for (const b of DATA.bodies) builds[b.name] = defaultBuild(b.name);
  return { v: 1, coins: STARTER_COINS, chars: DATA.characters.filter(c => c.free && c.playable).map(c => c.name), bodies: DATA.bodies.filter(b => !b.price).map(b => b.name), parts: { wheel: ['Six-Spoke Standard'], spoiler: ['None'], exhaust: ['Stock Pipe'], bumper: ['Stock Bumper'] },
    unlockAll: false, sel: { char: 'Pip Thistledown', body: 'Corsa Standard' }, builds, settings: { master: 1, music: 0.8, sfx: 1, voice: 1, engine: 1, quality: 'standard', autoGas: true, steerSens: 1.15, tilt: false, hq: false, shake: true, fps: 'auto' }, bests: {}, ghosts: {}, stats: { races: 0, wins: 0, coinsEarned: 0 }, daily: {}, created: Date.now() };
}
export function load() {
  let s; try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) { s = null; } const f = fresh(); if (!s || s.v !== 1) return f;
  s = { ...f, ...s, settings: { ...f.settings, ...(s.settings || {}) }, parts: { ...f.parts, ...(s.parts || {}) }, sel: { ...f.sel, ...(s.sel || {}) }, builds: { ...f.builds, ...(s.builds || {}) } }; return s;
}
export function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { } }
export function reset() { try { localStorage.removeItem(KEY); } catch (e) { } return fresh(); }
export const PART_FIELDS = { wheel: 'wheels', spoiler: 'spoilers', exhaust: 'exhausts', bumper: 'bumpers' };
export function charPrice(c) { return c.free ? 0 : 900; }
export function owns(s, kind, name) { if (s.unlockAll) return true; if (kind === 'char') return s.chars.includes(name); if (kind === 'body') return s.bodies.includes(name); return (s.parts[kind] || []).includes(name); }
export function priceOf(kind, name) { if (kind === 'char') { const c = DATA.characters.find(x => x.name === name); return c ? charPrice(c) : 0; } if (kind === 'body') return (DATA.bodies.find(x => x.name === name) || {}).price || 0; const arr = DATA[PART_FIELDS[kind]]; return ((arr || []).find(x => x.name === name) || {}).price || 0; }
export function buy(s, kind, name) { if (owns(s, kind, name)) return true; const p = priceOf(kind, name); if (s.coins < p) return false; s.coins -= p; if (kind === 'char') s.chars.push(name); else if (kind === 'body') s.bodies.push(name); else s.parts[kind].push(name); save(s); return true; }
export function fmtTime(t) { if (t === null || t === undefined) return '--:--.---'; const m = Math.floor(t / 60), sec = t - m * 60; return m + ':' + (sec < 10 ? '0' : '') + sec.toFixed(3); }
