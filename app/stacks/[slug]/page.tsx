import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getStackBySlug, getStackSlugs, getToolsForStack } from "@/lib/stacks"
import type { SalesTool } from "@/lib/types"
import { ToolLogo } from "@/components/ToolLogo"
import { ArrowRight } from "lucide-react"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"

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

  const pageTitle = `${stack.name} | Salestools Club`
  const pageDescription = stack.tagline
  const pageUrl = `https://salestools.club/stacks/${stack.slug}`

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

function ToolCard({ tool }: { tool: SalesTool }) {
  return (
    <Link
      href={`/apis/${tool.slug}`}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} />
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
      <BreadcrumbJsonLd items={[
        { name: "Stacks", url: "https://salestools.club/stacks" },
        { name: stack.name, url: `https://salestools.club/stacks/${stack.slug}` },
      ]} />
      <section className="px-4 py-12 md:px-8 md:py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <Link
            href="/stacks"
            className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase underline hover:line-through transition-all mb-8 md:mb-12 inline-block"
          >
            &lt;- Back to Stacks
          </Link>

          <div className="max-w-4xl">
            <div className="circled font-mono text-[0.65rem] md:text-[0.75rem] font-bold uppercase mb-4 md:mb-6">
              {stack.expert ? "Expert Recommendation" : `${stack.toolSlugs.length}-Tool Stack`}
            </div>
            <h1 className="type-display uppercase mb-8 md:mb-12 text-3xl md:text-5xl lg:text-7xl leading-tight tracking-tighter">
              {stack.name}
            </h1>
            <p className="font-serif italic text-xl md:text-2xl text-ink-fade leading-relaxed max-w-2xl border-l-2 border-ink pl-4 md:pl-6">
              {stack.tagline}
            </p>

            {stack.expert && (
              <div className="flex items-center gap-6 mt-12 bg-paper-dark p-6 md:p-8 border border-ink/10">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-ink shrink-0 shadow-[4px_4px_0px_0px_rgba(26,25,23,0.1)]">
                  <img
                    src={stack.expert.image}
                    alt={stack.expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase mb-0.5 leading-none tracking-tight">{stack.expert.name}</h3>
                  <div className="flex items-center gap-2 font-mono text-[0.6rem] md:text-[0.65rem] uppercase tracking-widest text-ink-fade">
                    <span>{stack.expert.role} @</span>
                    <Link href={stack.expert.companyUrl} target="_blank" className="underline hover:line-through">
                      {stack.expert.company}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 border-b border-ink">
        <div className="layout-container">
          <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-20">
            <div className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wider text-ink">
              {stack.expert ? "Expert Picks" : "Workflow"}
            </div>
            <div className="h-px flex-grow bg-ink opacity-10"></div>
          </div>

          <div className="max-w-4xl space-y-16 md:space-y-32">
            {stack.workflow.map((step, idx) => {
              const tool = stackTools.find((t) => t.slug === step.toolSlug)

              if (stack.expert) {
                return (
                  <div key={idx} className="relative group">
                    <div className="flex flex-col gap-6 md:gap-8">
                      <div className="flex items-center gap-4">
                        {tool ? (
                          <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} size="sm" />
                        ) : (
                          <div className="w-8 h-8 bg-ink text-paper flex items-center justify-center font-mono text-[0.6rem] font-bold shrink-0 [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
                            {idx + 1}
                          </div>
                        )}
                        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                          {step.step}
                        </h3>
                      </div>

                      <div className="relative">
                        <p className="font-serif text-2xl md:text-4xl text-ink leading-snug md:leading-tight">
                          &ldquo;{step.description}&rdquo;
                        </p>
                      </div>

                      {tool && (
                        <div className="flex items-center gap-4 pt-4">
                          <ArrowRight className="h-5 w-5 text-ink-fade" />
                          <Link
                            href={`/apis/${tool.slug}`}
                            className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase underline underline-offset-4 hover:line-through decoration-ink/30 hover:decoration-ink transition-all"
                          >
                            Explore {tool.name} API &rarr;
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )
              }

              return (
                <div key={idx} className="relative">
                  <div className="flex gap-6 md:gap-12">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-ink text-paper flex items-center justify-center font-mono text-xs md:text-sm font-bold shrink-0 [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      {idx < stack.workflow.length - 1 && (
                        <div className="w-px h-full bg-ink/20 min-h-[30px] md:min-h-[40px]"></div>
                      )}
                    </div>

                    <div className="pb-8 md:pb-12">
                      <div className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-ink-fade mb-1 md:mb-2">
                        Step {idx + 1}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold uppercase mb-2">
                        {step.step}
                      </h3>
                      {tool && (
                        <Link
                          href={`/apis/${tool.slug}`}
                          className="inline-block font-mono text-[0.7rem] md:text-[0.75rem] uppercase underline underline-offset-4 hover:line-through transition-all mb-3 md:mb-4"
                        >
                          {tool.name} →
                        </Link>
                      )}
                      <p className="text-base md:text-[1rem] text-ink-fade leading-relaxed max-w-xl">
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

      <section className="py-12 md:py-20 border-b border-ink">
        <div className="layout-container">
          <div className="flex items-center gap-4 md:gap-6 mb-10 md:mb-16">
            <div className="font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-wider text-ink">Tools in this Stack</div>
            <div className="h-px flex-grow bg-ink opacity-10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            {stackTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-paper">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center justify-between">
            {stack.expert ? (
              <div>
                <h2 className="font-serif italic text-xl md:text-2xl mb-3 md:mb-4">Are you a GTM expert?</h2>
                <p className="text-ink-fade text-base md:text-[1rem]">
                  Share your favorite 3 APIs and get featured in our experts directory.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="font-serif italic text-xl md:text-2xl mb-3 md:mb-4">Missing a tool in this stack?</h2>
                <p className="text-ink-fade text-base md:text-[1rem]">
                  Know a tool that would fit this workflow? Submit it to the directory.
                </p>
              </div>
            )}
            <Link
              href="/submit"
              className="w-full md:w-auto text-center font-mono text-[0.7rem] md:text-[0.75rem] uppercase tracking-widest border border-ink px-6 py-3 md:px-8 md:py-4 hover:bg-ink hover:text-paper transition-all"
            >
              {stack.expert ? "Submit Your Stack →" : "Submit a Tool →"}
            </Link>
          </div>

          <div className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-dashed border-ink/20 flex flex-wrap gap-4 md:gap-6">
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
              href="/api"
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
