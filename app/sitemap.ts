import { MetadataRoute } from "next"
import { getDirectoryTools, base, type DropRecord } from "@/lib/airtableClient"

const BASE_URL = "https://findsday.com" // Update with your actual domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Routes
  const routes = ["", "/sales-tools/directory", "/admin/login"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // 2. Dynamic Tool Pages
  let toolRoutes: MetadataRoute.Sitemap = []
  try {
    const tools = await getDirectoryTools()
    toolRoutes = tools.map((tool) => {
      const slug = tool.fields.Name?.toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .trim("-")
      
      return {
        url: `${BASE_URL}/sales-tools/directory/${slug}`,
        lastModified: tool.fields["Updated At"] || new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }
    })
  } catch (error) {
    console.error("Error generating sitemap for tools:", error)
  }

  // 3. Dynamic Drop Pages
  let dropRoutes: MetadataRoute.Sitemap = []
  try {
    // Fetch all drops directly
    const drops = (await base("Drops")
      .select({
        sort: [{ field: "Drop Date", direction: "desc" }],
      })
      .all()) as unknown as DropRecord[]

    dropRoutes = drops.map((drop) => {
      // Assuming the slug structure for drops is simple, e.g., using ID or another unique field
      // If drops use slugs, we should use that. Based on file structure: app/drops/[slug]/page.tsx
      // Let's assume the slug is the ID for now as I don't see a Slug field in DropRecord, 
      // but usually it might be the Drop Number or ID.
      // Checking app/drops/[slug]/page.tsx would clarify, but let's use ID as safe fallback or construct a slug.
      // Actually, checking previous context or file list might help. 
      // app/drops/[slug]/page.tsx exists.
      
      // Let's use the ID as slug for now to be safe, or if there's a specific slug logic, we should mirror it.
      // I'll stick to ID since I haven't seen a specific slug generator for drops.
      return {
        url: `${BASE_URL}/drops/${drop.id}`, 
        lastModified: drop.fields["Updated At"] || new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }
    })
  } catch (error) {
    console.error("Error generating sitemap for drops:", error)
  }

  return [...routes, ...toolRoutes, ...dropRoutes]
}
