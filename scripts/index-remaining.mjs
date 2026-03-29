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

// Priority order for non-tool pages
const PRIORITY_PREFIXES = [
  "/guides/",
  "/skills/",
  "/apis/",
  "/stacks/",
  "/for/",
  "/vs/",
  "/alternative-to/",
  "/categories/",
  "/sdk/",
  "/auth/",
  "/capability/",
]

function getPriority(url) {
  for (let i = 0; i < PRIORITY_PREFIXES.length; i++) {
    if (url.includes(PRIORITY_PREFIXES[i])) return i
  }
  return PRIORITY_PREFIXES.length + 1
}

async function main() {
  const DAILY_QUOTA = 200
  const submitted = JSON.parse(fs.readFileSync(SUBMITTED_FILE, "utf8"))
  const today = new Date().toISOString().split("T")[0]
  const todayCount = Object.values(submitted).filter((d) => d === today).length
  const remaining = DAILY_QUOTA - todayCount

  if (remaining <= 0) {
    console.log("Daily quota exhausted!")
    return
  }

  console.log(`Quota remaining today: ${remaining}\n`)

  const allUrls = await fetchSitemap()
  const unsubmitted = allUrls
    .filter((u) => !submitted[u])
    .sort((a, b) => getPriority(a) - getPriority(b))

  const batch = unsubmitted.slice(0, remaining)

  if (batch.length === 0) {
    console.log("All sitemap URLs already submitted!")
    return
  }

  console.log(`Submitting ${batch.length} of ${unsubmitted.length} remaining pages...\n`)

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
      submitted[url] = today
      success++
      await new Promise((r) => setTimeout(r, 500))
    } catch (err) {
      console.error(`✗ ${url} — ${err.message || err}`)
      failed++
    }
  }

  fs.writeFileSync(SUBMITTED_FILE, JSON.stringify(submitted, null, 2))
  console.log(`\nDone: ${success} submitted, ${failed} failed`)
  console.log(`Still remaining: ${unsubmitted.length - batch.length} pages`)
}

main().catch(console.error)
