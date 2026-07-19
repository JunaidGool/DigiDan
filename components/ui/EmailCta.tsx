"use client";

import { useState } from "react";
import { Button } from "./Button";
import { cta, CONTACT_HREF } from "@/content/home";

/**
 * Email capture, in the CoLab "enter your email + talk to an expert" pattern but
 * built from scratch. If a Formspree endpoint is configured it posts there and
 * shows an inline confirmation; otherwise it falls back to opening the contact
 * mailbox with the address prefilled, so the field is never a dead end.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
const MAILTO = CONTACT_HREF.replace("mailto:", "");

type State = "idle" | "sending" | "done" | "error";

export function EmailCta() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    if (!ENDPOINT) {
      // No backend configured: hand off to the mail client, prefilled.
      const subject = encodeURIComponent("New project enquiry");
      const body = encodeURIComponent(`Reply to: ${email}\n\n`);
      window.location.href = `mailto:${MAILTO}?subject=${subject}&body=${body}`;
      setState("done");
      return;
    }

    try {
      setState("sending");
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="mt-9 text-lg font-medium text-white" role="status">
        Thanks. We will be in touch shortly.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-9 flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row"
    >
      <label htmlFor="cta-email" className="sr-only">
        {cta.emailPlaceholder}
      </label>
      <input
        id="cta-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={cta.emailPlaceholder}
        className="h-14 flex-1 rounded-full border border-white/15 bg-ink/70 px-6 text-white placeholder:text-fog focus:border-white/40 focus:outline-none"
      />
      <Button
        type="submit"
        variant="outline-gradient"
        size="lg"
        withArrow
        disabled={state === "sending"}
      >
        {state === "sending" ? "Sending" : cta.emailAction}
      </Button>
    </form>
  );
}
