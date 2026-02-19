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
    { label: "API Docs", href: tool.docsUrl },
    { label: "Website", href: tool.websiteUrl },
    { label: "Pricing", href: tool.pricingUrl },
    ...(tool.githubUrl
      ? [{ label: "GitHub", href: tool.githubUrl }]
      : []),
  ]

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "AI-Native": return "text-club-teal border-club-teal/30 bg-club-teal/5"
      case "Beginner-Friendly": return "text-green-400 border-green-400/30 bg-green-400/5"
      case "Technical": return "text-blue-400 border-blue-400/30 bg-blue-400/5"
      case "Complex": return "text-orange-400 border-orange-400/30 bg-orange-400/5"
      default: return "text-gray-400 border-white/10 bg-white/5"
    }
  }

  return (
    <>
      <JsonLd tool={tool} />

      <main className="min-h-screen bg-club-dark text-white pb-32">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-12 sm:py-24 lg:px-24">
          {/* Header Section */}
          <div className="mb-24">
            <Link
              href="/tools"
              className="mb-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Link>

            <div className="mt-16 flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-white text-black text-5xl font-black shadow-2xl">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-6xl font-extrabold tracking-tight sm:text-8xl italic font-heading leading-tight">{tool.name}</h1>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="badge-club px-5 py-2 text-xs">
                        {tool.category}
                      </span>
                      {tool.aiDifficulty && (
                        <span className={`badge-club px-5 py-2 text-xs ${getDifficultyColor(tool.aiDifficulty)}`}>
                          <Brain className="mr-2 inline h-4 w-4" /> {tool.aiDifficulty}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="mt-12 text-2xl text-gray-400 leading-relaxed font-medium">{tool.oneLiner}</p>
              </div>

              <div className="flex flex-wrap gap-4 lg:flex-col xl:flex-row">
                {actionLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-club-outline hover:border-white whitespace-nowrap min-w-[140px] justify-center"
                  >
                    {link.label === "GitHub" ? (
                      <Github className="h-4 w-4" />
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-24 lg:grid-cols-12">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-32">
              {/* Use Cases Section */}
              {tool.aiCapabilities && tool.aiCapabilities.length > 0 && (
                <div className="rounded-[3rem] bg-club-card border border-white/10 p-16 shadow-2xl">
                  <h2 className="flex items-center gap-5 text-4xl font-extrabold tracking-tight italic font-heading">
                    <Sparkles className="h-10 w-10 text-club-teal" /> Use Cases
                  </h2>
                  <p className="mt-6 text-xl text-gray-500">What you can do with this tool and AI agents</p>
                  
                  <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {tool.aiCapabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-6 rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 transition-all hover:bg-white/[0.05] hover:border-white/10 group">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-club-teal/10 text-club-teal group-hover:bg-club-teal group-hover:text-black transition-all">
                          <Check className="h-5 w-5" />
                        </div>
                        <span className="text-base font-bold text-white uppercase tracking-tight leading-snug pt-1">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Starter Prompt Section */}
              {tool.starterPrompt && (
                <div className="rounded-[3rem] border border-club-teal/30 bg-club-teal/[0.03] p-16 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Terminal className="h-40 w-40 text-club-teal" />
                  </div>
                  <h2 className="flex items-center gap-5 text-4xl font-extrabold tracking-tight italic font-heading">
                    <Terminal className="h-10 w-10 text-club-teal" /> Try this prompt
                  </h2>
                  <p className="mt-6 text-xl text-gray-400">Copy this into Claude or Cursor to start using the API</p>
                  
                  <div className="group relative mt-12">
                    <div className="rounded-[2rem] bg-black/40 p-10 font-mono text-lg leading-relaxed text-club-teal border border-white/10 shadow-inner">
                      &quot;{tool.starterPrompt}&quot;
                    </div>
                  </div>
                </div>
              )}

              {/* About */}
              <div className="prose prose-invert prose-2xl max-w-none">
                <h2 className="text-5xl font-extrabold tracking-tight italic font-heading mb-12">About {tool.name}</h2>
                <div className="mt-12 text-gray-400 leading-relaxed whitespace-pre-line">
                  {tool.description}
                </div>
              </div>

              {/* Alternative To */}
              {tool.alternativeTo && tool.alternativeTo.length > 0 && (
                <div className="border-t border-white/10 pt-24">
                  <h2 className="text-4xl font-extrabold tracking-tight italic font-heading">Alternatives</h2>
                  <div className="mt-12 flex flex-wrap gap-5">
                    {tool.alternativeTo.map((alt) => (
                      <span key={alt} className="rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-4 text-[13px] font-bold text-gray-500 uppercase tracking-[0.2em] hover:border-white hover:text-white transition-all cursor-default">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                {/* MCP Configuration Card */}
                {tool.integrations.find(i => i.platform === "MCP" && i.mcpConfig) && (
                  <div className="rounded-[2.5rem] bg-club-teal p-12 text-black shadow-2xl shadow-club-teal/20 relative overflow-hidden group">
                    <div className="relative z-10">
                      <h3 className="flex items-center gap-4 text-3xl font-extrabold tracking-tight italic font-heading">
                        <Zap className="h-7 w-7 fill-black" /> MCP Config
                      </h3>
                      <p className="mt-4 text-[13px] font-bold opacity-70 leading-relaxed uppercase tracking-widest">Claude & Cursor Setup</p>
                      <div className="mt-10 rounded-2xl bg-black/10 p-8 font-mono text-[12px] text-black overflow-x-auto border border-black/5 shadow-inner">
                        <pre className="whitespace-pre">{tool.integrations.find(i => i.platform === "MCP")?.mcpConfig}</pre>
                      </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                      <Zap className="h-40 w-40 fill-black" />
                    </div>
                  </div>
                )}

                <div className="rounded-[2.5rem] bg-club-card border border-white/10 p-12">
                  <h3 className="text-3xl font-extrabold tracking-tight italic font-heading">Details</h3>
                  
                  <div className="mt-12 space-y-10">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Protocol</span>
                      <span className="text-[12px] font-mono text-club-teal font-bold uppercase tracking-widest">{tool.apiType.join(' / ')}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Auth</span>
                      <span className="text-[12px] font-bold text-white uppercase tracking-widest">{tool.authMethod.join(' / ')}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Free Tier</span>
                      <span className={tool.hasFreeTier ? 'text-[11px] font-bold text-club-teal uppercase tracking-widest' : 'text-[11px] font-bold text-gray-600 uppercase tracking-widest'}>
                        {tool.hasFreeTier ? 'Available' : 'Paid only'}
                      </span>
                    </div>

                    <div className="space-y-5 border-b border-white/5 pb-6">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Official SDKs</span>
                      <div className="flex flex-wrap gap-3">
                        {tool.sdkLanguages.length > 0 ? (
                          tool.sdkLanguages.map(lang => (
                            <span key={lang} className="badge-club text-[10px]">{lang}</span>
                          ))
                        ) : (
                          <span className="text-xs font-bold text-gray-800 italic uppercase tracking-widest">None</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Webhooks</span>
                      <span className={tool.hasWebhooks ? 'text-[11px] font-bold text-club-teal uppercase tracking-widest' : 'text-[11px] font-bold text-gray-600 uppercase tracking-widest'}>
                        {tool.hasWebhooks ? 'Active' : 'No'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">OpenAPI</span>
                      {tool.hasOpenApiSpec ? (
                        <a href={tool.openApiSpecUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-club-teal hover:underline underline-offset-8 uppercase tracking-widest">
                          View Spec
                        </a>
                      ) : (
                        <span className="text-xs font-bold text-gray-800 italic uppercase tracking-widest">None</span>
                      )}
                    </div>
                  </div>

                  {/* Agent Integrations List */}
                  <div className="mt-20 space-y-10">
                    <h3 className="flex items-center gap-4 text-2xl font-extrabold tracking-tight italic font-heading">
                      <Plug className="h-7 w-7 text-gray-500" /> Integrations
                    </h3>
                    
                    {tool.integrations.length > 0 ? (
                      <div className="space-y-4">
                        {tool.integrations.map((integration, i) => (
                          <a
                            key={i}
                            href={integration.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between rounded-[1.5rem] border border-white/10 p-6 transition-all hover:bg-white/[0.03] hover:border-club-teal/30 hover:-translate-y-1"
                          >
                            <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">{integration.platform}</span>
                            <ExternalLink className="h-4 w-4 text-gray-700 group-hover:text-club-teal transition-colors" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-bold text-gray-800 italic uppercase tracking-widest">No agent integrations yet</p>
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
