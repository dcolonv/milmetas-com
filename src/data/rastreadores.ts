/**
 * The AI crawlers this site names in robots.txt, with the purpose each vendor
 * documents for it. Every other crawler falls under the general rule, which
 * also allows everything.
 *
 * Position: nothing is blocked. Search and user-triggered crawlers are what
 * make the site eligible to be quoted and linked in ChatGPT search, Claude and
 * Perplexity, so they are named and allowed. Training crawlers are allowed
 * too; opting out of training is the owner's decision, and it is one line:
 * set `permitirEntrenamiento` to false below. That blocks only the two
 * crawlers whose documented purpose is model training, and leaves search and
 * user-triggered access as they are.
 *
 * Names and purposes were read on the vendors' own pages on the date in
 * `verificado`. Vendors rename and add crawlers: read those pages again
 * before editing this list, and do not copy names from third-party lists.
 *
 * Not listed because the general rule already covers them: Googlebot (Google
 * Search, including AI Overviews and AI Mode, has no separate crawler) and
 * Bingbot (Bing; Microsoft says Copilot grounds its web answers in the Bing
 * search service).
 */

export type UsoRastreador =
  /** Builds the index an AI search product answers from. */
  | "busqueda"
  /** Fetches one page because a person asked the assistant about it. */
  | "usuario"
  /** Collects content that may be used to train models. */
  | "entrenamiento"
  /** Not a crawler: a token that only switches a use of already-crawled content on or off. */
  | "control";

export type Rastreador = {
  /** The robots.txt token, exactly as the vendor prints it. */
  token: string;
  empresa: string;
  uso: UsoRastreador;
  /** What the vendor's page says, in short. */
  nota: string;
  fuente: string;
};

export const verificado = "2026-11-25";

/** false = ask the training crawlers (and only them) to stay out. */
export const permitirEntrenamiento = true;

const OPENAI = "https://developers.openai.com/api/docs/bots";
const ANTHROPIC =
  "https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler";
const PERPLEXITY = "https://docs.perplexity.ai/docs/resources/perplexity-crawlers";
const GOOGLE = "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers";

export const rastreadoresIA: Rastreador[] = [
  {
    token: "OAI-SearchBot",
    empresa: "OpenAI",
    uso: "busqueda",
    nota: "Surfaces sites in ChatGPT search. A site that opts out is not shown in ChatGPT search answers.",
    fuente: OPENAI,
  },
  {
    token: "ChatGPT-User",
    empresa: "OpenAI",
    uso: "usuario",
    nota: "Visits a page when a ChatGPT user's question calls for it. Not automatic crawling; OpenAI says robots.txt rules may not apply to it.",
    fuente: OPENAI,
  },
  {
    token: "GPTBot",
    empresa: "OpenAI",
    uso: "entrenamiento",
    nota: "Crawls content that may be used to train OpenAI's models. Disallowing it signals that the content should not be used for training.",
    fuente: OPENAI,
  },
  {
    token: "Claude-SearchBot",
    empresa: "Anthropic",
    uso: "busqueda",
    nota: "Indexes content to improve search results for Claude users. Blocking it may reduce visibility in those results.",
    fuente: ANTHROPIC,
  },
  {
    token: "Claude-User",
    empresa: "Anthropic",
    uso: "usuario",
    nota: "Fetches a page when a Claude user asks a question that needs it. Blocking it prevents that retrieval.",
    fuente: ANTHROPIC,
  },
  {
    token: "ClaudeBot",
    empresa: "Anthropic",
    uso: "entrenamiento",
    nota: "Anthropic's training crawler. Blocking it signals that future material should be left out of training data.",
    fuente: ANTHROPIC,
  },
  {
    token: "PerplexityBot",
    empresa: "Perplexity",
    uso: "busqueda",
    nota: "Surfaces and links sites in Perplexity's search results. Perplexity says it is not used to train foundation models.",
    fuente: PERPLEXITY,
  },
  {
    token: "Perplexity-User",
    empresa: "Perplexity",
    uso: "usuario",
    nota: "Visits a page to answer a Perplexity user's question. Perplexity says it generally ignores robots.txt because a person requested the fetch.",
    fuente: PERPLEXITY,
  },
  {
    token: "Google-Extended",
    empresa: "Google",
    uso: "control",
    nota: "Controls whether content Google already crawls may be used to train Gemini models and to ground answers in the Gemini apps and Vertex AI. It has no effect on Google Search inclusion or ranking. Blocking it would also remove the site from Gemini grounding, so it is not part of the training switch.",
    fuente: GOOGLE,
  },
];

/** The tokens robots.txt asks to stay out: none unless training is switched off. */
export function tokensBloqueados(permitir: boolean = permitirEntrenamiento): string[] {
  if (permitir) return [];
  return rastreadoresIA.filter((r) => r.uso === "entrenamiento").map((r) => r.token);
}
