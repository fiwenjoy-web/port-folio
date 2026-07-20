import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "motion/react";
import animationUrl from "../../assets/frame-66.lottie";
import { useContent } from "../context/ContentContext";

export function DotLottieHero() {
  const { content, t } = useContent();
  const reduceMotion = useReducedMotion();
  const playerRef = useRef<DotLottie | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  const renderConfig = useMemo(() => ({
    autoResize: true,
    freezeOnOffscreen: true,
    devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
    quality: 100,
  }), []);

  const handlePlayerRef = useCallback((player: DotLottie | null) => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    playerRef.current = player;
    if (!player) return;

    const handleLoadError = () => setLoadFailed(true);
    player.addEventListener("loadError", handleLoadError);
    if (reduceMotion) player.pause();
    cleanupRef.current = () => player.removeEventListener("loadError", handleLoadError);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) playerRef.current?.pause();
  }, [reduceMotion]);

  useEffect(() => () => cleanupRef.current?.(), []);

  const setHeroHovered = useCallback((hovered: boolean) => {
    if (reduceMotion) return;
    playerRef.current?.stateMachineSetBooleanInput("hovering_Ellipse_2", hovered);
  }, [reduceMotion]);

  if (loadFailed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white text-center text-[#171717]">
        <div>
          <p className="text-sm text-[#344054]">{t(content.hero.title)}</p>
          <p className="mt-2 text-5xl font-bold">{t(content.hero.introPrefix)} <span className="text-[#48c6ec]">{content.hero.displayName}</span></p>
        </div>
      </div>
    );
  }

  return (
    <DotLottieReact
      src={animationUrl}
      animationId="Main Scene"
      stateMachineId="frame_66"
      autoplay={false}
      loop={false}
      backgroundColor="#FFFFFF"
      layout={{ fit: "contain", align: [0.5, 0.5] }}
      renderConfig={renderConfig}
      dotLottieRefCallback={handlePlayerRef}
      onPointerEnter={() => setHeroHovered(true)}
      onPointerMove={() => setHeroHovered(true)}
      onPointerLeave={() => setHeroHovered(false)}
      className="block h-full w-full"
      role="img"
      aria-label={t(content.hero.portraitAlt)}
      data-lottie-hero="true"
    />
  );
}
