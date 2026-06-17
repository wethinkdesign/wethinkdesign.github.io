import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import { getProjectBySlug, projectSlugs } from "@/lib/portfolio";

const SITE_URL = "https://wethinkdesign.github.io";

const largestWebp = (img) => img.webp[Math.max(...Object.keys(img.webp).map(Number))];

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return {};
  const title = `${p.title}（${p.subtitle}）`;
  const description = `WeThink 維想室內裝修設計 — ${p.title} ${p.subtitle}，${p.categoryLabel}設計案例。`;
  const ogImage = p.cover ? `${SITE_URL}${largestWebp(p.cover)}` : `${SITE_URL}/cover.jpg`;
  return {
    title,
    description,
    alternates: { canonical: `/portfolio/${p.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/portfolio/${p.slug}`, images: [{ url: ogImage }], type: "article" },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${p.title}（${p.subtitle}）`,
    about: `${p.categoryLabel}設計`,
    creator: { "@id": `${SITE_URL}/#organization` },
    image: p.images.map((img) => `${SITE_URL}${largestWebp(img)}`),
    url: `${SITE_URL}/portfolio/${p.slug}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "精選作品", item: `${SITE_URL}/portfolio` },
      { "@type": "ListItem", position: 3, name: `${p.title}（${p.subtitle}）`, item: `${SITE_URL}/portfolio/${p.slug}` },
    ],
  };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1280px] px-6 pt-32 pb-24 md:px-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <nav aria-label="breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[2px] text-ink-muted">
            <li><Link href="/" className="transition hover:text-accent">首頁</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/portfolio" className="transition hover:text-accent">精選作品</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">{p.title}</li>
          </ol>
        </nav>
        <header className="mb-12">
          <p className="font-display text-sm uppercase tracking-[4px] text-accent">{p.categoryLabel}</p>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light text-ink">{p.title}</h1>
          <span className="text-sm uppercase tracking-[2px] text-ink-muted">{p.subtitle}</span>
        </header>
        <ProjectGallery images={p.images} title={p.title} />
      </main>
      <Footer />
    </>
  );
}
