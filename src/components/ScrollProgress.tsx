"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-5 top-0 bottom-0 z-40 w-px bg-cream/5 md:right-7"
    >
      <motion.div
        className="h-full w-full origin-top bg-ochre/50"
        style={{ scaleY }}
      />
    </div>
  );
}
