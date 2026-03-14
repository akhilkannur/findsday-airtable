import { google } from "googleapis"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const KEY_FILE = path.join(ROOT, "indexing-key.json")

async function getAuth(scopes) {
  if (!fs.existsSync(KEY_FILE)) {
    throw new Error("indexing-key.json not found in project root")
  }
  return new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes,
  })
}

async function getGscData(days = 7, limit = 100, sortMetric = "impressions") {
  const auth = await getAuth([
    "https://www.googleapis.com/auth/webmasters.readonly",
  ])
  const searchconsole = google.searchconsole({ version: "v1", auth })
  
  const sitesRes = await searchconsole.sites.list()
  const sites = sitesRes.data.siteEntry || []
  const targetSite = sites.find(s => s.siteUrl.includes("salestools.club")) || sites[0]
  
  if (!targetSite) return "No sites found in Search Console."

  const today = new Date()
  const startDate = new Date()
  startDate.setDate(today.getDate() - days) 
  const endDate = today

  const res = await searchconsole.searchanalytics.query({
    siteUrl: targetSite.siteUrl,
    requestBody: {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      dimensions: ["query"],
      rowLimit: limit,
      dataState: "all",
      searchType: "web"
    }
  })

  let output = `### GSC Organic Search Performance (${targetSite.siteUrl})\n`
  if (res.data.rows) {
    let rows = res.data.rows;
    if (sortMetric === "impressions") {
        rows.sort((a, b) => b.impressions - a.impressions);
    } else if (sortMetric === "clicks") {
        rows.sort((a, b) => b.clicks - a.clicks);
    } else if (sortMetric === "position") {
        rows.sort((a, b) => a.position - b.position);
    }

    output += `Range: ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]} (Fresh Data Included)\n`
    output += `Sorted by: ${sortMetric} (Top ${limit})\n\n`
    output += "| Organic Query | Clicks | Impressions | CTR | Position |\n"
    output += "| :--- | :--- | :--- | :--- | :--- |\n"
    rows.forEach(row => {
      output += `| ${row.keys[0]} | ${row.clicks} | ${row.impressions} | ${(row.ctr * 100).toFixed(1)}% | ${row.position.toFixed(1)} |\n`
    })
  } else {
    output += "No organic search data found for this period."
  }
  return output
}

const args = process.argv.slice(2)
const days = parseInt(args[0]) || 7
const limit = parseInt(args[1]) || 100
const sort = args[2] || "impressions"

getGscData(days, limit, sort).then(console.log).catch(err => console.error("GSC Error:", err.message))
