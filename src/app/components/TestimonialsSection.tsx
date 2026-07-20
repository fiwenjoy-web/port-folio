import { motion } from "motion/react";
import { Boxes, Compass, PanelsTopLeft } from "lucide-react";
import { useContent } from "../context/ContentContext";

const SANS = "'Noto Sans Thai', sans-serif";

const STRENGTH_VISUALS = [
  { icon: Compass, accent: "#00d4ff" },
  { icon: Boxes, accent: "#818cf8" },
  { icon: PanelsTopLeft, accent: "#34d399" },
];

export function TestimonialsSection() {
  const { content, lang, t } = useContent();
  const { testimonials } = content;
  const intro = lang === "th"
    ? "จุดแข็ง 3 ด้านที่ผมนำมาใช้กับทีมครีเอทีฟ ตั้งแต่กำหนดทิศทาง ไปจนถึงผลิตและปรับงานให้พร้อมใช้จริงบนหลายแพลตฟอร์ม"
    : "Three strengths I bring to a creative team, from defining the direction to producing and adapting visuals for real platforms.";

  return (
    <section id="strengths" className="relative overflow-hidden px-6 py-28 md:px-16 lg:px-24" style={{ fontFamily: SANS }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 20%, rgba(0,102,255,0.07) 0%, transparent 72%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)", backgroundSize: "42px 42px", maskImage: "linear-gradient(to bottom, transparent, black 28%, black 72%, transparent)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "linear-gradient(to right, #00d4ff, transparent)" }} />
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "#00d4ff" }}>
                {t(testimonials.sectionLabel)}
              </p>
            </div>
            <h2 className="max-w-3xl" style={{ fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", lineHeight: 1.04 }}>
              {t(testimonials.heading1)}{" "}
              <span style={{ background: "linear-gradient(90deg, #00d4ff, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t(testimonials.heading2)}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
            {intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {testimonials.items.map((item, index) => {
            const visual = STRENGTH_VISUALS[index] ?? STRENGTH_VISUALS[0];
            const Icon = visual.icon;
            return (
              <motion.article
                key={`${item.initials}-${index}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl p-7"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))",
                  border: `1px solid ${visual.accent}2e`,
                  boxShadow: "0 22px 60px rgba(0,0,0,0.26)",
                }}
              >
                <div className="mb-10 flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${visual.accent}18`, border: `1px solid ${visual.accent}42` }}
                  >
                    <Icon size={19} color={visual.accent} aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.2em]" style={{ color: visual.accent }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: visual.accent }}>
                  {t(item.role)}
                </p>
                <h3 className="mb-4 text-xl font-bold text-white">{item.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
                  {t(item.quote)}
                </p>

                <div className="mt-auto pt-8">
                  <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${visual.accent}, transparent)` }} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
