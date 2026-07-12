import type { Metadata } from "next"
import Link from "next/link"
import { getOpenSourceTools } from "@/lib/tools"
import { ToolLogo } from "@/components/ToolLogo"
import { GitHubStars } from "@/components/GitHubStars"

export const metadata: Metadata = {
  title: "Open Source Sales Tools | Salestools Club",
  description:
    "Open source sales tools and APIs you can self-host, fork, and inspect. Build your sales stack on transparent foundations.",
  alternates: {
    canonical: "https://salestools.club/open-source-sales-tools",
  },
  openGraph: {
    title: "Open Source Sales Tools | Salestools Club",
    description: "Open source sales tools and APIs you can self-host, fork, and inspect. Build your sales stack on transparent foundations.",
    type: "website",
    url: "https://salestools.club/open-source-sales-tools",
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
    site: "@salestoolsclub",
    creator: "@salestoolsclub",
    title: "Open Source Sales Tools | Salestools Club",
    description: "Open source sales tools and APIs you can self-host, fork, and inspect. Build your sales stack on transparent foundations.",
    images: ["https://salestools.club/opengraph-image"],
  },
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link
      href={`/open-source-sales-tools/${tool.slug}`}
      className="tool-card group flex h-full flex-col"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} size="sm" />
        {tool.mcpReady && <div className="tag-mcp">MCP READY</div>}
      </div>

      <div className="flex-grow">
        <h3 className="mb-2 text-[1rem] font-semibold leading-tight">{tool.name}</h3>
        <p className="mb-4 line-clamp-3 text-[0.9rem] leading-relaxed text-ink-fade">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-ink/10 pt-4">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-fade transition-colors group-hover:text-ink">
          {tool.category}
        </span>
        {tool.githubUrl && <GitHubStars githubUrl={tool.githubUrl} githubStars={tool.githubStars} />}
      </div>
    </Link>
  )
}

export default async function OpenSourcePage() {
  const tools = await getOpenSourceTools()

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <section className="border-b border-ink/10 px-4 py-12 md:px-8 md:py-16">
        <div className="layout-container">
          <h1 className="type-display mb-4 text-3xl md:mb-6 md:text-5xl lg:text-7xl">Open Source</h1>
          <p className="max-w-2xl border-l border-ink/10 pl-4 text-lg leading-relaxed text-ink-fade md:pl-6 md:text-xl">
            Sales tools you can self-host, fork, and inspect. Build your AI sales stack on transparent, open-source foundations.
          </p>

          <div className="mt-6 md:mt-10" />
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="layout-container">
          {tools.length < 5 && (
            <div className="mb-8 rounded-xl border border-ink/10 bg-white p-6 md:mb-12 md:p-8">
              <p className="text-base leading-relaxed text-ink-fade md:text-lg">
                We&apos;re still building out this collection.{" "}
                <Link
                  href="/submit"
                  className="text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink/60"
                >
                  Submit an open-source tool
                </Link>{" "}
                if we&apos;re missing something.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          {tools.length === 0 && (
            <div className="py-20 text-center opacity-60 text-xl md:py-32 md:text-2xl">
              No open-source tools indexed yet.
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white/45 py-12 md:py-24">
        <div className="layout-container">
          <div className="flex flex-wrap gap-3 border-t border-ink/10 pt-8 md:gap-4">
            <Link
              href="/api"
              className="rounded-md border border-ink/10 bg-white px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-fade transition-colors hover:text-ink"
            >
              All Tools
            </Link>
            <Link
              href="/mcp"
              className="rounded-md border border-ink/10 bg-white px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-fade transition-colors hover:text-ink"
            >
              MCP Servers
            </Link>
            <Link
              href="/submit"
              className="rounded-md border border-ink/10 bg-white px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-fade transition-colors hover:text-ink"
            >
              Submit a Tool
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
