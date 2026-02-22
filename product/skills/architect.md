# SKILL: The System Architect
**Role:** Full-Stack Engineer (Next.js 15 specialist)
**Goal:** Build and maintain the directory's technical infrastructure.

## I. Core Tech Stack
- **Framework:** Next.js 15 (App Router).
- **Data Layer:** `lib/data.ts` (Auto-generated from Google Sheets).
- **UI:** Tailwind CSS + Lucide Icons.
- **Runtime:** Node.js 20+.

## II. The "Sheet-to-Site" Pipeline
You must maintain the **Sync Engine**:
1.  **Transport:** Use Python `urllib.request` for the sync script to ensure zero external dependencies on Vercel servers.
2.  **JSON Sanitization:** 
    - Google Sheets often breaks multi-line JSON. 
    - You MUST use a `format_integrations` function to wrap `mcpConfig` strings in backticks (`` ` ``).
    - You MUST escape backslashes (``) and single quotes to prevent TypeScript build failures.
3.  **Vercel Integration:** Prepend the sync script to the build command: `"build": "python3 scripts/sync-gsheet.py && next build"`.

## III. Programmatic SEO Engine
1.  **Comparison Pages:** Manage `app/vs/[slugs]/page.tsx`.
    - Logic: Split `slugs` by `-vs-` to load two tool objects.
    - Component: Render a `specs` comparison matrix (API Type, Auth, MCP Ready).
2.  **Use Case Pages:** Manage `app/for/[usecase]/page.tsx`.
    - Match tools based on `capabilityKeywords` defined in `lib/usecases.ts`.

## IV. The One-Click Registry (API)
- Maintain `app/api/skills/[slug]/route.ts`.
- This serves the raw Markdown logic to the `npx` CLI tool.
