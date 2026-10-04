import * as THREE from 'three';
import DATA from './gamedata.json';
import { Race } from './race.js';
import { defaultBuild } from './models.js';
import { TRACK_ORDER } from './tracks.js';
const renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true }); renderer.setSize(480, 300); document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(62, 480 / 300, 0.3, 2500);
const names = DATA.characters.filter(c => c.free).map(c => c.name).slice(0, 12);
function players(localAuto) {
  const bodies = DATA.bodies.map(b => b.name); return names.map((n, i) => ({ id: i, name: n, build: { ...defaultBuild(bodies[i % bodies.length]), paint: (i * 5) % 32 }, human: i === 0, local: i === 0, cpu: i !== 0 }));
}
let race;
window.runSim = (trackId, seconds, opts = {}) => {
  if (race) race.dispose(); const ps = players(); if (opts.cpuLocal) { ps[0].human = false; ps[0].cpu = true; }
  race = new Race({ scene, renderer, camera, audio: null, trackId, laps: opts.laps || 3, players: ps, mirror: opts.mirror, reverse: opts.reverse, introSec: 0.1 });
  const lk = race.localKart; if (opts.cpuLocal) { lk.ai = lk.ai || new (race.karts.find(k => k.ai).ai.constructor)(lk, race, 0.95); lk.auto = true; }
  const out = { errors: [], samples: [] }; const dt = 1 / 60; let maxPlace = 0, t = 0; const wall = performance.now();
  for (let i = 0; i < seconds * 60; i++) { try { race.update(dt); } catch (e) { out.errors.push(String(e.stack || e).slice(0, 500)); break; } t += dt; if (i % 600 === 0) out.samples.push({ t: +t.toFixed(1), state: race.state, place: lk.place, lap: lk.sim.lap, spd: +lk.sim.s.toFixed(1), surf: lk.sim.surf, prog: Math.round(lk.sim.prog) }); }
  out.wallMs = Math.round(performance.now() - wall); out.final = race.karts.map(k => ({ n: k.name.split(' ')[0], lap: k.sim.lap, prog: Math.round(k.sim.prog), place: k.place, fin: k.finished, s: +k.sim.s.toFixed(1), spin: k.sim.spinT > 0 })).sort((a, b) => a.place - b.place); out.results = race.results && race.results.slice(0, 3);
  renderer.render(scene, camera); window.race = race; return out;
};
window.TRACK_ORDER = TRACK_ORDER; window.ready = true;
window.traceKart = (trackId, seconds, idx = 3, noDrift = false) => {
  if (race) race.dispose(); race = new Race({ scene, renderer, camera, audio: null, trackId, laps: 3, players: players(), introSec: 0.1, noDrift }); const k = race.karts[idx]; const rows = []; const dt = 1 / 60;
  for (let i = 0; i < seconds * 60; i++) { race.update(dt); if (i % 30 === 0 && race.state === 'racing') { const s = k.sim; rows.push([+race.t.toFixed(1), Math.round(s.lastS), +s.lat.toFixed(1), +s.s.toFixed(1), +s.steer.toFixed(2), s.drift.on ? 'D' + s.drift.tier : s.drift.hopped ? 'h' : '-', s.surf[0], +race.track.lineSpeed(s.lastS + 10).toFixed(0), +s.boostT.toFixed(1), s.spinT > 0 ? 'S' : '', s.wallHits || '']); } }
  return rows.map(r => r.join(' ')).join('\n');
};
window.trace2 = (trackId, t0, t1, idx = 3) => {
  if (race) race.dispose(); race = new Race({ scene, renderer, camera, audio: null, trackId, laps: 3, players: players(), introSec: 0.1 }); const k = race.karts[idx]; const rows = []; const dt = 1 / 60; const tc = race.track;
  for (let i = 0; i < (t1 + 4) * 60; i++) { race.update(dt); if (i % 6 === 0 && race.t >= t0 && race.t <= t1 && race.state === 'racing') { const s = k.sim; const a = tc.at(s.lastS, 0, {}); rows.push([+race.t.toFixed(2), Math.round(s.lastS), 'lat', +s.lat.toFixed(1), 'v', +s.s.toFixed(1), 'th-tan', +(((s.th - a.heading + 3 * Math.PI) % (2 * Math.PI)) - Math.PI).toFixed(2), 'phi-tan', +(((s.phi - a.heading + 3 * Math.PI) % (2 * Math.PI)) - Math.PI).toFixed(2), 'st', +s.steer.toFixed(2), s.drift.on ? 'D' : s.drift.hopped ? 'h' : '-', 'k', +tc.k[Math.round(s.lastS / tc.step) % tc.N].toFixed(4), 'lk', +tc.lineCurv(s.lastS + 20).toFixed(4)].join(' ')); } }
  return rows.join('\n');
};
