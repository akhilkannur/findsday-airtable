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
    title: `Best ${category.name} APIs & SDKs (2026) | Salestools Club`,
    description: `Discover the best ${category.name} APIs and tools for AI agents. Curated list of ${category.toolCount} ${category.name.toLowerCase()} solutions for automated GTM.`,
    alternates: {
      canonical: `https://salestools.club/categories/${slug}`,
    },
  }
}

function ToolCard({ tool, index }: { tool: any, index: number }) {
  const colors = ['header-blue', 'header-red', 'header-yellow', 'header-green']
  const colorClass = colors[index % colors.length]

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="tool-card group"
    >
      <div className={`card-header-studs ${colorClass}`}>
        <div className="stud"></div><div className="stud"></div><div className="stud"></div>
      </div>
      <div className="card-body p-6 flex flex-col gap-4 text-left">
        <div className="card-top flex justify-between items-start">
          <div className="avatar w-12 h-12 bg-[#eee] border-2 border-black rounded-xl flex items-center justify-center font-extrabold text-xl text-black">
            {tool.name.charAt(0)}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-2 uppercase text-black">{tool.name}</h3>
          <p className="text-[0.85rem] text-[#666] leading-relaxed line-clamp-3 mb-4">
            {tool.oneLiner}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 items-center border-t border-dashed border-black/10 pt-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{tool.aiDifficulty}</span>
          <div className="ml-auto flex gap-1">
            {tool.apiType.map((api: string) => (
              <span key={api} className="text-[9px] font-bold uppercase tracking-widest text-white bg-black px-1.5 py-0.5 rounded-sm">{api}</span>
            ))}
          </div>
        </div>
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

  const tools = getToolsByCategory(category.name)

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-5 py-24 border-b-[var(--border-width)] border-black bg-[var(--lego-yellow)]">
        <div className="layout-container">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 bg-white px-3 py-1 border-2 border-black rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-colors mb-12 shadow-[2px_2px_0_black]"
          >
            &lt;- All Categories
          </Link>

          <div className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] mb-6 bg-white px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0_black]">Class: {category.name}</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-8 text-black uppercase">
            Best {category.name} APIs.
          </h1>
          <p className="max-w-2xl text-xl font-medium text-black/70 leading-relaxed">
            {category.description} These {tools.length} modules have been vetted for their ability to integrate with AI-native sales stacks.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {tools.map((tool, idx) => (
              <ToolCard key={tool.slug} tool={tool} index={idx} />
            ))}
          </div>

          {tools.length === 0 && (
            <div className="text-center py-32 brick bg-white">
              <p className="text-xl font-bold text-black uppercase tracking-widest">No nodes indexed in this class.</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-24 bg-[var(--lego-offwhite)] border-t-[var(--border-width)] border-black">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-black italic">Alternative Classes</h2>
            <Link href="/categories" className="brick brick-btn bg-white text-black font-bold text-[10px]">All Categories -></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {getAllCategories().filter(c => c.slug !== slug).slice(0, 4).map(cat => (
              <Link 
                key={cat.slug} 
                href={`/categories/${cat.slug}`}
                className="brick p-10 bg-white group hover:rotate-1 transition-all flex flex-col gap-6"
              >
                <div className="text-[10px] font-mono font-bold text-black/40">NODE_0{cat.toolCount}</div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-black group-hover:text-[var(--lego-blue)] transition-colors">{cat.name}</h3>
                <div className="mt-auto flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4 text-black" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
