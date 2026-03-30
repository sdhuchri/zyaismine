"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Star, Sun, Smile, Coffee } from "lucide-react";
import Navbar from "@/components/Navbar";

const wishes = [
  {
    icon: Heart,
    title: "Love & Joy",
    text: "May every single day ahead be filled with the kind of joy that comes naturally — the kind you don't have to chase. You deserve nothing less.",
  },
  {
    icon: Sparkles,
    title: "Growth",
    text: "This year, may you grow into even more of yourself. Discover new things, dare to do something different, and surprise yourself along the way.",
  },
  {
    icon: Star,
    title: "Dreams",
    text: "The things you're working toward? They're closer than you think. Keep going. The version of you that made it is cheering for you right now.",
  },
  {
    icon: Sun,
    title: "Good Days",
    text: "More mornings where you wake up and feel alright. More evenings that end well. More ordinary days that somehow end up being your favorites.",
  },
  {
    icon: Smile,
    title: "Laughter",
    text: "A year full of the kind of laughing you can't stop, even when you try. The people who make you feel like that — hold onto them.",
  },
  {
    icon: Coffee,
    title: "Peace",
    text: "Quiet moments. Deep breaths. Coffee that hits just right. May this year give you more peace than last, and more than you expect.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function WishesPage() {
  const [copied, setCopied] = useState(false);

  const personalMessage = `Dear Zya,

Happy Birthday.

I hope this year treats you the way you deserve — and I mean that genuinely, not just as a phrase. You've put in a lot, and you carry a lot, and I hope this next chapter feels a little lighter, a little brighter.

Stay exactly you. The world is better for it.

— With sincerity`;

  const handleCopy = () => {
    navigator.clipboard.writeText(personalMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="section-label mb-4">for you</p>
            <h1 className="heading-display text-5xl md:text-6xl mb-4">
              Birthday{" "}
              <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>Wishes</span>
            </h1>
            <p
              className="text-sm max-w-sm mx-auto"
              style={{ color: "var(--color-charcoal-light)" }}
            >
              Six things I genuinely hope for you this year.
            </p>
          </motion.div>

          {/* Wishes grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {wishes.map((wish, i) => {
              const Icon = wish.icon;
              return (
                <motion.div
                  key={wish.title}
                  className="card p-6 hover-lift"
                  {...fadeUp(0.1 + i * 0.1)}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "var(--color-gold-pale)" }}
                  >
                    <Icon size={18} style={{ color: "var(--color-gold)" }} />
                  </div>
                  <h3
                    className="heading-display text-xl mb-3"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    {wish.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-charcoal-light)" }}
                  >
                    {wish.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Personal letter */}
          <motion.div
            className="card p-8 md:p-12 max-w-2xl mx-auto"
            {...fadeUp(0.7)}
            style={{
              borderTop: "3px solid var(--color-gold)",
            }}
          >
            <p className="section-label mb-6">a personal note</p>
            <div
              className="heading-display text-lg leading-relaxed mb-8 whitespace-pre-line"
              style={{ fontStyle: "italic", color: "var(--color-charcoal-light)" }}
            >
              {personalMessage}
            </div>
            <button
              className="btn-outline text-xs"
              onClick={handleCopy}
            >
              {copied ? "Copied ✓" : "Copy message"}
            </button>
          </motion.div>
        </div>
      </main>
    </>
  );
}
