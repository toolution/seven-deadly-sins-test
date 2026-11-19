# Seven Sins

An English 7 deadly sins test built with Astro and TypeScript. The first screen contains the live questionnaire. Results include seven independent scores, site-authored explanations, a downloadable 1080×1350 PNG, and score-only result links.

## Local development

```sh
npm ci
npm run dev
```

Use the address printed by Astro (it selects an available port). Fonts are self-hosted. No backend, API keys, database, analytics, or account system are required.

## Verification

```sh
npm test
npm run check
npm run build
TEST_URL=http://127.0.0.1:4323 npm run test:e2e
```

Browser tests use local Google Chrome by default; set `CHROME_PATH` for a different installation. `TEST_URL` must point at this site's actual running server. The tests cover the full quiz, storage restoration, edits, image export, shared results, reset, keyboard controls, source items, and responsive layouts.

## Question source and scoring

`src/lib/questions.json` contains exact public-domain IPIP wording, IPIP survey/item identifiers, the source URL, and keyed direction. All selected items were checked against https://ipip.ori.org/AlphabeticalItemList.htm on 2026-11-19. Permission: https://ipip.ori.org/newPermission.htm.

This particular item selection, seven-sin mapping, explanation bands, and descriptions have not been psychometrically validated. Original scale validation does not transfer. See `/methodology/` for the full public item key and limitations.

## Deployment

```sh
npm run deploy
```

Cloudflare Worker: `seven-deadly-sins-test`, static assets with a small worker for the www canonical redirect. Production: https://7deadlysinstestfree.com/.

The canonical origin comes from `SITE_URL` or the default in `astro.config.mjs`. When binding a custom domain, rebuild with its origin, and recheck canonical, OG URLs, sitemap, HTTPS, image export hostname, and live result links. Do not commit Cloudflare or GitHub credentials.

## Privacy

Answers live in browser local storage under `seven-sins:quiz:v1`. Images are created client-side. Result link fragments contain only version and seven scores. Ordinary hosting requests are handled by Cloudflare; no application analytics or ad scripts are installed.

## Visual assets

The chart is authored SVG geometry. The seven illustration PNGs are extracted from the user-provided UI reference screenshot at the user’s explicit request; their provenance is embedded in the assets. IPIP’s public-domain permission applies to the questions, not to unrelated illustration copyrights. `public/social.png` is rendered from `work/art/social.svg` using sharp, with embedded provenance. This site does not imply IPIP endorsement.
