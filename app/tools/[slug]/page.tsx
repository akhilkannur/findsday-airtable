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
      case "AI-Native": return "text-white bg-club-teal"
      case "Beginner-Friendly": return "text-white bg-green-500"
      case "Technical": return "text-white bg-blue-500"
      case "Complex": return "text-white bg-orange-500"
      default: return "text-gray-400 bg-white/10"
    }
  }

  return (
    <>
      <JsonLd tool={tool} />

      <main className="min-h-screen bg-club-dark text-white pb-32">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-12 sm:py-24">
          {/* Header Section */}
          <div className="mb-20">
            <Link
              href="/tools"
              className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Link>

            <div className="mt-12 flex flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-black text-4xl font-black">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl italic font-heading">{tool.name}</h1>
                    <div className="mt-4 flex gap-3">
                      <span className="rounded-full bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                        {tool.category}
                      </span>
                      {tool.aiDifficulty && (
                        <span className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest ${getDifficultyColor(tool.aiDifficulty)}`}>
                          <Brain className="mr-1.5 inline h-3.5 w-3.5" /> {tool.aiDifficulty}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="mt-10 max-w-3xl text-xl text-gray-400 leading-relaxed">{tool.oneLiner}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                {actionLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-club-outline hover:border-white whitespace-nowrap"
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

          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-24">
              {/* Use Cases Section */}
              {tool.aiCapabilities && tool.aiCapabilities.length > 0 && (
                <div className="rounded-3xl bg-club-card border border-white/5 p-12">
                  <h2 className="flex items-center gap-4 text-3xl font-extrabold tracking-tight italic font-heading">
                    <Sparkles className="h-8 w-8 text-club-teal" /> Use Cases
                  </h2>
                  <p className="mt-4 text-lg text-gray-400">What you can do with this tool and AI</p>
                  
                  <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {tool.aiCapabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-5 rounded-2xl bg-white/5 p-6 transition-all hover:bg-white/10">
                        <Check className="h-5 w-5 text-club-teal shrink-0" />
                        <span className="text-sm font-bold text-white uppercase tracking-tight">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Starter Prompt Section */}
              {tool.starterPrompt && (
                <div className="rounded-3xl border border-club-teal/20 bg-club-teal/5 p-12">
                  <h2 className="flex items-center gap-4 text-3xl font-extrabold tracking-tight italic font-heading">
                    <Terminal className="h-8 w-8 text-club-teal" /> Try this prompt
                  </h2>
                  <p className="mt-4 text-lg text-gray-400">Copy this into Claude or Cursor to start using the API</p>
                  
                  <div className="group relative mt-10">
                    <div className="rounded-2xl bg-black/40 p-8 font-mono text-sm leading-relaxed text-club-teal border border-white/5">
                      &quot;{tool.starterPrompt}&quot;
                    </div>
                  </div>
                </div>
              )}

              {/* About */}
              <div className="prose prose-invert prose-lg max-w-none">
                <h2 className="text-4xl font-extrabold tracking-tight italic font-heading">About {tool.name}</h2>
                <div className="mt-10 text-gray-400 leading-relaxed whitespace-pre-line text-lg">
                  {tool.description}
                </div>
              </div>

              {/* Alternative To */}
              {tool.alternativeTo && tool.alternativeTo.length > 0 && (
                <div className="border-t border-white/5 pt-16">
                  <h2 className="text-3xl font-extrabold tracking-tight italic font-heading">Alternatives</h2>
                  <div className="mt-10 flex flex-wrap gap-4">
                    {tool.alternativeTo.map((alt) => (
                      <span key={alt} className="rounded-xl border border-white/5 bg-white/5 px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-widest hover:border-white transition-colors cursor-default">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-10">
                {/* MCP Configuration Card */}
                {tool.integrations.find(i => i.platform === "MCP" && i.mcpConfig) && (
                  <div className="rounded-3xl bg-club-teal p-10 text-black shadow-2xl shadow-club-teal/20">
                    <h3 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight italic font-heading">
                      <Zap className="h-6 w-6 fill-black" /> MCP Config
                    </h3>
                    <p className="mt-3 text-sm font-bold opacity-70 leading-relaxed">Add this to your Claude Desktop or Cursor settings</p>
                    <div className="mt-8 rounded-2xl bg-black/20 p-6 font-mono text-[11px] text-black/90 overflow-x-auto border border-black/5">
                      <pre className="whitespace-pre">{tool.integrations.find(i => i.platform === "MCP")?.mcpConfig}</pre>
                    </div>
                  </div>
                )}

                <div className="rounded-3xl bg-club-card border border-white/5 p-10">
                  <h3 className="text-2xl font-extrabold tracking-tight italic font-heading">Details</h3>
                  
                  <div className="mt-10 space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-5">
                      <span className="text-sm font-bold text-gray-500">Protocol</span>
                      <span className="text-sm font-mono text-club-teal font-bold uppercase">{tool.apiType.join(' / ')}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-white/5 pb-5">
                      <span className="text-sm font-bold text-gray-500">Auth</span>
                      <span className="text-sm font-bold text-white">{tool.authMethod.join(' / ')}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/5 pb-5">
                      <span className="text-sm font-bold text-gray-500">Free Tier</span>
                      <span className={tool.hasFreeTier ? 'text-sm font-bold text-club-teal' : 'text-sm font-bold text-gray-600'}>
                        {tool.hasFreeTier ? 'Available' : 'Paid only'}
                      </span>
                    </div>

                    <div className="space-y-4 border-b border-white/5 pb-5">
                      <span className="text-sm font-bold text-gray-500">Official SDKs</span>
                      <div className="flex flex-wrap gap-3">
                        {tool.sdkLanguages.length > 0 ? (
                          tool.sdkLanguages.map(lang => (
                            <span key={lang} className="rounded-lg bg-white/5 px-3 py-1.5 text-[11px] font-bold text-white uppercase tracking-widest">{lang}</span>
                          ))
                        ) : (
                          <span className="text-sm font-bold text-gray-800 italic">Not listed</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/5 pb-5">
                      <span className="text-sm font-bold text-gray-500">Webhooks</span>
                      <span className={tool.hasWebhooks ? 'text-sm font-bold text-club-teal' : 'text-sm font-bold text-gray-600'}>
                        {tool.hasWebhooks ? 'Active' : 'No'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/5 pb-5">
                      <span className="text-sm font-bold text-gray-500">OpenAPI</span>
                      {tool.hasOpenApiSpec ? (
                        <a href={tool.openApiSpecUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-club-teal hover:underline underline-offset-4">
                          View Spec
                        </a>
                      ) : (
                        <span className="text-sm font-bold text-gray-800 italic">No spec found</span>
                      )}
                    </div>
                  </div>

                  {/* Agent Integrations List */}
                  <div className="mt-14 space-y-8">
                    <h3 className="flex items-center gap-3 text-xl font-extrabold tracking-tight italic font-heading">
                      <Plug className="h-5 w-5 text-gray-500" /> Integrations
                    </h3>
                    
                    {tool.integrations.length > 0 ? (
                      <div className="space-y-4">
                        {tool.integrations.map((integration, i) => (
                          <a
                            key={i}
                            href={integration.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between rounded-2xl border border-white/5 p-4 transition-all hover:bg-white/5 hover:border-white/20"
                          >
                            <span className="text-[11px] font-bold text-white uppercase tracking-widest">{integration.platform}</span>
                            <ExternalLink className="h-4 w-4 text-gray-700 group-hover:text-white transition-colors" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-bold text-gray-800 italic">No agent integrations yet</p>
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
