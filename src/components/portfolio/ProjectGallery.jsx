"use client";
import { useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import ImageReveal from "@/components/ui/ImageReveal";
import Lightbox from "@/components/ui/Lightbox";

export default function ProjectGallery({ images, title }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const total = images.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((img, i) => (
          <ImageReveal key={img.key} delay={(i % 3) * 0.06}>
            <button onClick={() => { setIndex(i); setOpen(true); }}
              className="group relative aspect-4/3 w-full overflow-hidden bg-bg-2">
              <OptimizedImage imageKey={img.key} alt={`${title} - ${i + 1}`}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </button>
          </ImageReveal>
        ))}
      </div>
      {open && <Lightbox images={images} index={index} title={title} onClose={() => setOpen(false)} onPrev={prev} onNext={next} onSelect={setIndex} />}
    </>
  );
}
