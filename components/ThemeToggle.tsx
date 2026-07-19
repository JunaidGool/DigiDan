"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Palette } from "lucide-react";

const ORDER = ["dark", "light", "brand"] as const;
type Theme = (typeof ORDER)[number];

const LABEL: Record<Theme, string> = { dark: "Dark", light: "Light", brand: "Brand" };
const ICON = { dark: Moon, light: Sun, brand: Palette };
const STORAGE_KEY = "digidan-theme";

/**
 * Theme toggle: cycles Dark -> Light -> Brand, writes [data-theme] on <html>
 * and remembers the choice. The initial theme is applied before paint by an
 * inline script in the layout, so there is no flash; this control keeps its
 * label in sync and updates on click.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as Theme | null;
    if (current && ORDER.includes(current)) setTheme(current);
  }, []);

  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
  const cycle = () => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable: theme still applies for this session */
    }
  };

  const Icon = ICON[theme];
  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${LABEL[theme]}. Switch to ${LABEL[next]}.`}
      title={`Theme: ${LABEL[theme]}`}
      className="inline-flex items-center gap-2 border border-neon/30 px-3 py-2 text-neon transition-colors hover:border-neon"
    >
      <Icon size={15} aria-hidden="true" />
      <span className="label label-neon">{LABEL[theme]}</span>
    </button>
  );
}
