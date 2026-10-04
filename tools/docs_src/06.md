# Production Order, Risks, Performance Budget

## 1. Production order (full game, 24 months, ~85 people, $10M)

| Phase | Months | Output | Gate |
|---|---|---|---|
| Pre-production | 0 to 4 | Pillars, kart controller prototype, art pipeline, audio pipeline, netcode spike | Playable greybox kart on one track; "fun in 60 seconds" |
| Vertical slice | 4 to 8 | The slice (8 characters, 6 karts, 4 tracks, 4-player lobbies, items, drift, garage, full audio slice) | Quality-bar checklist all green; investors/internal greenlight |
| Systems production | 8 to 14 | Roster pipeline (templated rig, 10 sets), kart modular system (40+ bodies, parts), track pipeline (20 tracks), CPU AI, progression, cloud saves, daily challenge, time trial ghosts | 8 tracks + 40 characters complete |
| Content production | 14 to 20 | Remaining 12 tracks, 60 characters, remaining bodies and parts, music (21 pieces), VO | All tracks playable; content lock |
| Hardening | 20 to 24 | Balance, perf, QA, localisation (14 languages), certification (Apple, Google), live-ops tooling | Release candidate |
| Post-launch | 24+ | Battle mode, seasons, extra tracks | Live |

### Ordering rules
1. Prove the feel before scaling content.
2. Build the tools (track spline pipeline, character template rig, kart modular assembly) before the content.
3. Audio runs in parallel from day one: engine and mixer prototypes go in with the kart controller.
4. Netcode spike in pre-production: the architecture must be proven with 4 humans + 8 CPUs before any track is final.
5. Streaming and memory budgets are enforced from the first track.

### Team (peak)
Design 8, Engineering 22, Art (characters 10, karts 8, environment 14, VFX 4, UI 5), Animation 6, Audio 6 (sound designers 3, composers 2, implementer 1), QA 10, Production 4, Online/backend 5, Live-ops 3.

## 2. Risk list

| # | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| 1 | Kart handling not fun / not readable | M | H | Prototype first, weekly blind playtests, tuneable physics JSON, assist options | Design |
| 2 | Netcode: items feel unfair at 150 ms | H | H | Victim-authoritative hits, fast-forward projectile, 120 ms rewind validation, early 4-human tests | Online |
| 3 | 100 characters × animations scope | H | H | Templated rig; shared animation set with per-character poses (idle/victory); 10 art sets of 10; outsourcing plan | Art |
| 4 | Memory on mid-range phones | H | H | Addressables streaming; one track + 12 racers resident; texture budgets; ASTC | Tech art |
| 5 | Load time over 8 s | M | H | Core under 40 MB; async loading; splash-to-menu under 4 s | Engineering |
| 6 | Audio: too many voices, clipping, harshness | M | H | Voice limits, priority, master limiter, loudness QA | Audio |
| 7 | Rubber-banding perceived as unfair | M | M | Light bands; item balancing; telemetry | Design |
| 8 | Bluetooth gamepad variance | M | M | SDL-style mapping DB, test matrix | QA |
| 9 | Thermal throttling on long sessions | M | M | Adaptive quality, 30 fps fallback, particle caps | Engineering |
| 10 | Platform review (child safety, loot boxes) | L | H | No loot boxes; cosmetic-only; child-safe design | Production |
| 11 | Backend cost spikes | L | M | Serverless TTL rooms; P2P by default; relay only when needed | Online |
| 12 | IP safety (no resemblance to existing characters) | M | H | Original design, legal clearance review of all 100 names and silhouettes | Legal |
| 13 | Scope creep: Battle mode | M | M | Optional, post-launch | Production |
| 14 | Content balance (100 characters) | M | M | Class modifiers only (no unique stats); stat budget invariant | Design |

## 3. Performance budget

### 3.1 Targets by tier

| Tier | Devices | Frame rate | Resolution scale | Shadows | Racers |
|---|---|---|---|---|---|
| High | iPhone 14+, Pixel 8+, Galaxy S23+ | 60 fps | 100% (up to 1170p) | Player + nearest 3 | 12 |
| Mid | iPhone XR to 12, Pixel 5 to 7 | 30 fps stable (60 on menus) | 75% | Player only | 12 (reduced FX on far karts) |
| Low | older | 30 fps | 60% | Blob shadows | 8 |

### 3.2 Per-frame budget (60 fps = 16.6 ms)

| System | Budget |
|---|---|
| Game logic + physics + AI | 3.0 ms |
| Render CPU (draw submission) | 4.0 ms |
| GPU | 12.0 ms |
| Audio mixing | 1.0 ms |
| Network | 0.5 ms |
| Headroom | 2.0 ms |

### 3.3 Rendering budget
* Draw calls ≤ 250 (≤ 150 on Mid). Triangles ≤ 350k visible (kart 12k LOD0, 6k LOD1, 2.5k LOD2).
* Materials: ≤ 40 unique per scene, shared atlases; GPU instancing for scenery.
* Particles ≤ 600 live; overdraw capped.
* Textures: ASTC 6×6 on mobile; kart 1024², character 512² + 1024² face; track atlases 2048².

### 3.4 Memory budget (on device)
| Item | Budget |
|---|---|
| Total app memory (high) | ≤ 1.8 GB; (mid) ≤ 1.1 GB |
| Track resident | ≤ 220 MB |
| 12 racers (kart + character) | ≤ 160 MB |
| Audio resident | ≤ 90 MB (music streamed from disk) |
| UI + fonts | ≤ 40 MB |

### 3.5 Download and load
* Initial app download ≤ 250 MB (stores allow more; keep low for conversion).
* Core boot ≤ 4 s on a good phone; menu to race ≤ 8 s for a cached track.
* Asset streaming: one Addressable bundle per track (≈ 60 MB), per character (≈ 8 MB), per kart body (≈ 4 MB), per music set (≈ 14 MB).
* Cache eviction: keep the last 3 tracks and 24 characters.

### 3.6 Network budget
* ≤ 25 KB/s per client; ≤ 60 KB/s for the host with 4 humans + 8 CPUs.
* 20 Hz snapshots, 60 Hz simulation; 100 ms interpolation buffer.

### 3.7 Battery and thermals
* 30 min of play ≤ 18% battery on a mid phone; adaptive resolution scaling when thermal state is "serious".

### 3.8 Web slice budget (what this repo's build enforces)
* Core bundle (JS + essential audio) ≤ 6 MB gzipped; first interactive under 8 s on a good phone on a typical 4G connection.
* Adaptive pixel ratio (1.0 to 0.6) from frame time; 60 fps target, 30 fps fallback with the fixed 60 Hz simulation.
