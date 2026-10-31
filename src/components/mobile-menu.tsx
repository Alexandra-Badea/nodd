"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

/** On phones and small tablets: a menu button that opens the page's sections under the header. */
export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);

  // Escape or a tap anywhere else closes it
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={root} className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid h-10 w-10 place-items-center rounded-[10px] text-ink transition-colors hover:bg-ink/[0.06]"
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <path d="M3 6.5h14M3 13.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <div id={id} hidden={!open} className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-[0_24px_40px_-24px_rgb(22_27_51/0.35)]">
        <nav aria-label="Main" className="wrap animate-[roll-in_.2s_ease-out] py-2 motion-reduce:animate-none">
          <ul>
            {links.map((l) => (
              <li key={l.href} className="border-b border-line last:border-0">
                <Link href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-4 text-[1.15rem] font-semibold text-ink">
                  {l.label}
                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-ink-faint" aria-hidden="true">
                    <path d="M6 3.5L10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
