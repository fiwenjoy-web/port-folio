import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight, ExternalLink } from "lucide-react";
import { useContent } from "../context/ContentContext";
import type { Project } from "../types";

const MONO = "'Noto Sans Thai', sans-serif";
const SANS = "'Noto Sans Thai', sans-serif";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function PortfolioModal({ project, onClose }: Props) {
  const { t } = useContent();
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

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
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl pointer-events-auto"
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
                    {project.category}
                  </p>
                  <h2
                    className="text-2xl md:text-3xl"
                    style={{ fontWeight: 700, color: "#fff", lineHeight: 1.1 }}
                  >
                    {project.title}
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

              {/* Image grid */}
              <div className="p-6 md:p-8">
                {/* Main large image */}
                <div className="rounded-2xl overflow-hidden mb-4" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                  <img
                    src={project.images[0]}
                    alt={`${project.title} main`}
                    className="w-full object-cover"
                    style={{ maxHeight: "400px" }}
                  />
                </div>

                {/* Sub-image grid */}
                {project.images.length > 1 && (
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(project.images.length - 1, 3)}, 1fr)`,
                    }}
                  >
                    {project.images.slice(1).map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                        className="relative rounded-xl overflow-hidden group cursor-zoom-in"
                        style={{ border: "1px solid rgba(255,255,255,0.06)" }}
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
                          <ExternalLink size={20} color="#00d4ff" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
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
                    {project.images.length} IMAGES IN THIS PROJECT
                  </p>
                  <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #00d4ff, #0066ff)",
                      color: "#000",
                      fontWeight: 700,
                      fontFamily: "'Noto Sans Thai', sans-serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    VIEW FULL PROJECT
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
