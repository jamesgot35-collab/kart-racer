// Generic headless driver. usage: node tools/apptest.mjs <script.json|inline> ; see runners in tests/
import puppeteer from 'puppeteer-core';
import http from 'http'; import fs from 'fs'; import path from 'path';
export async function serve(root = '/workspace/kart-racer') {
  const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.png': 'image/png', '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.flac': 'audio/flac', '.md': 'text/markdown' };
  const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p === '/') p = '/index.html'; const f = path.join(root, p); fs.stat(f, (e, st) => { if (e || !st.isFile()) { r.writeHead(404); r.end(); return; } const range = q.headers.range; const ext = path.extname(f); const h = { 'Content-Type': mime[ext] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*', 'Accept-Ranges': 'bytes' }; if (range) { const m = /bytes=(\d+)-(\d*)/.exec(range); const a = +m[1], b = m[2] ? +m[2] : st.size - 1; r.writeHead(206, { ...h, 'Content-Range': `bytes ${a}-${b}/${st.size}`, 'Content-Length': b - a + 1 }); fs.createReadStream(f, { start: a, end: b }).pipe(r); } else { r.writeHead(200, { ...h, 'Content-Length': st.size }); fs.createReadStream(f).pipe(r); } }); }).listen(0);
  return { srv, port: srv.address().port };
}
export async function launch(w = 844, h = 390, opts = {}) {
  const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', protocolTimeout: 900000, args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required', '--disable-features=PreloadMediaEngagementData,MediaEngagementBypassAutoplayPolicies', ...(opts.args || [])] });
  const pg = await b.newPage(); await pg.setViewport({ width: w, height: h, deviceScaleFactor: opts.dpr || 1, isMobile: !!opts.mobile, hasTouch: !!opts.mobile });
  const logs = []; pg.on('console', m => { const t = m.text(); if (m.type() === 'error' || m.type() === 'warning' && !/GPU stall|ReadPixels/.test(t)) logs.push(m.type() + ': ' + t.slice(0, 300)); }); pg.on('pageerror', e => logs.push('pageerror: ' + (e.stack || e.message).slice(0, 400)));
  pg.on('requestfailed', r => logs.push('requestfailed: ' + r.url().slice(0, 160)));
  pg.on('response', r => { if (r.status() >= 400) logs.push('http' + r.status() + ': ' + r.url().slice(0, 160)); });
  return { b, pg, logs };
}
