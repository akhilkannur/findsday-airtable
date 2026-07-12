import type { Metadata } from "next"
import { Inter, Playfair_Display, Crimson_Pro, JetBrains_Mono } from "next/font/google"
import { GeistMono } from 'geist/font/mono'
import "./globals.css"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
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

const crimson = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://salestools.club"),
  title: "Salestools Club — Every Sales API & MCP Server in one place.",
  description:
    "A curated directory of sales APIs, MCP servers, and agent skills. Find tools to connect your sales stack to Claude Code or other agentic platforms.",
  keywords:
    "sales API directory, MCP server sales, Model Context Protocol, Claude Code, agentic tools, AI sales tools, CRM API, sales automation API, build AI sales agent, agentic sales stack, sales tools for AI agents",
  openGraph: {
    title: "Salestools Club — Sales APIs & MCP Servers for AI Tinkerers",
    description:
      "The sales API directory for builders. Find MCP servers, CRM APIs, and agentic tools for Claude Code and other agentic platforms.",
    type: "website",
    url: "https://salestools.club",
    images: [
      {
        url: "https://salestools.club/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Salestools Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salestools Club — Sales APIs & MCP Servers for AI Tinkerers",
    description:
      "Find the APIs, SDKs, and MCP servers that plug your sales stack into Claude Code and other agent-native platforms.",
    images: ["https://salestools.club/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

const navLinks = [
  { href: "/api", label: "APIs" },
  { href: "/mcp", label: "MCP Servers" },
  { href: "/skills", label: "Skills" },
  { href: "/claude-plugins", label: "Claude Plugins" },

  { href: "/open-source-sales-tools", label: "Open Source" },
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
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${crimson.variable} ${jetbrains.variable} ${GeistMono.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9LGNFH00R7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9LGNFH00R7');
          `}
        </Script>
        {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1613021629640914');
            fbq('track', 'PageView');
          `}
        </Script>
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
        <nav className="sticky top-0 z-[100] border-b border-ink/10 bg-paper/90 py-4 backdrop-blur-md">
          <div className="layout-container flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/logo.png" 
                alt="Salestools Club Logo" 
                width={32} 
                height={32} 
                className="group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-300"
              />
              <span className="font-mono text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-ink">
                SALESTOOLS.CLUB
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-fade transition-colors hover:bg-ink/[0.04] hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a 
                href="mailto:akhil@salestools.club" 
                className="hidden lg:inline-flex rounded-md border border-ink/10 bg-white px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-fade transition-colors hover:text-ink"
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
        
        <footer className="mt-12 border-t border-ink/10 bg-white/65 p-8 md:mt-20 md:p-12">
          <div className="layout-container">
            {/* Programmatic Directory Columns */}
            <div className="mb-12 grid grid-cols-1 gap-8 border-b border-ink/10 pb-12 text-left sm:grid-cols-2 md:mb-16 md:gap-12 md:pb-16 md:grid-cols-4">
              <div className="flex flex-col gap-4">
                <h4 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/50">Outcomes</h4>
                <div className="flex flex-col gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em]">
                  <Link href="/categories/sales-intelligence" className="transition-colors hover:text-ink">Lead Enrichment</Link>
                  <Link href="/categories/sales-engagement" className="transition-colors hover:text-ink">Outreach Automation</Link>
                  <Link href="/categories/phone-and-dialers" className="transition-colors hover:text-ink">AI Voice Agents</Link>
                  <Link href="/categories/revenue-intelligence" className="transition-colors hover:text-ink">Meeting Recording</Link>
                  <Link href="/credit-audit" className="font-semibold transition-colors hover:text-ink">Credit Policy Guide</Link>
                  <Link href="/free-sales-apis" className="font-semibold text-ink transition-colors hover:text-ink">Free Sales APIs</Link>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/50">Alternatives</h4>
                <div className="flex flex-col gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em]">
                  <Link href="/alternative-to/hubspot" className="transition-colors hover:text-ink">HubSpot</Link>
                  <Link href="/alternative-to/salesforce" className="transition-colors hover:text-ink">Salesforce</Link>
                  <Link href="/alternative-to/apollo" className="transition-colors hover:text-ink">Apollo</Link>
                  <Link href="/alternative-to/zoominfo" className="transition-colors hover:text-ink">ZoomInfo</Link>
                  <Link href="/alternative-to/clearbit" className="transition-colors hover:text-ink">Clearbit</Link>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/50">Auth Types</h4>
                <div className="flex flex-col gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em]">
                  <Link href="/auth/api-key" className="transition-colors hover:text-ink">API Key</Link>
                  <Link href="/auth/oauth2" className="transition-colors hover:text-ink">OAuth2</Link>
                  <Link href="/auth/bearer-token" className="transition-colors hover:text-ink">Bearer Token</Link>
                  <Link href="/auth/basic-auth" className="transition-colors hover:text-ink">Basic Auth</Link>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/50">Developer SDKs</h4>
                <div className="flex flex-col gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em]">
                  <Link href="/sdk/python" className="transition-colors hover:text-ink">Python</Link>
                  <Link href="/sdk/node.js" className="transition-colors hover:text-ink">Node.js</Link>
                  <Link href="/sdk/ruby" className="transition-colors hover:text-ink">Ruby</Link>
                  <Link href="/sdk/php" className="transition-colors hover:text-ink">PHP</Link>
                  <Link href="/sdk/go" className="transition-colors hover:text-ink">Go</Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-10 text-center">
              <div className="flex w-full max-w-2xl flex-wrap justify-center gap-x-8 gap-y-4 border-b border-ink/10 pb-8 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/75">
                <Link href="/categories" className="transition-colors hover:text-ink">Categories</Link>
                <Link href="/guides" className="transition-colors hover:text-ink">Guides</Link>
                <Link href="/for" className="transition-colors hover:text-ink">Use Cases</Link>
                <Link href="/monitoring" className="transition-colors hover:text-ink">Monitoring</Link>
                <Link href="/about" className="transition-colors hover:text-ink">About</Link>
                <Link href="/privacy" className="transition-colors hover:text-ink">Privacy</Link>
                <Link href="/rss.xml" className="transition-colors hover:text-ink">RSS Feed</Link>
                <Link href="/submit" className="transition-colors hover:text-ink">Submit Tool</Link>
              </div>

              <div className="panel flex flex-wrap items-center justify-center gap-4 px-6 py-5 font-mono text-[0.78rem] uppercase tracking-[0.16em]">
                <span className="opacity-60 text-[0.7rem]">Built by</span>
                <a href="https://akhilneeds.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                  <Image 
                    src="/dp.jpg" 
                    alt="Akhil" 
                    width={32}
                    height={32}
                    className="rounded-full border border-ink/10 grayscale transition-all group-hover:grayscale-0"
                  />
                  <span className="font-semibold">Akhil</span>
                </a>
              </div>
              <div className="flex flex-col gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink/60">
                <p>Found: {toolsWithDocs} APIs with docs • Monitoring {toolsWithoutDocs} for documentation</p>
                <p>© {new Date().getFullYear()} Salestools Club • <a href="https://logo.dev" target="_blank" rel="noopener">Logos provided by Logo.dev</a></p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
