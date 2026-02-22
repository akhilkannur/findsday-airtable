import { getAllSlugs, getAllCategorySlugs } from "@/lib/tools"
import { getUseCaseSlugs } from "@/lib/usecases"
import { getStackSlugs } from "@/lib/stacks"
import { getSkillSlugs } from "@/lib/skills"
import type { MetadataRoute } from "next"

const BASE_URL = "https://salestools.club"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const toolSlugs = (await getAllSlugs()) || []
    const categorySlugs = getAllCategorySlugs() || []
    const usecaseSlugs = getUseCaseSlugs() || []
    const stackSlugs = getStackSlugs() || []
    const skillSlugs = getSkillSlugs() || []

    const staticPages = [
      { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
      { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
      { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
      { url: `${BASE_URL}/for`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
      { url: `${BASE_URL}/mcp`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
      { url: `${BASE_URL}/stacks`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
      { url: `${BASE_URL}/open-source`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
      { url: `${BASE_URL}/skills`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
      { url: `${BASE_URL}/submit`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
      { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
      { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    ]

    const toolPages = (toolSlugs || [])
      .filter((slug) => typeof slug === "string" && slug)
      .map((slug) => ({
        url: `${BASE_URL}/tools/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))

    const categoryPages = (categorySlugs || [])
      .filter((slug) => typeof slug === "string" && slug)
      .map((slug) => ({
        url: `${BASE_URL}/categories/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))

    const usecasePages = (usecaseSlugs || [])
      .filter((slug) => typeof slug === "string" && slug)
      .map((slug) => ({
        url: `${BASE_URL}/for/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))

    const stackPages = (stackSlugs || [])
      .filter((slug) => typeof slug === "string" && slug)
      .map((slug) => ({
        url: `${BASE_URL}/stacks/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))

    const skillPages = (skillSlugs || [])
      .filter((slug) => typeof slug === "string" && slug)
      .map((slug) => ({
        url: `${BASE_URL}/skills/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))

    return [...staticPages, ...toolPages, ...categoryPages, ...usecasePages, ...stackPages, ...skillPages]
  } catch (error) {
    console.error("Sitemap generation error:", error)
    // Return at least static pages if dynamic data fails
    return [
      { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
      { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
      { url: `${BASE_URL}/submit`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    ]
  }
}
