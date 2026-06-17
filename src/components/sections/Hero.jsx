"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowIcon } from "@/components/ui/icons";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // 滾動視差：背景隨滾動緩緩上移，內容略微下沉並淡出
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative flex h-[78svh] min-h-[520px] items-center overflow-hidden md:h-screen md:min-h-[700px]">
      <motion.div className="absolute inset-0 z-0 will-change-transform" style={{ y: bgY }}>
        <picture className="hidden h-full w-full landscape:block">
          <source type="image/webp" srcSet="/landing.webp" />
          <img src="/landing.jpeg" alt="WeThink 室內設計作品" className="h-full w-full origin-center animate-[kenburns_22s_ease-out_forwards] object-cover brightness-90 saturate-[0.9]" fetchPriority="high" />
        </picture>
        <picture className="block h-full w-full landscape:hidden">
          <source type="image/webp" srcSet="/landing-portrait.webp" />
          <img src="/landing-portrait.jpeg" alt="WeThink 室內設計作品" className="h-full w-full origin-center animate-[kenburns_22s_ease-out_forwards] object-cover brightness-90 saturate-[0.9]" fetchPriority="high" />
        </picture>
      </motion.div>
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-bg/85 via-bg/40 to-bg/10" />
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-bg/10 via-bg/20 to-bg" />

      <motion.div
        className="relative z-2 max-w-[900px] px-6 md:px-12"
        style={{ y: contentY, opacity: contentOpacity }}
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
        <p className="mb-6 font-display text-sm uppercase tracking-[6px] text-accent">Wethink Design Studio</p>
        <h1 className="mb-8 font-display text-[clamp(2.8rem,6vw,5rem)] font-normal leading-[1.15] text-ink">
          <span className="block overflow-hidden pb-1">
            <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}>
              空間，
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}>
              是生活的<em className="not-italic text-accent-dark italic">延伸</em>
            </motion.span>
          </span>
        </h1>
        <p className="mb-12 max-w-[480px] text-[1.05rem] font-light leading-[1.9] text-ink-soft">
          與你一起尋找家的溫度。我們相信好的設計源自於對生活的深刻理解，每個空間都值得被用心對待。
        </p>
        <Link href="/portfolio" className="inline-flex items-center gap-3 border border-accent-dark px-9 py-4 text-xs uppercase tracking-[3px] text-accent transition-all duration-300 hover:bg-accent hover:text-bg">
          探索作品 <ArrowIcon className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
