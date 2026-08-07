# Overhaul Research — Competitive & Model Reference

Captured 2026-08-07. Source: prior session research on directories/database-driven sites that rank
for real (commercial-trade) queries rather than only tool-name navigational searches.

## The problem (GSC data, 28d)

- 653 tool pages, but only 11 guides / 9 use cases / 10 stacks = **thin answer layer**.
- Ranks ONLY for navigational queries (`[tool] api`, `[tool] mcp`) at position 5–13,
  tiny volume, 1–2 clicks each, fighting the vendor's own docs page.
- Real-demand queries (`ai sales enablement platform`, `ai data enrichment`) rank 30–100.
  Zero clicks because nobody scrolls past page 3.

## Competitor / model sites doing answer content correctly

The through-line: **method-published editorial + answer content using the directory as
supporting evidence, not thin tool listings**. Directory alone is not enough.

### The GTM Directory — 6-stage pipeline (closest analog)
- This is abandon-project pressure: the sites that rank publish a *methodology* page and a
  *blog* long before lists.
- Pipeline: What is it → How it fits → Tools that do it → How to choose → In-depth pick → The craft.
- Category pages: https://thegtmdirectory.com/best
- Blog: https://thegtmdirectory.com/blog/how-we-evaluate-tools
- Takeaway: a repeatable editorial stage pipeline converts a flat tool list into editorial that
  ranks for "best/choose/how-to" queries.

### Modern DataTools — 18-source, AI-after-validation, quality gates
- https://www.modern-datatools.com/blog/data-is-the-real-ai-moat
- Methodology: https://www.modern-datatools.com/methodology
- Takeaway: publish the *method* publicly. AI drafts, human validates, gates gate quality.
  Trust via transparency → links → authority → better ranking for competitive queries.

### Other method-publishing formats
- **AIDiveForge** — live-page LLM extraction, verifiable-fields-only:
  https://aidiveforge.com/how-we-rate-ai-tools/
- **402.ad** — multi-agent docs-reading chain (Scout/Cartographer/Appraiser): https://402.ad/research
- **AI Everyday Tools** — structured research + platform inspection (not full hands-on):
  https://aieverydaytools.com/how-we-test-ai-tools/
- **ToolsFinderAI** — AI draft → editorial fact-check → noindex until sign-off:
  https://toolsfinderai.com/how-we-review
- **Pickuma** — "model writes, humans own the facts" anti-hallucination rule:
  https://pickuma.com/for-dev/how-we-use-ai-without-hallucinations-in-reviews/

## Directory-SEO context (why thin directory pages fail)

- Thin directory pages don't rank — internal linking + freshness + editorial content is the only fix.
- https://gautamkhorana.com/blog/programmatic-seo-directory-2026/ (incl. 2026)
- https://skiln.co/blog/how-we-built-skiln-ai-tools-directory-2026 ("directory alone isn't enough")
- https://seomatic.ai/blog/programmatic-seo-strategy (batch-scale-thin test)

## Strategic conclusion for Salestools Club

The pivot = **answer-question content** for AI-native ops: publish editorial answer pages (choice /
how-to-build / compare) that the rankable tool entries feed as evidence. Turn the 653 URL / pages
into a supporting data layer instead of the whole answer.

---

## AUDIT (2026-08-07): How other sites fetch data + their automations

### Current state of THIS repo (verified from code, not guesses)

| Layer | What exists | Status |
|---|---|---|
| Data source | `lib/data.ts` (815KB, 653 tools) — hand-maintained TS file | All fields manual; nothing refreshes it |
| Content production | None — fields are curated by hand | No automation picks/fetch-derives content |
| Freshness | None — `AGENTS.md` shows manual batch URL checks | No scheduled re-verification |
| Indexing | `scripts/index-*.mjs` — submit pages to Google Indexing (GSC/Indexing API via `indexing-key.json`) | Works; ingestion only |
| Analytics | `scripts/fetch-organic.mjs` (GSC), `analytics-reporter` skill | Works; read-only |
| Sync | `package.json` → `npm run sync` → `scripts/sync-data.py` | **FILE DOES NOT EXIST** — points at a dead sync pipeline |
| Other data | `salesnav-accounts.csv` (580 accounts), LinkedIn automer | Outreach, not directory data |

**Critical gap:** You have *no source-data-fetch, no freshness, no content-derivation*. Your
"pipeline" is index-submission + manual curation. The automation model was lost in the crash.

### How the competitors actually fetch (from live pages fetched 2026-08-07)

#### Modern DataTools (closest analog: built-in product directory w/ pricing)
- **18 sources:** vendor homepage/pricing/feature pages (scraped), GitHub (README/stars/license),
  PostgreSQL (theirs), npm/PyPI, Docker Hub, Stack Overflow, HN, Product Hunt, Google Trends, GSC,
  curated third-party articles.
- **Loop:** scrape → normalize into source-of-truth DB → AI drafts from DB records only → rocket reload.
  Model = golden-set validation (19 hand-verified tools, expectation files cross-referenced w/ URL+date)
  → two LLMs: frontier model freezes the benchmark ceiling; cheap open-weight does production.
- **Quality gates:** reel checks (word count 1200, pricing cross-ref, hedging detection, specificity,
  repetition, thin-section, structure) + AI 6-dimension audit (Originality/Accuracy/Voice/Value/
  Completeness/E-E-A-T) scored /100. **Pages below threshold → noindex.**
- **Golden-dataset gates before bulk runs:** no bulk regen ships until all gates pass — this
  blocked a regen that would have overwritten 267 live reviews with worse ones.
- **Freshness loop:** website monitor (404/timeout) → hash webcam diff → auto re-scrape → re-quality
  gate → replace only if new score ≥ old (never downgrade). "Last verified" surfaced on page.

#### Skiln (15,000 AI tools, 11 sources, 10 days)
- Python scrapers: GitHub awesome-lists, GitHub topic search, Smithery/MCP.so/PulseMCP API, npm,
  PyPI. 
- **Dedupe pipeline** (hard side): URL match → normalized-name → Levenshtein 0.85 → auto-merge ~70%,
  remaining 30% manual merge queue.
- **Enrichment:** GitHub stars/forks, last commit, README first-para as description, package downloads.
- ~45-min weekly rerun, one machine, static+ISR (they rip out `force-dynamic` — Vercel charges).
- SEO funnel: Blog (4 types: best-X-for-Y / what-is-X / how-to / industry) → links to directory
  category pages → tool pages → store.

#### Khorana programmatic-SEO principles (12,000+ sites)
- **5 "hub" (manual editorial) → category×topic (templated + 1 unique-data block) → leaf (data-rich).**
  One template is not enough; a flat template gets filtered/downweighted.
- Data depth = differentiation: "what do I know about each listing that nobody else does?"
- **Internal linking is the number-1 underused lever:** flat architecture dies; hub→cat→leaf + related
  loops keep Googlebot crawling.
- **Indexation:** submit only hub+category to sitemap; let leaves come via internal links; **noindex**
  thin/duplicate leaves aggressively; crawl-budget reports weekly.
- **Enrichment at scale w/o writers:** structured review aggregation (GBP/Trustpilot), automated
  freshness script (bounce -18% on a legal dir), constrained LLM summaries + similarity gate
  against the corpus to catch near-duplicates.
- **Realistic pacing:** 500 good pages > 50k thin; 6-9 months to meaningful traffic; topical authority
  is the gating variable.

## Concrete build list (what WE must automate)

The whole moat = a single missing loop the repo dead-references (declare in aim):
**"collect & verify the data → derive answer/hub pages from it → quality-gate → index"**, on a schedule.

1. **Source-fetchers** — port the Skiln/`CustomDataTools` pattern to our enterprise niche:
   - Open-source tools: GitHub API (README/stars/last-commit/license) + npm/PyPI download counts.
   - Closed-source: vendor docs/pricing URL checks; GSC demand feeds (we have access) to prioritize.
2. **Freshness/verification pipeline** (the highest-leverage missing piece):
   weekly HEAD/GET check every `docsUrl`/`pricingUrl` → 200 vs 404/timeout/TLS → flag changes,
   update a "last verified" timestamp. This is what we've done *by hand* batch-by-batch.
3. **Content-derivation engine:** hub + answer pages generated procedurally from existing
   `getToolsByCapability`, `getMcpTools`, `getFreeTierTools` etc. — no per-tool human writing.
4. **Quality gates + tiers:** replicate ModernDT thresholds (word count, hedging, coverage >=340)
   → **noindex** sub-threshold pages so one bad batch can't downweight the domain (2026 warning).
5. **Scheduler:** cron on the host (Vercel Cron / GitHub Actions). Keep static+ISR to hold cost.
6. **Golden-set validation:** pick a small hand-verified benchmark (a handful of flagship tools),
   gate bulk regens against it so we never downgrade live pages.

## How THIS pivot does NOT add per-tool manual work (your constraint)

- Manual effort concentrates in ~10-20 hub/capability pages + 1 methodology page + golden set
  (dozens, not 653). Everything else derives from the existing 653-record data via the queries
  already in `lib/tools.ts`.
- The 653 tool pages as they exist are the enrichment most directories lack (economic
  capability/MCP/starterPrompt/alternative fields) — they are used as supporting data, not rebuilt.

## Open decisions before we write anything

- (a) data store: keep `data.ts` + freshness writes, versus CSV/DB. Current `sync-data.py` was pointing
  at a file that doesn't exist; the preserve is light — but a Python script that updates `data.ts`
  is worth doing regardless.
- (b) scoring model: Google + tweeps? Start simple (URL status + score threshold) before adding
  LLM gates.
- (c) scheduler home: Vercel Cron vs GitHub Actions vs local cron — depends on deploy target
  (check `vercel.json`/hosting).
- (d) methodology page + hub pages authoring: human-written, `the copy that can't be automated`.