// Touch (steering slider, drift, item, gas, brake, look-back), keyboard, gamepad and optional tilt.
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export class Input {
  constructor(root, settings) {
    this.s = settings; this.root = root; this.state = { steer: 0, throttle: 0, brake: 0, drift: false, driftPressed: false, itemDown: false, itemUp: false, look: false, gas: false };
    this.keys = new Set(); this.touch = { steer: 0, gas: false, brake: false, drift: false, look: false, item: false }; this.pad = { steer: 0, gas: false, brake: false, drift: false, look: false, item: false, start: false }; this.tilt = 0; this.prev = { drift: false, item: false }; this.active = false; this.slider = null; this.padPrev = {};
    this.buildTouch(); this.bindKeys(); this.bindTilt();
  }
  buildTouch() {
    const r = this.root; r.innerHTML = `
      <div class="tc-slider" id="tcSlider"><div class="tc-track"></div><div class="tc-thumb" id="tcThumb"></div><div class="tc-hint">STEER</div></div>
      <button class="tc-btn tc-drift" id="tcDrift"><span>DRIFT</span></button>
      <button class="tc-btn tc-item" id="tcItem"><span>ITEM</span></button>
      <button class="tc-btn tc-gas" id="tcGas"><span>GAS</span></button>
      <button class="tc-btn tc-brake" id="tcBrake"><span>BRAKE</span></button>
      <button class="tc-btn tc-look" id="tcLook"><span>BACK</span></button>`;
    const sl = r.querySelector('#tcSlider'), th = r.querySelector('#tcThumb'); let pid = null;
    const setFrom = (e) => { const b = sl.getBoundingClientRect(); const x = clamp((e.clientX - b.left) / b.width, 0, 1); const v = (x - 0.5) * 2; const dead = 0.04; this.touch.steer = Math.abs(v) < dead ? 0 : clamp((v - Math.sign(v) * dead) / (1 - dead) * (this.s.steerSens || 1.15), -1, 1); th.style.left = (x * 100) + '%'; };
    sl.addEventListener('pointerdown', e => { pid = e.pointerId; sl.setPointerCapture(pid); setFrom(e); sl.classList.add('on'); e.preventDefault(); });
    sl.addEventListener('pointermove', e => { if (e.pointerId === pid) { setFrom(e); e.preventDefault(); } });
    const end = e => { if (e.pointerId === pid) { pid = null; this.touch.steer = 0; th.style.left = '50%'; sl.classList.remove('on'); } };
    sl.addEventListener('pointerup', end); sl.addEventListener('pointercancel', end); sl.addEventListener('lostpointercapture', end);
    const bind = (id, key) => { const el = r.querySelector(id); const on = e => { this.touch[key] = true; el.classList.add('on'); e.preventDefault(); try { el.setPointerCapture(e.pointerId); } catch (x) { } }; const off = e => { this.touch[key] = false; el.classList.remove('on'); e.preventDefault(); }; el.addEventListener('pointerdown', on); el.addEventListener('pointerup', off); el.addEventListener('pointercancel', off); el.addEventListener('lostpointercapture', off); el.addEventListener('contextmenu', e => e.preventDefault()); };
    bind('#tcDrift', 'drift'); bind('#tcItem', 'item'); bind('#tcGas', 'gas'); bind('#tcBrake', 'brake'); bind('#tcLook', 'look');
    this.elItem = r.querySelector('#tcItem');
  }
  bindKeys() {
    const map = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'gas', KeyW: 'gas', ArrowDown: 'brake', KeyS: 'brake', Space: 'drift', ShiftLeft: 'drift', ShiftRight: 'drift', KeyE: 'item', KeyQ: 'item', KeyC: 'look', KeyB: 'look' };
    addEventListener('keydown', e => { const m = map[e.code]; if (m) { this.keys.add(m); if (this.active) e.preventDefault(); } if (e.code === 'Escape' || e.code === 'KeyP') this.onPause && this.onPause(); });
    addEventListener('keyup', e => { const m = map[e.code]; if (m) this.keys.delete(m); });
    addEventListener('blur', () => this.keys.clear());
  }
  bindTilt() { this.tiltOn = false; this._to = (e) => { if (e.gamma === null) return; const land = (screen.orientation && screen.orientation.type || '').startsWith('landscape'); let g = land ? (screen.orientation.angle === 270 ? -e.beta : e.beta) : e.gamma; this.tilt = clamp(g / 28, -1, 1); }; }
  async enableTilt(on) {
    if (on) { try { if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) { const r = await DeviceOrientationEvent.requestPermission(); if (r !== 'granted') return false; } addEventListener('deviceorientation', this._to); this.tiltOn = true; return true; } catch (e) { return false; } }
    removeEventListener('deviceorientation', this._to); this.tiltOn = false; this.tilt = 0; return true;
  }
  pollPad() {
    const gps = navigator.getGamepads ? navigator.getGamepads() : []; let g = null; for (const p of gps) if (p && p.connected) { g = p; break; } this.padConnected = !!g; const P = this.pad; if (!g) { P.steer = 0; P.gas = P.brake = P.drift = P.look = P.item = false; return; }
    const ax = g.axes[0] || 0; P.steer = Math.abs(ax) < 0.12 ? 0 : clamp((ax - Math.sign(ax) * 0.12) / 0.88, -1, 1); const b = (i) => g.buttons[i] && (g.buttons[i].pressed || g.buttons[i].value > 0.5);
    P.gas = b(0) || b(7) || (g.buttons[7] && g.buttons[7].value > 0.2); P.brake = b(1) && !b(5) ? true : b(6); P.drift = b(5) || b(1) && false || b(4) && false || b(2); P.item = b(3) || b(4) || b(2) && false; P.look = b(10) || b(11); if (g.axes[1] > 0.7 && g.axes[3] > 0.7) P.look = true;
    const start = b(9); if (start && !this.padPrev.start && this.onPause) this.onPause(); this.padPrev.start = start; P.start = start;
    // d-pad steering
    if (b(14)) P.steer = -1; if (b(15)) P.steer = 1;
  }
  // called each frame: build race input
  poll(auto) {
    this.pollPad(); const k = this.keys, T = this.touch, P = this.pad, s = this.state;
    let steer = T.steer; if (k.has('left')) steer = -1; if (k.has('right')) steer = 1; if (Math.abs(P.steer) > Math.abs(steer)) steer = P.steer; if (this.tiltOn && Math.abs(this.tilt) > Math.abs(steer)) steer = this.tilt;
    s.steer = clamp(steer, -1, 1); const gasHeld = T.gas || k.has('gas') || P.gas; s.gas = gasHeld; s.throttle = gasHeld || (auto && this.autoOn) ? 1 : 0; s.brake = (T.brake || k.has('brake') || P.brake) ? 1 : 0; if (s.brake) s.throttle = 0;
    const drift = T.drift || k.has('drift') || P.drift; if (drift && !this.prev.drift) s.driftPressed = true; s.drift = drift; this.prev.drift = drift;
    const item = T.item || k.has('item') || P.item; if (item && !this.prev.item) s.itemDown = true; if (!item && this.prev.item) s.itemUp = true; this.prev.item = item; s.look = T.look || k.has('look') || P.look;
    return s;
  }
  reset() { this.state.itemDown = this.state.itemUp = this.state.driftPressed = false; this.prev.drift = this.prev.item = false; }
}
