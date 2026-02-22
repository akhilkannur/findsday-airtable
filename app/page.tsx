import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain, Mail, Sparkles, ChevronRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getFeaturedTools, getAllCategories, getAllTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Salestools Club — Every Sales API & MCP Server in one place.",
  description:
    "Every Sales API and MCP server you need to automate your GTM with Claude Code and agentic tools.",
  keywords: [
    "what is mcp server sales",
    "ai sales tools directory",
    "sales api directory",
    "mcp server for crm",
    "ai native sales tools",
  ],
  alternates: {
    canonical: "https://salestools.club",
  },
}

const faqItems = [
  {
    question: "What is an MCP server?",
    answer:
      "A connector that lets AI agents (like Claude or Cursor) talk directly to a sales tool. Instead of writing API code, you paste a config and your agent can update your CRM, search leads, or send emails.",
  },
  {
    question: "Do I need to code?",
    answer:
      "Not really. Most tools here work with copy-paste configs and starter prompts. If you can use Claude Code or Cursor, you can use these tools.",
  },
  {
    question: "What does AI-Native mean?",
    answer:
      "It means the tool was built (or works well) with AI agents in mind. Good API docs, MCP support, and clean endpoints that an AI can call without getting confused.",
  },
  {
    question: "How do I choose between an API and an MCP server?",
    answer:
      "If the tool has an MCP server, start there — it's the fastest path. If not, use the API with a starter prompt. We label MCP-ready tools so you can filter for them.",
  },
  {
    question: "Is this only for developers?",
    answer:
      "No. This is for founders, sales managers, and ops people who use AI tools to build automations. If you use Claude or Cursor, you're the target audience.",
  },
  {
    question: "Can I submit a tool?",
    answer:
      "Yes. If you know a sales API or MCP server we're missing, submit it and we'll review it.",
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
  const allFeatured = await getFeaturedTools()
  const exploreTools = allFeatured.slice(0, 12)
  const allTools = await getAllTools()
  const categories = getAllCategories()

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero relative">
        <div className="layout-container">
          <svg className="connections-layer absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" viewBox="0 0 1400 600" preserveAspectRatio="none">
            <path className="connector-line fill-none stroke-ink stroke-2 [stroke-dasharray:600] [stroke-dashoffset:600] animate-[drawLine_2s_ease_forwards_0.5s]" d="M 400,120 Q 600,180 750,140" />
            <path className="connector-line fill-none stroke-ink stroke-2 [stroke-dasharray:600] [stroke-dashoffset:600] animate-[drawLine_2s_ease_forwards_1s]" d="M 850,150 Q 800,300 350,450" />
          </svg>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes drawLine { to { stroke-dashoffset: 0; } }
          `}} />

          <div className="relative z-10">
            <h1 className="type-display mb-12">
              The <span className="circled">Lego Blocks</span> <br />
              for your <span className="circled">AI Sales Agent.</span>
            </h1>
            
            <div className="font-serif italic text-2xl text-ink-fade max-w-2xl pl-6 border-l-2 border-ink mb-16 leading-relaxed">
              Don't reinvent the wheel. We've curated the best APIs, SDKs, and MCP servers that plug directly into Claude Code and Cursor. Build your GTM machine in hours, not weeks.
            </div>

            <div className="max-w-xl">
              <form className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end mb-6">
                <div className="flex-grow">
                  <input 
                    type="email" 
                    placeholder="enter your email..." 
                    className="w-full bg-transparent border-b-2 border-ink font-mono text-lg py-2 focus:outline-none placeholder:italic placeholder:text-ink-fade"
                    required
                  />
                </div>
                <button type="submit" className="bg-ink text-paper px-8 py-3 font-mono font-bold uppercase text-[0.9rem] hover:bg-ink/90 transition-all whitespace-nowrap">
                  Join the Club
                </button>
              </form>
              <div className="flex flex-col gap-2">
                <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">
                  Fresh APIs, Blueprints & Workflows. Arriving every 10 days.
                </p>
                <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-fade/60">
                  {allTools.length} Tools Indexed. Last refresh: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Works With Trust Bar ─────────────────────── */}
      <section className="py-12 border-t border-ink">
        <div className="layout-container">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-6">
            Works with your agent
          </p>
          <div className="flex flex-wrap gap-3">
            {["Claude Code", "Claude Desktop", "Gemini CLI", "Claude Cowork", "ChatGPT Operator", "Any MCP Client"].map(
              (agent) => (
                <span
                  key={agent}
                  className="font-mono text-[0.8rem] px-4 py-2 border border-ink/20 text-ink"
                >
                  {agent}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── What's Inside ─────────────────────────────── */}
      <section className="py-32 bg-paper-dark border-y border-ink">
        <div className="layout-container">
          <div className="mb-20">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4">
              What&apos;s Inside
            </p>
            <h2 className="font-serif text-5xl leading-tight">
              Three things you&apos;ll find here
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Link href="/tools" className="group flex flex-col gap-4">
              <span className="font-mono text-[0.75rem] text-ink-fade tracking-widest">01</span>
              <h3 className="text-2xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8">
                Sales APIs
              </h3>
              <p className="text-[1rem] text-ink-fade leading-relaxed">
                Programmable access to your CRM, outreach tools, enrichment databases, and calling platforms. These let your AI agent read and write to your sales stack directly.
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
                Ready-made connectors that plug sales tools into Claude, Cursor, and other AI agents. No glue code. Copy the config, paste it, go.
              </p>
              <span className="mt-auto font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade group-hover:text-ink transition-colors">
                Browse MCP Servers →
              </span>
            </Link>

            <Link href="/tools" className="group flex flex-col gap-4">
              <span className="font-mono text-[0.75rem] text-ink-fade tracking-widest">03</span>
              <h3 className="text-2xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8">
                Starter Prompts
              </h3>
              <p className="text-[1rem] text-ink-fade leading-relaxed">
                Copy-paste prompts that tell your AI agent exactly how to use each tool for a real sales task. No docs to read, no code to write.
              </p>
              <span className="mt-auto font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade group-hover:text-ink transition-colors">
                Browse Prompts →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Directory Header ──────────────── */}
      <section className="py-20 border-t border-ink">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {exploreTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link href="/tools" className="font-serif italic text-2xl border-b border-black hover:opacity-60 transition-opacity pb-1">
              Browse All Tools ->
            </Link>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────── */}
      <section className="py-32 bg-paper-dark border-y border-ink">
        <div className="layout-container">
          <div className="mb-20">
            <h2 className="font-serif text-5xl leading-tight">Categories</h2>
            <p className="mt-8 text-xl font-medium text-ink-fade leading-relaxed max-w-xl">
              We vet every tool to make sure it actually works with AI agents. No fluff, just the building blocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {categories.slice(0, 8).map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group flex flex-col h-full gap-6 p-8 bg-paper-dark/60 hover:translate-y-[-4px] transition-all"
                style={{ border: '1px solid rgba(26, 25, 23, 0.15)' }}
              >
                <h3 className="text-2xl font-bold uppercase underline decoration-transparent group-hover:decoration-ink transition-all underline-offset-8">
                  {cat.name}
                </h3>
                <p className="text-[1rem] text-ink-fade line-clamp-3 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-auto font-mono text-[0.7rem] uppercase text-ink-fade">
                  {cat.toolCount} Tools
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section className="py-32">
        <div className="layout-container">
          <div className="mb-20">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4">
              Common Questions
            </p>
            <h2 className="font-serif text-5xl leading-tight">
              Everything you need to know
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
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
                      </Link>{" "}
                      and we&apos;ll review it.
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
