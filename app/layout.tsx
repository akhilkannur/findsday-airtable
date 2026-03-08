import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { GeistMono } from 'geist/font/mono'
import "./globals.css"
import Link from "next/link"
import Image from "next/image"
import { MobileNav } from "@/components/MobileNav"
import { Shield, Zap } from "lucide-react"
import { getAllTools, getToolsWithoutDocs } from "@/lib/tools"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://salestools.club"),
  title: "Salestools Club — Every Sales API & MCP Server in one place.",
  description:
    "A curated directory of sales APIs, MCP servers, and agent skills. Find tools to connect your sales stack to Claude Code, Gemini CLI, and agentic workflows.",
  keywords:
    "sales API directory, MCP server sales, Model Context Protocol, Claude Code, Gemini CLI, AI sales tools, CRM API, sales automation API, build AI sales agent, agentic sales stack, sales tools for AI agents",
  openGraph: {
    title: "Salestools Club — Sales APIs & MCP Servers for AI Tinkerers",
    description:
      "The sales API directory for builders. Find MCP servers, CRM APIs, and agentic tools for Claude Code, Gemini CLI, and autonomous sales workflows.",
    type: "website",
    url: "https://salestools.club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salestools Club — Sales APIs & MCP Servers for AI Tinkerers",
    description:
      "Find the APIs, SDKs, and MCP servers that plug your sales stack into Claude Code, Gemini CLI, and other agentic tools.",
  },
}

const navLinks = [
  { href: "/api", label: "APIs" },
  { href: "/mcp", label: "MCP Servers" },
  { href: "/skills", label: "Skills" },
  { href: "/stacks", label: "Stacks" },
  { href: "/categories", label: "Categories" },
  { href: "/open-source", label: "Open Source" },
  { href: "/submit", label: "Submit" },
]

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const allTools = await getAllTools()
  const toolsWithDocs = allTools.filter(t => t.docsUrl && t.docsUrl !== "").length
  const toolsWithoutDocs = (await getToolsWithoutDocs()).length
  
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
      "target": "https://salestools.club/api?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

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
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1613021629640914');
fbq('track', 'PageView');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Meta Pixel Noscript */}
        <noscript>
          <img height="1" width="1" style={{display: 'none'}} 
            src="https://www.facebook.com/tr?id=1613021629640914&ev=PageView&noscript=1" 
          />
        </noscript>
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
        
        <footer className="border-t border-ink p-12 mt-20">
          <div className="layout-container text-center flex flex-col items-center gap-10">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-mono text-[0.7rem] uppercase tracking-widest border-b border-ink/10 pb-8 w-full max-w-2xl opacity-80">
              <Link href="/guides" className="hover:line-through">Guides</Link>
              <Link href="/for" className="hover:line-through">Use Cases</Link>
              <Link href="/monitoring" className="hover:line-through">Monitoring</Link>
              <Link href="/about" className="hover:line-through">About</Link>
              <Link href="/privacy" className="hover:line-through">Privacy</Link>
              <Link href="/submit" className="hover:line-through">Submit Tool</Link>
            </div>

            <div className="flex items-center gap-4 font-mono text-[0.85rem] uppercase tracking-widest flex-wrap justify-center py-6 px-10 border-2 border-ink bg-paper shadow-[8px_8px_0px_rgba(26,25,23,0.1)] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px]">
              <span className="opacity-60 text-[0.7rem]">Built by</span>
              <a href="https://akhilhaving.fun" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                <Image 
                  src="/dp.jpg" 
                  alt="Akhil" 
                  width={32}
                  height={32}
                  className="rounded-full grayscale border-2 border-ink/40 group-hover:grayscale-0 transition-all"
                />
                <span className="font-black border-b-2 border-ink pb-0.5">Akhil</span>
              </a>
              <span className="opacity-60 text-[0.7rem]">with</span>
              <a href="http://realaiexamples.com/" target="_blank" rel="noopener noreferrer" className="font-black border-b-2 border-ink pb-0.5 hover:opacity-80 transition-opacity">
                realaiexamples.com
              </a>
            </div>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] opacity-75 flex flex-col gap-2">
              <p>Found: {toolsWithDocs} APIs with docs • Monitoring {toolsWithoutDocs} for documentation</p>
              <p>© {new Date().getFullYear()} Salestools Club</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
