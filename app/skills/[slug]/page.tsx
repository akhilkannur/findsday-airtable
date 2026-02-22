import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getSkillBySlug, getSkillSlugs } from "@/lib/skills"
import { getToolBySlug } from "@/lib/tools"
import { CopyButton } from "@/components/ui/CopyButton"
import { ArrowRight } from "lucide-react"

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
    }
  }

  return {
    title: `${skill.name} — Agent Skill | Salestools Club`,
    description: skill.description,
    alternates: {
      canonical: `https://salestools.club/skills/${skill.slug}`,
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
    notFound()
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
      <section className="px-8 py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <Link
            href="/skills"
            className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all mb-12 inline-block"
          >
            &lt;- Back to Skills
          </Link>

          <div className="max-w-4xl">
            <div className="space-y-4">
              <div className="circled font-mono text-[0.75rem] font-bold uppercase">
                {skill.category}
              </div>
              <h1 className="type-display uppercase">{skill.name}</h1>
            </div>
            <p className="mt-12 font-serif italic text-2xl text-ink-fade leading-relaxed max-w-2xl border-l-2 border-ink pl-6">
              {skill.description}
            </p>
          </div>
        </div>
      </section>

      <div className="layout-container grid grid-cols-1 lg:grid-cols-[1fr_400px] border-x border-ink bg-white/40">
        {/* Left column */}
        <div className="p-10 md:p-20 space-y-32 border-r border-ink">
          {/* Skill content */}
          <div>
            <div className="flex items-center gap-6 mb-12">
              <div className="font-mono text-[0.8rem] uppercase tracking-wider text-ink">
                Skill File
              </div>
              <div className="h-px flex-grow bg-ink opacity-10"></div>
            </div>

            <div className="tool-card group bg-black text-paper">
              <div className="flex items-center justify-between mb-10">
                <div className="font-mono text-[0.7rem] uppercase tracking-widest text-paper opacity-60">
                  {skill.slug}.md
                </div>
                <CopyButton
                  text={skill.promptContent}
                  label="Copy Skill"
                  className="font-mono text-[0.7rem] uppercase border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all"
                />
              </div>
              <pre className="font-mono text-[11px] whitespace-pre-wrap overflow-x-auto p-8 border border-white/10 bg-white/5 text-white/80 leading-relaxed">
                {skill.promptContent}
              </pre>
            </div>
          </div>

          {/* How to install */}
          <div>
            <div className="flex items-center gap-6 mb-12">
              <div className="font-mono text-[0.8rem] uppercase tracking-wider text-ink">
                How to Install
              </div>
              <div className="h-px flex-grow bg-ink opacity-10"></div>
            </div>

            <div className="p-16 bg-paper border border-dashed border-ink">
              <div className="font-serif text-xl leading-relaxed text-ink-fade space-y-6">
                <p>
                  <strong className="font-mono text-[0.85rem] uppercase text-ink">Option 1:</strong>{" "}
                  Drop this into your <code className="font-mono text-[0.85rem] bg-paper-dark/60 px-2 py-0.5">.claude/skills/</code> folder
                  as <code className="font-mono text-[0.85rem] bg-paper-dark/60 px-2 py-0.5">{skill.slug}.md</code>
                </p>
                <p>
                  <strong className="font-mono text-[0.85rem] uppercase text-ink">Option 2:</strong>{" "}
                  Paste the skill content directly into your agent&apos;s context window or system prompt.
                </p>
              </div>
            </div>
          </div>

          {/* Works with tools */}
          {linkedTools.length > 0 && (
            <div>
              <div className="flex items-center gap-6 mb-12">
                <div className="font-mono text-[0.8rem] uppercase tracking-wider text-ink">
                  Works With
                </div>
                <div className="h-px flex-grow bg-ink opacity-10"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {linkedTools.map((tool) => (
                  <Link
                    key={tool!.slug}
                    href={`/tools/${tool!.slug}`}
                    className="tool-card group flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
                        {tool!.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-2">
                        {tool!.name}
                      </h3>
                      <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-2">
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
        </div>

        {/* Right sidebar */}
        <div className="p-10 md:p-20 bg-paper-dark/30 space-y-20">
          <div>
            <div className="font-mono text-[0.75rem] uppercase tracking-widest text-ink-fade mb-12">
              Skill Details
            </div>

            <div className="space-y-12">
              {[
                { label: "Difficulty", value: skill.difficulty },
                { label: "Category", value: skill.category },
                { label: "Source", value: skill.source },
                {
                  label: "Compatible With",
                  value: "Claude Code, Cursor, Gemini CLI",
                },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="group border-b border-ink/10 pb-8"
                >
                  <div className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-3 group-hover:text-ink transition-colors italic">
                    {spec.label}
                  </div>
                  <div className="font-mono font-bold text-[0.85rem] uppercase tracking-widest">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[0.75rem] uppercase tracking-widest text-ink-fade mb-12">
              Related Pages
            </div>
            <div className="space-y-4">
              <Link
                href="/tools"
                className="font-mono text-[0.8rem] uppercase tracking-wide px-4 py-2 border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper transition-all block text-center"
              >
                Browse All Tools
              </Link>
              <Link
                href="/for"
                className="font-mono text-[0.8rem] uppercase tracking-wide px-4 py-2 border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper transition-all block text-center"
              >
                Use Cases
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
