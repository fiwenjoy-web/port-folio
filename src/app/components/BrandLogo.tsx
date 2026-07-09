const BRAND_FONT = "'Kanit', 'Noto Sans Thai', sans-serif";

interface BrandLogoProps {
  size?: number;
  showWordmark?: boolean;
  onClick?: () => void;
  className?: string;
  label?: string;
}

function BrandMark({ size }: { size: number }) {
  const textSize = Math.max(10, Math.round(size * 0.28));

  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(72,198,236,0.14), rgba(72,198,236,0) 68%)",
        }}
      />
      <svg
        viewBox="0 0 46 46"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full"
      >
        <ellipse
          cx="23"
          cy="23"
          rx="20"
          ry="8"
          stroke="#48c6ec"
          strokeWidth="1"
          strokeDasharray="3.5 2.5"
          transform="rotate(-28 23 23)"
          opacity="0.78"
        />
        <ellipse
          cx="23"
          cy="23"
          rx="16"
          ry="6"
          stroke="#48c6ec"
          strokeWidth="0.75"
          transform="rotate(55 23 23)"
          opacity="0.34"
        />
        <circle cx="40" cy="18" r="2.2" fill="#48c6ec" opacity="0.92" />
        <circle cx="23" cy="23" r="3" fill="rgba(72,198,236,0.16)" />
      </svg>
      <span
        className="relative z-10 transition-colors duration-200 group-hover:text-[#48c6ec]"
        style={{ fontFamily: BRAND_FONT, fontWeight: 700, fontSize: textSize, color: "#ffffff", letterSpacing: "0.04em" }}
      >
        WH
      </span>
    </span>
  );
}

function Wordmark() {
  return (
    <span className="flex flex-col justify-center leading-none">
      <span
        style={{ fontFamily: BRAND_FONT, fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.14em", color: "#ffffff" }}
      >
        WEERAPONG
      </span>
      <span
        className="mt-1"
        style={{ fontFamily: BRAND_FONT, fontWeight: 400, fontSize: "0.66rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.46)" }}
      >
        HAMATHULIN
      </span>
    </span>
  );
}

export function BrandLogo({
  size = 46,
  showWordmark = false,
  onClick,
  className = "",
  label = "WH logo",
}: BrandLogoProps) {
  const logoClassName = ["inline-flex items-center gap-3 shrink-0", className].filter(Boolean).join(" ");
  const content = (
    <>
      <BrandMark size={size} />
      {showWordmark ? <Wordmark /> : null}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${logoClassName} group rounded-full border-0 bg-transparent p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#48c6ec]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
        aria-label={label}
      >
        {content}
      </button>
    );
  }

  return (
    <span className={logoClassName} aria-label={label}>
      {content}
    </span>
  );
}
