# WeThink 維想室內裝修設計 — 官網

Next.js 16（靜態匯出）+ React 19 + Tailwind CSS v4 + Motion，部署於 GitHub Pages。

## 開發

```bash
npm install
npm run images   # 首次或新增/變更作品圖後執行：生成優化圖與 manifest
npm run dev      # 本機開發 http://localhost:3000
```

## 建置

```bash
npm run images   # 確保 public/portfolio 與 src/portfolio-manifest.json 為最新
npm run build    # 靜態匯出到 out/
```

> `public/portfolio/` 與 `src/portfolio-manifest.json` 為 `npm run images` 的生成物。
> 變更 `assets/portfolio/` 原圖或 `src/config/portfolio.config.js` 後，務必重跑 `npm run images`。

## 新增作品案件

1. 原圖放入 `assets/portfolio/<id>/`，檔名兩位數補零（`01.jpeg`、`02.jpeg`…），`01` 為封面。
   來源支援 `.jpeg/.jpg/.png/.webp`，建議長邊 ≥ 2000px。
2. 在 `src/config/portfolio.config.js` 新增一筆 `{ id, slug, title, subtitle, category }`。
   - `slug`：英文小寫連字號，作為網址 `/portfolio/<slug>`；不填則用 id。
   - `category`：`residential` / `commercial` / `office`。
3. 執行 `npm run images`，再 `npm run build`，案件內頁會自動生成。

詳見 `docs/superpowers/specs/2026-06-13-site-redesign-design.md`（附錄 A）。

## 圖片優化策略

GitHub Pages 為靜態部署，Next.js 內建圖片優化無法運作，故採 build 期管線：

- `scripts/optimize-images.mjs`（sharp）：把 `assets/portfolio` 原圖轉成多尺寸 AVIF/WebP 與模糊預覽佔位圖，寫入 `src/portfolio-manifest.json`。
- `src/components/ui/OptimizedImage.jsx`：輸出 `<picture>` + `srcset` + 模糊佔位 + lazy load。
- 132MB 原圖（`assets/`，不部署）→ 約 14MB 優化變體（`public/`，部署）。

## 測試

```bash
npm test   # 圖片管線純函式 + 資料層
```
