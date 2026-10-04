# Kart bodies: name|family|S|A|H|G|W|description|price (0 = free starter)
# S=top speed, A=acceleration, H=handling, G=drift grip; each body has S+A+H+G = 22 (no pay-to-win: every body has the same power budget). W=weight 1-10.
BODIES_RAW = """
Corsa Standard|Cruiser|6|5|6|5|5|The all-rounder every driver learns on: a red open-wheel with a friendly nose|0
Wayfarer|Cruiser|5|6|5|6|5|Roadster with a small windscreen and a luggage rack|300
Trailblazer|Cruiser|5|5|5|7|6|Raised suspension and a roll hoop, confident on dirt|450
Cobblestone|Cruiser|6|4|6|6|6|Stout tourer with chunky fenders|500
Daybreak|Cruiser|6|6|5|5|4|Sunrise-yellow coupe with a long hood|550
Marlin GT|Cruiser|7|5|5|5|5|Fish-shaped grand tourer with a gill vent|700
Hatchling|Cruiser|4|7|6|5|3|Egg-round little hatchback that leaps off the line|350
Needle|Dart|9|3|5|5|3|Ultra-narrow dart that wants a long straight|600
Javelin|Dart|8|4|5|5|4|Spear-nosed racer with a single tail fin|700
Peregrine|Dart|8|3|6|5|2|Falcon-winged lightweight with swept canopies|900
Comet Tail|Dart|9|4|4|5|4|Long-tailed streamliner that leaves a bright wake|1100
Silverfin|Dart|7|4|6|5|4|Silver sports car with a shark-fin roof|800
Vandal|Dart|8|5|3|6|5|Rough street-racer with spray-paint trim|950
Rapier|Dart|7|3|7|5|2|Needle-nosed fencer that carves tidy lines|1000
Slidewinder|Drifter|4|5|6|7|4|Low serpent body with a spiral exhaust|350
Pirouette|Drifter|3|5|8|6|2|Ballerina-shaped lightweight, precise on tight turns|900
Skiff|Drifter|4|4|7|7|3|Boat-hull kart that glides sideways|650
Whirligig|Drifter|3|6|7|6|3|Spinning-top body with a rotating roof fan|800
Tango|Drifter|5|4|6|7|4|Two-tone dancer with a flared tail|700
Chicane|Drifter|4|5|5|8|5|Rally-bred car with huge side skirts|1000
Cornerstone|Drifter|5|3|7|7|4|Wedge-shaped tight-corner specialist|1200
Ironclad|Bruiser|7|2|4|9|10|Armour-plated brick on tracks, nothing moves it|1000
Bulwark|Bruiser|6|3|5|8|9|Shield-nosed tank with side bumpers|1100
Mammoth|Bruiser|8|2|3|9|10|Tusked front bumper, enormous rear tyres|1500
Rhino Cab|Bruiser|7|3|4|8|9|Horned taxi cab that clears the road|1300
Dozer|Bruiser|5|4|4|9|8|Yellow bulldozer blade, slow to start but unstoppable|900
Brickhouse|Bruiser|6|4|4|8|9|Boxy brick kart with a chimney exhaust|1000
Gantry Hauler|Bruiser|7|2|5|8|10|Cargo hauler with a flatbed and crane arm|1400
Pogo|Rocket|3|9|5|5|2|Spring-loaded pogo kart that explodes off the line|0
Sparkplug|Rocket|4|8|5|5|3|Compact hot-rod with exposed engine|400
Kickstart|Rocket|4|8|4|6|4|Motorcycle-engine kart with visible chain drive|600
Bottle Rocket|Rocket|5|9|3|5|3|Bottle-shaped body with a flame nozzle|1000
Ignition|Rocket|5|7|5|5|4|Muscle car with twin tailpipes|700
Hotshot|Rocket|4|7|6|5|3|Flame-decal short-wheelbase racer|800
Lift-off|Rocket|3|8|6|5|2|Capsule body with a tiny rocket booster|1100
Tubby Tub|Oddball|5|5|3|9|7|Bathtub on four wheels with a rubber duck|800
Pumpkin Coach|Oddball|6|4|6|6|6|Carved pumpkin carriage with lantern lights|1000
Teacup Twister|Oddball|3|6|9|4|2|Giant spinning teacup that turns on a dime|900
Mail Run|Oddball|6|6|4|6|5|Rural mailbox on wheels with a flag that pops up on boosts|600
Sneaker Sled|Oddball|4|7|7|4|3|Oversized sneaker with a laced-up cockpit|750
Cheese Wedge|Oddball|8|5|4|5|4|Triangular cheese wedge with holes and a mouse mascot|1200
Hover Pancake|Oddball|5|3|8|6|1|Floating stack of pancakes on small hover pads|1500
"""
def bodies():
    out=[]
    for l in BODIES_RAW.strip().split("\n"):
        n,f,S,A,H,G,W,d,p = l.split("|")
        b=dict(name=n,family=f,S=int(S),A=int(A),H=int(H),G=int(G),W=int(W),desc=d,price=int(p))
        out.append(b)
    return out

# Wheel styles: name|tire|dS|dA|dH|dG|dW|offroad|description|price   (deltas at size 14")
WHEELS_RAW = """
Six-Spoke Standard|Street|0|0|0|0|0|0|Classic six-spoke alloy|0
Turbine Fan|Street|0.3|-0.2|0|0|0|0|Fan-blade rim, tuned for top speed|250
Mesh Classic|Street|0|0.2|0|-0.1|-0.2|0|Lightweight mesh rim|250
Dish Deep|Racing|0.2|0|0.1|-0.1|0.2|0|Deep-dish chrome look|350
Starburst|Street|0|0.1|0.2|0|0|0|Ten-spoke star rim|300
Slick Racing|Slick|0.2|0|0|0.5|0|-0.5|Slick compound, loves tarmac, hates dirt|500
Trail Grip|Trail|-0.2|0|0|0.1|0.2|0.6|Knobbly trail tyres for shortcuts|450
Mudder|Mud|-0.3|0|0|0.2|0.4|1.0|Deep-lug mud tyres, best off-road|600
Balloon Soft|Balloon|-0.3|0.1|0.2|0|0.2|0.3|Soft balloon tyres that absorb bumps|400
Featherweight|Carbon|0.1|0.4|0|-0.2|-0.5|-0.2|Carbon rims, ultra light|700
Anvil Steel|Street|0|-0.3|0|0.2|0.5|0.1|Heavy steel rims, planted|400
Rally Grip|Trail|0|0.1|0.1|0.3|0|0.4|Rally compound all-rounder|550
Ice Studs|Studded|-0.1|0|0|0.3|0.1|0.2|Studded for slippery ice sections|500
Hover Pad|Hover|-0.2|0.2|0.3|-0.2|-0.6|0.5|Short hover pads, light but loose|900
Flywheel|Racing|0.3|-0.1|0|0|0.3|0|Flywheel-balanced racing rim|650
Spinner Disc|Racing|0.1|0.1|0.1|0|0|0|Disc cover with a spinner|500
Candy Cane|Street|0|0|0.2|0.1|0|0|Striped twisted spoke|350
Gearwheel|Street|0|0.2|0|0.1|0.1|0|Cog-shaped rim, clanks on corners|450
"""
WHEEL_SIZES = [  # inches: dS,dA,dH,dG,dW
 ('12"', -0.40, 0.40, 0.20, 0.10, -0.2),
 ('13"', -0.20, 0.20, 0.10, 0.05, -0.1),
 ('14"',  0.00, 0.00, 0.00, 0.00, 0.0),
 ('15"',  0.20,-0.20,-0.10,-0.05, 0.1),
 ('16"',  0.40,-0.40,-0.20,-0.10, 0.2),
]
RIM_COLORS = ["Chrome","Gunmetal","Gold","Bronze","Signal Red","Cherry","Sunset Orange","Lemon","Lime","Mint","Teal","Sky Blue","Cobalt","Violet","Hot Pink","Pearl White","Jet Black","Rainbow Anodized"]
RIM_FINISHES = ["Polished","Satin","Anodized"]

# Spoilers: name|dS|dA|dH|dG|dW|description|price
SPOILERS_RAW = """
None|0|0|0|0|0|No wing|0
Low Lip|0.1|0|0|0.1|0|Small ducktail lip|100
Duck Tail|0.1|0.1|0|0.1|0.1|Classic ducktail|150
GT Wing|0.2|-0.1|0|0.3|0.1|Large wing, more grip at speed|300
Dual Plane|0.3|-0.2|0|0.3|0.2|Double-element wing for fast tracks|450
Swan Neck|0.2|0|-0.1|0.4|0.1|Swan-neck mount, strong downforce|500
Barn Door|-0.1|-0.3|0.1|0.6|0.3|Huge barn-door wing, great grip but slow|450
Shark Fin|0.1|0.1|0.3|0|0|Vertical fin for crisp handling|350
Roof Scoop|0|0.3|0|0|0.1|Intake scoop, helps accel|350
Twin Tail|0.2|0.1|0.1|0|0|Twin-tail rudders|500
Pop-up Flap|0.3|-0.3|0|0.1|0|Air-brake flap used on long straights|400
Feather Wing|0.1|0.2|0|-0.1|-0.3|Carbon feather-light wing|600
"""
EXHAUSTS_RAW = """
Stock Pipe|0|0|0|0|0|Standard single tailpipe|0
Twin Chrome|0.1|0.1|0|0|0.1|Twin chrome pipes|150
Side Pipes|0|0.2|0|0|0|Side-exit pipes|200
Megaphone|0.2|0.1|0|0|0.1|Loud megaphone exhaust|250
Upswept|0.1|0|0.1|0|0|Upswept pipe, tiny gain in clearance|250
Flame Thrower|0|0.3|0|-0.1|0.1|Shoots flames on boost|400
Quad Stack|0.3|0.1|0|-0.1|0.2|Four-barrel stack|500
Turbo Whistle|0.1|0.3|0|0|0|Whistling turbo exhaust|550
Bubbler|0|0.1|0.1|0.1|0|Blows bubbles on boost|400
Rocket Nozzle|0.4|0.3|-0.1|-0.1|0.2|Single rocket nozzle, high power but demanding|700
"""
BUMPERS_RAW = """
Stock Bumper|0|0|0|0|0|Standard bumper|0
Rubber Pusher|0|0|0|0.1|0.2|Soft rubber bumper that shrugs off bumps|200
Splitter|0.1|0|0.1|0|-0.1|Aero splitter|300
Cow Catcher|-0.1|-0.1|0|0|0.4|Heavy cow-catcher grille|350
Spike Guard|0|0|0|0.1|0.3|Decorative spikes, increases push-through|400
Tiny Bumper|0.1|0.1|0.1|-0.1|-0.3|Minimal bumper for lightness|450
Rubber Duck Horn|0|0.1|0|0|0.1|Squeaky horn bumper (cosmetic horn sound)|250
Twin Prongs|0.1|0|0.2|0|0.1|Forked prongs for light contact|500
"""
def parse_mods(raw, keys=("S","A","H","G","W")):
    out=[]
    for l in raw.strip().split("\n"):
        p=l.split("|"); n=p[0]; d=[float(x) for x in p[1:6]]; desc=p[6]; price=int(p[7])
        out.append(dict(name=n, **dict(zip(keys,d)), desc=desc, price=price))
    return out
def wheels():
    out=[]
    for l in WHEELS_RAW.strip().split("\n"):
        n,tire,S,A,H,G,W,off,desc,price = l.split("|")
        out.append(dict(name=n,tire=tire,S=float(S),A=float(A),H=float(H),G=float(G),W=float(W),off=float(off),desc=desc,price=int(price)))
    return out

DECALS = ["Racing Stripes","Twin Stripes","Checker Flag","Lightning Bolt","Flame Licks","Polka Dots","Star Field","Camo Splash","Zigzag","Wave Crest","Honeycomb","Number 7","Number 42","Number 99","Sun Burst","Skull & Wrenches","Paw Prints","Leaf Pattern","Snowflakes","Circuit Lines","Candy Swirl","Tiger Stripes","Argyle","Galaxy Swirl"]
PAINT_COLORS = ["Cherry Red","Sunset Orange","Marigold","Lemon Zest","Lime Pop","Meadow Green","Mint Julep","Teal Wave","Sky Blue","Cobalt","Indigo Night","Violet Haze","Orchid","Hot Pink","Bubblegum","Coral","Chocolate","Sandstone","Pearl White","Ice Silver","Gunmetal","Jet Black","Midnight Blue","Forest","Rust","Peach","Aqua","Lavender","Burgundy","Olive","Turquoise","Gold Leaf"]
PAINT_FINISHES = ["Gloss","Matte","Metallic","Pearl","Candy"]
TWO_TONE = ["Hood Stripe","Split Down","Roof Cap","Fade Front-Back","Racing Number Panel","Bib","Lower Skirt","Diagonal"]
