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
    <div className="flex flex-col">
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black">
        <Link
          href="/categories"
          className="type-label mb-12 inline-block opacity-40 hover:opacity-100 hover:underline"
        >
          &lt;- All Infrastructure Modules
        </Link>

        <h1 className="type-display mb-8">
          {category.name}
        </h1>
        <p className="mt-8 text-2xl font-medium opacity-60 max-w-3xl leading-relaxed">{category.description}</p>
      </section>

      <div className="swiss-grid-bg grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 md:p-12">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="swiss-card group h-full"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center border border-ink-black bg-white group-hover:bg-accent-blue transition-all duration-500 text-2xl font-black">
                {tool.name.charAt(0)}
              </div>
              <div className="type-label opacity-40 mt-1">ID: {tool.slug}</div>
            </div>

            <h2 className="mt-6 text-2xl font-bold tracking-tight">
              {tool.name}
            </h2>

            <p className="mt-4 text-sm font-medium opacity-60 line-clamp-3 mb-10">
              {tool.oneLiner}
            </p>

            <div className="mt-auto pt-8 border-t border-ink-black/10 flex flex-wrap items-center gap-3">
              {tool.aiDifficulty && (
                <span className="swiss-badge opacity-40">
                  {tool.aiDifficulty}
                </span>
              )}

              {tool.apiType.map((api) => (
                <span key={api} className="swiss-badge">{api}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="mt-32 text-center p-24">
          <p className="text-xl font-bold opacity-40 uppercase tracking-widest">No modules detected in this node.</p>
        </div>
      )}
    </div>
  )
}
