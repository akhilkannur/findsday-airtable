import { NextRequest, NextResponse } from "next/server"
import {
  getAllTools,
  getMcpTools,
  getToolsByCategory,
  getToolsWithIntegrations,
  searchTools,
} from "@/lib/tools"
import type { ToolCategory } from "@/lib/types"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers })
}

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const q = searchParams.get("q")
  const category = searchParams.get("category")
  const mcp = searchParams.get("mcp")
  const integrations = searchParams.get("integrations")
  const featured = searchParams.get("featured")
  const free = searchParams.get("free")

  let tools

  if (q) {
    tools = searchTools(q)
  } else if (category) {
    tools = getToolsByCategory(category as ToolCategory)
  } else if (mcp === "true") {
    tools = getMcpTools()
  } else if (integrations === "true") {
    tools = getToolsWithIntegrations()
  } else if (featured === "true") {
    tools = getAllTools().filter((t) => t.isFeatured)
  } else if (free === "true") {
    tools = getAllTools().filter((t) => t.hasFreeTier)
  } else {
    tools = getAllTools()
  }

  return NextResponse.json({ count: tools.length, tools }, { headers })
}
