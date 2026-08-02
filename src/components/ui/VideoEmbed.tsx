"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function VideoEmbed({
  youtubeId,
  title,
  muted = false,
  showControls = true,
}: {
  youtubeId: string;
  title: string;
  muted?: boolean;
  showControls?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  const paramParts = [
    "autoplay=1",
    "rel=0",
    "modestbranding=1",
    muted ? "mute=1" : null,
    showControls ? null : "controls=0",
  ].filter(Boolean).join("&");
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?${paramParts}`;

  return (
    <div className="relative w-full overflow-hidden bg-ink" style={{ aspectRatio: "16 / 9" }}>
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.iframe
            key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            src={src}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* YouTube thumbnail — fetched directly by browser, not proxied */}
            <Image
              src={thumb}
              alt={`${title} thumbnail`}
              fill
              className="object-cover"
              priority
              unoptimized
            />

            <motion.button
              key="overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 flex w-full items-center justify-center"
              aria-label={`Play ${title}`}
            >
              <div className="absolute inset-0 bg-black/45 transition-opacity duration-300 group-hover:bg-black/30" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(12,10,8,0.55)_100%)]" />

              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} className="relative z-10">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cream/30 bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:border-ochre group-hover:bg-ochre/20">
                  <div className="ml-1 border-y-[11px] border-l-[18px] border-y-transparent border-l-cream transition-colors duration-300 group-hover:border-l-ochre" />
                </div>
              </motion.div>

              <div className="absolute bottom-6 left-6 text-left md:bottom-8 md:left-8">
                <p className="font-display font-light italic text-cream/80 text-lg">{title}</p>
                <p className="mt-1 font-mono text-[10px] tracking-widest text-cream/40">CLICK TO PLAY</p>
              </div>

              <div className="absolute right-6 top-6 flex gap-1.5 md:right-8 md:top-8">
                <div className="h-px w-8 bg-cream/20" />
                <div className="h-px w-3 bg-ochre/40" />
              </div>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
