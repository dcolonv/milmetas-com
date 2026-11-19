# Mil Metas

The site for [milmetas.com](https://milmetas.com): a Spanish-language bank of measurable goal ideas, a calculator that turns any goal with a number and a date into a pace per day, week and month and says whether you are on track, and guides on setting goals.

- **Calculadora de metas** (`/calculadora`, plus four calculators by kind of goal): runs in the browser, keeps the plan in the query string so every plan has a link, and can save goals in `localStorage`. No accounts, no server state.
- **Banco de metas** (`/metas`): 200 example goals in 10 areas, filterable by area, horizon and text. Each one opens in the calculator with its numbers.
- **Guías** (`/guias`): 12 articles, with studies cited to their original source.

Why the site is what it is: [docs/IDEA.md](docs/IDEA.md). What exactly was built: [docs/SPEC.md](docs/SPEC.md). How to make it earn: [docs/MONETIZATION.md](docs/MONETIZATION.md). What to do next: [docs/LAUNCH.md](docs/LAUNCH.md).

## Run it

Requires Node 20.9 or later and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # calculator maths, number and date helpers, data integrity
pnpm lint
pnpm build && pnpm start
```

## Change it

Everything that changes often is data, not components.

| To | Edit |
|---|---|
| Change the name, domain, navigation, contact address, or switch on a revenue stream | `src/site.config.ts` |
| Add goals to the bank | `src/data/metas.ts` (append rows to an area) |
| Add an area | `src/data/areas.ts`, then its goals in `metas.ts` |
| Add a guide | an entry in `src/data/guias.ts`, the body in `content/guias/<slug>.mdx`, one loader line in `src/lib/guias.ts` |
| Add a calculator for a kind of goal | `src/data/presets.ts` |
| Add or change a commercial link | `src/data/affiliates.ts`, rendered only through `<AffiliateLink id="...">` |
| Change colours or fonts | the tokens at the top of `src/app/globals.css`, and the font imports in `src/app/layout.tsx` |

`pnpm test` fails if a guide has no file, a link between pages points nowhere, a title or description is the wrong length, or the bank breaks its own rules. Run it before pushing.

The calculator's formulas are in `src/lib/ritmo.ts` and are published on `/calculadora`. The worked examples in `docs/SPEC.md` are the tests in `src/lib/ritmo.test.ts`; change both together.

## How it is built

Next.js (App Router, TypeScript, Tailwind CSS v4), scaffolded with `create-next-app`. Every page is static. There is no database, no login, no paid service and no secret: the site builds and runs with no environment variables.

- The domain in `src/site.config.ts` is the only source for canonicals, the sitemap, Open Graph and JSON-LD.
- Cache Components is on. Dynamic routes list their slugs in `generateStaticParams`; `next.config.ts` builds rewrites from the same data so unknown slugs get a real 404.
- Ads, affiliate tracking, sponsorship and the newsletter box are wired and off. Each switches on by filling one value in `src/site.config.ts`.

Conventions for working on the code are in [CLAUDE.md](CLAUDE.md).

## Deploy

The repository is connected to a Vercel project: pushing to `main` deploys to production.
