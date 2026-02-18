import { NextResponse } from "next/server"
import { getToolBySlug } from "@/lib/tools"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers })
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404, headers })
  }

  return NextResponse.json(tool, { headers })
}
