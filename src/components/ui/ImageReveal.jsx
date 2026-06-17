"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

/** 圖片進場：外層遮罩、內層由下往上滑入。
 * 用 useInView 觀察「外層容器」而非被位移的內層，避免內層被推出視窗而永不觸發。 */
export default function ImageReveal({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <div ref={ref} className={`overflow-hidden ${className || ""}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={inView ? { y: "0%" } : { y: "100%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
