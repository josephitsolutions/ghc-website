"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const PROPERTY_TYPES = [
  { value: "home", label: "Home" },
  { value: "apartment", label: "Apartment" },
  { value: "office", label: "Office" },
  { value: "rental", label: "Rental" },
  { value: "commercial", label: "Commercial" },
  { value: "other", label: "Other" },
] as const;

export function QuoteRequestForm() {
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const squareRaw = String(fd.get("square_feet") ?? "").trim();
    const payload = {
      full_name: String(fd.get("full_name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      property_type: String(fd.get("property_type") ?? "home"),
      service_type: String(fd.get("service_type") ?? ""),
      square_feet: squareRaw === "" ? 0 : Number(squareRaw),
      preferred_date: String(fd.get("preferred_date") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    setPending(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus({
          type: "error",
          message:
            data.message ??
            "Could not save your request right now. Please try again shortly.",
        });
        return;
      }

      setStatus({
        type: "success",
        message:
          data.message ??
          "Quote request submitted successfully. We will contact you shortly.",
      });
      form.reset();
    } catch {
      setStatus({
        type: "error",
        message:
          "Could not save your request right now. Please try again shortly.",
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
        <label className="block text-base text-ink-muted">
          Full name *
          <input
            name="full_name"
            required
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
            autoComplete="name"
          />
        </label>
        <label className="block text-base text-ink-muted">
          Email *
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
            autoComplete="email"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-base text-ink-muted">
          Phone
          <input
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
            autoComplete="tel"
          />
        </label>
        <label className="block text-base text-ink-muted">
          Property type
          <select
            name="property_type"
            defaultValue="home"
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
          >
            {PROPERTY_TYPES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-base text-ink-muted">
          Service type *
          <input
            name="service_type"
            required
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
          />
        </label>
        <label className="block text-base text-ink-muted">
          Square feet
          <input
            name="square_feet"
            type="number"
            min={0}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
          />
        </label>
      </div>

      <label className="block text-base text-ink-muted">
        Preferred date
        <input
          name="preferred_date"
          type="date"
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
        />
      </label>

      <label className="block text-base text-ink-muted">
        Notes
        <textarea
          name="message"
          rows={4}
          className="mt-2 w-full resize-y rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-accent px-10 py-3 text-sm font-medium tracking-wide text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit request"}
      </button>
    </form>
  );
}
