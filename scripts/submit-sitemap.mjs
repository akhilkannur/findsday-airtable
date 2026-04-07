import { google } from "googleapis"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const KEY_FILE = path.join(ROOT, "indexing-key.json")

async function main() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error("❌ indexing-key.json not found")
    return
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: [
      "https://www.googleapis.com/auth/webmasters",
      "https://www.googleapis.com/auth/webmasters.readonly"
    ],
  })

  const searchconsole = google.searchconsole("v1")
  google.options({ auth })

  const SITE_URL = "https://salestools.club/"
  const SITEMAP_URL = "https://salestools.club/sitemap.xml"

  try {
    console.log(`Submitting sitemap ${SITEMAP_URL} for site ${SITE_URL}...`)
    
    await searchconsole.sitemaps.submit({
      feedpath: SITEMAP_URL,
      siteUrl: SITE_URL,
    })

    console.log("✅ Sitemap submitted successfully!")
    
    // Also verify the status
    const res = await searchconsole.sitemaps.get({
      feedpath: SITEMAP_URL,
      siteUrl: SITE_URL,
    })
    
    if (res.data) {
      console.log(`\nSitemap Status:`)
      console.log(`- Last Downloaded: ${res.data.lastDownloaded || "Not yet downloaded"}`)
      console.log(`- Type: ${res.data.type}`)
      console.log(`- Warnings: ${res.data.warnings || 0}`)
      console.log(`- Errors: ${res.data.errors || 0}`)
    }

  } catch (err) {
    console.error("❌ Error submitting sitemap:", err.message)
    if (err.message.includes("403")) {
      console.log("\n💡 Hint: Ensure the service account has 'Owner' or 'Full' permission in Google Search Console.")
    }
  }
}

main()
