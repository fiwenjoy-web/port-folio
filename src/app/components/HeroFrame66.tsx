import { lazy, Suspense, useEffect, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Layers3, Mail } from "lucide-react";
import { useContent } from "../context/ContentContext";
import portraitUrl from "../../assets/portrait.webp";

const DotLottieHero = lazy(() => import("./DotLottieHero").then(({ DotLottieHero: Component }) => ({ default: Component })));
const DESIGN_W = 1440;
const DESIGN_H = 846;
const KANIT = "'Kanit', 'Noto Sans Thai', sans-serif";
const URBANIST = "'Urbanist', 'Noto Sans Thai', sans-serif";

function useDesktopLayout() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 768px)").matches);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}

function DesktopHero() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const lightOpacity = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 150, damping: 24, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 150, damping: 24, mass: 0.35 });
  const smoothLightOpacity = useSpring(lightOpacity, { stiffness: 180, damping: 26 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [1.1, -1.1]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-1.35, 1.35]);
  const lightX = useTransform(smoothX, [-0.5, 0.5], [28, 72]);
  const lightY = useTransform(smoothY, [-0.5, 0.5], [24, 76]);
  const interactiveLight = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgba(72, 198, 236, 0.16) 0%, rgba(72, 198, 236, 0.05) 22%, transparent 48%)`;

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    lightOpacity.set(1);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
    lightOpacity.set(0);
  };

  return (
    <div className="hidden min-h-svh w-full items-start justify-center px-4 pb-0 pt-24 md:flex lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        className="relative w-full overflow-hidden rounded-[28px]"
        style={{
          maxWidth: "min(1440px, calc(170.213svh - 10.213rem))",
          aspectRatio: `${DESIGN_W} / ${DESIGN_H}`,
          background: "#ffffff",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.6)",
          border: "1px solid rgba(255,255,255,0.08)",
          containerType: "inline-size",
          transformPerspective: 1600,
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
        }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20"
          style={{ background: interactiveLight, opacity: reduceMotion ? 0 : smoothLightOpacity }}
        />
        <Suspense fallback={<DesktopHeroFallback />}>
          <DotLottieHero />
        </Suspense>
        <DesktopHeroContent />
      </motion.div>
    </div>
  );
}

function DesktopHeroContent() {
  const { content, t } = useContent();
  const { hero } = content;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 text-[#171717]" style={{ fontFamily: KANIT }}>
      <div
        aria-hidden="true"
        className="absolute inset-x-[18%] top-[7%] h-[26%]"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 52%, transparent 78%)" }}
      />
      <p className="absolute left-1/2 top-[6%] -translate-x-1/2 rounded-full border border-[#171717] bg-white px-[1.5cqw] py-[0.45cqw] text-[clamp(0.65rem,0.95cqw,0.9rem)]">
        {t(hero.greeting)}
      </p>
      <h1
        className="absolute inset-x-[20%] top-[12.5%] text-center font-bold"
        style={{ fontFamily: URBANIST, fontSize: "clamp(3rem, 5.9cqw, 5.3rem)", lineHeight: 0.95, letterSpacing: 0 }}
      >
        {t(hero.introPrefix)} <span className="text-[#48c6ec]">{hero.displayName}</span>
        <br />
        {t(hero.title)}
      </h1>

      <div className="absolute left-[5%] top-[43%] w-[25%]">
        <div>
          <Layers3 size={32} color="#344054" aria-hidden="true" />
          <p className="mt-5 text-[clamp(0.8rem,1.35cqw,1.2rem)] font-medium leading-[1.45] text-[#344054]" style={{ whiteSpace: "pre-line" }}>
            {t(hero.testimonial)}
          </p>
        </div>
      </div>

      <div className="absolute right-[5%] top-[42%] w-[20%] text-center">
        <div>
          <p className="mb-4 text-[clamp(0.65rem,0.9cqw,0.8rem)] font-bold uppercase text-[#00a9d4]">Professional experience</p>
          <p className="text-[clamp(2rem,3.4cqw,3.1rem)] font-bold leading-none">{t(hero.experienceValue)}</p>
          <p className="mt-2 text-[clamp(0.8rem,1.3cqw,1.15rem)]">{t(hero.experienceLabel)}</p>
        </div>
      </div>
    </div>
  );
}

function DesktopHeroFallback() {
  const { content, t } = useContent();
  const { hero } = content;

  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-[#171717]">
      <div className="relative z-10 pt-[7%] text-center" style={{ fontFamily: URBANIST }}>
        <p className="mx-auto w-fit rounded-full border border-[#171717] px-5 py-2 text-sm">{t(hero.greeting)}</p>
        <p className="mt-4 text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.95]">
          {t(hero.introPrefix)} <span className="text-[#48c6ec]">{hero.displayName}</span>
          <br />
          {t(hero.title)}
        </p>
      </div>
      <div className="absolute bottom-[-36%] left-1/2 aspect-square w-[54%] -translate-x-1/2 rounded-full bg-[#48c6ec]" />
      <img
        src={portraitUrl}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 w-[66%] max-w-none -translate-x-1/2"
      />
    </div>
  );
}

function MobileHero() {
  const { content, t } = useContent();
  const reduceMotion = useReducedMotion();

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section className="px-4 pb-8 pt-24 md:hidden" style={{ fontFamily: KANIT }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[680px] overflow-hidden rounded-[24px] bg-white px-6 pb-7 pt-10 text-[#171717]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="mx-auto mb-5 w-fit rounded-full border border-[#171717] px-4 py-1.5 text-sm"
        >
          {t(content.hero.greeting)}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.65 }}
          className="relative z-10 text-center text-[40px] font-bold leading-[0.94] sm:text-[48px]"
          style={{ fontFamily: URBANIST, letterSpacing: 0 }}
        >
          {t(content.hero.introPrefix)} <span className="text-[#48c6ec]">{content.hero.displayName}</span>
          <br />
          {t(content.hero.title)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.6 }}
          className="relative z-10 mx-auto mt-5 max-w-[300px] text-center text-sm leading-relaxed text-[#344054]"
        >
          {t(content.hero.bio)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.6 }}
          className="relative z-20 mt-5 flex justify-center gap-2"
        >
          <button
            type="button"
            onClick={scrollToPortfolio}
            className="flex items-center gap-2 rounded-full bg-[#48c6ec] px-5 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(72,198,236,0.32)] transition-transform active:scale-95"
          >
            {t(content.hero.portfolioButton)}
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
          <a
            href={`mailto:${content.footer.email}`}
            aria-label={`Email ${content.footer.email}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#171717]/20 text-[#171717] transition-transform active:scale-95"
          >
            <Mail size={17} aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-[-122px] left-1/2 h-[390px] w-[390px] -translate-x-1/2 rounded-full bg-[#48c6ec]"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute bottom-[-6px] left-1/2 z-10 w-[530px] max-w-none -translate-x-1/2 select-none"
        >
          <motion.img
            animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            src={portraitUrl}
            alt={t(content.hero.portraitAlt)}
            className="w-full max-w-none"
            draggable={false}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="absolute bottom-5 right-4 z-20 rounded-2xl border border-white/70 bg-white/80 px-3 py-2 text-right shadow-lg backdrop-blur-md"
        >
          <p className="text-xl font-bold leading-none">{t(content.hero.experienceValue)}</p>
          <p className="mt-1 text-[11px] text-[#344054]">{t(content.hero.experienceLabel)}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function HeroFrame66() {
  const isDesktop = useDesktopLayout();
  return isDesktop ? <DesktopHero /> : <MobileHero />;
}
