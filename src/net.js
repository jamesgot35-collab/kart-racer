// Sparkdrift GP online play: real WebRTC (PeerJS data channels) room-code lobbies.
// Topology: star. The host is the hub (relays snapshots), each client is authoritative for its own kart; the host also runs the CPU karts.
// Signalling: PeerJS public cloud broker (0.peerjs.com) + Google STUN. There is NO TURN server, so strict/symmetric NATs may fail to connect.
import * as PJ from 'peerjs';
const Peer = PJ.Peer || (PJ.default && (PJ.default.Peer || PJ.default));
import { AI } from './ai.js';
export const ALPHA = 'ACDEFHJKMNPRTUWXY347';
export const MAX_HUMANS = 4;
export function makeCode() { let s = ''; const a = new Uint32Array(6); crypto.getRandomValues(a); for (let i = 0; i < 6; i++) s += ALPHA[a[i] % ALPHA.length]; return s; }
export function normCode(s) { return (s || '').toUpperCase().split('').filter(c => ALPHA.includes(c)).join('').slice(0, 6); }
export const fmtCode = (c) => c.slice(0, 3) + ' ' + c.slice(3);
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const r3 = (v) => typeof v === 'number' ? Math.round(v * 1000) / 1000 : v;
const SIGNAL_TIMEOUT = 9000;

export class Session {
  constructor(app) {
    this.app = app; this.role = null; this.status = 'idle'; this.error = ''; this.code = ''; this.peer = null; this.members = []; this.conns = new Map(); this.hostConn = null;
    this.cfg = { track: 'meadow', laps: 3, items: true, cpu: true }; this.myPid = 0; this.onChange = () => { }; this.race = null; this.players = null; this.myId = 0; this.rnd = Math.random; this.profile = null; this.timer = null;
    this.link = { send: (t, d) => this.send(t, d) }; this.loadedSet = new Set(); this.goResolve = null; this.stats = { sent: 0, recv: 0, rtt: 0 }; this.starting = false; this.closed = false;
  }
  _change() { try { this.onChange(this); } catch (e) { console.warn(e); } }
  _fail(msg) { this.status = 'error'; this.error = msg; this._change(); }
  // ------------------------------------------------------------ host
  host(profile, tries = 0) {
    this.role = 'host'; this.profile = profile; this.status = 'connecting'; this.error = ''; this.code = makeCode(); this.myPid = 0; this._change();
    this.members = [{ pid: 0, name: profile.name, build: profile.build, ready: true }];
    let peer; try { peer = new Peer('sdgp-' + this.code, { debug: 0 }); } catch (e) { return this._fail('WebRTC unavailable: ' + e.message); }
    this.peer = peer; const to = setTimeout(() => { if (this.status === 'connecting') this._fail('Could not reach the PeerJS signalling server (timeout).'); }, SIGNAL_TIMEOUT);
    peer.on('open', () => { clearTimeout(to); this.status = 'open'; this._change(); });
    peer.on('error', (e) => { clearTimeout(to); if (e.type === 'unavailable-id' && tries < 5) { try { peer.destroy(); } catch (x) { } return this.host(profile, tries + 1); } if (this.status !== 'open') this._fail('Signalling error: ' + e.type); else console.warn('peer error', e.type); });
    peer.on('disconnected', () => { try { peer.reconnect(); } catch (e) { } });
    peer.on('connection', (conn) => {
      conn.on('open', () => { if (this.members.length >= MAX_HUMANS || this.starting) { conn.send({ t: 'full' }); setTimeout(() => conn.close(), 300); return; } });
      conn.on('data', (m) => this._hostMsg(conn, m)); conn.on('close', () => this._hostDrop(conn)); conn.on('error', () => this._hostDrop(conn));
    });
  }
  _pidOf(conn) { for (const [pid, c] of this.conns) if (c === conn) return pid; return -1; }
  _hostMsg(conn, m) {
    this.stats.recv++;
    switch (m.t) {
      case 'hello': { if (this._pidOf(conn) >= 0) return; if (this.members.length >= MAX_HUMANS || this.starting) return; let pid = 1; while (this.members.some(x => x.pid === pid)) pid++; this.conns.set(pid, conn); this.members.push({ pid, name: m.name, build: m.build, ready: false }); this.app.ui && this.app.ui('lobby_join'); this._lobbyBroadcast(); break; }
      case 'ready': { const pid = this._pidOf(conn), mem = this.members.find(x => x.pid === pid); if (mem) { mem.ready = !!m.v; this.app.ui && this.app.ui('lobby_ready'); this._lobbyBroadcast(); } break; }
      case 'profile': { const pid = this._pidOf(conn), mem = this.members.find(x => x.pid === pid); if (mem) { mem.name = m.name; mem.build = m.build; this._lobbyBroadcast(); } break; }
      case 'loaded': { this.loadedSet.add(this._pidOf(conn)); this._checkGo(); break; }
      case 'ping': conn.send({ t: 'pong', ts: m.ts }); break;
      case 'k': case 'use': case 'box': { const from = this._pidOf(conn); this._recvGame(m); for (const [pid, c] of this.conns) if (pid !== from && c.open) c.send(m); break; }
    }
  }
  _hostDrop(conn) {
    const pid = this._pidOf(conn); if (pid < 0) return; this.conns.delete(pid); this.members = this.members.filter(x => x.pid !== pid); this.app.ui && this.app.ui('lobby_leave');
    if (this.race) { const k = this.race.karts.find(q => q.id === pid); if (k && k.remote) { k.remote = false; k.auth = true; k.human = false; k.cpu = true; k.ai = new AI(k, this.race, 0.9); this.app.toast && this.app.toast(`${k.dispName || k.name} disconnected — CPU takes over`, '#ffd23f'); } this.loadedSet.delete(pid); this._checkGo(); }
    this._lobbyBroadcast();
  }
  _lobbyBroadcast() { this._change(); const msg = { t: 'lobby', members: this.members, cfg: this.cfg }; for (const [pid, c] of this.conns) if (c.open) c.send({ ...msg, you: pid }); }
  setCfg(p) { if (this.role !== 'host') return; Object.assign(this.cfg, p); this._lobbyBroadcast(); }
  // ------------------------------------------------------------ client
  join(code, profile) {
    this.role = 'client'; this.profile = profile; this.status = 'connecting'; this.error = ''; this.code = code; this._change();
    let peer; try { peer = new Peer({ debug: 0 }); } catch (e) { return this._fail('WebRTC unavailable: ' + e.message); }
    this.peer = peer; let opened = false;
    const to = setTimeout(() => { if (!opened) this._fail(this.peer && this.peer.open ? 'Room not reachable (NAT/firewall or wrong code).' : 'Could not reach the PeerJS signalling server (timeout).'); }, SIGNAL_TIMEOUT + 4000);
    peer.on('error', (e) => { clearTimeout(to); if (e.type === 'peer-unavailable') this._fail('No room with that code. Check the code and ask the host to keep the lobby open.'); else if (!opened) this._fail('Signalling error: ' + e.type); else console.warn('peer error', e.type); });
    peer.on('open', () => {
      const conn = peer.connect('sdgp-' + code, { reliable: true, serialization: 'json' }); this.hostConn = conn;
      conn.on('open', () => { opened = true; clearTimeout(to); this.status = 'open'; conn.send({ t: 'hello', name: profile.name, build: profile.build }); this._ping(); this._change(); });
      conn.on('data', (m) => this._clientMsg(m)); conn.on('close', () => this._hostLost()); conn.on('error', () => this._hostLost());
    });
  }
  _ping() { if (this.closed || !this.hostConn) return; if (this.hostConn.open) this.hostConn.send({ t: 'ping', ts: performance.now() }); setTimeout(() => this._ping(), 2000); }
  _hostLost() { if (this.closed || this.status === 'lost') return; this.status = 'lost'; this.error = 'The host left the room.'; this._change(); this.app.onHostLost && this.app.onHostLost(this); }
  _clientMsg(m) {
    this.stats.recv++;
    switch (m.t) {
      case 'lobby': { const first = !this.members.length; this.members = m.members; this.cfg = m.cfg; this.myPid = m.you; this._change(); if (first && this.app.ui) this.app.ui('lobby_join'); break; }
      case 'full': this._fail('That room is full (4 players max).'); break;
      case 'pong': this.stats.rtt = performance.now() - m.ts; break;
      case 'start': this._onStart(m); break;
      case 'go': if (this.goResolve) { this.goResolve(); this.goResolve = null; } break;
      case 'k': case 'use': case 'box': this._recvGame(m); break;
    }
  }
  // ------------------------------------------------------------ start / go
  hostStart(cpuBuild, cpuNames) {
    if (this.role !== 'host' || this.starting) return false; this.starting = true;
    const seed = (Math.random() * 2 ** 31) | 0; const humans = this.members.map(m => ({ id: m.pid, name: m.name, build: m.build, human: true })); const list = [];
    if (this.cfg.cpu) { let i = 0; const used = new Set(humans.map(h => h.name)); const pool = cpuNames.filter(n => !used.has(n)); while (humans.length + list.length < 12) { list.push({ id: 4 + list.length, name: pool[i % pool.length], build: cpuBuild(i + 3), human: false, cpu: true, skill: 0.84 + Math.random() * 0.15 }); i++; } }
    const players = [...list, ...humans];
    for (let i = players.length - 1; i > 0; i--) { /* keep humans at the back: no shuffle */ }
    const msg = { t: 'start', seed, cfg: this.cfg, players };
    this.loadedSet = new Set(); for (const [pid, c] of this.conns) if (c.open) c.send(msg);
    this._onStart(msg); return true;
  }
  _onStart(m) {
    this.starting = true; this.rnd = mulberry32(m.seed); this.myId = this.myPid; Object.assign(this.app.cfg, { track: m.cfg.track, laps: m.cfg.laps, items: m.cfg.items, mirror: false, reverse: false });
    this.players = m.players.map(p => p.id === this.myPid && p.human ? { ...p, local: true } : { ...p, remote: true });
    this.app.mode = 'versus'; this.goP = new Promise(r => { this.goResolve = r; }); this.app.startRace({ net: this });
  }
  loaded() { if (this.role === 'host') { this.loadedSet.add(0); this._checkGo(); if (!this._goTimer) this._goTimer = setTimeout(() => this._sendGo(), 30000); } else if (this.hostConn && this.hostConn.open) this.hostConn.send({ t: 'loaded' }); }
  _checkGo() { if (this.role !== 'host' || !this.players || this.goSent) return; const need = this.members.map(m => m.pid); if (need.every(p => this.loadedSet.has(p))) this._sendGo(); }
  _sendGo() { if (this.goSent) return; this.goSent = true; clearTimeout(this._goTimer); for (const [, c] of this.conns) if (c.open) c.send({ t: 'go' }); if (this.goResolve) { this.goResolve(); this.goResolve = null; } }
  // ------------------------------------------------------------ in-race
  attach(race) {
    this.race = race; clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (!this.race || this.race.state === 'finished' && false) return; const a = []; for (const k of this.race.karts) if (k.auth) { const s = this.race.snapshot(k); for (const key in s) s[key] = r3(s[key]); a.push({ id: k.id, s }); }
      if (a.length) this.send('k', { a });
    }, 50);
  }
  detach() { clearInterval(this.timer); this.timer = null; this.race = null; this.players = null; this.starting = false; this.goSent = false; this.loadedSet = new Set(); }
  send(t, d) { const m = { t, ...d }; this.stats.sent++; if (this.role === 'host') { for (const [, c] of this.conns) if (c.open) c.send(m); } else if (this.hostConn && this.hostConn.open) this.hostConn.send(m); }
  _recvGame(m) {
    const R = this.race; if (!R) return;
    if (m.t === 'k') { for (const e of m.a) R.applySnapshot(e.id, e.s); }
    else if (m.t === 'use') { const k = R.karts.find(q => q.id === m.k); if (k && k.remote) { k.item = { id: m.id, n: m.id === 'trio' ? 3 : 1 }; try { R.items.fire(k, m.id, { back: m.back, held: m.held }); } catch (e) { console.warn(e); } } }
    else if (m.t === 'box') { const b = R.view.boxes[m.i]; if (b && b.active) { b.active = false; b.respawn = 6; } }
  }
  ready(v) { if (this.role === 'client' && this.hostConn && this.hostConn.open) this.hostConn.send({ t: 'ready', v }); const me = this.members.find(x => x.pid === this.myPid); if (me) me.ready = v; this._change(); }
  sendProfile(p) { this.profile = p; if (this.role === 'client' && this.hostConn && this.hostConn.open) this.hostConn.send({ t: 'profile', ...p }); else if (this.role === 'host') { this.members[0].name = p.name; this.members[0].build = p.build; this._lobbyBroadcast(); } }
  close() { this.closed = true; this.detach(); try { if (this.hostConn) this.hostConn.close(); for (const [, c] of this.conns) c.close(); if (this.peer) this.peer.destroy(); } catch (e) { } this.status = 'idle'; this.conns.clear(); this.members = []; }
}
