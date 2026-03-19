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

export function generateSeoTitle(subject: string, type: "capability" | "category" | "tool" | "guide" | "vs"): string {
  const formattedSubject = formatAcronyms(subject)
  
  switch (type) {
    case "capability":
      return `${formattedSubject} APIs & MCP Configs for AI Agents | Salestools Club`
    case "category":
      return `${formattedSubject} APIs & Developer Tools | Salestools Club`
    case "tool":
      return `${formattedSubject} API Documentation & MCP Config | Salestools Club`
    case "guide":
      return `${formattedSubject} | Salestools Club`
    case "vs":
      return `${formattedSubject} Comparison & API Analysis | Salestools Club`
    default:
      return `${formattedSubject} | Salestools Club`
  }
}

export function generateSeoDescription(subject: string, type: "capability" | "category" | "tool" | "guide" | "vs", count?: number): string {
  const formattedSubject = formatAcronyms(subject)
  
  switch (type) {
    case "capability":
      return `Connect your AI agent to the best ${formattedSubject} APIs. Access verified ${count ? `${count} ` : ""}MCP configs and starter prompts for Claude Code and Gemini.`
    case "category":
      return `Explore the top ${formattedSubject} APIs for sales automation. Technical documentation, authentication methods, and MCP servers for AI builders.`
    case "tool":
      return `Official API documentation and MCP configuration for ${formattedSubject}. Use our starter prompts to connect ${formattedSubject} to your AI sales agent.`
    case "guide":
      return `Master ${formattedSubject} with our technical deep-dive. Learn how to implement agentic workflows using verified sales APIs.`
    case "vs":
      return `Compare ${formattedSubject} APIs and features. A technical breakdown for AI operators choosing the best tool for their sales stack.`
    default:
      return `Verified APIs and MCP configs for ${formattedSubject}. Build your AI-native sales stack with Salestools Club.`
  }
}
