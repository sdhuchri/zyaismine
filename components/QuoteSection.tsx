"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function QuoteSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-24 px-6 relative overflow-hidden" ref={ref}>
      {/* subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--color-gold-pale)" }}
        aria-hidden="true"
      />

      {/* radiating lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              border: "1px solid var(--color-gold)",
              borderRadius: "50%",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-8">a little note</p>
          <blockquote
            className="heading-display mb-6"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontStyle: "italic" }}
          >
            &ldquo;Filter or not, you&apos;re the prettiest thing I&apos;ve ever seen.&rdquo;
          </blockquote>
          <div className="divider mx-auto mb-6" />
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            — Sury, in a chat she probably replied with &ldquo;itu pake filter 😔&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
