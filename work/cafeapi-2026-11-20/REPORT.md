# Homepage SEO — Web.Cafe audit, 2026-11-20

URL: https://7deadlysinstestfree.com/  
Primary keyword: **7 deadly sins test**  
Intent: take the free test immediately, understand seven scores, and download/share a result image.

## Measured result

| Measure | Before | After |
| --- | --- | --- |
| Web.Cafe score | 94/100 (A) | 98/100 (A) |
| Topic focus | 100% | 100% |
| API-visible word count | 790 | 1,228 |
| Fetch time (API value) | 2026-11-19T19:07:33.041Z | 2026-11-19T19:14:12.377Z |
| Request ID | req_191e938ac7330aeb | req_c3e013a3a4660d74 |
| Credits charged | 2 | 2 |

Both calls used the documented `POST https://seo.web.cafe/api/v1/onpage_audit` endpoint with the exact URL and keyword above. Final fetch returned HTTP 200, the canonical apex URL, and the new headings. Total charged: **4 credits**. Evidence: [baseline.json](baseline.json), [final.json](final.json). Account balance and credentials are excluded from these saved reports; full responses remain locally ignored.

## Changes and rationale

- Replaced vague section titles with “How the 7 deadly sins test works”, “What the seven deadly sins mean”, and “Questions about the test”. The first heading answers the tool's keyword-in-subheading check naturally.
- Added interpretation guidance: independent scores, close second results, tied scores, chart radius versus filled area, and a concrete example (pride 60% = 12/20 points; sloth 40% = 8/20). Scores are neither population percentiles nor portions of a personality.
- Added download and share instructions, including the actual 1080×1350 PNG output, and clarified that the site does not match anime characters or measure religious belief. There are now nine visible FAQ answers in source HTML.
- Linked the interpretation section to the complete scoring method and item key. The first-screen quiz and existing reference design continue to provide the main experience.

The additional 438 words answer practical result, export, sharing and intent questions. The API's recommended word range is a tool heuristic, not a Google minimum.

## TDH retained after review

Title (55 characters): `7 Deadly Sins Test — Free Quiz, Find Your Strongest Sin`

Description (144 characters): `Take the free 7 deadly sins test: answer 35 questions, discover your strongest sin, and download your result image. Instant results. No sign-up.`

H1: `7 Deadly Sins Test`

All three match the actual product and passed the baseline and final audits. They communicate free access, the input required, immediate results and a downloadable image without claiming clinical validation.

## Findings disposition

| Finding | Action / evidence |
| --- | --- |
| Baseline `kw_subheading`: fail | Fixed. Relevant exact phrase now appears in a descriptive H2; final check passes. |
| Baseline `word_count`: warning | Addressed with useful guidance and FAQs; final content category is 19/19. |
| Final `kw_rank`: warning, 7.33/10 | Accepted. The remaining deduction comes from n-gram frequency ranking, particularly the one-word list. Topic focus is already 100%; no keyword stuffing or removal of necessary quiz instructions to chase a perfect score. |
| `fulfillment`: informational static-detector warning | Accepted detector limitation. The first statement and five choices are in raw HTML; real production browser tests complete all 35 answers, export and share. |
| `raw_html_elements`: informational missing H1 | Detector inconsistency: the API's own heading list includes the H1; independent production HTML parsing confirms exactly one H1. No duplicate H1 added. |
| `external_links`: informational | Accepted. Existing authoritative IPIP source link is intentional; normal followed source citations require no blanket nofollow. |
| `kw_serp`: informational, own result absent from API's sample | Needs observation. This single sampled SERP is not a full ranking dataset. No ranking or indexing claim made. |
| Indexing, field CWV and AI recommendations | Need fresh external evidence. The earlier GSC sitemap/indexing submissions remain documented in the launch review; this SEO update did not repeat a submission or establish current indexing. |

## Technical and browser verification

- `npm run check`: 0 errors, warnings or hints. `npm run build`: passed.
- Local built-preview end-to-end tests: 2 passed. Live production end-to-end tests: **2 passed** (23.2 seconds), covering the questionnaire, restore/edit/recalculate, tied scores, PNG export, clean-context share link, reset, keyboard controls and responsive overflow.
- New guidance visually inspected at 1440px and 390px: `work/evidence/seo-reading-1440.png` and `work/evidence/seo-reading-390.png` (local evidence, ignored).
- Production raw HTML: HTTP 200, one H1, new H2, and self-canonical `https://7deadlysinstestfree.com/`. Static explanatory content and nine FAQ answers are available to crawlers.
- Production robots.txt: HTTP 200 and Allow `/`, with sitemap declaration. Sitemap: HTTP 200, valid XML, four canonical URLs (home, methodology, privacy, terms).
- Final API passed metadata, links, media, social and technical checks. Existing OG/Twitter, JSON-LD and canonical remain consistent. Public methodology explains the unvalidated seven-sin mapping and IPIP item provenance.
- `git diff --check`: passed. GitHub Check run **44595929177** succeeded for source **ffe6f64**.

## Publication

App source commit: **ffe6f64** (`Improve homepage guidance from Web.Cafe SEO audit`), pushed to `main` before deployment.  
Cloudflare Worker: `seven-deadly-sins-test`.  
Production version: **956e3fe6-fb7f-4653-8385-4c81c91cb243**.  
Live: https://7deadlysinstestfree.com/.

Only documentation and sanitized audit evidence follow in the report commit; no redeployment is needed for them. A 98/100 third-party audit score measures that tool's checks; it does not establish search rankings, indexing, traffic or GPT recommendations.
