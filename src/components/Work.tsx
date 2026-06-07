"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { projects } from "@/lib/data";

type Project = (typeof projects)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawRotX = useMotionValue(0);
  const rawRotY = useMotionValue(0);
  const rotX = useSpring(rawRotX, { stiffness: 160, damping: 26 });
  const rotY = useSpring(rawRotY, { stiffness: 160, damping: 26 });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgb(201 149 69 / 0.13), transparent 62%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    rawRotX.set((0.5 - ny) * 16);
    rawRotY.set((nx - 0.5) * 16);
    glowX.set(nx * 100);
    glowY.set(ny * 100);
  };

  const onMouseLeave = () => {
    rawRotX.set(0);
    rawRotY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  const inner = (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      className="group relative flex h-full flex-col overflow-hidden border border-cream/5 bg-ink-2 transition-all duration-500 hover:border-ochre/25"
    >
      {/* Cursor glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glowBg }}
        aria-hidden
      />

      {/* Top edge line */}
      <div className="absolute inset-x-0 top-0 z-20 h-px w-0 bg-ochre transition-all duration-500 group-hover:w-full" />

      {/* Project image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/40 to-transparent" />
      </div>

      {/* Card body */}
      <div className="relative z-10 flex flex-1 flex-col p-8 md:p-10">
        <div className="mb-4 flex items-start justify-between">
          <span className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-ochre">
            {project.id}
          </span>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>

        <h3 className="mb-3 font-display font-semibold text-xl text-cream transition-colors duration-300 group-hover:text-ochre md:text-2xl">
          {project.title}
        </h3>

        <p className="mb-6 flex-1 font-display font-light leading-relaxed text-cream-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-teal/10 px-2 py-1 font-mono text-[10px] tracking-wider text-teal"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.09, duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }}
      className="h-full"
    >
      {project.url ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="border-t border-cream/5 bg-ink-2 px-6 py-24 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          className="mb-16 font-mono text-[11px] tracking-[0.28em] text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          [ 02 ] WORK
        </motion.p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
