"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { LogoLockup } from "./Logo";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const strip = (s: string) => s.replace(/\/$/, "");
  const isActive = (href: string) =>
    href.startsWith("/") && !href.includes("#") && strip(pathname ?? "") === strip(href);

  // Lock body scroll, close on Escape, and manage focus while the sheet is open.
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

  const links = nav.filter((i) => !i.accent);
  const cta = nav.find((i) => i.accent);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="shell flex h-16 items-center justify-between">
          <Link href="/" aria-label="DigiDan home" className="shrink-0">
            <LogoLockup />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-5 lg:gap-7 md:flex">
            {nav.map((item) =>
              item.accent ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper transition-transform duration-150 ease-settle hover:-translate-y-0.5"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="text-sm text-ink/80 transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:underline-offset-4"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            className="-mr-1 p-1 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Full-screen mobile sheet: rendered OUTSIDE the backdrop-blurred header
          so `fixed` resolves against the viewport, not the header box. */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-paper md:hidden"
        >
          <div className="shell flex h-16 shrink-0 items-center justify-between border-b border-line">
            <LogoLockup />
            <button
              ref={closeRef}
              type="button"
              className="-mr-1 p-1"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="shell flex flex-1 flex-col overflow-y-auto py-4"
          >
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex items-center justify-between border-b border-line py-4 font-display text-2xl text-ink aria-[current=page]:text-teal-900"
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="h-2.5 w-2.5 rotate-45 bg-teal-500" aria-hidden />
                )}
              </Link>
            ))}

            {cta && (
              <Link
                href={cta.href}
                onClick={() => setOpen(false)}
                className="mt-8 inline-flex justify-center rounded-lg bg-ink px-5 py-4 text-lg font-medium text-paper"
              >
                {cta.label}
              </Link>
            )}

            {/* quiet disassembled-blocks motif */}
            <div className="mt-auto flex gap-1.5 pt-10" aria-hidden="true">
              <span className="h-3 w-3 rotate-45 bg-teal-300" />
              <span className="h-3 w-3 rotate-45 bg-coral-300" />
              <span className="h-3 w-3 rotate-45 bg-amber-200" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
