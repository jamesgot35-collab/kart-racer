# Source of truth for the roster. name | class(L/M/H) | personality | idle | victory | silhouette hook
SETS = [
("Meadow Folk", "Woodland scouts, bakers and tinkerers from the Buttercup valleys. Warm earth tones, soft shapes, round silhouettes.", """
Pip Thistledown|L|Bubbly scout who narrates everything she does out loud|hops in place, straightening her acorn cap|cartwheel while petals burst from her satchel|tall acorn cap with a feather tuft
Bramble Quill|M|Grumpy hedgehog mechanic who secretly loves the cheering|polishes his spiky helmet with a rag|takes a deep bow and fans his quills like a peacock|spiky fan-shaped helmet
Marigold Hoofsworth|H|Gentle giant deer who bakes and hugs every rival after the race|chews a pastry, ears twitching|lifts the trophy overhead on her antlers|wide antler crown with ribbons
Fennel Vix|L|Sly fox courier who always claims she planned it|flicks her tail, checks a pocket watch|spins her tail like a fan and winks|huge swooshing tail
Hobb Mossback|H|Slow-talking tortoise farmer, completely unshakable|tucks head in and out of the shell|shell spins like a top with the trophy on it|domed moss-covered shell backpack
Juniper Wren|L|Songbird sprinter who hums the whole race|taps the steering wheel in rhythm|flaps up and lands on the kart nose, singing|tiny wings flared at the shoulders
Clover Dash|M|Over-caffeinated bunny who speed-reads the map|bounces on her toes|triple back-flip with a fist pump|long ears streaming behind
Otis Burrowby|M|Nearsighted mole engineer with unexpected genius|pushes thick goggles up his nose|pops out of a molehill holding the trophy|goggles and oversized digging claws
Sage Willowmere|M|Calm owl tactician who whispers race advice to himself|swivels his head almost all the way round|glides a slow victory loop with wings out|big round facial disc and ear tufts
Barnaby Bruin|H|Honey-loving bear who befriends every rival by lap two|licks honey off a paw|bear-hugs the trophy and a nearby official|round ears and a broad belly
"""),
("Neon Harbor", "Dockworkers, ferry kids and night-shift legends of the lantern-lit port.", """
Captain Dusk Marlowe|M|Weathered tug pilot who calls everyone kid|leans on the wheel and sips tea|tips his cap as an air-horn sounds|peaked captain's cap and pipe
Roxy Rivet|L|Welder punk who throws sparks when she gets mad|flips her welding mask up and down|torch-spark fireworks over her head|welding mask and a green mohawk
Gus Gantry|H|Patient crane operator who plans three turns ahead|swings an imaginary crane hook|picks up his own kart with a cheer (hook animation)|broad yellow hard hat and hi-vis vest
Neona Wavelength|L|Radio DJ who narrates her own race live|adjusts oversized headphones|drops an imaginary mic|huge neon headphones
Tobias Tidewell|M|Fishmonger with an endless supply of puns|tosses a fish from hand to hand|catches the fish and bows|rubber apron and tall boots
Mei Lanternfield|M|Quiet lighthouse keeper who is secretly a speedster|scans the horizon with a spyglass|sweeps a beam of light across the crowd|paper lantern on a backpack pole
Bolt Braddock|H|Retired wrestler turned stevedore who is soft on the inside|flexes one arm then the other|pins the trophy overhead like a champion belt|barrel chest and tiny helmet
Pearl Quayside|L|Ferry-boat kid with a heart of gold and a fast hand|juggles three coins|coin shower from her oversized coat|tiny frame in a huge coat
Salvo Reyes|H|Cargo-ship cook who is very proud of his chili|stirs a pot balanced on the kart|ladles trophy chili for the camera|chef hat and ladle
Dmitri Ironwake|H|Icebreaker engineer with a dry sense of humour|folds his arms and nods slowly|shows a rare smile and a thumbs-up|fur-trimmed hat and a thick beard
"""),
("Frost Peak", "Guides, skaters and mountain rescuers of the high white passes.", """
Nanuk Snowdrift|H|Gentle polar guide who never loses his temper|stretches and yawns|makes a snow angel on the podium|huge hooded shoulders
Flurry Skye|L|Showoff ice skater who treats every corner as a routine|spins on one foot|lands a triple axel pose|long trailing scarf
Grumbald the Yeti|H|Shy yeti who is scared of going fast and wins anyway|hides his face in both hands|roars then waves bashfully|shaggy fur mound with tiny eyes
Aurora Vance|M|Aurora-chasing photographer always framing the shot|frames the scene with her fingers|takes a victory selfie|camera strap and bobble hat
Tundra Tuck|M|Sled-dog musher who talks to his kart like a team|whistles for his dogs|howls at the sky|dog-ear hat and long mittens
Sigrid Hailstone|H|Curling champion who treats racing as strategy|polishes a curling stone|slides the stone down the podium|horned helmet and braids
Pico Sleet|L|Penguin delivery kid with a very tight schedule|waddles side to side|belly-slide across the finish line|tiny flippers and an orange scarf
Wintra Glimmer|L|Frost-mage apprentice whose hiccups freeze things|hiccups tiny snowflakes|crowns herself with ice|oversized pointy hat
Kodiak Rime|M|Ski-patrol rescuer who always has a plan B|checks a radio on her shoulder|gives two thumbs up|orange vest and goggles
Hoarfrost Hattie|M|Knitting granny with a thermos and a lead foot|knits while sitting at a red light|knits a cozy for the trophy|silver bun and a shawl
"""),
("Dune Runners", "Caravan navigators, scarab-folk and sun-baked traders of the Mirage Mesa.", """
Zahra Sandglass|M|Caravan navigator who has never once been lost|checks a tiny sundial|spins up a swirl of sand|long flowing headscarf
Rafiq Mirage|L|Smooth-talking trader who bargains for every position|jingles a pouch of coins|sells the trophy back to the crowd|layered scarves and a feathered hat
Scarab Sol|H|Beetle-folk bulldozer who pushes everything forward|rolls a small ball with his feet|spins the golden ball on one horn|gleaming shell and a single horn
Dune Dahlia|L|Sand-surfing daredevil who hates paved roads|balances on one foot|surfs the podium on a board|goggles and a flapping cape
Khepri Okoro|M|Archaeologist who narrates the history of every track|brushes dust off a relic|holds a golden relic aloft|pith helmet and a satchel
Tamarind Khan|H|Spice merchant sized like a wardrobe, scent of cinnamon|sniffs a pinch of spice and nods|sprinkles spice like confetti|wide sash and heavy shoulders
Sirocco Jade|L|Wind-sprite who gets bored if she is not in front|drifts in tiny circles|whirlwind exit with a laugh|swirling wispy tail
Nomad Nasir|M|Camel-rider turned racer, talks to his camel kart|pats the kart hood|tips his hat to the camel|tall hat with a tassel
Cactus Carla|H|Prickly saguaro-folk who is surprisingly cuddly|waters herself from a can|bursts into a flower bloom|green arms raised above her head
Ember Anubi|M|Jackal-eared night guide who drives better in the dark|ears swivel to a distant sound|howls and strikes a regal pose|tall pointed ears and gold collar
"""),
("Sky Circus", "Acrobats, clowns and balloon pilots from the floating Cloudtop Carnival.", """
Bunting Barnstorm|L|Wing-walker pilot who is never quite on the ground|stretches out arms like wings|wing-walks on the kart hood|aviator cap with trailing scarf
Madame Marzipan|M|Ringmistress who announces her own overtakes|twirls a baton|takes a theatrical bow|tall hat with a feather plume
Tumble Jo|L|Acrobat who can do a handstand in any situation|does a one-hand handstand|flip into a split|ribbon-streamers on wrists
Big Top Boris|H|Strongman with a gentle soul and a tiny moustache|lifts a dumbbell with a pinky|lifts the kart overhead|curled moustache and striped singlet
Pierrot Fizz|M|Mime who communicates only through sound effects|pretends to be trapped in a box|silent applause to the audience|white face and ruff collar
Popcorn Pete|H|Concession vendor who throws snacks during overtakes|shakes a popcorn box|throws popcorn everywhere|giant popcorn hat
Lulu Lollipop|L|Candy-floss artist who sticks to the racing line|twirls candy floss|candy confetti and a spin|big pink swirl hair
Kite Kasumi|L|Kite-flyer who is fastest on the straights|checks wind direction with a wet finger|launches a kite from the podium|large diamond kite on her back
Zeppelin Zed|H|Blimp captain who drifts a little too wide|adjusts a brass compass|inflates and floats a foot off the ground|round pilot cap and heavy goggles
Juggles McGraw|M|Juggler who treats items like a ball routine|juggles three balls|juggles the trophy|three-pointed jester hat
"""),
("Deep Reef", "Divers, mer-folk and glowing creatures from the Coral Causeway.", """
Coral Calloway|M|Marine biologist who narrates the wildlife of every track|taps a clipboard|holds up a glowing jelly|snorkel and fin-shaped helmet
Finn Barracuda|L|Fast-talking barracuda who loves slipstreaming|swishes his tail fin|jumps and spins mid-air|sleek dorsal fin crest
Octavia Inkwell|M|Octopus-lady who handles every control at once|eight arms tapping eight buttons|ink-cloud exit|eight curled tentacle arms
Brinley Bubbles|L|Pufferfish kid who inflates when startled|puffs up and down|inflates into a round ball|round puffed cheeks
Moby Quill|H|Gentle whale-folk and the largest racer on the grid|blows a spout|breaches the podium with a splash|wide forehead and a small spout
Kelp Kelpie|M|Sea-spirit who drifts around corners like a current|sways with imaginary tide|rises in a bubble column|green hair that waves like kelp
Urchin Ulla|H|Sea-urchin bruiser whose spines can poke|spins slowly to show off spines|curls into a spiky ball|spiky dome body
Manta Marisol|L|Manta ray glider who rarely touches the ground|flaps her winglike arms|glides over the podium|wide triangular cape-wings
Shrimp Sampson|L|Tiny mantis shrimp with a big punch of attitude|shadowboxes|throws a spinning punch at the camera|boxing-glove claws
Anchor Annabel|H|Retired sailor who steers like a ship|polishes a brass anchor|plants the anchor in the podium|big anchor strapped to her back
"""),
("Clockwork Guild", "Automata, tinkerers and brass gadgeteers of the Clockwork Quarter.", """
Cogsworth Whirr|M|Prim clockwork butler who is always exactly on time|checks a pocket watch|ticks and bows precisely|top hat with gear-shaped brim
Tick-Tock Tilly|L|Spring-loaded automaton who never stops bouncing|bounces on a spring|launches off the podium in a spiral|coiled spring torso
Gearhart Magnus|H|Steam-powered titan with a soft spot for cats|exhales steam from his pipes|puffs a steam cloud into a heart|chimney stacks on his shoulders
Rivet Rosalind|M|Ace mechanic who repairs her kart mid-race|twirls a wrench|holds up a tiny repaired trophy|tool belt and welding goggles
Sprocket Sprout|L|Plant-powered automaton gardener|waters a pot on his head|flowers bloom from his pot|flower pot on head
Valve Valentina|M|Steam-valve engineer with dramatic flair|turns a valve with a hiss|fires a puff of steam fireworks|copper pipes on her backpack
Brass Bartholomew|H|Heavy brass bruiser who talks like a stern grandfather|lowers a monocle|polishes his brass belly|round brass body with a monocle
Pendulum Pia|L|Clockmaker whose rhythm never wavers|swings gently like a pendulum|swings a watch chain with a wink|oversized pendulum charm
Dynamo Dex|M|Lightning-powered tinkerer with static hair|static crackles in his hair|stands with arc-lightning behind him|spiky hair and twin sparking rods
Lathe Lenore|H|Master woodworker robot who builds a barricade every race|chisels a small figure|presents a carved trophy|wooden-block body with a chisel
"""),
("Ember Forge", "Smiths, salamanders and volcano-dwellers working the Magma Foundry.", """
Cinder Calhoun|H|Blacksmith who is calm until his hammer is lost|taps his hammer on the kart|hammers an anvil in rhythm|leather apron and thick gloves
Pyra Ashgrove|L|Fire-sprite who runs hot and fast and cools off with a laugh|flickers like a candle|bursts into harmless flame|flame crest hair
Magma Magnolia|H|Lava-woman with a deep sleepy voice|cracks her knuckles with molten glints|erupts into a glowing pose|orange cracked skin patterns
Slag Wilhelm|H|Furnace-keeper who whistles Irish tunes|shovels imaginary coal|spreads his arms and sings|coal-shovel on his back
Obsidian Orin|H|Silent obsidian golem who communicates by shrugs|shrugs slowly|polished shine pose|glassy black faceted shoulders
Sparkle Salamandra|L|Salamander racer who sprints on hot floors|scurries on the spot|tail-whip fire loop|spiky tail with ember tip
Vulcana Rex|H|Volcano-guardian queen who adores applause|waves like royalty|cinders rain as a crown|crown-like lava spikes
Anvil Annika|M|Apprentice smith who tests every upgrade herself|hammers a small bolt|holds up a forged medal|big hammer slung on shoulder
Brazier Boone|L|Torch-bearer who is always the first to arrive|waves a torch|torch relay pose|torch held high
Smelter Sunny|M|Cheerful ore-smelter who goes by the nickname Sunny|sorts shiny stones|shiny nugget toss|hard hat with a head-lamp
"""),
("Spirit Grove", "Friendly ghosts, folklore beings and forest spirits of Moonlit Orchard.", """
Wisp Willowby|L|Friendly will-o'-the-wisp who guides lost racers|floats gently|glows brightly with swirling sparkles|glowing orb head
Pumpkin Patch Patsy|M|Jack-o-lantern farmer with a glowing grin|tilts her pumpkin head|lantern flare with a laugh|pumpkin head with a stem hat
Spectre Sir Reginald|M|Posh ghost butler who haunts the starting grid politely|adjusts his tie|fades out and reappears with the trophy|floating sheet-like cloak
Banshee Bellflower|L|Songbird spirit whose voice shatters glass but not racers|sings softly|hits a high note that sparkles|long flowing hair
Mothra Moonbeam|L|Moth sprite attracted to every light on the track|flutters her wings|dusts silver scales|large patterned wings
Hollow Hank|H|Giant scarecrow who is more afraid of crows than karts|slumps on his pole|flaps his arms and crows scatter|straw hat and patched coat
Gourd Granpa|H|Old pumpkin sage who talks in riddles|strokes a pumpkin beard|rolls triumphantly|huge pumpkin with beard
Poltergeist Polly|M|Prankster ghost who rearranges the podium|tosses a tiny object|rearranges the podium|ragged ghost tail and bow
Thistle Thorne|M|Forest spirit with vines who grows plants when happy|vines sway|flowers sprout all around|thorny crown of vines
Lantern Lenny|L|Little lantern spirit who takes the night shift seriously|swings gently|flame flares|lantern for a head
"""),
("Star Cadets", "Rookie pilots, aliens and robots of the Starlight Spaceport academy.", """
Nova Starling|L|Hotshot academy cadet who wants first place at any cost|checks her wrist computer|salutes with a rocket flare|visor helmet with a star decal
Commander Quasar|H|Veteran captain who barks orders at his kart|folds arms and nods|holds a flag with stars|tall command cap and cape
Zorp Blip|M|Tiny alien pilot who speaks only in bleeps|bobs antennae|beam-up pose with sparkles|three tiny antennae
Luna Lovelace|M|Moon-base coder who debugs her kart mid-corner|types on a floating screen|code sparkles and a bow|visor with scrolling code
Orbit Otto|H|Satellite mechanic who is never quite stationary|spins slowly in place|orbits the podium once|satellite dish on his back
Cosmo Chen|L|Intergalactic courier who has to deliver on time|taps his wrist|spins a delivered parcel|jetpack and small helmet
Pulsar Pippa|L|Star-kid who glows brighter when she is winning|twinkles quietly|bursts into starlight|star-shaped hair and glowing eyes
Gravity Gloria|H|Gravity-wrangler who changes weight at will|floats half an inch off the ground|floats the trophy overhead|massive shoulder pads and floating rings
Meteor Mack|H|Rock-skin alien who loves crashing in dramatic style|bumps fists together|crashes through the podium in a cartoon way|cratered round head
Eclipse Elara|M|Mysterious pilot of two moons who drives only at night|twirls two small orbs|shows both orbs together|crescent-shaped helmet crest
"""),
]
FREE_STARTERS = ["Pip Thistledown","Fennel Vix","Juniper Wren","Pearl Quayside",
                 "Bramble Quill","Clover Dash","Captain Dusk Marlowe","Sage Willowmere",
                 "Marigold Hoofsworth","Hobb Mossback","Barnaby Bruin","Gus Gantry"]
# The 8 playable in the vertical slice (all free starters), plus the other 4 starters as CPU-only rivals.
SLICE_PLAYABLE = ["Pip Thistledown","Fennel Vix","Juniper Wren","Bramble Quill","Clover Dash",
                  "Captain Dusk Marlowe","Marigold Hoofsworth","Gus Gantry"]
CUPS = ["Seedling Cup","Copper Cup","Tempest Cup","Zenith Cup"]

def parse():
    out = []
    for si,(sname, sdesc, body) in enumerate(SETS, start=1):
        lines = [l for l in body.strip().split("\n") if l.strip()]
        assert len(lines)==10, (sname, len(lines))
        for ii,l in enumerate(lines, start=1):
            n,c,p,idle,vic,sil = [x.strip() for x in l.split("|")]
            out.append(dict(id=len(out)+1, set=si, setname=sname, idx=ii, name=n, cls={"L":"Light","M":"Medium","H":"Heavy"}[c],
                            personality=p, idle=idle, victory=vic, silhouette=sil))
    return out
