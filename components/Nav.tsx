"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoMark, Wordmark } from "./Logo";
import { nav, footer, CONTACT_HREF } from "@/content/home";

/**
 * Nav (spec 3.1): the engine-room strip. Fixed, obsidian at 90% with blur,
 * bottom edge a 2px amber seam. Left: amber-outline mini mark plus the `d g d n`
 * wordmark. Right: three mono links plus a Contact us amber button. Below the
 * 960px breakpoint the non-essential links hide behind a sheet.
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
      <header className="seam-bottom fixed inset-x-0 top-0 z-50 bg-obsidian/90 backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between">
          <a
            href="#top"
            aria-label="DigiDan home"
            className="flex shrink-0 items-center gap-3 text-amber-d"
          >
            <LogoMark size={26} variant="outline" title="DigiDan" />
            <Wordmark className="text-[0.95rem] text-platinum" />
          </a>

          {/* Desktop links */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 wide:flex"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label label-d transition-colors hover:text-amber-d"
              >
                {item.label}
              </a>
            ))}
            <a href={CONTACT_HREF} className="btn btn-amber-d">
              {footer.contact}
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            className="-mr-1 p-1 text-platinum wide:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Full-screen mobile sheet (engine room). */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-obsidian wide:hidden"
        >
          <div className="seam-bottom shell flex h-16 shrink-0 items-center justify-between">
            <span className="flex items-center gap-3 text-amber-d">
              <LogoMark size={26} variant="outline" title="DigiDan" />
              <Wordmark className="text-[0.95rem] text-platinum" />
            </span>
            <button
              ref={closeRef}
              type="button"
              className="-mr-1 p-1 text-platinum"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="shell flex flex-1 flex-col gap-2 py-8"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line-d py-4 font-display text-2xl tracking-[0.03em] text-platinum"
              >
                {item.label}
              </a>
            ))}
            <a
              href={CONTACT_HREF}
              onClick={() => setOpen(false)}
              className="btn btn-amber-d mt-8 w-full"
            >
              {footer.contact}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
