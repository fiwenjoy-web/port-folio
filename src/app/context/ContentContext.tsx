import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  type SiteContent,
  type Lang,
  type BT,
  loadStoredContent,
  saveStoredContent,
  DEFAULT_CONTENT,
  mergeContentWithDefaults,
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
const LANGUAGE_STORAGE_KEY = "fuselab-portfolio-language";

function isAdminRoute() {
  return new URLSearchParams(window.location.search).get("admin") === "1"
    || /\/admin\/?$/.test(window.location.pathname);
}

function getInitialLanguage(): Lang {
  try {
    const urlLanguage = new URLSearchParams(window.location.search).get("lang");
    if (urlLanguage === "en" || urlLanguage === "th") return urlLanguage;
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) === "th" ? "th" : "en";
  } catch {
    return "en";
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => (
    isAdminRoute() ? loadStoredContent() : DEFAULT_CONTENT
  ));
  const [lang, setLanguage] = useState<Lang>(getInitialLanguage);

  const setLang = useCallback((nextLanguage: Lang) => {
    setLanguage(nextLanguage);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", nextLanguage);
      window.history.replaceState(window.history.state, "", url);
    } catch {
      // The in-memory language still works when storage or history is unavailable.
    }
  }, []);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== LANGUAGE_STORAGE_KEY) return;
      if (event.newValue === "en" || event.newValue === "th") setLanguage(event.newValue);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (isAdminRoute()) return;

    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}content/site-content.json?ts=${Date.now()}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => response.ok ? response.json() : null)
      .then((published) => {
        if (published && typeof published === "object" && Object.keys(published).length > 0) {
          setContent(mergeContentWithDefaults(published));
        }
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
      });

    return () => controller.abort();
  }, []);

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
