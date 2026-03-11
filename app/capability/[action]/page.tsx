import { getToolsByCapability, getAllCapabilities } from "@/lib/tools"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const dynamic = "force-static"

export async function generateStaticParams() {
  const capabilities = getAllCapabilities()
  return capabilities.slice(0, 20).map((cap) => ({
    action: cap.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ action: string }> }): Promise<Metadata> {
  const { action } = await params
  const actionDisplay = action.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
  
  return {
    title: `Best Sales Tools for ${actionDisplay} | Salestools Club`,
    description: `Find the best AI-native APIs and tools for ${actionDisplay}. Discover how to automate your sales workflow with Claude and Gemini.`,
    alternates: {
      canonical: `https://salestools.club/capability/${action}`,
    },
  }
}

export default async function CapabilityPage({ params }: { params: Promise<{ action: string }> }) {
  const { action } = await params
  const tools = await getToolsByCapability(action)
  
  if (tools.length === 0) {
    notFound()
  }

  const actionDisplay = action.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-6 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4">Capability Hub</p>
          <h1 className="type-display mb-4 md:mb-6">{actionDisplay} APIs</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            APIs and tools for {actionDisplay.toLowerCase()}. Connect these to your AI agent to automate your prospecting and sales tasks.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((t) => (
              <div key={t.slug} className="tool-card flex flex-col h-full bg-paper">
                <Link href={`/apis/${t.slug}`} className="group block mb-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
                      {t.name.charAt(0)}
                    </div>
                    {t.mcpReady && (
                      <div className="tag-mcp">MCP READY</div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-2 group-hover:underline">{t.name}</h3>
                  <p className="text-[1rem] text-ink-fade leading-relaxed line-clamp-2">
                    {t.oneLiner}
                  </p>
                </Link>

                {t.starterPrompt && (
                  <div className="mb-6 p-4 bg-paper-dark/50 border border-ink/5 rounded font-mono text-[0.75rem] italic text-ink-fade">
                    "{t.starterPrompt}"
                  </div>
                )}

                <div className="mt-auto flex flex-wrap gap-2 items-center pt-4 border-t border-ink/5">
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-fade">{t.category}</span>
                  <Link href={`/apis/${t.slug}`} className="ml-auto font-mono text-[0.7rem] uppercase underline hover:no-underline">View API Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
