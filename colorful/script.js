const DEFAULT_PROJECTS = [
  {
    title: "COMMERCIAL POSTER",
    category: "Graphic Design",
    description: "Bold commercial poster designs for print and digital media, combining strong typography, vibrant color grading, and AI-enhanced retouching.",
    tags: ["Photoshop", "Illustrator", "Print Design"],
    images: ["./assets/blog-uiux.png", "./assets/portfolio-lirante.png"],
  },
  {
    title: "3D PRODUCT VISUALIZATION",
    category: "3D Render",
    description: "Detailed 3D product renders and mockups created for e-commerce and commercial advertising with custom modeling and lighting.",
    tags: ["Blender", "3D Render", "Product Vis"],
    images: ["./assets/blog-sugee.png", "./assets/blog-cinetrade.png"],
  },
  {
    title: "AI PRODUCT 3D VISUALS",
    category: "AI Production",
    description: "An AI-assisted production pipeline merging generative imagery with 3D renders for product advertising and campaign content.",
    tags: ["AI Generation", "Midjourney", "Photoshop"],
    images: ["./assets/blog-cinetrade.png", "./assets/blog-sugee.png"],
  },
  {
    title: "E-COMMERCE CAMPAIGNS",
    category: "Campaign Design",
    description: "End-to-end campaign design for Shopee, Lazada, and TikTok Shop, including banners, covers, product shots, and short-form content.",
    tags: ["Shopee", "Lazada", "TikTok"],
    images: ["./assets/portfolio-lirante.png", "./assets/blog-uiux.png"],
  },
  {
    title: "AI-ASSISTED WEB SYSTEM",
    category: "Web & UI Design",
    description: "Modern web UI design and AI-assisted front-end development, from wireframes to responsive interfaces and workflow automation.",
    tags: ["UI Design", "Figma", "Web Dev"],
    images: ["./assets/blog-uiux.png", "./assets/blog-cinetrade.png"],
  },
];

const CASE_STUDY_WORKFLOW = [
  { step: "01", label: "Direction", desc: "Clarify the objective, audience, platform, and visual references before production." },
  { step: "02", label: "AI Exploration", desc: "Explore visual routes, prompt directions, compositions, and mood variations." },
  { step: "03", label: "Visual Production", desc: "Build the selected direction through design, mockup, retouching, and layout refinement." },
  { step: "04", label: "Final Delivery", desc: "Prepare final visuals and adapt them into formats ready for portfolio or digital use." },
];

const CASE_STUDY_VISUAL_SYSTEM = [
  { label: "Visual Direction", desc: "Defines the mood, tone, and design language of the project." },
  { label: "Color Palette", desc: "Uses color to make the product or message clear and memorable." },
  { label: "Layout System", desc: "Organizes hierarchy, spacing, and composition for multiple formats." },
  { label: "Final Output", desc: "Turns the concept into polished visuals ready for presentation." },
];

const CASE_STUDY_OUTPUTS = [
  { label: "Cover / Hero Image", desc: "A strong overview image that introduces the project mood." },
  { label: "Concept / Mood Direction", desc: "References or AI exploration used to shape the work." },
  { label: "Main Poster / Key Visual", desc: "The main visual designed to communicate the product story." },
  { label: "Digital Adaptation", desc: "A layout adapted for social, e-commerce, or presentation use." },
];

function createCaseStudy(overview, goal, concept, direction, reflection, options = {}) {
  return {
    overview,
    goal,
    concept,
    direction,
    workflow: options.workflow || CASE_STUDY_WORKFLOW,
    visualSystem: options.visualSystem || CASE_STUDY_VISUAL_SYSTEM,
    outputs: options.outputs || CASE_STUDY_OUTPUTS,
    reflection,
  };
}

const DEFAULT_CASE_STUDIES = [
  createCaseStudy(
    "A commercial poster design project focused on turning simple product or brand assets into polished visuals for print and digital communication.",
    "Create a strong first impression, communicate the offer clearly, and make the visual feel campaign-ready.",
    "From raw assets to a finished key visual, this project explores hierarchy, typography, retouching, and color grading as a complete commercial design workflow.",
    ["Bold typography", "High-contrast composition", "Commercial campaign mood"],
    "This project highlights commercial composition, typography control, color direction, and the ability to make static visuals feel campaign-ready."
  ),
  createCaseStudy(
    "A 3D product visualization project exploring how mockups, lighting, and render composition can create premium product presentation.",
    "Present the product with stronger depth, cleaner material detail, and a more advertising-ready scene.",
    "The project connects product modeling, lighting design, material polish, and final layout into one 3D presentation workflow.",
    ["Premium product lighting", "Clean mockup presentation", "Depth and material detail"],
    "This project demonstrates 3D composition, lighting judgment, mockup presentation, and product-focused visual storytelling."
  ),
  createCaseStudy(
    "An AI product visual system exploring how AI, 3D mockups, and commercial design can create product-focused advertising visuals for digital platforms.",
    "Build a repeatable visual workflow that can move from idea exploration to polished product advertising outputs.",
    "From simple product assets to polished commercial visuals, this project connects idea generation, AI-assisted direction, 3D presentation, and final advertising design.",
    ["AI-assisted visual direction", "Product-focused composition", "Polished advertising finish"],
    "This project shows AI workflow thinking, product visual direction, 3D-assisted presentation, and final commercial design execution.",
    {
      visualSystem: [
        ...CASE_STUDY_VISUAL_SYSTEM,
        { label: "AI Prompt Exploration", desc: "Uses prompts to explore mood, composition, and campaign directions before final design." },
        { label: "Social / E-commerce Adaptation", desc: "Adapts the same visual idea into formats suitable for digital platforms." },
      ],
    }
  ),
  createCaseStudy(
    "An e-commerce campaign design project built to make product visuals work across marketplace, social media, and short-form commerce touchpoints.",
    "Make the product clearer, more clickable, and easier to adapt across Shopee, Lazada, TikTok Shop, and social formats.",
    "The campaign treats one product story as a flexible visual system, then adapts it into banners, covers, social posts, and marketplace-ready graphics.",
    ["Clear product hierarchy", "Marketplace-ready layout", "Fast digital communication"],
    "This project highlights campaign adaptation, marketplace design, product communication, and consistency across platforms.",
    {
      outputs: [
        { label: "Main Poster", desc: "Primary campaign visual for the product story." },
        { label: "Product Banner", desc: "Horizontal format for marketplace or website placement." },
        { label: "Shopee / Lazada Visual", desc: "Marketplace adaptation focused on clarity and click-through." },
        { label: "TikTok Shop Cover", desc: "Vertical or cover-style format for short-form commerce." },
        { label: "Story Size", desc: "Adapted layout for mobile-first viewing." },
      ],
    }
  ),
  createCaseStudy(
    "A web and UI visual design project exploring how layout, design systems, and AI-assisted workflows can turn ideas into polished digital interfaces.",
    "Create a clean, responsive, presentation-ready interface that communicates clearly and feels modern.",
    "This project connects visual design, component thinking, responsive layout, and implementation workflow into a practical web system.",
    ["Clean interface hierarchy", "Responsive web layout", "Design-to-build workflow"],
    "This project demonstrates UI layout thinking, web visual design, responsive composition, and AI-assisted implementation workflow."
  ),
];

const DEFAULT_SERVICES = [
  {
    title: "AI-Assisted Visual Production",
    description: "Using AI workflows to explore visual concepts, generate creative directions, support product imagery, and speed up production while keeping a polished commercial finish.",
    tags: ["AI Workflow", "Prompting", "Visual Exploration"],
  },
  {
    title: "3D Product Mockup & Render",
    description: "Creating product mockups, 3D render concepts, cosmetic-style visuals, and presentation-ready product scenes for advertising and portfolio work.",
    tags: ["Blender", "Product Render", "Mockup"],
  },
  {
    title: "E-commerce Campaign Design",
    description: "Creating visuals for Shopee, Lazada, TikTok Shop, social media campaigns, and short-form content designed for online product communication.",
    tags: ["Shopee", "Lazada", "TikTok Shop"],
  },
  {
    title: "UI / Web Visual Design",
    description: "Designing landing pages, web layouts, interface concepts, dashboard visuals, and digital presentation systems with a clean modern visual style.",
    tags: ["Figma", "UI Design", "Web Layout"],
  },
  {
    title: "Commercial Visual Design",
    description: "Designing promotional graphics, campaign key visuals, banners, social media content, and product-focused advertising materials for digital platforms.",
    tags: ["Poster Design", "Social Media", "Campaign Visuals"],
  },
  {
    title: "Creative Workflow Systems",
    description: "Organizing creative processes, design assets, AI workflows, file structures, and production systems to make visual work faster and more consistent.",
    tags: ["Workflow", "Asset System", "Production"],
  },
];

const DEFAULT_PROCESS = [
  { label: "Direction", description: "Clarify the goal, audience, references, and visual direction." },
  { label: "AI Exploration", description: "Explore concepts, styles, compositions, and production options." },
  { label: "Visual Production", description: "Build, refine, retouch, render, and prepare the final visual system." },
  { label: "Final Delivery", description: "Export clean assets and presentation-ready files for real use." },
];

const LEGACY_SERVICE_TITLES = new Set([
  "AI Visual Production",
  "3D Product Rendering",
  "E-Commerce Campaigns",
  "Web & UI Design",
]);

const DEFAULT_FOCUS = [
  "AI-Assisted Visual Production",
  "Commercial Product Visuals",
  "3D Mockup & Render Concepts",
  "E-Commerce Campaign Design",
  "Creative Workflow Systems",
];

const DEFAULT_EXPERIENCE = [
  {
    period: "2025 - Present",
    title: "Dr. Hygiene Medical Products",
    description: "Graphic Designer & Content Creator",
    bullets: [
      "Designed commercial visuals for medical and hygiene products across social media and e-commerce platforms.",
      "Created campaign content for Shopee, Lazada, and TikTok Shop.",
      "Produced AI-assisted product advertising and marketing visuals.",
      "Developed trend-based TikTok content and short-form video concepts.",
      "Directed visuals combining commercial design, AI workflows, and modern product presentation.",
    ],
  },
  {
    period: "2023 - 2025",
    title: "Pinnacle Asset Management",
    description: "Marketing Officer & Sales Administrator",
    bullets: [
      "Supported marketing operations and corporate media production.",
      "Created promotional materials and company presentations.",
      "Coordinated website content updates and digital media organization.",
      "Managed Excel databases, asset tracking, and sales document workflows.",
    ],
  },
  {
    period: "2019 - 2023",
    title: "Maejo University",
    description: "Bachelor of Business Administration, Management",
    bullets: ["Business Administration program with a focus on management and commercial operations."],
  },
];

const DEFAULT_GLANCE = [
  { label: "Location", value: "Chiangmai, Thailand" },
  { label: "Focus", value: "AI Visual & 3D" },
  { label: "Status", value: "Seeking Full-Time" },
  { label: "Languages", value: "TH / EN" },
];

const DEFAULT_TESTIMONIALS = [
  {
    quote: "The AI-assisted product visuals elevated our entire e-commerce presence. Fast turnaround and a polished commercial finish.",
    name: "Napat S.",
    role: "Brand Manager, Dr. Hygiene",
    initials: "NS",
  },
  {
    quote: "The 3D renders brought the packaging launch to life. The lighting, detail, and presentation gave the campaign a premium finish.",
    name: "Ploy T.",
    role: "Marketing Lead, Pinnacle",
    initials: "PT",
  },
  {
    quote: "A designer who understands both commercial strategy and modern AI workflows. The work is clear, energetic, and results focused.",
    name: "Kridsada M.",
    role: "Founder, TH Commerce",
    initials: "KM",
  },
];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function readStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function cleanText(value, fallback = "") {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value)
    .split("\u00e2\u20ac\u201d").join(" - ")
    .split("\u00e2\u20ac\u201c").join(" - ")
    .split("\u00e0\u00b8\u00bf").join("\u0e3f")
    .split("\u00c2\u00a9").join("\u00a9");
}

function english(value, fallback = "") {
  return cleanText(value?.en ?? value, fallback);
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && value !== undefined && value !== null) element.textContent = cleanText(value);
}

function setButtonText(selector, value) {
  const element = document.querySelector(selector);
  if (!element) return;
  const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
  if (textNode) textNode.nodeValue = `${cleanText(value)} `;
}

function setTagList(element, tags) {
  if (!element) return;
  element.replaceChildren();
  tags.forEach((tag) => {
    const item = document.createElement("i");
    item.textContent = cleanText(tag);
    element.append(item);
  });
}

function normalizeCaseStudy(value, fallback) {
  const direction = Array.isArray(value?.direction)
    ? value.direction.map((item) => english(item)).filter(Boolean)
    : fallback.direction;
  const workflow = Array.isArray(value?.workflow)
    ? value.workflow.map((item, index) => ({
        step: cleanText(item?.step, String(index + 1).padStart(2, "0")),
        label: english(item?.label, `Step ${index + 1}`),
        desc: english(item?.desc),
      }))
    : fallback.workflow;
  const visualSystem = Array.isArray(value?.visualSystem)
    ? value.visualSystem.map((item) => ({ label: english(item?.label), desc: english(item?.desc) }))
    : fallback.visualSystem;
  const outputs = Array.isArray(value?.outputs)
    ? value.outputs.map((item) => ({ label: english(item?.label), desc: english(item?.desc) }))
    : fallback.outputs;

  return {
    overview: english(value?.overview, fallback.overview),
    goal: english(value?.goal, fallback.goal),
    concept: english(value?.concept, fallback.concept),
    direction,
    workflow,
    visualSystem,
    outputs,
    reflection: english(value?.reflection, fallback.reflection),
  };
}

const storedContent = readStorage("wh_site_content");
const storedImages = readStorage("wh_portfolio_images") || {};

const projectData = DEFAULT_PROJECTS.map((fallback, index) => {
  const stored = storedContent?.portfolio?.projects?.[index];
  return {
    title: english(stored?.title, fallback.title),
    category: english(stored?.category, fallback.category),
    description: english(stored?.description, fallback.description),
    tags: stored?.tags?.length ? stored.tags.map((tag) => cleanText(tag)) : fallback.tags,
    images: storedImages[index + 1]?.length ? storedImages[index + 1] : fallback.images,
    caseStudy: normalizeCaseStudy(stored?.caseStudy, DEFAULT_CASE_STUDIES[index]),
  };
});

projectData.forEach((project, index) => {
  const id = index + 1;
  setText(`[data-project-title="${id}"]`, project.title);
  setText(`[data-project-category="${id}"]`, project.category);
  setText(`[data-project-tags="${id}"]`, project.tags.join(" / "));
  document.querySelectorAll(`[data-project-image="${id}"]`).forEach((image) => {
    image.src = project.images[0];
    image.alt = `${project.title} project preview`;
    image.addEventListener("error", () => {
      image.src = DEFAULT_PROJECTS[index].images[0];
    }, { once: true });
  });
});

fetch(`../portfolio/manifest.json?ts=${Date.now()}`, { cache: "no-store" })
  .then((response) => response.ok ? response.json() : {})
  .then((manifest) => {
    projectData.forEach((project, index) => {
      const id = index + 1;
      if (storedImages[id]?.length || !Array.isArray(manifest[id]) || !manifest[id].length) return;
      project.images = manifest[id]
        .filter((image) => typeof image === "string")
        .map((image) => /^https?:\/\//i.test(image) ? image : `../${image.replace(/^\.?\//, "")}`);
      document.querySelectorAll(`[data-project-image="${id}"]`).forEach((image) => {
        image.src = project.images[0];
      });
    });
  })
  .catch(() => {});

if (storedContent) {
  setText("#hero-status", english(storedContent.hero?.navStatus, "SEEKING FULL-TIME POSITION"));
  setText("#hero-name", cleanText(storedContent.hero?.name, "WEERAPONG HAMATHULIN"));
  setText("#hero-role", english(storedContent.hero?.role, "CREATIVE DESIGNER / AI VISUAL PRODUCTION"));
  setText("#hero-bio", english(storedContent.hero?.bio, "Creative designer specializing in AI-assisted visual production, commercial content, and modern digital media workflows."));
  setButtonText("#hero-primary", english(storedContent.hero?.ctaSecondary, "VIEW WORK"));
  setButtonText("#hero-secondary", english(storedContent.hero?.ctaPrimary, "SEEKING FULL-TIME POSITION"));

  storedContent.hero?.stats?.slice(0, 3).forEach((stat, index) => {
    setText(`[data-hero-stat-value="${index}"]`, stat.value);
    setText(`[data-hero-stat-label="${index}"]`, english(stat.label));
  });

  const marqueeItems = storedContent.marquee?.items?.map((item) => english(item)).filter(Boolean) || [];
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

  setText("#portfolio-label", english(storedContent.portfolio?.sectionLabel, "PORTFOLIO"));
  setText("#portfolio-heading-1", english(storedContent.portfolio?.heading1, "WORK &"));
  setText("#portfolio-heading-2", english(storedContent.portfolio?.heading2, "DESIGN"));
  setText("#portfolio-subtitle", english(storedContent.portfolio?.subtitle, "A selection of recent commercial and creative projects."));
  const hasLegacyServices =
    english(storedContent.services?.sectionLabel) === "WHAT I OFFER" ||
    english(storedContent.services?.heading1) === "SERVICES &" ||
    english(storedContent.services?.heading2) === "PRICING";
  setText("#services-label", hasLegacyServices ? "WHAT I CAN DO" : english(storedContent.services?.sectionLabel, "WHAT I CAN DO"));
  setText("#services-heading-1", hasLegacyServices ? "CREATIVE" : english(storedContent.services?.heading1, "CREATIVE"));
  setText("#services-heading-2", hasLegacyServices ? "CAPABILITIES" : english(storedContent.services?.heading2, "CAPABILITIES"));
  setText("#services-description", hasLegacyServices
    ? "A focused set of creative skills combining visual design, AI-assisted production, product presentation, and digital media workflows."
    : english(storedContent.services?.description, "A focused set of creative skills combining visual design, AI-assisted production, product presentation, and digital media workflows."));
  setText("#skills-label", english(storedContent.skills?.sectionLabel, "EXPERTISE"));
  setText("#skills-heading-1", english(storedContent.skills?.heading1, "SKILLS &"));
  setText("#skills-heading-2", english(storedContent.skills?.heading2, "TOOLS"));
  setText("#tools-title", english(storedContent.skills?.toolsTitle, "TOOLS & SOFTWARE"));
  setText("#proficiency-title", english(storedContent.skills?.proficiencyTitle, "PROFICIENCY"));
  setText("#focus-title", english(storedContent.skills?.focusTitle, "CREATIVE FOCUS"));
  setText("#experience-label", english(storedContent.experience?.sectionLabel, "BACKGROUND"));
  setText("#experience-heading-1", english(storedContent.experience?.heading1, "EXPERIENCE &"));
  setText("#experience-heading-2", english(storedContent.experience?.heading2, "EDUCATION"));
  setText("#testimonials-label", english(storedContent.testimonials?.sectionLabel, "TESTIMONIALS"));
  setText("#testimonials-heading-1", english(storedContent.testimonials?.heading1, "TRUSTED BY"));
  setText("#testimonials-heading-2", english(storedContent.testimonials?.heading2, "CLIENTS"));
  setText("#contact-eyebrow", english(storedContent.footer?.ctaEyebrow, "LET'S WORK TOGETHER"));
  setText("#contact-heading-1", english(storedContent.footer?.ctaHeading1, "HAVE A PROJECT"));
  setText("#contact-heading-2", english(storedContent.footer?.ctaHeading2, "IN MIND?"));
}

const serviceData = DEFAULT_SERVICES.map((fallback, index) => {
  const stored = storedContent?.services?.items?.[index];
  const storedTitle = english(stored?.title);
  const useStored = storedTitle && !LEGACY_SERVICE_TITLES.has(storedTitle);
  return {
    title: useStored ? storedTitle : fallback.title,
    description: useStored ? english(stored?.desc, fallback.description) : fallback.description,
    tags: useStored && storedContent?.services?.tags?.[index]?.length ? storedContent.services.tags[index] : fallback.tags,
  };
});

serviceData.forEach((service, index) => {
  setText(`[data-service-title="${index}"]`, service.title);
  setText(`[data-service-desc="${index}"]`, service.description);
  setTagList(document.querySelector(`[data-service-tags="${index}"]`), service.tags);
});

const storedProcessTitle = english(storedContent?.services?.processTitle);
const hasLegacyProcess =
  storedProcessTitle === "HOW WE WORK" ||
  english(storedContent?.services?.steps?.[0]?.label) === "Brief";
const processData = DEFAULT_PROCESS.map((fallback, index) => {
  const stored = storedContent?.services?.steps?.[index];
  return {
    label: hasLegacyProcess ? fallback.label : english(stored?.label, fallback.label),
    description: hasLegacyProcess ? fallback.description : english(stored?.desc, fallback.description),
  };
});
setText("#process-title", hasLegacyProcess ? "CREATIVE WORKFLOW" : english(storedContent?.services?.processTitle, "CREATIVE WORKFLOW"));
setText("#process-heading", hasLegacyProcess ? "How I build visuals" : english(storedContent?.services?.workflowHeading, "How I build visuals"));
processData.forEach((step, index) => {
  setText(`[data-process-label="${index}"]`, step.label);
  setText(`[data-process-desc="${index}"]`, step.description);
});

const proficiency = storedContent?.skills?.proficiencyItems || [
  { label: { en: "Visual Design" }, percentage: 95 },
  { label: { en: "AI Production" }, percentage: 90 },
  { label: { en: "3D Rendering" }, percentage: 78 },
  { label: { en: "Motion Design" }, percentage: 82 },
];
proficiency.slice(0, 4).forEach((item, index) => {
  const percentage = Math.max(0, Math.min(100, Number(item.percentage) || 0));
  const row = document.querySelector(`[data-proficiency="${index}"]`)?.closest("article");
  setText(`[data-proficiency-label="${index}"]`, english(item.label));
  setText(`[data-proficiency="${index}"]`, `${percentage}%`);
  row?.style.setProperty("--level", `${percentage}%`);
});

const tools = storedContent?.skills?.tools?.slice(0, 8) || ["Photoshop", "Illustrator", "Premiere", "After FX", "Adobe XD", "Blender", "VS Code", "Figma"];
const toolIcons = {
  "photoshop": "photoshop.png",
  "illustrator": "illustrator.png",
  "premiere": "premiere.png",
  "after fx": "after-effects.png",
  "adobe xd": "adobe-xd.png",
  "blender": "blender.png",
  "vs code": "vs-code.png",
  "figma": "figma.png",
};
tools.forEach((tool, index) => {
  const element = document.querySelectorAll(".tools-grid > span")[index];
  const labelNode = element ? [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE) : null;
  if (labelNode) labelNode.nodeValue = cleanText(tool);
  const icon = element?.querySelector("img");
  const iconFile = toolIcons[cleanText(tool).toLowerCase()];
  if (icon && iconFile) {
    icon.src = `./assets/tools/${iconFile}`;
    icon.alt = `${cleanText(tool)} icon`;
  }
});

const focusItems = storedContent?.skills?.focusItems?.map((item) => english(item)).filter(Boolean) || DEFAULT_FOCUS;
focusItems.slice(0, 5).forEach((item, index) => setText(`[data-focus="${index}"]`, item));

const storedExperience = [
  ...(storedContent?.experience?.jobs || []).map((job) => ({
    period: cleanText(job.period),
    title: cleanText(job.company),
    description: english(job.role),
    bullets: job.bullets?.map((bullet) => english(bullet)).filter(Boolean) || [],
  })),
  ...(storedContent?.experience?.education || []).map((education) => ({
    period: cleanText(education.period),
    title: cleanText(education.school),
    description: english(education.degree),
    bullets: [english(education.degree)].filter(Boolean),
  })),
];
const experienceData = DEFAULT_EXPERIENCE.map((fallback, index) => {
  const stored = storedExperience[index];
  if (!stored) return fallback;
  return {
    period: stored.period || fallback.period,
    title: stored.title || fallback.title,
    description: stored.description || fallback.description,
    bullets: stored.bullets.length ? stored.bullets : fallback.bullets,
  };
});
experienceData.slice(0, 3).forEach((entry, index) => {
  setText(`[data-experience-period="${index}"]`, entry.period);
  setText(`[data-experience-title="${index}"]`, entry.title);
  setText(`[data-experience-desc="${index}"]`, entry.description);
  const list = document.querySelector(`[data-experience-bullets="${index}"]`);
  entry.bullets.forEach((bullet) => {
    const item = document.createElement("li");
    item.textContent = cleanText(bullet);
    list?.append(item);
  });
});

const glance = storedContent?.experience?.glanceItems?.length
  ? storedContent.experience.glanceItems.map((item) => ({ label: english(item.label), value: english(item.value) }))
  : DEFAULT_GLANCE;
glance.slice(0, 4).forEach((item, index) => {
  setText(`[data-glance-label="${index}"]`, item.label);
  setText(`[data-glance-value="${index}"]`, item.value);
});

const testimonialData = DEFAULT_TESTIMONIALS.map((fallback, index) => {
  const item = storedContent?.testimonials?.items?.[index];
  if (!item) return fallback;
  return {
    quote: english(item.quote, fallback.quote),
    name: cleanText(item.name, fallback.name),
    role: english(item.role, fallback.role),
    initials: cleanText(item.initials, fallback.initials),
  };
});

const email = cleanText(storedContent?.footer?.email, "Fusenra@gmail.com");
const phone = cleanText(storedContent?.footer?.phone, "083-480-9368");
const contactLocation = english(storedContent?.footer?.location, "Chiangmai, Thailand");
document.querySelector("#contact-email")?.setAttribute("href", `mailto:${email}`);
document.querySelectorAll("[data-contact-email], [data-footer-email]").forEach((link) => {
  link.href = `mailto:${email}`;
  const value = link.querySelector("b") || link;
  value.textContent = email;
});
document.querySelectorAll("[data-contact-phone], [data-footer-phone]").forEach((link) => {
  link.href = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const value = link.querySelector("b") || link;
  value.textContent = phone;
});
setText("[data-contact-location]", contactLocation);

const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
const scrollProgress = document.querySelector(".scroll-progress i");

function updateScrollState() {
  let current = sections[0];
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 140) current = section;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress?.style.setProperty("transform", `scaleX(${max > 0 ? window.scrollY / max : 0})`);
}
document.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

const viewer = document.querySelector(".image-viewer");
const viewerExpanded = viewer?.querySelector(".viewer-expanded");
const viewerImage = viewerExpanded?.querySelector("img");
const viewerCount = viewer?.querySelector(".viewer-count");
const viewerTotal = viewer?.querySelector(".viewer-total");
const viewerCollage = viewer?.querySelector(".viewer-collage");
let activeProject = 0;
let activeImage = 0;
let lastCollageTrigger = null;

function renderExpanded() {
  const project = projectData[activeProject];
  if (!project || !viewerImage || !viewerCount) return;
  viewerImage.src = project.images[activeImage];
  viewerImage.alt = `${project.title} ${activeImage + 1}`;
  viewerImage.onerror = () => {
    viewerImage.src = DEFAULT_PROJECTS[activeProject].images[0];
    viewerImage.onerror = null;
  };
  viewerCount.textContent = `${String(activeImage + 1).padStart(2, "0")} / ${String(project.images.length).padStart(2, "0")}`;
}

function createCollageImage(source, index, project) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = index === 0 ? "viewer-collage-main" : "viewer-collage-thumb";
  button.setAttribute("aria-label", `Expand ${project.title} image ${index + 1}`);

  const image = document.createElement("img");
  image.src = source;
  image.alt = `${project.title} ${index + 1}`;
  image.addEventListener("error", () => {
    image.src = DEFAULT_PROJECTS[activeProject].images[0];
  }, { once: true });
  const expand = document.createElement("span");
  expand.className = "viewer-expand";
  expand.setAttribute("aria-hidden", "true");
  expand.textContent = "\u2197";
  button.append(image);

  const output = project.caseStudy.outputs[index];
  if (output) {
    const caption = document.createElement("div");
    caption.className = "viewer-caption";
    const label = document.createElement("b");
    label.textContent = output.label;
    const description = document.createElement("small");
    description.textContent = output.desc;
    caption.append(label, description);
    button.append(caption);
  }

  button.append(expand);
  button.addEventListener("click", () => openExpanded(index, button));
  return button;
}

function renderViewer() {
  const project = projectData[activeProject];
  if (!project || !viewerCollage) return;
  setText("[data-viewer-category]", project.category);
  setText("[data-viewer-title]", project.title);
  setText("[data-viewer-description]", project.description);
  setText("[data-viewer-overview]", project.caseStudy.overview);
  setText("[data-viewer-goal]", project.caseStudy.goal);
  setText("[data-viewer-concept]", project.caseStudy.concept);
  setText("[data-viewer-reflection]", project.caseStudy.reflection);
  setTagList(document.querySelector("[data-viewer-tags]"), project.tags);
  if (viewerTotal) viewerTotal.textContent = `${String(project.images.length).padStart(2, "0")} IMAGES`;

  const direction = document.querySelector("[data-viewer-direction]");
  if (direction) {
    direction.replaceChildren();
    project.caseStudy.direction.forEach((item) => {
      const tag = document.createElement("i");
      tag.textContent = item;
      direction.append(tag);
    });
  }

  const workflow = document.querySelector("[data-viewer-workflow]");
  if (workflow) {
    workflow.replaceChildren();
    project.caseStudy.workflow.forEach((item) => {
      const row = document.createElement("li");
      const step = document.createElement("b");
      step.textContent = item.step;
      const copy = document.createElement("div");
      const label = document.createElement("strong");
      label.textContent = item.label;
      const description = document.createElement("small");
      description.textContent = item.desc;
      copy.append(label, description);
      row.append(step, copy);
      workflow.append(row);
    });
  }

  const visualSystem = document.querySelector("[data-viewer-system]");
  if (visualSystem) {
    visualSystem.replaceChildren();
    project.caseStudy.visualSystem.forEach((item) => {
      const row = document.createElement("li");
      const label = document.createElement("strong");
      label.textContent = item.label;
      const description = document.createElement("small");
      description.textContent = item.desc;
      row.append(label, description);
      visualSystem.append(row);
    });
  }

  viewerCollage.replaceChildren();
  viewerCollage.append(createCollageImage(project.images[0], 0, project));
  if (project.images.length > 1) {
    const thumbs = document.createElement("div");
    thumbs.className = "viewer-collage-thumbs";
    project.images.slice(1).forEach((source, index) => {
      thumbs.append(createCollageImage(source, index + 1, project));
    });
    viewerCollage.append(thumbs);
  }
}

function openExpanded(index, trigger) {
  activeImage = index;
  lastCollageTrigger = trigger;
  renderExpanded();
  viewerExpanded.hidden = false;
  viewerExpanded.querySelector(".viewer-expanded-close")?.focus();
}

function closeExpanded() {
  if (!viewerExpanded || viewerExpanded.hidden) return;
  viewerExpanded.hidden = true;
  lastCollageTrigger?.focus();
  lastCollageTrigger = null;
}

function openViewer(projectId) {
  activeProject = projectId - 1;
  activeImage = 0;
  renderViewer();
  viewer.hidden = false;
  document.body.classList.add("viewer-open");
  viewer.querySelector(".viewer-close")?.focus();
}

function closeViewer() {
  if (!viewer) return;
  if (viewerExpanded) viewerExpanded.hidden = true;
  viewer.hidden = true;
  document.body.classList.remove("viewer-open");
}

function moveViewer(direction) {
  const images = projectData[activeProject].images;
  activeImage = (activeImage + direction + images.length) % images.length;
  renderExpanded();
}

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => openViewer(Number(button.dataset.lightbox)));
});
viewer?.querySelector(".viewer-close")?.addEventListener("click", closeViewer);
viewer?.querySelector(".viewer-expanded-close")?.addEventListener("click", closeExpanded);
viewer?.querySelector(".viewer-prev")?.addEventListener("click", () => moveViewer(-1));
viewer?.querySelector(".viewer-next")?.addEventListener("click", () => moveViewer(1));
viewer?.addEventListener("click", (event) => {
  if (event.target === viewer) closeViewer();
});
viewerExpanded?.addEventListener("click", (event) => {
  if (event.target === viewerExpanded) closeExpanded();
});
document.addEventListener("keydown", (event) => {
  if (viewer?.hidden) return;
  if (event.key === "Escape") {
    if (viewerExpanded && !viewerExpanded.hidden) closeExpanded();
    else closeViewer();
  }
  if (viewerExpanded && !viewerExpanded.hidden && event.key === "ArrowLeft") moveViewer(-1);
  if (viewerExpanded && !viewerExpanded.hidden && event.key === "ArrowRight") moveViewer(1);
});

document.querySelectorAll(".experience-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const article = button.closest("article");
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.querySelector("b").textContent = expanded ? "+" : "-";
    article.classList.toggle("is-expanded", !expanded);
  });
});

let testimonialIndex = 0;
let testimonialTimer;
const testimonialStage = document.querySelector(".testimonial-stage");

function renderTestimonial(direction = 1) {
  const item = testimonialData[testimonialIndex];
  testimonialStage?.classList.remove("slide-next", "slide-prev");
  testimonialStage?.classList.add(direction > 0 ? "slide-next" : "slide-prev");
  setText("[data-testimonial-quote]", item.quote);
  setText("[data-testimonial-name]", item.name);
  setText("[data-testimonial-role]", item.role);
  setText("[data-testimonial-initials]", item.initials);
  setText("[data-testimonial-count]", `${String(testimonialIndex + 1).padStart(2, "0")} / ${String(testimonialData.length).padStart(2, "0")}`);
}

function moveTestimonial(direction) {
  testimonialIndex = (testimonialIndex + direction + testimonialData.length) % testimonialData.length;
  renderTestimonial(direction);
}

function startTestimonialTimer() {
  if (reducedMotion) return;
  window.clearInterval(testimonialTimer);
  testimonialTimer = window.setInterval(() => moveTestimonial(1), 7000);
}

document.querySelector("[data-testimonial-prev]")?.addEventListener("click", () => {
  moveTestimonial(-1);
  startTestimonialTimer();
});
document.querySelector("[data-testimonial-next]")?.addEventListener("click", () => {
  moveTestimonial(1);
  startTestimonialTimer();
});
testimonialStage?.addEventListener("pointerenter", () => window.clearInterval(testimonialTimer));
testimonialStage?.addEventListener("pointerleave", startTestimonialTimer);
renderTestimonial();
startTestimonialTimer();

const revealItems = document.querySelectorAll(
  ".section-heading, .project-card, .service-card, .service-process, .proficiency-list article, .tools-grid > span, .focus-strip, .experience-list > article, .glance-grid > article, .testimonial-stage, .contact-details > *",
);
revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 70}ms`);
});

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  revealItems.forEach((item) => observer.observe(item));
}

function revealVisibleOrPassedItems() {
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((item) => {
    const bounds = item.getBoundingClientRect();
    if (bounds.top < window.innerHeight * 0.92 || bounds.bottom < 0) item.classList.add("is-visible");
  });
}
document.addEventListener("scroll", revealVisibleOrPassedItems, { passive: true });
requestAnimationFrame(revealVisibleOrPassedItems);

if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".project-card, .service-card").forEach((card) => {
    card.classList.add("tilt-card");
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 6}deg`);
      card.style.setProperty("--spot-x", `${x * 100}%`);
      card.style.setProperty("--spot-y", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}
