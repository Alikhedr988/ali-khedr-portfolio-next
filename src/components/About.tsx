"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: "10+", label: "Years" },
  { value: "17",  label: "Films" },
  { value: "6",   label: "Publications" },
  { value: "2",   label: "Co-founded" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const quoteY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const bgNumY = useTransform(scrollYProgress, [0, 1], [20, -80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-cream/5 px-6 py-24 md:px-12 md:py-40"
    >
      {/* Decorative large background numeral */}
      <motion.div
        style={{ y: bgNumY, fontSize: "clamp(12rem, 30vw, 28rem)" }}
        className="pointer-events-none absolute right-[-2%] top-[5%] select-none font-display font-semibold leading-none text-cream/[0.02]"
        aria-hidden
      >
        01
      </motion.div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section label */}
        <motion.p
          className="mb-16 font-mono text-[11px] tracking-[0.28em] text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          [ 01 ] ABOUT
        </motion.p>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20 lg:gap-28">
          {/* Left: image slot + pull quote */}
          <div className="flex flex-col gap-10">
            {/* Portrait */}
            <motion.div
              style={{ y: imageY, aspectRatio: "3 / 4" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative w-full overflow-hidden"
            >
              <Image
                src="/images/portrait.jpg"
                alt="Ali AlSheikh"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle vignette to blend edges into the dark background */}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(12,10,8,0.4)]" />
            </motion.div>

            {/* Pull quote with scroll parallax */}
            <motion.blockquote
              style={{ y: quoteY, fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display font-light italic leading-tight text-cream text-balance"
            >
              &ldquo;The work
              <br />is the point.&rdquo;
            </motion.blockquote>
            <div className="h-px w-12 bg-ochre" />
          </div>

          {/* Right: bio + stats */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <p className="mb-6 font-display font-light leading-[1.85] text-cream-2 md:text-lg">
              Ali AlSheikh is an independent Syrian journalist, photographer,
              videographer, and musician based in Beirut. His work spans
              documentary film, photojournalism, and music — always in pursuit
              of honest, human stories.
            </p>
            <p className="mb-12 font-display font-light leading-[1.85] text-cream-2 md:text-lg">
              Co-founder of Syrian Eyes and Jazz Kabeez, he has collaborated
              with Amnesty International, Al Jazeera, Open Society Foundations,
              and Seenaryo, among others.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4 border-t border-cream/10 pt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.6 }}
                >
                  <div className="font-display text-2xl text-ochre md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono text-[9px] tracking-widest text-muted">
                    {stat.label.toUpperCase()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
