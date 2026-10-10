import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { URL } from "node:url";
import { BOSS_FAMILIES, bossForNode } from "../src/data/bosses";
import { getQuestMap } from "../src/data/questMap";
import { apCourses } from "../src/data/apCourses";

test("every course resolves sixty named guardian variants without changing stored stop IDs", () => {
  assert.equal(Object.keys(BOSS_FAMILIES).length, 10);
  for (const course of apCourses) {
    const bosses = getQuestMap(course.id).units.flatMap((u) =>
      u.nodes.filter((n) => n.kind === "boss"),
    );
    assert.equal(bosses.length, 60);
    assert.equal(new Set(bosses.map((b) => b.title)).size, 60);
    assert.equal(new Set(bosses.map((b) => bossForNode(b.id)?.key)).size, 60);
    for (const node of bosses) {
      const art = bossForNode(node.id);
      assert.ok(art);
      assert.equal(art.name, node.title);
      assert.equal(art.tier, node.tier);
    }
  }
  assert.equal(bossForNode("ap-biology-u1-s1-lesson"), null);
  assert.equal(bossForNode("ap-biology-u99-s1-boss"), null);
});
test("every illustrated character is bundled and atlas portraits stay in bounds", () => {
  const manifest = JSON.parse(
    readFileSync(
      new URL("../docs/character-art-prompts.json", import.meta.url),
      "utf8",
    ),
  );
  const frames = JSON.parse(
    readFileSync(
      new URL("../src/data/characterFrames.json", import.meta.url),
      "utf8",
    ),
  );
  const catalog = readFileSync(
    new URL("../src/data/characterArt.ts", import.meta.url),
    "utf8",
  );
  assert.equal(manifest.assets.length, 22);
  assert.equal(
    manifest.assets.filter((a: { group: string }) => a.group === "companions")
      .length,
    12,
  );
  const hashes = new Set();
  let bytes = 0;
  for (const asset of manifest.assets) {
    const image = readFileSync(new URL(`../${asset.asset}`, import.meta.url));
    assert.equal(
      image.subarray(0, 8).toString("hex"),
      "89504e470d0a1a0a",
      `${asset.id} must be a real PNG`,
    );
    assert.ok(image.length > 8000);
    assert.ok([4, 6].includes(image[25]), `${asset.id} must have an alpha channel`);
    assert.ok(
      catalog.includes(`/${asset.group}/${asset.id}.png`),
      `${asset.id} needs a static bundle import`,
    );
    hashes.add(createHash("sha256").update(image).digest("hex"));
    bytes += image.length;
    if (asset.group !== "bosses") continue;
    const atlas = frames[asset.id];
    assert.equal(atlas.width * 2, atlas.height * 3);
    assert.equal(image.readUInt32BE(16), atlas.width);
    assert.equal(image.readUInt32BE(20), atlas.height);
    assert.equal(atlas.frames.length, 6);
    const cell = atlas.width / 3;
    atlas.frames.forEach(
      (frame: { x: number; y: number; size: number }, i: number) => {
        assert.ok([frame.x, frame.y, frame.size].every(Number.isFinite));
        assert.ok(frame.size > 0);
        assert.ok(frame.x >= 0 && frame.x + frame.size <= atlas.width);
        assert.ok(frame.y >= 0 && frame.y + frame.size <= atlas.height);
        // Individual square frames follow each silhouette, including hats that
        // extend beyond the nominal grid. Their centers retain row-major order.
        assert.equal(Math.floor((frame.x + frame.size / 2) / cell), i % 3);
        assert.equal(Math.floor((frame.y + frame.size / 2) / cell), Math.floor(i / 3));
      },
    );
  }
  assert.equal(
    hashes.size,
    22,
    "distinct assets must not silently reuse another image",
  );
  assert.ok(bytes < 8 * 1024 * 1024, "the character pack must stay under 8 MB");
});
