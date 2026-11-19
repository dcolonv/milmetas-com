import { notFound } from "next/navigation";

/**
 * Where next.config.ts sends unknown slugs. The page only calls notFound(),
 * so it is prerendered as the not-found page with status 404, and that status
 * survives the rewrite on Vercel. (Rewriting to /_not-found or /404 does not:
 * Vercel answers those with 200 when they are reached through a rewrite.)
 */
export default function NoEncontrada() {
  notFound();
}
