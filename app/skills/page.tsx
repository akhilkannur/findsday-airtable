import type { Metadata } from "next"
import Link from "next/link"
import { getAllSkills, type Skill } from "@/lib/skills"

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string }> }): Promise<Metadata> {
  const sp = await searchParams
  const hasFilters = !!sp.category

  return {
    title: "AI Agent Skills for Sales & GTM | Salestools Club",
    description:
      "Direct-to-agent instruction files for Claude Code, Gemini CLI, and other AI agents. Teach your agent how to write cold emails, qualify leads, and update CRMs without middleware.",
    alternates: {
      canonical: "https://salestools.club/skills",
    },
    ...(hasFilters && {
      robots: { index: false, follow: true },
    }),
    openGraph: {
      title: "AI Agent Skills for Sales & GTM | Salestools Club",
      description: "Direct-to-agent instruction files for Claude Code, Gemini CLI, and other AI agents. Teach your agent how to write cold emails, qualify leads, and update CRMs without middleware.",
      type: "website",
      url: "https://salestools.club/skills",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "AI Agent Skills for Sales & GTM | Salestools Club",
      description: "Direct-to-agent instruction files for Claude Code, Gemini CLI, and other AI agents. Teach your agent how to write cold emails, qualify leads, and update CRMs without middleware.",
    },
  }
}

const CATEGORIES: Skill["category"][] = [
  "Outreach",
  "Research",
  "CRM",
  "Analytics",
  "Operations",
  "Enablement",
]

const difficultyColor: Record<Skill["difficulty"], string> = {
  Beginner: "border-green-600 text-green-800",
  Intermediate: "border-amber-600 text-amber-800",
  Advanced: "border-red-600 text-red-800",
}

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const sp = await searchParams
  const activeCategory = sp.category ?? ""

  const allSkills = getAllSkills()
  const skills = activeCategory
    ? allSkills.filter((s) => s.category === activeCategory)
    : allSkills

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-6 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-4 md:mb-6">Agent Skills</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Copy-paste instruction files that teach your AI agent how to do sales tasks. Drop them into your skills folder and let the agent work.
          </p>
        </div>
      </section>

      <div className="border-b border-ink bg-paper-dark/20 py-6">
        <div className="layout-container">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/skills"
              className={`font-mono text-[0.7rem] uppercase tracking-widest px-3 py-1.5 border transition-all ${!activeCategory ? "bg-ink text-paper border-ink" : "border-ink/20 text-ink-fade hover:border-ink hover:text-ink"}`}
            >
              All
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/skills?category=${encodeURIComponent(cat)}`}
                className={`font-mono text-[0.7rem] uppercase tracking-widest px-3 py-1.5 border transition-all ${activeCategory === cat ? "bg-ink text-paper border-ink" : "border-ink/20 text-ink-fade hover:border-ink hover:text-ink"}`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {activeCategory && (
        <div className="py-6 border-b border-ink bg-paper-dark/40">
          <div className="layout-container flex items-center justify-between">
            <span className="font-mono text-[0.75rem] font-bold">
              {skills.length} skills found
            </span>
            <Link
              href="/skills"
              className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all"
            >
              Reset Filter
            </Link>
          </div>
        </div>
      )}

      <section className="py-8 md:py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {skills.map((skill, idx) => (
              <Link
                key={skill.slug}
                href={`/skills/${skill.slug}`}
                className="group flex flex-col h-full gap-4 md:gap-6 p-5 md:p-8 bg-paper-dark/60 hover:translate-y-[-4px] transition-all"
                style={{ border: "1px solid rgba(26, 25, 23, 0.15)" }}
              >
                <div className="flex items-center justify-end">
                  <span
                    className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full text-ink-fade"
                  >
                    By {skill.source}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8 mb-4">
                    {skill.name}
                  </h2>
                  <p className="text-[1rem] text-ink-fade line-clamp-3 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-auto pt-8 flex flex-col gap-4 border-t border-dashed border-ink/20">
                  {skill.worksWithTools.length > 0 && (
                    <div className="font-mono text-[9px] uppercase tracking-tighter text-ink-fade flex flex-wrap gap-1 items-center">
                      <span className="opacity-40">Requires:</span>
                      {skill.worksWithTools.join(" + ")}
                    </div>
                  )}
                  <div className="flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all">
                    <div className="font-mono text-[0.7rem] uppercase">
                      {skill.category}
                    </div>
                    <div className="font-mono text-[0.7rem] uppercase tracking-widest">
                      Open -&gt;
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {skills.length === 0 && (
            <div className="text-center py-32 opacity-60">
              <p className="font-serif italic text-2xl mb-8">
                No skills found in this category.
              </p>
              <Link href="/skills" className="circled font-mono font-bold">
                Clear Filter
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
