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
