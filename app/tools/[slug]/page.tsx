import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getToolBySlug, getAllSlugs } from "@/lib/tools"
import type { SalesTool } from "@/lib/types"
import {
  ExternalLink,
  Zap,
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
    { label: "Documentation", href: tool.docsUrl },
    { label: "Website", href: tool.websiteUrl },
    { label: "Pricing", href: tool.pricingUrl },
  ]

  return (
    <div className="flex flex-col bg-sage-bg/30">
      <JsonLd tool={tool} />

      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full border-l border-dashed border-ink-black/5 pointer-events-none hidden lg:block"></div>
        
        <Link
          href="/tools"
          className="type-label mb-12 inline-flex items-center gap-2 opacity-40 hover:opacity-100 hover:text-accent-orange transition-all group"
        >
          <span className="transition-transform group-hover:-translate-x-1">&lt;-</span> Back to Directory
        </Link>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex h-20 w-20 items-center justify-center border border-ink-black bg-white shadow-[6px_6px_0px_rgba(18,18,18,0.1)] text-4xl font-black transition-transform hover:rotate-3">
                {tool.name.charAt(0)}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="type-label px-2 py-0.5 border border-ink-black/10 bg-white/50">{tool.category}</div>
                </div>
                <h1 className="type-display">{tool.name}</h1>
              </div>
            </div>
            <p className="mt-12 text-2xl font-medium opacity-60 leading-relaxed max-w-2xl">{tool.oneLiner}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="type-label opacity-40 mb-2">Technical Links</div>
            {actionLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="swiss-btn min-w-[240px] bg-white/40 hover:bg-ink-black hover:text-white group"
              >
                {link.label} <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px]">
        <div className="p-8 md:p-16 space-y-32">
          {tool.aiCapabilities && tool.aiCapabilities.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="type-label opacity-40">Key Features</div>
                <div className="h-px flex-grow bg-ink-black/5"></div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {tool.aiCapabilities.map((cap) => (
                  <div key={cap} className="p-6 border border-ink-black/10 bg-white/20 backdrop-blur-sm group hover:border-ink-black transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="h-2 w-2 rounded-full bg-accent-blue mt-1.5 group-hover:bg-accent-orange transition-colors"></div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold uppercase tracking-tight">{cap}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tool.starterPrompt && (
            <div className="border border-dashed border-ink-black p-12 bg-white/10 relative group">
              <div className="type-label mb-8 opacity-40">Example Prompt</div>
              <div className="font-mono text-xl p-10 border border-ink-black bg-white shadow-[10px_10px_0px_rgba(18,18,18,0.05)] leading-relaxed italic">
                &quot;{tool.starterPrompt}&quot;
              </div>
            </div>
          )}

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="type-label opacity-40">Overview</div>
              <div className="h-px flex-grow bg-ink-black/5"></div>
            </div>
            <div className="text-xl font-medium leading-relaxed opacity-70 whitespace-pre-line max-w-3xl">
              {tool.description}
            </div>
          </div>
        </div>

        <div className="p-8 md:p-16 bg-white/20 backdrop-blur-md border-l border-ink-black/10 space-y-16">
          <div>
            <div className="flex items-center justify-between mb-10">
              <div className="type-label opacity-40">Technical Specs</div>
            </div>
            
            <div className="space-y-10">
              {[
                { label: "API Type", value: tool.apiType.join(' / ') },
                { label: "Authentication", value: tool.authMethod.join(' / ') },
                { label: "Pricing Tier", value: tool.hasFreeTier ? "Free Tier Available" : "Paid Only" },
                { label: "SDK Languages", value: tool.sdkLanguages.join(', ') || "N/A" },
                { label: "Webhooks", value: tool.hasWebhooks ? "Yes" : "No" },
              ].map((spec) => (
                <div key={spec.label} className="group border-b border-ink-black/5 pb-6">
                  <div className="type-label opacity-40 mb-2 group-hover:text-accent-orange transition-colors">{spec.label}</div>
                  <div className="font-bold uppercase text-[0.8rem] tracking-[0.15em] leading-tight">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {tool.integrations.find(i => i.platform === "MCP" && i.mcpConfig) && (
            <div className="border border-ink-black bg-ink-black p-8 shadow-[8px_8px_0px_rgba(18,18,18,0.2)]">
              <div className="flex items-center justify-between mb-8">
                <div className="type-label text-white/40">MCP Configuration</div>
                <div className="h-2 w-2 rounded-full bg-accent-blue animate-pulse"></div>
              </div>
              <pre className="font-mono text-[10px] whitespace-pre-wrap overflow-x-auto p-6 border border-white/10 bg-white/5 text-white/80 leading-relaxed">
                {tool.integrations.find(i => i.platform === "MCP")?.mcpConfig}
              </pre>
              <div className="mt-6 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-accent-blue text-center">
                Copy to MCP Config
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

      </div>
    </div>
  )
}
