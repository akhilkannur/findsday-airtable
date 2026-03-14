import { tools } from "./data"
import type { SalesTool } from "./types"

export interface UseCase {
  slug: string
  title: string
  metaDescription: string
  intro: string
  categories: string[]
  capabilityKeywords?: string[]
  includeSlugs?: string[]
}

const usecases: UseCase[] = [
  {
    slug: "cold-outreach",
    title: "AI Tools for Cold Outreach",
    metaDescription:
      "Find the best AI-powered cold outreach tools with APIs and MCP servers. Automate cold email, LinkedIn DMs, and multichannel sequences from your AI agent.",
    intro:
      "Cold outreach still works — but only when it's hyper-personalized and runs on autopilot. These tools give your AI agent direct access to email sequencing, LinkedIn messaging, and multichannel campaign APIs so you can launch targeted outreach without touching a dashboard.",
    categories: ["Sales Engagement"],
    capabilityKeywords: ["Cold Email", "Outreach", "Email Campaign", "DM", "Sequence"],
  },
  {
    slug: "lead-enrichment",
    title: "AI Tools for Lead Enrichment",
    metaDescription:
      "Discover AI lead enrichment tools with APIs for real-time contact and company data. Plug verified emails, phone numbers, and firmographics into your agent workflows.",
    intro:
      "Bad data kills deals before they start. These enrichment APIs let your AI agent pull verified emails, direct dials, firmographics, and intent signals in real time — so every lead in your pipeline is actually worth reaching out to.",
    categories: ["Sales Intelligence"],
    capabilityKeywords: ["Enrich", "Enrichment", "Verified Email", "Firmographic", "Contact Data", "Data Enrichment"],
  },
  {
    slug: "crm-automation",
    title: "AI Tools for CRM Automation",
    metaDescription:
      "Automate your CRM with AI-native APIs and MCP servers. Sync contacts, update deals, and manage pipelines programmatically from Claude Code, Gemini CLI, or your own agents.",
    intro:
      "Nobody wants to spend their day updating CRM fields. These tools expose APIs that let your AI agent create contacts, move deals through stages, log activities, and keep your pipeline clean — all without you opening Salesforce.",
    categories: ["CRM & RevOps"],
    capabilityKeywords: ["CRM", "Pipeline", "Deal", "Contact Management"],
  },
  {
    slug: "meeting-booking",
    title: "AI Tools for Meeting Booking & Scheduling",
    metaDescription:
      "AI scheduling and meeting booking tools with APIs. Let your agent book meetings, send calendar invites, and manage availability automatically.",
    intro:
      "The back-and-forth of scheduling is a solved problem — if you have the right API. These tools let your AI agent check availability, book meetings, send reminders, and handle rescheduling so you never lose a warm lead to calendar friction.",
    categories: ["Closing & Scheduling"],
    capabilityKeywords: ["Schedule", "Meeting", "Calendar", "Booking"],
  },
  {
    slug: "prospecting",
    title: "AI Prospecting Tools",
    metaDescription:
      "The best AI prospecting tools with APIs and MCP servers. Build lead lists, find decision-makers, and discover target accounts using your AI agent.",
    intro:
      "Prospecting is where pipeline begins. These APIs give your AI agent access to massive B2B databases, LinkedIn extractors, and company search engines so you can build targeted lead lists in seconds instead of hours.",
    categories: ["Sales Intelligence"],
    capabilityKeywords: ["Prospect", "Lead Discovery", "Search", "Contact", "Find", "Lead List", "B2B"],
  },
  {
    slug: "sales-engagement",
    title: "AI Sales Engagement Platforms",
    metaDescription:
      "AI sales engagement platforms with APIs for multichannel outreach. Automate email sequences, calls, LinkedIn touches, and follow-ups from your AI agent.",
    intro:
      "Sales engagement platforms are the command center for outbound. These tools offer APIs for orchestrating email, phone, LinkedIn, and SMS touches in automated sequences — letting your AI agent run full campaigns end to end.",
    categories: ["Sales Engagement"],
  },
  {
    slug: "conversation-intelligence",
    title: "Conversation Intelligence Tools for AI Agents",
    metaDescription:
      "Conversation intelligence APIs for AI agents. Record, transcribe, and analyze sales calls to extract insights, coach reps, and forecast deals automatically.",
    intro:
      "Every sales call is full of signals your team is probably missing. These conversation intelligence APIs let your AI agent record calls, pull out key moments, track competitor mentions, and surface coaching insights — so nothing falls through the cracks.",
    categories: ["Revenue Intelligence", "Phone & Dialers"],
    capabilityKeywords: ["Call", "Conversation", "Transcri", "Recording", "Meeting Intelligence"],
  },
  {
    slug: "proposals-and-quotes",
    title: "AI Tools for Proposals & Quotes",
    metaDescription:
      "AI proposal and quote tools with APIs. Generate proposals, track buyer engagement, and close deals faster with document automation for AI agents.",
    intro:
      "Proposals shouldn't take hours to assemble. These tools provide APIs for generating branded proposals, tracking when buyers open them, collecting e-signatures, and managing CPQ workflows — so your AI agent can move deals from handshake to signed contract.",
    categories: ["Sales Enablement", "Closing & Scheduling"],
    capabilityKeywords: ["Proposal", "Quote", "Document", "Contract", "Signature", "CPQ", "Sales Room"],
  },
  {
    slug: "sales-analytics",
    title: "Sales Analytics Tools for AI Agents",
    metaDescription:
      "Sales analytics APIs for AI agents. Track pipeline health, forecast revenue, analyze rep performance, and surface deal risks automatically.",
    intro:
      "You can't fix what you can't measure. These analytics APIs let your AI agent pull pipeline metrics, forecast revenue, flag at-risk deals, and generate performance reports — giving you a real-time view of your sales engine without building dashboards from scratch.",
    categories: ["Revenue Intelligence"],
    capabilityKeywords: ["Analytics", "Forecast", "Pipeline", "Revenue", "Report", "Dashboard"],
  },
  {
    slug: "voice-and-calling",
    title: "AI Voice & Calling Tools",
    metaDescription:
      "AI voice and calling tools with APIs for sales teams. Power dialers, AI voice agents, call recording, and SMS automation for outbound sales.",
    intro:
      "The phone is still the fastest way to close. These APIs give your AI agent access to power dialers, AI voice bots, call recording, and SMS campaigns — so you can scale outbound calling without hiring more SDRs.",
    categories: ["Phone & Dialers"],
    capabilityKeywords: ["Call", "Dial", "Voice", "Phone", "SMS"],
  },
  {
    slug: "workflow-automation",
    title: "Sales Workflow Automation Tools",
    metaDescription:
      "Sales workflow automation tools with APIs. Connect your sales stack, automate data syncs, and build custom workflows with AI-native operations tools.",
    intro:
      "Manual processes are the silent killer of sales velocity. These automation APIs let your AI agent connect tools, sync data between systems, trigger workflows based on events, and eliminate the repetitive ops work that slows your team down.",
    categories: ["CRM & RevOps"],
    capabilityKeywords: ["Automate", "Workflow", "Sync", "Integration", "Ops", "Automation"],
  },
  {
    slug: "sales-enablement",
    title: "Sales Enablement Tools for AI Agents",
    metaDescription:
      "Sales enablement APIs for AI agents. Manage content, automate coaching, deliver training, and equip reps with the right resources at the right time.",
    intro:
      "Your reps are only as good as the resources they have access to. These enablement APIs let your AI agent serve up the right content, deliver coaching prompts, track training completion, and ensure your team always has what they need to close.",
    categories: ["Sales Enablement"],
  },
]

export function getAllUseCases(): UseCase[] {
  return usecases
}

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return usecases.find((uc) => uc.slug === slug)
}

export function getUseCaseSlugs(): string[] {
  return usecases.map((uc) => uc.slug)
}

export function getUseCasesForTool(tool: SalesTool): UseCase[] {
  return usecases.filter((uc) => {
    if (uc.categories.includes(tool.category)) return true
    if (uc.capabilityKeywords?.length) {
      const caps = (tool.aiCapabilities || []).join(" ").toLowerCase()
      return uc.capabilityKeywords.some((kw) => caps.includes(kw.toLowerCase()))
    }
    return false
  })
}

export function getToolsForUseCase(usecase: UseCase): SalesTool[] {
  const matched = new Map<string, SalesTool>()
  const withDocs = tools.filter((t) => t.docsUrl && t.docsUrl !== "")

  // Match by categories
  for (const tool of withDocs) {
    if (usecase.categories.includes(tool.category)) {
      matched.set(tool.slug, tool)
    }
  }

  // Match by capability keywords
  if (usecase.capabilityKeywords?.length) {
    for (const tool of withDocs) {
      if (matched.has(tool.slug)) continue
      const caps = (tool.aiCapabilities || []).join(" ").toLowerCase()
      const matchesKeyword = usecase.capabilityKeywords.some((kw) =>
        caps.includes(kw.toLowerCase())
      )
      if (matchesKeyword) {
        matched.set(tool.slug, tool)
      }
    }
  }

  // Force-include specific slugs
  if (usecase.includeSlugs?.length) {
    for (const slug of usecase.includeSlugs) {
      const tool = withDocs.find((t) => t.slug === slug)
      if (tool) {
        matched.set(tool.slug, tool)
      }
    }
  }

  return Array.from(matched.values())
}
