"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { socials } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Contact() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire to Formspree / Resend / any form backend by replacing this
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="border-t border-cream/5 bg-ink-2 px-6 py-24 md:px-12 md:py-40"
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
          [ 05 ] CONTACT
        </motion.p>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          {/* Left: headline + links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2
              className="font-display font-light italic leading-tight text-cream text-balance"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              Let&apos;s work
              <br />
              together.
            </h2>
            <div className="mt-8 h-px w-12 bg-ochre" />

            <div className="mt-10 flex flex-col gap-4">
              {socials.map(({ label, display, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="group flex items-baseline gap-3 font-mono text-sm text-cream-2 transition-colors hover:text-ochre"
                >
                  <span className="text-[10px] tracking-widest text-muted transition-colors group-hover:text-ochre/60">
                    {label.toUpperCase()}
                  </span>
                  {display}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            {sent ? (
              <div className="flex items-center gap-4 py-8">
                <div className="h-px w-8 bg-ochre" />
                <p className="font-display italic text-cream-2">
                  Message sent. Thank you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {(
                  [
                    { key: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                  ] as const
                ).map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="mb-2 block font-mono text-[10px] tracking-widest text-muted">
                      {label.toUpperCase()}
                    </label>
                    <input
                      type={type}
                      required
                      value={fields[key]}
                      onChange={set(key)}
                      placeholder={placeholder}
                      className="w-full border-b border-cream/20 bg-transparent py-3 font-display font-light text-cream placeholder:text-muted/50 focus:border-ochre focus:outline-none transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-2 block font-mono text-[10px] tracking-widest text-muted">
                    MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={fields.message}
                    onChange={set("message")}
                    placeholder="Tell me about your project..."
                    className="w-full resize-none border-b border-cream/20 bg-transparent py-3 font-display font-light text-cream placeholder:text-muted/50 focus:border-ochre focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <motion.button
                    type="submit"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="border border-ochre/40 px-6 py-3 font-mono text-xs tracking-widest text-ochre transition-all duration-300 hover:bg-ochre hover:text-ink"
                  >
                    SEND MESSAGE →
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
