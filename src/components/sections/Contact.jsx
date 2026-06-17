import Reveal from "@/components/ui/Reveal";
import { LocationIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";

const DETAILS = [
  { Icon: LocationIcon, label: "地址", value: "新北市汐止區新台五路1段93號21樓之6" },
  { Icon: MailIcon, label: "電子郵件", value: "wethink.interiors@gmail.com" },
  { Icon: PhoneIcon, label: "電話", value: "0983-750-668" },
];

const SOCIAL = [
  { href: "https://www.instagram.com/wethink__design/", src: "/ig.svg", label: "Instagram" },
  { href: "https://line.me/R/ti/p/@323mtwdr?from=page&searchId=323mtwdr", src: "/line.svg", label: "LINE" },
  { href: "https://www.threads.com/@wethink__design?xmt=AQF0GLyDjonvQjMorESNv8P1_KL-zavrPtQ7sh6Uvf2lXYU", src: "/threads.svg", label: "Threads" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-24">
      <div className="mx-auto max-w-[800px] px-6 text-center md:px-12">
        <Reveal>
          <p className="mb-4 font-display text-sm uppercase tracking-[4px] text-accent">Contact</p>
          <h2 className="mb-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-ink">開始您的設計旅程</h2>
          <p className="mx-auto mb-12 max-w-[560px] font-light leading-[1.8] text-ink-soft">
            歡迎與我們聯繫，讓我們一起為您的空間注入靈魂。無論是新屋裝修或舊屋改造，我們都樂意為您提供專業諮詢。
          </p>
          <div className="mb-16 grid gap-4 md:grid-cols-3">
            {DETAILS.map(({ Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-4 border border-transparent bg-card p-10 transition-all duration-300 hover:-translate-y-1 hover:border-line">
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 text-accent"><Icon className="h-full w-full" /></span>
                  <h4 className="text-xs uppercase tracking-[2px] text-ink-muted">{label}</h4>
                </div>
                <p className="text-sm font-light text-ink-soft break-words">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="flex h-12 w-12 items-center justify-center border border-line text-ink-soft transition-all duration-300 hover:border-accent">
                <img src={s.src} alt={s.label} width={18} height={18} />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
