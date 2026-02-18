import { getAllSlugs, getAllCategorySlugs } from "@/lib/tools"
import type { MetadataRoute } from "next"

const BASE_URL = "https://findsday.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const toolSlugs = getAllSlugs()
  const categorySlugs = getAllCategorySlugs()

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/mcp`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/submit`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
  ]

  const toolPages = toolSlugs.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const categoryPages = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...toolPages, ...categoryPages]
}
