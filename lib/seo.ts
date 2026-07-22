const ACRONYMS = [
  "AI",
  "CRM",
  "API",
  "MCP",
  "SDK",
  "B2B",
  "SDR",
  "SMS",
  "REST",
  "JSON",
  "OAuth",
  "OAuth2",
  "RevOps",
]

export function formatAcronyms(text: string): string {
  let formatted = text.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  
  ACRONYMS.forEach((acronym) => {
    const regex = new RegExp(`\\b${acronym}\\b`, "gi")
    formatted = formatted.replace(regex, acronym)
  })
  
  return formatted
}

export function generateSeoTitle(
  subject: string, 
  type: "capability" | "category" | "tool" | "guide" | "vs",
  status?: "verified" | "no-api" | "monitoring"
): string {
  const formattedSubject = formatAcronyms(subject)
  
  switch (type) {
    case "capability":
      return `${formattedSubject} APIs & AI Features for Sales Agents | Salestools Club`
    case "category":
      return `${formattedSubject} APIs & MCP Servers for AI Sales Agents | Salestools Club`
    case "tool":
      if (status === "no-api" || status === "monitoring") {
        return `${formattedSubject} Technical Details & API Status | Salestools Club`
      }
      return `${formattedSubject} API Documentation & MCP Config | Salestools Club`
    case "guide":
      return `Best ${formattedSubject} APIs Compared (2026) | Salestools Club`
    case "vs":
      return `${formattedSubject.replace(/\bVs\b/g, "vs")}: Compare APIs & MCP Support (2026) | Salestools Club`
    default:
      return `${formattedSubject} | Salestools Club`
  }
}

export function generateSeoKeywords(
  subject: string,
  type: "capability" | "category" | "tool" | "guide" | "vs" | "auth" | "sdk" | "alternative",
  additionalKeywords?: string[]
): string[] {
  const formatted = formatAcronyms(subject)
  const baseKeywords = [
    formatted.toLowerCase(),
    "sales API",
    "MCP server",
    "AI agent",
    "Claude Code",
  ]

  switch (type) {
    case "tool":
      return [formatted, `${formatted} API`, `${formatted} MCP`, `${formatted} documentation`, "sales API directory", ...baseKeywords]
    case "category":
      return [`${formatted} APIs`, `best ${formatted} tools`, `${formatted} MCP servers`, "sales API directory", ...baseKeywords]
    case "guide":
      return [`best ${formatted}`, `${formatted} comparison`, `${formatted} APIs`, "sales tool guide", ...baseKeywords]
    case "vs":
      return [`${formatted}`, `${formatted} comparison`, `${formatted} which is better`, ...baseKeywords]
    case "capability":
      return [`${formatted} AI features`, `${formatted} APIs`, `automate ${formatted}`, ...baseKeywords]
    case "auth":
      return [`${formatted} authentication`, `${formatted} auth sales APIs`, `${formatted} API key`, ...baseKeywords]
    case "sdk":
      return [`${formatted} SDK`, `${formatted} SDK sales`, `${formatted} package sales API`, ...baseKeywords]
    case "alternative":
      return [`${formatted} alternatives`, `best ${formatted} alternatives`, `${formatted} competitors`, ...baseKeywords]
    default:
      return baseKeywords
  }
}

export function generateSeoDescription(
  subject: string, 
  type: "capability" | "category" | "tool" | "guide" | "vs", 
  count?: number,
  status?: "verified" | "no-api" | "monitoring"
): string {
  const formattedSubject = formatAcronyms(subject)
  
  switch (type) {
    case "capability":
      return `Compare ${formattedSubject} APIs and AI features for sales automation. Access verified MCP configs and technical analysis to connect ${formattedSubject} tools to your AI agent.`
    case "category":
      return `Browse the best ${formattedSubject} APIs for AI-native sales stacks. Compare features, MCP support, pricing, and SDKs to find the right ${formattedSubject} tools for Claude Code and other agents.`
    case "tool":
      if (status === "no-api") {
        return `${formattedSubject} technical overview. Note: No public REST/GraphQL API currently found. Explore monitored status and top AI-native alternatives for ${formattedSubject} automation.`
      }
      if (status === "monitoring") {
        return `We are monitoring ${formattedSubject} for public API documentation. See the latest technical status and discovery progress for connecting ${formattedSubject} to AI agents.`
      }
      return `${formattedSubject} API docs, MCP config, and starter prompts. Learn how to connect ${formattedSubject} to Claude Code, Gemini, and other AI agents for automated sales workflows.`
    case "guide":
      return `Compare the best ${formattedSubject} APIs side-by-side. Detailed breakdown of features, MCP support, SDK integration, and pricing to build your AI-native ${formattedSubject} stack.`
    case "vs":
      return `Compare ${formattedSubject} APIs for AI agents. Side-by-side breakdown of MCP support, SDKs, webhooks, authentication, and features to choose the right tool for your sales stack.`
    default:
      return `Verified APIs and MCP configs for ${formattedSubject}. Build your AI-native sales stack with Salestools Club.`
  }
}
