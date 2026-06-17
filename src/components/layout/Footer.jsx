import Link from "next/link";
import { LocationIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";

const NAV = [
  { href: "/#about", label: "關於我們" },
  { href: "/#services", label: "服務項目" },
  { href: "/portfolio", label: "精選作品" },
  { href: "/#process", label: "設計流程" },
  { href: "/#contact", label: "聯繫我們" },
];

const SOCIAL = [
  { href: "https://www.instagram.com/wethink__design/", src: "/ig.svg", label: "Instagram" },
  { href: "https://line.me/R/ti/p/@323mtwdr?from=page&searchId=323mtwdr", src: "/line.svg", label: "LINE" },
  { href: "https://www.threads.com/@wethink__design?xmt=AQF0GLyDjonvQjMorESNv8P1_KL-zavrPtQ7sh6Uvf2lXYU", src: "/threads.svg", label: "Threads" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* 品牌 */}
          <div>
            <div className="mb-5 flex items-baseline gap-2.5">
              <span className="font-display text-3xl lowercase tracking-[3px] text-ink">wethink</span>
              <span className="font-chinese text-xs tracking-[3px] text-ink-soft">維想室內裝修設計</span>
            </div>
            <p className="max-w-[320px] text-sm font-light leading-[1.9] text-ink-soft">
              以人為本的空間設計，與你一起尋找家的溫度。合法立案、具裝修證照，提供住宅、商業與辦公空間的全程設計服務。
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center border border-line text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent">
                  <img src={s.src} alt={s.label} width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          {/* 導覽 */}
          <nav aria-label="頁尾導覽">
            <p className="mb-5 font-display text-xs uppercase tracking-[3px] text-accent">Sitemap</p>
            <ul className="flex flex-col gap-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sm font-light text-ink-soft transition-colors hover:text-ink">{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 聯絡 NAP */}
          <div>
            <p className="mb-5 font-display text-xs uppercase tracking-[3px] text-accent">Contact</p>
            <ul className="flex flex-col gap-4 text-sm font-light text-ink-soft">
              <li className="flex items-start gap-3">
                <LocationIcon className="mt-0.5 h-4 w-4 flex-none text-accent" />
                <span>新北市汐止區新台五路1段93號21樓之6</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 flex-none text-accent" />
                <a href="tel:+886983750668" className="transition-colors hover:text-ink">0983-750-668</a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="h-4 w-4 flex-none text-accent" />
                <a href="mailto:wethink.interiors@gmail.com" className="break-all transition-colors hover:text-ink">wethink.interiors@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-6 text-center">
          <p className="text-xs font-light text-ink-muted">© 2026 WeThink Design Studio 維想室內裝修設計工作室. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
