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
    <main className="relative min-h-screen bg-enjin-bg selection:bg-enjin-teal/30">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative px-6 pt-32 pb-40 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-enjin-teal">
            <Sparkles className="h-3.5 w-3.5 fill-enjin-teal" />
            Connect your sales tools to AI
          </div>
          <h1 className="text-gradient text-7xl font-extrabold sm:text-8xl lg:text-[120px]">
            Every Sales API.<br />
            <span className="text-gray-700 italic font-heading font-light">In one place.</span>
          </h1>
          <p className="mt-16 mx-auto max-w-2xl text-xl text-gray-500 sm:text-2xl leading-relaxed font-medium">
            A simple list of the APIs, SDKs, and MCP servers you need to build custom sales workflows with Claude and Cursor.
          </p>

          <div className="mt-20 mx-auto max-w-md">
            <form className="relative group">
              <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full p-2 backdrop-blur-xl transition-all focus-within:border-enjin-teal/40">
                <div className="flex items-center pl-6 pr-3 text-gray-600">
                  <Mail className="h-5 w-5" />
                </div>
                <input 
                  type="email" 
                  placeholder="Get the Sunday list..." 
                  className="bg-transparent border-none text-white focus:ring-0 w-full py-4 text-lg placeholder-gray-700"
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
            <p className="mt-8 text-[10px] text-gray-600 font-bold uppercase tracking-[0.4em]">
              Join 500+ builders using AI for sales.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Tools ───────────────────────────────── */}
      <section className="px-6 py-32 sm:px-12 lg:px-24 border-t border-white/[0.05]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 flex flex-col sm:flex-row sm:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold sm:text-6xl text-gradient">Featured Tools</h2>
              <p className="mt-6 text-xl text-gray-500 leading-relaxed font-medium">The best APIs to start building with.</p>
            </div>
            <Link
              href="/tools"
              className="btn-club-outline group"
            >
              Browse all <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="club-card group flex flex-col"
              >
                <div className="mb-12 flex items-start justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-black text-2xl font-black group-hover:bg-enjin-teal transition-all duration-500">
                      {tool.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-enjin-teal">
                        {tool.name}
                      </h3>
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1 block">{tool.category}</span>
                    </div>
                  </div>
                  {tool.mcpReady && (
                    <div className="badge-club border-enjin-teal/20 text-enjin-teal bg-enjin-teal/5">
                      <Zap className="h-3 w-3 fill-enjin-teal" /> MCP
                    </div>
                  )}
                </div>

                <p className="mb-12 text-lg text-gray-500 leading-relaxed line-clamp-2 font-medium">{tool.oneLiner}</p>

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
      <section className="px-6 py-40 sm:px-12 lg:px-24 border-t border-white/[0.05]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-32 text-center">
            <h2 className="text-5xl font-extrabold sm:text-7xl text-gradient">What do you need to do?</h2>
            <p className="mt-8 text-xl text-gray-500 font-medium">Find the right tools for every part of your sales process.</p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 8).map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group bg-enjin-card border border-enjin-border rounded-[32px] p-12 transition-all hover:border-white/10 hover:-translate-y-2"
              >
                <div className="mb-12 flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white/[0.03] border border-white/5 group-hover:bg-enjin-teal/10 transition-colors">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-gray-800 tracking-[0.4em]">0{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-enjin-teal transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-gray-600 line-clamp-3 font-medium">
                  {cat.description}
                </p>
                <div className="mt-12 font-mono text-[10px] font-bold text-enjin-teal uppercase tracking-[0.3em]">
                  {cat.toolCount} TOOLS
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-24 text-center">
            <Link href="/categories" className="btn-club-outline">
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
