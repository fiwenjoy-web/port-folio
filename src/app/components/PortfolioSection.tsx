import { type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "../context/ContentContext";
import type { Project } from "../types";

const MONO = "'Noto Sans Thai', sans-serif";
const SANS = "'Noto Sans Thai', sans-serif";

interface Props {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function PortfolioSection({ projects, onSelectProject }: Props) {
  const { content, t } = useContent();
  const { portfolio } = content;

  return (
    <section id="work" className="relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden" style={{ fontFamily: SANS }}>
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "linear-gradient(to right, #00d4ff, transparent)" }} />
              <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "#00d4ff", fontFamily: SANS }}>
                {t(portfolio.sectionLabel)}
              </p>
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", letterSpacing: "-0.02em" }}>
              {t(portfolio.heading1)}{" "}
              <span style={{ background: "linear-gradient(90deg, #00d4ff, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t(portfolio.heading2)}
              </span>
            </h2>
          </div>
          <p className="text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>
            {t(portfolio.subtitle)}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ProjectCard project={projects[0]} index={0} className="lg:col-span-2" aspectRatio="aspect-[16/9]" onSelect={onSelectProject} />
          <ProjectCard project={projects[1]} index={1} className="" aspectRatio="aspect-[3/4]" onSelect={onSelectProject} />
          <ProjectCard project={projects[2]} index={2} className="" aspectRatio="aspect-[3/4]" onSelect={onSelectProject} />
          <ProjectCard project={projects[3]} index={3} className="lg:col-span-2" aspectRatio="aspect-[16/9]" onSelect={onSelectProject} />
          <ProjectCard project={projects[4]} index={4} className="md:col-span-2 lg:col-span-3" aspectRatio="aspect-[21/7]" onSelect={onSelectProject} />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, className, aspectRatio, onSelect }: {
  project: Project; index: number; className: string; aspectRatio: string; onSelect: (p: Project) => void;
}) {
  const { content, t, reduceMotion } = useContent();
  const translatedTitle = t(project.titleBT ?? { en: project.title, th: project.title });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glareOpacity = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 220, damping: 28, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 220, damping: 28, mass: 0.4 });
  const smoothGlareOpacity = useSpring(glareOpacity, { stiffness: 220, damping: 28 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], [18, 82]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [18, 82]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.24) 0%, rgba(0, 212, 255, 0.11) 18%, transparent 48%)`;

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    glareOpacity.set(1);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.button
      type="button"
      aria-label={`${t(content.portfolio.viewProjectLabel)}: ${translatedTitle}`}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative w-full overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/70 ${className}`}
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        transformPerspective: 900,
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onBlur={resetPointer}
      onClick={() => onSelect(project)}>
      <div className={`relative ${aspectRatio} overflow-hidden`}>
        <img src={project.coverImage} alt={translatedTitle} loading="lazy" decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: project.id === 1 ? "center top" : "center" }} />
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)" }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(0,102,255,0.08) 100%)" }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,212,255,0.03) 0px, rgba(0,212,255,0.03) 1px, transparent 1px, transparent 4px)" }} />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ background: glare, opacity: reduceMotion ? 0 : smoothGlareOpacity }}
        />
        <div aria-hidden="true" className="project-scan-overlay pointer-events-none absolute inset-0 z-[3] opacity-0 transition-opacity duration-300 group-hover:opacity-80" />
        <div className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.4)" }}>
          <ArrowUpRight size={14} color="#00d4ff" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-xs mb-1 tracking-[0.15em] uppercase" style={{ color: "#00d4ff", fontFamily: MONO }}>
                {t(project.categoryBT ?? { en: project.category, th: project.category })}
              </p>
              <h3 className="text-xl leading-tight" style={{ fontFamily: SANS, fontWeight: 700, color: "#fff" }}>
                {translatedTitle}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded"
                  style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: MONO, backdropFilter: "blur(4px)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
