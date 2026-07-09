import { motion } from "motion/react";
import { Lightbulb, Zap, Layers, Target } from "lucide-react";
import { useContent } from "../context/ContentContext";
import type { BT } from "../data/siteContent";

const SANS = "'Noto Sans Thai', sans-serif";

type Principle = {
  icon: typeof Lightbulb;
  title: BT;
  desc: BT;
  accent: string;
};

const PRINCIPLES: Principle[] = [
  {
    icon: Lightbulb,
    title: { en: "Concept First", th: "แนวคิดมาก่อน" },
    desc: {
      en: "Every visual starts with a strong idea. Aesthetics follow strategy, never the other way around.",
      th: "ทุกภาพเริ่มจากไอเดียที่แข็งแรง ความสวยงามตามหลังกลยุทธ์เสมอ",
    },
    accent: "#00d4ff",
  },
  {
    icon: Zap,
    title: { en: "AI-Accelerated", th: "เร่งด้วย AI" },
    desc: {
      en: "Blending human craft with AI workflows to deliver faster without sacrificing quality.",
      th: "ผสานฝีมือมนุษย์กับขั้นตอน AI เพื่อส่งงานเร็วขึ้นโดยไม่ลดคุณภาพ",
    },
    accent: "#818cf8",
  },
  {
    icon: Layers,
    title: { en: "Detail Obsessed", th: "ใส่ใจรายละเอียด" },
    desc: {
      en: "From lighting to pixel-level finishing — the small things make commercial work shine.",
      th: "ตั้งแต่การจัดแสงจนถึงการเก็บงานระดับพิกเซล รายละเอียดเล็กๆ ทำให้งานโดดเด่น",
    },
    accent: "#f59e0b",
  },
  {
    icon: Target,
    title: { en: "Results Driven", th: "มุ่งผลลัพธ์" },
    desc: {
      en: "Design that performs. Visuals built to convert, engage, and elevate the brand.",
      th: "ดีไซน์ที่ได้ผลจริง ภาพที่สร้างมาเพื่อเปลี่ยนยอดขาย สร้างการมีส่วนร่วม และยกระดับแบรนด์",
    },
    accent: "#34d399",
  },
];

export function PhilosophySection() {
  const { t } = useContent();

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
                {t({ en: "PHILOSOPHY", th: "แนวคิด" })}
              </p>
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              {t({ en: "How I", th: "หลักการ" })}{" "}
              <span style={{ background: "linear-gradient(90deg, #00d4ff, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t({ en: "approach work", th: "การทำงาน" })}
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
              {t({
                en: "A blend of commercial instinct and technical craft. I treat every project as a partnership — obsessing over the details that turn good visuals into results.",
                th: "การผสมผสานระหว่างสัญชาตญาณเชิงพาณิชย์และงานฝีมือเชิงเทคนิค ฉันมองทุกโปรเจกต์เป็นความร่วมมือ และใส่ใจในรายละเอียดที่เปลี่ยนภาพที่ดีให้กลายเป็นผลลัพธ์",
              })}
            </p>
          </motion.div>

          {/* Right — principle grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative p-6 rounded-2xl transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${p.accent}1f` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${p.accent}16`, border: `1px solid ${p.accent}35` }}>
                    <Icon size={19} color={p.accent} />
                  </div>
                  <h3 className="text-lg mb-2" style={{ fontWeight: 700, color: "#fff" }}>{t(p.title)}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>{t(p.desc)}</p>
                  <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
