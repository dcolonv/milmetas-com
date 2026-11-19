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
| Machine-readable | `/sitemap.xml` (37 URLs), `/robots.txt`, `/feed.xml`, `/manifest.webmanifest`; `/ads.txt` is 404 until ads are configured |

Checked on launch day: lint, 50 unit tests and the build pass; the site checker found no errors and no warnings on 37 pages, locally and on the live address; the calculator was used in a real browser at desktop and phone sizes, locally and live, and matched the spec's worked example.

## 3. Changing the site

- **Settings, name, links, IDs:** `src/site.config.ts`
- **Guides:** an entry in `src/data/guias.ts`, the text in `content/guias/<slug>.mdx`, one loader line in `src/lib/guias.ts`; the guide then appears in the hub, sitemap and feed
- **Goals and areas:** `src/data/metas.ts` and `src/data/areas.ts`
- **Calculators by kind of goal:** `src/data/presets.ts`
- **Commercial links:** `src/data/affiliates.ts`
- Push to `main` and Vercel deploys. This was confirmed during the run: pushes started production deployments by themselves.
- Run locally: `pnpm install`, `pnpm dev`. Check before pushing: `pnpm test` and `pnpm build`.

## 4. After DNS is live

- [ ] Open https://milmetas.com and https://www.milmetas.com and confirm both work
- [ ] Add the site to Google Search Console (choose "Domain", verify with the DNS record it gives you) and submit `https://milmetas.com/sitemap.xml`
- [ ] Do the same in Bing Webmaster Tools; it can import from Search Console
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
