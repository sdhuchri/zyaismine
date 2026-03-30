"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";

type Photo = {
  src: string;
  caption: string;
  tags: string[];
};

const photos: Photo[] = [
  { src: "/images/zya/IMG_7570.jpeg", caption: "genuinely the prettiest girl i've ever seen", tags: ["favorite"] },
  { src: "/images/zya/IMG_7571.jpeg", caption: "you look like that without even trying, it's unfair", tags: ["favorite"] },
  { src: "/images/zya/IMG_7572.jpeg", caption: "filter or not — still the most beautiful thing", tags: ["favorite", "memories"] },
  { src: "/images/zya/IMG_7573.jpeg", caption: "caught you being gorgeous again, unsurprising", tags: ["memories"] },
  { src: "/images/zya/IMG_7574.jpeg", caption: "i'd stare and pretend i wasn't", tags: ["memories"] },
  { src: "/images/zya/IMG_7575.jpeg", caption: "the kind of beautiful that makes people look twice", tags: ["favorite"] },
  { src: "/images/zya/IMG_7576.jpeg", caption: "yeah i'm down bad. have you seen you?", tags: ["favorite", "memories"] },
];

const sizes = ["large", "medium", "small"] as const;

const sizeClass = {
  small:  "col-span-1 row-span-1",
  medium: "col-span-1 row-span-2",
  large:  "col-span-1 row-span-2 md:col-span-2 md:row-span-2",
};

function randomStyle() {
  return {
    rotate:     +(Math.random() * 8 - 4).toFixed(2),
    scale:      +(0.92 + Math.random() * 0.1).toFixed(3),
    translateX: +(Math.random() * 10 - 5).toFixed(1),
    translateY: +(Math.random() * 10 - 5).toFixed(1),
    size:       sizes[Math.floor(Math.random() * sizes.length)],
  };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const tags = ["All", "Favorite", "Memories"];

type StyledPhoto = Photo & ReturnType<typeof randomStyle>;

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [deck, setDeck] = useState<StyledPhoto[]>(
    photos.map((p) => ({ ...p, rotate: 0, scale: 1, translateX: 0, translateY: 0, size: "medium" as const }))
  );

  useEffect(() => {
    setDeck(shuffle(photos).map((p) => ({ ...p, ...randomStyle() })));
  }, []);

  const filtered =
    active === "All"
      ? deck
      : deck.filter((p) => p.tags.map((t) => t.toLowerCase()).includes(active.toLowerCase()));

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-3">captured moments</p>
            <h1 className="heading-display text-5xl md:text-6xl">Gallery</h1>
          </motion.div>

          {/* Filter */}
          <motion.div
            className="flex gap-2 mb-12 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{
                  letterSpacing: "0.1em",
                  background: active === tag ? "var(--color-gold)" : "white",
                  color: active === tag ? "white" : "var(--color-charcoal-light)",
                  border: `1px solid ${active === tag ? "var(--color-gold)" : "var(--color-cream-dark)"}`,
                }}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Scattered grid — 2 cols on mobile, 4 on desktop */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 [grid-auto-rows:130px] md:[grid-auto-rows:160px]">
            <AnimatePresence>
              {filtered.map((photo, i) => {
                const style = photo;
                return (
                  <motion.div
                    key={photo.src}
                    layout
                    className={`${sizeClass[style.size as keyof typeof sizeClass]} cursor-pointer`}
                    style={{
                      transform: `rotate(${style.rotate}deg) translate(${style.translateX}px, ${style.translateY}px)`,
                      zIndex: i + 1,
                      position: "relative",
                    }}
                    initial={{ opacity: 0, scale: 0.85, rotate: style.rotate - 5 }}
                    animate={{ opacity: 1, scale: style.scale, rotate: style.rotate }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.45, delay: i * 0.07, type: "spring", stiffness: 120 }}
                    whileHover={{
                      scale: style.scale + 0.05,
                      rotate: 0,
                      zIndex: 20,
                      transition: { duration: 0.2 },
                    }}
                    onClick={() => setLightbox(photo)}
                  >
                    {/* Polaroid frame */}
                    <div
                      className="w-full h-full flex flex-col"
                      style={{
                        background: "white",
                        boxShadow: "0 4px 20px rgba(44,40,40,0.15), 0 1px 4px rgba(44,40,40,0.1)",
                        borderRadius: 4,
                        padding: "6px 6px 28px 6px",
                      }}
                    >
                      {/* Photo */}
                      <div className="flex-1 overflow-hidden" style={{ borderRadius: 2 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                          style={{ display: "block" }}
                        />
                      </div>
                      {/* Caption */}
                      <p
                        className="text-center truncate"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          fontSize: "0.65rem",
                          color: "var(--color-charcoal-light)",
                          marginTop: 4,
                          lineHeight: 1.2,
                        }}
                      >
                        {photo.caption}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="text-center py-20 text-sm" style={{ color: "var(--color-muted)" }}>
              No photos in this category yet.
            </p>
          )}
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(44,40,40,0.88)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative bg-white rounded-sm overflow-hidden"
              style={{
                maxWidth: 480,
                width: "100%",
                padding: "10px 10px 52px 10px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="w-full object-cover"
                style={{ borderRadius: 2, display: "block" }}
              />
              <p
                className="text-center mt-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                  color: "var(--color-charcoal-light)",
                }}
              >
                {lightbox.caption}
              </p>
              <button
                className="absolute top-3 right-3 p-1.5 rounded-full"
                style={{ background: "rgba(44,40,40,0.08)" }}
                onClick={() => setLightbox(null)}
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
