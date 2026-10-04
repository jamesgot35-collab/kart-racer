#!/usr/bin/env python3
"""Scan the staged HQ pack repos and write hq-manifest.json (path -> {r: repo key, b: bytes})."""
import os, json, sys
PACK = '/workspace/pack'
REPOS = {'a1': 'https://jamesgot35-collab.github.io/kart-racer-hq-audio-1/', 'a2': 'https://jamesgot35-collab.github.io/kart-racer-hq-audio-2/', 'g1': 'https://jamesgot35-collab.github.io/kart-racer-hq-gfx/', 'g2': 'https://jamesgot35-collab.github.io/kart-racer-hq-gfx-2/'}
files = {}; per = {}
for key in REPOS:
    root = os.path.join(PACK, key)
    if not os.path.isdir(root): continue
    for dp, dn, fn in os.walk(root):
        if '.git' in dp.split(os.sep): continue
        for f in fn:
            if f in ('README.md', '.nojekyll'): continue
            p = os.path.join(dp, f); rel = os.path.relpath(p, root).replace(os.sep, '/'); b = os.path.getsize(p)
            files[rel] = {'r': key, 'b': b}; per[key] = per.get(key, 0) + b
used = {k: v for k, v in REPOS.items() if k in per}
m = {'version': 1, 'repos': used, 'default': 'a2', 'files': files, 'bytesPerRepo': per, 'totalBytes': sum(per.values()), 'streamBytes': sum(v['b'] for k, v in files.items() if not k.endswith('/master.flac'))}
json.dump(m, open('/workspace/kart-racer/hq-manifest.json', 'w'), separators=(',', ':'))
print({k: round(v/1048576, 1) for k, v in per.items()}, 'total MB', round(m['totalBytes']/1048576, 1), 'files', len(files))
