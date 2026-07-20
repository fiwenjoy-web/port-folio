import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ChevronUp } from "lucide-react";
import { useContent } from "../context/ContentContext";

export function FloatingCTA() {
  const { content, lang, t, reduceMotion } = useContent();
  const [visible, setVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 300);
      setShowScrollTop(window.scrollY > 800);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="floating"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3"
          style={{ fontFamily: "'Noto Sans Thai', sans-serif" }}
        >
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                key="scroll-top"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
                aria-label={lang === "th" ? "กลับขึ้นด้านบน" : "Scroll to top"}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <ChevronUp size={18} />
              </motion.button>
            )}
          </AnimatePresence>

          <a
            href={`mailto:${content.footer.email}`}
            className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #0066ff)",
              color: "#000",
              letterSpacing: "0.06em",
              boxShadow: "0 4px 30px rgba(0,212,255,0.35)",
            }}
          >
            <Mail size={15} />
            {t(content.navigation.hireLabel)}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
