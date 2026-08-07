import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  getAnswerArticleBySlug,
  getAllAnswerArticles,
  getAllAnswerSlugs,
  getRecommendedTools,
} from "@/lib/answers"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { FaqSection } from "@/components/FaqSection"
import { ArrowRight, Zap } from "lucide-react"

export async function generateStaticParams() {
  return getAllAnswerSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getAnswerArticleBySlug(slug)

  if (!article) {
    return { title: "Article Not Found | Salestools Club" }
  }

  const pageUrl = `https://salestools.club/mcp/${article.slug}`
  const pageTitle = `${article.keyword} | Salestools Club`

  return {
    title: pageTitle,
    description: article.summary,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: pageTitle,
      description: article.summary,
      type: "article",
      url: pageUrl,
      images: [{ url: "https://salestools.club/opengraph-image", width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: "summary_large_image" as const,
      site: "@salestoolsclub",
      creator: "@salestoolsclub",
      title: pageTitle,
      description: article.summary,
      images: ["https://salestools.club/opengraph-image"],
    },
  }
}

export default async function AnswerArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getAnswerArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const related = (article.related ?? [])
    .map((s) => getAnswerArticleBySlug(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
  const recommendedTools = await getRecommendedTools(6)
  const allArticles = getAllAnswerArticles().filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <BreadcrumbJsonLd
        items={[
          { name: "MCP", href: "/mcp" },
          { name: article.keyword, href: `/mcp/${article.slug}` },
        ]}
      />

      <article className="px-4 py-10 md:px-8 md:py-16 border-b border-ink">
        <div className="layout-container max-w-3xl">
          <div className="font-mono text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] mb-6 flex items-center gap-4 text-ink-fade">
            <span className="circled font-bold text-black">MCP</span>
            <Link href="/mcp" className="hover:underline">MCP Directory</Link>
          </div>
          <h1 className="type-display mb-4 text-3xl md:text-5xl">{article.keyword}</h1>
          <p className="text-lg text-ink-fade leading-relaxed mb-6">{article.subtitle}</p>
          <p className="text-lg leading-relaxed border-l-2 border-ink pl-4 text-ink/90">
            {article.answer}
          </p>
        </div>
      </article>

      <div className="px-4 md:px-8 py-10 md:py-14">
        <div className="layout-container max-w-3xl">
          <div className="flex flex-col gap-8">
            {article.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-2xl font-semibold mb-3">{section.heading}</h2>
                <p className="text-[0.98rem] text-ink-fade leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>

          {recommendedTools.length > 0 && (
            <section className="mt-12 pt-8 border-t border-ink/20">
              <h2 className="text-xl font-semibold mb-2 inline-flex items-center gap-2">
                <Zap className="w-5 h-5" /> MCP-Ready Tools to Start With
              </h2>
              <p className="text-[0.9rem] text-ink-fade mb-4">
                Verified MCP servers and APIs you can wire into your AI agent today.
              </p>
              <div className="flex flex-wrap gap-2">
                {recommendedTools.map((t) => (
                  <Link
                    key={t.slug}
                    href={t.href}
                    className="border border-ink/20 px-4 py-2 text-[0.9rem] font-medium hover:border-ink transition-colors"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Keep Reading</h2>
              <div className="flex flex-col gap-3">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/mcp/${a.slug}`}
                    className="group border border-ink/20 p-4 hover:border-ink transition-colors flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-semibold">{a.keyword}</div>
                      <div className="text-[0.85rem] text-ink-fade">{a.summary}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {allArticles.length > 0 && (
            <nav className="mt-8 text-sm">
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-fade mr-3">More</span>
              {allArticles.map((a) => (
                <Link key={a.slug} href={`/mcp/${a.slug}`} className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink mr-4">
                  {a.keyword}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>

      <FaqSection items={article.faq} title={`${article.keyword} — FAQ`} />
    </div>
  )
}