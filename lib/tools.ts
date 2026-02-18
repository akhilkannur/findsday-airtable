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
