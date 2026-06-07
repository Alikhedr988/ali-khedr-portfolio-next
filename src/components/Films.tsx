"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { films, ytThumb, type Film } from "@/lib/films";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";

// ── Film poster card ──────────────────────────────────────────────────────────

function FilmCard({ film, index }: { film: Film; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const poster  = film.poster ?? ytThumb(film.trailerId);

  // 3-D tilt
  const rawRotX = useMotionValue(0);
  const rawRotY = useMotionValue(0);
  const rotX = useSpring(rawRotX, { stiffness: 130, damping: 26 });
  const rotY = useSpring(rawRotY, { stiffness: 130, damping: 26 });

  // Cursor glow
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgb(201 149 69 / 0.12), transparent 65%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const c = cardRef.current;
    if (!c) return;
    const r  = c.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top)  / r.height;
    rawRotX.set((0.5 - ny) * 13);
    rawRotY.set((nx - 0.5) * 13);
    glowX.set(nx * 100);
    glowY.set(ny * 100);
  };
  const onMouseLeave = () => {
    rawRotX.set(0); rawRotY.set(0);
    glowX.set(50);  glowY.set(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.11, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <Link href={`/films/${film.slug}`}>
        {/* Outer: 3-D tilt — NO overflow-hidden so the tilt shows properly */}
        <motion.div
          ref={cardRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1100 }}
          className="group relative border border-cream/5 bg-ink-2 transition-colors duration-500 hover:border-ochre/25"
        >
          {/* Cursor-tracked glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glowBg }}
            aria-hidden
          />

          {/* Top edge accent line */}
          <div className="absolute inset-x-0 top-0 z-20 h-px w-0 bg-ochre transition-all duration-500 group-hover:w-full" />

          {/* ── POSTER — fills full card width, 2:3 aspect, no padding ── */}
          <div className="relative overflow-hidden bg-ink" style={{ aspectRatio: "2 / 3" }}>
            <Image
              src={poster}
              alt={`${film.title} — poster`}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.025]"
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(12,10,8,0.5)]" />
          </div>

          {/* ── META — below the poster ── */}
          <div className="relative z-10 flex items-start justify-between px-5 py-5 md:px-7 md:py-6">
            <div>
              <p className="mb-1.5 font-mono text-[10px] tracking-[0.3em] text-ochre">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3
                className="font-display font-light italic leading-tight text-cream transition-colors duration-300 group-hover:text-ochre"
                style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)" }}
              >
                {film.title}
              </h3>
              <p className="mt-1 font-mono text-[10px] tracking-widest text-cream/40">
                {film.roles.join(" · ")}
              </p>
            </div>
            <span className="shrink-0 pt-0.5 font-mono text-xs text-muted transition-colors duration-300 group-hover:text-ochre">
              {film.year}
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Films() {
  return (
    <section
      id="films"
      className="relative overflow-hidden border-t border-cream/5 px-6 py-24 md:px-12 md:py-32"
    >
      {/* Paper Design gradient — warm cinematic glow */}
      <GradientBackground />
      {/* Dark overlay so posters remain readable */}
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.p
          className="mb-16 font-mono text-[11px] tracking-[0.28em] text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          [ 00 ] FILMS
        </motion.p>

        {/* 2-column grid — no gap, no padding, posters flush edge-to-edge */}
        <div className="grid grid-cols-2">
          {films.map((film, i) => (
            <FilmCard key={film.slug} film={film} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
