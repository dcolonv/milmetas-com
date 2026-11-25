import { textoLlms } from "@/lib/llms";

/** /llms.txt, static: it only reads the data files (see src/lib/llms.ts). */
export function GET() {
  return new Response(textoLlms(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
