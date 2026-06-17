import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

const STATS = [
  { end: 150, suffix: "+", label: "完成案例" },
  { end: 10, suffix: "+", label: "年設計經驗" },
  { end: 98, suffix: "%", label: "客戶滿意度" },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <Reveal className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div className="relative aspect-3/4 overflow-hidden">
            <img src="/cover.jpg" alt="WeThink 設計工作室" className="h-full w-full object-cover" loading="lazy" />
            <span className="pointer-events-none absolute inset-0 border border-line" />
          </div>
          <div className="py-5">
            <p className="mb-4 font-display text-sm uppercase tracking-[4px] text-accent">About Us</p>
            <h2 className="mb-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight text-ink">
              以人為本，<br />用心雕琢每一處細節
            </h2>
            <p className="mb-10 max-w-[560px] font-light leading-[1.8] text-ink-soft">
              WeThink 維想室內裝修設計工作室成立於 2024 年，合法立案、具裝修證照。我們的設計哲學以「人」為核心 —— 深入了解每位屋主的生活習慣、美學偏好與未來需求，打造出不僅美觀、更兼具實用與舒適的生活空間。
              <br /><br />
              從概念發想到施工落地，我們全程參與每個環節，確保設計的完整性與品質。
            </p>
            <div className="flex flex-wrap gap-8 border-t border-line pt-10 md:gap-12">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="mb-2 font-display text-[2.8rem] font-light leading-none text-accent">
                    <Counter end={s.end} suffix={s.suffix} />
                  </div>
                  <div className="text-xs uppercase tracking-[2px] text-ink-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
