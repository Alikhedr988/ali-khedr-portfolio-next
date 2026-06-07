"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Dot snaps fast
  const dotX = useSpring(mx, { stiffness: 700, damping: 40 });
  const dotY = useSpring(my, { stiffness: 700, damping: 40 });

  // Ring lags behind
  const ringX = useSpring(mx, { stiffness: 90, damping: 22 });
  const ringY = useSpring(my, { stiffness: 90, damping: 22 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  return (
    <>
      {/* Trailing ring — white so it shows on both dark and light sections */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      {/* Sharp dot — ochre with white outline so it reads on any background */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ochre"
        style={{
          x: dotX,
          y: dotY,
          boxShadow: "0 0 0 1.5px rgba(255,255,255,0.55)",
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.2 } }}
      />
    </>
  );
}
