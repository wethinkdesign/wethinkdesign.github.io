"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/ui/Reveal";

const STEPS = [
  { num: "01", title: "初步設計諮詢", desc: "提供相關 CAD 或現場照，溝通需求、喜好與風格，由設計師提供專業建議、可能預算並介紹服務流程。" },
  { num: "02", title: "現場實地丈量", desc: "收取丈量費後進行實地丈量，並依據需求提供平面配置圖 PDF 檔以及初步報價單。" },
  { num: "03", title: "規劃討論及工程預算", desc: "針對平面配置圖及初步報價進行討論與細節確認。" },
  { num: "04", title: "簽約付款", desc: "簽訂正式合約，後續依工程時序表及施工圖進行施工，並配合階段性驗收與收款。" },
  { num: "05", title: "模擬圖討論", desc: "根據確定的平面圖與風格繪製 3D 模擬圖，並依據前期溝通需求進行討論與定稿。" },
  { num: "06", title: "施工圖確認", desc: "製作符合客戶家況的完整施工圖，確認後將以此內容作為後續現場施作的依據。" },
  { num: "07", title: "施工現場服務", desc: "開工後由設計師按工程進度表進行監督，並與各工種師傅確認裝修設計細節。" },
  { num: "08", title: "完工", desc: "與客戶進行完工驗收，並安排作品拍攝存檔。" },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.4"] });
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="overflow-hidden bg-bg-2 py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <Reveal className="mb-12 text-center">
          <p className="mb-4 font-display text-sm uppercase tracking-[4px] text-accent">Process</p>
          <h2 className="mb-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-ink">設計流程</h2>
          <p className="mx-auto max-w-[560px] font-light leading-[1.8] text-ink-soft">清晰透明的設計流程，讓每一步都安心放心。</p>
        </Reveal>
        <div ref={ref} className="relative mx-auto max-w-[760px]">
          <span className="absolute left-[19px] top-2 bottom-2 w-px bg-line md:left-1/2" aria-hidden />
          <motion.span style={{ scaleY: fillScale }} className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-accent md:left-1/2" aria-hidden />
          <ol className="flex flex-col gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={(i % 2) * 0.05}>
                <li className={`relative flex gap-6 md:w-1/2 ${i % 2 ? "md:ml-auto md:flex-row md:pl-10" : "md:flex-row-reverse md:pr-10 md:text-right"}`}>
                  <div className="relative z-1 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-accent bg-bg-2 font-display text-sm text-accent">{s.num}</div>
                  <div>
                    <h3 className="mb-2 font-display text-xl text-ink">{s.title}</h3>
                    <p className="text-sm font-light leading-[1.8] text-ink-soft">{s.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
