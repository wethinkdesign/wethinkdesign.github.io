import { test } from "node:test";
import assert from "node:assert/strict";
import { targetWidths, variantPath, imageKey } from "./lib/image-pipeline.mjs";

test("targetWidths 不超過原圖寬度，且含原寬上限", () => {
  assert.deepEqual(targetWidths(2400), [400, 800, 1200, 2000]);
  assert.deepEqual(targetWidths(1000), [400, 800, 1000]);
  assert.deepEqual(targetWidths(300), [300]);
});

test("variantPath 產生 public 下正確路徑", () => {
  assert.equal(variantPath(1, "01", 800, "avif"), "/portfolio/1/01-800.avif");
});

test("imageKey 由 id 與檔名組成", () => {
  assert.equal(imageKey(2, "07.jpeg"), "2/07");
});
