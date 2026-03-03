import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain, Mail, Sparkles, ChevronRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getAllCategories, getAllTools } from "@/lib/tools"
import type { Metadata } from "next"
import { NewsletterForm } from "@/components/NewsletterForm"

export const metadata: Metadata = {
  title: "Salestools Club — Every Sales API & MCP Server in one place.",
  description:
    "The sales API directory for AI agents. Find MCP servers, CRM APIs, and agentic sales tools for Claude Code, Gemini CLI, and autonomous sales workflows.",
  keywords: [
    "sales API directory",
    "MCP server for sales",
    "CRM API marketplace",
    "build AI sales agent",
    "Claude Code sales tools",
    "Gemini CLI sales",
    "agentic sales stack",
    "sales automation API",
    "AI agent sales integrations",
    "sales tools for AI agents",
  ],
  alternates: {
    canonical: "https://salestools.club",
  },
}

const faqItems = [
  {
    question: "What is a Sales API?",
    answer:
      "Think of an API as a pipe that connects two pieces of software. It allows your AI agent to send or receive data from your sales tools. For example, an API lets your agent pull a list of new leads from Apollo or push a finished contact record into HubSpot without you doing it manually.",
  },
  {
    question: "What is an MCP Server?",
    answer:
      "An MCP is like a universal plug. It is a newer, faster way to connect tools to AI agents like Claude Code or Gemini CLI. While an API is the pipe, an MCP is the standardized connection that makes the pipe work instantly. Instead of building a complex bridge, you just paste a small piece of configuration and your agent can immediately use that tool.",
  },
  {
    question: "What is a 'Skill'?",
    answer:
      "A skill is a set of instructions that tells your AI exactly how to perform a sales task. It combines a prompt with the right tools. For example, a 'Lead Scoring' skill would teach your agent how to look at a prospect's LinkedIn, check their company size, and give them a score from 1 to 100 based on your rules.",
  },
  {
    question: "Do I need to be a developer?",
    answer:
      "No. This site is built for founders, sales managers, and ops professionals. If you know how to use Claude Code or Gemini CLI, you can use these tools. Most of them work with simple copy and paste setup. You don't need to write code to use these building blocks.",
  },
  {
    question: "What does AI-Native mean?",
    answer:
      "It means the tool was built specifically to work with AI agents. These tools have clean data and easy connections that an AI can understand without getting confused by old or messy software structures.",
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
      href={`/tools/${tool.slug}`}
      className="tool-card group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]">
          {tool.name.charAt(0)}
        </div>
        {tool.mcpReady && (
          <div className="tag-mcp">MCP READY</div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="text-2xl font-semibold mb-2">{tool.name}</h3>
        <p className="text-[1rem] text-ink-fade leading-relaxed line-clamp-3 mb-6">
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
  const exploreTools = allTools.slice(-12).reverse()
  const categories = getAllCategories()

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* -- Hero -------------------------------------------- */}
      <section className="hero relative pt-12 pb-4 md:pt-16 md:pb-6 overflow-hidden">
        <div className="layout-container">
          <svg className="connections-layer absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" viewBox="0 0 1400 600" preserveAspectRatio="none">
            <path className="connector-line fill-none stroke-ink stroke-2 [stroke-dasharray:600] [stroke-dashoffset:600] animate-[drawLine_2s_ease_forwards_0.5s]" d="M 400,120 Q 600,180 750,140" />
            <path className="connector-line fill-none stroke-ink stroke-2 [stroke-dasharray:600] [stroke-dashoffset:600] animate-[drawLine_2s_ease_forwards_1s]" d="M 850,150 Q 800,300 350,450" />
          </svg>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes drawLine { to { stroke-dashoffset: 0; } }
          `}} />

          <div className="relative z-10">
            <h1 className="type-display mb-4 md:mb-6">
              The <span className="circled">Lego Blocks</span> <br />
              for your <span className="circled">AI Sales Agent.</span>
            </h1>
            
            <div className="font-serif italic text-xl md:text-2xl text-ink-fade max-w-2xl pl-6 border-l-2 border-ink mb-6 md:mb-8 leading-relaxed">
              A handpicked collection of APIs, Skills, and MCP servers that plug directly into Claude Code and other agentic tools. Build your GTM machine in hours, not weeks.
            </div>

            <div className="max-w-xl">
              <NewsletterForm />
              <div className="flex flex-col gap-2 -mt-4 md:-mt-6 mb-6 md:mb-8">
                <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">
                  New APIs & Skills. Every 10 days.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 mb-12">
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- Works With Trust Bar ----------------------- */}
      <section className="py-2 md:py-3 border-t border-ink/10">
        <div className="layout-container flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-fade whitespace-nowrap">
            Works with:
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {["Claude Code", "Gemini CLI", "Claude Cowork", "ChatGPT Operator", "Any Agentic Tools"].map(
              (agent) => (
                <span
                  key={agent}
                  className="font-mono text-[0.65rem] md:text-[0.7rem] text-ink/60 uppercase tracking-tighter"
                >
                  {agent}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* -- Directory Header ---------------- */}
      <section className="py-10 md:py-16 border-t border-ink">
        <div className="layout-container">
          <div className="mb-8 md:mb-12">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4">
              Recently Added
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              Sales APIs & MCP Servers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {exploreTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          <div className="mt-12 md:mt-16 text-center">
            <Link href="/tools" className="font-serif italic text-xl md:text-2xl border-b border-black hover:opacity-60 transition-opacity pb-1">
              Browse All APIs ->
            </Link>
          </div>

          {/* MCP Package CTA */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="p-6 md:p-8 bg-paper border-2 border-ink shadow-[6px_6px_0px_rgba(26,25,23,0.15)]">
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-3 text-center">
                Access directly from Claude Code or any agentic tool
              </p>
              <p className="font-mono text-[0.85rem] mb-4 text-center">
                Install: <code className="bg-ink text-paper px-3 py-1.5 rounded font-bold">npm install @salestoolsclub/mcp</code>
              </p>
              <p className="font-mono text-[0.7rem] text-ink-fade italic text-center">
                Then ask your agent: "Use the Salestools Club MCP to provide lead enrichment APIs for my use case"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -- What's Inside ----------------------------------- */}
      <section className="py-10 md:py-16 bg-paper-dark border-y border-ink">
        <div className="layout-container">
          <div className="mb-8 md:mb-12">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4">
              What&apos;s Inside
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              Three things you&apos;ll find here
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <Link href="/tools" className="group flex flex-col gap-4">
              <span className="font-mono text-[0.75rem] text-ink-fade tracking-widest">01</span>
              <h3 className="text-2xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8">
                Sales APIs
              </h3>
              <p className="text-[1rem] text-ink-fade leading-relaxed">
                Programmable access to your CRM, outreach tools, enrichment databases, and calling platforms. These let Claude Code or Gemini CLI read and write to your sales stack directly.
              </p>
              <span className="mt-auto font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade group-hover:text-ink transition-colors">
                Browse APIs →
              </span>
            </Link>

            <Link href="/mcp" className="group flex flex-col gap-4">
              <span className="font-mono text-[0.75rem] text-ink-fade tracking-widest">02</span>
              <h3 className="text-2xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8">
                MCP Servers
              </h3>
              <p className="text-[1rem] text-ink-fade leading-relaxed">
                Ready-made connectors that plug sales tools into Claude Code, Gemini CLI, and other agentic tools. No glue code. Copy the config, paste it, go.
              </p>
              <span className="mt-auto font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade group-hover:text-ink transition-colors">
                Browse MCP Servers →
              </span>
            </Link>

            <Link href="/skills" className="group flex flex-col gap-4">
              <span className="font-mono text-[0.75rem] text-ink-fade tracking-widest">03</span>
              <h3 className="text-2xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8">
                Agent Skills
              </h3>
              <p className="text-[1rem] text-ink-fade leading-relaxed">
                Pre-configured instruction files that teach your agent how to perform complex sales tasks. One-click install for Claude Code, Cursor, and Gemini CLI.
              </p>
              <span className="mt-auto font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade group-hover:text-ink transition-colors">
                Browse Skills →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* -- Categories ----------------------------- */}
      <section className="py-10 md:py-16 bg-paper-dark border-y border-ink">
        <div className="layout-container">
          <div className="mb-8 md:mb-12">
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">Categories</h2>
            <p className="mt-4 md:mt-6 text-lg md:text-xl font-medium text-ink-fade leading-relaxed max-w-xl">
              I vet every tool to make sure it actually works with AI agents. No fluff, just the building blocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {categories.slice(0, 8).map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group flex flex-col h-full gap-6 p-6 md:p-8 bg-paper-dark/60 hover:translate-y-[-4px] transition-all"
                style={{ border: '1px solid rgba(26, 25, 23, 0.15)' }}
              >
                <h3 className="text-xl md:text-2xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8">
                  {cat.name}
                </h3>
                <p className="text-[1rem] text-ink-fade line-clamp-3 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-auto font-mono text-[0.7rem] uppercase text-ink-fade">
                  <span className="font-bold">{cat.toolCount}</span> Tools
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
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4">
              Common Questions
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              Everything you need to know
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-8 md:gap-y-10">
            {faqItems.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <span className="font-mono text-[0.75rem] text-ink-fade tracking-widest">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl font-bold">{item.question}</h3>
                <p className="text-[1rem] text-ink-fade leading-relaxed">
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
