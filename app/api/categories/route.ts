import { NextResponse } from "next/server"
import { getAllCategories } from "@/lib/tools"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers })
}

export function GET() {
  const categories = getAllCategories()
  return NextResponse.json({ count: categories.length, categories }, { headers })
}
