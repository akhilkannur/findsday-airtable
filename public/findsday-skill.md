# Findsday — Sales API & MCP Directory

## What this skill does

This skill lets you search and discover sales tools with APIs and MCP servers directly from your coding environment. Instead of browsing websites or guessing which sales tools have APIs, you can query the Findsday directory to find CRMs, prospecting tools, enrichment services, email outreach platforms, and more — complete with API docs, auth methods, SDKs, and agent integrations.

## When to use this skill

- When you need to find a sales API (CRM, prospecting, enrichment, email, scheduling, etc.)
- When you want to know if a sales tool has an MCP server
- When you need API docs, SDKs, or auth details for a sales tool
- When looking for alternatives to expensive sales tools like Salesforce, Outreach, ZoomInfo
- When building AI sales workflows and need to find the right APIs to connect

## How to use

All endpoints are public and require no authentication. The base URL is `https://findsday.com/api`.

### Find tools by category

```bash
curl "https://findsday.com/api/tools?category=CRM"
```

### Search for a specific tool

```bash
curl "https://findsday.com/api/tools?q=hubspot"
```

### Find tools with MCP servers

```bash
curl "https://findsday.com/api/tools?mcp=true"
```

### Find tools with agent integrations (MCP, LangChain, OpenClaw, etc.)

```bash
curl "https://findsday.com/api/tools?integrations=true"
```

### Find featured tools

```bash
curl "https://findsday.com/api/tools?featured=true"
```

### Find tools with free tiers

```bash
curl "https://findsday.com/api/tools?free=true"
```

### Get full details for a specific tool

```bash
curl "https://findsday.com/api/tools/apollo"
```

### List all categories

```bash
curl "https://findsday.com/api/categories"
```

### Combine filters

```bash
curl "https://findsday.com/api/tools?category=CRM&free=true"
curl "https://findsday.com/api/tools?category=Enrichment&mcp=true"
```

## Response format

Each tool in the response includes:

| Field | Description |
|---|---|
| `slug` | URL-friendly identifier (use with `/api/tools/{slug}`) |
| `name` | Display name |
| `oneLiner` | Short description |
| `description` | Full description |
| `category` | Category (CRM, Enrichment, etc.) |
| `websiteUrl` | Product website |
| `docsUrl` | API documentation URL |
| `pricingUrl` | Pricing page |
| `githubUrl` | GitHub repository (if open source) |
| `apiType` | REST, GraphQL, etc. |
| `authMethod` | OAuth2, API Key, etc. |
| `hasFreeTier` | Whether a free plan is available |
| `sdkLanguages` | Available SDK languages |
| `hasWebhooks` | Whether webhooks are supported |
| `hasOpenApiSpec` | Whether an OpenAPI spec exists |
| `openApiSpecUrl` | URL to the OpenAPI spec |
| `integrations` | Array of `{platform, url, label}` — MCP servers, OpenClaw skills, LangChain tools, etc. |
| `alternativeTo` | Tools this replaces (e.g., "Salesforce", "ZoomInfo") |

## Available categories

Prospecting, Email Outreach, CRM, Enrichment, Voice & Calling, Scheduling, Conversation Intelligence, Documents & Proposals, Sales Engagement, Workflow Automation

## Example workflow

**Scenario:** You need to build an AI agent that enriches leads and sends cold emails.

1. Find enrichment APIs:
   ```bash
   curl "https://findsday.com/api/tools?category=Enrichment"
   ```

2. Find email outreach APIs:
   ```bash
   curl "https://findsday.com/api/tools?category=Email%20Outreach"
   ```

3. Get details on a specific enrichment tool:
   ```bash
   curl "https://findsday.com/api/tools/people-data-labs"
   ```

4. Check the `integrations` field in the response — if it has an MCP server, you can connect it directly to Claude without writing any glue code.

5. Check `docsUrl` for the API reference, `authMethod` to know how to authenticate, and `sdkLanguages` to pick the right SDK.

**Scenario:** You want to replace Salesforce with something that has a free tier and an MCP server.

```bash
curl "https://findsday.com/api/tools?category=CRM&free=true"
```

Then check each result's `alternativeTo` field to find CRMs that position themselves as Salesforce alternatives, and the `integrations` field for MCP server availability.

## Tips

- Use `?free=true` to find tools you can start with immediately — no credit card required
- Use `?mcp=true` to find tools that work natively with Claude and other MCP-compatible agents
- Check the `integrations` field for MCP servers, OpenClaw skills, and LangChain tools
- The `alternativeTo` field shows what expensive tool each API replaces
- The `docsUrl` field links directly to API documentation — pass it to your agent for implementation help
- Combine `?q=` with category or feature filters to narrow results fast
- Use `openApiSpecUrl` to auto-generate API clients in any language

## Directory website

Browse the full directory at: https://findsday.com
