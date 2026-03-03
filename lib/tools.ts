import { tools, categories } from "./data"
import type { SalesTool, ToolCategory, CategoryMeta } from "./types"

// In "Terminal-First" mode, I use the local data.ts as the source of truth.
// We keep the functions async so the UI doesn't need to change, and it allows
// for easy switching back to a live API if needed later.

export async function getAllTools(): Promise<SalesTool[]> {
  return tools.filter((t) => t.docsUrl && t.docsUrl !== "")
}

export async function getFeaturedTools(): Promise<SalesTool[]> {
  return tools.filter((t) => t.isFeatured && t.docsUrl && t.docsUrl !== "")
}

export async function getToolBySlug(slug: string): Promise<SalesTool | undefined> {
  return tools.find((t) => t.slug === slug)
}

export async function getToolsByCategory(category: ToolCategory): Promise<SalesTool[]> {
  return tools.filter((t) => t.docsUrl && t.docsUrl !== "" && t.category === category)
}

export async function getMcpTools(): Promise<SalesTool[]> {
  return tools.filter((t) => t.docsUrl && t.docsUrl !== "" && t.mcpReady)
}

export async function getToolsWithIntegrations(): Promise<SalesTool[]> {
  return tools.filter((t) => t.docsUrl && t.docsUrl !== "" && t.integrations && t.integrations.length > 0)
}

export function getAllCategories(): CategoryMeta[] {
  return categories
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug)
}

export async function getAllSlugs(): Promise<string[]> {
  return tools.map((t) => t.slug)
}

export async function searchTools(query: string): Promise<SalesTool[]> {
  const q = query.toLowerCase()
  return tools.filter(
    (t) =>
      t.docsUrl &&
      t.docsUrl !== "" &&
      (t.name.toLowerCase().includes(q) ||
        t.oneLiner.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.alternativeTo?.some((a) => a.toLowerCase().includes(q)))
  )
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug)
}

export async function getToolsForComparison(slugs: string): Promise<{ tool1: SalesTool | undefined; tool2: SalesTool | undefined }> {
  const [s1, s2] = slugs.split("-vs-")
  return {
    tool1: await getToolBySlug(s1),
    tool2: await getToolBySlug(s2),
  }
}

export async function getOpenSourceTools(): Promise<SalesTool[]> {
  return tools.filter((t) => t.docsUrl && t.docsUrl !== "" && t.githubUrl)
}

export async function getToolsWithoutDocs(): Promise<SalesTool[]> {
  return tools.filter((t) => !t.docsUrl || t.docsUrl === "")
}

export async function filterTools(options: {
  query?: string
  category?: string
  mcpOnly?: boolean
  freeOnly?: boolean
  officialOnly?: boolean
}): Promise<SalesTool[]> {
  let filtered = tools.filter((t) => t.docsUrl && t.docsUrl !== "")

  if (options.category && options.category !== "All") {
    filtered = filtered.filter((t) => t.category === options.category)
  }

  if (options.mcpOnly) {
    filtered = filtered.filter((t) => t.mcpReady)
  }

  if (options.freeOnly) {
    filtered = filtered.filter((t) => t.hasFreeTier)
  }

  if (options.officialOnly) {
    filtered = filtered.filter((t) =>
      t.integrations.some((i) => i.label?.toLowerCase().includes("official"))
    )
  }

  if (options.query) {
    const q = options.query.toLowerCase()
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.oneLiner.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.alternativeTo?.some((a) => a.toLowerCase().includes(q))
    )
  }

  return filtered
}
