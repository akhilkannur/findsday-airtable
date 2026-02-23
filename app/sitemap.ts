import type { MetadataRoute } from "next"
import { getAllTools } from "@/lib/tools"
import { getAllSkills } from "@/lib/skills"
import { getAllStacks } from "@/lib/stacks"
import { getAllCategories } from "@/lib/tools"
import { getAllUseCases } from "@/lib/usecases"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://salestools.club"
  const lastModified = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/for`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mcp`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/stacks`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/open-source`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/vs`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/directory-builder`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  // Dynamic tool pages
  const tools = await getAllTools()
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Dynamic skill pages
  const skills = getAllSkills()
  const skillPages: MetadataRoute.Sitemap = skills.map((skill) => ({
    url: `${baseUrl}/skills/${skill.slug}`,
    lastModified: lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Dynamic stack pages
  const stacks = getAllStacks()
  const stackPages: MetadataRoute.Sitemap = stacks.map((stack) => ({
    url: `${baseUrl}/stacks/${stack.slug}`,
    lastModified: lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Dynamic category pages
  const categories = getAllCategories()
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Dynamic use case pages (for /for/[slug])
  const usecases = getAllUseCases()
  const usecasePages: MetadataRoute.Sitemap = usecases.map((usecase) => ({
    url: `${baseUrl}/for/${usecase.slug}`,
    lastModified: lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...toolPages,
    ...skillPages,
    ...stackPages,
    ...categoryPages,
    ...usecasePages,
  ]
}
