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
      <body className="font-sans bg-club-dark text-paper-white antialiased selection:bg-club-teal/30">
        <header className="sticky top-0 z-50 border-b border-white/5 bg-club-dark/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
              Salestools Club
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-10 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] font-medium text-gray-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden items-center gap-4 md:flex">
              <Link href="/submit" className="text-[14px] font-bold text-white hover:opacity-80 transition-opacity">
                Submit a tool
              </Link>
              <Link href="/tools" className="bg-white text-black px-5 py-2 rounded-full text-[14px] font-bold hover:bg-white/90 transition-colors">
                Get started
              </Link>
            </div>

            {/* Mobile nav */}
            <MobileNav links={navLinks} />
          </div>
        </header>

        {children}

        <footer className="border-t border-white/5 bg-club-dark px-6 py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <Link href="/" className="text-xl font-bold tracking-tight">Salestools Club</Link>
              <p className="max-w-xs text-sm leading-relaxed text-gray-400">
                A modern directory of sales APIs and MCP servers built for the new era of AI-native operators.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Directory</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-400">
                <li><Link href="/tools" className="hover:text-white transition-colors">All Tools</Link></li>
                <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="/mcp" className="hover:text-white transition-colors">MCP Servers</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-400">
                <li><Link href="/submit" className="hover:text-white transition-colors">Submit Tool</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Project</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Status</h4>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                Version 1.0.0-Stable<br />
                © {new Date().getFullYear()} Salestools Club
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
