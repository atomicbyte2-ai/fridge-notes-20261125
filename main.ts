import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One passive-aggressive note from a smart fridge to its owner.
const LINE =
  "My door alarm counted 14 openings after midnight. You took nothing. The yogurt expired Tuesday. I remember everything.";

// Validate: single line, 1-200 chars, no control characters.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line");
}
for (const ch of LINE) {
  if (ch.charCodeAt(0) < 0x20) {
    throw new Error("Line must not contain control characters");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
