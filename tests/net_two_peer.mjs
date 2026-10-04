// App-level two-client test (host + joiner tabs in one headless Chrome): lobby UI, start/go handshake, snapshot sync, drop->CPU takeover.
// Transport is a BroadcastChannel PeerJS shim (tests/peer_shim.js) because this box's headless Chrome cannot gather WebRTC ICE candidates; the real PeerJS+WebRTC transport is covered by tests/net_node.mjs.
import { serve, launch } from '../tools/apptest.mjs'; import fs from 'fs';
const clk = (pg, sel) => pg.evaluate((q) => { const e = document.querySelector(q); if (!e) throw new Error('missing ' + q); e.click(); }, sel);
const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const out = { steps: [] }; const log = (...a) => { console.log(...a); out.steps.push(a.join(' ')); };
const { srv, port } = await serve(); const A = await launch(844, 390, { mobile: true }); const B = await launch(844, 390, { mobile: true });
await A.pg.exposeFunction('__shimSend', (m) => { B.pg.evaluate((m) => window.__shimRecv && window.__shimRecv(m), m).catch(() => { }); });
await B.pg.exposeFunction('__shimSend', (m) => { A.pg.evaluate((m) => window.__shimRecv && window.__shimRecv(m), m).catch(() => { }); });
const url = `http://localhost:${port}/shim.html`; await Promise.all([A.pg.goto(url), B.pg.goto(url)]);
for (const X of [A, B]) { await clk(X.pg, '#goBtn'); await X.pg.waitForFunction("__app.screen==='menu'", { timeout: 30000 }); await X.pg.evaluate(() => document.querySelector('[data-a=online]').click()); await X.pg.waitForSelector('#host'); }
await clk(A.pg, '#host'); await A.pg.waitForFunction("__app.net && __app.net.status!=='connecting'", { timeout: 20000 });
const st = await A.pg.evaluate(() => ({ s: __app.net.status, c: __app.net.code, e: __app.net.error })); log('host', JSON.stringify(st));
if (st.s !== 'open') { out.result = 'FAIL host signalling: ' + st.e; fs.writeFileSync('tests/results/net_two_peer.json', JSON.stringify(out, null, 1)); console.log(A.logs.join('\n')); process.exit(1); }
await sleep(500); await A.pg.screenshot({ path: 'shots/lobby_host_landscape.png' });
await B.pg.evaluate((c) => { document.querySelector('#code').value = c; }, st.c); await clk(B.pg, '#join');
await B.pg.waitForFunction("__app.net && __app.net.status!=='connecting'", { timeout: 30000 }); const sb = await B.pg.evaluate(() => ({ s: __app.net.status, e: __app.net.error })); log('client', JSON.stringify(sb));
await A.pg.waitForFunction("__app.net.members.length===2", { timeout: 20000 }); await sleep(800);
await clk(B.pg, '#rdy').catch(() => { }); await sleep(800); await A.pg.screenshot({ path: 'shots/lobby_host_2players.png' }); await B.pg.screenshot({ path: 'shots/lobby_client_landscape.png' });
log('members A', await A.pg.evaluate(() => JSON.stringify(__app.net.members.map(m => [m.pid, m.name, m.ready]))), 'members B', await B.pg.evaluate(() => JSON.stringify(__app.net.members.map(m => [m.pid, m.name, m.ready]))), 'rtt', await B.pg.evaluate(() => __app.net.stats.rtt));
await clk(A.pg, '#start');
await Promise.all([A, B].map(X => X.pg.waitForFunction("__app.race && __app.race.state==='racing'", { timeout: 120000 })));
log('both racing'); await sleep(+(process.argv[2] || 25) * 1000);
const snap = async (X) => X.pg.evaluate(() => { const r = __app.race; return { t: r.t, fps: __app.fps, karts: r.karts.map(k => [k.id, k.name, k.remote ? 'remote' : k.local ? 'local' : 'auth', +k.sim.x.toFixed(1), +k.sim.z.toFixed(1), +k.sim.s.toFixed(1)]), net: { ...__app.net.stats } }; });
const a = await snap(A), b = await snap(B); out.a = a; out.b = b;
const find = (s, id) => s.karts.find(k => k[0] === id);
const dist = (p, q) => Math.hypot(p[3] - q[3], p[4] - q[4]);
const d1 = dist(find(a, 1), find(b, 1)), d0 = dist(find(a, 0), find(b, 0)); log('A race t', a.t.toFixed(1), 'B race t', b.t.toFixed(1)); log('kart1 (client) pos A-view vs B-truth dist(m)', d1.toFixed(2), '| kart0 (host) pos B-view vs A-truth dist(m)', d0.toFixed(2)); log('traffic A', JSON.stringify(a.net), 'B', JSON.stringify(b.net));
log('kart roles A:', JSON.stringify(a.karts.filter(k => k[0] < 4))); log('kart roles B:', JSON.stringify(b.karts.filter(k => k[0] < 4)));
// disconnect test: B closes -> A takes over kart 1 as CPU
await A.pg.screenshot({ path: 'shots/net_race_host_view.png' }); await B.pg.screenshot({ path: 'shots/net_race_client_view.png' });
await B.pg.evaluate(() => __app.net.close()); await sleep(2500);
const role = await A.pg.evaluate(() => { const k = __app.race.karts.find(q => q.id === 1); return { remote: k.remote, auth: k.auth, cpu: k.cpu, hasAI: !!k.ai }; }); log('after B drops, kart1 on A:', JSON.stringify(role));
out.errors = { A: A.logs, B: B.logs }; const ok = sb.s === 'open' && d1 < 25 && d0 < 25 && role.hasAI && a.net.recv > 100 && b.net.recv > 100; out.result = ok ? 'PASS' : 'FAIL'; log('RESULT', out.result);
fs.mkdirSync('tests/results', { recursive: true }); fs.writeFileSync('tests/results/net_two_peer.json', JSON.stringify(out, null, 1));
console.log('A logs', A.logs.slice(0, 8).join('\n'), '\nB logs', B.logs.slice(0, 8).join('\n')); await A.b.close(); await B.b.close(); srv.close();
