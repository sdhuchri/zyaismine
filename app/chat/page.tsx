"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import { log } from "@/lib/logger";

type Message = { role: "user" | "assistant"; content: string };

const starters = [
  "Selamat ulang tahun Zya! 🎂",
  "Keshi song favorit kamu apa?",
  "Mau hadiah apa hari ini?",
  "Lagi ngapain?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hai Zya! Happy birthday 🎂 aku di sini buat nemenin hari ini. Ada yang mau kamu ceritain?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { log("page.visit", "chat"); }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setLoading(true);
    log("chat.message", msg.slice(0, 80));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          history: newMessages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Maaf, ada error. Coba lagi ya 😅" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-0 flex flex-col" style={{ height: "100dvh" }}>
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 min-h-0">
          {/* Header */}
          <div
            className="py-5 border-b flex items-center gap-3"
            style={{ borderColor: "var(--color-cream-dark)" }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
              style={{ background: "var(--color-gold)", color: "white" }}
            >
              Z
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--color-charcoal)" }}
              >
                Birthday Companion
              </p>
              <p className="section-label text-xs" style={{ color: "var(--color-gold)" }}>
                online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-5 flex flex-col gap-3 min-h-0">
            {/* Starter chips */}
            {messages.length === 1 && (
              <motion.div
                className="flex flex-wrap gap-2 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {starters.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="px-3 py-1.5 rounded-full text-xs border transition-colors"
                    style={{
                      borderColor: "var(--color-cream-dark)",
                      color: "var(--color-charcoal-light)",
                      background: "white",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-xs md:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={
                      m.role === "user"
                        ? {
                            background: "var(--color-gold)",
                            color: "white",
                            borderBottomRightRadius: 6,
                          }
                        : {
                            background: "white",
                            color: "var(--color-charcoal)",
                            border: "1px solid var(--color-cream-dark)",
                            borderBottomLeftRadius: 6,
                          }
                    }
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div
                  className="px-4 py-3 rounded-2xl flex gap-1.5 items-center"
                  style={{
                    background: "white",
                    border: "1px solid var(--color-cream-dark)",
                    borderBottomLeftRadius: 6,
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--color-muted)" }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="py-4 border-t flex gap-2"
            style={{ borderColor: "var(--color-cream-dark)" }}
          >
            <input
              className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none"
              style={{
                background: "white",
                border: "1px solid var(--color-cream-dark)",
                color: "var(--color-charcoal)",
              }}
              placeholder="Ketik sesuatu..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button
              className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity flex-shrink-0"
              style={{
                background: "var(--color-gold)",
                color: "white",
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
              onClick={() => send()}
              disabled={loading || !input.trim()}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
