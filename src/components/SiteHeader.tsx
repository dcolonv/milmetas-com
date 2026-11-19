import Link from "next/link";
import { site } from "@/site.config";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3 sm:px-6">
        <Link href="/" aria-label={`${site.name}, inicio`} className="rounded-md">
          <Wordmark />
        </Link>
        <nav aria-label="Principal">
          <ul className="flex items-center gap-1 text-[0.98rem] font-semibold sm:gap-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-md px-2.5 text-ink hover:bg-meta-soft hover:text-meta-dark sm:px-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
