"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Palette } from "lucide-react";

const THEMES = [
  { id: "dark", label: "Dark", Icon: Moon },
  { id: "light", label: "Light", Icon: Sun },
  { id: "brand", label: "Brand", Icon: Palette },
] as const;
type Theme = (typeof THEMES)[number]["id"];
const STORAGE_KEY = "digidan-theme";

/**
 * Theme selector: a three-way segmented control (Dark / Light / Brand). Sets
 * [data-theme] on <html> and remembers the choice. The initial theme is applied
 * before paint by an inline script in the layout, so there is no flash; this
 * control keeps the active option in sync.
 *
 * `withLabels` shows text beside each icon (used in the mobile menu, where there
 * is room); the compact icon-only form is used in the top nav.
 */
export function ThemeToggle({ withLabels = false }: { withLabels?: boolean }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as Theme | null;
    if (current && THEMES.some((t) => t.id === current)) setTheme(current);
  }, []);

  const select = (id: Theme) => {
    setTheme(id);
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* storage unavailable: theme still applies for this session */
    }
  };

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={`inline-flex items-center border border-neon/30 p-0.5 ${
        withLabels ? "w-full" : ""
      }`}
    >
      {THEMES.map(({ id, label, Icon }) => {
        const active = theme === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => select(id)}
            aria-pressed={active}
            title={`${label} theme`}
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] transition-colors ${
              withLabels ? "flex-1" : ""
            } ${active ? "bg-neon text-void" : "text-dim hover:text-neon"}`}
          >
            <Icon size={14} aria-hidden="true" />
            <span className={withLabels ? "" : "sr-only"}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
