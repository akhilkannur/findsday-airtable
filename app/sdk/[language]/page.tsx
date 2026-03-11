import { getToolsBySdkLanguage, getAllSdkLanguages } from "@/lib/tools"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const dynamic = "force-static"

export async function generateStaticParams() {
  const languages = getAllSdkLanguages()
  return languages.map((lang) => ({
    language: lang.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> {
  const { language } = await params
  const langDisplay = language.charAt(0).toUpperCase() + language.slice(1)
  
  return {
    title: `Sales APIs with ${langDisplay} SDKs | Salestools Club`,
    description: `Browse the best sales tools and APIs with official ${langDisplay} SDK packages. Ideal for building AI agents with Claude and Gemini.`,
    alternates: {
      canonical: `https://salestools.club/sdk/${language}`,
    },
  }
}

export default async function SdkLanguagePage({ params }: { params: Promise<{ language: string }> }) {
  const { language } = await params
  const tools = await getToolsBySdkLanguage(language)
  
  if (tools.length === 0) {
    notFound()
  }

  const langDisplay = language.charAt(0).toUpperCase() + language.slice(1)

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-6 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4">SDK Directory</p>
          <h1 className="type-display mb-4 md:mb-6">{langDisplay} Sales APIs</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Official {langDisplay} packages for building sales workflows. Use these libraries to avoid writing raw HTTP boilerplate.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/apis/${tool.slug}`}
                className="tool-card group flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
                    {tool.name.charAt(0)}
                  </div>
                  {tool.mcpReady && (
                    <div className="tag-mcp">MCP READY</div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-[1rem] text-ink-fade leading-relaxed line-clamp-2 mb-6">
                    {tool.oneLiner}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 items-center">
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-fade">{tool.category}</span>
                  <span className="ml-auto font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full">
                    {tool.hasFreeTier ? "Free" : "Paid"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
