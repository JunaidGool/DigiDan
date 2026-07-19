"use client";

import { useEffect, useRef } from "react";
import type * as T3 from "three";

/**
 * The Living Isometric Core: DigiDan's own building-block language rendered as a
 * real-time WebGL structure. A central core module with eight satellite modules
 * in the three brand colours, wired to the core by light-beams that carry
 * travelling pulses. On load the modules assemble from a scattered state; at
 * rest the whole rig floats and rotates and parallax-tilts toward the cursor.
 *
 * Everything is hand-built on three.js primitives — no loaders, no helpers.
 * three is imported dynamically inside the effect so it is code-split away from
 * first paint and never runs during SSR. Reduced motion renders one assembled,
 * still frame. The rig is decorative; the surrounding copy carries the meaning.
 */

const TEAL = 0x2de1c6;
const ORANGE = 0xf07e26;
const YELLOW = 0xf5c518;

// Satellite modules: target position, half-size and brand colour. The core is
// added separately at the origin.
const MODULES: { pos: [number, number, number]; s: number; color: number }[] = [
  { pos: [2.4, 0.15, 0], s: 0.5, color: TEAL },
  { pos: [-2.4, -0.15, 0], s: 0.5, color: ORANGE },
  { pos: [0, 0.15, 2.4], s: 0.5, color: YELLOW },
  { pos: [0, -0.15, -2.4], s: 0.5, color: TEAL },
  { pos: [1.5, 1.7, 1.5], s: 0.42, color: ORANGE },
  { pos: [-1.5, 1.7, -1.5], s: 0.42, color: YELLOW },
  { pos: [1.5, -1.7, -1.5], s: 0.42, color: TEAL },
  { pos: [-1.5, -1.7, 1.5], s: 0.42, color: ORANGE },
];

export function IsometricCore() {
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

      const W = () => mount.clientWidth || 600;
      const H = () => mount.clientHeight || 560;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W(), H());
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();

      // Orthographic camera at an isometric vantage for true parallel projection.
      const frustum = 5.5;
      const aspect = W() / H();
      const cam = new THREE.OrthographicCamera(
        -frustum * aspect, frustum * aspect, frustum, -frustum, 0.1, 100
      );
      cam.position.set(6, 4.6, 6);
      cam.lookAt(0, 0, 0);

      const rig = new THREE.Group();
      scene.add(rig);

      type Block = {
        group: T3.Group;
        edges: T3.LineSegments;
        faces: T3.Mesh;
        target: T3.Vector3;
        scatter: T3.Vector3;
        bob: number;
      };
      const blocks: Block[] = [];

      const makeBlock = (
        pos: [number, number, number],
        s: number,
        color: number,
        i: number
      ): Block => {
        const group = new THREE.Group();
        const box = new THREE.BoxGeometry(s * 2, s * 2, s * 2);
        const faces = new THREE.Mesh(
          box,
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.08,
            depthWrite: false,
          })
        );
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(box),
          new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 })
        );
        group.add(faces, edges);
        const target = new THREE.Vector3(...pos);
        // Scatter outward from the target for the assembly-in animation.
        const dir = target.clone().normalize();
        const scatter = target.clone().addScaledVector(dir.lengthSq() ? dir : new THREE.Vector3(0, 1, 0), 5).add(
          new THREE.Vector3(0, 3, 0)
        );
        group.position.copy(reduce ? target : scatter);
        rig.add(group);
        return { group, edges, faces, target, scatter, bob: i * 0.9 };
      };

      // Core (white, larger) then satellites.
      const core = makeBlock([0, 0, 0], 0.85, 0xffffff, 0);
      MODULES.forEach((m, i) => blocks.push(makeBlock(m.pos, m.s, m.color, i + 1)));

      // Light beams + travelling pulses from the core to each satellite.
      const pulses: { mesh: T3.Mesh; from: T3.Vector3; to: T3.Vector3; color: number }[] = [];
      MODULES.forEach((m) => {
        const to = new THREE.Vector3(...m.pos);
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          to,
        ]);
        const line = new THREE.Line(
          geo,
          new THREE.LineBasicMaterial({ color: m.color, transparent: true, opacity: 0.28 })
        );
        rig.add(line);

        const pulse = new THREE.Mesh(
          new THREE.SphereGeometry(0.075, 12, 12),
          new THREE.MeshBasicMaterial({ color: m.color, transparent: true, opacity: 0.95 })
        );
        rig.add(pulse);
        pulses.push({ mesh: pulse, from: new THREE.Vector3(0, 0, 0), to, color: m.color });
      });

      // Interaction + timing state.
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointer = (e: PointerEvent) => {
        const r = mount.getBoundingClientRect();
        pointer.tx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) || 0;
        pointer.ty = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) || 0;
      };
      if (!reduce) window.addEventListener("pointermove", onPointer, { passive: true });

      let scrollFade = 1;
      const onScroll = () => {
        const r = mount.getBoundingClientRect();
        scrollFade = Math.max(0, Math.min(1, 1 - -r.top / (r.height * 1.1)));
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      const onResize = () => {
        const a = W() / H();
        cam.left = -frustum * a;
        cam.right = frustum * a;
        cam.top = frustum;
        cam.bottom = -frustum;
        cam.updateProjectionMatrix();
        renderer.setSize(W(), H());
      };
      window.addEventListener("resize", onResize);

      let visible = true;
      const io = new IntersectionObserver(
        ([e]) => {
          visible = e.isIntersecting;
          if (visible && raf === 0) loop();
        },
        { threshold: 0 }
      );
      io.observe(mount);

      const clock = new THREE.Clock();
      let raf = 0;
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const allBlocks = [core, ...blocks];

      const render = () => {
        const t = clock.getElapsedTime();
        const assemble = reduce ? 1 : easeOut(Math.min(1, t / 1.7));

        // Assemble + float each block; stagger by index.
        allBlocks.forEach((b, i) => {
          const local = reduce ? 1 : easeOut(Math.max(0, Math.min(1, (t - i * 0.08) / 1.3)));
          b.group.position.lerpVectors(b.scatter, b.target, local);
          if (!reduce) {
            b.group.position.y += Math.sin(t * 1.1 + b.bob) * 0.05 * assemble;
            b.group.rotation.y = Math.sin(t * 0.4 + b.bob) * 0.08;
          }
          const mat = b.faces.material as T3.MeshBasicMaterial;
          const emat = b.edges.material as T3.LineBasicMaterial;
          mat.opacity = 0.08 * local * scrollFade;
          emat.opacity = 0.95 * local * scrollFade;
        });

        // Travelling pulses ride the beams, ping-ponging with a per-beam phase.
        pulses.forEach((p, i) => {
          const phase = (t * 0.55 + i * 0.17) % 1;
          const k = phase < 0.5 ? phase * 2 : (1 - phase) * 2; // 0..1..0
          p.mesh.position.lerpVectors(p.from, p.to, k * assemble);
          const m = p.mesh.material as T3.MeshBasicMaterial;
          m.opacity = (0.35 + 0.65 * Math.sin(phase * Math.PI)) * scrollFade * assemble;
          p.mesh.scale.setScalar(0.7 + 0.6 * Math.sin(phase * Math.PI));
        });

        // Cursor parallax + slow idle spin.
        pointer.x += (pointer.tx - pointer.x) * 0.05;
        pointer.y += (pointer.ty - pointer.y) * 0.05;
        rig.rotation.y = (reduce ? 0.5 : t * 0.12) + pointer.x * 0.4;
        rig.rotation.x = -0.05 + pointer.y * 0.25;

        renderer.render(scene, cam);
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
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        scene.traverse((o) => {
          const any = o as unknown as {
            geometry?: { dispose: () => void };
            material?: { dispose: () => void };
          };
          any.geometry?.dispose();
          any.material?.dispose();
        });
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
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
      className="relative h-[380px] w-full touch-none select-none wide:h-[560px]"
    />
  );
}
