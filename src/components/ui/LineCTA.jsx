export default function LineCTA() {
  return (
    <div className="fixed bottom-6 left-6 z-90 animate-[linebob_3s_ease-in-out_infinite]">
      <a
        href="https://line.me/R/ti/p/@323mtwdr?from=page&searchId=323mtwdr"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="加 LINE 諮詢"
        className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-4 py-3 text-white shadow-lg transition-transform duration-300 hover:scale-105 sm:px-5"
      >
        <img src="/line-glyph.svg" alt="" className="h-6 w-6" />
        <span className="hidden text-sm font-bold tracking-wide text-white sm:inline">LINE 諮詢</span>
      </a>
    </div>
  );
}
