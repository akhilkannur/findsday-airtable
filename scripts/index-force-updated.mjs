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

// URLs from the audit that have high impressions but low CTR
const AUDIT_URLS = [
  "https://salestools.club/stacks/jorge-macias-favorite-apis",
  "https://salestools.club/api",
  "https://salestools.club/capability/data-enrichment",
  "https://salestools.club/apis/similartech",
  "https://salestools.club/guides/best-lead-enrichment-apis",
  "https://salestools.club/apis/suitecrm",
  "https://salestools.club/capability/ai-sales-agents",
  "https://salestools.club/categories/crm-and-revops",
  "https://salestools.club/capability/company-enrichment",
  "https://salestools.club/capability/automated-outreach",
  "https://salestools.club/capability/ai-sales-agent",
  "https://salestools.club/mcp",
  "https://salestools.club/",
]

// Priority order for indexing
const PRIORITY_PREFIXES = [
  "/guides/",
  "/skills/",
  "/capability/",
  "/for/",
  "/vs/",
  "/categories/",
  "/apis/",
]

function getPriority(url) {
  // Audit URLs get the highest priority (0)
  if (AUDIT_URLS.includes(url)) return 0
  
  for (let i = 0; i < PRIORITY_PREFIXES.length; i++) {
    if (url.includes(PRIORITY_PREFIXES[i])) return i + 1
  }
  return PRIORITY_PREFIXES.length + 1
}

async function main() {
  const DAILY_QUOTA = 200 // Default Google Indexing API quota
  const today = new Date().toISOString().split("T")[0]
  
  console.log(`Starting force indexing for updated SEO pages...\n`)

  const allUrls = await fetchSitemap()
  const prioritizedUrls = allUrls
    .sort((a, b) => getPriority(a) - getPriority(b))

  const batch = prioritizedUrls.slice(0, DAILY_QUOTA)

  console.log(`Submitting batch of ${batch.length} URLs...\n`)

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  })
  const client = await auth.getClient()

  let success = 0
  let failed = 0

  for (const url of batch) {
    try {
      await client.request({
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        data: { url, type: "URL_UPDATED" },
      })
      console.log(`✓ ${url}`)
      success++
      await new Promise((r) => setTimeout(r, 500))
    } catch (err) {
      const errorMsg = err.response?.data?.error?.message || err.message || err
      console.error(`✗ ${url} — ${errorMsg}`)
      failed++
      if (errorMsg.includes("429")) {
        console.log("\nRate limit (429) hit. Stopping.")
        break
      }
    }
  }

  // Update .indexing-submitted.json
  let submitted = {}
  try {
    submitted = JSON.parse(fs.readFileSync(SUBMITTED_FILE, "utf8"))
  } catch (e) {}
  
  for (const url of batch) {
    submitted[url] = today
  }
  fs.writeFileSync(SUBMITTED_FILE, JSON.stringify(submitted, null, 2))

  console.log(`\nDone: ${success} submitted, ${failed} failed`)
}

main().catch(console.error)
