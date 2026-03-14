# Salestools MCP Server

Search sales tools, APIs, and MCP servers directly from Claude Code or other AI agents.

## What is this?

An MCP (Model Context Protocol) server that lets your AI agent search the Salestools Club directory without leaving your workflow.

## Setup

Add this to your Claude Code or AI agent config:

```json
{
  "mcpServers": {
    "salestools": {
      "command": "npx",
      "args": ["-y", "@salestoolsclub/mcp"]
    }
  }
}
```

Or for local development:

```json
{
  "mcpServers": {
    "salestools": {
      "command": "npx",
      "args": ["-y", "@salestoolsclub/mcp"],
      "env": {
        "SALESTOOLS_BASE_URL": "http://localhost:3000"
      }
    }
  }
}
```

## Usage

Just tell Claude what you need:

> "Find me enrichment APIs for my project"
> "What cold email tools work with HubSpot?"
> "Search for free CRM tools"

Claude will search the directory and return relevant tools with links to their docs.

## Filtering Options

You can narrow down results using these parameters:

- **mcpReady** (boolean): Only return tools with official MCP server support
- **hasFreeTier** (boolean): Only return tools with a free tier
- **category** (string): Filter by category - `enrichment`, `outreach`, `dialers`, `crm`, `data`
- **limit** (number): Maximum results to return (default: 20)

Example queries:

> "Find MCP-ready enrichment tools" (sets mcpReady: true)
> "Show me free outreach tools" (sets hasFreeTier: true)
> "Find enrichment APIs, limit 5" (sets category: enrichment, limit: 5)

## Example Response

```
Found 2 tools (MCP-ready only):

## Enrichment

### Clay
The universal data enrichment and outbound orchestration platform.
*MCP Ready | Free Tier*
→ https://salestools.club/apis/clay
📄 Docs: https://docs.clay.com

### BetterContact
Waterfall contact enrichment API with 15+ data sources.
*MCP Ready*
→ https://salestools.club/apis/better-contact
📄 Docs: https://docs.bettercontact.com
```

## Requirements

- Node.js 18+
- Claude Code or any MCP-compatible AI assistant
