"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const photos = [
  { src: "/images/zya/IMG_7570.jpeg", caption: "genuinely the prettiest girl i've ever seen", tags: ["favorite"], real: true },
  { src: "/images/zya/IMG_7573.jpeg", caption: "caught you being gorgeous again, unsurprising", tags: ["memories"], real: true },
  { src: "/images/zya/IMG_7576.jpeg", caption: "yeah i'm down bad. have you seen you?", tags: ["favorite"], real: true },
];

const placeholderColors = ["#F5E6E3", "#FBF4E4", "#E8F0F5"];

export default function GalleryPreview() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [lightbox, setLightbox] = useState<(typeof photos)[number] | null>(null);

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="section-label mb-3">captured moments</p>
            <h2 className="heading-display text-4xl md:text-5xl">Gallery</h2>
          </div>
          <Link
            href="/gallery"
            className="btn-outline self-start md:self-auto flex items-center gap-2"
          >
            View all <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className="relative cursor-pointer overflow-hidden rounded-xl"
              style={{ aspectRatio: i === 0 ? "4/5" : "3/4" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              onClick={() => setLightbox(photo)}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(44,40,40,0.85)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-lg w-full rounded-2xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3]">
                <Image src={lightbox.src} alt={lightbox.caption} fill className="object-cover" />
              </div>
              <button
                className="absolute top-3 right-3 p-2 rounded-full"
                style={{ background: "rgba(255,255,255,0.9)" }}
                onClick={() => setLightbox(null)}
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
