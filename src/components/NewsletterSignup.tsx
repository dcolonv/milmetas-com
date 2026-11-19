import { site } from "@/site.config";

/**
 * Links to the email provider's hosted signup form. Renders nothing until
 * `newsletterFormUrl` is set in src/site.config.ts; the site stores no addresses.
 */
export function NewsletterSignup() {
  const url = site.monetization.newsletterFormUrl;
  if (!url) return null;
  return (
    <aside aria-labelledby="boletin-titulo" className="rounded-2xl border border-line bg-surface p-6">
      <h2 id="boletin-titulo" className="text-xl font-bold">
        Una meta nueva cada semana
      </h2>
      <p className="mt-1 text-muted">Ideas del banco y una guía corta, por correo. Sin publicidad disfrazada.</p>
      <a
        href={url}
        target="_blank"
        rel="noopener"
        className="boton mt-4 inline-flex min-h-11 items-center rounded-lg bg-meta px-5 font-semibold text-white hover:bg-meta-dark"
      >
        Suscribirme
      </a>
    </aside>
  );
}
