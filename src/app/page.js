"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import portfolioItems, {portfolioCategory} from "./portfolioData";



/* ── SVG Icons ── */
const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
    <img
        src="/wethink/ig.svg"
        width={size}
        height={size}
        alt="Instagram"
    />
)

const LineIcon = ({ size = 18 }) => (
    <img
        src="/wethink/line.svg"
        width={size}
        height={size}
        alt="LINE"
    />
)

const ThreadsIcon = ({ size = 18 }) => (
    <img
        src="/wethink/threads.svg"
        width={size}
        height={size}
        alt="Threads"
    />
)
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 4l-10 8L2 4" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.97.36 1.92.7 2.84a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.92.34 1.87.57 2.84.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/* ── Main Page Component ── */
const ImageWithPlaceholder = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`img-wrapper ${isLoaded ? "loaded" : "loading"}`}>
      <div className="skeleton-loader" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={isLoaded ? "visible" : "hidden"}
      />
    </div>
  );
};

/* ── Counter Component for Stats ── */
const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <span ref={countRef}>
      {count}{suffix}
    </span>
  );
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(portfolioCategory.All);
  const [lightbox, setLightbox] = useState({ active: false, projectIndex: 0, imageIndex: 0 });

  /* Scroll listener for header */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Intersection observer for fade-in */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredPortfolio =
    activeFilter === portfolioCategory.All
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === activeFilter);

  /* Lightbox helpers */
  const currentProject = filteredPortfolio[lightbox.projectIndex];
  const currentImages = currentProject?.images || [];

  const openLightbox = (projectIdx) =>
    setLightbox({ active: true, projectIndex: projectIdx, imageIndex: 0 });
  const closeLightbox = () =>
    setLightbox({ active: false, projectIndex: 0, imageIndex: 0 });

  const prevImage = useCallback(() => {
    setLightbox((s) => {
      const project = filteredPortfolio[s.projectIndex];
      const total = project?.images?.length || 1;
      return { ...s, imageIndex: (s.imageIndex - 1 + total) % total };
    });
  }, [filteredPortfolio]);

  const nextImage = useCallback(() => {
    setLightbox((s) => {
      const project = filteredPortfolio[s.projectIndex];
      const total = project?.images?.length || 1;
      return { ...s, imageIndex: (s.imageIndex + 1) % total };
    });
  }, [filteredPortfolio]);

  /* Keyboard navigation for lightbox */
  useEffect(() => {
    if (!lightbox.active) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.active, prevImage, nextImage]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ══════ HEADER ══════ */}
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <a href="#" className="header-logo" onClick={(e) => handleNavClick(e, "hero")}>
          <span className="header-logo-en">WETHINK</span>
          <span className="header-logo-zh">維想室內裝修設計</span>
        </a>

        <nav className={`header-nav${mobileMenuOpen ? " open" : ""}`}>
          <a href="#about" onClick={(e) => handleNavClick(e, "about")}>關於我們</a>
          <a href="#services" onClick={(e) => handleNavClick(e, "services")}>服務項目</a>
          <a href="#portfolio" onClick={(e) => handleNavClick(e, "portfolio")}>作品集</a>
          <a href="#process" onClick={(e) => handleNavClick(e, "process")}>設計流程</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>聯繫我們</a>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* ══════ HERO ══════ */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            alt="Interior design hero"
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-subtitle">Wethink Design Studio</p>
          <h1 className="hero-title">
            空間，<br />
            是生活的<em>延伸</em>
          </h1>
          <p className="hero-desc">
            與你一起尋找家的溫度。 我們相信好的設計源自於對生活的深刻理解，每個空間都值得被用心對待。
          </p>
          <a href="#portfolio" className="hero-cta" onClick={(e) => handleNavClick(e, "portfolio")}>
            探索作品 <ArrowIcon />
          </a>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ══════ ABOUT ══════ */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-inner fade-section">
            <div className="about-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
                alt="WeThink studio"
              />
            </div>
            <div className="about-text">
              <p className="section-label">About Us</p>
              <h2 className="section-title">
                以人為本，<br />用心雕琢每一處細節
              </h2>
              <p className="section-desc">
                WeThink 維想室內裝修設計工作室成立於 2024 年，合法立案、具裝修證照。
                我們的設計哲學以「人」為核心 —— 深入了解每位屋主的生活習慣、美學偏好與未來需求，
                打造出不僅美觀、更兼具實用與舒適的生活空間。
                <br />
                <br />
                從概念發想到施工落地，我們全程參與每個環節，確保設計的完整性與品質。
              </p>
              <div className="about-stats">
                <div>
                  <div className="about-stat-number">
                    <Counter end={150} suffix="+" />
                  </div>
                  <div className="about-stat-label">完成案例</div>
                </div>
                <div>
                  <div className="about-stat-number">
                    <Counter end={8} suffix="+" />
                  </div>
                  <div className="about-stat-label">年設計經驗</div>
                </div>
                <div>
                  <div className="about-stat-number">
                    <Counter end={99} suffix="%" />
                  </div>
                  <div className="about-stat-label">客戶滿意度</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ SERVICES ══════ */}
      <section className="services" id="services">
        <div className="container">
          <div className="services-header fade-section">
            <p className="section-label">Services</p>
            <h2 className="section-title">我們的服務</h2>
            <p className="section-desc">
              從空間規劃到軟裝搭配，提供全方位的設計服務，為您量身定制理想空間。
            </p>
          </div>
          <div className="services-grid fade-section">
            <div className="service-card">
              <div className="service-icon">⬡</div>
              <h3>住宅空間設計</h3>
              <p>
                針對不同坪數與格局，規劃符合居住者生活習慣的空間配置。從新成屋、中古屋到老屋翻新，打造您的夢想居所。
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">◈</div>
              <h3>商業空間設計</h3>
              <p>
                為餐飲、零售、美容等商業空間提供品牌導向的設計規劃，結合商業策略與美學表達，提升空間價值與品牌形象。
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">▣</div>
              <h3>辦公空間規劃</h3>
              <p>
                以人性化的工作環境為出發點，規劃高效能且舒適的辦公空間，提升團隊工作效率與企業形象。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ PORTFOLIO ══════ */}
      <section className="portfolio" id="portfolio">
        <div className="container">
          <div className="portfolio-header fade-section">
            <div>
              <p className="section-label">Portfolio</p>
              <h2 className="section-title">精選作品</h2>
            </div>
            <div className="portfolio-filters">
              {[
                { key: portfolioCategory.All, label: "全部" },
                { key: portfolioCategory.Residential, label: "住宅" },
                { key: portfolioCategory.Commercial, label: "商業" },
                { key: portfolioCategory.Office, label: "辦公" },
              ].map((f) => (
                <button
                  key={f.key}
                  className={`portfolio-filter${activeFilter === f.key ? " active" : ""}`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="portfolio-grid fade-section">
            {filteredPortfolio.map((item, idx) => (
              <div
                key={item.title}
                className="portfolio-item"
                onClick={() => openLightbox(idx)}
                style={{ aspectRatio: "1/1" }}
              >
                <ImageWithPlaceholder src={item.images[0]} alt={item.title} />
                <div className="portfolio-item-overlay">
                  <h3>{item.title}</h3>
                  <span>{item.subtitle}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="portfolio-more fade-section">
            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
              洽詢更多作品 <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section className="process" id="process">
        <div className="container">
          <div className="process-header fade-section">
            <p className="section-label">Process</p>
            <h2 className="section-title">設計流程</h2>
            <p className="section-desc">
              清晰透明的設計流程，讓每一步都安心放心。
            </p>
          </div>
          <div className="process-steps fade-section">
            {[
              {
                num: "01",
                title: "初步設計諮詢",
                desc: "提供相關 CAD 或現場照，溝通需求、喜好與風格，由設計師提供專業建議、可能預算並介紹服務流程。",
              },
              {
                num: "02",
                title: "現場實地丈量",
                desc: "收取丈量費後進行實地丈量，並依據需求提供平面配置圖 PDF 檔以及初步報價單。",
              },
              {
                num: "03",
                title: "規劃討論及工程預算",
                desc: "針對平面配置圖及初步報價進行討論與細節確認。",
              },
              {
                num: "04",
                title: "簽約付款",
                desc: "簽訂正式合約，後續依工程時序表及施工圖進行施工，並配合階段性驗收與收款。",
              },
              {
                num: "05",
                title: "模擬圖討論",
                desc: "根據確定的平面圖與風格繪製 3D 模擬圖，並依據前期溝通需求進行討論與定稿。",
              },
              {
                num: "06",
                title: "施工圖確認",
                desc: "製作符合客戶家況的完整施工圖，確認後將以此內容作為後續現場施作的依據。",
              },
              {
                num: "07",
                title: "施工現場服務",
                desc: "開工後由設計師按工程進度表進行監督，並與各工種師傅確認裝修設計細節。",
              },
              {
                num: "08",
                title: "完工",
                desc: "與客戶進行完工驗收，並安排作品拍攝存檔。",
              }
            ].map((step) => (
              <div key={step.num} className="process-step">
                <div className="process-step-number">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CONTACT ══════ */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-inner fade-section">
            <div className="contact-info">
              <p className="section-label">Contact</p>
              <h2 className="section-title">開始您的設計旅程</h2>
              <p className="section-desc">
                歡迎與我們聯繫，讓我們一起為您的空間注入靈魂。無論是新屋裝修或舊屋改造，我們都樂意為您提供專業諮詢。
              </p>

              <div className="contact-details">
                <div className="contact-detail">
                  <div className="contact-detail-header">
                    <div className="contact-detail-icon">
                      <LocationIcon />
                    </div>
                    <h4>地址</h4>
                  </div>
                  <p>新北市汐止區</p>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-header">
                    <div className="contact-detail-icon">
                      <MailIcon />
                    </div>
                    <h4>電子郵件</h4>
                  </div>
                  <p>hello@wethink-design.com</p>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-header">
                    <div className="contact-detail-icon">
                      <PhoneIcon />
                    </div>
                    <h4>電話</h4>
                  </div>
                  <p>02-1234-5678</p>
                </div>
              </div>

              <div className="contact-social">
                <a
                  href="https://www.instagram.com/wethink__design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://line.me/R/ti/p/@323mtwdr?from=page&searchId=323mtwdr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LINE"
                >
                  <LineIcon />
                </a>
                <a
                    href="https://www.threads.com/@wethink__design?xmt=AQF0GLyDjonvQjMorESNv8P1_KL-zavrPtQ7sh6Uvf2lXYU"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Threads"
                >
                  <ThreadsIcon />
                </a>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-brand-en">wethink</span>
            <span className="footer-brand-zh">維想設計</span>
          </div>
          <p className="footer-copy">© 2024 WeThink 維想室內設計工作室. All rights reserved.</p>
        </div>
      </footer>

      {/* ══════ LIGHTBOX ══════ */}
      {lightbox.active && currentProject && (
        <div className={`lightbox${lightbox.active ? " active" : ""}`} onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            ✕
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <ImageWithPlaceholder
              src={currentImages[lightbox.imageIndex]}
              alt={`${currentProject.title} - ${lightbox.imageIndex + 1}`}
            />
            <div className="lightbox-info">
              <div className="lightbox-info-text">
                <h3>{currentProject.title}</h3>
                <span>{currentProject.subtitle}</span>
              </div>
              <div className="lightbox-counter">
                {lightbox.imageIndex + 1} / {currentImages.length}
              </div>
            </div>
            {currentImages.length > 1 && (
              <div className="lightbox-dots">
                {currentImages.map((_, i) => (
                  <button
                    key={i}
                    className={`lightbox-dot${i === lightbox.imageIndex ? " active" : ""}`}
                    onClick={() => setLightbox((s) => ({ ...s, imageIndex: i }))}
                    aria-label={`查看第 ${i + 1} 張圖片`}
                  />
                ))}
              </div>
            )}
          </div>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
