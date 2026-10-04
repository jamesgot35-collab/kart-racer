// Records the master bus (MediaRecorder on AudioContext destination tap) during a real race and analyses loudness with ffmpeg.
import { serve, launch } from '../tools/apptest.mjs';
import fs from 'fs'; import { execSync } from 'child_process';
const [,, track = 'meadow', secs = '25', tag = ''] = process.argv;
const { srv, port } = await serve(); const { b, pg, logs } = await launch(480, 270, { mobile: true });
await pg.goto(`http://localhost:${port}/index.html?autostart=1&track=${track}`);
await pg.waitForFunction('window.__app && __app.race', { timeout: 90000 });
await pg.evaluate(() => { const s = __audio.captureStream(); window.__chunks = []; const mr = new MediaRecorder(s, { mimeType: 'audio/webm;codecs=opus' }); mr.ondataavailable = e => e.data.size && window.__chunks.push(e.data); mr.start(500); window.__mr = mr; });
await new Promise(r => setTimeout(r, +secs * 1000));
const info = await pg.evaluate(async () => { __mr.stop(); await new Promise(r => setTimeout(r, 400)); const blob = new Blob(__chunks, { type: 'audio/webm' }); const buf = new Uint8Array(await blob.arrayBuffer()); let s = ''; for (let i = 0; i < buf.length; i += 32768) s += String.fromCharCode.apply(null, buf.subarray(i, i + 32768)); return { b64: btoa(s), state: __app.race.state, t: __app.race.t, voices: __audio.voices, st: __audio.ctx.state }; });
const f = `/workspace/kart-racer/tests/results/audio_${track}${tag}.webm`; fs.mkdirSync('/workspace/kart-racer/tests/results', { recursive: true }); fs.writeFileSync(f, Buffer.from(info.b64, 'base64'));
console.log('race', info.state, info.t.toFixed(1), 'voices', info.voices, 'ctx', info.st, 'file', fs.statSync(f).size);
const out = execSync(`ffmpeg -hide_banner -nostats -i ${f} -af ebur128=peak=true,astats=metadata=0 -f null - 2>&1 | tail -40`).toString();
const pick = out.split('\n').filter(l => /I:|LRA:|Peak:|Peak level dB|RMS level dB|Flat factor|Number of samples|Duration/.test(l)).join('\n');
console.log(pick); fs.writeFileSync(f.replace('.webm', '.txt'), `track ${track} race t=${info.t.toFixed(1)} voices=${info.voices}\n` + pick + '\n');
console.log('console issues:', logs.length, logs.slice(0, 5).join('\n')); await b.close(); srv.close();
