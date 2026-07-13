import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, Upload, Trash2, Lock, Eye, EyeOff, CheckCircle,
  Plus, FolderOpen, Image as ImageIcon, FileText, RotateCcw, Search,
} from "lucide-react";
import { DEFAULT_IMAGES, saveStoredImages } from "../data/projectImages";
import { useContent } from "../context/ContentContext";
import type { SiteContent, BT } from "../data/siteContent";

const OWNER_PASSWORD = "owner2025";

const PROJECT_LABELS: Record<number, { title: string; folder: string; color: string }> = {
  1: { title: "Commercial Poster", folder: "commercial-poster/", color: "#00d4ff" },
  2: { title: "3D Product Visualization", folder: "3d-product/", color: "#0066ff" },
  3: { title: "AI Product 3D Visuals", folder: "ai-visuals/", color: "#9333ea" },
  4: { title: "E-Commerce Campaigns", folder: "ecommerce-campaigns/", color: "#f59e0b" },
  5: { title: "AI-Assisted Web System", folder: "web-system/", color: "#10b981" },
};

type ContentPath = Array<string | number>;
type ContentSectionId = keyof SiteContent;

type EditableField = {
  key: string;
  label: string;
  path: ContentPath;
  value: string | number | BT;
  bilingual: boolean;
  numeric: boolean;
};

const CMS_SECTION_META: Array<{ id: ContentSectionId; label: string; color: string }> = [
  { id: "brand", label: "Brand & Logo", color: "#67e8f9" },
  { id: "navigation", label: "Navigation", color: "#48c6ec" },
  { id: "hero", label: "Hero Section", color: "#00d4ff" },
  { id: "marquee", label: "Marquee", color: "#22d3ee" },
  { id: "skills", label: "Skills & Tools", color: "#818cf8" },
  { id: "philosophy", label: "Philosophy", color: "#a78bfa" },
  { id: "experience", label: "Experience", color: "#0066ff" },
  { id: "services", label: "Services", color: "#f59e0b" },
  { id: "portfolio", label: "Portfolio", color: "#f97316" },
  { id: "testimonials", label: "Testimonials", color: "#34d399" },
  { id: "footer", label: "Footer & Contact", color: "#10b981" },
];

const FIELD_NAMES: Record<string, string> = {
  cta: "CTA",
  desc: "Description",
  bt: "Text",
};

function isBilingualText(value: unknown): value is BT {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const candidate = value as Partial<BT>;
  return typeof candidate.en === "string" && typeof candidate.th === "string";
}

function humanize(value: string) {
  if (FIELD_NAMES[value.toLowerCase()]) return FIELD_NAMES[value.toLowerCase()];
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function formatFieldLabel(path: ContentPath) {
  return path.map((part, index) => (
    typeof part === "number" ? `Item ${part + 1}` : humanize(part)
  )).join(" / ");
}

function collectTextFields(value: unknown, path: ContentPath = []): EditableField[] {
  if (isBilingualText(value)) {
    return [{ key: path.join("."), label: formatFieldLabel(path), path, value, bilingual: true, numeric: false }];
  }

  if (typeof value === "string") {
    return [{ key: path.join("."), label: formatFieldLabel(path), path, value, bilingual: false, numeric: false }];
  }

  if (typeof value === "number") {
    return [{ key: path.join("."), label: formatFieldLabel(path), path, value, bilingual: false, numeric: true }];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectTextFields(item, [...path, index]));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => collectTextFields(child, [...path, key]));
  }

  return [];
}

interface Props {
  open: boolean;
  storedImages: Record<number, string[]>;
  onClose: () => void;
  onImagesChange: (updated: Record<number, string[]>) => void;
}

type Tab = "images" | "content";

export function OwnerDashboard({ open, storedImages, onClose, onImagesChange }: Props) {
  const { content, updateContent, resetContent } = useContent();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState<Tab>("images");
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activeCmsSection, setActiveCmsSection] = useState<string | null>(null);
  const [contentSearch, setContentSearch] = useState("");
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeUploadRef = useRef<number | null>(null);

  function handleLogin() {
    if (password === OWNER_PASSWORD) {
      setAuthed(true);
      setPwError(false);
      setPassword("");
    } else {
      setPwError(true);
    }
  }

  function handleClose() {
    setAuthed(false);
    setPassword("");
    setPwError(false);
    setActiveProject(null);
    setActiveCmsSection(null);
    setContentSearch("");
    onClose();
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  // ── Image management ──────────────────────────────────────────
  function readFiles(files: FileList, projectId: number) {
    const readers: Promise<string>[] = Array.from(files).map(
      (file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      })
    );
    Promise.all(readers).then((dataUrls) => {
      const current = storedImages[projectId] ?? [...(DEFAULT_IMAGES[projectId] ?? [])];
      const updated = { ...storedImages, [projectId]: [...current, ...dataUrls] };
      saveStoredImages(updated);
      onImagesChange(updated);
      showToast(`${dataUrls.length} image${dataUrls.length > 1 ? "s" : ""} uploaded!`);
    });
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || activeUploadRef.current === null) return;
    readFiles(e.target.files, activeUploadRef.current);
    e.target.value = "";
  }

  function openFilePicker(projectId: number) {
    activeUploadRef.current = projectId;
    fileInputRef.current?.click();
  }

  function removeImage(projectId: number, idx: number) {
    const current = storedImages[projectId] ?? [...(DEFAULT_IMAGES[projectId] ?? [])];
    const updated = { ...storedImages, [projectId]: current.filter((_, i) => i !== idx) };
    saveStoredImages(updated);
    onImagesChange(updated);
    showToast("Image removed.");
  }

  function resetImages(projectId: number) {
    const updated = { ...storedImages };
    delete updated[projectId];
    saveStoredImages(updated);
    onImagesChange(updated);
    showToast("Reset to default images.");
  }

  const handleDrop = useCallback((e: React.DragEvent, projectId: number) => {
    e.preventDefault();
    setDragOver(null);
    if (e.dataTransfer.files.length) readFiles(e.dataTransfer.files, projectId);
  }, [storedImages]);

  const getImages = (id: number) =>
    storedImages[id]?.length ? storedImages[id] : DEFAULT_IMAGES[id] ?? [];

  // ── Content management ────────────────────────────────────────
  function setTextValue(sectionId: ContentSectionId, path: ContentPath, value: string, lang?: "en" | "th") {
    updateContent((draft) => {
      let target: unknown = draft[sectionId];
      for (const segment of path.slice(0, -1)) {
        target = (target as Record<string | number, unknown>)[segment];
      }

      const key = path[path.length - 1];
      if (key === undefined || !target || typeof target !== "object") return draft;
      const container = target as Record<string | number, unknown>;
      if (lang) {
        const bilingual = container[key];
        if (isBilingualText(bilingual)) bilingual[lang] = value;
      } else {
        container[key] = value;
      }
      return draft;
    });
  }

  function setNumberValue(sectionId: ContentSectionId, path: ContentPath, value: number) {
    if (!Number.isFinite(value)) return;
    updateContent((draft) => {
      let target: unknown = draft[sectionId];
      for (const segment of path.slice(0, -1)) {
        target = (target as Record<string | number, unknown>)[segment];
      }

      const key = path[path.length - 1];
      if (key === undefined || !target || typeof target !== "object") return draft;
      (target as Record<string | number, unknown>)[key] = Math.min(100, Math.max(0, Math.round(value)));
      return draft;
    });
  }

  // ── Render ────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="dash-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(20px)" }}
            onClick={handleClose}
          />

          <motion.div
            key="dash-panel"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 z-[61] w-full max-w-2xl flex flex-col"
            style={{
              background: "#08080f",
              borderLeft: "1px solid rgba(0,212,255,0.15)",
              boxShadow: "-20px 0 80px rgba(0,0,0,0.8)",
              fontFamily: "'Noto Sans Thai', sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top glow */}
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)" }} />

            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileInput} />

            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #00d4ff, #0066ff)" }}>
                  <Lock size={14} color="#000" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Owner Dashboard</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                    PORTFOLIO MANAGEMENT
                  </p>
                </div>
              </div>
              <button onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
                <X size={17} />
              </button>
            </div>

            {!authed ? (
              /* ── Login ── */
              <div className="flex flex-col items-center justify-center flex-1 px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,102,255,0.1))", border: "1px solid rgba(0,212,255,0.2)" }}>
                    <Lock size={28} color="#00d4ff" />
                  </div>
                  <h2 className="text-2xl font-bold text-white text-center mb-2">Owner Access</h2>
                  <p className="text-sm text-center mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Enter your password to manage the portfolio.
                  </p>
                  <div className="relative mb-3">
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setPwError(false); }}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      placeholder="Password"
                      className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${pwError ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
                        color: "#fff",
                      }}
                    />
                    <button onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "rgba(255,255,255,0.3)" }}>
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {pwError && <p className="text-xs text-red-400 mb-3 text-center">Incorrect password. Try again.</p>}
                  <button onClick={handleLogin}
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #00d4ff, #0066ff)", color: "#000", letterSpacing: "0.06em" }}>
                    UNLOCK DASHBOARD
                  </button>
                </motion.div>
              </div>
            ) : (
              /* ── Dashboard ── */
              <div className="flex flex-col flex-1 min-h-0">
                {/* Tabs */}
                <div className="flex gap-1 px-7 pt-5 pb-4 shrink-0">
                  {([
                    { id: "images" as Tab, icon: ImageIcon, label: "Images" },
                    { id: "content" as Tab, icon: FileText, label: "Content / Settings" },
                  ] as const).map(({ id, icon: Icon, label }) => (
                    <button key={id} onClick={() => setTab(id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      style={{
                        background: tab === id ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${tab === id ? "rgba(0,212,255,0.35)" : "rgba(255,255,255,0.07)"}`,
                        color: tab === id ? "#00d4ff" : "rgba(255,255,255,0.45)",
                      }}>
                      <Icon size={14} />
                      {label}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto px-7 pb-8">
                  {tab === "images" ? (
                    /* ── Images tab ── */
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-3 p-4 rounded-xl mb-2"
                        style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.12)" }}>
                        <FolderOpen size={18} color="#00d4ff" className="shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-white mb-0.5">Local Folder Ready</p>
                          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                            Drop images into <code className="text-cyan-400">src/assets/portfolio/[category]/</code> or upload below.
                          </p>
                        </div>
                      </div>

                      {Object.entries(PROJECT_LABELS).map(([idStr, meta]) => {
                        const id = Number(idStr);
                        const imgs = getImages(id);
                        const isExpanded = activeProject === id;
                        const isCustom = !!storedImages[id]?.length;
                        return (
                          <motion.div key={id} layout className="rounded-2xl overflow-hidden"
                            style={{
                              border: `1px solid ${isExpanded ? meta.color + "33" : "rgba(255,255,255,0.07)"}`,
                              background: isExpanded ? `${meta.color}06` : "rgba(255,255,255,0.02)",
                            }}>
                            <button className="w-full flex items-center gap-4 p-4 text-left"
                              onClick={() => setActiveProject(isExpanded ? null : id)}>
                              <div className="w-14 h-10 rounded-lg overflow-hidden shrink-0"
                                style={{ border: `1px solid ${meta.color}22` }}>
                                <img src={imgs[0]} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs mb-0.5 truncate"
                                  style={{ color: meta.color, fontFamily: "'Noto Sans Thai', sans-serif" }}>{meta.folder}</p>
                                <p className="text-sm font-bold text-white truncate">{meta.title}</p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {isCustom && (
                                  <span className="text-xs px-2 py-0.5 rounded-full"
                                    style={{ background: `${meta.color}18`, color: meta.color, border: `1px solid ${meta.color}30`, fontFamily: "'Noto Sans Thai', sans-serif" }}>
                                    CUSTOM
                                  </span>
                                )}
                                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{imgs.length} imgs</span>
                                <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} className="text-white/30 inline-block">▾</motion.span>
                              </div>
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div key="exp" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                  <div className="px-4 pb-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
                                      {imgs.map((src, i) => (
                                        <div key={i} className="relative group rounded-xl overflow-hidden"
                                          style={{ aspectRatio: "4/3", border: "1px solid rgba(255,255,255,0.07)" }}>
                                          <img src={src} alt="" className="w-full h-full object-cover" />
                                          {i === 0 && (
                                            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded"
                                              style={{ background: meta.color, color: "#000", fontFamily: "'Noto Sans Thai', sans-serif", fontSize: "0.6rem", fontWeight: 700 }}>
                                              COVER
                                            </div>
                                          )}
                                          <button onClick={() => removeImage(id, i)}
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{ background: "rgba(239,68,68,0.7)" }}>
                                            <Trash2 size={18} color="#fff" />
                                          </button>
                                        </div>
                                      ))}
                                      <button onClick={() => openFilePicker(id)}
                                        className="flex flex-col items-center justify-center gap-1 rounded-xl transition-all hover:scale-105"
                                        style={{ aspectRatio: "4/3", border: `2px dashed ${meta.color}40`, background: `${meta.color}08`, color: meta.color }}>
                                        <Plus size={20} />
                                        <span className="text-xs" style={{ fontFamily: "'Noto Sans Thai', sans-serif" }}>ADD</span>
                                      </button>
                                    </div>
                                    <div className="rounded-xl p-5 text-center cursor-pointer transition-all"
                                      style={{ border: `2px dashed ${dragOver === id ? meta.color : "rgba(255,255,255,0.08)"}`, background: dragOver === id ? `${meta.color}08` : "transparent" }}
                                      onDragOver={(e) => { e.preventDefault(); setDragOver(id); }}
                                      onDragLeave={() => setDragOver(null)}
                                      onDrop={(e) => handleDrop(e, id)}
                                      onClick={() => openFilePicker(id)}>
                                      <Upload size={22} className="mx-auto mb-2" color={dragOver === id ? meta.color : "rgba(255,255,255,0.25)"} />
                                      <p className="text-xs" style={{ color: dragOver === id ? meta.color : "rgba(255,255,255,0.3)" }}>
                                        Drag & drop or <span style={{ color: meta.color }}>click to upload</span>
                                      </p>
                                      <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Noto Sans Thai', sans-serif" }}>JPG · PNG · WEBP</p>
                                    </div>
                                    {isCustom && (
                                      <button onClick={() => resetImages(id)}
                                        className="mt-3 text-xs flex items-center gap-1.5 hover:text-red-400 transition-colors"
                                        style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                                        <Trash2 size={12} />RESET TO DEFAULT IMAGES
                                      </button>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    /* ── Content tab ── */
                    <div className="flex flex-col gap-4">
                      {/* Reset all */}
                      <div className="flex items-center justify-between p-4 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div>
                          <p className="text-sm font-semibold text-white">Content Settings</p>
                          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Edit text and proficiency values. Saved automatically.
                          </p>
                        </div>
                        <button onClick={() => { resetContent(); showToast("Content reset to defaults."); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:scale-105"
                          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#ef4444", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                          <RotateCcw size={12} />RESET ALL
                        </button>
                      </div>

                      <label className="relative block">
                        <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="search"
                          value={contentSearch}
                          onChange={(event) => setContentSearch(event.target.value)}
                          placeholder="Search content settings..."
                          className="w-full rounded-xl py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/25"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                        />
                      </label>

                      {CMS_SECTION_META.map((sec) => {
                        const query = contentSearch.trim().toLowerCase();
                        const allFields = collectTextFields(content[sec.id]);
                        const fields = query
                          ? allFields.filter((field) => {
                              const value = field.bilingual
                                ? `${(field.value as BT).en} ${(field.value as BT).th}`
                                : String(field.value);
                              return `${field.label} ${value}`.toLowerCase().includes(query);
                            })
                          : allFields;
                        if (query && fields.length === 0) return null;

                        const isOpen = activeCmsSection === sec.id || query.length > 0;
                        return (
                          <motion.div key={sec.id} layout className="rounded-2xl overflow-hidden"
                            style={{
                              border: `1px solid ${isOpen ? sec.color + "33" : "rgba(255,255,255,0.07)"}`,
                              background: isOpen ? `${sec.color}05` : "rgba(255,255,255,0.02)",
                            }}>
                            <button className="w-full flex items-center justify-between gap-4 p-4 text-left"
                              onClick={() => setActiveCmsSection(isOpen ? null : sec.id)}>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full" style={{ background: sec.color, boxShadow: `0 0 6px ${sec.color}` }} />
                                <span className="text-sm font-bold text-white">{sec.label}</span>
                                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{fields.length} fields</span>
                              </div>
                              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-white/30 inline-block">▾</motion.span>
                            </button>

                            <AnimatePresence>
                              {isOpen && (
                                <motion.div key="cms-exp" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                  <div className="px-4 pb-5 flex flex-col gap-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                    {fields.map((field) => {
                                      return (
                                        <div key={field.key} className="mt-4">
                                          <p className="text-xs font-semibold mb-2" style={{ color: sec.color, fontFamily: "'Noto Sans Thai', sans-serif" }}>
                                            {field.label}
                                          </p>
                                          <div className="flex flex-col gap-2">
                                            {field.numeric ? (
                                              <div className="flex items-center gap-3">
                                                <input
                                                  type="range"
                                                  min="0"
                                                  max="100"
                                                  step="1"
                                                  value={field.value as number}
                                                  aria-label={field.label}
                                                  onChange={(e) => setNumberValue(sec.id, field.path, Number(e.target.value))}
                                                  className="min-w-0 flex-1 cursor-pointer"
                                                  style={{ accentColor: sec.color }}
                                                />
                                                <div className="relative w-24 shrink-0">
                                                  <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    value={field.value as number}
                                                    onChange={(e) => setNumberValue(sec.id, field.path, Number(e.target.value))}
                                                    className="w-full rounded-lg px-3 py-2 pr-8 text-sm text-white outline-none"
                                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                                                  />
                                                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/35">%</span>
                                                </div>
                                              </div>
                                            ) : field.bilingual ? (["en", "th"] as const).map((l) => {
                                              const textValue = (field.value as BT)[l];
                                              return (
                                              <div key={l}>
                                                <span className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                                                  {l === "en" ? "🇬🇧 English" : "🇹🇭 Thai"}
                                                </span>
                                                <textarea
                                                  rows={textValue.length > 80 ? 3 : 1}
                                                  value={textValue}
                                                  onChange={(e) => setTextValue(sec.id, field.path, e.target.value, l)}
                                                  className="w-full px-3 py-2 rounded-lg text-sm resize-none outline-none"
                                                  style={{
                                                    background: "rgba(255,255,255,0.04)",
                                                    border: "1px solid rgba(255,255,255,0.08)",
                                                    color: "#fff",
                                                    lineHeight: 1.5,
                                                    transition: "border-color 0.2s",
                                                  }}
                                                  onFocus={(e) => (e.target.style.borderColor = sec.color + "55")}
                                                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                                                />
                                              </div>
                                              );
                                            }) : (
                                              <textarea
                                                rows={(field.value as string).length > 80 ? 3 : 1}
                                                value={field.value as string}
                                                onChange={(e) => setTextValue(sec.id, field.path, e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg text-sm resize-none outline-none"
                                                style={{
                                                  background: "rgba(255,255,255,0.04)",
                                                  border: "1px solid rgba(255,255,255,0.08)",
                                                  color: "#fff",
                                                  lineHeight: 1.5,
                                                  transition: "border-color 0.2s",
                                                }}
                                                onFocus={(e) => (e.target.style.borderColor = sec.color + "55")}
                                                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                                              />
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}

                      <p className="text-xs text-center mt-2" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                        CHANGES SAVED TO BROWSER · SWITCH LANGUAGE VIA EN/TH TOGGLE ON PAGE
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Toast */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: 20, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 20, x: "-50%" }}
                  className="fixed bottom-8 left-1/2 flex items-center gap-2 px-5 py-3 rounded-full z-[70]"
                  style={{
                    background: "rgba(0,212,255,0.15)",
                    border: "1px solid rgba(0,212,255,0.35)",
                    backdropFilter: "blur(12px)",
                    color: "#00d4ff",
                    fontFamily: "'Noto Sans Thai', sans-serif",
                    fontSize: "0.75rem",
                  }}>
                  <CheckCircle size={15} />
                  {toast}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
