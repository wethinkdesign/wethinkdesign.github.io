import { portfolioConfig, categoryLabel } from "@/config/portfolio.config";
import manifest from "@/portfolio-manifest.json";
import { makeBuildProject } from "./portfolio-core";

export { makeBuildProject };

const buildProject = makeBuildProject(manifest, categoryLabel);

export function getProjects() {
  return portfolioConfig.map(buildProject).filter((p) => p.cover);
}

export function getProjectBySlug(slug) {
  const cfg = portfolioConfig.find((c) => (c.slug || String(c.id)) === slug);
  return cfg ? buildProject(cfg) : null;
}

export function projectSlugs() {
  return getProjects().map((p) => p.slug);
}
