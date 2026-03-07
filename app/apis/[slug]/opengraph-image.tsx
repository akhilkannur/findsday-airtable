import { ImageResponse } from "next/og"
import { getToolBySlug } from "@/lib/tools"

export const runtime = "edge"
export const alt = "Tool preview"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: { slug: string } }) {
  const tool = await getToolBySlug(params.slug)

  if (!tool) {
    return new ImageResponse(
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f5f0e8", alignItems: "center", justifyContent: "center", fontFamily: "serif" }}>
        <span style={{ fontSize: 48 }}>Tool Not Found</span>
      </div>,
      { ...size }
    )
  }

  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#f5f0e8", padding: 80, justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", width: 80, height: 80, background: "#1a1917", color: "#f5f0e8", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 700 }}>
            {tool.name.charAt(0)}
          </div>
          {tool.mcpReady && (
            <div style={{ display: "flex", fontSize: 16, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", border: "2px solid #1a1917", padding: "6px 16px" }}>
              MCP READY
            </div>
          )}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2, textTransform: "uppercase", lineHeight: 1.1 }}>
          {tool.name}
        </div>
        <div style={{ fontSize: 28, color: "#1a1917aa", fontStyle: "italic", lineHeight: 1.4, maxWidth: 800 }}>
          {tool.oneLiner}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ display: "flex", gap: 24, fontSize: 18, textTransform: "uppercase", letterSpacing: 2, color: "#1a1917aa" }}>
          <span>{tool.category}</span>
          <span>•</span>
          <span>{tool.hasFreeTier ? "Free Tier" : "Paid"}</span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
          SALESTOOLS.CLUB
        </div>
      </div>
    </div>,
    { ...size }
  )
}
