import { useEffect, useRef, useState } from "react";
import { Pause, Play, RefreshCw } from "lucide-react";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useContent } from "../context/ContentContext";

const MODEL_PATH = "models/dstk-showcase.glb";
const POSTER_PATH = "models/dstk-poster.webp";
const DRACO_PATH = "draco/";

function resolveAsset(path: string) {
  return new URL(path, document.baseURI).href;
}

export function ThreeDShowcase() {
  const { lang } = useContent();
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const copy = lang === "th"
    ? {
        label: "ผลงาน 3D",
        title: "ฉาก 3D แบบอินเทอร์แอคทีฟ",
        description: "คอมโพสิชัน Blender ที่ปรับให้เบาสำหรับเว็บ ลากเพื่อหมุนและซูมดูรายละเอียดได้",
        loading: "กำลังโหลดโมเดล",
        pause: "หยุดการหมุนอัตโนมัติ",
        play: "เปิดการหมุนอัตโนมัติ",
        reset: "กลับไปมุมเริ่มต้น",
        error: "ไม่สามารถโหลดโมเดล 3D ได้",
      }
    : {
        label: "3D SHOWCASE",
        title: "INTERACTIVE 3D SCENE",
        description: "A Blender composition optimized for the web. Drag to orbit and zoom in to inspect the details.",
        loading: "LOADING MODEL",
        pause: "Pause automatic rotation",
        play: "Play automatic rotation",
        reset: "Reset camera view",
        error: "The 3D model could not be loaded",
      };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    controlsRef.current && (controlsRef.current.autoRotate = autoRotate);
  }, [autoRotate]);

  useEffect(() => {
    if (!shouldLoad || !hostRef.current || !canvasRef.current) return;

    const host = hostRef.current;
    const canvas = canvasRef.current;
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

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 3.1;
    controls.maxDistance = 8;
    controls.autoRotate = autoRotate && !reducedMotion;
    controls.autoRotateSpeed = 0.65;
    controls.saveState();
    controlsRef.current = controls;

    const draco = new DRACOLoader();
    draco.setDecoderPath(resolveAsset(DRACO_PATH));
    draco.setDecoderConfig({ type: "wasm" });
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    let model: THREE.Object3D | null = null;
    let raf = 0;
    let inView = true;
    let disposed = false;

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    visibilityObserver.observe(host);

    const render = () => {
      if (disposed) return;
      raf = requestAnimationFrame(render);
      if (!inView || document.hidden) return;
      controls.update();
      renderer.render(scene, camera);
    };
    render();

    loader.load(
      resolveAsset(MODEL_PATH),
      (gltf) => {
        if (disposed) return;
        model = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        const scale = 3.75 / Math.max(size.x, size.y);

        model.position.sub(center);
        model.scale.setScalar(scale);
        model.rotation.set(0, -0.08, 0);
        scene.add(model);

        controls.target.set(0, 0, 0);
        controls.update();
        controls.saveState();
        setReady(true);
        setProgress(100);
      },
      (event) => {
        if (event.total > 0) setProgress(Math.round((event.loaded / event.total) * 100));
      },
      () => {
        if (!disposed) setFailed(true);
      },
    );

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      controls.dispose();
      controlsRef.current = null;
      draco.dispose();
      if (model) {
        model.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            Object.values(material).forEach((value) => {
              if (value instanceof THREE.Texture) value.dispose();
            });
            material.dispose();
          });
        });
      }
      renderer.dispose();
    };
  }, [shouldLoad]);

  return (
    <section id="three-d-showcase-content" className="relative overflow-hidden py-24" style={{ background: "#05070d" }}>
      <div className="mx-auto mb-10 max-w-7xl px-6 md:px-16 lg:px-24">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#00d4ff]" />
              <p className="text-xs tracking-[0.3em] text-[#00d4ff]">{copy.label}</p>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[-0.03em] text-white">{copy.title}</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/45">{copy.description}</p>
        </div>
      </div>

      <div
        ref={hostRef}
        className="relative h-[560px] w-full border-y border-white/10 md:h-[680px]"
      >
        <img
          src={resolveAsset(POSTER_PATH)}
          alt="DSTK Blender composition preview"
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
        />
        <canvas
          ref={canvasRef}
          aria-label={copy.title}
          className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-6">
          <span className="rounded-full border border-[#00d4ff]/30 bg-black/55 px-3 py-1.5 text-[10px] tracking-[0.18em] text-[#00d4ff] backdrop-blur-md">
            BLENDER / WEBGL
          </span>
          {!ready && !failed ? (
            <span className="rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-[10px] tracking-[0.15em] text-white/65 backdrop-blur-md">
              {copy.loading} {progress}%
            </span>
          ) : null}
        </div>

        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/35 text-sm text-white/70">{copy.error}</div>
        ) : null}

        {ready ? (
          <div className="absolute bottom-4 right-4 flex gap-2 md:bottom-6 md:right-6">
            <button
              type="button"
              aria-label={autoRotate ? copy.pause : copy.play}
              title={autoRotate ? copy.pause : copy.play}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/75 backdrop-blur-md transition-colors hover:border-[#00d4ff]/50 hover:text-[#00d4ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
              onClick={() => setAutoRotate((value) => !value)}
            >
              {autoRotate ? <Pause size={17} /> : <Play size={17} />}
            </button>
            <button
              type="button"
              aria-label={copy.reset}
              title={copy.reset}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/75 backdrop-blur-md transition-colors hover:border-[#00d4ff]/50 hover:text-[#00d4ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
              onClick={() => controlsRef.current?.reset()}
            >
              <RefreshCw size={17} />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
