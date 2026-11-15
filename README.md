# DOJI VERSE

A pixel-art browser game by Doji ([@TheDojiETH](https://x.com/TheDojiETH)), built on Base.

Walk out of Doji's room, explore the street, the dock, the labs and the pier, and play the mini games along the way. Brian's story chapters (`chapter2_nyc.html`) are part of the same game.

This build includes the DuckFacts mini boss: light the lamp on SOL ST PIER, open the hatch, solve the gift puzzle in THE EGG CELLAR, and step through the big egg.

## Run it locally

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

## Layout

- `index.html` – the main game (single file, plain JavaScript and canvas)
- `chapter1.html`, `chapter2_nyc.html`, `world.js` – Brian's story chapters
- `verse-board.js`, `brian-unlock.js` – leaderboard and unlock bridges to the game server
- `chars/`, `scenes/`, `street/`, `frames/`, `rh/`, title and room images – sprites and backgrounds
- `holm/`, `wagbi/` – the two mini games on the room TV
- `music/`, `room-loop.ogg` – music
- `fonts/` – Press Start 2P (SIL Open Font License, see `fonts/OFL.txt`)
