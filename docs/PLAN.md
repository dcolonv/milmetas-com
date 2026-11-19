# Mil Metas: execution plan

Built from [SPEC.md](SPEC.md). Each milestone ends with the site building, a commit, and a push. Tick items as they are finished; this file is how an interrupted run knows where to pick up.

## M0 · Scaffold
- [x] Scaffold with `npx create-next-app@latest` into the repository; untouched scaffold builds
- [x] Install the companion skills (`install_skills.py`); `skills-lock.json` present
- [x] Read the bundled framework docs listed in the build guide, then the React companion skills
- [x] `agent-browser` CLI available; `next dev` running and `next-dev-loop` preflight passes
- [x] `src/site.config.ts` with name, `https://milmetas.com`, language `es`, nav, empty monetization IDs
- [x] Remove scaffold leftovers; `CLAUDE.md` with project conventions
- [x] Commit: scaffold

## M1 · Identity and layout
- [x] Theme tokens (paper, ink, meta accent, status colours), Bricolage Grotesque and Source Sans 3 through `next/font`
- [x] Header with wordmark and nav, footer with the four link groups, page container, breadcrumbs, prose styles for guides
- [x] Favicon, app icon, Open Graph image
- [x] Commit: layout and identity

## M2 · Core feature: Calculadora de metas
- [x] `src/lib/fechas.ts` and `src/lib/ritmo.ts` with Vitest tests covering the four worked examples and the edge cases in the spec
- [x] Calculator UI: form, verdict, progress bar with today's marker, pace figures, milestones, "Cómo se calcula"
- [x] State in the query string; "Mis metas" saved in the browser; copy link
- [x] `/calculadora` page: how it works, the worked examples, FAQ, JSON-LD
- [x] Preset pages: `/calculadora/ahorro`, `/calculadora/lectura`, `/calculadora/estudio`, `/calculadora/kilometros`
- [x] Verified in the running app with `next-dev-loop`, and by hand against worked example 2
- [x] Commit: calculator works

## M3 · Content
- [ ] Bank data: 10 areas, 200 goals (`src/data/areas.ts`, `src/data/metas.ts`) with integrity tests
- [ ] `/metas` with filters by area, horizon and text; `/metas/[area]` pages with introductions
- [ ] MDX loading, guide template, `/guias` hub
- [ ] Guía: Cómo escribir una meta SMART
- [ ] Guía: Metas a corto, mediano y largo plazo
- [ ] Guía: Metas y hábitos
- [ ] Guía: Qué dice la investigación sobre fijar metas
- [ ] Guía: Propósitos de año nuevo
- [ ] Guía: Cómo saber si vas a tiempo con una meta
- [ ] Guía: Metas financieras
- [ ] Guía: Metas académicas
- [ ] Guía: Metas laborales para tu evaluación de desempeño
- [ ] Guía: Reto de lectura, páginas por día
- [ ] Guía: Método WOOP y planes «si-entonces»
- [ ] Guía: OKR personales
- [ ] Home page: calculator entry, areas with counts, latest guides
- [ ] Internal links between guides, areas and the calculator
- [ ] Commit: launch content

## M4 · Monetization plumbing
- [ ] Affiliate registry and `AffiliateLink`; disclosure component on pages with links
- [ ] `AdSlot` in the four agreed positions, rendering nothing while unconfigured; `ads.txt` route
- [ ] `/publicidad`; sponsor slot; network links block and newsletter component, both off while unconfigured
- [ ] Commit: monetization ready, switched off

## M5 · Trust and search
- [ ] Acerca, Cómo trabajamos, Contacto, Privacidad, Términos, Afiliados
- [ ] Per-page titles, descriptions and canonicals; sitemap, robots, RSS, JSON-LD, 404
- [ ] Analytics component
- [ ] Commit: trust pages and search plumbing

## M6 · Verify
- [ ] `lint`, tests, `build` pass; route table has no unintended dynamic pages
- [ ] `site_check.py` against the local production server: no errors, warnings resolved or explained
- [ ] Interface code reviewed with `web-design-guidelines`; findings fixed
- [ ] Site opened with `agent-browser`: calculator used with worked example 2, desktop and phone sizes, screenshots reviewed, no console errors
- [ ] README rewritten for this project
- [ ] Commit and push: ready to deploy

## M7 · Publish
- [ ] Vercel project created and linked; repository connected
- [ ] Production deployment succeeded
- [ ] `site_check.py` against the production alias: no errors
- [ ] Domain and `www` attached; DNS records obtained
- [ ] Web Analytics enabled

## M8 · Hand off
- [ ] `docs/MONETIZATION.md`
- [ ] `docs/LAUNCH.md` with live URL, DNS records, what to do next, content roadmap
- [ ] Final commit pushed; Git-triggered deployment confirmed
