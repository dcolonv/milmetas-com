# Mil Metas: the idea

**Domain:** milmetas.com · **Language:** Spanish (neutral, "tú") · **Date:** 2026-11-19

## The concept

Mil Metas is a Spanish-language goal planner: a bank of concrete, measurable goal ideas sorted by area of life, and a calculator that turns any goal with a number and a date into a pace ("how much per day, per week, per month") and tells you whether you are on track. It is for people who are about to set goals (new year, new term, new job, a savings target) and are stuck at either "I don't know what to aim for" or "I never know if I'm behind". They come back because the calculator remembers their goals in the browser and answers the question they have every week: "¿voy a tiempo?".

## Why this domain

"Mil metas" is Spanish for "a thousand goals". Someone who types or reads the name expects goals, and a lot of them: ideas for what to aim at, and help reaching them. The `.com` ending sets no country, so the site is written in neutral Spanish for Spain and Latin America, uses no currency or country by default, and lets the visitor type their own unit (€, $, km, páginas, horas).

The concept delivers the promise literally: a growing bank of goals (the "mil" is the direction, and the site shows the real count instead of claiming a thousand), and the tool that makes any of them plannable.

**What the domain has been:** nothing with content. The Wayback Machine holds five captures between 2013 and 2024 and all are parking pages ("This domain may be for sale" in 2013, a redirect to a parking lander in 2024). There are no old articles, no topic to inherit and no redirects to plan. Today the domain resolves to a registrar page titled "Your domain is expired", so the registration needs to be confirmed with the registrar before DNS is pointed.

## Who it is for

- Spanish speakers setting goals at a natural starting point: January, September, a birthday, a new job, a debt or savings target. They search for "ejemplos de metas personales", "metas a corto, mediano y largo plazo", "metas financieras ejemplos", "propósitos de año nuevo".
- Students and employees who were asked to write goals (a tutoring session, a performance review) and need examples that are specific and measurable, not a list of vague wishes.
- People who already have a goal with a number and a date and need the arithmetic done: how much per week, and whether what they have done so far is enough.

## What gets built

**Core feature:** the *Calculadora de metas*, a planner that runs entirely in the browser. The visitor enters what they want to reach (a quantity and its unit), where they are now, the start date and the deadline. It returns the pace needed per day, week and month, a table of milestones with dates, the amount that should be done by today, and a verdict: ahead, on track or behind, with the new pace required to still arrive on time and the date they would finish at their current pace. Goals are saved in the browser (no account) and each plan has a shareable link. What makes it better than what exists: Spanish-language calculators are single-purpose (savings only, reading only), and none of the ones found answers "am I on track" for any kind of goal.

**Around it:**
- **Banco de metas (directory):** a few hundred example goals written as measurable statements, filterable by area (salud, dinero, estudios, trabajo, relaciones, lectura, idiomas, hogar, creatividad, viajes) and by horizon (corto, mediano, largo plazo). Every goal has a "Planificar" button that opens it in the calculator with sensible starting numbers. One page per area, with an introduction on how to set goals in that area.
- **Guías (method):** how to write a goal (SMART, with its real origin), short vs. medium vs. long term, goals vs. habits, how to review progress, what the research says about writing goals down and planning for obstacles (cited to the original papers, with no invented statistics).
- **Guías (situations):** propósitos de año nuevo, metas financieras, metas académicas, metas laborales for a performance review, reading challenges. Each links to the matching area of the bank and to the calculator.

## How it earns

| Stream | How it works here | Programs or buyers | When it switches on |
|---|---|---|---|
| Affiliate | Book and planner recommendations in guides and area pages (habit and goal-setting books in Spanish, paper planners, reading and study gear); course recommendations on the study, language and creative areas | Amazon Afiliados (amazon.es, and Amazon México as a second account), Domestika (run through Impact; third-party listings report a 30-day cookie), Hotmart marketplace, Coursera (Impact) | After the user is approved by each program and sets the IDs; links stay plain until then |
| Ads | One slot under the calculator result, one in-article, one at the end of bank pages | Google AdSense first; Mediavine Journey or Raptive when traffic qualifies | After AdSense approval, which wants a site with real content and some traffic |
| Sponsorship | "Presented by" on one area of the bank (for example the money area by a savings app, the reading area by an e-reader or audiobook service), or on the calculator | Productivity and habit apps, planner and stationery brands, language and course platforms | When there is a measurable audience |

The Vercel team is on the Hobby plan, which Vercel limits to non-commercial use. Deploying is fine; the plan needs to be Pro before ads or affiliate links are switched on.

## Why it can get visitors

- **Example-goal searches** ("ejemplos de metas personales", "metas a corto mediano y largo plazo ejemplos", "metas financieras ejemplos", "metas académicas"): the first page today is mostly content marketing from software companies (several ClickUp blog posts), encyclopedic definitions (concepto.de, lifeder) and PDFs from schools. They are lists of 10 to 50 loosely worded items. A filterable bank where every goal is measurable and can be turned into a plan with one click is a better answer, and a search for a Spanish "list of 100 goals by category" found no equivalent.
- **Calculator searches** ("calculadora de metas", "cuánto ahorrar al mes para llegar a una meta", "cuántas páginas leer al día"): results are single-purpose calculators (bank blogs, hacecuentas.com, miniwebtool). The generic "pace plus am-I-on-track" calculator covers the long tail of those queries with one tool and one page per popular preset.
- **Seasonal demand:** new-year resolutions peak every December and January, and this launches in late November.
- **Linkable assets:** the calculator and the bank. Teachers, tutors, coaches and HR writers link to tools and example lists when they explain goal setting; the bank's area pages are made to be cited ("40 ejemplos de metas académicas").

## Concepts considered

| | Chosen: Bank of goals + pace calculator | Savings-goal calculators | Race calendar ("mil metas" as finish lines) |
|---|---|---|---|
| Usefulness | 4/5 | 4/5 | 4/5 |
| Fit with the name | 5/5 | 3/5 | 2/5 |
| Earning path | 3/5 | 4/5 | 3/5 |
| Reachability | 4/5 | 2/5 | 3/5 |
| Upkeep | 5/5 | 4/5 | 1/5 |
| **Total** | **21** | **17** | **13** |

**Savings-goal calculators:** a finance tool site, "cuánto ahorrar al mes para tu meta", with interest, inflation and country presets. Finance pays more per visitor, but the name promises goals in general and not money, the first page for these queries is banks and established calculator sites, and a site that leans into returns and products drifts toward financial advice. It lost on fit and reachability. Its best part survives inside the chosen concept: saving toward a target is one preset of the calculator and one area of the bank.

**Race calendar:** "meta" is also the finish line, so the name could carry a directory of popular races in Spain and Latin America with pace calculators. It lost because the reading is a stretch for most visitors and because race data (dates, prices, routes, cancellations) changes constantly and cannot be verified or kept current without daily work, which breaks the upkeep rule.

## Assumptions and risks

- **Language and audience were a judgment call.** "Mil metas" reads the same in Portuguese; Spanish was chosen as the larger market for a `.com`. The site uses neutral Spanish and no country defaults.
- **Demand was checked by looking at who ranks, not with keyword volumes.** No keyword tool was available, so the size of each query is an estimate.
- **Affiliate terms are not verified.** Amazon's commission table for Spain was not found on an official page; Domestika's rates come from third-party listings that disagree with each other; Notion's affiliate programme is reported as closed to new applicants by some sources and open by others, so it is not counted. Each programme must be checked when applying.
- **No trademark search was done.** A web search found no company, app or product called "Mil Metas", which is not the same as a registry search.
- **The domain shows a registrar "expired" page today.** The site can be built and deployed, but DNS can only be pointed once the registration is confirmed active.
- **Health and money goals stay general.** The bank has no weight-loss targets, diets, medical or investment advice, and the calculator does not model returns. Goals in those areas are things like steps, sleep schedule, an emergency fund or paying off a balance, with a note to see a professional for anything clinical or financial.
- **Later upgrades left out of a zero-cost launch:** accounts and sync across devices, reminders by email, a model-powered "turn my vague wish into a measurable goal" assistant (needs a paid model call per use; `ai_features` is `on-request`), and a Portuguese edition.
