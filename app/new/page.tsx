import Link from "next/link"
import { ArrowRight, Calendar, Plus } from "lucide-react"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = "New Sales Tools Added | Salestools Club"
  const pageDescription = "Directory of newly added sales and GTM tools. Find the latest APIs, MCP servers, and AI-native tools added to our directory."

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: "https://salestools.club/new",
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: "https://salestools.club/new",
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

const months = [
  { slug: "may-2026", name: "May 2026", count: 7 },
  { slug: "april-2026", name: "April 2026", count: 14 },
]

export default function NewPage() {
  return (
    <main className="py-10 md:py-16">
      <div className="layout-container">
        <header className="mb-12 md:mb-20">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-6 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Directory Updates
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">
            New Sales Tools Added
          </h1>
          <p className="text-lg text-ink-fade max-w-2xl">
            Recently added sales and GTM tools to our directory. Find new APIs, MCP servers, and AI-native tools for your sales stack.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-3xl">
          {months.map((month) => (
            <Link
              key={month.slug}
              href={`/new/${month.slug}`}
              className="tool-card group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-ink text-paper flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-serif text-xl mb-2 group-hover:underline">{month.name}</h3>
              <p className="text-sm text-ink-fade">{month.count} new tools</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}