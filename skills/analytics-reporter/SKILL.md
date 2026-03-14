---
name: analytics-reporter
description: Fetches live traffic and search performance reports from Google Search Console (GSC) and Google Analytics 4 (GA4). Use when the user asks for "performance", "clicks", "views", or "how the site is doing" for salestools.club.
---

# Analytics Reporter

This skill allows the Gemini CLI to fetch and summarize performance data for the `salestools.club` domain.

## When to use

- To check search performance (clicks, impressions, top queries) from GSC.
- To check traffic data (active users, top pages) from GA4.
- When the user asks for a summary of "how the site is doing" in terms of growth or reach.

## Prerequisites

- `indexing-key.json` must exist in the project root with the service account `salestools-indexing@findsday-discover.iam.gserviceaccount.com`.
- The service account must have **Viewer** permissions in both GSC and GA4 for the property.
- Google Search Console API and Google Analytics Data API must be enabled in the Google Cloud Project.

## Workflows

### 1. Get Search Performance (GSC)

Fetch top queries for the last 7 days (or a custom period).

```bash
node skills/analytics-reporter/scripts/fetch-reports.mjs gsc 7
```

### 2. Get Traffic Report (GA4)

Fetch top pages and active user counts for the last 7 days.

```bash
node skills/analytics-reporter/scripts/fetch-reports.mjs ga 7
```

### 3. Get Combined Report

Fetch both GSC and GA4 data in a single output.

```bash
node skills/analytics-reporter/scripts/fetch-reports.mjs both 7
```

## Reference

- Service Account: `salestools-indexing@findsday-discover.iam.gserviceaccount.com`
- Property ID (GA4): `525140420`
- GSC Property: `https://salestools.club/`
