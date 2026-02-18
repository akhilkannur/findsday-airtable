import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getToolBySlug, getAllSlugs } from "@/lib/tools"
import type { SalesTool } from "@/lib/types"
import {
  ArrowLeft,
  ExternalLink,
  Code,
  Key,
  Check,
  X,
  Plug,
  Github,
} from "lucide-react"

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return {
      title: "Tool Not Found | Findsday",
      description: "The tool you are looking for could not be found.",
    }
  }

  return {
    title: `${tool.name} API — Docs, Pricing & Integrations | Findsday`,
    description: tool.oneLiner,
    alternates: {
      canonical: `https://findsday.com/tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} API — Docs, Pricing & Integrations | Findsday`,
      description: tool.oneLiner,
      url: `https://findsday.com/tools/${tool.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} API — Docs, Pricing & Integrations | Findsday`,
      description: tool.oneLiner,
    },
  }
}

function JsonLd({ tool }: { tool: SalesTool }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.oneLiner,
    url: tool.websiteUrl,
    applicationCategory: tool.category,
    offers: {
      "@type": "Offer",
      price: tool.hasFreeTier ? "0" : undefined,
      priceCurrency: "USD",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const actionLinks = [
    { label: "API Docs", href: tool.docsUrl },
    { label: "Website", href: tool.websiteUrl },
    { label: "Pricing", href: tool.pricingUrl },
    ...(tool.githubUrl
      ? [{ label: "GitHub", href: tool.githubUrl }]
      : []),
  ]

  return (
    <>
      <JsonLd tool={tool} />

      <main className="min-h-screen bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/tools"
            className="mb-8 inline-flex items-center text-gray-400 transition-colors hover:text-accent-green"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
          </Link>

          {/* Header */}
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold lg:text-5xl">{tool.name}</h1>
              <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-bold uppercase text-accent-green">
                {tool.category}
              </span>
            </div>
            <p className="mt-3 text-xl text-gray-400">{tool.oneLiner}</p>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            {actionLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-accent-green hover:text-white"
              >
                {link.label === "GitHub" ? (
                  <Github className="h-4 w-4" />
                ) : (
                  <ExternalLink className="h-4 w-4" />
                )}
                {link.label}
              </a>
            ))}
          </div>

          {/* Two-column layout */}
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left column */}
            <div className="space-y-8 lg:col-span-2">
              {/* Description */}
              <div className="prose prose-invert max-w-none text-gray-300">
                <h2 className="text-2xl font-bold text-white">About</h2>
                <p className="mt-4 whitespace-pre-line">{tool.description}</p>
              </div>

              {/* Alternative To */}
              {tool.alternativeTo && tool.alternativeTo.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Alternative To
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tool.alternativeTo.map((alt) => (
                      <span
                        key={alt}
                        className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                      >
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-gray-800 bg-charcoal-light p-6">
                {/* API Details */}
                <h3 className="text-lg font-bold text-white">API Details</h3>

                <div className="mt-4 space-y-4">
                  {/* API Type */}
                  <div>
                    <p className="text-sm font-semibold text-gray-400">
                      <Code className="mr-1 inline h-4 w-4" /> API Type
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {tool.apiType.map((type) => (
                        <span
                          key={type}
                          className="rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-accent-green"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Auth */}
                  <div>
                    <p className="text-sm font-semibold text-gray-400">
                      <Key className="mr-1 inline h-4 w-4" /> Auth
                    </p>
                    <ul className="mt-1 space-y-1">
                      {tool.authMethod.map((method) => (
                        <li key={method} className="text-sm text-gray-300">
                          {method}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Free Tier */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-400">
                      Free Tier
                    </p>
                    {tool.hasFreeTier ? (
                      <span className="inline-flex items-center gap-1 text-sm text-accent-green">
                        <Check className="h-4 w-4" /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                        <X className="h-4 w-4" /> No
                      </span>
                    )}
                  </div>

                  {/* SDKs */}
                  <div>
                    <p className="text-sm font-semibold text-gray-400">SDKs</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {tool.sdkLanguages.length > 0 ? (
                        tool.sdkLanguages.map((lang) => (
                          <span
                            key={lang}
                            className="rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300"
                          >
                            {lang}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">None yet</span>
                      )}
                    </div>
                  </div>

                  {/* Webhooks */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-400">
                      Webhooks
                    </p>
                    {tool.hasWebhooks ? (
                      <span className="inline-flex items-center gap-1 text-sm text-accent-green">
                        <Check className="h-4 w-4" /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                        <X className="h-4 w-4" /> No
                      </span>
                    )}
                  </div>

                  {/* OpenAPI Spec */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-400">
                      OpenAPI Spec
                    </p>
                    {tool.hasOpenApiSpec ? (
                      tool.openApiSpecUrl ? (
                        <a
                          href={tool.openApiSpecUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-accent-green hover:underline"
                        >
                          <Check className="h-4 w-4" /> Yes
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-sm text-accent-green">
                          <Check className="h-4 w-4" /> Yes
                        </span>
                      )
                    ) : (
                      <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                        <X className="h-4 w-4" /> No
                      </span>
                    )}
                  </div>
                </div>

                {/* Agent Integrations */}
                <div className="mt-6 border-t border-gray-800 pt-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                    <Plug className="h-5 w-5" /> Agent Integrations
                  </h3>

                  {tool.integrations.length > 0 ? (
                    <ul className="mt-4 space-y-3">
                      {tool.integrations.map((integration, i) => (
                        <li key={i}>
                          <a
                            href={integration.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between rounded-lg border border-gray-800 px-3 py-2 transition-colors hover:border-accent-green"
                          >
                            <div>
                              <p className="text-sm font-medium text-white">
                                {integration.platform}
                              </p>
                              {integration.label && (
                                <p className="text-xs text-gray-500">
                                  {integration.label}
                                </p>
                              )}
                            </div>
                            <ExternalLink className="h-4 w-4 text-gray-600 transition-colors group-hover:text-accent-green" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-gray-500">
                      No integrations listed yet. Know one?{" "}
                      <Link
                        href="/submit"
                        className="text-accent-green hover:underline"
                      >
                        Submit it.
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
