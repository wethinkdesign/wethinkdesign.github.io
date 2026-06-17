/** 純函式：合併單筆 config 與 manifest 成案件物件。無框架依賴，可單元測試。 */
export function makeBuildProject(manifest, labels) {
  return function buildProject(cfg) {
    const slug = cfg.slug || String(cfg.id);
    const keys = manifest.projects[String(cfg.id)] || [];
    const images = keys.map((k) => ({ key: k, ...manifest.images[k] }));
    return {
      ...cfg,
      slug,
      categoryLabel: labels[cfg.category] || "",
      cover: images[0] || null,
      images,
    };
  };
}
