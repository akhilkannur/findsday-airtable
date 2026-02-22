import Link from "next/link"
import { ArrowRight, Check, Database, Search, Zap, Code, Shield, Sparkles } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Directory Builder | Salestools Club",
  description: "The exact machine used to build Salestools.club. Build and maintain your own AI-native directory autonomously.",
}

export default function DirectoryBuilderPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="px-8 py-32 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <div className="font-mono text-[0.85rem] uppercase tracking-[0.2em] text-ink-fade mb-8 flex items-center gap-3">
            <span className="w-2 h-2 bg-ink rounded-full animate-status-blink"></span>
            Proprietary Agent Skill
          </div>
          <h1 className="type-display mb-12 text-6xl md:text-8xl leading-tight">
            Clone this <br />
            entire <span className="circled">website.</span>
          </h1>
          <p className="max-w-3xl font-serif italic text-3xl text-ink-fade leading-relaxed border-l-2 border-ink pl-8 mb-16">
            Get the exact "Skill Package" and automation engine I used to build Salestools.club. Deploy your own directory for any niche (Recruiting, Legal, etc.) in a few hours. 
          </p>
          
          <div className="flex flex-col gap-12">
            <div className="tool-card bg-ink text-paper p-10 max-w-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="font-mono text-[0.7rem] uppercase tracking-widest opacity-60">Setup Command</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-paper rounded-full animate-status-blink"></span>
                  <span className="font-mono text-[0.7rem] uppercase">Live</span>
                </div>
              </div>
              <pre className="font-mono text-[1.2rem] md:text-[1.5rem] font-bold mb-8">
                npx salestools bootstrap
              </pre>
              <div className="font-mono text-[0.7rem] uppercase tracking-widest text-paper/40 mb-8 pt-8 border-t border-white/10 space-y-2">
                <p>Includes: Next.js Frontend + Python Scripts + Agent Logic</p>
                <p className="text-paper/80 font-bold">Bonus: 1 week of email support for initial users</p>
              </div>
              <div className="flex flex-wrap gap-6">
                <button className="bg-paper text-ink px-8 py-3 font-mono font-bold uppercase text-[0.8rem] hover:bg-white transition-all">
                  Copy Command
                </button>
                <button className="border border-white/20 text-paper px-8 py-3 font-mono font-bold uppercase text-[0.8rem] hover:bg-white/10 transition-all">
                  Download Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Stack ────────────────────────────────────── */}
      <section className="py-32 border-b border-ink">
        <div className="layout-container">
          <div className="mb-24">
            <h2 className="font-serif text-5xl mb-8 italic">What's inside the box?</h2>
            <p className="text-xl text-ink-fade max-w-2xl leading-relaxed">
              This isn't just a template. It's a complete autonomous workflow that researches, cleanses, and syncs data while you sleep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: Sparkles,
                title: "One-Click Cloning",
                desc: "Hand the skill file to your agent and say 'Build this for the Recruiting niche'. It sets up the whole structure instantly."
              },
              {
                icon: Search,
                title: "Niche Research",
                desc: "Uses crawl4ai logic to autonomously scan documentation, features, and pricing for your specific industry."
              },
              {
                icon: Database,
                title: "Sheet-to-Site",
                desc: "Your AI populates a Google Sheet with research, and the site auto-generates pages. You own the database."
              },
              {
                icon: Zap,
                title: "Ready to Deploy",
                desc: "Pre-configured for Vercel. Push your code and the site is live. Total build time: ~2 hours."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-ink/10 bg-white/40 space-y-6 group hover:border-ink transition-all">
                <item.icon className="w-8 h-8 text-ink" />
                <h3 className="text-xl font-bold uppercase tracking-tight">{item.title}</h3>
                <p className="text-ink-fade leading-relaxed text-[0.95rem]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Value ────────────────────────────────────── */}
      <section className="py-32 bg-paper-dark/50 border-b border-ink">
        <div className="layout-container grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="font-serif text-5xl mb-12 italic leading-tight">Stop building, <br />start curating.</h2>
            <div className="space-y-8">
              {[
                "Next.js 15 Frontend (The Salestools aesthetic)",
                "The 'Content Ops' AI Prompt (The actual brain)",
                "Python Automation Suite (Sync & Management scripts)",
                "One-Click 'npx' installation command setup",
                "Full training on how to use it with Claude/Cursor"
              ].map((point, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <Check className="w-6 h-6 text-ink flex-shrink-0 mt-1" />
                  <span className="text-xl text-ink font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-12 border-2 border-ink bg-paper relative">
            <div className="absolute -top-6 -right-6 bg-ink text-paper p-6 font-mono text-xl rotate-3 shadow-xl">
              MVP READY
            </div>
            <div className="space-y-8">
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-fade">The Logic</div>
              <div className="p-8 bg-black text-paper font-mono text-[11px] leading-relaxed">
                <span className="text-paper/40">// Phase 1: Research Loop</span><br />
                agent.use("crawl4ai").scan(target_url)<br />
                agent.extract("api_endpoints", "pricing", "mcp_support")<br />
                <br />
                <span className="text-paper/40">// Phase 2: Sheet Sync</span><br />
                python3 scripts/gsheet_manager.py --update
              </div>
              <p className="font-serif italic text-lg text-ink-fade">
                "I used this exact machine to scale from 0 to 380+ tools in less than 48 hours of total work."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-48 text-center">
        <div className="layout-container max-w-3xl">
          <h2 className="type-display mb-12 text-5xl">Ready to <br /><span className="circled text-ink">start?</span></h2>
          <p className="text-2xl font-serif italic text-ink-fade mb-16 leading-relaxed">
            I am offering the full setup (code + skills + scripts) for founders who want to build high-trust directories. One week of direct email support included.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a href="mailto:akhil@salestools.club?subject=Directory Builder Package" className="circled font-mono font-bold px-12 py-4 text-[1.2rem] uppercase hover:bg-ink hover:text-paper transition-all">
              Request the Package
            </a>
            <Link href="/" className="font-mono text-[0.8rem] uppercase underline hover:line-through transition-all">
              Back to Registry
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
