import Script from "next/script";
import { site } from "@/site.config";
import { AdUnit } from "./AdUnit";

export type AdSlotName = "calc-result" | "guide-mid" | "guide-end" | "bank-end";

/**
 * A place for a display ad. Renders nothing at all until both the AdSense
 * client and this slot's unit ID are set in src/site.config.ts. Once they are,
 * the unit sits in a container with reserved height so the page does not jump.
 */
export function AdSlot({ name }: { name: AdSlotName }) {
  const client = site.monetization.adsenseClient;
  const slot = site.monetization.adsenseSlots[name];
  if (!client || !slot) return null;

  return (
    <aside aria-label="Publicidad" className="my-8">
      <p className="mb-1 text-center text-xs uppercase tracking-wider text-muted">Publicidad</p>
      <div className="min-h-[280px] overflow-hidden rounded-xl border border-line bg-surface">
        <AdUnit client={client} slot={slot} />
      </div>
    </aside>
  );
}

/** The AdSense script, loaded once from the root layout and only when a client ID is set. */
export function AdsScript() {
  const client = site.monetization.adsenseClient;
  if (!client) return null;
  return (
    <Script
      id="adsense"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
