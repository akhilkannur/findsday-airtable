# Salestools Club - Project Context

## Project Overview
- Next.js app for a directory of sales tools with APIs
- Data source: `lib/data.ts`
- Two main pages: `/api` (tools with docsUrl) and `/monitoring` (tools without docsUrl)

## Data Structure

### Full Tool Entry (API page)
```typescript
{
  slug: string,
  name: string,
  oneLiner: string,
  description: string,
  category: "Sales Intelligence" | "Sales Engagement" | etc,
  websiteUrl: string,
  docsUrl: string,  // MUST have value for API page
  pricingUrl: string,
  apiType: ["REST"] | ["REST", "GraphQL"],
  authMethod: ["API Key"] | ["OAuth2"],
  hasFreeTier: boolean,
  sdkLanguages: ["Python", "JavaScript"],
  hasWebhooks: boolean,
  aiCapabilities: string[],
  starterPrompt: string,
  mcpReady: boolean,
  isFeatured: boolean,
  alternativeTo: string[],
  integrations: []
}
```

### Minimal Tool Entry (Monitoring page)
```typescript
{ name: "Tool Name", websiteUrl: "https://tool.com" }
```

## Key Functions (lib/tools.ts)
- `getAllTools()` - Returns all tools with docsUrl, **sorted newest first** (reverse order)
- `getToolsWithoutDocs()` - Returns tools without docsUrl (monitoring page)
- `getFeaturedTools()` - Returns featured tools with docsUrl

## Search & Analytics (Setup March 2026)

### Credentials
- **Service Account:** `salestools-indexing@findsday-discover.iam.gserviceaccount.com`
- **Key File:** `indexing-key.json` (root) - Used for both Indexing API and Search Console/GA4 reports.
- **GA4 Property ID:** `525140420` (salestoolsclub)
- **GSC Property:** `https://salestools.club/`

### Automated Reporting
- **Skill:** `analytics-reporter` (scripts/fetch-reports.mjs)
- **Feature:** Uses `dataState: "all"` to include "Fresh" (last 24h) data from GSC.
- **Commands:**
  - `node scripts/fetch-organic.mjs [days] [limit] [sort:impressions|clicks|position]`
  - `node skills/analytics-reporter/scripts/fetch-reports.mjs both 7`

### Indexing Progress
- **Script:** `scripts/index-all-tools.mjs` - Automatically batches 500+ tool pages for Google Indexing.
- **Queue/Notes:** See `INDEXING_NOTES.md` for fixed 404s and high-priority URLs.
- **Status (March 16, 2026):** ~200/527 URLs submitted. ~327 remaining. Fixed 404/redirect issues for 60+ tools; prioritized for re-submission on March 17, 2026.

## Important Conventions
1. **New tools go at the END of data.ts** - This makes them appear first on homepage due to reverse() in getAllTools()
2. Tools with `docsUrl: ""` (empty string) go to monitoring page
3. Tools with valid docsUrl go to API page
4. When adding new tool to API page, include ALL fields (not minimal)

## Common Tasks
- Add new tool to API page: Add full entry at end of data.ts (before minimal entries section)
- Add to monitoring: Add minimal entry `{ name, websiteUrl }` at end of file
- Verify docsUrl works before adding tool

## Git Workflow
- Commit changes with descriptive message
- Push to origin/main after each session
