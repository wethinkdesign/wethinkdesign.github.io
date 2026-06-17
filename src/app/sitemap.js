import { projectSlugs } from "@/lib/portfolio";

export const dynamic = "force-static";

const SITE_URL = "https://wethinkdesign.github.io";

export default function sitemap() {
  const now = new Date();
  const staticPages = [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
  const projectPages = projectSlugs().map((slug) => ({
    url: `${SITE_URL}/portfolio/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));
  return [...staticPages, ...projectPages];
}
