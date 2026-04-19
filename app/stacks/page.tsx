import type { Metadata } from "next"
import Link from "next/link"
import { getAllStacks, getToolsForStack } from "@/lib/stacks"

export const metadata: Metadata = {
  title: "Sales Tool Stacks | Salestools Club",
  description:
    "Curated tool combinations for specific sales workflows. Pre-built stacks of APIs that chain together — from prospecting to close.",
  alternates: {
    canonical: "https://salestools.club/stacks",
  },
  openGraph: {
    title: "Sales Tool Stacks | Salestools Club",
    description: "Curated tool combinations for specific sales workflows. Pre-built stacks of APIs that chain together — from prospecting to close.",
    type: "website",
    url: "https://salestools.club/stacks",
    images: [
      {
        url: "https://salestools.club/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Salestools Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Tool Stacks | Salestools Club",
    description: "Curated tool combinations for specific sales workflows. Pre-built stacks of APIs that chain together — from prospecting to close.",
    images: ["https://salestools.club/opengraph-image"],
  },
}

export default function StacksPage() {
  const stacks = getAllStacks()

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-4 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-4 md:mb-6 text-3xl md:text-5xl lg:text-7xl">Stacks</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Real stacks from real experts. We asked GTM engineers, sales ops leaders, and outbound specialists for their favorite 3 APIs. These are their battle-tested workflows.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {stacks.map((stack, idx) => {
              const stackTools = getToolsForStack(stack)

              return (
                <Link
                  key={stack.slug}
                  href={`/stacks/${stack.slug}`}
                  className="group flex flex-col h-full gap-6 md:gap-8 p-6 md:p-8 bg-paper-dark/60 hover:translate-y-[-4px] transition-all"
                  style={{ border: "1px solid rgba(26, 25, 23, 0.15)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">
                      {stack.expert ? "Expert Stack" : String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex -space-x-1">
                      {stackTools.map((tool) => (
                        <div
                          key={tool.slug}
                          className="w-8 h-8 bg-ink text-paper flex items-center justify-center font-serif font-bold text-[0.6rem] [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]"
                        >
                          {tool.name.substring(0, 1)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8 mb-4">
                      {stack.name}
                    </h2>
                    <p className="text-[1rem] text-ink-fade line-clamp-3 leading-relaxed mb-6">
                      {stack.tagline}
                    </p>

                    {stack.expert && (
                      <div className="flex items-center gap-3 pt-4 border-t border-ink/5">
                        <div className="w-8 h-8 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-ink/10">
                          <img
                            src={stack.expert.image}
                            alt={stack.expert.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.7rem] font-bold uppercase">{stack.expert.name}</span>
                          <span className="text-[0.6rem] text-ink-fade uppercase tracking-tight">
                            {stack.expert.company}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-8 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all border-t border-dashed border-ink/20">
                    <div className="font-mono text-[0.7rem] uppercase">
                      {stack.toolSlugs.length} Tools
                    </div>
                    <div className="font-mono text-[0.7rem] uppercase tracking-widest">
                      View Stack -&gt;
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
