#!/usr/bin/env python3
"""Verifies the design package: counts and cross-file consistency. Exit code 1 on failure."""
import re, os, sys, json
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D = ROOT + "/docs"
rd = lambda n: open(f"{D}/{n}").read()
ok = True
def check(cond, msg):
    global ok
    print(("PASS " if cond else "FAIL ") + msg); ok &= bool(cond)
# roster
r = rd("02-roster.md")
rows = [l for l in r.split("\n") if re.match(r"^\| \d+ \| \*\*", l)]
names = [re.match(r"^\| \d+ \| \*\*(.+?)\*\*", l).group(1) for l in rows]
check(len(names) == 100, f"roster rows = {len(names)} (need exactly 100)")
check(len(set(names)) == 100, f"unique roster names = {len(set(names))} (need 100)")
classes = [l.split("|")[3].strip() for l in rows]
check(set(classes) == {"Light","Medium","Heavy"}, f"classes {sorted(set(classes))}: " + ", ".join(f"{c}={classes.count(c)}" for c in sorted(set(classes))))
stars = sum(1 for l in rows if "★" in l.split("|")[2])
check(stars == 12, f"free starters marked = {stars} (need 12)")
sets = len(re.findall(r"^## Set \d+:", r, re.M)); check(sets == 10, f"themed sets = {sets} (need 10)")
for l in rows: check(len([c for c in l.split("|")[1:-1] if c.strip()]) == 8, "row complete: " + l.split("|")[2].strip()) if len([c for c in l.split("|")[1:-1] if c.strip()]) != 8 else None
# karts
k = rd("03-kart-and-mod-matrix.md")
krows = [l for l in k.split("\n") if re.match(r"^\| \d+ \| \*\*", l) and l.count("|") > 12]
bodies = [re.match(r"^\| \d+ \| \*\*(.+?)\*\*", l).group(1) for l in krows]
check(len(bodies) >= 40, f"kart bodies = {len(bodies)} (need >= 40)")
check(len(set(bodies)) == len(bodies), "body names unique")
bad = [l.split("|")[2] for l in krows if int(l.split("|")[9]) != 22]
check(not bad, f"all bodies have S+A+H+G = 22 {bad}")
# tracks
t = rd("04-tracks.md")
th = re.findall(r"^## (\d+)\. (.+)$", t, re.M)
check(len(th) == 20, f"tracks = {len(th)} (need exactly 20)")
check(len({n for _, n in th}) == 20, "track names unique")
cups = re.findall(r"^\* \*\*(.+? Cup|Bonus)\*\*: (.+)$", t, re.M)
check([len(c[1].split(", ")) for c in cups] == [4,4,4,4,4], f"cups: {[(c[0], len(c[1].split(', '))) for c in cups]}")
check(t.count("Signature shortcut") == 20 and t.count("* **Hazard:**") == 20 and t.count("Mirrored / reverse") == 20, "every track has shortcut, hazard, mirror/reverse")
# slice plan consistency
s = rd("05-vertical-slice-plan.md")
for n in ["Pip Thistledown","Fennel Vix","Juniper Wren","Bramble Quill","Clover Dash","Captain Dusk Marlowe","Marigold Hoofsworth","Gus Gantry"]:
    check(n in names, f"slice character exists in roster: {n}")
for n in ["Corsa Standard","Needle","Slidewinder","Ironclad","Pogo","Pumpkin Coach"]:
    check(n in bodies, f"slice kart exists: {n}")
for n in ["Buttercup Meadows","Lantern Harbor","Mirage Mesa","Frostbite Pass"]:
    check(n in [x for _, x in th], f"slice track exists: {n}")
g = rd("01-game-design-document.md")
check("{{" not in g and "}}" not in g, "no unresolved template tokens in GDD")
check(all(c in g for c in ["Seedling Cup","Copper Cup","Tempest Cup","Zenith Cup"]), "GDD names the four cups")
# room alphabet
alpha = re.search(r"`((?:[A-Z0-9] )+[A-Z0-9])`", g).group(1).split(" ")
check(len(alpha) == 20 and len(set(alpha)) == 20 and not set(alpha) & set("0O1ILQ5S2Z8B6G9V"), f"room alphabet {len(alpha)} unambiguous symbols: {''.join(alpha)}")
print("ALL OK" if ok else "FAILED"); sys.exit(0 if ok else 1)
