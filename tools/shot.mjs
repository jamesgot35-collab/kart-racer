// usage: node tools/shot.mjs <page> <outPng> <evalJS> [w h]
import puppeteer from 'puppeteer-core';
import http from 'http'; import fs from 'fs'; import path from 'path';
const [,, page, out, js, w = '1200', h = '900'] = process.argv;
const root = '/workspace/kart-racer';
const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p === '/') p = '/index.html'; const f = path.join(root, p); fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } const ext = path.extname(f); r.writeHead(200, { 'Content-Type': { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.png': 'image/png', '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.flac': 'audio/flac' }[ext] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*' }); r.end(d); }); }).listen(0);
const port = srv.address().port;
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
const pg = await b.newPage(); await pg.setViewport({ width: +w, height: +h });
pg.on('console', m => { const x=m.text(); if(!/404/.test(x)) console.log('[console]', m.type(), x.slice(0,300)); }); pg.on('pageerror', e => console.log('[pageerror]', e.message));
await pg.goto(`http://localhost:${port}/${page}`); await pg.waitForFunction('window.ready===true', { timeout: 30000 });
const r = await pg.evaluate(js); console.log('result', JSON.stringify(r));
await pg.screenshot({ path: out }); await b.close(); srv.close();
