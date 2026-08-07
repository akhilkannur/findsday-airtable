/**
 * verify-linkup.mjs — Linkup-powered deep re-verification of URL failures.
 *
 * Stage 2 of the freshness pipeline. Stage 1 (verify-links.mjs) is a free
 * HTTP status check over all tools. This stage takes ONLY the failures and
 * re-checks each URL with Linkup Fetch, which renders JavaScript and returns
 * real page content. This separates:
 *   - truly dead pages (Linkup also fails / no content)
 *   - client-side-rendered SPAs that plain HTTP misread as broken (Linkup OK)
 *   - bot-blocked pages that are actually alive (Linkup OK, content found)
 *
 * Cost: $0.001/call (no JS) — only run on failures, not the full corpus.
 *
 * Usage:
 *   node scripts/verify-linkup.mjs                # deep-check all current failures
 *   node scripts/verify-linkup.mjs --only [slug]  # deep-check one tool
 *   node scripts/verify-linkup.mjs --render-js    # use JS rendering ($0.005/call)
 *
 * Requires LINKUP_API_KEY in .env.local
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const REPORT_FILE = path.join(ROOT, "verification", "link-report.json")
const DEEP_REPORT = path.join(ROOT, "verification", "linkup-report.json")

// Minimal .env.local reader — no dotenv dependency (keeps install light).
function loadEnv(file) {
  if (!fs.existsSync(file)) return {}
  const out = {}
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "")
  }
  return out
}

const env = loadEnv(path.join(ROOT, ".env.local"))
const API_KEY = env.LINKUP_API_KEY
const BASE = "https://api.linkup.so/v1/fetch"

const args = process.argv.slice(2)
const RENDER_JS = args.includes("--render-js")
const ONLY = (() => {
  const i = args.indexOf("--only")
  return i >= 0 ? args[i + 1] : null
})()

async function linkupFetch(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 30000)
  try {
    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, renderJs: RENDER_JS }),
      signal: controller.signal,
    })
    const json = await res.json()
    if (!res.ok) {
      return { ok: false, http: res.status, error: json?.error || json?.message || `HTTP ${res.status}` }
    }
    return { ok: true, markdown: json?.markdown || "" }
  } catch (err) {
    return { ok: false, error: err.code === "AbortError" ? "timeout" : "network" }
  } finally {
    clearTimeout(timer)
  }
}

// Heuristic: is the fetched content meaningful, or a 404/error shell?
function evaluateContent(md) {
  if (!md) return { content: "EMPTY", alive: false }
  const lower = md.toLowerCase()
  const errorSignals = ["404", "page not found", "not found", "error 404", "the page you requested", "does not exist", "404 error"]
  const hits = errorSignals.filter((s) => lower.includes(s))
  // Only trust error signals if page is short (a real 404 page is mostly boilerplate)
  if (md.length < 600 && hits.length > 0) {
    return { content: "NOT_FOUND", alive: false, signals: hits }
  }
  return { content: "REAL", alive: true, words: md.split(/\s+/).length }
}

async function main() {
  if (!API_KEY) {
    console.error("LINKUP_API_KEY not set in .env.local")
    process.exit(1)
  }  const report = JSON.parse(fs.readFileSync(REPORT_FILE, "utf8"))

  let failing = report.tools.filter((t) => t.verdict === "BROKEN" || t.verdict === "ERROR")
  if (ONLY) failing = failing.filter((t) => t.slug === ONLY)
  console.log(`Deep-checking ${failing.length} failing tools via Linkup Fetch${RENDER_JS ? " (JS)" : ""}`)
  console.log(`Cost est: ${(failing.length * (RENDER_JS ? 0.005 : 0.001)).toFixed(3)} USD (1 URL each, docs)\n`)

  const results = []
  for (const tool of failing) {
    const docUrl = tool.urls.docs?.finalUrl || tool.urls.docs
    const entry = {
      slug: tool.slug,
      name: tool.name,
      checkedAt: new Date().toISOString(),
      httpVerdict: tool.verdict,
      url: typeof docUrl === "string" ? docUrl : (tool.urls.docs && tool.urls.docs.finalUrl) || tool.urls.website?.finalUrl || "",
    }
    // Deep-check the docs URL (most important), fall back to website.
    const urlsToCheck = []
    if (tool.urls.docs && typeof tool.urls.docs.finalUrl === "string") urlsToCheck.push(["docs", tool.urls.docs.finalUrl])
    if (tool.urls.website && typeof tool.urls.website.finalUrl === "string") urlsToCheck.push(["website", tool.urls.website.finalUrl])

    if (urlsToCheck.length === 0) {
      entry.verdict = "UNVERIFIABLE"
      entry.detail = "no URL to deep-check"
      results.push(entry)
      console.log(`? ${tool.slug.padEnd(32)} UNVERIFIABLE`)
      continue
    }

    const checks = []
    for (const [key, url] of urlsToCheck) {
      const r = await linkupFetch(url)
      if (r.ok) {
        const ev = evaluateContent(r.markdown)
        checks.push({ url, key, fetchOk: true, ...ev })
      } else {
        checks.push({ url, key, fetchOk: false, error: r.error })
      }
    }

    // A tool is ALIVE if any deep-checked URL returned real content.
    const alive = checks.some((c) => c.fetchOk && c.alive)
    entry.checks = checks
    entry.verdict = alive ? "ALIVE" : "DEAD"
    if (!alive) {
      entry.reason = checks.map((c) => (c.fetchOk ? `no content (${c.content})` : `fetch error (${c.error})`)).join("; ")
    }
    results.push(entry)
    console.log(`${alive ? "✓" : "✗"} ${tool.slug.padEnd(32)} ${alive ? "ALIVE" : "DEAD"} ${alive ? "" : "- " + entry.reason}`)
  }

  const dead = results.filter((r) => r.verdict === "DEAD")
  const alive = results.filter((r) => r.verdict === "ALIVE")
  const unverifiable = results.filter((r) => r.verdict === "UNVERIFIABLE")

  const out = {
    generatedAt: new Date().toISOString(),
    renderJs: RENDER_JS,
    total: results.length,
    alive, dead, unverifiable,
    deadSlugs: dead.map((d) => d.slug),
    aliveSlugs: alive.map((a) => a.slug),
  }
  fs.mkdirSync(path.dirname(DEEP_REPORT), { recursive: true })
  fs.writeFileSync(DEEP_REPORT, JSON.stringify(out, null, 2))

  console.log(`\nDone.`)
  console.log(`  ALIVE (bot-block/SPA false positive): ${alive.length}`)
  console.log(`  DEAD (confirmed):                     ${dead.length}`)
  console.log(`  UNVERIFIABLE:                         ${unverifiable.length}`)
  console.log(`Report: verification/linkup-report.json`)
}

main().catch((err) => {
  console.error("Fatal:", err)
  process.exit(1)
})
