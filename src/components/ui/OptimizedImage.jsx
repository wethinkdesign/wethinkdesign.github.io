import manifest from "@/portfolio-manifest.json";

const srcset = (map) => Object.entries(map).map(([w, src]) => `${src} ${w}w`).join(", ");

export default function OptimizedImage({ imageKey, alt, sizes = "100vw", priority = false, className }) {
  const img = manifest.images[imageKey];
  if (!img) return null;
  const widths = Object.keys(img.webp).map(Number);
  const fallback = img.webp[Math.max(...widths)];
  return (
    <picture>
      <source type="image/avif" srcSet={srcset(img.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(img.webp)} sizes={sizes} />
      <img
        src={fallback}
        width={img.width}
        height={img.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={className}
        style={{ backgroundImage: `url(${img.blurDataURL})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
    </picture>
  );
}
