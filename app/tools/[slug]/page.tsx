import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getToolBySlug, getAllSlugs, getToolsByCategory, getAllTools } from "@/lib/tools"
import type { SalesTool } from "@/lib/types"
import {
  ExternalLink,
  Zap,
  ArrowRight,
} from "lucide-react"
import { CopyButton } from "@/components/ui/CopyButton"

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

function ToolCard({ tool }: { tool: SalesTool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group bg-black p-10 flex flex-col gap-6 transition-all hover:bg-[#0a0a0a]"
    >
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 flex items-center justify-center border border-[#333333] bg-black font-bold text-xl text-white group-hover:border-white transition-colors">
          {tool.name.charAt(0)}
        </div>
        <div className="text-xl opacity-0 group-hover:opacity-100 transition-all text-[#444]">↗</div>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-white mb-3 uppercase">{tool.name}</h3>
        <p className="text-[14px] text-[#888] leading-relaxed line-clamp-2">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto pt-8 flex items-center justify-between opacity-20 group-hover:opacity-100 transition-all border-t border-dashed border-[#333333]">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Inspect Node</div>
        <ArrowRight className="h-3 w-3 text-white transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
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

  // Find alternatives
  const allTools = getAllTools()
  const alternatives = allTools.filter(t => 
    t.slug !== tool.slug && 
    (
      t.category === tool.category || 
      tool.alternativeTo?.some(alt => t.name.toLowerCase().includes(alt.toLowerCase())) ||
      t.alternativeTo?.some(alt => tool.name.toLowerCase().includes(alt.toLowerCase()))
    )
  ).slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <JsonLd tool={tool} />

      <section className="px-10 md:px-20 py-24 border-b border-[#333333] relative overflow-hidden bg-[#050505]">
        <Link
          href="/tools"
          className="text-[10px] font-bold uppercase tracking-widest text-[#444] hover:text-white mb-12 inline-block transition-colors"
        >
          &lt;- Back to Directory
        </Link>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-10">
              <div className="w-20 h-20 flex items-center justify-center border border-[#333333] bg-black text-4xl font-bold text-white uppercase">
                {tool.name.charAt(0)}
              </div>
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 border border-[#333333] text-[10px] font-bold uppercase tracking-widest text-[#888]">{tool.category}</div>
                <h1 className="text-[42px] md:text-[64px] font-bold leading-none tracking-[-0.04em] text-white uppercase">{tool.name}</h1>
              </div>
            </div>
            <p className="mt-12 text-[20px] font-medium text-[#888] leading-relaxed max-w-2xl">{tool.oneLiner}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#444] mb-2">Technical Links</div>
            {actionLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-10 py-4 border border-[#333333] text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all min-w-[280px]"
              >
                {link.label} <span className="opacity-40">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] border-b border-[#333333]">
        <div className="p-10 md:p-20 space-y-32">
          {tool.aiCapabilities && tool.aiCapabilities.length > 0 && (
            <div>
              <div className="flex items-center gap-6 mb-12">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Key Features</div>
                <div className="h-px flex-grow bg-[#333333]"></div>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {tool.aiCapabilities.map((cap) => (
                  <div key={cap} className="p-8 border border-[#333333] bg-[#050505] group hover:border-white transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 shadow-[0_0_8px_#fff]"></div>
                      <span className="text-[13px] font-bold uppercase tracking-tight text-[#888] group-hover:text-white transition-colors">{cap}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tool.starterPrompt && (
            <div className="border border-[#333333] p-16 bg-[#050505] relative group">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#444] mb-10">Example Prompt</div>
              <div className="font-mono text-xl p-10 border border-[#333333] bg-black text-white leading-relaxed italic">
                &quot;{tool.starterPrompt}&quot;
              </div>
            </div>
          )}

          <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-12">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Overview</div>
              <div className="h-px flex-grow bg-[#333333]"></div>
            </div>
            <div className="text-[18px] font-medium leading-relaxed text-[#888] whitespace-pre-line max-w-3xl">
              {tool.description}
            </div>
          </div>
        </div>

        <div className="p-10 md:p-20 bg-[#050505] border-l border-[#333333] space-y-20">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#444] mb-12">Technical Specs</div>
            
            <div className="space-y-12">
              {[
                { label: "API Type", value: tool.apiType.join(' / ') },
                { label: "Authentication", value: tool.authMethod.join(' / ') },
                { label: "Pricing Tier", value: tool.hasFreeTier ? "Free Tier Available" : "Paid Only" },
                { label: "SDK Languages", value: tool.sdkLanguages.join(', ') || "N/A" },
                { label: "Webhooks", value: tool.hasWebhooks ? "Yes" : "No" },
              ].map((spec) => (
                <div key={spec.label} className="group border-b border-[#333333] pb-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#444] mb-3 group-hover:text-white transition-colors">{spec.label}</div>
                  <div className="font-mono font-bold text-[12px] uppercase tracking-widest text-[#888]">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {tool.integrations.find(i => i.platform === "MCP" && i.mcpConfig) && (
            <div className="border border-white p-10 bg-black shadow-[12px_12px_0px_#111]">
              <div className="flex items-center justify-between mb-10">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">MCP Configuration</div>
                <div className="w-2 h-2 bg-[#00FF00] rounded-full shadow-[0_0_8px_#00FF00] animate-status-pulse"></div>
              </div>
              <pre className="font-mono text-[11px] whitespace-pre-wrap overflow-x-auto p-8 border border-[#333333] bg-[#050505] text-[#888] leading-relaxed mb-8">
                {tool.integrations.find(i => i.platform === "MCP")?.mcpConfig}
              </pre>
              <div className="flex justify-center">
                <CopyButton 
                  text={tool.integrations.find(i => i.platform === "MCP")?.mcpConfig || ""} 
                  label="Copy to MCP Config"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-[#888] transition-colors"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {alternatives.length > 0 && (
        <section className="px-10 md:px-20 py-32 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-6 mb-20">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white italic underline underline-offset-8 decoration-white/20">Alternatives to {tool.name}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#333333] gap-px">
              {alternatives.map((alt) => (
                <ToolCard key={alt.slug} tool={alt} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
