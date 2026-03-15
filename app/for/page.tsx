import type { Metadata } from "next"
import Link from "next/link"
import { getAllUseCases, getToolsForUseCase } from "@/lib/usecases"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Sales AI Use Cases | Salestools Club",
  description:
    "Browse AI sales tools organized by use case — cold outreach, lead enrichment, CRM automation, prospecting, and more. Find the right APIs for what you're building.",
  alternates: {
    canonical: "https://salestools.club/for",
  },
  openGraph: {
    title: "Sales AI Use Cases | Salestools Club",
    description: "Browse AI sales tools organized by use case — cold outreach, lead enrichment, CRM automation, prospecting, and more. Find the right APIs for what you're building.",
    type: "website",
    url: "https://salestools.club/for",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales AI Use Cases | Salestools Club",
    description: "Browse AI sales tools organized by use case — cold outreach, lead enrichment, CRM automation, prospecting, and more. Find the right APIs for what you're building.",
  },
}

export default function UseCasesPage() {
  const usecases = getAllUseCases()

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-4 md:px-8 py-12 md:py-16 border-b border-ink">
        <div className="layout-container">
          <h1 className="type-display mb-4 md:mb-6 text-3xl md:text-5xl lg:text-7xl">Browse by Use Case</h1>
          <p className="max-w-2xl font-serif italic text-lg md:text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Tools organized by what you're actually trying to accomplish. Pick a workflow, get the APIs.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {usecases.map((uc, idx) => {
              const toolCount = getToolsForUseCase(uc).length

              return (
                <Link
                  key={uc.slug}
                  href={`/for/${uc.slug}`}
                  className="group flex flex-col h-full gap-6 md:gap-8 p-6 md:p-8 bg-paper-dark/60 hover:translate-y-[-4px] transition-all"
                  style={{ border: "1px solid rgba(26, 25, 23, 0.15)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8 mb-4">
                      {uc.title}
                    </h2>
                    <p className="text-[1rem] text-ink-fade line-clamp-3 leading-relaxed">
                      {uc.intro}
                    </p>
                  </div>

                  <div className="mt-auto pt-8 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all border-t border-dashed border-ink/20">
                    <div className="font-mono text-[0.7rem] uppercase">
                      {toolCount} Tools
                    </div>
                    <div className="font-mono text-[0.7rem] uppercase tracking-widest">
                      Open -&gt;
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
