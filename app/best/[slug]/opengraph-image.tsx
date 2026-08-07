import { ImageResponse } from "next/og"
import { getBestHubBySlug } from "@/lib/best"
import { getRankedToolsForHub } from "@/lib/best"

export const runtime = "edge"
export const alt = "Best-of guide preview"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: { slug: string } }) {
  const hub = getBestHubBySlug(params.slug)

  if (!hub) {
    return new ImageResponse(
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f5f0e8", alignItems: "center", justifyContent: "center", fontFamily: "serif" }}>
        <span style={{ fontSize: 48 }}>Guide Not Found</span>
      </div>,
      { ...size }
    )
  }

  const tools = await getRankedToolsForHub(hub)

  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#1a1917", padding: 80, justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", width: 16, height: 16, background: "#f5f0e8", borderRadius: 999 }} />
        <div style={{ fontSize: 18, color: "#f5f0e8", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
          Salestools Club · Best of
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, color: "#f5f0e8", textTransform: "uppercase", maxWidth: 900 }}>
          {hub.keyword}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 24, color: "#f5f0e8", fontWeight: 700 }}>{tools.length} tools</div>
          <div style={{ width: 8, height: 8, background: "#f5f0e855", borderRadius: 999 }} />
          <div style={{ fontSize: 24, color: "#f5f0e8", fontWeight: 700 }}>{hub.capabilities.length} capabilities</div>
          <div style={{ width: 8, height: 8, background: "#f5f0e855", borderRadius: 999 }} />
          <div style={{ fontSize: 24, color: "#f5f0e8", fontWeight: 700 }}>Verified fresh</div>
        </div>
      </div>
    </div>,
    { ...size }
  )
}