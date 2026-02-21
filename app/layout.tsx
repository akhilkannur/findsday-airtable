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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Salestools Club",
    "url": "https://salestools.club",
    "logo": "https://salestools.club/icon.png",
    "description": "A curated directory of sales APIs and MCP servers for AI agents and developers.",
    "sameAs": [
      "https://x.com/salestoolsclub"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Salestools Club",
    "url": "https://salestools.club",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://salestools.club/tools?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="canonical" href="https://salestools.club" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9LGNFH00R7" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-9LGNFH00R7');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="bg-sage-bg text-ink-black antialiased grain-bg min-h-screen">
        <header className="flex h-[60px] items-center justify-between border-b border-ink-black px-6 md:px-12 bg-sage-bg/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-0">
              <div className="flex flex-col items-start leading-none">
                <div className="flex items-center gap-1.5">
                  <span className="text-[1.1rem] font-black tracking-[-0.02em] uppercase italic italic-bold">
                    Salestools
                  </span>
                  <span className="bg-accent-orange text-white text-[0.6rem] font-black px-1.5 py-0.5 transform -rotate-3 shadow-[2px_2px_0px_#121212] uppercase tracking-tighter">
                    Club
                  </span>
                </div>
                <span className="text-[0.55rem] font-bold uppercase tracking-[0.3em] opacity-30 mt-1 ml-0.5">
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
              <div className="h-1 w-1 bg-accent-orange animate-pulse"></div>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] opacity-40">Session Active</span>
            </div>
            <Link href="/submit" className="swiss-btn px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] hover:bg-ink-black hover:text-white transition-colors">
              Submit Tool
            </Link>
          </div>

          {/* Mobile nav */}
          <MobileNav links={navLinks} />
        </header>

        <div className="flex flex-col min-h-[calc(100vh-60px)]">
          <main className="flex flex-col flex-grow">
            {children}
          </main>
          
          <footer className="bg-accent-blue border-t-2 border-ink-black p-4 md:p-8 lg:p-12 text-ink-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-y-6 gap-x-10 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4">
                <div className="text-2xl font-black tracking-tighter uppercase italic">Salestools Club</div>
                <p className="text-sm font-bold leading-relaxed">
                  A curated directory of the best sales APIs and MCP servers for people building with Claude Code and other agentic tools.
                </p>
              </div>
              <div className="space-y-4">
                <div className="type-label text-ink-black font-black">Browse</div>
                <ul className="space-y-3 text-sm font-bold">
                  <li><Link href="/tools" className="hover:text-accent-orange transition-colors">Tool Directory</Link></li>
                  <li><Link href="/categories" className="hover:text-accent-orange transition-colors">Categories</Link></li>
                  <li><Link href="/mcp" className="hover:text-accent-orange transition-colors">MCP Servers</Link></li>
                  <li><Link href="/vs" className="hover:text-accent-orange transition-colors">Comparisons</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="type-label text-ink-black font-black">Documentation</div>
                <ul className="space-y-3 text-sm font-bold">
                  <li><Link href="/about" className="hover:text-accent-orange transition-colors">About Project</Link></li>
                  <li><Link href="/privacy" className="hover:text-accent-orange transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/submit" className="hover:text-accent-orange transition-colors">Add Entry</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="type-label text-ink-black font-black">Registry</div>
                <p className="text-[0.7rem] font-black uppercase tracking-widest leading-loose">
                  v1.0.0-Stable<br />
                  © {new Date().getFullYear()} Salestools.club
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
