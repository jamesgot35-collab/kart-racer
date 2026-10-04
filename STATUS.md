# STATUS

**Phase 1 (design docs): complete** (Oct 4, ~03:45 ET). `docs/00` to `docs/06` plus a combined HTML/PDF (`docs/Sparkdrift-GP-Design-Package.*`). `tools/verify_docs.py` confirms exactly 100 unique roster names (12 free starters, 33/34/33 class split), 42 kart bodies (all S+A+H+G = 22), exactly 20 tracks (4 cups of 4 + 4 bonus). Output: `docs/verify-report.txt`.

**Phase 2 (playable game): LIVE, polishing.** (updated 05:30 ET)

- Live: https://jamesgot35-collab.github.io/kart-racer/ (4 tracks, 12 racers, 9 items, drift/boost, CPU rivals, garage, Grand Prix / quick / time-trial / daily, online room-code lobby via PeerJS).
- Packs (all published, GitHub Pages, CORS *): `kart-racer` (game + 29 MB standard audio), `kart-racer-hq-audio-1` (388 MB), `kart-racer-hq-audio-2` (299 MB), `kart-racer-hq-gfx` (368 MB). HQ is opt-in (Settings -> Quality -> High), cached with the Cache API. `hq-manifest.json` lists every file.
- Master bus: -14.8 LUFS integrated, true peak -1.4 dBFS, 0 clipped samples (tests/results/audio_meadow*).
- Done tests: soak 60 s game-time x 4 tracks PASS (tests/results/soak.json); HQ mode PASS (tests/results/hq_mode_meadow.json); net_node (real PeerJS + WebRTC) PASS; net_two_peer (shim transport) PASS; music decode loop-length check; live smoke 0 errors.
- Caveat: headless Chrome here cannot gather WebRTC ICE, so browser<->browser WebRTC is untested; Node<->Node WebRTC via the real PeerJS cloud is tested.
- (06:00 ET) Screenshot set DONE: `shots/landscape_*.png`, `shots/portrait_*.png` (title, menu, garage, setup, settings, lobby, grid + race on all 4 tracks, pause, results; 0 console errors in both orientations, tests/results/screens.json). Garage landscape/portrait layout fixed after review. Touch test PASS (tests/results/touch.json). Real 1-lap quick race reaches results (flows test in progress for time trial + GP). Asset QA (tests/results/asset_qa.json): engine loop DC/seam fixed, 2 minor notes.
- Left: flows.mjs final result, final size audit (tools/size_audit.py), READY section.
