import { useState, useEffect } from "react";
import { motion } from "motion/react";

const KANIT = "'Kanit', 'Noto Sans Thai', sans-serif";

const NAV_LINKS = [
  { label: "About", href: "about" },
  { label: "Service", href: "services" },
  { label: "Resume", href: "experience" },
  { label: "Contact", href: "contact" },
];

/* Up-right arrow — recreated from Frame 66's icon (two stroked paths). */
function UpRightArrow({ size = 16, color = "#ffffff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 19.5 19.5" fill="none" className="shrink-0">
      <path d="M1 18.5L18.5 1" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M1 1H18.5V18.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function WHLogo({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center shrink-0 focus:outline-none group"
      style={{ width: 46, height: 46 }}
      aria-label="WH Logo"
    >
      <svg viewBox="0 0 46 46" fill="none" className="absolute inset-0 w-full h-full">
        <ellipse cx="23" cy="23" rx="20" ry="8"
          stroke="#48c6ec" strokeWidth="1" strokeDasharray="3.5 2.5"
          transform="rotate(-28 23 23)" opacity="0.7" />
        <ellipse cx="23" cy="23" rx="16" ry="6"
          stroke="#48c6ec" strokeWidth="0.75"
          transform="rotate(55 23 23)" opacity="0.3" />
        <circle cx="40" cy="18" r="2.2" fill="#48c6ec" opacity="0.9" />
        <circle cx="23" cy="23" r="3" fill="rgba(72,198,236,0.15)" />
      </svg>
      <span className="relative z-10 group-hover:text-[#48c6ec] transition-colors duration-200"
        style={{ fontFamily: KANIT, fontWeight: 500, fontSize: 13, color: "#ffffff", letterSpacing: "0.04em" }}>
        WH
      </span>
    </button>
  );
}

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2 rounded-full text-sm shrink-0 transition-all duration-200"
      style={{
        fontFamily: KANIT,
        fontWeight: 400,
        color: hovered ? "#ffffff" : "rgba(255,255,255,0.72)",
        background: hovered ? "rgba(255,255,255,0.1)" : "transparent",
        letterSpacing: "-0.01em",
        border: "none",
        cursor: "pointer",
      }}
    >
      {hovered && (
        <span className="absolute inset-x-3 bottom-1 h-px rounded"
          style={{ background: "rgba(72,198,236,0.6)" }} />
      )}
      {label}
    </button>
  );
}

interface SiteHeaderProps {
  onLogoClick?: () => void;
}

export function SiteHeader({ onLogoClick }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-[calc(100%-2.5rem)] flex justify-center">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto"
      >
        {/* Frosted-glass capsule — Frame 66 style */}
        <div
          className="flex items-center gap-1 rounded-full"
          style={{
            background: scrolled ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.1)",
            border: scrolled
              ? "2px solid rgba(255,255,255,0.55)"
              : "2px solid rgba(255,255,255,0.4)",
            backdropFilter: "blur(7.5px)",
            WebkitBackdropFilter: "blur(7.5px)",
            boxShadow: scrolled
              ? "0 10px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)"
              : "0 6px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
            padding: "8px",
            transition: "box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease",
          }}
        >
          {/* WH logo */}
          <div className="px-1">
            <WHLogo onClick={onLogoClick} />
          </div>

          <div className="w-px h-5 mx-1 shrink-0" style={{ background: "rgba(255,255,255,0.18)" }} />

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink key={label} label={label} onClick={() => scrollTo(href)} />
            ))}
          </div>

          <div className="hidden md:block w-px h-5 mx-1 shrink-0" style={{ background: "rgba(255,255,255,0.18)" }} />

          {/* Portfolio — solid cyan pill with arrow (Frame 66) */}
          <button
            onClick={() => scrollTo("portfolio")}
            className="flex items-center gap-2 rounded-full shrink-0 transition-all duration-200 hover:scale-[1.03]"
            style={{
              background: "#48c6ec",
              border: "0.5px solid rgba(208,213,221,0.6)",
              padding: "10px 20px",
              boxShadow: "0 4px 18px rgba(72,198,236,0.4)",
            }}
          >
            <span style={{ fontFamily: KANIT, fontWeight: 500, fontSize: 15, color: "#ffffff", letterSpacing: "-0.3px" }}>
              Portfolio
            </span>
            <UpRightArrow size={15} color="#ffffff" />
          </button>

          {/* Hire me — text button (Frame 66) */}
          <button
            onClick={() => scrollTo("contact")}
            className="rounded-full shrink-0 transition-colors duration-200 hover:bg-white/10"
            style={{ padding: "10px 20px" }}
          >
            <span style={{ fontFamily: KANIT, fontWeight: 300, fontSize: 15, color: "#ffffff", letterSpacing: "-0.3px" }}>
              Hire me
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
