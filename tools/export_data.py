#!/usr/bin/env python3
"""Exports game data for the web build from the same sources as the docs -> src/gamedata.json"""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
import roster_data as R, kart_data as K
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAINT_HEX = ["#d7263d","#ff7a1a","#ffb400","#ffe347","#8bd800","#2fae4a","#7fe0b0","#13b3b3","#3fa9f5","#2457d6","#2a2f87","#7d4fd1","#b46ad8","#ff3f95","#ff9ec7","#ff6b57","#6b3f2a","#d9b97a","#f4f1ea","#c9d1d9","#5b6571","#16181d","#142a4f","#1f5a34","#a4472a","#ffb08a","#41d8e8","#bda9ee","#7d1633","#7b7d2a","#20c9b0","#e5b84a"]
RIM_HEX = ["#e8edf2","#5b6571","#e5b84a","#b0793a","#d7263d","#a31735","#ff7a1a","#ffe347","#8bd800","#7fe0b0","#13b3b3","#3fa9f5","#2457d6","#7d4fd1","#ff3f95","#f4f1ea","#16181d","rainbow"]
roster = R.parse(); bodies = K.bodies()
SLICE_BODIES = ["Corsa Standard","Needle","Slidewinder","Ironclad","Pogo","Pumpkin Coach","Wayfarer","Javelin","Skiff","Bulwark","Sparkplug","Teacup Twister"]
FREE_BODIES = {"Corsa Standard","Pogo","Slidewinder"}
data = dict(
  classMods = json.load(open(f"{ROOT}/design/physics.json"))["class"],
  characters = [dict(id=c["id"], name=c["name"], cls=c["cls"], setname=c["setname"], personality=c["personality"], idle=c["idle"], victory=c["victory"], silhouette=c["silhouette"],
                     free=c["name"] in R.FREE_STARTERS, playable=c["name"] in R.SLICE_PLAYABLE) for c in roster if c["name"] in R.FREE_STARTERS],
  bodies = [dict(b, slice=b["name"] in SLICE_BODIES, price=(0 if b["name"] in FREE_BODIES else (b["price"] if b["price"] else 400))) for b in bodies if b["name"] in SLICE_BODIES],
  wheels = K.wheels(), wheelSizes = [dict(size=s[0], S=s[1], A=s[2], H=s[3], G=s[4], W=s[5]) for s in K.WHEEL_SIZES],
  spoilers = K.parse_mods(K.SPOILERS_RAW), exhausts = K.parse_mods(K.EXHAUSTS_RAW), bumpers = K.parse_mods(K.BUMPERS_RAW),
  rimColors = [dict(name=n, hex=h) for n, h in zip(K.RIM_COLORS, RIM_HEX)], rimFinishes = K.RIM_FINISHES,
  paintColors = [dict(name=n, hex=h) for n, h in zip(K.PAINT_COLORS, PAINT_HEX)], paintFinishes = K.PAINT_FINISHES, twoTone = K.TWO_TONE, decals = K.DECALS,
  modCap = json.load(open(f"{ROOT}/design/physics.json"))["modCapPerStat"],
)
assert len(PAINT_HEX) == len(K.PAINT_COLORS) and len(RIM_HEX) == len(K.RIM_COLORS)
json.dump(data, open(f"{ROOT}/src/gamedata.json", "w"), indent=0)
print("exported", len(data["characters"]), "characters,", len(data["bodies"]), "bodies")
