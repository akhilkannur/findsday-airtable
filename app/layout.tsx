import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { GeistMono } from 'geist/font/mono'
import "./globals.css"
import Link from "next/link"
import { MobileNav } from "@/components/MobileNav"

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
    "A curated collection of sales APIs, SDKs, and MCP servers. Find the tools to connect your sales stack to Claude and Cursor.",
  keywords:
    "sales API, MCP server, Model Context Protocol, Claude, Cursor, AI sales tools, CRM API, sales automation API",
  openGraph: {
    title: "Salestools Club — Sales APIs & MCP Servers for AI Tinkerers",
    description:
      "A simple directory of sales APIs and MCP servers for people building with AI.",
    type: "website",
    url: "https://salestools.club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salestools Club — Sales APIs & MCP Servers for AI Tinkerers",
    description:
      "Find the APIs, SDKs, and MCP servers that plug your sales stack into Claude and Cursor.",
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
      <body className="bg-sage-bg text-ink-black antialiased">
        <header className="flex h-[60px] items-center justify-between border-b border-ink-black px-6 md:px-12">
          <div className="flex items-center gap-4">
            <div className="relative h-6 w-6 rounded-full border border-ink-black">
              <div className="absolute inset-0 rounded-full border border-dashed border-ink-black opacity-50 -m-1"></div>
              <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-black"></div>
            </div>
            <Link href="/" className="text-[0.75rem] font-medium uppercase tracking-[0.2em]">
              Salestools.club
            </Link>
          </div>

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.75rem] font-medium uppercase tracking-[0.1em] hover:underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/submit" className="text-[0.75rem] font-medium uppercase tracking-[0.1em] hover:underline">
              Submit
            </Link>
            <div className="text-[0.75rem] font-medium uppercase tracking-[0.1em] opacity-40 cursor-default">
              Login
            </div>
          </div>

          {/* Mobile nav */}
          <MobileNav links={navLinks} />
        </header>

        <div className="grid min-h-[calc(100vh-60px)] grid-cols-1 md:grid-cols-[240px_1fr]">
          <aside className="hidden flex-col gap-12 border-r border-ink-black p-8 md:flex">
            <div className="flex flex-col gap-4">
              <div className="type-label opacity-40">Categories</div>
              <Link href="/tools" className="flex items-center justify-between text-sm font-medium hover:underline">
                <span>All Tools</span>
                <span className="text-[0.7rem] opacity-40">200+</span>
              </Link>
              <Link href="/categories/crm" className="flex items-center justify-between text-sm font-medium opacity-60 hover:opacity-100">
                <span>CRM Platforms</span>
                <span>-></span>
              </Link>
              <Link href="/categories/prospecting" className="flex items-center justify-between text-sm font-medium opacity-60 hover:opacity-100">
                <span>Prospecting</span>
                <span>-></span>
              </Link>
              <Link href="/categories/workflow-automation" className="flex items-center justify-between text-sm font-medium opacity-60 hover:opacity-100">
                <span>Automation</span>
                <span>-></span>
              </Link>
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <div className="type-label opacity-40">System Status</div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent-orange animate-pulse"></div>
                <span className="type-label">Live Updates</span>
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
                  <div className="type-label opacity-40">System Nodes</div>
                  <ul className="space-y-3 text-sm font-medium">
                    <li><Link href="/tools" className="hover:underline">Directory</Link></li>
                    <li><Link href="/categories" className="hover:underline">Modules</Link></li>
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
