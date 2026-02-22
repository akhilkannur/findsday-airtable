import { getSkillBySlug } from "@/lib/skills"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const skill = getSkillBySlug(slug)

  if (!skill) {
    return NextResponse.json({ error: "Skill not found" }, { status: 404 })
  }

  // Return the data the CLI needs to "install" the skill
  return NextResponse.json({
    slug: skill.slug,
    name: skill.name,
    instructions: skill.promptContent,
    author: skill.source,
    requirements: skill.worksWithTools,
  })
}
