import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Target, Users, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Salestools Club",
  description: "Learn about Salestools Club, the directory for AI-native sales operators.",
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 sm:px-12 lg:px-24">
      <div className="mb-24">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="mt-12 text-6xl font-extrabold tracking-tight sm:text-8xl italic font-heading">
          The New Sales Stack.
        </h1>
        <p className="mt-12 text-2xl text-gray-400 leading-relaxed max-w-2xl font-medium">
          Salestools Club is a curated directory of sales APIs, SDKs, and MCP servers built for the next generation of builders: <strong>AI-Native Operators.</strong>
        </p>
      </div>

      <div className="grid gap-16 sm:grid-cols-2">
        <div className="space-y-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-club-teal/10 text-club-teal border border-club-teal/20">
            <Target className="h-7 w-7" />
          </div>
          <h3 className="text-3xl font-bold tracking-tight">The Mission</h3>
          <p className="text-lg text-gray-500 leading-relaxed">
            We believe the future of sales isn't just better software—it's software that talks to AI. We're here to help you find the "hands" for your AI agents.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-club-teal/10 text-club-teal border border-club-teal/20">
            <Zap className="h-7 w-7" />
          </div>
          <h3 className="text-3xl font-bold tracking-tight">MCP-First</h3>
          <p className="text-lg text-gray-500 leading-relaxed">
            We prioritize tools that support the Model Context Protocol (MCP), making it easier than ever to connect your CRM or prospecting tool to Claude and Cursor.
          </p>
        </div>
      </div>

      <div className="mt-32 rounded-[3rem] bg-club-card border border-white/10 p-12 sm:p-20 shadow-2xl">
        <h2 className="text-4xl font-extrabold mb-8 italic font-heading">Get in touch</h2>
        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
          Have a tool that should be here? Or just want to talk about AI-native sales workflows? Reach out.
        </p>
        <a 
          href="mailto:akhil@salestools.club" 
          className="text-2xl font-bold text-club-teal hover:underline underline-offset-8 decoration-2"
        >
          akhil@salestools.club
        </a>
      </div>
    </main>
  )
}
