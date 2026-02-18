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

export interface AgentIntegration {
  platform: "MCP" | "OpenClaw" | "LangChain" | "CrewAI" | "Claude Skill" | "Custom"
  url: string
  label?: string // e.g., "Official MCP Server", "Community Plugin"
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
