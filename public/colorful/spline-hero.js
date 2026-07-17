const host = document.querySelector("[data-three-hero]");
const splineLayer = document.querySelector("#hero-spline-layer");
const splineViewer = document.querySelector("#hero-spline-viewer");
const poster = document.querySelector(".hero-three-poster");
const canvas = document.querySelector("#hero-three-canvas");
const badge = document.querySelector("#hero-three-badge");
const loading = document.querySelector("#hero-three-loading");
const errorMessage = document.querySelector("#hero-three-error");
const threeControls = document.querySelector("#hero-three-controls");
const modeButtons = [...document.querySelectorAll("[data-hero-3d-mode]")].filter((item) => item !== host);

let threeLoaded = false;
let splineLoaded = false;
let splineRequested = false;
let loadTimer;

function updateModeButtons(mode) {
  modeButtons.forEach((button) => {
    const active = button.getAttribute("data-hero-3d-mode") === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

async function loadOriginalThree() {
  if (threeLoaded) return;
  threeLoaded = true;
  await import("./three-hero.js");
}

async function loadSpline() {
  if (splineLoaded || splineRequested || !splineViewer) return;
  splineRequested = true;
  loading?.removeAttribute("hidden");
  if (loading) loading.textContent = "LOADING SPLINE";

  loadTimer = window.setTimeout(() => {
    if (splineLoaded) return;
    loading?.setAttribute("hidden", "");
    if (errorMessage) {
      errorMessage.textContent = "Spline demo is taking longer than expected";
      errorMessage.removeAttribute("hidden");
    }
  }, 15000);

  const completeSplineLoad = () => {
    splineLoaded = true;
    window.clearTimeout(loadTimer);
    loading?.setAttribute("hidden", "");
    errorMessage?.setAttribute("hidden", "");
    poster?.classList.add("is-hidden");
  };

  try {
    await import("https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js");
    await customElements.whenDefined("spline-viewer");
    const detectLoadedScene = window.setInterval(() => {
      if (!splineViewer._loaded) return;
      window.clearInterval(detectLoadedScene);
      completeSplineLoad();
    }, 200);
  } catch {
    window.clearTimeout(loadTimer);
    loading?.setAttribute("hidden", "");
    if (errorMessage) {
      errorMessage.textContent = "Spline demo unavailable - try Original 3D";
      errorMessage.removeAttribute("hidden");
    }
  }
}

function setMode(mode) {
  if (!host || !splineLayer) return;
  host.setAttribute("data-hero-3d-mode", mode);
  updateModeButtons(mode);
  errorMessage?.setAttribute("hidden", "");

  if (mode === "spline") {
    splineLayer.classList.add("is-active");
    splineLayer.setAttribute("aria-hidden", "false");
    canvas?.setAttribute("aria-hidden", "true");
    threeControls?.setAttribute("hidden", "");
    if (badge) badge.textContent = "SPLINE / INTERACTIVE DEMO";
    if (!splineLoaded) poster?.classList.remove("is-hidden");
    loadSpline();
    return;
  }

  splineLayer.classList.remove("is-active");
  splineLayer.setAttribute("aria-hidden", "true");
  canvas?.setAttribute("aria-hidden", "false");
  if (badge) badge.textContent = "BLENDER / WEBGL";
  if (!canvas?.classList.contains("is-ready")) {
    poster?.classList.remove("is-hidden");
    if (loading) loading.textContent = "LOADING 3D  0%";
    loading?.removeAttribute("hidden");
  } else {
    poster?.classList.add("is-hidden");
    loading?.setAttribute("hidden", "");
    threeControls?.removeAttribute("hidden");
  }
  loadOriginalThree();
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.getAttribute("data-hero-3d-mode")));
});

setMode("spline");
