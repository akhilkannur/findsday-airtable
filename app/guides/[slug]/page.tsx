import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllGuides, getGuideBySlug, getGuideSlugs, getToolsForGuide } from "@/lib/guides"
import { Check, X } from "lucide-react"

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
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return <Check className={`h-3 w-3 ${className}`} />
}

function XIcon({ className }: { className?: string }) {
  return <X className={`h-3 w-3 ${className}`} />
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

      <section className="py-12">
        <div className="layout-container">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/20">
                  <th className="text-left py-4 px-4 font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">Tool</th>
                  <th className="text-left py-4 px-4 font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">API</th>
                  <th className="text-left py-4 px-4 font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">Auth</th>
                  <th className="text-left py-4 px-4 font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">SDKs</th>
                  <th className="text-center py-4 px-4 font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">Webhooks</th>
                  <th className="text-center py-4 px-4 font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">Free Tier</th>
                  <th className="text-center py-4 px-4 font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">MCP</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.slug} className="border-b border-ink/10 hover:bg-ink/[0.02] transition-colors">
                    <td className="py-4 px-4">
                      <Link href={`/apis/${tool.slug}`} className="hover:underline font-semibold">
                        {tool.name}
                      </Link>
                      <p className="text-xs text-ink-fade mt-1 line-clamp-1 max-w-[200px]">{tool.oneLiner}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {tool.apiType.map((api) => (
                          <ApiBadge key={api}>{api}</ApiBadge>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {tool.authMethod.map((auth) => (
                          <ApiBadge key={auth} variant="warning">{auth}</ApiBadge>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {tool.sdkLanguages.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {tool.sdkLanguages.slice(0, 3).map((sdk) => (
                            <ApiBadge key={sdk} variant="success">{sdk}</ApiBadge>
                          ))}
                          {tool.sdkLanguages.length > 3 && (
                            <ApiBadge>+{tool.sdkLanguages.length - 3}</ApiBadge>
                          )}
                        </div>
                      ) : (
                        <span className="text-ink-fade text-xs">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {tool.hasWebhooks ? (
                        <div className="flex justify-center"><CheckIcon className="text-green-600" /></div>
                      ) : (
                        <div className="flex justify-center"><XIcon className="text-ink-fade/30" /></div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {tool.hasFreeTier ? (
                        <div className="flex justify-center"><CheckIcon className="text-green-600" /></div>
                      ) : (
                        <div className="flex justify-center"><XIcon className="text-ink-fade/30" /></div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {tool.mcpReady ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border rounded-full bg-purple-500/10 text-purple-700 border-purple-500/20">
                          MCP
                        </span>
                      ) : (
                        <div className="flex justify-center"><XIcon className="text-ink-fade/30" /></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {tools.length === 0 && (
            <div className="text-center py-32 opacity-60 font-serif italic text-2xl">
              No tools indexed in this guide.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
