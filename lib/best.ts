import { getToolsByCapability, getAllTools } from "@/lib/tools"
import type { SalesTool } from "@/lib/types"

function capabilityToSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export interface BestHub {
  slug: string
  /** The keyword this hub targets (H1 + title). Front-loaded, human-readable. */
  keyword: string
  /** Short editorial intro — the "why these tools" + how to choose. Written once per hub. */
  intro: string
  /** Longer editorial body — decision framework, what to look for. */
  body: string
  /** Canonical capability(s) that pull matching tools from data.ts */
  capabilities: string[]
  /** Optional: only include tools with MCP support */
  mcpOnly?: boolean
  /** Optional: only include tools with a free tier */
  freeTierOnly?: boolean
  /** Pinned leader tools (top of list, in order). Rest data-ranks below. */
  anchorTools: string[]
  /** Related hub slugs for internal cross-linking */
  related?: string[]
  /** Short "readiness" summary for meta description */
  summary: string
}

// Written once, reused across all tool rows. This is the hand-authored layer.
// The tool lists themselves derive from lib/data.ts via capabilities.
export const bestHubs: BestHub[] = [
  {
    slug: "ai-sdrs",
    keyword: "Best AI SDRs",
    summary: "Ranked AI SDR tools that prospect, research, and book meetings for you — with MCP support and API access for AI-native sales stacks.",
    intro:
      "AI SDRs are autonomous agents that handle the front of the funnel: prospecting, research, personalization, and meeting booking. For AI-native operators, the right choice isn't the one with the most hype — it's the one whose API and MCP server let your own agent orchestrate it.",
    body:
      "When evaluating AI SDR platforms, prioritize tools with a documented REST API and, where possible, an MCP server so your agent can drive them directly. Look for real prospecting depth (enrichment, contact data, buying signals), sequence execution, and a feedback loop from replies back into your CRM. A free tier is a strong signal of product confidence and lets you validate the tool before committing. The list below ranks tools by capability coverage, MCP readiness, and free-tier availability from our verified directory.",
    capabilities: ["AI SDR & Agents", "Lead Generation", "Cold Email Outreach", "B2B Data Enrichment", "Sales Automation"],
    related: ["ai-voice-dialers", "b2b-data-enrichment", "conversation-intelligence"],
    anchorTools: ["lindy", "jason-reply", "reply-io"],
  },
  {
    slug: "b2b-data-enrichment",
    keyword: "Best B2B Data Enrichment APIs",
    summary: "Top B2B data enrichment and lead intelligence APIs for AI agents — verified, ranked by capability coverage, MCP support, and free tiers.",
    intro:
      "Enrichment is the backbone of an AI-native sales stack. Before your agent writes outreach, it needs verified company, contact, and technographic data. These APIs give it that.",
    body:
      "The best enrichment APIs expose clean, structured endpoints: company search, contact discovery, email verification, and CRM-native enrichment. For AI-native operators the differentiators are API quality, MCP readiness, and webhook support so your agent gets updated records automatically. We rank tools by the breadth of their capabilities in our directory — not by marketing claims.",
    capabilities: ["B2B Data Enrichment", "Lead Generation", "Email Verification", "Web Scraping"],
    related: ["ai-sdrs", "intent-intelligence", "sales-intelligence"],
    anchorTools: ["clay", "apollo", "dropcontact"],
  },
  {
    slug: "conversation-intelligence",
    keyword: "Best Conversation Intelligence APIs",
    summary: "Ranked conversation intelligence and call recording APIs — transcription, coaching, and deal insights for AI agents.",
    intro:
      "Conversation intelligence turns call and meeting recordings into data your agent can act on: transcripts, sentiment, talk tracks, and deal risk. The best ones expose it all through an API.",
    body:
      "Look for APIs that return transcripts with speaker diarization, call summaries, and structured insights (talk-to-listen ratio, competitor mentions, next steps). Webhook support matters so your agent gets notified the moment a call ends. MCP-ready tools let you query past calls in plain language.",
    capabilities: ["Conversation Intelligence", "Revenue Intelligence", "Sales Coaching"],
    related: ["revenue-intelligence", "ai-sdrs", "sales-enablement"],
    anchorTools: ["gong", "chorus-ai", "avoma"],
  },
  {
    slug: "revenue-intelligence",
    keyword: "Best Revenue Intelligence Platforms",
    summary: "Top revenue intelligence platforms and pipeline analytics APIs — ranked by capability coverage for AI sales agents.",
    intro:
      "Revenue intelligence aggregates CRM, call, and product data into pipeline and forecast signals. For AI operators, the winners expose that via API so your agent can build the reports, not you.",
    body:
      "Evaluate on data integration breadth, forecast accuracy, and API surface. MCP-ready platforms let your agent ask questions like 'which deals are at risk this quarter' and get grounded answers. A free tier is valuable for testing before you wire it into production.",
    capabilities: ["Revenue Intelligence", "Conversation Intelligence", "Pipeline Analysis", "CRM Automation"],
    related: ["conversation-intelligence", "crm-and-revops", "sales-enablement"],
    anchorTools: ["clari", "hockeystack", "salesloft"],
  },
  {
    slug: "crm-and-revops",
    keyword: "Best CRM & RevOps APIs",
    summary: "Best CRM and revenue operations APIs for AI agents — ranked by capability, MCP support, and automation potential.",
    intro:
      "Your CRM is the system of record. For AI-native sales stacks, the CRM that wins is the one with a clean API, webhooks, and an MCP server so agents can read and write records natively.",
    body:
      "Prioritize CRMs with comprehensive REST APIs, native webhooks for real-time updates, and SDKs in your language. MCP-ready CRMs let your agent search contacts, log activities, and update pipelines conversationally. Capability coverage — from pipeline analysis to meeting transcript capture — determines how much of your workflow you can hand to an agent.",
    capabilities: ["CRM Automation", "Pipeline Analysis", "Lead Management & Scoring", "Sales Automation"],
    related: ["revenue-intelligence", "ai-sdrs", "sales-enablement"],
    anchorTools: ["hubspot", "salesforce", "pipedrive"],
  },
  {
    slug: "cold-email",
    keyword: "Best Cold Email APIs",
    summary: "Top cold email and outreach APIs for AI agents — ranked by capability, deliverability, and MCP support.",
    intro:
      "Cold email APIs let your agent send, track, and optimize sequences programmatically. Deliverability and API quality decide whether the outreach lands in inboxes — or spam.",
    body:
      "Look for sending APIs with built-in deliverability features (warmup, verification, throttling), open/reply tracking, and webhook events so your agent can react to replies in real time. MCP-ready tools can be orchestrated end-to-end by your agent.",
    capabilities: ["Cold Email Outreach", "Email Verification", "Sales Automation", "Personalized Outreach"],
    related: ["b2b-data-enrichment", "ai-sdrs", "sales-engagement"],
    anchorTools: ["smartlead", "lemlist", "success-ai"],
  },
  {
    slug: "ai-voice-dialers",
    keyword: "Best AI Voice & Dialer APIs",
    summary: "Top AI voice agents and predictive dialer APIs — ranked by capability coverage for AI sales teams.",
    intro:
      "AI voice APIs handle calls at scale: predictive dialing, voice agents, and real-time transcription. For AI-native operators, the differentiator is programmatic control.",
    body:
      "Evaluate on voice-agent quality, real-time transcription and intent detection, and webhook/callback support. MCP-ready platforms let your agent launch and monitor call campaigns conversationally.",
    capabilities: ["AI Voice & Dialers", "Conversation Intelligence", "Sales Automation"],
    related: ["conversation-intelligence", "ai-sdrs", "revenue-intelligence"],
    anchorTools: ["justcall", "orum", "five9"],
  },
  {
    slug: "sales-intelligence",
    keyword: "Best Sales Intelligence APIs",
    summary: "Top sales intelligence and prospecting APIs for AI agents — ranked by capability coverage, MCP, and data depth.",
    intro:
      "Sales intelligence gives your agent the context to prospect well: companies, contacts, intent, and tech signals. The best APIs make that data queryable, not static.",
    body:
      "Prioritize APIs with broad company and contact coverage, firmographic and intent data, and clean query endpoints. MCP-ready tools let your agent search prospects conversationally. Webhook and export support matter for keeping your CRM fresh.",
    capabilities: ["Sales Intelligence", "B2B Data Enrichment", "Intent Intelligence", "Lead Generation"],
    related: ["b2b-data-enrichment", "intent-intelligence", "abm-automation"],
    anchorTools: ["zoominfo", "cognism", "leadiq"],
  },
  {
    slug: "sales-enablement",
    keyword: "Best Sales Enablement APIs",
    summary: "Top sales enablement and content APIs for AI agents — ranked by capability coverage and automation potential.",
    intro:
      "Sales enablement platforms centralize content, training, and coaching. For AI operators, the value is in APIs that let your agent pull the right asset for the right moment.",
    body:
      "Look for content APIs, playbook and sequence support, and coaching/training data that your agent can query. MCP-ready platforms let agents fetch battle cards, objection handling, and best practices on demand.",
    capabilities: ["Sales Enablement", "Sales Coaching", "Content Creation", "CRM Automation"],
    related: ["conversation-intelligence", "revenue-intelligence", "crm-and-revops"],
    anchorTools: ["highspot", "salesloft", "showpad"],
  },
  {
    slug: "meeting-scheduling",
    keyword: "Best Meeting Scheduling APIs",
    summary: "Top meeting scheduling and booking APIs for AI agents — ranked by capability coverage and MCP support.",
    intro:
      "Scheduling APIs let your agent book meetings without the back-and-forth: availability, timezone handling, and calendar sync.",
    body:
      "Evaluate on availability APIs, timezone/working-hours handling, and calendar provider integrations. Webhook support keeps your agent notified when a meeting books or reschedules. MCP-ready schedulers let your agent book meetings conversationally.",
    capabilities: ["Meeting Scheduling", "Personalized Outreach", "Sales Automation"],
    related: ["ai-sdrs", "sales-engagement", "crm-and-revops"],
    anchorTools: ["calendly", "cal-com", "chili-piper"],
  },
  {
    slug: "intent-intelligence",
    keyword: "Best Intent Data & Buying Signals APIs",
    summary: "Top intent data and buying-signal APIs for AI sales agents — ranked by capability coverage.",
    intro:
      "Intent data tells your agent which accounts are researching topics relevant to you — the signal to act before your competitor does.",
    body:
      "Prioritize APIs with firmographic + intent blending, topic-level or product-level intent, and integration with your ABM workflows. Clean query endpoints let your agent segment high-intent accounts automatically.",
    capabilities: ["Intent Intelligence", "ABM Automation", "Sales Intelligence", "B2B Data Enrichment"],
    related: ["sales-intelligence", "abm-automation", "b2b-data-enrichment"],
    anchorTools: ["bombora", "six-sense", "demandbase"],
  },
  {
    slug: "abm-automation",
    keyword: "Best ABM Automation APIs",
    summary: "Top account-based marketing automation APIs for AI agents — ranked by capability coverage.",
    intro:
      "ABM automation coordinates ads, content, and outreach at named accounts. The right API lets your agent orchestrate the whole motion.",
    body:
      "Look for account-level targeting, engagement tracking, and CRM-synced workflows. MCP-ready platforms let your agent run ABM campaigns conversationally.",
    capabilities: ["ABM Automation", "Intent Intelligence", "Sales Intelligence", "Sales Automation"],
    related: ["intent-intelligence", "sales-intelligence", "sales-enablement"],
    anchorTools: ["demandbase", "six-sense", "databook"],
  },
]

export function getAllBestHubs(): BestHub[] {
  return bestHubs
}

export function getBestHubBySlug(slug: string): BestHub | undefined {
  return bestHubs.find((h) => h.slug === slug)
}

export function getAllBestHubSlugs(): string[] {
  return bestHubs.map((h) => h.slug)
}

export interface RankedTool extends SalesTool {
  capabilityMatches: string[]
  score: number
}

export async function getRankedToolsForHub(hub: BestHub): Promise<RankedTool[]> {
  const all = await getAllTools()
  const capNames = hub.capabilities.map((c) => c.toLowerCase())
  const seen = new Map<string, RankedTool>()

  const bySlug = new Map<string, SalesTool>(all.map((t) => [t.slug, t]))

  for (const capabilityName of hub.capabilities) {
    const tools = await getToolsByCapability(capabilityToSlug(capabilityName))
    for (const tool of tools) {
      const existing = seen.get(tool.slug)
      if (existing) {
        if (!existing.capabilityMatches.includes(capabilityName)) {
          existing.capabilityMatches.push(capabilityName)
        }
      } else {
        seen.set(tool.slug, {
          ...tool,
          capabilityMatches: [capabilityName],
          score: 0,
        })
      }
    }
  }

  // Force-include pinned anchor tools (even if tag matching missed them)
  for (const anchorSlug of hub.anchorTools) {
    const anchor = bySlug.get(anchorSlug)
    if (anchor && !seen.has(anchorSlug)) {
      seen.set(anchorSlug, {
        ...anchor,
        capabilityMatches: anchor.aiCapabilities.filter((c) =>
          capNames.includes(c.toLowerCase())
        ),
        score: 0,
      })
    }
  }

  const ranked: RankedTool[] = [...seen.values()]

  // Score: 10 pts per covered hub capability, +3 MCP ready, +2 free tier, +1 public API
  for (const tool of ranked) {
    tool.score =
      tool.capabilityMatches.length * 10 +
      (tool.mcpReady ? 3 : 0) +
      (tool.hasFreeTier ? 2 : 0) +
      (tool.hasPublicApi ? 1 : 0)
  }

  const isAnchor = new Set(hub.anchorTools)
  const anchors = ranked.filter((t) => isAnchor.has(t.slug))
  const rest = ranked
    .filter((t) => !isAnchor.has(t.slug))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      if (a.mcpReady !== b.mcpReady) return a.mcpReady ? -1 : 1
      if (a.hasFreeTier !== b.hasFreeTier) return a.hasFreeTier ? -1 : 1
      return a.name.localeCompare(b.name)
    })

  // Keep anchor order as authored; drop anchors that don't exist in data
  const orderedAnchors = hub.anchorTools
    .map((s) => anchors.find((a) => a.slug === s))
    .filter((t): t is RankedTool => Boolean(t))

  return [...orderedAnchors, ...rest]
}

/** Hubs a tool belongs to — via anchor pin, capability overlap, or loose tag match. Cheap, synchronous. */
export function getHubsForTool(tool: { slug: string; aiCapabilities?: string[] }): BestHub[] {
  const toolCaps = (tool.aiCapabilities ?? []).map((c) => c.toLowerCase())
  return bestHubs.filter((hub) => {
    if (hub.anchorTools.includes(tool.slug)) return true
    return hub.capabilities.some((cap) => {
      const target = cap.toLowerCase()
      return toolCaps.some((tc) => tc.includes(target) || target.includes(tc))
    })
  })
}
