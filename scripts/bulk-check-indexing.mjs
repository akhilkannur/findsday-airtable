import { google } from "googleapis"
import https from "https"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const KEY_FILE = path.join(ROOT, "indexing-key.json")
const NOT_INDEXED_FILE = path.join(ROOT, ".not-indexed.json")

function fetchSitemap() {
  return new Promise((resolve, reject) => {
    https.get("https://salestools.club/sitemap.xml", (res) => {
      let data = ""
      res.on("data", (chunk) => (data += chunk))
      res.on("end", () => {
        const urls = [...data.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
        resolve(urls)
      })
    }).on("error", reject)
  })
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: [
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/webmasters"
    ],
  })

  const searchconsole = google.searchconsole("v1")
  google.options({ auth })

  const allUrls = await fetchSitemap()
  console.log(`Total URLs in sitemap: ${allUrls.length}`)

  let notIndexed = []
  if (fs.existsSync(NOT_INDEXED_FILE)) {
    notIndexed = JSON.parse(fs.readFileSync(NOT_INDEXED_FILE, "utf8"))
  }

  const siteUrl = "https://salestools.club/"
  const CONCURRENCY = 3
  const batchSize = 100 // Let's check 100 at a time
  
  // Only check URLs we haven't already marked as not indexed or haven't checked recently
  // For now, let's just check the first 100 that we don't know the status for
  const toCheck = allUrls.slice(0, 100) 

  console.log(`Checking status for ${toCheck.length} URLs...`)

  let count = 0
  for (const url of toCheck) {
    try {
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: siteUrl,
          languageCode: "en-US"
        }
      })

      const verdict = res.data.inspectionResult.indexStatusResult.verdict
      console.log(`${++count}/${toCheck.length}: ${url} — ${verdict}`)

      if (verdict !== "PASS") {
        if (!notIndexed.includes(url)) {
            notIndexed.push(url)
        }
      } else {
        // If it was in notIndexed but is now indexed, remove it
        notIndexed = notIndexed.filter(u => u !== url)
      }
      
      // Wait to avoid hitting rate limits
      await new Promise(r => setTimeout(r, 200))
    } catch (err) {
      console.error(`Error checking ${url}: ${err.message}`)
      if (err.message.includes("429")) {
        console.log("Quota exceeded for URL Inspection API.")
        break
      }
    }
  }

  fs.writeFileSync(NOT_INDEXED_FILE, JSON.stringify(notIndexed, null, 2))
  console.log(`
Updated ${NOT_INDEXED_FILE}. Total not indexed: ${notIndexed.length}`)
}

main().catch(console.error)
