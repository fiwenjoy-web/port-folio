import { useRef, useState, useLayoutEffect } from "react";
import Frame from "@/imports/Frame66-2/index";

// The Figma frame is authored at a fixed 1440 × 846 canvas with absolute
// positioning, so we render it at intrinsic size and scale it to the container
// width. Measurement is guarded so the frame can never collapse to zero size.
const DESIGN_W = 1440;
const DESIGN_H = 846;

export function HeroFrame66() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setWidth(w);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Fall back to the design width until we have a real measurement, and never
  // scale above 1:1 so the frame stays crisp on large screens.
  const effectiveWidth = width ?? DESIGN_W;
  const scale = Math.min(effectiveWidth, DESIGN_W) / DESIGN_W;

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 pt-28 pb-12">
      <div
        ref={ref}
        className="relative w-full overflow-hidden rounded-[28px] mx-auto max-w-[1440px]"
        style={{
          height: DESIGN_H * scale,
          background: "#ffffff",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.6)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <Frame property1="Default" />
        </div>
      </div>
    </div>
  );
}
