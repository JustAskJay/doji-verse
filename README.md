# DOJI VERSE

A pixel-art browser game by Doji ([@TheDojiETH](https://x.com/TheDojiETH)), built on Base.

Walk out of Doji's room, explore the street, the dock, the labs and the pier, and play the mini games along the way. Brian's story chapters (`chapter2_nyc.html`) are part of the same game.

This build includes the DuckFacts mini boss: light the lamp on SOL ST PIER, open the hatch, solve the gift puzzle in THE EGG CELLAR, and step through the big egg.

## Overview

DOJI VERSE is a static site. The main game is one HTML file that draws a 320×180 canvas inside a handheld shell. You walk Doji (or, in guest mode, Brian) between rooms, talk, pick up key items, and launch short games. Progress for the street lives in the browser. Leaderboards need the game server and show BOARD OFFLINE when you play from a local file server.

Brian's story is a second page. `chapter1.html` only redirects into it. Finishing that story can unlock Brian on the title screen. The DuckFacts fight under the pier is in this preview build: the cellar and the fight keep their state in memory, and the fight does not write rewards or a save.

## Features

- Doji's room, the street, HOLM, WAGBi's site, the sidewalk gap, HTTPBASE20, BYTE DOCK, BYTE LAB, and SOL ST PIER
- Two story quests on the street (WAGBi's lost thing, HTTP: SURF'S UP) plus LIGHTS ON SOL ST and CLEAN THE WATER
- Room TV games: HOLM Coin Run and WAGBi Stacker
- Four canvas mini games: 200 OK, Bug Hunt, Wave Ride, and Ghost Whack
- Five hidden finds on Doji's side of the verse, plus Brian's finds in his chapters
- Brian's chapters: Base Tower 88F, Wall St, the cab, Revhard, and the drive back to Doji
- DuckFacts mini boss in THE EGG CELLAR (preview: rewards and saves off)

## Docs

- [The world](docs/WORLD.md) — areas, travel, NPCs, items, quests
- [Mini games](docs/MINIGAMES.md) — how to play, controls, scoring, where each one sits
- [DuckFacts boss](docs/DUCKFACTS-BOSS.md) — the pier path, the gift puzzle, the fight, `?warp=fight`
- [Architecture](docs/ARCHITECTURE.md) — loop, rendering, input, saves, audio, leaderboards
- [Contributing](docs/CONTRIBUTING.md) — run it, add a scene or mini game, code style

## Quick start

The whole game is static files, so any static server works:

```
npx serve .
```

or `python3 -m http.server`, then open the printed address. Opening `index.html` straight from disk (`file://`) starts the game too, but browsers block some canvas reads on `file://`, so a few sprite outlines may be missing. Use a server for the full experience.

Leaderboards (the BOARDS page in the START menu) and score saving talk to the game's own server, so when you run the game locally they show BOARD OFFLINE. Everything else plays offline, and progress is kept in your browser's local storage.

## Controls

- Move: arrow keys / WASD, or the on-screen D-pad
- A: E or Space
- B: X or Esc
- Start: Enter or P
- Mute: M

On the title screen the same pad picks a menu row. In the world, A uses the thing you are standing at. SELECT toggles the propeller hat. Key items do not toggle.

## Layout

- `index.html` – the main game (single file, plain JavaScript and canvas)
- `chapter1.html`, `chapter2_nyc.html`, `world.js` – Brian's story chapters
- `verse-board.js`, `brian-unlock.js` – leaderboard and unlock bridges to the game server
- `chars/`, `scenes/`, `street/`, `frames/`, `rh/`, title and room images – sprites and backgrounds
- `holm/`, `wagbi/` – the two mini games on the room TV
- `music/`, `room-loop.ogg` – music
- `fonts/` – Press Start 2P (SIL Open Font License, see `fonts/OFL.txt`)
- `docs/` – this write-up
