---
name: add-sales-tool
description: Research and add a sales tool (API/MCP) to the directory. Use when adding a new tool from a URL or from the 'agent-reference/pure_salestech.csv' list. Only adds tools that have an API or MCP server.
---

# Add Sales Tool Skill

## Overview
This skill automates the process of researching a sales tool and adding it to the project's data store (`lib/data.ts`). It ensures the tool meets the "AI-Native Operator" criteria (API/MCP presence) and formats it according to the `SalesTool` schema.

## Workflow

### 0. Resume Check
Before starting, check `PROGRESS.md` in the root directory to find where the last session ended. Always skip tools that have "Added to directory" or "No public API found" in the `Research Notes` column of `pure_salestech.csv`.

### 1. Identify Tool
The tool can be identified by name (searched in `agent-reference/pure_salestech.csv`) or by a direct URL. Start Batch processing from the line indicated in `PROGRESS.md`.

### 2. Research Tool
Run the research script to scrape the tool's website and documentation:
```bash
python scripts/research_tool.py <website_url>
```
*Wait for it to save results to `research_result.md`.*

### 3. Analyze & Validate
Read `research_result.md` and check for:
- **API Availability:** Does it have a REST/GraphQL API?
- **MCP Support:** Does it have an official or community MCP server?
- **Agent Readiness:** Can an AI agent (like Claude) use it easily?

*If no API/MCP is found, inform the user and stop.*

### 4. Format & Commit
- Generate a `slug` (kebab-case).
- Extract description, `aiCapabilities`, `starterPrompt`, and `integrations` (especially `mcpConfig` if available).
- Reference the schema in `references/lib-data-schema.md`.
- Use the `replace` tool to add the new tool object to `lib/data.ts` inside the `tools` array.

## Guidelines
- **No AI Slop:** Descriptions should be human, direct, and conversational. Avoid words like "unleash," "leverage," or "comprehensive."
- **Logo Placeholders:** If a logo URL isn't obvious, use `/logos/[slug].svg` and inform the user it needs to be added to `public/logos/`.
- **Integrations:** Prioritize MCP integrations. If an MCP server exists, set `mcpReady: true`.

## Resources
- [lib-data-schema.md](references/lib-data-schema.md): Schema reference for the `SalesTool` type.
- `scripts/research_tool.py`: Research script in the root directory.
- `agent-reference/pure_salestech.csv`: Master list of potential tools.
