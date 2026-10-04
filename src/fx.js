// GPU-point particle pools (additive + normal) with per-particle size/colour/alpha.
import * as THREE from 'three';
const VS = `attribute float size; attribute vec4 pcolor; varying vec4 vC; uniform float scale; void main(){ vC=pcolor; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=size*scale/(-mv.z); gl_Position=projectionMatrix*mv; }`;
const FS = `varying vec4 vC; void main(){ vec2 d=gl_PointCoord-0.5; float r=length(d)*2.0; if(r>1.0) discard; float a=smoothstep(1.0,0.2,r); gl_FragColor=vec4(vC.rgb, vC.a*a); }`;
class Pool {
  constructor(scene, n, additive) {
    this.n = n; this.pos = new Float32Array(n * 3); this.col = new Float32Array(n * 4); this.size = new Float32Array(n); this.vel = new Float32Array(n * 3); this.life = new Float32Array(n); this.age = new Float32Array(n); this.s0 = new Float32Array(n); this.s1 = new Float32Array(n); this.c0 = new Float32Array(n * 4); this.c1 = new Float32Array(n * 4); this.grav = new Float32Array(n); this.drag = new Float32Array(n); this.head = 0;
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage)); g.setAttribute('pcolor', new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage)); g.setAttribute('size', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    this.mat = new THREE.ShaderMaterial({ vertexShader: VS, fragmentShader: FS, transparent: true, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending, uniforms: { scale: { value: 600 } } });
    this.pts = new THREE.Points(g, this.mat); this.pts.frustumCulled = false; this.pts.renderOrder = 5; scene.add(this.pts); this.g = g;
    for (let i = 0; i < n; i++) { this.life[i] = 0; this.size[i] = 0; }
  }
  emit(x, y, z, vx, vy, vz, life, s0, s1, c0, c1, grav = 0, drag = 0) {
    const i = this.head; this.head = (this.head + 1) % this.n; const p = i * 3, c = i * 4; this.pos[p] = x; this.pos[p + 1] = y; this.pos[p + 2] = z; this.vel[p] = vx; this.vel[p + 1] = vy; this.vel[p + 2] = vz; this.life[i] = life; this.age[i] = 0; this.s0[i] = s0; this.s1[i] = s1; this.grav[i] = grav; this.drag[i] = drag;
    for (let k = 0; k < 4; k++) { this.c0[c + k] = c0[k]; this.c1[c + k] = c1[k]; this.col[c + k] = c0[k]; } this.size[i] = s0;
  }
  update(dt) {
    for (let i = 0; i < this.n; i++) {
      if (this.life[i] <= 0) { this.size[i] = 0; continue; } this.age[i] += dt; const t = this.age[i] / this.life[i]; if (t >= 1) { this.life[i] = 0; this.size[i] = 0; continue; }
      const p = i * 3, c = i * 4; const d = Math.max(0, 1 - this.drag[i] * dt); this.vel[p] *= d; this.vel[p + 1] = this.vel[p + 1] * d - this.grav[i] * dt; this.vel[p + 2] *= d; this.pos[p] += this.vel[p] * dt; this.pos[p + 1] += this.vel[p + 1] * dt; this.pos[p + 2] += this.vel[p + 2] * dt; if (this.pos[p + 1] < 0.05 && this.grav[i] > 0) { this.pos[p + 1] = 0.05; this.vel[p + 1] *= -0.3; }
      this.size[i] = this.s0[i] + (this.s1[i] - this.s0[i]) * t; for (let k = 0; k < 4; k++) this.col[c + k] = this.c0[c + k] + (this.c1[c + k] - this.c0[c + k]) * t;
    }
    this.g.attributes.position.needsUpdate = true; this.g.attributes.pcolor.needsUpdate = true; this.g.attributes.size.needsUpdate = true;
  }
}
const rgba = (hex, a = 1) => [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255, a];
export class FX {
  constructor(scene, quality = 1) { this.add = new Pool(scene, Math.round(1400 * quality), true); this.nor = new Pool(scene, Math.round(900 * quality), false); this.q = quality; this.rgba = rgba; }
  setScale(h) { this.add.mat.uniforms.scale.value = h * 0.9; this.nor.mat.uniforms.scale.value = h * 0.9; }
  spark(x, y, z, tier, vx, vz) { const cols = [0xfff2c0, 0x4db8ff, 0xff9a2e, 0xc16bff]; const c = cols[tier]; for (let i = 0; i < (this.q < 0.7 ? 1 : 2); i++) this.add.emit(x, y, z, vx * 0.15 + (Math.random() - 0.5) * 4, 2 + Math.random() * 3, vz * 0.15 + (Math.random() - 0.5) * 4, 0.35 + Math.random() * 0.2, 0.55, 0.1, rgba(c, 1), rgba(c, 0), 14, 1); }
  flame(x, y, z, vx, vz, color) { this.add.emit(x, y, z, vx * 0.6 + (Math.random() - 0.5), 0.2 + Math.random() * 0.6, vz * 0.6 + (Math.random() - 0.5), 0.28 + Math.random() * 0.12, 1.0, 0.15, rgba(color, 0.9), rgba(0xffffff, 0), 0, 1.5); }
  dust(x, z, vx, vz, color, big = 1) { this.nor.emit(x, 0.15, z, (Math.random() - 0.5) * 2 + vx * 0.1, 0.8 + Math.random() * 0.8, (Math.random() - 0.5) * 2 + vz * 0.1, 0.7 + Math.random() * 0.4, 0.8 * big, 2.8 * big, rgba(color, 0.55), rgba(color, 0), 0, 1.2); }
  burst(x, y, z, color, n = 16, spd = 8) { for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, e = Math.random() * 1.2; this.add.emit(x, y, z, Math.cos(a) * spd * (0.4 + Math.random()), 2 + Math.random() * spd * 0.5, Math.sin(a) * spd * (0.4 + Math.random()), 0.5 + Math.random() * 0.4, 0.9, 0.1, rgba(color, 1), rgba(color, 0), 10, 1.5); } }
  ring(x, y, z, color) { for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2; this.add.emit(x, y, z, Math.cos(a) * 9, 0.3, Math.sin(a) * 9, 0.5, 0.8, 0.1, rgba(color, 1), rgba(color, 0), 0, 3); } }
  update(dt) { this.add.update(dt); this.nor.update(dt); }
  dispose(scene) { scene.remove(this.add.pts); scene.remove(this.nor.pts); this.add.g.dispose(); this.nor.g.dispose(); }
}
export { rgba };
