import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import type { Metadata } from "next"
import { getToolBySlug, getAllTools, getAllCategories, getOpenSourceTools } from "@/lib/tools"
import type { SalesTool } from "@/lib/types"
import { getSkillsForTool } from "@/lib/skills"
import {
  ExternalLink,
  Zap,
  ArrowRight,
  Github,
  Server,
  Code,
} from "lucide-react"
import { CopyButton } from "@/components/ui/CopyButton"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { getUseCasesForTool } from "@/lib/usecases"
import { ToolLogo } from "@/components/ToolLogo"
import { GitHubStars } from "@/components/GitHubStars"
import { generateSeoTitle, generateSeoDescription } from "@/lib/seo"

export async function generateStaticParams() {
  const tools = await getOpenSourceTools()
  return tools.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = await getToolBySlug(slug)

  if (!tool || !tool.isOpenSource) {
    return {
      title: "Tool Not Found | Salestools Club",
      description: "The requested tool could not be located.",
      robots: { index: false, follow: true },
    }
  }

  const pageTitle = `${tool.name} | Open Source Sales Tool`
  const pageUrl = `https://salestools.club/open-source-sales-tools/${tool.slug}`
  const pageDescription = `Self-host and customize ${tool.name}, an open-source sales platform. ${tool.oneLiner}`

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: pageUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  }
}

function ToolCard({ tool }: { tool: SalesTool }) {
  const href = tool.isOpenSource ? `/open-source-sales-tools/${tool.slug}` : `/apis/${tool.slug}`
  return (
    <Link
      href={href}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} />
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

export default async function OpenSourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = await getToolBySlug(slug)

  if (!tool) {
    permanentRedirect("/open-source-sales-tools")
  }

  if (!tool.isOpenSource) {
    permanentRedirect(`/apis/${slug}`)
  }

  const typedTool = tool as SalesTool
  const categoryMeta = getAllCategories().find(c => c.name === typedTool.category)

  const actionLinks = [
    { label: "GitHub Repository", href: typedTool.githubUrl },
    { label: "Documentation", href: typedTool.docsUrl },
    { label: "Website", href: typedTool.websiteUrl },
  ].filter(link => link.href && link.href !== "")

  // Find alternatives
  const allTools = await getAllTools()
  const alternatives = allTools
    .filter(t => t.slug !== typedTool.slug)
    .map(t => {
      let score = 0
      if (t.isOpenSource) score += 5
      if (t.category === typedTool.category) score += 3
      return { tool: t, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ tool }) => tool)

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd items={[
        { name: "Open Source", url: "https://salestools.club/open-source-sales-tools" },
        { name: typedTool.name, url: `https://salestools.club/open-source-sales-tools/${typedTool.slug}` },
      ]} />

      <nav className="layout-container py-4 md:py-8 flex flex-wrap items-center gap-2 text-[0.65rem] md:text-[0.75rem] font-mono uppercase tracking-widest text-ink-fade">
        <Link href="/" className="hover:text-ink hover:underline hover:line-through transition-all">Home</Link>
        <span className="opacity-30">/</span>
        <Link href="/open-source-sales-tools" className="hover:text-ink hover:underline hover:line-through transition-all">Open Source</Link>
        <span className="opacity-30">/</span>
        <span className="text-ink font-bold">{typedTool.name}</span>
      </nav>

      <section className="px-4 py-12 md:px-8 md:py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <Link
            href="/open-source-sales-tools"
            className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase underline hover:line-through transition-all mb-8 md:mb-16 inline-flex items-center gap-2 group/back"
          >
            <span className="group-hover/back:-translate-x-1 transition-transform">←</span> Back to Open Source
          </Link>

          <div className="flex flex-col gap-8 md:gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                <ToolLogo name={typedTool.name} websiteUrl={typedTool.websiteUrl} size="lg" />
                <div className="space-y-2 md:space-y-4">
                  <div className="circled font-mono text-[0.65rem] md:text-[0.75rem] font-bold uppercase">Open Source {typedTool.category}</div>
                  <h1 className="type-display uppercase text-3xl md:text-4xl lg:text-5xl">{typedTool.name}</h1>
                </div>
              </div>
              <p className="mt-8 md:mt-12 font-serif italic text-xl md:text-2xl text-ink-fade leading-relaxed max-w-2xl border-l-2 border-ink pl-4 md:pl-6">{typedTool.oneLiner}</p>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <div className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-ink-fade mb-1 md:mb-2">Project Resources</div>
              {actionLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif italic text-lg md:text-xl border-b border-ink hover:opacity-60 transition-opacity py-2 flex justify-between items-center group min-w-full md:min-w-[240px]"
                >
                  {link.label} <span className="opacity-40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="layout-container grid grid-cols-1 lg:grid-cols-[1fr_400px] md:border-x border-ink bg-white/40">
        <div className="p-6 md:p-10 lg:p-20 space-y-16 md:space-y-32 lg:border-r border-ink">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5" />
                <h3 className="font-mono text-sm uppercase font-bold">Open Source</h3>
              </div>
              <p className="font-serif text-lg leading-relaxed text-ink-fade">
                This tool is fully open-source. You can inspect the code, contribute to its development, and ensure full data sovereignty by hosting it yourself.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5" />
                <h3 className="font-mono text-sm uppercase font-bold">Self-Hostable</h3>
              </div>
              <p className="font-serif text-lg leading-relaxed text-ink-fade">
                Avoid vendor lock-in. Deploy {typedTool.name} on your own infrastructure (AWS, DigitalOcean, or private servers) for maximum privacy and control.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wider text-ink">AI Agent Capabilities</div>
              <div className="h-px flex-grow bg-ink opacity-10"></div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:gap-8 sm:grid-cols-2">
              {typedTool.aiCapabilities.map((cap) => (
                <div key={cap} className="tool-card group">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full mt-2"></div>
                    <span className="font-mono text-[0.75rem] md:text-[0.85rem] uppercase tracking-tight">{cap}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wider text-ink">Project Description</div>
              <div className="h-px flex-grow bg-ink opacity-10"></div>
            </div>
            <div className="font-serif text-lg md:text-xl leading-relaxed text-ink-fade whitespace-pre-line max-w-3xl">
              {typedTool.description}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 lg:p-20 bg-paper-dark/30">
          <div className="lg:sticky lg:top-[120px] space-y-12 md:space-y-20">
            <div>
              <div className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase tracking-widest text-ink-fade mb-8 md:mb-12">Technical Meta</div>
              
              <div className="space-y-8 md:space-y-12">
                {[
                  { label: "API Type", value: (typedTool.apiType || []).join(' / ') },
                  { label: "Authentication", value: (typedTool.authMethod || []).join(' / ') },
                  { label: "Languages", value: (typedTool.sdkLanguages || []).join(', ') || "N/A" },
                  { label: "License", value: "Open Source" },
                ].map((spec) => (
                  <div key={spec.label} className="group border-b border-ink/10 pb-6 md:pb-8">
                    <div className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-ink-fade mb-2 md:mb-3 group-hover:text-ink transition-colors italic">{spec.label}</div>
                    <div className="font-mono font-bold text-[0.75rem] md:text-[0.85rem] uppercase tracking-widest">{spec.value}</div>
                  </div>
                ))}
                {typedTool.githubUrl && <GitHubStars githubUrl={typedTool.githubUrl} variant="detail" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-32 bg-paper border-t border-ink">
        <div className="layout-container">
          <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-20">
            <h2 className="font-serif italic text-2xl md:text-3xl">Similar Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            {alternatives.map((alt) => (
              <ToolCard key={alt.slug} tool={alt} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
