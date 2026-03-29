import type { MetadataRoute } from "next"
import { getAllTools, getAllSdkLanguages, getAllCapabilities, getAllAuthMethods } from "@/lib/tools"
import { getAllSkills } from "@/lib/skills"
import { getAllStacks } from "@/lib/stacks"
import { getAllCategories } from "@/lib/tools"
import { getAllUseCases } from "@/lib/usecases"
import { getAllGuides } from "@/lib/guides"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://salestools.club"
  const lastModified = new Date().toISOString().split('T')[0]

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/api`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-sales-apis`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
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
      url: `${baseUrl}/guides`,
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
    {
      url: `${baseUrl}/rss.xml`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ]

  // Dynamic tool pages
  const tools = await getAllTools()
  const uniqueToolSlugs = new Set<string>()
  const toolPages: MetadataRoute.Sitemap = tools
    .filter((tool) => {
      if (!tool.slug || uniqueToolSlugs.has(tool.slug)) return false
      uniqueToolSlugs.add(tool.slug)
      return true
    })
    .map((tool) => ({
      url: `${baseUrl}/apis/${tool.slug}`,
      lastModified: lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

  // Dynamic skill pages
  const skills = getAllSkills()
  const uniqueSkillSlugs = new Set<string>()
  const skillPages: MetadataRoute.Sitemap = skills
    .filter((skill) => {
      if (!skill.slug || uniqueSkillSlugs.has(skill.slug)) return false
      uniqueSkillSlugs.add(skill.slug)
      return true
    })
    .map((skill) => ({
      url: `${baseUrl}/skills/${skill.slug}`,
      lastModified: lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

  // Dynamic stack pages
  const stacks = getAllStacks()
  const uniqueStackSlugs = new Set<string>()
  const stackPages: MetadataRoute.Sitemap = stacks
    .filter((stack) => {
      if (!stack.slug || uniqueStackSlugs.has(stack.slug)) return false
      uniqueStackSlugs.add(stack.slug)
      return true
    })
    .map((stack) => ({
      url: `${baseUrl}/stacks/${stack.slug}`,
      lastModified: lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

  // Dynamic category pages
  const categories = getAllCategories()
  const uniqueCategorySlugs = new Set<string>()
  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((category) => {
      if (!category.slug || uniqueCategorySlugs.has(category.slug)) return false
      uniqueCategorySlugs.add(category.slug)
      return true
    })
    .map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

  // Dynamic use case pages (for /for/[slug])
  const usecases = getAllUseCases()
  const uniqueUseCaseSlugs = new Set<string>()
  const usecasePages: MetadataRoute.Sitemap = usecases
    .filter((usecase) => {
      if (!usecase.slug || uniqueUseCaseSlugs.has(usecase.slug)) return false
      uniqueUseCaseSlugs.add(usecase.slug)
      return true
    })
    .map((usecase) => ({
      url: `${baseUrl}/for/${usecase.slug}`,
      lastModified: lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

  // Dynamic guide pages
  const guides = getAllGuides()
  const uniqueGuideSlugs = new Set<string>()
  const guidePages: MetadataRoute.Sitemap = guides
    .filter((guide) => {
      if (!guide.slug || uniqueGuideSlugs.has(guide.slug)) return false
      uniqueGuideSlugs.add(guide.slug)
      return true
    })
    .map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

  // Dynamic vs comparison pages
  const vsUrlSet = new Set<string>()
  const toolsByName = new Map(tools.map((t) => [t.name.toLowerCase(), t]))

  for (const tool of tools) {
    if (!tool.alternativeTo?.length) continue
    for (const alt of tool.alternativeTo) {
      const altTool = toolsByName.get(alt.toLowerCase())
      if (!altTool) continue
      const slugs = [tool.slug, altTool.slug].sort()
      vsUrlSet.add(`${baseUrl}/vs/${slugs[0]}-vs-${slugs[1]}`)
    }
  }

  // Include featured pairs from the vs index page
  const featuredPairs = [
    "apollo-vs-clay",
    "apollo-vs-zoominfo",
    "hubspot-vs-salesforce",
    "instantly-vs-smartlead",
    "firecrawl-vs-jina-reader",
    "bland-ai-vs-vapi",
    "cal-com-vs-calendly",
    "perplexity-vs-tavily",
  ]
  for (const pair of featuredPairs) {
    vsUrlSet.add(`${baseUrl}/vs/${pair}`)
  }

  const vsPages: MetadataRoute.Sitemap = Array.from(vsUrlSet).map((url) => ({
    url,
    lastModified: lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // SDK pages
  const sdkLanguages = getAllSdkLanguages()
  const sdkPages: MetadataRoute.Sitemap = sdkLanguages.map((lang) => ({
    url: `${baseUrl}/sdk/${lang.toLowerCase()}`,
    lastModified: lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // Auth pages
  const authMethods = getAllAuthMethods()
  const authPages: MetadataRoute.Sitemap = authMethods.map((m) => ({
    url: `${baseUrl}/auth/${m.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
    lastModified: lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // Capability pages
  const capabilities = getAllCapabilities()
  const capabilityPages: MetadataRoute.Sitemap = capabilities.map((cap) => ({
    url: `${baseUrl}/capability/${cap.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
    lastModified: lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // Alternative pages
  const topAlternativeSlugs = ["hubspot", "salesforce", "apollo", "zoominfo", "pipedrive", "lusha", "clearbit", "hunter"]
  const alternativePages: MetadataRoute.Sitemap = topAlternativeSlugs.map((slug) => ({
    url: `${baseUrl}/alternative-to/${slug}`,
    lastModified: lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  const allPages = [
    ...staticPages,
    ...toolPages,
    ...skillPages,
    ...stackPages,
    ...categoryPages,
    ...usecasePages,
    ...guidePages,
    ...vsPages,
    ...sdkPages,
    ...authPages,
    ...capabilityPages,
    ...alternativePages,
  ]

  // Final deduplication by URL and XML escaping to be absolutely sure
  const uniqueUrls = new Set<string>()
  return allPages
    .filter((page) => {
      if (uniqueUrls.has(page.url)) return false
      uniqueUrls.add(page.url)
      return true
    })
}
