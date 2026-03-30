"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { log } from "@/lib/logger";

const MESSAGE_LINES = [
  "Zia,",
  "",
  "Selamat ulang tahun.",
  "",
  "Dari pertama chat \"ih lucu bgtsi\" sampai malam ini,",
  "dua bulan berlalu dan aku masih ngerasa beruntung",
  "bisa kenal kamu.",
  "",
  "Kamu cantik, kamu lucu, kamu menarik —",
  "filter or not.",
  "",
  "Semoga tahun ini baik sama kamu.",
  "Dan kamu baik sama diri kamu sendiri.",
  "",
  "Miss u. Happy birthday.",
  "",
  "— Sury 🌹",
];

function BirthdayCard({ onClose }: { onClose: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= MESSAGE_LINES.length) return;
    const t = setTimeout(
      () => setVisibleLines((v) => v + 1),
      visibleLines === 0 ? 600 : MESSAGE_LINES[visibleLines - 1] === "" ? 180 : 120
    );
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(44,40,40,0.7)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-md mx-4 p-6 md:p-10"
        style={{
          background: "var(--color-cream)",
          borderRadius: 16,
          boxShadow: "0 24px 64px rgba(44,40,40,0.3)",
        }}
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
      >
        {/* Polaroid flower in corner */}
        <motion.div
          className="hidden md:block absolute -top-8 -right-4"
          style={{
            background: "white",
            padding: "6px 6px 28px 6px",
            borderRadius: 4,
            boxShadow: "0 4px 16px rgba(44,40,40,0.18)",
            width: 90,
            rotate: 8,
          }}
          initial={{ opacity: 0, rotate: 20, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 8, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 140 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/zya/IMG_7577.jpeg"
            alt="Bunga"
            className="w-full object-cover"
            style={{ borderRadius: 2, display: "block", aspectRatio: "1/1" }}
          />
          <p
            className="text-center"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "0.5rem",
              color: "var(--color-muted)",
              marginTop: 4,
            }}
          >
            14 Feb 🌹
          </p>
        </motion.div>

        {/* Mobile polaroid — inline above message */}
        <motion.div
          className="md:hidden flex justify-end mb-4"
          initial={{ opacity: 0, rotate: 10, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 6, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 140 }}
        >
          <div style={{ background: "white", padding: "5px 5px 22px 5px", borderRadius: 4, boxShadow: "0 4px 12px rgba(44,40,40,0.15)", width: 72, rotate: "6deg" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/zya/IMG_7577.jpeg" alt="Bunga" className="w-full object-cover" style={{ borderRadius: 2, aspectRatio: "1/1" }} />
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.45rem", color: "var(--color-muted)", textAlign: "center", marginTop: 3 }}>14 Feb 🌹</p>
          </div>
        </motion.div>

        {/* Message */}
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(0.85rem, 3.5vw, 1rem)",
            lineHeight: 1.85,
            color: "var(--color-charcoal-light)",
            minHeight: "auto",
          }}
        >
          {MESSAGE_LINES.slice(0, visibleLines).map((line, i) =>
            line === "" ? (
              <div key={i} style={{ height: "0.6rem" }} />
            ) : (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  color: line.startsWith("—") ? "var(--color-gold)" : "var(--color-charcoal-light)",
                  fontWeight: line === "Zia," ? 500 : 400,
                }}
              >
                {line}
              </motion.p>
            )
          )}
          {visibleLines < MESSAGE_LINES.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              style={{ color: "var(--color-gold)" }}
            >
              |
            </motion.span>
          )}
        </div>

        {/* Actions — show after all lines typed */}
        <AnimatePresence>
          {visibleLines >= MESSAGE_LINES.length && (
            <motion.div
              className="flex gap-3 mt-6 flex-wrap"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button className="btn-primary" onClick={onClose}>
                Tiup lagi 🕯️
              </button>
              <Link href="/valentine" className="btn-outline">
                Lihat bunga 🌹
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function Flame({ blown }: { blown: boolean }) {
  return (
    <div className="relative flex justify-center items-end" style={{ height: 36 }}>
      <AnimatePresence>
        {!blown && (
          <motion.div
            key="flame"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              width: 12,
              height: 24,
              background: "linear-gradient(to top, #f59e0b, #fde68a)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              animation: blown ? "none" : "candle-flicker 0.8s ease-in-out infinite",
              transformOrigin: "bottom center",
              boxShadow: "0 0 8px rgba(245,158,11,0.6)",
            }}
          />
        )}
        {blown && (
          <motion.div
            key="smoke"
            initial={{ opacity: 0.6, y: 0 }}
            animate={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8 }}
            style={{
              width: 4,
              height: 12,
              background: "rgba(100,100,100,0.3)",
              borderRadius: 99,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const CANDLE_COLORS = [
  "#C9963A", "#C4847A", "#9B8EA8", "#7AA8A8", "#8EA87A", "#A87A8E",
  "#D4A853", "#C4847A", "#9B8EA8", "#C9963A",
];

const CONFETTI_COLORS = ["#C9963A", "#F0DDB0", "#C4847A", "#9B8EA8", "#E8C07D", "#FAF7F0"];

function ConfettiBurst() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 0.5,
    size: Math.random() * 10 + 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40" aria-hidden="true">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: "-20px",
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.8,
          }}
          animate={{
            y: ["0vh", "105vh"],
            rotate: [0, 720],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: p.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

export default function CakePage() {
  useEffect(() => { log("page.visit", "cake"); }, []);
  const [blownCount, setBlownCount] = useState(0);
  const [allBlown, setAllBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const totalCandles = 10;

  const blowOne = () => {
    if (allBlown) return;
    const next = blownCount + 1;
    setBlownCount(next);
    log("cake.candle_blown", `${next}/${totalCandles}`);
    if (next >= totalCandles) {
      setAllBlown(true);
      log("cake.all_blown");
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowCard(true);
      }, 1800);
    }
  };

  const reset = () => {
    setBlownCount(0);
    setAllBlown(false);
    setShowConfetti(false);
    setShowCard(false);
  };

  return (
    <>
      <Navbar />
      {showConfetti && <ConfettiBurst />}
      <AnimatePresence>
        {showCard && <BirthdayCard onClose={reset} />}
      </AnimatePresence>

      <main className="pt-28 pb-20 px-6 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-lg w-full mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-4">make a wish</p>
            <h1 className="heading-display text-5xl md:text-6xl mb-2">
              Blow the{" "}
              <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>Candles</span>
            </h1>
            <p
              className="text-sm mb-12"
              style={{ color: "var(--color-charcoal-light)" }}
            >
              {allBlown
                ? "All candles blown. Happy Birthday, Zya! 🎂"
                : `${totalCandles - blownCount} candle${totalCandles - blownCount !== 1 ? "s" : ""} left — click to blow`}
            </p>
          </motion.div>

          {/* Cake */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto"
            style={{ maxWidth: 360 }}
          >
            {/* Candles — 1 row on desktop, 2 rows of 5 on mobile */}
            <div className="flex flex-col items-center gap-1 mb-1 md:flex-row md:justify-center md:gap-3 px-2">
              {[0, 1].map((row) => (
                <div key={row} className="flex justify-center gap-2 md:gap-3 md:contents">
                  {Array.from({ length: 5 }).map((_, j) => {
                    const i = row * 5 + j;
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={blownCount === i ? blowOne : undefined}
                        style={{ minWidth: 28, minHeight: 44 }}
                      >
                        <Flame blown={i < blownCount} />
                        <div
                          style={{
                            width: 10,
                            height: 28,
                            background: CANDLE_COLORS[i],
                            borderRadius: "3px 3px 2px 2px",
                            opacity: i < blownCount ? 0.5 : 1,
                            transition: "opacity 0.3s",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Cake tiers */}
            {/* Top tier */}
            <div
              className="mx-auto rounded-t-lg flex items-center justify-center"
              style={{
                width: "72%",
                height: 52,
                background: "linear-gradient(135deg, #F5E6E3 0%, #F2DDD8 100%)",
                border: "1px solid #E8C4BE",
                borderBottom: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: "var(--color-rose)",
                }}
              >
                Happy Birthday
              </span>
            </div>

            {/* Middle tier */}
            <div
              className="mx-auto flex items-center justify-center"
              style={{
                width: "88%",
                height: 60,
                background: "linear-gradient(135deg, #FBF4E4 0%, #F5E9CC 100%)",
                border: "1px solid #E8D4A8",
                borderBottom: "none",
                borderTop: "none",
              }}
            >
              {/* Dot decoration */}
              <div className="flex gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: CANDLE_COLORS[i * 2],
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom tier */}
            <div
              className="mx-auto rounded-b-xl flex items-center justify-center relative overflow-hidden"
              style={{
                width: "100%",
                height: 72,
                background: "linear-gradient(135deg, #C9963A 0%, #D4A853 50%, #C9963A 100%)",
              }}
            >
              {/* Wave decoration */}
              <svg
                className="absolute top-0 left-0 w-full"
                height="20"
                viewBox="0 0 360 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,10 Q45,0 90,10 Q135,20 180,10 Q225,0 270,10 Q315,20 360,10 L360,0 L0,0 Z"
                  fill="white"
                  opacity="0.2"
                />
              </svg>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.4rem",
                  fontStyle: "italic",
                  color: "white",
                  letterSpacing: "0.05em",
                }}
              >
                Zya
              </span>
            </div>

            {/* Plate */}
            <div
              className="mx-auto rounded-b-full"
              style={{
                width: "110%",
                height: 18,
                background: "linear-gradient(135deg, #E8D4A8, #D4C090)",
                marginLeft: "-5%",
              }}
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {!allBlown && (
              <button className="btn-primary" onClick={blowOne}>
                Blow a candle 🕯️
              </button>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}
