# Mil Metas: specification

**Domain:** milmetas.com · **Language:** Spanish (neutral, "tú") · **Launch size:** standard

The idea and the reasons for it are in [IDEA.md](IDEA.md). This document says exactly what gets built.

## 1. Identity

- **Name and wordmark:** "mil metas", lowercase, set in the display face; "mil" in ink, "metas" in the accent colour, preceded by a small finish-flag mark (inline SVG). Tagline: "Ideas de metas y el ritmo para cumplirlas."
- **Voice:** directo, concreto, sin humo motivacional. Example: "Una meta sin número es un deseo. Ponle un número y una fecha, y te decimos cuánto toca esta semana."
- **Look:** a running track on warm paper: lane lines and a checkered finish strip as the only decoration, big tabular numbers, generous white cards.
  - `paper` `#FBF7F0` page background · `surface` `#FFFFFF` cards · `line` `#E7DFD2` borders
  - `ink` `#1B2032` text · `muted` `#5B6072` secondary text
  - `meta` `#C2410C` the accent (links, primary buttons, the wordmark), `meta-dark` `#9A3412` for hover
  - status: `ok` `#166534` on `#DCFCE7` (a tiempo / adelantado), `late` `#991B1B` on `#FEE2E2` (atrasado), `wait` `#92400E` on `#FEF3C7` (aún no empieza / plazo vencido)
  - Headings: Bricolage Grotesque. Body: Source Sans 3. Numbers in the calculator use tabular figures.
  - Phone first; one column on phones, form beside result from 1024px.

## 2. Pages

Every URL the site launches with.

| URL | Page | Purpose | Rendering |
|---|---|---|---|
| `/` | Inicio | Says what the site is, shows the calculator entry point, the ten areas of the bank with counts, and the latest guides | static |
| `/calculadora` | Calculadora de metas | The core tool, with how it works, worked examples and FAQ | static shell + client tool |
| `/calculadora/ahorro` `/calculadora/lectura` `/calculadora/estudio` `/calculadora/kilometros` | Calculadoras por tipo de meta | The same tool with defaults, wording, a worked example and FAQ for one kind of goal | static shell + client tool |
| `/metas` | Banco de metas | All goals with filters by area, horizon and text; links to each area | static + client filter |
| `/metas/[area]` (10) | Área del banco | The goals of one area grouped by horizon, an introduction on setting goals in that area, related guides | static |
| `/guias` | Guías | Hub listing every guide by group | static |
| `/guias/[slug]` (12) | Guía | One article | static |
| `/acerca` `/como-trabajamos` `/contacto` `/privacidad` `/terminos` `/afiliados` | Trust pages | About, editorial policy, contact, privacy, terms, affiliate disclosure | static |
| `/publicidad` | Patrocinio | Who the audience is, what placements exist, how to get in touch | static |
| `/sitemap.xml` `/robots.txt` `/feed.xml` `/ads.txt` | Machine-readable | `ads.txt` returns 404 until an AdSense client is set | generated |

Areas (`/metas/[area]`): `salud-y-bienestar`, `dinero`, `estudios`, `trabajo`, `lectura`, `idiomas`, `relaciones`, `hogar`, `creatividad`, `viajes-y-experiencias`.

**Navigation:** Calculadora · Banco de metas · Guías · **Footer:** Herramientas (calculadora and the four presets) · Banco (areas) · Sitio (acerca, cómo trabajamos, contacto, publicidad) · Legal (privacidad, términos, afiliados)

## 3. The core feature

The *Calculadora de metas*: a client component fed by pure functions in `src/lib/ritmo.ts`.

- **What the visitor does, step by step:**
  1. Names the goal and types where they start, where they want to get to, and the unit.
  2. Picks the start date and the deadline (or a quick duration: 30 días, 90 días, 6 meses, 1 año, fin de año).
  3. Reads the pace per day, week and month, and per session if they chose fewer than 7 days a week.
  4. Types how much they have today and reads the verdict, the pace needed from tomorrow, and the date they would finish at their current pace.
  5. Optionally saves the goal in the browser ("Mis metas") or copies a link to the plan.
- **Inputs:**

  | Field | Query key | Type | Default | Validation |
  |---|---|---|---|---|
  | Nombre de la meta | `meta` | text, max 80 | "Leer 12 libros" | optional |
  | Empiezo en | `de` | number | 0 | finite, absolute value up to 1e12: "Escribe un número." |
  | Quiero llegar a | `a` | number | 12 | finite, different from the start: "El valor al que quieres llegar tiene que ser distinto del valor inicial." |
  | Unidad | `u` | text, max 24 | "libros" | optional |
  | Desde | `desde` | date | today | valid date: "Elige una fecha de inicio." |
  | Hasta | `hasta` | date | today + 364 days | not before the start, span up to 36,500 days: "La fecha límite no puede ser anterior a la de inicio." |
  | Días por semana | `dps` | integer 1 to 7 | 7 | clamps to 1..7 |
  | Hoy llevo | `llevo` | number | the start value | finite |

  Links from the bank pass `dias` instead of dates: the plan then starts today and lasts `dias` days.
- **Logic** (all dates are calendar days in the visitor's time zone; the plan includes both the start day and the deadline day):
  - `D` = days in the plan = (hasta − desde) + 1
  - `T` = total to cover = |a − de|; direction `s` = +1 if a > de, −1 if a < de (goals that go down, such as a debt, work the same way)
  - pace per day `p` = T / D; per week = min(7p, T); per month = min(30.4375p, T), where 30.4375 = 365.25 / 12 is the average month length; per session = (per week) / días por semana
  - when p < 1: "one every N days", N = D / T
  - `E` = days elapsed at the end of today = clamp((hoy − desde) + 1, 0, D)
  - expected today = de + s·T·E/D
  - done `H` = s·(llevo − de); percentage = H / T
  - difference `Δ` = H − T·E/D, also in days: Δ / p
  - tolerance `tol` = max(p, 0.05·T): one day of pace, or 5% of the total, whichever is larger
  - verdict: **cumplida** if H ≥ T; **aún no empieza** if hoy < desde; **plazo vencido** if hoy > hasta and H < T; otherwise **adelantado** if Δ > tol, **atrasado** if Δ < −tol, else **a tiempo**
  - remaining `R` = max(T − H, 0); days left after today `L` = D − E; new pace = R / L per day (when L = 0, everything remaining is due today)
  - projection: average pace so far `v` = H / E; if v > 0, projected finish = desde + ceil(T / v) − 1 days; with no progress there is no projection
  - milestones at 25%, 50%, 75%, 100%: date = desde + ceil(k·D) − 1 days, value = de + s·k·T
- **Outputs:** the verdict as a labelled badge with one sentence explaining it; a progress bar with a marker where the visitor should be today; four pace figures (día, semana, mes, sesión); "para hoy deberías llevar"; the difference in units and in days; the pace needed from tomorrow; the projected finish date; the milestone table; and an expandable "Cómo se calcula" that shows each formula with the visitor's own numbers. Numbers use Spanish formatting (decimal comma, at most two decimals).
- **Edge cases:** empty or non-numeric fields show the message beside the field and no result; start equal to target is an error; deadline before start is an error; a one-day plan (D = 1) is valid; today before the start shows the plan without a verdict on progress; today after the deadline shows "plazo vencido" with what is missing; progress beyond the target shows "cumplida" and the bar stays at 100%; progress in the wrong direction gives a negative H and "atrasado"; unknown or malformed query keys fall back to defaults.
- **Worked examples to verify against** (computed by hand; they are unit tests and are published on the calculator page):
  1. **Leer 12 libros en 2027.** de 0, a 12, 2027-01-01 to 2027-12-31 → D = 365; per day 0.0329, per week 0.2301, per month 1.0007; one book every 30.42 days. Milestones: 3 books by 2027-04-02, 6 by 2027-07-02, 9 by 2027-10-01, 12 by 2027-12-31. Checked on 2027-04-10 with 3 books read: E = 100, expected 3.2877, Δ = −0.2877, tol = 0.6 → **a tiempo**; new pace 9 / 265 = 0.0340 per day (0.2377 per week); projection at 0.03 per day: 400 days → 2028-02-04.
  2. **Ahorrar 3,000 en diez meses.** de 0, a 3000, 2027-01-01 to 2027-10-31 → D = 304; per day 9.8684, per week 69.0789, per month 300.3701. Checked on 2027-03-31 with 600 saved: E = 90, expected 888.1579, Δ = −288.1579 (29.2 days), tol = 150 → **atrasado**; new pace 2400 / 214 = 11.2150 per day (78.5047 per week, 341.3551 per month); projection: 450 days → 2028-03-25.
  3. **Bajar una deuda de 2,400 a 0.** de 2400, a 0, 2027-02-01 to 2028-01-31 → D = 365, T = 2400, s = −1; per day 6.5753, per week 46.0274, per month 200.1370. Checked on 2027-08-01 owing 1,000: E = 182, expected balance 1203.2877, H = 1400, Δ = +203.2877 (30.9 days), tol = 120 → **adelantado**; new pace 1000 / 183 = 5.4645 per day; projection: 312 days → 2027-12-09.
  4. **Estudiar 120 horas en 12 semanas, 5 días por semana.** de 0, a 120, 2027-03-01 to 2027-05-23 → D = 84; per day 1.4286, per week 10, per session 2 hours, per month 43.4821.
- **State and sharing:** every input lives in the query string (keys above), written with `history.replaceState` as the visitor types, so the address bar is always a shareable link to the plan. "Mis metas" stores saved plans in `localStorage` under one key; nothing is sent to a server. The page itself is static: the tool reads the query string in the browser, never on the server.

## 4. Data

| Data | Where it comes from | Stored as | Refreshed |
|---|---|---|---|
| Bank of goals (200 at launch, 20 per area) | Written for this site as examples; they are suggestions, not facts, and each has a quantity, a unit and a duration so the calculator can plan it | `src/data/metas.ts` | by hand, when goals are added |
| Areas (10) with introductions | Written for this site | `src/data/areas.ts` | by hand |
| Calculator presets (4) | Written for this site | `src/data/presets.ts` | by hand |
| Commercial links | Store search and category pages, verified to load on 2026-11-19 | `src/data/affiliates.ts` | when a link changes |
| Research citations | The original papers and publishers' pages, linked by DOI or official URL and checked during the build | inside each guide | when a guide is updated |

## 5. Content at launch

| # | Title | URL | The question it answers | Links to | Commercial links |
|---|---|---|---|---|---|
| 1 | Cómo escribir una meta SMART (y qué significaban las letras en 1981) | `/guias/como-escribir-una-meta-smart` | How do I turn a vague wish into a goal I can check? | calculadora, banco, guías 2 and 4 | books (search link) |
| 2 | Metas a corto, mediano y largo plazo: cómo repartirlas | `/guias/metas-a-corto-mediano-y-largo-plazo` | What counts as short, medium and long term, and how do they connect? | calculadora, banco, guías 1 and 6 | none |
| 3 | Metas y hábitos: en qué se diferencian y cómo combinarlos | `/guias/metas-y-habitos` | Should I set a goal or build a habit? | calculadora, área salud, guías 6 and 11 | books (search link) |
| 4 | Qué dice la investigación sobre fijar metas (y el estudio de Yale que nunca existió) | `/guias/que-dice-la-investigacion-sobre-fijar-metas` | Does writing goals down work, and what is the evidence? | calculadora, guías 1, 3 and 11 | none |
| 5 | Propósitos de año nuevo: cómo elegir pocos y convertirlos en un plan | `/guias/propositos-de-ano-nuevo` | How do I make resolutions I will still be doing in March? | calculadora, banco, guías 1 and 6 | planners (search link) |
| 6 | Cómo saber si vas a tiempo con una meta: ritmo, hitos y revisión semanal | `/guias/como-saber-si-vas-a-tiempo` | How do I check progress and what do I do when I am behind? | calculadora, guías 2 and 3 | none |
| 7 | Metas financieras: ejemplos y cómo calcular cuánto apartar | `/guias/metas-financieras` | What is a reasonable money goal and how much per month does it take? | calculadora de ahorro, área dinero, guía 2 | none |
| 8 | Metas académicas: ejemplos medibles para estudiantes | `/guias/metas-academicas` | What goals can a student set that are measurable? | calculadora de estudio, área estudios, guía 1 | none |
| 9 | Metas laborales para tu evaluación de desempeño: ejemplos medibles | `/guias/metas-laborales-evaluacion-de-desempeno` | What do I write when my manager asks for goals? | calculadora, área trabajo, guías 1 and 12 | none |
| 10 | Reto de lectura: cuántas páginas al día para leer más libros al año | `/guias/reto-de-lectura-paginas-por-dia` | How many pages a day do I need for N books a year? | calculadora de lectura, área lectura, guía 3 | e-readers (category link) |
| 11 | Método WOOP y planes «si-entonces»: prepara el obstáculo antes de que llegue | `/guias/metodo-woop-y-planes-si-entonces` | How do I plan for the moment I will want to quit? | calculadora, guías 3 and 4 | none |
| 12 | OKR personales: objetivos y resultados clave para tu vida | `/guias/okr-personales` | Can I use OKRs outside a company, and how? | calculadora, guías 1 and 9 | books (search link) |

**Rules for this site's content:**
- A study is cited only to its original paper or the publisher's page (DOI or official URL), with what it measured stated in one sentence. No percentages from memory: every figure is checked against the source or left out.
- Popular claims with no source (the "Yale goals study", "21 days to form a habit", "92% of resolutions fail") are either left out or named as unsupported, with the source that says so.
- No medical, dietary, legal or investment advice. Health goals are about behaviour (steps, sleep schedule, sessions), never weight or diet targets. Money goals do not model returns or recommend products.
- No claims of experience: no "probamos", no authors, no testimonials. Recommendations are described by criteria.
- Goals in the bank are examples. Numbers in them are starting points the visitor changes in the calculator, and the page says so.

## 6. Search

- **Queries the site is built to answer:**
  - Calculator and presets: "calculadora de metas", "cuánto ahorrar al mes para llegar a una meta", "cuántas páginas leer al día", "cuántas horas estudiar al día", "cuántos km correr por semana meta anual"
  - Bank and areas: "ejemplos de metas personales", "lista de metas", "metas financieras ejemplos", "metas académicas ejemplos", "metas laborales ejemplos", "metas de salud ejemplos", "metas a corto plazo ejemplos"
  - Guides: "metas SMART ejemplos", "qué es una meta SMART", "metas a corto mediano y largo plazo", "diferencia entre meta y hábito", "propósitos de año nuevo", "método WOOP", "OKR personales", "reto de lectura"
- **Structured data by page type:** `WebSite` and `Organization` on the home page; `WebApplication` plus `FAQPage` (the questions are visible) on the calculator pages; `ItemList` on the bank and area pages; `Article` on guides; `BreadcrumbList` on every page below the home page.
- **Redirects from the domain's old URLs:** none. The domain only ever served parking pages.

## 7. Monetization

- **Affiliate programs:** Amazon Afiliados (amazon.es) for books, planners and e-readers, linked as store search or category pages from guides 1, 3, 5, 10 and 12; Domestika and Coursera are named in `MONETIZATION.md` for the study, language and creative areas and are not linked at launch. Every commercial link goes through `src/data/affiliates.ts` and the `AffiliateLink` component, with a disclosure before the first one.
- **Ad slots:** `calc-result` (below the calculator's result and saved goals), `guide-mid` (after the first third of a guide), `guide-end` (after a guide), `bank-end` (after the goal list on bank and area pages).
- **Sponsorship:** `/publicidad` offers a labelled "Con el apoyo de" slot on one area of the bank or on the calculator, and a labelled sponsored guide. The slot reads from `site.config.ts` and renders nothing while empty.
- **Newsletter:** prepared and off (`NewsletterSignup` renders only when a form URL is set).
- **Everything is off at launch** and switches on from `src/site.config.ts`.

## 8. Technical

- **Stack:** Next.js (App Router, TypeScript, Tailwind) on Vercel, as scaffolded by `create-next-app`. Version-specific rules come from `node_modules/next/dist/docs/`.
- **Dependencies beyond the scaffold:** `@next/mdx` with `@mdx-js/loader`, `@mdx-js/react` and `@types/mdx` (guides are MDX so they can use the affiliate and callout components); `@vercel/analytics`; `vitest` (dev) for the calculator's logic. If the bundled docs recommend a different way to load Markdown, that way wins and this list is updated.
- **Rendering and caching:** every page is static. The calculator, the bank filter and "Mis metas" run in the browser. No fetches at build or request time.
- **Tests:** `src/lib/ritmo.ts` against the four worked examples and the edge cases in section 3; date helpers; the integrity of the bank (unique ids, 20 goals per area, positive quantities and durations, every area and horizon valid).
- **No database, no login, no paid services, no secrets needed to build.**

## 9. Out of scope for launch

- Accounts, sync between devices and reminders: they need a database and email, which break the zero-cost rule.
- A page per goal: 200 near-identical pages would be thin; goals live on list pages.
- A model-powered goal rewriter: `ai_features` is `on-request`.
- Returns, interest and inflation in the savings preset: that is the line between arithmetic and financial advice.
- The remaining 800 goals: the bank grows in batches listed in `LAUNCH.md`.
- A Portuguese edition.

## 10. Done means

- [ ] The core feature works and matches every worked example in section 3
- [ ] Every page in section 2 exists and every article in section 5 is written
- [ ] `lint`, tests and `build` pass
- [ ] `site_check.py` reports no errors locally and on the live site
- [ ] The site has been looked at on desktop and phone widths
- [ ] Live on Vercel, repository connected, domain attached
- [ ] `MONETIZATION.md` and `LAUNCH.md` written
