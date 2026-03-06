import type { Metadata } from "next"
import Link from "next/link"
import { getAllGuides } from "@/lib/guides"

export const metadata: Metadata = {
  title: "API Guides for AI Agents | Salestools Club",
  description:
    "Deep-dive guides to sales APIs for AI agents. Compare CRM, cold email, enrichment, and more — with API specs, SDKs, and MCP readiness.",
}

export default function GuidesPage() {
  const guides = getAllGuides()

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-8 py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <h1 className="type-display mb-8">API Guides for AI Agents</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            Deep-dive guides to sales APIs. Compare API types, auth methods, SDKs, webhooks, and MCP readiness — all the specs you need to build AI agents.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col h-full p-8 border border-ink/10 hover:border-ink/30 transition-all bg-paper"
              >
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-4 group-hover:underline underline-offset-4">
                    {guide.title}
                  </h3>
                  <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-3">
                    {guide.intro}
                  </p>
                </div>
                <div className="mt-8 font-mono text-[0.75rem] uppercase tracking-widest text-ink-fade group-hover:text-ink transition-colors">
                  View Guide →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
