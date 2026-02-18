import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Zap, Brain } from "lucide-react"
import {
  getCategoryBySlug,
  getToolsByCategory,
  getAllCategorySlugs,
} from "@/lib/tools"

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return { title: "Segment Not Found | Findsday Registry" }
  }

  return {
    title: `${category.name} APIs & Infrastructure | Findsday`,
    description: category.description,
  }
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const tools = getToolsByCategory(category.name)

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "AI-Native": return "text-accent-pink bg-accent-pink/10 border-accent-pink/20"
      case "Beginner-Friendly": return "text-terminal-green bg-terminal-green/10 border-terminal-green/20"
      case "Technical": return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "Complex": return "text-orange-400 bg-orange-400/10 border-orange-400/20"
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-16 border-b border-white/10 pb-16 pt-12">
        <Link
          href="/categories"
          className="mb-12 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gray-600 transition-colors hover:text-terminal-green"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> ESCAPE_TO_SEGMENTS
        </Link>

        <h1 className="mt-12 font-heading text-6xl font-black italic tracking-tighter text-paper-white sm:text-8xl">
          {category.name}
        </h1>
        <p className="mt-8 max-w-2xl font-mono text-xs uppercase leading-loose tracking-widest text-gray-500">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group relative flex flex-col bg-banknote-black p-8 transition-all hover:bg-white/5"
          >
            {tool.mcpReady && (
              <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-terminal-green/20 text-terminal-green border border-terminal-green/30">
                <Zap className="h-3.5 w-3.5 fill-terminal-green" />
              </div>
            )}
            
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-white/5 font-heading text-xl font-black italic text-terminal-green transition-colors group-hover:bg-terminal-green group-hover:text-black">
                {tool.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tighter text-paper-white group-hover:text-terminal-green transition-colors">
                  {tool.name}
                </h2>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-600">ID: {tool.slug}</p>
              </div>
            </div>

            <p className="mb-8 font-mono text-[11px] uppercase leading-relaxed text-gray-500 line-clamp-2">
              {tool.oneLiner}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-3">
              {tool.aiDifficulty && (
                <span className={`inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${getDifficultyColor(tool.aiDifficulty)}`}>
                  <Brain className="h-3 w-3" /> {tool.aiDifficulty}
                </span>
              )}

              {tool.apiType.map((api) => (
                <span
                  key={api}
                  className="border border-terminal-green/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-terminal-green"
                >
                  {api}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <p className="mt-24 text-center font-mono text-sm uppercase text-gray-700">
          No entries registered for this segment.
        </p>
      )}
    </main>
  )
}
