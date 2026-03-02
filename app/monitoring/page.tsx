import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Monitoring | Salestools Club",
  description:
    "Tools we're monitoring for API documentation. If you know any of these tools have public APIs, let us know!",
  alternates: {
    canonical: "https://salestools.club/monitoring",
  },
}

export default function MonitoringPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-8 py-24 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-8">Monitoring</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6 mb-8">
            We're actively monitoring tools in the sales automation space to verify API availability.
          </p>

          <div className="bg-paper border border-ink/20 p-8">
            <h2 className="text-xl font-semibold mb-4">Know an API?</h2>
            <p className="text-ink-fade mb-6">
              If you know any sales tool that has public API documentation that we might be missing, we'd love to know!
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
    </div>
  )
}
