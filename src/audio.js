// Sparkdrift GP audio engine: mixer buses, ducking, master limiter, RPM-layered engines, loops, dynamic stem music, announcer + barks.
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const CHAR_VOICE = { 'Pip Thistledown': 'pip', 'Fennel Vix': 'fennel', 'Juniper Wren': 'juniper', 'Pearl Quayside': 'pearl', 'Bramble Quill': 'bramble', 'Clover Dash': 'clover', 'Captain Dusk Marlowe': 'dusk', 'Sage Willowmere': 'sage', 'Marigold Hoofsworth': 'marigold', 'Hobb Mossback': 'hobb', 'Barnaby Bruin': 'barnaby', 'Gus Gantry': 'gus', 'Flurry Skye': 'juniper', 'Nova Starling': 'pip', 'Lulu Lollipop': 'clover', 'Pyra Ashgrove': 'fennel', 'Zorp Blip': 'bramble', 'Cogsworth Whirr': 'gus', 'Coral Calloway': 'pearl', 'Zahra Sandglass': 'sage', 'Grumbald the Yeti': 'hobb', 'Nanuk Snowdrift': 'barnaby', 'Scarab Sol': 'marigold', 'Big Top Boris': 'dusk' };
const PRIORITY = { three: 5, two: 5, one: 5, go: 6, final_lap: 4, race_complete: 6, you_win: 6, better_luck: 6, wrong_way: 3, lead: 2, great_drift: 1, shortcut: 1, perfect_start: 3, rocket_incoming: 4, storm_incoming: 4, record: 4 };
export class AudioEngine {
  constructor(opts = {}) {
    this.base = opts.base || 'audio/'; this.hqBase = opts.hqBase || null; this.hq = false; this.ctx = null; this.buffers = new Map(); this.pending = new Map(); this.vol = { master: 1, sfx: 1, music: 0.8, voice: 1, engine: 1 };
    this.ready = false; this.lastPlay = new Map(); this.voices = 0; this.listener = { x: 0, z: 0, h: 0 }; this.musicState = null; this.annBusyUntil = 0; this.barkAt = new Map(); this.loopsActive = []; this.stats = { decoded: 0, bytes: 0, failed: [] }; this.hqPacks = {}; this.loadingCount = 0;
  }
  get time() { return this.ctx ? this.ctx.currentTime : 0; }
  // Must be called from a user gesture on iOS
  async unlock() {
    if (!this.ctx) this._build(); if (this.ctx.state !== 'running') { try { await this.ctx.resume(); } catch (e) { } }
    if (!this._unlocked) { this._unlocked = true; const b = this.ctx.createBuffer(1, 1, 22050); const s = this.ctx.createBufferSource(); s.buffer = b; s.connect(this.ctx.destination); s.start(0); }
    return this.ctx.state;
  }
  _build() {
    const AC = window.AudioContext || window.webkitAudioContext; let ctx; try { ctx = new AC({ latencyHint: 'interactive', sampleRate: this.hq ? 48000 : 32000 }); } catch (e) { ctx = new AC({ latencyHint: 'interactive' }); } this.ctx = ctx; const g = (v = 1) => { const n = ctx.createGain(); n.gain.value = v; return n; };
    // buses -> mix -> glue compressor -> limiter -> master
    this.bus = { sfx: g(1), engine: g(0.9), music: g(0.8), voice: g(1), amb: g(0.7), ui: g(0.9) }; this.duck = g(1); this.musicFilter = ctx.createBiquadFilter(); this.musicFilter.type = 'lowpass'; this.musicFilter.frequency.value = 20000; this.musicFilter.Q.value = 0.7;
    this.mix = g(0.46); this.glue = ctx.createDynamicsCompressor(); this.glue.threshold.value = -16; this.glue.knee.value = 14; this.glue.ratio.value = 2.5; this.glue.attack.value = 0.012; this.glue.release.value = 0.22;
    this.limiter = ctx.createDynamicsCompressor(); this.limiter.threshold.value = -5; this.limiter.knee.value = 0; this.limiter.ratio.value = 20; this.limiter.attack.value = 0.002; this.limiter.release.value = 0.09;
    this.masterGain = g(this.vol.master); this.analyser = ctx.createAnalyser(); this.analyser.fftSize = 2048;
    this.bus.music.connect(this.musicFilter); this.musicFilter.connect(this.duck); this.duck.connect(this.mix);
    for (const k of ['sfx', 'engine', 'voice', 'amb', 'ui']) this.bus[k].connect(this.mix);
    this.mix.connect(this.glue); this.glue.connect(this.limiter); this.clip = ctx.createWaveShaper(); { const n = 2048, c = new Float32Array(n); for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1, a = Math.abs(x); c[i] = Math.sign(x) * (a < 0.6 ? a : 0.6 + 0.34 * Math.tanh((a - 0.6) / 0.34)); } this.clip.curve = c; this.clip.oversample = '2x'; } this.limiter.connect(this.clip); this.clip.connect(this.masterGain); this.masterGain.connect(ctx.destination); this.masterGain.connect(this.analyser);
    // reverb send (procedural IR, retuned per track)
    this.reverb = ctx.createConvolver(); this.revSend = g(0.0); this.revReturn = g(0.5); this.bus.sfx.connect(this.revSend); this.bus.voice.connect(this.revSend); this.revSend.connect(this.reverb); this.reverb.connect(this.revReturn); this.revReturn.connect(this.mix); this.setReverb('meadow');
    this.dest = null; this.ready = true;
  }
  setReverb(theme) {
    const p = { meadow: [0.7, 3500, 0.12], harbor: [1.4, 4500, 0.2], mesa: [2.4, 2600, 0.28], frost: [1.9, 6500, 0.22], menu: [1.1, 5000, 0.14] }[theme] || [1, 4000, 0.15]; const ctx = this.ctx; const len = Math.floor(ctx.sampleRate * p[0]); const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); let lp = 0; const a = Math.exp(-2 * Math.PI * p[1] / ctx.sampleRate); for (let i = 0; i < len; i++) { const t = i / len; const n = (Math.random() * 2 - 1) * Math.pow(1 - t, 3.2); lp = lp * a + n * (1 - a); d[i] = lp * 3.2 * (i < 400 ? i / 400 : 1); } }
    this.reverb.buffer = ir; this.revSend.gain.value = p[2];
  }
  captureStream() { if (!this.dest) { this.dest = this.ctx.createMediaStreamDestination(); this.masterGain.connect(this.dest); } return this.dest.stream; }
  setVolumes(v) { Object.assign(this.vol, v); if (!this.ctx) return; this.masterGain.gain.setTargetAtTime(this.vol.master, this.time, 0.05); this.bus.sfx.gain.setTargetAtTime(this.vol.sfx, this.time, 0.05); this.bus.ui.gain.setTargetAtTime(0.9 * this.vol.sfx, this.time, 0.05); this.bus.amb.gain.setTargetAtTime(0.7 * this.vol.sfx, this.time, 0.05); this.bus.engine.gain.setTargetAtTime(0.9 * (this.vol.engine ?? 1), this.time, 0.05); this.bus.music.gain.setTargetAtTime(this.vol.music, this.time, 0.05); this.bus.voice.gain.setTargetAtTime(this.vol.voice, this.time, 0.05); }
  // ---------------------------------------------------------------- loading
  async _fetchBuf(url) {
    let res; try { res = await fetch(url, { cache: 'force-cache' }); } catch (e) { return null; } if (!res.ok) return null; const ab = await res.arrayBuffer(); this.stats.bytes += ab.byteLength; return ab;
  }
  async _hqFetch(url) { // Cache API for the big packs
    try { if ('caches' in window) { const c = await caches.open('sdgp-hq-v1'); let r = await c.match(url); if (!r) { r = await fetch(url, { mode: 'cors' }); if (!r.ok) return null; await c.put(url, r.clone()); } const ab = await r.arrayBuffer(); this.stats.bytes += ab.byteLength; return ab; } } catch (e) { }
    return this._fetchBuf(url);
  }
  async load(path, hqPath) { // returns AudioBuffer or null
    const key = (this.hq && hqPath ? 'H:' + hqPath : path); if (this.buffers.has(key)) return this.buffers.get(key); if (this.pending.has(key)) return this.pending.get(key);
    const job = (async () => {
      this.loadingCount++; let buf = null;
      try {
        let ab = null; if (this.hq && hqPath && this.hqBase) ab = await this._hqFetch(this.hqBase(hqPath));
        if (!ab) ab = await this._fetchBuf(this.base + path); if (ab) { buf = await new Promise((res, rej) => { const p = this.ctx.decodeAudioData(ab, res, rej); if (p && p.catch) p.catch(rej); }); this.stats.decoded++; }
      } catch (e) { this.stats.failed.push(path + ': ' + (e && e.message)); }
      this.loadingCount--; if (buf) this.buffers.set(key, buf); this.pending.delete(key); return buf;
    })(); this.pending.set(key, job); return job;
  }
  async loadManifest() { const r = await fetch(this.base + 'sfx/manifest.json'); this.sfxMan = await r.json(); const e = await fetch(this.base + 'engine/manifest.json'); this.engMan = await e.json(); const v = await fetch(this.base + 'voice/manifest.json'); this.voiceMan = await v.json(); }
  sfxPath(n) { const m = this.sfxMan && this.sfxMan[n]; return m ? ['sfx/' + m.file, 'sfx/' + m.file.replace('.wav', '.flac')] : null; }
  async preloadSfx(names) { const jobs = names.map(n => { const p = this.sfxPath(n); return p ? this.load(p[0], p[1]) : null; }); await Promise.all(jobs); }
  async preloadVoices(chars, keys) { const jobs = []; for (const c of chars) for (const k of keys) jobs.push(this.load(`voice/${c}/${k}.wav`, `voice/${c}/${k}.flac`)); await Promise.all(jobs); }
  async preloadAnnouncer(keys) { await Promise.all(keys.map(k => this.load(`voice/announcer/${k}.wav`, `voice/announcer/${k}.flac`))); }
  async preloadEngines(classes) { const jobs = []; for (const c of classes) for (let i = 0; i < 6; i++) jobs.push(this.load(`engine/${c}_${i}.wav`, `engine/${c}_${i}.flac`)); await Promise.all(jobs); }
  // ---------------------------------------------------------------- one shots
  _panner(pan) { const p = this.ctx.createStereoPanner(); p.pan.value = clamp(pan, -1, 1); return p; }
  play(name, o = {}) {
    if (!this.ready) return null; const p = this.sfxPath(name); if (!p) return null; const key = this.hq ? 'H:' + p[1] : p[0]; const buf = this.buffers.get(key) || this.buffers.get(p[0]); if (!buf) { this.load(p[0], p[1]); return null; }
    const now = this.time; const min = o.min ?? 0.035; const last = this.lastPlay.get(name) || -9; if (now - last < min) return null; if (this.voices > 52) return null; this.lastPlay.set(name, now);
    return this._src(buf, o, this.bus[o.bus || 'sfx'], this.sfxMan[name] && this.sfxMan[name].loop);
  }
  _src(buf, o, bus, loop = false) {
    const ctx = this.ctx; const s = ctx.createBufferSource(); s.buffer = buf; const rate = (o.rate || 1) * (o.rand ? 1 + (Math.random() - 0.5) * o.rand : 1); s.playbackRate.value = rate; if (loop || o.loop) s.loop = true; const g = ctx.createGain(); g.gain.value = o.vol ?? 1; let node = s; node.connect(g); node = g;
    if (o.pan !== undefined && o.pan !== 0) { const p = this._panner(o.pan); node.connect(p); node = p; } if (o.lp) { const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = o.lp; node.connect(f); node = f; }
    node.connect(bus); this.voices++; s.onended = () => { this.voices--; try { g.disconnect(); } catch (e) { } }; s.start(ctx.currentTime + (o.delay || 0), o.offset || 0);
    return { src: s, gain: g, stop: (fade = 0.05) => { try { g.gain.setTargetAtTime(0, ctx.currentTime, fade / 3); s.stop(ctx.currentTime + fade + 0.05); } catch (e) { } }, setVol: (v, t = 0.05) => g.gain.setTargetAtTime(v, ctx.currentTime, t), setRate: (r, t = 0.05) => s.playbackRate.setTargetAtTime(r, ctx.currentTime, t) };
  }
  at(name, x, z, o = {}) { // spatial one shot relative to the listener
    const L = this.listener; const dx = x - L.x, dz = z - L.z; const d = Math.hypot(dx, dz); const rx = -Math.cos(L.h), rz = Math.sin(L.h); // right vector for heading h (forward = sin h, cos h)
    const pan = d > 0.5 ? (dx * rx + dz * rz) / d : 0; const vol = (o.vol ?? 1) / (1 + d / (o.ref || 14)); if (vol < 0.02) return null; return this.play(name, { ...o, vol, pan: pan * 0.85, lp: d > 40 ? Math.max(1500, 12000 - d * 60) : undefined });
  }
  // persistent loop with handle (starts silent; use setVol)
  loop(name, o = {}) {
    if (!this.ready) return null; const p = this.sfxPath(name); const buf = p && (this.buffers.get(this.hq ? 'H:' + p[1] : p[0]) || this.buffers.get(p[0])); if (!buf) { if (p) this.load(p[0], p[1]); return null; }
    const h = this._src(buf, { vol: o.vol ?? 0, rate: o.rate || 1, loop: true, pan: o.pan }, this.bus[o.bus || 'sfx'], true); if (h) { h.src.onended = null; this.loopsActive.push(h); } return h;
  }
  stopAllLoops() { for (const h of this.loopsActive) h.stop(0.1); this.loopsActive = []; }
  // ---------------------------------------------------------------- engines
  createEngine(cls, o = {}) {
    if (!this.ready) return null; const c = cls.toLowerCase(); const ctx = this.ctx; const layers = []; const fund = []; for (let i = 0; i < 6; i++) { const buf = this.buffers.get(`engine/${c}_${i}.wav`) || this.buffers.get('H:' + `engine/${c}_${i}.flac`); if (!buf) return null; fund.push(this.engMan[`${c}_${i}`].fund); layers.push(buf); }
    const out = ctx.createGain(); out.gain.value = o.vol ?? 1; const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 6000; lp.Q.value = 0.6; lp.connect(out); let node = out; let pan = null; if (o.spatial) { pan = this._panner(0); out.connect(pan); node = pan; } node.connect(this.bus.engine);
    const srcs = layers.map((b, i) => { const s = ctx.createBufferSource(); s.buffer = b; s.loop = true; s.loopStart = 0; s.loopEnd = b.duration; const g = ctx.createGain(); g.gain.value = 0; s.connect(g); g.connect(lp); s.start(ctx.currentTime, Math.random() * b.duration * 0.9); return { s, g }; });
    const fMin = fund[0] * 0.9, fMax = fund[5] * 1.05; const E = { out, lp, srcs, fund, pan, cls: c, rpm: 0.2, gear: 0, dead: false, mutedUntil: 0, shiftT: 0 };
    E.update = (rpm, throttle, boost, vol = 1) => {
      const t = ctx.currentTime; const f = fMin * Math.pow(fMax / fMin, clamp(rpm, 0, 1)); let sumW = 0; const w = [];
      for (let i = 0; i < 6; i++) { const d = Math.abs(Math.log2(f / fund[i])); const wi = Math.max(0, 1 - d / 1.05); w.push(wi); sumW += wi; }
      if (sumW < 0.01) sumW = 1; const load = 0.5 + 0.5 * throttle;
      for (let i = 0; i < 6; i++) { const gi = (w[i] / sumW); const amp = Math.sqrt(gi) * 0.55 * load * (1 + 0.25 * boost); srcs[i].g.gain.setTargetAtTime(amp * vol, t, 0.04); srcs[i].s.playbackRate.setTargetAtTime(clamp(f / fund[i], 0.55, 2.0), t, 0.03); }
      lp.frequency.setTargetAtTime(1800 + 7500 * (0.25 + 0.75 * throttle) * (0.5 + 0.5 * rpm) + boost * 3000, t, 0.06);
    };
    E.setPan = (p) => { if (pan) pan.pan.setTargetAtTime(clamp(p, -1, 1), ctx.currentTime, 0.05); }; E.setVol = (v) => out.gain.setTargetAtTime(v, ctx.currentTime, 0.05);
    E.stop = () => { if (E.dead) return; E.dead = true; out.gain.setTargetAtTime(0, ctx.currentTime, 0.04); setTimeout(() => { srcs.forEach(x => { try { x.s.stop(); } catch (e) { } }); try { out.disconnect(); } catch (e) { } }, 300); };
    return E;
  }
  // ---------------------------------------------------------------- ambience
  async startAmbience(key) {
    if (!this.ready) return; this.stopAmbience(); const b = await this.load(`amb/${key}.wav`, `amb/${key}.flac`); if (!b) return; const h = this._src(b, { vol: 0, loop: true }, this.bus.amb, true); h.src.onended = null; h.setVol(0.9, 1.0); this.amb = h;
  }
  stopAmbience() { if (this.amb) { this.amb.stop(0.8); this.amb = null; } }
  // ---------------------------------------------------------------- music (6 stems, sample-aligned)
  async loadMusic(piece) {
    const stems = ['drums', 'bass', 'chords', 'lead', 'counter', 'fx']; const meta = await (await fetch(this.base + `music/${piece}/meta.json`)).json();
    if (this.musicMeta && this.musicMeta.piece !== piece) { this.stopMusic(0.1); this.musicBufs = null; this.musicMeta = null; for (const k of [...this.buffers.keys()]) if (/(^|:)music\//.test(k) && !k.includes('music/' + piece + '/')) this.buffers.delete(k); } // free the previous piece (stems are big once decoded)
    const bufs = await Promise.all(stems.map(s => this.load(`music/${piece}/${s}.m4a`, `music/${piece}/${s}.flac`))); if (bufs.some(b => !b)) { this.stats.failed.push('music ' + piece); return false; } this.musicMeta = { ...meta, piece }; this.musicBufs = bufs; return true;
  }
  startMusic(piece, state = 'menu', base = 1) {
    if (!this.ready || !this.musicBufs) return; this.stopMusic(0.3); const ctx = this.ctx; const t0 = ctx.currentTime + 0.06; const names = ['drums', 'bass', 'chords', 'lead', 'counter', 'fx']; const stems = {}; const mg = ctx.createGain(); mg.gain.value = 1; mg.connect(this.bus.music);
    const dur = Math.min(...this.musicBufs.map(b => b.duration));
    this.musicBufs.forEach((b, i) => { const s = ctx.createBufferSource(); s.buffer = b; s.loop = true; s.loopStart = 0; s.loopEnd = dur; const g = ctx.createGain(); g.gain.value = 0; s.connect(g); g.connect(mg); s.start(t0); stems[names[i]] = { s, g }; });
    this.music = { piece, stems, mg, t0, rate: base, base, dur, state: null }; if (base !== 1) for (const k in stems) stems[k].s.playbackRate.value = base; this.setMusicState(state, true);
  }
  stopMusic(fade = 1.0) { const m = this.music; if (!m) return; this.music = null; m.mg.gain.setTargetAtTime(0, this.time, fade / 3); setTimeout(() => { for (const k in m.stems) { try { m.stems[k].s.stop(); } catch (e) { } } try { m.mg.disconnect(); } catch (e) { } }, fade * 1000 + 200); }
  // state: 'menu' | 'grid' | 'race' | 'results' ; opts: pos (1..n), n, finalLap, boosting, star, hit
  setMusicState(state, instant = false, o = {}) {
    const m = this.music; if (!m) return; m.state = state; const t = this.time; const tc = instant ? 0.001 : 0.5; const target = { drums: 0, bass: 0, chords: 0, lead: 0, counter: 0, fx: 0 }; const pos = o.pos || 6, n = o.n || 12;
    if (state === 'menu') { Object.assign(target, { drums: 0.5, bass: 0.9, chords: 1, lead: 0.75, counter: 0.0, fx: 0.4 }); }
    else if (state === 'grid') { Object.assign(target, { drums: 0.0, bass: 0.0, chords: 0.9, lead: 0.0, counter: 0, fx: 0.9 }); }
    else if (state === 'race') { const lead = pos <= 2, back = pos > n * 0.6; Object.assign(target, { drums: 1, bass: 1, chords: 0.9, lead: lead ? 1 : 0.8, counter: back || o.finalLap ? 0.95 : (pos <= 4 ? 0.0 : 0.45), fx: o.finalLap ? 1 : (o.star ? 1 : 0.55) }); if (o.finalLap) { target.counter = 1; target.chords = 1; } }
    else if (state === 'results') { Object.assign(target, { drums: 0.0, bass: 0.7, chords: 1, lead: 1, counter: 0.0, fx: 0.3 }); }
    for (const k in target) m.stems[k].g.gain.setTargetAtTime(target[k] * (k === 'drums' ? 0.95 : 1), t, tc);
    const rate = (m.base || 1) * ((state === 'race' && o.finalLap) ? 1.06 : 1); if (Math.abs(rate - m.rate) > 0.001) { m.rate = rate; for (const k in m.stems) m.stems[k].s.playbackRate.setTargetAtTime(rate, t, 0.8); }
  }
  musicMuffle(sec = 1.2, amount = 900) { if (!this.ready) return; const f = this.musicFilter.frequency, t = this.time; f.cancelScheduledValues(t); f.setTargetAtTime(amount, t, 0.03); f.setTargetAtTime(20000, t + sec, 0.25); }
  musicDuckFor(sec, depth = 0.45) { if (!this.ready) return; const g = this.duck.gain, t = this.time; g.cancelScheduledValues(t); g.setTargetAtTime(depth, t, 0.04); g.setTargetAtTime(1, t + sec, 0.3); }
  // ---------------------------------------------------------------- voices
  announce(key, o = {}) {
    if (!this.ready) return false; const buf = this.buffers.get(`voice/announcer/${key}.wav`) || this.buffers.get(`H:voice/announcer/${key}.flac`); if (!buf) { this.load(`voice/announcer/${key}.wav`, `voice/announcer/${key}.flac`); return false; }
    const now = this.time; const pr = PRIORITY[key] ?? (key.startsWith('pos_') ? 1 : 1); if (now < this.annBusyUntil && pr < (this._annPr || 0) && !o.force) return false;
    if (this.curAnn && pr >= (this._annPr || 0) && now < this.annBusyUntil) this.curAnn.stop(0.05);
    const h = this._src(buf, { vol: 1.15, delay: o.delay || 0 }, this.bus.voice); this.curAnn = h; this._annPr = pr; this.annBusyUntil = now + buf.duration + (o.delay || 0); this.musicDuckFor(buf.duration + 0.1 + (o.delay || 0), 0.5); return true;
  }
  bark(who, key, o = {}) {
    if (!this.ready || !who) return false; const id = CHAR_VOICE[who] || who; const cd = o.cooldown ?? 6; const now = this.time; const last = this.barkAt.get(id + key) || -99; if (now - last < cd) return false; if (this.barkBusy && now < this.barkBusy) return false;
    const buf = this.buffers.get(`voice/${id}/${key}.wav`) || this.buffers.get(`H:voice/${id}/${key}.flac`); if (!buf) { this.load(`voice/${id}/${key}.wav`, `voice/${id}/${key}.flac`); return false; }
    this.barkAt.set(id + key, now); this.barkBusy = now + buf.duration * 0.8; this._src(buf, { vol: o.vol ?? 0.9, pan: o.pan, delay: o.delay || 0 }, this.bus.voice); return true;
  }
  // ---------------------------------------------------------------- listener / diagnostics
  setListener(x, z, h) { this.listener.x = x; this.listener.z = z; this.listener.h = h; }
  level() { if (!this.analyser) return 0; const a = new Float32Array(this.analyser.fftSize); this.analyser.getFloatTimeDomainData(a); let s = 0; for (const v of a) s += v * v; return Math.sqrt(s / a.length); }
}
