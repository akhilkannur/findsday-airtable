import { tools } from "./data"
import type { SalesTool, ToolCategory } from "./types"

export interface Guide {
  slug: string
  title: string
  metaDescription: string
  intro: string
  categories?: ToolCategory[]
  keywords?: string[]
}

const guides: Guide[] = [
  {
    slug: "crm-apis",
    title: "CRM APIs for AI Agents",
    metaDescription:
      "A curated guide to CRM APIs for AI agents. Compare REST, GraphQL, auth methods, SDKs, webhooks, and MCP readiness for building CRM automations.",
    intro:
      "Building AI agents that can manage contacts, deals, and pipelines? These CRM APIs give your agent full programmatic access to customer relationship data. Every tool here has been vetted for API completeness and developer experience.",
    categories: ["CRM & RevOps"],
  },
  {
    slug: "cold-email-apis",
    title: "Cold Email APIs for AI Agents",
    metaDescription:
      "Cold email APIs for AI agents. Compare email APIs, sequencing, warmup, and MCP servers for automated outbound campaigns.",
    intro:
      "Your AI agent can now run full outbound campaigns. These APIs let you send emails, manage sequences, handle warmup, and track engagement — all programmatically.",
    categories: ["Sales Engagement"],
  },
  {
    slug: "enrichment-apis",
    title: "Lead Enrichment APIs for AI Agents",
    metaDescription:
      "Lead enrichment APIs for AI agents. Compare data providers, email verification, firmographics, and MCP servers for real-time enrichment.",
    intro:
      "Stop working with bad data. These enrichment APIs let your agent pull verified emails, company info, and intent signals in real time — so every lead is worth reaching.",
    categories: ["Sales Intelligence"],
  },
  {
    slug: "phone-apis",
    title: "Phone & Calling APIs for AI Agents",
    metaDescription:
      "Phone and calling APIs for AI agents. Compare dialers, voice APIs, recording, transcription, and MCP servers for outbound calling.",
    intro:
      "Scale your outbound without hiring more SDRs. These APIs give your agent access to power dialers, voice bots, call recording, and SMS automation.",
    categories: ["Phone & Dialers"],
  },
  {
    slug: "revenue-intelligence-apis",
    title: "Revenue Intelligence APIs for AI Agents",
    metaDescription:
      "Revenue intelligence APIs for AI agents. Compare conversation intelligence, analytics, forecasting, and deal health monitoring.",
    intro:
      "Every call and deal tells a story. These APIs let your agent analyze conversations, track deal health, and forecast revenue — automatically.",
    categories: ["Revenue Intelligence"],
  },
  {
    slug: "scheduling-apis",
    title: "Meeting Scheduling APIs for AI Agents",
    metaDescription:
      "Meeting scheduling APIs for AI agents. Compare calendar APIs, booking, availability, and MCP servers for automated scheduling.",
    intro:
      "Never lose a warm lead to calendar friction. These APIs let your agent check availability, book meetings, and handle rescheduling — automatically.",
    categories: ["Closing & Scheduling"],
  },
  {
    slug: "sales-enablement-apis",
    title: "Sales Enablement APIs for AI Agents",
    metaDescription:
      "Sales enablement APIs for AI agents. Compare content management, proposals, e-signatures, and document automation.",
    intro:
      "Your reps need the right content at the right time. These APIs let your agent serve up proposals, track engagement, and manage e-signatures — automatically.",
    categories: ["Sales Enablement"],
  },
]

export function getAllGuides(): Guide[] {
  return guides
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}

export function getGuideSlugs(): string[] {
  return guides.map((g) => g.slug)
}

export function getToolsForGuide(guide: Guide): SalesTool[] {
  const withDocs = tools.filter((t) => t.docsUrl && t.docsUrl !== "")
  const matched = new Map<string, SalesTool>()

  for (const tool of withDocs) {
    if (guide.categories?.includes(tool.category)) {
      matched.set(tool.slug, tool)
    }
  }

  if (guide.keywords?.length) {
    for (const tool of withDocs) {
      if (matched.has(tool.slug)) continue
      const caps = (tool.aiCapabilities || []).join(" ").toLowerCase()
      const matchesKeyword = guide.keywords.some((kw) =>
        caps.includes(kw.toLowerCase())
      )
      if (matchesKeyword) {
        matched.set(tool.slug, tool)
      }
    }
  }

  return Array.from(matched.values())
}
