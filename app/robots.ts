import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/submit",
        "/api/tools/*",
        "/monitoring",
      ],
    },
    sitemap: "https://salestools.club/sitemap.xml",
  }
}
