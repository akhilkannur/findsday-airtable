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
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/webmasters"
    ],
  })

  const searchconsole = google.searchconsole("v1")
  google.options({ auth })

  try {
    console.log("Fetching sites list...")
    const res = await searchconsole.sites.list()
    const sites = res.data.siteEntry || []
    
    if (sites.length === 0) {
      console.log("No sites found for this service account.")
      return
    }

    console.log(`Found ${sites.length} sites:`)
    sites.forEach(site => {
      console.log(`- ${site.siteUrl} (Permission: ${site.permissionLevel})`)
    })

    const targetSite = sites.find(s => s.siteUrl.includes("salestools.club")) || sites[0]
    
    if (targetSite) {
      console.log(`\nFetching performance for ${targetSite.siteUrl}...`)
      
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const startDate = new Date(yesterday)
      startDate.setDate(yesterday.getDate() - 7)
      
      const perfRes = await searchconsole.searchanalytics.query({
        siteUrl: targetSite.siteUrl,
        requestBody: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: yesterday.toISOString().split('T')[0],
          dimensions: ["query"],
          rowLimit: 10
        }
      })

      if (perfRes.data.rows) {
        console.log("\nTop Queries (Last 7 Days):")
        perfRes.data.rows.forEach(row => {
          console.log(`- ${row.keys[0]}: ${row.clicks} clicks, ${row.impressions} impressions`)
        })
      } else {
        console.log("No performance data found (site might be new or no data in range).")
      }
    }

  } catch (err) {
    console.error("❌ Error:", err.message)
    if (err.message.includes("403")) {
      console.log("\n💡 Hint: Ensure the service account has been added as a user in GSC for the property.")
    }
  }
}

main()
