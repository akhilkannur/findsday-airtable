import Link from "next/link"
import { ArrowRight, Calendar, Plus } from "lucide-react"
import { ToolLogo } from "@/components/ToolLogo"
import { getAllTools } from "@/lib/tools"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = "New Sales Tools Added in April 2026 | Salestools Club"
  const pageDescription = "Discover the new sales and GTM tools added to our directory in April 2026. Find APIs, MCP servers, and AI-native tools for your sales stack."

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: "https://salestools.club/new/april-2026",
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: "https://salestools.club/new/april-2026",
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

const aprilTools = [
  { slug: "heyreach", name: "HeyReach", oneLiner: "LinkedIn automation tool for agencies, sales teams, and GTM operators." },
  { slug: "enrow", name: "Enrow", oneLiner: "Email verification and validation API for B2B lead quality." },
  { slug: "scrupp", name: "Scrupp", oneLiner: "B2B data enrichment platform with 50+ attributes." },
  { slug: "interseller", name: "InterSellar", oneLiner: "AI-powered B2B prospecting and data enrichment platform." },
  { slug: "derrick", name: "Derrick", oneLiner: "B2B data enrichment platform for sales intelligence." },
  { slug: "mirrorprofiles", name: "MirrorProfiles", oneLiner: "LinkedIn profile data and enrichment API." },
  { slug: "brandfetch", name: "Brandfetch", oneLiner: "Company brand assets API for logos, colors, and brand data." },
  { slug: "companyenrich", name: "CompanyEnrich", oneLiner: "Company data enrichment API for B2B sales and prospecting." },
  { slug: "revsure", name: "RevSure", oneLiner: "AI-powered GTM platform with predictive and prescriptive models." },
  { slug: "openweb-ninja", name: "OpenWeb Ninja", oneLiner: "Real-time public data APIs for web scraping, search, and enrichment." },
  { slug: "parallel", name: "Parallel", oneLiner: "AI-powered parallel dialing and salesfloor orchestration." },
  { slug: "discolike", name: "DiscoLike", oneLiner: "AI-powered music marketing and data platform." },
  { slug: "bloomberry", name: "Bloomberry", oneLiner: "Email finder and verification with MCP server." },
  { slug: "blitz-api", name: "Blitz API", oneLiner: "Waterfall email finder and enrichment API." },
]

function ToolCard({ tool }: { tool: typeof aprilTools[0] }) {
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

export default function April2026Page() {
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
            New Sales Tools Added in April 2026
          </h1>
          <p className="text-lg text-ink-fade max-w-2xl">
            Discover the latest sales and GTM tools added to our directory. Find new APIs, MCP servers, and AI-native tools for your sales stack.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {aprilTools.map((tool) => (
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