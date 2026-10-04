// Turtle-based closed-loop track designer: straights and arcs with exact radii, closed by adjusting two straights.
const D2R = Math.PI / 180;
export function runTurtle(prog, fixIdx = [0, 0], spacing = 14, lens = null) {
  // prog: [['F',len],['L',angDeg,radius],['R',angDeg,radius], ...]; fixIdx = indices of two straights to adjust for closure
  const P = JSON.parse(JSON.stringify(prog)); if (lens) for (const [i, v] of Object.entries(lens)) P[i][1] = v;
  const sim = (pr, collect) => {
    let x = 0, z = 0, psi = 0; const pts = collect ? [[x, z]] : null;
    for (const c of pr) {
      if (c[0] === 'F') {
        const n = Math.max(1, Math.round(c[1] / spacing));
        for (let k = 1; k <= n; k++) { const d = c[1] / n; x += Math.sin(psi) * d; z += Math.cos(psi) * d; if (collect) pts.push([x, z]); }
      } else {
        const left = c[0] === 'L'; const a = c[1] * D2R, r = c[2]; const ln = Math.max(0.0001, a * r); const n = Math.max(2, Math.round(ln / (spacing * 0.7)));
        const sgn = left ? 1 : -1; const cx = x + sgn * r * Math.cos(psi), cz = z - sgn * r * Math.sin(psi);
        for (let k = 1; k <= n; k++) {
          const ps = psi + sgn * a * (k / n); x = cx - sgn * r * Math.cos(ps); z = cz + sgn * r * Math.sin(ps); if (collect) pts.push([x, z]);
        }
        psi += sgn * a;
      }
    }
    return { x, z, psi, pts };
  };
  // heading closure check
  let net = 0; for (const c of P) if (c[0] === 'L') net += c[1]; else if (c[0] === 'R') net -= c[1];
  // closure: adjust straights a,b
  const r0 = sim(P, false); const [a, b] = fixIdx;
  // direction of straights a and b
  const dirAt = (idx) => { let psi = 0; for (let i = 0; i < idx; i++) { const c = P[i]; if (c[0] === 'L') psi += c[1] * D2R; else if (c[0] === 'R') psi -= c[1] * D2R; } return [Math.sin(psi), Math.cos(psi)]; };
  const da = dirAt(a), db = dirAt(b); const det = da[0] * db[1] - da[1] * db[0];
  if (Math.abs(det) < 0.2) throw new Error('fix straights are parallel');
  // want r0 + la*da + lb*db = 0
  const la = (-r0.x * db[1] + r0.z * db[0]) / det, lb = (-da[0] * r0.z + da[1] * r0.x) / det;
  P[a][1] += la; P[b][1] += lb;
  if (P[a][1] < 20 || P[b][1] < 20) throw new Error(`closure needs negative straight (${P[a][1].toFixed(0)}, ${P[b][1].toFixed(0)}), net turn ${net}`);
  const r1 = sim(P, true); const pts = r1.pts; pts.pop(); // drop duplicate end
  return { pts, net, adj: [la, lb], end: [r1.x, r1.z], prog: P };
}
export function shiftStart(pts, meters) { // rotate list so index 0 is `meters` along the loop
  let acc = 0, idx = 0; for (let i = 0; i < pts.length; i++) { const j = (i + 1) % pts.length; const d = Math.hypot(pts[j][0] - pts[i][0], pts[j][1] - pts[i][1]); if (acc + d >= meters) { idx = i; break; } acc += d; }
  const out = pts.slice(idx).concat(pts.slice(0, idx)); // center translate
  return out;
}
