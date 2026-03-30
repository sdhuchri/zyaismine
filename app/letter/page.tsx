"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import { log } from "@/lib/logger";

const moods = [
  { label: "Missing you", value: "missing you, longing" },
  { label: "Full of love", value: "full of love and gratitude" },
  { label: "Proud of you", value: "proud and admiring" },
  { label: "Grateful", value: "grateful for you being in my life" },
  { label: "Happy", value: "happy and celebratory, birthday energy" },
  { label: "In awe", value: "in awe of who you are" },
];

const loadingMessages = [
  "Finding the right words...",
  "Putting feelings into sentences...",
  "Making it personal...",
  "Almost done...",
];

type State = "form" | "loading" | "result";

export default function LetterPage() {
  useEffect(() => { log("page.visit", "letter"); }, []);
  const [state, setState] = useState<State>("form");
  const [selectedMood, setSelectedMood] = useState("");
  const [context, setContext] = useState("");
  const [letter, setLetter] = useState("");
  const [copied, setCopied] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);

  const generate = async () => {
    if (!selectedMood) return;
    setState("loading");
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % loadingMessages.length;
      setLoadingMsg(i);
    }, 1200);

    try {
      const res = await fetch("/api/letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: selectedMood, context }),
      });
      const data = await res.json();
      setLetter(data.letter);
      setState("result");
      log("letter.generated", selectedMood);
    } catch {
      setLetter(
        `Zya,\n\nHappy birthday. Genuinely.\n\nAku tau kamu probably lagi "yaudah biasa aja" soal ulang tahun ini, tapi buat aku ini penting — kamu penting.\n\nSemoga tahun ini baik sama kamu. Dan kamu baik sama diri kamu sendiri.\n\nMiss u.\n\n— Sury`
      );
      setState("result");
    } finally {
      clearInterval(interval);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    log("letter.copied");
  };

  const reset = () => {
    setState("form");
    setSelectedMood("");
    setContext("");
    setLetter("");
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-4">for zya</p>
            <h1 className="heading-display text-5xl md:text-6xl mb-3">
              Birthday{" "}
              <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>Letter</span>
            </h1>
            <p className="text-sm" style={{ color: "var(--color-charcoal-light)" }}>
              Generate a personal birthday letter based on the mood.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {state === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="card p-8"
              >
                <p className="section-label mb-4">choose a mood</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-7">
                  {moods.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setSelectedMood(m.value)}
                      className="px-3 py-2.5 rounded-xl text-sm text-left transition-all"
                      style={{
                        background:
                          selectedMood === m.value ? "var(--color-gold-pale)" : "var(--color-cream)",
                        border: `1px solid ${
                          selectedMood === m.value ? "var(--color-gold)" : "var(--color-cream-dark)"
                        }`,
                        color:
                          selectedMood === m.value
                            ? "var(--color-gold)"
                            : "var(--color-charcoal-light)",
                        fontWeight: selectedMood === m.value ? 500 : 400,
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <p className="section-label mb-3">add context (optional)</p>
                <textarea
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none mb-6"
                  style={{
                    background: "var(--color-cream)",
                    border: "1px solid var(--color-cream-dark)",
                    color: "var(--color-charcoal)",
                    minHeight: 80,
                  }}
                  placeholder="e.g. she just aced her exam, she's been working really hard lately..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />

                <button
                  className="btn-primary w-full justify-center"
                  onClick={generate}
                  disabled={!selectedMood}
                  style={{ opacity: selectedMood ? 1 : 0.5 }}
                >
                  Generate Letter
                </button>
              </motion.div>
            )}

            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card p-12 text-center"
              >
                <div className="flex justify-center gap-2 mb-6">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ background: "var(--color-gold)" }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingMsg}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-sm"
                    style={{ color: "var(--color-charcoal-light)" }}
                  >
                    {loadingMessages[loadingMsg]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            )}

            {state === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="card p-8 md:p-10"
                style={{ borderTop: "3px solid var(--color-gold)" }}
              >
                <p
                  className="heading-display text-lg mb-6 text-center"
                  style={{ fontStyle: "italic", color: "var(--color-muted)" }}
                >
                  For Zya
                </p>
                <div className="divider mx-auto mb-7" />
                <p
                  className="text-sm leading-loose whitespace-pre-line mb-8"
                  style={{
                    color: "var(--color-charcoal-light)",
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "1.05rem",
                  }}
                >
                  {letter}
                </p>
                <div className="flex gap-3 flex-wrap">
                  <button className="btn-primary flex items-center gap-2" onClick={handleCopy}>
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied!" : "Copy letter"}
                  </button>
                  <button className="btn-outline flex items-center gap-2" onClick={reset}>
                    <RotateCcw size={14} /> Write again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
