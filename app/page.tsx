import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllCategories, getAllTools, getOpenSourceTools, getToolHref } from "@/lib/tools"
import { getAllStacks } from "@/lib/stacks"
import { getAllSkills } from "@/lib/skills"
import type { Metadata } from "next"
import { NewsletterForm } from "@/components/NewsletterForm"
import { ToolLogo } from "@/components/ToolLogo"

export async function generateMetadata(): Promise<Metadata> {
  const allTools = await getAllTools()
  const toolCount = allTools.length
  const roundedCount = Math.max(10, Math.round(toolCount / 10) * 10)
  const ogImageUrl = "https://salestools.club/opengraph-image"

  return {
    title: "Salestools Club — Sales APIs & MCP Configs for AI Agents",
    description:
      `The technical directory for AI-native sales stacks. Access ${roundedCount}+ verified APIs, MCP configs, and agent skills for building with Claude Code, Gemini, and custom AI agents.`,
    keywords: [
      "sales API directory",
      "MCP server for sales",
      "CRM API marketplace",
      "build AI sales agent",
      "Claude Code sales tools",
      "agentic tools sales",
      "agentic sales stack",
      "sales automation API",
      "AI agent sales integrations",
      "sales tools for AI agents",
    ],
    alternates: {
      canonical: "https://salestools.club",
    },
    openGraph: {
      title: "Salestools Club — Sales APIs & MCP Configs for AI Agents",
      description: `The technical directory for AI-native sales stacks. Access ${roundedCount}+ verified APIs, MCP configs, and agent skills.`,
      url: "https://salestools.club",
      siteName: "Salestools Club",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Salestools Club",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@salestoolsclub",
      creator: "@salestoolsclub",
      title: "Salestools Club — Sales APIs & MCP Configs for AI Agents",
      description: `The technical directory for AI-native sales stacks. Access ${roundedCount}+ verified APIs, MCP configs, and agent skills.`,
      images: [ogImageUrl],
    },
  }
}

const faqItems = [
  {
    question: "What is a Sales API?",
    answer:
      "Think of an API as a pipe that connects two pieces of software. It allows your AI agent to send or receive data from your sales tools directly. For example, an API lets your agent pull a list of new leads from Apollo or push a finished contact record into HubSpot without you doing it manually.",
  },
  {
    question: "What is an MCP Server?",
    answer:
      "An MCP is a standardized connector that plugs tools into AI agents like Claude Code and other AI agents. While an API is the pipe, an MCP is the universal plug that makes the pipe work instantly. Instead of building complex bridges, you just paste a small piece of configuration and your agent can immediately use that tool.",
  },
  {
    question: "What is a 'Skill'?",
    answer:
      "A skill is a set of instruction files that teach your AI exactly how to perform a sales task. It combines a prompt with the right tools. For example, a 'Lead Scoring' skill would teach your agent how to look at a prospect's LinkedIn, check their company size, and give them a score based on your rules.",
  },
  {
    question: "Do I need to be a developer?",
    answer:
      "No. This site is built for founders, sales managers, and revenue ops professionals. If you know how to use Claude Code and other AI agents, you can use these building blocks with simple copy-and-paste setup.",
  },
  {
    question: "What does AI-Native mean?",
    answer:
      "It means the tool was built specifically to work with AI agents. These tools have clean data and direct connections that an AI can understand without getting confused by old or messy software structures.",
  },
  {
    question: "Can I submit a tool?",
    answer:
      "Yes. If you know a sales API or MCP server I am missing, submit it and I'll review it.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link
      href={getToolHref(tool)}
      className="tool-card group flex h-full flex-col"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} size="sm" />
        {tool.mcpReady && (
          <div className="tag-mcp">MCP READY</div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="mb-2 text-[1rem] font-semibold leading-tight group-hover:underline underline-offset-4 md:text-[1.05rem]">{tool.name}</h3>
        <p className="mb-4 line-clamp-2 text-[0.88rem] leading-relaxed text-ink-fade md:line-clamp-3">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-fade">{tool.category}</span>
        <span className="ml-auto rounded-md border border-ink/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-fade">
          {tool.hasFreeTier ? "Free Tier" : "Paid"}
        </span>
      </div>
    </Link>
  )
}

function SectionHeader({
  eyebrow,
  title,
  href,
  actionLabel,
}: {
  eyebrow: string
  title: string
  href: string
  actionLabel?: string
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
      <div>
        <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-fade">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
          {title}
        </h2>
      </div>
      {actionLabel ? (
        <Link
          href={href}
          className="hidden rounded-md border border-ink/10 bg-white px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-fade transition-colors hover:border-ink/20 hover:text-ink sm:inline-flex"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}

export default async function Home() {
  const allTools = await getAllTools()
  const allSkills = getAllSkills()
  const categories = getAllCategories()

  const allStacks = getAllStacks()
  const latestExpertStack = [...allStacks].reverse().find((s) => s.expert)

  const sortedByPriority = (tools: typeof allTools) =>
    [...tools].sort((a, b) => {
      const featured = Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured))
      if (featured !== 0) return featured

      const aDate = a.addedAt ?? ""
      const bDate = b.addedAt ?? ""
      if (aDate !== bDate) return bDate.localeCompare(aDate)

      return a.name.localeCompare(b.name)
    })

  const recentTools = allTools.slice(0, 6)
  const apiTools = sortedByPriority(
    allTools.filter((tool) => !tool.isOpenSource && tool.category !== "Claude Plugins")
  ).slice(0, 6)
  const mcpTools = sortedByPriority(
    allTools.filter((tool) => tool.mcpReady && !tool.isOpenSource && tool.category !== "Claude Plugins")
  ).slice(0, 6)
  const skillTools = allSkills.slice(0, 6)
  const openSourceTools = (await getOpenSourceTools()).slice(0, 3)

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* -- Hero -------------------------------------------- */}
      <section className="hero relative overflow-hidden border-b border-ink/10 py-12 md:py-20">
        <div className="layout-container">
          <svg className="connections-layer absolute inset-0 z-0 h-full w-full pointer-events-none opacity-15" viewBox="0 0 1400 600" preserveAspectRatio="none">
            <path className="connector-line fill-none stroke-ink stroke-1 [stroke-dasharray:600] [stroke-dashoffset:600] animate-[drawLine_2s_ease_forwards_0.5s]" d="M 400,120 Q 600,180 750,140" />
            <path className="connector-line fill-none stroke-ink stroke-1 [stroke-dasharray:600] [stroke-dashoffset:600] animate-[drawLine_2s_ease_forwards_1s]" d="M 850,150 Q 800,300 350,450" />
          </svg>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes drawLine { to { stroke-dashoffset: 0; } }
          `}} />

          <div className="relative z-10 max-w-4xl">
            <h1 className="type-display mb-5 text-3xl md:mb-6 md:text-5xl lg:text-7xl">
              The <span className="circled">Lego Blocks</span> <br className="hidden md:block" />
              for your <span className="circled">AI Sales Agent.</span>
            </h1>
            
            <div className="max-w-2xl border-l border-ink/10 pl-4 text-lg leading-relaxed text-ink-fade md:pl-6 md:text-xl">
              A handpicked collection of APIs, Skills, and MCP servers that plug directly into Claude Code and other AI agents. Build your GTM machine in hours, not weeks.
            </div>

            <div className="mt-8 max-w-xl">
              <NewsletterForm />
              <div className="mb-6 flex flex-col gap-2 md:mb-8">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-fade">
                  New APIs & Skills. Every 10 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- Works With Trust Bar ----------------------- */}
      <section className="border-b border-ink/10 bg-white/55 py-3 md:py-4">
        <div className="layout-container flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink font-semibold whitespace-nowrap">
            Works with:
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Claude Code", "Antigravity", "Claude Cowork", "Replit", "Any Agentic Tools"].map(
              (agent) => (
                <span
                  key={agent}
                  className="font-mono text-[0.68rem] md:text-[0.72rem] text-ink uppercase tracking-[0.16em]"
                >
                  {agent}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* -- Expert Stack Bar ----------------------- */}
      {latestExpertStack && (
        <section className="border-b border-ink/10 bg-white/45 py-4">
          <div className="layout-container">
            <Link 
              href={`/stacks/${latestExpertStack.slug}`}
              className="panel group flex items-center gap-3 px-4 py-3 transition-colors hover:border-ink/15"
            >
              <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-ink/10 bg-white">
                {latestExpertStack.expert?.image && (
                  <Image 
                    src={latestExpertStack.expert.image} 
                    alt={latestExpertStack.expert.name}
                    width={80}
                    height={80}
                    quality={90}
                    className="object-cover w-full h-full transition-all duration-300"
                  />
                )}
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-fade">
                  Latest Expert Stack:
                </span>
                <span className="text-sm font-medium md:text-base">
                  {latestExpertStack.name}
                </span>
              </div>
              <ArrowRight className="ml-auto w-4 h-4 text-ink-fade group-hover:text-ink transition-colors" />
            </Link>
          </div>
        </section>
      )}

      <section className="border-t border-ink/10 py-10 md:py-14">
        <div className="layout-container">
          <SectionHeader
            eyebrow="Recently Added"
            title="Latest tools"
            href="/api"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recentTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white/35 py-10 md:py-14">
        <div className="layout-container">
          <SectionHeader
            eyebrow="APIs"
            title="Top API tools"
            href="/api"
            actionLabel="View all APIs"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {apiTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 py-10 md:py-14">
        <div className="layout-container">
          <SectionHeader
            eyebrow="MCP"
            title="Ready-to-paste connectors"
            href="/mcp"
            actionLabel="View MCP servers"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mcpTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white/35 py-10 md:py-14">
        <div className="layout-container">
          <SectionHeader
            eyebrow="Skills"
            title="Copy-paste agent skills"
            href="/skills"
            actionLabel="View all skills"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillTools.map((skill) => (
              <Link
                key={skill.slug}
                href={`/skills/${skill.slug}`}
                className="tool-card group flex h-full flex-col"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="rounded-md border border-ink/10 bg-ink/[0.03] px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-fade">
                    {skill.difficulty}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-fade">
                    {skill.category}
                  </span>
                </div>
                <div className="flex-grow">
                  <h3 className="mb-2 text-[1rem] font-semibold leading-tight group-hover:underline underline-offset-4">
                    {skill.name}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-[0.88rem] leading-relaxed text-ink-fade">
                    {skill.description}
                  </p>
                </div>
                <div className="mt-auto font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-fade">
                  {skill.worksWithTools.length > 0 ? `Works with ${skill.worksWithTools.length} tools` : "Standalone skill"}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 py-10 md:py-14">
        <div className="layout-container">
          <SectionHeader
            eyebrow="Open Source"
            title="Self-hostable tools"
            href="/open-source-sales-tools"
            actionLabel="View all open source"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {openSourceTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/open-source-sales-tools/${tool.slug}`}
                className="tool-card group flex h-full flex-col"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} size="sm" />
                  <div className="tag-mcp">OPEN SOURCE</div>
                </div>
                <div className="flex-grow">
                  <h3 className="mb-2 text-[1rem] font-semibold leading-tight group-hover:underline underline-offset-4">
                    {tool.name}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-[0.88rem] leading-relaxed text-ink-fade">
                    {tool.oneLiner}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-fade">
                  <span>{tool.githubStars ? `${tool.githubStars} stars` : "Open source"}</span>
                  {tool.githubUrl && <span>GitHub</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -- Categories ----------------------------- */}
      <section className="border-y border-ink/10 bg-white/45 py-10 md:py-16">
        <div className="layout-container">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Categories</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-fade md:mt-6 md:text-xl">
              I vet every tool to make sure it actually works with AI agents. No fluff, just the building blocks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {categories.slice(0, 8).map((cat, idx) => (
              <Link
                key={cat.slug}
                href={cat.name === "Claude Plugins" ? "/claude-plugins" : `/categories/${cat.slug}`}
                className="panel group flex h-full flex-col gap-6 p-6 transition-colors hover:border-ink/15"
              >
                <h3 className="text-xl font-semibold underline decoration-transparent underline-offset-8 transition-all group-hover:decoration-ink/30 md:text-2xl">
                  {cat.name}
                </h3>
                <p className="line-clamp-3 text-[1rem] leading-relaxed text-ink-fade">
                  {cat.description}
                </p>
                <div className="mt-auto font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-fade">
                  <span className="font-semibold text-ink">{cat.toolCount}</span> Tools
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -- FAQ ----------------------------------------- */}
      <section className="py-10 md:py-16">
        <div className="layout-container">
          <div className="mb-8 md:mb-12">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-fade mb-4">
              Common Questions
            </p>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              Everything you need to know
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 md:gap-x-16 md:gap-y-10">
            {faqItems.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <span className="font-mono text-[0.68rem] text-ink-fade tracking-[0.18em]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold">{item.question}</h3>
                <p className="text-[1rem] leading-relaxed text-ink-fade">
                  {idx === faqItems.length - 1 ? (
                    <>
                      {item.answer.replace(" submit it", "")}{" "}
                      <Link
                        href="/submit"
                        className="underline underline-offset-4 hover:text-ink transition-colors"
                      >
                        submit it
                      </Link>
                      .
                    </>
                  ) : (
                    item.answer
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
