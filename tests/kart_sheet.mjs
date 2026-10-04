// Contact sheet of all kart bodies (default builds, varied paint) -> shots/kart_sheet.png
import { serve, launch } from '../tools/apptest.mjs';
const { srv, port } = await serve(); const { b, pg, logs } = await launch(1200, 900, {});
await pg.goto(`http://localhost:${port}/viewer.html`); await pg.waitForFunction('window.ready', { timeout: 60000 });
await pg.evaluate(() => { const names = DATA.bodies.map(x => x.name); window.show(names.map((n, i) => ({ build: { ...window.defaultBuild(n), paint: (i * 5 + 1) % 32 }, char: DATA.characters[i].name }))); });
await pg.screenshot({ path: '/workspace/kart-racer/shots/kart_sheet.png' }); console.log('logs', logs.slice(0, 3)); await b.close(); srv.close();
