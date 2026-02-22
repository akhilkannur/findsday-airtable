import { tools } from "./data"
import type { SalesTool } from "./types"

export interface WorkflowStep {
  step: string
  toolSlug: string
  description: string
}

export interface Stack {
  slug: string
  name: string
  tagline: string
  description: string
  toolSlugs: string[]
  workflow: WorkflowStep[]
}

const stacks: Stack[] = [
  {
    slug: "cold-outreach-stack",
    name: "The Cold Outreach Stack",
    tagline: "Find prospects, verify emails, and launch personalized cold campaigns on autopilot.",
    description:
      "This is the classic outbound pipeline. Start by finding your ICP in a massive B2B database, verify their email addresses so nothing bounces, then launch a multi-step cold email sequence with inbox warmup built in. Every step feeds the next — no manual CSV uploads, no guessing.",
    toolSlugs: ["apollo", "hunter", "instantly", "cal-com"],
    workflow: [
      {
        step: "Build your prospect list",
        toolSlug: "apollo",
        description: "Search Apollo's 275M+ contact database by title, industry, and company size to build a targeted lead list.",
      },
      {
        step: "Find & verify emails",
        toolSlug: "hunter",
        description: "Run each prospect through Hunter to find verified professional emails and check deliverability.",
      },
      {
        step: "Launch cold email sequence",
        toolSlug: "instantly",
        description: "Push verified leads into Instantly to run multi-step email sequences with automatic inbox warmup.",
      },
      {
        step: "Book meetings from replies",
        toolSlug: "cal-com",
        description: "Include Cal.com scheduling links in your emails so warm replies convert directly into booked calls.",
      },
    ],
  },
  {
    slug: "inbound-lead-machine",
    name: "The Inbound Lead Machine",
    tagline: "Capture, enrich, and route inbound leads into your CRM without lifting a finger.",
    description:
      "When leads come to you, speed matters. This stack captures inbound leads through scheduling, instantly enriches them with firmographic data, pushes them into your CRM with full context, and connects your tools with workflow automation. The faster you respond with context, the higher your close rate.",
    toolSlugs: ["calendly", "clearbit", "hubspot", "zapier"],
    workflow: [
      {
        step: "Capture the lead",
        toolSlug: "calendly",
        description: "Prospects book a meeting through Calendly, triggering a webhook with their name, email, and company.",
      },
      {
        step: "Enrich the record",
        toolSlug: "clearbit",
        description: "Pass the email to Clearbit to pull company size, funding, industry, and tech stack in real time.",
      },
      {
        step: "Create the CRM record",
        toolSlug: "hubspot",
        description: "Push the enriched lead into HubSpot as a new contact with all firmographic fields pre-filled.",
      },
      {
        step: "Automate the glue",
        toolSlug: "zapier",
        description: "Wire everything together with Zapier — trigger Slack alerts, assign reps, and update lead scores automatically.",
      },
    ],
  },
  {
    slug: "ai-sdr-stack",
    name: "The AI SDR Stack",
    tagline: "An autonomous SDR pipeline — from research to booked meeting — powered by AI agents.",
    description:
      "Replace repetitive SDR tasks with an AI-driven pipeline. Use web research to find ideal prospects, enrich them with waterfall data, launch personalized multichannel outreach, and let an AI voice agent handle the qualification call. This is the closest thing to a fully autonomous top-of-funnel.",
    toolSlugs: ["exa-ai", "clay", "lemlist", "vapi"],
    workflow: [
      {
        step: "Research target accounts",
        toolSlug: "exa-ai",
        description: "Use Exa's AI-native search to discover companies matching your ICP that traditional databases miss.",
      },
      {
        step: "Waterfall enrich contacts",
        toolSlug: "clay",
        description: "Run prospects through Clay's 100+ data providers to get verified emails, LinkedIn URLs, and intent signals.",
      },
      {
        step: "Launch multichannel outreach",
        toolSlug: "lemlist",
        description: "Push enriched leads into lemlist for personalized email + LinkedIn sequences with AI-generated icebreakers.",
      },
      {
        step: "AI qualification call",
        toolSlug: "vapi",
        description: "When prospects engage, trigger a Vapi voice agent to handle the qualification call and book the meeting.",
      },
    ],
  },
  {
    slug: "deal-closer-stack",
    name: "The Deal Closer Stack",
    tagline: "Manage pipeline, send proposals, and get signatures — all from one workflow.",
    description:
      "Once a deal is in play, you need to move fast. This stack keeps your CRM pipeline updated, generates branded proposals in one click, records calls for coaching, and books follow-up meetings without the email ping-pong. It's the stack that turns 'interested' into 'signed'.",
    toolSlugs: ["pipedrive", "pandadoc", "gong", "cal-com"],
    workflow: [
      {
        step: "Manage the deal pipeline",
        toolSlug: "pipedrive",
        description: "Track deal stages, log activities, and move opportunities through your pipeline in Pipedrive.",
      },
      {
        step: "Generate & send proposal",
        toolSlug: "pandadoc",
        description: "Auto-generate a branded proposal from CRM data using PandaDoc and send it for e-signature.",
      },
      {
        step: "Analyze sales conversations",
        toolSlug: "gong",
        description: "Record and analyze every call with Gong to surface objections, sentiment, and coaching moments.",
      },
      {
        step: "Book next steps",
        toolSlug: "cal-com",
        description: "Share Cal.com links in proposals and emails so prospects book follow-ups without back-and-forth.",
      },
    ],
  },
  {
    slug: "revenue-intelligence-stack",
    name: "The Revenue Intelligence Stack",
    tagline: "Record every call, analyze every deal, and forecast revenue with AI-powered insights.",
    description:
      "Revenue intelligence is about seeing what's really happening in your pipeline — not just what reps enter in the CRM. This stack records and transcribes every sales conversation, analyzes deal health and sentiment, syncs insights back to your CRM, and surfaces product-qualified leads from usage data.",
    toolSlugs: ["fireflies", "gong", "hubspot", "journy"],
    workflow: [
      {
        step: "Record & transcribe calls",
        toolSlug: "fireflies",
        description: "Fireflies automatically joins meetings to transcribe, summarize, and extract action items from every call.",
      },
      {
        step: "Analyze deal sentiment",
        toolSlug: "gong",
        description: "Feed call data into Gong to track competitor mentions, objection patterns, and deal momentum.",
      },
      {
        step: "Sync insights to CRM",
        toolSlug: "hubspot",
        description: "Push conversation insights and deal scores into HubSpot so every rep has context before their next call.",
      },
      {
        step: "Identify product-qualified leads",
        toolSlug: "journy",
        description: "Use Journy.io to monitor product usage signals and flag users ready for an upsell conversation.",
      },
    ],
  },
  {
    slug: "full-cycle-ae-stack",
    name: "The Full-Cycle AE Stack",
    tagline: "One stack for the rep who prospects, demos, and closes — from first touch to signed deal.",
    description:
      "Full-cycle AEs do it all. This stack covers the entire journey: find prospects and get their contact info, run personalized outreach sequences, manage deals in a modern CRM, create interactive sales rooms for buyers, and close with e-signatures. Everything an AE needs in one connected workflow.",
    toolSlugs: ["apollo", "smartlead", "attio", "journey", "pandadoc"],
    workflow: [
      {
        step: "Find & enrich prospects",
        toolSlug: "apollo",
        description: "Search Apollo for decision-makers at target accounts and pull verified emails and direct dials.",
      },
      {
        step: "Run outbound sequences",
        toolSlug: "smartlead",
        description: "Push prospects into Smartlead for AI-optimized cold email campaigns with deliverability built in.",
      },
      {
        step: "Manage deals in CRM",
        toolSlug: "attio",
        description: "Track every deal, log interactions, and manage your pipeline in Attio's modern, flexible CRM.",
      },
      {
        step: "Create buyer sales room",
        toolSlug: "journey",
        description: "Build a personalized Journey.io sales room with proposals, case studies, and demo recordings.",
      },
      {
        step: "Close with e-signature",
        toolSlug: "pandadoc",
        description: "Generate the final contract in PandaDoc and collect signatures without leaving the sales room.",
      },
    ],
  },
  {
    slug: "linkedin-prospecting-stack",
    name: "The LinkedIn Prospecting Stack",
    tagline: "Extract, enrich, and engage LinkedIn prospects at scale with AI automation.",
    description:
      "LinkedIn is still the #1 source for B2B leads, but manual prospecting doesn't scale. This stack extracts structured data from LinkedIn profiles, enriches contacts with verified emails and phone numbers, automates connection requests and DM sequences, and syncs everything into your CRM.",
    toolSlugs: ["proxycurl", "kaspr", "aimfox", "folk"],
    workflow: [
      {
        step: "Extract LinkedIn data",
        toolSlug: "proxycurl",
        description: "Use Proxycurl to pull structured profile data — job titles, work history, and company info — from LinkedIn URLs.",
      },
      {
        step: "Get contact details",
        toolSlug: "kaspr",
        description: "Pass LinkedIn URLs to Kaspr to retrieve verified email addresses and mobile phone numbers.",
      },
      {
        step: "Automate LinkedIn outreach",
        toolSlug: "aimfox",
        description: "Launch automated connection requests and DM sequences through AimFox to warm up prospects.",
      },
      {
        step: "Sync to CRM",
        toolSlug: "folk",
        description: "Push all enriched prospect data into Folk CRM to manage relationships and track pipeline.",
      },
    ],
  },
]

export function getAllStacks(): Stack[] {
  return stacks
}

export function getStackBySlug(slug: string): Stack | undefined {
  return stacks.find((s) => s.slug === slug)
}

export function getStackSlugs(): string[] {
  return stacks.map((s) => s.slug)
}

export function getToolsForStack(stack: Stack): SalesTool[] {
  return stack.toolSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is SalesTool => t !== undefined)
}
