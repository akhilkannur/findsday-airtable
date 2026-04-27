import { google } from "googleapis"
import fs from "fs"
import path from "path"

const KEY_FILE = "indexing-key.json"

async function getAuth() {
  return new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  })
}

async function getPageQueries(pageUrl) {
  const auth = await getAuth()
  const searchconsole = google.searchconsole({ version: "v1", auth })
  const siteUrl = "https://salestools.club/"

  const today = new Date()
  const startDate = new Date()
  startDate.setDate(today.getDate() - 30)
  
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: startDate.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
      dimensions: ["query"],
      dimensionFilterGroups: [
        {
          filters: [
            {
              dimension: "page",
              operator: "equals",
              expression: siteUrl.replace(/\/$/, '') + pageUrl
            }
          ]
        }
      ],
      rowLimit: 10,
      dataState: "all"
    }
  })

  return res.data.rows || []
}

async function main() {
  const pages = [
    "/apis/suitecrm",
    "/tools/nooks",
    "/apis/vainu",
    "/apis/a-leads",
    "/tools/hockeystack",
    "/apis/loopio"
  ]

  for (const page of pages) {
    console.log(`\n### Queries for ${page}:`)
    const queries = await getPageQueries(page)
    console.log("| Query | Clicks | Impressions | CTR | Position |")
    console.log("| :--- | :--- | :--- | :--- | :--- |")
    queries.forEach(q => {
      console.log(`| ${q.keys[0]} | ${q.clicks} | ${q.impressions} | ${(q.ctr * 100).toFixed(1)}% | ${q.position.toFixed(1)} |`)
    })
  }
}

main().catch(console.error)
