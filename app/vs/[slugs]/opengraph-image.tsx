import { ImageResponse } from "next/og"
import { getToolsForComparison } from "@/lib/tools"

export const runtime = "edge"
export const alt = "Comparison preview"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: { slugs: string } }) {
  const { tool1, tool2 } = await getToolsForComparison(params.slugs)

  if (!tool1 || !tool2) {
    return new ImageResponse(
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f5f0e8", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 48 }}>Comparison Not Found</span>
      </div>,
      { ...size }
    )
  }

  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#f5f0e8", padding: 80, justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 60, flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 100, height: 100, background: "#1a1917", color: "#f5f0e8", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: 700 }}>
            {tool1.name.charAt(0)}
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, textTransform: "uppercase", letterSpacing: -1 }}>
            {tool1.name}
          </div>
        </div>
        <div style={{ fontSize: 48, fontWeight: 900, fontStyle: "italic", color: "#1a191766" }}>
          VS
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 100, height: 100, background: "#1a1917", color: "#f5f0e8", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: 700 }}>
            {tool2.name.charAt(0)}
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, textTransform: "uppercase", letterSpacing: -1 }}>
            {tool2.name}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ fontSize: 20, color: "#1a1917aa", textTransform: "uppercase", letterSpacing: 2 }}>
          Side-by-Side API Comparison
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
          SALESTOOLS.CLUB
        </div>
      </div>
    </div>,
    { ...size }
  )
}
