// Verifies Chrome decodes every standard music stem to the same loop length (no AAC priming drift) and reports decoded memory.
import { serve, launch } from '../tools/apptest.mjs'; import fs from 'fs';
const { srv, port } = await serve(); const { b, pg, logs } = await launch(480, 270);
await pg.goto(`http://localhost:${port}/index.html`); await pg.waitForSelector('#goBtn');
const r = await pg.evaluate(async () => {
  await __audio.unlock(); const out = {}; let mem = 0;
  for (const piece of ['menu', 'buttercup', 'lantern', 'mirage', 'frost']) {
    const meta = await (await fetch(`audio/music/${piece}/meta.json`)).json(); const row = { loop: meta.loopSeconds, stems: {} };
    for (const st of ['drums', 'bass', 'chords', 'lead', 'counter', 'fx']) { const ab = await (await fetch(`audio/music/${piece}/${st}.m4a`)).arrayBuffer(); const buf = await __audio.ctx.decodeAudioData(ab); row.stems[st] = { dur: +buf.duration.toFixed(4), ch: buf.numberOfChannels, mb: +(buf.length * buf.numberOfChannels * 4 / 1048576).toFixed(1), diffMs: +((buf.duration - meta.loopSeconds) * 1000).toFixed(2) }; if (piece === 'buttercup') mem += buf.length * buf.numberOfChannels * 4; }
    out[piece] = row;
  }
  return { sampleRate: __audio.ctx.sampleRate, out, perPieceMB: +(mem / 1048576).toFixed(1) };
});
console.log(JSON.stringify(r)); const maxDiff = Math.max(...Object.values(r.out).flatMap(p => Object.values(p.stems).map(s => Math.abs(s.diffMs)))); console.log('max |decoded - loopSeconds| ms =', maxDiff, ' ctx rate', r.sampleRate, ' decoded MB per piece', r.perPieceMB);
fs.writeFileSync('tests/results/music_decode.json', JSON.stringify(r, null, 1)); console.log('errors', logs); await b.close(); srv.close();
