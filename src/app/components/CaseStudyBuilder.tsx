import { useState, type ReactNode } from "react";
import { BookOpen, Plus, Sparkles, Trash2 } from "lucide-react";
import { useContent } from "../context/ContentContext";
import type { BT } from "../data/siteContent";

const PROJECT_COLORS = ["#00d4ff", "#0066ff", "#9333ea", "#f59e0b", "#10b981"];

type StoryCollection = "direction" | "workflow" | "visualSystem" | "outputs";
type ContentPath = Array<string | number>;

interface Props {
  getImages: (projectId: number) => string[];
}

interface BilingualEditorProps {
  label: string;
  value: BT;
  color: string;
  rows?: number;
  onChange: (lang: "en" | "th", value: string) => void;
}

function BilingualEditor({ label, value, color, rows = 3, onChange }: BilingualEditorProps) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em]" style={{ color }}>{label}</p>
      <div className="grid gap-3 md:grid-cols-2">
        {(["en", "th"] as const).map((lang) => (
          <label key={lang} className="block">
            <span className="mb-1.5 block text-xs font-semibold text-white/35">{lang === "en" ? "English" : "ไทย"}</span>
            <textarea
              rows={rows}
              value={value[lang]}
              onChange={(event) => onChange(lang, event.target.value)}
              className="w-full resize-y rounded-xl px-3 py-2.5 text-sm leading-6 text-white outline-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, hint, color, action }: { eyebrow: string; hint: string; color: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color }}>{eyebrow}</p>
        <p className="mt-1 text-xs leading-5 text-white/35">{hint}</p>
      </div>
      {action}
    </div>
  );
}

function AddButton({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold"
      style={{ color, border: `1px solid ${color}44`, background: `${color}0d` }}>
      <Plus size={14} /> {label}
    </button>
  );
}

function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={label}
      className="rounded-lg p-2 text-white/25 transition-colors hover:bg-red-500/10 hover:text-red-400">
      <Trash2 size={14} />
    </button>
  );
}

export function CaseStudyBuilder({ getImages }: Props) {
  const { content, updateContent } = useContent();
  const [projectIndex, setProjectIndex] = useState(0);
  const project = content.portfolio.projects[projectIndex];
  const caseStudy = project.caseStudy;
  const images = getImages(projectIndex + 1);
  const color = PROJECT_COLORS[projectIndex] ?? "#00d4ff";

  function updateText(path: ContentPath, value: string, lang: "en" | "th") {
    updateContent((draft) => {
      let target: unknown = draft.portfolio.projects[projectIndex].caseStudy;
      for (const segment of path.slice(0, -1)) {
        target = (target as Record<string | number, unknown>)[segment];
      }
      const key = path.at(-1);
      if (key === undefined || !target || typeof target !== "object") return draft;
      const field = (target as Record<string | number, unknown>)[key];
      if (field && typeof field === "object" && !Array.isArray(field)) {
        (field as BT)[lang] = value;
      }
      return draft;
    });
  }

  function addItem(collection: StoryCollection) {
    updateContent((draft) => {
      const story = draft.portfolio.projects[projectIndex].caseStudy;
      if (collection === "direction") story.direction.push({ en: "New visual direction", th: "ทิศทางภาพใหม่" });
      if (collection === "workflow") story.workflow.push({
        step: String(story.workflow.length + 1).padStart(2, "0"),
        label: { en: "New step", th: "ขั้นตอนใหม่" },
        desc: { en: "Describe what happens in this step.", th: "อธิบายสิ่งที่ทำในขั้นตอนนี้" },
      });
      if (collection === "visualSystem") story.visualSystem.push({
        label: { en: "New visual element", th: "องค์ประกอบภาพใหม่" },
        desc: { en: "Describe how this element supports the project.", th: "อธิบายว่าองค์ประกอบนี้ช่วยโปรเจกต์อย่างไร" },
      });
      if (collection === "outputs") story.outputs.push({
        label: { en: "New output", th: "ผลงานชิ้นใหม่" },
        desc: { en: "Describe this image and where it is used.", th: "อธิบายภาพนี้และการนำไปใช้งาน" },
      });
      return draft;
    });
  }

  function removeItem(collection: StoryCollection, index: number) {
    updateContent((draft) => {
      const story = draft.portfolio.projects[projectIndex].caseStudy;
      (story[collection] as Array<unknown>).splice(index, 1);
      if (collection === "workflow") {
        story.workflow.forEach((step, stepIndex) => {
          step.step = String(stepIndex + 1).padStart(2, "0");
        });
      }
      return draft;
    });
  }

  const cardClass = "rounded-2xl border border-white/8 bg-white/[0.025] p-4 md:p-5";

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl p-5"
        style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.1), rgba(0,212,255,0.04))", border: "1px solid rgba(167,139,250,0.22)" }}>
        <div className="flex items-start gap-3">
          <Sparkles size={20} color="#c4b5fd" className="mt-0.5 shrink-0" />
          <div>
            <h2 className="text-lg font-bold text-white">Case Study Story Builder</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-white/45">
              เล่าเหตุผลเบื้องหลังงานก่อนโชว์ภาพ แก้ได้ทั้งภาษาอังกฤษและไทย และบันทึกอัตโนมัติในเบราว์เซอร์
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {content.portfolio.projects.map((item, index) => {
          const itemColor = PROJECT_COLORS[index] ?? "#00d4ff";
          const selected = projectIndex === index;
          return (
            <button key={`${item.title.en}-${index}`} type="button" onClick={() => setProjectIndex(index)}
              className="min-w-[180px] rounded-2xl px-4 py-3 text-left"
              style={{ background: selected ? `${itemColor}16` : "rgba(255,255,255,0.025)", border: `1px solid ${selected ? `${itemColor}55` : "rgba(255,255,255,0.07)"}` }}>
              <span className="block text-[10px] font-bold uppercase tracking-wider" style={{ color: itemColor }}>Project {String(index + 1).padStart(2, "0")}</span>
              <span className="mt-1 block truncate text-sm font-bold text-white">{item.title.en}</span>
            </button>
          );
        })}
      </div>

      <section className={cardClass}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color }}>01-03 Story foundation</p>
            <h3 className="mt-1 text-xl font-bold text-white">{project.title.en}</h3>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/35">AUTO SAVE</span>
        </div>
        <div className="grid gap-6">
          {(["overview", "goal", "concept"] as const).map((field) => (
            <BilingualEditor key={field} label={field === "goal" ? "Problem / Goal" : field} value={caseStudy[field]} color={color}
              onChange={(lang, value) => updateText([field], value, lang)} />
          ))}
        </div>
      </section>

      <section className={cardClass}>
        <SectionHeader eyebrow="Creative direction" hint="คำสั้น ๆ ที่อธิบาย mood และบุคลิกของโปรเจกต์" color={color}
          action={<AddButton label="ADD" color={color} onClick={() => addItem("direction")} />} />
        <div className="grid gap-3 lg:grid-cols-2">
          {caseStudy.direction.map((item, index) => (
            <div key={index} className="rounded-xl border border-white/7 bg-black/20 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white/30">DIRECTION {String(index + 1).padStart(2, "0")}</span>
                <RemoveButton label={`Remove direction ${index + 1}`} onClick={() => removeItem("direction", index)} />
              </div>
              <BilingualEditor label="Label" value={item} color={color} rows={2}
                onChange={(lang, value) => updateText(["direction", index], value, lang)} />
            </div>
          ))}
        </div>
      </section>

      <section className={cardClass}>
        <SectionHeader eyebrow="04 Workflow" hint="ลำดับวิธีคิดและขั้นตอนการสร้างงาน" color={color}
          action={<AddButton label="ADD STEP" color={color} onClick={() => addItem("workflow")} />} />
        <div className="grid gap-3">
          {caseStudy.workflow.map((step, index) => (
            <div key={`${step.step}-${index}`} className="rounded-xl border border-white/7 bg-black/20 p-3 md:p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black"
                  style={{ color, background: `${color}12`, border: `1px solid ${color}30` }}>{step.step}</span>
                <RemoveButton label={`Remove workflow step ${index + 1}`} onClick={() => removeItem("workflow", index)} />
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <BilingualEditor label="Step name" value={step.label} color={color} rows={2}
                  onChange={(lang, value) => updateText(["workflow", index, "label"], value, lang)} />
                <BilingualEditor label="Step description" value={step.desc} color={color} rows={2}
                  onChange={(lang, value) => updateText(["workflow", index, "desc"], value, lang)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={cardClass}>
        <SectionHeader eyebrow="05 Visual system" hint="แยกองค์ประกอบให้เห็นว่างานถูกคิดเป็นระบบ" color={color}
          action={<AddButton label="ADD ITEM" color={color} onClick={() => addItem("visualSystem")} />} />
        <div className="grid gap-3">
          {caseStudy.visualSystem.map((item, index) => (
            <div key={index} className="rounded-xl border border-white/7 bg-black/20 p-3 md:p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white/30">SYSTEM {String(index + 1).padStart(2, "0")}</span>
                <RemoveButton label={`Remove visual system item ${index + 1}`} onClick={() => removeItem("visualSystem", index)} />
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <BilingualEditor label="Element name" value={item.label} color={color} rows={2}
                  onChange={(lang, value) => updateText(["visualSystem", index, "label"], value, lang)} />
                <BilingualEditor label="Description" value={item.desc} color={color} rows={2}
                  onChange={(lang, value) => updateText(["visualSystem", index, "desc"], value, lang)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={cardClass}>
        <SectionHeader eyebrow="06 Final outputs" hint="Caption จะจับคู่กับรูปตามลำดับ: Output 01 = รูปแรก" color={color}
          action={<div className="flex items-center gap-2"><span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/35">{images.length} IMAGES</span><AddButton label="ADD OUTPUT" color={color} onClick={() => addItem("outputs")} /></div>} />
        {images.length !== caseStudy.outputs.length ? (
          <p className="mb-4 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-3 py-2 text-xs leading-5 text-amber-200/70">
            ตอนนี้มี {images.length} รูป และ {caseStudy.outputs.length} captions เพิ่มหรือลบให้จำนวนตรงกันได้
          </p>
        ) : null}
        <div className="grid gap-3">
          {caseStudy.outputs.map((item, index) => (
            <div key={index} className="grid gap-4 rounded-xl border border-white/7 bg-black/20 p-3 md:grid-cols-[150px_minmax(0,1fr)] md:p-4">
              <div className="relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.03]" style={{ minHeight: 120 }}>
                {images[index] ? <img src={images[index]} alt="" className="h-full min-h-[120px] w-full object-cover" />
                  : <div className="flex h-full min-h-[120px] items-center justify-center text-xs text-white/25">NO IMAGE YET</div>}
                <span className="absolute left-2 top-2 rounded-md bg-black/75 px-2 py-1 text-[10px] font-bold text-white">OUTPUT {String(index + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <div className="mb-2 flex justify-end"><RemoveButton label={`Remove output ${index + 1}`} onClick={() => removeItem("outputs", index)} /></div>
                <div className="grid gap-5 lg:grid-cols-2">
                  <BilingualEditor label="Image label" value={item.label} color={color} rows={2}
                    onChange={(lang, value) => updateText(["outputs", index, "label"], value, lang)} />
                  <BilingualEditor label="Image description" value={item.desc} color={color} rows={2}
                    onChange={(lang, value) => updateText(["outputs", index, "desc"], value, lang)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={cardClass}>
        <div className="mb-3 flex items-center gap-2"><BookOpen size={16} color={color} /><span className="text-xs font-bold uppercase" style={{ color }}>Reflection</span></div>
        <BilingualEditor label="07 What this project demonstrates" value={caseStudy.reflection} color={color}
          onChange={(lang, value) => updateText(["reflection"], value, lang)} />
      </section>
    </div>
  );
}
