import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About | Salestools Club",
  description: "Learn about Salestools Club, the directory for AI-native sales operators.",
  alternates: {
    canonical: "https://salestools.club/about",
  },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-4 md:px-8 py-12 md:py-24 border-b border-ink">
        <div className="layout-container">
          <Link
            href="/"
            className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase underline transition-colors hover:text-ink mb-8 md:mb-12 inline-block"
          >
            &lt;- Back to Registry
          </Link>

          <h1 className="type-display mb-8 md:mb-12 text-3xl md:text-5xl lg:text-7xl">
            I Built This Because The Old Way Broke.
          </h1>
          <p className="max-w-2xl text-xl md:text-2xl text-ink-fade leading-relaxed border-l border-ink/10 pl-4 md:pl-6">
            I'm <a href="https://akhilneeds.space" target="_blank" rel="noopener noreferrer" className="underline hover:line-through">Akhil</a>. I've never been in a traditional sales role, but outreach and selling have always been part of what I do. I've always had an affinity for sales tools, and I've built a few of them over the past few years too. This directory is what came out of that.
          </p>
        </div>
      </section>

      <div className="layout-container grid grid-cols-1 md:grid-cols-2 md:divide-x divide-ink border-b border-ink bg-white/20">
        <div className="p-8 md:p-16 space-y-6 md:space-y-8 border-b md:border-b-0 border-ink">
          <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center bg-ink text-paper font-bold text-lg md:text-xl [clip-path:polygon(0%_0%,100%_5%,95%_100%,5%_95%)]">
            O
          </div>
          <h3 className="text-2xl md:text-3xl font-bold uppercase underline decoration-ink/20 underline-offset-8">The Origin</h3>
          <p className="text-lg md:text-xl text-ink-fade leading-relaxed">
            I've always been curious about how sales tools work under the hood. Over time I started wiring their APIs directly into Claude instead of learning yet another dashboard. That shift, from clicking buttons to stringing together API calls with an AI agent, is what this whole thing is about.
          </p>
        </div>

        <div className="p-8 md:p-16 space-y-6 md:space-y-8 bg-white/40">
          <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center bg-ink text-paper font-bold text-lg md:text-xl [clip-path:polygon(5%_5%,95%_0%,100%_95%,0%_100%)]">
            D
          </div>
          <h3 className="text-2xl md:text-3xl font-bold uppercase underline decoration-ink/20 underline-offset-8">The Directory</h3>
          <p className="text-lg md:text-xl text-ink-fade leading-relaxed">
            I started collecting the APIs, SDKs, and MCP servers I was actually using, plus the ones I wished existed. It turned into a directory for the kind of builder I'd become: someone who doesn't want a dashboard, they want an endpoint. Someone who'd rather prompt an agent than click through onboarding flows. If that sounds like you, you're in the right place.
          </p>
        </div>
      </div>

      <section className="py-12 md:py-24">
        <div className="layout-container">
          <div className="max-w-3xl">
            <h2 className="type-display mb-8 md:mb-12 text-3xl md:text-5xl lg:text-7xl">Find something missing?</h2>
            <p className="text-lg md:text-xl text-ink-fade mb-8 md:mb-12 leading-relaxed">
              I add tools as I find and test them. If you're using an API or MCP server that should be here, or just want to trade automation war stories — hit me up.
            </p>
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:akhil@salestools.club" 
                className="text-xl md:text-2xl font-bold underline underline-offset-8 decoration-2 transition-all break-all"
              >
                akhil@salestools.club
              </a>
              <a 
                href="https://akhilneeds.space" 
                target="_blank" rel="noopener noreferrer"
                className="text-lg text-ink-fade underline underline-offset-4 decoration-1 hover:text-ink transition-colors"
              >
                akhilneeds.space →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
