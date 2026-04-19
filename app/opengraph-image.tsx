import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Salestools Club - Every Sales API & MCP Server in one place."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#f5f0e8",
          padding: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 160,
              height: 160,
              background: "#1a1917",
              color: "#f5f0e8",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 80,
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -2,
              textTransform: "uppercase",
              lineHeight: 1.1,
              textAlign: "center",
              color: "#1a1917",
            }}
          >
            Salestools Club
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#1a1917aa",
              fontStyle: "italic",
              lineHeight: 1.4,
              maxWidth: 900,
              textAlign: "center",
            }}
          >
            Every Sales API & MCP Server in one place.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            display: "flex",
            gap: 24,
            fontSize: 20,
            textTransform: "uppercase",
            letterSpacing: 4,
            color: "#1a191788",
            fontWeight: 700,
          }}
        >
          SALESTOOLS.CLUB
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
