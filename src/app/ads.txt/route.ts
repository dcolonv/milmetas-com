import { site } from "@/site.config";

/**
 * ads.txt for Google AdSense. Returns 404 until `adsenseClient` is set in
 * src/site.config.ts, then the publisher line AdSense asks for.
 */
export function GET() {
  const client = site.monetization.adsenseClient;
  if (!client) return new Response("Not found\n", { status: 404, headers: { "Content-Type": "text/plain" } });
  const pub = client.replace(/^ca-/, "");
  return new Response(`google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
