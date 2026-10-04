import * as esbuild from 'esbuild';
import fs from 'fs';
const entry = process.argv[2] || 'src/main.js'; const out = process.argv[3] || 'dist/app.js';
fs.mkdirSync('dist', { recursive: true });
const r = await esbuild.build({ entryPoints: [entry], bundle: true, minify: !process.env.DEV, sourcemap: false, format: 'esm', target: ['es2020'], outfile: out, loader: { '.json': 'json' }, metafile: true, legalComments: 'none', define: { 'process.env.NODE_ENV': '"production"' } });
const bytes = Object.values(r.metafile.outputs)[0].bytes; console.log('built', out, (bytes / 1024).toFixed(0) + ' KB');
