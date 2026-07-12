import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain, Mail, Sparkles, ChevronRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getAllCategories, getAllTools, getToolHref } from "@/lib/tools"
import { getAllGuides } from "@/lib/guides"
import { getAllStacks } from "@/lib/stacks"
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
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} />
        {tool.mcpReady && (
          <div className="tag-mcp">MCP READY</div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="text-xl md:text-2xl font-semibold mb-2 group-hover:underline underline-offset-4">{tool.name}</h3>
        <p className="text-[0.95rem] md:text-[1rem] text-ink-fade leading-relaxed line-clamp-3 mb-6">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 items-center">
        <span className="font-mono text-[0.75rem] uppercase tracking-wider text-ink-fade">{tool.category}</span>
        <span className="ml-auto font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full">
          {tool.hasFreeTier ? "Free Tier" : "Paid"}
        </span>
      </div>
    </Link>
  )
}

export default async function Home() {
  const allTools = await getAllTools()
  const exploreTools = allTools.slice(0, 9)
  const categories = getAllCategories()
  const guides = getAllGuides().slice(0, 3)

  const allStacks = getAllStacks()
  const latestExpertStack = [...allStacks].reverse().find((s) => s.expert)

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

      {/* -- Directory Header ---------------- */}
      <section className="border-t border-ink/10 py-10 md:py-16">
        <div className="layout-container">
          <div className="mb-8 md:mb-12">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-fade mb-4">
              Recently Added
            </p>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              Sales APIs & MCP Servers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {exploreTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          <div className="mt-12 text-center md:mt-16">
            <Link href="/api" className="inline-flex items-center gap-2 rounded-md border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/20">
              Browse All APIs {'>'}
            </Link>
          </div>

          {/* CLI Search CTA */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="panel p-6 md:p-8">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-fade mb-3 text-center">
                Search and configure agents from your terminal
              </p>
              <p className="font-mono text-sm mb-4 text-center">
                Run: <code className="rounded-md bg-ink px-3 py-1.5 text-paper">npx salestools search &quot;lead enrichment&quot;</code>
              </p>
              <p className="font-mono text-[0.68rem] text-center text-ink-fade">
                Ideal for Claude Code and other agent-native users. Find the right API building blocks without leaving your workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -- What's Inside ----------------------------------- */}
      <section className="border-y border-ink/10 bg-white/45 py-10 md:py-16">
        <div className="layout-container">
          <div className="mb-8 md:mb-12">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-fade mb-4">
              What&apos;s Inside
            </p>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              Three things you&apos;ll find here
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            <Link href="/api" className="panel group flex flex-col gap-4 p-6 transition-colors hover:border-ink/15">
              <span className="font-mono text-[0.68rem] text-ink-fade tracking-[0.18em]">01</span>
              <h3 className="text-xl font-semibold underline decoration-transparent underline-offset-8 transition-all group-hover:decoration-ink/30">
                Sales APIs
              </h3>
              <p className="text-[1rem] leading-relaxed text-ink-fade">
                Programmable access to your CRM, outreach tools, enrichment databases, and calling platforms. These let Claude Code and other AI agents read and write to your sales stack directly.
              </p>
              <span className="mt-auto font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-fade transition-colors group-hover:text-ink">
                Browse APIs →
              </span>
            </Link>

            <Link href="/mcp" className="panel group flex flex-col gap-4 p-6 transition-colors hover:border-ink/15">
              <span className="font-mono text-[0.68rem] text-ink-fade tracking-[0.18em]">02</span>
              <h3 className="text-xl font-semibold underline decoration-transparent underline-offset-8 transition-all group-hover:decoration-ink/30">
                MCP Servers
              </h3>
              <p className="text-[1rem] leading-relaxed text-ink-fade">
                Ready-made connectors that plug sales tools into Claude Code and other AI agents. No glue code. Copy the config, paste it, go.
              </p>
              <span className="mt-auto font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-fade transition-colors group-hover:text-ink">
                Browse MCP Servers →
              </span>
            </Link>

            <Link href="/skills" className="panel group flex flex-col gap-4 p-6 transition-colors hover:border-ink/15">
              <span className="font-mono text-[0.68rem] text-ink-fade tracking-[0.18em]">03</span>
              <h3 className="text-xl font-semibold underline decoration-transparent underline-offset-8 transition-all group-hover:decoration-ink/30">
                Agent Skills
              </h3>
              <p className="text-[1rem] leading-relaxed text-ink-fade">
                Pre-configured instruction files that teach your agent how to perform complex sales tasks. One-click install for Claude Code and other AI agents.
              </p>
              <span className="mt-auto font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-fade transition-colors group-hover:text-ink">
                Browse Skills →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* -- Featured Guides ---------------- */}
      <section className="border-b border-ink/10 py-16 md:py-24">
        <div className="layout-container">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-fade mb-4">
                Operator Deep Dives
              </p>
              <h2 className="type-display text-4xl md:text-5xl leading-tight">
                Master the <span className="circled">Sales Stack.</span>
              </h2>
            </div>
            <Link href="/guides" className="inline-flex items-center gap-2 rounded-md border border-ink/10 bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-ink/20">
              View All Guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            {guides.map((guide) => (
              <Link 
                key={guide.slug} 
                href={`/guides/${guide.slug}`}
                className="panel group flex flex-col p-6 transition-colors hover:border-ink/15"
              >
                <h3 className="mb-4 text-xl font-semibold underline decoration-transparent underline-offset-4 transition-all group-hover:decoration-ink/30">
                  {guide.title}
                </h3>
                <p className="mb-6 line-clamp-3 text-[1rem] leading-relaxed text-ink-fade">
                  {guide.metaDescription}
                </p>
                <div className="mt-auto font-mono text-[0.68rem] uppercase tracking-[0.18em] font-semibold">
                  Read Guide →
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
