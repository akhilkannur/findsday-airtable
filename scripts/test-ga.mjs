import { google } from "googleapis"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const KEY_FILE = path.join(ROOT, "indexing-key.json")

async function main() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error("❌ indexing-key.json not found")
    return
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: [
      "https://www.googleapis.com/auth/analytics.readonly",
    ],
  })

  const admin = google.analyticsadmin("v1alpha")
  google.options({ auth })

  try {
    console.log("Fetching Analytics Properties...")
    // List all accounts accessible
    const accountsRes = await admin.accounts.list()
    const accounts = accountsRes.data.accounts || []
    
    if (accounts.length === 0) {
      console.log("No Analytics accounts found for this service account.")
      console.log("💡 Hint: Add 'salestools-indexing@findsday-discover.iam.gserviceaccount.com' as a user in your GA4 property.")
      return
    }

    const analyticsData = google.analyticsdata("v1beta")

    for (const account of accounts) {
      console.log(`\nAccount: ${account.displayName} (${account.name})`)
      
      const propsRes = await admin.properties.list({
        filter: `parent:${account.name}`
      })
      const properties = propsRes.data.properties || []
      
      if (properties.length === 0) {
        console.log("  No GA4 properties found in this account.")
        continue
      }

      for (const prop of properties) {
        const propertyId = prop.name.split("/")[1]
        console.log(`- Property: ${prop.displayName} (ID: ${propertyId})`)
        
        try {
          const dataRes = await analyticsData.properties.runReport({
            property: `properties/${propertyId}`,
            requestBody: {
              dateRanges: [{ startDate: "7daysAgo", endDate: "yesterday" }],
              metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
              dimensions: [{ name: "pagePath" }],
              limit: 5
            }
          })

          if (dataRes.data.rows) {
            console.log("\n  Top Pages (Last 7 Days):")
            dataRes.data.rows.forEach(row => {
              console.log(`  - ${row.dimensionValues[0].value}: ${row.metricValues[0].value} users, ${row.metricValues[1].value} views`)
            })
          } else {
            console.log("  No traffic data found.")
          }
        } catch (dataErr) {
          console.error(`  ❌ Error fetching report: ${dataErr.message}`)
        }
      }
    }

  } catch (err) {
    console.error("❌ Error:", err.message)
    if (err.message.includes("403")) {
      console.log("\n💡 Hint: Ensure the service account has been added as a user in Analytics for the property.")
    }
  }
}

main()
