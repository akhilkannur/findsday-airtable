import type { Metadata } from "next"
import { getToolsWithoutDocs } from "@/lib/tools"
import { MonitoringFilterBar } from "@/components/MonitoringFilterBar"

export const metadata: Metadata = {
  title: "Monitoring | Salestools Club",
  description:
    "Tools we're monitoring for API documentation. If you know any of these tools have public APIs, let us know!",
  alternates: {
    canonical: "https://salestools.club/monitoring",
  },
  openGraph: {
    title: "Monitoring | Salestools Club",
    description: "Tools we're monitoring for API documentation. If you know any of these tools have public APIs, let us know!",
    type: "website",
    url: "https://salestools.club/monitoring",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monitoring | Salestools Club",
    description: "Tools we're monitoring for API documentation. If you know any of these tools have public APIs, let us know!",
  },
}

export default async function MonitoringPage() {
  const tools = await getToolsWithoutDocs()

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-6 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-4 md:mb-6">Monitoring</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            We're actively monitoring tools in the sales automation space to verify API availability. These tools exist but we haven't yet confirmed public API documentation.
          </p>
        </div>
      </section>

      <div className="border-b border-ink/10 py-3">
        <div className="layout-container flex items-center gap-2 font-mono text-[0.7rem] text-ink-fade">
          <span>Know an API?</span>
          <a
            href="mailto:akhil@salestools.club?subject=API Documentation Update"
            className="underline hover:text-ink transition-colors"
          >
            akhil@salestools.club
          </a>
        </div>
      </div>

      <MonitoringFilterBar tools={tools.map(t => ({ slug: t.slug, name: t.name }))} />
    </div>
  )
}
