import { useState, useCallback, useRef, useEffect } from "react";
import { ContentProvider, useContent } from "./context/ContentContext";
import { HeroFrame66 } from "./components/HeroFrame66";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ServicesSection } from "./components/ServicesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { FooterSection } from "./components/FooterSection";
import { PortfolioModal } from "./components/PortfolioModal";
import { OwnerDashboard } from "./components/OwnerDashboard";
import { ScrollProgress } from "./components/ScrollProgress";
import { FloatingCTA } from "./components/FloatingCTA";
import { SiteHeader } from "./components/SiteHeader";
import { MarqueeStrip } from "./components/MarqueeStrip";
import { PhilosophySection } from "./components/PhilosophySection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { loadStoredImages, getProjectImages } from "./data/projectImages";
import type { Project } from "./types";

const DIVIDER = (
  <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24"
    style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.18), transparent)" }} />
);

function PortfolioApp() {
  const { content, lang, setLang } = useContent();

  const [storedImages, setStoredImages] = useState<Record<number, string[]>>(() => loadStoredImages());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  // Keyboard shortcut: Ctrl+Shift+O
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "O") { e.preventDefault(); setDashboardOpen(true); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Logo 5-click secret
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleLogoClick = useCallback(() => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 2000);
    if (clickCountRef.current >= 5) { clickCountRef.current = 0; setDashboardOpen(true); }
  }, []);

  const handleImagesChange = useCallback((updated: Record<number, string[]>) => setStoredImages(updated), []);

  // Build projects from content + stored images
  const projects: Project[] = content.portfolio.projects.map((p, i) => {
    const id = i + 1;
    const imgs = getProjectImages(id, storedImages);
    return {
      id,
      title: p.title.en,
      category: p.category.en,
      titleBT: p.title,
      categoryBT: p.category,
      description: p.description[lang] ?? p.description.en,
      coverImage: imgs[0] ?? "",
      images: imgs,
      tags: p.tags,
    };
  });

  return (
    <div className="min-h-screen" style={{ background: "#06060a", color: "#ffffff" }}>
      <ScrollProgress />
      <FloatingCTA />

      {/* Capsule navigation header */}
      <SiteHeader onLogoClick={handleLogoClick} />

      {/* Language toggle — fixed top-right */}
      <div className="fixed top-5 right-5 z-50 flex items-center gap-1"
        style={{ fontFamily: "'Noto Sans Thai', sans-serif" }}>
        {(["en", "th"] as const).map((l) => (
          <button key={l} onClick={() => setLang(l)}
            className="text-xs px-2.5 py-1 rounded-full transition-all duration-200"
            style={{
              background: lang === l ? "rgba(0,212,255,0.15)" : "rgba(10,10,16,0.7)",
              border: `1px solid ${lang === l ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.1)"}`,
              color: lang === l ? "#00d4ff" : "rgba(255,255,255,0.35)",
              letterSpacing: "0.08em",
              backdropFilter: "blur(12px)",
            }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

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
      <div id="portfolio"><PortfolioSection projects={projects} onSelectProject={setSelectedProject} /></div>
      {DIVIDER}
      <TestimonialsSection />
      <div id="contact"><FooterSection /></div>

      {/* Owner button — bottom left */}
      <button onClick={() => setDashboardOpen(true)}
        className="fixed bottom-8 left-6 z-50 hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all hover:scale-105"
        style={{
          background: "rgba(10,10,20,0.85)", border: "1px solid rgba(0,212,255,0.2)",
          color: "rgba(255,255,255,0.45)", backdropFilter: "blur(12px)",
          fontFamily: "'Noto Sans Thai', sans-serif", letterSpacing: "0.08em",
        }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,212,255,0.5)"; el.style.color = "#00d4ff"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,212,255,0.2)"; el.style.color = "rgba(255,255,255,0.45)"; }}>
        ⚙ OWNER
      </button>

      <PortfolioModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <OwnerDashboard open={dashboardOpen} storedImages={storedImages} onClose={() => setDashboardOpen(false)} onImagesChange={handleImagesChange} />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <PortfolioApp />
    </ContentProvider>
  );
}
