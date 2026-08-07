import { getMcpTools } from "@/lib/tools"

export interface AnswerSection {
  heading: string
  body: string
}

export interface AnswerArticle {
  slug: string
  /** The keyword this article targets (H1 + title) */
  keyword: string
  /** SEO meta description */
  summary: string
  /** Short subtitle under the H1 */
  subtitle: string
  /** Hero paragraph — the direct answer to the query */
  answer: string
  sections: AnswerSection[]
  /** FAQ items (also emitted as FAQPage schema) */
  faq: { question: string; answer: string }[]
  /** Related article slugs for internal cross-linking */
  related?: string[]
}

const mcpAnswer: AnswerArticle = {
  slug: "what-is-an-mcp-server",
  keyword: "What Is an MCP Server?",
  summary:
    "MCP (Model Context Protocol) servers connect AI assistants to external tools and data. Learn how they work, why they matter for sales, and the best MCP servers to start with.",
  subtitle: "The Model Context Protocol, explained for people who'd rather copy a config than read a spec.",
  answer:
    "An MCP server is a small program that gives an AI assistant (like Claude or Cursor) access to a real tool or data source. Instead of building a custom integration for every app, MCP is one standard: the AI speaks MCP, the server translates it into the app's API, and the app responds. For sales teams, that means your AI can query a CRM, enrich a lead, or book a meeting — by pointing it at the right MCP server.",
  sections: [
    {
      heading: "Why MCP matters for sales",
      body:
        "Before MCP, wiring an AI assistant to your stack meant one-off integrations per tool. MCP standardizes it: one protocol, hundreds of ready-made servers. An AI-native operator can connect Claude to Salesforce, Apollo, or their dialer in minutes by pasting a server config — no custom code. That's why 'MCP-ready' has become a meaningful filter for sales software: it tells you how easy the tool is for an AI to drive.",
    },
    {
      heading: "How an MCP server works",
      body:
        "The AI client (Claude Code, Cursor, or another MCP host) launches the server and asks it what capabilities it exposes — tools, resources, and prompts. Each tool is a function the server calls on your behalf: search contacts, create a record, trigger a sequence. The server handles authentication and API calls, and returns structured results the AI can reason over. You typically configure it once with a JSON block like the ones on this site.",
    },
    {
      heading: "MCP servers vs. plain APIs",
      body:
        "A plain API is a manual integration: you read docs, write code, manage auth. An MCP server is that same API, pre-wrapped so an AI can use it through one standard interface. If a tool has an MCP server, an AI can usually start using it without custom code — that's the 'AI difficulty' signal we track. Every tool below has MCP support or a documented API you can wire up yourself.",
    },
    {
      heading: "How to start using MCP in sales",
      body:
        "Pick one tool you already use, find its MCP server config, and paste it into your AI client. Start small: read data (search your CRM, look up a lead) before you write (create records, send messages). Once that works, chain servers together — enrichment pulls a verified email, your outreach server sends it, your conversation-intelligence server logs the reply. The pages in this directory give you the copy-paste config for each tool.",
    },
  ],
  faq: [
    {
      question: "What does MCP stand for?",
      answer:
        "MCP stands for Model Context Protocol — an open standard from Anthropic that lets AI assistants connect to external tools and data through a common interface.",
    },
    {
      question: "Is MCP the same as an API?",
      answer:
        "No. An API is an interface you integrate with manually. An MCP server wraps a tool's API so an AI assistant can call it directly through the MCP protocol, usually with no custom code.",
    },
    {
      question: "Does every sales tool support MCP?",
      answer:
        "No. Some tools ship official MCP servers, some have community ones, and many only expose a REST API. On this site, tools with MCP support are marked with the Zap icon; the rest can still be connected through their documented API.",
    },
    {
      question: "What can an MCP server do for sales?",
      answer:
        "Anything the tool's API allows: prospect and enrich leads, manage CRM records, send sequences, book meetings, pull conversation intelligence, and more — orchestrated by your AI assistant.",
    },
  ],
  related: ["best-mcp-servers-for-sales", "mcp-vs-api"],
}

const bestMcpAnswer: AnswerArticle = {
  slug: "best-mcp-servers-for-sales",
  keyword: "Best MCP Servers for Sales",
  summary:
    "The best MCP servers for sales teams, ranked — CRM, enrichment, outreach, and scheduling tools your AI agent can drive through the Model Context Protocol.",
  subtitle: "Ready-made MCP servers your AI can drive today — from CRM to enrichment to outreach.",
  answer:
    "The best MCP servers for sales are the ones your AI agent can actually drive end-to-end: search your CRM, enrich a contact, send a sequence, and book a meeting. On this site, that means tools marked MCP-ready with a documented API. Below are the highest-value categories to wire up first, each pointing to a ranked best-of guide with copy-paste configs.",
  sections: [
    {
      heading: "CRM and RevOps MCP servers",
      body:
        "Start with the system of record. A CRM MCP server lets your agent search contacts, log activities, and update pipelines conversationally. Look for official MCP support plus webhooks so your agent sees changes in real time. HubSpot and Salesforce both ship native MCP tooling; Pipedrive exposes a comprehensive REST API you can wrap.",
    },
    {
      heading: "Enrichment and intelligence MCP servers",
      body:
        "Before outreach, your agent needs verified data. Enrichment MCP servers let it look up companies, find verified emails, and pull intent signals in natural language. Tools like Clay and Apollo.io wrap their enrichment APIs so your agent can enrich an entire list from a single prompt.",
    },
    {
      heading: "Outreach and scheduling MCP servers",
      body:
        "Scheduling and outreach servers let your agent own the follow-up loop: book meetings, send sequences, and react to replies via webhook events. Calendly and Cal.com both have strong APIs; outreach platforms expose sequence orchestration through REST endpoints your agent can call directly.",
    },
    {
      heading: "How to pick an MCP server",
      body:
        "Prioritize tools with official (not just community) MCP servers, a documented API, and webhook support. Check whether the server exposes read-only or read-write tools — start read-only. And confirm the tool's free tier covers your testing, so you can validate the integration before committing. The best-of guides below rank each category on exactly these signals.",
    },
  ],
  faq: [
    {
      question: "Which MCP servers are best for sales?",
      answer:
        "The most valuable ones are CRM servers (HubSpot, Salesforce), enrichment servers (Clay, Apollo), and scheduling/outreach servers (Calendly, Cal.com). Ranked guides for each are linked below.",
    },
    {
      question: "Are MCP servers free?",
      answer:
        "The servers themselves are usually free to run; you pay for the underlying tool's API usage. Many sales tools also have a free tier you can test with before upgrading.",
    },
    {
      question: "Do I need to write code to use an MCP server?",
      answer:
        "No. You paste a configuration block into your AI client (like Claude Code or Cursor), authenticate, and the AI can start using the tool. No custom code required.",
    },
  ],
  related: ["what-is-an-mcp-server", "mcp-vs-api"],
}

const mcpVsApiAnswer: AnswerArticle = {
  slug: "mcp-vs-api",
  keyword: "MCP vs API: What's the Difference?",
  summary:
    "MCP vs API explained for AI-native sales teams — when to use a Model Context Protocol server and when a plain REST API is the better choice.",
  subtitle: "The practical difference, and which to choose for your AI sales stack.",
  answer:
    "An API is an interface your code calls; MCP is a standard that lets an AI assistant call a tool's API automatically. When a tool ships an MCP server, an AI can use it with zero integration code. When it doesn't, your agent — or you — must call the REST API directly, which means reading docs and handling auth yourself.",
  sections: [
    {
      heading: "The core difference",
      body:
        "APIs are written for developers: you read documentation, build requests, and manage authentication. MCP is written for AI: the server encapsulates all of that, exposes tools in a schema the model understands, and lets the AI call them as functions. Same underlying tool, dramatically different setup effort.",
    },
    {
      heading: "When to use MCP",
      body:
        "Use MCP when a tool offers it and you want your AI to operate it directly — querying a CRM, enriching leads, or booking meetings from a prompt. It's the fastest path to an AI-native workflow and the lowest-maintenance option: the server handles API changes and auth for you.",
    },
    {
      heading: "When to use a plain API",
      body:
        "Use a plain API when you're writing deterministic code (a scheduled job, a webhook handler, a custom pipeline) rather than letting an AI improvise. APIs give you exact control over requests and responses. Most MCP servers are thin wrappers over the same REST endpoints, so the API is still there when you need it.",
    },
    {
      heading: "Which to choose for your stack",
      body:
        "For AI-driven workflows, prefer MCP-ready tools — the config is copy-paste and the AI can self-serve. For anything you want fully deterministic, keep the API in the loop. Many of the tools in this directory offer both: an MCP server for your agents and a full REST API for your code.",
    },
  ],
  faq: [
    {
      question: "Is MCP replacing APIs?",
      answer:
        "No. MCP is built on top of APIs — an MCP server wraps a tool's API. APIs remain the underlying integration point; MCP just makes them accessible to AI assistants without custom code.",
    },
    {
      question: "Can I use MCP and an API together?",
      answer:
        "Yes. Use the MCP server for AI-driven interactions and call the REST API directly for deterministic automation. They're complementary, not exclusive.",
    },
    {
      question: "Which is easier for an AI agent to use?",
      answer:
        "MCP, generally. The server pre-exposes tools in a schema the model can call directly, so there's no documentation parsing or auth wiring for the AI to do.",
    },
  ],
  related: ["what-is-an-mcp-server", "best-mcp-servers-for-sales"],
}

export const answerArticles: AnswerArticle[] = [mcpAnswer, bestMcpAnswer, mcpVsApiAnswer]

export function getAllAnswerArticles(): AnswerArticle[] {
  return answerArticles
}

export function getAnswerArticleBySlug(slug: string): AnswerArticle | undefined {
  return answerArticles.find((a) => a.slug === slug)
}

export function getAllAnswerSlugs(): string[] {
  return answerArticles.map((a) => a.slug)
}

/** Pull up to N MCP-ready tools as "getting started" links for an article. */
export async function getRecommendedTools(limit = 6): Promise<{ slug: string; name: string; href: string }[]> {
  const mcpTools = await getMcpTools()
  return mcpTools.slice(0, limit).map((t) => ({ slug: t.slug, name: t.name, href: `/apis/${t.slug}` }))
}