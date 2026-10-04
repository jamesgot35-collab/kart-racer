#!/usr/bin/env python3
"""Per-second loudness + spectral centroid of the captured master bus, to show the mix evolves (countdown -> racing) and is not clipped/silent."""
import subprocess, numpy as np, sys, json
f = sys.argv[1]
raw = subprocess.run(['ffmpeg','-v','error','-i',f,'-af','pan=mono|c0=0.5*c0+0.5*c1','-ar','48000','-f','f32le','-'],capture_output=True).stdout
x = np.frombuffer(raw, np.float32); sr = 48000; rows = []
for s in range(len(x)//sr):
    seg = x[s*sr:(s+1)*sr]; rms = 20*np.log10(np.sqrt((seg**2).mean())+1e-9); sp = np.abs(np.fft.rfft(seg*np.hanning(len(seg)))); fr = np.fft.rfftfreq(len(seg),1/sr)
    rows.append({'sec': s, 'rms_db': round(float(rms),1), 'peak_db': round(float(20*np.log10(np.abs(seg).max()+1e-9)),1), 'centroid_hz': int((sp*fr).sum()/(sp.sum()+1e-9))})
print(json.dumps({'file': f, 'clipped_samples': int((np.abs(x)>=0.999).sum()), 'silent_seconds': sum(1 for r in rows if r['rms_db']<-60), 'seconds': rows}, indent=0)[:1800])
json.dump(rows, open(f.replace('.webm','_perSecond.json'),'w'))
