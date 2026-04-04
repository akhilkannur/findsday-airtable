import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  getCategoryBySlug,
  getToolsByCategory,
  getAllCategorySlugs,
  getAllCategories,
} from "@/lib/tools"
import { ArrowRight } from "lucide-react"
import { ToolLogo } from "@/components/ToolLogo"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { generateSeoTitle, generateSeoDescription } from "@/lib/seo"

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

  const pageTitle = generateSeoTitle(category.name, "category")
  const pageDescription = generateSeoDescription(category.name, "category", category.toolCount)
  const pageUrl = `https://salestools.club/categories/${slug}`

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

function ToolCard({ tool }: { tool: any }) {
  const href = tool.isOpenSource ? `/open-source-sales-tools/${tool.slug}` : `/apis/${tool.slug}`
  return (
    <Link
      href={href}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
        <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-3 mb-4">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 items-center border-t border-dashed border-black/10 pt-4">
        <span className="ml-auto font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full group-hover:border-ink transition-colors">
          {tool.hasFreeTier ? "Free" : "Paid"}
        </span>
      </div>
    </Link>
  )
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

  const tools = await getToolsByCategory(category.name)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Best ${category.name} APIs`,
    "description": category.description,
    "numberOfItems": tools.length,
    "itemListElement": tools.map((tool, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": tool.name,
      "url": `https://salestools.club/apis/${tool.slug}`,
      "description": tool.oneLiner,
    })),
  }

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd items={[
        { name: "Categories", url: "https://salestools.club/categories" },
        { name: category.name, url: `https://salestools.club/categories/${slug}` },
      ]} />
      <section className="px-4 py-12 md:px-8 md:py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <Link
            href="/categories"
            className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase underline hover:line-through transition-all mb-8 md:mb-12 inline-block"
          >
            &lt;- Back to Categories
          </Link>

          <h1 className="type-display mb-6 md:mb-8 text-3xl md:text-4xl lg:text-5xl">
            Best {category.name} APIs.
          </h1>
          <p className="max-w-2xl font-serif italic text-xl md:text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            {category.description} These {tools.length} tools have been vetted for their ability to integrate with AI-native sales stacks.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-12">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          {tools.length === 0 && (
            <div className="text-center py-20 md:py-32 opacity-60 font-serif italic text-xl md:text-2xl">
              No tools indexed in this category.
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 md:py-24 bg-paper-dark/50 border-t border-ink">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8">
            <h2 className="font-serif italic text-2xl md:text-3xl">Related Categories</h2>
            <Link href="/categories" className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase underline hover:line-through">All Categories {'>'}</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            {getAllCategories().filter(c => c.slug !== slug).slice(0, 4).map(cat => (
              <Link 
                key={cat.slug} 
                href={`/categories/${cat.slug}`}
                className="group flex flex-col gap-4 md:gap-6 p-6 md:p-8 border border-transparent hover:border-ink/10 transition-all bg-paper"
              >
                <h3 className="text-lg md:text-xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8">{cat.name}</h3>
                <div className="mt-auto flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
