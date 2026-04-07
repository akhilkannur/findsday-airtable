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
