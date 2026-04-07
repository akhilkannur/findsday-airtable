#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const BASE_URL = process.env.SALESTOOLS_BASE_URL || "https://salestools.club";

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may',
  'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'to', 'of', 'in',
  'for', 'on', 'with', 'at', 'by', 'from', 'up', 'about', 'into', 'over', 'after',
  'under', 'above', 'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you',
  'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her',
  'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
  'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am',
  'been', 'being', 'having', 'doing',
  "i'm", "you're", "he's", "she's", "it's", "we're", "they're", "i've",
  "you've", "we've", "they've", "i'd", "you'd", "he'd", "she'd", "we'd", "they'd",
  "i'll", "you'll", "he'll", "she'll", "we'll", "they'll", "isn't", "aren't", "wasn't",
  "weren't", "hasn't", "haven't", "hadn't", "doesn't", "don't", "didn't", "won't",
  "wouldn't", "shan't", "shouldn't", "can't", "cannot", "couldn't", "mustn't", "let's",
  'us', 'say', 'said', 'also', 'just', 'like', 'get', 'got', 'find', 'finding',
  'search', 'searching', 'looking', 'need', 'needs', 'wants', 'want', 'best', 'good', 'top',
  'free', 'cheap', 'affordable', 'use', 'using', 'used', 'make', 'making', 'build', 'building',
  'project', 'their', 'show', 'showme', 'list', 'all', 'some', 'any', 'no',
  'not', 'only', 'very', 'really', 'most', 'many', 'much', 'such', 'other', 'another',
  'work', 'works', 'working', 'vs', 'versus', 'alternative', 'alternatives', 'compare',
]);

function extractKeywords(query) {
  return query
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word));
}

async function fetchJSON(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`API error: ${response.status} ${response.statusText}`);
  return response.json();
}

// ── Tool handlers ──────────────────────────────────────────────

async function handleSearch(args) {
  const { query, mcpReady, hasFreeTier, category, limit = 20 } = args;
  const keywords = extractKeywords(query);
  if (keywords.length === 0) {
    return { content: [{ type: "text", text: "No meaningful search terms found. Try being more specific." }] };
  }

  const toolMap = new Map();
  for (const kw of keywords) {
    try {
      const data = await fetchJSON(`${BASE_URL}/api/tools?q=${encodeURIComponent(kw)}`);
      if (data.tools && Array.isArray(data.tools)) {
        for (const tool of data.tools) {
          if (!toolMap.has(tool.slug)) {
            toolMap.set(tool.slug, { ...tool, score: 0 });
          }
          toolMap.get(tool.slug).score += 1;
        }
      }
    } catch { continue; }
  }

  let results = Array.from(toolMap.values()).sort((a, b) => b.score - a.score);
  if (mcpReady === true) results = results.filter(t => t.mcpReady === true);
  if (hasFreeTier === true) results = results.filter(t => t.hasFreeTier === true);
  if (category) results = results.filter(t => t.category?.toLowerCase().includes(category.toLowerCase()));
  results = results.slice(0, limit);

  if (results.length === 0) {
    return { content: [{ type: "text", text: `No tools found for "${query}". Try different keywords.` }] };
  }

  let text = `Found ${results.length} tool${results.length !== 1 ? 's' : ''} for "${query}":\n\n`;
  for (const tool of results) {
    const badges = [];
    if (tool.mcpReady) badges.push('MCP Ready');
    if (tool.hasFreeTier) badges.push('Free Tier');
    text += `**${tool.name}** — ${tool.oneLiner || ''}\n`;
    text += `  Category: ${tool.category || 'N/A'}`;
    if (badges.length > 0) text += ` | ${badges.join(' | ')}`;
    text += `\n  → https://salestools.club/apis/${tool.slug}\n\n`;
  }

  return { content: [{ type: "text", text: text.trim() }] };
}

async function handleGetTool(args) {
  const { slug } = args;
  try {
    const tool = await fetchJSON(`${BASE_URL}/api/tools/${encodeURIComponent(slug)}`);
    if (tool.error) {
      return { content: [{ type: "text", text: `Tool "${slug}" not found.` }] };
    }

    let text = `# ${tool.name}\n\n`;
    text += `${tool.description || tool.oneLiner}\n\n`;
    text += `## Quick Facts\n`;
    text += `- **Category:** ${tool.category}\n`;
    text += `- **API Type:** ${(tool.apiType || []).join(', ') || 'N/A'}\n`;
    text += `- **Auth:** ${(tool.authMethod || []).join(', ') || 'N/A'}\n`;
    text += `- **Free Tier:** ${tool.hasFreeTier ? 'Yes' : 'No'}\n`;
    text += `- **MCP Ready:** ${tool.mcpReady ? 'Yes' : 'No'}\n`;
    text += `- **Webhooks:** ${tool.hasWebhooks ? 'Yes' : 'No'}\n`;
    if (tool.sdkLanguages?.length > 0) text += `- **SDKs:** ${tool.sdkLanguages.join(', ')}\n`;
    text += '\n';

    if (tool.aiCapabilities?.length > 0) {
      text += `## What AI Can Do With This\n`;
      text += tool.aiCapabilities.map(c => `- ${c}`).join('\n') + '\n\n';
    }

    if (tool.starterPrompt) {
      text += `## Starter Prompt\n\`\`\`\n${tool.starterPrompt}\n\`\`\`\n\n`;
    }

    if (tool.integrations?.length > 0) {
      text += `## Integrations\n`;
      for (const int of tool.integrations) {
        text += `- **${int.label || int.platform}:** ${int.url}\n`;
        if (int.mcpConfig) text += `  MCP Config:\n\`\`\`json\n${int.mcpConfig}\n\`\`\`\n`;
      }
      text += '\n';
    }

    if (tool.alternativeTo?.length > 0) {
      text += `## Alternatives To\n${tool.alternativeTo.join(', ')}\n\n`;
    }

    text += `## Links\n`;
    text += `- Website: ${tool.websiteUrl}\n`;
    if (tool.docsUrl) text += `- Docs: ${tool.docsUrl}\n`;
    if (tool.pricingUrl) text += `- Pricing: ${tool.pricingUrl}\n`;
    if (tool.githubUrl) text += `- GitHub: ${tool.githubUrl}\n`;
    text += `- Salestools Page: https://salestools.club/apis/${tool.slug}\n`;

    return { content: [{ type: "text", text: text.trim() }] };
  } catch (error) {
    return { content: [{ type: "text", text: `Failed to fetch tool "${slug}": ${error.message}` }] };
  }
}

async function handleCompare(args) {
  const { tool1, tool2 } = args;
  try {
    const [t1, t2] = await Promise.all([
      fetchJSON(`${BASE_URL}/api/tools/${encodeURIComponent(tool1)}`),
      fetchJSON(`${BASE_URL}/api/tools/${encodeURIComponent(tool2)}`),
    ]);

    if (t1.error) return { content: [{ type: "text", text: `Tool "${tool1}" not found.` }] };
    if (t2.error) return { content: [{ type: "text", text: `Tool "${tool2}" not found.` }] };

    let text = `# ${t1.name} vs ${t2.name}\n\n`;
    text += `| Feature | ${t1.name} | ${t2.name} |\n`;
    text += `|---------|${'-'.repeat(t1.name.length + 2)}|${'-'.repeat(t2.name.length + 2)}|\n`;
    text += `| Category | ${t1.category} | ${t2.category} |\n`;
    text += `| API Type | ${(t1.apiType || []).join(', ')} | ${(t2.apiType || []).join(', ')} |\n`;
    text += `| Auth | ${(t1.authMethod || []).join(', ')} | ${(t2.authMethod || []).join(', ')} |\n`;
    text += `| Free Tier | ${t1.hasFreeTier ? '✅' : '❌'} | ${t2.hasFreeTier ? '✅' : '❌'} |\n`;
    text += `| MCP Ready | ${t1.mcpReady ? '✅' : '❌'} | ${t2.mcpReady ? '✅' : '❌'} |\n`;
    text += `| Webhooks | ${t1.hasWebhooks ? '✅' : '❌'} | ${t2.hasWebhooks ? '✅' : '❌'} |\n`;
    text += `| SDKs | ${(t1.sdkLanguages || []).join(', ') || 'None'} | ${(t2.sdkLanguages || []).join(', ') || 'None'} |\n`;
    text += '\n';

    if (t1.aiCapabilities?.length > 0 || t2.aiCapabilities?.length > 0) {
      text += `## AI Capabilities\n`;
      text += `**${t1.name}:** ${(t1.aiCapabilities || []).join(', ') || 'Not listed'}\n`;
      text += `**${t2.name}:** ${(t2.aiCapabilities || []).join(', ') || 'Not listed'}\n\n`;
    }

    text += `## Links\n`;
    text += `- ${t1.name}: https://salestools.club/apis/${t1.slug}\n`;
    text += `- ${t2.name}: https://salestools.club/apis/${t2.slug}\n`;
    text += `- Compare page: https://salestools.club/vs/${t1.slug}-vs-${t2.slug}\n`;

    return { content: [{ type: "text", text: text.trim() }] };
  } catch (error) {
    return { content: [{ type: "text", text: `Comparison failed: ${error.message}` }] };
  }
}

async function handleListCategories() {
  try {
    const data = await fetchJSON(`${BASE_URL}/api/categories`);
    let text = `# Sales Tool Categories\n\n`;
    for (const cat of data.categories) {
      text += `- **${cat.name}** — ${cat.toolCount} tools\n`;
      text += `  ${cat.description}\n\n`;
    }
    return { content: [{ type: "text", text: text.trim() }] };
  } catch (error) {
    return { content: [{ type: "text", text: `Failed to fetch categories: ${error.message}` }] };
  }
}

async function handleGetStarterPrompt(args) {
  const { slug } = args;
  try {
    const tool = await fetchJSON(`${BASE_URL}/api/tools/${encodeURIComponent(slug)}`);
    if (tool.error) {
      return { content: [{ type: "text", text: `Tool "${slug}" not found.` }] };
    }

    let text = `# ${tool.name} — Starter Prompt\n\n`;

    if (tool.starterPrompt) {
      text += `Copy this into Claude Code or any AI agent:\n\n`;
      text += `\`\`\`\n${tool.starterPrompt}\n\`\`\`\n\n`;
    } else {
      text += `No starter prompt available for ${tool.name} yet.\n\n`;
    }

    if (tool.aiCapabilities?.length > 0) {
      text += `## What you can ask your AI to do:\n`;
      text += tool.aiCapabilities.map(c => `- ${c}`).join('\n') + '\n\n';
    }

    if (tool.docsUrl) text += `API Docs: ${tool.docsUrl}\n`;
    if (tool.integrations?.length > 0) {
      const mcp = tool.integrations.find(i => i.platform === 'MCP');
      if (mcp) text += `MCP Server: ${mcp.url}\n`;
    }

    return { content: [{ type: "text", text: text.trim() }] };
  } catch (error) {
    return { content: [{ type: "text", text: `Failed to fetch tool "${slug}": ${error.message}` }] };
  }
}

// ── Server setup ──────────────────────────────────────────────

const server = new Server(
  { name: "salestools-mcp", version: "0.3.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_sales_tools",
      description: "Search the Salestools Club directory for sales APIs, tools, and MCP servers. Use natural language like 'lead enrichment API' or 'free CRM with webhooks'.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Natural language search query (e.g., 'enrichment API', 'cold email tools', 'CRM for startups')" },
          mcpReady: { type: "boolean", description: "Only return tools with MCP server support" },
          hasFreeTier: { type: "boolean", description: "Only return tools with a free tier" },
          category: { type: "string", description: "Filter by category (e.g., 'Sales Intelligence', 'CRM & RevOps', 'Sales Engagement')" },
          limit: { type: "number", description: "Max results to return (default: 20)" },
        },
        required: ["query"],
      },
    },
    {
      name: "get_tool_details",
      description: "Get full details about a specific sales tool — API specs, auth methods, AI capabilities, starter prompts, MCP config, and more.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "The tool's slug (e.g., 'hubspot', 'apollo', 'lusha', 'pipedrive')" },
        },
        required: ["slug"],
      },
    },
    {
      name: "compare_tools",
      description: "Compare two sales tools side-by-side — API type, auth, pricing, MCP support, AI capabilities, and SDKs.",
      inputSchema: {
        type: "object",
        properties: {
          tool1: { type: "string", description: "Slug of the first tool (e.g., 'hubspot')" },
          tool2: { type: "string", description: "Slug of the second tool (e.g., 'pipedrive')" },
        },
        required: ["tool1", "tool2"],
      },
    },
    {
      name: "list_categories",
      description: "List all available sales tool categories with descriptions and tool counts.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "get_starter_prompt",
      description: "Get the copy-paste starter prompt for a tool so you can immediately use it with your AI agent.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "The tool's slug (e.g., 'hubspot', 'apollo', 'lusha')" },
        },
        required: ["slug"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "search_sales_tools": return handleSearch(args);
    case "get_tool_details": return handleGetTool(args);
    case "compare_tools": return handleCompare(args);
    case "list_categories": return handleListCategories();
    case "get_starter_prompt": return handleGetStarterPrompt(args);
    default: throw new Error(`Unknown tool: ${name}`);
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
