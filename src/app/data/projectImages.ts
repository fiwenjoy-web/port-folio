export const STORAGE_KEY = "wh_portfolio_images";

const PROJECT_COVERS: Record<number, string> = {
  1: "portfolio/covers/project-1-hero.webp",
  3: "portfolio/project-3/01-kn95-3c-final-hero.webp",
  5: "portfolio/project-5/01-dark-theme-hero.webp",
};

export const DEFAULT_IMAGES: Record<number, string[]> = {
  1: [
    "https://images.unsplash.com/photo-1604161546853-1a097fbc30fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1763671872042-decff1375c06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1763671872328-ef9ddd48c5fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ],
  2: [
    "https://images.unsplash.com/photo-1743535681049-512db5983e73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1727348831258-7959fcbdc235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1705338670422-01133208eab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ],
  3: [
    "https://images.unsplash.com/photo-1770210217380-d78a69acdc77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1770170389700-eb0f9b910ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1781643565886-31cb0e88084d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ],
  4: [
    "https://images.unsplash.com/photo-1674027392887-751d6396b710?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1674027392857-9aed6e8ecab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1770170389700-eb0f9b910ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ],
  5: [
    "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1776702701448-36220108225d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1770210217380-d78a69acdc77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ],
};

export function loadStoredImages(): Record<number, string[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<number, string[]>;
  } catch {
    return {};
  }
}

export function saveStoredImages(data: Record<number, string[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getProjectImages(
  projectId: number,
  stored: Record<number, string[]>,
  published: Record<number, string[]> = {},
): string[] {
  if (published[projectId]?.length) {
    return published[projectId].map((image) => (
      /^https?:\/\//i.test(image) ? image : `${import.meta.env.BASE_URL}${image}`
    ));
  }
  if (stored[projectId]?.length) return stored[projectId];
  return DEFAULT_IMAGES[projectId] ?? [];
}

export function getProjectCover(projectId: number, fallback = "") {
  const cover = PROJECT_COVERS[projectId];
  return cover ? `${import.meta.env.BASE_URL}${cover}` : fallback;
}
