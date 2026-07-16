import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { MotionConfig } from "motion/react";
import { Palette } from "lucide-react";
import { ContentProvider, useContent } from "./context/ContentContext";
import { HeroFrame66 } from "./components/HeroFrame66";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ServicesSection } from "./components/ServicesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { FooterSection } from "./components/FooterSection";
import { ScrollProgress } from "./components/ScrollProgress";
import { FloatingCTA } from "./components/FloatingCTA";
import { SiteHeader } from "./components/SiteHeader";
import { MarqueeStrip } from "./components/MarqueeStrip";
import { PhilosophySection } from "./components/PhilosophySection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { loadStoredImages, getProjectImages } from "./data/projectImages";
import { loadPublishedImages, type PublishedImages } from "./data/githubPublisher";
import type { Project } from "./types";

const PortfolioModal = lazy(() =>
  import("./components/PortfolioModal").then(({ PortfolioModal: Component }) => ({ default: Component })),
);
const OwnerDashboard = lazy(() =>
  import("./components/OwnerDashboard").then(({ OwnerDashboard: Component }) => ({ default: Component })),
);
const DIVIDER = (
  <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24"
    style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.18), transparent)" }} />
);

function FloatingThemeSwitch() {
  const [switching, setSwitching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || switching) return;
    event.preventDefault();
    const destination = event.currentTarget.href;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSwitching(true);
    timerRef.current = setTimeout(() => {
      window.location.assign(destination);
    }, reducedMotion ? 80 : 1080);
  };

  return (
    <>
      <div className={`theme-transition-wash theme-transition-to-colorful${switching ? " is-active" : ""}`} aria-hidden="true">
        <span className="theme-transition-streaks" />
        <span className="theme-transition-core" />
      </div>
      <a
        href="./colorful/"
        aria-label="Switch to Colorful Playful theme"
        aria-busy={switching}
        onClick={handleClick}
        className={`theme-toggle-floating${switching ? " is-switching" : ""}`}
      >
        <span className="theme-warp-light" aria-hidden="true" />
        <Palette size={16} aria-hidden="true" />
        <span className="theme-toggle-label">COLORFUL THEME</span>
      </a>
    </>
  );
}

function PortfolioApp() {
  const { content, lang } = useContent();
  const isAdminRoute = window.location.search.includes("admin=1") || /\/admin\/?$/.test(window.location.pathname);

  const [storedImages, setStoredImages] = useState<Record<number, string[]>>(() => loadStoredImages());
  const [publishedImages, setPublishedImages] = useState<PublishedImages>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [portfolioModalLoaded, setPortfolioModalLoaded] = useState(false);

  const openDashboard = useCallback(() => {
    window.location.href = `${import.meta.env.BASE_URL}?admin=1`;
  }, []);

  const handleSelectProject = useCallback((project: Project) => {
    setPortfolioModalLoaded(true);
    setSelectedProject(project);
  }, []);

  // Keyboard shortcut: Ctrl+Shift+O
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        openDashboard();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openDashboard]);

  // Logo 5-click secret
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleLogoClick = useCallback(() => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 2000);
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      openDashboard();
    }
  }, [openDashboard]);

  useEffect(() => () => {
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
  }, []);

  useEffect(() => {
    loadPublishedImages().then(setPublishedImages);
  }, []);

  const handleImagesChange = useCallback((updated: Record<number, string[]>) => setStoredImages(updated), []);

  const projects = useMemo<Project[]>(() => content.portfolio.projects.map((project, index) => {
    const id = index + 1;
    const images = getProjectImages(id, storedImages, publishedImages);
    return {
      id,
      title: project.title.en,
      category: project.category.en,
      titleBT: project.title,
      categoryBT: project.category,
      description: project.description[lang] ?? project.description.en,
      coverImage: images[0] ?? "",
      images,
      tags: project.tags,
    };
  }), [content.portfolio.projects, lang, publishedImages, storedImages]);

  if (isAdminRoute) {
    return (
      <div className="min-h-screen" style={{ background: "#07070d", color: "#ffffff" }}>
        <Suspense fallback={null}>
          <OwnerDashboard
            open
            mode="page"
            storedImages={storedImages}
            publishedImages={publishedImages}
            onClose={() => { window.location.href = import.meta.env.BASE_URL; }}
            onImagesChange={handleImagesChange}
            onPublishedImagesChange={setPublishedImages}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#06060a", color: "#ffffff" }}>
      <ScrollProgress />
      <FloatingCTA />
      <FloatingThemeSwitch />

      {/* Capsule navigation header */}
      <SiteHeader onLogoClick={handleLogoClick} />

      <div id="hero"><HeroFrame66 /></div>
      <MarqueeStrip />
      <div id="about"><SkillsSection /></div>
      {DIVIDER}
      <PhilosophySection />
      {DIVIDER}
      <div id="experience"><ExperienceSection /></div>
      {DIVIDER}
      <div id="services"><ServicesSection /></div>
      {DIVIDER}
      <div id="portfolio"><PortfolioSection projects={projects} onSelectProject={handleSelectProject} /></div>
      {DIVIDER}
      <TestimonialsSection />
      <div id="contact"><FooterSection /></div>

      {portfolioModalLoaded ? (
        <Suspense fallback={null}>
          <PortfolioModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </Suspense>
      ) : null}
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ContentProvider>
        <PortfolioApp />
      </ContentProvider>
    </MotionConfig>
  );
}
