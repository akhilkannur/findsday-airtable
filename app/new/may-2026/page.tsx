import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = "New Sales Tools Added in May 2026 | Salestools Club"
  const pageDescription = "Discover the new sales and GTM tools added to our directory in May 2026. Find APIs, MCP servers, and AI-native tools for your sales stack."

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: "https://salestools.club/new/may-2026",
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: "https://salestools.club/new/may-2026",
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
      site: "@salestoolsclub",
      creator: "@salestoolsclub",
      title: pageTitle,
      description: pageDescription,
      images: ["https://salestools.club/opengraph-image"],
    },
  }
}

export default function May2026Page() {
  return (
    <main className="py-10 md:py-16">
      <div className="layout-container">
        <header className="mb-12 md:mb-20">
          <Link
            href="/new"
            className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-6 inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Directory Updates
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">
            New Sales Tools Added in May 2026
          </h1>
          <p className="text-lg text-ink-fade max-w-2xl">
            Check back at the end of May 2026 for newly added tools.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <p className="text-ink-fade">Coming soon...</p>
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/new/april-2026"
            className="inline-flex items-center gap-2 font-serif italic text-xl border-b border-black hover:opacity-60 transition-opacity pb-1"
          >
            April 2026 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}