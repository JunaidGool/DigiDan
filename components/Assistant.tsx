"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageSquare, X } from "lucide-react";
import { assistant, nodes, type Choice } from "@/content/assistant";
import { LogoMark } from "./Logo";

type Msg = { role: "bot" | "user"; text: string };

const hasGoto = (c: Choice): c is { label: string; goto: string } =>
  "goto" in c;

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string>(assistant.rootId);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: nodes[assistant.rootId].message },
  ]);

  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const node = nodes[currentId];

  // focus management + Escape + basic focus trap
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const f = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // return focus to the launcher when closing
  useEffect(() => {
    if (!open) launcherRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  function choose(c: Choice) {
    if (!hasGoto(c)) return; // href choices are <Link>s
    const target = nodes[c.goto];
    setMessages((m) => [
      ...m,
      { role: "user", text: c.label },
      { role: "bot", text: target.message },
    ]);
    setCurrentId(c.goto);
  }

  return (
    <>
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-ink py-3 pl-3 pr-5 text-sm font-medium text-paper shadow-lg transition-transform duration-150 ease-settle hover:-translate-y-0.5"
          aria-haspopup="dialog"
        >
          <span
            className="grid h-7 w-7 place-items-center rounded-full bg-paper"
            aria-hidden="true"
          >
            <LogoMark size={18} title="" />
          </span>
          {assistant.launcherLabel}
        </button>
      )}

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="assistant-title"
          className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-2xl border border-line bg-paper shadow-2xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:max-h-[min(34rem,80vh)] sm:w-[380px] sm:rounded-2xl"
        >
          {/* header */}
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <span
              className="grid h-8 w-8 place-items-center rounded-full bg-teal-100"
              aria-hidden="true"
            >
              <LogoMark size={20} title="" />
            </span>
            <div className="flex-1">
              <p id="assistant-title" className="font-display font-medium leading-tight">
                {assistant.title}
              </p>
            </div>
            <button
              type="button"
              data-autofocus
              onClick={() => setOpen(false)}
              aria-label="Close guide"
              className="rounded p-1 text-muted hover:text-ink"
            >
              <X size={20} />
            </button>
          </div>

          <p className="border-b border-line bg-paper-warm px-4 py-2.5 text-xs text-muted">
            {assistant.disclosure}
          </p>

          {/* transcript */}
          <div
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((m, i) =>
              m.role === "bot" ? (
                <p
                  key={i}
                  className="max-w-[85%] rounded-2xl rounded-tl-sm bg-teal-100 px-3.5 py-2.5 text-sm text-teal-900"
                >
                  {m.text}
                </p>
              ) : (
                <p
                  key={i}
                  className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-3.5 py-2.5 text-sm text-paper"
                >
                  {m.text}
                </p>
              )
            )}
            <div ref={endRef} />
          </div>

          {/* choices */}
          <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
            {node.choices.map((c) =>
              hasGoto(c) ? (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => choose(c)}
                  className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-ink/40 hover:bg-paper-warm"
                >
                  {c.label}
                </button>
              ) : (
                <Link
                  key={c.label}
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-teal-500 px-3.5 py-1.5 text-sm font-medium text-paper transition-colors hover:bg-teal-900"
                >
                  {c.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
