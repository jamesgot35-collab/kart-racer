// Procedural karts, wheels, mods and characters. Everything is merged into few draw calls with vertex colours.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import DATA from './gamedata.json';

const G = {
  box: new RoundedBoxGeometry(1, 1, 1, 2, 0.18), sbox: new THREE.BoxGeometry(1, 1, 1), sph: new THREE.SphereGeometry(1, 20, 14), cyl: new THREE.CylinderGeometry(1, 1, 1, 18, 1),
  cone: new THREE.ConeGeometry(1, 1, 16, 1), tor: new THREE.TorusGeometry(1, 0.2, 8, 24), cap: new THREE.CapsuleGeometry(1, 1, 5, 12), plane: new THREE.PlaneGeometry(1, 1),
};
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _v = new THREE.Vector3(), _s = new THREE.Vector3(), _c = new THREE.Color();
export class Merger {
  constructor() { this.geos = []; }
  add(geo, o = {}) {
    const { p = [0, 0, 0], r = [0, 0, 0], s = [1, 1, 1], c = 0xffffff } = o;
    let g = geo.index ? geo.toNonIndexed() : geo.clone(); g.deleteAttribute('uv');
    _e.set(r[0], r[1], r[2]); _q.setFromEuler(_e); _v.set(p[0], p[1], p[2]); _s.set(s[0], s[1], s[2]); _m.compose(_v, _q, _s); g.applyMatrix4(_m);
    const n = g.attributes.position.count, arr = new Float32Array(n * 3); _c.set(c); for (let i = 0; i < n; i++) { arr[i * 3] = _c.r; arr[i * 3 + 1] = _c.g; arr[i * 3 + 2] = _c.b; }
    g.setAttribute('color', new THREE.BufferAttribute(arr, 3)); this.geos.push(g); return this;
  }
  build(mat) { if (!this.geos.length) return null; const g = mergeGeometries(this.geos, false); this.geos.forEach(x => x.dispose()); this.geos = []; g.computeBoundingSphere(); return new THREE.Mesh(g, mat); }
}
export function addRim(mat, color = 0xffffff, power = 2.6, strength = 0.55) {
  mat.userData.rim = { color, power, strength };
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.rimColor = { value: new THREE.Color(color) };
    sh.fragmentShader = sh.fragmentShader.replace('void main() {', 'uniform vec3 rimColor;\nvoid main() {').replace('#include <opaque_fragment>', `
      float rimF = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vViewPosition)), 0.0, 1.0), ${power.toFixed(2)});
      outgoingLight += rimColor * rimF * ${strength.toFixed(2)};
      #include <opaque_fragment>`);
  };
  return mat;
}
export const KART_HQ = { on: false };
const FINISH = { Gloss: { r: 0.22, m: 0.15, e: 1.0 }, Matte: { r: 0.85, m: 0.0, e: 0.4 }, Metallic: { r: 0.28, m: 0.85, e: 1.3 }, Pearl: { r: 0.3, m: 0.35, e: 1.4 }, Candy: { r: 0.14, m: 0.55, e: 1.2 } };
export function paintMaterial(hex, finish = 'Gloss') {
  const f = FINISH[finish] || FINISH.Gloss;
  if (KART_HQ.on) { // high-quality mode: clear-coated car paint + sparkle flakes on metallic finishes (reflects the HQ HDR sky)
    const m = new THREE.MeshPhysicalMaterial({ color: hex, roughness: f.r, metalness: f.m, envMapIntensity: f.e, clearcoat: finish === 'Matte' ? 0 : 1, clearcoatRoughness: 0.05 });
    if (finish === 'Pearl') { m.emissive = new THREE.Color(hex).multiplyScalar(0.08); m.sheen = 0.6; m.sheenColor = new THREE.Color(0xffffff); m.sheenRoughness = 0.4; }
    addRim(m, 0xcfe8ff, 2.4, 0.5); const flake = (finish === 'Metallic' || finish === 'Pearl' || finish === 'Candy') ? 0.09 : 0; if (flake) { const prev = m.onBeforeCompile; m.onBeforeCompile = (sh) => { prev(sh); sh.fragmentShader = sh.fragmentShader.replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
      { vec3 fp = floor(vViewPosition * 70.0); vec3 hh = fract(sin(vec3(dot(fp, vec3(127.1, 311.7, 74.7)), dot(fp, vec3(269.5, 183.3, 246.1)), dot(fp, vec3(113.5, 271.9, 124.6)))) * 43758.5453); normal = normalize(normal + (hh - 0.5) * ${flake.toFixed(3)}); }`); }; }
    return m;
  }
  const m = new THREE.MeshStandardMaterial({ color: hex, roughness: f.r, metalness: f.m, envMapIntensity: f.e });
  if (finish === 'Pearl') m.emissive = new THREE.Color(hex).multiplyScalar(0.08);
  return addRim(m, 0xcfe8ff, 2.4, 0.5);
}
let trimMatShared = null;
export function trimMaterial() { if (!trimMatShared) trimMatShared = addRim(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, metalness: 0.35, envMapIntensity: 0.9 }), 0xdff0ff, 2.6, 0.4); return trimMatShared; }
let softMatShared = null;
export function softMaterial() { if (!softMatShared) softMatShared = addRim(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.78, metalness: 0.0, envMapIntensity: 0.5 }), 0xffffff, 2.2, 0.35); return softMatShared; }
let wheelMatShared = null;
export function wheelMaterial() { if (!wheelMatShared) wheelMatShared = addRim(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.45, metalness: 0.45, envMapIntensity: 1.0 }), 0xdff0ff, 2.6, 0.35); return wheelMatShared; }
const lightMat = () => new THREE.MeshBasicMaterial({ vertexColors: true });

// ------------------------------------------------------------------ bodies
// Anchor data: wheel layout + where parts attach. y is up, +z forward.
export const BODY_SHAPES = {
  'Corsa Standard': { wx: 0.78, zf: 0.95, zr: -0.9, R: 0.36, seat: [0.62, -0.25], front: [0.46, 1.55], rear: [0.72, -1.25], ex: [0.5, -1.35] },
  'Needle': { wx: 0.7, zf: 1.15, zr: -1.0, R: 0.33, seat: [0.55, -0.35], front: [0.4, 2.2], rear: [0.9, -1.55], ex: [0.46, -1.7] },
  'Slidewinder': { wx: 0.82, zf: 0.95, zr: -0.9, R: 0.35, seat: [0.5, -0.25], front: [0.35, 1.75], rear: [0.62, -1.3], ex: [0.42, -1.4] },
  'Ironclad': { wx: 0.92, zf: 0.9, zr: -0.85, R: 0.44, seat: [0.88, -0.2], front: [0.55, 1.5], rear: [1.0, -1.25], ex: [0.9, -1.2] },
  'Pogo': { wx: 0.7, zf: 0.85, zr: -0.85, R: 0.34, seat: [0.82, -0.1], front: [0.5, 1.5], rear: [0.9, -1.3], ex: [0.5, -1.55] },
  'Pumpkin Coach': { wx: 0.88, zf: 0.9, zr: -0.85, R: 0.4, seat: [0.88, -0.2], front: [0.55, 1.45], rear: [1.15, -1.2], ex: [0.7, -1.3] },
  'Javelin': { wx: 0.72, zf: 1.1, zr: -0.95, R: 0.33, seat: [0.55, -0.3], front: [0.4, 2.0], rear: [0.88, -1.45], ex: [0.46, -1.6] },
  'Skiff': { wx: 0.85, zf: 0.95, zr: -0.9, R: 0.35, seat: [0.5, -0.25], front: [0.34, 1.7], rear: [0.62, -1.25], ex: [0.42, -1.4] },
  'Bulwark': { wx: 0.9, zf: 0.88, zr: -0.85, R: 0.43, seat: [0.92, -0.3], front: [0.55, 1.45], rear: [1.1, -1.2], ex: [0.85, -1.2] },
  'Sparkplug': { wx: 0.68, zf: 0.85, zr: -0.85, R: 0.34, seat: [0.8, -0.1], front: [0.5, 1.6], rear: [0.95, -1.3], ex: [0.5, -1.6] },
  'Teacup Twister': { wx: 0.82, zf: 0.8, zr: -0.8, R: 0.38, seat: [0.82, -0.05], front: [0.55, 1.1], rear: [1.1, -1.0], ex: [0.6, -1.1] },
  'Wayfarer': { wx: 0.8, zf: 0.95, zr: -0.9, R: 0.37, seat: [0.62, -0.2], front: [0.46, 1.5], rear: [0.78, -1.3], ex: [0.5, -1.35] },
};
const DARK = 0x1c2230, CHROME = 0xcfd6df, GLOW = 0xfff1b0;
function buildBodyParts(name, P, T, L) {
  const B = (g, o) => P.add(g, o), Tt = (g, o) => T.add(g, o);
  switch (name) {
    case 'Corsa Standard':
      B(G.box, { p: [0, 0.42, 0.05], s: [1.15, 0.3, 2.3] }); B(G.box, { p: [0, 0.4, 1.35], s: [0.8, 0.22, 0.9] }); B(G.cone, { p: [0, 0.4, 1.9], r: [Math.PI / 2, 0, 0], s: [0.3, 0.5, 0.2] });
      B(G.box, { p: [-0.68, 0.46, 0.15], s: [0.34, 0.3, 1.2] }); B(G.box, { p: [0.68, 0.46, 0.15], s: [0.34, 0.3, 1.2] }); B(G.box, { p: [0, 0.72, -0.85], s: [0.85, 0.5, 0.75] });
      Tt(G.box, { p: [0, 0.8, -0.38], s: [0.75, 0.55, 0.14], c: DARK }); Tt(G.cyl, { p: [0, 0.6, 0.35], r: [0.4, 0, 0], s: [0.07, 0.07, 0.07], c: DARK });
      for (const x of [-0.32, 0.32]) L.add(G.sph, { p: [x, 0.5, 1.82], s: [0.11, 0.11, 0.11], c: GLOW });
      Tt(G.cyl, { p: [0, 0.58, 0.55], r: [Math.PI / 2, 0, 0], s: [0.06, 0.5, 0.06], c: CHROME });
      break;
    case 'Needle':
      B(G.box, { p: [0, 0.38, 0], s: [0.78, 0.24, 2.9] }); B(G.cone, { p: [0, 0.38, 2.1], r: [Math.PI / 2, 0, 0], s: [0.28, 1.3, 0.2] });
      B(G.box, { p: [0, 0.78, -1.2], s: [0.07, 0.65, 0.9] }); B(G.box, { p: [-0.45, 0.4, -0.3], s: [0.2, 0.22, 1.4] }); B(G.box, { p: [0.45, 0.4, -0.3], s: [0.2, 0.22, 1.4] });
      Tt(G.sph, { p: [0, 0.62, -0.1], s: [0.32, 0.22, 0.55], c: DARK }); Tt(G.box, { p: [0, 0.72, -0.5], s: [0.5, 0.5, 0.1], c: DARK });
      for (const x of [-0.3, 0.3]) L.add(G.sph, { p: [x, 0.42, 1.2], s: [0.07, 0.07, 0.07], c: GLOW });
      break;
    case 'Slidewinder':
      B(G.box, { p: [0, 0.36, 0], s: [1.3, 0.22, 2.5] }); B(G.sph, { p: [0, 0.42, 1.5], s: [0.5, 0.28, 0.7] }); B(G.box, { p: [-0.72, 0.38, 0], s: [0.1, 0.24, 1.7] }); B(G.box, { p: [0.72, 0.38, 0], s: [0.1, 0.24, 1.7] });
      B(G.box, { p: [0, 0.6, -0.9], s: [0.8, 0.38, 0.9] }); for (let i = 0; i < 4; i++) Tt(G.tor, { p: [0, 0.6, -1.35 - i * 0.14], s: [0.18 - i * 0.02, 0.18 - i * 0.02, 0.18], c: CHROME });
      Tt(G.box, { p: [0, 0.68, -0.38], s: [0.7, 0.45, 0.12], c: DARK }); for (const x of [-0.22, 0.22]) { L.add(G.sph, { p: [x, 0.58, 1.72], s: [0.1, 0.07, 0.08], c: 0xffd23f }); }
      break;
    case 'Ironclad':
      B(G.box, { p: [0, 0.6, 0], s: [1.55, 0.55, 2.2] }); B(G.box, { p: [0, 0.62, 1.2], s: [1.55, 0.6, 0.28], r: [-0.15, 0, 0] }); B(G.box, { p: [-0.85, 0.7, 0.2], s: [0.14, 0.55, 1.5] }); B(G.box, { p: [0.85, 0.7, 0.2], s: [0.14, 0.55, 1.5] });
      Tt(G.cyl, { p: [-0.55, 1.2, -0.3], s: [0.05, 0.55, 0.05], c: CHROME }); Tt(G.cyl, { p: [0.55, 1.2, -0.3], s: [0.05, 0.55, 0.05], c: CHROME }); Tt(G.cyl, { p: [0, 1.5, -0.3], r: [0, 0, Math.PI / 2], s: [0.05, 0.6, 0.05], c: CHROME });
      for (const x of [-0.7, 0.7]) { Tt(G.cyl, { p: [x, 1.0, -1.0], s: [0.1, 0.55, 0.1], c: DARK }); } Tt(G.box, { p: [0, 0.75, 1.36], s: [1.2, 0.18, 0.1], c: DARK });
      for (const x of [-0.5, 0.5]) L.add(G.sph, { p: [x, 0.7, 1.4], s: [0.1, 0.1, 0.1], c: GLOW });
      break;
    case 'Javelin':
      B(G.box, { p: [0, 0.36, 0.1], s: [0.85, 0.24, 2.6] }); B(G.cone, { p: [0, 0.36, 1.95], r: [Math.PI / 2, 0, 0], s: [0.26, 1.1, 0.2] }); for (const x of [-0.52, 0.52]) B(G.box, { p: [x, 0.4, -0.2], s: [0.22, 0.24, 1.1] });
      B(G.box, { p: [0, 0.85, -1.1], s: [0.06, 0.6, 0.8] }); B(G.box, { p: [0, 0.4, 1.0], s: [1.2, 0.05, 0.3] }); Tt(G.sph, { p: [0, 0.6, -0.05], s: [0.3, 0.2, 0.5], c: DARK }); Tt(G.box, { p: [0, 0.72, -0.45], s: [0.5, 0.5, 0.1], c: DARK });
      for (const x of [-0.28, 0.28]) L.add(G.sph, { p: [x, 0.42, 1.25], s: [0.07, 0.07, 0.07], c: GLOW }); break;
    case 'Skiff':
      B(G.box, { p: [0, 0.34, 0], s: [1.4, 0.2, 2.4] }); B(G.sph, { p: [0, 0.4, 1.4], s: [0.55, 0.24, 0.6] }); for (const x of [-0.78, 0.78]) B(G.box, { p: [x, 0.36, 0], s: [0.1, 0.22, 1.8] });
      B(G.box, { p: [0, 0.58, -1.0], s: [1.0, 0.3, 0.6] }); B(G.box, { p: [0, 0.82, -1.3], s: [1.25, 0.05, 0.3] }); for (const x of [-0.5, 0.5]) Tt(G.cyl, { p: [x, 0.7, -1.3], r: [Math.PI / 2, 0, 0], s: [0.07, 0.35, 0.07], c: CHROME });
      Tt(G.box, { p: [0, 0.66, -0.4], s: [0.7, 0.45, 0.12], c: DARK }); for (const x of [-0.3, 0.3]) L.add(G.sph, { p: [x, 0.52, 1.65], s: [0.1, 0.06, 0.08], c: 0xffd23f }); break;
    case 'Bulwark':
      B(G.box, { p: [0, 0.62, 0], s: [1.5, 0.5, 2.1] }); B(G.box, { p: [0, 1.0, -0.4], s: [1.2, 0.48, 0.95] }); B(G.box, { p: [-0.86, 0.5, 0.1], s: [0.14, 0.3, 1.2] }); B(G.box, { p: [0.86, 0.5, 0.1], s: [0.14, 0.3, 1.2] });
      Tt(G.cyl, { p: [0, 0.66, 1.2], r: [0, 0, Math.PI / 2], s: [0.07, 0.75, 0.07], c: CHROME }); for (const x of [-0.6, 0.6]) Tt(G.cyl, { p: [x, 0.55, 1.18], s: [0.06, 0.28, 0.06], c: CHROME });
      Tt(G.box, { p: [0, 1.28, -0.4], s: [1.0, 0.04, 0.8], c: CHROME }); Tt(G.box, { p: [0, 1.0, -0.92], s: [0.9, 0.42, 0.06], c: DARK });
      for (const x of [-0.55, 0.55]) L.add(G.sph, { p: [x, 0.76, 1.12], s: [0.12, 0.12, 0.08], c: GLOW }); break;
    case 'Sparkplug':
      B(G.cap, { p: [0, 0.74, 0.1], r: [Math.PI / 2, 0, 0], s: [0.4, 0.9, 0.4] }); B(G.cone, { p: [0, 0.74, 1.35], r: [Math.PI / 2, 0, 0], s: [0.28, 0.7, 0.28] });
      for (const a of [0, 2.09, 4.19]) { B(G.box, { p: [Math.sin(a) * 0.5, 0.74 + Math.cos(a) * 0.5, -0.75], r: [0, 0, -a], s: [0.05, 0.5, 0.55] }); }
      for (let i = 0; i < 3; i++) Tt(G.tor, { p: [0, 0.74, 0.4 - i * 0.55], s: [0.43, 0.43, 0.1], c: CHROME }); Tt(G.cone, { p: [0, 0.74, -1.5], r: [-Math.PI / 2, 0, 0], s: [0.24, 0.45, 0.24], c: DARK }); Tt(G.box, { p: [0, 0.44, 0], s: [0.9, 0.12, 1.8], c: DARK });
      L.add(G.sph, { p: [0, 0.78, 1.05], s: [0.09, 0.09, 0.09], c: GLOW }); break;
    case 'Teacup Twister':
      B(G.cyl, { p: [0, 0.58, 0.05], s: [0.85, 0.36, 0.85] }); B(G.cyl, { p: [0, 0.44, 0.05], s: [1.1, 0.07, 1.1] }); B(G.tor, { p: [0.95, 0.62, 0.05], r: [0, Math.PI / 2, 0], s: [0.3, 0.3, 0.1] }); B(G.cyl, { p: [0, 0.38, 0.05], s: [0.55, 0.12, 0.55] });
      Tt(G.cyl, { p: [0, 0.76, 0.05], s: [0.86, 0.03, 0.86], c: 0xfff6e0 }); Tt(G.cyl, { p: [0, 0.6, -1.0], r: [Math.PI / 2, 0, 0], s: [0.05, 0.55, 0.05], c: CHROME }); Tt(G.sph, { p: [0, 0.6, -1.4], s: [0.14, 0.1, 0.2], c: CHROME });
      for (const x of [-0.3, 0.3]) L.add(G.sph, { p: [x, 0.5, 1.0], s: [0.09, 0.09, 0.09], c: GLOW }); break;
    case 'Wayfarer':
      B(G.box, { p: [0, 0.42, 0], s: [1.2, 0.3, 2.2] }); B(G.box, { p: [0, 0.4, 1.25], s: [0.9, 0.2, 0.8] }); B(G.box, { p: [0, 0.78, -0.7], s: [1.0, 0.5, 0.9] }); B(G.box, { p: [-0.66, 0.46, 0.15], s: [0.32, 0.28, 1.2] }); B(G.box, { p: [0.66, 0.46, 0.15], s: [0.32, 0.28, 1.2] });
      Tt(G.box, { p: [0, 1.06, -0.7], s: [0.95, 0.04, 0.8], c: CHROME }); B(G.box, { p: [0, 1.2, -0.75], s: [0.55, 0.2, 0.5] }); Tt(G.box, { p: [0, 0.8, -0.26], s: [0.9, 0.42, 0.1], c: DARK });
      for (const x of [-0.34, 0.34]) L.add(G.sph, { p: [x, 0.48, 1.62], s: [0.1, 0.1, 0.1], c: GLOW }); break;
    case 'Pogo':
      B(G.cap, { p: [0, 0.78, 0.1], r: [Math.PI / 2, 0, 0], s: [0.42, 0.7, 0.42] }); B(G.cone, { p: [0, 0.78, 1.1], r: [Math.PI / 2, 0, 0], s: [0.3, 0.5, 0.3] });
      for (const x of [-0.55, 0.55]) B(G.box, { p: [x, 0.5, -0.5], s: [0.08, 0.5, 0.6], r: [0, 0, x > 0 ? 0.25 : -0.25] });
      for (let i = 0; i < 6; i++) Tt(G.tor, { p: [0, 0.6, -0.95 - i * 0.1], s: [0.22, 0.22, 0.22], c: CHROME });
      Tt(G.cone, { p: [0, 0.6, -1.7], r: [-Math.PI / 2, 0, 0], s: [0.22, 0.4, 0.22], c: DARK }); Tt(G.box, { p: [0, 0.44, 0], s: [0.9, 0.12, 1.8], c: DARK });
      L.add(G.sph, { p: [0, 0.8, 1.0], s: [0.1, 0.1, 0.1], c: GLOW });
      break;
    case 'Pumpkin Coach':
      B(G.sph, { p: [0, 0.8, 0.0], s: [1.0, 0.75, 1.2] });
      for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI; Tt(G.sph, { p: [Math.cos(a) * 0.0, 0.8, 0], s: [0.03, 0.74, 1.17], r: [0, a, 0], c: 0xc9560a }); }
      Tt(G.cyl, { p: [0, 1.62, 0.1], s: [0.1, 0.22, 0.1], r: [0.2, 0, 0], c: 0x3c8a2e }); B(G.box, { p: [0, 0.4, 0], s: [1.2, 0.2, 2.0] });
      for (const x of [-0.5, 0.5]) { L.add(G.sph, { p: [x, 0.95, 1.1], s: [0.12, 0.14, 0.1], c: GLOW }); }
      Tt(G.box, { p: [0, 0.78, -0.35], s: [0.8, 0.5, 0.12], c: 0x5c2a0a });
      break;
  }
}
// ------------------------------------------------------------------ wheels
const WHEEL_STYLE = {
  'Six-Spoke Standard': { n: 6, sw: 0.07, kind: 'spoke' }, 'Turbine Fan': { n: 10, sw: 0.05, kind: 'blade', tw: 0.5 }, 'Mesh Classic': { n: 14, sw: 0.025, kind: 'mesh' }, 'Dish Deep': { kind: 'dish' },
  'Starburst': { n: 10, sw: 0.045, kind: 'spoke', len: 0.8 }, 'Slick Racing': { n: 5, sw: 0.09, kind: 'spoke', slick: true }, 'Trail Grip': { n: 8, sw: 0.05, kind: 'spoke', knob: 0.07 }, 'Mudder': { kind: 'disc', holes: 8, knob: 0.12 },
  'Balloon Soft': { kind: 'disc', fat: true }, 'Featherweight': { n: 3, sw: 0.16, kind: 'spoke', carbon: true }, 'Anvil Steel': { kind: 'disc', bolts: 6, steel: true }, 'Rally Grip': { n: 8, sw: 0.05, kind: 'spoke', beadlock: true },
  'Ice Studs': { n: 7, sw: 0.06, kind: 'spoke', studs: true }, 'Hover Pad': { kind: 'hover' }, 'Flywheel': { kind: 'rings' }, 'Spinner Disc': { kind: 'disc', spinner: true }, 'Candy Cane': { n: 6, sw: 0.06, kind: 'blade', tw: 0.9, candy: true }, 'Gearwheel': { kind: 'gear' },
};
export function buildWheel(styleName, sizeIdx, rimHex, R0 = 0.36, rimFinish = 'Polished') {
  const st = WHEEL_STYLE[styleName] || WHEEL_STYLE['Six-Spoke Standard']; const scale = [0.82, 0.91, 1.0, 1.1, 1.2][sizeIdx] ?? 1; const R = R0 * scale;
  const w = (st.fat ? 0.34 : st.slick ? 0.36 : 0.28) * (0.9 + 0.1 * scale); const m = new THREE.Group(); const M = new Merger();
  const rim = rimHex === 'rainbow' ? null : rimHex; const rc = (i = 0) => rim || new THREE.Color().setHSL((i * 0.13) % 1, 0.8, 0.55).getHex();
  const rimShade = rimFinish === 'Satin' ? 0.82 : rimFinish === 'Anodized' ? 1.0 : 1.0;
  // axis = x; build in a frame where wheel axis is along Y then rotate
  const tireC = 0x15171c, X = Math.PI / 2;
  if (st.kind !== 'hover') {
    M.add(G.tor, { r: [0, X, 0], s: [R * 0.86, R * 0.86, w * 2.2], c: tireC }); // fat torus-ish tire
    M.add(G.cyl, { r: [0, 0, X], s: [R * 0.99, w * 0.5, R * 0.99], c: tireC });
    if (st.slick) M.add(G.cyl, { r: [0, 0, X], s: [R * 1.0, w * 0.5, R * 1.0], c: 0x2b2f38 });
    if (st.knob) for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; M.add(G.sbox, { p: [0, Math.cos(a) * R, Math.sin(a) * R], r: [a, 0, 0], s: [w * 0.9, st.knob * 1.3, st.knob * 1.3], c: tireC }); }
    if (st.studs) for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; M.add(G.sph, { p: [(i % 2 ? 1 : -1) * w * 0.25, Math.cos(a) * R * 1.0, Math.sin(a) * R * 1.0], s: [0.025, 0.025, 0.025], c: 0xdfe6ee }); }
  }
  const hubR = R * 0.18, rimR = R * 0.74;
  if (st.kind === 'spoke' || st.kind === 'blade' || st.kind === 'mesh') {
    M.add(G.cyl, { r: [0, 0, X], s: [rimR, 0.03, rimR], c: 0x20242c });
    for (let i = 0; i < st.n; i++) { const a = i / st.n * Math.PI * 2; const len = (st.len || 1) * rimR; const col = st.candy ? (i % 2 ? 0xffffff : 0xe0243a) : st.carbon ? 0x24262b : rc(i);
      M.add(G.sbox, { p: [w * 0.18, Math.cos(a) * len * 0.5, Math.sin(a) * len * 0.5], r: [a + (st.tw || 0) * 0.0, st.tw ? st.tw : 0, 0], s: [st.kind === 'blade' ? 0.04 : st.sw * 1.4, len, st.kind === 'blade' ? st.sw * 3 : st.sw * 2.4], c: col }); }
    M.add(G.tor, { r: [0, X, 0], p: [w * 0.14, 0, 0], s: [rimR, rimR, 0.5], c: st.carbon ? 0x24262b : rc(1) }); if (st.kind === 'mesh') M.add(G.tor, { r: [0, X, 0], p: [w * 0.14, 0, 0], s: [rimR * 0.5, rimR * 0.5, 0.4], c: rc(2) });
    if (st.beadlock) for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; M.add(G.cyl, { p: [w * 0.22, Math.cos(a) * rimR * 0.97, Math.sin(a) * rimR * 0.97], r: [0, 0, X], s: [0.02, 0.03, 0.02], c: 0xe6e9ee }); }
  } else if (st.kind === 'dish') { M.add(G.cyl, { p: [w * 0.05, 0, 0], r: [0, 0, X], s: [rimR, w * 0.35, rimR], c: rc(0) }); M.add(G.cyl, { p: [w * 0.22, 0, 0], r: [0, 0, X], s: [rimR * 0.55, w * 0.25, rimR * 0.55], c: 0x20242c }); }
  else if (st.kind === 'disc') {
    M.add(G.cyl, { p: [w * 0.1, 0, 0], r: [0, 0, X], s: [rimR * (st.fat ? 0.62 : 1), w * 0.4, rimR * (st.fat ? 0.62 : 1)], c: st.steel ? 0x6f7782 : rc(0) });
    if (st.bolts) for (let i = 0; i < st.bolts; i++) { const a = i / st.bolts * Math.PI * 2; M.add(G.cyl, { p: [w * 0.34, Math.cos(a) * rimR * 0.6, Math.sin(a) * rimR * 0.6], r: [0, 0, X], s: [0.035, 0.03, 0.035], c: 0xdfe3e8 }); }
    if (st.holes) for (let i = 0; i < st.holes; i++) { const a = i / st.holes * Math.PI * 2; M.add(G.cyl, { p: [w * 0.34, Math.cos(a) * rimR * 0.62, Math.sin(a) * rimR * 0.62], r: [0, 0, X], s: [0.05, 0.02, 0.05], c: 0x15171c }); }
    if (st.spinner) M.add(G.box, { p: [w * 0.36, 0, 0], s: [0.03, rimR * 0.9, rimR * 0.22], c: rc(3) });
  } else if (st.kind === 'rings') { for (let i = 0; i < 3; i++) M.add(G.tor, { r: [0, X, 0], p: [w * 0.15, 0, 0], s: [rimR * (1 - i * 0.28), rimR * (1 - i * 0.28), 0.6], c: rc(i) }); M.add(G.cyl, { r: [0, 0, X], s: [rimR * 0.2, w * 0.4, rimR * 0.2], c: 0x20242c }); }
  else if (st.kind === 'gear') { M.add(G.cyl, { r: [0, 0, X], p: [w * 0.1, 0, 0], s: [rimR, w * 0.3, rimR], c: rc(0) }); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; M.add(G.sbox, { p: [w * 0.1, Math.cos(a) * rimR * 1.05, Math.sin(a) * rimR * 1.05], r: [a, 0, 0], s: [w * 0.5, 0.1, 0.07], c: rc(1) }); } }
  else if (st.kind === 'hover') { M.add(G.cyl, { r: [0, 0, X], s: [R * 0.85, w * 0.35, R * 0.85], c: 0x252a35 }); M.add(G.tor, { r: [0, X, 0], p: [w * 0.18, 0, 0], s: [R * 0.8, R * 0.8, 0.6], c: 0x6fe7ff }); }
  M.add(G.cyl, { p: [w * 0.38, 0, 0], r: [0, 0, X], s: [hubR, 0.04, hubR], c: CHROME });
  const mesh = M.build(wheelMaterial()); m.add(mesh); m.userData.radius = R; m.userData.width = w; return m;
}
// ------------------------------------------------------------------ spoilers / exhausts / bumpers
function buildSpoiler(name, P, T, a) { // a = anchor [y, z]
  const [y, z] = a; const B = (g, o) => P.add(g, o), Tt = (g, o) => T.add(g, o);
  switch (name) {
    case 'None': return;
    case 'Low Lip': B(G.box, { p: [0, y - 0.05, z], s: [1.0, 0.05, 0.22] }); break;
    case 'Duck Tail': B(G.box, { p: [0, y, z], s: [1.0, 0.06, 0.4], r: [0.25, 0, 0] }); break;
    case 'GT Wing': B(G.box, { p: [0, y + 0.45, z], s: [1.3, 0.06, 0.4] }); for (const x of [-0.35, 0.35]) Tt(G.box, { p: [x, y + 0.22, z], s: [0.05, 0.45, 0.1], c: DARK }); for (const x of [-0.65, 0.65]) B(G.box, { p: [x, y + 0.45, z], s: [0.04, 0.22, 0.45] }); break;
    case 'Dual Plane': for (const dy of [0.4, 0.58]) B(G.box, { p: [0, y + dy, z - dy * 0.1], s: [1.25, 0.05, 0.34] }); for (const x of [-0.4, 0.4]) Tt(G.box, { p: [x, y + 0.2, z], s: [0.05, 0.45, 0.1], c: DARK }); for (const x of [-0.64, 0.64]) B(G.box, { p: [x, y + 0.5, z], s: [0.04, 0.3, 0.42] }); break;
    case 'Swan Neck': B(G.box, { p: [0, y + 0.55, z], s: [1.35, 0.05, 0.42] }); for (const x of [-0.4, 0.4]) Tt(G.cyl, { p: [x, y + 0.28, z - 0.1], r: [0.4, 0, 0], s: [0.035, 0.34, 0.035], c: CHROME }); break;
    case 'Barn Door': B(G.box, { p: [0, y + 0.55, z], s: [1.6, 0.7, 0.07] }); for (const x of [-0.5, 0.5]) Tt(G.box, { p: [x, y + 0.2, z], s: [0.06, 0.45, 0.1], c: DARK }); break;
    case 'Shark Fin': B(G.cone, { p: [0, y + 0.45, z], r: [0, 0, 0], s: [0.07, 0.6, 0.4] }); break;
    case 'Roof Scoop': B(G.cone, { p: [0, y + 0.3, z + 0.35], r: [Math.PI / 2, 0, 0], s: [0.22, 0.5, 0.22] }); Tt(G.box, { p: [0, y + 0.3, z + 0.62], s: [0.3, 0.2, 0.05], c: DARK }); break;
    case 'Twin Tail': for (const x of [-0.5, 0.5]) { B(G.box, { p: [x, y + 0.4, z], s: [0.06, 0.55, 0.45] }); } B(G.box, { p: [0, y + 0.2, z], s: [1.0, 0.05, 0.18] }); break;
    case 'Pop-up Flap': B(G.box, { p: [0, y + 0.3, z], s: [1.0, 0.05, 0.4], r: [-0.7, 0, 0] }); for (const x of [-0.4, 0.4]) Tt(G.box, { p: [x, y + 0.15, z], s: [0.04, 0.3, 0.06], c: DARK }); break;
    case 'Feather Wing': B(G.box, { p: [0, y + 0.4, z], s: [1.2, 0.025, 0.3], r: [0.1, 0, 0] }); for (const x of [-0.3, 0.3]) Tt(G.cyl, { p: [x, y + 0.2, z], s: [0.02, 0.2, 0.02], c: 0x24262b }); break;
  }
}
const EXHAUST = { 'Stock Pipe': [1, 0.07, 0.35, 0], 'Twin Chrome': [2, 0.06, 0.4, 0], 'Side Pipes': [2, 0.06, 0.6, 1], 'Megaphone': [1, 0.12, 0.45, 0], 'Upswept': [2, 0.06, 0.4, 2], 'Flame Thrower': [2, 0.075, 0.5, 0], 'Quad Stack': [4, 0.055, 0.4, 0], 'Turbo Whistle': [1, 0.1, 0.45, 3], 'Bubbler': [2, 0.08, 0.3, 0], 'Rocket Nozzle': [1, 0.18, 0.55, 4] };
export function buildExhaust(name, T, ex) { // returns list of flame anchor positions
  const [n, r, len, kind] = EXHAUST[name] || EXHAUST['Stock Pipe']; const [ey, ez] = ex; const out = [];
  for (let i = 0; i < n; i++) {
    let x = n === 1 ? 0 : n === 2 ? (i ? 0.28 : -0.28) : (i - 1.5) * 0.17; let y = ey, z = ez;
    if (kind === 1) { x = i ? 0.8 : -0.8; z = ez + 0.9; y = ey - 0.1; }
    T.add(G.cyl, { p: [x, y, z - len / 2 + 0.05], r: [Math.PI / 2, 0, 0], s: [r, len / 2, r], c: kind === 4 ? 0x3a3f4b : CHROME });
    if (kind === 3 || kind === 4) T.add(G.cone, { p: [x, y, z - len], r: [-Math.PI / 2, 0, 0], s: [r * 1.5, 0.25, r * 1.5], c: kind === 4 ? 0x1c2230 : 0xe5b84a });
    if (kind === 2) T.add(G.cyl, { p: [x, y + 0.2, z - len + 0.05], s: [r, 0.2, r], c: CHROME });
    out.push([x, y, z - len - (kind === 3 || kind === 4 ? 0.25 : 0)]);
  } return out;
}
function buildBumper(name, P, T, a) {
  const [y, z] = a; const B = (g, o) => P.add(g, o), Tt = (g, o) => T.add(g, o);
  switch (name) {
    case 'Stock Bumper': Tt(G.box, { p: [0, y - 0.1, z], s: [1.0, 0.12, 0.12], c: DARK }); break;
    case 'Rubber Pusher': Tt(G.box, { p: [0, y - 0.08, z], s: [1.25, 0.2, 0.2], c: 0x2a2f38 }); break;
    case 'Splitter': B(G.box, { p: [0, y - 0.22, z - 0.05], s: [1.3, 0.04, 0.45] }); break;
    case 'Cow Catcher': for (let i = 0; i < 5; i++) Tt(G.cyl, { p: [(i - 2) * 0.22, y - 0.1, z - 0.1], r: [0.35, 0, 0], s: [0.025, 0.35, 0.025], c: CHROME }); Tt(G.box, { p: [0, y + 0.1, z - 0.3], s: [1.1, 0.05, 0.05], c: CHROME }); break;
    case 'Spike Guard': Tt(G.box, { p: [0, y - 0.1, z], s: [1.2, 0.14, 0.12], c: DARK }); for (let i = 0; i < 5; i++) Tt(G.cone, { p: [(i - 2) * 0.25, y - 0.1, z + 0.14], r: [Math.PI / 2, 0, 0], s: [0.05, 0.2, 0.05], c: CHROME }); break;
    case 'Tiny Bumper': Tt(G.box, { p: [0, y - 0.12, z], s: [0.5, 0.07, 0.07], c: DARK }); break;
    case 'Rubber Duck Horn': Tt(G.box, { p: [0, y - 0.1, z], s: [0.9, 0.12, 0.12], c: DARK }); Tt(G.sph, { p: [0, y + 0.02, z + 0.05], s: [0.13, 0.11, 0.13], c: 0xffd23f }); Tt(G.cone, { p: [0, y + 0.0, z + 0.2], r: [Math.PI / 2, 0, 0], s: [0.05, 0.1, 0.03], c: 0xff7a1a }); break;
    case 'Twin Prongs': for (const x of [-0.3, 0.3]) Tt(G.cone, { p: [x, y - 0.1, z + 0.1], r: [Math.PI / 2, 0, 0], s: [0.08, 0.5, 0.08], c: CHROME }); Tt(G.box, { p: [0, y - 0.1, z - 0.1], s: [0.8, 0.1, 0.1], c: DARK }); break;
  }
}
// ------------------------------------------------------------------ decals
const decalCache = new Map();
export function decalTexture(name, hex = '#ffffff') {
  const key = name + hex; if (decalCache.has(key)) return decalCache.get(key);
  const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'); g.clearRect(0, 0, 256, 256); g.fillStyle = hex; g.strokeStyle = hex; g.lineWidth = 14; g.lineCap = 'round';
  const D = {
    'Racing Stripes': () => { g.fillRect(100, 0, 22, 256); g.fillRect(134, 0, 22, 256); }, 'Twin Stripes': () => { g.fillRect(70, 0, 16, 256); g.fillRect(170, 0, 16, 256); },
    'Checker Flag': () => { for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) if ((x + y) % 2) g.fillRect(48 + x * 20, 48 + y * 20, 20, 20); },
    'Lightning Bolt': () => { g.beginPath(); g.moveTo(150, 20); g.lineTo(80, 140); g.lineTo(124, 140); g.lineTo(100, 236); g.lineTo(180, 110); g.lineTo(134, 110); g.closePath(); g.fill(); },
    'Flame Licks': () => { for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(40 + i * 50, 256); g.quadraticCurveTo(60 + i * 50, 150 - i * 10, 40 + i * 50, 80); g.quadraticCurveTo(100 + i * 50, 150, 90 + i * 50, 256); g.fill(); } },
    'Polka Dots': () => { for (let i = 0; i < 25; i++) { g.beginPath(); g.arc(30 + (i % 5) * 50, 30 + Math.floor(i / 5) * 50, 14, 0, 7); g.fill(); } },
    'Star Field': () => { for (let i = 0; i < 9; i++) { star(g, 40 + (i % 3) * 80, 40 + Math.floor(i / 3) * 80, 20); } },
    'Camo Splash': () => { for (let i = 0; i < 14; i++) { g.beginPath(); g.ellipse(30 + ((i * 53) % 200), 30 + ((i * 91) % 200), 28, 16, i, 0, 7); g.fill(); } },
    'Zigzag': () => { g.beginPath(); g.moveTo(10, 40); for (let i = 0; i < 6; i++) g.lineTo(i % 2 ? 40 : 216, 40 + i * 38); g.stroke(); },
    'Wave Crest': () => { for (let j = 0; j < 4; j++) { g.beginPath(); for (let x = 0; x <= 256; x += 8) g.lineTo(x, 50 + j * 50 + Math.sin(x / 18) * 14); g.stroke(); } },
    'Honeycomb': () => { for (let r = 0; r < 4; r++) for (let q = 0; q < 4; q++) hexa(g, 40 + q * 60 + (r % 2) * 30, 40 + r * 52, 24); },
    'Number 7': () => { g.font = 'bold 190px sans-serif'; g.textAlign = 'center'; g.fillText('7', 128, 200); }, 'Number 42': () => { g.font = 'bold 150px sans-serif'; g.textAlign = 'center'; g.fillText('42', 128, 180); }, 'Number 99': () => { g.font = 'bold 150px sans-serif'; g.textAlign = 'center'; g.fillText('99', 128, 180); },
    'Sun Burst': () => { for (let i = 0; i < 12; i++) { g.save(); g.translate(128, 128); g.rotate(i * Math.PI / 6); g.fillRect(-8, 30, 16, 90); g.restore(); } g.beginPath(); g.arc(128, 128, 26, 0, 7); g.fill(); },
    'Skull & Wrenches': () => { g.beginPath(); g.arc(128, 110, 52, 0, 7); g.fill(); g.fillRect(100, 140, 56, 40); g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.arc(108, 108, 14, 0, 7); g.arc(148, 108, 14, 0, 7); g.fill(); g.globalCompositeOperation = 'source-over'; g.save(); g.translate(128, 200); g.rotate(0.6); g.fillRect(-90, -6, 180, 12); g.rotate(-1.2); g.fillRect(-90, -6, 180, 12); g.restore(); },
    'Paw Prints': () => { for (let i = 0; i < 3; i++) paw(g, 70 + i * 60, 60 + (i % 2) * 90); }, 'Leaf Pattern': () => { for (let i = 0; i < 6; i++) { g.beginPath(); g.ellipse(50 + (i % 3) * 75, 60 + Math.floor(i / 3) * 110, 12, 34, i - 1, 0, 7); g.fill(); } },
    'Snowflakes': () => { for (let i = 0; i < 4; i++) flake(g, 64 + (i % 2) * 128, 64 + Math.floor(i / 2) * 128, 40); }, 'Circuit Lines': () => { g.lineWidth = 8; g.beginPath(); g.moveTo(20, 60); g.lineTo(100, 60); g.lineTo(130, 100); g.lineTo(230, 100); g.moveTo(20, 150); g.lineTo(80, 150); g.lineTo(110, 190); g.lineTo(230, 190); g.stroke(); for (const [x, y] of [[100, 60], [230, 100], [80, 150], [230, 190]]) { g.beginPath(); g.arc(x, y, 10, 0, 7); g.fill(); } },
    'Candy Swirl': () => { g.lineWidth = 22; g.beginPath(); for (let a = 0; a < 18; a += 0.2) g.lineTo(128 + Math.cos(a) * a * 6, 128 + Math.sin(a) * a * 6); g.stroke(); },
    'Tiger Stripes': () => { for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(20, 20 + i * 40); g.quadraticCurveTo(128, 50 + i * 40, 236, 20 + i * 40); g.lineTo(236, 40 + i * 40); g.quadraticCurveTo(128, 70 + i * 40, 20, 40 + i * 40); g.fill(); } },
    'Argyle': () => { for (let r = 0; r < 4; r++) for (let q = 0; q < 4; q++) { g.beginPath(); const cx = 32 + q * 64, cy = 32 + r * 64; g.moveTo(cx, cy - 28); g.lineTo(cx + 28, cy); g.lineTo(cx, cy + 28); g.lineTo(cx - 28, cy); g.closePath(); if ((q + r) % 2) g.fill(); } },
    'Galaxy Swirl': () => { for (let a = 0; a < 40; a += 0.3) { g.globalAlpha = 1 - a / 45; g.beginPath(); g.arc(128 + Math.cos(a) * a * 3, 128 + Math.sin(a) * a * 3, 6 + a / 8, 0, 7); g.fill(); } g.globalAlpha = 1; },
  };
  (D[name] || D['Racing Stripes'])();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; decalCache.set(key, t); return t;
}
function star(g, x, y, r) { g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.closePath(); g.fill(); }
function hexa(g, x, y, r) { g.beginPath(); for (let i = 0; i < 6; i++) g.lineTo(x + Math.cos(i * Math.PI / 3) * r, y + Math.sin(i * Math.PI / 3) * r); g.closePath(); g.lineWidth = 6; g.stroke(); }
function paw(g, x, y) { g.beginPath(); g.ellipse(x, y + 12, 22, 18, 0, 0, 7); g.fill(); for (const [dx, dy] of [[-22, -14], [-8, -28], [8, -28], [22, -14]]) { g.beginPath(); g.ellipse(x + dx, y + dy, 8, 11, 0, 0, 7); g.fill(); } }
function flake(g, x, y, r) { g.lineWidth = 6; for (let i = 0; i < 6; i++) { g.save(); g.translate(x, y); g.rotate(i * Math.PI / 3); g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -r); g.moveTo(0, -r * 0.6); g.lineTo(10, -r * 0.8); g.moveTo(0, -r * 0.6); g.lineTo(-10, -r * 0.8); g.stroke(); g.restore(); } }

// ------------------------------------------------------------------ build kart
export const SIZE_SCALE = [0.82, 0.91, 1.0, 1.1, 1.2];
export function defaultBuild(body = 'Corsa Standard') {
  return { body, wheel: 'Six-Spoke Standard', size: 2, rim: 0, rimFinish: 0, spoiler: 'None', exhaust: 'Stock Pipe', bumper: 'Stock Bumper', paint: 0, finish: 0, paint2: 12, twoTone: -1, decal: -1, decalColor: '#ffffff' };
}
export function buildKart(build, charId = null) {
  const shape = BODY_SHAPES[build.body]; const root = new THREE.Group(); const body = new THREE.Group(); root.add(body);
  const P = new Merger(), P2 = new Merger(), T = new Merger(), L = new Merger();
  const Pm = P; buildBodyParts(build.body, Pm, T, L);
  const pm = DATA.paintColors[build.paint]; const tone = build.twoTone >= 0;
  // two-tone: extra panels in secondary colour
  const S2 = (g, o) => P2.add(g, o);
  if (tone) {
    const t = DATA.twoTone[build.twoTone];
    if (t === 'Hood Stripe') S2(G.box, { p: [0, shape.front[0] + 0.0, shape.front[1] - 1.0], s: [0.3, 0.06, 1.4] });
    else if (t === 'Split Down') S2(G.box, { p: [0.32, 0.65, 0], s: [0.5, 0.06, 2.1] });
    else if (t === 'Roof Cap') S2(G.box, { p: [0, 0.98, -0.85], s: [0.9, 0.06, 0.8] });
    else if (t === 'Fade Front-Back') S2(G.box, { p: [0, 0.62, 1.0], s: [0.95, 0.06, 0.7] });
    else if (t === 'Racing Number Panel') S2(G.cyl, { p: [0, shape.front[0] + 0.12, 0.7], s: [0.28, 0.02, 0.28] });
    else if (t === 'Bib') S2(G.box, { p: [0, 0.64, 1.1], s: [0.7, 0.05, 0.4] });
    else if (t === 'Lower Skirt') { S2(G.box, { p: [-shape.wx * 0.78, 0.36, 0], s: [0.06, 0.1, 1.9] }); S2(G.box, { p: [shape.wx * 0.78, 0.36, 0], s: [0.06, 0.1, 1.9] }); }
    else if (t === 'Diagonal') S2(G.box, { p: [0, 0.7, 0.1], r: [0, 0.5, 0], s: [0.14, 0.05, 1.9] });
  }
  buildSpoiler(build.spoiler, P, T, shape.rear); const flames = buildExhaust(build.exhaust, T, shape.ex); buildBumper(build.bumper, P, T, shape.front);
  const paintMat = paintMaterial(pm.hex, DATA.paintFinishes[build.finish]); const m1 = P.build(paintMat); if (m1) body.add(m1);
  let paint2Mat = null; if (tone) { paint2Mat = paintMaterial(DATA.paintColors[build.paint2].hex, DATA.paintFinishes[build.finish]); const m2 = P2.build(paint2Mat); if (m2) body.add(m2); }
  const mt = T.build(trimMaterial()); if (mt) body.add(mt); const ml = L.build(lightMat()); if (ml) body.add(ml);
  // decals: hood + two sides
  let decalMesh = null;
  if (build.decal >= 0) {
    const tex = decalTexture(DATA.decals[build.decal], build.decalColor); const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, toneMapped: false });
    const D = new Merger(); decalMesh = new THREE.Group();
    const hood = new THREE.Mesh(G.plane, mat); hood.rotation.x = -Math.PI / 2; hood.position.set(0, shape.front[0] + 0.03, 0.6); hood.scale.set(0.8, 1.2, 1); decalMesh.add(hood);
    body.add(decalMesh);
  }
  // wheels
  const rimHex = DATA.rimColors[build.rim].hex === 'rainbow' ? 'rainbow' : DATA.rimColors[build.rim].hex.replace('#', '0x'); const rimV = rimHex === 'rainbow' ? 'rainbow' : parseInt(rimHex, 16);
  const wheels = []; const R0 = shape.R;
  for (const [sx, z] of [[-1, shape.zf], [1, shape.zf], [-1, shape.zr], [1, shape.zr]]) {
    const w = buildWheel(build.wheel, build.size, rimV, R0, DATA.rimFinishes[build.rimFinish]); const rad = w.userData.radius;
    const pivot = new THREE.Group(); pivot.position.set(sx * shape.wx, rad, z); if (build.body === 'Ironclad' || build.body === 'Pumpkin Coach') w.scale.setScalar(1.12);
    w.rotation.y = sx > 0 ? 0 : Math.PI; pivot.add(w); body.add(pivot); wheels.push({ pivot, spin: w, front: z > 0, sx, rad });
  }
  const sizeK = SIZE_SCALE[build.size] ?? 1; body.position.y = (sizeK - 1) * 0.35;
  // driver
  let driver = null; if (charId !== null) { driver = buildCharacter(charId); driver.root.position.set(0, shape.seat[0], shape.seat[1]); body.add(driver.root); }
  return { root, body, wheels, driver, flames, shape, paintMat, paint2Mat, decalMesh, radius: R0 * sizeK, build };
}

// ------------------------------------------------------------------ characters
const CH = {
  'Pip Thistledown': { skin: 0xc98a4b, belly: 0xf0d2a0, shirt: 0x3fae5a, hat: 'acorn', ears: 'round', nose: 'small', tail: 'bushy', ec: 0x3a2412 },
  'Fennel Vix': { skin: 0xf08a2c, belly: 0xfff0dc, shirt: 0x13a3a3, hat: 'none', ears: 'pointy', nose: 'snout', tail: 'huge', ec: 0x2a1a0c, scarf: 0x13a3a3 },
  'Juniper Wren': { skin: 0x9a6a44, belly: 0xf3dcb8, shirt: 0x3a8de6, hat: 'tuft', ears: 'none', nose: 'beak', tail: 'small', ec: 0x1a1008, wings: true },
  'Pearl Quayside': { skin: 0xe0a97c, belly: 0xe0a97c, shirt: 0x1f6f78, hat: 'cap', ears: 'human', nose: 'small', tail: 'none', ec: 0x2a1a0c, coat: true, hair: 0x6b3f1d },
  'Bramble Quill': { skin: 0x8a6a45, belly: 0xe6c9a0, shirt: 0x5b6571, hat: 'quills', ears: 'small', nose: 'snout', tail: 'none', ec: 0x1a1008, goggles: true },
  'Clover Dash': { skin: 0xf4f0ea, belly: 0xffffff, shirt: 0xffc83a, hat: 'none', ears: 'long', nose: 'pink', tail: 'puff', ec: 0x2a1a2c },
  'Captain Dusk Marlowe': { skin: 0xdfae88, belly: 0xdfae88, shirt: 0x1f3a73, hat: 'captain', ears: 'human', nose: 'big', tail: 'none', ec: 0x2a1a0c, beard: 0xf2f2f2 },
  'Sage Willowmere': { skin: 0x9b7a53, belly: 0xf0e0c0, shirt: 0x7a1f3a, hat: 'tufts', ears: 'none', nose: 'beak', tail: 'small', ec: 0xffd23f, disc: 0xf6ead0, cape: true },
  'Marigold Hoofsworth': { skin: 0xd9a066, belly: 0xfff0dc, shirt: 0xffffff, hat: 'antlers', ears: 'deer', nose: 'snout', tail: 'puff', ec: 0x2a1a0c, apron: true },
  'Hobb Mossback': { skin: 0x6d9a52, belly: 0xd8e6a8, shirt: 0x8a5a30, hat: 'shell', ears: 'none', nose: 'small', tail: 'none', ec: 0x1a1008 },
  'Barnaby Bruin': { skin: 0x8a5a30, belly: 0xd9b27a, shirt: 0xc8332a, hat: 'none', ears: 'round', nose: 'snout', tail: 'puff', ec: 0x1a1008, honey: true },
  'Gus Gantry': { skin: 0xd9a27a, belly: 0xd9a27a, shirt: 0xff8a1a, hat: 'hardhat', ears: 'human', nose: 'big', tail: 'none', ec: 0x2a1a0c, stubble: true },
  'Flurry Skye': { skin: 0xcfe8f6, belly: 0xffffff, shirt: 0x3aa0d8, hat: 'tuft', ears: 'small', nose: 'small', tail: 'puff', ec: 0x15324a, scarf: 0x7fe0ff },
  'Nova Starling': { skin: 0xe8b48a, belly: 0xe8b48a, shirt: 0x2457d6, hat: 'helmet', hc: 0xf4f1ea, ears: 'human', nose: 'small', tail: 'none', ec: 0x2a1a0c },
  'Lulu Lollipop': { skin: 0xf0c09a, belly: 0xf0c09a, shirt: 0xff6fae, hat: 'swirl', hc: 0xff7fc0, ears: 'human', nose: 'pink', tail: 'none', ec: 0x3a1a2c },
  'Pyra Ashgrove': { skin: 0xe0603a, belly: 0xffb070, shirt: 0x3a2a2a, hat: 'flame', hc: 0xff8a1a, ears: 'pointy', nose: 'small', tail: 'small', ec: 0xffe347 },
  'Zorp Blip': { skin: 0x7fe05a, belly: 0xcfffa0, shirt: 0x8a3ad8, hat: 'antennae', hc: 0x7fe05a, ears: 'none', nose: 'small', tail: 'none', ec: 0x111111 },
  'Cogsworth Whirr': { skin: 0xc89a6a, belly: 0xc89a6a, shirt: 0x8a6a2a, hat: 'tophat', hc: 0x3a2a1a, ears: 'human', nose: 'big', tail: 'none', ec: 0x2a1a0c, goggles: true, stubble: true },
  'Coral Calloway': { skin: 0x2fb8b8, belly: 0xdff7f0, shirt: 0xff6b57, hat: 'helmet', hc: 0x13a3a3, ears: 'small', nose: 'small', tail: 'small', ec: 0x0a2a2a, goggles: true },
  'Zahra Sandglass': { skin: 0xb8794a, belly: 0xb8794a, shirt: 0xe0a030, hat: 'turban', hc: 0xd8452a, ears: 'human', nose: 'small', tail: 'none', ec: 0x2a1a0c, scarf: 0xd8452a },
  'Grumbald the Yeti': { skin: 0xe8f0f8, belly: 0xffffff, shirt: 0x9ac0e0, hat: 'none', ears: 'round', nose: 'big', tail: 'puff', ec: 0x1a2a3a },
  'Nanuk Snowdrift': { skin: 0xd0a080, belly: 0xd0a080, shirt: 0x2a6aa0, hat: 'hood', hc: 0x2a6aa0, ears: 'none', nose: 'small', tail: 'none', ec: 0x2a1a0c, coat: true, beard: 0xdddddd },
  'Scarab Sol': { skin: 0x2a4a8a, belly: 0x5a7ac0, shirt: 0xe5b84a, hat: 'horn', hc: 0xe5b84a, ears: 'none', nose: 'small', tail: 'none', ec: 0xffe347 },
  'Big Top Boris': { skin: 0xe8b48a, belly: 0xe8b48a, shirt: 0xd7263d, hat: 'tophat', hc: 0xd7263d, ears: 'human', nose: 'big', tail: 'none', ec: 0x2a1a0c, beard: 0x3a2a1a },
};
export function characterByName(n) { return CH[n]; }
export function buildCharacter(name) {
  const c = CH[name] || CH['Pip Thistledown']; const root = new THREE.Group(); const torsoM = new Merger(), headM = new Merger(), armM = new Merger();
  const T = torsoM, H = headM;
  // torso
  T.add(G.sph, { p: [0, 0.05, 0], s: [c.coat ? 0.46 : 0.36, c.coat ? 0.42 : 0.34, 0.3], c: c.shirt });
  if (c.apron) T.add(G.box, { p: [0, 0.0, 0.2], s: [0.4, 0.45, 0.05], c: 0xffffff }); if (c.cape) T.add(G.box, { p: [0, 0.05, -0.28], s: [0.7, 0.6, 0.08], c: c.shirt });
  if (c.shirt === 0xff8a1a) { T.add(G.box, { p: [0, 0.05, 0.2], s: [0.46, 0.06, 0.04], c: 0xeaff3a }); T.add(G.box, { p: [-0.12, 0.1, 0.21], s: [0.05, 0.34, 0.03], c: 0xeaff3a }); T.add(G.box, { p: [0.12, 0.1, 0.21], s: [0.05, 0.34, 0.03], c: 0xeaff3a }); }
  if (c.scarf) { T.add(G.tor, { p: [0, 0.33, 0], r: [Math.PI / 2, 0, 0], s: [0.26, 0.26, 0.5], c: c.scarf }); T.add(G.box, { p: [0.12, 0.2, 0.22], s: [0.1, 0.3, 0.05], c: c.scarf }); }
  if (c.honey) { T.add(G.cyl, { p: [0.0, -0.1, 0.34], s: [0.15, 0.12, 0.15], c: 0xe5b84a }); T.add(G.cyl, { p: [0.0, -0.02, 0.34], s: [0.12, 0.02, 0.12], c: 0xffd23f }); }
  // tail / back items (torso group so it doesn't tilt with head)
  if (c.tail === 'huge') { T.add(G.sph, { p: [0.3, 0.2, -0.55], s: [0.3, 0.3, 0.7], c: c.skin }); T.add(G.sph, { p: [0.34, 0.25, -1.0], s: [0.22, 0.22, 0.34], c: 0xfff0dc }); }
  else if (c.tail === 'bushy') T.add(G.sph, { p: [0, 0.4, -0.4], s: [0.22, 0.45, 0.28], c: c.skin }); else if (c.tail === 'puff') T.add(G.sph, { p: [0, 0.05, -0.38], s: [0.14, 0.14, 0.14], c: 0xffffff }); else if (c.tail === 'small') T.add(G.cone, { p: [0, 0.0, -0.45], r: [-Math.PI / 2, 0, 0], s: [0.1, 0.3, 0.05], c: c.skin });
  if (c.hat === 'shell') { T.add(G.sph, { p: [0, 0.3, -0.25], s: [0.62, 0.55, 0.55], c: 0x5f8a45 }); for (let i = 0; i < 5; i++) T.add(G.sph, { p: [Math.cos(i * 1.26) * 0.28, 0.5 + 0.01 * i, -0.25 + Math.sin(i * 1.26) * 0.2], s: [0.14, 0.1, 0.14], c: 0x4a6e34 }); }
  if (c.wings) { T.add(G.sph, { p: [-0.36, 0.1, -0.1], s: [0.06, 0.28, 0.2], c: 0x7a4f2f }); T.add(G.sph, { p: [0.36, 0.1, -0.1], s: [0.06, 0.28, 0.2], c: 0x7a4f2f }); }
  if (c.satchel) T.add(G.box, { p: [0.28, 0.0, -0.1], s: [0.15, 0.2, 0.18], c: 0x7a4f2f });
  // head (origin at neck)
  const hy = 0.52, hr = c.disc ? 0.38 : 0.34; H.add(G.sph, { p: [0, hy, 0], s: [hr, hr * 0.95, hr], c: c.skin });
  if (c.belly !== c.skin && c.nose !== 'beak') H.add(G.sph, { p: [0, hy - 0.08, hr * 0.5], s: [hr * 0.62, hr * 0.55, hr * 0.55], c: c.belly });
  // eyes
  const ey = hy + 0.05, ez = hr * 0.78, ex = hr * 0.38; const eyeBig = c.disc ? 1.6 : 1.0;
  for (const s of [-1, 1]) { H.add(G.sph, { p: [s * ex, ey, ez], s: [0.1 * eyeBig, 0.12 * eyeBig, 0.06], c: c.disc ? 0xffffff : 0xffffff }); H.add(G.sph, { p: [s * ex, ey - 0.005, ez + 0.05], s: [0.055 * eyeBig, 0.07 * eyeBig, 0.03], c: c.ec > 0xf00000 ? 0xffd23f : (c.disc ? 0xffd23f : 0x161a22) }); H.add(G.sph, { p: [s * ex + 0.02, ey + 0.03, ez + 0.075], s: [0.02, 0.02, 0.01], c: 0xffffff }); }
  if (c.disc) { H.add(G.sph, { p: [0, ey, ez - 0.02], s: [0.34, 0.2, 0.05], c: c.disc }); }
  // nose
  if (c.nose === 'snout') { H.add(G.sph, { p: [0, hy - 0.06, hr * 0.95], s: [0.15, 0.11, 0.18], c: c.belly }); H.add(G.sph, { p: [0, hy - 0.02, hr * 1.1], s: [0.06, 0.045, 0.045], c: 0x161a22 }); }
  else if (c.nose === 'beak') { H.add(G.cone, { p: [0, hy - 0.04, hr * 1.12], r: [Math.PI / 2, 0, 0], s: [0.11, 0.24, 0.07], c: 0xffb21a }); }
  else if (c.nose === 'pink') H.add(G.sph, { p: [0, hy - 0.04, hr * 1.0], s: [0.05, 0.04, 0.04], c: 0xff8fb1 });
  else if (c.nose === 'big') H.add(G.sph, { p: [0, hy - 0.04, hr * 1.0], s: [0.07, 0.07, 0.07], c: new THREE.Color(c.skin).multiplyScalar(0.85).getHex() });
  else H.add(G.sph, { p: [0, hy - 0.04, hr * 1.0], s: [0.04, 0.035, 0.035], c: 0x161a22 });
  // ears
  const E = (s, g, o) => H.add(g, { ...o, p: [s * o.p[0], o.p[1], o.p[2]], r: o.r ? [o.r[0], o.r[1] * s, o.r[2] * s] : [0, 0, 0] });
  for (const s of [-1, 1]) {
    if (c.ears === 'round') { H.add(G.sph, { p: [s * 0.24, hy + 0.27, -0.02], s: [0.12, 0.12, 0.06], c: c.skin }); H.add(G.sph, { p: [s * 0.24, hy + 0.27, 0.02], s: [0.07, 0.07, 0.04], c: c.belly }); }
    else if (c.ears === 'pointy') { H.add(G.cone, { p: [s * 0.2, hy + 0.36, -0.02], r: [0, 0, -s * 0.15], s: [0.12, 0.3, 0.07], c: c.skin }); H.add(G.cone, { p: [s * 0.2, hy + 0.34, 0.02], r: [0, 0, -s * 0.15], s: [0.07, 0.2, 0.04], c: 0x2a1a0c }); }
    else if (c.ears === 'long') { H.add(G.cap, { p: [s * 0.14, hy + 0.55, -0.06], r: [-0.25, 0, -s * 0.12], s: [0.07, 0.2, 0.05], c: c.skin }); H.add(G.cap, { p: [s * 0.14, hy + 0.55, -0.03], r: [-0.25, 0, -s * 0.12], s: [0.04, 0.17, 0.03], c: 0xffb5c9 }); }
    else if (c.ears === 'deer') { H.add(G.sph, { p: [s * 0.3, hy + 0.14, -0.04], r: [0, 0, -s * 0.5], s: [0.16, 0.08, 0.05], c: c.skin }); }
    else if (c.ears === 'small') H.add(G.sph, { p: [s * 0.27, hy + 0.2, -0.02], s: [0.07, 0.07, 0.04], c: c.skin });
    else if (c.ears === 'human') H.add(G.sph, { p: [s * 0.33, hy, 0], s: [0.05, 0.08, 0.06], c: c.skin });
  }
  // hats / accessories
  switch (c.hat) {
    case 'acorn': H.add(G.sph, { p: [0, hy + 0.3, 0], s: [0.3, 0.2, 0.3], c: 0x8a5a2b }); H.add(G.cyl, { p: [0, hy + 0.5, 0], s: [0.03, 0.08, 0.03], c: 0x6b4423 }); H.add(G.tor, { p: [0, hy + 0.2, 0], r: [Math.PI / 2, 0, 0], s: [0.3, 0.3, 0.4], c: 0x6b4423 }); H.add(G.cone, { p: [0.12, hy + 0.58, 0], r: [0, 0, -0.5], s: [0.03, 0.2, 0.01], c: 0x3fae5a }); break;
    case 'tuft': for (let i = -1; i <= 1; i++) H.add(G.cone, { p: [i * 0.07, hy + 0.38, -0.04], r: [-0.3, 0, -i * 0.3], s: [0.04, 0.2, 0.03], c: c.skin }); break;
    case 'cap': H.add(G.sph, { p: [0, hy + 0.2, 0], s: [0.36, 0.2, 0.36], c: 0x14213d }); H.add(G.box, { p: [0, hy + 0.2, 0.34], s: [0.4, 0.04, 0.2], c: 0x14213d }); H.add(G.sph, { p: [0, hy, -0.2], s: [0.35, 0.3, 0.2], c: c.hair }); break;
    case 'quills': for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; const rr = 0.26; H.add(G.cone, { p: [Math.cos(a) * rr * 0.9, hy + 0.28, Math.sin(a) * rr - 0.05], r: [Math.sin(a) * 0.7, 0, -Math.cos(a) * 0.7], s: [0.045, 0.28, 0.045], c: i % 2 ? 0x5e4426 : 0x2f2416 }); } for (let i = 0; i < 5; i++) H.add(G.cone, { p: [(i - 2) * 0.1, hy + 0.34, -0.1], r: [-0.4, 0, 0], s: [0.05, 0.3, 0.05], c: 0x2f2416 }); break;
    case 'captain': H.add(G.cyl, { p: [0, hy + 0.3, 0], s: [0.3, 0.12, 0.3], c: 0xf4f1ea }); H.add(G.cyl, { p: [0, hy + 0.21, 0.02], s: [0.33, 0.03, 0.33], c: 0x14213d }); H.add(G.box, { p: [0, hy + 0.2, 0.3], s: [0.34, 0.03, 0.2], c: 0x111111 }); H.add(G.sph, { p: [0, hy + 0.27, 0.32], s: [0.05, 0.05, 0.02], c: 0xe5b84a }); break;
    case 'antennae': for (let i = -1; i <= 1; i++) { H.add(G.cyl, { p: [i * 0.1, hy + 0.42, 0], r: [0, 0, -i * 0.25], s: [0.015, 0.2, 0.015], c: c.hc }); H.add(G.sph, { p: [i * 0.17, hy + 0.62, 0], s: [0.05, 0.05, 0.05], c: 0xffe347 }); } break;
    case 'tophat': H.add(G.cyl, { p: [0, hy + 0.2, 0], s: [0.34, 0.03, 0.34], c: c.hc }); H.add(G.cyl, { p: [0, hy + 0.38, 0], s: [0.22, 0.34, 0.22], c: c.hc }); H.add(G.cyl, { p: [0, hy + 0.27, 0], s: [0.225, 0.07, 0.225], c: 0xe5b84a }); break;
    case 'flame': for (let i = -2; i <= 2; i++) H.add(G.cone, { p: [i * 0.08, hy + 0.36 - Math.abs(i) * 0.03, -0.04], r: [-0.25, 0, -i * 0.22], s: [0.06, 0.3 - Math.abs(i) * 0.05, 0.04], c: i % 2 ? 0xffd23f : c.hc }); break;
    case 'swirl': H.add(G.sph, { p: [0, hy + 0.28, 0], s: [0.3, 0.16, 0.3], c: c.hc }); H.add(G.sph, { p: [0, hy + 0.42, 0], s: [0.22, 0.14, 0.22], c: 0xffffff }); H.add(G.sph, { p: [0, hy + 0.54, 0], s: [0.14, 0.12, 0.14], c: c.hc }); H.add(G.sph, { p: [0, hy + 0.64, 0], s: [0.07, 0.07, 0.07], c: 0xffffff }); break;
    case 'helmet': H.add(G.sph, { p: [0, hy + 0.06, -0.01], s: [0.4, 0.38, 0.4], c: c.hc }); H.add(G.sph, { p: [0, hy + 0.13, 0.2], s: [0.3, 0.08, 0.18], c: 0x1a2a4a }); H.add(G.sph, { p: [0, hy + 0.27, 0.12], s: [0.07, 0.07, 0.03], c: 0xffd23f }); break;
    case 'hood': H.add(G.sph, { p: [0, hy + 0.08, -0.06], s: [0.42, 0.4, 0.4], c: c.hc }); H.add(G.sph, { p: [0, hy - 0.02, 0.1], s: [0.31, 0.3, 0.3], c: c.skin }); H.add(G.sph, { p: [0, hy + 0.06, 0.16], s: [0.36, 0.1, 0.3], c: 0xf4f1ea }); break;
    case 'horn': H.add(G.cone, { p: [0, hy + 0.5, 0.08], r: [0.25, 0, 0], s: [0.1, 0.44, 0.1], c: c.hc }); H.add(G.sph, { p: [0, hy + 0.2, -0.02], s: [0.36, 0.14, 0.36], c: 0x1a2a5a }); break;
    case 'turban': H.add(G.sph, { p: [0, hy + 0.24, 0], s: [0.36, 0.2, 0.36], c: c.hc }); H.add(G.tor, { p: [0, hy + 0.18, 0], r: [Math.PI / 2, 0, 0], s: [0.33, 0.33, 0.3], c: 0xf4e3b8 }); H.add(G.sph, { p: [0, hy + 0.4, 0.04], s: [0.08, 0.08, 0.08], c: 0x2fb8b8 }); break;
    case 'tufts': for (const s of [-1, 1]) H.add(G.cone, { p: [s * 0.2, hy + 0.34, -0.04], r: [0, 0, -s * 0.4], s: [0.07, 0.2, 0.05], c: 0x7a5a38 }); break;
    case 'antlers': for (const s of [-1, 1]) { H.add(G.cap, { p: [s * 0.16, hy + 0.5, -0.04], r: [0, 0, -s * 0.35], s: [0.03, 0.2, 0.03], c: 0xe9d9b5 }); H.add(G.cap, { p: [s * 0.27, hy + 0.58, -0.04], r: [0, 0, -s * 0.9], s: [0.025, 0.12, 0.025], c: 0xe9d9b5 }); H.add(G.cap, { p: [s * 0.2, hy + 0.45, -0.04], r: [0, 0, s * 0.8], s: [0.025, 0.09, 0.025], c: 0xe9d9b5 }); } H.add(G.box, { p: [0.0, hy + 0.3, 0.1], s: [0.5, 0.03, 0.03], c: 0xff6b9a }); break;
    case 'hardhat': H.add(G.sph, { p: [0, hy + 0.2, 0], s: [0.36, 0.24, 0.36], c: 0xffd23f }); H.add(G.box, { p: [0, hy + 0.15, 0.3], s: [0.4, 0.04, 0.2], c: 0xffd23f }); H.add(G.box, { p: [0, hy + 0.34, 0], s: [0.08, 0.05, 0.3], c: 0xe0b300 }); break;
  }
  if (c.goggles) { H.add(G.tor, { p: [-ex, ey + 0.06, ez + 0.02], s: [0.13, 0.13, 0.6], c: 0x4a4f5a }); H.add(G.tor, { p: [ex, ey + 0.06, ez + 0.02], s: [0.13, 0.13, 0.6], c: 0x4a4f5a }); H.add(G.box, { p: [0, ey + 0.08, ez + 0.0], s: [0.1, 0.03, 0.03], c: 0x4a4f5a }); }
  if (c.beard) { H.add(G.sph, { p: [0, hy - 0.15, hr * 0.7], s: [0.26, 0.2, 0.2], c: c.beard }); H.add(G.sph, { p: [0, hy - 0.05, hr * 0.98], s: [0.18, 0.04, 0.05], c: c.beard }); }
  if (c.stubble) H.add(G.sph, { p: [0, hy - 0.17, hr * 0.66], s: [0.24, 0.12, 0.2], c: 0x8a6a52 });
  if (c.hair && c.hat !== 'cap') H.add(G.sph, { p: [0, hy + 0.12, -0.12], s: [0.36, 0.28, 0.3], c: c.hair });
  // mouth (separate toggled meshes)
  const mouthSmile = new Merger().add(G.tor, { p: [0, hy - 0.14, hr * 0.88], r: [0, 0, Math.PI], s: [0.07, 0.04, 0.4], c: 0x3a0f10 });
  const mouthOpen = new Merger().add(G.sph, { p: [0, hy - 0.15, hr * 0.9], s: [0.07, 0.085, 0.04], c: 0x3a0f10 }).add(G.sph, { p: [0, hy - 0.2, hr * 0.92], s: [0.04, 0.03, 0.02], c: 0xff6b7a });
  // arms
  for (const s of [-1, 1]) { armM.add(G.cap, { p: [s * 0.28, 0, 0.2], r: [Math.PI / 2 - 0.35, 0, s * 0.12], s: [0.075, 0.2, 0.075], c: c.shirt }); armM.add(G.sph, { p: [s * 0.2, -0.04, 0.44], s: [0.085, 0.085, 0.085], c: c.skin }); }
  const sm = softMaterial();
  const torso = torsoM.build(sm); const head = new THREE.Group(); head.add(headM.build(sm)); head.position.set(0, 0.0, 0);
  const smile = mouthSmile.build(new THREE.MeshBasicMaterial({ vertexColors: true })); const open = mouthOpen.build(new THREE.MeshBasicMaterial({ vertexColors: true })); open.visible = false; head.add(smile); head.add(open);
  const armsMesh = armM.build(sm); armsMesh.position.set(0, 0.15, 0.05);
  // steering wheel
  const wheelM = new Merger(); wheelM.add(G.tor, { r: [0, 0, 0], s: [0.2, 0.2, 0.6], c: 0x1c2230 }); wheelM.add(G.cyl, { r: [Math.PI / 2, 0, 0], s: [0.04, 0.2, 0.04], c: CHROME }); const sw = new THREE.Group(); sw.add(wheelM.build(trimMaterial())); sw.position.set(0, 0.18, 0.5); sw.rotation.x = -0.9;
  root.add(torso); root.add(head); root.add(armsMesh); root.add(sw);
  return { root, head, torso, arms: armsMesh, smile, open, wheel: sw, name, cfg: c };
}
export function animateDriver(d, steer, bump, joy, dt, t) {
  d.head.rotation.z += ((-steer * 0.28) - d.head.rotation.z) * Math.min(1, dt * 9); d.head.rotation.y += ((-steer * 0.22) - d.head.rotation.y) * Math.min(1, dt * 9);
  d.head.position.y = Math.sin(t * 12) * 0.006 * bump + bump * 0.015; d.wheel.rotation.z += ((-steer * 0.9) - d.wheel.rotation.z) * Math.min(1, dt * 14);
  d.torso.rotation.z += ((-steer * 0.1) - d.torso.rotation.z) * Math.min(1, dt * 8);
  d.smile.visible = !joy; d.open.visible = !!joy;
}
export const MODEL_G = G;
