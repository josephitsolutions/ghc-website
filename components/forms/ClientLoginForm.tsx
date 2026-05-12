"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function ClientLoginForm() {
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
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
    };

    setPending(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/client-login", {
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
          message: data.message ?? "Unable to sign in.",
        });
        return;
      }

      setStatus({
        type: "success",
        message:
          data.message ??
          "Login successful. Portal pages can now be connected.",
      });
      form.reset();
    } catch {
      setStatus({
        type: "error",
        message: "Unable to sign in right now.",
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

      <label className="block text-base text-ink-muted">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
        />
      </label>
      <label className="block text-base text-ink-muted">
        Password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2 dark:border-white/10 dark:bg-white/[0.06]"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-accent px-10 py-3 text-sm font-medium tracking-wide text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Login"}
      </button>
    </form>
  );
}
