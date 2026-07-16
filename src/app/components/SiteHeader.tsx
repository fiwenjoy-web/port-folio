import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FileDown, Menu, X } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { BrandLogo } from "./BrandLogo";

const KANIT = "'Kanit', 'Noto Sans Thai', sans-serif";

const NAV_TARGETS = ["about", "services", "experience", "contact"];

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative shrink-0 rounded-full px-4 py-2 text-sm text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48c6ec]/60"
      style={{ fontFamily: KANIT, fontWeight: 400, letterSpacing: 0 }}
    >
      {label}
    </button>
  );
}

function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useContent();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1"
      aria-label="Language"
      role="group"
    >
      {(["en", "th"] as const).map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => setLang(language)}
          aria-pressed={lang === language}
          className={`${compact ? "h-8 min-w-10" : "h-7 min-w-9"} rounded-full px-2 text-[11px] font-medium uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48c6ec]/60`}
          style={{
            background: lang === language ? "#48c6ec" : "transparent",
            color: lang === language ? "#071117" : "rgba(255,255,255,0.5)",
            fontFamily: KANIT,
            letterSpacing: 0,
          }}
        >
          {language}
        </button>
      ))}
    </div>
  );
}

interface SiteHeaderProps {
  onLogoClick?: () => void;
}

export function SiteHeader({ onLogoClick }: SiteHeaderProps) {
  const { content, t } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="pointer-events-none fixed inset-x-4 top-4 z-50 flex justify-center">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto w-full max-w-[860px] md:w-auto"
      >
        <div
          className="flex w-full items-center gap-1 rounded-full p-2 md:w-auto"
          style={{
            background: scrolled ? "rgba(12,12,18,0.84)" : "rgba(18,18,24,0.68)",
            border: `1px solid ${scrolled ? "rgba(255,255,255,0.34)" : "rgba(255,255,255,0.24)"}`,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: scrolled
              ? "0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)"
              : "0 8px 30px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.1)",
            transition: "box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease",
          }}
        >
          <div className="px-1">
            <BrandLogo size={40} onClick={onLogoClick} />
          </div>

          <div className="mx-1 h-5 w-px shrink-0 bg-white/15" />

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
            {content.navigation.links.map((label, index) => (
              index === 2 ? (
                <a
                  key="resume"
                  href={`${import.meta.env.BASE_URL}resume/`}
                  target="_blank"
                  rel="noreferrer"
                  className="relative flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48c6ec]/60"
                  style={{ fontFamily: KANIT, letterSpacing: 0 }}
                >
                  {t(label)} <FileDown size={13} aria-hidden="true" />
                </a>
              ) : (
                <NavLink key={NAV_TARGETS[index]} label={t(label)} onClick={() => scrollTo(NAV_TARGETS[index])} />
              )
            ))}
          </nav>

          <div className="hidden h-5 w-px shrink-0 bg-white/15 md:mx-1 md:block" />

          <button
            type="button"
            onClick={() => scrollTo("portfolio")}
            className="ml-auto flex shrink-0 items-center gap-2 rounded-full bg-[#48c6ec] px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_18px_rgba(72,198,236,0.35)] transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:ml-0 md:px-5"
            style={{ fontFamily: KANIT, letterSpacing: 0 }}
          >
            {t(content.navigation.portfolioLabel)}
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="hidden shrink-0 rounded-full px-4 py-2.5 text-sm font-light text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48c6ec]/60 md:block"
            style={{ fontFamily: KANIT, letterSpacing: 0 }}
          >
            {t(content.navigation.hireLabel)}
          </button>

          <div className="hidden md:block">
            <LanguageSwitch />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48c6ec]/60 md:hidden"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-2xl border border-white/15 bg-[#0c0c12] p-3 shadow-2xl md:hidden"
            >
              <nav className="grid grid-cols-2 gap-1" aria-label="Mobile navigation">
                {content.navigation.links.map((label, index) => (
                  index === 2 ? (
                    <a
                      key="resume"
                      href={`${import.meta.env.BASE_URL}resume/`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm text-white/70 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48c6ec]/60"
                      style={{ fontFamily: KANIT, letterSpacing: 0 }}
                    >
                      {t(label)} <FileDown size={14} aria-hidden="true" />
                    </a>
                  ) : (
                    <button
                      key={NAV_TARGETS[index]}
                      type="button"
                      onClick={() => scrollTo(NAV_TARGETS[index])}
                      className="rounded-xl px-4 py-3 text-left text-sm text-white/70 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48c6ec]/60"
                      style={{ fontFamily: KANIT, letterSpacing: 0 }}
                    >
                      {t(label)}
                    </button>
                  )
                ))}
              </nav>
              <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3">
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className="rounded-full px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
                  style={{ fontFamily: KANIT, letterSpacing: 0 }}
                >
                  {t(content.navigation.hireLabel)}
                </button>
                <LanguageSwitch compact />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
