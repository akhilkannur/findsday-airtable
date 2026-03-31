import { google } from "googleapis"
import https from "https"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const KEY_FILE = path.join(ROOT, "indexing-key.json")
const SUBMITTED_FILE = path.join(ROOT, ".indexing-submitted.json")

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
  console.log("Fetching capability URLs from sitemap...")
  const allUrls = await fetchSitemap()
  const capabilityUrls = allUrls.filter(u => u.includes("/capability/"))
  
  console.log(`Found ${capabilityUrls.length} capability URLs.`)
  
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  })
  const client = await auth.getClient()
  const today = new Date().toISOString().split("T")[0]
  
  let submitted = {}
  try {
    submitted = JSON.parse(fs.readFileSync(SUBMITTED_FILE, "utf8"))
  } catch (e) {}

  let success = 0
  let failed = 0

  for (const url of capabilityUrls) {
    try {
      await client.request({
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        data: { url, type: "URL_UPDATED" },
      })
      console.log(`✓ ${url}`)
      submitted[url] = today
      success++
      await new Promise((r) => setTimeout(r, 500))
    } catch (err) {
      const errorMsg = err.response?.data?.error?.message || err.message || err
      console.error(`✗ ${url} — ${errorMsg}`)
      failed++
      if (errorMsg.includes("429") || errorMsg.includes("quota")) {
        console.log("Daily quota reached for Indexing API.")
        break
      }
    }
  }

  fs.writeFileSync(SUBMITTED_FILE, JSON.stringify(submitted, null, 2))
  console.log(`
Done: ${success} submitted, ${failed} failed`)
}

main().catch(console.error)
