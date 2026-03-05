import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import {
  getUseCaseBySlug,
  getUseCaseSlugs,
  getToolsForUseCase,
  getAllUseCases,
} from "@/lib/usecases"

export async function generateStaticParams() {
  return getUseCaseSlugs().map((usecase) => ({ usecase }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ usecase: string }>
}): Promise<Metadata> {
  const { usecase } = await params
  const uc = getUseCaseBySlug(usecase)

  if (!uc) {
    return { title: "Use Case Not Found | Salestools Club" }
  }

  const pageTitle = `${uc.title} (2026) | Salestools Club`
  const pageDescription = uc.metaDescription
  const pageUrl = `https://salestools.club/for/${uc.slug}`

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
  return (
    <Link
      href={`/apis/${tool.slug}`}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
          {tool.name.charAt(0)}
        </div>
        {tool.mcpReady && <div className="tag-mcp">MCP READY</div>}
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
        <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-3 mb-4">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 items-center border-t border-dashed border-black/10 pt-4">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-fade group-hover:text-black transition-colors">
          {tool.category}
        </span>
        <span className="ml-auto font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full group-hover:border-ink transition-colors">
          {tool.hasFreeTier ? "Free" : "Paid"}
        </span>
      </div>
    </Link>
  )
}

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ usecase: string }>
}) {
  const { usecase } = await params
  const uc = getUseCaseBySlug(usecase)

  if (!uc) {
    notFound()
  }

  const tools = getToolsForUseCase(uc)
  const otherUseCases = getAllUseCases().filter((u) => u.slug !== uc.slug)

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-8 py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <Link
            href="/for"
            className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all mb-12 inline-block"
          >
            &lt;- Back to Use Cases
          </Link>

          <h1 className="type-display mb-8">{uc.title}</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            {uc.intro}
          </p>

          <div className="mt-12">
            <span className="font-mono text-[0.75rem] font-bold uppercase tracking-widest">
              {tools.length} tools indexed
            </span>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="layout-container">
          {tools.length < 3 && (
            <div className="mb-12 p-8 border border-dashed border-ink/30 bg-paper-dark/20">
              <p className="font-serif italic text-lg text-ink-fade">
                We&apos;re still building out this category.{" "}
                <Link
                  href="/submit"
                  className="underline hover:line-through transition-all text-ink"
                >
                  Submit a tool
                </Link>{" "}
                if we&apos;re missing something.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          {tools.length === 0 && (
            <div className="text-center py-32 opacity-60 font-serif italic text-2xl">
              No tools indexed for this use case yet.
            </div>
          )}
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-24 bg-paper-dark/50 border-t border-ink">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <h2 className="font-serif italic text-3xl">Keep Exploring</h2>
            <Link
              href="/api"
              className="font-mono text-[0.75rem] uppercase underline hover:line-through"
            >
              Full Directory -&gt;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {otherUseCases.slice(0, 4).map((u) => (
              <Link
                key={u.slug}
                href={`/for/${u.slug}`}
                className="group flex flex-col gap-6 p-8 border border-transparent hover:border-ink/10 transition-all bg-paper"
              >
                <h3 className="text-xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8">
                  {u.title}
                </h3>
                <div className="mt-auto flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 pt-8 border-t border-dashed border-ink/20">
            <Link
              href="/api"
              className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all"
            >
              All Tools
            </Link>
            <Link
              href="/mcp"
              className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all"
            >
              MCP Servers
            </Link>
            <Link
              href="/categories"
              className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all"
            >
              Categories
            </Link>
            <Link
              href="/submit"
              className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all"
            >
              Submit a Tool
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
