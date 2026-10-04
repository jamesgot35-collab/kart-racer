// Tyre skid marks: a ring buffer of dark flat quads (one InstancedMesh, one draw call) laid on the road while karts slide / drift / spin.
import * as THREE from 'three';
export class Skids {
  constructor(scene, n = 400) {
    this.scene = scene; this.n = Math.max(40, n | 0); this.i = 0; this.total = 0; this.dirty = false;
    this.geo = new THREE.PlaneGeometry(0.3, 1.0); this.mat = new THREE.MeshBasicMaterial({ color: 0x050608, transparent: true, opacity: 0.4, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
    this.mesh = new THREE.InstancedMesh(this.geo, this.mat, this.n); this.mesh.count = 0; this.mesh.frustumCulled = false; this.mesh.renderOrder = 1; scene.add(this.mesh);
    this.d = new THREE.Object3D(); this.d.rotation.order = 'YXZ';
  }
  add(x, z, yaw, len = 1.5) { const d = this.d; d.position.set(x, 0.055, z); d.rotation.set(-Math.PI / 2, yaw, 0); d.scale.set(1, len, 1); d.updateMatrix(); this.mesh.setMatrixAt(this.i, d.matrix); this.i = (this.i + 1) % this.n; this.total++; this.mesh.count = Math.min(this.total, this.n); this.dirty = true; }
  flush() { if (this.dirty) { this.mesh.instanceMatrix.needsUpdate = true; this.dirty = false; } }
  dispose() { this.scene.remove(this.mesh); this.geo.dispose(); this.mat.dispose(); this.mesh.dispose && this.mesh.dispose(); }
}
