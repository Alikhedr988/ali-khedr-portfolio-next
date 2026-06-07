"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
};
const line = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring physics — different stiffness per layer to sell depth
  const slowX = useSpring(mx, { stiffness: 30, damping: 18 });
  const slowY = useSpring(my, { stiffness: 30, damping: 18 });
  const midX  = useSpring(mx, { stiffness: 50, damping: 20 });
  const midY  = useSpring(my, { stiffness: 50, damping: 20 });
  const fastX = useSpring(mx, { stiffness: 80, damping: 22 });
  const fastY = useSpring(my, { stiffness: 80, damping: 22 });

  // Layer translations
  const blobTx  = useTransform(slowX, [-1, 1], [-28, 28]);
  const blobTy  = useTransform(slowY, [-1, 1], [-28, 28]);
  const shapeTx = useTransform(midX,  [-1, 1], [-52, 52]);
  const shapeTy = useTransform(midY,  [-1, 1], [-52, 52]);
  const fgTx    = useTransform(fastX, [-1, 1],  [20, -20]);  // moves opposite
  const fgTy    = useTransform(fastY, [-1, 1],  [20, -20]);

  // 3-D tilt on the text block itself
  const rotX = useTransform(midY, [-1, 1], [9, -9]);
  const rotY = useTransform(midX, [-1, 1], [-13, 13]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    },
    [mx, my]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", onMouseMove);
    return () => el.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* ── Paper Design gradient — warm cinematic glow ── */}
      <GradientBackground />
      {/* ── Dark overlay so Ali's name stays readable ── */}
      <div className="absolute inset-0 -z-10 bg-black/60" />

      {/* ── Layer 0: atmospheric blobs (deepest / slowest) ── */}
      <motion.div
        style={{ x: blobTx, y: blobTy }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute right-[-8%] top-[-20%] h-[720px] w-[720px] rounded-full bg-ochre opacity-[0.045] blur-[140px]" />
        <div className="absolute bottom-[0%] left-[-18%] h-[560px] w-[640px] rounded-full bg-teal opacity-[0.05] blur-[110px]" />
      </motion.div>

      {/* ── Layer 1: geometric accents (mid depth) ── */}
      <motion.div
        style={{ x: shapeTx, y: shapeTy }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        {/* Vertical rules */}
        <div className="absolute right-[13%] top-[16%] h-56 w-px bg-gradient-to-b from-transparent via-ochre/30 to-transparent" />
        <div className="absolute right-[16%] top-[24%] h-28 w-px bg-gradient-to-b from-transparent via-ochre/15 to-transparent" />
        {/* Horizontal rules */}
        <div className="absolute bottom-[26%] left-[5%] h-px w-44 bg-gradient-to-r from-transparent via-teal/25 to-transparent" />
        <div className="absolute top-[42%] left-[2%]  h-px w-20 bg-gradient-to-r from-transparent via-cream/10 to-transparent" />
        {/* Small square frame */}
        <div className="absolute right-[10%] bottom-[20%] h-14 w-14 border border-ochre/12" />
      </motion.div>

      {/* ── Main content — 3-D tilted text block ── */}
      <div className="relative flex min-h-screen items-center px-6 pt-20 md:px-12">
        <motion.div
          style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1400 }}
          className="mx-auto w-full max-w-7xl"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="max-w-5xl"
          >
            <motion.p
              variants={line}
              className="mb-10 font-mono text-[11px] tracking-[0.28em] text-muted"
            >
              JOURNALIST · PHOTOGRAPHER · FILMMAKER · MUSICIAN
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                variants={line}
                className="font-display font-light italic leading-[0.88] tracking-tight text-cream"
                style={{ fontSize: "clamp(5rem, 14vw, 12rem)" }}
              >
                Ali
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={line}
                className="font-display font-semibold leading-[0.88] tracking-tight text-ochre"
                style={{ fontSize: "clamp(5rem, 14vw, 12rem)" }}
              >
                AlSheikh
              </motion.h1>
            </div>

            <motion.p
              variants={line}
              className="mt-8 max-w-md font-display font-light leading-relaxed text-cream-2 md:mt-10 md:text-lg"
            >
              An independent Syrian storyteller
              <br className="hidden md:block" />
              based in Beirut.
            </motion.p>

            <motion.div
              variants={line}
              className="mt-10 flex items-center gap-8 md:mt-12"
            >
              <motion.a
                href="#work"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="group flex items-center gap-3 border border-cream/20 px-6 py-3 font-mono text-xs tracking-widest text-cream transition-colors duration-300 hover:border-ochre hover:text-ochre"
              >
                SEE THE WORK
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  ↗
                </span>
              </motion.a>
              <a
                href="#contact"
                className="font-mono text-xs tracking-widest text-muted transition-colors duration-200 hover:text-cream"
              >
                GET IN TOUCH
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Layer 2: foreground dot grids (moves opposite = closest) ── */}
      <motion.div
        style={{ x: fgTx, y: fgTy }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div
          className="absolute bottom-[12%] right-[7%] h-32 w-32 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(107 96 88 / 0.7) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />
        <div
          className="absolute top-[28%] left-[4%] h-20 w-20 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(107 96 88 / 0.7) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-10 right-6 flex flex-col items-center gap-3 md:right-12"
        aria-hidden
      >
        <motion.div
          animate={{ scaleY: [1, 0.25, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="h-12 w-px origin-top bg-muted"
        />
        <span className="font-mono text-[9px] tracking-[0.3em] text-muted">
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
