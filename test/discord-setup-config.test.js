import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("setup writes discord streaming off and enables discord plugin", () => {
  const src = fs.readFileSync(new URL("../src/server.js", import.meta.url), "utf8");
  assert.match(src, /streaming:\s*"off"/);
  assert.match(src, /plugins\.entries\.discord\.enabled/);
  assert.match(src, /plugins",\s*"enable",\s*"discord"/);
});
