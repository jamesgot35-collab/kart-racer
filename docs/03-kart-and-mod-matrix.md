# Kart and Modification Matrix

**42 kart bodies** in 6 families of 7, plus separate wheel sets (18 styles × 5 sizes × 18 colours × 3 finishes), 12 spoilers, 10 exhausts, 8 bumpers, 24 decals and 32 paint colours × 5 finishes with 8 two-tone layouts. Every kart can be modified. Every combination is legal.

## Stat model

Stats are 1 to 10: **S** top speed, **A** acceleration, **H** handling, **G** drift grip, **W** weight. **Rule: every body has S + A + H + G = 22** (no body is strictly better). Weight is free (1 to 10) and trades bump strength against acceleration feel.

Final stat = body + character class modifier + wheel + wheel size + spoiler + exhaust + bumper. The sum of mods on each stat is capped at ±1.5. Paint, decals and rim colour never change stats.

| Stat | Formula | Range |
|---|---|---|
| Top speed (S) | 34 + 1.2·S m/s | 35.2 to 46.0 m/s |
| Acceleration (A) | t90 = 6.4 − 0.38·A s | 6.0 s to 2.6 s |
| Handling (H) | yaw cap scaled (0.72 + 0.03·H) | tighter turns |
| Grip (G) | lat. accel 18 + 1.6·G m/s² | 19.6 to 34 m/s² |
| Weight (W) | mass 0.7 + 0.12·W | 0.82 to 1.9 |

## Kart bodies

| # | Body | Family | S | A | H | G | W | Sum(S+A+H+G) | Top speed m/s (Medium class) | 0 to 90% s | Price (coins) | Description |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Corsa Standard** | Cruiser | 6 | 5 | 6 | 5 | 5 | 22 | 41.2 | 4.50 | Free | The all-rounder every driver learns on: a red open-wheel with a friendly nose |
| 2 | **Wayfarer** | Cruiser | 5 | 6 | 5 | 6 | 5 | 22 | 40.0 | 4.12 | 300 | Roadster with a small windscreen and a luggage rack |
| 3 | **Trailblazer** | Cruiser | 5 | 5 | 5 | 7 | 6 | 22 | 40.0 | 4.50 | 450 | Raised suspension and a roll hoop, confident on dirt |
| 4 | **Cobblestone** | Cruiser | 6 | 4 | 6 | 6 | 6 | 22 | 41.2 | 4.88 | 500 | Stout tourer with chunky fenders |
| 5 | **Daybreak** | Cruiser | 6 | 6 | 5 | 5 | 4 | 22 | 41.2 | 4.12 | 550 | Sunrise-yellow coupe with a long hood |
| 6 | **Marlin GT** | Cruiser | 7 | 5 | 5 | 5 | 5 | 22 | 42.4 | 4.50 | 700 | Fish-shaped grand tourer with a gill vent |
| 7 | **Hatchling** | Cruiser | 4 | 7 | 6 | 5 | 3 | 22 | 38.8 | 3.74 | 350 | Egg-round little hatchback that leaps off the line |
| 8 | **Needle** | Dart | 9 | 3 | 5 | 5 | 3 | 22 | 44.8 | 5.26 | 600 | Ultra-narrow dart that wants a long straight |
| 9 | **Javelin** | Dart | 8 | 4 | 5 | 5 | 4 | 22 | 43.6 | 4.88 | 700 | Spear-nosed racer with a single tail fin |
| 10 | **Peregrine** | Dart | 8 | 3 | 6 | 5 | 2 | 22 | 43.6 | 5.26 | 900 | Falcon-winged lightweight with swept canopies |
| 11 | **Comet Tail** | Dart | 9 | 4 | 4 | 5 | 4 | 22 | 44.8 | 4.88 | 1,100 | Long-tailed streamliner that leaves a bright wake |
| 12 | **Silverfin** | Dart | 7 | 4 | 6 | 5 | 4 | 22 | 42.4 | 4.88 | 800 | Silver sports car with a shark-fin roof |
| 13 | **Vandal** | Dart | 8 | 5 | 3 | 6 | 5 | 22 | 43.6 | 4.50 | 950 | Rough street-racer with spray-paint trim |
| 14 | **Rapier** | Dart | 7 | 3 | 7 | 5 | 2 | 22 | 42.4 | 5.26 | 1,000 | Needle-nosed fencer that carves tidy lines |
| 15 | **Slidewinder** | Drifter | 4 | 5 | 6 | 7 | 4 | 22 | 38.8 | 4.50 | 350 | Low serpent body with a spiral exhaust |
| 16 | **Pirouette** | Drifter | 3 | 5 | 8 | 6 | 2 | 22 | 37.6 | 4.50 | 900 | Ballerina-shaped lightweight, precise on tight turns |
| 17 | **Skiff** | Drifter | 4 | 4 | 7 | 7 | 3 | 22 | 38.8 | 4.88 | 650 | Boat-hull kart that glides sideways |
| 18 | **Whirligig** | Drifter | 3 | 6 | 7 | 6 | 3 | 22 | 37.6 | 4.12 | 800 | Spinning-top body with a rotating roof fan |
| 19 | **Tango** | Drifter | 5 | 4 | 6 | 7 | 4 | 22 | 40.0 | 4.88 | 700 | Two-tone dancer with a flared tail |
| 20 | **Chicane** | Drifter | 4 | 5 | 5 | 8 | 5 | 22 | 38.8 | 4.50 | 1,000 | Rally-bred car with huge side skirts |
| 21 | **Cornerstone** | Drifter | 5 | 3 | 7 | 7 | 4 | 22 | 40.0 | 5.26 | 1,200 | Wedge-shaped tight-corner specialist |
| 22 | **Ironclad** | Bruiser | 7 | 2 | 4 | 9 | 10 | 22 | 42.4 | 5.64 | 1,000 | Armour-plated brick on tracks, nothing moves it |
| 23 | **Bulwark** | Bruiser | 6 | 3 | 5 | 8 | 9 | 22 | 41.2 | 5.26 | 1,100 | Shield-nosed tank with side bumpers |
| 24 | **Mammoth** | Bruiser | 8 | 2 | 3 | 9 | 10 | 22 | 43.6 | 5.64 | 1,500 | Tusked front bumper, enormous rear tyres |
| 25 | **Rhino Cab** | Bruiser | 7 | 3 | 4 | 8 | 9 | 22 | 42.4 | 5.26 | 1,300 | Horned taxi cab that clears the road |
| 26 | **Dozer** | Bruiser | 5 | 4 | 4 | 9 | 8 | 22 | 40.0 | 4.88 | 900 | Yellow bulldozer blade, slow to start but unstoppable |
| 27 | **Brickhouse** | Bruiser | 6 | 4 | 4 | 8 | 9 | 22 | 41.2 | 4.88 | 1,000 | Boxy brick kart with a chimney exhaust |
| 28 | **Gantry Hauler** | Bruiser | 7 | 2 | 5 | 8 | 10 | 22 | 42.4 | 5.64 | 1,400 | Cargo hauler with a flatbed and crane arm |
| 29 | **Pogo** | Rocket | 3 | 9 | 5 | 5 | 2 | 22 | 37.6 | 2.98 | Free | Spring-loaded pogo kart that explodes off the line |
| 30 | **Sparkplug** | Rocket | 4 | 8 | 5 | 5 | 3 | 22 | 38.8 | 3.36 | 400 | Compact hot-rod with exposed engine |
| 31 | **Kickstart** | Rocket | 4 | 8 | 4 | 6 | 4 | 22 | 38.8 | 3.36 | 600 | Motorcycle-engine kart with visible chain drive |
| 32 | **Bottle Rocket** | Rocket | 5 | 9 | 3 | 5 | 3 | 22 | 40.0 | 2.98 | 1,000 | Bottle-shaped body with a flame nozzle |
| 33 | **Ignition** | Rocket | 5 | 7 | 5 | 5 | 4 | 22 | 40.0 | 3.74 | 700 | Muscle car with twin tailpipes |
| 34 | **Hotshot** | Rocket | 4 | 7 | 6 | 5 | 3 | 22 | 38.8 | 3.74 | 800 | Flame-decal short-wheelbase racer |
| 35 | **Lift-off** | Rocket | 3 | 8 | 6 | 5 | 2 | 22 | 37.6 | 3.36 | 1,100 | Capsule body with a tiny rocket booster |
| 36 | **Tubby Tub** | Oddball | 5 | 5 | 3 | 9 | 7 | 22 | 40.0 | 4.50 | 800 | Bathtub on four wheels with a rubber duck |
| 37 | **Pumpkin Coach** | Oddball | 6 | 4 | 6 | 6 | 6 | 22 | 41.2 | 4.88 | 1,000 | Carved pumpkin carriage with lantern lights |
| 38 | **Teacup Twister** | Oddball | 3 | 6 | 9 | 4 | 2 | 22 | 37.6 | 4.12 | 900 | Giant spinning teacup that turns on a dime |
| 39 | **Mail Run** | Oddball | 6 | 6 | 4 | 6 | 5 | 22 | 41.2 | 4.12 | 600 | Rural mailbox on wheels with a flag that pops up on boosts |
| 40 | **Sneaker Sled** | Oddball | 4 | 7 | 7 | 4 | 3 | 22 | 38.8 | 3.74 | 750 | Oversized sneaker with a laced-up cockpit |
| 41 | **Cheese Wedge** | Oddball | 8 | 5 | 4 | 5 | 4 | 22 | 43.6 | 4.50 | 1,200 | Triangular cheese wedge with holes and a mouse mascot |
| 42 | **Hover Pancake** | Oddball | 5 | 3 | 8 | 6 | 1 | 22 | 40.0 | 5.26 | 1,500 | Floating stack of pancakes on small hover pads |

### Family traits

| Family | Identity | Typical strength | Typical weakness |
|---|---|---|---|
| Cruiser | Friendly all-rounders | balanced | no standout |
| Dart | Spear-nosed speedsters | top speed | slow acceleration |
| Drifter | Low wedges and boats | handling + grip | low top speed |
| Bruiser | Armoured bricks | weight, top speed | slow acceleration, poor handling |
| Rocket | Bottles, flames, springs | acceleration | handling |
| Oddball | Props and fun shapes | unique trade-offs | uneven |

Free starter bodies: Corsa Standard, Pogo.

## Wheels

**18 rim styles.** Deltas below are for the 14" size; apply the size table on top.

| Style | Tire compound | S | A | H | G | W | Off-road | Description | Price |
|---|---|---|---|---|---|---|---|---|---|
| **Six-Spoke Standard** | Street | +0 | +0 | +0 | +0 | +0 | +0 | Classic six-spoke alloy | Free |
| **Turbine Fan** | Street | +0.3 | -0.2 | +0 | +0 | +0 | +0 | Fan-blade rim, tuned for top speed | 250 |
| **Mesh Classic** | Street | +0 | +0.2 | +0 | -0.1 | -0.2 | +0 | Lightweight mesh rim | 250 |
| **Dish Deep** | Racing | +0.2 | +0 | +0.1 | -0.1 | +0.2 | +0 | Deep-dish chrome look | 350 |
| **Starburst** | Street | +0 | +0.1 | +0.2 | +0 | +0 | +0 | Ten-spoke star rim | 300 |
| **Slick Racing** | Slick | +0.2 | +0 | +0 | +0.5 | +0 | -0.5 | Slick compound, loves tarmac, hates dirt | 500 |
| **Trail Grip** | Trail | -0.2 | +0 | +0 | +0.1 | +0.2 | +0.6 | Knobbly trail tyres for shortcuts | 450 |
| **Mudder** | Mud | -0.3 | +0 | +0 | +0.2 | +0.4 | +1 | Deep-lug mud tyres, best off-road | 600 |
| **Balloon Soft** | Balloon | -0.3 | +0.1 | +0.2 | +0 | +0.2 | +0.3 | Soft balloon tyres that absorb bumps | 400 |
| **Featherweight** | Carbon | +0.1 | +0.4 | +0 | -0.2 | -0.5 | -0.2 | Carbon rims, ultra light | 700 |
| **Anvil Steel** | Street | +0 | -0.3 | +0 | +0.2 | +0.5 | +0.1 | Heavy steel rims, planted | 400 |
| **Rally Grip** | Trail | +0 | +0.1 | +0.1 | +0.3 | +0 | +0.4 | Rally compound all-rounder | 550 |
| **Ice Studs** | Studded | -0.1 | +0 | +0 | +0.3 | +0.1 | +0.2 | Studded for slippery ice sections | 500 |
| **Hover Pad** | Hover | -0.2 | +0.2 | +0.3 | -0.2 | -0.6 | +0.5 | Short hover pads, light but loose | 900 |
| **Flywheel** | Racing | +0.3 | -0.1 | +0 | +0 | +0.3 | +0 | Flywheel-balanced racing rim | 650 |
| **Spinner Disc** | Racing | +0.1 | +0.1 | +0.1 | +0 | +0 | +0 | Disc cover with a spinner | 500 |
| **Candy Cane** | Street | +0 | +0 | +0.2 | +0.1 | +0 | +0 | Striped twisted spoke | 350 |
| **Gearwheel** | Street | +0 | +0.2 | +0 | +0.1 | +0.1 | +0 | Cog-shaped rim, clanks on corners | 450 |

### Wheel sizes (all styles)

| Size | S | A | H | G | W |
|---|---|---|---|---|---|
| 12" | -0.4 | +0.4 | +0.2 | +0.1 | -0.2 |
| 13" | -0.2 | +0.2 | +0.1 | +0.05 | -0.1 |
| 14" | +0 | +0 | +0 | +0 | +0 |
| 15" | +0.2 | -0.2 | -0.1 | -0.05 | +0.1 |
| 16" | +0.4 | -0.4 | -0.2 | -0.1 | +0.2 |

Small wheels accelerate faster and turn tighter; large wheels have a higher top speed. Wheels are swappable on any kart. "Off-road" modifies the off-road top-speed multiplier by that fraction of the penalty recovered (+1.0 recovers 25 points of the 45% slow-down on grass).

### Rim colours and finishes (cosmetic)

Colours: Chrome, Gunmetal, Gold, Bronze, Signal Red, Cherry, Sunset Orange, Lemon, Lime, Mint, Teal, Sky Blue, Cobalt, Violet, Hot Pink, Pearl White, Jet Black, Rainbow Anodized.

Finishes: Polished, Satin, Anodized.

## Spoilers

| Name | S | A | H | G | W | Description | Price |
|---|---|---|---|---|---|---|---|
| **None** | +0 | +0 | +0 | +0 | +0 | No wing | Free |
| **Low Lip** | +0.1 | +0 | +0 | +0.1 | +0 | Small ducktail lip | 100 |
| **Duck Tail** | +0.1 | +0.1 | +0 | +0.1 | +0.1 | Classic ducktail | 150 |
| **GT Wing** | +0.2 | -0.1 | +0 | +0.3 | +0.1 | Large wing, more grip at speed | 300 |
| **Dual Plane** | +0.3 | -0.2 | +0 | +0.3 | +0.2 | Double-element wing for fast tracks | 450 |
| **Swan Neck** | +0.2 | +0 | -0.1 | +0.4 | +0.1 | Swan-neck mount, strong downforce | 500 |
| **Barn Door** | -0.1 | -0.3 | +0.1 | +0.6 | +0.3 | Huge barn-door wing, great grip but slow | 450 |
| **Shark Fin** | +0.1 | +0.1 | +0.3 | +0 | +0 | Vertical fin for crisp handling | 350 |
| **Roof Scoop** | +0 | +0.3 | +0 | +0 | +0.1 | Intake scoop, helps accel | 350 |
| **Twin Tail** | +0.2 | +0.1 | +0.1 | +0 | +0 | Twin-tail rudders | 500 |
| **Pop-up Flap** | +0.3 | -0.3 | +0 | +0.1 | +0 | Air-brake flap used on long straights | 400 |
| **Feather Wing** | +0.1 | +0.2 | +0 | -0.1 | -0.3 | Carbon feather-light wing | 600 |

## Exhausts

| Name | S | A | H | G | W | Description | Price |
|---|---|---|---|---|---|---|---|
| **Stock Pipe** | +0 | +0 | +0 | +0 | +0 | Standard single tailpipe | Free |
| **Twin Chrome** | +0.1 | +0.1 | +0 | +0 | +0.1 | Twin chrome pipes | 150 |
| **Side Pipes** | +0 | +0.2 | +0 | +0 | +0 | Side-exit pipes | 200 |
| **Megaphone** | +0.2 | +0.1 | +0 | +0 | +0.1 | Loud megaphone exhaust | 250 |
| **Upswept** | +0.1 | +0 | +0.1 | +0 | +0 | Upswept pipe, tiny gain in clearance | 250 |
| **Flame Thrower** | +0 | +0.3 | +0 | -0.1 | +0.1 | Shoots flames on boost | 400 |
| **Quad Stack** | +0.3 | +0.1 | +0 | -0.1 | +0.2 | Four-barrel stack | 500 |
| **Turbo Whistle** | +0.1 | +0.3 | +0 | +0 | +0 | Whistling turbo exhaust | 550 |
| **Bubbler** | +0 | +0.1 | +0.1 | +0.1 | +0 | Blows bubbles on boost | 400 |
| **Rocket Nozzle** | +0.4 | +0.3 | -0.1 | -0.1 | +0.2 | Single rocket nozzle, high power but demanding | 700 |

## Bumpers

| Name | S | A | H | G | W | Description | Price |
|---|---|---|---|---|---|---|---|
| **Stock Bumper** | +0 | +0 | +0 | +0 | +0 | Standard bumper | Free |
| **Rubber Pusher** | +0 | +0 | +0 | +0.1 | +0.2 | Soft rubber bumper that shrugs off bumps | 200 |
| **Splitter** | +0.1 | +0 | +0.1 | +0 | -0.1 | Aero splitter | 300 |
| **Cow Catcher** | -0.1 | -0.1 | +0 | +0 | +0.4 | Heavy cow-catcher grille | 350 |
| **Spike Guard** | +0 | +0 | +0 | +0.1 | +0.3 | Decorative spikes, increases push-through | 400 |
| **Tiny Bumper** | +0.1 | +0.1 | +0.1 | -0.1 | -0.3 | Minimal bumper for lightness | 450 |
| **Rubber Duck Horn** | +0 | +0.1 | +0 | +0 | +0.1 | Squeaky horn bumper (cosmetic horn sound) | 250 |
| **Twin Prongs** | +0.1 | +0 | +0.2 | +0 | +0.1 | Forked prongs for light contact | 500 |

## Paint, decals and finishes (cosmetic only, no stats)

**Paint colours (32):** Cherry Red, Sunset Orange, Marigold, Lemon Zest, Lime Pop, Meadow Green, Mint Julep, Teal Wave, Sky Blue, Cobalt, Indigo Night, Violet Haze, Orchid, Hot Pink, Bubblegum, Coral, Chocolate, Sandstone, Pearl White, Ice Silver, Gunmetal, Jet Black, Midnight Blue, Forest, Rust, Peach, Aqua, Lavender, Burgundy, Olive, Turquoise, Gold Leaf.

**Finishes (5):** Gloss, Matte, Metallic, Pearl, Candy (Gloss free; others 300 coins each).

**Two-tone layouts (8):** Hood Stripe, Split Down, Roof Cap, Fade Front-Back, Racing Number Panel, Bib, Lower Skirt, Diagonal.

**Decals (24):** Racing Stripes, Twin Stripes, Checker Flag, Lightning Bolt, Flame Licks, Polka Dots, Star Field, Camo Splash, Zigzag, Wave Crest, Honeycomb, Number 7, Number 42, Number 99, Sun Burst, Skull & Wrenches, Paw Prints, Leaf Pattern, Snowflakes, Circuit Lines, Candy Swirl, Tiger Stripes, Argyle, Galaxy Swirl.

Prices: paint colour 50 coins, finish 300, two-tone 200, decal 80.

## Which slot affects which stat

| Slot | S | A | H | G | W | Notes |
|---|---|---|---|---|---|---|
| Body | ● | ● | ● | ● | ● | Sets the base; sum of S+A+H+G fixed at 22 |
| Character class | ● | ● | ● | ● | ● | Light / Medium / Heavy modifiers |
| Wheel style | ● | ● | ● | ● | ● | Plus tire compound off-road behaviour |
| Wheel size | ● | ● | ● | ● | ● | 12" to 16" |
| Spoiler | ● | ● | ● | ● | ● |  |
| Exhaust | ● | ● | ● | ● | ● |  |
| Bumper | ● | ● | ● | ● | ● | Best for weight |
| Paint / decal / rim colour |  |  |  |  |  | Cosmetic only |

## Mod extremes (to check the cap)

| Stat | Best wheel | Best spoiler | Best exhaust | Best bumper | Total mod |
|---|---|---|---|---|---|
| Top speed | Turbine Fan | Dual Plane | Rocket Nozzle | Splitter | +1.50 (capped at ±1.5) |
| Acceleration | Featherweight | Roof Scoop | Flame Thrower | Tiny Bumper | +1.50 (capped at ±1.5) |
| Handling | Hover Pad | Shark Fin | Upswept | Twin Prongs | +1.10 (capped at ±1.5) |
| Grip | Slick Racing | Barn Door | Bubbler | Rubber Pusher | +1.40 (capped at ±1.5) |
| Weight | Anvil Steel | Barn Door | Quad Stack | Cow Catcher | +1.50 (capped at ±1.5) |
