export type ApiType = "REST" | "GraphQL" | "WebSocket" | "gRPC"
export type AuthMethod = "API Key" | "OAuth2" | "Bearer Token" | "Basic Auth" | "None"
export type ToolCategory =
  | "Sales Intelligence"
  | "Sales Engagement"
  | "Phone & Dialers"
  | "CRM & RevOps"
  | "Revenue Intelligence"
  | "Sales Enablement"
  | "Closing & Scheduling"


export interface MinimalTool {
  name: string
  websiteUrl: string
}


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
  websiteUrl: string
  docsUrl: string
  pricingUrl: string
  githubUrl?: string

  apiType: ApiType[]
  authMethod: AuthMethod[]
  hasFreeTier: boolean
  sdkLanguages: string[]
  snippetLanguages?: string[]
  hasWebhooks: boolean
  hasPublicApi: boolean // false if tool has no public REST/GraphQL API

  // AI-Native Operator Specifics
  aiCapabilities: string[] // e.g. ["Search Leads", "Update CRM", "Record Meetings"]
  starterPrompt?: string // "Claude, use this tool to..."
  mcpReady: boolean

  // Agent integrations — all the ways to connect this tool to an AI agent
  integrations: AgentIntegration[]

  isFeatured: boolean
  alternativeTo?: string[]
  addedAt?: string
}

export interface CategoryMeta {
  slug: string
  name: ToolCategory
  description: string
  icon: string
  toolCount: number
}
