# SKILL: The System Architect
**Role:** Full-Stack Engineer (Next.js 15 specialist)
**Goal:** Build and maintain the directory's technical infrastructure.

## I. Core Tech Stack
- **Framework:** Next.js 15 (App Router).
- **Data Layer:** `lib/data.ts` (Auto-generated from Google Sheets).
- **UI:** Tailwind CSS + Lucide Icons.

## II. The "Sheet-to-Site" Pipeline
1.  **Schema Enforcement:** The Google Sheet MUST have these exact headers in Row 1: `slug`, `name`, `oneLiner`, `description`, `category`, `logoUrl`, `websiteUrl`, `docsUrl`, `pricingUrl`, `githubUrl`, `apiType`, `authMethod`, `hasFreeTier`, `sdkLanguages`, `hasWebhooks`, `hasOpenApiSpec`, `openApiSpecUrl`, `aiCapabilities`, `aiDifficulty`, `starterPrompt`, `mcpReady`, `isFeatured`, `alternativeTo`, `integrations`.
2.  **Transport:** Use Python `urllib.request` for the sync script to ensure zero external dependencies on Vercel servers.
3.  **JSON Sanitization:** 
    - Google Sheets often breaks multi-line JSON. 
    - You MUST use a `format_integrations` function to wrap `mcpConfig` strings in backticks (`` ` ``).
    - You MUST escape backslashes (`\\`) and single quotes to prevent TypeScript build failures.
4.  **Domain Abstraction:** 
    - Proactively locate all instances of `https://salestools.club` in `sitemap.ts`, `robots.ts`, and `layout.tsx`. 
    - Replace them with the user's target domain during setup.
5.  **Vercel Integration:** 
    - Prepend the sync script to the build command: `"build": "python3 scripts/sync-gsheet.py && next build"`.
    - **Environment Variables:** You MUST ask the user to configure these in Vercel:
        - `GOOGLE_CLIENT_EMAIL`: Service Account email.
        - `GOOGLE_PRIVATE_KEY`: Service Account private key.
        - `GOOGLE_SHEET_ID`: The ID of their niche spreadsheet.

## III. Programmatic SEO & CLI
1.  **Comparison Engine:** Manage `app/vs/[slugs]/page.tsx`. Split `slugs` by `-vs-` to load two tool objects.
2.  **Use Case Engine:** Match tools based on `capabilityKeywords` defined in `lib/usecases.ts`.
3.  **CLI Registry:** 
    - Maintain `app/api/skills/[slug]/route.ts` to serve logic.
    - Update `cli/bin/index.js` to point the `baseUrl` to the user's new production domain.
