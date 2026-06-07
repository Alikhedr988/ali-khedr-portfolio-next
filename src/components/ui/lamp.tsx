"use client";

import React from "react";
import { motion } from "framer-motion";

// ── Lamp container ─────────────────────────────────────────────────────────────
// Adapted from 21st.dev — all cyan/blue replaced with portfolio ochre (#C99545)

export function LampContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden bg-ink ${className}`}
      style={{ minHeight: "28rem" }}
    >
      {/* ── Light cone ── */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate">
        {/* Left wing */}
        <motion.div
          initial={{ opacity: 0.4, width: "8rem" }}
          whileInView={{ opacity: 1, width: "26rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 70deg at center top, #C99545, transparent, transparent)",
          }}
          className="absolute inset-auto right-1/2 h-48 overflow-visible text-white"
        >
          {/* Mask: bottom fade */}
          <div className="absolute bottom-0 left-0 h-36 w-full bg-ink [mask-image:linear-gradient(to_top,white,transparent)]" />
          {/* Mask: left edge fade */}
          <div className="absolute bottom-0 left-0 h-full w-36 bg-ink [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right wing */}
        <motion.div
          initial={{ opacity: 0.4, width: "8rem" }}
          whileInView={{ opacity: 1, width: "26rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 290deg at center top, transparent, transparent, #C99545)",
          }}
          className="absolute inset-auto left-1/2 h-48 overflow-visible text-white"
        >
          <div className="absolute bottom-0 right-0 h-full w-36 bg-ink [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 h-36 w-full bg-ink [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Background fill to hide cone overflow */}
        <div className="absolute top-1/2 h-44 w-full translate-y-10 scale-x-150 bg-ink blur-2xl" />

        {/* Large ochre bloom — centre */}
        <div className="absolute inset-auto z-50 h-36 w-[24rem] -translate-y-1/2 rounded-full bg-[#C99545] opacity-20 blur-[80px]" />

        {/* Tight glow */}
        <motion.div
          initial={{ width: "4rem" }}
          whileInView={{ width: "12rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-28 -translate-y-24 rounded-full bg-[#C99545] blur-[60px] opacity-80"
        />

        {/* Glowing horizontal line */}
        <motion.div
          initial={{ width: "4rem", opacity: 0 }}
          whileInView={{ width: "24rem", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-px -translate-y-28 bg-[#C99545] shadow-[0_0_18px_2px_#C99545]"
        />

        {/* Top cover — hides the raw cone top */}
        <div className="absolute inset-auto z-40 h-40 w-full -translate-y-52 bg-ink" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-50 flex -translate-y-60 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}

// ── Ready-to-use Films lamp divider ───────────────────────────────────────────

export default function LampFilmsDivider() {
  return (
    <LampContainer>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-3 font-mono text-[11px] tracking-[0.35em] text-[#C99545]"
      >
        ALI ALSHEIKH
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.85, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="bg-gradient-to-b from-cream to-cream/60 bg-clip-text text-center font-display font-light italic text-transparent"
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1 }}
      >
        Films
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="mt-4 font-mono text-[10px] tracking-[0.3em] text-muted"
      >
        CINEMATOGRAPHER · DIRECTOR · EDITOR
      </motion.p>
    </LampContainer>
  );
}
