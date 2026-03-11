import { getToolsByAuthMethod, getAllAuthMethods } from "@/lib/tools"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const dynamic = "force-static"

export async function generateStaticParams() {
  const methods = getAllAuthMethods()
  return methods.map((m) => ({
    type: m.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params
  const typeDisplay = type.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
  
  return {
    title: `Sales APIs with ${typeDisplay} Auth | Salestools Club`,
    description: `Browse all sales tools and APIs that support ${typeDisplay} authentication. Find the easiest tools to connect to your AI agent.`,
    alternates: {
      canonical: `https://salestools.club/auth/${type}`,
    },
  }
}

export default async function AuthMethodPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  const tools = await getToolsByAuthMethod(type)
  
  if (tools.length === 0) {
    notFound()
  }

  const typeDisplay = type.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-6 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4">Auth Directory</p>
          <h1 className="type-display mb-4 md:mb-6">{typeDisplay} APIs</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Connecting your AI agent? These tools use {typeDisplay} auth, making them easy to use with Claude Code and Gemini CLI.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  {t.mcpReady && (
                    <div className="tag-mcp">MCP READY</div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">{t.name}</h3>
                  <p className="text-[1rem] text-ink-fade leading-relaxed line-clamp-2 mb-6">
                    {t.oneLiner}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 items-center">
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-fade">{t.category}</span>
                  <div className="ml-auto flex gap-1">
                    {t.authMethod.map(m => (
                      <span key={m} className="font-mono text-[8px] border border-ink/10 px-1.5 py-0.5 rounded uppercase">{m}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
