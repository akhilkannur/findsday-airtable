import type { Metadata } from "next"
import { permanentRedirect } from "next/navigation"
import { getClaudePlugins, getToolBySlug } from "@/lib/tools"
import ToolDetailPage from "@/app/apis/[slug]/page"

export async function generateStaticParams() {
  const plugins = await getClaudePlugins()
  return plugins.map((plugin) => ({ slug: plugin.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const plugin = await getToolBySlug(slug)

  if (!plugin || plugin.category !== "Claude Plugins") {
    return { title: "Claude Plugin Not Found | Salestools Club", robots: { index: false, follow: true } }
  }

  const pageUrl = `https://salestools.club/claude-plugins/${plugin.slug}`
  const title = `${plugin.name} — Claude Code Plugin | Salestools Club`
  const description = `${plugin.oneLiner} See capabilities, setup resources, and a ready-to-copy starter prompt.`

  return {
    title,
    description,
    keywords: [plugin.name, "Claude plugins", "Claude Code plugins", "Claude sales plugin"],
    alternates: { canonical: pageUrl },
    openGraph: { title, description, type: "website", url: pageUrl, images: [`${pageUrl}/opengraph-image`] },
    twitter: { card: "summary_large_image", title, description, images: [`${pageUrl}/opengraph-image`] },
  }
}

export default async function ClaudePluginDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const plugin = await getToolBySlug(slug)

  if (!plugin || plugin.category !== "Claude Plugins") {
    permanentRedirect(plugin ? `/apis/${plugin.slug}` : "/claude-plugins")
  }

  return ToolDetailPage({ params })
}
