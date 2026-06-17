"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AboutIcon, ServicesIcon, PortfolioIcon, ProcessIcon, ContactIcon } from "@/components/ui/icons";

const NAV = [
  { id: "about", label: "關於我們", Icon: AboutIcon },
  { id: "services", label: "服務項目", Icon: ServicesIcon },
  { id: "portfolio", label: "精選作品", Icon: PortfolioIcon },
  { id: "process", label: "設計流程", Icon: ProcessIcon },
  { id: "contact", label: "聯繫我們", Icon: ContactIcon },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min((y / docH) * 100, 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) { setActive(""); return; }
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-100 flex items-center justify-between px-6 transition-all duration-500 md:px-12 ${scrolled ? "bg-bg/90 py-3 backdrop-blur-xl border-b border-line" : "py-5"}`}>
        <Link href="/#hero" className="flex items-baseline gap-2.5" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-[3px] lowercase text-ink">wethink</span>
          <span className="font-chinese text-xs tracking-[4px] text-ink-soft font-light hidden sm:inline">維想室內裝修設計</span>
        </Link>

        {/* 桌機行內導覽 */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map(({ id, label, Icon }) => {
            const isActive = active === id;
            return (
              <Link key={id} href={`/#${id}`}
                className={`group relative inline-flex items-center gap-2 text-xs uppercase tracking-[2px] transition-colors ${isActive ? "text-ink" : "text-ink-soft hover:text-ink"}`}>
                <Icon className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:scale-110" />
                {label}
                <span className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
        </nav>

        {/* 漢堡鈕（行動版開啟） */}
        <button aria-label="開啟選單" aria-expanded={open} onClick={() => setOpen(true)} className="flex flex-col gap-1.5 p-2 lg:hidden">
          <span className="h-px w-6 bg-ink" />
          <span className="h-px w-6 bg-ink" />
          <span className="h-px w-6 bg-ink" />
        </button>

        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden bg-line/40">
          <span className="block h-full bg-gradient-to-r from-accent-dark to-accent-light transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
        </span>
      </header>

      {/* 行動版全螢幕選單：獨立於 header，避免 header 的 backdrop-filter 破壞 fixed 定位 */}
      <div
        className={`fixed inset-0 z-[120] flex flex-col items-center justify-center gap-8 bg-bg/98 backdrop-blur-2xl transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <button aria-label="關閉選單" onClick={() => setOpen(false)} className="absolute right-6 top-5 p-2 text-ink">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        {NAV.map(({ id, label, Icon }, i) => (
          <Link key={id} href={`/#${id}`} onClick={() => setOpen(false)}
            className="inline-flex items-center gap-3 text-base uppercase tracking-[3px] text-ink-soft transition-all duration-300 hover:text-ink"
            style={{ transitionDelay: open ? `${i * 50}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(8px)" }}>
            <Icon className="h-5 w-5 text-accent" />
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}
