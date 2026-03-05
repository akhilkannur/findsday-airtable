import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return []
}

export function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  return Promise.resolve({
    title: "Sales APIs | Salestools Club",
    description:
      "A comprehensive database of sales APIs and tools for people building with Claude Code and Gemini CLI.",
    alternates: {
      canonical: "https://salestools.club/api",
    },
    openGraph: {
      title: "Sales APIs | Salestools Club",
      description: "A comprehensive database of sales APIs and tools for people building with Claude Code and Gemini CLI.",
      type: "website",
      url: "https://salestools.club/api",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sales APIs | Salestools Club",
      description: "A comprehensive database of sales APIs and tools for people building with Claude Code and Gemini CLI.",
    },
  })
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; mcp?: string; free?: string; official?: string; view?: string }>
}) {
  const sp = await searchParams
  const queryString = new URLSearchParams()
  if (sp.q) queryString.set("q", sp.q as string)
  if (sp.category) queryString.set("category", sp.category as string)
  if (sp.mcp) queryString.set("mcp", sp.mcp as string)
  if (sp.free) queryString.set("free", sp.free as string)
  if (sp.official) queryString.set("official", sp.official as string)
  if (sp.view) queryString.set("view", sp.view as string)
  
  const destination = queryString.toString() ? `/api?${queryString.toString()}` : "/api"
  redirect(destination)
}
