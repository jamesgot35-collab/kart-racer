#!/usr/bin/env python3
"""Writes src/trackdefs.js from tools/progs.json + src/shortcuts.json (found by tools/findshortcuts.mjs) + hand-authored content."""
import json
progs = json.load(open('tools/progs.json')); sc = json.load(open('src/shortcuts.json'))
FIX = {"meadow": [0, 14], "harbor": [0, 2], "mesa": [12, 14], "frost": [2, 8], "dusk": progs["dusk"]["fix"], "neon": progs["neon"]["fix"], "ember": progs["ember"]["fix"], "aurora": progs["aurora"]["fix"]}
def shortcut(k, surf, width=11):
    c = sc[k]; E0, E1, X1, X0 = c['E0'], c['E1'], c['X1'], c['X0']
    mid = [(E1[0] + X1[0]) / 2, (E1[1] + X1[1]) / 2]
    q1 = [E1[0] + (X1[0] - E1[0]) * .33, E1[1] + (X1[1] - E1[1]) * .33]; q2 = [E1[0] + (X1[0] - E1[0]) * .67, E1[1] + (X1[1] - E1[1]) * .67]
    pts = [E0, E1, q1, mid, q2, X1, X0]
    return dict(pts=[[round(a, 2), round(b, 2)] for a, b in pts], width=width, surface=surf, s1=c['s1'], s2=c['s2'], side=c['sd'])
defs = {
 "meadow": dict(id="meadow", name="Buttercup Meadows", cup="Seedling Cup", order=1, theme="meadow", width=15, offroad=9, mapOrder=1, bpm=122, music="buttercup", amb="meadow", env="open",
    shortcut=shortcut("meadow", "rough"),
    rows=[0.13, 0.30, 0.50, 0.70, 0.88], pads=[0.22, 0.60], coinGroups=[0.08, 0.2, 0.34, 0.45, 0.56, 0.66, 0.77, 0.9],
    hazards=[dict(type="sheep", f=0.38)], zones=[], landmark=dict(type="windmill", f=0.05, lat=70)),
 "harbor": dict(id="harbor", name="Lantern Harbor", cup="Seedling Cup", order=2, theme="harbor", width=15, offroad=9, mapOrder=2, bpm=126, music="lantern", amb="harbor", env="metal",
    shortcut=shortcut("harbor", "rough"),
    rows=[0.12, 0.33, 0.48, 0.66, 0.85], pads=[0.2, 0.75], coinGroups=[0.06, 0.18, 0.3, 0.42, 0.55, 0.68, 0.8, 0.92],
    hazards=[dict(type="crane", f=0.10), dict(type="crane", f=0.80), dict(type="gate", at="shortcut")], zones=[], landmark=dict(type="lighthouse", f=0.4, lat=90)),
 "mesa": dict(id="mesa", name="Mirage Mesa", cup="Seedling Cup", order=3, theme="mesa", width=16, offroad=9, mapOrder=3, bpm=118, music="mirage", amb="mesa", env="canyon",
    shortcut=shortcut("mesa", "sand"),
    rows=[0.14, 0.36, 0.55, 0.74, 0.9], pads=[0.1, 0.63], coinGroups=[0.05, 0.17, 0.28, 0.4, 0.5, 0.6, 0.72, 0.83],
    hazards=[dict(type="boulder", f=0.45), dict(type="boulder", f=0.62)], zones=[], landmark=dict(type="arch", f=0.2, lat=60)),
 "frost": dict(id="frost", name="Frostbite Pass", cup="Seedling Cup", order=4, theme="frost", width=15, offroad=9, mapOrder=4, bpm=110, music="frost", amb="frost", env="ice",
    shortcut=shortcut("frost", "ice"),
    rows=[0.13, 0.32, 0.52, 0.72, 0.9], pads=[0.2, 0.8], coinGroups=[0.07, 0.19, 0.3, 0.42, 0.54, 0.65, 0.78, 0.89],
    hazards=[dict(type="icicle", f=0.28), dict(type="icicle", f=0.50), dict(type="icicle", f=0.86)], zones=[dict(f0=0.55, f1=0.62, surface="ice", onlyRoad=True, lat=[-4, 8])], landmark=dict(type="waterfall", f=0.6, lat=80)),
 "dusk": dict(id="dusk", name="Firefly Hollow", cup="Starlight Cup", order=5, theme="meadow", skin="dusk", width=15, offroad=9, mapOrder=5, bpm=122, music="buttercup", amb="meadow", env="open",
    shortcut=shortcut("dusk", "rough"),
    rows=[0.12, 0.3, 0.5, 0.68, 0.88], pads=[0.2, 0.62, 0.8], coinGroups=[0.07, 0.19, 0.3, 0.42, 0.53, 0.64, 0.75, 0.9],
    hazards=[dict(type="sheep", f=0.27), dict(type="sheep", f=0.72)], zones=[], landmark=dict(type="windmill", f=0.55, lat=70)),
 "neon": dict(id="neon", name="Neon Docks", cup="Starlight Cup", order=6, theme="harbor", skin="neon", width=15, offroad=9, mapOrder=6, bpm=126, music="lantern", amb="harbor", env="metal",
    shortcut=shortcut("neon", "rough"),
    rows=[0.12, 0.3, 0.5, 0.68, 0.87], pads=[0.22, 0.78], coinGroups=[0.06, 0.18, 0.3, 0.42, 0.55, 0.68, 0.8, 0.92],
    hazards=[dict(type="crane", f=0.17), dict(type="crane", f=0.62), dict(type="crane", f=0.9), dict(type="gate", at="shortcut")], zones=[], landmark=dict(type="lighthouse", f=0.8, lat=90)),
 "ember": dict(id="ember", name="Ember Canyon", cup="Starlight Cup", order=7, theme="mesa", skin="ember", width=16, offroad=9, mapOrder=7, bpm=118, music="mirage", amb="mesa", env="canyon",
    shortcut=shortcut("ember", "sand"),
    rows=[0.12, 0.34, 0.52, 0.72, 0.9], pads=[0.15, 0.66], coinGroups=[0.05, 0.17, 0.28, 0.4, 0.5, 0.6, 0.72, 0.83],
    hazards=[dict(type="boulder", f=0.3), dict(type="boulder", f=0.48), dict(type="boulder", f=0.8)], zones=[], landmark=dict(type="arch", f=0.4, lat=60)),
 "aurora": dict(id="aurora", name="Aurora Pass", cup="Starlight Cup", order=8, theme="frost", skin="aurora", width=15, offroad=9, mapOrder=8, bpm=110, music="frost", amb="frost", env="ice",
    shortcut=shortcut("aurora", "ice"),
    rows=[0.13, 0.32, 0.52, 0.72, 0.9], pads=[0.2, 0.8], coinGroups=[0.07, 0.19, 0.3, 0.42, 0.54, 0.65, 0.78, 0.89],
    hazards=[dict(type="icicle", f=0.22), dict(type="icicle", f=0.45), dict(type="icicle", f=0.68), dict(type="icicle", f=0.9)], zones=[dict(f0=0.12, f1=0.18, surface="ice", onlyRoad=True, lat=[-4, 8])], landmark=dict(type="waterfall", f=0.7, lat=80)),
}
for k, d in defs.items():
    p = progs[k]; d["prog"] = p["prog"]; d["fix"] = FIX[k]; d["start"] = p.get("start", 0); d["scale"] = p.get("scale", 1.0)
js = "// GENERATED by tools/mk_trackdefs.py. Layouts are turtle programs (straights/arcs) closed by two adjustable straights.\nexport const TRACK_DEFS = " + json.dumps(defs, indent=1) + ";\n"
open('src/trackdefs.js', 'w').write(js); print("ok")
