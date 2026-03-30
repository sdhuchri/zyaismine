"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

function Confetti() {
  const [pieces, setPieces] = useState<
    { id: number; x: number; color: string; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    const colors = ["#C9963A", "#F0DDB0", "#C4847A", "#9B8EA8", "#FAF7F0", "#E8C07D"];
    setPieces(
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        size: Math.random() * 8 + 4,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: "-20px",
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.7,
            animation: `confetti-fall ${4 + Math.random() * 4}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay },
  });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
      <Confetti />

      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,150,58,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Corner ornaments */}
      <svg
        className="hidden md:block absolute top-20 left-6 opacity-20"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="60" y2="0" stroke="var(--color-gold)" strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="60" stroke="var(--color-gold)" strokeWidth="1" />
      </svg>
      <svg
        className="hidden md:block absolute top-20 right-6 opacity-20"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        aria-hidden="true"
      >
        <line x1="60" y1="0" x2="0" y2="0" stroke="var(--color-gold)" strokeWidth="1" />
        <line x1="60" y1="0" x2="60" y2="60" stroke="var(--color-gold)" strokeWidth="1" />
      </svg>

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.p className="section-label mb-6" {...fadeUp(0.1)}>
          — today is your day —
        </motion.p>

        <motion.h1
          className="heading-display mb-6"
          style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
          {...fadeUp(0.25)}
        >
          Happy Birthday,
          <br />
          <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>Zya.</span>
        </motion.h1>

        <motion.div className="divider mx-auto mb-6" {...fadeUp(0.4)} />

        <motion.p
          className="text-base leading-relaxed max-w-md mx-auto mb-10"
          style={{ color: "var(--color-charcoal-light)" }}
          {...fadeUp(0.5)}
        >
          &ldquo;Ih lucu bgtsi&rdquo; — 1 Feb 2026. Look where that got us.
          <br />
          Happy birthday, Zia.
        </motion.p>

        <motion.div className="flex items-center justify-center gap-3 flex-wrap" {...fadeUp(0.6)}>
          <Link href="/wishes" className="btn-primary">
            Birthday Wishes
          </Link>
          <Link href="/letter" className="btn-outline">
            Birthday Letter
          </Link>
          <Link href="/chat" className="btn-outline">
            Chat
          </Link>
          <Link href="/cake" className="btn-outline">
            Cake 🎂
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ color: "var(--color-muted)" }}
      >
        <span className="section-label text-xs">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
