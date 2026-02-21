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

function ToolCard({ tool, index }: { tool: SalesTool, index: number }) {
  const colors = ['header-blue', 'header-red', 'header-yellow', 'header-green']
  const colorClass = colors[index % colors.length]

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="tool-card group"
    >
      <div className={`card-header-studs ${colorClass}`}>
        <div className="stud"></div><div className="stud"></div><div className="stud"></div>
      </div>
      <div className="card-body p-6 flex flex-col gap-4">
        <div className="card-top flex justify-between items-start">
          <div className="avatar w-14 h-14 bg-[#eee] border-2 border-black rounded-xl flex items-center justify-center font-extrabold text-2xl text-black">
            {tool.name.charAt(0)}
          </div>
        </div>
        
        <div className="flex-grow">
          <h3 className="text-lg font-bold mb-2 uppercase text-black">{tool.name}</h3>
          <p className="text-[0.85rem] text-[#666] leading-relaxed line-clamp-2">
            {tool.oneLiner}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all border-t border-dashed border-black/10 pt-4">
          <div className="text-[9px] font-bold uppercase tracking-widest text-black">Inspect Node</div>
          <ArrowRight className="h-3 w-3 text-black transition-transform group-hover:translate-x-1" />
        </div>
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
    <div className="flex flex-col min-h-screen">
      <JsonLd tool={tool} />

      <section className="px-5 py-24 border-b-[var(--border-width)] border-black relative overflow-hidden bg-[var(--lego-yellow)]">
        <div className="layout-container">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 bg-white px-3 py-1 border-2 border-black rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-colors mb-12 shadow-[2px_2px_0_black]"
          >
            &lt;- Back to Directory
          </Link>

          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-10">
                <div className="w-24 h-24 flex items-center justify-center border-[var(--border-width)] border-black bg-white rounded-[var(--radius-md)] text-5xl font-black text-black shadow-[6px_6px_0_black]">
                  {tool.name.charAt(0)}
                </div>
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 bg-[var(--lego-blue)] text-white border-2 border-black rounded-full text-[10px] font-bold uppercase tracking-widest">{tool.category}</div>
                  <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tight text-black uppercase">{tool.name}</h1>
                </div>
              </div>
              <p className="mt-12 text-2xl font-medium text-black/70 leading-relaxed max-w-2xl">{tool.oneLiner}</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-black/40 mb-2">Technical Links</div>
              {actionLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brick brick-btn bg-white hover:bg-[var(--lego-red)] hover:text-white transition-all min-w-[280px] text-center"
                >
                  {link.label} <span className="opacity-40 ml-2">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="layout-container grid grid-cols-1 lg:grid-cols-[1fr_400px] border-x-[var(--border-width)] border-black bg-white">
        <div className="p-10 md:p-20 space-y-32 border-r-[var(--border-width)] border-black">
          {tool.aiCapabilities && tool.aiCapabilities.length > 0 && (
            <div>
              <div className="flex items-center gap-6 mb-12">
                <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-black">Key Features</div>
                <div className="h-px flex-grow bg-black/10"></div>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {tool.aiCapabilities.map((cap) => (
                  <div key={cap} className="brick p-8 bg-[var(--lego-offwhite)] group hover:bg-white transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-[var(--lego-green)] border-2 border-black rounded-full mt-1.5 shadow-[2px_2px_0_black]"></div>
                      <span className="text-[14px] font-bold uppercase tracking-tight text-black">{cap}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tool.starterPrompt && (
            <div className="brick p-16 bg-white relative group">
              <div className="text-[11px] font-bold uppercase tracking-widest text-black/40 mb-10">Example Prompt</div>
              <div className="text-2xl p-10 border-[var(--border-width)] border-black rounded-[var(--radius-md)] bg-[var(--lego-offwhite)] text-black leading-relaxed italic font-medium shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)]">
                &quot;{tool.starterPrompt}&quot;
              </div>
            </div>
          )}

          <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-12">
              <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-black">Overview</div>
              <div className="h-px flex-grow bg-black/10"></div>
            </div>
            <div className="text-xl font-medium leading-relaxed text-black/70 whitespace-pre-line max-w-3xl">
              {tool.description}
            </div>
          </div>
        </div>

        <div className="p-10 md:p-20 bg-[var(--lego-offwhite)] space-y-20">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-black/40 mb-12">Technical Specs</div>
            
            <div className="space-y-12">
              {[
                { label: "API Type", value: tool.apiType.join(' / ') },
                { label: "Authentication", value: tool.authMethod.join(' / ') },
                { label: "Pricing Tier", value: tool.hasFreeTier ? "Free Tier Available" : "Paid Only" },
                { label: "SDK Languages", value: tool.sdkLanguages.join(', ') || "N/A" },
                { label: "Webhooks", value: tool.hasWebhooks ? "Yes" : "No" },
              ].map((spec) => (
                <div key={spec.label} className="group border-b-2 border-black/5 pb-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 group-hover:text-black transition-colors">{spec.label}</div>
                  <div className="font-bold text-[14px] uppercase tracking-widest text-black">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {tool.integrations.find(i => i.platform === "MCP" && i.mcpConfig) && (
            <div className="brick p-10 bg-black text-white shadow-[12px_12px_0_black]">
              <div className="flex items-center justify-between mb-10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--lego-yellow)]">MCP Configuration</div>
                <div className="w-3 h-3 bg-[var(--lego-green)] border-2 border-black rounded-full animate-status-pulse"></div>
              </div>
              <pre className="font-mono text-[11px] whitespace-pre-wrap overflow-x-auto p-8 border-2 border-white/20 bg-white/5 text-white/80 leading-relaxed mb-8">
                {tool.integrations.find(i => i.platform === "MCP")?.mcpConfig}
              </pre>
              <div className="flex justify-center">
                <CopyButton 
                  text={tool.integrations.find(i => i.platform === "MCP")?.mcpConfig || ""} 
                  label="Copy to MCP Config"
                  className="brick brick-btn bg-[var(--lego-blue)] text-white text-[10px] hover:scale-105"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="py-32 bg-[var(--lego-offwhite)] border-t-[var(--border-width)] border-black">
        <div className="layout-container">
          {alternatives.length > 0 && (
            <>
              <div className="flex items-center gap-6 mb-20">
                <h2 className="text-3xl font-bold uppercase tracking-tight text-black italic underline underline-offset-8 decoration-[var(--lego-red)]">Alternatives to {tool.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {alternatives.map((alt, idx) => (
                  <ToolCard key={alt.slug} tool={alt} index={idx} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
