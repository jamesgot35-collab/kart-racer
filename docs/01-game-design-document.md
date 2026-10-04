# Sparkdrift GP: Game Design Document

*Version 1.0 · Original IP · Feel reference only: "a polished arcade kart racer in the spirit of a premium console kart racer". No third-party characters, tracks, names or audio are used anywhere in this project.*

---

## 1. Vision and pillars

**One-line pitch.** A saturated, readable, fast arcade kart racer for phones: 100 expressive racers, 40+ customisable karts, 20 tracks with shortcuts, skill-based items, 1 to 4 humans in code rooms, and a score that reacts to every overtake.

### Design pillars

1. **Readable at speed.** Every kart, hazard and item reads from silhouette and colour at thumbnail size. The racing line is always the brightest, cleanest shape on screen. The HUD never covers the racing line.
2. **Drift is the instrument.** Drifting is the main skill expression: choose a line, charge a tier, release at the right moment. Three tiers, three distinct audio-visual signatures.
3. **Skill beats luck.** Items can be held as shields, dodged, baited and countered. Rubber-banding is light enough that a better driver can still pull away.
4. **Customisation is identity, not power creep.** Every kart body has the same power budget (stat sum 22). Mods trade one stat for another, capped at ±1.5 per stat. No pay-to-win: money buys cosmetics only; coins buy everything else, earned by racing.
5. **Sound is half the game.** Engines, drift squeals, boost whooshes, an announcer, crowd, barks and a position-reactive score are designed as one mix, not as an afterthought (see section 14).
6. **Friends in ten seconds.** A host taps once, gets a 6-character code, says it aloud, and friends join in seconds. If someone drops, a CPU takes over.

### Target feel

| Metric | Target |
|---|---|
| Frame rate | 60 fps on flagship phones, stable 30 fps on mid-range |
| Input latency (touch to steering) | below 60 ms |
| First load | under 8 s on a good phone (core download under 6 MB for the web slice) |
| Race length | 3 laps, about 2:30 to 4:30 |
| Session loop | a race, a reward screen, a garage tweak, the next race in under 90 s |

---

## 2. Platforms and technology targets

* **Production target:** iOS and Android phones and tablets (ARM64), Bluetooth gamepad support.
* **This repository's playable slice:** a free static browser build (three.js, WebAudio, WebRTC) that runs on iPhone Safari and Android Chrome. It implements the vertical slice defined in `05-vertical-slice-plan.md` with the same numbers as this document.
* Units: metres, seconds. HUD speed readout = m/s × 4.

---

## 3. Controls

### 3.1 Touch (default)

| Control | Position / behaviour |
|---|---|
| **Steering slider** | A horizontal slider, bottom-left thumb zone, 38% of screen width. Dead zone 6%, response curve `y = sign(x)·|x|^1.25`, optional auto-centre. |
| **Accelerate** | Automatic by default (Assist: Auto-Accel on). Hold-to-accelerate is available for experts. |
| **Brake / reverse** | Pedal under the right thumb, lower centre-right. |
| **Drift / hop button** | Large round button, bottom-right, 14% of screen height. Tap to hop; hold while steering to drift. Release to fire the boost. |
| **Item button** | Right side, above the drift button. Tap to use, hold to keep the item trailing behind as a shield, swipe up/down to aim forward/back. |
| **Look-back** | Small button near the item slot. Hold to view behind. |
| **Pause** | Top-right corner, away from controls. |

Optional **tilt steering** (gyro) with calibration, 12° dead zone, sensitivity slider. Touch controls can be moved and resized in settings. Left-handed layout mirrors everything.

### 3.2 Gamepad (Bluetooth)

Standard mapping: left stick steer, right trigger accelerate, left trigger brake, **A** drift/hop, **X** item, **Y** look-back, **Start** pause, d-pad menu navigation.

### 3.3 Accessibility

Auto-accelerate, steering assist (adds a soft lane pull of up to 20%), colour-blind-safe item and drift-tier indicators (shape + colour), reduced camera shake, reduced flashing, large HUD, haptics slider, subtitles for the announcer and barks, one-handed mode (steer by tilt and drift by screen tap).

---

## 4. Physics and handling targets

All numbers are tuned for 60 Hz fixed-step simulation (30 Hz render fallback runs the same fixed step with interpolation).

### 4.1 Stats and how they map to physics

Every kart has five stats (1 to 10): **S** top speed, **A** acceleration, **H** handling, **G** drift grip, **W** weight. Final stats = body + character-class modifier + wheel + spoiler + exhaust + bumper (each clamped so total mod per stat is within ±1.5), then clamped to 1 to 10.

| Stat | Formula | Range |
|---|---|---|
| Top speed | `vmax = 34 + 1.2·S` m/s | 35.2 to 46.0 m/s (141 to 184 on the HUD) |
| Acceleration | time to 90% of vmax on tarmac `t90 = 6.4 − 0.38·A` s; `a(v) = a0·(1 − (v/vmax)²)`, `a0 = 1.472·vmax/t90` | 6.0 s down to 2.6 s |
| Handling | yaw-rate cap `105°/s` scaled by `(0.72 + 0.03·H)`, limited by lateral acceleration | wider turns at higher speed |
| Drift grip | lateral acceleration cap `18 + 1.6·G` m/s² | 19.6 to 34 m/s² |
| Weight | mass `0.7 + 0.12·W` | 0.82 to 1.9 |

Other base values: brake 30 m/s², coasting drag 3.0 m/s², reverse top speed 10 m/s, off-road top speed ×0.55 and acceleration ×0.6, rough shortcut ground ×0.8 top speed, boost pad 1.1 s at ×1.28.

### 4.2 Character classes

Classes add small modifiers to the body stats:

| Class | S | A | H | G | W | Role |
|---|---|---|---|---|---|---|
| Light | -0.5 | +1.0 | +0.5 | 0.0 | -2.0 | Fast acceleration, quick recovery, weak in bumps (loses 15% speed on a heavy hit and is spun out above 14 m/s impact) |
| Medium | 0 | 0 | 0 | 0 | 0 | Balanced |
| Heavy | +0.8 | -1.0 | -0.5 | +0.2 | +2.5 | Slow acceleration, high top speed, wins bump contests (loses only 3% speed) |

### 4.3 Steering model

Heading and velocity are separate. Steering rotates the heading at yaw rate ω, capped by `ω ≤ a_lat / v` so cornering is bounded by grip. Lateral velocity (slip) decays at **11 s⁻¹** on a normal line (feels glued), **1.6 s⁻¹** while drifting (feels sliding), and **7.0 s⁻¹** off-road.

### 4.4 Surfaces

| Surface | Top speed | Accel | Grip | Notes |
|---|---|---|---|---|
| Road | ×1.00 | ×1.00 | normal | racing line |
| Rough (shortcut ground) | ×0.8 | ×0.85 | slightly loose | cut risks speed loss without a boost |
| Off-road (grass, sand, snow) | ×0.55 | ×0.6 | low | slows to a crawl, camera shakes |
| Ice | ×1.00 | ×0.9 | very low | reduced by Studded wheels |
| Boost pad | 1.1 s ×1.28 | boost | n/a | arrows glow |
| Walls | n/a | n/a | n/a | see bump rules |

---

## 5. Drifting and boost

1. **Hop.** Tap the drift button above 17 m/s to hop (small jump, 0.9 m/s upward impulse for feel only). Hold steer left or right to commit to a direction.
2. **Drift.** While held, the kart slides at up to **32°** between heading and velocity. Steering *into* the drift multiplies yaw by ×1.25 (tightens), steering *against* multiplies by ×0.72 (widens). Steer commitment sets the charge rate: full steer charges at ×1.0, no steer at ×0.55.
3. **Charge tiers (seconds of drifting at full commitment):** Blue / Orange / Purple = **0.9 / 1.9 / 3.1** s.
4. **Release.** Releasing the button fires the boost: **0.8 / 1.5 / 2.3** s at ×**1.14 / 1.22 / 1.3** top speed for tiers 1 to 3.
5. **Feedback.** Spark colours: blue, orange, purple. Sparks change at each threshold with a rising "tick" tone; tier 3 adds a screen-edge streak and a bass swell. Releasing fires the tiered whoosh and a camera FOV kick.
6. **Start boost.** On the countdown, press accelerate within **0.28 s** of "GO": **1.3 s at ×1.25**. Pressing too early stalls the engine for 1.0 s (sputter sound, smoke).
7. **Stacking.** Boosts do not stack: the strongest multiplier applies and the longest remaining time is kept.

---

## 6. Bumping, drafting and slipstream

### 6.1 Kart-to-kart bumps

* Collision is circle vs circle, radius **1.15 m**, restitution **0.45**.
* Mass `m = 0.7 + 0.12·W`. The impulse is split by inverse mass, so a heavy kart pushes a light kart further.
* Speed loss on a heavy-vs-light hit: light loses **15%**, heavy loses **3%** of forward speed.
* Relative impact speed above **14 m/s** spins the lighter kart for **0.6 s** (hit-stun, cannot steer; still has momentum). Stars and ghosts ignore this.
* Side contact during a drift transfers no charge but gives the attacker a short +4% speed shove for 0.4 s ("rub is racing").

### 6.2 Walls

Glancing contact (angle below 25°) scrapes for **8%** speed loss per second of contact with sparks. Head-on contact (angle above 60°) cuts speed by **50%** with a screen shake. Walls never dead-stop a kart: a minimum outward push keeps it moving.

### 6.3 Draft and slipstream

* A kart is in a draft when it is **4.0 to 22 m** behind another and within **1.8 m** laterally of its path.
* While in draft: +**6%** top speed (×1.06) and +10% acceleration.
* After **2.0 s** of continuous draft, leaving the wake triggers a **slingshot**: ×1.12 for 1.2 s. The HUD draws a curved air-line behind the lead kart.
* Draft charge starts after 1.2 s inside the zone and decays at twice the build rate when you leave it.

---

## 7. Items

Eight items, all with original names. Items are collected from **item rows** (rainbow orbs, row of 4 to 6 across the road). Each racer holds **one item at a time** (a second item is only picked up when the slot is empty; a shield item counts as held).

| # | Item (original name) | Based on | Exact behaviour | Counterplay |
|---|---|---|---|---|
| 1 | **Turbo Pod** | boost mushroom | Instant boost: 1.8 s at ×1.35 top speed, also removes 50% of off-road slowdown for the duration. Rarely a **Pod Trio**: 3 uses, 1.4 s at ×1.3 each. | Use on a straight or off-road shortcut; combine with a drift boost for max speed; the boost can be wasted if used before a wall |
| 2 | **Rebound Disc** | shell | Fired forward (tap) or backward (swipe down) at **58 m/s**, bounces off walls up to **4** times, lifetime 8 s. Holding the button trails it behind you as a **shield** that absorbs one hit (it pops with a sound). A hit spins the victim for 1.2 s and removes 60% of speed. | Shield, Phantom Veil, Nova Core, steering around its bounce prediction line (a faint trail), out-driving it |
| 3 | **Peel Trap** | banana | Drop behind you, or throw forward 12 m. A kart that touches it spins for 0.9 s and loses 25% of speed. Stays until hit; each racer can have at most 3 on the course. Holding it trails behind as a shield. | Shield, steer around it, burn it with a Rebound Disc |
| 4 | **Storm Jolt** | lightning | Only obtainable from rank 6 or lower. After a **1.5 s** thunder arming (a visible cloud above the leader and an audible rumble), every racer *ahead* of you shrinks for **6.0 s** at ×0.78 top speed and drops a shield item. | Be protected by Nova Core or Phantom Veil before it fires; drive in the draft to close the gap; not obtainable by leaders |
| 5 | **Nova Core** | star | Invincible for **7.0 s** at ×1.2 top speed, ignores off-road, spins any kart it touches (as a Disc hit), crushes hazards. The last 1.5 s flash to warn. | Dodge, don't collide, let it pass |
| 6 | **Phantom Veil** | ghost | **5.0 s** of intangibility: passes through karts and items; immune to Disc, Peel, Spill, Rocket and Storm Jolt. On activation it steals the held item (not shields) from the nearest racer within **25 m** ahead. Cannot use items while ghosted. | Keep a shield item up (shields cannot be stolen); stay out of 25 m ahead of a Veil holder |
| 7 | **Slick Spill** | oil | Drop behind: a puddle radius **1.8 m** lasts 15 s. A kart crossing loses steering for **1.2 s** and 10% speed. | Steer around it, Trail or Mud wheels halve the slip time, Nova Core |
| 8 | **Hornet Rocket** | rocket | Only obtainable from rank 3 or lower. A homing rocket at **72 m/s** seeking the race leader along the racing line. The target gets a lock warning for **2.0 s** (beeps accelerating, red reticle on the HUD). A hit spins out 1.6 s. | **Perfect Brace**: press the item button in the 0.25 s window as the rocket arrives to burn your held item and cancel it; also Phantom Veil, Nova Core, or hiding behind another kart in a narrow section |

### 7.1 Item distribution (percent chance, by rank in a 12-kart field)

| Item | 1st | 2nd to 4th | 5th to 8th | 9th to 12th |
|---|---|---|---|---|
| Turbo Pod | 18 | 22 | 22 | 18 |
| Pod Trio | 0 | 4 | 10 | 14 |
| Rebound Disc | 30 | 22 | 14 | 8 |
| Peel Trap | 30 | 20 | 10 | 4 |
| Slick Spill | 16 | 12 | 8 | 4 |
| Phantom Veil | 6 | 8 | 10 | 10 |
| Nova Core | 0 | 4 | 12 | 20 |
| Storm Jolt | 0 | 0 | 6 | 12 |
| Hornet Rocket | 0 | 8 | 8 | 10 |

Items are blocked for the first **8 s** of a race (only Pod, Disc, Peel and Spill can drop) and no item row exists in the first corner or within 120 m of the grid.

### 7.2 Defensive play

* A held **shield** (Disc, Peel, Spill used as trailing items) blocks one hit of any kind but a Storm Jolt.
* **Perfect Brace** (see Rocket) turns any held item into a counter.
* Weight class and wheel compound change how much damage an item does: Heavy karts lose 20% less speed from Peel/Spill; Light karts recover from spin-outs 0.2 s faster.
* Item boxes respawn after 5 s. A skilled leader holding a shield can defend the lead without spending it.

---

## 8. Rubber-banding and CPU behaviour

* **Light rubber-banding.** CPU karts multiply their top speed by `0.97` plus a gap term: from 0.965 to 1.035 depending on the distance to the *player* (gap normalised over ±90 m). Players are never speed-boosted by rubber-banding. The comeback comes from item distribution only.
* Skilled players can still pull away: a perfect line, three-tier drifts and no hits give about +6% over a CPU's average speed.
* **CPU skill tiers:** Easy (aggression 0.3, 15% mistakes), Normal (0.5, 8%), Hard (0.7, 4%), Expert (0.9, 1.5%). Mistakes mean late braking, wide lines or missed drifts.
* **CPU behaviours.** They follow the racing line with per-driver lane offsets, drift on long corners, take shortcuts according to skill and rank, use items sensibly (fire backwards at close followers, hold shields, drop traps in narrows), and do not catch up unfairly after player spin-outs.
* **CPU field.** Grand Prix: 12 racers (you plus 11 CPUs). Versus: humans (2 to 4) plus CPUs filled to 12.

---

## 9. Game modes

### 9.1 Grand Prix
Four cups of four tracks each: **Seedling Cup, Copper Cup, Tempest Cup, Zenith Cup**. 12-racer field. Points: 15, 12, 10, 8, 7, 6, 5, 4, 3, 2, 1, 0 per race. Trophy at the end: Gold for first overall, Silver second, Bronze third. Engine classes: 100cc, 150cc, 200cc (speed ×0.93, ×1.00, ×1.07) and Mirror mode.

### 9.2 Time Trial
Solo. Track-specific personal best and ghost. Developer ghosts at Bronze, Silver and Gold times. Ghost data is compact: input stream sampled at 30 Hz with quantised steering (6 bits), drift/item flags, and a position checkpoint every 2 s for error correction, around 30 bytes per second, around 8 KB per 3-lap run after delta compression and DEFLATE. Up to 3 ghosts at once (PB, friend, developer).

### 9.3 Versus (code rooms)
Private rooms for 2 to 4 humans (CPU fill to 12). The host picks the track, laps (1 to 5), items on/off, CPU fill and CPU difficulty. Quick Match (public matchmaking) uses the same netcode.

### 9.4 Battle (optional, post-launch if it does not delay the racer)
Three balloons per racer, 4-player arena maps, items only, 3-minute timer. Specified in the roadmap; not part of the vertical slice.

### 9.5 Daily Challenge
One seeded race a day (track, items and CPU seed fixed for everyone). One attempt per day counts for the global and friends leaderboards; unlimited practice. Rewards: 200 coins for finishing, +25 coins per day of streak up to 7 days, and a rotating cosmetic at 7 days.

### 9.6 Laps
Default **3**; host can set **1 to 5**.

---

## 10. Progression and economy

### 10.1 Earnings

| Source | Coins |
|---|---|
| Finish position payout (1st to 12th) | 120, 100, 85, 70, 60, 50, 42, 35, 28, 22, 16, 10 |
| On-track coins | 1 each, up to 40 per lap |
| First race of the day | +100 |
| Grand Prix trophy | Gold 400, Silver 250, Bronze 150 |
| Daily challenge | 200 + streak (25 × day, max 7) |
| Achievements | 50 to 500 each |

Typical average: about **190 coins per race** (4 to 5 minutes including menus, so about 45 coins per minute).

### 10.2 Prices

| Category | Total coins to buy everything |
|---|---|
| Characters (coin-bought: 61 of 100) | 75,180 |
| Kart bodies (42) | 34,050 |
| Wheel styles (sizes and rim colours free) | 8,100 |
| Spoilers | 4,150 |
| Exhausts | 3,400 |
| Bumpers | 2,450 |
| Paint, finishes, two-tones, decals | 6,320 |
| **Everything** | **133,650** |

Unlock plan: most content is bought with coins; the rest is earned from trophies and achievements. A dedicated set of 12 free starters is available on first launch. Players can unlock all 100 characters in about **28 hours** of play, and everything else in roughly 50 hours; none of it requires money.

### 10.3 No pay-to-win

* Money (optional) buys **cosmetics only**: kart skins, trails, emotes, announcer packs, horn sounds, profile frames. These have no stats and are marked "Cosmetic".
* Every body has the same stat sum (22). Mods have trade-offs; total modifier per stat is capped at ±1.5.
* Online matches show **no stat badges**; karts are matched by cup class, not wallet.

### 10.4 Save and cloud profile
Local save in IndexedDB/SQLite with a version number, mirrored to a cloud profile tied to the player account (platform sign-in or email). Conflict rule: per-record last-write-wins with max() for currencies spent only counted once, via a transaction log.

---

## 11. Multiplayer flow and netcode

### 11.1 Room codes
* **Alphabet (20 unambiguous symbols):** `A C D E F H J K M N P R T U W X Y 3 4 7`. Removed look-alike and sound-alike symbols: `0 O Q`, `1 I L`, `5 S`, `2 Z`, `8 B`, `6 G`, `9`, `V`. Codes are shown in two groups of three, e.g. `K7A MPC`, and read aloud with NATO-style words.
* Space: 20⁶ = 64,000,000 codes. A code expires after 2 hours of inactivity; the server checks collisions.
* Rooms are stored on a simple matchmaking service (a serverless key-value store with a TTL; WebSocket signalling).

### 11.2 Flow
1. **Host** taps *Create Room* → server returns a code → lobby opens with host settings (track, laps, items on/off, CPU fill, difficulty).
2. **Guests** enter the code → server returns the host's connection offer → peers connect (WebRTC data channels, or dedicated relay).
3. **Lobby** shows each player (avatar, kart, ready tick, **connection status**: green/amber/red bars with ping in ms, "relayed" tag).
4. Host starts → synchronised 3-2-1 countdown (all clients start on a shared server time).
5. Race → results → return to lobby.

### 11.3 Join, leave, drop
* **Join late:** blocked during a race; allowed in the lobby until 4 humans.
* **Leave:** a CPU takes the kart immediately (same position, speed, item).
* **Drop (connection lost):** the other players see a "reconnecting" ring; the kart is held by a CPU for 6 s; if the player returns within 30 s they take it back; otherwise the CPU keeps it.
* **Host migration:** every client keeps a replica of the lobby/race state. If the host drops, the client with the lowest RTT to the others becomes host (tie-break: lowest peer id). The new host announces the migration, race state is re-sent in one snapshot, and the countdown "pauses briefly" (max 3 s) to resume.

### 11.4 Netcode model
* **Own kart:** client-side prediction. Movement is simulated locally and is authoritative for its own position.
* **Remote karts:** state snapshots at **20 Hz** (position quantised to 1 cm, heading 8 bit, speed, drift state, boost flags, animation bits) and **interpolated 100 ms** in the past, with dead-reckoning (extrapolation) up to 250 ms.
* **Items:** host-authoritative events with timestamps. Spawn events carry the host's time; the clients **fast-forward** the projectile by RTT/2 so it appears where it should. Hit resolution is decided on the *victim's* client (victim sees fair dodges) and validated by the host against a 120 ms rewind window; late hits are accepted only inside the window.
* **Race results:** host-authoritative; checkpoints validated by sequence number.
* **Bandwidth:** about 20 players × 50 bytes × 20 Hz = well under 25 KB/s for 4 humans + CPU on host.
* **CPUs:** simulated by the host, streamed as normal karts.
* **Anti-cheat:** speed envelope check, checkpoint order, item-spawn rate check; no stat badges to avoid targeting.

### 11.5 Connection status UI
A coloured bar icon in the lobby and in-race corner: green (<60 ms), amber (60 to 140 ms), red (>140 ms or loss >5%), grey (reconnecting). Tapping shows RTT, loss, relayed/direct.

---

## 12. HUD

| Element | Placement | Notes |
|---|---|---|
| Race position ("3rd / 12") | top-left | big numerals with a colour pop on change |
| Lap counter ("Lap 2 / 3") | top-left under position | flash on new lap |
| Item slot | top-centre, offset | ring shows shield state; rocket warning replaces the reticle |
| Minimap | top-right | rotated track outline, coloured dots, player arrow |
| Speed readout | bottom-centre small | m/s × 4 |
| Drift charge arc | around the kart (3D sparks) and thin bar under the drift button | colour+shape coded |
| Race timer / lap split | top-right under the minimap | |
| Boost / draft indicators | around the screen edge | subtle |
| Controls | bottom corners | semi-transparent, never over the road centre |
| Notifications | upper centre, short | "Shortcut!", "Perfect start!", "Final lap!" |

The racing line (the central 40% of the screen width from the kart to the horizon) is kept free of HUD elements.

---

## 13. Art direction

* **Style:** stylised PBR, "high-end stylised console kart". Saturated but controlled: each track palette has a dominant hue, an accent hue and a neutral. No neon sludge, no uncanny realism.
* **Materials:** glossy clear-coat paint with flake, matte rubber with tread normal map, brushed metal rims, cloth on characters, subsurface-looking fur.
* **Lighting:** one warm key light, a cool fill, and a strong rim light on karts so they separate from the background at speed. Baked ground lightmaps per track; soft cascaded shadows only on the player and nearest rivals.
* **Silhouette rules:** each character has a unique head and body silhouette (see `02-roster.md`); each kart family has its own shape language (Cruiser: friendly arcs, Dart: spears, Drifter: low wedges, Bruiser: boxes, Rocket: bottles/flames, Oddball: props).
* **Effects:** boost trails (stretching ribbons), drift sparks (blue/orange/purple), dust and snow kick-up per surface, screen shake on big hits (max 6 px, 0.25 s), speed lines at boost, FOV kick +8° on boost.
* **Readability:** hazards use a fixed visual language (yellow-black chevrons, pulsing telegraph decal), shortcut entries use arrows and a light-gate.
* **Characters** are expressive and thumbnail-readable: eyes and brows carry emotion, 3 expression states (neutral, joy, hit).

---

## 14. Audio and sound design

Sound is the top priority of this project. The audio system is designed as an integrated, dynamic mix.

### 14.1 Pillars
1. **Everything the player does is audible and satisfying:** engine, drift, boost, hop, land, bump, item.
2. **Information first:** the mix lets the player hear a rocket lock, a thunder arming, a shortcut gate or a rival's engine behind them.
3. **Dynamic music:** layered stems that react to position, speed, items, and the final lap.
4. **Never harsh:** a master limiter, ducking, and equal-loudness mastering (target −16 LUFS, true peak −1 dB).

### 14.2 Mixer topology
```
Engines ───┐
Drift ─────┤
Boost ─────┤
SFX ───────┼─► SFX bus ──────┐
UI ────────┤                 │
Ambience ──► Ambience bus ───┤
Crowd ─────► Crowd bus ──────┼─► Master (soft-clip + limiter) ─► Output
Music stems ► Music bus ─────┤
Announcer ─┐                 │
Barks ─────┴► Voice bus ─────┘   (Voice ducks Music −8 dB, Ambience −4 dB, 0.15 s attack / 0.6 s release)
```
* Master: gentle soft-clipper then a lookahead limiter (threshold −1.5 dBFS, ratio 20:1, 3 ms attack, 120 ms release).
* Reverb sends per environment: Open (meadow, savanna), Tunnel (cave, tube), Canyon, Hall (foundry, spaceport), Metal (harbor), Ice.
* Ducking: voice → music/ambience; crash → engines (−6 dB, 150 ms); rocket warning → music (−5 dB).
* Mobile: max 32 simultaneous voices, priority by event class, with voice stealing for low-priority sounds. Spatial audio for the three nearest rivals (equal-power panning, distance attenuation, Doppler via playback rate).

### 14.3 Engines (layered, per class)
Each class has its own engine character:

| Class | Character | Base fundamental (idle to redline) | Layers |
|---|---|---|---|
| Light | Buzzy two-stroke / small electric whine | 55 to 210 Hz | body saw, high harmonics, intake hiss, whine |
| Medium | Tuned four-cylinder | 40 to 160 Hz | body, mid growl, intake, turbo spool |
| Heavy | Deep V8 rumble | 28 to 110 Hz | sub, body, burble, exhaust crackle |

Each class ships **six RPM layers** (idle, 25%, 45%, 65%, 85%, redline) rendered as seamless loops; the game crossfades adjacent layers by RPM and bends pitch ±12% inside each. RPM follows speed with gear-like steps for flavour (a shift dip on the way up). Layers beyond the engine: turbo spool (rises with throttle, whoosh on lift), backfire pops on release, boost roar, off-road rumble and tyre noise by surface.

### 14.4 Drift, tyres and wind
* **Drift squeal:** a resonant noise loop whose pitch and gain follow slip angle and speed. Different timbres for road, snow and sand (road squeal, snow crunch, sand hiss).
* **Tier ticks:** blue/orange/purple threshold tones rising in pitch, plus a spark crackle layer.
* **Wind:** speed-driven broadband noise, widening with FOV kick.

### 14.5 Boosts, items and impacts
* **Boost whooshes by tier** (tier 1 short airy, tier 2 wider with a rising whistle, tier 3 deep with a sub hit and shimmer), start boost "punch", Turbo Pod "pop-whoosh", boost pad "zip".
* **Item pickup** (sparkly arpeggio), roulette tick while the slot spins, **use** and **hit** sounds for every item (disc launch/bounce/pop, peel splat, spill glug, jolt thunder with 1.5 s arming rumble, nova jingle loop, veil whisper, rocket launch/flight loop/lock beeps/explosion).
* **Impacts:** kart bump (clunk, weight-scaled), wall scrape (metal on stone), head-on crash (thud + shake whump), spin-out (cartoon whirl).

### 14.6 Announcer and barks
* **Announcer:** an energetic voice: "3, 2, 1, GO!", "Final lap!", "Lap two", position callouts ("You're in 3rd!", "Taking the lead!", "You're in 1st!", "Wrong way!"), "Race complete", "New record", "Shortcut!".
* **Character barks:** each playable character has 10+ barks (pickup, hit, boost, overtake, being overtaken, victory, defeat, taunt, ready, start) in a distinct voice and pitch band by class (Light higher, Heavy lower).
* Voice lines have cooldowns (min 2.5 s between barks, no repeats back-to-back) and priority (announcer > player bark > rival bark).

### 14.7 Ambience and crowd
Each track has an ambience bed (loop) with stereo spots: meadow birds and breeze, harbor gulls and horns, desert wind, snow wind and cable-car creak. Crowds swell at start, finish and for overtakes, with gasps on big hits.

### 14.8 Dynamic music
Each track and the menu has an original score at the track's BPM (see `04-tracks.md`), delivered as **six synchronised stems**: *drums, bass, chords, lead, counter (arp/pad), fx/percussion*. All stems share a loop length of 64 bars worth of material in two sections (A and B).

| Game state | Music response |
|---|---|
| Pre-race | Chords + counter only, quiet |
| Race start | All stems enter on the downbeat of the GO |
| Position 1 to 3 | full mix, lead + counter prominent |
| Position 4 to 8 | drums+bass+chords, lead softened |
| Position 9 to 12 | add urgent perc/fx and a +2 dB push to drums |
| Boost / star | filter open, lead +3 dB |
| Hit / spin-out | low-pass sweep for 0.8 s, then return |
| Final lap | tempo ramps +6% over 4 s, lead octave lift, fx stem added |
| Finish | cut to the result jingle (original), then a calm loop |

Transitions are beat-quantised (stem gains ramp on the next beat). Stems are exported as lossless 48 kHz / 24-bit masters (high-quality pack) and as AAC for the standard pack.

### 14.9 Audio performance and QA
* Standard pack: AAC music (about 64 kbps per stem), PCM SFX at 32 kHz, voices at 24 kHz (core under 6 MB on first load, music loaded per track).
* High-quality pack: FLAC 48 kHz/24-bit stems and masters, on demand per track and per character.
* Test: decode all assets on load; headless AudioContext checks; loudness (EBU R128) check; clipping scan; ducking verification.

---

## 15. Live-ops, safety and monetisation (summary)

* Seasonal cosmetic passes (free + optional paid cosmetics only), daily and weekly challenges, community ghost races.
* Child-safe: no chat (preset emotes only), no open voice, private code rooms.
* Telemetry: opt-in, anonymous, performance and funnel only.
* Cheating: server-validated results for ranked/daily boards.

---

## 16. Cross-references

* Roster: `02-roster.md` · Karts and mods: `03-kart-and-mod-matrix.md` · Tracks: `04-tracks.md`
* Vertical slice: `05-vertical-slice-plan.md` · Production, risks, performance budget: `06-production-risks-perf.md`
