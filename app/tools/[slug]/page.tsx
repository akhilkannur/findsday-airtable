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
      title: "Tool Not Found | Findsday",
      description: "The requested tool could not be located.",
    }
  }

  return {
    title: `${tool.name} API & MCP Server | Findsday`,
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
    { label: "API Docs", href: tool.docsUrl },
    { label: "Website", href: tool.websiteUrl },
    { label: "Pricing", href: tool.pricingUrl },
    ...(tool.githubUrl
      ? [{ label: "GitHub", href: tool.githubUrl }]
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
              className="mb-12 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-terminal-green"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Link>

            <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="font-heading text-6xl font-black italic tracking-tighter sm:text-8xl">{tool.name}</h1>
                  <div className="flex gap-2">
                    <span className="border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-gray-400">
                      {tool.category}
                    </span>
                    {tool.aiDifficulty && (
                      <span className={`border px-3 py-1 text-xs font-bold uppercase ${getDifficultyColor(tool.aiDifficulty)}`}>
                        <Brain className="mr-1.5 inline h-3 w-3" /> {tool.aiDifficulty}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-8 max-w-2xl text-lg text-gray-400">{tool.oneLiner}</p>
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
                    {link.label === "GitHub" ? (
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
            {/* Left Column: Info & Use Cases */}
            <div className="lg:col-span-8 space-y-20">
              {/* Use Cases Section */}
              {tool.aiCapabilities && tool.aiCapabilities.length > 0 && (
                <div className="border border-white/10 bg-black/40 p-10">
                  <h2 className="flex items-center gap-3 font-heading text-3xl font-black italic tracking-tighter text-paper-white">
                    <Sparkles className="h-6 w-6 text-terminal-green" /> Use Cases
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">What you can do with this tool and AI</p>
                  
                  <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {tool.aiCapabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-4 border-l border-terminal-green bg-white/5 p-5 transition-colors hover:bg-terminal-green/5">
                        <span className="text-sm font-bold text-gray-200 uppercase tracking-tight">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Starter Prompt Section */}
              {tool.starterPrompt && (
                <div className="border border-accent-pink/20 bg-accent-pink/5 p-10">
                  <h2 className="flex items-center gap-3 font-heading text-3xl font-black italic tracking-tighter text-paper-white">
                    <Terminal className="h-6 w-6 text-accent-pink" /> Try this prompt
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">Copy this into Claude or Cursor to start using the API</p>
                  
                  <div className="mt-8 font-mono text-sm leading-relaxed text-accent-pink border border-accent-pink/10 bg-black/40 p-8">
                    &quot;{tool.starterPrompt}&quot;
                  </div>
                </div>
              )}

              {/* About */}
              <div className="prose prose-invert max-w-none">
                <h2 className="font-heading text-4xl font-black italic tracking-tighter text-paper-white">About</h2>
                <div className="mt-8 text-gray-400 leading-relaxed whitespace-pre-line">
                  {tool.description}
                </div>
              </div>

              {/* Alternative To */}
              {tool.alternativeTo && tool.alternativeTo.length > 0 && (
                <div className="border-t border-white/10 pt-12">
                  <h2 className="font-heading text-3xl font-black italic tracking-tighter text-paper-white">Alternatives</h2>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {tool.alternativeTo.map((alt) => (
                      <span key={alt} className="border border-white/10 px-4 py-2 text-xs font-bold text-gray-500 uppercase hover:border-terminal-green hover:text-terminal-green transition-colors cursor-default">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: API Details */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* MCP Configuration Card */}
                {tool.integrations.find(i => i.platform === "MCP" && i.mcpConfig) && (
                  <div className="border border-terminal-green/30 bg-terminal-green/5 p-8">
                    <h3 className="flex items-center gap-2 font-heading text-2xl font-black italic tracking-tighter text-paper-white">
                      <Zap className="h-5 w-5 text-terminal-green" /> MCP Config
                    </h3>
                    <p className="mt-2 text-xs text-gray-400 leading-relaxed">Add this to your Claude Desktop or Cursor settings</p>
                    <div className="mt-6 border border-terminal-green/10 bg-black p-5 font-mono text-[10px] text-terminal-green/80 overflow-x-auto">
                      <pre className="whitespace-pre">{tool.integrations.find(i => i.platform === "MCP")?.mcpConfig}</pre>
                    </div>
                  </div>
                )}

                <div className="border border-white/10 bg-white/5 p-8">
                  <h3 className="font-heading text-2xl font-black italic tracking-tighter text-paper-white">Details</h3>
                  
                  <div className="mt-8 space-y-6 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-500 font-medium">Protocol</span>
                      <span className="text-terminal-green font-mono text-xs">{tool.apiType.join(' // ')}</span>
                    </div>
                    
                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-500 font-medium">Auth</span>
                      <span className="text-paper-white text-xs">{tool.authMethod.join(' / ')}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-500 font-medium">Free Tier</span>
                      <span className={tool.hasFreeTier ? 'text-terminal-green font-bold' : 'text-gray-600'}>
                        {tool.hasFreeTier ? 'Available' : 'Paid only'}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 border-b border-white/5 pb-3">
                      <span className="text-gray-500 font-medium">SDKs</span>
                      <div className="flex flex-wrap gap-2">
                        {tool.sdkLanguages.length > 0 ? (
                          tool.sdkLanguages.map(lang => (
                            <span key={lang} className="text-paper-white text-xs bg-white/5 px-2 py-0.5">{lang}</span>
                          ))
                        ) : (
                          <span className="text-gray-800 text-xs italic">Not listed</span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-500 font-medium">Webhooks</span>
                      <span className={tool.hasWebhooks ? 'text-terminal-green font-bold' : 'text-gray-600'}>
                        {tool.hasWebhooks ? 'Active' : 'No'}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-gray-500 font-medium">OpenAPI</span>
                      {tool.hasOpenApiSpec ? (
                        <a href={tool.openApiSpecUrl} target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline text-xs">
                          View Spec
                        </a>
                      ) : (
                        <span className="text-gray-800 text-xs italic">No spec found</span>
                      )}
                    </div>
                  </div>

                  {/* Agent Integrations List */}
                  <div className="mt-12 border-t border-white/10 pt-8">
                    <h3 className="flex items-center gap-2 font-heading text-xl font-black italic tracking-tighter text-paper-white">
                      <Plug className="h-4 w-4" /> Agent Links
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
                            <span className="text-xs font-bold text-paper-white uppercase tracking-wider">{integration.platform}</span>
                            <ExternalLink className="h-3 w-3 text-gray-700 group-hover:text-terminal-green" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-4 text-xs italic text-gray-700">No agent integrations yet</p>
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
