import { site } from "@/site.config";

/**
 * A labelled, paid placement. Renders nothing unless a sponsor is configured
 * for this slot in src/site.config.ts. The link is always rel="sponsored".
 */
export function SponsorSlot({ slot }: { slot: string }) {
  const sponsor = site.monetization.sponsors.find((s) => s.slot === slot);
  if (!sponsor) return null;
  return (
    <aside aria-label="Patrocinio" className="rounded-xl border border-line bg-surface px-4 py-3 text-[0.95rem]">
      <span className="mr-2 rounded bg-ink px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-paper">
        Patrocinado
      </span>
      Con el apoyo de{" "}
      <a href={sponsor.url} rel="sponsored nofollow noopener" target="_blank" className="enlace font-semibold">
        {sponsor.name}
      </a>
      . {sponsor.line}
    </aside>
  );
}
