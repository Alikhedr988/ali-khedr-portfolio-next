"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-cream/5 px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-mono text-[10px] tracking-widest text-muted">
          © 2026 ALI ALSHEIKH — BEIRUT
        </span>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="font-mono text-[10px] tracking-widest text-muted transition-colors hover:text-cream"
        >
          BACK TO TOP ↑
        </motion.button>
      </div>
    </footer>
  );
}
