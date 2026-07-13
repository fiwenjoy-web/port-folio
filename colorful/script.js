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

const DEFAULT_CATEGORIES = {
  1: "Graphic Design",
  2: "3D Render",
  3: "AI Production",
  4: "Campaign Design",
  5: "Web Design",
};

const DEFAULT_TAGS = {
  1: ["Photoshop", "Illustrator", "Print Design"],
  2: ["Blender", "3D Render", "Product Vis"],
  3: ["AI", "Product Visual", "3D"],
  4: ["Shopee", "Lazada", "TikTok"],
  5: ["Figma", "React", "AI Workflow"],
};

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && value !== undefined && value !== null) element.textContent = value;
}

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
const projectCategories = { ...DEFAULT_CATEGORIES };
const projectTags = { ...DEFAULT_TAGS };

for (let id = 1; id <= 5; id += 1) {
  projectImages[id] = storedImages[id]?.length ? storedImages[id] : DEFAULT_IMAGES[id];
  const storedProject = storedContent?.portfolio?.projects?.[id - 1];
  if (storedProject?.title?.en) projectTitles[id] = storedProject.title.en;
  if (storedProject?.category?.en) projectCategories[id] = storedProject.category.en;
  if (storedProject?.tags?.length) projectTags[id] = storedProject.tags;

  document.querySelectorAll(`[data-project-title="${id}"]`).forEach((element) => {
    element.textContent = projectTitles[id];
  });
  document.querySelectorAll(`[data-project-category="${id}"]`).forEach((element) => {
    element.textContent = projectCategories[id];
  });
  document.querySelectorAll(`[data-project-tags="${id}"]`).forEach((element) => {
    element.textContent = projectTags[id].join(" / ");
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

  setText("#hero-status", text(storedContent.hero?.navStatus, "SEEKING FULL-TIME POSITION"));
  setText("#hero-name", storedContent.hero?.name || "WEERAPONG HAMATHULIN");
  setText("#hero-role", text(storedContent.hero?.role, "CREATIVE DESIGNER / AI VISUAL PRODUCTION"));
  setText("#hero-bio", text(storedContent.hero?.bio, document.querySelector("#hero-bio")?.textContent));
  setText("#hero-primary", text(storedContent.hero?.ctaSecondary, "VIEW WORK"));
  setText("#hero-secondary", text(storedContent.hero?.ctaPrimary, "SEEKING FULL-TIME POSITION"));

  storedContent.hero?.stats?.slice(0, 3).forEach((stat, index) => {
    setText(`[data-hero-stat-value="${index}"]`, stat.value);
    setText(`[data-hero-stat-label="${index}"]`, text(stat.label, ""));
  });

  const marqueeItems = storedContent.marquee?.items?.map((item) => text(item, "")).filter(Boolean) || [];
  if (marqueeItems.length) {
    document.querySelectorAll("[data-marquee]").forEach((element) => {
      element.replaceChildren();
      marqueeItems.forEach((item, index) => {
        element.append(document.createTextNode(item));
        if (index < marqueeItems.length - 1) {
          const separator = document.createElement("b");
          separator.textContent = "+";
          element.append(separator);
        }
      });
    });
  }

  setText("#portfolio-label", text(storedContent.portfolio?.sectionLabel, "PORTFOLIO"));
  setText("#portfolio-heading-1", text(storedContent.portfolio?.heading1, "WORK &"));
  setText("#portfolio-heading-2", text(storedContent.portfolio?.heading2, "DESIGN"));
  setText("#portfolio-subtitle", text(storedContent.portfolio?.subtitle, ""));

  setText("#services-label", text(storedContent.services?.sectionLabel, "WHAT I OFFER"));
  setText("#services-heading-1", text(storedContent.services?.heading1, "SERVICES &"));
  setText("#services-heading-2", text(storedContent.services?.heading2, "PRICING"));
  storedContent.services?.items?.slice(0, 4).forEach((item, index) => {
    setText(`[data-service-title="${index}"]`, text(item.title, ""));
    setText(`[data-service-desc="${index}"]`, text(item.desc, ""));
    setText(`[data-service-price="${index}"]`, `${item.price} ↗`);
  });

  setText("#skills-label", text(storedContent.skills?.sectionLabel, "EXPERTISE"));
  setText("#skills-heading-1", text(storedContent.skills?.heading1, "SKILLS &"));
  setText("#skills-heading-2", text(storedContent.skills?.heading2, "TOOLS"));

  storedContent.skills?.proficiencyItems?.slice(0, 4).forEach((item, index) => {
    const percentage = Math.max(0, Math.min(100, Number(item.percentage) || 0));
    setText(`[data-proficiency-label="${index}"]`, text(item.label, ""));
    setText(`[data-proficiency="${index}"]`, `${percentage}%`);
  });

  storedContent.skills?.tools?.slice(0, 8).forEach((tool, index) => {
    const element = document.querySelectorAll(".tools-grid > span")[index];
    const labelNode = element ? [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE) : null;
    if (labelNode) labelNode.nodeValue = tool;
  });

  setText("#experience-label", text(storedContent.experience?.sectionLabel, "BACKGROUND"));
  setText("#experience-heading-1", text(storedContent.experience?.heading1, "EXPERIENCE &"));
  setText("#experience-heading-2", text(storedContent.experience?.heading2, "EDUCATION"));
  const experienceEntries = [
    ...(storedContent.experience?.jobs || []).map((job) => ({
      period: job.period,
      title: job.company,
      description: [text(job.role, ""), text(job.bullets?.[0], "")].filter(Boolean).join(" — "),
    })),
    ...(storedContent.experience?.education || []).map((education) => ({
      period: education.period,
      title: education.school,
      description: text(education.degree, ""),
    })),
  ];
  experienceEntries.slice(0, 3).forEach((entry, index) => {
    setText(`[data-experience-period="${index}"]`, entry.period);
    setText(`[data-experience-title="${index}"]`, entry.title);
    setText(`[data-experience-desc="${index}"]`, entry.description);
  });

  setText("#contact-eyebrow", text(storedContent.footer?.ctaEyebrow, "HAVE A PROJECT IN MIND?"));
  setText("#contact-heading-1", text(storedContent.footer?.ctaHeading1, "LET'S MAKE SOMETHING"));
  setText("#contact-heading-2", text(storedContent.footer?.ctaHeading2, "FULL OF ENERGY."));
  const email = storedContent.footer?.email || "Fusenra@gmail.com";
  const emailLink = document.querySelector("#contact-email");
  if (emailLink) emailLink.setAttribute("href", `mailto:${email}`);
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
