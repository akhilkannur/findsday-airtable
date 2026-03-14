import { google } from "googleapis"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "../../..")
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

async function getGscData(days = 7, limit = 50, sortMetric = "clicks") {
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
  // Include today and use dataState: "all" for fresh data
  startDate.setDate(today.getDate() - days) 
  const endDate = today

  const res = await searchconsole.searchanalytics.query({
    siteUrl: targetSite.siteUrl,
    requestBody: {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      dimensions: ["query"],
      rowLimit: limit,
      dataState: "all" // CRITICAL: Includes "fresh" data (last 24-48 hours)
    }
  })

  let output = `### GSC Performance (${targetSite.siteUrl}) — Fresh Data Included\n`
  if (res.data.rows) {
    let rows = res.data.rows;
    if (sortMetric === "impressions") {
        rows.sort((a, b) => b.impressions - a.impressions);
    } else if (sortMetric === "position") {
        rows.sort((a, b) => a.position - b.position);
    }

    output += `Range: ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}\n`
    output += `Sorted by: ${sortMetric} (Top ${limit})\n\n`
    output += "| Query | Clicks | Impressions | CTR | Position |\n"
    output += "| :--- | :--- | :--- | :--- | :--- |\n"
    rows.forEach(row => {
      output += `| ${row.keys[0]} | ${row.clicks} | ${row.impressions} | ${(row.ctr * 100).toFixed(1)}% | ${row.position.toFixed(1)} |\n`
    })
  } else {
    output += "No data found for this period."
  }
  return output
}

async function getGaData(days = 7) {
  const auth = await getAuth([
    "https://www.googleapis.com/auth/analytics.readonly",
  ])
  const admin = google.analyticsadmin({ version: "v1alpha", auth })
  const analyticsData = google.analyticsdata({ version: "v1beta", auth })

  const accountsRes = await admin.accounts.list()
  const accounts = accountsRes.data.accounts || []
  
  let output = "### GA4 Traffic Report\n"
  let found = false

  for (const account of accounts) {
    const propsRes = await admin.properties.list({ filter: `parent:${account.name}` })
    const properties = propsRes.data.properties || []
    
    for (const prop of properties) {
      if (!prop.displayName.toLowerCase().includes("salestools")) continue
      
      found = true
      const propertyId = prop.name.split("/")[1]
      const dataRes = await analyticsData.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: {
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: "yesterday" }],
          metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
          dimensions: [{ name: "pagePath" }],
          limit: 20
        }
      })

      output += `#### Property: ${prop.displayName}\n`
      if (dataRes.data.rows) {
        output += "| Page Path | Users | Views |\n"
        output += "| :--- | :--- | :--- |\n"
        dataRes.data.rows.forEach(row => {
          output += `| ${row.dimensionValues[0].value} | ${row.metricValues[0].value} | ${row.metricValues[1].value} |\n`
        })
      } else {
        output += "No traffic data found."
      }
    }
  }

  if (!found) return "Salestools GA4 property not found or access denied."
  return output
}

const action = process.argv[2]
const days = parseInt(process.argv[3]) || 7
const limit = parseInt(process.argv[4]) || 50
const sort = process.argv[5] || "clicks"

if (action === "gsc") {
  getGscData(days, limit, sort).then(console.log).catch(err => console.error("GSC Error:", err.message))
} else if (action === "ga") {
  getGaData(days).then(console.log).catch(err => console.error("GA Error:", err.message))
} else if (action === "both") {
  Promise.all([getGscData(days, limit, sort), getGaData(days)])
    .then(([gsc, ga]) => console.log(gsc + "\n\n" + ga))
    .catch(err => console.error("Error:", err.message))
} else {
  console.log("Usage: node fetch-reports.mjs [gsc|ga|both] [days] [limit] [sort:clicks|impressions|position]")
}
