import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { getToolBySlug } from "@/lib/tools"

export const runtime = "edge"

const LOGO_DEV_TOKEN = "pk_cI8SBpmJQJG67HoLPuFNgw"

function text(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : fallback
}

function getDomain(url?: string) {
  if (!url) return ""
  try {
    const hostname = new URL(url).hostname
    return hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")
  
  if (!slug) {
    return new Response("Missing ?slug= param", { status: 400 })
  }

  const tool = await getToolBySlug(slug)

  if (!tool) {
    return new Response("Tool not found", { status: 404 })
  }

  const title = text(tool.name, "Untitled")
  const domain = getDomain(tool.websiteUrl)
  const variant = request.nextUrl.searchParams.get("variant")
  
  // High-Energy "Day Party" Palette (Default)
  let partyBg = "linear-gradient(135deg, #FF1F8E 0%, #FF8A00 100%)"
  let typeColor = "#111111"
  let accentColor = "#FFD600"
  let badgeBg = "#FFD600"

  // Xerox Variant - Sophisticated Print Style
  if (variant === "xerox") {
    partyBg = "#F9F9F7" // Bone White
    typeColor = "#1A1A1A" // Carbon Black
    accentColor = "#FF4500" // International Orange
    badgeBg = "#FF4500"
  }

  const logoUrl = domain 
    ? `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=400&format=png`
    : null

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: partyBg,
          color: typeColor,
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Playful Background Patterns - Checkerboard */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: variant === "xerox" ? 0.04 : 0.08, // Extra subtle for Xerox
            backgroundImage: `linear-gradient(45deg, ${typeColor} 25%, transparent 25%), linear-gradient(-45deg, ${typeColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${typeColor} 75%), linear-gradient(-45deg, transparent 75%, ${typeColor} 75%)`,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
          }}
        />

        {/* Massive Background Typography */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            width: "120%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: "rotate(-4deg)",
          }}
        >
          <div
            style={{
              fontSize: title.length > 10 ? "240px" : "320px",
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 0.7,
              textTransform: "uppercase",
              letterSpacing: "-15px",
              color: typeColor,
              opacity: variant === "xerox" ? 0.2 : 0.35, // More subtle headline
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        {/* Character Body - Outline Style */}
        <div
          style={{
            position: "absolute",
            bottom: -30,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            width: "900px",
            height: "550px",
          }}
        >
          <svg width="900" height="550" viewBox="0 0 900 550" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M100 550 C120 400 200 220 450 220 C700 220 780 400 800 550 Z" 
              fill="none" 
              stroke={typeColor} 
              strokeWidth="12"
            />
            <path d="M420 220 L420 320 M480 220 L480 320" stroke={typeColor} strokeWidth="8" strokeLinecap="round" opacity="0.6"/>
          </svg>
        </div>

        {/* Pop-Art "Helmet" (Logo Sticker) */}
        <div
          style={{
            position: "absolute",
            bottom: "340px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "360px",
            height: "360px",
            backgroundColor: "#fff",
            borderRadius: "40px",
            border: `12px solid ${typeColor}`,
            boxShadow: `20px 20px 0px rgba(0,0,0,0.3)`,
            overflow: "hidden",
            transform: "rotate(2deg)",
          }}
        >
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={title}
              style={{
                width: "70%",
                height: "70%",
                objectFit: "contain",
              }}
            />
          ) : (
            <div style={{ fontSize: "160px", fontWeight: 900, color: typeColor, display: "flex" }}>
              {title.charAt(0)}
            </div>
          )}
        </div>

        {/* Added to salestools.club Badge */}
        <div
          style={{
            position: "absolute",
            bottom: "140px",
            padding: "20px 50px",
            backgroundColor: badgeBg,
            color: typeColor,
            fontSize: "38px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "2px",
            borderRadius: "100px",
            border: `8px solid ${typeColor}`,
            boxShadow: `12px 12px 0px ${typeColor}`,
            display: "flex",
            transform: "rotate(-5deg)",
          }}
        >
          ADDED TO SALESTOOLS.CLUB
        </div>

      </div>
    ),
    { width: 1080, height: 1080 }
  )
}
