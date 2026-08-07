/**
 * verify-links.mjs — Freshness / verification pipeline for Salestools Club
 *
 * Reads lib/data.ts, extracts every tool + its websiteUrl/docsUrl/pricingUrl,
 * checks each URL for availability (HEAD with GET fallback), follows redirects,
 * and writes a machine-readable report that survives in the repo.
 *
 * Usage:
 *   node scripts/verify-links.mjs            # full run, check every URL
 *   node scripts/verify-links.mjs --only-failures   # re-check last run's failures
 *   node scripts/verify-links.mjs --limit 20        # check first 20 tools (dry test)
 *   node scripts/verify-links.mjs --concurrency 10  # default 15
 *
 * Output:
 *   verification/link-report.json   (state file, also used by --only-failures)
 *   Exit code 1 if any new BROKEN/ERROR URLs found this run.
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const DATA_FILE = path.join(ROOT, "lib", "data.ts")
const REPORT_DIR = path.join(ROOT, "verification")
const REPORT_FILE = path.join(REPORT_DIR, "link-report.json")

const TIMEOUT_MS = 12000
const MAX_REDIRECTS = 3
const MAX_TOOLS_FIELD = 60000 // guard: cap report size

const args = process.argv.slice(2)
const ONLY_FAILURES = args.includes("--only-failures")
const LIMIT = (() => {
  const i = args.indexOf("--limit")
  return i >= 0 ? parseInt(args[i + 1], 10) : null
})()
const CONCURRENCY = (() => {
  const i = args.indexOf("--concurrency")
  return i >= 0 ? parseInt(args[i + 1], 10) : 15
})()

/* ------------------------------ data parsing ------------------------------ */

/**
 * Split the `tools` array region into top-level object strings via brace counting.
 * Robust against nested objects (integrations) and single-line minimal entries.
 */
function extractToolObjects() {
  const content = fs.readFileSync(DATA_FILE, "utf8")
  const start = content.indexOf("export const tools")
  const end = content.indexOf("export const categories")
  if (start < 0 || end < 0) throw new Error("Could not find tools/categories exports in lib/data.ts")
  const region = content.slice(content.indexOf("[", start), content.lastIndexOf("]", end) + 1)

  const objects = []
  let depth = 0
  let current = ""
  let inString = false
  let escape = false

  for (let i = 0; i < region.length; i++) {
    const ch = region[i]
    current += ch
    if (inString) {
      if (escape) escape = false
      else if (ch === "\\") escape = true
      else if (ch === '"') inString = false
      continue
    }
    if (ch === '"') { inString = true; continue }
    if (ch === "{") depth++
    else if (ch === "}") {
      depth--
      if (depth === 0) {
        objects.push(current.trim())
        current = ""
      }
    }
  }
  return objects
}

function parseTool(objStr) {
  const get = (key) => {
    const m = objStr.match(new RegExp(`${key}:\\s*["']([^"']*)["']`))
    return m ? m[1] : undefined
  }
  const name = get("name")
  const slug = get("slug")
  // Minimal entries have no docsUrl — skip them.
  const docsUrl = get("docsUrl")
  if (!slug || !docsUrl) return null
  return {
    slug,
    name: name || slug,
    websiteUrl: get("websiteUrl") || "",
    docsUrl,
    pricingUrl: get("pricingUrl") || "",
  }
}

/* ------------------------------ HTTP checking ----------------------------- */

class UrlError extends Error {
  constructor(message, code) {
    super(message)
    this.code = code
  }
}

async function checkWithTimeout(url, method) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method,
      redirect: "manual",
      signal: controller.signal,
      headers: { "User-Agent": "SalestoolsClub-Verify/1.0 (+https://salestools.club)" },
    })
    return res
  } finally {
    clearTimeout(timer)
  }
}

async function checkUrl(url) {
  if (!url) return { status: "SKIP", detail: "no url" }
  let status = null
  let method = "HEAD"
  let redirects = []

  // Try HEAD first, fall back to GET on methods that reject HEAD.
  let res
  try {
    res = await checkWithTimeout(url, method)
  } catch {
    method = "GET"
    try {
      res = await checkWithTimeout(url, method)
    } catch (err) {
      return { status: "ERROR", detail: err.code === "AbortError" ? "timeout" : "network" }
    }
  }

  if (!res || res.status === 405 || res.status === 501 || res.status === 403) {
    // Retry once with GET for servers that reject HEAD.
    try {
      method = "GET"
      res = await checkWithTimeout(url, method)
    } catch (err) {
      return { status: "ERROR", detail: err.code === "AbortError" ? "timeout" : "network" }
    }
  }

  if (!res) return { status: "ERROR", detail: "no response" }

  // Follow redirects (up to MAX_REDIRECTS), reusing the last method.
  let finalUrl = url
  let it = 0
  while ([301, 302, 303, 307, 308].includes(res.status) && it < MAX_REDIRECTS) {
    const loc = res.headers.get("location")
    if (!loc) break
    let next
    try {
      next = new URL(loc, finalUrl).toString()
    } catch {
      break
    }
    redirects.push({ from: finalUrl, to: next })
    finalUrl = next
    try {
      res = await checkWithTimeout(finalUrl, method)
    } catch {
      break
    }
    it++
  }

  status = res.status
  if (status >= 200 && status < 400) {
    return { status: "OK", finalUrl, method, redirects }
  }
  if (status === 404 || status === 410) {
    return { status: "BROKEN", code: status, finalUrl, method, redirects }
  }
  // 403 is usually a bot-block wall (Cloudflare/PerimeterX), not broken content.
  // Report it but don't count it as a hard failure.
  if (status === 403) {
    return { status: "BLOCKED", code: status, finalUrl, method, redirects }
  }
  return { status: "ERROR", code: status, finalUrl, method, redirects }
}

/* -------------------------------- reporting -------------------------------- */

function loadState() {
  if (!fs.existsSync(REPORT_FILE)) return null
  try {
    return JSON.parse(fs.readFileSync(REPORT_FILE, "utf8"))
  } catch {
    return null
  }
}

function saveReport(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true })
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2))
}

function summarize(report) {
  const counts = { OK: 0, BROKEN: 0, ERROR: 0, SKIP: 0, BLOCKED: 0, CHANGED: 0 }
  for (const t of report.tools) {
    counts[t.verdict] = (counts[t.verdict] || 0) + 1
    if (t.changed) counts.CHANGED++
  }
  return counts
}

/* ---------------------------------- main ----------------------------------- */

async function main() {
  const tools = extractToolObjects().map(parseTool).filter(Boolean)
  const prev = loadState()

  let candidates = tools
  if (ONLY_FAILURES && prev) {
    const prevBySlug = new Map(prev.tools.map((t) => [t.slug, t.verdict]))
    candidates = tools.filter((t) => {
      const v = prevBySlug.get(t.slug)
      return v === "BROKEN" || v === "ERROR"
    })
    console.log(`Re-checking ${candidates.length} previously failing tools`)
  }
  if (LIMIT) candidates = candidates.slice(0, LIMIT)

  console.log(`Verifying ${candidates.length} tools (${tools.length} total in data.ts)`)
  console.log(`Concurrency: ${CONCURRENCY}\n`)

  const results = []
  let cursor = 0
  async function worker() {
    while (cursor < candidates.length) {
      const tool = candidates[cursor++]
      const entry = {
        slug: tool.slug,
        name: tool.name,
        checkedAt: new Date().toISOString(),
        urls: {},
      }
      for (const [key, url] of [["website", tool.websiteUrl], ["docs", tool.docsUrl], ["pricing", tool.pricingUrl]]) {
        entry.urls[key] = await checkUrl(url)
      }
      // Overall verdict: worst of the three URL statuses.
      const rank = { OK: 0, SKIP: 1, BLOCKED: 1, BROKEN: 2, ERROR: 3 }
      let verdict = "OK"
      for (const u of Object.values(entry.urls)) {
        if (rank[u.status] > rank[verdict]) verdict = u.status
      }
      entry.verdict = verdict

      // Change detection vs previous state.
      const prevEntry = prev?.tools?.find((p) => p.slug === tool.slug)
      entry.changed = !!prevEntry && prevEntry.verdict !== verdict

      results.push(entry)

      const bad = verdict !== "OK"
      const flag = bad ? "✗" : "✓"
      console.log(`${flag} ${tool.slug.padEnd(32)} ${verdict.padEnd(8)}` +
        `${entry.changed ? " (CHANGED)" : ""}`)
      if (bad) {
        for (const [k, u] of Object.entries(entry.urls)) {
          if (u.status !== "OK") {
            const to = u.finalUrl && u.finalUrl !== tool[k + (k === "website" ? "Url" : "Url")] ? ` -> ${u.finalUrl}` : ""
            console.log(`     ${k.padEnd(8)} ${u.status} ${u.code ?? ""} ${to}`)
          }
        }
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, worker)
  await Promise.all(workers)

  const report = {
    generatedAt: new Date().toISOString(),
    totalTools: tools.length,
    checkedTools: results.length,
    verdict: "clean",
    tools: results,
  }

  const counts = summarize(report)
  report.counts = counts
  report.verdict = counts.BROKEN + counts.ERROR > 0 ? "issues_found" : "clean"
  report.failedSlugs = results.filter((t) => t.verdict !== "OK").map((t) => t.slug)
  report.changedSlugs = results.filter((t) => t.changed).map((t) => t.slug)

  saveReport(report)

  console.log(`\nDone.`)
  console.log(`  OK:        ${counts.OK}`)
  console.log(`  BROKEN:    ${counts.BROKEN}`)
  console.log(`  ERROR:     ${counts.ERROR}`)
  console.log(`  BLOCKED:   ${counts.BLOCKED}`)
  console.log(`  CHANGED:   ${counts.CHANGED}`)
  console.log(`Report: verification/link-report.json`)

  if (counts.BROKEN + counts.ERROR > 0) {
    console.log("\nFailing tools:")
    for (const t of results) {
      if (t.verdict !== "OK") console.log(`  - ${t.slug} (${t.name}) [${t.verdict}]`)
    }
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error("Fatal:", err)
  process.exit(1)
})
