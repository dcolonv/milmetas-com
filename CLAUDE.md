@AGENTS.md

# Mil Metas (milmetas.com)

A Spanish-language site: a bank of measurable goal ideas, a pace calculator ("¿voy a tiempo?") and guides.
Read `docs/SPEC.md` for what the site is, `docs/PLAN.md` for build state and `docs/LAUNCH.md` for the roadmap.

## Commands

- `pnpm dev`: development server
- `pnpm test`: unit tests (calculator maths, number and date helpers, data integrity)
- `pnpm lint` and `pnpm typecheck`
- `pnpm build`, then `pnpm start -p 4310` to serve the production build

## Where things live

- `src/site.config.ts`: name, domain, navigation, contact address and every monetization ID. The domain in `url` is the only source for canonicals, sitemap, Open Graph and JSON-LD. Never derive it from the request or `VERCEL_URL`.
- `src/lib/`: pure logic, no React. `ritmo.ts` is the calculator's maths; `fechas.ts` and `formato.ts` handle dates and Spanish number formats; `enlace.ts` maps the form to the query string.
- `src/data/`: `areas.ts` and `metas.ts` (the bank), `presets.ts` (calculators by kind of goal), `guias.ts` (guide frontmatter), `affiliates.ts` (every commercial link), `ejemplos.ts` (worked examples, also unit tests).
- `content/guias/<slug>.mdx`: guide bodies.
- `src/components/`: layout pieces, `AffiliateLink`, `AdSlot`, `Disclosure`, and `calculadora/` (the tool).

## How to

- **Add goals to the bank**: append rows to the end of an area in `src/data/metas.ts`. Each needs a quantity, a unit and a duration in days. No weight, diet, medical or investment goals.
- **Add a guide**: add its entry to `src/data/guias.ts`, write `content/guias/<slug>.mdx`, add its loader line in `src/lib/guias.ts`. The hub, sitemap and feed pick it up. Cite studies to the original paper (DOI or publisher URL) and state no figure that was not checked against the source.
- **Add a calculator page**: add an entry to `src/data/presets.ts`.
- **Add a commercial link**: add it to `src/data/affiliates.ts` and render it only with `<AffiliateLink id="...">`, with `<Disclosure />` before the first one on the page. Never print Amazon prices or availability.
- **Switch on revenue**: fill the matching ID in `src/site.config.ts` and push. See `docs/MONETIZATION.md`.
- Every page sets its own title, description and canonical with `pageMeta()` from `src/lib/seo.ts`. Do not set a canonical in the root layout.

## Conventions

- Site copy is Spanish (neutral, "tú"); code comments and docs are English.
- Next.js here runs with Cache Components: no `export const revalidate/dynamic/dynamicParams`. Dynamic routes list their params in `generateStaticParams` and call `notFound()` for anything else. The calculator reads the query string in the browser inside `<Suspense>`, so pages stay static.
- Unknown slugs must return a real 404. A dynamic route under Cache Components answers them with 200 on the first visit, so `next.config.ts` rewrites every slug that is not in the data files to `/no-encontrada`. A new dynamic section needs its own rewrite there.
- Colours and fonts are tokens in `src/app/globals.css` (`bg-paper`, `text-ink`, `text-meta`...). Do not use raw hex values in components.
- The worked examples in `docs/SPEC.md` section 3 are tests in `src/lib/ritmo.test.ts`. If the maths changes, both change.

## Companion skills

The project uses agent skills listed in `skills-lock.json` (React best practices, composition patterns, web design guidelines, next-dev-loop, agent-browser, ai-sdk). They live in `.claude/skills/`, which is not committed. On a fresh clone restore them with `npx skills experimental_install`.
