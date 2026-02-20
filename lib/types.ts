export type ApiType = "REST" | "GraphQL" | "WebSocket" | "gRPC"
export type AuthMethod = "API Key" | "OAuth2" | "Bearer Token" | "Basic Auth" | "None"
export type ToolCategory =
  | "Prospecting"
  | "Email Outreach"
  | "CRM"
  | "Enrichment"
  | "Voice & Calling"
  | "Scheduling"
  | "Conversation Intelligence"
  | "Documents & Proposals"
  | "Sales Engagement"
  | "Workflow Automation"
  | "Analytics"
  | "Operations"
  | "Sales Enablement"

export type AiDifficulty = "AI-Native" | "Beginner-Friendly" | "Technical" | "Complex"

export interface AgentIntegration {
  platform: "MCP" | "OpenClaw" | "LangChain" | "CrewAI" | "Claude Skill" | "Custom"
  url: string
  label?: string // e.g., "Official MCP Server", "Community Plugin"
  mcpConfig?: string // Copy-paste JSON for Claude Desktop/Cursor
}

export interface SalesTool {
  slug: string
  name: string
  oneLiner: string
  description: string
  category: ToolCategory
  logoUrl: string
  websiteUrl: string
  docsUrl: string
  pricingUrl: string
  githubUrl?: string

  apiType: ApiType[]
  authMethod: AuthMethod[]
  hasFreeTier: boolean
  sdkLanguages: string[]
  hasWebhooks: boolean
  hasOpenApiSpec: boolean
  openApiSpecUrl?: string

  // AI-Native Operator Specifics
  aiCapabilities: string[] // e.g., ["Search Leads", "Update CRM", "Record Meetings"]
  aiDifficulty: AiDifficulty
  starterPrompt?: string // "Claude, use this tool to..."
  mcpReady: boolean

  // Agent integrations — all the ways to connect this tool to an AI agent
  integrations: AgentIntegration[]

  isFeatured: boolean
  alternativeTo?: string[]
}

export interface CategoryMeta {
  slug: string
  name: ToolCategory
  description: string
  icon: string
  toolCount: number
}
