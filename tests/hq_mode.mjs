// High-quality mode: enables HQ in the save, starts a race, verifies lossless FLAC stems + 4K PBR textures + HDR env are really in use; screenshots.
import { serve, launch } from '../tools/apptest.mjs'; import fs from 'fs';
const track = process.argv[2] || 'meadow'; const { srv, port } = await serve(); const { b, pg, logs } = await launch(844, 390, { mobile: true }); const t0 = Date.now();
await pg.goto(`http://localhost:${port}/index.html`); await pg.waitForSelector('#goBtn');
await pg.evaluate(async () => { __app.save.settings.hq = true; __app.save.settings.quality = 'high'; __app.persist(); });
await pg.goto(`http://localhost:${port}/index.html?autostart=1&track=${track}&shot=1`); await pg.waitForFunction('window.__app && __app.race', { timeout: 300000, polling: 500 }); const tCreate = Date.now() - t0;
await pg.waitForFunction('__app.race.state==="racing"', { timeout: 120000, polling: 300 }); await new Promise(r => setTimeout(r, 6000));
const info = await pg.evaluate(() => { const v = __app.race.view; const rate = __audio.ctx.sampleRate; const keys = [...__audio.buffers.keys()]; const flac = keys.filter(k => k.startsWith('H:')).length; const mm = __audio.musicBufs ? __audio.musicBufs.map(b => [b.sampleRate, b.numberOfChannels]) : null;
  return { hqAudio: __audio.hq, ctxRate: rate, hqBuffers: flac, totalBuffers: keys.length, musicBufs: mm, texApplied: !!v.hqApplied, envApplied: !!v.hqEnvApplied, groundMap: v.groundMat.map && [v.groundMat.map.image.width, v.groundMat.map.image.height], normal: !!v.groundMat.normalMap, roadMap: v.roadMat.map && [v.roadMat.map.image.width, v.roadMat.map.image.height], failed: __audio.stats.failed, t: __app.race.t }; });
console.log(JSON.stringify(info)); await pg.screenshot({ path: `/workspace/kart-racer/shots/hq_${track}_landscape.png` });
const r = { track, tCreateMs: tCreate, ...info, errors: logs, pass: info.texApplied && info.envApplied && info.hqBuffers > 20 && info.ctxRate === 48000 && logs.length === 0 && info.failed.length === 0 };
fs.writeFileSync(`tests/results/hq_mode_${track}.json`, JSON.stringify(r, null, 1)); console.log(r.pass ? 'HQ PASS' : 'HQ FAIL', logs.slice(0, 5)); await b.close(); srv.close();
