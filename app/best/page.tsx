import type { Metadata } from "next"
import Link from "next/link"
import { getAllBestHubs } from "@/lib/best"
import { ArrowRight, Zap, BadgeCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Best Sales APIs & MCP Servers by Category | Salestools Club",
  description:
    "Ranked best-of guides for every sales software category — AI SDRs, B2B data enrichment, conversation intelligence, revenue intelligence, CRM & RevOps, and more. Compare APIs, MCP support, free tiers, and capabilities for AI-native sales stacks.",
  alternates: { canonical: "https://salestools.club/best" },
  openGraph: {
    title: "Best Sales Tools by Category | Salestools Club",
    description:
      "Independent, ranked best-of guides for AI-native sales teams. Compare verified APIs, MCP servers, free tiers, and capabilities across every GTM category.",
    type: "website",
    url: "https://salestools.club/best",
  },
}

export default function BestIndexPage() {
  const hubs = getAllBestHubs()
  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-4 py-12 md:px-8 md:py-20 border-b border-ink relative overflow-hidden">
        <div className="layout-container">
          <div className="font-mono text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] mb-6 flex items-center gap-4 text-ink-fade">
            <span className="circled font-bold text-black">Best</span>
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-status-blink"></div>
            <span>Ranked by Category</span>
          </div>
          <h1 className="type-display mb-6 text-4xl md:text-6xl">Best Sales Tools, by Category</h1>
          <p className="text-lg md:text-xl text-ink-fade max-w-2xl leading-relaxed">
            Independent, ranked best-of guides for every go-to-market category — from
            AI SDRs and data enrichment to CRM &amp; RevOps and conversation intelligence.
            Each guide ranks tools on verified API access, MCP support, free tiers, and
            capability coverage — built for AI-native operators.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/best/${hub.slug}`}
                className="group border border-ink/20 p-6 md:p-8 flex flex-col gap-4 hover:border-ink transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink-fade">
                    Best of
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="text-2xl font-semibold leading-snug">{hub.keyword}</h2>
                <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-3">
                  {hub.summary}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {hub.mcpOnly && (
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full inline-flex items-center gap-1">
                      <Zap className="w-3 h-3" /> MCP
                    </span>
                  )}
                  {hub.freeTierOnly && (
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full inline-flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3" /> Free Tier
                    </span>
                  )}
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full">
                    Verified Data
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}