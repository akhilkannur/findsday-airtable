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
      <body className="antialiased min-h-screen">
        <nav className="bg-[var(--lego-yellow)] border-b-[var(--border-width)] border-black py-4 sticky top-0 z-[100]">
          <div className="layout-container flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link href="/" className="bg-[var(--lego-red)] text-white px-4 py-2 border-[var(--border-width)] border-black rounded-[var(--radius-sm)] shadow-[3px_3px_0_black] -rotate-2 font-bold text-xl flex items-center gap-2 hover:scale-105 transition-transform">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                Salestools.club
              </Link>
              
              <div className="hidden md:flex gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-black font-semibold px-3 py-2 rounded-[var(--radius-sm)] hover:bg-white/40 transition-colors uppercase text-[0.8rem]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center text-[0.85rem] font-bold text-black gap-2">
                <span className="w-3 h-3 bg-[var(--lego-green)] border-2 border-black rounded-full animate-status-pulse"></span>
                SESSION ACTIVE
              </div>
              
              <Link href="/submit" className="brick brick-btn bg-black text-white hover:scale-105 transition-transform py-2.5">
                Submit Tool
              </Link>

              <MobileNav links={navLinks} />
            </div>
          </div>
        </nav>

        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-[var(--lego-blue)] border-t-[var(--border-width)] border-black p-12 text-white">
          <div className="layout-container grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="text-2xl font-bold uppercase tracking-tighter">Salestools Club</div>
              <p className="text-[14px] opacity-80 leading-relaxed">
                The technical "Lego Blocks" for your AI Sales Agent. APIs, SDKs, and MCP servers.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-widest opacity-60">Navigation</div>
              <ul className="space-y-2 text-[14px] font-semibold">
                <li><Link href="/tools" className="hover:underline">Nodes</Link></li>
                <li><Link href="/categories" className="hover:underline">Classes</Link></li>
                <li><Link href="/mcp" className="hover:underline">Protocols</Link></li>
                <li><Link href="/vs" className="hover:underline">Audits</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-widest opacity-60">Documentation</div>
              <ul className="space-y-2 text-[14px] font-semibold">
                <li><Link href="/about" className="hover:underline">System Info</Link></li>
                <li><Link href="/privacy" className="hover:underline">Privacy protocol</Link></li>
                <li><Link href="/submit" className="hover:underline">Add Module</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-widest opacity-60">Status</div>
              <p className="text-[12px] font-mono leading-loose">
                STC_BLOCK_STABLE<br />
                © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
