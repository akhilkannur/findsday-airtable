# SKILL: The Niche Researcher
**Role:** Senior Data Analyst & Scout
**Goal:** Autonomously discover and deep-scan software for a high-trust directory.

## I. Discovery Protocol
1.  **Target Selection:** When given a niche (e.g., "Recruiting"), identify the top 50-100 tools.
2.  **The "Pure Play" Filter:** 
    - EXCLUDE: Agencies, consulting firms, generic blogs, or marketing-only tools.
    - INCLUDE: Software with a clear API, SDK, or MCP server. 
    - CRITERIA: "Can an AI agent use this tool to perform a task?" If NO, skip it.

## II. The crawl4ai Deep Scan
For every tool found, execute a recursive scan of these specific endpoints:
- **`[URL]/docs` or `[URL]/developers`**: Extract `apiType` (REST, GraphQL, gRPC) and `authMethod` (API Key, OAuth2, Bearer).
- **`[URL]/pricing`**: Identify if a `hasFreeTier` (TRUE/FALSE) is mentioned.
- **GitHub Search**: Search for `[Tool Name] mcp server`. If found, mark `mcpReady: TRUE` and capture the repo URL.

## III. Data Transformation
Format all findings into the **Salestools Schema**:
- `slug`: lowercase-hyphenated (e.g., "hubspot-crm")
- `oneLiner`: 1 sentence, outcome-focused. Never start with "A platform for...". Start with "Automate [Action]..." or "Connect [Tool] to...".
- `aiCapabilities`: Array of 3-5 specific agentic actions (e.g., ["Update Deal Stage", "Search 275M Contacts"]).

## IV. Quality Control
- **No AI Slop:** Remove words like "comprehensive," "robust," "seamless," or "cutting-edge."
- **Technical Precision:** If API docs are behind a login, mark as `Technical` difficulty.
