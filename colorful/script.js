const DEFAULT_IMAGES = {
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

const DEFAULT_TITLES = {
  1: "Commercial Poster",
  2: "3D Product Visualization",
  3: "AI Product 3D Visuals",
  4: "E-Commerce Campaigns",
  5: "AI-Assisted Web System",
};

function readStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

const storedContent = readStorage("wh_site_content");
const storedImages = readStorage("wh_portfolio_images") || {};
const projectImages = {};
const projectTitles = { ...DEFAULT_TITLES };

for (let id = 1; id <= 5; id += 1) {
  projectImages[id] = storedImages[id]?.length ? storedImages[id] : DEFAULT_IMAGES[id];
  const storedTitle = storedContent?.portfolio?.projects?.[id - 1]?.title?.en;
  if (storedTitle) projectTitles[id] = storedTitle;

  document.querySelectorAll(`[data-project-title="${id}"]`).forEach((element) => {
    element.textContent = projectTitles[id];
  });

  document.querySelectorAll(`[data-project-image="${id}"]`).forEach((image) => {
    const fallback = image.getAttribute("src");
    image.addEventListener("error", () => {
      if (fallback && image.getAttribute("src") !== fallback) image.setAttribute("src", fallback);
    }, { once: true });
    image.setAttribute("src", projectImages[id][0]);
    image.setAttribute("alt", `${projectTitles[id]} project preview`);
  });
}

if (storedContent) {
  const text = (value, fallback) => value?.en || fallback;
  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && value) element.textContent = value;
  };

  setText("#hero-role", text(storedContent.hero?.title, "AI Visual"));
  setText("#hero-testimonial", text(storedContent.hero?.testimonial, document.querySelector("#hero-testimonial")?.textContent));
  setText("#hero-experience", text(storedContent.hero?.experienceValue, "3+"));
  setText("#hero-experience-label", text(storedContent.hero?.experienceLabel, "Years experience"));

  storedContent.skills?.proficiencyItems?.slice(0, 4).forEach((item, index) => {
    const percentage = Math.max(0, Math.min(100, Number(item.percentage) || 0));
    setText(`[data-proficiency="${index}"]`, `${percentage}%`);
  });
}

const navLinks = document.querySelectorAll(".nav-link");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveLink() {
  let current = sections[0];
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 140) current = section;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
}

document.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

const viewer = document.querySelector(".image-viewer");
const viewerImage = viewer.querySelector("img");
const viewerCount = viewer.querySelector(".viewer-count");
let activeProject = 1;
let activeImage = 0;

function renderViewer() {
  const images = projectImages[activeProject];
  viewerImage.src = images[activeImage];
  viewerImage.alt = `${projectTitles[activeProject]} ${activeImage + 1}`;
  viewerCount.textContent = `${projectTitles[activeProject]}  ${activeImage + 1} / ${images.length}`;
}

function openViewer(projectId) {
  activeProject = projectId;
  activeImage = 0;
  renderViewer();
  viewer.hidden = false;
  document.body.classList.add("viewer-open");
  viewer.querySelector(".viewer-close").focus();
}

function closeViewer() {
  viewer.hidden = true;
  document.body.classList.remove("viewer-open");
}

function moveViewer(direction) {
  const images = projectImages[activeProject];
  activeImage = (activeImage + direction + images.length) % images.length;
  renderViewer();
}

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => openViewer(Number(button.dataset.lightbox)));
});

viewer.querySelector(".viewer-close").addEventListener("click", closeViewer);
viewer.querySelector(".viewer-prev").addEventListener("click", () => moveViewer(-1));
viewer.querySelector(".viewer-next").addEventListener("click", () => moveViewer(1));
viewer.addEventListener("click", (event) => {
  if (event.target === viewer) closeViewer();
});

document.addEventListener("keydown", (event) => {
  if (viewer.hidden) return;
  if (event.key === "Escape") closeViewer();
  if (event.key === "ArrowLeft") moveViewer(-1);
  if (event.key === "ArrowRight") moveViewer(1);
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input[type='email']");
    const sender = input?.value.trim();
    const subject = encodeURIComponent("Portfolio project inquiry");
    const body = encodeURIComponent(sender ? `Please contact me at ${sender}.` : "I'd like to discuss a project.");
    window.location.href = `mailto:Fusenra@gmail.com?subject=${subject}&body=${body}`;
  });
});
