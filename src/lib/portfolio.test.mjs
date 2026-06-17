import { test } from "node:test";
import assert from "node:assert/strict";
import { makeBuildProject } from "./portfolio-core.js";

const fakeManifest = {
  images: { "1/01": { width: 10, height: 10, blurDataURL: "x", webp: {}, avif: {} } },
  projects: { "1": ["1/01"] },
};
const build = makeBuildProject(fakeManifest, { residential: "住宅空間" });

test("buildProject 合併 config 與 manifest", () => {
  const p = build({ id: 1, slug: "freedom-hill", title: "自由之丘", subtitle: "C宅", category: "residential" });
  assert.equal(p.slug, "freedom-hill");
  assert.equal(p.cover.key, "1/01");
  assert.equal(p.images.length, 1);
  assert.equal(p.categoryLabel, "住宅空間");
});

test("slug 未填退回 id 字串", () => {
  const p = build({ id: 9, title: "X", subtitle: "Y", category: "residential" });
  assert.equal(p.slug, "9");
});
