#!/usr/bin/env python3
"""Generates docs/*.md (02, 03, 04 from data modules; 00, 01, 05, 06 from docs_src templates), then docs/Sparkdrift-GP-Design-Package.html (+ .pdf if chrome available)."""
import json, re, os, sys, subprocess, html
sys.path.insert(0, os.path.dirname(__file__))
import roster_data as R, kart_data as K, track_data as T
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, "docs"); SRC = os.path.join(ROOT, "tools", "docs_src")
os.makedirs(DOCS, exist_ok=True)
PHYS = json.load(open(os.path.join(ROOT, "design", "physics.json")))
roster = R.parse(); bodies = K.bodies(); tracks = T.tracks()
# measured lengths for built slice tracks override the design target
SLICE_FILE = os.path.join(ROOT, "design", "slice_tracks.json")
slice_meas = json.load(open(SLICE_FILE)) if os.path.exists(SLICE_FILE) else {}
for t in tracks:
    if t["name"] in slice_meas:
        t["length"] = int(round(slice_meas[t["name"]]["length"])); t["laptime"] = round(t["length"]/t["avg"],1)
        t["asbuilt"] = True
SLICE_TRACK_NAMES = ["Buttercup Meadows","Lantern Harbor","Mirage Mesa","Frostbite Pass"]

# ---------- roster unlocks ----------
ACH = ["Win 50 races","Land 500 drift boosts","Hit 100 rivals with items","Collect 5,000 coins","Use the shortcut on every Seedling and Copper track",
       "Finish a Grand Prix without being hit","Win a Versus race with 4 humans","Perform 100 slingshots from a draft","Land 25 perfect starts","Win a gold Time Trial on 5 different tracks"]
def char_price(c): return 500 + 100*(c["set"]-1) + 60*(c["idx"]-1)
def unlock(c):
    if c["name"] in R.FREE_STARTERS: return ("Free starter", 0)
    i, s = c["idx"], c["set"]
    if i == 10: return (f"Achievement: {ACH[s-1]}", 0)
    if i == 5:  return (f"Trophy: gold in the {R.CUPS[(s-1)%4]} (150cc or higher)", 0)
    if i == 8:  return (f"Daily challenge streak: {3+s} days", 0)
    p = char_price(c); return (f"{p:,} coins", p)
for c in roster:
    c["unlock"], c["price"] = unlock(c); c["free"] = c["name"] in R.FREE_STARTERS

def fmt(v):
    if isinstance(v, float) and v == int(v) and abs(v) >= 10: return str(int(v))
    return str(v)
def resolve(path):
    cur = PHYS
    for k in path.split("."): cur = cur[k]
    return cur
def sub_phys(text):
    def rep(m):
        tok = m.group(1).strip()
        if tok.startswith("pct:"):
            return f"{round(resolve(tok[4:])*100)}%"
        v = resolve(tok)
        if isinstance(v, list): return " / ".join(fmt(x) for x in v)
        return fmt(v)
    return re.sub(r"\{\{([a-zA-Z0-9_.:\[\]]+)\}\}", lambda m: rep(m) if not m.group(1).isupper() and not m.group(1).startswith(("ECONOMY","HOURS","SLICE")) else m.group(0), text)

def md_table(headers, rows):
    out = ["| " + " | ".join(headers) + " |", "|" + "|".join("---" for _ in headers) + "|"]
    for r in rows: out.append("| " + " | ".join(str(x).replace("|","/") for x in r) + " |")
    return "\n".join(out)

# ---------- 02 roster ----------
def gen_roster():
    L = ["# Roster: 100 Original Characters", "",
         "Ten themed sets of ten. Every character has a name, a class (Light / Medium / Heavy), a one-line personality, an idle animation, a victory pose, a select-screen portrait and a **distinct driving silhouette** (a head/body shape hook readable at thumbnail size). All characters are original creations.", "",
         "## Class split", "",
         md_table(["Class","Count","Gameplay role"],
                  [[c, sum(1 for x in roster if x["cls"]==c), d] for c,d in
                   [("Light","Fast acceleration, quick spin-out recovery, weak in bumps"),("Medium","Balanced"),("Heavy","Slow acceleration, high top speed, strong bump")]]),
         "", f"**Total: {len(roster)} characters, {len({c['name'] for c in roster})} unique names, {sum(c['free'] for c in roster)} free starters.**", "",
         "## Free starters (12)", "",
         md_table(["Name","Class","Set"], [[c["name"],c["cls"],c["setname"]] for c in roster if c["free"]]), "",
         "## Unlock methods", "",
         "* **Coins** (about 60 characters): price = 500 + 100 × (set − 1) + 60 × (position in set − 1).",
         "* **Trophies**: position 5 in each set requires a gold trophy in a named cup (cups rotate).",
         "* **Daily challenge streak**: position 8 in each set unlocks after a streak of 3 + set number days.",
         "* **Achievements**: position 10 in each set (the set \"capstone\") requires a set-specific achievement:", ""]
    L += [f"  * Set {i+1} ({R.SETS[i][0]}): {a}" for i,a in enumerate(ACH)]
    L += ["", "Voices: each character has 10+ barks in a distinct voice (Light = higher pitch band, Heavy = lower), see the audio section of the GDD.", ""]
    for si,(sname,sdesc,_) in enumerate(R.SETS, start=1):
        L += [f"## Set {si}: {sname}", "", sdesc, ""]
        rows = []
        for c in [x for x in roster if x["set"]==si]:
            rows.append([c["id"], f"**{c['name']}**" + (" ★" if c["free"] else ""), c["cls"], c["personality"], c["idle"], c["victory"], c["silhouette"], c["unlock"]])
        L.append(md_table(["#","Name","Class","Personality","Idle","Victory pose","Silhouette hook","Unlock"], rows)); L.append("")
    L += ["★ = free starter.", ""]
    return "\n".join(L)

# ---------- 03 karts ----------
def clamp(v, a=1, b=10): return max(a, min(b, v))
def derived(S, A):
    vmax = PHYS["topSpeed"]["base"] + PHYS["topSpeed"]["perStat"]*S
    t90 = PHYS["accel"]["t90Base"] - PHYS["accel"]["t90PerStat"]*A
    return vmax, t90
def gen_karts():
    wh = K.wheels(); sp = K.parse_mods(K.SPOILERS_RAW); ex = K.parse_mods(K.EXHAUSTS_RAW); bu = K.parse_mods(K.BUMPERS_RAW)
    L = ["# Kart and Modification Matrix", "",
         f"**{len(bodies)} kart bodies** in 6 families of 7, plus separate wheel sets ({len(wh)} styles × 5 sizes × {len(K.RIM_COLORS)} colours × {len(K.RIM_FINISHES)} finishes), {len(sp)} spoilers, {len(ex)} exhausts, {len(bu)} bumpers, {len(K.DECALS)} decals and {len(K.PAINT_COLORS)} paint colours × {len(K.PAINT_FINISHES)} finishes with {len(K.TWO_TONE)} two-tone layouts. Every kart can be modified. Every combination is legal.", "",
         "## Stat model", "",
         "Stats are 1 to 10: **S** top speed, **A** acceleration, **H** handling, **G** drift grip, **W** weight. **Rule: every body has S + A + H + G = 22** (no body is strictly better). Weight is free (1 to 10) and trades bump strength against acceleration feel.", "",
         f"Final stat = body + character class modifier + wheel + wheel size + spoiler + exhaust + bumper. The sum of mods on each stat is capped at ±{PHYS['modCapPerStat']}. Paint, decals and rim colour never change stats.", "",
         md_table(["Stat","Formula","Range"],
            [["Top speed (S)", "34 + 1.2·S m/s", "35.2 to 46.0 m/s"],["Acceleration (A)","t90 = 6.4 − 0.38·A s", "6.0 s to 2.6 s"],
             ["Handling (H)","yaw cap scaled (0.72 + 0.03·H)","tighter turns"],["Grip (G)","lat. accel 18 + 1.6·G m/s²","19.6 to 34 m/s²"],["Weight (W)","mass 0.7 + 0.12·W","0.82 to 1.9"]]), "",
         "## Kart bodies", ""]
    rows = []
    for i,b in enumerate(bodies, start=1):
        v,t = derived(b["S"], b["A"])
        rows.append([i, f"**{b['name']}**", b["family"], b["S"], b["A"], b["H"], b["G"], b["W"], b["S"]+b["A"]+b["H"]+b["G"], f"{v:.1f}", f"{t:.2f}", "Free" if b["price"]==0 else f"{b['price']:,}", b["desc"]])
    L.append(md_table(["#","Body","Family","S","A","H","G","W","Sum(S+A+H+G)","Top speed m/s (Medium class)","0 to 90% s","Price (coins)","Description"], rows))
    L += ["", "### Family traits", ""]
    L.append(md_table(["Family","Identity","Typical strength","Typical weakness"],
        [["Cruiser","Friendly all-rounders","balanced","no standout"],["Dart","Spear-nosed speedsters","top speed","slow acceleration"],["Drifter","Low wedges and boats","handling + grip","low top speed"],
         ["Bruiser","Armoured bricks","weight, top speed","slow acceleration, poor handling"],["Rocket","Bottles, flames, springs","acceleration","handling"],["Oddball","Props and fun shapes","unique trade-offs","uneven"]]))
    L += ["", "Free starter bodies: " + ", ".join(b["name"] for b in bodies if b["price"]==0) + ".", ""]
    # wheels
    L += ["## Wheels", "", f"**{len(wh)} rim styles.** Deltas below are for the 14\" size; apply the size table on top.", ""]
    L.append(md_table(["Style","Tire compound","S","A","H","G","W","Off-road","Description","Price"],
        [[f"**{w['name']}**", w["tire"], f"{w['S']:+g}", f"{w['A']:+g}", f"{w['H']:+g}", f"{w['G']:+g}", f"{w['W']:+g}", f"{w['off']:+g}", w["desc"], "Free" if w["price"]==0 else f"{w['price']:,}"] for w in wh]))
    L += ["", "### Wheel sizes (all styles)", "", md_table(["Size","S","A","H","G","W"], [[s[0]]+[f"{x:+g}" for x in s[1:]] for s in K.WHEEL_SIZES]), "",
          "Small wheels accelerate faster and turn tighter; large wheels have a higher top speed. Wheels are swappable on any kart. \"Off-road\" modifies the off-road top-speed multiplier by that fraction of the penalty recovered (+1.0 recovers 25 points of the 45% slow-down on grass).", "",
          "### Rim colours and finishes (cosmetic)", "", "Colours: " + ", ".join(K.RIM_COLORS) + ".", "", "Finishes: " + ", ".join(K.RIM_FINISHES) + ".", ""]
    # others
    for title, items in [("Spoilers", sp), ("Exhausts", ex), ("Bumpers", bu)]:
        L += [f"## {title}", "", md_table(["Name","S","A","H","G","W","Description","Price"],
              [[f"**{m['name']}**", f"{m['S']:+g}", f"{m['A']:+g}", f"{m['H']:+g}", f"{m['G']:+g}", f"{m['W']:+g}", m["desc"], "Free" if m["price"]==0 else f"{m['price']:,}"] for m in items]), ""]
    L += ["## Paint, decals and finishes (cosmetic only, no stats)", "",
          "**Paint colours (" + str(len(K.PAINT_COLORS)) + "):** " + ", ".join(K.PAINT_COLORS) + ".", "",
          "**Finishes (" + str(len(K.PAINT_FINISHES)) + "):** " + ", ".join(K.PAINT_FINISHES) + " (Gloss free; others 300 coins each).", "",
          "**Two-tone layouts (" + str(len(K.TWO_TONE)) + "):** " + ", ".join(K.TWO_TONE) + ".", "",
          "**Decals (" + str(len(K.DECALS)) + "):** " + ", ".join(K.DECALS) + ".", "",
          "Prices: paint colour 50 coins, finish 300, two-tone 200, decal 80.", ""]
    # slot-to-stat matrix
    L += ["## Which slot affects which stat", ""]
    L.append(md_table(["Slot","S","A","H","G","W","Notes"],
        [["Body","●","●","●","●","●","Sets the base; sum of S+A+H+G fixed at 22"],["Character class","●","●","●","●","●","Light / Medium / Heavy modifiers"],
         ["Wheel style","●","●","●","●","●","Plus tire compound off-road behaviour"],["Wheel size","●","●","●","●","●","12\" to 16\""],["Spoiler","●","●","●","●","●",""],["Exhaust","●","●","●","●","●",""],["Bumper","●","●","●","●","●","Best for weight"],
         ["Paint / decal / rim colour","","","","","","Cosmetic only"]]))
    L.append("")
    # extreme builds
    def best(stat):
        bw = max(wh, key=lambda w:w[stat]); bs = max(sp, key=lambda m:m[stat]); be = max(ex, key=lambda m:m[stat]); bb = max(bu, key=lambda m:m[stat])
        tot = min(PHYS["modCapPerStat"], bw[stat]+bs[stat]+be[stat]+bb[stat]+max(s[1+"SAHGW".index(stat)] for s in K.WHEEL_SIZES))
        return bw["name"], bs["name"], be["name"], bb["name"], tot
    L += ["## Mod extremes (to check the cap)", ""]
    rows = []
    for st,nm in [("S","Top speed"),("A","Acceleration"),("H","Handling"),("G","Grip"),("W","Weight")]:
        w,s,e,b,tot = best(st); rows.append([nm, w, s, e, b, f"{tot:+.2f} (capped at ±{PHYS['modCapPerStat']})"])
    L.append(md_table(["Stat","Best wheel","Best spoiler","Best exhaust","Best bumper","Total mod"], rows)); L.append("")
    # economy totals
    return "\n".join(L), wh, sp, ex, bu

# ---------- 04 tracks ----------
def mmss(s): s = int(round(s)); return f"{s//60}:{s%60:02d}"
def gen_tracks():
    L = ["# Tracks: 20 Original Tracks", "",
         "Four cups of four tracks plus four bonus tracks. Every track has: a distinct theme, a clear racing line, **at least one risky shortcut**, a hazard, a landmark you can recognise at a glance, item rows that do not spawn unfairly on the first corner (the first row is never within 120 m of the grid and never inside a corner), and a **mirror and reverse** variant.", "",
         "Lap times are for a Medium-class kart on 150cc with an average-skill driver (length ÷ average speed). Tracks marked *as built* have been measured from the playable web slice's actual track spline.", "",
         "## Overview", ""]
    rows = []
    for t in tracks:
        rows.append([t["id"], f"**{t['name']}**", t["cup"], t["theme"], f"{t['length']:,} m" + (" (as built)" if t.get("asbuilt") else ""), mmss(t["laptime"]), mmss(t["laptime"]*3), f"{t['bpm']} BPM {t['key']}"])
    L.append(md_table(["#","Track","Cup","Theme","Length","Lap time","3 laps","Music"], rows)); L.append("")
    L += ["## Cups", ""]
    for cup in R.CUPS + ["Bonus"]:
        ts = [t for t in tracks if t["cup"]==cup]
        L.append(f"* **{cup}**: " + ", ".join(t["name"] for t in ts))
    L += ["", "Shortest track: " + min(tracks, key=lambda t:t["length"])["name"] + f" ({min(t['length'] for t in tracks):,} m). Longest: " + max(tracks, key=lambda t:t["length"])["name"] + f" ({max(t['length'] for t in tracks):,} m).", "",
          "## Design rules for every track", "",
          "1. **Racing line:** the line is readable from the road colour/texture and bright edge markings; no blind apexes in the first three seconds after the start.",
          "2. **Shortcut:** every track has a risky shortcut with a visible entry (arrow + gate or different ground). It saves 1.5 to 3.5 s with a boost and costs time without one.",
          "3. **Hazard:** telegraphed 1 to 2 s before it can hurt; every hazard has a visual language (pulse decal, sound cue).",
          "4. **Item rows:** the first row is at least 120 m after the grid and not in a corner; rows are placed after a corner exit, before shortcuts, and never inside a hazard. Rows are 4 to 6 orbs wide.",
          "5. **Variants:** *Mirror* flips left/right (and the signage). *Reverse* runs the track backwards; start line, rows, hazards and the shortcut entry are re-authored.",
          "6. **Anti-gravity / banked sections** appear only on Zenith Ring and Neon Metro Loop and stay readable with strong glow-line borders.", ""]
    for t in tracks:
        L += [f"## {t['id']}. {t['name']}", "",
              f"* **Cup:** {t['cup']}",
              f"* **Theme:** {t['theme']}",
              f"* **Length:** {t['length']:,} m" + (" (measured from the built web slice)" if t.get("asbuilt") else "") + f" · **Lap time:** {mmss(t['laptime'])} · **3 laps:** {mmss(t['laptime']*3)}",
              f"* **Signature shortcut:** {t['shortcut']}",
              f"* **Hazard:** {t['hazard']}",
              f"* **Landmark:** {t['landmark']}",
              f"* **Item-box notes:** {t['items']}",
              f"* **Mirrored / reverse variant:** Mirror flips the layout; {t['reverse']}",
              f"* **Music:** {t['bpm']} BPM, {t['key']}",
              f"* **Ambience:** {t['ambience']}", ""]
    return "\n".join(L)

def economy(wh, sp, ex, bu):
    char_coins = sum(c["price"] for c in roster)
    body_coins = sum(b["price"] for b in bodies)
    wheel_coins = sum(w["price"] for w in wh); sp_c = sum(m["price"] for m in sp); ex_c = sum(m["price"] for m in ex); bu_c = sum(m["price"] for m in bu)
    cosm = len(K.PAINT_COLORS)*50 + (len(K.PAINT_FINISHES)-1)*300 + len(K.TWO_TONE)*200 + len(K.DECALS)*80
    n_coin_chars = sum(1 for c in roster if c["price"]>0)
    parts = wheel_coins + sp_c + ex_c + bu_c
    total = char_coins + body_coins + parts + cosm
    rows = [["Characters (coin-bought: %d of 100)" % n_coin_chars, f"{char_coins:,}"], ["Kart bodies (%d)" % len(bodies), f"{body_coins:,}"],
            ["Wheel styles (sizes and rim colours free)", f"{wheel_coins:,}"], ["Spoilers", f"{sp_c:,}"], ["Exhausts", f"{ex_c:,}"], ["Bumpers", f"{bu_c:,}"],
            ["Paint, finishes, two-tones, decals", f"{cosm:,}"], ["**Everything**", f"**{total:,}**"]]
    t = md_table(["Category","Total coins to buy everything"], rows)
    per_min = 45.0
    return t, round(char_coins/per_min/60), round(total/per_min/60), total

def link_fix(s): return s
def main():
    roster_md = gen_roster(); open(f"{DOCS}/02-roster.md","w").write(roster_md)
    kart_md, wh, sp, ex, bu = gen_karts(); open(f"{DOCS}/03-kart-and-mod-matrix.md","w").write(kart_md)
    open(f"{DOCS}/04-tracks.md","w").write(gen_tracks())
    etable, hrs_chars, hrs_all, total = economy(wh, sp, ex, bu)
    slice_txt = ", ".join(f"{n} ({slice_meas[n]['length']:.0f} m)" if n in slice_meas else n for n in SLICE_TRACK_NAMES)
    for src, dst in [("00.md","00-README.md"),("01.md","01-game-design-document.md"),("05.md","05-vertical-slice-plan.md"),("06.md","06-production-risks-perf.md")]:
        txt = open(f"{SRC}/{src}").read()
        txt = sub_phys(txt)
        txt = txt.replace("{{ECONOMY_TABLE}}", etable).replace("{{HOURS_CHARS}}", str(hrs_chars)).replace("{{HOURS_ALL}}", str(hrs_all)).replace("{{SLICE_TRACKS}}", slice_txt)
        left = re.findall(r"\{\{[^}]*\}\}", txt)
        assert not left, (dst, left[:5])
        open(f"{DOCS}/{dst}","w").write(txt)
    print("docs written; economy total coins", total)
    build_html()

def md2html(md):
    import markdown
    return markdown.markdown(md, extensions=["tables","fenced_code","sane_lists"])
CSS = """body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:1180px;margin:0 auto;padding:24px;color:#1b1f2a;line-height:1.5}
h1{border-bottom:4px solid #ff7a1a;padding-bottom:6px;color:#14213d} h2{color:#0b6e99;margin-top:2em;border-bottom:1px solid #dde} h3{color:#444}
table{border-collapse:collapse;margin:12px 0;font-size:12.5px;width:100%} th,td{border:1px solid #cfd6e0;padding:4px 7px;vertical-align:top} th{background:#14213d;color:#fff;text-align:left} tr:nth-child(even) td{background:#f4f7fb}
code,pre{background:#eef2f7;border-radius:4px} pre{padding:10px;overflow:auto} code{padding:1px 4px} .doc{page-break-before:always} nav a{margin-right:10px}
@media print{body{max-width:none;padding:0} table{font-size:9px}}"""
def build_html():
    names = ["00-README","01-game-design-document","02-roster","03-kart-and-mod-matrix","04-tracks","05-vertical-slice-plan","06-production-risks-perf"]
    parts = []; nav = []
    for i,n in enumerate(names):
        md = open(f"{DOCS}/{n}.md").read()
        parts.append(f'<section class="doc" id="{n}">' + md2html(md) + "</section>"); nav.append(f'<a href="#{n}">{n}</a>')
    page = f"<!doctype html><html lang='en'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>Sparkdrift GP: Design Package</title><style>{CSS}</style></head><body><h1>Sparkdrift GP: Design Package</h1><nav>{' '.join(nav)}</nav>{''.join(parts)}</body></html>"
    out = f"{DOCS}/Sparkdrift-GP-Design-Package.html"; open(out,"w").write(page)
    pdf = f"{DOCS}/Sparkdrift-GP-Design-Package.pdf"
    try:
        subprocess.run(["google-chrome","--headless=new","--no-sandbox","--disable-gpu",f"--print-to-pdf={pdf}","--no-pdf-header-footer","--virtual-time-budget=5000",f"file://{out}"], check=True, timeout=120, capture_output=True)
        print("pdf", os.path.getsize(pdf))
    except Exception as e: print("pdf failed", e)
if __name__ == "__main__": main()
