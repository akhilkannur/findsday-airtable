#!/usr/bin/env node

/**
 * Google Indexing API — Submit URLs for faster crawling
 * 
 * Setup:
 *   1. Place your service account JSON key as `indexing-key.json` in the project root
 *   2. Run: node cli/submit-indexing.js
 * 
 * Options:
 *   --url <url>       Submit a single URL
 *   --all             Submit all pages from sitemap data
 *   --status <url>    Check indexing status of a URL
 */

const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')

const KEY_PATH = path.join(__dirname, '..', 'indexing-key.json')
const LOG_PATH = path.join(__dirname, '..', '.indexing-submitted.json')
const BASE_URL = 'https://salestools.club'

function loadSubmitted() {
  try { return JSON.parse(fs.readFileSync(LOG_PATH, 'utf8')) } catch { return {} }
}

function saveSubmitted(log) {
  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2))
}

// ── Load credentials ──────────────────────────────────────────────
function getAuth() {
  if (!fs.existsSync(KEY_PATH)) {
    console.error('❌ Missing indexing-key.json in project root.')
    console.error('   Download it from Google Cloud Console → Service Accounts → Keys')
    process.exit(1)
  }
  const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'))
  return new google.auth.GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  })
}

// ── Submit a URL ──────────────────────────────────────────────────
async function submitUrl(auth, url, type = 'URL_UPDATED') {
  const indexer = google.indexing({ version: 'v3', auth })
  try {
    const res = await indexer.urlNotifications.publish({
      requestBody: { url, type },
    })
    console.log(`✅ ${url}`)
    return true
  } catch (err) {
    console.error(`❌ ${url} → ${err.message}`)
    return false
  }
}

// ── Check status ──────────────────────────────────────────────────
async function checkStatus(auth, url) {
  const indexer = google.indexing({ version: 'v3', auth })
  try {
    const res = await indexer.urlNotifications.getMetadata({
      url,
    })
    console.log(`\n📊 Status for ${url}:`)
    console.log(`   Last updated: ${res.data.latestUpdate?.notifyTime || 'Never'}`)
    console.log(`   Type: ${res.data.latestUpdate?.type || 'N/A'}`)
    if (res.data.latestRemove) {
      console.log(`   Last removal: ${res.data.latestRemove.notifyTime}`)
    }
  } catch (err) {
    console.error(`❌ Could not check ${url} → ${err.message}`)
  }
}

// ── Collect all site URLs ─────────────────────────────────────────
function getAllUrls() {
  const urls = [
    // Static pages
    `${BASE_URL}/`,
    `${BASE_URL}/api`,
    `${BASE_URL}/mcp`,
    `${BASE_URL}/skills`,
    `${BASE_URL}/categories`,
    `${BASE_URL}/stacks`,
    `${BASE_URL}/open-source`,
    `${BASE_URL}/for`,
    `${BASE_URL}/vs`,
    `${BASE_URL}/about`,
    `${BASE_URL}/submit`,
    `${BASE_URL}/free-sales-apis`,
    `${BASE_URL}/directory-builder`,
    `${BASE_URL}/monitoring`,
  ]

  // Dynamic tool pages (APIs)
  try {
    const dataContent = fs.readFileSync(path.join(__dirname, '..', 'lib/data.ts'), 'utf8')
    const toolRegex = /slug:\s*["']([^"']+)["']/g
    let match
    while ((match = toolRegex.exec(dataContent)) !== null) {
      urls.push(`${BASE_URL}/apis/${match[1]}`)
    }
  } catch (e) {
    console.warn('⚠️  Could not load tools from lib/data.ts')
  }

  // Dynamic category pages
  try {
    const dataContent = fs.readFileSync(path.join(__dirname, '..', 'lib/data.ts'), 'utf8')
    const catRegex = /slug:\s*["']([^"']+)["']/g
    // This is simple but might catch too much; fine for indexing
    let match
    while ((match = catRegex.exec(dataContent)) !== null) {
      if (!urls.includes(`${BASE_URL}/categories/${match[1]}`)) {
         // This is a bit naive since it mixes tools and categories, 
         // but categories are usually at the end of the file.
      }
    }
  } catch (e) {}

  // Dynamic use-case pages (For)
  try {
    const usecases = require('../lib/usecases')
    const slugs = typeof usecases.getUseCaseSlugs === 'function' ? usecases.getUseCaseSlugs() : []
    for (const slug of slugs) {
      urls.push(`${BASE_URL}/for/${slug}`)
    }
  } catch (e) {}

  // Dynamic capability pages
  try {
    const { getAllCapabilities } = require('../lib/tools')
    const caps = getAllCapabilities()
    for (const cap of caps) {
      const slug = cap.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      urls.push(`${BASE_URL}/capability/${slug}`)
    }
  } catch (e) {}

  // Priority Comparison Pages (from INDEXING_NOTES.md context)
  const comparisons = [
    'cliengo-vs-drift',
    'intercom-vs-rep-ai',
    'cliengo-vs-intercom'
  ]
  for (const comp of comparisons) {
    urls.push(`${BASE_URL}/vs/${comp}`)
  }

  return [...new Set(urls)]
}

// ── Main ──────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2)
  const auth = getAuth()

  // Single URL status check
  if (args[0] === '--status') {
    const url = args[1]
    if (!url) { console.error('Usage: --status <url>'); process.exit(1) }
    await checkStatus(auth, url)
    return
  }

  // Single URL submission
  if (args[0] === '--url') {
    const url = args[1]
    if (!url) { console.error('Usage: --url <url>'); process.exit(1) }
    await submitUrl(auth, url)
    return
  }

  // Submit all URLs
  if (args[0] === '--all') {
    const force = args.includes('--force')
    const urls = getAllUrls()
    const log = loadSubmitted()
    const today = new Date().toISOString().split('T')[0]

    const pending = force ? urls : urls.filter(u => log[u] !== today)
    console.log(`\n📡 ${urls.length} total URLs, ${urls.length - pending.length} already submitted today, ${pending.length} remaining\n`)
    console.log(`⚠️  Daily quota: 200 requests. ${pending.length > 200 ? 'Will submit first 200.' : ''}\n`)

    const batch = pending.slice(0, 200)
    let success = 0
    let failed = 0

    for (const url of batch) {
      const ok = await submitUrl(auth, url)
      if (ok) { success++; log[url] = today }
      else failed++
      await new Promise(r => setTimeout(r, 100))
    }

    saveSubmitted(log)
    console.log(`\n📊 Done: ${success} submitted, ${failed} failed, ${pending.length - batch.length} remaining for next run`)
    return
  }

  // Default: show help
  console.log(`
Google Indexing API — Salestools Club

Usage:
  node cli/submit-indexing.js --all              Submit all site pages (up to 200/day)
  node cli/submit-indexing.js --url <url>        Submit a single URL
  node cli/submit-indexing.js --status <url>     Check indexing status of a URL

Examples:
  node cli/submit-indexing.js --all
  node cli/submit-indexing.js --url https://salestools.club/apis/apollo
  node cli/submit-indexing.js --status https://salestools.club/api
  `)
}

main().catch(console.error)
