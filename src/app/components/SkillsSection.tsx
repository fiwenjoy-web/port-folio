import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useContent } from "../context/ContentContext";

const SANS = "'Noto Sans Thai', sans-serif";

const tools = [
  { abbr: "Ps", name: "Photoshop", color: "#31A8FF" },
  { abbr: "Ai", name: "Illustrator", color: "#FF9A00" },
  { abbr: "Pr", name: "Premiere", color: "#9999FF" },
  { abbr: "Ae", name: "After FX", color: "#9999FF" },
  { abbr: "XD", name: "Adobe XD", color: "#FF61F6" },
  { abbr: "Bl", name: "Blender", color: "#E87D0D" },
  { abbr: "VS", name: "VS Code", color: "#007ACC" },
  { abbr: "Fig", name: "Figma", color: "#F24E1E" },
];

const proficiency = [
  { skill: { en: "Visual Design", th: "การออกแบบภาพ" }, pct: 95 },
  { skill: { en: "AI Production", th: "การผลิตด้วย AI" }, pct: 90 },
  { skill: { en: "3D Rendering", th: "การเรนเดอร์ 3D" }, pct: 78 },
  { skill: { en: "Motion Design", th: "การออกแบบโมชั่น" }, pct: 82 },
];

function CircleRing({ pct, color = "#00d4ff", size = 80, stroke = 5 }: { pct: number; color?: string; size?: number; stroke?: number }) {
  const ref = useRef<SVGCircleElement>(null);
  const [animated, setAnimated] = useState(false);
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - (animated ? pct / 100 : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
      {/* Track */}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
      {/* Progress */}
      <circle
        ref={ref}
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)", filter: `drop-shadow(0 0 6px ${color}88)` }}
      />
    </svg>
  );
}

export function SkillsSection() {
  const { content, t } = useContent();
  const { skills } = content;

  return (
    <section className="relative py-28 px-6 md:px-16 lg:px-24 overflow-hidden" style={{ fontFamily: SANS }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,212,255,0.035) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "linear-gradient(to right, #00d4ff, transparent)" }} />
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "#00d4ff", fontFamily: SANS }}>
              {t(skills.sectionLabel)}
            </p>
          </div>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", letterSpacing: "-0.02em" }}>
            {t(skills.heading1)}{" "}
            <span style={{ background: "linear-gradient(90deg, #00d4ff, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t(skills.heading2)}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Focus items */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs tracking-[0.25em] uppercase mb-8" style={{ color: "rgba(255,255,255,0.3)", fontFamily: SANS }}>
              {t(skills.focusTitle)}
            </p>
            <div className="flex flex-col gap-2">
              {skills.focusItems.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group flex items-center gap-4 p-5 rounded-2xl cursor-default transition-all duration-300"
                  style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(0,212,255,0.25)";
                    el.style.background = "rgba(0,212,255,0.04)";
                    el.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.05)";
                    el.style.background = "rgba(255,255,255,0.02)";
                    el.style.transform = "";
                  }}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "#00d4ff", boxShadow: "0 0 10px rgba(0,212,255,0.9)" }} />
                  <span className="text-sm flex-1" style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{t(item)}</span>
                  <div className="w-0 group-hover:w-8 h-px transition-all duration-400 overflow-hidden"
                    style={{ background: "linear-gradient(to right, #00d4ff, transparent)" }} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools + Circular proficiency */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            {/* Tool grid */}
            <p className="text-xs tracking-[0.25em] uppercase mb-8" style={{ color: "rgba(255,255,255,0.3)", fontFamily: SANS }}>
              {t(skills.toolsTitle)}
            </p>
            <div className="grid grid-cols-4 gap-3 mb-12">
              {tools.map((tool, i) => (
                <motion.div key={tool.abbr}
                  initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -4, scale: 1.06 }}
                  className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl cursor-default transition-all duration-200"
                  style={{ background: `${tool.color}0d`, border: `1px solid ${tool.color}22` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${tool.color}20`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                  <span style={{ fontWeight: 800, color: tool.color, fontFamily: SANS, fontSize: 18, lineHeight: 1 }}>{tool.abbr}</span>
                  <span className="text-xs text-center leading-tight" style={{ color: "rgba(255,255,255,0.38)", fontFamily: SANS }}>{tool.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Circular progress rings */}
            <p className="text-xs tracking-[0.25em] uppercase mb-8" style={{ color: "rgba(255,255,255,0.3)", fontFamily: SANS }}>
              {t(skills.proficiencyTitle)}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {proficiency.map((item, i) => {
                const colors = ["#00d4ff", "#48c6ec", "#0066ff", "#00d4ff"];
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="relative shrink-0" style={{ width: 64, height: 64 }}>
                      <CircleRing pct={item.pct} color={colors[i]} size={64} stroke={4} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 11, color: colors[i] }}>{item.pct}%</span>
                      </div>
                    </div>
                    <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{t(item.skill)}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
