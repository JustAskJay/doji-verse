# The world

The playable map is two pages. `index.html` is Doji's verse. `chapter2_nyc.html` is Brian's story (Base Tower, Wall St, the cab, Revhard, and the drive home). `chapter1.html` only sends you to `chapter2_nyc.html?chapter=1`.

`world.js` keeps a shared list of area ids. Travel in the games is still the doors and exits in each page. The shared list is the map those pages report into, not a second set of rooms.

## How you move

Doji walks with the D-pad. Feet have to stand in a walk zone. A hotspot only answers when you are in its zone (in the bedroom, close enough to the object). A uses it. Locked spots stay outlined and A explains why.

Water and land are separate. With the surfboard, A on a ladder climbs between them. You cannot step off the curb into the water. Surfing is the water zones on the street, BYTE DOCK, and SOL ST PIER.

The sidewalk gap stays a hole until the propeller hat is on. SELECT is the only toggle. The other items are key items and SELECT skips them.

Scene changes wait until dialogue is closed.

## Doji's verse, in order

### Doji's room

You wake up here. The intro tells you the door is on the right.

| Spot | What it does |
| --- | --- |
| Bed | Rest. Cycles a few lines. |
| Polaroids | Look. |
| TV | Opens the game menu: HOLM Coin Run and WAGBi Stacker. |
| Radio | Toggles the room loop (M does the same). |
| Door | OUT to the street. |

### The street

Sidewalk from the bedroom door, past HOLM and WAGBi, to a gap, then HTTPBASE20 at the far right. The water and the road under the sidewalk open only while you are surfing.

| Exit / spot | Where it goes |
| --- | --- |
| HOME | Back to the room. |
| HOLM | The HOLM interior. |
| WAGBi | WAGBi's site. |
| Gap | Not a door. With the hat on, you walk across. Without it, A explains the lock. |
| 402 door | KNOCK until you pay one GM in dialogue, then ENTER into HTTPBASE20. Locked until the hat is on. |
| Ladder by the water | CLIMB DOWN / CLIMB UP once you have the board. The first climb plays the surf line. |

### HOLM

A house interior. Back to the street is the left edge.

| Spot | What it does |
| --- | --- |
| Campers | Talk. |
| PLAY | Opens HOLM Coin Run (`holm/index.html`) after a short welcome. |
| Neighbor | Points you at the fence while the hat quest is on. |
| Lost thing | A small propeller hat by the fence, only while the quest says to find it. TAKE picks it up. |

### WAGBi's site

| Spot | What it does |
| --- | --- |
| The cat | Gives the hat quest, takes the hat back, then leaves it with you. |
| STACK | Opens WAGBi Stacker (`wagbi/index.html`). |
| Mixer | Look. |

### The gap and HTTPBASE20

Past the gap, the 402 door is HTTPBASE20. Inside: a rack with an empty slot, the WEBMASTER, a pop-up, a microwave, and the 200 OK cabinet.

Paying the door (one GM, said out loud) starts HTTP: SURF'S UP. The WEBMASTER sends you to the microwave. START on the microwave, once he has told you to, gives the surfboard. The board opens the ladders and the water.

### BYTE DOCK

Surf right from the street ladder and you land on the dock. The sign reads SURF DOCK.

| Spot | What it does |
| --- | --- |
| Left edge | Back to the street water. |
| Ladder | Boardwalk or bay. |
| Portal | ENTER BYTE LAB. |
| OTTO | The otter. Starts CLEAN THE WATER and pays the fish pal at 12 scoops. |
| PLAY | Wave Ride. |
| Right edge | SOL ST PIER. |

The bay is the water under the boardwalk. Bottle mail, one of the hidden finds, is in that bay.

### BYTE LAB

Byte is the dog on the rack. The first talk introduces him. Later lines include a fetch joke that is not a quest. The hologram, bowl, and status screen are look and read spots. Bug Hunt is the kiosk on the left. The left edge returns to the dock.

### SOL ST PIER

The pier boards match the sidewalk. The east end is fog until the lamp is on (`FOG_X` is 238). Pushing into the fog only shows a hint.

Freddy Monkey stands by the shack with a mug. MÖTH flies in the fog, then presses against the lamp shade once it is lit. Jack-o'-lanterns, a crystal ball, and tombstones are look and read spots. Ghost Whack is the sign by the shack. A ladder drops into the bay. The hatch is at the right end of the boards. See [DuckFacts](DUCKFACTS-BOSS.md) for the lamp, the hatch, and the cellar.

### THE EGG CELLAR

A scene under the hatch. It is not written to the save. Ladder back to the pier, three ducklings, a terminal, a wanted poster, three gift boxes, LIL BULB, a puddle with a rubber duck, and the big egg. Details are in the boss doc.

## Quests on Doji's side

The HUD shows one active quest. Steps read live state.

**WAGBi's lost thing.** Talk to the cat (quest starts). Find the thing in HOLM. Bring it back. Reward: the propeller hat, worn by default. The gap opens while it is worn.

**HTTP: SURF'S UP.** Knock on the 402 door. Ask the WEBMASTER. Hit the microwave. Reward: the surfboard in a key slot. The street steps and BYTE DOCK open with it.

**Lights on SOL St.** Starts when you talk to MÖTH. Ask Freddy about the lamp (he gives the candy-corn fuse). Turn the lamp on (the fuse is consumed). Follow the pumpkins and sit the coffin bench. Reward: the pumpkin bucket. The bench, the shack door, and the east fog all wait on the lamp. The hatch opens once the lamp is lit. You do not need the bucket to go down.

**Clean the water.** Twelve pieces of trash, four each in the street water, the dock bay, and the pier bay (the pier pieces sit left of the fog line). Surf over a piece to scoop it. The quest can start from the first scoop or from talking to OTTO. At 12/12, talk to OTTO on BYTE DOCK. Reward: the fish pal, who jumps beside the board while you surf. After that, the clean water sparkles.

After the surfboard quest, the hint line points you at Byte, then at the pier lamp, then at the five secrets.

## Items

| Id | Name | Role |
| --- | --- | --- |
| hat | Hat | The only worn item. SELECT puts it on or takes it off. Opens the gap while worn. |
| surfboard | Board | Key item. Opens ladders and water. Preview links lend it and do not save that. |
| fuse | Candy-Corn Fuse | Held while the lamp quest is in the fuse step. Removed when the lamp lights. |
| bucket | Pumpkin Bucket | End of the lamp quest. |
| fish | Fish Pal | End of the cleanup quest. |

Four slots. The hat prefers slot 1, the board slot 2, the fuse and bucket slot 3, the fish slot 4.

## Hidden finds (Doji)

Five, with no outline. A glint is the hint where the code draws one. A on the spot finds it. They are stored on `doji-player.secrets`.

| Id | Name | Where |
| --- | --- | --- |
| gm | GM sticker | Street, on the wall left of HOLM. |
| duck | Hard-hat duck | Inside WAGBi's site, left side. |
| bottle | Bottle mail | BYTE DOCK bay, between the ladder and the portal. Needs the board (you have to be in the water). |
| cat404 | 404 cat | BYTE LAB aisle. |
| konami | Cheat code | Anywhere in the world: Up Up Down Down Left Right Left Right, then B, then A. The lines say cheats stay off. |

## NPCs on Doji's side

- **WAGBi** — the cat at the site. Hat quest.
- **Campers and the neighbor** — HOLM.
- **WEBMASTER** — HTTPBASE20. Points at the microwave.
- **BYTE** — the dog in the lab.
- **OTTO** — otter, dock janitor. Cleanup quest.
- **Freddy Monkey** — SOL ST PIER shack. Fuse, then chatter.
- **MÖTH** — lost in the fog until the lamp is on.
- **The lamp** — a speaker once it is lit.
- **QUACKSON, DOT, BILL** — ducklings in the cellar. Bows are yellow, red, and blue, in hatch order.
- **DUCKFACTS, LIL BULB, the big egg** — cellar and the fight.

`?as=brian` walks the same map as Brian. A few lines are rewritten. That visit is a preview and does not save.

## Brian's story

Open it from the title once Brian is unlocked, or from `chapter2_nyc.html`. The page refuses to stay open until `doji-unlocks` has Brian or `doji-story` exists, unless the URL has `manual`, `dev`, `race`, or `unlockall`.

`?newstory=1` on `index.html` clears `doji-story`, `doji-title-char`, `doji-ch1`, `doji-ch2`, and `doji-world`. It does not clear `doji-player`.

### Base Tower, 88F

Chapter 1. Quest name: GM, BRIAN.

1. Talk to Jesse.
2. Check the computer (the desk ping).
3. Coffee run at the machine. Eight orders, need six. Left and right pick the cup, A serves. A miss or a timeout counts as wrong. Clearing it gives a double espresso.
4. Crack the safe. Three notes: trophies (first digit is the first digit of the floor), the stats screen (second digit is Russell's legs), the framed transaction (last two are 170 − 117). The code in the source is 8453. The safe gives the hardware wallet. You need all three notes unless you are in free roam.
5. Merge the PRs. Eight diffs, three hearts. A or right merges, B or left rejects. Three of them should be rejected (the deleted tests, the bed sale, and the treasury line). Then A signs with the hardware wallet.
6. Elevator. A short ride down. The clock jumps to 3:41 PM and the Wall St quest starts.

Jesse, Russell, and Trash Cat are in the office. The elevator will not leave while coffee, the safe, or the PRs are still open.

### Wall St

Quest: THE CLOSING BELL. The clock runs toward 4:00 PM. Three clues, then the street floods.

| Person / spot | What you do |
| --- | --- |
| Sal | Headline Hustle. Left is the Base paper, right is the stone paper, down or B is NOPE. Sell 12 before time runs out. Three misses and you fail. Halfway through, weekend mode flips what the cave customer wants. Clue 1 is a stub that reads WHERE. |
| Vinnie | Five rounds of hold or sell. Both hold pays 3/3, you sell and he holds pays 5/0, you hold and he sells pays 0/5, both sell pays 1/1. He holds unless you sold last round (one forgiveness if you have sold exactly once and it is round 3). You need 12 points. Clue 2 is a ticket that reads THE MARKET. |
| Monty Mike | Three cups, one ball. After you pick, he lifts an empty cup. A switches, B stays. Find the ball five times. Clue 3 is a napkin that reads NEVER CLOSES. |
| Tourist, statue, hours tablet, NYSE door, ticker, headline | Talk and look. The tourist mentions finds under things. |
| Base Tower entrance | Look, until you are coming from the elevator. |
| Taxi | Locked until the three clues are in and the bell has rung. |

At 4:00 the Rat Race starts on the same street: three hearts (four if the blue kicks are on), dodge the crowd, reach Cobie's taxi. Close calls add a bonus. Then the hardware wallet signs the fare.

### Cobie's cab, Revhard, the race, Doji's door

The quest log after the clues:

1. Rat Race to the taxi.
2. Crazy Cab with Cobie. Right is gas, left is brake, up and down change lane, A honks. Beat the clock to Revhard. The clutch slips, so the car limps.
3. The Clutch Job at Revhard (Buster's shop). Meet Buster, find Bomi's socket, grab the torque wrench, do the star-pattern wobble fix, find the alignment tool, then ALIGN, BLEED, and BITE. The RS1 key lights the track.
4. The Sunrise Run. Place in the top 3. Racers on the grid include Brian in the 360, Pump, Bomi, Jesse, Cobie's cab, Fud, Trash Cat, and Diesel.
5. Buster drives you to Doji's street. Knock, walk in, say gm.

Items along the way include the hardware wallet, the three clues, a bottle cap from the pigeon, blue kicks, racing gloves, Ferrari keys (borrowed), Bomi's socket, the torque wrench, the alignment tool, and the RS1 key. SELECT on the kicks, then A five times, is the "no place like HOLM" trip back to Base Tower.

The ending card offers THE DOJI VERSE (back to `index.html`) or REVISIT REVHARD.

### Finds in Brian's chapters

Wall St, hidden, no outline, a glint only:

- The tiny bull, under the BULL sign.
- Pigeon bank, at the statue.
- After hours, at the tablet (the shell combo Up Up Down Down once the tablet has hinted).
- Ghost in the ticker.

Revhard has its own set: the office window (stand still), cones, a noodle cup, a mug, and a bell. Base Tower has window, cat, rack, and sequence finds. A GM sticker and the shell combo also count on Brian's extras. `world.js` mirrors these into `doji-world` from `doji-ch2`. It only reads `doji-player`.

## Shared area list

`world.js` registers these ids. Exits are the links it records. A few extra links are kicks, not new doors.

| Id | Name | Page |
| --- | --- | --- |
| doji-room | Doji's room | `index.html` |
| doji-street | Doji Verse street | `index.html` |
| gap | The gap (HTTPBASE20) | `index.html` |
| byte-dock | Byte dock / surf shack | `index.html` |
| sol-st | SOL St (Halloween / lamp) | `index.html` |
| hq | Coinbase HQ (Base Tower 88F) | `chapter2_nyc.html` |
| wall-st | Manhattan / Wall St | `chapter2_nyc.html` |
| cab | Cobie's cab | `chapter2_nyc.html` |
| revhard | Revhard lot and shop | `chapter2_nyc.html` |
| race | The Sunrise Run | `chapter2_nyc.html` |
| brian-extras | GM sticker and the shell combo | `chapter2_nyc.html` |

Room exits to the street. Street exits to the room, the gap, the dock, and SOL St. The dock exits back to the street. SOL St exits back to the street. HQ exits to Wall St. Wall St exits to HQ and the cab. The cab exits to Revhard. Revhard exits to the race. The race exits to Doji's street. Kicks also link the room, Revhard, and Wall St back to HQ.
