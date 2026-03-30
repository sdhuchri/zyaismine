"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function Petal({ dur, delay, left }: { dur: number; delay: number; left: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: 8,
        height: 12,
        background: "linear-gradient(135deg, #f9a8d4, #fda4af)",
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        opacity: 0.7,
        left: `${left}%`,
        top: "-20px",
      }}
      animate={{ y: ["0vh", "110vh"], rotate: [0, 360], opacity: [0.7, 0] }}
      transition={{ duration: dur, delay, ease: "linear", repeat: Infinity }}
    />
  );
}

export default function ValentinePage() {
  const [revealed, setRevealed] = useState(false);
  const [petals, setPetals] = useState<{ id: number; x: number; dur: number; delay: number }[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        dur: 4 + Math.random() * 4,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "var(--color-cream)" }}
    >
      {/* Falling petals */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        {petals.map((p) => (
          <Petal key={p.id} left={p.x} dur={p.dur} delay={p.delay} />
        ))}
      </div>

      {/* Back link */}
      <motion.div
        className="absolute top-6 left-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xs"
          style={{ color: "var(--color-muted)", letterSpacing: "0.08em" }}
        >
          <ArrowLeft size={14} /> back
        </Link>
      </motion.div>

      <AnimatePresence mode="wait">
        {!revealed ? (
          /* --- Cover state --- */
          <motion.div
            key="cover"
            className="text-center max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-6xl mb-8 select-none"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              🌹
            </motion.div>

            <p className="section-label mb-4">14 februari 2026</p>
            <h1
              className="heading-display mb-4"
              style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
            >
              Ada yang{" "}
              <span style={{ color: "var(--color-rose)", fontStyle: "italic" }}>
                ingin kutunjukkan
              </span>
            </h1>
            <p
              className="text-sm leading-relaxed mb-10"
              style={{ color: "var(--color-charcoal-light)" }}
            >
              Kamu bilang &ldquo;dapet hikmah 😭&rdquo; soal Valentine.
              <br />
              Tapi Sury tetap nyiapin sesuatu buat kamu.
            </p>

            <motion.button
              className="btn-primary"
              style={{ background: "var(--color-rose)" }}
              onClick={() => setRevealed(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Lihat
            </motion.button>
          </motion.div>
        ) : (
          /* --- Reveal state --- */
          <motion.div
            key="reveal"
            className="w-full max-w-md text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Polaroid photo */}
            <motion.div
              className="mx-auto mb-8"
              style={{
                background: "white",
                padding: "12px 12px 52px 12px",
                borderRadius: 4,
                boxShadow: "0 8px 40px rgba(44,40,40,0.18), 0 2px 8px rgba(44,40,40,0.08)",
                maxWidth: 340,
                rotate: -2,
              }}
              initial={{ scale: 0.85, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: -2 }}
              transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.1 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/zya/IMG_7577.jpeg"
                alt="Bunga Valentine"
                className="w-full object-cover"
                style={{ borderRadius: 2, display: "block" }}
              />
              <p
                className="text-center mt-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  color: "var(--color-charcoal-light)",
                }}
              >
                14 Feb 2026 · untuk Zia
              </p>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="divider mx-auto mb-6" />
              <p
                className="heading-display text-xl leading-relaxed mb-2"
                style={{ fontStyle: "italic", color: "var(--color-charcoal-light)" }}
              >
                &ldquo;Kalo ak mau kasi sesuatu bole ga?&rdquo;
              </p>
              <p className="text-xs mb-8" style={{ color: "var(--color-muted)" }}>
                — Sury, 15 Feb 2026
              </p>
              <p
                className="text-sm leading-relaxed max-w-xs mx-auto"
                style={{ color: "var(--color-charcoal-light)" }}
              >
                Bunga ini buat kamu. Terlambat sedikit mungkin,
                tapi niatnya dari hari itu.
                <br /><br />
                Happy birthday, Zia.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
