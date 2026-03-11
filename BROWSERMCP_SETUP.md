# BrowserMCP Setup for OpenCode

## Current Config (opencode.json)
```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "browsermcp": {
      "type": "local",
      "command": ["npx", "-y", "@browsermcp/mcp"],
      "enabled": true
    }
  }
}
```

## How It Works
1. OpenCode starts browsermcp as a local MCP server automatically
2. Chrome extension connects via WebSocket to port 9009
3. Available tools:
   - `browser_snapshot` - Get current page URL, title, and accessibility snapshot
   - `browser_navigate` - Navigate to a URL
   - `browser_click`, `browser_type`, etc.

## To Get Current Tab URL
Use the `browser_snapshot` tool - it returns the current page URL in its response.

## Notes
- The MCP server runs via stdio, not network WS
- Chrome extension connects to localhost:9009
- No extra lsof/kill fakes needed when run via opencode
