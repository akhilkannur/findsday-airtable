import { google } from "googleapis"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const KEY_FILE = path.join(ROOT, "indexing-key.json")
const SUBMITTED_FILE = path.join(ROOT, ".indexing-submitted.json")

const BASE = "https://salestools.club"

// All non-tool pages to index
const nonToolPages = [
  // Static pages not yet submitted
  "/free-sales-apis",
  "/privacy",
  "/monitoring",

  // Category pages
  "/categories/sales-intelligence",
  "/categories/sales-engagement",
  "/categories/phone-and-dialers",
  "/categories/crm-and-revops",
  "/categories/revenue-intelligence",
  "/categories/sales-enablement",
  "/categories/closing-and-scheduling",

  // Alternative-to pages
  "/alternative-to/hubspot",
  "/alternative-to/salesforce",
  "/alternative-to/apollo",
  "/alternative-to/zoominfo",
  "/alternative-to/pipedrive",
  "/alternative-to/lusha",
  "/alternative-to/clearbit",
  "/alternative-to/hunter",

  // Auth pages
  "/auth/api-key",
  "/auth/oauth2",
  "/auth/bearer-token",
  "/auth/basic-auth",

  // SDK pages
  "/sdk/python",
  "/sdk/node.js",
  "/sdk/ruby",
  "/sdk/php",
  "/sdk/go",
  "/sdk/java",
  "/sdk/.net",

  // Capability pages (top ones)
  "/capability/lead-enrichment",
  "/capability/email-verification",
  "/capability/ai-search",
  "/capability/meeting-recording",
  "/capability/lead-generation",
  "/capability/crm-enrichment",
  "/capability/technology-stack-detection",
  "/capability/sales-automation",
  "/capability/competitive-intelligence",

  // VS pages (featured)
  "/vs/apollo-vs-clay",
  "/vs/apollo-vs-zoominfo",
  "/vs/hubspot-vs-salesforce",
  "/vs/instantly-vs-smartlead",
  "/vs/bland-ai-vs-vapi",
  "/vs/cal-com-vs-calendly",
  "/vs/firecrawl-vs-jina-reader",
  "/vs/perplexity-vs-tavily",
]

async function main() {
  const submitted = JSON.parse(fs.readFileSync(SUBMITTED_FILE, "utf8"))
  const today = new Date().toISOString().split("T")[0]

  // Filter to only pages not yet submitted
  const toSubmit = nonToolPages
    .map((p) => `${BASE}${p}`)
    .filter((url) => !submitted[url])

  if (toSubmit.length === 0) {
    console.log("All non-tool pages already submitted!")
    return
  }

  console.log(`Submitting ${toSubmit.length} non-tool pages...\n`)

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  })
  const client = await auth.getClient()

  let success = 0
  let failed = 0

  for (const url of toSubmit) {
    try {
      const res = await client.request({
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        data: {
          url,
          type: "URL_UPDATED",
        },
      })
      console.log(`✓ ${url}`)
      submitted[url] = today
      success++

      // Rate limit: ~2 per second
      await new Promise((r) => setTimeout(r, 500))
    } catch (err) {
      console.error(`✗ ${url} — ${err.message || err}`)
      failed++
    }
  }

  fs.writeFileSync(SUBMITTED_FILE, JSON.stringify(submitted, null, 2))
  console.log(`\nDone: ${success} submitted, ${failed} failed`)
}

main().catch(console.error)
