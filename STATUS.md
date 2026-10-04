# STATUS

**Phase 1 (design docs): complete** (Oct 4, ~03:45 ET). `docs/00` to `docs/06` plus a combined HTML/PDF (`docs/Sparkdrift-GP-Design-Package.*`). `tools/verify_docs.py` confirms exactly 100 unique roster names (12 free starters, 33/34/33 class split), 42 kart bodies (all S+A+H+G = 22), exactly 20 tracks (4 cups of 4 + 4 bonus). Output: `docs/verify-report.txt`.

**Phase 2 (playable game): LIVE, polishing.** (updated 05:12 ET)

- Live: https://jamesgot35-collab.github.io/kart-racer/ (4 tracks, 12 racers, 9 items, drift/boost, CPU rivals, garage, GP/quick/time-trial/daily, online room-code lobby via PeerJS).
- Audio: standard pack in `audio/` (~29 MB, 32 kHz context, bass/lead/counter mono to cap decoded RAM ~140 MB/track). HQ lossless packs published in repos `kart-racer-hq-audio-1` and `-2` (~686 MB). Master loudness measured -14 LUFS (tests/results/audio_meadow.txt).
- Tests so far: tests/net_node.mjs (real PeerJS+WebRTC, all pass), tests/net_two_peer.mjs (2 clients, shim transport), tests/audio_capture.mjs, tests/music_decode.mjs, tests/live_smoke.mjs. Headless Chrome on this box cannot gather WebRTC ICE, so browser-to-browser WebRTC is NOT verified (Node-to-Node is).
- In progress: HQ graphics pack (`kart-racer-hq-gfx`: 4K PBR ground/road, HDR skies, 1024 portraits) generated in /workspace/pack/g1; wired in code (src/hqgfx.js) but not yet published/tested.
- Left: HQ gfx publish + test, 60 s soak on all tracks, portrait/landscape screenshot set, CREDITS.md, docs regen, final size audit.
