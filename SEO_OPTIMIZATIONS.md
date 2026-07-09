# SEO Optimizations Log

Track all SEO changes here. Check back after 2-4 weeks to measure impact via GSC/DataForSEO.

---

## 2026-07-09 — Comprehensive On-Page SEO Overhaul

**Data source:** None yet — baseline to be measured against prior state

### Changes Made

**1. Fixed H1-H2 heading hierarchy across all page types**
- VS pages (`app/vs/[slugs]/page.tsx`): Fixed critical bug — had **two H1s** (tool1.name + tool2.name). Changed both to H2, added a proper H1 for "Compare" label. Previously violated Google's "one H1 per page" requirement.
- Tool detail pages (`app/apis/[slug]/page.tsx`): Converted section labels ("Key Features", "Technical Feature Analysis", "AI Agent Skills", "Use {tool} for", "Compare {tool}") from decorated divs to proper H2 elements for correct heading hierarchy. Also fixed sub-card headings H4→H3.
- Capability pages (`app/capability/[action]/page.tsx`): "Feature Comparison Matrix" div → H2, "Technical Status" H3 → H2 for proper H1→H2→H3 flow.

**2. Added meta keywords to all dynamic page types**
- New `generateSeoKeywords()` function in `lib/seo.ts` generates keyword arrays per page type (tool, category, guide, vs, capability, auth, sdk, alternative)
- Added `keywords` metadata to: `apis/[slug]`, `categories/[slug]`, `guides/[slug]`, `vs/[slugs]`, `capability/[action]`, `auth/[type]`, `sdk/[language]`, `alternative-to/[tool]`
- Previously only the homepage had keywords defined

**3. Improved SEO title patterns (`lib/seo.ts`)**
- Capability: `"Top {name} AI Features & APIs | Salestools Club"` → `"{name} APIs & AI Features for Sales Agents | Salestools Club"`
- Category: `"Top {name} APIs & AI Tools | Salestools Club"` → `"{name} APIs & MCP Servers for AI Sales Agents | Salestools Club"`
- Guide: `"Best {name} Compared | Salestools Club"` → `"Best {name} APIs Compared (2026) | Salestools Club"`
- VS: `"{name} Comparison (2026) | Salestools Club"` → `"{name}: Compare APIs & MCP Support (2026) | Salestools Club"`
- Tool (no-api): `"{name} Technical Details & Status | Salestools Club"` → `"{name} Technical Details & API Status | Salestools Club"`
- All patterns now front-load the primary keyword and add "for AI Sales Agents" / "for Sales Agents" context

**4. Improved meta descriptions (`lib/seo.ts`)**
- Rewrote all description templates to be more compelling and action-oriented
- Tool: Now includes "Learn how to connect {tool} to Claude Code, Gemini, and other AI agents for automated sales workflows"
- Category: Now says "Browse the best {name} APIs for AI-native sales stacks. Compare features, MCP support, pricing, and SDKs..."
- Guide: Now ends with "to build your AI-native {name} stack"
- VS: Now focuses on "MCP support, SDKs, webhooks, authentication" as decision factors

**5. Added Open Graph + Twitter Card metadata to all page types**
- Added OG images + twitter cards to: `guides/[slug]`, `for/[usecase]`, `capability/[action]`, `auth/[type]`, `sdk/[language]`, `alternative-to/[tool]`
- Previously these pages had no or partial OG tags, meaning social previews were blank

**6. Added canonical URLs to alternative-to pages**
- `app/alternative-to/[tool]/page.tsx` was missing canonical URL in generateMetadata

### What to Check (late July 2026)
- [ ] Did position changes occur on VS pages (especially crawl4ai-vs-firecrawl, instantly-vs-smartlead, pdl-vs-zoominfo)?
- [ ] Did title tag updates improve CTR in GSC?
- [ ] Are social previews rendering correctly on Twitter/LinkedIn for guides, capabilities, auth pages?
- [ ] Did FAQ rich results show in SERPs for tool detail pages?
- [ ] Are guide pages now ranking for "best {keyword} apis compared 2026" queries?

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
