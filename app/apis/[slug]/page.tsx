import Link from "next/link"
import type { Metadata } from "next"
import { getToolBySlug, getAllSlugs, getAllTools, getAllCategories } from "@/lib/tools"
import type { SalesTool } from "@/lib/types"
import {
  ArrowRight,
  Check,
  Code2,
  ExternalLink,
  ShieldCheck,
  Webhook,
  Zap,
} from "lucide-react"
import { CopyButton } from "@/components/ui/CopyButton"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { ToolLogo } from "@/components/ToolLogo"
import { GitHubStars } from "@/components/GitHubStars"
import { generateSeoTitle, generateSeoDescription, generateSeoKeywords } from "@/lib/seo"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  let tool = await getToolBySlug(slug)

  if (!tool) {
    return {
      title: "Tool Not Found | Salestools Club",
      description: "The requested tool could not be located.",
      robots: { index: false, follow: true },
    }
  }

  const typedTool = tool as NonNullable<typeof tool>
  
  // Determine API status for SEO metadata
  let apiStatus: "verified" | "no-api" | "monitoring" = "verified"
  if (!typedTool.docsUrl) {
    apiStatus = typedTool.hasPublicApi === false ? "no-api" : "monitoring"
  }

  const pageTitle = generateSeoTitle(typedTool.name, "tool", apiStatus)
  const pageUrl = `https://salestools.club/apis/${typedTool.slug}`
  const pageDescription = generateSeoDescription(typedTool.name, "tool", undefined, apiStatus)

  const pageKeywords = generateSeoKeywords(typedTool.name, "tool", [typedTool.category, typedTool.apiType?.join(", ") || ""].filter(Boolean))

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    alternates: {
      canonical: pageUrl,
    },
    ...(typedTool.hasPublicApi === false && {
      robots: { index: false, follow: true },
    }),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: pageUrl,
      images: [
        {
          url: `${pageUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@salestoolsclub",
      creator: "@salestoolsclub",
      title: pageTitle,
      description: pageDescription,
      images: [`${pageUrl}/opengraph-image`],
    },
  }
}

function JsonLd({ tool }: { tool: SalesTool }) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.oneLiner,
    url: tool.websiteUrl,
    applicationCategory: "SalesSoftware",
    applicationSubCategory: tool.category,
    offers: {
      "@type": "Offer",
      price: tool.hasFreeTier ? "0" : undefined,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: tool.aiCapabilities?.join(", "),
    screenshot: `https://salestools.club/apis/${tool.slug}/opengraph-image`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
    />
  )
}

function ToolCard({ tool }: { tool: SalesTool }) {
  const href = tool.isOpenSource ? `/open-source-sales-tools/${tool.slug}` : `/apis/${tool.slug}`
  return (
    <Link
      href={href}
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

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let tool = await getToolBySlug(slug)

  // If it's an open source tool, redirect to the open source sales tools path
  if (tool?.isOpenSource) {
    const { permanentRedirect } = await import("next/navigation")
    permanentRedirect(`/open-source-sales-tools/${tool.slug}`)
  }

  // Handle legacy slugs that might have been renamed to include -ai
  if (!tool && !slug.endsWith("-ai")) {
    const aiTool = await getToolBySlug(`${slug}-ai`)
    if (aiTool) {
      const { permanentRedirect } = await import("next/navigation")
      permanentRedirect(`/apis/${aiTool.slug}`)
    }
  }

  if (!tool) {
    const { permanentRedirect } = await import("next/navigation")
    permanentRedirect("/api")
  }

  // tool is guaranteed to be defined after the redirect check above
  const typedTool = tool as NonNullable<typeof tool>

  const categoryMeta = getAllCategories().find(c => c.name === typedTool.category)

  // Find alternatives – score by relevance so each tool gets unique, meaningful matches
  const allTools = await getAllTools()
  const alternatives = allTools
    .filter(t => t.slug !== typedTool.slug)
    .map(t => {
      let score = 0
      // Highest: tool explicitly lists this as an alternative
      if (typedTool.alternativeTo?.some(alt => t.name.toLowerCase().includes(alt.toLowerCase()))) score += 10
      // High: this tool lists current tool as an alternative
      if (t.alternativeTo?.some(alt => typedTool.name.toLowerCase().includes(alt.toLowerCase()))) score += 8
      // Medium: overlapping aiCapabilities
      const capOverlap = (typedTool.aiCapabilities ?? []).filter(c =>
        (t.aiCapabilities ?? []).some(tc => tc.toLowerCase() === c.toLowerCase())
      ).length
      score += capOverlap * 3
      // Low: same category
      if (t.category === typedTool.category) score += 1
      return { tool: t, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ tool }) => tool)

  const mcpIntegration = typedTool.integrations.find(i => i.platform === "MCP")
  const mcpConfig = mcpIntegration?.mcpConfig
  const apiStatus = typedTool.hasPublicApi === false
    ? "unavailable"
    : typedTool.hasPublicApi === true || Boolean(typedTool.docsUrl)
      ? "available"
      : "unknown"
  const hasPublicApi = apiStatus === "available"
  const hasMcp = Boolean(typedTool.mcpReady || mcpIntegration)
  const mcpSetupUrl = mcpIntegration?.url
  const setupUrl = mcpSetupUrl || typedTool.docsUrl
  const primaryUrl = setupUrl || typedTool.websiteUrl
  const primaryLabel = mcpIntegration?.url
    ? "Connect to an agent"
    : hasPublicApi
      ? "Open API docs"
      : "Visit website"
  const readiness = mcpConfig
    ? "Plug & play"
    : hasPublicApi
      ? "API ready"
      : "Not available"
  const readinessDescription = mcpConfig
    ? "A ready-to-copy MCP configuration is available below."
    : hasPublicApi
      ? "Give a coding agent the API docs and it can connect."
      : "No public API or MCP integration is listed."
  const uniqueCapabilities = typedTool.aiCapabilities.filter(
    (capability, index, capabilities) =>
      capabilities.findIndex(candidate => candidate.toLowerCase() === capability.toLowerCase()) === index,
  )
  const facts = [
    { label: "Public API", value: hasPublicApi ? "Available" : apiStatus === "unknown" ? "Not verified" : "Not available" },
    { label: "MCP", value: mcpIntegration?.label || (typedTool.mcpReady ? "Available" : "Not available") },
    { label: "Authentication", value: hasPublicApi ? (typedTool.authMethod.join(" / ") || "Not listed") : hasMcp ? "See integration setup" : "Not applicable" },
    { label: "API type", value: hasPublicApi ? (typedTool.apiType.join(" / ") || "Not listed") : "Not applicable" },
    { label: "Free tier", value: typedTool.hasFreeTier ? "Available" : "No free tier listed" },
    { label: "Webhooks", value: typedTool.hasWebhooks ? "Supported" : "Not listed" },
    { label: "SDKs", value: hasPublicApi ? (typedTool.sdkLanguages.join(", ") || "None listed") : "Not applicable" },
  ]
  const setupSteps = mcpSetupUrl
    ? [
        ["01", "Open the integration", mcpIntegration?.label || "Use the provider’s MCP documentation to begin."],
        ["02", "Authenticate", "Complete the integration’s authentication flow."],
        ["03", "Give your agent a task", "Copy the starter prompt below and adjust it for your workflow."],
      ]
    : hasPublicApi
      ? [
          ["01", "Open the API docs", "Give the documentation link to Claude Code, Cursor, or another coding agent."],
          ["02", "Authenticate", `Configure ${typedTool.authMethod.join(" or ") || "the required credentials"} without pasting secrets into chat.`],
          ["03", "Build the first workflow", "Use the starter prompt below as a brief for your coding agent."],
        ]
      : []

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd tool={typedTool} />
      <BreadcrumbJsonLd items={[
        { name: "APIs", url: "https://salestools.club/api" },
        { name: typedTool.name, url: `https://salestools.club/apis/${typedTool.slug}` },
      ]} />

      <nav className="layout-container py-4 md:py-8 flex flex-wrap items-center gap-2 text-[0.65rem] md:text-[0.75rem] font-mono uppercase tracking-widest text-ink-fade">
        <Link href="/" className="hover:text-ink hover:underline hover:line-through transition-all">Home</Link>
        <span className="opacity-30">/</span>
        <Link href="/api" className="hover:text-ink hover:underline hover:line-through transition-all">APIs</Link>
        <span className="opacity-30">/</span>
        {categoryMeta && (
          <>
            <Link href={`/categories/${categoryMeta.slug}`} className="hover:text-ink hover:underline hover:line-through transition-all">{typedTool.category}</Link>
            <span className="opacity-30">/</span>
          </>
        )}
        <span className="text-ink font-bold">{typedTool.name}</span>
      </nav>

      <header className="border-y border-ink bg-white/35">
        <div className="layout-container grid gap-10 py-12 lg:grid-cols-[1fr_auto] lg:items-end lg:py-16">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-6">
              <ToolLogo name={typedTool.name} websiteUrl={typedTool.websiteUrl} size="lg" />
              <div>
                <div className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-widest text-ink-fade">
                  {typedTool.category}
                </div>
                <h1 className="type-display uppercase">{typedTool.name}</h1>
              </div>
            </div>
            <p className="max-w-3xl font-serif text-2xl leading-snug text-ink-fade md:text-3xl">
              {typedTool.oneLiner}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:max-w-[400px] lg:justify-end">
            <a
              href={primaryUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-[0.72rem] font-bold uppercase tracking-wider text-paper transition-opacity hover:opacity-75"
            >
              {primaryLabel} <ArrowRight className="h-4 w-4" />
            </a>
            {typedTool.docsUrl && typedTool.docsUrl !== primaryUrl && (
              <a
                href={typedTool.docsUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 border border-ink px-5 py-3 font-mono text-[0.72rem] font-bold uppercase tracking-wider hover:bg-ink hover:text-paper"
              >
                Documentation <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </header>

      <section className="border-b border-ink">
        <div className="layout-container grid grid-cols-2 md:grid-cols-4">
          {[
            ["Agent setup", readiness],
            ["Public API", hasPublicApi ? "Available" : apiStatus === "unknown" ? "Not verified" : "Not available"],
            ["MCP", hasMcp ? "Available" : "Not available"],
            ["Free tier", typedTool.hasFreeTier ? "Available" : "No free tier listed"],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`p-5 md:p-7 ${index < 3 ? "border-r border-ink" : ""} ${index === 1 ? "max-md:border-r-0" : ""} ${index > 1 ? "max-md:border-t" : ""}`}
            >
              <div className="mb-2 font-mono text-[0.62rem] uppercase tracking-widest text-ink-fade">{label}</div>
              <div className="font-mono text-xs font-bold uppercase tracking-wide md:text-sm">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="layout-container grid lg:grid-cols-[minmax(0,1fr)_360px] lg:border-x lg:border-ink">
        <main className="space-y-16 py-12 lg:border-r lg:border-ink lg:px-12 lg:py-16 xl:px-16">
          <section>
            <div className="mb-7 flex items-center gap-4">
              <Zap className="h-5 w-5" />
              <h2 className="font-mono text-sm font-bold uppercase tracking-widest">Agent readiness</h2>
            </div>
            <div className="border border-ink bg-ink p-7 text-paper md:p-9">
              <div className="mb-3 flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${hasPublicApi || hasMcp ? "bg-lime-300" : "bg-amber-300"}`} />
                <span className="font-mono text-xs font-bold uppercase tracking-widest">{readiness}</span>
              </div>
              <p className="max-w-2xl font-serif text-xl leading-relaxed text-paper/75 md:text-2xl">
                {readinessDescription}
              </p>
            </div>
          </section>

          {uniqueCapabilities.length > 0 && (
            <section>
              <div className="mb-7 flex items-center gap-4">
                <Check className="h-5 w-5" />
                <h2 className="font-mono text-sm font-bold uppercase tracking-widest">
                  {hasPublicApi || hasMcp ? "What your agent can do" : "Listed product capabilities"}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2">
                {uniqueCapabilities.map((capability, index) => (
                  <div key={capability} className="-mt-px flex min-h-28 gap-5 border border-ink/20 p-5 sm:odd:-mr-px">
                    <span className="font-mono text-xs text-ink-fade">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-xl leading-snug">{capability}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <div className="mb-7 flex items-center gap-4">
              <Code2 className="h-5 w-5" />
              <h2 className="font-mono text-sm font-bold uppercase tracking-widest">Connect {typedTool.name}</h2>
            </div>
            {setupSteps.length > 0 ? (
              <>
                <div className="border border-ink">
                  {setupSteps.map(([number, title, description]) => (
                    <div key={number} className="grid gap-3 border-b border-ink/20 p-6 last:border-b-0 md:grid-cols-[48px_180px_1fr] md:items-start">
                      <span className="font-mono text-xs text-ink-fade">{number}</span>
                      <strong className="font-mono text-xs uppercase tracking-wider">{title}</strong>
                      <span className="text-base leading-relaxed text-ink-fade">{description}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-xs font-bold uppercase tracking-wider"
                >
                  {mcpSetupUrl ? "Open integration setup" : "Open API documentation"}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </>
            ) : (
              <div className="border border-ink/20 bg-paper-dark/50 p-7 text-lg text-ink-fade">
                {hasMcp
                  ? "An MCP integration is listed, but no setup link is currently available."
                  : apiStatus === "unknown"
                    ? "No public API documentation or MCP setup is currently listed."
                    : "There is no public API or MCP setup to connect at this time."}
              </div>
            )}
          </section>

          {mcpConfig && (
            <section>
              <h2 className="mb-7 font-mono text-sm font-bold uppercase tracking-widest">MCP configuration</h2>
              <div className="border border-ink bg-black p-6 text-paper md:p-8">
                <pre className="mb-6 overflow-x-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-white/80">
                  {mcpConfig}
                </pre>
                <CopyButton
                  text={mcpConfig}
                  label="Copy config"
                  eventName="mcp_config_copied"
                  eventParams={{ tool_slug: typedTool.slug, tool_name: typedTool.name }}
                  className="border border-white/30 px-4 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-wider hover:bg-white hover:text-black"
                />
              </div>
            </section>
          )}

          {typedTool.starterPrompt && setupSteps.length > 0 && (
            <section>
              <div className="mb-7 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Zap className="h-5 w-5" />
                  <h2 className="font-mono text-sm font-bold uppercase tracking-widest">Starter prompt</h2>
                </div>
                <span className="hidden font-mono text-[0.62rem] uppercase tracking-widest text-ink-fade sm:block">Paste into your agent</span>
              </div>
              <div className="border border-dashed border-ink bg-white/45 p-7 md:p-10">
                <p className="mb-8 font-serif text-2xl italic leading-relaxed md:text-3xl">
                  “{typedTool.starterPrompt}”
                </p>
                <CopyButton
                  text={typedTool.starterPrompt}
                  label="Copy prompt"
                  eventName="starter_prompt_copied"
                  eventParams={{ tool_slug: typedTool.slug, tool_name: typedTool.name }}
                  className="border border-ink bg-ink px-4 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-paper hover:bg-transparent hover:text-ink"
                />
              </div>
            </section>
          )}

          <section>
            <h2 className="mb-6 font-mono text-sm font-bold uppercase tracking-widest">About {typedTool.name}</h2>
            <p className="max-w-4xl font-serif text-xl leading-relaxed text-ink-fade md:text-2xl">
              {typedTool.description}
            </p>
          </section>
        </main>

        <aside className="space-y-12 py-12 lg:px-8 lg:py-16">
          <section>
            <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest">Technical facts</h2>
            <dl>
              {facts.map((fact) => (
                <div key={fact.label} className="border-b border-ink/15 py-4 first:border-t">
                  <dt className="mb-1 font-mono text-[0.62rem] uppercase tracking-widest text-ink-fade">{fact.label}</dt>
                  <dd className="font-mono text-xs font-bold uppercase leading-relaxed tracking-wide">{fact.value}</dd>
                </div>
              ))}
            </dl>
            {typedTool.githubUrl && <GitHubStars githubUrl={typedTool.githubUrl} variant="detail" />}
          </section>

          <section className="border border-ink/20 bg-paper-dark/50 p-6">
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="h-4 w-4" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest">Before you start</h2>
            </div>
            <ul className="space-y-4 text-base leading-relaxed text-ink-fade">
              {!mcpConfig && mcpSetupUrl && <li>• Follow the linked integration instructions to complete MCP setup.</li>}
              {!mcpSetupUrl && hasMcp && <li>• No specific MCP setup link is currently listed.</li>}
              {hasPublicApi && <li>• Authentication uses {typedTool.authMethod.join(" or ") || "provider credentials"}.</li>}
              <li>• {typedTool.hasWebhooks ? "Webhooks are available for event-driven workflows." : "No webhook support is listed."}</li>
              <li>• Features and limits may depend on your provider plan.</li>
            </ul>
          </section>

          <section className="space-y-3">
            {typedTool.docsUrl && (
              <a
                href={typedTool.docsUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-between border-b border-ink py-3 font-mono text-xs font-bold uppercase tracking-wider"
              >
                Documentation <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {typedTool.pricingUrl && (
              <a
                href={typedTool.pricingUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-between border-b border-ink py-3 font-mono text-xs font-bold uppercase tracking-wider"
              >
                Pricing <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <a
              href={typedTool.websiteUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="flex items-center justify-between border-b border-ink py-3 font-mono text-xs font-bold uppercase tracking-wider"
            >
              Website <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <div className="flex items-center gap-2 pt-3 font-mono text-[0.62rem] uppercase tracking-widest text-ink-fade">
              <Webhook className="h-3.5 w-3.5" /> Structured listing data
            </div>
          </section>
        </aside>
      </div>

      {alternatives.length > 0 && (
        <section className="border-t border-ink bg-white/30 py-12 md:py-16">
          <div className="layout-container">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-ink-fade">Related options</div>
                <h2 className="font-serif text-3xl italic">Similar tools</h2>
              </div>
              <Link href="/api" className="font-mono text-xs font-bold uppercase tracking-wider hover:underline">
                Browse all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {alternatives.map((alternative) => (
                <ToolCard key={alternative.slug} tool={alternative} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
