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
      return `${formattedSubject} APIs & MCP Configs for AI Agents | Salestools Club`
    case "category":
      return `${formattedSubject} APIs & Developer Tools | Salestools Club`
    case "tool":
      if (status === "no-api" || status === "monitoring") {
        return `${formattedSubject} Technical Details & Status | Salestools Club`
      }
      return `${formattedSubject} API Documentation & MCP Config | Salestools Club`
    case "guide":
      return `${formattedSubject} | Salestools Club`
    case "vs":
      return `${formattedSubject} Comparison & API Analysis | Salestools Club`
    default:
      return `${formattedSubject} | Salestools Club`
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
      return `Connect your AI agent to the best ${formattedSubject} APIs. Access verified ${count ? `${count} ` : ""}MCP configs and starter prompts for Claude Code and Gemini.`
    case "category":
      return `Explore the top ${formattedSubject} APIs for sales automation. Technical documentation, authentication methods, and MCP servers for AI builders.`
    case "tool":
      if (status === "no-api") {
        return `Technical details for ${formattedSubject}. Note: No public REST/GraphQL API currently found. Explore monitored status and top AI-native alternatives for automation.`
      }
      if (status === "monitoring") {
        return `We are currently monitoring ${formattedSubject} for public API documentation. See the latest technical status and discovery progress for AI operators.`
      }
      return `Official API documentation and MCP configuration for ${formattedSubject}. Use our starter prompts to connect ${formattedSubject} to your AI sales agent.`
    case "guide":
      return `Master ${formattedSubject} with our technical deep-dive. Learn how to implement agentic workflows using verified sales APIs.`
    case "vs":
      return `Compare ${formattedSubject} APIs and features. A technical breakdown for AI operators choosing the best tool for their sales stack.`
    default:
      return `Verified APIs and MCP configs for ${formattedSubject}. Build your AI-native sales stack with Salestools Club.`
  }
}
