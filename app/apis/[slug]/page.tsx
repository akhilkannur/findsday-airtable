import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getToolBySlug, getAllSlugs, getToolsByCategory, getAllTools, getAllCategories } from "@/lib/tools"
import type { SalesTool } from "@/lib/types"
import { getSkillsForTool } from "@/lib/skills"
import {
  ExternalLink,
  Zap,
  ArrowRight,
} from "lucide-react"
import { CopyButton } from "@/components/ui/CopyButton"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { getUseCasesForTool } from "@/lib/usecases"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = await getToolBySlug(slug)

  if (!tool) {
    return {
      title: "Tool Not Found | Salestools Club",
      description: "The requested tool could not be located.",
    }
  }

  const pageTitle = tool.mcpReady
    ? `${tool.name} API & MCP Server — Prompts for Claude Code or other AI Agents | Salestools Club`
    : `${tool.name} API — Prompts for Claude Code or other AI Agents | Salestools Club`
  const pageUrl = `https://salestools.club/apis/${tool.slug}`

  return {
    title: pageTitle,
    description: `${tool.oneLiner} Connect ${tool.name} directly to Claude Code or other AI agents using specialized API prompts, SDKs, and integrations.`,
    alternates: {
      canonical: pageUrl,
    },
    ...(!tool.docsUrl && {
      robots: { index: false, follow: true },
    }),
    openGraph: {
      title: pageTitle,
      description: `${tool.oneLiner} Connect ${tool.name} directly to Claude Code or other AI agents using specialized API prompts, SDKs, and integrations.`,
      type: "website",
      url: pageUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: `${tool.oneLiner} Connect ${tool.name} directly to Claude Code or other AI agents using specialized API prompts, SDKs, and integrations.`,
    },
  }
}

function JsonLd({ tool, alternatives }: { tool: SalesTool; alternatives: SalesTool[] }) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.oneLiner,
    url: tool.websiteUrl,
    applicationCategory: "SalesSoftware",
    applicationSubCategory: tool.category,
    operatingSystem: "Cloud, Web, API",
    offers: {
      "@type": "Offer",
      price: tool.hasFreeTier ? "0" : undefined,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: tool.aiCapabilities?.join(", "),
    screenshot: `https://salestools.club/apis/${tool.slug}/opengraph-image`,
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does ${tool.name} do?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${tool.name} is a ${tool.category.toLowerCase()} tool that provides ${tool.oneLiner}`,
        },
      },
      {
        "@type": "Question",
        name: `How do I use ${tool.name} with Claude Code or other AI agents?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can connect ${tool.name} directly to Claude Code or other AI agents using its ${tool.apiType?.join(' or ') || 'API'}. Simply provide your ${tool.authMethod?.join(' or ') || 'authentication'} details and use our prompt examples to automate ${tool.aiCapabilities?.slice(0, 2).join(' and ') || 'sales workflows'} without extra middleware.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${tool.name} API free?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: tool.hasFreeTier 
            ? `Yes, ${tool.name} offers a free tier for its API.` 
            : `No, ${tool.name} is a paid service, but you can check their website for current trial offers.`,
        },
      },
      {
        "@type": "Question",
        name: `What are the best alternatives to ${tool.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: alternatives.length > 0 
            ? `The best alternatives to ${tool.name} include ${alternatives.map(a => a.name).join(", ")}.`
            : `Top alternatives in the ${tool.category} category include similar tools listed in our directory.`,
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

function ToolCard({ tool }: { tool: SalesTool }) {
  return (
    <Link
      href={`/apis/${tool.slug}`}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
          {tool.name.charAt(0)}
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
        <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-2">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all pt-4">
        <div className="font-mono text-[9px] uppercase tracking-widest text-ink">View Details</div>
        <ArrowRight className="h-3 w-3 text-black transition-transform group-hover:translate-x-1" />
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
  const tool = await getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const actionLinks = [
    { label: "Documentation", href: tool.docsUrl },
    { label: "Website", href: tool.websiteUrl },
    { label: "Pricing", href: tool.pricingUrl },
  ].filter(link => link.href && link.href !== "")

  const matchingUseCases = getUseCasesForTool(tool)
  const categoryMeta = getAllCategories().find(c => c.name === tool.category)

  // Find alternatives – score by relevance so each tool gets unique, meaningful matches
  const allTools = await getAllTools()
  const alternatives = allTools
    .filter(t => t.slug !== tool.slug)
    .map(t => {
      let score = 0
      // Highest: tool explicitly lists this as an alternative
      if (tool.alternativeTo?.some(alt => t.name.toLowerCase().includes(alt.toLowerCase()))) score += 10
      // High: this tool lists current tool as an alternative
      if (t.alternativeTo?.some(alt => tool.name.toLowerCase().includes(alt.toLowerCase()))) score += 8
      // Medium: overlapping aiCapabilities
      const capOverlap = (tool.aiCapabilities ?? []).filter(c =>
        (t.aiCapabilities ?? []).some(tc => tc.toLowerCase() === c.toLowerCase())
      ).length
      score += capOverlap * 3
      // Low: same category
      if (t.category === tool.category) score += 1
      return { tool: t, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ tool }) => tool)

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd tool={tool} alternatives={alternatives} />
      <BreadcrumbJsonLd items={[
        { name: "APIs", url: "https://salestools.club/api" },
        { name: tool.name, url: `https://salestools.club/apis/${tool.slug}` },
      ]} />

      <nav className="layout-container py-6 flex items-center gap-2 text-[0.7rem] font-mono uppercase tracking-widest text-ink-fade">
        <Link href="/" className="hover:text-ink hover:underline">Home</Link>
        <span className="opacity-30">/</span>
        <Link href="/api" className="hover:text-ink hover:underline">APIs</Link>
        <span className="opacity-30">/</span>
        {categoryMeta && (
          <>
            <Link href={`/categories/${categoryMeta.slug}`} className="hover:text-ink hover:underline">{tool.category}</Link>
            <span className="opacity-30">/</span>
          </>
        )}
        <span className="text-ink font-bold">{tool.name}</span>
      </nav>

      <section className="px-8 py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <Link
            href="/api"
            className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all mb-12 inline-block"
          >
            &lt;- Back to Directory
          </Link>

          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-10">
                <div className="w-24 h-24 flex items-center justify-center bg-ink text-paper text-5xl font-bold [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
                  {tool.name.charAt(0)}
                </div>
                <div className="space-y-4">
                  <div className="circled font-mono text-[0.75rem] font-bold uppercase">{tool.category}</div>
                  <h1 className="type-display uppercase">{tool.name}</h1>
                </div>
              </div>
              <p className="mt-12 font-serif italic text-2xl text-ink-fade leading-relaxed max-w-2xl border-l-2 border-ink pl-6">{tool.oneLiner}</p>
            </div>

            {actionLinks.length > 0 && <div className="flex flex-col gap-4">
              <div className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-2">Important Links</div>
              {actionLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif italic text-xl border-b border-ink hover:opacity-60 transition-opacity py-2 flex justify-between items-center group min-w-[240px]"
                >
                  {link.label} <span className="opacity-40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                </a>
              ))}
            </div>}
          </div>
        </div>
      </section>

      <div className="layout-container grid grid-cols-1 lg:grid-cols-[1fr_400px] border-x border-ink bg-white/40">
        <div className="p-10 md:p-20 space-y-32 border-r border-ink">
          {tool.aiCapabilities && tool.aiCapabilities.length > 0 && (
            <div>
              <div className="flex items-center gap-6 mb-12">
                <div className="font-mono text-[0.8rem] uppercase tracking-wider text-ink">Key Features</div>
                <div className="h-px flex-grow bg-ink opacity-10"></div>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {tool.aiCapabilities.map((cap) => (
                  <div key={cap} className="tool-card group">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                      <span className="font-mono text-[0.85rem] uppercase tracking-tight">{cap}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tool.starterPrompt && (
            <div className="p-16 bg-paper border border-dashed border-ink relative group">
              <div className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-10">How to use this tool</div>
              <div className="font-serif italic text-2xl text-ink leading-relaxed">
                &quot;{tool.starterPrompt}&quot;
              </div>
            </div>
          )}

          <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-12">
              <div className="font-mono text-[0.8rem] uppercase tracking-wider text-ink">About {tool.name}</div>
              <div className="h-px flex-grow bg-ink opacity-10"></div>
            </div>
            <div className="font-serif text-xl leading-relaxed text-ink-fade whitespace-pre-line max-w-3xl">
              {tool.description}
            </div>
          </div>

          <div className="p-10 md:p-16 bg-paper-dark/20 border-l-4 border-ink space-y-8">
            <h3 className="font-mono text-[0.85rem] uppercase font-bold tracking-widest text-ink">Direct Agent Workflow for {tool.name}</h3>
            <p className="font-serif text-xl leading-relaxed text-ink-fade max-w-2xl italic">
              Connect {tool.name} directly to Claude Code or other AI agents to bypass traditional middleware like Clay or Make. Using the {tool.apiType?.join(' or ') || 'API'} and your {tool.authMethod?.join(' or ') || 'authentication'} credentials, your agent can perform {tool.aiCapabilities?.slice(0, 3).join(', ') || 'sales operations'} directly from your terminal. This setup enables real-time data sync and complex automation with zero middleware tax.
            </p>
          </div>

          {getSkillsForTool(tool.slug).length > 0 && (
            <div>
              <div className="flex items-center gap-6 mb-12">
                <div className="font-mono text-[0.8rem] uppercase tracking-wider text-ink">AI Agent Skills</div>
                <div className="h-px flex-grow bg-ink opacity-10"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {getSkillsForTool(tool.slug).map((skill) => (
                  <Link
                    key={skill.slug}
                    href={`/skills/${skill.slug}`}
                    className="tool-card group flex flex-col h-full bg-paper border border-ink/20 p-8 hover:bg-ink hover:text-paper transition-all"
                  >
                    <div className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade group-hover:text-paper/60 mb-4">{skill.category}</div>
                    <h4 className="font-serif italic text-xl mb-4">{skill.name}</h4>
                    <p className="text-[0.85rem] leading-relaxed opacity-70 group-hover:opacity-90">{skill.description}</p>
                    <div className="mt-8 pt-6 border-t border-ink/10 group-hover:border-paper/20 flex items-center justify-between">
                      <span className="font-mono text-[0.7rem] uppercase">Get Skill</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchingUseCases.length > 0 && (
            <div>
              <div className="flex items-center gap-6 mb-12">
                <div className="font-mono text-[0.8rem] uppercase tracking-wider text-ink">Use {tool.name} for</div>
                <div className="h-px flex-grow bg-ink opacity-10"></div>
              </div>
              <div className="flex flex-wrap gap-4">
                {matchingUseCases.map((uc) => (
                  <Link
                    key={uc.slug}
                    href={`/for/${uc.slug}`}
                    className="font-mono text-[0.8rem] uppercase tracking-wide px-4 py-2 border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper transition-all"
                  >
                    {uc.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-10 md:p-20 bg-paper-dark/30 space-y-20">
          <div>
            <div className="font-mono text-[0.75rem] uppercase tracking-widest text-ink-fade mb-12">Technical Details</div>
            
            <div className="space-y-12">
              {[
                { label: "API Type", value: (tool.apiType || []).join(' / ') },
                { label: "Authentication", value: (tool.authMethod || []).join(' / ') },
                { label: "Pricing Tier", value: tool.hasFreeTier ? "Free Tier Available" : "Paid Only" },
                { label: "SDK Languages", value: (tool.sdkLanguages || []).join(', ') || "N/A" },
                { label: "Webhooks", value: tool.hasWebhooks ? "Yes" : "No" },
              ].map((spec) => (
                <div key={spec.label} className="group border-b border-ink/10 pb-8">
                  <div className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-3 group-hover:text-ink transition-colors italic">{spec.label}</div>
                  <div className="font-mono font-bold text-[0.85rem] uppercase tracking-widest">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {tool.integrations.find(i => i.platform === "MCP" && i.mcpConfig) && (
            <div className="tool-card group bg-black text-paper">
              <div className="flex items-center justify-between mb-10">
                <div className="font-mono text-[0.7rem] uppercase tracking-widest text-paper opacity-60">MCP Setup</div>
                <div className="w-2 h-2 bg-white rounded-full animate-status-blink"></div>
              </div>
              <pre className="font-mono text-[11px] whitespace-pre-wrap overflow-x-auto p-8 border border-white/10 bg-white/5 text-white/80 leading-relaxed mb-8">
                {tool.integrations.find(i => i.platform === "MCP")?.mcpConfig}
              </pre>
              <div className="flex justify-center">
                <CopyButton 
                  text={tool.integrations.find(i => i.platform === "MCP")?.mcpConfig || ""} 
                  label="Copy Config"
                  className="font-mono text-[0.7rem] uppercase border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="py-24 bg-paper border-t border-ink">
        <div className="layout-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif italic text-3xl mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-12">
              <div className="group border-b border-ink/10 pb-8">
                <h3 className="font-serif text-xl font-bold mb-4 group-hover:text-ink transition-colors">What does {tool.name} do?</h3>
                <p className="text-ink-fade leading-relaxed">{tool.name} is a {tool.category.toLowerCase()} tool that provides {tool.oneLiner}</p>
              </div>
              <div className="group border-b border-ink/10 pb-8">
                <h3 className="font-serif text-xl font-bold mb-4 group-hover:text-ink transition-colors">Is {tool.name} API free?</h3>
                <p className="text-ink-fade leading-relaxed">
                  {tool.hasFreeTier 
                    ? `Yes, ${tool.name} offers a free tier for its API, making it accessible for testing and small-scale projects.` 
                    : `No, ${tool.name} is a premium service. You can view their full pricing details at their official website.`
                  }
                </p>
              </div>
              {alternatives.length > 0 && (
                <div className="group border-b border-ink/10 pb-8">
                  <h3 className="font-serif text-xl font-bold mb-4 group-hover:text-ink transition-colors">What are the best alternatives to {tool.name}?</h3>
                  <p className="text-ink-fade leading-relaxed">
                    Based on features and use cases, the top alternatives to {tool.name} are {alternatives.map((a, i) => (
                      <span key={a.slug}>
                        <Link href={`/apis/${a.slug}`} className="font-bold hover:underline">{a.name}</Link>
                        {i === alternatives.length - 1 ? '.' : i === alternatives.length - 2 ? ' and ' : ', '}
                      </span>
                    ))}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-paper border-t border-ink">
        <div className="layout-container">
          {alternatives.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-6 mb-12">
                <h2 className="font-mono text-[0.8rem] uppercase tracking-wider text-ink">Compare {tool.name}</h2>
                <div className="h-px flex-grow bg-ink opacity-10"></div>
              </div>
              <div className="flex flex-wrap gap-4">
                {alternatives.map((alt) => (
                  <Link
                    key={alt.slug}
                    href={`/vs/${[tool.slug, alt.slug].sort().join('-vs-')}`}
                    className="font-mono text-[0.8rem] uppercase tracking-wide px-4 py-2 border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper transition-all"
                  >
                    {tool.name} vs {alt.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {alternatives.length > 0 && (
            <>
              <div className="flex items-center gap-6 mb-20">
                <h2 className="font-serif italic text-3xl">Alternatives to {tool.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {alternatives.map((alt) => (
                  <ToolCard key={alt.slug} tool={alt} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
