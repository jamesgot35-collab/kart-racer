// Menu / garage 3D showroom + portrait renderer.
import * as THREE from 'three';
import { buildKart, buildCharacter } from './models.js';
export class Showroom {
  constructor(renderer) {
    this.renderer = renderer; this.scene = new THREE.Scene(); this.cam = new THREE.PerspectiveCamera(34, 1, 0.1, 100); this.t = 0; this.kart = null; this.spin = true; this.rot = 0.6; this.zoom = 1; this.focus = 'kart';
    this.scene.background = new THREE.Color(0x0d1630); const fog = new THREE.Fog(0x0d1630, 18, 48); this.scene.fog = fog;
    const pm = new THREE.PMREMGenerator(renderer); const es = new THREE.Scene(); es.background = new THREE.Color(0x203060); const strip = (x, y, z, w, h, c, i) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(i), side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); es.add(m); };
    strip(8, 6, 6, 8, 3, 0xffffff, 6); strip(-9, 4, -3, 6, 6, 0x6fb4ff, 3); strip(0, 10, -8, 12, 2, 0xffd89a, 4); strip(0, 3, 10, 14, 2, 0xff7aa8, 2); this.scene.environment = pm.fromScene(es, 0.03).texture; pm.dispose();
    this.scene.add(new THREE.HemisphereLight(0xaac8ff, 0x1a2040, 0.9)); const key = new THREE.DirectionalLight(0xfff0dd, 2.4); key.position.set(5, 8, 6); this.scene.add(key); const rim = new THREE.DirectionalLight(0x6fa8ff, 2.2); rim.position.set(-6, 4, -5); this.scene.add(rim);
    const floor = new THREE.Mesh(new THREE.CircleGeometry(30, 48), new THREE.MeshStandardMaterial({ color: 0x182446, roughness: 0.35, metalness: 0.6, envMapIntensity: 0.8 })); floor.rotation.x = -Math.PI / 2; this.scene.add(floor);
    const ring = new THREE.Mesh(new THREE.RingGeometry(3.4, 3.55, 64), new THREE.MeshBasicMaterial({ color: 0x4db8ff, transparent: true, opacity: 0.8 })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; this.scene.add(ring); const ring2 = new THREE.Mesh(new THREE.RingGeometry(4.3, 4.34, 64), new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.5 })); ring2.rotation.x = -Math.PI / 2; ring2.position.y = 0.02; this.scene.add(ring2); this.ring = ring;
    const pts = new Float32Array(300 * 3); for (let i = 0; i < 300; i++) { const a = Math.random() * 6.28, r = 6 + Math.random() * 20; pts[i * 3] = Math.cos(a) * r; pts[i * 3 + 1] = Math.random() * 10; pts[i * 3 + 2] = Math.sin(a) * r; } const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pts, 3)); this.stars = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x9fd0ff, size: 0.12, transparent: true, opacity: 0.7 })); this.scene.add(this.stars);
    this.portraitRT = new THREE.WebGLRenderTarget(256, 256, { colorSpace: THREE.SRGBColorSpace, samples: 4 }); this.portraits = new Map();
  }
  setKart(build, charName) { if (this.kart) { this.scene.remove(this.kart.root); } this.kart = buildKart(build, charName); this.scene.add(this.kart.root); this.kart.root.rotation.y = this.rot; }
  render(dt, w, h, aspectBias = 0) {
    this.t += dt; if (this.kart) { if (this.spin) this.rot += dt * 0.5; this.kart.root.rotation.y = this.rot; for (const wh of this.kart.wheels) wh.spin.rotation.x += dt * 2; if (this.kart.driver) this.kart.driver.root.rotation.y = Math.sin(this.t * 1.5) * 0.12; this.kart.body.position.y += (Math.sin(this.t * 2) * 0.012 - (this.kart.body.userData.by || 0)); this.kart.body.userData.by = Math.sin(this.t * 2) * 0.012; }
    this.stars.rotation.y += dt * 0.02; const aspect = w / h; this.cam.aspect = aspect; const d = (aspect < 1 ? 15.5 : 10.5) * this.zoom; const ang = 0.5; this.cam.position.set(Math.sin(ang) * d * 0.35, d * 0.26, Math.cos(ang) * d * 0.95); this.cam.lookAt(aspect < 1 ? 0 : -0.0, aspect < 1 ? 0.2 : 0.6, 0);
    if (aspect >= 1) { this.cam.setViewOffset(w, h, -w * 0.16 * (aspectBias || 0), 0, w, h); } else this.cam.clearViewOffset(); this.cam.updateProjectionMatrix(); this.renderer.render(this.scene, this.cam);
  }
  portrait(name, size = 256) { // renders a character head & shoulders to a data URL
    const key = name + size; if (this.portraits.has(key)) return this.portraits.get(key); const ch = buildCharacter(name); const sc = new THREE.Scene(); sc.background = new THREE.Color(0x24407a); sc.environment = this.scene.environment; sc.add(new THREE.HemisphereLight(0xcfe0ff, 0x3a4a80, 1.2)); const l = new THREE.DirectionalLight(0xfff0dd, 2.6); l.position.set(2, 3, 4); sc.add(l); const rl = new THREE.DirectionalLight(0x7fb0ff, 2.2); rl.position.set(-3, 2, -2); sc.add(rl);
    ch.root.position.set(0, -1.1, 0); ch.root.rotation.y = Math.PI + 0.35; sc.add(ch.root); const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 20); cam.position.set(-0.7, 0.45, -3.1); ch.root.rotation.y = 0.0; cam.position.set(1.0, 0.3, 3.3); cam.lookAt(0, -0.22, 0); ch.root.rotation.y = -0.2;
    if (size !== this.portraitRT.width) this.portraitRT.setSize(size, size); const r = this.renderer; const old = r.getRenderTarget(); r.setRenderTarget(this.portraitRT); r.render(sc, cam); const buf = new Uint8Array(size * size * 4); r.readRenderTargetPixels(this.portraitRT, 0, 0, size, size, buf); r.setRenderTarget(old);
    const c = document.createElement('canvas'); c.width = c.height = size; const g = c.getContext('2d'); const id = g.createImageData(size, size); for (let y = 0; y < size; y++) id.data.set(buf.subarray((size - 1 - y) * size * 4, (size - y) * size * 4), y * size * 4); g.putImageData(id, 0, 0); const url = c.toDataURL('image/png'); this.portraits.set(key, url); return url;
  }
}
