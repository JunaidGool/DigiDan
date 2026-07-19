"use client";

import { useEffect, useRef, useState } from "react";
import { MenuGlyph, CloseGlyph } from "./ui/glyphs";
import { LogoMark, Wordmark } from "./Logo";
import { Button } from "./ui/Button";
import { nav, hero, CONTACT_HREF } from "@/content/home";

/**
 * Nav: a sticky, near-black header with a hairline base. Left: the white cube
 * mark plus the `d g d n` wordmark. Right (desktop): quiet links and the solid
 * orange primary action. Below the wide breakpoint the links collapse into a
 * full-screen custom menu. The header gains a faint blur and border once the
 * page has scrolled.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300 " +
          (scrolled
            ? "border-b border-line bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent")
        }
      >
        <div className="shell flex h-16 items-center justify-between wide:h-20">
          <a
            href="#top"
            aria-label="DigiDan home"
            className="flex shrink-0 items-center gap-2.5 text-white"
          >
            <LogoMark size={30} tone="brand" title="DigiDan" />
            <Wordmark className="text-[0.95rem] text-white" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 wide:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-ash transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <Button href={CONTACT_HREF} size="md" withArrow>
              {hero.primary}
            </Button>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-1 rounded-full p-2 text-white wide:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <MenuGlyph size={24} />
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-ink wide:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between px-5">
            <span className="flex items-center gap-2.5 text-white">
              <LogoMark size={30} tone="brand" title="DigiDan" />
              <Wordmark className="text-[0.95rem] text-white" />
            </span>
            <button
              ref={closeRef}
              type="button"
              className="-mr-1 rounded-full p-2 text-white"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <CloseGlyph size={24} />
            </button>
          </div>

          <nav aria-label="Mobile" className="shell flex flex-1 flex-col gap-1 pt-8">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-5 text-2xl font-semibold text-white"
              >
                {item.label}
              </a>
            ))}
            <Button
              href={CONTACT_HREF}
              size="lg"
              withArrow
              className="mt-8 w-full"
              onClick={() => setOpen(false)}
            >
              {hero.primary}
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}
