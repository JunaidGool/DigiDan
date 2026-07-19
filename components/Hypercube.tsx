"use client";

import { useEffect, useRef } from "react";
import type * as T3 from "three";
import { LogoMark } from "./Logo";

/**
 * The DigiDan core: the tri-colour DigiDan logo held static and upright inside a
 * larger wireframe building block. The block is a WebGL cube drawn from crisp
 * neon-teal light tracks with brand-yellow corner nodes; it rotates slowly and
 * tilts toward the cursor while the logo at its centre stays fixed, crisp and
 * never distorted. The canvas is transparent, so it sits cleanly on any theme.
 *
 * three.js is imported dynamically inside the effect, so nothing runs during SSR
 * and the 3D bundle is code-split away from first paint. Reduced-motion renders
 * a single static frame. The block is decorative; the logo carries the label.
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
      if (disposed || !mount) return;

      const width = mount.clientWidth || 420;
      const height = mount.clientHeight || 420;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0, 8);

      const NEON = new THREE.Color(0x2de1c6); // brand teal light tracks
      const SPARK = new THREE.Color(0xf5c518); // brand yellow corner nodes

      // The building block: one larger wireframe cube that frames the logo.
      const block = new THREE.Group();
      scene.add(block);

      const SIZE = 2.8;
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(SIZE, SIZE, SIZE)),
        new THREE.LineBasicMaterial({ color: NEON, transparent: true, opacity: 0.9 })
      );
      block.add(edges);

      // Brand-yellow energy nodes at the eight corners of the block.
      const c = SIZE / 2;
      const corners = [
        [c, c, c], [c, c, -c], [c, -c, c], [c, -c, -c],
        [-c, c, c], [-c, c, -c], [-c, -c, c], [-c, -c, -c],
      ].flat();
      const nodes = new THREE.Points(
        new THREE.BufferGeometry().setAttribute(
          "position",
          new THREE.Float32BufferAttribute(corners, 3)
        ),
        new THREE.PointsMaterial({
          color: SPARK,
          size: 0.16,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      block.add(nodes);

      block.rotation.set(-0.5, 0.7, 0);

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
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

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
        block.rotation.y += 0.0022;
        block.rotation.x += (-0.5 + target.y * 0.4 - block.rotation.x) * 0.04;
        block.rotation.z += (target.x * 0.22 - block.rotation.z) * 0.04;
        const pulse = 0.75 + Math.sin(t * 2.2) * 0.25;
        (nodes.material as T3.PointsMaterial).size = 0.13 + pulse * 0.05;
        renderer.render(scene, camera);
      };

      const loop = () => {
        if (disposed || !visible) {
          raf = 0;
          return;
        }
        render();
        raf = requestAnimationFrame(loop);
      };

      if (reduce) render();
      else loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointer);
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
    <div ref={mountRef} className="relative h-[340px] w-full wide:h-[460px]">
      {/* The DigiDan logo, held static and upright inside the block. */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <LogoMark
          className="h-auto w-[34%] max-w-[170px]"
          title="The DigiDan core"
        />
      </div>
    </div>
  );
}
