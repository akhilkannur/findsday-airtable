# SEO Optimizations Log

Track all SEO changes here. Check back after 2-4 weeks to measure impact via GSC/DataForSEO.

---

## 2026-04-29 — VS, Guides & Meta Description Overhaul

**Data source:** GSC (28-day) + DataForSEO ranked_keywords (111 keywords tracked)

### Baseline Metrics (April 2026)
- Total ranked keywords: 111
- Homepage: 370 impressions, 2 clicks, avg pos 14.4
- Brand query "salestools": 187 imp, 1 click, pos 9.9
- Top clicking queries: nooks mcp (#3), hockeystack mcp (#3.2), attentive mcp (#5.7), captivateiq (#5)

### Changes Made

**1. VS comparison pages — added rich content (`app/vs/[slugs]/page.tsx`)**
- Added "API & MCP Analysis" prose section (dynamic based on tool data)
- Added FAQ section with FaqSchema (3 questions per page)
- Added starter prompt display when available
- Target queries:
  - `crawl4ai vs firecrawl` — vol:880, rank #57
  - `instantly vs smartlead` — vol:170, rank #50
  - `people-data-labs vs zoominfo` — vol:720, rank #82
  - `firecrawl vs jina-reader` — vol:110, rank #70
  - `apify vs outscraper` — 33 imp, rank 31.1
  - `gong vs modjo` — 7 imp, rank 4.1

**2. Filled 5 empty guide pages (`lib/guides.ts`)**
- `enrichment-apis` — Apollo, Proxycurl, PDL, UpLead, FullEnrich, ZoomInfo
- `phone-apis` — Retell AI, Bland AI, Orum, Nooks, PhoneBurner, Five9
- `revenue-intelligence-apis` — Gong, Fireflies, Attention, Modjo, Jiminny
- `scheduling-apis` — Cal.com, Calendly, Chili Piper
- `sales-enablement-apis` — PandaDoc, DocuSign, Highspot, Guru, SharpSell, Spekit
- Each has: comparison table, Claude Code workflow, FAQ, category link
- Target queries:
  - `best lead enrichment apis` — vol:70, rank #98
  - `phone apis` — vol:50, rank #93
  - `crm-apis` guide already ranking (136 imp, rank 26.7)

**3. Updated VS meta descriptions (`lib/seo.ts`)**
- Old: "Compare X APIs and features. A technical breakdown for AI operators..."
- New: "Compare X APIs, MCP servers, and AI agent compatibility. Side-by-side breakdown of SDKs, webhooks, and starter prompts..."

### What to Check (late May 2026)
- [ ] VS pages: did rank improve for crawl4ai-vs-firecrawl, instantly-vs-smartlead, pdl-vs-zoominfo?
- [ ] Guide pages: are enrichment-apis, phone-apis, revenue-intelligence-apis getting impressions?
- [ ] VS CTR: did the new meta descriptions improve click-through rates?
- [ ] FAQ rich results: are FAQ snippets showing in SERPs for VS pages?

### How to Re-check
```bash
# GSC top pages
node scripts/fetch-organic.mjs 28 200 impressions

# DataForSEO ranked keywords (costs ~$0.03)
curl -s -X POST "https://api.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live" \
  -u "akhil@lisnagency.online:b3fc3ef0fccdde5b" \
  -H "Content-Type: application/json" \
  -d '[{"target":"salestools.club","location_code":2840,"language_code":"en","limit":50,"order_by":["keyword_data.keyword_info.search_volume,desc"]}]'
```
