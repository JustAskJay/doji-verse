# Mini games

Two games live in their own pages and open in a frame from the room TV, from HOLM, or from WAGBi's crane. Four more are drawn on the main 320×180 canvas. Brian's chapters add their own short games. None of these write a score when the URL is a preview (`?game=`, `?warp=`, `?preview=`, or `?as=brian`).

Canvas games share one shell: a title card, a 3-2-1-GO count, play, then a result card. A starts or retries. B quits back to where you were standing. START pauses. The first visit can offer HOW TO, which you can replay from the title card. A star on the result means the saved best is at least the goal on the title card. That goal does not end the run.

| Game | Where | Goal on the card | How a run ends |
| --- | --- | --- | --- |
| HOLM Coin Run | Room TV, and PLAY inside HOLM | Local best only | Three hits |
| WAGBi Stacker | Room TV, and STACK inside WAGBi's site | Local best only | The block misses the stack |
| 200 OK | HTTPBASE20, the wall screen | 1500 | Three mistakes (CONNECTION LOST) |
| Bug Hunt | BYTE LAB kiosk | 1500 | Three bites (SYSTEM DOWN) |
| Wave Ride | BYTE DOCK surf prop | 1500 | 60 seconds (TIME) |
| Ghost Whack | SOL ST PIER sign | 400 | 45 seconds (TIME) |

Leaderboard ids are `holm`, `wagbi`, `http`, `lab`, `dock`, and `pier`. HOLM Coin Run keeps its own board. The others go through `verse-board.js`. See [Architecture](ARCHITECTURE.md).

## HOLM Coin Run

`holm/index.html`. A side-view run. Doji moves right through a generated street. Coins are worth 10. Stomping a hazard is worth 25 and bounces you. You start with 3 hearts. A hit costs one and grants a short invincibility. At 0 hearts the run ends and the page reports `holm:gameover`.

Controls: left and right (arrows or A/D, or the on-screen buttons). Jump is Space, Up, W, Z, or K, or the JUMP button. Jump height depends on how long you hold it. There is a short coyote time and a jump buffer. M toggles mute inside this page. The board view switches tabs with left and right.

The course is procedural: coin lines, fences, mailboxes, garages, then yarn balls and flying hazards. Hazards show up after the opener and get more common the farther you go. The best score is `holmCoinRun.best` in local storage.

## WAGBi Stacker

`wagbi/index.html`. A timing stacker. A block slides. You drop it. Overhang is sliced off. Miss the stack and the site closes. Perfect drops (within 2 pixels) keep the full width. The block speeds up as the score rises (capped). Score is the number of blocks landed. The run reports `wagbi:gameover`.

Controls: Space or Enter, or the DROP button, drops. Arrows are swallowed so the page does not scroll. Best score is `wagbiStacker.best`.

## 200 OK

You run the router in HTTPBASE20. Requests travel a wire to one switch.

- White `200` goes UP to the 200 screen.
- Red `402` goes DOWN into the loop.
- The loop passes the microwave. A 402 pays there and comes back green `PAID`, then merges onto the wire for a second pass. Send a 402 up and it is a FREE LEAK. Send a 200 or a PAID request down and that is a strike (402 ON A FREEBIE, or DOUBLE CHARGE).
- Gold `GM` requests may lap the loop. Heat names are GM, WARM GM, HOT GM, CRISPY GM. A fourth lap burns them.
- The retry lane holds four. A fifth waiting request is a 408 TIMEOUT and a strike.

A flips the switch. Up and down on the pad set it directly (down is the 402 loop). A late flip still counts if the request crossed the switch inside a short grace.

Scoring: 10 for a 200, 30 for a handshake (PAID), 5 for bouncing a 402, and 15 / 40 / 90 / 160 for a GM by heat. Streaks multiply: ×2 from 6, ×3 from 14, ×4 from 26. Clearing a wave with no strikes adds `50 × (wave + 1)` and can restore a heart, up to 3. Three hearts. Named waves (Hello World, Payment Required, Microwave, Rush Hour) then random traffic that gets faster.

## Bug Hunt

Byte's heartbeat is a cyan pulse on an 18-node ring on the rack. Press A as the pulse lands on a bug.

- A hit within 50 ms is PERFECT (20 points). Within 120 ms is GOOD (10). Within 260 ms jams the board (EARLY or LATE) and breaks the chain. Later than that, the bug bites.
- Chain ×2 from 4, ×3 from 8, ×4 from 16.
- ECHO bugs are the purple ones. Pressing on them shorts the board. They do not bite. They fade.
- OVERCLOCK bugs sit on the half-beat vias, where the pulse double-steps. The trace glows ahead of them.
- Three bites end the run (SYSTEM DOWN). A clean wave refunds one bite (LED FIXED) and adds `50 × (wave + 1)`.

Waves: Boot, Twin Nodes, Echoes, Overclock, then PATCH waves. Tempo climbs by 6 BPM up to 160, then by 2 up to 190. The ring direction alternates each wave. The next three nodes on the path light up so you can see where the pulse is going.

## Wave Ride

Sixty seconds in the bay under BYTE DOCK. You surf with the D-pad, the same way the overworld surf works.

- Riding a crest builds RIDE style.
- A on a crest pops air. A slightly late pop still counts. An early press is queued. A on flat water, with no crest in reach, is a small ollie that can clear a buoy.
- Hold A in the air to spin. Let go before you land. Tricks: POP 5, 180 15, 360 40, 540 80, 720 140. Landing while still holding A is a BAIL and the combo resets.
- Your wake is a lasso. Close a loop around OTTO's floating trash and you scoop everything inside.
- Combo multiplier is `1 + floor(combo / 3)`, capped at 5.
- A buoy hit costs 8 points.
- Swells come in sets (announced, with a lull). Later sets are faster and pay more for a pop.

When the clock hits 0 the score is your style total.

## Ghost Whack

A 3×3 grid on the lit pier. D-pad moves the aim one cell at a time. A zaps that cell. The run is 45 seconds.

- A ghost is 10 points.
- A gold ghost is 30.
- MÖTH is a miss on purpose: −20, combo reset, and a shake. Let the moth fly.
- Zapping an empty cell or a bad window resets the combo.
- Every 4 hits in a row adds 1 to the multiplier (`1 + floor(combo / 4)`).
- Targets get faster and live for less time as the clock runs. Moths stay up a little longer than ghosts.

## Brian's chapter games

These live in `chapter2_nyc.html`. They gate the story. They are not on the verse leaderboard.

**Headline Hustle** (Sal, Wall St). Sell 12 papers in 36 seconds, 3 strikes. Left, right, and down/B pick the paper. See [The world](WORLD.md).

**Hold or Sell** (Vinnie, Wall St). Five rounds. Left and right pick HOLD or SELL, A locks it. Need 12 points. Payoffs and Vinnie's memory are in the world doc.

**Monty Mike's shell game** (Wall St). Watch the ball, pick a cup, then A to switch or B to stay after he lifts an empty cup. Five finds.

**The Rat Race** (Wall St at 4:00). Move with the D-pad. Three hearts, four if the kicks are equipped. Reach the taxi. Close calls score a bonus.

**Crazy Cab and the 360 run.** Right gas, left brake, up and down change lane, A honks. A clock and checkpoints. The first drive is the cab to Revhard. After the clutch job, the 360 run goes to Doji's door.

**Coffee run** (88F). Eight orders, need six. Left and right pick espresso, blue latte, or oil shot. A serves. The bubble shows the order. Too slow counts as a miss.

**Crack the safe** (88F). Four digits. Left and right move the cursor, up and down change the digit, A tries. Green means that digit is right. Notes are on the trophies, the stats screen, and the framed transaction. The code is 8453. After two misses the screen starts hinting. After four it prints the digits.

**Merge the PRs** (88F). Eight diffs, three hearts, a timer. A or right merges, B or left rejects. Then A signs, which needs the hardware wallet from the safe.

**The Clutch Job** (Revhard). Three stations after you have the tools: ALIGN (hold the disc in the ring), BLEED (hit the nodes on time), BITE (hold the pedal in the band). The quest log lists them after the socket, the wrench, the star pattern, and the alignment tool.

**The Sunrise Run** (Revhard track). A race against the other cars. Top 3 continues the story. `?easy=1` on the chapter page eases that boot. `?race=1` can jump the chapter toward the race. Those flags are for testing. They are not a second game.
