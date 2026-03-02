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

export default async function MonitoringPage() {
  const tools = await getToolsWithoutDocs()

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-8 py-24 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-8">Monitoring</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6 mb-8">
            We're actively monitoring tools in the sales automation space to verify API availability. These tools exist but we haven't yet confirmed public API documentation.
          </p>

          <div className="bg-paper border border-ink/20 p-8">
            <h2 className="text-xl font-semibold mb-4">Know an API?</h2>
            <p className="text-ink-fade mb-6">
              If you know any of these tools have public API documentation, please reach out!
            </p>
            <a
              href="mailto:akhil@salestools.club?subject=API Documentation Update"
              className="inline-flex items-center gap-2 text-lg font-medium text-ink hover:text-black transition-colors underline decoration-ink/30 hover:decoration-ink"
            >
              akhil@salestools.club
            </a>
          </div>
        </div>
      </section>

      <section className="px-8 py-16">
        <div className="layout-container">
          {tools.length === 0 ? (
            <p className="text-ink-fade">No tools currently being monitored.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {tools.map((tool) => (
                <div
                  key={tool.slug}
                  className="flex items-center gap-3 p-4 bg-paper-dark/40 border border-ink/10 hover:border-ink/30 transition-colors"
                >
                  <div className="w-8 h-8 bg-ink text-paper flex items-center justify-center font-serif font-bold text-sm [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
                    {tool.name.charAt(0)}
                  </div>
                  <span className="font-medium text-sm">{tool.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
