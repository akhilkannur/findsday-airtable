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
  { href: "/tools", label: "Directory" },
  { href: "/categories", label: "Categories" },
  { href: "/mcp", label: "MCP Servers" },
  { href: "/submit", label: "Submit Tool" },
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
        <nav className="border-b border-ink py-4 sticky top-0 bg-paper z-[100]">
          <div className="layout-container flex justify-between items-baseline">
            <Link href="/" className="font-mono font-bold text-lg tracking-tighter hover:line-through transition-all">
              SALESTOOLS.CLUB
            </Link>
            
            <div className="hidden md:flex gap-8 items-center font-mono text-[0.85rem] uppercase">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:line-through transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <a 
                href="mailto:akhil@salestools.club" 
                className="hidden lg:block font-mono text-[0.75rem] uppercase hover:line-through transition-all"
              >
                Contact
              </a>
              
              <MobileNav links={navLinks} />
            </div>
          </div>
        </nav>

        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="border-t border-ink p-12 mt-20 opacity-60">
          <div className="layout-container text-center flex flex-col items-center gap-8">
            <svg width="40" height="40" viewBox="0 0 100 100" className="opacity-40">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"></circle>
              <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="2"></line>
              <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2"></line>
            </svg>
            <div className="font-mono text-[0.75rem] uppercase tracking-widest">
              build by <a href="https://akhilhaving.fun" target="_blank" rel="noopener noreferrer" className="hover:underline">akhilhaving.fun</a><br />
              © {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
