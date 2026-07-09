import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
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
