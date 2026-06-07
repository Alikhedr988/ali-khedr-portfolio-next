"use client";

import { motion } from "framer-motion";

const SHOWREEL_ID = "oUT55Mi2pZY";

export default function Showreel() {
  return (
    <section className="relative h-screen w-full overflow-hidden border-t border-cream/5">
      {/* Autoplaying background video — pointer-events-none so it doesn't block UI */}
      <div className="pointer-events-none absolute inset-0">
        <iframe
          src={`https://www.youtube.com/embed/${SHOWREEL_ID}?autoplay=1&mute=1&loop=1&playlist=${SHOWREEL_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "max(100vw, calc(100vh * 16 / 9))",
            height: "max(100vh, calc(100vw * 9 / 16))",
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Gradient fade into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto w-full max-w-7xl">
          <motion.p
            className="mb-4 font-mono text-[11px] tracking-[0.28em] text-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            SHOWREEL
          </motion.p>

          <motion.h2
            className="font-display font-light italic leading-none text-cream"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          >
            The Work
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
