import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { MobileNav } from "@/components/MobileNav"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#0a0a0a] text-white antialiased`}>
        <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-bold tracking-widest text-white">
              FINDSDAY
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
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

        <footer className="border-t border-gray-800 bg-charcoal-dark px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <span className="text-xl font-bold tracking-widest">FINDSDAY</span>
              <p className="text-sm text-gray-400">
                The directory of sales APIs and MCP servers for AI tinkerers.
              </p>
              <p className="text-xs text-gray-500">© {new Date().getFullYear()} Findsday. All rights reserved.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <ul className="space-y-2">
                <li>
                  <Link href="/tools" className="transition-colors hover:text-accent-green">
                    All Tools
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="transition-colors hover:text-accent-green">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/mcp" className="transition-colors hover:text-accent-green">
                    MCP Servers
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <Link href="/submit" className="transition-colors hover:text-accent-green">
                    Submit a Tool
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="transition-colors hover:text-accent-green">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-accent-green">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start space-y-4 md:items-end">
              <p className="text-sm text-gray-400">Built for AI tinkerers 🛠️</p>
              <div className="flex gap-4 text-sm text-gray-400">
                <a href="https://twitter.com/findsday" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent-green">
                  X/Twitter
                </a>
                <a href="https://github.com/findsday" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent-green">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
