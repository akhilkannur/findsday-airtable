import { tools, categories } from "./data"
import type { SalesTool, ToolCategory, CategoryMeta } from "./types"

export function getAllTools(): SalesTool[] {
  return tools
}

export function getFeaturedTools(): SalesTool[] {
  return tools.filter((t) => t.isFeatured)
}

export function getToolBySlug(slug: string): SalesTool | undefined {
  return tools.find((t) => t.slug === slug)
}

export function getToolsByCategory(category: ToolCategory): SalesTool[] {
  return tools.filter((t) => t.category === category)
}

export function getMcpTools(): SalesTool[] {
  return tools.filter((t) => t.integrations.some((i) => i.platform === "MCP"))
}

export function getToolsWithIntegrations(): SalesTool[] {
  return tools.filter((t) => t.integrations.length > 0)
}

export function getAllCategories(): CategoryMeta[] {
  return categories
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getAllSlugs(): string[] {
  return tools.map((t) => t.slug)
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug)
}

export function getToolsForComparison(slugs: string): { tool1: SalesTool | undefined; tool2: SalesTool | undefined } {
  const [s1, s2] = slugs.split("-vs-")
  return {
    tool1: getToolBySlug(s1),
    tool2: getToolBySlug(s2),
  }
}

export function searchTools(query: string): SalesTool[] {
  const q = query.toLowerCase()
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.oneLiner.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.alternativeTo?.some((a) => a.toLowerCase().includes(q))
  )
}

export function filterTools(options: {
  query?: string
  category?: string
  mcpOnly?: boolean
  freeOnly?: boolean
}): SalesTool[] {
  let filtered = tools

  if (options.category && options.category !== "All") {
    filtered = filtered.filter((t) => t.category === options.category)
  }

  if (options.mcpOnly) {
    filtered = filtered.filter((t) => t.mcpReady)
  }

  if (options.freeOnly) {
    filtered = filtered.filter((t) => t.hasFreeTier)
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
