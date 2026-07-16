"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { LogoLockup } from "./Logo";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const strip = (s: string) => s.replace(/\/$/, "");
  const isActive = (href: string) =>
    href.startsWith("/") && !href.includes("#") && strip(pathname ?? "") === strip(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="shell flex h-16 items-center justify-between">
        <Link href="/" aria-label="DigiDan home" className="shrink-0">
          <LogoLockup />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
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
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile full-screen overlay — one large block shape as the panel (brief 5.1) */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-16 z-40 bg-paper md:hidden"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-8 h-64 w-64 rotate-12 bg-teal-100"
            aria-hidden="true"
            style={{ clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)" }}
          />
          <nav
            aria-label="Mobile"
            className="shell relative flex flex-col gap-1 pt-8"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  item.accent
                    ? "mt-4 inline-flex w-fit rounded-lg bg-ink px-5 py-3 text-lg font-medium text-paper"
                    : "border-b border-line py-4 font-display text-2xl text-ink"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
