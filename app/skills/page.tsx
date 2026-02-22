import type { Metadata } from "next"
import Link from "next/link"
import { getAllSkills, type Skill } from "@/lib/skills"

export const metadata: Metadata = {
  title: "Agent Skills for Sales | Salestools Club",
  description:
    "Copy-paste instruction files that teach AI agents how to write cold emails, qualify leads, update CRMs, and run sales workflows. Drop them into Claude Code, Cursor, or any AI agent.",
  alternates: {
    canonical: "https://salestools.club/skills",
  },
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
      <section className="px-8 py-24 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-8">Agent Skills</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
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

      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {skills.map((skill, idx) => (
              <Link
                key={skill.slug}
                href={`/skills/${skill.slug}`}
                className="group flex flex-col h-full gap-8 p-8 bg-paper-dark/60 hover:translate-y-[-4px] transition-all"
                style={{ border: "1px solid rgba(26, 25, 23, 0.15)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border rounded-full ${difficultyColor[skill.difficulty]}`}
                  >
                    {skill.difficulty}
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

                <div className="mt-auto pt-8 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all border-t border-dashed border-ink/20">
                  <div className="font-mono text-[0.7rem] uppercase">
                    {skill.category}
                  </div>
                  <div className="font-mono text-[0.7rem] uppercase tracking-widest">
                    Open -&gt;
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
