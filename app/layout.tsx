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
        <div className="u-grid-bg"></div>
        
        <div className="layout-container">
          <header className="flex h-[60px] items-stretch justify-between border-b border-[#333333] bg-black sticky top-0 z-[100]">
            <div className="flex items-stretch">
              <Link href="/" className="flex items-center px-8 border-right border-[#333333] font-extrabold text-[18px] tracking-[-0.02em] hover:bg-white hover:text-black transition-colors group">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-3 fill-current">
                  <path d="M4 4h7l-5 16h-2V4z M13 4h7v16h-7l5-16z"></path>
                </svg>
                SALESTOOLS.CLUB
              </Link>
              
              <nav className="hidden md:flex items-stretch">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center px-6 border-r border-[#333333] text-[11px] font-semibold uppercase tracking-[0.05em] hover:bg-white hover:text-black transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-stretch">
              <div className="hidden lg:flex items-center px-6 border-r border-[#333333] gap-2 text-[12px] font-mono text-[#888]">
                <div className="w-2 h-2 bg-[#00FF00] rounded-full shadow-[0_0_8px_#00FF00] animate-status-pulse"></div>
                SESSION ACTIVE
              </div>
              
              <Link href="/submit" className="flex items-center px-6 bg-white text-black text-[11px] font-bold uppercase tracking-[0.05em] hover:bg-[#ccc] transition-colors">
                SUBMIT TOOL
              </Link>

              {/* Mobile nav toggle would go here - keeping it simple for now as per design */}
              <MobileNav links={navLinks} />
            </div>
          </header>

          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="border-t border-[#333333] p-12 bg-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-4">
                <div className="text-xl font-bold tracking-tighter uppercase">Salestools Club</div>
                <p className="text-[13px] text-[#888] leading-relaxed">
                  The technical "Lego Blocks" for your AI Sales Agent. APIs, SDKs, and MCP servers.
                </p>
              </div>
              {/* Keeping existing footer navigation links for SEO */}
              <div className="space-y-4">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#444]">Navigation</div>
                <ul className="space-y-2 text-[13px] font-medium text-[#888]">
                  <li><Link href="/tools" className="hover:text-white transition-colors">Nodes</Link></li>
                  <li><Link href="/categories" className="hover:text-white transition-colors">Classes</Link></li>
                  <li><Link href="/mcp" className="hover:text-white transition-colors">Protocols</Link></li>
                  <li><Link href="/vs" className="hover:text-white transition-colors">Audits</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#444]">Documentation</div>
                <ul className="space-y-2 text-[13px] font-medium text-[#888]">
                  <li><Link href="/about" className="hover:text-white transition-colors">System Info</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy protocol</Link></li>
                  <li><Link href="/submit" className="hover:text-white transition-colors">Add Module</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#444]">Status</div>
                <p className="text-[11px] font-mono text-[#444] leading-loose">
                  STC_NODE_STABLE<br />
                  © {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
