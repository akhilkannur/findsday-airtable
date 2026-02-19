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
    return { title: "Category Not Found | Salestools Club" }
  }

  return {
    title: `${category.name} APIs & Tools | Salestools Club`,
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

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 sm:px-12 lg:px-24">
      <div className="mb-24">
        <Link
          href="/categories"
          className="mb-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> All Categories
        </Link>

        <h1 className="mt-12 text-6xl font-extrabold tracking-tight sm:text-8xl italic font-heading">
          {category.name}
        </h1>
        <p className="mt-8 text-2xl text-gray-400 max-w-3xl leading-relaxed">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="club-card group flex flex-col h-full"
          >
            <div className="mb-10 flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-2xl font-black text-white group-hover:bg-club-teal group-hover:text-black transition-all duration-500 shadow-inner">
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-club-teal transition-colors tracking-tight">
                    {tool.name}
                  </h2>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">ID: {tool.slug}</p>
                </div>
              </div>
              {tool.mcpReady && (
                <div className="badge-club border-club-teal/20 text-club-teal bg-club-teal/5">
                  <Zap className="h-3 w-3 fill-club-teal" /> MCP
                </div>
              )}
            </div>

            <p className="text-lg leading-relaxed text-gray-400 line-clamp-3 mb-10">
              {tool.oneLiner}
            </p>

            <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap items-center gap-3">
              {tool.aiDifficulty && (
                <span className="badge-club">
                  <Brain className="h-3.5 w-3.5" /> {tool.aiDifficulty}
                </span>
              )}

              {tool.apiType.map((api) => (
                <span key={api} className="badge-club">{api}</span>
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
