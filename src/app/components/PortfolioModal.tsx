import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, ArrowUpRight, ChevronLeft, ChevronRight, Maximize2,
  Target, Lightbulb, Layers, Sparkles, PackageCheck, BookOpen,
} from "lucide-react";
import { useContent } from "../context/ContentContext";
import type { Project } from "../types";

const MONO = "'Noto Sans Thai', sans-serif";
const SANS = "'Noto Sans Thai', sans-serif";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const CASE_STUDY_UI = {
  en: {
    overview: "01 Project Overview",
    goal: "Problem / Goal",
    concept: "Concept",
    direction: "Creative Direction",
    workflow: "Workflow",
    visualSystem: "Visual System",
    outputs: "06 Final Outputs",
    applications: "Visual applications",
    reflection: "07 Reflection",
  },
  th: {
    overview: "01 ภาพรวมโปรเจกต์",
    goal: "โจทย์ / เป้าหมาย",
    concept: "แนวคิด",
    direction: "ทิศทางครีเอทีฟ",
    workflow: "ขั้นตอนการทำงาน",
    visualSystem: "ระบบภาพ",
    outputs: "06 ผลงานสุดท้าย",
    applications: "การนำไปใช้งาน",
    reflection: "07 สิ่งที่ได้เรียนรู้",
  },
} as const;

export function PortfolioModal({ project, onClose }: Props) {
  const { content, lang, t } = useContent();
  const { portfolio } = content;
  const ui = CASE_STUDY_UI[lang];
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const imageCount = project?.images.length ?? 0;
  const projectContent = project ? portfolio.projects[project.id - 1] : null;
  const caseStudy = projectContent?.caseStudy;
  const activeOutput = activeImageIndex === null ? null : caseStudy?.outputs[activeImageIndex];
  const isActiveOutputAIAssisted = activeOutput?.label.en.toLowerCase().includes("ai-assisted") ?? false;

  useEffect(() => {
    setActiveImageIndex(null);
  }, [project?.id]);

  // Close the image viewer first, then the project modal.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeImageIndex !== null) setActiveImageIndex(null);
        else onClose();
      }

      if (activeImageIndex === null || imageCount < 2) return;
      if (e.key === "ArrowLeft") {
        setActiveImageIndex((current) => current === null ? null : (current - 1 + imageCount) % imageCount);
      }
      if (e.key === "ArrowRight") {
        setActiveImageIndex((current) => current === null ? null : (current + 1) % imageCount);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeImageIndex, imageCount, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 cursor-pointer"
            style={{
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl pointer-events-auto"
              style={{
                background: "rgba(10, 10, 16, 0.97)",
                border: "1px solid rgba(0,212,255,0.15)",
                boxShadow: "0 0 80px rgba(0,212,255,0.12), 0 40px 80px rgba(0,0,0,0.8)",
                fontFamily: "'Noto Sans Thai', sans-serif",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top edge glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)",
                }}
              />

              {/* Header */}
              <div
                className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 md:p-8"
                style={{
                  background: "rgba(10,10,16,0.95)",
                  backdropFilter: "blur(12px)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div>
                  <p
                    className="text-xs tracking-[0.25em] uppercase mb-2"
                    style={{ color: "#00d4ff", fontFamily: "'Noto Sans Thai', sans-serif" }}
                  >
                    {t(project.categoryBT)}
                  </p>
                  <h2
                    id="project-modal-title"
                    className="text-2xl md:text-3xl"
                    style={{ fontWeight: 700, color: "#fff", lineHeight: 1.1 }}
                  >
                    {t(project.titleBT)}
                  </h2>
                  <p
                    className="text-sm mt-2 max-w-lg"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Noto Sans Thai', sans-serif", fontWeight: 300 }}
                  >
                    {project.description}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(0,212,255,0.08)",
                          border: "1px solid rgba(0,212,255,0.2)",
                          color: "#00d4ff",
                          fontFamily: "'Noto Sans Thai', sans-serif",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  aria-label={t(portfolio.closeLabel)}
                  className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.1)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Case study */}
              <div className="p-6 md:p-8">
                {caseStudy && (
                  <div className="mb-8 space-y-6">
                    <section
                      className="grid gap-5 rounded-2xl p-5 md:grid-cols-[1.1fr_0.9fr] md:p-6"
                      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#00d4ff" }}>{ui.overview}</p>
                        <p className="text-base leading-relaxed md:text-lg" style={{ color: "rgba(255,255,255,0.78)", fontWeight: 400 }}>
                          {t(caseStudy.overview)}
                        </p>
                      </div>
                      <div className="rounded-2xl p-4" style={{ background: "rgba(0,212,255,0.055)", border: "1px solid rgba(0,212,255,0.14)" }}>
                        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                          <Target size={16} color="#00d4ff" />
                          {ui.goal}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{t(caseStudy.goal)}</p>
                      </div>
                    </section>

                    <section className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
                      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
                          <Lightbulb size={16} color="#f59e0b" />
                          {ui.concept}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{t(caseStudy.concept)}</p>
                      </div>

                      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
                          <Sparkles size={16} color="#a78bfa" />
                          {ui.direction}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.direction.map((item, index) => (
                            <span key={index} className="rounded-full px-3 py-1.5 text-xs font-semibold"
                              style={{ background: "rgba(167,139,250,0.09)", border: "1px solid rgba(167,139,250,0.22)", color: "#c4b5fd" }}>
                              {t(item)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="mb-5 flex items-center gap-2 text-sm font-bold text-white">
                        <Layers size={16} color="#34d399" />
                        {ui.workflow}
                      </div>
                      <div className="grid gap-3 md:grid-cols-4">
                        {caseStudy.workflow.map((step) => (
                          <div key={step.step} className="rounded-xl p-4" style={{ background: "rgba(52,211,153,0.045)", border: "1px solid rgba(52,211,153,0.11)" }}>
                            <p className="mb-2 text-xs font-black" style={{ color: "#34d399" }}>{step.step}</p>
                            <h4 className="mb-2 text-sm font-bold text-white">{t(step.label)}</h4>
                            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{t(step.desc)}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <div className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
                        <PackageCheck size={16} color="#00d4ff" />
                        {ui.visualSystem}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {caseStudy.visualSystem.map((item, index) => (
                          <div key={index} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <h4 className="mb-2 text-sm font-bold text-white">{t(item.label)}</h4>
                            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{t(item.desc)}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {/* Image grid */}
                {caseStudy && (
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#00d4ff" }}>{ui.outputs}</p>
                      <h3 className="mt-1 text-xl font-bold text-white">{ui.applications}</h3>
                    </div>
                  </div>
                )}
                {/* Main large image */}
                <button
                  type="button"
                  aria-label={`${t(portfolio.viewProjectLabel)}: ${t(project.titleBT)}`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/70"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                  onClick={() => setActiveImageIndex(0)}
                >
                  <img
                    src={project.images[0]}
                    alt={`${project.title} main`}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ maxHeight: "400px" }}
                  />
                  <span
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl opacity-100 transition-transform duration-200 group-hover:scale-110 md:opacity-0 md:group-hover:opacity-100"
                    style={{ background: "rgba(5,8,14,0.78)", border: "1px solid rgba(0,212,255,0.4)", color: "#00d4ff", backdropFilter: "blur(8px)" }}
                  >
                    <Maximize2 size={18} />
                  </span>
                  {caseStudy?.outputs[0] && (
                    <span className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-xl px-4 py-3 text-left"
                      style={{ background: "rgba(5,8,14,0.78)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
                      <b className="block text-sm text-white">{t(caseStudy.outputs[0].label)}</b>
                      <small className="mt-1 block text-xs leading-relaxed text-white/50">{t(caseStudy.outputs[0].desc)}</small>
                    </span>
                  )}
                </button>

                {/* Sub-image grid */}
                {project.images.length > 1 && (
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(project.images.length - 1, 3)}, 1fr)`,
                    }}
                  >
                    {project.images.slice(1).map((img, i) => (
                      <motion.button
                        type="button"
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                        aria-label={`${t(portfolio.viewProjectLabel)}: ${t(project.titleBT)} ${i + 2}`}
                        className="relative rounded-xl overflow-hidden group cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/70"
                        style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                        onClick={() => setActiveImageIndex(i + 1)}
                      >
                        <img
                          src={img}
                          alt={`${project.title} ${i + 2}`}
                          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                          style={{ background: "rgba(0,212,255,0.06)" }}
                        >
                          <Maximize2 size={20} color="#00d4ff" />
                        </div>
                        {caseStudy?.outputs[i + 1] && (
                          <div className="absolute inset-x-0 bottom-0 p-3 text-left"
                            style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.82))" }}>
                            <b className="block text-xs text-white">{t(caseStudy.outputs[i + 1].label)}</b>
                            <small className="mt-0.5 line-clamp-2 block text-[11px] leading-snug text-white/50">{t(caseStudy.outputs[i + 1].desc)}</small>
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}

                {caseStudy && (
                  <section className="mt-8 rounded-2xl p-5" style={{ background: "rgba(0,212,255,0.045)", border: "1px solid rgba(0,212,255,0.12)" }}>
                    <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                      <BookOpen size={16} color="#00d4ff" />
                      {ui.reflection}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{t(caseStudy.reflection)}</p>
                  </section>
                )}

                {/* Footer action */}
                <div
                  className="flex items-center justify-between mt-8 pt-6"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Noto Sans Thai', sans-serif" }}
                  >
                    {project.images.length} {t(portfolio.imagesLabel)}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex(0)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #00d4ff, #0066ff)",
                      color: "#000",
                      fontWeight: 700,
                      fontFamily: "'Noto Sans Thai', sans-serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t(portfolio.viewProjectLabel)}
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {activeImageIndex !== null && project.images[activeImageIndex] && (
              <motion.div
                key="image-viewer"
                role="dialog"
                aria-modal="true"
                aria-label={`${t(portfolio.viewProjectLabel)}: ${t(project.titleBT)}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[70] flex items-center justify-center bg-[#03050a] px-3 pb-52 pt-20 md:px-8 md:pb-44 md:pt-24"
                onClick={() => setActiveImageIndex(null)}
              >
                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 p-4 md:p-6">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{t(project.titleBT)}</p>
                    <p className="text-xs text-white/45">{activeImageIndex + 1} / {imageCount}</p>
                  </div>
                  <button
                    type="button"
                    aria-label={t(portfolio.closeLabel)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/70"
                    style={{ border: "1px solid rgba(255,255,255,0.16)" }}
                    onClick={() => setActiveImageIndex(null)}
                  >
                    <X size={20} />
                  </button>
                </div>

                {imageCount > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-black/55 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/70 md:left-6"
                      style={{ border: "1px solid rgba(255,255,255,0.16)" }}
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveImageIndex((activeImageIndex - 1 + imageCount) % imageCount);
                      }}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-black/55 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/70 md:right-6"
                      style={{ border: "1px solid rgba(255,255,255,0.16)" }}
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveImageIndex((activeImageIndex + 1) % imageCount);
                      }}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                <motion.img
                  key={project.images[activeImageIndex]}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.22 }}
                  src={project.images[activeImageIndex]}
                  alt={`${project.title} ${activeImageIndex + 1}`}
                  className="max-h-[calc(100vh-17rem)] max-w-[94vw] object-contain md:max-h-[calc(100vh-15rem)] md:max-w-[88vw]"
                  onClick={(event) => event.stopPropagation()}
                />

                {activeOutput && (
                  <motion.div
                    key={`caption-${activeImageIndex}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    className="absolute inset-x-3 bottom-3 mx-auto max-w-3xl rounded-lg p-4 text-left md:bottom-6 md:p-5"
                    style={{
                      background: "rgba(7,10,16,0.92)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      backdropFilter: "blur(14px)",
                      boxShadow: "0 16px 50px rgba(0,0,0,0.42)",
                    }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold tracking-[0.18em] text-white/45">
                        {String(activeImageIndex + 1).padStart(2, "0")} / {String(imageCount).padStart(2, "0")}
                      </span>
                      {isActiveOutputAIAssisted && (
                        <span
                          className="rounded-full px-2.5 py-1 text-[10px] font-black tracking-[0.14em]"
                          style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.38)", color: "#62e6ff" }}
                        >
                          AI-ASSISTED
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white md:text-base">{t(activeOutput.label)}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/60 md:text-sm">{t(activeOutput.desc)}</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
