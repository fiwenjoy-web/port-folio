import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";
import { useContent } from "../context/ContentContext";

const SANS = "'Noto Sans Thai', sans-serif";

function useCountUp(target: number, duration = 1800, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = () => {
      start += duration / 60;
      const progress = Math.min(start / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return val;
}

function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const num = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const counted = useCountUp(num, 1600, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col">
      <span
        style={{
          fontFamily: SANS, fontWeight: 800,
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          background: "linear-gradient(135deg, #ffffff 30%, #00d4ff 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1,
        }}
      >
        {counted}{suffix}
      </span>
      <span className="text-xs tracking-widest uppercase mt-1.5" style={{ color: "rgba(255,255,255,0.35)", fontFamily: SANS }}>
        {label}
      </span>
    </div>
  );
}

interface HeroProps {
  onLogoClick?: () => void;
}

export function HeroSection({ onLogoClick }: HeroProps) {
  const { content, t } = useContent();
  const { hero } = content;

  return (
    <section
      style={{ fontFamily: SANS }}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-16 lg:px-24 pt-32 pb-20"
    >
      {/* ── Layered background ── */}

      {/* Base mesh gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 120% 80% at 60% 10%, rgba(0,102,255,0.12) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 10% 80%, rgba(0,212,255,0.09) 0%, transparent 50%)",
      }} />

      {/* Fine dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{
        backgroundImage: "radial-gradient(circle, rgba(0,212,255,0.25) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)",
      }} />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }} />

      {/* Large decorative ring */}
      <div className="absolute pointer-events-none" style={{
        right: "-12vw", top: "8%",
        width: "min(700px, 60vw)", height: "min(700px, 60vw)",
        borderRadius: "50%",
        border: "1px solid rgba(0,212,255,0.08)",
        boxShadow: "inset 0 0 80px rgba(0,212,255,0.04)",
      }} />
      <div className="absolute pointer-events-none" style={{
        right: "-6vw", top: "18%",
        width: "min(500px, 45vw)", height: "min(500px, 45vw)",
        borderRadius: "50%",
        border: "1px solid rgba(0,212,255,0.06)",
      }} />
      {/* Glowing orb inside rings */}
      <div className="absolute pointer-events-none" style={{
        right: "5vw", top: "30%",
        width: 240, height: 240,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,102,255,0.18) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />

      {/* ── Minimal internal nav ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-16 lg:px-24 py-7">
        <motion.button
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="flex items-center gap-2 cursor-pointer select-none bg-transparent border-none p-0 group"
          onClick={onLogoClick}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #00d4ff22, #0066ff22)", border: "1px solid rgba(0,212,255,0.25)" }}>
            <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 11, color: "#00d4ff", letterSpacing: "0.05em" }}>WH</span>
          </div>
          <span className="text-white/50 tracking-widest text-xs uppercase group-hover:text-white/80 transition-colors" style={{ fontFamily: SANS }}>
            Portfolio
          </span>
        </motion.button>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mr-24">
          <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
            style={{ color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.05)", fontFamily: SANS }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            {t(hero.navStatus)}
          </div>
        </motion.div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">

        {/* Role label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-8" style={{ background: "linear-gradient(to right, #00d4ff, transparent)" }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "#00d4ff", fontFamily: SANS }}>
            {t(hero.role)}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: SANS, fontWeight: 800, fontSize: "clamp(3.5rem, 9vw, 8.5rem)", lineHeight: 0.88, letterSpacing: "-0.03em" }}
          className="mb-8"
        >
          <span style={{ color: "#ffffff" }}>WEERP</span>
          <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)", color: "transparent" }}>APON</span>
          <br />
          <span style={{
            background: "linear-gradient(95deg, #ffffff 20%, #48c6ec 60%, #0066ff 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            HAMATHULIN
          </span>
        </motion.h1>

        {/* Bio + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col md:flex-row items-start md:items-end gap-8 max-w-4xl"
        >
          <p className="flex-1 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, maxWidth: 420 }}>
            {t(hero.bio)}
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <a href="mailto:Fusenra@gmail.com"
              className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #0066ff)",
                color: "#000", fontWeight: 700, fontSize: "0.8rem",
                letterSpacing: "0.06em", boxShadow: "0 0 30px rgba(0,212,255,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}>
              <Mail size={14} />
              {t(hero.ctaPrimary)}
            </a>
            <button
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-white/5 hover:scale-[1.03] group"
              style={{ color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.1)", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.06em" }}>
              {t(hero.ctaSecondary)}
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap gap-10 mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {hero.stats.map((stat) => (
            <StatCounter key={stat.value} value={stat.value} label={t(stat.label)} />
          ))}

          {/* Tags inline with stats */}
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            {hero.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full"
                style={{ color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: SANS }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full"
            style={{ background: "#00d4ff" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
