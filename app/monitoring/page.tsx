import type { Metadata } from "next"
import Link from "next/link"
import { getToolsWithoutDocs } from "@/lib/tools"

export const metadata: Metadata = {
  title: "Monitoring | Salestools Club",
  description:
    "Tools we're monitoring for API documentation. If you know any of these tools have public APIs, let us know!",
  alternates: {
    canonical: "https://salestools.club/monitoring",
  },
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
          {tool.name.charAt(0)}
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
        <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-3 mb-4">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 items-center border-t border-dashed border-black/10 pt-4">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-fade group-hover:text-black transition-colors">
          {tool.category}
        </span>
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full group-hover:border-ink transition-colors">
          No Docs
        </span>
      </div>
    </Link>
  )
}

export default async function MonitoringPage() {
  const tools = await getToolsWithoutDocs()

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-8 py-24 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-8">Monitoring</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            Tools we're actively monitoring for API documentation. We've verified these tools exist but haven't yet found public API docs.
          </p>
        </div>
      </section>

      <section className="px-8 py-16">
        <div className="layout-container">
          <div className="bg-paper border border-ink/20 p-6 mb-12">
            <h2 className="text-lg font-semibold mb-3">Know an API?</h2>
            <p className="text-ink-fade mb-4">
              If you know any of these tools have public API documentation, please let us know!
            </p>
            <a
              href="mailto:akhil@salestools.club"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-black transition-colors underline decoration-ink/30 hover:decoration-ink"
            >
              akhil@salestools.club
            </a>
          </div>

          {tools.length === 0 ? (
            <p className="text-ink-fade">No tools currently being monitored.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
