# SalesTool Schema Reference

When adding a tool to `lib/data.ts`, use this schema:

```typescript
export interface AgentIntegration {
  platform: "MCP" | "OpenClaw" | "LangChain" | "CrewAI" | "Claude Skill" | "Custom"
  url: string
  label?: string // e.g., "Official MCP Server", "Community Plugin"
  mcpConfig?: string // Copy-paste JSON for Claude Desktop/Cursor
}

export interface SalesTool {
  slug: string         // kebab-case (e.g., "apollo-io")
  name: string         // Display name
  oneLiner: string     // Short punchy description
  description: string  // Detailed human-like description (no AI slop)
  category: ToolCategory
  logoUrl: string      // Usually "/logos/slug.svg" or placeholder
  websiteUrl: string
  docsUrl: string
  pricingUrl: string
  githubUrl?: string

  apiType: ApiType[]   // ["REST", "GraphQL", etc.]
  authMethod: AuthMethod[] // ["API Key", "OAuth2", etc.]
  hasFreeTier: boolean
  sdkLanguages: string[]
  hasWebhooks: boolean
  hasOpenApiSpec: boolean
  openApiSpecUrl?: string

  // AI-Native Operator Specifics
  aiCapabilities: string[] // e.g., ["Search Leads", "Update CRM"]
  aiDifficulty: "AI-Native" | "Beginner-Friendly" | "Technical" | "Complex"
  starterPrompt?: string // "Claude, use this tool to..."
  mcpReady: boolean

  integrations: AgentIntegration[]
  isFeatured: boolean
  alternativeTo?: string[]
}
```

## Categories
"Prospecting", "Email Outreach", "CRM", "Enrichment", "Voice & Calling", "Scheduling", "Conversation Intelligence", "Documents & Proposals", "Sales Engagement", "Workflow Automation"
