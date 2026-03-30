"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Link from "next/link";

const moments: { date: string; title: string; desc: string; secret?: boolean }[] = [
  {
    date: "1 Feb 2026",
    title: "Pesan Pertama",
    desc: "\"Ih lucu bgtsi.\" Dari Jakarta ke Mataram, begitu aja dimulai. Casual. Ga ada rencana.",
  },
  {
    date: "1–2 Feb 2026",
    title: "Kenalan",
    desc: "\"Mataram tu NTB?\" — \"Iyaa di ntb\" — \"Jauh sekali kitaaa 😭\". Jarak bukan halangan, katanya.",
  },
  {
    date: "2 Feb 2026",
    title: "Korea & Drakor",
    desc: "Ngobrolin drakor, dracin, kpop sampai tengah malem. Ternyata banyak yang nyambung.",
  },
  {
    date: "15 Feb 2026",
    title: "Valentine",
    desc: "\"Dapet hikmah 😭\" — katanya soal Valentine. Terus Sury tanya, \"kalo ak mau kasi sesuatu bole ga?\"",
    secret: true,
  },
  {
    date: "3 Mar 2026",
    title: "Miss Your Voice",
    desc: "\"Ak tdk baik baik saja... karna tdk bisa mendengar suara km lagi.\" — \"Mau suara monyet aja?\"",
  },
  {
    date: "30 Mar 2026",
    title: "Happy Birthday, Zia 🎂",
    desc: "Dan sekarang di sini. Dua bulan, banyak chat, dan website ini. \"Filter or not, you're the prettiest.\"",
  },
];

export default function OurStory() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-4">from the beginning</p>
          <h2 className="heading-display text-4xl md:text-5xl">
            Our{" "}
            <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>Story</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--color-gold-light), transparent)",
              transform: "translateX(-50%)",
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10">
            {moments.map((moment, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={moment.date}
                  className={`relative flex items-start gap-3 md:gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  {/* Dot */}
                  <div
                    className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2"
                    style={{
                      background: "var(--color-cream)",
                      borderColor: "var(--color-gold)",
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "var(--color-gold)" }}
                    />
                  </div>

                  {/* Content */}
                  {moment.secret ? (
                    <Link
                      href="/valentine"
                      className={`card p-5 flex-1 block hover-lift ${
                        isLeft ? "md:mr-[calc(50%+2rem)] md:ml-0" : "md:ml-[calc(50%+2rem)] md:mr-0"
                      } ml-0`}
                      style={{
                        border: "1.5px dashed var(--color-rose)",
                        position: "relative",
                        textDecoration: "none",
                      }}
                    >
                      {/* Click me badge */}
                      <span
                        className="absolute -top-3 -right-2 text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: "var(--color-rose)",
                          color: "white",
                          letterSpacing: "0.04em",
                          boxShadow: "0 2px 8px rgba(196,132,122,0.4)",
                        }}
                      >
                        tap me 🌹
                      </span>
                      <p className="section-label mb-2" style={{ color: "var(--color-rose)" }}>
                        {moment.date}
                      </p>
                      <h3
                        className="heading-display text-xl mb-2"
                        style={{ color: "var(--color-charcoal)" }}
                      >
                        {moment.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-charcoal-light)" }}
                      >
                        {moment.desc}
                      </p>
                    </Link>
                  ) : (
                    <div
                      className={`card p-5 flex-1 ${
                        isLeft ? "md:mr-[calc(50%+2rem)] md:ml-0" : "md:ml-[calc(50%+2rem)] md:mr-0"
                      } ml-0`}
                    >
                      <p className="section-label mb-2">{moment.date}</p>
                      <h3
                        className="heading-display text-xl mb-2"
                        style={{ color: "var(--color-charcoal)" }}
                      >
                        {moment.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-charcoal-light)" }}
                      >
                        {moment.desc}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
