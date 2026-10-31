/** A proposal with its corner folded and a tick on it: the moment the client says yes. It nods when you point at it. */
export function Mark({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 32" className={className} aria-hidden="true" focusable="false">
      <path d="M4 0h13l11 11v17a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#2846f0" />
      <path d="M17 0v7a4 4 0 0 0 4 4h7z" fill="#9aabff" />
      <path d="M7.2 19.2l4.1 4 9.2-9.6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="group inline-flex items-center gap-2">
      <span className="inline-block origin-bottom-left group-hover:animate-nod motion-reduce:group-hover:animate-none">
        <Mark />
      </span>
      <span className="font-display text-[1.55rem] leading-none font-bold tracking-[-0.055em]">nodd</span>
    </span>
  );
}
