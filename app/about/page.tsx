import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About | Salestools Club",
  description: "Learn about Salestools Club, the directory for AI-native sales operators.",
  alternates: {
    canonical: "https://salestools.club/about",
  },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-8 py-24 border-b border-ink">
        <div className="layout-container">
          <Link
            href="/"
            className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all mb-12 inline-block"
          >
            &lt;- Back to Registry
          </Link>

          <h1 className="type-display mb-12">
            The New Sales Stack.
          </h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            Salestools Club is a curated directory of sales APIs, SDKs, and MCP servers built for the next generation of builders: <strong>AI-Native Operators.</strong>
          </p>
        </div>
      </section>

      <div className="layout-container grid grid-cols-1 md:grid-cols-2 divide-x divide-ink border-b border-ink bg-white/20">
        <div className="p-16 space-y-8">
          <div className="flex h-12 w-12 items-center justify-center bg-ink text-paper font-bold text-xl [clip-path:polygon(0%_0%,100%_5%,95%_100%,5%_95%)]">
            M
          </div>
          <h3 className="text-3xl font-bold uppercase underline decoration-ink/20 underline-offset-8">The Mission</h3>
          <p className="text-xl font-serif italic text-ink-fade leading-relaxed">
            We believe the future of sales isn't just better software—it's software that talks to AI. We're here to help you find the "hands" for your AI agents.
          </p>
        </div>

        <div className="p-16 space-y-8 bg-paper-dark/30">
          <div className="flex h-12 w-12 items-center justify-center bg-ink text-paper font-bold text-xl [clip-path:polygon(5%_5%,95%_0%,100%_95%,0%_100%)]">
            P
          </div>
          <h3 className="text-3xl font-bold uppercase underline decoration-ink/20 underline-offset-8">MCP-First</h3>
          <p className="text-xl font-serif italic text-ink-fade leading-relaxed">
            We prioritize tools that support the Model Context Protocol (MCP), making it easier than ever to connect your CRM or prospecting tool to Claude and Cursor.
          </p>
        </div>
      </div>

      <section className="py-24">
        <div className="layout-container">
          <div className="max-w-3xl">
            <h2 className="type-display mb-12">Get in touch</h2>
            <p className="text-xl font-serif italic text-ink-fade mb-12 leading-relaxed">
              Have a tool that should be here? Or just want to talk about AI-native sales workflows? Reach out to our primary node.
            </p>
            <a 
              href="mailto:akhil@salestools.club" 
              className="text-2xl font-bold underline underline-offset-8 decoration-2 hover:line-through transition-all"
            >
              akhil@salestools.club
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
