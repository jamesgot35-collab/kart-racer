#!/usr/bin/env python3
"""Offline TTS (Kokoro-82M, Apache-2.0) -> announcer + character barks. Outputs std (22.05k wav) and hq (native 24k, 24-bit FLAC)."""
import os, sys, json, subprocess, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
OUT = "/workspace/build"; TMP = OUT + "/tmp"
k = Kokoro("/workspace/models/kokoro-v1.0.onnx", "/workspace/models/voices-v1.0.bin")

ANNOUNCER = {
 "three":"Three!","two":"Two!","one":"One!","go":"Go!","final_lap":"Final lap!","lap_2":"Lap two!","lap_3":"Lap three!","lap_4":"Lap four!","lap_5":"Lap five!",
 "get_ready":"Get ready!","race_complete":"Race complete!","you_win":"You win! Congratulations!","better_luck":"Better luck next time!","lead":"Taking the lead!",
 "wrong_way":"Wrong way! Turn around!","record":"New record!","shortcut":"Shortcut!","perfect_start":"Perfect start!","rocket_incoming":"Rocket incoming!","storm_incoming":"Storm incoming!",
 "welcome_buttercup":"Welcome to Buttercup Meadows!","welcome_lantern":"Welcome to Lantern Harbor!","welcome_mirage":"Welcome to Mirage Mesa!","welcome_frost":"Welcome to Frostbite Pass!",
 "room_ready":"Room ready. Share the code!","player_joined":"A new racer has joined!","player_left":"A racer has left.","unlocked":"New unlock!","great_drift":"Great drift!","pod_ready":"Boost ready!",
}
ORD = ["First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Ninth","Tenth","Eleventh","Twelfth"]
for i,o in enumerate(ORD): ANNOUNCER[f"pos_{i+1}"] = f"{o} place!"

GENERIC = {"boost1":"Yeah!","boost2":"Woo hoo!","hit":"Ow!","spin":"Whoaaa!","item":"Ooh, nice!","attack":"Take that!","overtake":"See you later!","overtaken":"Hey, no fair!","final":"Last lap, let's go!","lose":"Aw, next time!","shortcut":"Ha, shortcut!"}
# voice, speed, pitch (semitones), unique lines: ready, taunt, win
CHARS = {
 "pip":    ("af_bella",   1.15, 2.0, ["Pip's on the move!", "Catch me if you can!", "I did it! Pip wins, pip pip hooray!"]),
 "fennel": ("af_kore",    1.10, 1.0, ["Everything's going to plan.", "I planned this, you know.", "Told you I had a plan."]),
 "juniper":("af_sky",     1.20, 3.0, ["Let's sing this one!", "Tweet tweet, too slow!", "A song for the winner!"]),
 "pearl":  ("af_sarah",   1.10, 2.0, ["Hold onto your coins!", "Too slow, friend!", "Coins for everyone!"]),
 "bramble":("bm_lewis",   1.00, -1.0,["Fine. Let's race.", "Don't touch my quills.", "Humph. I guess I won."]),
 "clover": ("af_jessica", 1.25, 1.0, ["I read the map twice!", "Zoom zoom zoom!", "Triple flip, baby!"]),
 "dusk":   ("bm_george",  0.95, -2.0,["Steady as she goes, kid.", "Full steam ahead, kid!", "Another one for the captain."]),
 "sage":   ("bm_fable",   0.92, -1.0,["The wise owl waits.", "Patience is a virtue.", "Wisdom wins again."]),
 "marigold":("af_heart",  0.95, -2.0,["Hugs after the race!", "Fresh from the oven!", "Group hug, everyone!"]),
 "hobb":   ("am_onyx",    0.85, -3.0,["Slow and steady.", "No rush, friends.", "Well, how about that."]),
 "barnaby":("am_fenrir",  0.95, -3.0,["I brought honey!", "Bear with me, friend!", "Bear hug for the trophy!"]),
 "gus":    ("am_michael", 0.95, -2.0,["Lifting off in three, two...", "Watch the hook!", "Right on target."]),
}
def synth(text, voice, speed):
    s, sr = k.create(text, voice=voice, speed=speed, lang="en-us"); return np.asarray(s, dtype=np.float32), sr
def process(wav, name, kind, pitch=0.0, announcer=False):
    src = f"{TMP}/{name}.wav"; wav = f"{TMP}/{name}_raw.wav"
    filt = []
    if pitch: filt.append(f"rubberband=pitch={2**(pitch/12):.5f}")
    filt.append("silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse")
    if announcer:
        filt += ["highpass=f=110","equalizer=f=3200:t=q:w=1.0:g=3","acompressor=threshold=-22dB:ratio=4:attack=5:release=80:makeup=5","aecho=0.8:0.5:60:0.18"]
    else:
        filt += ["highpass=f=90","acompressor=threshold=-24dB:ratio=3:attack=4:release=60:makeup=3"]
    filt += ["loudnorm=I=-17:TP=-2:LRA=7"]
    chain = ",".join(filt)
    return chain
def render(key, text, voice, speed, pitch, announcer, subdir):
    s, sr = synth(text, voice, speed)
    raw = f"{TMP}/{subdir}_{key}.wav"; sf.write(raw, s, sr, subtype="FLOAT")
    chain = process(None, key, None, pitch, announcer)
    os.makedirs(f"{OUT}/std/voice/{subdir}", exist_ok=True); os.makedirs(f"{OUT}/hq/voice/{subdir}", exist_ok=True)
    hq = f"{OUT}/hq/voice/{subdir}/{key}.flac"; std = f"{OUT}/std/voice/{subdir}/{key}.wav"
    subprocess.run(["ffmpeg","-y","-loglevel","error","-i",raw,"-af",chain,"-ar","24000","-ac","1","-sample_fmt","s32","-c:a","flac",hq],check=True)
    subprocess.run(["ffmpeg","-y","-loglevel","error","-i",hq,"-ar","22050","-ac","1","-c:a","pcm_s16le",std],check=True)
    os.remove(raw)
manifest = {"announcer": {}, "chars": {}}
for key,text in ANNOUNCER.items():
    render(key, text, "am_adam", 1.08, 0.0, True, "announcer"); manifest["announcer"][key]=text
print("announcer done", flush=True)
for ck,(voice,speed,pitch,uniq) in CHARS.items():
    lines = dict(GENERIC); lines["ready"],lines["taunt"],lines["win"] = uniq
    manifest["chars"][ck] = lines
    for key,text in lines.items():
        render(key, text, voice, speed, pitch, False, ck)
    print("done", ck, flush=True)
json.dump(manifest, open(f"{OUT}/std/voice/manifest.json","w"), indent=1)
print("ALL DONE")
