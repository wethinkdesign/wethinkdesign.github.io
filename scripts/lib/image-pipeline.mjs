import path from "node:path";

export const WIDTHS = [400, 800, 1200, 2000];
export const FORMATS = ["avif", "webp"];

/** 回傳不超過原寬的目標寬度；若原寬小於最大檔位，補上原寬。 */
export function targetWidths(originalWidth, widths = WIDTHS) {
  const fitted = widths.filter((w) => w < originalWidth);
  if (fitted.length === 0 || originalWidth <= widths[widths.length - 1]) {
    if (!fitted.includes(originalWidth)) fitted.push(originalWidth);
  }
  return [...new Set(fitted)].sort((a, b) => a - b);
}

export function imageKey(id, filename) {
  return `${id}/${path.parse(filename).name}`;
}

export function variantPath(id, name, width, format) {
  return `/portfolio/${id}/${name}-${width}.${format}`;
}
