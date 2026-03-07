import { ImageResponse } from "next/og"
import { getCategoryBySlug, getToolsByCategory } from "@/lib/tools"

export const runtime = "edge"
export const alt = "Category preview"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    return new ImageResponse(
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f5f0e8", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 48 }}>Category Not Found</span>
      </div>,
      { ...size }
    )
  }

  const tools = await getToolsByCategory(category.name)

  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#f5f0e8", padding: 80, justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 20, textTransform: "uppercase", letterSpacing: 4, color: "#1a1917aa" }}>
          Category
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, textTransform: "uppercase", letterSpacing: -2, lineHeight: 1.1 }}>
          {category.name}
        </div>
        <div style={{ fontSize: 28, color: "#1a1917aa", fontStyle: "italic", lineHeight: 1.4, maxWidth: 800 }}>
          {category.description}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ fontSize: 22, textTransform: "uppercase", letterSpacing: 2, color: "#1a1917aa" }}>
          {tools.length} APIs & Tools
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
          SALESTOOLS.CLUB
        </div>
      </div>
    </div>,
    { ...size }
  )
}
