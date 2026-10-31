import { Logo } from "./logo";
import { StartForm } from "./start-form";

export function Closing() {
  return (
    <section id="start" aria-labelledby="start-title" className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-[78rem] overflow-hidden rounded-[24px] bg-ink px-6 py-20 text-white sm:rounded-[32px] sm:px-12 sm:py-28">
        {/* the same ruled paper as the opening, in white ink */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0_39px,rgb(255_255_255/0.06)_39px_40px)] [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <h2 id="start-title" className="text-[clamp(2.3rem,1.4rem+3.4vw,4.2rem)] leading-[1] tracking-[-0.04em]">
            Your next proposal could be signed by Friday.
          </h2>
          <p className="mt-5 max-w-[32rem] text-[1.1rem] text-white/70">Free for your first three proposals a month. No card needed.</p>
          <div className="mt-9 flex w-full justify-center">
            <StartForm dark />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-12">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-6 text-[0.95rem] text-ink-soft">
        <Logo />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><a href="#how" className="hover:text-ink">How it works</a></li>
            <li><a href="#pricing" className="hover:text-ink">Pricing</a></li>
            <li><a href="#questions" className="hover:text-ink">Questions</a></li>
          </ul>
        </nav>
        <p className="w-full border-t border-line pt-6 text-[0.88rem] text-ink-faint sm:w-auto sm:border-0 sm:pt-0">
          © 2026 Nodd. Designed and built by{" "}
          <a href="https://pagesbyalexa.com" className="font-semibold text-ink-soft underline decoration-ink/20 underline-offset-2 hover:text-ink">
            Pages by Alexa
          </a>
        </p>
      </div>
    </footer>
  );
}
