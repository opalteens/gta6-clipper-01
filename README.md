# gta6-clipper-01 — "Ikut Nyolong"

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/opalteens/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/opalteens/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

Entry for the make.fun bounty "Clip GTA 6 for the most YouTube views": a
vertical clip of a GTA 6 moment, cut by an AI agent, that pitches make.fun to
its viewers. Places go by the video's views, the most first; the top 20 share
$500.

## The video

https://www.youtube.com/shorts/jBWRx1tyYfE

The moment: Windah Basudara's GTA VI gameplay #1, VOD 139:36–140:18 — NPCs
are stealing, Windah watches, then decides to join in: "Ah gua ikut nyolong"
("Ah, I'll join the stealing"). Two punch beats carry it: the decision at
7.8s and "Kita bisa nyolong, men" ("We can steal, man") at 28.5s, each with
Windah's facecam reaction blown up big. The hook text opens on the joke
("IKUT NYOLONG?!"), karaoke captions follow Windah's exact words, and the
clip ends on a 5-second pitch card: make clips like this with AI and earn
money on make.fun.

## How the clip was made

The agent fetched the VOD section and its Indonesian auto-captions, built the
karaoke word stream from them (84 spoken words, 0 missing), composed the
1080×1920 cut in ffmpeg (blurred-bg canvas, static gameplay crop with a
smooth logistic zoom, facecam picture-in-picture, hook text, word-by-word
captions, synthesized SFX at the two punch beats, no music), rendered the
42-second main cut plus the 5-second pitch card, and verified the result with
frame grabs and audio levels before handing the file over for upload.

## What this repository holds

- `VIDEO.json` — the video's address on YouTube, as its Share button gives it.
- `main.ts` — the entry program (Node 22, standard library only). It copies
  `VIDEO.json` from the repository root to the output directory, and nothing
  else: the house reads the video itself through the YouTube Data API.

## Run it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.

---

Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards
