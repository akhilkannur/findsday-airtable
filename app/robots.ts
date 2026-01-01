import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = "https://findsday.com" // Update with actual domain

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
