// TEST-ONLY stand-in for PeerJS (same API subset) that routes through BroadcastChannel between tabs.
// Used only because headless Chrome on the build box cannot gather WebRTC ICE candidates. NOT shipped (never imported by the production bundle).
const bc = { postMessage(m) { if (window.__shimSend) window.__shimSend(m); else bch.postMessage(m); } }; const bch = new BroadcastChannel('peershim'); bch.onmessage = (e) => onmsg(e); window.__shimRecv = (m) => onmsg({ data: m }); const peers = new Map(); let seq = 0;
class Emitter { constructor() { this._h = {}; } on(e, f) { (this._h[e] ||= []).push(f); return this; } emit(e, ...a) { (this._h[e] || []).forEach(f => f(...a)); } }
class Conn extends Emitter {
  constructor(peer, remoteId, cid) { super(); this.peer = peer; this.remote = remoteId; this.cid = cid; this.open = false; this.peerConnection = null; }
  send(d) { bc.postMessage({ k: 'data', to: this.remote, from: this.peer.id, cid: this.cid, d: JSON.parse(JSON.stringify(d)) }); }
  close() { if (!this.open) return; this.open = false; bc.postMessage({ k: 'close', to: this.remote, from: this.peer.id, cid: this.cid }); this.emit('close'); }
}
export class Peer extends Emitter {
  constructor(id, o) { super(); if (typeof id !== 'string') id = 'anon' + Math.random().toString(36).slice(2); this.id = id; this.conns = new Map(); this.open = false; this.destroyed = false; peers.set(id, this); setTimeout(() => { this.open = true; this.emit('open', this.id); }, 60); }
  connect(rid) { const cid = this.id + ':' + (++seq); const c = new Conn(this, rid, cid); this.conns.set(cid, c); bc.postMessage({ k: 'connect', to: rid, from: this.id, cid }); setTimeout(() => { if (!c.open) this.emit('error', { type: 'peer-unavailable' }); }, 8000); return c; }
  destroy() { for (const c of [...this.conns.values()]) c.close(); this.destroyed = true; peers.delete(this.id); }
  reconnect() { }
}
function onmsg(e) {
  const m = e.data; const p = peers.get(m.to); if (!p) return;
  if (m.k === 'connect') { const c = new Conn(p, m.from, m.cid); p.conns.set(m.cid, c); c.open = true; bc.postMessage({ k: 'accept', to: m.from, from: p.id, cid: m.cid }); p.emit('connection', c); setTimeout(() => c.emit('open'), 0); }
  else if (m.k === 'accept') { const c = p.conns.get(m.cid); if (c) { c.open = true; c.emit('open'); } }
  else if (m.k === 'data') { const c = p.conns.get(m.cid); if (c) c.emit('data', m.d); }
  else if (m.k === 'close') { const c = p.conns.get(m.cid); if (c && c.open) { c.open = false; c.emit('close'); } }
};
export default Peer;