import { Cormorant_Garamond, Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const notoMobile = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-chinese",
  display: "swap",
});

const SITE_URL = "https://wethinkdesign.github.io";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "WeThink 維想室內裝修設計工作室",
  title: {
    default: "WeThink 維想室內裝修設計工作室 | 台北室內設計 | 住宅・商業・辦公空間設計",
    template: "%s | WeThink 維想室內裝修設計",
  },
  description:
    "WeThink 維想室內裝修設計工作室，位於新北汐止，提供住宅設計、商業空間設計、辦公空間規劃，以人為本打造有溫度的生活場域。合法立案、具裝修證照，超過 150 個成功案例、10 年以上設計經驗。",
  keywords: [
    "室內設計", "室內裝修", "interior design", "維想", "WeThink",
    "空間設計", "住宅設計", "商業空間設計", "辦公空間設計",
    "台北室內設計", "新北室內設計", "汐止室內設計",
    "新成屋設計", "中古屋翻新", "老屋翻新", "裝潢設計",
    "室內設計工作室", "空間規劃", "居家設計",
  ],
  authors: [{ name: "WeThink 維想室內裝修設計工作室" }],
  creator: "WeThink Design Studio",
  publisher: "WeThink 維想室內裝修設計工作室",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-48x48.png"],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "WeThink 維想室內裝修設計工作室 | 以人為本的空間設計",
    description:
      "以人為本的空間設計，打造有溫度的生活場域。提供住宅設計、商業空間、辦公空間規劃服務。合法立案、超過 150 個成功案例。",
    url: SITE_URL,
    siteName: "WeThink 維想室內裝修設計工作室",
    images: [
      {
        url: "/cover.jpg",
        width: 1200,
        height: 630,
        alt: "WeThink 維想室內裝修設計工作室 — 精選室內設計作品",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeThink 維想室內裝修設計工作室",
    description: "以人為本的空間設計，打造有溫度的生活場域。住宅・商業・辦公空間設計。",
    images: ["/cover.jpg"],
  },
};

export default function RootLayout({ children }) {
  /* ── JSON-LD Structured Data ── */

  // 1. LocalBusiness — 主要商家資訊
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: "WeThink 維想室內裝修設計工作室",
    alternateName: "Wethink Design Studio",
    image: `${SITE_URL}/cover.jpg`,
    logo: `${SITE_URL}/icon-512.png`,
    description:
      "WeThink 維想室內裝修設計工作室，以人為本的空間設計，打造有溫度的生活場域。提供住宅設計、商業空間、辦公空間規劃服務。合法立案、具裝修證照。",
    url: SITE_URL,
    telephone: "+886-983-750-668",
    email: "wethink.interiors@gmail.com",
    foundingDate: "2024",
    priceRange: "$$",
    currenciesAccepted: "TWD",
    paymentAccepted: "Cash, Bank Transfer",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 25.063,
        longitude: 121.648,
      },
      geoRadius: "50000",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "新台五路1段93號21樓之6",
      addressLocality: "汐止區",
      addressRegion: "新北市",
      postalCode: "221",
      addressCountry: "TW",
    },
    sameAs: [
      "https://www.instagram.com/wethink__design/",
      "https://line.me/R/ti/p/@323mtwdr?from=page&searchId=323mtwdr",
      "https://www.threads.com/@wethink__design",
    ],
  };

  // 2. WebSite — 搜尋引擎品牌辨識
  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "WeThink 維想室內裝修設計工作室",
    alternateName: "Wethink Design Studio",
    url: SITE_URL,
    inLanguage: "zh-Hant-TW",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  // 3. WebPage — 目前頁面
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "WeThink 維想室內裝修設計工作室 | 台北室內設計",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    description:
      "WeThink 維想室內裝修設計工作室，提供住宅設計、商業空間設計、辦公空間規劃服務。",
    inLanguage: "zh-Hant-TW",
    datePublished: "2024-01-01",
    dateModified: "2026-03-01",
  };

  // 4. BreadcrumbList — 麵包屑導覽
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首頁",
        item: SITE_URL,
      },
    ],
  };

  // 5. Service — 三項主要服務
  const services = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#services`,
    name: "室內設計服務項目",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "住宅空間設計",
          description:
            "針對不同坪數與格局，規劃符合居住者生活習慣的空間配置。從新成屋、中古屋到老屋翻新，打造您的夢想居所。",
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: "台灣",
          serviceType: "住宅室內設計",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "商業空間設計",
          description:
            "為餐飲、零售、美容等商業空間提供品牌導向的設計規劃，結合商業策略與美學表達，提升空間價值與品牌形象。",
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: "台灣",
          serviceType: "商業室內設計",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "辦公空間規劃",
          description:
            "以人性化的工作環境為出發點，規劃高效能且舒適的辦公空間，提升團隊工作效率與企業形象。",
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: "台灣",
          serviceType: "辦公室內設計",
        },
      },
    ],
  };

  // 6. ImageGallery — 作品集
  const imageGallery = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${SITE_URL}/#portfolio`,
    name: "WeThink 維想室內裝修設計 — 精選作品集",
    description: "WeThink 維想室內裝修設計工作室精選室內設計作品，包含住宅、商業及辦公空間設計案例。",
    url: `${SITE_URL}/#portfolio`,
    creator: { "@id": `${SITE_URL}/#organization` },
    image: [
      {
        "@type": "ImageObject",
        name: "自由之丘 — C宅",
        contentUrl: `${SITE_URL}/portfolio/1/01.jpeg`,
        description: "自由之丘 C宅 — 住宅空間設計案例",
      },
      {
        "@type": "ImageObject",
        name: "國賓大苑 — K宅",
        contentUrl: `${SITE_URL}/portfolio/2/01.jpeg`,
        description: "國賓大苑 K宅 — 商業空間設計案例",
      },
      {
        "@type": "ImageObject",
        name: "智匯學 — L宅",
        contentUrl: `${SITE_URL}/portfolio/3/01.jpeg`,
        description: "智匯學 L宅 — 住宅空間設計案例",
      },
      {
        "@type": "ImageObject",
        name: "中北大 — W宅",
        contentUrl: `${SITE_URL}/portfolio/4/01.jpeg`,
        description: "中北大 W宅 — 辦公空間設計案例",
      },
    ],
  };

  // 7. FAQPage — 設計流程常見問題
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "室內設計的流程是什麼？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "我們的設計流程包含八個階段：初步設計諮詢、現場實地丈量、規劃討論及工程預算、簽約付款、模擬圖討論、施工圖確認、施工現場服務、完工驗收。每一步都清晰透明，讓您安心放心。",
        },
      },
      {
        "@type": "Question",
        name: "WeThink 維想室內設計提供哪些服務？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "我們提供住宅空間設計（新成屋、中古屋、老屋翻新）、商業空間設計（餐飲、零售、美容等）、以及辦公空間規劃，為您量身定制理想空間。",
        },
      },
      {
        "@type": "Question",
        name: "如何聯繫 WeThink 維想室內設計？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "您可以透過電話 0983-750-668、Email wethink.interiors@gmail.com，或至我們的 Instagram @wethink__design 與 LINE 官方帳號聯繫我們。地址：新北市汐止區新台五路1段93號21樓之6。",
        },
      },
    ],
  };

  const allJsonLd = [
    localBusiness,
    webSite,
    webPage,
    breadcrumb,
    services,
    imageGallery,
    faqPage,
  ];

  return (
    <html lang="zh-Hant" className={`${cormorant.variable} ${inter.variable} ${notoMobile.variable}`}>
      <head>
        {allJsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
