import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain, Mail, Sparkles } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getFeaturedTools, getAllCategories, getMcpTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Salestools Club — Every Sales API & MCP Server in one place.",
  description:
    "A simple list of the best sales APIs and MCP servers for people building with AI.",
}

function getCategoryIcon(iconName: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName]
  return Icon ? <Icon className="h-6 w-6 text-club-teal" /> : <Cpu className="h-6 w-6 text-club-teal" />
}

export default function Home() {
  const featuredTools = getFeaturedTools()
  const categories = getAllCategories()
  const mcpTools = getMcpTools()

  return (
    <main className="relative bg-club-dark text-white">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative px-6 py-32 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-club-teal shadow-2xl">
            <Sparkles className="h-3.5 w-3.5 fill-club-teal" />
            Connect your sales tools to AI
          </div>
          <h1 className="text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-[110px] leading-[0.9] text-white">
            Every Sales API.<br />
            <span className="text-gray-600 italic font-heading font-light">In one place.</span>
          </h1>
          <p className="mt-12 mx-auto max-w-2xl text-xl text-gray-400 sm:text-2xl leading-relaxed">
            A simple list of the APIs, SDKs, and MCP servers you need to build custom sales workflows with Claude and Cursor.
          </p>

          <div className="mt-16 mx-auto max-w-md">
            <form className="relative group">
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full p-1.5 backdrop-blur-sm transition-all focus-within:border-club-teal/50 focus-within:ring-4 focus-within:ring-club-teal/10">
                <div className="flex items-center pl-6 pr-3 text-gray-500">
                  <Mail className="h-5 w-5" />
                </div>
                <input 
                  type="email" 
                  placeholder="Get the Sunday list..." 
                  className="bg-transparent border-none text-white focus:ring-0 w-full py-3 text-lg placeholder-gray-600"
                  required
                />
                <button 
                  type="submit" 
                  className="btn-club"
                >
                  Join
                </button>
              </div>
            </form>
            <p className="mt-6 text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] opacity-60">
              Join 500+ builders using AI for sales.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Tools ───────────────────────────────── */}
      <section className="px-6 py-24 sm:px-12 lg:px-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col sm:flex-row sm:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl italic font-heading">Featured Tools</h2>
              <p className="mt-4 text-xl text-gray-400 leading-relaxed">The best APIs to start building with.</p>
            </div>
            <Link
              href="/tools"
              className="btn-club-outline group"
            >
              Browse all tools <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="club-card group flex flex-col"
              >
                <div className="mb-10 flex items-start justify-between">
                  <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-2xl font-black text-white group-hover:bg-club-teal group-hover:text-black transition-all duration-500 shadow-inner">
                      {tool.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-club-teal">
                        {tool.name}
                      </h3>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{tool.category}</span>
                    </div>
                  </div>
                  {tool.mcpReady && (
                    <div className="badge-club border-club-teal/20 text-club-teal bg-club-teal/5">
                      <Zap className="h-3 w-3 fill-club-teal" /> MCP
                    </div>
                  )}
                </div>

                <p className="mb-10 text-lg text-gray-400 leading-relaxed line-clamp-2">{tool.oneLiner}</p>

                <div className="mt-auto flex flex-wrap gap-3">
                  {tool.aiDifficulty && (
                    <span className="badge-club">
                      <Brain className="h-3 w-3" /> {tool.aiDifficulty}
                    </span>
                  )}
                  {tool.apiType.map((type) => (
                    <span key={type} className="badge-club">{type}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────── */}
      <section className="px-6 py-32 sm:px-12 lg:px-24 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl italic font-heading">What do you need to do?</h2>
            <p className="mt-6 text-xl text-gray-400">Find the right tools for every part of your sales process.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 8).map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group bg-club-card rounded-3xl p-10 border border-white/10 transition-all hover:border-club-teal/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-club-teal/5"
              >
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:bg-club-teal/10 transition-colors">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-gray-700 tracking-[0.3em]">0{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-club-teal transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed text-gray-500 line-clamp-3">
                  {cat.description}
                </p>
                <div className="mt-10 font-mono text-[11px] font-bold text-club-teal uppercase tracking-[0.2em]">
                  {cat.toolCount} TOOLS
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-20 text-center">
            <Link href="/categories" className="btn-club-outline hover:border-white">
              All categories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MCP CTA ──────────────────────────────── */}
      <section className="px-6 py-24 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-club-teal text-black p-12 sm:p-20 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 L100 0 L100 100 Z" fill="black" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-black text-white shadow-xl">
              <Zap className="h-8 w-8 fill-white" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl italic font-heading">Model Context Protocol</h2>
            <p className="mt-8 max-w-2xl text-lg sm:text-xl font-bold leading-relaxed">
              The fastest way to give your AI "hands". Plug these servers into Claude and start updating your CRM via chat.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                href="/mcp"
                className="bg-black text-white px-10 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-all shadow-2xl"
              >
                Browse MCP Servers
              </Link>
              <Link
                href="/submit"
                className="bg-white/20 backdrop-blur-md border border-black/10 px-10 py-4 rounded-full text-lg font-bold hover:bg-white/30 transition-colors"
              >
                Submit a tool
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use with AI Agents CTA ─────────────────────── */}
      <section className="px-6 py-24 sm:px-12 lg:px-24 border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl italic font-heading">Equip your AI Agents</h2>
          <p className="mt-6 text-lg text-gray-400">
            Let your AI assistant find and use the best sales tools for you.
          </p>
          <div className="mt-14 flex flex-col items-center gap-10 sm:flex-row sm:justify-center">
            <div className="flex items-center gap-5 bg-club-card border border-white/5 rounded-full px-8 py-5 font-mono text-sm shadow-xl">
              <span className="text-club-teal font-bold">$</span> 
              <span className="text-white tracking-tight">curl salestools.club/api/tools</span>
            </div>
            <a
              href="/salestools-skill.md"
              download
              className="btn-club hover:bg-club-teal transition-all shadow-xl"
            >
              Download Skill File <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
