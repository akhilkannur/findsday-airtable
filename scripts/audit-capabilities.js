import { tools } from "./lib/data"

function auditCapabilities() {
  const caps = {}
  tools.forEach(t => {
    if ("aiCapabilities" in t) {
      t.aiCapabilities.forEach(c => {
        caps[c] = (caps[c] || 0) + 1
      })
    }
  })

  const sorted = Object.entries(caps).sort((a, b) => b[1] - a[1])
  console.log("Total unique capabilities:", sorted.length)
  console.log("
Top 20 Capabilities:")
  sorted.slice(0, 20).forEach(([name, count]) => {
    console.log(`${name}: ${count} tools`)
  })

  const thin = sorted.filter(([name, count]) => count < 3)
  console.log(`
Thin Capabilities (less than 3 tools): ${thin.length}`)
  thin.slice(0, 10).forEach(([name, count]) => {
    console.log(`${name}: ${count} tools`)
  })
}

auditCapabilities()
