"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const step = target / (duration / 16);
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
  };

  return { count, start };
}

const facts = [
  { value: 1736,  label: "pesan yang terkirim", sub: "dalam 57 hari" },
  { value: 57,    label: "hari ngobrol", sub: "sejak 1 Feb 2026" },
  { value: 181,   label: "pesan tengah malam", sub: "jam 00–04 WIB" },
];

export default function AgeSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const counters = facts.map((f) => useCountUp(f.value));

  useEffect(() => {
    if (inView) counters.forEach((c) => c.start());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">dari chat kita</p>
          <h2 className="heading-display text-4xl md:text-5xl">
            Dua Bulan{" "}
            <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>Penuh Chat</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              className="card p-8 text-center hover-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
            >
              <div
                className="heading-display mb-2"
                style={{ fontSize: "3.5rem", color: "var(--color-gold)" }}
              >
                {counters[i].count.toLocaleString()}
              </div>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "var(--color-charcoal)" }}
              >
                {fact.label}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--color-muted)" }}
              >
                {fact.sub}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-xs mt-8"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          Sury kirim 1.077 pesan · Zia kirim 659 pesan · Hari tersibuk: 21 Mar (189 pesan)
        </motion.p>
      </div>
    </section>
  );
}
