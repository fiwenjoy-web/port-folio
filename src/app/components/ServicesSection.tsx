import { motion } from "motion/react";
import { Sparkles, Box, ShoppingBag, Globe, ArrowUpRight, Megaphone, Workflow } from "lucide-react";
import { useContent } from "../context/ContentContext";

const SANS = "'Noto Sans Thai', sans-serif";
const ICONS = [Sparkles, Box, ShoppingBag, Globe, Megaphone, Workflow];
const COLORS = ["#00d4ff", "#818cf8", "#f59e0b", "#34d399", "#fb7185", "#a78bfa"];

export function ServicesSection() {
  const { content, t } = useContent();
  const { services } = content;

  return (
    <section className="relative py-28 px-6 md:px-16 lg:px-24 overflow-hidden" style={{ fontFamily: SANS }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,102,255,0.03) 50%, transparent 100%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "linear-gradient(to right, #00d4ff, transparent)" }} />
              <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "#00d4ff", fontFamily: SANS }}>
                {t(services.sectionLabel)}
              </p>
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", letterSpacing: "-0.02em" }}>
              {t(services.heading1)}{" "}
              <span style={{ background: "linear-gradient(90deg, #00d4ff, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t(services.heading2)}
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: "rgba(255,255,255,0.48)", fontWeight: 400 }}>
              {t(services.description)}
            </p>
          </div>
          <a href="#portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105 shrink-0"
            style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)", color: "#00d4ff", letterSpacing: "0.05em" }}>
            {t(services.quoteLabel)} <ArrowUpRight size={14} />
          </a>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.items.map((svc, i) => {
            const Icon = ICONS[i];
            const color = COLORS[i];
            const tags = services.tags[i] || [];
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col gap-5 rounded-2xl cursor-default overflow-hidden"
                style={{ padding: "1px", background: `linear-gradient(145deg, ${color}30, rgba(255,255,255,0.04) 50%, transparent)` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `linear-gradient(145deg, ${color}55, rgba(255,255,255,0.07) 50%, ${color}20)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `linear-gradient(145deg, ${color}30, rgba(255,255,255,0.04) 50%, transparent)`;
                }}
              >
                {/* Inner card */}
                <div className="flex flex-col gap-5 h-full rounded-[14px] p-6"
                  style={{ background: "rgba(8,8,14,0.95)", transition: "background 0.3s" }}>

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}14`, border: `1px solid ${color}30`, boxShadow: `0 0 20px ${color}18` }}>
                    <Icon size={20} color={color} />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">{t(svc.title)}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)", fontWeight: 400 }}>{t(svc.desc)}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: `${color}10`, color, border: `1px solid ${color}22`, fontFamily: SANS }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className="text-xs font-bold uppercase" style={{ color, letterSpacing: "0.08em" }}>Capability {String(i + 1).padStart(2, "0")}</span>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0"
                      style={{ background: `${color}20` }}>
                      <ArrowUpRight size={13} color={color} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Process timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 p-8 md:p-10 rounded-2xl relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Top glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)" }} />

          <p className="text-xs tracking-[0.25em] uppercase mb-8 text-center" style={{ color: "rgba(255,255,255,0.3)", fontFamily: SANS }}>
            {t(services.processTitle)}
          </p>
          <h3 className="mb-8 text-center text-2xl font-bold text-white md:text-3xl" style={{ fontFamily: SANS, letterSpacing: 0 }}>
            {t(services.workflowHeading)}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            {/* connecting line */}
            <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px"
              style={{ background: "linear-gradient(90deg, rgba(0,212,255,0.3), rgba(0,102,255,0.2), rgba(0,212,255,0.1))" }} />

            {services.steps.map((s, si) => (
              <motion.div key={s.step}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + si * 0.1 }}
                className="flex flex-col items-center text-center relative">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 relative z-10"
                  style={{
                    background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)",
                    fontFamily: SANS, fontWeight: 800, fontSize: 14,
                    color: "#00d4ff",
                    boxShadow: "0 0 20px rgba(0,212,255,0.12)",
                  }}>
                  {s.step}
                </div>
                <p className="text-sm font-bold text-white mb-1">{t(s.label)}</p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>{t(s.desc)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
