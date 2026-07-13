import brandLogoUrl from "../../assets/brand-logo.png";
import { useContent } from "../context/ContentContext";

const BRAND_FONT = "'Kanit', 'Noto Sans Thai', sans-serif";

interface BrandLogoProps {
  size?: number;
  showWordmark?: boolean;
  onClick?: () => void;
  className?: string;
  label?: string;
}

function BrandMark({ size, mark }: { size: number; mark: string }) {
  const textSize = Math.max(10, Math.round(size * 0.28));

  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(72,198,236,0.14), rgba(72,198,236,0) 68%)",
        }}
      />
      <img
        src={brandLogoUrl}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute max-w-none select-none"
        style={{ width: size * 1.42, height: size * 1.24, objectFit: "contain", transform: "rotate(-8deg)" }}
      />
      <span
        className="absolute rounded-full"
        style={{ width: size * 0.09, height: size * 0.09, right: size * 0.1, top: size * 0.32, background: "#48c6ec" }}
      />
      <span
        className="absolute rounded-full"
        style={{ width: size * 0.13, height: size * 0.13, background: "rgba(72,198,236,0.16)" }}
      />
      <span
        className="relative z-10 transition-colors duration-200 group-hover:text-[#48c6ec]"
        style={{ fontFamily: BRAND_FONT, fontWeight: 700, fontSize: textSize, color: "#ffffff", letterSpacing: "0.04em" }}
      >
        {mark}
      </span>
    </span>
  );
}

function Wordmark({ firstName, lastName }: { firstName: string; lastName: string }) {
  return (
    <span className="flex flex-col justify-center leading-none">
      <span
        style={{ fontFamily: BRAND_FONT, fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.14em", color: "#ffffff" }}
      >
        {firstName}
      </span>
      <span
        className="mt-1"
        style={{ fontFamily: BRAND_FONT, fontWeight: 400, fontSize: "0.66rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.46)" }}
      >
        {lastName}
      </span>
    </span>
  );
}

export function BrandLogo({
  size = 46,
  showWordmark = false,
  onClick,
  className = "",
  label,
}: BrandLogoProps) {
  const { content, t } = useContent();
  const resolvedLabel = label ?? t(content.brand.logoLabel);
  const logoClassName = ["inline-flex items-center gap-3 shrink-0", className].filter(Boolean).join(" ");
  const logoContent = (
    <>
      <BrandMark size={size} mark={content.brand.mark} />
      {showWordmark ? <Wordmark firstName={content.brand.firstName} lastName={content.brand.lastName} /> : null}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${logoClassName} group rounded-full border-0 bg-transparent p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#48c6ec]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
        aria-label={resolvedLabel}
      >
        {logoContent}
      </button>
    );
  }

  return (
    <span className={logoClassName} role="img" aria-label={resolvedLabel}>
    {logoContent}
    </span>
  );
}
