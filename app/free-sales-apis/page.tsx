import { getFreeTierTools } from "@/lib/tools"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Sales APIs for AI Agents | Salestools Club",
  description: "A handpicked list of sales APIs and tools with free tiers. Build and test your autonomous sales workflows without a credit card.",
  alternates: {
    canonical: "https://salestools.club/free-sales-apis",
  },
}

export default async function FreeTierPage() {
  const tools = await getFreeTierTools()

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-6 md:px-8 py-12 md:py-16 border-b border-ink bg-paper-dark/20">
        <div className="layout-container">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4">Value Hub</p>
          <h1 className="type-display mb-4 md:mb-6">Free Sales APIs</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Test and build your workflows for $0. These tools offer free tiers or free credits for AI-native operators.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/apis/${t.slug}`}
                className="tool-card group flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {t.mcpReady && (
                      <div className="tag-mcp">MCP READY</div>
                    )}
                    <div className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-green-600/30 text-green-700 bg-green-50 rounded-full">
                      Free Tier
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">{t.name}</h3>
                  <p className="text-[1rem] text-ink-fade leading-relaxed line-clamp-2 mb-6">
                    {t.oneLiner}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 items-center">
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-fade">{t.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
