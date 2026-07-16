"use client";

import { useRef, useState } from "react";

/**
 * Contact form for the static-export site. Posts to a Formspree endpoint
 * (set NEXT_PUBLIC_FORMSPREE_ENDPOINT) so no server is required. Includes a
 * honeypot field and a simple client-side resubmit guard; Formspree provides
 * the server-side spam filtering and rate limiting.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

type Status = "idle" | "sending" | "ok" | "error" | "unconfigured";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const lastSubmit = useRef<number>(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot — bots fill hidden fields; humans don't
    if ((data.get("_gotcha") as string)?.length) return;

    // basic resubmit guard (Formspree enforces real rate limiting server-side)
    const now = Date.now();
    if (now - lastSubmit.current < 15000 && status === "ok") return;

    if (!ENDPOINT) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        lastSubmit.current = now;
        setStatus("ok");
        form.reset();
      } else {
        const body = await res.json().catch(() => null);
        setError(body?.errors?.[0]?.message ?? "Something went wrong. Please email us instead.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please try again or email us directly.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div
        role="status"
        className="rounded-tile border border-teal-500 bg-teal-100 p-6 text-teal-900"
      >
        <p className="font-display text-lg font-medium">Thanks — message received.</p>
        <p className="mt-1 text-sm">
          A senior engineer will get back to you. We read every message ourselves.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <Field id="name" label="Name" required>
        <input {...inputProps} id="name" name="name" type="text" required autoComplete="name" />
      </Field>

      <Field id="email" label="Email" required>
        <input {...inputProps} id="email" name="email" type="email" required autoComplete="email" />
      </Field>

      <Field id="company" label="Company">
        <input {...inputProps} id="company" name="company" type="text" autoComplete="organization" />
      </Field>

      <Field id="message" label="What needs building?" required>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputProps.className} resize-y`}
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-sm text-coral-900">
          {error}
        </p>
      )}
      {status === "unconfigured" && (
        <p role="alert" className="text-sm text-coral-900">
          The form endpoint isn&rsquo;t configured yet. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT to go live.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-fit rounded-lg bg-ink px-6 py-3 font-medium text-paper transition-transform duration-150 ease-settle hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "sending" ? "Sending…" : "Start a build"}
      </button>
    </form>
  );
}

const inputProps = {
  className:
    "w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-ink outline-none transition-colors focus:border-teal-500",
};

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && (
          <span className="text-coral-900">
            {" "}
            *<span className="sr-only"> required</span>
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
