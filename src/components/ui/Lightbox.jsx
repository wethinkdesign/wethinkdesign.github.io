"use client";
import { useEffect, useRef, useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const ZOOM = 2.2;

export default function Lightbox({ images, index, onClose, onPrev, onNext, onSelect, title }) {
  const stripRef = useRef(null);
  const [zoom, setZoom] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = "auto"; };
  }, [onClose, onPrev, onNext]);

  // 切換圖片時重置縮放並把縮圖捲到可視
  useEffect(() => {
    setZoom(false);
    setOffset({ x: 0, y: 0 });
    const active = stripRef.current?.querySelector('[data-active="true"]');
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y, moved: 0 };
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    drag.current.moved = Math.max(drag.current.moved, Math.hypot(dx, dy));
    if (zoom) setOffset({ x: drag.current.ox + dx, y: drag.current.oy + dy });
  };
  const onPointerUp = (e) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (d.moved < 10) {
      // 視為點擊：切換縮放
      setZoom((z) => { if (z) setOffset({ x: 0, y: 0 }); return !z; });
    } else if (!zoom && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx > 0 ? onPrev() : onNext();
    }
  };

  const img = images[index];
  return (
    <div className="fixed inset-0 z-200 flex flex-col bg-bg/98 backdrop-blur-xl" role="dialog" aria-modal="true">
      <div className="flex items-center justify-between px-6 py-4 text-xs uppercase tracking-[2px] text-ink-muted">
        <span>{title} · {index + 1} / {images.length}</span>
        <button onClick={onClose} className="hover:text-accent">✕ 關閉</button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 md:p-8">
        <button onClick={onPrev} aria-label="上一張" className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-card text-2xl shadow-md transition hover:bg-accent hover:text-white md:left-6">‹</button>

        <div
          className={`flex h-full w-full touch-none select-none items-center justify-center ${zoom ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom ? ZOOM : 1})`,
            transition: drag.current ? "none" : "transform 0.28s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <OptimizedImage key={img.key} imageKey={img.key} alt={`${title} - ${index + 1}`} sizes="90vw" priority
            className="pointer-events-none max-h-full max-w-full object-contain" />
        </div>

        <button onClick={onNext} aria-label="下一張" className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-card text-2xl shadow-md transition hover:bg-accent hover:text-white md:right-6">›</button>
      </div>

      <div ref={stripRef} className="flex gap-2 overflow-x-auto px-4 py-3 md:px-6 md:py-4">
        {images.map((im, i) => (
          <button
            key={im.key}
            data-active={i === index}
            onClick={() => onSelect(i)}
            aria-label={`第 ${i + 1} 張`}
            className={`relative aspect-4/3 h-14 flex-none overflow-hidden rounded-sm transition md:h-16 ${i === index ? "ring-2 ring-accent opacity-100" : "opacity-50 hover:opacity-90"}`}
          >
            <OptimizedImage imageKey={im.key} alt={`${title} 縮圖 ${i + 1}`} sizes="120px" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
