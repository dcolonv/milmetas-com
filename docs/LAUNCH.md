# Mil Metas: launch notes

**Live now:** https://milmetas-com.vercel.app
**Will be at:** https://milmetas.com once the domain is renewed and DNS is pointed
**Repository:** https://github.com/dcolonv/milmetas-com
**Vercel project:** milmetas-com (team david-colns-projects)
**Launched:** 2026-11-19

## 0. First: check the domain registration

On launch day milmetas.com showed a registrar page titled "Your domain is expired", and its nameservers were `ns1.dns-expired.com` and `ns2.dns-expired.com`. That is what a lapsed registration looks like. Log in to the registrar, confirm the domain is yours and active (renew it if it is in its grace period), and only then do step 1. The site is built and attached to the domain either way; nothing is lost while this is sorted out.

## 1. Point the domain (the one step left)

At the registrar or DNS provider for milmetas.com, set:

| Type | Name | Value |
|---|---|---|
| A | `@` | `216.198.79.1` |
| A | `@` | `64.29.17.1` |
| CNAME | `www` | `c06d15c4ebed5364.vercel-dns-017.com.` |

These are the values Vercel recommended for this project on 2026-11-19 (two `A` records on the bare domain). Its older general-purpose values, `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`, are listed as the second choice and also work.

Remove any existing `A`, `AAAA` or `CNAME` records on those two names first, and if the domain is still on the registrar's "expired" nameservers, switch it back to the registrar's normal DNS. Vercel issues the certificate by itself within minutes of the change; `www` redirects to the bare domain (308). No `TXT` verification record was requested: both names show as verified on the project.

To see the current state at any time: `vercel domains inspect milmetas.com --scope david-colns-projects`.

## 2. What was built

Mil Metas is a Spanish-language site for people setting goals. Its core is the Calculadora de metas: type a goal with a number and a date and it gives the pace per day, week and month, the milestone dates, and a verdict on whether you are ahead, on track or behind, with the pace needed from tomorrow. Around it are a bank of 200 measurable example goals in 10 areas, each of which opens in the calculator, and 12 guides on writing, splitting and following goals, with studies cited to their sources.

| Section | Pages |
|---|---|
| Calculator | `/calculadora`, and `/calculadora/ahorro`, `/lectura`, `/estudio`, `/kilometros` |
| Bank of goals | `/metas` (200 goals, filters by area, horizon and text) and 10 area pages `/metas/<area>` |
| Guides | 12, listed at `/guias` |
| Trust pages | `/acerca`, `/como-trabajamos`, `/contacto`, `/privacidad`, `/terminos`, `/afiliados`, `/publicidad` |
| Machine-readable | `/sitemap.xml` (37 URLs), `/robots.txt`, `/llms.txt`, `/feed.xml`, `/manifest.webmanifest`; `/ads.txt` is 404 until ads are configured |

Checked on launch day: lint, 50 unit tests and the build pass; the site checker found no errors and no warnings on 37 pages, locally and on the live address; the calculator was used in a real browser at desktop and phone sizes, locally and live, and matched the spec's worked example.

## 3. Changing the site

- **Settings, name, links, IDs:** `src/site.config.ts`
- **Guides:** an entry in `src/data/guias.ts`, the text in `content/guias/<slug>.mdx`, one loader line in `src/lib/guias.ts`; the guide then appears in the hub, sitemap and feed
- **Goals and areas:** `src/data/metas.ts` and `src/data/areas.ts`
- **Calculators by kind of goal:** `src/data/presets.ts`
- **Commercial links:** `src/data/affiliates.ts`
- **Sitemap and `/llms.txt`:** both are built from one list, `src/lib/paginas.ts`. Guides, areas and calculators by kind of goal appear in both by themselves; any other new page needs one line there
- **Crawlers:** `src/data/rastreadores.ts` holds the AI crawlers named in `robots.txt` and the one switch for training crawlers (section 8)
- Push to `main` and Vercel deploys. This was confirmed during the run: pushes started production deployments by themselves.
- Run locally: `pnpm install`, `pnpm dev`. Check before pushing: `pnpm test` and `pnpm build`.

## 4. After DNS is live

- [ ] Open https://milmetas.com and https://www.milmetas.com and confirm both work
- [ ] Add the site to Google Search Console (choose "Domain", verify with the DNS record it gives you) and submit `https://milmetas.com/sitemap.xml`
- [ ] Add the site to Bing Webmaster Tools (it can import the property from Search Console) and submit the same sitemap there. Microsoft says Copilot grounds its web answers in [the Bing search service](https://learn.microsoft.com/en-us/copilot/microsoft-365/manage-public-web-access), so a site Bing has not indexed cannot be quoted there
- [ ] Work through the dated checks in section 8, "What could not be measured"
- [ ] Follow [MONETIZATION.md](MONETIZATION.md)

## 5. Things to know

**Needs your input**
- The registration: see section 0.
- `hello@milmetas.com` is shown on the contact, privacy and sponsorship pages. Create that mailbox or change `contactEmail` in `src/site.config.ts`.
- No publisher name is configured, so the site presents itself as an independent publication and the privacy page names no legal entity. Add your name or company and the legal details your country requires before promoting the site or switching on revenue.
- The trust pages are starting points, not legal advice.
- The guides were researched and written with AI assistance and checked against the sources they cite. Read them before promoting the site: the site says the editor is responsible for what is published.

**What was verified, and what was not**
- Every study cited in the guides was checked against a publisher page, the paper itself or its indexed abstract: the figures in the guides on habits (Lally and others, 2010), progress monitoring (Harkin and others, 2016), implementation intentions (Gollwitzer and Sheeran, 2006), New Year's resolutions (Oscarsson and others, 2020), goal-setting theory (Locke and Latham, 2002), WOOP (Duckworth and others, 2011), the Yale myth (Yale Library's own page) and the Dominican University summary. Researchers' affiliations and anything else that could not be confirmed were left out.
- Three caveats: the Gollwitzer (1999) paper is cited only for introducing the technique, its text was not read; the journal volume of Doran's 1981 SMART article comes from Wikipedia's reference, and the guide links to Wikipedia because the original has no stable public page; the Fast Company article exists but its page answers automated requests with 403, so it was confirmed from an archived copy.
- DOI links resolve, but several publishers refuse automated checks (403), so the checker reports a few outbound links as "could not be verified". They open in a browser.
- The four Amazon links are search and category pages; they returned results in one automated check on launch day.
- Not verified: search demand (no keyword tool was used), affiliate commission rates, and whether "Mil Metas" is a registered trademark anywhere (a web search found no company or app with the name; that is not a registry search).

**Decisions made for you**
- Language: Spanish, neutral, no country or currency assumed ("mil metas" also reads as Portuguese; Spanish was the larger market for a `.com`).
- The bank has 200 goals and says so. The site never claims a thousand.
- No weight, diet, medical or investment content. The savings calculator does not model interest.
- Amazon links point at `amazon.es`. Change `amazonDomain` if most of your readers turn out to be elsewhere.
- The on-page affiliate notice does not say "En calidad de Afiliado de Amazon..." until an Amazon tag is set, because until then it would not be true. It appears by itself afterwards.

**How unknown addresses get a 404**
- With the current Next.js defaults, a dynamic route answers an unknown slug (`/guias/whatever`) with status 200 on the first visit. `next.config.ts` therefore sends unknown slugs to `/no-encontrada`, a page that only returns "not found", and the lists of known slugs come from the data files. If you add a new dynamic section, add its rewrite there. This was checked on the live site.

**Tooling**
- The Vercel CLI installed on this machine is 28.2.5, which is too old for these commands; the run used `npx -y vercel@latest` (66.2.0). Update with `npm i -g vercel@latest`.
- Installed on this machine during the run: the `agent-browser` CLI (global npm package, version 0.43.0) and the Chrome build it downloads to `~/.agent-browser/`.
- `vercel link` wrote a `.env.local` file with a Vercel token in the project folder. It is ignored by git and the site does not need it; delete it if you prefer.
- The Vercel project builds with Node 26; this machine has Node 24. Both built the site.
- The first three milestones of the plan (scaffold, layout, calculator) share one commit instead of three.
- Agent skills for this project are in `.claude/skills/` and recorded in `skills-lock.json`; on a fresh clone restore them with `npx skills experimental_install`

## 6. Content roadmap

The next articles worth writing, in order of expected value:

| # | Title | The question it answers | Why now |
|---|---|---|---|
| 1 | Metas para 2027: 30 ideas medibles por área | What goals could I set this year? | Peak demand in December and January; links straight into the bank |
| 2 | Metas a corto plazo: 60 ejemplos | What is a good short-term goal? | A high-volume query the bank already answers with a filter (`/metas?plazo=corto`) |
| 3 | Metas personales: qué son y 50 ejemplos | What are personal goals? | The head term; needs the bank at 300 goals to be the best answer |
| 4 | Qué hacer cuando vas atrasado con una meta | Should I speed up, move the date or let it go? | Follows from the calculator's "atrasado" verdict; link it from the result |
| 5 | Metas para estudiantes de secundaria y bachillerato | What goals fit a school student? | Teachers assign this every September and January |
| 6 | Metas de pareja: ejemplos para fijarlas juntos | What goals can a couple set? | Low competition, fits the relationships area |
| 7 | Fondo de emergencia: cuánto y en cuánto tiempo | How big should my emergency fund be? | Extends the savings calculator; cite public financial-education bodies |
| 8 | Reto de los 30 días: 20 ideas con su plan | What can I do in a 30-day challenge? | Short goals convert well to calculator use |
| 9 | Metas de equipo: cómo fijarlas sin que sean una lista de tareas | How do I set goals for my team? | Extends the work area toward managers |
| 10 | Revisión anual: cómo cerrar el año y decidir las metas del siguiente | How do I review my year? | Seasonal, late December |
| 11 | Metas para aprender inglés, de A2 a B2 | What should I aim for at each level? | Needs careful sourcing on what the levels mean (Council of Europe) |
| 12 | Cómo dividir una meta grande en hitos | How do I break down a big goal? | Explains the milestone table; evergreen |
| 13 | Tablero de visión o lista de metas: qué dice la evidencia | Do vision boards work? | A myth-checking piece like the Yale one; attracts links |
| 14 | Metas de ahorro por sueldo: cómo calcular un porcentaje realista | How much of my income should I save? | Must stay arithmetic and cite public sources; no advice |
| 15 | Metas para jubilados y mayores de 60 | What goals make sense after retiring? | An audience almost no one writes for |
| 16 | Plantilla de metas para imprimir | Is there a goals template I can print? | Needs the printable plan from the feature roadmap |
| 17 | Metas deportivas: de 0 a tu primera carrera de 5 km | How do I plan a first race? | Behaviour-only, with a note to see a professional; fits the kilometre calculator |
| 18 | Hábitos de estudio: cómo fijar una rutina semanal | How do I build a study routine? | Supports the study calculator and the academic guide |

The bank itself is content. Next batches, 100 goals each: (1) two new areas, "tecnología y vida digital" and "comunidad y voluntariado", plus ten more per existing area; (2) goals by life stage (students, new parents, career change); (3) seasonal sets (summer, back to school, year end).

## 7. Feature roadmap

- **Printable plan and calendar file.** One page with the pace and milestones, and an `.ics` file with the milestone dates. No server needed.
- **Embeddable calculator.** A small iframe version with a link back, for teachers and bloggers.
- **Weekly check-in history.** Keep each "hoy llevo" entry in the browser and draw the line of progress against the plan.
- **Visitors' own store for Amazon links.** Send each reader to their country's Amazon; needs a second affiliate account per country.
- **Accounts and sync, email reminders.** These need a database and an email service, which have a running cost; left out on purpose.
- **A model-powered "turn my wish into a measurable goal" helper.** Billed per use, so it is off unless you ask for it.
- **Portuguese edition** at a subdomain or sister domain, reusing the calculator.

## 8. Search audit (2026-11-25)

An audit of how well search engines and AI assistants (ChatGPT search, Perplexity, Google's AI answers, Claude) can find, read and quote the site, followed by fixes. It was run against the production build on this machine and, for crawler access, against the live `vercel.app` address. Nothing here was pushed or deployed: the fixes are local commits, and the live site changes when you push.

### Scores

Lighthouse 13.6.0, mobile emulation, against the local production build. "Agentic browsing" is Lighthouse's category for how well an assistant can read and operate a page.

| Page | SEO before | SEO after | Agentic browsing before | Agentic browsing after |
|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 |
| `/calculadora` | 100 | 100 | 100 | 100 |
| `/metas/dinero` | 100 | 100 | 100 | 100 |
| `/guias/como-escribir-una-meta-smart` | 100 | 100 | 100 | 100 |

The numbers did not move because the basics were already in place. What changed inside them: the `llms.txt` audit went from "not applicable" (no file) to passing. The `structured-data` audit is a manual one; the JSON-LD was checked by hand in a real browser on ten pages and every question, list item, headline and date in it is visibly on its page. The site checker reports 37 pages, 0 errors and 0 warnings before and after.

A Lighthouse SEO score says the technical basics are right. It does not predict rankings, and nothing in this section is a promise of traffic or of being quoted by an assistant.

### What was fixed

Search (9):

1. **Two pairs of pages were competing for the same search.** The area page and the guide both had titles for "metas financieras ejemplos" and for "metas académicas ejemplos" (the academic pair differed by one word). The area pages keep "ejemplos"; the two guides are now titled for the method: "Metas financieras: cómo fijarlas y por dónde empezar" and "Metas académicas: cómo fijarlas y repartir el estudio". Each guide links to its area page with the words "20 ejemplos de metas…".
2. **The reading guide and the reading calculator shared the tail "cuántas páginas leer al día".** The calculator keeps it; the guide's title is now "Reto de lectura: páginas al día para 12, 24 o 52 libros".
3. **Calculator titles now use the words people type**: "cuánto ahorrar al mes", "cuántas páginas leer al día", "cuántas horas estudiar al día", "cuántos km correr por semana" (they said "apartar", "horas al día" and "por semana").
4. **The bank's title did not contain "metas personales"**, the first query the spec lists for it. It is now "200 ejemplos de metas personales por área y plazo", with the same words in the heading, the description and the opening line.
5. **The guide on short, medium and long term promised "ejemplos" in its title and had one per term.** It now has a table of eighteen, all taken from the bank, and links to the bank filtered by term.
6. **Guide section headings did not make sense out of context** ("La fórmula", "Más ejemplos", "Cuándo usarlo", "En resumen"). Thirty-eight headings across eleven of the twelve guides now name their subject ("Ejemplos de metas SMART: antes y después", "Diferencias entre una meta y un hábito", "Cuándo usar WOOP"). No slug changed.
7. **A claim was stronger than its source.** The New Year guide called the 2020 PLOS ONE study "el mayor experimento"; the authors only say it is "probably the largest". The heading and description now say what is certain: an experiment with 1,066 people.
8. **Calculator pages and the bank showed no date**, and their structured data had none. They now show "Actualizado el…" and send the same date as `dateModified`. Every page whose text changed carries today's date in the sitemap.
9. **Smaller ones:** the About page's title printed the site name twice; the structured data named the publisher three different ways (it is now one `Organization` node everywhere); area pages linked to their calculator with "Planificar mi propia meta" and now say which calculator ("Abrir la calculadora de ahorro"); the calculator printed "1 libros".

AI answers (5):

1. **The calculator pages had no answer in the HTML a crawler receives.** The tool runs in the browser, so a crawler that does not run JavaScript saw "Cargando la calculadora…" (which AI crawlers run it was not tested; none of their vendors promise it). The server now sends the page's example plan already worked out with the calculator's own function ("3600 páginas en 365 días son 9,86 páginas al día, 69,04 por semana y 300,21 al mes"), and the tool replaces it with the same figures when it loads.
2. **Area pages opened with advice, not with the answer.** Each now opens with one sentence built from its own list: how many examples, how many per term, and two of them.
3. **`/llms.txt` added**: a plain-text summary of the site in Spanish (what it is, who publishes it, how the calculator calculates, and every page with one line). It is built from the same list as the sitemap, and a test fails if the two ever differ. No search or AI product has said it requires this file, and Google says no such file is needed to appear in its AI answers; it is cheap, and an assistant that fetches pages for a user can read it.
4. **`robots.txt` now names the AI crawlers and allows them**, in addition to the general rule that allows everyone. See "Your decision" below.
5. **The home page answers questions about the site itself** (what it is, whether it is free, who writes it, whether it gives medical or financial advice) in a visible block with matching `FAQPage` data. Every answer repeats something the site already said on another page.

### What was checked and left alone

- **Crawler access.** The home page, two calculators, the bank, an area, a guide, the About page, `robots.txt` and `sitemap.xml` were fetched with the user agents of OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, ClaudeBot, Googlebot and Bingbot, locally and on the live address: all answered 200 with the main text in the HTML. This tests user-agent rules only. The real crawlers come from their own networks, and whether Vercel's firewall treats those differently can only be seen in the logs.
- **Titles longer than 60 characters** (thirteen, the longest 67). The words that matter come first and only " | Mil Metas" would be cut. Length is a guideline.
- **Guides were not given FAQ blocks.** Their sections already answer the questions, and repeating them to earn markup is what Google's guidance warns against.
- **One share image for every page.** A per-page image would look better when a link is shared; it does not affect search.
- **`lang="es"` with no `hreflang`** is correct for one language and no country. `og:locale` is `es_ES` because the format needs a territory.
- **"Planificar" links carry the goal in the query string** (200 of them). Each calculator's canonical is its clean address, which is the standard handling.
- **The byline "Por la redacción de Mil Metas".** It names no invented person and the About page explains how content is made. If you add your name as publisher in `site.config.ts`, the pages and the structured data pick it up.
- **Metas laborales**: the area page and the guide both mention examples, but the guide is scoped to the performance review. Watch this pair in Search Console.
- Not added, on purpose: ratings or review markup, author profiles, quotes from experts, statistics (the site has none of these that are real), a keywords meta tag, WebMCP tools.

### Your decision: AI training crawlers

Everything is allowed today, including the two crawlers whose documented purpose is model training (OpenAI's GPTBot and Anthropic's ClaudeBot). Allowing or refusing training is a choice about your content, not a technical matter, so it was left as it was. To refuse: set `permitirEntrenamiento` to `false` in `src/data/rastreadores.ts` and push. That blocks only those two and leaves search and user-requested access open, which is what keeps the site eligible to be quoted. `Google-Extended` is listed separately because it also controls whether Gemini can use the site to ground answers; blocking it is a different trade.

Crawler names and purposes were read on 2026-11-25 on the vendors' own pages (the links are in that file). Read them again before editing the list; names change.

### What could not be measured

A new site on a domain that is not pointed yet has no data. These are not passes. Do them after DNS is live.

- [ ] **Day 1.** Submit the sitemap in Google Search Console and in Bing Webmaster Tools (section 4). In Search Console, use URL Inspection → Request indexing once for `/`, `/calculadora` and `/metas`. Asking again does not speed anything up.
- [ ] **Day 1.** Run the home page, `/calculadora` and one guide through the [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/). The markup was checked by hand; these are Google's and schema.org's own verdicts.
- [ ] **Day 1.** After deploying, run Lighthouse on the live address: `npx -y lighthouse@latest https://milmetas.com/calculadora --only-categories=seo,agentic-browsing --output=json --output-path=shots/lighthouse-live.json --chrome-flags="--headless=new" --quiet`.
- [ ] **Week 2.** Search `site:milmetas-com.vercel.app` in Google. Every page names `milmetas.com` as its canonical address, so the `vercel.app` copy should drop out by itself; if it is still listed after a month, look at redirecting the `vercel.app` address to the domain (Vercel → project → Domains).
- [ ] **Weeks 3 to 4.** Search Console → Pages: compare indexed pages with the 37 in the sitemap and read the reason given for any that are missing. Do the same in Bing.
- [ ] **Weeks 6 to 8, then monthly.** Search Console → Performance: (a) for "metas financieras", "metas académicas", "metas laborales" and "páginas leer al día", check that one page, not two, collects the impressions; if two alternate, merge the weaker one's unique parts into the other. (b) Queries at positions 8 to 20 with impressions: answer the query in the first two sentences of the page and link to it from two related pages. Change one thing per page and wait three to four weeks. Google reports appearances in its AI answers inside these same totals (search type "Web").
- [ ] **When there is traffic.** [PageSpeed Insights](https://pagespeed.web.dev/) shows real-visitor speed (Core Web Vitals) once enough people have visited. Lab speed was not part of this audit.
- [ ] **Links from other sites**: none can exist yet. The calculator and the area pages are the things worth showing to teachers, tutors and people who write about goals.

### Checking AI visibility by hand

Search Console has no report that says which assistants quote the site, so check it yourself once a month. About twenty minutes.

1. Ask each question below in ChatGPT (with search on), Perplexity, Google (look for the AI answer above the results), Claude (with web search on) and Copilot. Ask each one three times in fresh chats, because answers vary from run to run.
2. Write down, per question and assistant: was `milmetas.com` linked or named, which page, and which other sites were.
3. Compare month to month. One appearance is an anecdote; "linked in 2 of 3 runs, up from 0" is a trend.

Questions, taken from the searches the site was built for:

- ¿Cuántas páginas tengo que leer al día para leer 24 libros al año?
- ¿Cómo sé si voy a tiempo con una meta de ahorro?
- Dame ejemplos de metas financieras a corto, mediano y largo plazo.
- ¿Qué es una meta SMART y qué significaban las letras originalmente?
- ¿Es verdad el estudio de Yale sobre las metas escritas?
- ¿Cuánto tarda en formarse un hábito?
- ¿Qué es el método WOOP?
- ¿Qué es Mil Metas (milmetas.com)?

Two signals that need no asking: in Vercel Web Analytics, referrers such as `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`, `gemini.google.com` or `claude.ai` mean someone followed a link from an answer; and, if your Vercel plan keeps request logs, requests from `OAI-SearchBot`, `Claude-SearchBot` or `PerplexityBot` mean the site is being indexed for those products. If an assistant says something wrong about the site, the fix is on the page that should state that fact plainly, usually the About page or the calculator's "Cómo funciona".

### How the audit was run

The site checker, Lighthouse and a browser session against `next start`; a script that read all 37 pages as a crawler without JavaScript would (title, description, canonical, headings, structured data, links in and out); and the project's `seo`, `seo-audit` and `seo-geo` skills as checklists. The figures those skills quote for how much a technique "boosts visibility" were not used: they are not measurements of this site.

