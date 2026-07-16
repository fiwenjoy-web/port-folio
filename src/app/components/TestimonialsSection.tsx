import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers3, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "../context/ContentContext";

const SANS = "'Noto Sans Thai', sans-serif";

const TESTIMONIAL_ACCENTS = ["#00d4ff", "#818cf8", "#34d399"];

export function TestimonialsSection() {
  const { content, t } = useContent();
  const { testimonials } = content;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex((next + testimonials.items.length) % testimonials.items.length);
  }, [index, testimonials.items.length]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.items.length]);

  const active = testimonials.items[index];
  const activeAccent = TESTIMONIAL_ACCENTS[index];

  return (
    <section className="relative py-28 px-6 md:px-16 lg:px-24 overflow-hidden" style={{ fontFamily: SANS }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,102,255,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "linear-gradient(to right, transparent, #00d4ff)" }} />
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "#00d4ff", fontFamily: SANS }}>
              {t(testimonials.sectionLabel)}
            </p>
            <div className="h-px w-8" style={{ background: "linear-gradient(to right, #00d4ff, transparent)" }} />
          </div>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", letterSpacing: "-0.02em" }}>
            {t(testimonials.heading1)}{" "}
            <span style={{ background: "linear-gradient(90deg, #00d4ff, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t(testimonials.heading2)}
            </span>
          </h2>
        </motion.div>

        {/* Card */}
        <div className="relative min-h-[280px] md:min-h-[240px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 md:p-12 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${activeAccent}22`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
              }}
            >
              {/* Profile strength glyph */}
              <div className="absolute -top-5 left-8 w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: activeAccent, boxShadow: `0 8px 24px ${activeAccent}55` }}>
                <Layers3 size={18} color="#000" />
              </div>

              <p className="mb-5 mt-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: activeAccent }}>
                Professional strength {String(index + 1).padStart(2, "0")}
              </p>

              {/* Quote text */}
              <p className="text-lg md:text-xl leading-relaxed mb-8"
                style={{ color: "rgba(255,255,255,0.82)", fontWeight: 400 }}>
                {t(active.quote)}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${activeAccent}18`, border: `1px solid ${activeAccent}40`, color: activeAccent, fontWeight: 700, fontSize: 15 }}>
                  {active.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{active.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{t(active.role)}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button onClick={() => go(index - 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
            aria-label="Previous">
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.items.map((_, i) => (
              <button key={i} onClick={() => go(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 24 : 8,
                  height: 8,
                  background: i === index ? "#00d4ff" : "rgba(255,255,255,0.2)",
                  boxShadow: i === index ? "0 0 10px rgba(0,212,255,0.6)" : "none",
                }}
                aria-label={`Go to professional strength ${i + 1}`} />
            ))}
          </div>

          <button onClick={() => go(index + 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
            aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
