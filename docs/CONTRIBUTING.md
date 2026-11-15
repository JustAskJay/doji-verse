# Contributing

The game is static files. Change a file, refresh the browser. There is no compile step and no package install.

## Run it locally

From the repo root:

```
npx serve .
```

or:

```
python3 -m http.server
```

Open the address the server prints. `file://` will boot `index.html`, but some outline reads fail, so use a server when you are checking art.

Leaderboards stay on BOARD OFFLINE until the page is served from the host that has `/api/verse-leaderboard` and `/api/verse-score`. Story progress and the street save do not need that host.

Useful URLs while you are testing. They are all in the game script. Preview and warp URLs do not write `doji-player`.

- `?preview=byte` lends the surfboard.
- `?warp=byte`, `dock`, `http`, `pier`, `hatch`, `cellar`, `fight` skip to that spot. `fight` accepts `phase`, `diff=easy`, `tut=1`, and `help=force`.
- `?game=http`, `lab`, `dock`, or `pier` opens that canvas game.
- `?as=brian` walks Doji's map as Brian.
- `?newstory=1` clears Brian's story keys, not `doji-player`.
- On `chapter2_nyc.html`, `manual`, `dev`, `race`, and `unlockall` skip the lock that sends you back to `index.html`.

## Add a scene

Scenes in `index.html` are data, not new files.

1. Put the art in `scenes/` or `street/`. Filmstrips are 320×180 frames, 8 columns. Match `SCENE_SHEETS` (`img`, `n`, `fps`) if the background animates.
2. Add a walk zone to `WALK_ZONES` if the floor is not the default strip. Use `requires` only for a zone that should stay shut until an item is owned. The surfboard is the only item the water zones check.
3. Add `PLACES` rows. `from` is the mode (`room`, `street`, `dock`, `pier`, or `scene`). Set `scene` when `from` is `scene`. `zone` is where the feet must be. `go` is `{ mode, scene, x, y, face }`, or `{ mode: "game", game }`, or `{ mode: "mini", game }`. `go: null` means talk or look only. `labelFn` and `locked` are optional functions.
4. If the spot should outline, add an entry to `OUTLINES` or a `mask` of pixel offsets. Existing spots use baked masks so the outline matches the sprite.
5. Dialogue goes in `LINES` (played once) or `CYCLE` (A cycles the sets). Start it from the spot's handler with `beginTalk`. If a line grants an item, set `get` to the item id and handle it in `nextTalkLine`, the way the hat, board, fuse, bucket, and fish do.
6. A quest is a `QUEST_LOG` row: `id`, `name`, `started()`, `steps` with `text` and `done()`, and `reward`. The HUD reads those functions every frame. Do not mirror the step into a second variable unless the save needs it.
7. If the place should show up on the shared map, register it in `world.js` (`id`, `name`, `page`, `exits`). Travel still happens in the page. The registry does not move the player.
8. New saved fields belong in `readPlayer` and `writePlayer`, with a default for old blobs. Bump `v` only if you are migrating. Preview must keep skipping the write.

Name the place the way the HUD should say it in `PLACE_NAMES`.

Brian's page is the same idea with different tables: interactables are `{ id, x, y, name, fn }`, and his mini games are objects with `update`, `a`, `b`, and `draw`. Follow that file's style if the scene belongs to his story.

## Add a mini game

Canvas games in `index.html`:

1. Add an id to `MINI_IDS` and a row in `MINI_DEFS`: `name`, two `how` lines, `ctl`, `goal` (the star on the card, not a win condition), and `place`.
2. Implement `MG.<id>` with `init`, `update(g, dt, now, inp)`, `a`, optional `up`, and `draw`. Use `addScore`, `popText`, `burst`, and `miniOver(reason)`. `miniOver` talks to the leaderboard helper and, if the score beats `player.best`, writes it. Do not write the save yourself during a preview. `miniOver` already marks preview runs.
3. Add a `PLACES` row with `go: { mode: "mini", game: "<id>" }` and a prop in `MINI_PROPS` if it should be drawn in the world.
4. If the score should rank, add the id to the `games` and `titles` arrays in `verse-board.js`. HOLM is in that list and is still not submitted by `finish`. Match that if you need the same exception.
5. A first-play lesson is a `TUT` entry. The title card grows a HOW TO row when one exists.

A framed game is a folder like `holm/` or `wagbi/`: its own HTML and a 320×180 canvas. Point `openGame` at the new page and add a TV or world button. The parent only loads the frame. HOLM Coin Run and WAGBi Stacker dispatch `holm:gameover` and `wagbi:gameover` on their own window, and a script in that same page handles the board. Keep a local best in your own `localStorage` key. Call `VerseBoard.finish` only if this game should post, and only with `game`, `score`, `ms`, and `previousBest`.

## Code style

Match the file you are editing.

- Plain browser JavaScript. `var` and `function` in `index.html`. No modules, no TypeScript, no framework.
- The canvas stays 320×180 with `imageSmoothingEnabled = false`. Draw sprites at 1 pixel unless you are in the bedroom depth scale.
- Prefer a data row (`PLACES`, `QUEST_LOG`, `LINES`) over a new branch in the main loop.
- Dialogue lines are short. Wrap a name in `*asterisks*` when it should highlight. One idea per line.
- Do not put secrets, keys, or session values in the static files. Leaderboard calls stay on the paths in `verse-board.js` and `brian-unlock.js`.
- Comments in these files mark the pass they were added in (`v8`, `v9`). A short comment on a new system is enough. Do not rename old pass markers.
- Preview and warp paths must keep skipping `writePlayer`.
- `world.js` may read `doji-player`. It must not write it.
- Fonts: Press Start 2P is SIL Open Font License. The notice is `fonts/OFL.txt`.

Check the change in a browser: the new spot, the locked state, the save after a refresh, and a `?warp=` or `?preview=` load that leaves the real save alone.
