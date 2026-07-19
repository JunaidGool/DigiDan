"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoMark, Wordmark } from "./Logo";
import { nav, footer, CONTACT_HREF } from "@/content/home";

/**
 * Nav (The Grid): a light-track strip over the void. Fixed, near-black with
 * blur, its bottom edge a glowing cyan circuit line. Left: cyan mini mark plus
 * the `d g d n` wordmark. Right: mono links plus the amber Contact action.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan/40 bg-void/80 shadow-[0_1px_20px_rgba(0,229,255,0.25)] backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between">
          <a
            href="#top"
            aria-label="DigiDan home"
            className="flex shrink-0 items-center gap-3 text-cyan"
          >
            <LogoMark size={26} title="DigiDan" />
            <Wordmark className="text-[0.95rem] text-white" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 wide:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label transition-colors hover:text-cyan"
              >
                {item.label}
              </a>
            ))}
            <a href={CONTACT_HREF} className="btn btn-amber">
              {footer.contact}
            </a>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-1 p-1 text-cyan wide:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-void wide:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-cyan/40 px-6 shadow-[0_1px_20px_rgba(0,229,255,0.25)]">
            <span className="flex items-center gap-3 text-cyan">
              <LogoMark size={26} title="DigiDan" />
              <Wordmark className="text-[0.95rem] text-white" />
            </span>
            <button
              ref={closeRef}
              type="button"
              className="-mr-1 p-1 text-cyan"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          <nav aria-label="Mobile" className="shell flex flex-1 flex-col gap-2 py-8">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-cyan/15 py-4 font-display text-xl text-white transition-colors hover:text-cyan"
              >
                {item.label}
              </a>
            ))}
            <a
              href={CONTACT_HREF}
              onClick={() => setOpen(false)}
              className="btn btn-amber mt-8 w-full"
            >
              {footer.contact}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
