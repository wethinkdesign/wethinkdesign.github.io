export default function manifest() {
  return {
    name: "WeThink 維想室內裝修設計工作室",
    short_name: "WeThink 維想室內設計",
    description:
      "WeThink 維想室內裝修設計工作室，提供住宅設計、商業空間設計、辦公空間規劃。",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f5ef",
    theme_color: "#f8f5ef",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
