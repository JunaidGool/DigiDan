"use client";

import { useEffect, useRef } from "react";
import type * as T3 from "three";

/**
 * The hero hypercube: a WebGL representation of the DigiDan core, drawn strictly
 * from neon-teal light tracks with pulsing internal energy nodes. It tilts subtly
 * toward the cursor and idles with a slow rotation. UnrealBloom gives the lines
 * their neon-gas glow.
 *
 * three.js and its post-processing addons are imported dynamically inside the
 * effect, so nothing runs during SSR and the heavy 3D bundle is code-split away
 * from first paint. Reduced-motion renders a single static frame. The canvas is
 * decorative and hidden from assistive tech.
 */
export function Hypercube() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const { EffectComposer } = await import(
        "three/addons/postprocessing/EffectComposer.js"
      );
      const { RenderPass } = await import(
        "three/addons/postprocessing/RenderPass.js"
      );
      const { UnrealBloomPass } = await import(
        "three/addons/postprocessing/UnrealBloomPass.js"
      );
      if (disposed || !mount) return;

      const width = mount.clientWidth || 420;
      const height = mount.clientHeight || 420;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0, 7.2);

      // Brand tri-colour: neon-teal light tracks, yellow energy nodes, orange core.
      const NEON = new THREE.Color(0x2de1c6);
      const SPARK = new THREE.Color(0xf5c518);
      const ACTION = new THREE.Color(0xf07e26);

      // The core group: an outer cube, an inner cube and energy nodes.
      const core = new THREE.Group();
      scene.add(core);

      const outer = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(2.6, 2.6, 2.6)),
        new THREE.LineBasicMaterial({ color: NEON, transparent: true, opacity: 0.9 })
      );
      core.add(outer);

      const inner = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(1.25, 1.25, 1.25)),
        new THREE.LineBasicMaterial({ color: NEON, transparent: true, opacity: 0.65 })
      );
      core.add(inner);

      // Spokes from centre to the eight outer corners (the router feel).
      const c = 1.3;
      const corners = [
        [c, c, c], [c, c, -c], [c, -c, c], [c, -c, -c],
        [-c, c, c], [-c, c, -c], [-c, -c, c], [-c, -c, -c],
      ];
      const spokePts: number[] = [];
      for (const [x, y, z] of corners) spokePts.push(0, 0, 0, x, y, z);
      const spokes = new THREE.LineSegments(
        new THREE.BufferGeometry().setAttribute(
          "position",
          new THREE.Float32BufferAttribute(spokePts, 3)
        ),
        new THREE.LineBasicMaterial({ color: NEON, transparent: true, opacity: 0.22 })
      );
      core.add(spokes);

      // Energy nodes: corners in brand yellow, centre in brand orange.
      const nodeGeo = new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.Float32BufferAttribute(corners.flat(), 3)
      );
      const nodes = new THREE.Points(
        nodeGeo,
        new THREE.PointsMaterial({
          color: SPARK,
          size: 0.16,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      core.add(nodes);

      const centreNode = new THREE.Points(
        new THREE.BufferGeometry().setAttribute(
          "position",
          new THREE.Float32BufferAttribute([0, 0, 0], 3)
        ),
        new THREE.PointsMaterial({
          color: ACTION,
          size: 0.34,
          transparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      core.add(centreNode);

      core.rotation.set(-0.5, 0.7, 0);

      // Bloom for the neon-gas illumination.
      const composer = new EffectComposer(renderer);
      composer.setSize(width, height);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.9, // strength
        0.5, // radius
        0.0 // threshold
      );
      composer.addPass(bloom);

      // Cursor tilt.
      const target = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        const r = mount.getBoundingClientRect();
        const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        target.x = Math.max(-1, Math.min(1, nx));
        target.y = Math.max(-1, Math.min(1, ny));
      };
      if (!reduce) window.addEventListener("pointermove", onPointer, { passive: true });

      const onResize = () => {
        const w = mount.clientWidth || width;
        const h = mount.clientHeight || height;
        renderer.setSize(w, h);
        composer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      // Pause rendering when the canvas is offscreen.
      let visible = true;
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !reduce && raf === 0) loop();
        },
        { threshold: 0 }
      );
      io.observe(mount);

      const clock = new THREE.Clock();
      let raf = 0;

      const render = () => {
        const t = clock.getElapsedTime();
        // Idle rotation plus eased cursor tilt.
        core.rotation.y += 0.0022;
        core.rotation.x += (-0.5 + target.y * 0.4 - core.rotation.x) * 0.04;
        core.rotation.z += (target.x * 0.25 - core.rotation.z) * 0.04;
        // Pulse the energy nodes.
        const pulse = 0.75 + Math.sin(t * 2.2) * 0.25;
        (nodes.material as T3.PointsMaterial).size = 0.13 + pulse * 0.05;
        (centreNode.material as T3.PointsMaterial).opacity = 0.6 + pulse * 0.4;
        (inner.material as T3.LineBasicMaterial).opacity = 0.45 + pulse * 0.3;
        composer.render();
      };

      const loop = () => {
        if (disposed || !visible) {
          raf = 0;
          return;
        }
        render();
        raf = requestAnimationFrame(loop);
      };

      if (reduce) {
        render(); // single static frame
      } else {
        loop();
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointer);
        composer.dispose();
        renderer.dispose();
        scene.traverse((obj) => {
          const any = obj as unknown as {
            geometry?: { dispose: () => void };
            material?: { dispose: () => void };
          };
          any.geometry?.dispose();
          any.material?.dispose();
        });
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="h-[340px] w-full wide:h-[460px]"
    />
  );
}
