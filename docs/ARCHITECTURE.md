# Architecture

The site is static. There is no build, no bundler, and no package. `index.html` is the game. `chapter2_nyc.html` is Brian's story, with `chapter1.html` as a redirect. `holm/` and `wagbi/` are pages loaded in a frame. `world.js`, `verse-board.js`, and `brian-unlock.js` are plain scripts the pages include.

## The main file

`index.html` is one document: a little CSS, the shell (screen, D-pad, A, B, START, SELECT, slots, HUD), and one script. The playfield is a canvas, 320×180, with smoothing off. CSS scales that canvas to the window. Text is a baked 8×8 Press Start 2P sheet (`fonts/PressStart2P.woff` is the webfont for the HTML chrome; the canvas uses the bitmap).

The script is one scope. State is variables (`mode`, `px`, `py`, `sceneKind`, quest phases, `talk`, `MINI`, `BF`). Content is data: `PLACES`, `SPOTS`, `QUESTS`, `ITEMS`, `QUEST_LOG`, `LINES`, `CYCLE`, `WALK_ZONES`, `SCENE_SHEETS`.

## The frame

`draw(now)` is the loop, started with `requestAnimationFrame`. Delta time is capped at 50 ms.

- If a boss fight is active, the frame is `bfFrame` and the world does not step.
- If `mode` is `mini`, the frame is `miniFrame`.
- Otherwise the world reads the pad, steps climbing, resolves hotspots, draws the room, street, dock, pier, or scene, then the cat, dialogue, and HUD.

`mode` is `title`, `room`, `street`, `scene`, `dock`, `pier`, `game` (the TV frame), or `mini`. `sceneKind` picks the interior: `holm`, `wagbi`, `byte`, `http`, `cellar`.

Brian's page has the same shape: one canvas, one `t` clock, and a mode flag for the office, Wall St, the cab, Revhard, or the race.

## Rendering

Room art is `frames/sheet.png` (the bedroom loop) plus `doji_stand.png`. Street, dock, and pier are their own sheets (`street/sheet.png`, `street/dock.png`, `street/pier.png`, `street/pier-lit.png`). Interiors are filmstrips of 320×180 frames, 8 across:

| Scene | Sheet | Frames | FPS |
| --- | --- | --- | --- |
| HOLM | `scenes/holm.png` | 24 | 3 |
| WAGBi | `scenes/wagbi.png` | 24 | 3 |
| BYTE LAB | `scenes/byte.png` | 48 | 6 |
| HTTPBASE20 | `scenes/http.png` | 48 | 6 |

Those four sheets load after the first paint (or when you leave the room), so the title is not waiting on them. The pier, dock, and faces load immediately.

Outlines on hotspots are baked pixel lists, traced from the art, drawn as a 1-pixel edge plus a glow. Pier characters, trash, gifts, and ducklings are drawn from strings in the script, not from image files, so their icons do not depend on a second request.

The bedroom scales the cat with depth. Everywhere else the sprite is 1 native pixel. The hat is painted on top when it is worn. Guest mode draws `chars/brian-atlas.png` instead, and draws Doji standing in the room.

Dialogue is a typewriter in the canvas, about 40 characters a second, with pauses on punctuation. `*word*` is highlighted. A finishes the line, then advances. B closes. Speakers have a name, a color, a portrait, and a blip waveform.

## Scenes and warps

A place is a row: which `mode` it belongs to, an optional `scene`, a rectangle, the zone where your feet must be, a label, and either `go` or a talk handler.

`goPlace` sets `mode`, `sceneKind`, and the spawn point, plays the fade, and refreshes the item slots. `go.mode === "game"` opens the TV frame. `go.mode === "mini"` starts a canvas game. Rows with `go: null` only talk, look, or explain a lock.

Walk zones are rectangles. A zone with `requires: "surfboard"` is water. On land, water is a wall. In the water, the sidewalk is a wall. The pier also blocks x past the fog line until the lamp is lit.

Preview query flags never call the save write:

| Flag | Effect |
| --- | --- |
| `?preview=byte` | Lends the surfboard. |
| `?warp=byte` | BYTE LAB. Implies preview. |
| `?warp=dock` | BYTE DOCK. |
| `?warp=http` | HTTPBASE20 with the 402 door already paid. |
| `?warp=pier` | SOL ST PIER. |
| `?warp=hatch` | Pier, lamp lit. |
| `?warp=cellar` | THE EGG CELLAR. |
| `?warp=fight` | Cellar, gifts solved, fight started. See the boss doc. |
| `?game=http\|lab\|dock\|pier` | That mini game's title card. |
| `?as=brian` | Walk the verse as Brian. Story saves stay put. |

`world.js` is a registry (`window.DV`) of area ids, exits, items, and secrets under the key `doji-world`. Pages still move the player themselves. The registry mirrors older saves. It does not write `doji-player`.

## Input

Keyboard: arrows and WASD move, E or Space is A, X or Esc is B, Enter or P is START, M toggles sound. The on-screen D-pad writes the same key state, plus a stick vector for the TV menu. Clicking the canvas walks toward the point, or uses the hotspot if you click its bubble. SELECT and the slot buttons toggle the hat. Slots for key items do not equip.

The boss fight reads the same pad but handles A and B itself (throw, dodge, lamp, fuse).

## Saves

One player blob, key `doji-player`, version field `v: 9`. Preview mode does not write it. The write is `localStorage.setItem` of JSON. There is no network call inside that function. `syncAuth` only fills `window.dojiAuth` with the display name.

Fields that matter: `name`, `characterId`, `sound`, `introSeen`, `quest` (`none` / `find` / `back` / `done`), `hatHeld`, `hatLive`, `worn`, `yoursSaid`, `http` (`none` / `open` / `compile` / `done`), `sfx`, `seen` (short ids, capped), `textSpeed`, `flash`, `ambient`, `haptics`, `secrets`, `pier`, `clean`, `trash` (ids scooped), `best` (the four canvas games).

Other keys:

| Key | Who writes it | What it is |
| --- | --- | --- |
| `doji-world` | `world.js` | Shared flags, items, secrets, visits. Not written on `?race=1` or `?finished=1`. |
| `doji-story` | Brian's page | Chapter marker (`ch1`, `ch2`, `free`). |
| `doji-ch1` | Brian's page | Office seen flag, items, and mid-office progress. |
| `doji-ch2` | Brian's page | Wall St, Revhard, race, kicks, secrets. |
| `doji-unlocks` | Main page and Brian's page | Character unlock times. Brian's entry unlocks the title pick. |
| `doji-title-char` | Title screen | Who stands on the title. |
| `doji-news-brian` | Main page | Whether the unlock card was seen. |
| `doji-brian-reported` | `brian-unlock.js` | So the unlock report is sent once. |
| `holmCoinRun.best` | HOLM Coin Run | Local best. |
| `wagbiStacker.best` | WAGBi Stacker | Local best. |

`?newstory=1` removes the story keys and `doji-world` and `doji-title-char`. It leaves `doji-player`. `?finished=1` makes the chapter keys read as a finished story from memory and drops writes, including writes to `doji-world`. `doji-player` is not in that set.

The cellar (`CEL`) and the fight (`BF`, loss count, help flags) are variables. Leaving the tab drops them.

## Audio

The room uses `<audio id="tune">` on `room-loop.ogg`, looped, volume 0.55. `player.sound` remembers it. M and the radio toggle it.

Sound effects and ambient beds are Web Audio oscillators and noise, created after a user gesture. Dialogue blips use the speaker's wave and pitch. The pier has its own bed and a short theremin when the lamp lights. SFX, ambient, haptics, text speed, and reduced flash are settings on the player blob.

Brian's page plays the files in `music/` (and `rh/a-track-after-dark` for Revhard). `music/loops.json` stores intro and loop points so a track can start with a sting and then cycle. Tracks: HQ morning, elevator, Wall St, the cab, the breakdown, and the westbound drive.

## Leaderboards

Boards are optional. Local play shows BOARD OFFLINE. No key or token belongs in the static files. The client only sends the game id, the score, and the time, plus whatever session the page already has. This doc does not list those session fields.

`verse-board.js` exposes `VerseBoard.get(game)` and `VerseBoard.finish(run)`.

- A read is `GET /api/verse-leaderboard?game=<id>` on the same origin.
- A write is `POST /api/verse-score` with JSON `game`, `score`, and `ms`.
- Game ids: `holm`, `wagbi`, `http`, `lab`, `dock`, `pier`.
- A run is practice, and is not posted, when there is no session, when the URL is a preview or warp, or when the run is marked tutorial or preview. HOLM Coin Run is never posted through this helper (`game !== "holm"`). A post also requires score &gt; 0 and a score above the weekly best the client last saw.
- The JSON comes back with `weekly` and `all_time`, each with a `player` (`best`, `rank`) and a top list. The HUD line becomes `YOU #n` and, if it fits, `WK #n`.
- Status text: 401 tells you to reopen from the bot, 429 says the score was not saved because it was too fast (the client then re-reads the board), 400 and 422 say the score was rejected, anything else is BOARD OFFLINE.

The START menu BOARDS page uses the same helper.

HOLM Coin Run does not use that helper. Its page reads `GET /api/leaderboard` and posts `POST /api/score`. On a `replit.app` host those paths are same-origin. Otherwise they are prefixed with the app origin baked in `holm/index.html`. The payload it understands is the same shape: `all_time` and `weekly`, each with `top10` and `player`. WAGBi Stacker calls `VerseBoard.finish` with `game: "wagbi"`.

`brian-unlock.js` runs once, from `index.html`, when Brian is already unlocked in `doji-unlocks` or `doji-story` exists. It skips preview and dev URLs. It `POST`s `/api/unlock` on the same origin with `unlock: "brian"`. A 200, 204, or 422 stores `doji-brian-reported` so it does not retry. It does not read or write `doji-player`.
