import Reveal from "@/components/ui/Reveal";

const SERVICES = [
  { icon: "⬡", title: "住宅空間設計", desc: "針對不同坪數與格局，規劃符合居住者生活習慣的空間配置。從新成屋、中古屋到老屋翻新，打造您的夢想居所。" },
  { icon: "◈", title: "商業空間設計", desc: "為餐飲、零售、美容等商業空間提供品牌導向的設計規劃，結合商業策略與美學表達，提升空間價值與品牌形象。" },
  { icon: "▣", title: "辦公空間規劃", desc: "以人性化的工作環境為出發點，規劃高效能且舒適的辦公空間，提升團隊工作效率與企業形象。" },
];

export default function Services() {
  return (
    <section id="services" className="bg-bg-2 py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <Reveal className="mb-12 text-center">
          <p className="mb-4 font-display text-sm uppercase tracking-[4px] text-accent">Services</p>
          <h2 className="mb-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-ink">我們的服務</h2>
          <p className="mx-auto max-w-[560px] font-light leading-[1.8] text-ink-soft">從空間規劃到軟裝搭配，提供全方位的設計服務，為您量身定制理想空間。</p>
        </Reveal>
        <div className="grid gap-0.5 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden border border-line bg-card p-10 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:bg-card-2 hover:shadow-lg md:p-14">
                <span className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                <div className="mb-8 text-3xl text-accent opacity-80">{s.icon}</div>
                <h3 className="mb-4 font-display text-2xl font-normal text-ink">{s.title}</h3>
                <p className="text-sm font-light leading-[1.8] text-ink-soft">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
