import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
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

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/categories"
        className="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-accent-green"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        All Categories
      </Link>

      <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
        {category.name} APIs & Tools
      </h1>

      <p className="mt-4 max-w-2xl text-gray-400">{category.description}</p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group rounded-xl border border-gray-800 bg-charcoal-dark p-6 transition-colors hover:border-gray-600"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-charcoal-light text-lg font-bold text-white">
                {tool.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-white">
                  {tool.name}
                </h2>
                <p className="text-sm text-gray-500">{tool.category}</p>
              </div>
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-gray-400">
              {tool.oneLiner}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {tool.apiType.map((api) => (
                <span
                  key={api}
                  className="rounded-full border border-gray-700 px-2.5 py-0.5 text-xs text-gray-300"
                >
                  {api}
                </span>
              ))}

              {tool.integrations.length > 0 && (
                <span className="rounded-full bg-accent-pink/10 px-2.5 py-0.5 text-xs text-accent-pink">
                  {tool.integrations[0].platform}
                </span>
              )}

              {tool.hasFreeTier && (
                <span className="rounded-full bg-accent-green/10 px-2.5 py-0.5 text-xs text-accent-green">
                  Free tier
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <p className="mt-16 text-center text-gray-500">
          No tools in this category yet.
        </p>
      )}
    </main>
  )
}
