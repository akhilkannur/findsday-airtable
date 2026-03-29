import { getAllTools } from "@/lib/tools"

export async function GET() {
  const tools = await getAllTools()
  const baseUrl = "https://salestools.club"

  // Take the 50 most recently added tools for the RSS feed
  const recentTools = tools.slice(0, 50)

  const itemsXml = recentTools
    .map((tool) => {
      const url = `${baseUrl}/apis/${tool.slug}`
      const title = `${tool.name} - ${tool.oneLiner}`
      const description = tool.description || tool.oneLiner
      const date = tool.addedAt ? new Date(tool.addedAt).toUTCString() : new Date().toUTCString()

      return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${date}</pubDate>
      <description><![CDATA[${description}]]></description>
      <category><![CDATA[${tool.category}]]></category>
    </item>`
    })
    .join("")

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Salestools Club - Latest Sales APIs &amp; MCP Servers</title>
    <link>${baseUrl}</link>
    <description>The latest sales APIs, MCP servers, and agentic tools for Claude Code and AI builders.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
    },
  })
}
