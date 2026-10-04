#!/usr/bin/env python3
"""v1.1: unique Kokoro voice sets for the 12 added racers (same pipeline/processing as gen_voices.py). Writes /workspace/build/{std,hq}/voice/<id>/ and merges src into audio/voice/manifest.json."""
import os, sys, json
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gen_voices.py')).read()
head = src[:src.index('manifest = {"announcer"')]
exec(compile(head, 'gen_voices_head', 'exec'))
NEW = {
 "flurry":    ("af_nova",    1.15, 2.0, ["Brr, but I love it!", "Snow problem!", "Winter wonderland win!"]),
 "nova":      ("af_aoede",   1.15, 1.0, ["Cadet Nova, launching!", "Eat my exhaust!", "Mission accomplished!"]),
 "lulu":      ("bf_lily",    1.20, 3.0, ["Sweet as candy!", "Sugar rush, here I come!", "That's the sweetest win ever!"]),
 "pyra":      ("af_river",   1.10, 0.0, ["Feeling hot, hot, hot!", "Burn rubber!", "Too hot to handle!"]),
 "zorp":      ("am_puck",    1.25, 4.0, ["Bleep bloop zorp!", "Zorp zorp, beam me up!", "Bleep! Zorp wins!"]),
 "cogsworth": ("bm_daniel",  1.00, -1.0, ["Gears engaged.", "Wound up and ready!", "Right on schedule."]),
 "coral":     ("bf_emma",    1.10, 1.0, ["Diving right in!", "Catch the wave!", "Smooth sailing all the way!"]),
 "zahra":     ("bf_isabella", 1.00, 0.0, ["The desert wind guides me.", "Eat my sand!", "The sands favor me today."]),
 "grumbald":  ("am_eric",    0.85, -4.0, ["Grumble grumble. Let's go.", "Yeti or not, here I come!", "Hrrm. Nice."]),
 "nanuk":     ("am_echo",    0.90, -3.0, ["The cold doesn't scare me.", "Out of my way, chilly!", "Warm victory."]),
 "scarab":    ("am_liam",    0.95, -1.0, ["Sun and sand!", "Shine on, scarab!", "A golden win!"]),
 "boris":     ("am_santa",   0.95, -2.0, ["Ladies and gentlemen!", "Step right up!", "The greatest show on earth!"]),
}
mf = json.load(open('audio/voice/manifest.json'))
for ck, (voice, speed, pitch, uniq) in NEW.items():
    lines = dict(GENERIC); lines["ready"], lines["taunt"], lines["win"] = uniq; mf["chars"][ck] = lines
    for key, text in lines.items(): render(key, text, voice, speed, pitch, False, ck)
    print("done", ck, flush=True)
json.dump(mf, open('/workspace/build/std/voice/manifest.new.json', 'w'), indent=1); print("ALL DONE")
