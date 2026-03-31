import { google } from "googleapis"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const KEY_FILE = path.join(ROOT, "indexing-key.json")

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

  const url = process.argv[2] || "https://salestools.club/apis/apparound"
  const siteUrl = "https://salestools.club/"

  try {
    console.log(`Checking indexing status for: ${url}`)
    const res = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: url,
        siteUrl: siteUrl,
        languageCode: "en-US"
      }
    })

    const result = res.data.inspectionResult
    const indexStatus = result.indexStatusResult.verdict
    
    console.log(`Verdict: ${indexStatus}`)
    if (indexStatus !== "PASS") {
        console.log(`Reason: ${result.indexStatusResult.coverageState}`)
    } else {
        console.log("Status: Indexed")
    }
  } catch (err) {
    console.error("Error:", err.message)
  }
}

main()
