import { useContent } from "../context/ContentContext";

const SANS = "'Noto Sans Thai', sans-serif";

export function MarqueeStrip() {
  const { content, t, reduceMotion } = useContent();
  const words = content.marquee.items.map(t);
  // Duplicate for seamless loop
  const loop = [...words, ...words];

  return (
    <div
      className="relative mt-8 overflow-hidden py-6 select-none md:mt-10"
      style={{
        fontFamily: SANS,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "linear-gradient(90deg, rgba(0,212,255,0.03), rgba(0,102,255,0.03))",
      }}
    >
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #06060a, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, #06060a, transparent)" }} />

      <div className="marquee-track flex items-center gap-8 whitespace-nowrap" style={{ animation: reduceMotion ? "none" : undefined }}>
        {loop.map((word, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span
              className="uppercase tracking-wide"
              style={{
                fontFamily: SANS, fontWeight: 700,
                fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)",
                color: i % 2 === 0 ? "rgba(255,255,255,0.85)" : "transparent",
                WebkitTextStroke: i % 2 === 0 ? "0" : "1px rgba(255,255,255,0.25)",
              }}
            >
              {word}
            </span>
            <span className="shrink-0" style={{ color: "#48c6ec", fontSize: "1.2rem" }}>✦</span>
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          width: max-content;
          animation: marquee-scroll 32s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
