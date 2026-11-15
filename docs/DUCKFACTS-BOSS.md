# DuckFacts mini boss

DUCKFACTS is the fight under SOL ST PIER. The cellar and the fight keep their state in memory (`CEL` and `BF`). They are not fields on `doji-player`. `BOSS_REWARDS` and `BOSS_LEADERBOARD` are both false. The clear line says the preview build has rewards off and that nothing is saved. There is no helmet, no item, and no board entry for a win.

Any `?warp=` link is a preview. Previews do not write the player save. The surfboard you see on those links is lent for the visit.

## The path

You need the lamp on. The hatch will not open in the fog.

1. Reach BYTE DOCK (surfboard, then the street ladder, surf right). Walk right to SOL ST PIER.
2. The east half of the pier is fog until the lamp is lit. You can still reach MÖTH, Freddy Monkey, and the lamp.
3. Talk to MÖTH. That starts LIGHTS ON SOL ST.
4. Talk to Freddy Monkey at the shack. He gives the candy-corn fuse.
5. Stand at the lamp and press A (TURN ON). The fuse is consumed, the fog rolls back, and the pumpkin path lights.
6. The hatch label changes from LOOK to OPEN. The first OPEN plays the quack under the boards, then drops you into THE EGG CELLAR. Later visits skip that talk.

The pumpkin bench and the bucket are the end of the lamp quest. They are not required for the hatch.

### Test warps

These skip the title and do not save.

| URL | Lands you |
| --- | --- |
| `?warp=pier` | SOL ST PIER, lamp still out. |
| `?warp=hatch` | Pier with the lamp already lit, next to the hatch. |
| `?warp=cellar` | Inside THE EGG CELLAR. The hatch counts as already used. |
| `?warp=fight` | Cellar with the gifts already solved and the egg open, fight started. |

`?warp=fight` also reads:

- `diff=easy` — easy tune (see below).
- `phase=1`, `phase=2`, or `phase=3` — start in that phase. Above 1, the phase intro runs and the opening lecture is skipped.
- `tut=1` — play the duckling lesson before the fight.
- `help=force` — offer the help menu before the fight.

## THE EGG CELLAR

A basement under the pier. Ladder on the left returns to the pier. Places, from the left:

- BILL, blue bow, by the terminal. Youngest. Hatched last.
- The terminal (`BUILD_LOG.TXT` and a todo).
- A wanted poster of an egg with a mustache.
- QUACKSON, yellow bow. Oldest. Hatched first.
- Three gifts. Left to right on the floor they are blue, yellow, red. That is not the open order.
- DOT, red bow. Hatched second.
- LIL BULB, hanging. It blinks out on its own. While it is dark, the big egg shows one pink eye and one green eye.
- A puddle with a rubber duck.
- The big egg, the gate.

The ducklings say the rule in their second conversation: gifts open in hatch order. QUACKSON is yellow and first, DOT is red and second, BILL is blue and last. The boxes also jiggle the next correct color.

### The gift answer

Open **yellow, then red, then blue**.

A wrong color dumps confetti, BILL complains, and every opened gift closes. The sequence starts over. The third correct open plays the shell lines: each box had a piece of eggshell, the shells click into the big egg, and the gate state becomes cracked. The prompt on the egg changes from LOOK to HATCH.

LOOK on a gift before you solve it reads the tag: from Celebration Hub, open in order.

## The gate and the cutscene

HATCH on the cracked egg starts the cutscene. The egg rumbles, cracks, flashes, splits, and DUCKFACTS waddles out. A title card reads DUCKFACTS / MINI BOSS OF THE CELLAR. Two talks follow: he introduces himself as a mini boss, then he notices the gifts were opened and yells MAKE WAVES. He walks back through the gate. The gate state becomes open and the fight starts.

If you leave and come back while the gate is open, ENTER starts the fight again.

## The fight

The arena is the cellar screen with the game's own text box. Move with the D-pad or arrows. Up jumps. A picks up an egg at your feet, throws it the way you face, bonks him when he is stunned or dizzy, flares the lamp (phase 2+), or pulls the fuse (phase 3, once). B is a short dodge-hop. You cannot be hit during the hop. START pauses.

You have hearts (top left). He has pips (top right). A thrown egg, a bonk, or the fuse removes pips. A hit on you removes a heart and gives a short blink.

Normal starts at 4 hearts. Easy starts at 5. After two losses in the same browser session the game can offer duckling assist (+2 hearts) and tips. That counter is not saved. The first time you walk in, there is no tutorial and no per-attack tips. Tips, when they are on, play once per attack.

There is a second way to win. Five DUCK FACT rains survived without a hit fill the FACTS meter and he stops (the "you listened" ending). A hit during a rain does not advance the meter.

### Phases

Each phase deals a fixed amount of pip damage, then a break, then the next phase. On normal that amount is 5. On easy it is 3. The pip counter starts at 15 / 10 / 5 on normal (9 / 6 / 3 on easy) because earlier phases are still drawn on the same bar. Clearing a phase means reaching the next band, not emptying the bar, until phase 3.

| Phase | Name | Attacks added |
| --- | --- | --- |
| 1 | LECTURE | Egg Lob, Make Waves, Duck Fact |
| 2 | LIGHTS OUT | Quack Sonic, Helmet Beam, and the lamp |
| 3 | FULL QUACK | Duck Dive, and the fuse |

Easy slows the attacks, widens the rain gaps, removes the phase-3 fake dive, removes attack combos, drops a heart on the phase break, sends the duckling more often, and makes the lamp stun last longer. Normal can chain a second attack immediately (more often in later phases), throws eggs farther from you, and in phase 3 can fire a second sonic ring and a single rain gap.

### Attacks

**Egg Lob.** Three eggs. A red mark on the floor is the landing spot. Step off it or jump. Eggs sit on the floor, then vanish. A picks one up. A again throws it. A hit removes 1 pip.

**Make Waves.** His lamp blinks gold. A wave crosses the floor. Jump it, or stand on a crate. In phase 3 a second, lower wave can follow. Touching a wave costs a heart.

**Duck Fact.** Letters of DUCKFACTS fall. Green marks are the gaps. Stand in a gap. A clean rain adds one to the FACTS meter. Five clean rains end the fight without emptying his pips. The facts in the pool are the waterproof-feathers line, three eyelids, a raft, sleeping with one eye open, imprinting, and that a quack does echo.

**Quack Sonic** (phase 2). A ring expands from him. B dodge-hops through it. Overlapping the ring costs a heart. Phase 3 on normal can send two.

**Helmet Beam** (phase 2). A laser wall sweeps left to right, floor to ceiling. Jumping does not clear it. Stand under a crate (the green shadow) until it passes. The moth on the lamp may fly into him during the beam and stun him. Then A next to him bonks for 1 pip. You can also flare the lamp yourself: stand by the post on the left and press A. It has a cooldown.

**Duck Dive** (phase 3). He backs up and rushes. Jump over him. On normal he sometimes fakes and stops. If he hits the left wall he is dizzy. Run in and press A to bonk. Getting run over costs a heart.

**The fuse** (phase 3, once). Stand under the cord and press A. LIL BULB drops on him for 2 pips.

A duckling also crosses the arena on a timer with either a heart (if you are missing one) or an egg. On easy the heart is offered more freely.

### When it ends

Emptying the last phase, or filling the FACTS meter, plays his closing lines and then the preview clear line. You are put back in the cellar in front of the egg. Hearts at 0 plays his loss lines. A retries the current phase. B leaves. The line on that choice says nothing is lost or saved.

The lesson mode (`tut=1`, or the help menu) walks through move, jump, harmless eggs, a real throw, the dodge, and the HUD before the lecture. It does not write anything either.
