import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { ToolLogo } from "@/components/ToolLogo"
import { getAllTools } from "@/lib/tools"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = "New Sales Tools Added in June 2026 | Salestools Club"
  const pageDescription = "Discover the new sales and GTM tools added to our directory in June 2026. Find APIs, MCP servers, and AI-native tools for your sales stack."

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: "https://salestools.club/new/june-2026",
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: "https://salestools.club/new/june-2026",
      images: [
        {
          url: "https://salestools.club/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Salestools Club",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@salestoolsclub",
      creator: "@salestoolsclub",
      title: pageTitle,
      description: pageDescription,
      images: ["https://salestools.club/opengraph-image"],
    },
  }
}

const juneTools = [
  { slug: "sales-crusader", name: "Sales Crusader", oneLiner: "Multi-channel GTM orchestration platform for LinkedIn, email, and enrichment." },
  { slug: "infonet", name: "Infonet", oneLiner: "LinkedIn automation with dedicated residential IPs and AI personalization." },
  { slug: "bereach", name: "BeReach", oneLiner: "Agentic API for LinkedIn outreach with native MCP support." },
  { slug: "cold-navigator", name: "Cold Navigator", oneLiner: "LinkedIn outreach automation API with multi-step campaigns and webhooks." },
  { slug: "summit53", name: "Summit53", oneLiner: "Revenue intelligence platform with 54 MCP tools for AI-assisted pipeline analysis." },
  { slug: "conduyt", name: "Conduyt", oneLiner: "AI-native CRM with 535 REST endpoints and 136 MCP tools for AI agents." },
  { slug: "studiomeyer", name: "StudioMeyer", oneLiner: "Headless MCP-native CRM with 34 tools for AI-driven contact management." },
  { slug: "cleanlist", name: "Cleanlist", oneLiner: "B2B data enrichment API using waterfall technology across 10+ providers." },
  { slug: "syncgtm", name: "Sync GTM", oneLiner: "GTM data platform with MCP server for enrichment, discovery, and buying signals." },
  { slug: "leadpipe", name: "Leadpipe", oneLiner: "Intent data and visitor identification platform with MCP server." },
  { slug: "enricher-io", name: "Enricher.io", oneLiner: "Data enrichment API for people, company, and technology data." },
  { slug: "ninjapear", name: "NinjaPear", oneLiner: "B2B company intelligence API for customers, competitors, and enrichment." },
  { slug: "enrichmentapi", name: "EnrichmentAPI", oneLiner: "B2B data enrichment REST API for company and employee information." },
]

function ToolCard({ tool }: { tool: typeof juneTools[0] }) {
  return (
    <Link
      href={`/apis/${tool.slug}`}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <ToolLogo name={tool.name} websiteUrl={`/apis/${tool.slug}`} />
        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="font-serif text-xl mb-3 group-hover:underline">{tool.name}</h3>
      <p className="text-sm text-ink-fade leading-relaxed">{tool.oneLiner}</p>
    </Link>
  )
}

export default function June2026Page() {
  const tools = getAllTools()

  return (
    <main className="py-10 md:py-16">
      <div className="layout-container">
        <header className="mb-12 md:mb-20">
          <Link
            href="/new"
            className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-6 inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Directory Updates
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">
            New Sales Tools Added in June 2026
          </h1>
          <p className="text-lg text-ink-fade max-w-2xl">
            Discover the latest sales and GTM tools added to our directory. Find new APIs, MCP servers, and AI-native tools for your sales stack.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {juneTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/new/may-2026"
            className="inline-flex items-center gap-2 font-serif italic text-xl border-b border-black hover:opacity-60 transition-opacity pb-1"
          >
            May 2026 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
