import { tools } from "./data"
import type { SalesTool, ToolCategory } from "./types"

export interface Guide {
  slug: string
  title: string
  metaDescription: string
  intro: string
  content?: string
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
    slug: "best-lead-enrichment-apis",
    title: "Best Lead Enrichment APIs for 2026",
    metaDescription:
      "Stop wasting time on manual research. Compare the top 15+ lead enhancement APIs, learn about Waterfall Enrichment, and plug your CRM into real-time B2B intelligence.",
    intro:
      "In 2026, manual prospecting is a legacy process. High-performance sales teams use Lead Enhancement APIs to automate the transformation of raw data points into 360-degree buyer profiles. This guide reverse-engineers the top-performing stacks to show you how to build a real-time intelligence engine using our directory's top-vetted APIs.",
    content: `
<h2>What is a Lead Enhancement API?</h2>
<p>A Lead Enhancement API is a RESTful gateway that connects your CRM or AI agents to multi-source B2B databases. It automates the research that previously took SDRs hours—pulling LinkedIn profiles, identifying tech stacks, and verifying direct dials in milliseconds.</p>

<h3>Enrichment vs. Validation vs. Verification</h3>
<ul>
  <li><strong><a href="/categories/sales-intelligence">Lead Enrichment</a>:</strong> Appending missing context like job titles, company revenue, and funding history.</li>
  <li><strong><a href="/categories/sales-intelligence">Lead Validation</a>:</strong> Filtering leads based on ICP fit (e.g., tools like <strong><a href="/apis/saleshunt-ai">Saleshunt AI</a></strong> checking if a company is in a target industry).</li>
  <li><strong><a href="/categories/sales-intelligence">Lead Verification</a>:</strong> Confirming deliverability. Tools like <strong><a href="/apis/neverbounce">Neverbounce</a></strong> or <strong><a href="/apis/zerobounce">ZeroBounce</a></strong> ensure you don't burn your domain reputation on stale emails.</li>
</ul>

<h2>The 4-Phase Technical Data Flow</h2>
<p>Modern APIs follow a standardized <strong>Identity Resolution</strong> cycle to ensure data accuracy:</p>
<ol>
  <li><strong>Input:</strong> Seeding the request with a "key" (Email, Domain, Phone, or LinkedIn URL).</li>
  <li><strong>Matching:</strong> Searching across public registries, social profiles, and third-party databases.</li>
  <li><strong>Appending:</strong> Attaching <strong>Firmographics</strong> (Revenue, Size), <strong>Technographics</strong> (Software Stack), and <strong>Intent Signals</strong> (Company surges).</li>
  <li><strong>Output:</strong> Delivering a structured <strong>JSON</strong> response that maps directly to CRM fields or agent memory.</li>
</ol>

<h2>Top Lead Enrichment APIs Compared (2026 Edition)</h2>
<p>Based on our directory data, here is the consensus on the best "Lego blocks" for your sales stack:</p>

<table>
  <thead>
    <tr>
      <th>Tool</th>
      <th>Primary Category</th>
      <th>Key Differentiator</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/apis/apollo"><strong>Apollo.io</strong></a></td>
      <td>Intelligence</td>
      <td>700M+ contacts with built-in sequences and AI lead scoring.</td>
    </tr>
    <tr>
      <td><a href="/apis/zoominfo"><strong>ZoomInfo</strong></a></td>
      <td>Intelligence</td>
      <td>Enterprise-grade accuracy for intent signals and technographics.</td>
    </tr>
    <tr>
      <td><a href="/apis/uplead"><strong>UpLead</strong></a></td>
      <td>Intelligence</td>
      <td>95% accuracy guarantee for real-time mobile/email verification.</td>
    </tr>
    <tr>
      <td><a href="/apis/rocketreach"><strong>RocketReach</strong></a></td>
      <td>Intelligence</td>
      <td>The "search anything" API for finding enterprise decision-makers.</td>
    </tr>
    <tr>
      <td><a href="/apis/cognism"><strong>Cognism</strong></a></td>
      <td>Intelligence</td>
      <td>GDPR-compliant mobile numbers for high-velocity European GTM.</td>
    </tr>
    <tr>
      <td><a href="/apis/cufinder"><strong>CUFinder</strong></a></td>
      <td>Intelligence</td>
      <td>20+ granular REST endpoints for custom AI agent builders.</td>
    </tr>
    <tr>
      <td><a href="/apis/fullcontact"><strong>FullContact</strong></a></td>
      <td>Intelligence</td>
      <td>Specializes in <strong>Identity Resolution</strong> across social and professional IDs.</td>
    </tr>
    <tr>
      <td><a href="/apis/dealfront"><strong>Dealfront</strong></a></td>
      <td>Intelligence</td>
      <td>European visitor tracking combined with B2B prospecting data.</td>
    </tr>
  </tbody>
</table>

<h2>Cross-Category Automation: Connecting Data to Action</h2>
<p>Enriched data must trigger a workflow across <a href="/categories/sales-engagement">Engagement</a> and <a href="/categories/sales-enablement">Enablement</a>:</p>

<h3>1. Automated Outreach (Engagement)</h3>
<p>Once <strong><a href="/apis/uplead">UpLead</a></strong> finds a target, tools like <strong><a href="/apis/instantly">Instantly</a></strong> or <strong><a href="/apis/reply-io">Reply.io</a></strong> can automatically enroll them in a sequence. If you're building agentic SDRs, <strong><a href="/apis/jason-reply">Jason AI</a></strong> uses enriched context to personalize every email.</p>

<h3>2. Call Preparation (Enablement)</h3>
<p>Feed technographic data into <strong><a href="/apis/docket-ai">DocketAI</a></strong> or <strong><a href="/apis/dealcode-ai">Dealcode AI</a></strong>. This gives your reps a cheat sheet of the prospect's current tools and competitors before they even dial.</p>

<h3>3. Fraud Prevention & KYC</h3>
<p>Identity APIs like <strong><a href="/apis/fullcontact">FullContact</a></strong> or <strong><a href="/apis/pipl">Pipl</a></strong> serve a dual purpose: they verify a signup is a real human and check for business legitimacy, critical for fintech and enterprise security.</p>

<h2>Modern Agentic Implementation (Claude/Cursor Workflow)</h2>
<p>Writing boilerplate API code is obsolete. <strong>AI-Native Operators</strong> now implement enrichment in minutes:</p>
<ol>
  <li><strong>Find the Endpoint:</strong> (e.g., UpLead's <code>/person/enrich</code>).</li>
  <li><strong>Prompt the Agent:</strong> Provide the docs to Claude/Cursor.</li>
  <li><strong>Execution Example:</strong> <em>"Claude, write a script using the CUFinder API to take a list of emails, enrich them with LinkedIn URLs and company funding data, and save the results to a CSV."</em></li>
</ol>

<p>This allows for <strong>Waterfall Enrichment</strong>: automatically falling back from <strong>Apollo</strong> to <strong>Lusha</strong> if a mobile number is missing, ensuring 100% data coverage.</p>

<h2>FAQ</h2>
<p><strong>Q: Is the data GDPR/CCPA compliant?</strong><br>A: Providers like <strong>Cognism</strong> and <strong>Kaspr</strong> specialize in EU-compliant data collection.</p>
<p><strong>Q: Can I enrich phone numbers?</strong><br>A: Yes. Use a Reverse Phone API (like <strong><a href="/apis/trestle">Trestle</a></strong>) to identify anonymous callers or filter out VoIP numbers.</p>
<p><strong>Q: What format is the data returned in?</strong><br>A: Almost all modern providers return <strong>JSON</strong>, making it easy to map to Salesforce, HubSpot, or custom AI tools via webhooks.</p>

<h2>Conclusion</h2>
<p>Lead Enhancement APIs are the foundation of the modern sales stack. By automating research across <strong>Sales Intelligence</strong>, <strong>Engagement</strong>, and <strong>Enablement</strong> categories, you remove the "manual grind" and allow your team to focus on closing. Explore our directory to find the specific "Lego block" for your 2026 strategy.</p>
    `,
    categories: ["Sales Intelligence"],
    keywords: ["enrichment", "waterfall", "contact data", "b2b data"],
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
