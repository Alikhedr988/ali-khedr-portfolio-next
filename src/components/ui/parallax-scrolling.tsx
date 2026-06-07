"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ParallaxLayer {
  src: string;
  alt: string;
  href?: string;
  speed: number;   // 0 = static, 1 = full scroll speed, 0.3 = slow
  label?: string;
  sublabel?: string;
}

interface Props {
  layers: ParallaxLayer[];
  /** Height of each band — default "70vh" */
  bandHeight?: string;
}

// ── Individual band ───────────────────────────────────────────────────────────

function ParallaxBand({
  layer,
  index,
  bandHeight,
}: {
  layer: ParallaxLayer;
  index: number;
  bandHeight: string;
}) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapCleanup: (() => void) | undefined;

    // GSAP + ScrollTrigger loaded lazily — avoids SSR issues
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const wrap = wrapRef.current;
      const img  = imgRef.current;
      if (!wrap || !img) return;

      // Image is 130% tall — the extra 30% is the parallax travel range
      const travel = 30 * layer.speed; // % of band height
      const tween = gsap.fromTo(
        img,
        { yPercent: -travel / 2 },
        {
          yPercent: travel / 2,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end:   "bottom top",
            scrub: 0.8,
          },
        }
      );

      gsapCleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => gsapCleanup?.();
  }, [layer.speed]);

  const content = (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.1, duration: 0.9 }}
      className="group relative w-full overflow-hidden"
      style={{ height: bandHeight }}
    >
      {/* Parallaxing image — oversized so there's room to travel */}
      <div
        ref={imgRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: "-15%", bottom: "-15%" }}
      >
        <Image
          src={layer.src}
          alt={layer.alt}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-[1.02]"
          sizes="100vw"
        />
      </div>

      {/* Cinematic vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(12,10,8,0.7)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />

      {/* Band label */}
      {(layer.label || layer.sublabel) && (
        <div className="absolute bottom-0 inset-x-0 flex items-end justify-between p-8 md:p-10">
          <div>
            {layer.sublabel && (
              <p className="mb-2 font-mono text-[10px] tracking-[0.28em] text-[#C99545]">
                {layer.sublabel}
              </p>
            )}
            {layer.label && (
              <h3
                className="font-display font-light italic text-cream opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
              >
                {layer.label}
              </h3>
            )}
          </div>
          {layer.href && (
            <span className="font-mono text-xs text-cream/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              VIEW ↗
            </span>
          )}
        </div>
      )}

      {/* Thin top line — visible on hover */}
      <div className="absolute inset-x-0 top-0 h-px w-0 bg-[#C99545] transition-all duration-700 group-hover:w-full" />
    </motion.div>
  );

  if (layer.href) {
    return (
      <Link href={layer.href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function ParallaxScrolling({
  layers,
  bandHeight = "70vh",
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      {layers.map((layer, i) => (
        <ParallaxBand
          key={layer.src}
          layer={layer}
          index={i}
          bandHeight={bandHeight}
        />
      ))}
    </div>
  );
}
