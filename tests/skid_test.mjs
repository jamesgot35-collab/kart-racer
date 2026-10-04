import { serve, launch } from '../tools/apptest.mjs';
const { srv, port } = await serve(); const { b, pg, logs } = await launch(480, 300, {});
await pg.goto(`http://localhost:${port}/simtest.html`); await pg.waitForFunction('window.ready', { timeout: 60000 });
const r = await pg.evaluate(() => { const o = window.runSim('harbor', 45, { cpuLocal: true, laps: 3 }); const k = window.race.localKart; let best = 0; return { errors: o.errors, skids: window.race.skids.total, count: window.race.skids.mesh.count }; });
console.log(JSON.stringify(r), logs); 
const m = await pg.evaluate(() => { const race = window.race; const mesh = race.skids.mesh; const e = new Float32Array(16); let best = null; for (let i = 0; i < mesh.count; i++) { mesh.getMatrixAt(i, new (race.camera.matrix.constructor)()); }
  const mm = new (race.camera.matrix.constructor)(); mesh.getMatrixAt(mesh.count - 40, mm); const x = mm.elements[12], z = mm.elements[14]; race.camera.position.set(x + 3, 3.2, z + 3); race.camera.lookAt(x, 0, z); race.camera.updateMatrixWorld(); return new Promise(res => requestAnimationFrame(() => { race.renderer.render(race.scene, race.camera); requestAnimationFrame(() => res([x, z])); })); });
console.log('looking at skids near', m); await pg.screenshot({ path: '/tmp/skid.png' }); await b.close(); srv.close();
