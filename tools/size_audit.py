#!/usr/bin/env python3
"""Exact bytes of every git-tracked file in each published repo (= what GitHub Pages serves) + GitHub-reported sizes."""
import subprocess, os, json
repos = {'kart-racer': '/workspace/kart-racer', 'kart-racer-hq-audio-1': '/workspace/pack/a1', 'kart-racer-hq-audio-2': '/workspace/pack/a2', 'kart-racer-hq-gfx': '/workspace/pack/g1'}
tot = 0; rows = {}
for name, d in repos.items():
    files = subprocess.run(['git', 'ls-files', '-z'], cwd=d, capture_output=True).stdout.split(b'\0'); files = [f.decode() for f in files if f]
    b = sum(os.path.getsize(os.path.join(d, f)) for f in files); big = max(os.path.getsize(os.path.join(d, f)) for f in files)
    gh = subprocess.run(['gh', 'api', f'repos/jamesgot35-collab/{name}', '--jq', '.size'], capture_output=True, text=True).stdout.strip()
    rows[name] = {'files': len(files), 'bytes': b, 'MiB': round(b / 1048576, 1), 'largest_file_MiB': round(big / 1048576, 1), 'github_reported_KB': gh}; tot += b
    print(f"{name}: {len(files)} files, {b:,} bytes = {b/1048576:.1f} MiB (largest file {big/1048576:.1f} MiB; GitHub says {gh} KB)")
print(f"TOTAL: {tot:,} bytes = {tot/1048576:.1f} MiB = {tot/1e9:.3f} GB (decimal)")
json.dump({'repos': rows, 'total_bytes': tot}, open('/workspace/kart-racer/tests/results/size_audit.json', 'w'), indent=1)
