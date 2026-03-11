import { getFreeTierTools, getAllCategories } from "@/lib/tools"
import Link from "next/link"
import type { Metadata } from "next"
import { ProgrammaticFilterBar } from "@/components/ProgrammaticFilterBar"
import { FaqSection } from "@/components/FaqSection"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Free Sales APIs for AI Agents | Salestools Club",
  description: "A handpicked list of sales APIs and tools with free tiers. Build and test your autonomous sales workflows without a credit card.",
  alternates: {
    canonical: "https://salestools.club/free-sales-apis",
  },
}

export default async function FreeTierPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category: categorySlug } = await searchParams
  let tools = await getFreeTierTools()
  const categories = getAllCategories()

  if (categorySlug) {
    const resolvedCategory = categories.find(c => c.slug === categorySlug)
    if (resolvedCategory) {
      tools = tools.filter(t => t.category === resolvedCategory.name)
    }
  }

  const faqItems = [
    {
      question: "Are these APIs completely free?",
      answer: "The tools listed here offer either a 'forever free' tier with limited usage or a generous starting credit balance. Some may require a credit card for identity verification, but they all provide a way to start building and testing your sales workflows at no cost."
    },
    {
      question: "What can I build with free sales APIs?",
      answer: "You can build prototypes for lead enrichment, automated email verification, or even simple AI-driven prospecting systems. Free tiers are perfect for testing your logic with Claude or Gemini before scaling up to a paid plan."
    },
    {
      question: "How do I choose the best free API for my use case?",
      answer: "Focus on the specific capability you need. If you need contact data, look for tools like Apollo or Hunter. If you need CRM access, check out HubSpot's free developer tools. Use the category filter above to narrow down your options."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd items={[
        { name: "Free APIs", url: "https://salestools.club/free-sales-apis" },
      ]} />

      <nav className="layout-container py-6 flex items-center gap-2 text-[0.7rem] font-mono uppercase tracking-widest text-ink-fade">
        <Link href="/" className="hover:text-ink hover:underline">Home</Link>
        <span className="opacity-30">/</span>
        <span className="text-ink font-bold">Free Sales APIs</span>
      </nav>

      <section className="px-6 md:px-8 py-12 md:py-16 border-b border-ink bg-paper-dark/20">
        <div className="layout-container">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4">Value Hub</p>
          <h1 className="type-display mb-4 md:mb-6">Free Sales APIs</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Test and build your workflows for $0. These tools offer free tiers or free credits for AI-native operators.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="layout-container">
          <ProgrammaticFilterBar 
            categories={categories.map(c => ({ slug: c.slug, name: c.name }))} 
            baseUrl="/free-sales-apis"
          />

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {tools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/apis/${t.slug}`}
                  className="tool-card group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
                      {t.name.charAt(0)}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {t.mcpReady && (
                        <div className="tag-mcp">MCP READY</div>
                      )}
                      <div className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-green-600/30 text-green-700 bg-green-50 rounded-full">
                        Free Tier
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-2xl font-semibold mb-2">{t.name}</h3>
                    <p className="text-[1rem] text-ink-fade leading-relaxed line-clamp-2 mb-6">
                      {t.oneLiner}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 items-center">
                    <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-fade">{t.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-ink/10">
              <p className="font-serif italic text-xl text-ink-fade">No free tools found in this category.</p>
              <Link href="/free-sales-apis" className="mt-4 inline-block font-mono text-[0.7rem] uppercase underline">Clear Category Filter</Link>
            </div>
          )}
        </div>
      </section>

      <FaqSection items={faqItems} title="Free Sales APIs FAQ" />
    </div>
  )
}
