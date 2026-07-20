import * as THREE from "three";
import { OrbitControls } from "../vendor/three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "../vendor/three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "../vendor/three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "../vendor/three/addons/environments/RoomEnvironment.js";

const host = document.querySelector("[data-three-hero]");
const loadingLabel = document.documentElement.lang === "th" ? "กำลังโหลด 3D" : "LOADING 3D";
const canvas = document.querySelector("#hero-three-canvas");
const poster = document.querySelector(".hero-three-poster");
const loading = document.querySelector("#hero-three-loading");
const errorMessage = document.querySelector("#hero-three-error");
const controlsPanel = document.querySelector("#hero-three-controls");
const resetButton = document.querySelector("#hero-three-reset");

if (host && canvas) {
  let reducedMotion = document.documentElement.dataset.motion === "reduced";
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfff8e9);
  scene.fog = new THREE.FogExp2(0xfff8e9, 0.035);

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
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.08;

  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(environment, 0.04).texture;
  scene.environmentIntensity = 0.85;
  environment.dispose();
  pmrem.dispose();

  scene.add(new THREE.HemisphereLight(0xffffff, 0xffead2, 1.65));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
  keyLight.position.set(3, 4, 5);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xfff3e3, 1.0);
  fillLight.position.set(-3, 2, 4);
  scene.add(fillLight);
  const rimLight = new THREE.DirectionalLight(0x25d6ed, 0.55);
  rimLight.position.set(-4, 1, -3);
  scene.add(rimLight);

  const orbit = new OrbitControls(camera, canvas);
  orbit.enableDamping = true;
  orbit.dampingFactor = 0.06;
  orbit.enablePan = false;
  orbit.minDistance = 3.1;
  orbit.maxDistance = 8;
  orbit.autoRotate = false;
  orbit.saveState();

  let floatingModel = null;
  const motionClock = new THREE.Clock();
  const pointerCurrent = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const pointerFine = window.matchMedia("(pointer: fine)").matches;

  if (pointerFine) {
    canvas.addEventListener("pointermove", (event) => {
      if (reducedMotion) return;
      const bounds = canvas.getBoundingClientRect();
      pointerTarget.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
      );
    });
    canvas.addEventListener("pointerleave", () => pointerTarget.set(0, 0));
  }

  window.addEventListener("portfolio:motion-change", (event) => {
    reducedMotion = Boolean(event.detail?.reduced);
    if (reducedMotion) pointerTarget.set(0, 0);
  });

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
    pointerCurrent.lerp(pointerTarget, 0.075);
    if (floatingModel && !reducedMotion) {
      const elapsed = motionClock.getElapsedTime();
      floatingModel.position.set(
        Math.sin(elapsed * 0.62) * 0.18 + pointerCurrent.x * 0.18,
        Math.sin(elapsed * 0.78 + 0.8) * 0.1 - pointerCurrent.y * 0.11,
        Math.cos(elapsed * 0.54) * 0.1 + Math.abs(pointerCurrent.x) * 0.04,
      );
      floatingModel.rotation.set(
        Math.sin(elapsed * 0.5) * 0.04 - pointerCurrent.y * 0.1,
        -0.08 + Math.sin(elapsed * 0.46) * 0.11 + pointerCurrent.x * 0.22,
        Math.sin(elapsed * 0.38) * 0.025 - pointerCurrent.x * 0.025,
      );
    }
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
      const scale = 3.45 / Math.max(size.x, size.y);

      model.position.sub(center);
      model.scale.setScalar(scale);
      floatingModel = new THREE.Group();
      floatingModel.rotation.y = -0.08;
      floatingModel.add(model);
      scene.add(floatingModel);

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
      loading.textContent = `${loadingLabel}  ${Math.round((event.loaded / event.total) * 100)}%`;
    },
    () => {
      loading?.setAttribute("hidden", "");
      errorMessage?.removeAttribute("hidden");
    },
  );

  resetButton?.addEventListener("click", () => {
    orbit.reset();
    pointerCurrent.set(0, 0);
    pointerTarget.set(0, 0);
    floatingModel?.position.set(0, 0, 0);
    floatingModel?.rotation.set(0, -0.08, 0);
  });
}
