"use client";

import { useEffect, useRef } from "react";
import type * as T3 from "three";

/**
 * Live System Architecture: a real-time WebGL diagram of the kind of system
 * DigiDan builds. Labelled module blocks (Client, API Gateway, Services, Ledger,
 * Queue, AI) assemble on load and are wired together; glowing data packets flow
 * along the wires in the direction requests travel, so the whole thing reads as
 * a system actually running. Labels are HTML projected onto each 3D node so they
 * stay crisp and legible while the rig parallax-tilts to the cursor.
 *
 * Hand-built on three.js primitives — no loaders, no helpers. three is imported
 * dynamically (code-split, no SSR). Reduced motion renders one assembled, still
 * frame with no packet flow.
 */

const TEAL = 0x2de1c6;
const ORANGE = 0xf07e26;
const YELLOW = 0xf5c518;
const WHITE = 0xffffff;
const HEX: Record<number, string> = {
  [TEAL]: "#2DE1C6",
  [ORANGE]: "#F07E26",
  [YELLOW]: "#F5C518",
  [WHITE]: "#FFFFFF",
};

type NodeDef = {
  id: string;
  label: string;
  pos: [number, number, number];
  s: number;
  color: number;
};

// A legible left-to-right architecture laid out on the ground plane.
const NODES: NodeDef[] = [
  { id: "client", label: "Client", pos: [-4.6, 0, -0.4], s: 0.46, color: TEAL },
  { id: "gateway", label: "API Gateway", pos: [-1.9, 0, 0.9], s: 0.5, color: ORANGE },
  { id: "services", label: "Services", pos: [0.7, 0, -0.6], s: 0.82, color: WHITE },
  { id: "ledger", label: "Database", pos: [3.4, 0, 1.0], s: 0.52, color: YELLOW },
  { id: "queue", label: "Queue", pos: [3.2, 0, -2.1], s: 0.48, color: TEAL },
  { id: "ai", label: "AI", pos: [0.5, 0, 2.5], s: 0.46, color: ORANGE },
];

// Directed wires: data travels from → to.
const EDGES: { from: string; to: string; color: number }[] = [
  { from: "client", to: "gateway", color: TEAL },
  { from: "gateway", to: "services", color: ORANGE },
  { from: "services", to: "ledger", color: YELLOW },
  { from: "services", to: "queue", color: TEAL },
  { from: "services", to: "ai", color: ORANGE },
];

export function IsometricCore() {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const labelHost = labelsRef.current;
    if (!mount || !labelHost) return;
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
      // Pull the camera back on narrow screens so the whole system stays in view.
      const frustumFor = () => (W() < 680 ? 6.6 : 4.2);
      let frustum = frustumFor();
      const applyCam = () => {
        const a = W() / H();
        cam.left = -frustum * a;
        cam.right = frustum * a;
        cam.top = frustum;
        cam.bottom = -frustum;
        cam.updateProjectionMatrix();
      };
      const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
      cam.position.set(6, 5, 6);
      cam.lookAt(0, 0, 0);
      applyCam();

      const rig = new THREE.Group();
      scene.add(rig);

      // --- Nodes -----------------------------------------------------------
      type Node = {
        def: NodeDef;
        group: T3.Group;
        edges: T3.LineSegments;
        faces: T3.Mesh;
        target: T3.Vector3;
        labelEl: HTMLDivElement;
      };
      const nodes: Record<string, Node> = {};

      NODES.forEach((def, i) => {
        const group = new THREE.Group();
        const box = new THREE.BoxGeometry(def.s * 2, def.s * 2, def.s * 2);
        const faces = new THREE.Mesh(
          box,
          new THREE.MeshBasicMaterial({
            color: def.color,
            transparent: true,
            opacity: 0.1,
            depthWrite: false,
          })
        );
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(box),
          new THREE.LineBasicMaterial({ color: def.color, transparent: true, opacity: 0.95 })
        );
        group.add(faces, edges);
        const target = new THREE.Vector3(...def.pos);
        group.position.set(target.x, reduce ? target.y : target.y - 3, target.z);
        rig.add(group);

        // Projected HTML label.
        const el = document.createElement("div");
        el.style.cssText =
          "position:absolute;left:0;top:0;white-space:nowrap;display:flex;align-items:center;gap:6px;" +
          "font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;font-weight:500;" +
          "letter-spacing:0.1em;text-transform:uppercase;color:#d3d7de;padding:3px 9px;border-radius:999px;" +
          "border:1px solid rgba(255,255,255,0.12);background:rgba(8,9,13,0.66);will-change:transform;";
        el.innerHTML =
          `<span style="width:6px;height:6px;border-radius:999px;background:${HEX[def.color]}"></span>` +
          def.label;
        labelHost.appendChild(el);

        nodes[def.id] = { def, group, edges, faces, target, labelEl: el };
        void i;
      });

      // --- Edges + packets -------------------------------------------------
      type Edge = {
        line: T3.Line;
        from: T3.Vector3;
        to: T3.Vector3;
        packets: T3.Mesh[];
        color: number;
      };
      const edges: Edge[] = [];
      EDGES.forEach((e) => {
        const a = new THREE.Vector3(...nodes[e.from].def.pos);
        const b = new THREE.Vector3(...nodes[e.to].def.pos);
        const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
        const line = new THREE.Line(
          geo,
          new THREE.LineBasicMaterial({ color: e.color, transparent: true, opacity: 0 })
        );
        rig.add(line);

        const packets: T3.Mesh[] = [];
        const count = 2;
        for (let i = 0; i < count; i++) {
          const pk = new THREE.Mesh(
            new THREE.BoxGeometry(0.16, 0.16, 0.16),
            new THREE.MeshBasicMaterial({ color: e.color, transparent: true, opacity: 0 })
          );
          rig.add(pk);
          packets.push(pk);
        }
        edges.push({ line, from: a, to: b, packets, color: e.color });
      });

      // --- Interaction -----------------------------------------------------
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointer = (ev: PointerEvent) => {
        // Only a real mouse tilts the rig. Touch pointermove fires while the
        // user drags to scroll, which would swing the scene left and right.
        if (ev.pointerType === "touch") return;
        const r = mount.getBoundingClientRect();
        pointer.tx = ((ev.clientX - (r.left + r.width / 2)) / (r.width / 2)) || 0;
        pointer.ty = ((ev.clientY - (r.top + r.height / 2)) / (r.height / 2)) || 0;
      };
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      if (!reduce && finePointer)
        window.addEventListener("pointermove", onPointer, { passive: true });

      let scrollFade = 1;
      const onScroll = () => {
        const r = mount.getBoundingClientRect();
        scrollFade = Math.max(0, Math.min(1, 1 - -r.top / (r.height * 1.15)));
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      const onResize = () => {
        frustum = frustumFor();
        applyCam();
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

      // --- Render loop -----------------------------------------------------
      const clock = new THREE.Clock();
      let raf = 0;
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tmp = new THREE.Vector3();
      const nodeList = Object.values(nodes);

      const render = () => {
        const t = clock.getElapsedTime();

        // Gentle cursor tilt (no full spin, so the diagram stays readable).
        pointer.x += (pointer.tx - pointer.x) * 0.05;
        pointer.y += (pointer.ty - pointer.y) * 0.05;
        rig.rotation.y = pointer.x * 0.3;
        rig.rotation.x = pointer.y * 0.14;
        rig.updateMatrixWorld();

        // Assemble nodes (rise + scale in, staggered) and float gently.
        nodeList.forEach((n, i) => {
          const local = reduce ? 1 : ease(Math.max(0, Math.min(1, (t - i * 0.12) / 1.1)));
          const y = n.target.y - (1 - local) * 3 + (reduce ? 0 : Math.sin(t * 1.1 + i) * 0.04 * local);
          n.group.position.set(n.target.x, y, n.target.z);
          n.group.scale.setScalar(local);
          (n.faces.material as T3.MeshBasicMaterial).opacity = 0.1 * local * scrollFade;
          (n.edges.material as T3.LineBasicMaterial).opacity = 0.95 * local * scrollFade;

          // Project the label to screen, floating just above the block.
          tmp.set(n.target.x, y + n.def.s + 0.55, n.target.z);
          rig.localToWorld(tmp);
          tmp.project(cam);
          const sx = (tmp.x * 0.5 + 0.5) * W();
          const sy = (-tmp.y * 0.5 + 0.5) * H();
          n.labelEl.style.transform = `translate(-50%,-50%) translate(${sx}px,${sy}px)`;
          n.labelEl.style.opacity = String(local * scrollFade);
        });

        // Wires fade in after their nodes; packets ride them once flowing.
        const wireIn = reduce ? 1 : ease(Math.max(0, Math.min(1, (t - 0.9) / 0.8)));
        edges.forEach((e, ei) => {
          (e.line.material as T3.LineBasicMaterial).opacity = 0.24 * wireIn * scrollFade;
          e.packets.forEach((pk, pi) => {
            const phase = (t * 0.32 + pi * 0.5 + ei * 0.13) % 1;
            pk.position.lerpVectors(e.from, e.to, phase);
            const m = pk.material as T3.MeshBasicMaterial;
            m.opacity = reduce ? 0 : Math.sin(phase * Math.PI) * wireIn * scrollFade;
            pk.scale.setScalar(0.7 + 0.5 * Math.sin(phase * Math.PI));
          });
        });

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
        nodeList.forEach((n) => n.labelEl.remove());
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
    <div className="relative h-[440px] w-full touch-none select-none wide:h-[520px]">
      <div ref={mountRef} aria-hidden="true" className="absolute inset-0" />
      <div ref={labelsRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  );
}
