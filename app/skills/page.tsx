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
      images: [
        {
          url: "https://salestools.club/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Salestools Club",
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "AI Agent Skills for Sales & GTM | Salestools Club",
      description: "Direct-to-agent instruction files for Claude Code, Gemini CLI, and other AI agents. Teach your agent how to write cold emails, qualify leads, and update CRMs without middleware.",
      images: ["https://salestools.club/opengraph-image"],
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
  "Claude Plugins",
]

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
    <div className="flex min-h-screen flex-col bg-paper">
      <section className="border-b border-ink/10 px-4 py-12 md:px-8 md:py-16">
        <div className="layout-container">
          <h1 className="type-display mb-4 text-3xl md:mb-6 md:text-5xl lg:text-7xl">Agent Skills</h1>
          <p className="max-w-2xl border-l border-ink/10 pl-4 text-lg leading-relaxed text-ink-fade md:pl-6 md:text-xl">
            Copy-paste instruction files that teach your AI agent how to do sales tasks. Drop them into your skills folder and let the agent work.
          </p>
        </div>
      </section>

      <div className="border-b border-ink/10 bg-white/50 py-6">
        <div className="layout-container">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/skills"
              className={`rounded-md border px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${!activeCategory ? "border-ink bg-ink text-paper" : "border-ink/10 bg-white text-ink-fade hover:border-ink/20 hover:text-ink"}`}
            >
              All
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/skills?category=${encodeURIComponent(cat)}`}
                className={`rounded-md border px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${activeCategory === cat ? "border-ink bg-ink text-paper" : "border-ink/10 bg-white text-ink-fade hover:border-ink/20 hover:text-ink"}`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {activeCategory && (
        <div className="border-b border-ink/10 bg-white/40 py-4 md:py-6">
          <div className="layout-container flex items-center justify-between">
            <span className="font-mono text-[0.7rem] md:text-[0.75rem] font-semibold uppercase tracking-[0.16em]">
              {skills.length} skills found
            </span>
            <Link
              href="/skills"
              className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase tracking-[0.16em] text-ink-fade transition-colors hover:text-ink"
            >
              Reset Filter
            </Link>
          </div>
        </div>
      )}

      <section className="py-8 md:py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <Link
                key={skill.slug}
                href={`/skills/${skill.slug}`}
                className="tool-card group flex h-full flex-col gap-4 p-6"
              >
                <div className="flex items-center justify-end">
                  <span className="rounded-md border border-ink/10 bg-ink/[0.03] px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-fade">
                    By {skill.source}
                  </span>
                </div>

                <div>
                  <h2 className="mb-3 text-[1rem] font-semibold leading-tight underline decoration-transparent underline-offset-4 transition-all group-hover:decoration-ink/30">
                    {skill.name}
                  </h2>
                  <p className="line-clamp-3 text-[0.9rem] leading-relaxed text-ink-fade">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-auto flex flex-col gap-4 border-t border-ink/10 pt-6">
                  {skill.worksWithTools.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-fade">
                      <span className="opacity-50">Requires:</span>
                      {skill.worksWithTools.join(" + ")}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-ink-fade transition-colors group-hover:text-ink">
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em]">
                      {skill.category}
                    </div>
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em]">
                      Open -&gt;
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {skills.length === 0 && (
            <div className="py-24 text-center opacity-60">
              <p className="mb-8 text-2xl">
                No skills found in this category.
              </p>
              <Link href="/skills" className="circled font-mono font-semibold">
                Clear Filter
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
