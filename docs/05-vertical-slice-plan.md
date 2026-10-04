# Vertical Slice Plan

*Goal: a slice that already feels like the $10M game, not a prototype. The slice is the quality yardstick: if something is not at this bar in the slice, it is not ready to scale to 100 characters and 20 tracks.*

## 1. Scope

| Area | Slice content |
|---|---|
| Characters | **8 playable**: Pip Thistledown (L), Fennel Vix (L), Juniper Wren (L), Bramble Quill (M), Clover Dash (M), Captain Dusk Marlowe (M), Marigold Hoofsworth (H), Gus Gantry (H). Four more free starters appear as CPU rivals (Pearl Quayside, Sage Willowmere, Hobb Mossback, Barnaby Bruin) to fill the 12-kart grid. |
| Karts | **6 bodies**: Corsa Standard (Cruiser), Needle (Dart), Slidewinder (Drifter), Ironclad (Bruiser), Pogo (Rocket), Pumpkin Coach (Oddball) |
| Garage | Full: 18 wheel styles × 5 sizes × colours, 12 spoilers, 10 exhausts, 8 bumpers, 32 paint colours × 5 finishes, 24 decals, live stat bars, 3D preview, save/load |
| Tracks | **4**: Buttercup Meadows (1650 m), Lantern Harbor (1980 m), Mirage Mesa (2232 m), Frostbite Pass (2066 m) (a Seedling Cup subset: meadow, harbor night, desert, snow), each with a shortcut and a hazard, 3 laps default |
| Multiplayer | 4-player code lobbies (6-character code), host settings (track, laps, items, CPU fill), connection status |
| Items | All 8 items with the exact behaviours in the GDD |
| Drift boost | Three tiers + start boost |
| Audio | Full dynamic score per track and menu, layered engines per class, announcer, barks, ambience, crowd, mixer |
| Platforms | iOS Safari, Android Chrome (web), desktop browsers; gamepad |

## 2. Quality-bar checklist (all must be true to call the slice "done")

**Feel**
- [ ] Steering feels responsive at 60 fps; touch slider is accurate to 1° of heading.
- [ ] Drift entry is satisfying: hop, slide, sparks, tier changes are obvious without looking at a bar.
- [ ] Boost feels fast: FOV kick, trail, speed lines, whoosh, camera shake.
- [ ] Every item is understandable in 2 seconds, with a clear counter.
- [ ] CPUs drive plausibly, take shortcuts at higher skill, and never feel scripted.

**Visual**
- [ ] Every track is recognisable from a single screenshot (landmark visible).
- [ ] Rim light separates karts from the background at any time of day.
- [ ] No placeholder boxes: every object belongs to a theme.
- [ ] Characters readable at thumbnail size.

**Audio (top priority)**
- [ ] Engine pitch follows speed in real time with per-class tone.
- [ ] Drift squeal, tier ticks, boosts by tier, hop, land, bumps, scrape, crash all present.
- [ ] Every item has pickup, use, and hit sounds.
- [ ] Dynamic music: stems react to position and final lap.
- [ ] Announcer: countdown, final lap, position callouts. Barks have cooldowns.
- [ ] Mixer: ducking works; no clipping; peak below −1 dBFS.

**Technical**
- [ ] 0 console errors; 60 s soak on every track with no stalls.
- [ ] First load under 8 s on a good phone; per-track streaming.
- [ ] 4-player lobby works end-to-end (code, join, ready, start).
- [ ] Save/load: coins, unlocks, garage builds persist.

## 3. Engine and backend recommendation (production)

| Layer | Recommendation | Why |
|---|---|---|
| Engine | **Unity 6 LTS, URP, C#** (alternative: Unreal 5.5 mobile renderer if the team is Unreal-heavy) | Best mobile tooling, Addressables for streaming 100 characters × 20 tracks, big hiring pool, mature profiler (Frame Debugger, Memory Profiler), Burst/Jobs for kart physics and AI |
| Physics | Custom kinematic arcade kart controller (no wheel colliders), fixed 60 Hz, Burst-compiled; use Unity Physics only for static queries | Determinism-lite and cost |
| Netcode | Custom UDP via Unity Transport; host-authoritative items, client prediction for own kart; optional dedicated headless Linux servers | Fine-grained control over lag-tolerant items |
| Backend | **Nakama** (open source, on a managed cluster) for accounts, rooms, matchmaker, leaderboards, cloud saves; or PlayFab if the studio prefers a managed service | Rooms with short codes, leaderboards, storage |
| Server hosting | Edgegap / Hathora / AWS GameLift for dedicated relays; Cloudflare for static content | Low cost at low concurrency |
| Content delivery | Addressables on CDN, per-track and per-character bundles | Meets the <8 s load budget |
| Audio | **FMOD Studio** (adaptive layers, snapshots, ducking) | The dynamic score and RPM-driven engines need parameter-driven mixing |
| Analytics | Opt-in anonymous (Unity Analytics or self-hosted PostHog) | Funnel and performance |

**This repository's browser slice** uses three.js, WebAudio and WebRTC (with a free signalling relay) so the design can be played now on any phone.

## 4. Milestones for the slice (8 weeks, team of ~25)

| Week | Milestone |
|---|---|
| 1 | Kart controller prototype, camera, test track, touch + gamepad input |
| 2 | Drift, boost tiers, start boost, off-road, bump rules |
| 3 | Track pipeline (spline → mesh → AI line → minimap) + Track 1 |
| 4 | Items (8), item boxes, HUD, CPU racers with rubber-banding |
| 5 | Garage (stats, preview, saves), characters (8), Tracks 2 to 4 |
| 6 | Audio vertical slice: engine layers, drift, boost, music stems, announcer, mixer |
| 7 | Netcode: codes, lobbies, prediction, items over network, host migration |
| 8 | Polish, perf pass (30/60 fps), quality-bar sign-off, playtest |

## 5. Slice KPIs
* 60 fps on iPhone 13+ and Pixel 8 class, 30 fps on iPhone XR / Pixel 5 class.
* Race start to first interaction: under 10 s.
* 90% of playtesters can explain all 8 items after one race.
* Net: 4 humans, 150 ms RTT, no teleporting karts.
