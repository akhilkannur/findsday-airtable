import type { Metadata } from "next"
import Link from "next/link"
import { getAllGuides } from "@/lib/guides"

export const metadata: Metadata = {
  title: "API Guides for AI Agents | Salestools Club",
  description:
    "Deep-dive guides to sales APIs for AI agents. Compare CRM, cold email, enrichment, and more, including API specs, SDKs, and MCP readiness.",
  alternates: {
    canonical: "https://salestools.club/guides",
  },
  openGraph: {
    title: "API Guides for AI Agents | Salestools Club",
    description: "Deep-dive guides to sales APIs for AI agents. Compare CRM, cold email, enrichment, and more, including API specs, SDKs, and MCP readiness.",
    type: "website",
    url: "https://salestools.club/guides",
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
    title: "API Guides for AI Agents | Salestools Club",
    description: "Deep-dive guides to sales APIs for AI agents. Compare CRM, cold email, enrichment, and more, including API specs, SDKs, and MCP readiness.",
    images: ["https://salestools.club/opengraph-image"],
  },
}

export default function GuidesPage() {
  const guides = getAllGuides()

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-4 md:px-8 py-12 md:py-16 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <h1 className="type-display mb-4 md:mb-6 text-3xl md:text-5xl lg:text-7xl">API Guides for AI Agents</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Deep-dive guides to sales APIs. Compare API types, auth methods, SDKs, webhooks, and MCP readiness. Here are all the specs you need to build AI agents.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col h-full p-6 md:p-8 border border-ink/10 hover:border-ink/30 transition-all bg-paper"
              >
                <div className="flex-grow">
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 group-hover:underline underline-offset-4">
                    {guide.title}
                  </h3>
                  <p className="text-sm md:text-[0.9rem] text-ink-fade leading-relaxed line-clamp-3">
                    {guide.intro}
                  </p>
                </div>
                <div className="mt-6 md:mt-8 font-mono text-[0.7rem] md:text-[0.75rem] uppercase tracking-widest text-ink-fade group-hover:text-ink transition-colors">
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
