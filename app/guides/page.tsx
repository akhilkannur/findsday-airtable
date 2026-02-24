import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Guides | Salestools Club",
  description:
    "Practical guides for building with sales APIs, MCP servers, and AI agents.",
  alternates: {
    canonical: "https://salestools.club/guides",
  },
}

const guides = [
  {
    slug: "getting-started-with-ai-agents",
    title: "Getting Started with AI Agents for Sales",
    description: "Your first week building with Claude Code and sales APIs. No code required.",
    readTime: "15 min",
    level: "Beginner",
  },
]

export default function GuidesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-8 py-24 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-8">Guides</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            Practical guides for building sales workflows with AI agents. No fluff, no AI-sounding intros — just what works.
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
                className="group flex flex-col h-full gap-8 p-8 bg-paper-dark/60 hover:translate-y-[-4px] transition-all"
                style={{ border: "1px solid rgba(26, 25, 23, 0.15)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">
                    {guide.level}
                  </span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">
                    {guide.readTime}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8 mb-4">
                    {guide.title}
                  </h2>
                  <p className="text-[1rem] text-ink-fade leading-relaxed">
                    {guide.description}
                  </p>
                </div>

                <div className="mt-auto pt-8 flex items-center justify-between border-t border-dashed border-ink/20">
                  <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade group-hover:text-ink transition-colors">
                    Read Guide
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
