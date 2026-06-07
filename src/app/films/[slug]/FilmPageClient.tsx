"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { films as allFilms, type Film } from "@/lib/films";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

function gallerySpan(i: number) {
  const pattern = [2, 1, 1, 2, 1, 1];
  return pattern[i % pattern.length];
}

export default function FilmPageClient({ film }: { film: Film }) {
  const thumb = `https://img.youtube.com/vi/${film.trailerId}/maxresdefault.jpg`;

  return (
    <>
      {/* ── Curtain reveal ───────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[99999] bg-ink"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        aria-hidden
      />

      {/* ── Back nav ─────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
      >
        <Link
          href="/#films"
          className="font-mono text-[11px] tracking-[0.28em] text-cream/50 transition-colors hover:text-ochre"
        >
          ← FILMS
        </Link>
        <Link
          href="/"
          className="font-display italic text-cream/70 text-sm transition-colors hover:text-ochre"
        >
          Ali AlSheikh
        </Link>
      </motion.nav>

      {/* ── Hero — static thumbnail background + film title ──────────── */}
      <section className="relative h-[75vh] min-h-[500px] w-full overflow-hidden bg-ink">
        {/* YouTube thumbnail as static background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />

        {/* Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(12,10,8,0.88)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />

        {/* Film title */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          className="absolute bottom-16 left-6 md:left-12"
        >
          <h1
            className="font-display font-light italic leading-none text-cream"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            {film.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 md:gap-6">
            {film.roles.map((role) => (
              <span key={role} className="font-mono text-[11px] tracking-[0.25em] text-ochre">
                {role}
              </span>
            ))}
            <span className="font-mono text-[11px] tracking-[0.25em] text-cream/30">
              {film.year}
            </span>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-16 right-6 flex flex-col items-center gap-3 md:right-12"
          aria-hidden
        >
          <motion.div
            animate={{ scaleY: [1, 0.25, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="h-10 w-px origin-top bg-muted"
          />
          <span className="font-mono text-[9px] tracking-[0.3em] text-muted">SCROLL</span>
        </motion.div>
      </section>

      {/* ── Description ──────────────────────────────────────────────── */}
      <section className="bg-ink px-6 pt-16 md:px-12 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <motion.p
            className="max-w-2xl font-display font-light leading-relaxed text-cream-2 md:text-lg"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {film.description}
          </motion.p>
        </div>
      </section>

      {/* ── Video player — full controls, no mute ────────────────────── */}
      <section className="bg-ink px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.p
            className="mb-8 font-mono text-[11px] tracking-[0.28em] text-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            WATCH
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <VideoEmbed youtubeId={film.trailerId} title={film.title} muted={false} showControls={true} />
          </motion.div>
        </div>
      </section>

      {/* ── Stills gallery ────────────────────────────────────────────── */}
      {film.stills.length > 0 && (
        <section className="bg-ink px-6 py-20 md:px-12 md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.p
              className="mb-12 font-mono text-[11px] tracking-[0.28em] text-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              STILLS
            </motion.p>

            <div className="grid grid-cols-2 gap-2">
              {film.stills.map((src, i) => {
                const span = gallerySpan(i);
                const isWide = span === 2;
                return (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: (i % 3) * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className={`relative overflow-hidden ${isWide ? "col-span-2" : "col-span-1"}`}
                    style={{ aspectRatio: isWide ? "16 / 7" : "4 / 3" }}
                  >
                    <Image
                      src={src}
                      alt={`${film.title} — still ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                      sizes={isWide ? "100vw" : "(max-width: 768px) 50vw, 600px"}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Credits ───────────────────────────────────────────────────── */}
      <section className="bg-ink px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl border-t border-cream/5 pt-16">
          <motion.p
            className="mb-10 font-mono text-[11px] tracking-[0.28em] text-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            CREDITS
          </motion.p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {film.roles.map((role, i) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <p className="mb-1 font-mono text-[10px] tracking-widest text-muted">
                  {role.toUpperCase()}
                </p>
                <p className="font-display font-light text-cream">Ali AlSheikh</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer nav ───────────────────────────────────────────────── */}
      <div className="bg-ink border-t border-cream/5 px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/#films"
            className="font-mono text-[11px] tracking-widest text-muted transition-colors hover:text-cream"
          >
            ← ALL FILMS
          </Link>
          {(() => {
            const idx = allFilms.findIndex((f) => f.slug === film.slug);
            const next = allFilms[(idx + 1) % allFilms.length];
            return (
              <Link
                href={`/films/${next.slug}`}
                className="group flex items-center gap-3 font-mono text-[11px] tracking-widest text-muted transition-colors hover:text-ochre"
              >
                NEXT: {next.title.toUpperCase()}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            );
          })()}
        </div>
      </div>
    </>
  );
}
