"use client";

import { useId, useState } from "react";

/**
 * The sign-up box. Nodd is a demo, so nothing is stored or sent: after a valid email,
 * it says so plainly instead of pretending an account was made.
 */
export function StartForm({ dark = false }: { dark?: boolean }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "invalid" | "done">("idle");

  if (state === "done") {
    return (
      <div role="status" className={`max-w-[30rem] rounded-xl px-4 py-3.5 text-[0.95rem] ${dark ? "bg-white/10 text-white" : "bg-sheet text-ink shadow-[0_0_0_1px_var(--color-line)]"}`}>
        <span className="font-semibold">Thanks for trying.</span> Nodd is a demo product made by Pages by Alexa, so no account was made and nothing was saved.
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) ? "done" : "invalid");
      }}
      className="w-full max-w-[30rem]"
    >
      <label htmlFor={id} className="sr-only">
        Your email
      </label>
      <div className={`flex gap-2 rounded-[14px] p-1.5 ${dark ? "bg-white/10 ring-1 ring-white/15" : "bg-sheet ring-1 ring-line shadow-[0_1px_0_rgb(22_27_51/0.04)]"}`}>
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@yourstudio.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "invalid") setState("idle");
          }}
          aria-invalid={state === "invalid"}
          aria-describedby={state === "invalid" ? `${id}-error` : undefined}
          className={`h-11 w-0 min-w-0 flex-1 rounded-[10px] bg-transparent px-3 text-[1rem] outline-none ${dark ? "text-white placeholder:text-white/50" : "text-ink placeholder:text-ink-faint"}`}
        />
        <button type="submit" className="h-11 shrink-0 whitespace-nowrap rounded-[10px] bg-pen px-4 text-[0.98rem] font-semibold text-white transition-colors hover:bg-pen-dark sm:px-5">
          Start free
        </button>
      </div>
      {state === "invalid" && (
        <p id={`${id}-error`} role="alert" className={`mt-2 px-1 text-[0.9rem] ${dark ? "text-[#ffb4a8]" : "text-[#c2341b]"}`}>
          That email looks incomplete. Check for a missing @ or domain.
        </p>
      )}
    </form>
  );
}
