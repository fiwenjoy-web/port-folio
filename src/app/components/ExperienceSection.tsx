import { motion } from "motion/react";
import { useContent } from "../context/ContentContext";

const MONO = "'Noto Sans Thai', sans-serif";
const SANS = "'Noto Sans Thai', sans-serif";
const JOB_ACCENTS = ["#00d4ff", "#0066ff"];

export function ExperienceSection() {
  const { content, t } = useContent();
  const { experience } = content;

  return (
    <section className="relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden" style={{ fontFamily: SANS }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,212,255,0.02) 50%, transparent 100%)" }} />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 16%, black 82%, transparent)",
          maskImage: "linear-gradient(to bottom, transparent, black 16%, black 82%, transparent)",
        }}
      />
      <div aria-hidden="true" className="absolute right-8 top-24 hidden h-20 w-20 pointer-events-none md:block">
        <div className="absolute right-0 top-0 h-px w-full" style={{ background: "linear-gradient(to left, rgba(0,212,255,0.45), transparent)" }} />
        <div className="absolute right-0 top-0 h-full w-px" style={{ background: "linear-gradient(to bottom, rgba(0,212,255,0.45), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "linear-gradient(to right, #00d4ff, transparent)" }} />
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "#00d4ff", fontFamily: MONO }}>
              {t(experience.sectionLabel)}
            </p>
          </div>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", letterSpacing: "-0.02em" }}>
            {t(experience.heading1)}{" "}
            <span style={{ background: "linear-gradient(90deg, #00d4ff, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t(experience.heading2)}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2 relative">
            <div className="absolute left-4 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, #00d4ff33, #0066ff22, transparent)" }} />
            <div aria-hidden="true" className="absolute left-4 top-4 bottom-4 flex -translate-x-1/2 flex-col justify-around">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="block h-px w-2" style={{ background: i % 2 === 0 ? "rgba(0,212,255,0.35)" : "rgba(0,102,255,0.24)" }} />
              ))}
            </div>

            <div className="flex flex-col gap-10">
              {experience.jobs.map((job, i) => {
                const accent = JOB_ACCENTS[i] ?? "#00d4ff";
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="pl-12 relative">
                    <div className="absolute left-2 top-1.5 w-4 h-4 rounded-full border-2 -translate-x-1/2"
                      style={{ background: accent, borderColor: accent, boxShadow: `0 0 12px ${accent}88` }} />
                    <div aria-hidden="true" className="absolute left-4 top-[13px] h-px w-8" style={{ background: `linear-gradient(to right, ${accent}88, ${accent}22)` }} />
                    <div
                      className="relative overflow-hidden p-6 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: `1px solid ${accent}22`,
                        boxShadow: "0 18px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.025)",
                      }}
                    >
                      <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}70, transparent)` }} />
                      <div aria-hidden="true" className="absolute right-4 top-4 h-2.5 w-2.5 border-r border-t" style={{ borderColor: `${accent}55` }} />
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-lg mb-0.5" style={{ fontWeight: 700, color: "#fff" }}>{job.company}</h3>
                          <p className="text-sm" style={{ color: accent, fontWeight: 600 }}>{t(job.role)}</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full shrink-0"
                          style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}30`, fontFamily: MONO }}>
                          {job.period}
                        </span>
                      </div>
                      {job.bullets.length > 0 && (
                        <ul className="mt-4 flex flex-col gap-2">
                          {job.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-3">
                              <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: accent }} />
                              <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
                                {t(b)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-8">
            {/* Education */}
            {experience.education.map((edu, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="relative overflow-hidden p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(147,51,234,0.22)", boxShadow: "0 18px 60px rgba(0,0,0,0.2)" }}>
                <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(147,51,234,0.65), transparent)" }} />
                <div aria-hidden="true" className="absolute right-4 top-4 h-2.5 w-2.5 border-r border-t border-purple-500/40" />
                <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#9333ea", fontFamily: MONO }}>
                  {t(experience.heading2).toUpperCase()}
                </p>
                <h3 className="text-xl mb-1" style={{ fontWeight: 700, color: "#fff" }}>{edu.school}</h3>
                <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>{t(edu.degree)}</p>
                <span className="text-xs px-3 py-1 rounded-full"
                  style={{ background: "rgba(147,51,234,0.14)", color: "#9333ea", border: "1px solid rgba(147,51,234,0.3)", fontFamily: MONO }}>
                  {edu.period}
                </span>
              </motion.div>
            ))}

            {/* At a glance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="relative overflow-hidden p-6 rounded-2xl"
              style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.07) 0%, rgba(0,102,255,0.05) 100%)", border: "1px solid rgba(0,212,255,0.15)", boxShadow: "0 18px 60px rgba(0,0,0,0.2)" }}>
              <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.65), transparent)" }} />
              <div aria-hidden="true" className="absolute right-4 top-4 h-2.5 w-2.5 border-r border-t border-cyan-400/40" />
              <p className="text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "#00d4ff", fontFamily: MONO }}>
                {t(experience.glanceTitle)}
              </p>
              {experience.glanceItems.map((item, i) => (
                <div key={i} className="flex justify-between py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: MONO }}>{t(item.label)}</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{t(item.value)}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
