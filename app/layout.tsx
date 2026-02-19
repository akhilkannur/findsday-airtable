import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { GeistMono } from 'geist/font/mono'
import "./globals.css"
import Link from "next/link"
import { MobileNav } from "@/components/MobileNav"
import { Shield, Zap } from "lucide-react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Salestools Club — Every Sales API & MCP Server in one place.",
  description:
    "A curated collection of sales APIs, SDKs, and MCP servers. Find the tools to connect your sales stack to Claude Code, Cursor, and other agentic tools.",
  keywords:
    "sales API, MCP server, Model Context Protocol, Claude Code, Claude, Cursor, AI sales tools, CRM API, sales automation API",
  openGraph: {
    title: "Salestools Club — Sales APIs & MCP Servers for AI Tinkerers",
    description:
      "A curated directory of sales APIs and MCP servers for people building with Claude Code, Cursor, and other agentic tools.",
    type: "website",
    url: "https://salestools.club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salestools Club — Sales APIs & MCP Servers for AI Tinkerers",
    description:
      "Find the APIs, SDKs, and MCP servers that plug your sales stack into Claude Code, Cursor, and other agentic tools.",
  },
}

const navLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/categories", label: "Categories" },
  { href: "/mcp", label: "MCP Servers" },
  { href: "/submit", label: "Submit" },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/icon.png" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9LGNFH00R7" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-9LGNFH00R7');`,
          }}
        />
      </head>
      <body className="bg-sage-bg text-ink-black antialiased grain-bg min-h-screen">
        <header className="flex h-[60px] items-center justify-between border-b border-ink-black px-6 md:px-12 bg-sage-bg/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative flex h-8 w-8 items-center justify-center border-2 border-ink-black bg-accent-blue transition-all duration-500 group-hover:rotate-[15deg] shadow-[2px_2px_0px_#121212]">
                <Shield className="h-5 w-5 fill-ink-black" />
                <Zap className="absolute h-2 w-2 fill-accent-orange text-accent-orange top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="flex flex-col -gap-1">
                <span className="text-[0.85rem] font-bold uppercase tracking-[0.15em] leading-tight">
                  Salestools Club
                </span>
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.1em] opacity-40 leading-tight">
                  GTM Lego Blocks
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:underline hover:underline-offset-4 decoration-accent-orange/40 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-2 border-l border-ink-black/10 pl-6 h-6">
              <div className="h-1 w-1 rounded-full bg-accent-orange animate-pulse"></div>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] opacity-40">Session Active</span>
            </div>
            <Link href="/submit" className="swiss-btn-primary border border-ink-black px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] hover:bg-ink-black hover:text-accent-blue transition-colors">
              Submit Tool
            </Link>
          </div>

          {/* Mobile nav */}
          <MobileNav links={navLinks} />
        </header>

        <div className="grid min-h-[calc(100vh-60px)] grid-cols-1 md:grid-cols-[240px_1fr]">
          <aside className="hidden flex-col border-r border-ink-black/20 p-8 md:flex bg-sage-bg/50">
            <div className="flex flex-col gap-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="type-label">Categories</div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/tools" className="group flex items-center justify-between text-[0.8rem] font-bold uppercase tracking-tight transition-all hover:translate-x-1">
                    <span className="group-hover:text-accent-orange">All Tools</span>
                    <span className="text-[0.6rem] opacity-30 group-hover:opacity-100">70+</span>
                  </Link>
                  <Link href="/categories/crm" className="group flex items-center justify-between text-[0.75rem] font-medium opacity-60 transition-all hover:opacity-100 hover:translate-x-1">
                    <span>CRMs</span>
                    <span className="text-[0.6rem] transition-transform group-hover:translate-x-1">-></span>
                  </Link>
                  <Link href="/categories/prospecting" className="group flex items-center justify-between text-[0.75rem] font-medium opacity-60 transition-all hover:opacity-100 hover:translate-x-1">
                    <span>Prospecting</span>
                    <span className="text-[0.6rem] transition-transform group-hover:translate-x-1">-></span>
                  </Link>
                  <Link href="/categories/workflow-automation" className="group flex items-center justify-between text-[0.75rem] font-medium opacity-60 transition-all hover:opacity-100 hover:translate-x-1">
                    <span>Automation</span>
                    <span className="text-[0.6rem] transition-transform group-hover:translate-x-1">-></span>
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="type-label">Resources</div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/mcp" className="group flex items-center justify-between text-[0.75rem] font-medium opacity-60 transition-all hover:opacity-100 hover:translate-x-1">
                    <span>MCP Servers</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-blue/40 group-hover:bg-accent-blue"></span>
                  </Link>
                  <Link href="/submit" className="group flex items-center justify-between text-[0.75rem] font-medium opacity-60 transition-all hover:opacity-100 hover:translate-x-1">
                    <span>Submit Tool</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-orange/20 group-hover:bg-accent-orange"></span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-10 schematic-border-t">
              <div className="type-label opacity-30 mb-4">Live Status</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent-orange animate-pulse"></div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest leading-none">Online</span>
                </div>
                <div className="text-[0.6rem] font-mono opacity-20 uppercase">
                  Last Update: {new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })} UTC
                </div>
              </div>
            </div>
          </aside>

          <main className="flex flex-col">
            {children}
            
            <footer className="mt-auto border-t border-dashed border-ink-black p-12 md:p-24">
              <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-6">
                  <div className="text-xl font-bold tracking-tighter uppercase">Salestools Club</div>
                  <p className="text-sm leading-relaxed opacity-60">
                    A modern directory of sales APIs and MCP servers built for the new era of AI-native operators.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="type-label opacity-40">Browse</div>
                  <ul className="space-y-3 text-sm font-medium">
                    <li><Link href="/tools" className="hover:underline">Directory</Link></li>
                    <li><Link href="/categories" className="hover:underline">Categories</Link></li>
                    <li><Link href="/mcp" className="hover:underline">MCP Servers</Link></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <div className="type-label opacity-40">Documentation</div>
                  <ul className="space-y-3 text-sm font-medium">
                    <li><Link href="/about" className="hover:underline">About Project</Link></li>
                    <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                    <li><Link href="/submit" className="hover:underline">Add Entry</Link></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <div className="type-label opacity-40">Protocol</div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-widest leading-loose opacity-40">
                    v1.0.0-Stable<br />
                    © {new Date().getFullYear()} Salestools.club
                  </p>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </body>
    </html>
  )
}
