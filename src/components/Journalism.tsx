"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { journalismWorks } from "@/lib/data";

export default function Journalism() {
  return (
    <section
      id="press"
      className="border-t border-cream/5 px-6 py-24 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          className="mb-16 font-mono text-[11px] tracking-[0.28em] text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          [ 03 ] PRESS
        </motion.p>

        <div className="divide-y divide-cream/5">
          {journalismWorks.map((work, i) => (
            <motion.a
              key={i}
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className="group flex items-start gap-6 py-8 md:gap-10 md:py-10"
            >
              {/* Thumbnail */}
              <div className="relative h-20 w-28 shrink-0 overflow-hidden md:h-24 md:w-36">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover opacity-50 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                  sizes="144px"
                />
                {/* Colour overlay on hover */}
                <div className="absolute inset-0 bg-ochre/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col gap-2">
                <p className="font-mono text-[10px] tracking-[0.25em] text-ochre">
                  {work.publisher.toUpperCase()} · {work.year}
                </p>
                <h3 className="font-display font-light leading-snug text-cream transition-colors duration-300 group-hover:text-ochre md:text-lg">
                  {work.title}
                </h3>
              </div>

              {/* Arrow */}
              <div className="shrink-0 pt-1">
                <span className="font-mono text-sm text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-ochre inline-block">
                  ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
