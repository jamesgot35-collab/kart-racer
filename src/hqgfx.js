// High-quality graphics pack loader: 4K PBR ground/road textures (downscaled to what the device can afford), fetched from the Pages HQ repo and cached.
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
const SETS = ['ground', 'road'];
export function hqTexBudget(renderer) {
  const maxTex = renderer.capabilities.maxTextureSize || 4096; const coarse = matchMedia('(pointer:coarse)').matches; const mem = navigator.deviceMemory || (coarse ? 4 : 8);
  const cap = coarse || mem <= 4 ? 2048 : 4096; return Math.min(cap, maxTex);
}
export function hqTrackFiles(track) { const f = []; for (const s of SETS) for (const k of ['albedo.jpg', 'normal.png', 'rough.jpg']) f.push(`tex/${track}/${s}_${k}`); return f; }
export async function loadHQTrackTextures(track, renderer, audio, onProgress) {
  const manifest = audio.hqManifest; if (!manifest || !manifest.files[`tex/${track}/ground_albedo.jpg`]) return null;
  const size = hqTexBudget(renderer); const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy()); const files = hqTrackFiles(track); let done = 0; const out = {};
  await Promise.all(files.map(async (p) => {
    const ab = await audio._hqFetch(audio.hqBase(p)); if (!ab) throw new Error('fetch failed ' + p);
    const road = p.includes('/road_'); const isRough = p.endsWith('rough.jpg'); const full = (isRough ? 2048 : 4096) / (road ? 1 : 1);
    const w = road ? Math.min(2048, size) / (isRough ? 2 : 1) : size / (isRough ? 2 : 1), h = road ? w * 2 : w;
    const bmp = await createImageBitmap(new Blob([ab]), { resizeWidth: w, resizeHeight: h, resizeQuality: 'high', imageOrientation: 'flipY' });
    const t = new THREE.Texture(bmp); t.flipY = false; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = aniso; t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter; t.colorSpace = p.endsWith('albedo.jpg') ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.needsUpdate = true;
    const set = p.split('/')[2].split('_')[0], kind = p.split('_')[1].split('.')[0]; (out[set] ||= {})[kind] = t; done++; onProgress && onProgress(done / files.length);
  }));
  out.size = size; return out;
}

export async function loadHQEnv(track, audio) { // 4096x2048 HDR sky -> equirect env for reflections / image-based lighting
  const m = audio.hqManifest; if (!m || !m.files[`env/${track}.hdr`]) return null; const ab = await audio._hqFetch(audio.hqBase(`env/${track}.hdr`)); if (!ab) return null;
  const d = new RGBELoader().parse(ab); const t = new THREE.DataTexture(d.data, d.width, d.height, THREE.RGBAFormat, d.type); t.colorSpace = THREE.LinearSRGBColorSpace; t.minFilter = t.magFilter = THREE.LinearFilter; t.generateMipmaps = false; t.flipY = true; t.mapping = THREE.EquirectangularReflectionMapping; t.needsUpdate = true; return t;
}
