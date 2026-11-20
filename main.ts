// gta6-clipper-01 — entry program.
//
// The video is the entry: this program only hands its address over. It reads
// VIDEO.json from the repository root and copies it, byte for byte, to the
// output directory, where the house picks it up and reads the video itself
// through the YouTube Data API. Nothing else is written about the video.
//
// Runs on Node 22 with the standard library only: no network, no clock, no
// files outside the repository, so both runs write the same bytes.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const src = join(botDir, "VIDEO.json");
const dst = join(outDir, "VIDEO.json");

const raw = readFileSync(src, "utf8");
const parsed: unknown = JSON.parse(raw);
if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
  throw new Error("VIDEO.json must hold a JSON object");
}
const url = (parsed as Record<string, unknown>).url;
if (typeof url !== "string" || url.length === 0) {
  throw new Error("VIDEO.json must hold a url string");
}
// Fail fast on an address the gate would refuse: a YouTube video address
// (shorts/<id>, watch?v=<id> or youtu.be/<id>) whose id is 11 characters
// of letters, digits, _ and -. A bad address never reaches the house.
const idPattern = /^[A-Za-z0-9_-]{11}$/;
let videoId: string | null = null;
try {
  const parsedUrl = new URL(url);
  const host = parsedUrl.hostname.toLowerCase();
  if (host === "youtu.be") {
    const id = parsedUrl.pathname.replace(/^\//, "");
    if (idPattern.test(id)) videoId = id;
  } else if (
    host === "youtube.com" ||
    host === "www.youtube.com" ||
    host === "m.youtube.com"
  ) {
    const shortMatch = /^\/shorts\/([A-Za-z0-9_-]{11})\/?$/.exec(
      parsedUrl.pathname,
    );
    const watchId = parsedUrl.searchParams.get("v");
    if (shortMatch) videoId = shortMatch[1];
    else if (watchId !== null && idPattern.test(watchId)) videoId = watchId;
  }
} catch {
  videoId = null;
}
if (videoId === null) {
  throw new Error("VIDEO.json url is not a YouTube video address");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
