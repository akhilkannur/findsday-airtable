import { tools as fallbackTools, categories as fallbackCategories } from "./data"
import type { SalesTool, ToolCategory, CategoryMeta } from "./types"

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1lISM0kMrJJSCs-e8nqBZKkKeNExtoXu5KD-mI4GvZN0/export?format=csv";

async function fetchSheetData(): Promise<SalesTool[]> {
  try {
    const response = await fetch(SHEET_URL, { next: { revalidate: 60 } }); // Cache for 1 minute
    if (!response.ok) throw new Error("Failed to fetch sheet");
    const csvText = await response.text();
    
    const lines = csvText.split("\n").filter(line => line.trim());
    if (lines.length < 2) return fallbackTools;

    const headers = lines[0].split(",").map(h => h.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(",");
      const tool: any = {};
      headers.forEach((header, i) => {
        let val: any = values[i]?.trim();
        
        if (val?.startsWith('"') && val?.endsWith('"')) {
          val = val.substring(1, val.length - 1);
        }

        if (val === "true") val = true;
        else if (val === "false") val = false;
        else if (val?.startsWith("[") && val?.endsWith("]")) {
          try { val = JSON.parse(val.replace(/'/g, '"')); } catch(e) { val = []; }
        }
        
        tool[header] = val;
      });
      return tool as SalesTool;
    });
  } catch (error) {
    console.error("Error fetching sheet data, using fallback:", error);
    return fallbackTools;
  }
}

export async function getAllTools(): Promise<SalesTool[]> {
  return await fetchSheetData()
}

export async function getFeaturedTools(): Promise<SalesTool[]> {
  const tools = await fetchSheetData()
  return tools.filter((t) => t.isFeatured)
}

export async function getToolBySlug(slug: string): Promise<SalesTool | undefined> {
  const tools = await fetchSheetData()
  return tools.find((t) => t.slug === slug)
}

export async function getToolsByCategory(category: ToolCategory): Promise<SalesTool[]> {
  const tools = await fetchSheetData()
  return tools.filter((t) => t.category === category)
}

export async function getMcpTools(): Promise<SalesTool[]> {
  const tools = await fetchSheetData()
  return tools.filter((t) => t.mcpReady)
}

export async function getToolsWithIntegrations(): Promise<SalesTool[]> {
  const tools = await fetchSheetData()
  return tools.filter((t) => t.integrations && t.integrations.length > 0)
}

export function getAllCategories(): CategoryMeta[] {
  return fallbackCategories
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return fallbackCategories.find((c) => c.slug === slug)
}

export async function getAllSlugs(): Promise<string[]> {
  const tools = await fetchSheetData()
  return tools.map((t) => t.slug)
}

export function getAllCategorySlugs(): string[] {
  return fallbackCategories.map((c) => c.slug)
}

export async function getToolsForComparison(slugs: string): Promise<{ tool1: SalesTool | undefined; tool2: SalesTool | undefined }> {
  const [s1, s2] = slugs.split("-vs-")
  return {
    tool1: await getToolBySlug(s1),
    tool2: await getToolBySlug(s2),
  }
}

export async function filterTools(options: {
  query?: string
  category?: string
  mcpOnly?: boolean
  freeOnly?: boolean
}): Promise<SalesTool[]> {
  let filtered = await fetchSheetData()

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
