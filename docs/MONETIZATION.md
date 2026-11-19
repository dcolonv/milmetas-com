# Mil Metas: turning it into income

Everything below is built and switched off. Each stream turns on by filling in a value in `src/site.config.ts` and pushing; Vercel redeploys by itself.

A new site earns very little until it has visitors, and visitors from search usually take a few months to arrive. The order below reflects that. The first real window for this site is December and January, when people search for propósitos de año nuevo.

## Before switching anything on

- [ ] **Vercel plan.** This project is on Vercel's free Hobby plan, which is for non-commercial use. Upgrade the team to Pro before enabling any item below. A site with every stream off is not yet commercial; one with an affiliate tag or ads is.
- [ ] **Say who publishes the site.** `publisherName` in `src/site.config.ts` is empty, so the About page calls the site an independent publication and the privacy page names no legal entity. Ad networks, affiliate programmes and, in Spain and the EU, the law (the "aviso legal") expect the owner to be identified. Set the name, and add the legal details your country requires to `/privacidad` and `/terminos`.
- [ ] Read the Privacy, Terms and Disclosure pages (`/privacidad`, `/terminos`, `/afiliados`) and adjust them to your situation. They are sensible starting points, not legal advice.
- [ ] Make sure the contact address on the site (`hello@milmetas.com`) reaches you: create the mailbox or change `contactEmail` in `src/site.config.ts`.
- [ ] Read the twelve guides. The site says its content is written with AI assistance and published under the editor's responsibility; that editor is you.

## 1. Affiliate programs (do first: approval is quick and links already exist)

| Program | Covers | Join at | Commission / cookie | Goes in `site.config.ts` as |
|---|---|---|---|---|
| Amazon Afiliados (Spain) | Books, planners, e-readers | https://afiliados.amazon.es/ (Regístrate) | Check on signup. Amazon's own table is at https://afiliados.amazon.es/help/node/topic/GRXPHT8U84RAYDXZ; rates vary by category and change | `monetization.amazonTag` (your tracking ID, for example `milmetas-21`) |
| Amazon Afiliados (Mexico or another store) | The same links for Latin American readers | The affiliate site of that store | Check on signup. Each country is a separate programme and account | `monetization.amazonDomain` (one store at a time; see the note below) |
| Domestika | Courses, for the creativity, languages and study areas | Its own affiliates page; third-party listings say the programme runs through Impact | Not verified. Third-party listings disagree on the rate and report a 30-day cookie; check on signup | Not wired yet: see "Adding a second programme" |
| Coursera | Courses and certificates, for the work and study areas | Its own affiliates page | Not verified; check on signup | Not wired yet |

Links are already on these pages, pointing at plain Amazon search and category pages until a tag is set:

| Page | Links (IDs from `src/data/affiliates.ts`) |
|---|---|
| `/guias/como-escribir-una-meta-smart` | `libro-mide-lo-que-importa` |
| `/guias/okr-personales` | `libro-mide-lo-que-importa` |
| `/guias/metas-y-habitos` | `libro-habitos-atomicos` |
| `/guias/propositos-de-ano-nuevo` | `agendas-y-planificadores` |
| `/guias/reto-de-lectura-paginas-por-dia` | `lectores-de-libros-electronicos` |

To add or change a product, edit `src/data/affiliates.ts`. Every commercial link on the site comes from that file and is rendered by `AffiliateLink`, which always adds `rel="sponsored nofollow noopener"`.

**Amazon specifics.**
- The sentence the Spanish programme requires ("En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables", clause 5 of the operating agreement as updated on 15 October 2025) appears in the on-page notice and on `/afiliados` automatically once `amazonTag` is set. Until then the site does not claim to be an affiliate, because it is not one.
- The links are searches and categories on purpose: the site prints no prices or availability, which the programme does not allow outside its API.
- Amazon closes accounts that make no qualifying sales in the first 180 days. Join when the site has some traffic, not on day one.
- The site is written for Spain and Latin America, but a tag only earns in its own store. `amazonDomain` points every link at one store. Sending each visitor to their own country's store needs either Amazon's OneLink (check whether it covers your stores) or a small change to `AffiliateLink`.

**Adding a second programme.** `AffiliateLink` only knows the `amazon` programme today. To add another: add its ID to `monetization` in `src/site.config.ts`, add the programme name to the `Programa` type in `src/data/affiliates.ts`, and teach `urlAfiliado` in `src/components/AffiliateLink.tsx` how that programme's tracking parameter is added. Then add entries to the registry and link them from the area pages.

## 2. Display ads (do when the site has steady traffic)

- Ad slots exist at: below the calculator and saved goals on all five calculator pages (`calc-result`); after the first sections of each guide (`guide-mid`); after each guide (`guide-end`); after the goal list on `/metas` and after the lists on each area page (`bank-end`). They render nothing until an ID is set, and reserve their height when on.
- Apply to Google AdSense once there is consistent traffic and the content has been live a few weeks. Reviewers look for original content and the About, Contact and Privacy pages, which are in place. Networks that pay more (Mediavine's and Raptive's entry programmes) need far more traffic; check their current thresholds.
- Set `monetization.adsenseClient` to your publisher ID (`ca-pub-...`) and put each ad unit's ID in `monetization.adsenseSlots`. A slot with no unit ID stays empty. `/ads.txt` starts serving the correct line automatically (it returns 404 today).
- [ ] **Before ads go live for visitors in the EU, UK or Switzerland**, add a consent banner from a Google-certified provider. This is not built because nothing on the site needs consent today. The privacy page switches its advertising paragraph by itself when `adsenseClient` is set, but read it again at that point.

## 3. Sponsorship

- `/publicidad` describes the audience and what a sponsor can buy: a "Con el apoyo de" line on one area of the bank, the same line under the calculator, or a labelled sponsored guide. It promises real traffic figures on request and publishes none, because there are none yet.
- Sponsored placements are added to `monetization.sponsors` in `src/site.config.ts` (`slot` is `calculadora` or an area slug such as `idiomas`). They are always labelled "Patrocinado" and marked `rel="sponsored"`. Unlabelled paid links are what get sites removed from search, so the components do not offer that.
- A sponsored guide has no switch yet: write it like any guide and add a visible "Patrocinado" label to its title and first paragraph.
- Worth pitching to: habit and productivity apps, planner and stationery brands, language-learning and course platforms, e-reader and audiobook services, study-material publishers.

## 4. Newsletter

Prepared and off. Create an account with an email provider, put the address of its hosted signup form in `monetization.newsletterFormUrl`, and a signup box appears on the home page and under every guide. The site stores no addresses itself.

## 5. Links from other sites

The parts of this site most likely to be linked to are the calculator (and its four versions by kind of goal), the area pages of the bank ("20 ejemplos medibles de metas académicas"), and the guide on what research says about goals, which debunks the "Yale study" with sources. Ways to help that along:

- Tell teachers, tutors and study-skills blogs about `/calculadora/estudio` and `/metas/estudios`; they explain goal setting every September and need examples to point at.
- In late December, tell book bloggers and reading clubs about `/calculadora/lectura`; "how many pages a day for my reading challenge" is asked every January.
- Writers who repeat the Yale goals story are easy to find. A short, friendly note with the link to the library's own statement and to the guide gives them a correction and a source.

## What will move the numbers

1. **Grow the bank toward the name.** Each batch of 100 goals supports new pages people search for: goals by horizon ("metas a corto plazo: 60 ejemplos"), by person ("metas para estudiantes", "metas para parejas") and by month. The roadmap is in `LAUNCH.md`.
2. **Make the plan leave the page.** A printable one-page plan and a calendar file with the milestone dates would give visitors a reason to come back and something to share. Both can be built without a server.
3. **Search Console from day one.** Add the property as soon as DNS is live, submit the sitemap, and after a few weeks look at which queries show the calculator and the area pages. Write the next guides for the queries that already get impressions.
