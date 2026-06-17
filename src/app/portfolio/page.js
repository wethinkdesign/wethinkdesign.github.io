import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { getProjects } from "@/lib/portfolio";

const SITE_URL = "https://wethinkdesign.github.io";

export const metadata = {
  title: "精選作品",
  description: "WeThink 維想室內裝修設計工作室精選室內設計作品集，涵蓋住宅、商業與辦公空間設計案例。",
  alternates: { canonical: "/portfolio" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "精選作品", item: `${SITE_URL}/portfolio` },
  ],
};

export default function PortfolioIndex() {
  const projects = getProjects();
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1280px] px-6 pt-32 pb-24 md:px-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <nav aria-label="breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[2px] text-ink-muted">
            <li><Link href="/" className="transition hover:text-accent">首頁</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">精選作品</li>
          </ol>
        </nav>
        <Reveal className="mb-12 md:mb-16">
          <p className="font-display text-sm uppercase tracking-[4px] text-accent">Portfolio</p>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light text-ink">精選作品</h1>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ImageReveal key={p.slug} delay={(i % 3) * 0.08}>
              <Link href={`/portfolio/${p.slug}`} className="group relative block aspect-4/3 overflow-hidden bg-bg-2">
                <OptimizedImage imageKey={p.cover.key} alt={`${p.title}（${p.subtitle}）— ${p.categoryLabel}設計`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-bg/95 via-bg/30 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <h2 className="font-display text-2xl text-ink">{p.title}</h2>
                  <span className="text-xs uppercase tracking-[2px] text-accent-dark">{p.subtitle} · {p.categoryLabel}</span>
                </div>
              </Link>
            </ImageReveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
