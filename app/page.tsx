import Link from "next/link"
import { ArrowRight, Cpu, Zap, Brain, Mail, Sparkles } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { getFeaturedTools, getAllCategories, getMcpTools } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Salestools Club — Every Sales API & MCP Server in one place.",
  description:
    "A simple directory of sales APIs and MCP servers. Find the tools to connect your sales stack to Claude and Cursor.",
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
      {/* ── Hero & Email Signup ──────────────────────────────── */}
      <section className="relative px-6 py-24 sm:px-12 sm:py-32 lg:px-24 overflow-hidden">
        {/* Background Illustration Pattern */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-20 pointer-events-none">
          <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="300" cy="300" r="299.5" stroke="url(#paint0_linear)" strokeDasharray="10 10"/>
            <circle cx="300" cy="300" r="199.5" stroke="url(#paint1_linear)" />
            <rect x="150" y="150" width="300" height="300" rx="40" transform="rotate(15 300 300)" stroke="url(#paint2_linear)" strokeWidth="2"/>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="600" y2="600" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2dd4bf" />
                <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="100" y1="100" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2dd4bf" stopOpacity="0.5" />
                <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint2_linear" x1="150" y1="150" x2="450" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2dd4bf" />
                <stop offset="1" stopColor="#2dd4bf" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="mx-auto max-w-4xl relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-club-teal">
            <Sparkles className="h-3 w-3 fill-club-teal" />
            Build your AI sales stack
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
            Every Sales API.<br />
            <span className="text-gray-500 italic font-heading font-light">In one place.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-xl text-gray-400 sm:text-2xl leading-relaxed">
            A curated collection of the APIs, SDKs, and MCP servers you need to connect your sales tools to Claude and Cursor.
          </p>

          <div className="mt-14 max-w-md">
            <form className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-club-teal to-club-teal/50 rounded-full blur opacity-25 group-focus-within:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-club-card border border-white/10 rounded-full p-1 shadow-2xl">
                <div className="flex items-center pl-5 pr-3 text-gray-500">
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
                  className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-club-teal hover:text-black transition-all"
                >
                  Join
                </button>
              </div>
            </form>
            <p className="mt-4 text-xs text-gray-500 font-medium uppercase tracking-widest px-6">
              Join 500+ AI-Native operators.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Tools (Moved Up) ────────────────────── */}
      <section className="px-6 py-20 sm:px-12 lg:px-24 border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl italic font-heading">The Registry</h2>
              <p className="mt-3 text-lg text-gray-400">Essential building blocks for your automated engine.</p>
            </div>
            <Link
              href="/tools"
              className="btn-club-outline hover:border-club-teal hover:text-club-teal transition-all group"
            >
              Browse all tools <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="club-card relative group"
              >
                <div className="mb-8 flex items-start justify-between">
                  <div className="flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-2xl font-black text-white group-hover:bg-club-teal group-hover:text-black transition-all">
                      {tool.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white transition-colors group-hover:text-club-teal">
                        {tool.name}
                      </h3>
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-tight">{tool.category}</span>
                    </div>
                  </div>
                  {tool.mcpReady && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-club-teal/10 text-club-teal border border-club-teal/20">
                      <Zap className="h-4 w-4 fill-club-teal" />
                    </div>
                  )}
                </div>

                <p className="mb-8 text-base text-gray-400 leading-relaxed line-clamp-2">{tool.oneLiner}</p>

                <div className="flex flex-wrap gap-2">
                  {tool.aiDifficulty && (
                    <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400 border border-white/5">
                      <Brain className="mr-1.5 inline h-3 w-3" /> {tool.aiDifficulty}
                    </span>
                  )}
                  {tool.apiType.map((type) => (
                    <span
                      key={type}
                      className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 border border-white/5"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────── */}
      <section className="px-6 py-24 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center sm:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl italic font-heading">Infrastructure Segments</h2>
            <p className="mt-4 text-lg text-gray-400">Mapped to real-world sales outcomes.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 8).map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group bg-club-card rounded-3xl p-8 border border-white/5 transition-all hover:border-club-teal/30 hover:-translate-y-1"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/5 group-hover:bg-club-teal/10 transition-colors">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-gray-700">0{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-club-teal transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-gray-500 line-clamp-2">
                  {cat.description}
                </p>
                <div className="mt-8 font-mono text-[10px] font-bold text-club-teal uppercase tracking-widest">
                  {cat.toolCount} TOOLS
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center sm:text-left">
            <Link href="/categories" className="btn-club-outline hover:border-white">
              All categories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MCP CTA ──────────────────────────────── */}
      <section className="px-6 py-24 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-club-teal text-black p-12 sm:p-20 flex flex-col items-center text-center relative overflow-hidden">
          {/* Abstract Pattern for Card */}
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
                Get MCP Servers
              </Link>
              <Link
                href="/submit"
                className="bg-white/20 backdrop-blur-md border border-black/10 px-10 py-4 rounded-full text-lg font-bold hover:bg-white/30 transition-colors"
              >
                Submit Entry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use with AI Agents CTA ─────────────────────── */}
      <section className="px-6 py-24 sm:px-12 lg:px-24 border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl italic font-heading">Autonomous Integration</h2>
          <p className="mt-6 text-lg text-gray-400">
            Equip your custom agents with standardized sales capabilities.
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
