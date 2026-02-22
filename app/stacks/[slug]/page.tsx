import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getStackBySlug, getStackSlugs, getToolsForStack } from "@/lib/stacks"
import type { SalesTool } from "@/lib/types"
import { ArrowRight } from "lucide-react"

export async function generateStaticParams() {
  const slugs = getStackSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const stack = getStackBySlug(slug)

  if (!stack) {
    return {
      title: "Stack Not Found | Salestools Club",
      description: "The requested stack could not be located.",
    }
  }

  return {
    title: `${stack.name} | Salestools Club`,
    description: stack.tagline,
    alternates: {
      canonical: `https://salestools.club/stacks/${stack.slug}`,
    },
  }
}

function ToolCard({ tool }: { tool: SalesTool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
          {tool.name.charAt(0)}
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
        <p className="text-[0.9rem] text-ink-fade leading-relaxed line-clamp-2">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all pt-4">
        <div className="font-mono text-[9px] uppercase tracking-widest text-ink">View Details</div>
        <ArrowRight className="h-3 w-3 text-black transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export default async function StackDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const stack = getStackBySlug(slug)

  if (!stack) {
    notFound()
  }

  const stackTools = getToolsForStack(stack)

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-8 py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <Link
            href="/stacks"
            className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all mb-12 inline-block"
          >
            &lt;- Back to Stacks
          </Link>

          <div className="max-w-4xl">
            <div className="circled font-mono text-[0.75rem] font-bold uppercase mb-6">
              {stack.toolSlugs.length}-Tool Stack
            </div>
            <h1 className="type-display uppercase mb-12">{stack.name}</h1>
            <p className="font-serif italic text-2xl text-ink-fade leading-relaxed max-w-2xl border-l-2 border-ink pl-6">
              {stack.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-ink">
        <div className="layout-container">
          <div className="flex items-center gap-6 mb-16">
            <div className="font-mono text-[0.8rem] uppercase tracking-wider text-ink">Workflow</div>
            <div className="h-px flex-grow bg-ink opacity-10"></div>
          </div>

          <div className="max-w-3xl space-y-0">
            {stack.workflow.map((step, idx) => {
              const tool = stackTools.find((t) => t.slug === step.toolSlug)

              return (
                <div key={idx} className="relative">
                  <div className="flex gap-8 md:gap-12">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-mono text-sm font-bold shrink-0 [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      {idx < stack.workflow.length - 1 && (
                        <div className="w-px h-full bg-ink/20 min-h-[40px]"></div>
                      )}
                    </div>

                    <div className="pb-12">
                      <div className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-2">
                        Step {idx + 1}
                      </div>
                      <h3 className="text-xl font-bold uppercase mb-2">
                        {step.step}
                      </h3>
                      {tool && (
                        <Link
                          href={`/tools/${tool.slug}`}
                          className="inline-block font-mono text-[0.75rem] uppercase underline underline-offset-4 hover:line-through transition-all mb-4"
                        >
                          {tool.name} →
                        </Link>
                      )}
                      <p className="text-[1rem] text-ink-fade leading-relaxed max-w-xl">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-ink">
        <div className="layout-container">
          <div className="flex items-center gap-6 mb-16">
            <div className="font-mono text-[0.8rem] uppercase tracking-wider text-ink">Tools in this Stack</div>
            <div className="h-px flex-grow bg-ink opacity-10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {stackTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center justify-between">
            <div>
              <h2 className="font-serif italic text-2xl mb-4">Missing a tool in this stack?</h2>
              <p className="text-ink-fade text-[1rem]">
                Know a tool that would fit this workflow? Submit it to the directory.
              </p>
            </div>
            <Link
              href="/submit"
              className="font-mono text-[0.75rem] uppercase tracking-widest border border-ink px-8 py-4 hover:bg-ink hover:text-paper transition-all"
            >
              Submit a Tool →
            </Link>
          </div>

          <div className="mt-16 pt-16 border-t border-dashed border-ink/20 flex flex-wrap gap-6">
            <Link
              href="/for/cold-outreach"
              className="font-mono text-[0.7rem] uppercase underline underline-offset-4 hover:line-through transition-all"
            >
              Cold Outreach Tools
            </Link>
            <Link
              href="/for/prospecting"
              className="font-mono text-[0.7rem] uppercase underline underline-offset-4 hover:line-through transition-all"
            >
              Prospecting Tools
            </Link>
            <Link
              href="/for/crm-automation"
              className="font-mono text-[0.7rem] uppercase underline underline-offset-4 hover:line-through transition-all"
            >
              CRM Automation
            </Link>
            <Link
              href="/tools"
              className="font-mono text-[0.7rem] uppercase underline underline-offset-4 hover:line-through transition-all"
            >
              Full Directory
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
