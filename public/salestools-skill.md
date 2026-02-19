# Salestools Club — GTM Lego Blocks Registry

## What this skill does

This skill lets you search and discover GTM infrastructure (APIs, MCP servers, and SDKs) directly from your coding environment. Instead of browsing websites or guessing which sales tools have APIs, you can query the Salestools Club directory to find CRMs, prospecting tools, enrichment services, email outreach platforms, and more — complete with API docs, auth methods, SDKs, and agent integrations.

## When to use this skill

- When you need to find a sales API (CRM, prospecting, enrichment, email, scheduling, etc.)
- When you want to know if a sales tool has an MCP server
- When you need API docs, SDKs, or auth details for a sales tool
- When building AI sales workflows and need to find the right APIs to connect

## How to use

All endpoints are public and require no authentication. The base URL is `https://salestools.club/api`.

### Find tools by category

```bash
curl "https://salestools.club/api/tools?category=CRM"
```

### Search for a specific tool

```bash
curl "https://salestools.club/api/tools?q=hubspot"
```

### Find tools with MCP servers

```bash
curl "https://salestools.club/api/tools?mcp=true"
```

### Get full details for a specific tool

```bash
curl "https://salestools.club/api/tools/apollo"
```

## Available categories

Prospecting, Email Outreach, CRM, Enrichment, Voice & Calling, Scheduling, Conversation Intelligence, Documents & Proposals, Sales Engagement, Workflow Automation

## Directory website

Browse the full directory at: https://salestools.club
