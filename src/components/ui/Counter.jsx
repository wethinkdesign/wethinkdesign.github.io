"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "motion/react";

/** 數字累加動效：進入視窗後由 0 緩動累加到目標值（easeOutCubic）。
 * 單一數字渲染，無堆疊裁切，避免字體 old-style 數字造成的殘影問題。 */
export default function Counter({ end, suffix = "", duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return <span ref={ref} className="tabular-nums">{n}{suffix}</span>;
}
