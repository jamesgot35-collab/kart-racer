// Node-side network test: real PeerJS cloud signalling + real WebRTC data channels (via @roamhq/wrtc, because this box's headless Chrome cannot gather ICE candidates).
// Exercises the actual src/net.js Session class: host room, join by code, ready/cfg sync, start/loaded/go handshake, 20 Hz snapshot relay, item-use + item-box events, drop -> CPU takeover.
import { build } from 'esbuild'; import fs from 'fs';
fs.mkdirSync('dist', { recursive: true });
await build({ entryPoints: ['src/net.js'], bundle: true, outfile: 'dist/net_node.mjs', format: 'esm', platform: 'node', target: 'node20', external: ['@roamhq/wrtc', 'ws'], logLevel: 'error', banner: { js: 'import {createRequire as __cr} from "module"; const require = __cr(import.meta.url);' } });
const wrtc = (await import('@roamhq/wrtc')).default; const WebSocket = (await import('ws')).default;
Object.assign(globalThis, { RTCPeerConnection: wrtc.RTCPeerConnection, RTCSessionDescription: wrtc.RTCSessionDescription, RTCIceCandidate: wrtc.RTCIceCandidate, WebSocket }); globalThis.window = globalThis;
const { Session, normCode, ALPHA } = await import('../dist/net_node.mjs');
const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const res = []; const check = (name, ok, extra = '') => { res.push({ name, ok: !!ok, extra: String(extra) }); console.log(ok ? 'PASS' : 'FAIL', name, extra); };
function fakeRace(ids, humanIds) { const karts = ids.map(id => ({ id, name: 'K' + id, auth: !humanIds.includes(id) || id === ids.me, remote: false, human: humanIds.includes(id), cpu: !humanIds.includes(id), sim: { x: id * 10, z: 0, s: 20, th: 0, phi: 0 }, item: null, dispName: 'K' + id })); return { karts, state: 'racing', used: [], applied: {}, view: { boxes: [{ active: true, respawn: 0 }, { active: true, respawn: 0 }] }, items: { fire(k, id, o) { fakeRace.last.used.push([k.id, id, !!o.back]); } }, snapshot(k) { return { x: k.sim.x, z: k.sim.z, th: 0, phi: 0, s: 20, lap: 0 }; }, applySnapshot(id, s) { this.applied[id] = s; }, net: null }; }
const mkApp = (name) => ({ cfg: {}, ui() { }, toast(m) { this.toasts.push(m); }, toasts: [], started: null, mode: '', startRace(o) { this.started = o; } });
const profA = { name: 'Pip Thistledown', build: { body: 'A' } }, profB = { name: 'Fennel', build: { body: 'B' } };
const appA = mkApp(), appB = mkApp(); const A = new Session(appA), B = new Session(appB);
check('room-code alphabet is 20 symbols', ALPHA.length === 20 && new Set(ALPHA).size === 20);
A.host(profA); for (let i = 0; i < 60 && A.status === 'connecting'; i++) await sleep(250);
check('host opens room on PeerJS cloud', A.status === 'open', A.code + ' ' + A.error); if (A.status !== 'open') process.exit(1);
check('code is 6 valid chars', A.code.length === 6 && [...A.code].every(c => ALPHA.includes(c)), A.code);
B.join(normCode(A.code.slice(0, 3).toLowerCase() + ' ' + A.code.slice(3)), profB); for (let i = 0; i < 60 && B.status === 'connecting'; i++) await sleep(250);
check('client connects by code (WebRTC data channel open)', B.status === 'open', B.error); await sleep(800);
check('both lobbies list 2 members', A.members.length === 2 && B.members.length === 2, `A=${A.members.length} B=${B.members.length} you=${B.myPid}`);
B.ready(true); await sleep(400); check('ready flag syncs to host', A.members.find(m => m.pid === 1)?.ready === true);
A.setCfg({ track: 'harbor', laps: 2, items: true }); await sleep(400); check('host cfg syncs to client', B.cfg.track === 'harbor' && B.cfg.laps === 2);
await sleep(2500); check('rtt measured', B.stats.rtt > 0, Math.round(B.stats.rtt) + ' ms');
// start
const cpuBuild = (i) => ({ body: 'cpu' + i }); const names = Array.from({ length: 20 }, (_, i) => 'Cpu' + i);
A.hostStart(cpuBuild, names); await sleep(1200);
check('both apps got startRace', appA.started && appB.started, '');
check('grid has 12 racers (2 humans + 10 CPU)', A.players.length === 12 && B.players.length === 12, A.players.length + '/' + B.players.length);
check('roles correct', A.players.find(p => p.id === 0).local && A.players.find(p => p.id === 1).remote && B.players.find(p => p.id === 1).local && B.players.find(p => p.id === 0).remote && B.players.find(p => p.id === 4).remote);
check('app cfg carried to client', appB.cfg.track === 'harbor' && appB.mode === 'versus');
// go handshake
const t0 = Date.now(); let goA = false, goB = false; A.goP.then(() => goA = true); B.goP.then(() => goB = true); A.loaded(); await sleep(300); check('go not sent until all loaded', !goA && !goB); B.loaded(); await sleep(800); check('go broadcast after all loaded', goA && goB, (Date.now() - t0) + ' ms');
// in-race
const rA = fakeRace([0, 1, 4, 5], [0, 1]); rA.karts.find(k => k.id === 1).remote = true; rA.karts.find(k => k.id === 1).auth = false; rA.karts[0].auth = true; rA.karts[2].auth = true; rA.karts[3].auth = true; rA.karts[0].sim.x = 100;
const rB = fakeRace([0, 1, 4, 5], [0, 1]); for (const k of rB.karts) { k.auth = k.id === 1; k.remote = k.id !== 1; } rB.karts.find(k => k.id === 1).sim.x = 333;
A.myPid = 0; fakeRace.last = rA; A.attach(rA); rA.net = A.link; B.attach(rB); rB.net = B.link; await sleep(1500);
check('client kart snapshots reach host (20 Hz)', rA.applied[1] && rA.applied[1].x === 333, JSON.stringify(rA.applied[1]));
check('host + CPU kart snapshots reach client', rB.applied[0] && rB.applied[0].x === 100 && rB.applied[4] && rB.applied[5], Object.keys(rB.applied).join(','));
check('snapshot rate ~20/s', A.stats.recv > 20 && B.stats.recv > 20, `A.recv=${A.stats.recv} B.recv=${B.stats.recv}`);
fakeRace.last = rB; B.link.send('use', { k: 1, id: 'disc', back: true, held: false }); fakeRace.last = rA; await sleep(500);
check('item-use event replays on host for remote kart', rA.used.some(u => u[0] === 1 && u[1] === 'disc' && u[2] === true), JSON.stringify(rA.used));
B.link.send('box', { i: 1 }); await sleep(400); check('item-box pickup syncs', rA.view.boxes[1].active === false);
// drop
A.race = rA; B.close(); await sleep(1500);
const k1 = rA.karts.find(k => k.id === 1); check('client drop -> host takes over kart with CPU AI', k1.auth && !k1.remote && k1.cpu && !!k1.ai && appA.toasts.length > 0, appA.toasts.join('|'));
check('lobby member removed after drop', !A.members.some(m => m.pid === 1));
// host lost
const appC = mkApp(); const C = new Session(appC); let lost = false; appC.onHostLost = () => lost = true; C.join(A.code, profB); for (let i = 0; i < 40 && C.status === 'connecting'; i++) await sleep(250); await sleep(500); A.close(); await sleep(1500);
check('client notices host leaving', lost && C.status === 'lost');
// bad code
const D = new Session(mkApp()); D.join('AAAAAA', profB); for (let i = 0; i < 80 && D.status === 'connecting'; i++) await sleep(250); check('wrong code gives clear error', D.status === 'error' && /No room|not reachable/.test(D.error), D.error);
fs.mkdirSync('tests/results', { recursive: true }); const pass = res.every(r => r.ok); fs.writeFileSync('tests/results/net_node.json', JSON.stringify({ date: new Date().toString(), transport: 'PeerJS cloud (0.peerjs.com) + real WebRTC data channels via @roamhq/wrtc', pass, res }, null, 1)); console.log(pass ? 'ALL PASS' : 'SOME FAILED'); process.exit(pass ? 0 : 1);
