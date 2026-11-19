import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { AffiliateLink } from "@/components/AffiliateLink";
import { AdSlot } from "@/components/AdSlot";
import { Disclosure } from "@/components/Disclosure";

/** Internal links use the router; external ones open as ordinary links. */
function Enlace({ href = "", children, ...resto }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href}>{children}</Link>;
  }
  return (
    <a href={href} rel="noopener" {...resto}>
      {children}
    </a>
  );
}

/** Wide tables scroll inside their own box instead of pushing the page sideways on a phone. */
function Tabla(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="tabla" tabIndex={0} role="region" aria-label="Tabla">
      <table {...props} />
    </div>
  );
}

function Nota({ titulo, children }: { titulo?: string; children: React.ReactNode }) {
  return (
    <aside className="rounded-xl border border-line bg-surface px-4 py-3">
      {titulo ? <p className="font-display font-bold">{titulo}</p> : null}
      <div className="space-y-2 text-[1rem]">{children}</div>
    </aside>
  );
}

const components: MDXComponents = {
  a: Enlace,
  table: Tabla,
  AffiliateLink,
  AdSlot,
  Disclosure,
  Nota,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
