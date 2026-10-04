import { buildTrack, ALL_TRACKS as TRACK_ORDER, measureAll } from '../src/tracks.js';
import fs from 'fs';
const m = measureAll(); console.log(JSON.stringify(m, null, 1));
fs.writeFileSync(new URL('../design/slice_tracks.json', import.meta.url), JSON.stringify(m, null, 1));
for (const id of TRACK_ORDER) for (const mirror of [false, true]) for (const reverse of [false, true]) {
  const t = buildTrack(id, { mirror, reverse }); let bad = 0, hint = 0; const o = {};
  // drive the centerline and a racing-line offset: progress must be monotone and within corridor
  let prev = 0; for (let s = 0; s < t.length; s += 3) { const p = t.at(s, 3); const q = t.query(p.x, p.z, -1, o); if (Math.abs(o.lat - 3) > 0.3 || o.surface !== 'road') bad++; const ds = ((o.s - prev + t.length * 1.5) % t.length) - t.length * 0.5; if (s > 0 && (ds < -1 || ds > 8)) bad++; prev = o.s; }
  // shortcut midpoint query
  let scok = true; if (t.sc) { const mid = t.sc.p[Math.floor(t.sc.n / 2)]; const q = t.query(mid[0], mid[1], -1, o); scok = o.sc && !o.wall && o.s > Math.min(t.sc.s1, t.sc.s2) - 1 && o.surface === t.sc.surf; }
  // wall detection outside
  const p0 = t.at(500, t.limit + 2); t.query(p0.x, p0.z, -1, o); const wallok = o.wall;
  // rows / pads placements curvature
  console.log(id, mirror ? 'M' : '-', reverse ? 'R' : '-', 'len', t.length.toFixed(0), 'bad', bad, 'shortcut ok', scok, 'sc s1->s2', t.sc.s1.toFixed(0), t.sc.s2.toFixed(0), 'wall', wallok, 'rows', t.rows.map(Math.round).join(','));
}
