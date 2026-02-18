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
    return { title: "Category Not Found | Findsday" }
  }

  return {
    title: `${category.name} APIs & Tools | Findsday`,
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
      case "AI-Native": return "text-brand-purple"
      case "Beginner-Friendly": return "text-terminal-green"
      case "Technical": return "text-blue-400"
      case "Complex": return "text-orange-400"
      default: return "text-gray-500"
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 sm:px-12 lg:px-24">
      <div className="mb-20">
        <Link
          href="/categories"
          className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> All Categories
        </Link>

        <h1 className="mt-8 text-5xl font-extrabold tracking-tight sm:text-7xl">
          {category.name}
        </h1>
        <p className="mt-6 text-xl text-gray-400 max-w-3xl leading-relaxed">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="ghost-card group flex flex-col h-full"
          >
            <div className="mb-8 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-xl font-black group-hover:bg-white group-hover:text-black transition-all">
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-brand-purple transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">ID: {tool.slug}</p>
                </div>
              </div>
              {tool.mcpReady && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                  <Zap className="h-3.5 w-3.5 fill-brand-purple" />
                </div>
              )}
            </div>

            <p className="text-sm leading-relaxed text-gray-400 line-clamp-3 mb-10">
              {tool.oneLiner}
            </p>

            <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap items-center gap-3">
              {tool.aiDifficulty && (
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${getDifficultyColor(tool.aiDifficulty)}`}>
                  <Brain className="h-3 w-3" /> {tool.aiDifficulty}
                </span>
              )}

              {tool.apiType.map((api) => (
                <span
                  key={api}
                  className="text-[10px] font-bold text-gray-600 uppercase tracking-widest"
                >
                  {api}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="mt-32 text-center">
          <p className="text-xl font-bold text-gray-500">No tools in this category yet.</p>
        </div>
      )}
    </main>
  )
}
