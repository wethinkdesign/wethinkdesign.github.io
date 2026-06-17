"use client";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { faqs } from "@/config/faq";

export default function FAQ() {
  const [open, setOpen] = useState(-1);

  return (
    <section id="faq" className="py-20 md:py-24">
      <div className="mx-auto max-w-[760px] px-6 md:px-12">
        <Reveal className="mb-12 text-center">
          <p className="mb-4 font-display text-sm uppercase tracking-[4px] text-accent">FAQ</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-ink">常見問題</h2>
        </Reveal>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="border border-line bg-card">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-lg text-ink">{f.q}</span>
                    <span className={`flex-none text-xl text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>＋</span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm font-light leading-[1.9] text-ink-soft">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
