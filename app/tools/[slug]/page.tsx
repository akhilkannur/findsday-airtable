import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getToolBySlug, getAllSlugs } from "@/lib/tools"
import type { SalesTool } from "@/lib/types"
import {
  ArrowLeft,
  ExternalLink,
  Code,
  Key,
  Check,
  X,
  Plug,
  Github,
  Zap,
  Terminal,
  Sparkles,
  Brain,
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
      title: "Entry Not Found | Findsday Registry",
      description: "The requested infrastructure entry could not be located.",
    }
  }

  return {
    title: `${tool.name} // Infrastructure Registry Entry | Findsday`,
    description: tool.oneLiner,
    alternates: {
      canonical: `https://findsday.com/tools/${tool.slug}`,
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
    { label: "API_DOCS", href: tool.docsUrl },
    { label: "WEB_PORTAL", href: tool.websiteUrl },
    { label: "PRICING_MODEL", href: tool.pricingUrl },
    ...(tool.githubUrl
      ? [{ label: "GITHUB_DEV", href: tool.githubUrl }]
      : []),
  ]

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "AI-Native": return "text-accent-pink border-accent-pink/30 bg-accent-pink/10"
      case "Beginner-Friendly": return "text-terminal-green border-terminal-green/30 bg-terminal-green/10"
      case "Technical": return "text-blue-400 border-blue-400/30 bg-blue-400/10"
      case "Complex": return "text-orange-400 border-orange-400/30 bg-orange-400/10"
      default: return "text-gray-400 border-white/10 bg-white/5"
    }
  }

  return (
    <>
      <JsonLd tool={tool} />

      <main className="min-h-screen bg-banknote-black text-paper-white pb-24">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-16 border-b border-white/10 pb-16 pt-12">
            <Link
              href="/tools"
              className="mb-12 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gray-600 transition-colors hover:text-terminal-green"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> ESCAPE_TO_REGISTRY
            </Link>

            <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="font-heading text-6xl font-black italic tracking-tighter sm:text-8xl">{tool.name}</h1>
                  <div className="flex gap-2">
                    <span className="border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      SEGMENT: {tool.category}
                    </span>
                    {tool.aiDifficulty && (
                      <span className={`border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest ${getDifficultyColor(tool.aiDifficulty)}`}>
                        <Brain className="mr-1.5 inline h-3 w-3" /> {tool.aiDifficulty}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-8 max-w-2xl font-mono text-xs uppercase leading-loose tracking-widest text-gray-500">{tool.oneLiner}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {actionLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutalist whitespace-nowrap"
                  >
                    {link.label === "GITHUB_DEV" ? (
                      <Github className="h-3.5 w-3.5" />
                    ) : (
                      <ExternalLink className="h-3.5 w-3.5" />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Left Column: Data & Specs */}
            <div className="lg:col-span-8 space-y-20">
              {/* AI Capabilities Section */}
              {tool.aiCapabilities && tool.aiCapabilities.length > 0 && (
                <div className="border border-white/10 bg-black/40 p-10">
                  <h2 className="flex items-center gap-3 font-heading text-3xl font-black italic tracking-tighter text-paper-white">
                    <Sparkles className="h-6 w-6 text-terminal-green" /> Operational Outputs
                  </h2>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-gray-600">Expected results when queried by autonomous agents</p>
                  
                  <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {tool.aiCapabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-4 border-l border-terminal-green bg-white/5 p-5 transition-colors hover:bg-terminal-green/5">
                        <span className="font-mono text-xs font-bold text-terminal-green tracking-tighter uppercase">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Starter Prompt Section */}
              {tool.starterPrompt && (
                <div className="border border-accent-pink/20 bg-accent-pink/5 p-10">
                  <h2 className="flex items-center gap-3 font-heading text-3xl font-black italic tracking-tighter text-paper-white">
                    <Terminal className="h-6 w-6 text-accent-pink" /> Initial_Query_Payload
                  </h2>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-gray-600">Standardized prompt for LLM agent initialization</p>
                  
                  <div className="mt-8 font-mono text-sm italic leading-relaxed text-accent-pink border border-accent-pink/10 bg-black/40 p-8 shadow-inner">
                    &quot;{tool.starterPrompt}&quot;
                  </div>
                </div>
              )}

              {/* Long Description */}
              <div className="prose prose-invert max-w-none">
                <h2 className="font-heading text-4xl font-black italic tracking-tighter text-paper-white">Technical Abstract</h2>
                <div className="mt-8 font-mono text-xs uppercase leading-loose text-gray-500">
                  {tool.description}
                </div>
              </div>

              {/* Alternative To */}
              {tool.alternativeTo && tool.alternativeTo.length > 0 && (
                <div className="border-t border-white/10 pt-12">
                  <h2 className="font-heading text-3xl font-black italic tracking-tighter text-paper-white">Infrastructure Alternatives</h2>
                  <div className="mt-6 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest">
                    {tool.alternativeTo.map((alt) => (
                      <span key={alt} className="border border-white/10 px-4 py-2 text-gray-400 hover:border-terminal-green hover:text-terminal-green cursor-default transition-colors">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Spec Ledger */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* MCP Configuration Card */}
                {tool.integrations.find(i => i.platform === "MCP" && i.mcpConfig) && (
                  <div className="border border-terminal-green/30 bg-terminal-green/5 p-8 shadow-[0_0_40px_rgba(0,255,65,0.02)]">
                    <h3 className="flex items-center gap-2 font-heading text-2xl font-black italic tracking-tighter text-paper-white">
                      <Zap className="h-5 w-5 text-terminal-green" /> MCP_CONFIG
                    </h3>
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-gray-600 leading-relaxed">Copy payload to Claude/Cursor environment settings</p>
                    <div className="mt-6 border border-terminal-green/10 bg-black p-5 font-mono text-[10px] text-terminal-green/80 overflow-x-auto">
                      <pre className="whitespace-pre">{tool.integrations.find(i => i.platform === "MCP")?.mcpConfig}</pre>
                    </div>
                  </div>
                )}

                <div className="border border-white/10 bg-white/5 p-8">
                  <h3 className="font-heading text-2xl font-black italic tracking-tighter text-paper-white">Spec Ledger</h3>
                  
                  <div className="mt-8 space-y-6 font-mono text-[10px] uppercase tracking-widest">
                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-600">API_PROTOCOL</span>
                      <span className="text-terminal-green">{tool.apiType.join(' // ')}</span>
                    </div>
                    
                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-600">AUTH_SCHEMA</span>
                      <span className="text-paper-white">{tool.authMethod.join(' / ')}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-600">FREE_TIER_AVAILABLE</span>
                      <span className={tool.hasFreeTier ? 'text-terminal-green' : 'text-gray-700'}>
                        {tool.hasFreeTier ? 'TRUE_POSITIVE' : 'FALSE_NEGATIVE'}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 border-b border-white/5 pb-3">
                      <span className="text-gray-600">OFFICIAL_SDKS</span>
                      <div className="flex flex-wrap gap-2">
                        {tool.sdkLanguages.length > 0 ? (
                          tool.sdkLanguages.map(lang => (
                            <span key={lang} className="text-paper-white">{lang}</span>
                          ))
                        ) : (
                          <span className="text-gray-800">UNAVAILABLE</span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-600">WEBHOOK_SUPPORT</span>
                      <span className={tool.hasWebhooks ? 'text-terminal-green' : 'text-gray-700'}>
                        {tool.hasWebhooks ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-600">OPENAPI_SPEC</span>
                      {tool.hasOpenApiSpec ? (
                        <a href={tool.openApiSpecUrl} target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline">
                          ACCESSIBLE_SPEC_URL
                        </a>
                      ) : (
                        <span className="text-gray-800">NOT_PUBLISHED</span>
                      )}
                    </div>
                  </div>

                  {/* Agent Integrations List */}
                  <div className="mt-12 border-t border-white/10 pt-8">
                    <h3 className="flex items-center gap-2 font-heading text-xl font-black italic tracking-tighter text-paper-white">
                      <Plug className="h-4 w-4" /> AGENT_HANDSHAKES
                    </h3>
                    
                    {tool.integrations.length > 0 ? (
                      <div className="mt-6 space-y-4">
                        {tool.integrations.map((integration, i) => (
                          <a
                            key={i}
                            href={integration.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between border border-white/10 p-3 transition-colors hover:border-terminal-green"
                          >
                            <span className="font-mono text-[10px] text-paper-white tracking-widest">{integration.platform}</span>
                            <ExternalLink className="h-3 w-3 text-gray-700 group-hover:text-terminal-green" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-4 font-mono text-[9px] uppercase tracking-widest text-gray-700">NO_INTERFACES_DETECTED</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
