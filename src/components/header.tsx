import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#questions", label: "Questions" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/70">
      <div className="wrap flex h-16 items-center gap-2 md:gap-6">
        <Link href="/" className="mr-auto rounded-md" aria-label="Nodd, home">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="whitespace-nowrap rounded-lg px-3 py-2 text-[0.95rem] font-medium text-ink-soft transition-colors hover:bg-ink/[0.05] hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/#start" className="inline-flex h-10 items-center whitespace-nowrap rounded-[10px] bg-ink px-4 text-[0.95rem] font-semibold text-white transition-colors hover:bg-pen">
          Start free
        </Link>
        <MobileMenu links={links} />
      </div>
    </header>
  );
}
