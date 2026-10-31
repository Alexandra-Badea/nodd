import { HeroDemo } from "./hero-demo";
import { StartForm } from "./start-form";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-12 sm:pt-16 lg:pb-32 lg:pt-20 [@media(max-height:520px)]:pt-8">
      <div className="ruled pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="max-w-[38rem]">
          <h1 className="text-[clamp(2.7rem,1.5rem+4.6vw,4.9rem)] leading-[0.96] tracking-[-0.045em] [@media(max-height:520px)]:text-[2.6rem]">
            <span className="block">Send one link.</span> <span className="block">Get signed and paid.</span>
          </h1>
          <p className="mt-6 max-w-[31rem] text-[1.1rem] leading-relaxed text-ink-soft sm:text-[1.2rem]">
            Nodd turns your proposal into a page your client reads, signs and pays the deposit from, in one go. No PDF attachments, no separate contract, no chasing an invoice.
          </p>
          <div className="mt-8">
            <StartForm />
            <p className="mt-3 px-1 text-[0.9rem] text-ink-faint">Free for your first three proposals a month. No card needed.</p>
          </div>
        </div>
        <HeroDemo />
      </div>
    </section>
  );
}
