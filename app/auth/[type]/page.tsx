import { getToolsByAuthMethod, getAllAuthMethods, getAllCategories } from "@/lib/tools"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProgrammaticFilterBar } from "@/components/ProgrammaticFilterBar"
import { FaqSection } from "@/components/FaqSection"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  const methods = getAllAuthMethods()
  return methods.map((m) => ({
    type: m.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params
  const typeDisplay = type.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
  
  const tools = await getToolsByAuthMethod(type)
  const hasTools = tools.length > 0

  return {
    title: `Sales APIs with ${typeDisplay} Auth | Salestools Club`,
    description: `Browse all sales tools and APIs that support ${typeDisplay} authentication. Find the easiest tools to connect to your AI agent.`,
    alternates: {
      canonical: `https://salestools.club/auth/${type}`,
    },
    ...(!hasTools && {
      robots: { index: false, follow: true },
    }),
  }
}

export default async function AuthMethodPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ type: string }>,
  searchParams: Promise<{ category?: string }>
}) {
  const { type } = await params
  const { category: categorySlug } = await searchParams
  
  let tools = await getToolsByAuthMethod(type)
  const categories = getAllCategories()
  
  if (categorySlug) {
    const resolvedCategory = categories.find(c => c.slug === categorySlug)
    if (resolvedCategory) {
      tools = tools.filter(t => t.category === resolvedCategory.name)
    }
  }
  
  if (tools.length === 0 && !categorySlug) {
    // Instead of 404, redirect to the main directory permanently
    const { permanentRedirect } = await import("next/navigation")
    permanentRedirect("/api")
  }

  const typeDisplay = type.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())

  const faqItems = [
    {
      question: `Why choose APIs with ${typeDisplay} authentication?`,
      answer: `Connecting AI agents like Claude or Gemini is much simpler when using ${typeDisplay}. It often requires less setup time and allows for faster prototyping of your automated sales workflows.`
    },
    {
      question: `Is ${typeDisplay} secure for sales data?`,
      answer: "Security depends on how you manage your credentials. Always store your tokens in environment variables and never hardcode them in your AI prompts or scripts. All tools listed here follow industry standards for data protection."
    },
    {
      question: "Can I use these APIs with Claude Code or Gemini CLI?",
      answer: `Yes. Most of these tools are specifically chosen because they are easy to plug into agentic tools. For ${typeDisplay}, you can usually just provide the credentials to your agent and it will handle the authentication headers automatically.`
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd items={[
        { name: "Auth", url: "https://salestools.club/api" },
        { name: typeDisplay, url: `https://salestools.club/auth/${type}` },
      ]} />

      <nav className="layout-container py-4 md:py-6 flex flex-wrap items-center gap-2 text-[0.65rem] md:text-[0.7rem] font-mono uppercase tracking-widest text-ink-fade">
        <Link href="/" className="hover:text-ink hover:underline">Home</Link>
        <span className="opacity-30">/</span>
        <span className="opacity-30 uppercase">Auth</span>
        <span className="opacity-30">/</span>
        <span className="text-ink font-bold">{typeDisplay}</span>
      </nav>

      <section className="px-4 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <p className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-ink-fade mb-3 md:mb-4">Auth Directory</p>
          <h1 className="type-display mb-4 md:mb-6 text-3xl md:text-5xl lg:text-7xl">{typeDisplay} APIs</h1>
          <p className="max-w-2xl font-serif italic text-xl md:text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Connecting your AI agent? These tools use {typeDisplay} auth, making them easy to use with Claude Code and Gemini CLI.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="layout-container">
          <ProgrammaticFilterBar 
            categories={categories.map(c => ({ slug: c.slug, name: c.name }))} 
            baseUrl={`/auth/${type}`}
          />

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                    {t.mcpReady && (
                      <div className="tag-mcp">MCP READY</div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">{t.name}</h3>
                    <p className="text-[0.9rem] md:text-[1rem] text-ink-fade leading-relaxed line-clamp-2 mb-4 md:mb-6">
                      {t.oneLiner}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 items-center">
                    <span className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-wider text-ink-fade">{t.category}</span>
                    <div className="ml-auto flex gap-1">
                      {t.authMethod.slice(0, 2).map(m => (
                        <span key={m} className="font-mono text-[8px] border border-ink/10 px-1.5 py-0.5 rounded uppercase">{m}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 md:py-20 text-center border-2 border-dashed border-ink/10">
              <p className="font-serif italic text-lg md:text-xl text-ink-fade">No tools found in this category with {typeDisplay} auth.</p>
              <Link href={`/auth/${type}`} className="mt-4 inline-block font-mono text-[0.7rem] uppercase underline">Clear Category Filter</Link>
            </div>
          )}
        </div>
      </section>

      <FaqSection items={faqItems} title={`${typeDisplay} Authentication FAQ`} />
    </div>
  )
}
