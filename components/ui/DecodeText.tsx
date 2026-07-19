"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>#$%*".split("");

/**
 * DecodeText: renders its text and, the first time it scrolls into view, boots
 * it in by scrambling through random glyphs and resolving left to right, like a
 * system decrypting. Server render and reduced-motion show the final text, so
 * there is no layout shift and no-JS is unaffected. Whitespace is preserved.
 */
export function DecodeText({
  text,
  as: Tag = "span",
  className,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let interval = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        let frame = 0;
        const total = Math.max(8, text.length);
        interval = window.setInterval(() => {
          frame++;
          const revealed = frame / 2; // ~2 frames per settled character
          setDisplay(
            text
              .split("")
              .map((ch, i) =>
                ch === " " || i < revealed
                  ? ch
                  : GLYPHS[(Math.random() * GLYPHS.length) | 0]
              )
              .join("")
          );
          if (revealed >= total) {
            window.clearInterval(interval);
            setDisplay(text);
          }
        }, 28);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(interval);
    };
  }, [text]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
