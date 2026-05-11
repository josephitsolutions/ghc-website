"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const SERVICES = [
  "Signature Glow Reset",
  "Move-In / Move-Out Shine",
  "Recurring Sparkle Care",
  "Office Glow Service",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: String(fd.get("service") ?? SERVICES[0]),
      message: String(fd.get("message") ?? ""),
    };

    setPending(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data.error ?? "Unable to send right now.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: data.message ?? "Thank you. Your message has been sent.",
      });
      form.reset();
    } catch {
      setStatus({
        type: "error",
        message:
          "Unable to send right now. Please email info@glowinghomecleaners.com directly.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {status.type !== "idle" ? (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className={
            status.type === "success"
              ? "rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-ink"
              : "rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-900 dark:text-red-100"
          }
        >
          {status.message}
        </motion.p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm text-ink-muted">
          Name *
          <input
            name="name"
            required
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition placeholder:text-ink-subtle focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
            autoComplete="name"
          />
        </label>
        <label className="block text-sm text-ink-muted">
          Email *
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition placeholder:text-ink-subtle focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
            autoComplete="email"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm text-ink-muted">
          Phone
          <input
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition placeholder:text-ink-subtle focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
            autoComplete="tel"
          />
        </label>
        <label className="block text-sm text-ink-muted">
          Preferred service
          <select
            name="service"
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
            defaultValue={SERVICES[0]}
          >
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm text-ink-muted">
        Message *
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-y rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition placeholder:text-ink-subtle focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-accent px-10 py-3 text-sm font-medium tracking-wide text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
