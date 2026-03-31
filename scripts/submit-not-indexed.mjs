import { google } from "googleapis"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const KEY_FILE = path.join(ROOT, "indexing-key.json")
const NOT_INDEXED_FILE = path.join(ROOT, ".not-indexed.json")
const SUBMITTED_FILE = path.join(ROOT, ".indexing-submitted.json")

async function main() {
  if (!fs.existsSync(NOT_INDEXED_FILE)) {
    console.log("No non-indexed URLs found to submit.")
    return
  }

  const notIndexed = JSON.parse(fs.readFileSync(NOT_INDEXED_FILE, "utf8"))
  if (notIndexed.length === 0) {
    console.log("No non-indexed URLs found to submit.")
    return
  }

  console.log(`Submitting ${notIndexed.length} non-indexed URLs to Indexing API...`)

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  })
  const client = await auth.getClient()

  let submitted = {}
  try {
    submitted = JSON.parse(fs.readFileSync(SUBMITTED_FILE, "utf8"))
  } catch (e) {}

  const today = new Date().toISOString().split("T")[0]
  let success = 0
  let failed = 0

  for (const url of notIndexed) {
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
  
  // Clear the submitted ones from not-indexed.json
  // Actually, we should only clear the ones that succeeded
  // But for now let's just leave it or filter it
  const remainingNotIndexed = notIndexed.filter(u => !submitted[u] || submitted[u] !== today)
  // Wait, if it succeeded today, it's "submitted", so we can remove it from notIndexed
  // Actually, if we just submitted it, it's still "not indexed" until Google crawls it.
  // But we don't want to re-submit it immediately.
  
  console.log(`\nDone: ${success} submitted, ${failed} failed`)
}

main().catch(console.error)
