import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getSkillBySlug, getSkillSlugs } from "@/lib/skills"
import { getToolBySlug } from "@/lib/tools"
import { CopyButton } from "@/components/ui/CopyButton"
import { ArrowRight } from "lucide-react"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"

export async function generateStaticParams() {
  return getSkillSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const skill = getSkillBySlug(slug)

  if (!skill) {
    return {
      title: "Skill Not Found | Salestools Club",
      description: "The requested skill could not be located.",
      robots: { index: false, follow: true },
    }
  }

  const pageTitle = `${skill.name} — Agent Skill | Salestools Club`
  const pageDescription = skill.description
  const pageUrl = `https://salestools.club/skills/${skill.slug}`

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: pageUrl,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: pageTitle,
      description: pageDescription,
    },
  }
}

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const skill = getSkillBySlug(slug)

  if (!skill) {
    // Check if this was a skill that got converted to a use case (for/...)
    const { getUseCaseBySlug } = await import("@/lib/usecases")
    const usecase = getUseCaseBySlug(slug)
    if (usecase) {
      const { permanentRedirect } = await import("next/navigation")
      permanentRedirect(`/for/${usecase.slug}`)
    }
    const { permanentRedirect } = await import("next/navigation")
    permanentRedirect("/skills")
  }

  const linkedTools = (
    await Promise.all(
      skill.worksWithTools.map(async (ts) => {
        const tool = await getToolBySlug(ts)
        return tool ?? null
      })
    )
  ).filter(Boolean)

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd items={[
        { name: "Skills", url: "https://salestools.club/skills" },
        { name: skill.name, url: `https://salestools.club/skills/${skill.slug}` },
      ]} />
      <section className="px-4 md:px-8 py-10 md:py-14 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <Link
            href="/skills"
            className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase underline hover:line-through transition-all mb-6 md:mb-10 inline-block"
          >
            &lt;- Back to Skills
          </Link>

          <div className="max-w-4xl">
            <div className="space-y-3 md:space-y-4">
              <div className="circled font-mono text-[0.65rem] md:text-[0.75rem] font-bold uppercase">
                {skill.category}
              </div>
              <h1 className="type-display uppercase text-3xl md:text-5xl lg:text-7xl">{skill.name}</h1>
            </div>
            
            <div className="mt-6 md:mt-8 p-3 md:p-4 border border-ink/10 bg-paper-dark/20 inline-flex items-center gap-2">
              <p className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-ink-fade">
                Curated by Salestools Club • Created by{" "}
                {skill.sourceUrl ? (
                  <a href={skill.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-ink font-bold underline hover:line-through transition-all">
                    {skill.source} ↗
                  </a>
                ) : (
                  <span className="text-ink font-bold">{skill.source}</span>
                )}
              </p>
            </div>

            <p className="mt-8 md:mt-12 font-serif italic text-xl md:text-2xl text-ink-fade leading-relaxed max-w-2xl border-l-2 border-ink pl-4 md:pl-6">
              {skill.description}
            </p>
          </div>
        </div>
      </section>

      <div className="layout-container grid grid-cols-1 lg:grid-cols-[1fr_400px] md:border-x border-ink bg-white/40">
        {/* Left column */}
        <div className="p-6 md:p-10 lg:p-20 space-y-16 md:space-y-32 lg:border-r border-ink">
          {/* One-Click Install */}
          <div>
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wider text-ink">
                One-Click Add
              </div>
              <div className="h-px flex-grow bg-ink opacity-10"></div>
            </div>

            <div className="tool-card group bg-ink text-paper">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
                <div className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-paper opacity-60">
                  Terminal Command
                </div>
                <CopyButton
                  text={`npx salestools add ${skill.slug}`}
                  label="Copy Command"
                  className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase border border-white/20 px-3 py-1.5 md:px-4 md:py-2 hover:bg-white hover:text-black transition-all"
                />
              </div>
              <pre className="font-mono text-sm md:text-base p-6 md:p-8 border border-white/10 bg-white/5 text-white leading-relaxed font-bold overflow-x-auto">
                npx salestools add {skill.slug}
              </pre>
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10 flex flex-col gap-3 md:gap-4">
                <p className="font-mono text-[9px] md:text-[10px] text-paper/40 uppercase tracking-widest leading-relaxed">
                  Serve this skill to your agent instantly. Works with Claude Code, Gemini CLI, and other AI agents.
                </p>
                {skill.sourceUrl && (
                  <a 
                    href={skill.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper/60 hover:text-paper text-[0.65rem] md:text-[0.75rem] font-mono underline transition-colors"
                  >
                    View Original Source on {skill.source} ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Skill content */}
          <div>
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wider text-ink">
                Agent Instructions
              </div>
              <div className="h-px flex-grow bg-ink opacity-10"></div>
            </div>

            <div className="tool-card group bg-black text-paper">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
                <div className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-paper opacity-60">
                  {skill.slug}.md
                </div>
                <CopyButton
                  text={skill.promptContent}
                  label="Copy Instructions"
                  className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase border border-white/20 px-3 py-1.5 md:px-4 md:py-2 hover:bg-white hover:text-black transition-all"
                />
              </div>
              <div className="prose prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0 prose-pre:border-none">
                <pre className="font-mono text-[10px] md:text-[11px] whitespace-pre-wrap overflow-x-auto p-6 md:p-8 border border-white/10 bg-white/5 text-white/80 leading-relaxed">
                  {skill.promptContent}
                </pre>
              </div>
              <p className="mt-4 md:mt-6 font-mono text-[9px] md:text-[10px] text-paper/40 uppercase tracking-widest px-4 md:px-8 leading-relaxed">
                Copy this and paste it into your agent's system prompt or custom instructions.
              </p>
            </div>
          </div>

          {/* Infrastructure / Tools needed */}
          {linkedTools.length > 0 && (
            <div>
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                <div className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wider text-ink">
                  Required Tools
                </div>
                <div className="h-px flex-grow bg-ink opacity-10"></div>
              </div>
              
              <p className="mb-6 md:mb-8 font-serif italic text-base md:text-lg text-ink-fade">
                This skill requires the following tools to be connected to your agent via API or MCP:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {linkedTools.map((tool) => (
                  <Link
                    key={tool!.slug}
                    href={`/apis/${tool!.slug}`}
                    className="tool-card group flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4 md:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-lg md:text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
                        {tool!.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg md:text-xl font-semibold mb-2">
                        {tool!.name}
                      </h3>
                      <p className="text-sm md:text-[0.9rem] text-ink-fade leading-relaxed line-clamp-2">
                        {tool!.oneLiner}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all pt-4">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-ink">
                        View Details
                      </div>
                      <ArrowRight className="h-3 w-3 text-black transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* How to install */}
          <div>
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wider text-ink">
                How to Install
              </div>
              <div className="h-px flex-grow bg-ink opacity-10"></div>
            </div>

            <div className="p-8 md:p-16 bg-paper border border-dashed border-ink">
              <div className="font-serif text-lg md:text-xl leading-relaxed text-ink-fade space-y-6 md:space-y-8">
                <div className="space-y-3 md:space-y-4">
                  <p>
                    <strong className="font-mono text-[0.75rem] md:text-[0.85rem] uppercase text-ink">Method 1: One-Click (Recommended)</strong><br />
                    Copy the <code className="font-mono text-[0.75rem] md:text-[0.85rem] bg-paper-dark/60 px-1.5 md:px-2 py-0.5">npx salestools add</code> command above and paste it into your terminal. Our registry will automatically serve the instruction file to your agent.
                  </p>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  <p>
                    <strong className="font-mono text-[0.75rem] md:text-[0.85rem] uppercase text-ink">Method 2: Manual Copy</strong><br />
                    Copy the "Agent Instructions" block above and paste it directly into your agent's system prompt or custom instructions window.
                  </p>
                </div>

                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-ink/10">
                  <p className="text-[0.85rem] md:text-[0.9rem] italic opacity-60 text-ink-fade">
                    Curated and served via the Salestools.club registry. Original credit belongs to <strong>{skill.source}</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="p-6 md:p-10 lg:p-20 bg-paper-dark/30">
          <div className="lg:sticky lg:top-[120px] space-y-12 md:space-y-20">
            <div>
              <div className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase tracking-widest text-ink-fade mb-8 md:mb-12">
                Skill Details
              </div>

              <div className="space-y-8 md:space-y-12">
                {[
                  { label: "Difficulty", value: skill.difficulty },
                  { label: "Category", value: skill.category },
                  {
                    label: "Compatible With",
                    value: "Claude Code, Gemini CLI, AI Agents",
                  },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="group border-b border-ink/10 pb-6 md:pb-8"
                  >
                    <div className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-ink-fade mb-2 md:mb-3 group-hover:text-ink transition-colors italic">
                      {spec.label}
                    </div>
                    <div className="font-mono font-bold text-[0.75rem] md:text-[0.85rem] uppercase tracking-widest">
                      {spec.value}
                    </div>
                  </div>
                ))}
                <div className="group border-b border-ink/10 pb-6 md:pb-8">
                  <div className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-ink-fade mb-2 md:mb-3 group-hover:text-ink transition-colors italic">
                    Creator
                  </div>
                  <div className="font-mono font-bold text-[0.75rem] md:text-[0.85rem] uppercase tracking-widest">
                    {skill.sourceUrl ? (
                      <a href={skill.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:line-through transition-all">
                        {skill.source} ↗
                      </a>
                    ) : (
                      skill.source
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase tracking-widest text-ink-fade mb-8 md:mb-12">
                Related Pages
              </div>
              <div className="space-y-3 md:space-y-4">
                <Link
                  href="/api"
                  className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wide px-3 md:px-4 py-2 border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper transition-all block text-center"
                >
                  Browse All Tools
                </Link>
                <Link
                  href="/for"
                  className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wide px-3 md:px-4 py-2 border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper transition-all block text-center"
                >
                  Use Cases
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
