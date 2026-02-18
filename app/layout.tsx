import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import "./globals.css"
import Link from "next/link"
import { MobileNav } from "@/components/MobileNav"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Findsday — Sales APIs & MCP Servers for AI Tinkerers",
  description:
    "The directory of sales tools with APIs and MCP servers. Find APIs, SDKs, and MCP servers to plug your sales stack into Claude, Cursor, Gemini CLI, and any AI workflow.",
  keywords:
    "sales API, MCP server, Model Context Protocol, Claude, Cursor, AI sales tools, CRM API, sales automation API",
  openGraph: {
    title: "Findsday — Sales APIs & MCP Servers for AI Tinkerers",
    description:
      "Find the APIs, SDKs, and MCP servers that plug your sales stack into Claude, Cursor, and any AI workflow.",
    type: "website",
    url: "https://findsday.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Findsday — Sales APIs & MCP Servers for AI Tinkerers",
    description:
      "Find the APIs, SDKs, and MCP servers that plug your sales stack into Claude, Cursor, and any AI workflow.",
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
    <html lang="en" className={`${playfair.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
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
      <body className="font-sans bg-banknote-black text-paper-white antialiased selection:bg-terminal-green selection:text-black">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link href="/" className="font-heading text-2xl font-black italic tracking-tighter text-paper-white">
              FINDSDAY<span className="text-terminal-green text-sm not-italic ml-1">.SYS</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 transition-colors hover:text-terminal-green"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile nav */}
            <MobileNav links={navLinks} />
          </div>
        </header>

        {children}

        <footer className="border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
            <div className="space-y-6">
              <span className="font-heading text-3xl font-black italic tracking-tighter">FINDSDAY</span>
              <p className="max-w-xs font-mono text-xs uppercase leading-relaxed text-gray-500">
                A digital ledger of high-intent sales APIs and model context protocol (MCP) servers. 
                Optimized for AI-native operators and autonomous agents.
              </p>
              <div className="font-mono text-[10px] uppercase text-gray-600">
                EST. 2026 // BUILD: 0.1.0-BETA
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 font-mono text-xs uppercase tracking-widest">
              <div className="space-y-4">
                <h4 className="font-black text-gray-400">Directory</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/tools" className="transition-colors hover:text-terminal-green">
                      All Tools
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories" className="transition-colors hover:text-terminal-green">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/mcp" className="transition-colors hover:text-terminal-green">
                      MCP Servers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-black text-gray-400">Contribution</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/submit" className="transition-colors hover:text-terminal-green">
                      Submit Tool
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="transition-colors hover:text-terminal-green">
                      About Project
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="transition-colors hover:text-terminal-green">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-start space-y-6 md:items-end">
              <div className="border border-terminal-green px-4 py-2 font-mono text-[10px] font-black uppercase text-terminal-green">
                SYSTEM STATUS: OPTIMAL
              </div>
              <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-gray-500">
                <a href="https://twitter.com/findsday" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-terminal-green">
                  X_TWITTER
                </a>
                <a href="https://github.com/findsday" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-terminal-green">
                  GITHUB_DEV
                </a>
              </div>
              <p className="text-[10px] uppercase tracking-tighter text-gray-700">© Findsday Registry. No rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
