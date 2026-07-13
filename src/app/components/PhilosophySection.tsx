import { motion } from "motion/react";
import { Lightbulb, Zap, Layers, Target } from "lucide-react";
import { useContent } from "../context/ContentContext";

const SANS = "'Noto Sans Thai', sans-serif";

const PRINCIPLE_VISUALS = [
  { icon: Lightbulb, accent: "#00d4ff" },
  { icon: Zap, accent: "#818cf8" },
  { icon: Layers, accent: "#f59e0b" },
  { icon: Target, accent: "#34d399" },
];

export function PhilosophySection() {
  const { content, t } = useContent();
  const { philosophy } = content;

  return (
    <section className="relative py-28 px-6 md:px-16 lg:px-24 overflow-hidden" style={{ fontFamily: SANS }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 30% 30%, rgba(0,212,255,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "linear-gradient(to right, #00d4ff, transparent)" }} />
              <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "#00d4ff" }}>
                {t(philosophy.sectionLabel)}
              </p>
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              {t(philosophy.heading1)}{" "}
              <span style={{ background: "linear-gradient(90deg, #00d4ff, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t(philosophy.heading2)}
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
              {t(philosophy.intro)}
            </p>
          </motion.div>

          {/* Right — principle grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {philosophy.principles.map((principle, i) => {
              const visual = PRINCIPLE_VISUALS[i];
              const Icon = visual.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative p-6 rounded-2xl transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${visual.accent}1f` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${visual.accent}16`, border: `1px solid ${visual.accent}35` }}>
                    <Icon size={19} color={visual.accent} />
                  </div>
                  <h3 className="text-lg mb-2" style={{ fontWeight: 700, color: "#fff" }}>{t(principle.title)}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>{t(principle.description)}</p>
                  <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${visual.accent}, transparent)` }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
