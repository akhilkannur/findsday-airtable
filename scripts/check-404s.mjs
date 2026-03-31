import https from "https"

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

async function checkUrl(url) {
  return new Promise((resolve) => {
    const options = {
      method: "HEAD",
      timeout: 5000,
    }
    const req = https.request(url, options, (res) => {
      resolve({ url, status: res.statusCode })
    })
    req.on("error", () => {
      resolve({ url, status: "ERROR" })
    })
    req.on("timeout", () => {
      req.destroy()
      resolve({ url, status: "TIMEOUT" })
    })
    req.end()
  })
}

async function main() {
  const urls = await fetchSitemap()
  console.log(`Checking ${urls.length} URLs for 404s...
`)

  const results = []
  const batchSize = 20
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map(checkUrl))
    results.push(...batchResults)
    
    const errors = batchResults.filter(r => r.status !== 200 && r.status !== 301 && r.status !== 308)
    errors.forEach(err => console.log(`${err.status}: ${err.url}`))
    
    process.stdout.write(`.`)
    if ((i + batchSize) % (batchSize * 10) === 0) console.log(` (${i + batchSize}/${urls.length})`)
  }

  const deadLinks = results.filter(r => r.status === 404)
  const otherErrors = results.filter(r => r.status !== 200 && r.status !== 404 && r.status !== 301 && r.status !== 308)

  console.log(`

Scan complete.`)
  console.log(`404 Errors: ${deadLinks.length}`)
  deadLinks.forEach(dl => console.log(`- ${dl.url}`))
  
  if (otherErrors.length > 0) {
    console.log(`
Other Errors: ${otherErrors.length}`)
    otherErrors.forEach(oe => console.log(`- ${oe.status}: ${oe.url}`))
  }
}

main().catch(console.error)
