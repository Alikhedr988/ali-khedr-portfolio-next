"use client";

import { motion } from "framer-motion";

export default function PageReveal() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[99999] flex items-center justify-center bg-ink"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.9 }}
    >
      <motion.p
        className="font-mono text-[11px] tracking-[0.45em] text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.85, times: [0, 0.15, 0.7, 1], delay: 0.05 }}
      >
        ALI ALSHEIKH
      </motion.p>
    </motion.div>
  );
}
