import * as THREE from "three";
import { OrbitControls } from "../vendor/three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "../vendor/three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "../vendor/three/addons/loaders/GLTFLoader.js";

const host = document.querySelector("[data-three-hero]");
const canvas = document.querySelector("#hero-three-canvas");
const poster = document.querySelector(".hero-three-poster");
const loading = document.querySelector("#hero-three-loading");
const errorMessage = document.querySelector("#hero-three-error");
const controlsPanel = document.querySelector("#hero-three-controls");
const toggleButton = document.querySelector("#hero-three-toggle");
const resetButton = document.querySelector("#hero-three-reset");

if (host && canvas) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05070d);
  scene.fog = new THREE.FogExp2(0x05070d, 0.035);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
  camera.position.set(0, 0.1, 5.2);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  scene.add(new THREE.HemisphereLight(0xc9e9ff, 0x101a37, 2.4));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
  keyLight.position.set(3, 4, 5);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x00cfff, 2.2);
  rimLight.position.set(-4, 1, -3);
  scene.add(rimLight);

  const orbit = new OrbitControls(camera, canvas);
  orbit.enableDamping = true;
  orbit.dampingFactor = 0.06;
  orbit.enablePan = false;
  orbit.minDistance = 3.1;
  orbit.maxDistance = 8;
  orbit.autoRotate = !reducedMotion;
  orbit.autoRotateSpeed = 0.65;
  orbit.saveState();

  const resize = () => {
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };
  new ResizeObserver(resize).observe(host);
  resize();

  let inView = true;
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
  }).observe(host);

  const render = () => {
    requestAnimationFrame(render);
    if (!inView || document.hidden) return;
    orbit.update();
    renderer.render(scene, camera);
  };
  render();

  const draco = new DRACOLoader();
  draco.setDecoderPath(new URL("../draco/", import.meta.url).href);
  draco.setDecoderConfig({ type: "wasm" });
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);

  loader.load(
    new URL("../models/dstk-showcase.glb", import.meta.url).href,
    (gltf) => {
      const model = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const scale = 3.72 / Math.max(size.x, size.y);

      model.position.sub(center);
      model.scale.setScalar(scale);
      model.rotation.set(0, -0.08, 0);
      scene.add(model);

      orbit.target.set(0, 0, 0);
      orbit.update();
      orbit.saveState();
      poster?.classList.add("is-hidden");
      canvas.classList.add("is-ready");
      loading?.setAttribute("hidden", "");
      controlsPanel?.removeAttribute("hidden");
    },
    (event) => {
      if (!loading || event.total <= 0) return;
      loading.textContent = `LOADING 3D  ${Math.round((event.loaded / event.total) * 100)}%`;
    },
    () => {
      loading?.setAttribute("hidden", "");
      errorMessage?.removeAttribute("hidden");
    },
  );

  toggleButton?.addEventListener("click", () => {
    orbit.autoRotate = !orbit.autoRotate;
    toggleButton.textContent = orbit.autoRotate ? "\u2161" : "\u25b6";
    const label = orbit.autoRotate ? "Pause automatic rotation" : "Play automatic rotation";
    toggleButton.setAttribute("aria-label", label);
    toggleButton.setAttribute("title", label);
  });

  resetButton?.addEventListener("click", () => orbit.reset());
}
