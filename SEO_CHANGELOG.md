# SEO Changelog - Salestools.club

## [2026-04-07] - The "Feature-First" & "Compact Keyword" Pivot

### Strategy Origin
Inspired by the **Edward Show Podcast (David Quaid & Edward Strom)** regarding Exact Match Domain (EMD) advantages and Generative Engine Optimization (GEO).

### Changes Implemented
1.  **Title Tag Pivot (`lib/seo.ts`):**
    - Changed Capability/Category titles from generic "APIs & Configs" to **"Top [Subject] AI Features & APIs."**
    - Goal: Capture high-intent "Top [Keyword]" searches where our EMD (`salestools.club`) has a natural ranking advantage.
2.  **Meta Description Pivot (`lib/seo.ts`):**
    - Updated to include keywords like **"Technical Analysis," "Compare AI Features,"** and **"Commercial Decisions."**
    - Goal: Filter for buyers/operators rather than "how-to" researchers.
3.  **Capability Content Expansion (`app/capability/[action]/page.tsx`):**
    - Added a **"Feature Comparison Matrix"** and **"Technical Status"** breakdown.
    - Increased word count by ~200-300 words per page to hit the "Compact Keyword" sweet spot (~400 words total).
    - Integrated `getTopCapabilities` helper to list specific features (e.g., "Lead Research," "Meeting Transcripts") in a grid format.
4.  **Individual Tool Page Enhancement (`app/apis/[slug]/page.tsx`):**
    - Replaced the generic "About" section with a **"Technical Feature Analysis"** section.
    - Framed tool value for **AI-Native Operators**, emphasizing API depth and programmatic retrieval.
5.  **AI Visibility Audit:**
    - Verified **ClaudeBot** and **PerplexityBot** access (Status 200 OK).
    - Confirmed Cloudflare settings are NOT blocking AI crawlers (critical for GEO citation).

### Baseline Metrics (as of 2026-04-07)
| Query Cluster | Baseline Position | Current Impressions (30d) | Target Goal |
| :--- | :--- | :--- | :--- |
| meet alfred api documentation | 6.5 | 4 | Maintain Top 3 |
| nooks mcp | 4.1 | 11 | Maintain Top 3 |
| crm sales automation | 82.3 | 3 | Move to Page 2 (<20) |
| content personalization tools | 100.0 | 1 | Move to Page 3 (<30) |

### Notes for Next Review (Expected 2026-04-14)
- Check if "Top [Keyword] AI Features" starts appearing in GSC search queries.
- Monitor "Consensus Score" in Perplexity: Ask "What are the best CRM sales automation APIs?" and see if Salestools.club is cited.

## [2026-05-14] - The "Rising Star vs. Incumbent" VS Pivot

### Strategy Origin
Double down on the high-performing "Comparison" and "MCP" clusters. Identified high-growth "Rising Stars" (Day AI, Claygent, Firecrawl, SiftHub, Nexuscale) and paired them against legacy incumbents to capture search volume for "alternatives" and "head-to-head" audits.

### Changes Implemented
1.  **Added New Tools to `lib/data.ts`:**
    - **SiftHub:** AI RFP/Deal orchestration.
    - **Nexuscale AI:** Autonomous SDR platform.
2.  **Featured Comparison Expansion (`app/vs/page.tsx`):**
    - Added 5 high-intent pairs to the "Comparison Registry":
        - `Day AI vs Salesforce (Agentforce)`
        - `Clay vs Apollo` (Optimization for "Claygent" trend)
        - `Firecrawl vs Browse AI`
        - `SiftHub vs Gong`
        - `Nexuscale vs Instantly`
3.  **Data Enrichment:**
    - Verified MCP readiness for all new pairs.
    - Added "Starter Prompts" to help with GEO (Generative Engine Optimization) citation.

### Target Goals
- Capture traffic for `Day AI vs Salesforce` and `SiftHub vs Gong` as users seek AI-native alternatives.
- Dominate the `Firecrawl vs Browse AI` developer-focused scraping niche.
- Improve average position further from 18.8 by targeting low-competition, high-relevance keywords.

## [2026-05-31] — Title Optimization & Noindex Fix

### Context
GSC data showed top queries getting 0 CTR (phoneburner vs nooks: 2.5K impressions, 0 clicks). Titles had intent mismatch — "Comparison & API Analysis" for comparison queries, "for AI Agents" narrowing free APIs page. Many tool pages were invisible to Google due to overly aggressive noindex logic.

### Changes Implemented
1.  **Vs Page Titles (`lib/seo.ts:48`):**
    - `"Comparison & API Analysis"` → `"Comparison (2026)"`
    - Goal: Match searcher intent for tool comparisons (e.g., "phoneburner vs nooks for agencies")
2.  **Guide Page Titles (`lib/seo.ts:46`):**
    - `"{Subject} | SC"` → `"Best {Subject} Compared | SC"`
    - Goal: Match "best of" listicle format that ranks for enrichment queries
3.  **Guide Meta Descriptions (`lib/seo.ts:76`):**
    - `"Master...technical deep-dive"` → `"Compare the best..."`
    - Goal: Better snippet for guide pages
4.  **Free Sales APIs Page Title (`app/free-sales-apis/page.tsx:12`):**
    - `"Free Sales APIs for AI Agents"` → `"Free Sales APIs (2026) — 50+ Tools with Free Tiers"`
    - Goal: Broader appeal beyond AI operators, match "list of free APIs" searchers
5.  **Noindex Logic (`app/apis/[slug]/page.tsx:58-60`):**
    - Was: `noindex` if no `docsUrl`
    - Now: `noindex` only if `hasPublicApi === false`
    - Goal: Let Google index tool pages even when docs URL isn't documented yet

### Baseline Metrics (as of 2026-05-31)
| Metric | Value |
| :--- | :--- |
| Total clicks (28d) | 85 |
| Total impressions (28d) | 23.5K |
| Average CTR | 0.4% |
| Average position | 24.8 |

### Notes for Next Review (Expected 2026-06-14)
- Check if CTR improves on top comparison queries (phoneburner vs nooks, clearbit vs fullcontact, etc.)
- Monitor if newly indexed tool pages appear in GSC
- Check if guide pages rank for "best X" queries
- Re-assess free-sales-apis page CTR
