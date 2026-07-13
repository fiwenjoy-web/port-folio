import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  type SiteContent,
  type Lang,
  type BT,
  loadStoredContent,
  saveStoredContent,
  DEFAULT_CONTENT,
} from "../data/siteContent";

interface ContentContextValue {
  content: SiteContent;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (field: BT) => string;
  updateContent: (updater: (draft: SiteContent) => SiteContent) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => loadStoredContent());
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    document.documentElement.lang = lang;
    const role = content.hero.role[lang] ?? content.hero.role.en;
    const bio = content.hero.bio[lang] ?? content.hero.bio.en;
    document.title = `${content.hero.name} | ${role}`;

    const setMeta = (selector: string, value: string) => {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", value);
    };
    setMeta('meta[name="description"]', bio);
    setMeta('meta[name="author"]', content.hero.name);
    setMeta('meta[property="og:title"]', `${content.hero.name} | ${role}`);
    setMeta('meta[property="og:description"]', bio);
  }, [content.hero.bio, content.hero.name, content.hero.role, lang]);

  const t = useCallback((field: BT) => field[lang] ?? field.en, [lang]);

  const updateContent = useCallback((updater: (draft: SiteContent) => SiteContent) => {
    setContent((prev) => {
      const next = updater(structuredClone(prev));
      saveStoredContent(next);
      return next;
    });
  }, []);

  const resetContent = useCallback(() => {
    saveStoredContent(DEFAULT_CONTENT);
    setContent(DEFAULT_CONTENT);
  }, []);

  return (
    <ContentContext.Provider value={{ content, lang, setLang, t, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
  return ctx;
}
