# Tests (all run headless on the build box; results in `tests/results/`, screenshots in `shots/`)

Headless Chrome here uses SwiftShader (software GL, ~5-9 fps), so these are correctness/soak tests, not performance numbers. Run from the repo root with `node tests/<name>.mjs` (needs `npm i`).

| Script | What it proves | Result file |
|---|---|---|
| `soak.mjs` | 60 s of GAME time on each of the 4 tracks, 12 karts, autopilot player; fails on any console/page error, NaN, dead audio context | `results/soak.json` |
| `flows.mjs` | Real 1-lap quick race to the results screen, time-trial (ghost saved), Grand Prix race 1 -> standings; rewards persisted | `results/flows.json` |
| `touch.mjs` | Real multi-touch (CDP): steer slider + gas + drift + item + brake, input state and kart response | `results/touch.json` |
| `screens.mjs`, `garage_shots.mjs` | Portrait (390x844) + landscape (844x390) shots of title, menu, garage, setup, settings, lobby, grid + race on each track, pause, results | `shots/*.png`, `results/screens.json` |
| `audio_capture.mjs` + `audio_analyze.py` | MediaRecorder capture of the master bus during a real race, ffmpeg EBU R128 loudness / true peak, per-second RMS/peak/centroid | `results/audio_meadow.*` |
| `asset_qa.py` | Peak/clipping/DC/silence/loop-seam QA over all shipped standard audio (352 files) | `results/asset_qa.json` |
| `music_decode.mjs` | Chrome decodes every music stem to the same loop length (priming drift) + decoded RAM per piece | `results/music_decode.json` |
| `hq_mode.mjs` | High quality mode really loads 48 kHz FLAC stems, PBR textures and HDR env from the HQ repos | `results/hq_mode_meadow.json` |
| `net_node.mjs` | The real `src/net.js` Session over the real PeerJS cloud + real WebRTC data channels (Node, `@roamhq/wrtc`): host, join by code, ready/cfg sync, start/go, snapshot relay, item events, drop -> CPU takeover, host lost, wrong code | `results/net_node.json` |
| `net_two_peer.mjs` | Two browser instances running the full app (lobby UI -> race), transport replaced by `peer_shim.js` | `results/net_two_peer.json` |
| `sim_all_tracks.mjs` | Pure simulation of all 8 tracks (both cups) x normal and mirror+reverse: 2 AI laps, every kart must finish, no sim errors | `results/sim_all_tracks.txt` |
| `perf_tiers.mjs` | Performance vs Standard graphics tier (draw calls / triangles / MSAA / DPR cap) + low-end device auto-default | `results/perf_tiers.json` |
| `touch_layout.mjs` | Touch controls at Small/Medium/Large + left-handed, portrait / landscape / 667x320 phone: on-screen, >=44 px, no overlaps | `results/touch_layout.json` |
| `lobby_help.mjs` | Online "Can't connect?" help + error screens render; connection check runs | `shots/*_lobby_help_*.png` |
| `roster_sheet.mjs` | Contact sheet of all 24 racer models | `shots/roster_sheet.png` |
| `live_smoke.mjs` | Loads the published GitHub Pages URL, starts a race, 0 errors + timings | `results/live_smoke.json` |
| `ice_probe.mjs` | Diagnostic: shows this box's headless Chrome cannot gather WebRTC ICE candidates (why browser<->browser WebRTC is untested here) | - |
| `../tools/size_audit.py` | Exact bytes of every published file in all four repos | `results/size_audit.json` |
| `assist_eval.mjs` | Steering assist: a deliberately sloppy simulated thumb drives 100 s on 8 tracks with assist off/low/high; wall hits must drop without losing progress | `results/assist_eval.txt/json` |
| `settings_check.mjs` | Settings screen renders the Steering assist control and persists the choice | - |
| `skid_test.mjs` | Skid marks are generated during an AI race and render on the road (close-up screenshot) | `shots/skidmarks_closeup.png` |
| `speedfx_check.mjs` | Speed-lines overlay shows when boosting (Standard) and is hidden on the Performance tier | `results/speedfx_check.txt`, `shots/speedfx_*.png` |
| `kart_sheet.mjs` | Contact sheet of all 12 kart bodies | `shots/kart_sheet.png` |
| `cup2_shots.mjs` | Grid + race screenshots of the 4 Starlight Cup tracks, both orientations; fails on console errors | `shots/*_cup2_*.png` |
| `live_smoke.mjs [url w h track tag]` | Loads the PUBLISHED site, starts a race, screenshots, reports errors | `results/live_smoke_<tag>.json` |
