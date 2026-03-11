import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllGuides, getGuideBySlug, getGuideSlugs, getToolsForGuide, getFaqForGuide } from "@/lib/guides"
import { Check, X } from "lucide-react"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { GuideToolTable } from "@/components/GuideToolTable"
import { FaqSection } from "@/components/FaqSection"

export async function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return { title: "Guide Not Found | Salestools Club" }
  }

  const pageUrl = `https://salestools.club/guides/${slug}`

  return {
    title: guide.title + " | Salestools Club",
    description: guide.metaDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      type: "website",
      url: pageUrl,
    },
  }
}

function ApiBadge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" }) {
  const variants = {
    default: "bg-ink/5 text-ink-fade border-ink/10",
    success: "bg-green-500/10 text-green-700 border-green-500/20",
    warning: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border rounded-md ${variants[variant]} font-bold`}>
      {children}
    </span>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return <Check className={`h-5 w-5 ${className}`} />
}

function XIcon({ className }: { className?: string }) {
  return <X className={`h-5 w-5 ${className}`} />
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  const tools = getToolsForGuide(guide)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": guide.title,
    "description": guide.intro,
    "numberOfItems": tools.length,
    "itemListElement": tools.map((tool, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": tool.name,
      "url": `https://salestools.club/apis/${tool.slug}`,
      "description": tool.oneLiner,
    })),
  }

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd items={[
        { name: "Guides", url: "https://salestools.club/guides" },
        { name: guide.title, url: `https://salestools.club/guides/${slug}` },
      ]} />

      <section className="px-8 py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <Link
            href="/guides"
            className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all mb-12 inline-block"
          >
            &lt;- Back to Guides
          </Link>

          <h1 className="type-display mb-8">{guide.title}</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            {guide.intro}
          </p>
        </div>
      </section>

      {guide.content && (
        <section className="py-16 border-b border-ink/10">
          <div className="layout-container prose prose-zinc prose-lg max-w-4xl prose-headings:font-bold prose-a:text-ink hover:prose-a:line-through prose-strong:text-ink">
            <div dangerouslySetInnerHTML={{ __html: guide.content }} />
          </div>
        </section>
      )}

      <section className="py-12 bg-ink/[0.02]">
        <div className="layout-container">
          <h2 className="type-display text-3xl mb-12">Technical Comparison</h2>
          <GuideToolTable tools={tools} />

          {tools.length === 0 && (
            <div className="text-center py-32 opacity-60 font-serif italic text-2xl">
              No tools indexed in this guide.
            </div>
          )}
        </div>
      </section>

      <FaqSection items={getFaqForGuide(guide)} />
    </div>
  )
}
