#!/usr/bin/env python3
"""Asset QA over the shipped standard audio (WAV/M4A): peak, RMS, clipping, silence, DC offset, loop seam click for loops."""
import soundfile as sf, numpy as np, json, glob, os, subprocess
res = {}; bad = []
def stats(x, sr):
    x = x if x.ndim == 1 else x.mean(1); pk = float(np.abs(x).max()); rms = float(np.sqrt((x**2).mean())+1e-12)
    return dict(sec=round(len(x)/sr,2), peak_db=round(20*np.log10(pk+1e-12),1), rms_db=round(20*np.log10(rms),1), dc=round(float(x.mean()),4), clipped=int((np.abs(x)>=0.999).sum()))
for grp in ['sfx','engine','amb','voice']:
    for f in sorted(glob.glob(f'audio/{grp}/**/*.wav', recursive=True)):
        x, sr = sf.read(f); s = stats(x, sr); n = f[6:]
        if x.ndim > 1: x = x.mean(1)
        if grp in ('engine','amb') or 'loop' in n:
            d = np.abs(np.diff(x)); seam = float(abs(x[0]-x[-1]) / (np.percentile(d, 99) + 1e-9)); s['seam_vs_p99_step'] = round(seam,2)
            if seam > 2.5: bad.append((n,'loop seam %.2fx typical step'%seam))
        if s['clipped'] > 0: bad.append((n,'clipped %d'%s['clipped']))
        if s['peak_db'] < -40: bad.append((n,'near silent'))
        if abs(s['dc']) > 0.01: bad.append((n,'DC %.3f'%s['dc']))
        res[n] = s
for f in sorted(glob.glob('audio/music/*/*.m4a')):
    raw = subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar','32000','-f','f32le','-'],capture_output=True).stdout; x = np.frombuffer(raw,np.float32); s = stats(x, 32000); res[f[6:]] = s
    if s['peak_db'] < -40: bad.append((f,'near silent'))
    if s['peak_db'] > 0.5: bad.append((f,'decoded peak %.1f dB (AAC overshoot)'%s['peak_db']))
json.dump({'files': len(res), 'problems': bad, 'detail': res}, open('tests/results/asset_qa.json','w'), indent=0)
print('files checked', len(res), 'problems', len(bad)); [print(' ', b) for b in bad[:30]]
pk = [v['peak_db'] for v in res.values()]; print('peak range', min(pk), max(pk))
