import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { getProjects } from "@/lib/portfolio";
import { ArrowIcon } from "@/components/ui/icons";

// 不對稱版面：每三個的第一個較大（lg 跨兩欄）。
const spanFor = (i) => (i % 3 === 0 ? "lg:col-span-2" : "lg:col-span-1");

export default function PortfolioPreview() {
  const projects = getProjects();
  return (
    <section id="portfolio" className="py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <Reveal className="mb-12 flex flex-col gap-2 md:mb-16">
          <p className="font-display text-sm uppercase tracking-[4px] text-accent">Portfolio</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-ink">精選作品</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ImageReveal key={p.slug} delay={(i % 3) * 0.08} className={spanFor(i)}>
              <Link href={`/portfolio/${p.slug}`} className="group relative block aspect-4/3 overflow-hidden bg-bg-2">
                <OptimizedImage imageKey={p.cover.key} alt={`${p.title}（${p.subtitle}）— ${p.categoryLabel}設計`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-bg/95 via-bg/30 to-transparent p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <h3 className="font-display text-2xl text-ink">{p.title}</h3>
                  <span className="text-xs uppercase tracking-[2px] text-accent-dark">{p.subtitle}</span>
                </div>
              </Link>
            </ImageReveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/portfolio" className="inline-flex items-center gap-3 border border-line px-10 py-4 text-xs uppercase tracking-[3px] text-accent transition-all duration-300 hover:-translate-y-0.5 hover:border-accent">
            查看全部作品 <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
