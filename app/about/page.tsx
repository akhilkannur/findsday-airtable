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
    <div className="flex flex-col">
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black">
        <Link
          href="/"
          className="type-label mb-12 inline-block opacity-40 hover:opacity-100 hover:underline"
        >
          &lt;- Back to System
        </Link>

        <h1 className="type-display mb-12">
          The New Sales Stack.
        </h1>
        <p className="max-w-2xl text-2xl font-medium opacity-60 leading-relaxed">
          Salestools Club is a curated directory of sales APIs, SDKs, and MCP servers built for the next generation of builders: <strong>AI-Native Operators.</strong>
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-ink-black border-b border-ink-black">
        <div className="p-12 space-y-8">
          <div className="flex h-12 w-12 items-center justify-center border border-ink-black bg-accent-blue font-bold text-xl">
            M
          </div>
          <h3 className="text-3xl font-bold tracking-tight">The Mission</h3>
          <p className="text-lg font-medium opacity-60 leading-relaxed">
            We believe the future of sales isn't just better software—it's software that talks to AI. We're here to help you find the "hands" for your AI agents.
          </p>
        </div>

        <div className="p-12 space-y-8">
          <div className="flex h-12 w-12 items-center justify-center border border-ink-black bg-accent-orange font-bold text-xl text-white">
            P
          </div>
          <h3 className="text-3xl font-bold tracking-tight">MCP-First</h3>
          <p className="text-lg font-medium opacity-60 leading-relaxed">
            We prioritize tools that support the Model Context Protocol (MCP), making it easier than ever to connect your CRM or prospecting tool to Claude and Cursor.
          </p>
        </div>
      </div>

      <section className="p-12 md:p-24 bg-white/40">
        <div className="max-w-3xl">
          <h2 className="type-display mb-12">Get in touch</h2>
          <p className="text-xl font-medium opacity-60 mb-12 leading-relaxed">
            Have a tool that should be here? Or just want to talk about AI-native sales workflows? Reach out to our primary node.
          </p>
          <a 
            href="mailto:akhil@salestools.club" 
            className="text-2xl font-bold underline underline-offset-8 decoration-2 hover:text-accent-orange"
          >
            akhil@salestools.club
          </a>
        </div>
      </section>
    </div>
  )
}
