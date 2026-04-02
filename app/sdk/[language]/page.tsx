import { getToolsBySdkLanguage, getAllSdkLanguages, getAllCategories } from "@/lib/tools"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProgrammaticFilterBar } from "@/components/ProgrammaticFilterBar"
import { ToolLogo } from "@/components/ToolLogo"
import { FaqSection } from "@/components/FaqSection"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  const languages = getAllSdkLanguages()
  return languages.map((lang) => ({
    language: lang.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> {
  const { language } = await params
  const langDisplay = language.charAt(0).toUpperCase() + language.slice(1)
  
  const tools = await getToolsBySdkLanguage(language)
  const hasTools = tools.length > 0

  return {
    title: `Sales APIs with ${langDisplay} SDKs | Salestools Club`,
    description: `Browse the best sales tools and APIs with official ${langDisplay} SDK packages. Ideal for building AI agents with Claude and Gemini.`,
    alternates: {
      canonical: `https://salestools.club/sdk/${language}`,
    },
    ...(!hasTools && {
      robots: { index: false, follow: true },
    }),
  }
}

export default async function SdkLanguagePage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ language: string }>,
  searchParams: Promise<{ category?: string }>
}) {
  const { language } = await params
  const { category: categorySlug } = await searchParams
  
  let tools = await getToolsBySdkLanguage(language)
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

  const langDisplay = language.charAt(0).toUpperCase() + language.slice(1)

  const faqItems = [
    {
      question: `What are the benefits of using a ${langDisplay} SDK for sales APIs?`,
      answer: `Using an official ${langDisplay} SDK simplifies development by providing pre-built methods for authentication, request handling, and error management. It ensures type safety and reduces the amount of boilerplate code you need to write for your sales automation.`
    },
    {
      question: `How do I install the ${langDisplay} package for these tools?`,
      answer: `Most tools listed here can be installed using standard package managers. For example, if it's a Node.js package, you would use 'npm install'. Specific installation instructions for each tool can be found on their individual detail pages or in their official documentation.`
    },
    {
      question: `Can these ${langDisplay} libraries be used with AI agents?`,
      answer: "Absolutely. In fact, providing an AI agent like Claude or Gemini with the SDK's documentation often results in more reliable code generation than using raw REST endpoints, as the agent can leverage the library's structured classes and methods."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd items={[
        { name: "SDKs", url: "https://salestools.club/api" },
        { name: langDisplay, url: `https://salestools.club/sdk/${language}` },
      ]} />

      <nav className="layout-container py-4 md:py-6 flex flex-wrap items-center gap-2 text-[0.65rem] md:text-[0.7rem] font-mono uppercase tracking-widest text-ink-fade">
        <Link href="/" className="hover:text-ink hover:underline">Home</Link>
        <span className="opacity-30">/</span>
        <span className="opacity-30 uppercase">SDKs</span>
        <span className="opacity-30">/</span>
        <span className="text-ink font-bold">{langDisplay}</span>
      </nav>

      <section className="px-4 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <p className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-ink-fade mb-3 md:mb-4">SDK Directory</p>
          <h1 className="type-display mb-4 md:mb-6 text-3xl md:text-5xl lg:text-7xl">{langDisplay} Sales APIs</h1>
          <p className="max-w-2xl font-serif italic text-xl md:text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Official {langDisplay} packages for building sales workflows. Use these libraries to avoid writing raw HTTP boilerplate.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="layout-container">
          <ProgrammaticFilterBar 
            categories={categories.map(c => ({ slug: c.slug, name: c.name }))} 
            baseUrl={`/sdk/${language}`}
          />

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/apis/${tool.slug}`}
                  className="tool-card group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} />
                    {tool.mcpReady && (
                      <div className="tag-mcp">MCP READY</div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">{tool.name}</h3>
                    <p className="text-[0.9rem] md:text-[1rem] text-ink-fade leading-relaxed line-clamp-2 mb-4 md:mb-6">
                      {tool.oneLiner}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 items-center">
                    <span className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-wider text-ink-fade">{tool.category}</span>
                    <span className="ml-auto font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full">
                      {tool.hasFreeTier ? "Free" : "Paid"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 md:py-20 text-center border-2 border-dashed border-ink/10">
              <p className="font-serif italic text-lg md:text-xl text-ink-fade">No tools found in this category with an official {langDisplay} SDK.</p>
              <Link href={`/sdk/${language}`} className="mt-4 inline-block font-mono text-[0.7rem] uppercase underline">Clear Category Filter</Link>
            </div>
          )}
        </div>
      </section>

      <FaqSection items={faqItems} title={`${langDisplay} SDK FAQ`} />
    </div>
  )
}
