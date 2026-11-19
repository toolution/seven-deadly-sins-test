# AI search readiness — production

Scope: homepage https://7deadlysinstestfree.com/ and its method/privacy/terms, robots, sitemap, llms.txt and social image. Inspected 2026-11-19 with raw curl HTTPS responses, XML/JSON parsing, Chrome desktop/mobile tests, and authenticated GSC. Detailed response evidence is in live-verification.json. No readiness probability or ranking score is assigned.

| Check | Status | Evidence / applicability |
| --- | --- | --- |
| Search crawler rules | PASS | robots.txt wildcard Allow:/; homepage and supporting pages have no path prohibition. Simulated Googlebot request 200. |
| Assistant search/fetch access | PASS for tested requests | Simulated OAI-SearchBot, ChatGPT-User and PerplexityBot requests 200 with main content. Real provider-IP requests NOT TESTED. |
| Training policy | INFORMATION | Existing wildcard crawling policy preserved; no training-specific directives or licensing changes introduced. Separate from search access. |
| Transport / canonical | PASS | HTTPS 200, HTTP 301, www 301 to apex, one correct self-canonical; missing URL 404. |
| Indexability / snippets | PASS for eligibility | index,follow, no restrictive X-Robots-Tag or nosnippet; eligibility is not index inclusion. |
| Discovery | PASS | robots sitemap declaration; XML parses, four canonical URLs return 200; GSC successfully processed it and discovered 4 pages. |
| Raw HTML / meaningful content | PASS | First real question/answers, all seven theme descriptions, six FAQ answers, links and 35-item method key exist in source. Personalized results require JavaScript and are also explained in text. |
| Metadata / identity | PASS | Exact primary phrase, English locale, consistent Seven Sins name; unique supporting metadata; real social asset. |
| Structured data | PASS | WebPage + nested WebSite, stable production @ids, syntactically valid JSON-LD and truthful description. No invented publisher credentials, dates, reviews or rating. |
| Content / citations | PASS | Public source links to IPIP alphabetical list and permission; source IDs and scoring polarity disclosed. Percentages clearly mean points, not population percentiles. |
| Trust / privacy | PASS at checked scope | About/method, privacy and terms; GitHub support link. No account/payment. Answers processed locally; shared fragments contain seven scores. Seven-sin mapping explicitly unvalidated. |
| Mobile / output | PASS | 390/1440 px checks and full quiz; no horizontal overflow. Actual PNG with real hostname and seven illustrations inspected. |
| llms.txt | PASS, optional | Accurate public Markdown index and limitations; 200 text/plain. It is not a universal ingestion standard or inclusion guarantee. |
| Google inclusion | PENDING | Domain verified; homepage request accepted into priority crawl queue. Last reported state: discovered, not indexed. |
| Field Core Web Vitals | NOT TESTED | Newly launched domain; no representative field dataset obtained. Browser usability checks are separate. |
| Actual AI visibility | NOT TESTED | No observed mention, citation, recommendation or AI referral measurement. AI citation impact not verified. |
| Generic automation access | WARN | Python-urllib/3.9 returns 403; tested search/assistant agents return 200. Accepted without weakening sitewide security. |
| Hreflang / Article / Product schema | NOT APPLICABLE | One English tool page; no translated equivalents or article/product claims. |

## Repairs and rationale

The final origin is consistent across canonical, OG, schema, robots, sitemap and downloadable results. Title and description specify the working free quiz and downloadable output. The homepage supplies direct definition, source, score interpretation, privacy and retake answers in HTML. The method publishes exact source wording and scoring, while distinguishing IPIP permission from this site's unvalidated seven-theme mapping. Stable entity IDs and a small optional llms.txt improve machine interpretation without claiming endorsement or recommendation.

Representative self-contained passage: “Each theme has five questions scored from 0 to 4, with some items scored in reverse. The total is divided by 20 and multiplied by 100. So 80% means 16 out of 20 possible points on that theme, not that you are more ‘sinful’ than 80% of people.”

## Remaining outcomes

No implementation blockers remain at the tested scope. Search inclusion and AI use are external outcomes. GSC accepted the sitemap and homepage request; no additional duplicate request was sent. No platform query sample was run, so none is scored as absence or success. Future meaningful evaluation should measure actual indexed URLs, impressions/clicks, and repeatable user-intent queries with cited URLs, preserving model/search-mode/date context.

Source deployment: commit a414506, Cloudflare version f4e02b7b-25d5-4fce-8755-5ec4408a4e11. GitHub CI and production browser tests passed. Screenshot evidence remains local under work/evidence/; no private authenticated browser state is published in the repository.
