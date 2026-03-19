import { tools, categories } from "./data"
import type { SalesTool, ToolCategory, CategoryMeta } from "./types"

// In "Terminal-First" mode, I use the local data.ts as the source of truth.
// We keep the functions async so the UI doesn't need to change, and it allows
// for easy switching back to a live API if needed later.

export async function getAllTools(): Promise<SalesTool[]> {
  const withDocs = tools.filter((t) => "docsUrl" in t && t.docsUrl && t.docsUrl !== "") as SalesTool[]
  return withDocs
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
  return categories.map(c => ({
    ...c,
    toolCount: tools.filter(t => t.docsUrl && t.docsUrl !== "" && t.category === c.name).length,
  }))
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  const cat = categories.find((c) => c.slug === slug)
  if (!cat) return undefined
  return {
    ...cat,
    toolCount: tools.filter(t => t.docsUrl && t.docsUrl !== "" && t.category === cat.name).length,
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const seen = new Set<string>()
  return tools
    .filter((t) => t.slug && t.docsUrl && t.docsUrl !== "")
    .filter((t) => {
      if (seen.has(t.slug)) return false
      seen.add(t.slug)
      return true
    })
    .map((t) => t.slug)
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may',
  'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'to', 'of', 'in',
  'for', 'on', 'with', 'at', 'by', 'from', 'up', 'about', 'into', 'over', 'after',
  'under', 'above', 'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you',
  'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her',
  'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
  'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am',
  'been', 'being', 'having', 'doing', 'would', 'should', 'could', 'ought',
  'i\'m', 'you\'re', 'he\'s', 'she\'s', 'it\'s', 'we\'re', 'they\'re', 'i\'ve',
  'you\'ve', 'we\'ve', 'they\'ve', 'i\'d', 'you\'d', 'he\'d', 'she\'d', 'we\'d', 'they\'d',
  'i\'ll', 'you\'ll', 'he\'ll', 'she\'ll', 'we\'ll', 'they\'ll', 'isn\'t', 'aren\'t', 'wasn\'t',
  'weren\'t', 'hasn\'t', 'haven\'t', 'hadn\'t', 'doesn\'t', 'don\'t', 'didn\'t', 'won\'t',
  'wouldn\'t', 'shan\'t', 'shouldn\'t', 'can\'t', 'cannot', 'couldn\'t', 'mustn\'t', 'let\'s',
  'us', 'say', 'said', 'also', 'just', 'like', 'get', 'got', 'find', 'finding',
  'search', 'searching', 'looking', 'need', 'needs', 'wants', 'want', 'best', 'good', 'top',
  'free', 'cheap', 'affordable', 'use', 'using', 'used', 'make', 'making', 'build', 'building',
  'project', 'their', 'show', 'showme', 'list', 'all', 'some', 'any', 'no',
  'not', 'only', 'very', 'really', 'most', 'many', 'much', 'such', 'other', 'another',
  'work', 'works', 'working', 'vs', 'versus', 'alternative', 'alternatives', 'compare',
])

function extractKeywords(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word))
}

export async function searchTools(query: string): Promise<SalesTool[]> {
  const keywords = extractKeywords(query)
  
  if (keywords.length === 0) {
    return []
  }

  return tools.filter(
    (t) =>
      t.docsUrl &&
      t.docsUrl !== "" &&
      keywords.some(
        (kw) =>
          t.name.toLowerCase().includes(kw) ||
          t.oneLiner.toLowerCase().includes(kw) ||
          t.category.toLowerCase().includes(kw) ||
          t.description?.toLowerCase().includes(kw) ||
          t.alternativeTo?.some((a) => a.toLowerCase().includes(kw))
      )
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
  return tools.filter((t) => t.githubUrl && t.githubUrl !== "") as SalesTool[]
}

export async function getToolsWithoutDocs(): Promise<SalesTool[]> {
  return tools.filter((t) => !t.docsUrl || t.docsUrl === "")
}

export function resolveCategoryName(input: string): string | undefined {
  const trimmed = input.trim()
  if (!trimmed) return undefined
  const cat = categories.find(
    (c) => c.slug === trimmed || c.name === trimmed
  )
  return cat?.name
}

export async function getToolsBySdkLanguage(language: string): Promise<SalesTool[]> {
  const all = await getAllTools()
  return all.filter((t) => 
    t.sdkLanguages.some(l => l.toLowerCase() === language.toLowerCase())
  )
}

export async function getToolsByAlternativeTo(toolName: string): Promise<SalesTool[]> {
  const all = await getAllTools()
  const searchName = toolName.toLowerCase()
  return all.filter((t) => 
    t.alternativeTo?.some(alt => alt.toLowerCase().includes(searchName)) ||
    t.name.toLowerCase().includes(searchName)
  )
}

export async function getToolsByCapability(capabilitySlug: string): Promise<SalesTool[]> {
  const all = await getAllTools()
  const target = capabilitySlug.replace(/-/g, " ").toLowerCase()
  return all.filter((t) => 
    t.aiCapabilities.some(cap => cap.toLowerCase().replace(/-/g, " ").includes(target))
  )
}

export async function getFreeTierTools(): Promise<SalesTool[]> {
  const all = await getAllTools()
  return all.filter((t) => t.hasFreeTier)
}

export async function getToolsByAuthMethod(method: string): Promise<SalesTool[]> {
  const all = await getAllTools()
  const target = method.replace(/-/g, " ").toLowerCase()
  return all.filter((t) => 
    t.authMethod.some(m => m.toLowerCase() === target)
  )
}

export function getAllSdkLanguages(): string[] {
  const langs = new Set<string>()
  tools.forEach(t => {
    if (t.docsUrl && t.docsUrl !== "" && "sdkLanguages" in t) {
      t.sdkLanguages.forEach(l => langs.add(l))
    }
  })
  return Array.from(langs).sort()
}

export function getAllCapabilities(): string[] {
  const caps = new Set<string>()
  tools.forEach(t => {
    if (t.docsUrl && t.docsUrl !== "" && "aiCapabilities" in t) {
      t.aiCapabilities.forEach(c => caps.add(c))
    }
  })
  return Array.from(caps).sort()
}

export function getAllAuthMethods(): string[] {
  const methods = new Set<string>()
  tools.forEach(t => {
    if (t.docsUrl && t.docsUrl !== "" && "authMethod" in t) {
      t.authMethod.forEach(m => methods.add(m))
    }
  })
  // Ensure common ones are always there or at least formatted correctly
  if (methods.size === 0) {
    return ["API Key", "OAuth2", "Bearer Token", "Basic Auth", "None"]
  }
  return Array.from(methods).sort()
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
    const resolved = resolveCategoryName(options.category)
    if (resolved) {
      filtered = filtered.filter((t) => t.category === resolved)
    } else {
      filtered = filtered.filter((t) => t.category === options.category.trim())
    }
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
    const q = options.query.toLowerCase().trim()
    filtered = filtered
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()

        // 1. Exact match (top priority)
        if (aName === q && bName !== q) return -1
        if (bName === q && aName !== q) return 1

        // 2. Starts with (second priority)
        const aStarts = aName.startsWith(q)
        const bStarts = bName.startsWith(q)
        if (aStarts && !bStarts) return -1
        if (bStarts && !aStarts) return 1

        // 3. Name includes (third priority)
        const aIncludes = aName.includes(q)
        const bIncludes = bName.includes(q)
        if (aIncludes && !bIncludes) return -1
        if (bIncludes && !aIncludes) return 1

        return 0
      })
  } else {
    // Sort by addedAt (newest first), then alphabetically
    filtered.sort((a, b) => {
      if (a.addedAt && b.addedAt) {
        if (a.addedAt !== b.addedAt) {
          return b.addedAt.localeCompare(a.addedAt)
        }
      } else if (a.addedAt) {
        return -1
      } else if (b.addedAt) {
        return 1
      }
      return a.name.localeCompare(b.name)
    })
  }

  return filtered
}
