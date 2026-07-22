import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, PlugZap } from "lucide-react"
import { ToolLogo } from "@/components/ToolLogo"
import { getClaudePlugins, getToolHref } from "@/lib/tools"

export const metadata: Metadata = {
  title: "Claude Plugins for Sales & GTM | Salestools Club",
  description:
    "Discover Claude Code plugins for sales, marketing, RevOps, prospect research, outreach, and pipeline analysis. Open a plugin to see the install steps and starter prompt.",
  keywords: [
    "Claude plugins",
    "Claude Code plugins",
    "Claude sales plugin",
    "Claude marketing plugins",
    "Claude GTM plugins",
  ],
  alternates: { canonical: "https://salestools.club/claude-plugins" },
  openGraph: {
    title: "Claude Plugins for Sales & GTM",
    description: "Claude Code plugins that turn AI agents into sales, marketing, and RevOps specialists.",
    type: "website",
    url: "https://salestools.club/claude-plugins",
    images: ["https://salestools.club/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Plugins for Sales & GTM",
    description: "Claude Code plugins for sales, marketing, and RevOps workflows.",
    images: ["https://salestools.club/opengraph-image"],
  },
}

export default async function ClaudePluginsPage() {
  const plugins = await getClaudePlugins()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Claude Plugins for Sales & GTM",
    description: metadata.description,
    url: "https://salestools.club/claude-plugins",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: plugins.length,
      itemListElement: plugins.map((plugin, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: plugin.name,
        url: `https://salestools.club${getToolHref(plugin)}`,
      })),
    },
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-ink/10 px-4 py-12 md:px-8 md:py-16">
        <div className="layout-container">
          <div className="mb-5 flex items-center gap-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-fade">
            <PlugZap className="h-4 w-4" /> Claude Code Marketplace
          </div>
          <h1 className="type-display mb-4 text-3xl md:mb-6 md:text-5xl lg:text-7xl">Claude Plugins</h1>
          <p className="max-w-3xl border-l border-ink/10 pl-4 text-lg leading-relaxed text-ink-fade md:pl-6 md:text-xl">
            Installable plugins and skill packs that turn Claude into a sales, marketing, and RevOps operator. Pick a plugin, open the page, and follow the setup steps.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {plugins.map((plugin) => (
              <Link
                key={plugin.slug}
                href={getToolHref(plugin)}
                className="tool-card group flex h-full flex-col"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <ToolLogo name={plugin.name} websiteUrl={plugin.websiteUrl} size="sm" />
                  <span className="rounded-md border border-ink/10 bg-ink/[0.03] px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-fade">
                    Claude Plugin
                  </span>
                </div>
                <div className="flex-grow">
                  <h2 className="mb-2 text-[1rem] font-semibold leading-tight md:text-[1.05rem]">{plugin.name}</h2>
                  <p className="mb-4 line-clamp-3 text-[0.9rem] leading-relaxed text-ink-fade">
                    {plugin.oneLiner}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-ink/10 pt-4 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em]">
                  <span>{plugin.hasFreeTier ? "Free" : "Paid"}</span>
                  <span className="flex items-center gap-2">Open details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
