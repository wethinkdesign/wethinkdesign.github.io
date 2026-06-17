import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { glob } from "glob";
import { portfolioConfig } from "../src/config/portfolio.config.js";
import { targetWidths, imageKey, variantPath, FORMATS } from "./lib/image-pipeline.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "assets/portfolio");
const OUT_DIR = path.join(ROOT, "public/portfolio");
const MANIFEST = path.join(ROOT, "src/portfolio-manifest.json");

async function blurDataURL(input) {
  const buf = await sharp(input).resize(20).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

async function run() {
  const images = {};
  const projects = {};

  for (const { id } of portfolioConfig) {
    const dir = path.join(SRC_DIR, String(id));
    const files = (await glob("*.{jpg,jpeg,png,webp}", { cwd: dir, nocase: true })).sort();
    if (files.length === 0) {
      console.warn(`⚠ 案件 ${id} 在 assets/portfolio/${id} 沒有圖片，略過`);
      continue;
    }
    await fs.mkdir(path.join(OUT_DIR, String(id)), { recursive: true });
    projects[String(id)] = [];

    for (const file of files) {
      const input = path.join(dir, file);
      const name = path.parse(file).name;
      const meta = await sharp(input).metadata();
      const widths = targetWidths(meta.width);
      const entry = { width: meta.width, height: meta.height, blurDataURL: await blurDataURL(input), avif: {}, webp: {} };

      for (const w of widths) {
        for (const fmt of FORMATS) {
          const out = path.join(OUT_DIR, String(id), `${name}-${w}.${fmt}`);
          const pipe = sharp(input).resize({ width: w, withoutEnlargement: true });
          await (fmt === "avif" ? pipe.avif({ quality: 55 }) : pipe.webp({ quality: 72 })).toFile(out);
          entry[fmt][w] = variantPath(id, name, w, fmt);
        }
      }
      const key = imageKey(id, file);
      images[key] = entry;
      projects[String(id)].push(key);
      console.log(`✓ ${key} (${widths.length} widths)`);
    }
  }

  await fs.writeFile(MANIFEST, JSON.stringify({ images, projects }, null, 2));
  console.log(`\n寫入 ${path.relative(ROOT, MANIFEST)}：${Object.keys(images).length} 張圖`);
}

run().catch((e) => { console.error(e); process.exit(1); });
