// lib/urlUtils.ts - URL generation and slug utilities for SEO-friendly URLs

/**
 * Generate a URL-safe slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

/**
 * Generate SEO-friendly tool URL (without record ID)
 */
export function generateToolUrl(toolName: string): string {
  const slug = generateSlug(toolName || "unnamed-tool")
  return `/sales-tools/${slug}`
}

/**
 * Generate SEO-friendly directory tool URL (without record ID)
 */
export function generateDirectoryToolUrl(toolName: string): string {
  const slug = generateSlug(toolName || "unnamed-tool")
  return `/sales-tools/directory/${slug}`
}

/**
 * Generate SEO-friendly drop URL (without record ID)
 */
export function generateDropUrl(dropNumber: number): string {
  return `/drops/drop-${dropNumber}`
}

/**
 * Find tool by slug in Airtable
 */
export async function findToolBySlug(slug: string, tableName = "Tools") {
  const { base } = await import("@/lib/airtableClient")

  try {
    // Convert slug back to searchable name
    const searchName = slug.replace(/-/g, " ")

    // Search for tools with matching names
    const records = await base(tableName)
      .select({
        filterByFormula: `SEARCH(LOWER("${searchName}"), LOWER({Name})) > 0`,
        maxRecords: 10,
      })
      .all()

    if (records.length === 0) {
      console.warn(`[findToolBySlug] No tool found for slug: ${slug}`)
      return null
    }

    // Find exact match first, then closest match
    let bestMatch = records[0]
    for (const record of records) {
      const recordSlug = generateSlug(String(record.fields.Name || ""))
      if (recordSlug === slug) {
        bestMatch = record
        break
      }
    }

    console.log(`[findToolBySlug] Found tool: ${bestMatch.fields.Name} for slug: ${slug}`)
    return {
      id: bestMatch.id,
      fields: bestMatch.fields,
    }
  } catch (error) {
    console.error(`[findToolBySlug] Error finding tool by slug ${slug}:`, error)
    return null
  }
}

/**
 * Generate sitemap-friendly URLs for better SEO
 */
export function generateCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://findsday-airtable.vercel.app"
  return `${baseUrl}${path}`
}
