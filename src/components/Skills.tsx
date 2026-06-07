"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-cream/5 px-6 py-24 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section label */}
        <motion.p
          className="mb-16 font-mono text-[11px] tracking-[0.28em] text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          [ 03 ] CAPABILITIES
        </motion.p>

        {/* 2×2 domain grid */}
        <div className="grid grid-cols-1 gap-0 divide-y divide-cream/5 sm:grid-cols-2 sm:divide-y-0">
          {skills.map((domain, i) => (
            <motion.div
              key={domain.domain}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className={`py-10 md:py-14 ${
                i % 2 === 1 ? "sm:pl-12 sm:border-l sm:border-cream/5" : "sm:pr-12"
              }`}
            >
              {/* Domain name */}
              <h3 className="mb-6 font-mono text-[11px] tracking-[0.28em] text-ochre">
                {domain.domain.toUpperCase()}
              </h3>

              {/* Skill items */}
              <ul className="space-y-3">
                {domain.items.map((item, j) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.06 + 0.2, duration: 0.5 }}
                    className="flex items-center gap-3 font-display font-light text-cream-2"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-muted" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
