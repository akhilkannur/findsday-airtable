import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getToolBySlug, getAllSlugs } from "@/lib/tools"
import type { SalesTool } from "@/lib/types"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Zap,
  Terminal,
  Sparkles,
  Brain,
  Check,
  Plug,
} from "lucide-react"

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return {
      title: "Tool Not Found | Salestools Club",
      description: "The requested tool could not be located.",
    }
  }

  return {
    title: `${tool.name} API & MCP Server | Salestools Club`,
    description: tool.oneLiner,
    alternates: {
      canonical: `https://salestools.club/tools/${tool.slug}`,
    },
  }
}

function JsonLd({ tool }: { tool: SalesTool }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.oneLiner,
    url: tool.websiteUrl,
    applicationCategory: tool.category,
    operatingSystem: "Cloud",
    offers: {
      "@type": "Offer",
      price: tool.hasFreeTier ? "0" : undefined,
      priceCurrency: "USD",
    },
    featureList: tool.aiCapabilities?.join(", "),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const actionLinks = [
    { label: "View Specs", href: tool.docsUrl },
    { label: "Core Node", href: tool.websiteUrl },
    { label: "Registry", href: tool.pricingUrl },
  ]

  return (
    <>
      <JsonLd tool={tool} />

      <main className="flex flex-col">
        {/* Header Section */}
        <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black">
          <Link
            href="/tools"
            className="type-label mb-12 inline-block opacity-40 hover:opacity-100 hover:underline"
          >
            <- Back to Directory
          </Link>

          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center border border-ink-black bg-accent-blue text-3xl font-black">
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <h1 className="type-display">{tool.name}</h1>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="swiss-badge">{tool.category}</span>
                    {tool.aiDifficulty && (
                      <span className="swiss-badge opacity-40">System: {tool.aiDifficulty}</span>
                    )}
                  </div>
                </div>
              </div>
              <p className="mt-10 text-2xl font-medium opacity-60 leading-relaxed">{tool.oneLiner}</p>
            </div>

            <div className="flex flex-col gap-4">
              {actionLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swiss-btn min-w-[200px]"
                >
                  {link.label} <span>↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] divide-x divide-ink-black">
          {/* Left Column */}
          <div className="p-6 md:p-12 space-y-24">
            {/* Use Cases Section */}
            {tool.aiCapabilities && tool.aiCapabilities.length > 0 && (
              <div>
                <div className="type-label mb-8 opacity-40">Operational Capabilities</div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {tool.aiCapabilities.map((cap) => (
                    <div key={cap} className="swiss-card bg-transparent">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-accent-orange"></div>
                        <span className="text-sm font-bold uppercase tracking-tight">{cap}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Starter Prompt Section */}
            {tool.starterPrompt && (
              <div className="border border-dashed border-ink-black p-10">
                <div className="type-label mb-6 opacity-40">Initial Command Sequence</div>
                <div className="font-mono text-lg p-8 border border-ink-black bg-white/40">
                  &quot;{tool.starterPrompt}&quot;
                </div>
                <div className="type-label mt-6 text-accent-orange font-bold">Protocol Active</div>
              </div>
            )}

            {/* About */}
            <div className="max-w-3xl">
              <div className="type-label mb-8 opacity-40">Module Overview</div>
              <div className="text-xl font-medium leading-relaxed opacity-60 whitespace-pre-line">
                {tool.description}
              </div>
            </div>
          </div>

          {/* Right Column (Specifications) */}
          <div className="p-6 md:p-12 space-y-12">
            <div className="type-label opacity-40">System Specs</div>
            
            <div className="space-y-8">
              {[
                { label: "Interface", value: tool.apiType.join(' / ') },
                { label: "Auth Protocol", value: tool.authMethod.join(' / ') },
                { label: "Resource Tier", value: tool.hasFreeTier ? "Public/Free" : "Private/Paid" },
                { label: "SDK Nodes", value: tool.sdkLanguages.join(', ') || "Generic" },
                { label: "Signal Type", value: tool.hasWebhooks ? "Bi-directional" : "Standard" },
              ].map((spec) => (
                <div key={spec.label} className="border-b border-ink-black pb-4">
                  <div className="type-label opacity-40 mb-1">{spec.label}</div>
                  <div className="font-bold uppercase text-sm tracking-widest">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* MCP Configuration */}
            {tool.integrations.find(i => i.platform === "MCP" && i.mcpConfig) && (
              <div className="border border-ink-black p-8 bg-accent-blue/10">
                <div className="type-label mb-6">MCP Infrastructure</div>
                <pre className="font-mono text-[10px] whitespace-pre overflow-x-auto p-4 border border-ink-black bg-white">
                  {tool.integrations.find(i => i.platform === "MCP")?.mcpConfig}
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
