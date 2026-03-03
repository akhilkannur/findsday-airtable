#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const BASE_URL = process.env.SALESTOOLS_BASE_URL || "https://salestools.club";

const SearchArgsSchema = z.object({
  query: z.string().describe("Natural language search query for sales tools (e.g., 'enrichment API', 'cold email', 'CRM for startups')"),
  mcpReady: z.boolean().optional().describe("Filter to only return MCP-ready tools"),
  hasFreeTier: z.boolean().optional().describe("Filter to only return tools with a free tier"),
  category: z.string().optional().describe("Filter by category: enrichment, outreach, dialers, crm, data"),
  limit: z.number().optional().describe("Maximum number of results to return (default: 20)"),
});

async function searchTools(query, filters = {}) {
  const { mcpReady, hasFreeTier, category, limit = 20 } = filters;
  
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may',
    'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'to', 'of', 'in',
    'for', 'on', 'with', 'at', 'by', 'from', 'up', 'about', 'into', 'over', 'after',
    'under', 'above', 'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you',
    'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her',
    'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
    'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am',
    'been', 'being', 'having', 'doing', 'would', 'should', 'could', 'ought',
    'i\'m', 'you\'re', 'he\'s', 'she\'s', 'it\'s', 'we\'re', 'they\'re', 'i\'ve',
    'you\'ve', 'we\'ve', 'they\'ve', 'i\'d', 'you\'d', 'he\'d', 'she\'d', 'we\'d', 'they\'d',
    'i\'ll', 'you\'ll', 'he\'ll', 'she\'ll', 'we\'ll', 'they\'ll', 'isn\'t', 'aren\'t', 'wasn\'t',
    'weren\'t', 'hasn\'t', 'haven\'t', 'hadn\'t', 'doesn\'t', 'don\'t', 'didn\'t', 'won\'t',
    'wouldn\'t', 'shan\'t', 'shouldn\'t', 'can\'t', 'cannot', 'couldn\'t', 'mustn\'t', 'let\'s',
    'us', 'say', 'said', 'also', 'just', 'like', 'get', 'got', 'find', 'finding',
    'search', 'searching', 'looking', 'need', 'needs', 'wants', 'want', 'best', 'good', 'top',
    'free', 'cheap', 'affordable', 'use', 'using', 'used', 'make', 'making', 'build', 'building',
    'project', 'their', 'show', 'showme', 'list', 'all', 'some', 'any', 'no',
    'not', 'only', 'very', 'really', 'most', 'many', 'much', 'such', 'other', 'another',
    'work', 'works', 'working', 'vs', 'versus', 'alternative', 'alternatives', 'compare',
  ]);

  const keywords = query
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !stopWords.has(word));

  if (keywords.length === 0) {
    return [];
  }

  // Search for each keyword and combine results
  const toolMap = new Map();
  
  for (const kw of keywords) {
    try {
      const response = await fetch(`${BASE_URL}/api/tools?q=${encodeURIComponent(kw)}`, {
        signal: AbortSignal.timeout(10000),
      });
      
      if (!response.ok) {
        console.error(`API error for keyword "${kw}": ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      
      if (!data.tools || !Array.isArray(data.tools)) {
        console.error(`Invalid response format for keyword "${kw}"`);
        continue;
      }
      
      for (const tool of data.tools) {
        if (!toolMap.has(tool.slug)) {
          toolMap.set(tool.slug, { ...tool, score: 0 });
        }
        toolMap.get(tool.slug).score += 1;
      }
    } catch (error) {
      console.error(`Failed to fetch for keyword "${kw}":`, error.message);
      continue;
    }
  }

  // Apply filters
  let results = Array.from(toolMap.values())
    .sort((a, b) => b.score - a.score);
  
  if (mcpReady === true) {
    results = results.filter(t => t.mcpReady === true);
  }
  
  if (hasFreeTier === true) {
    results = results.filter(t => t.hasFreeTier === true);
  }
  
  if (category) {
    results = results.filter(t => t.category?.toLowerCase() === category.toLowerCase());
  }
  
  results = results.slice(0, limit);
  
  return results.map(tool => ({
    name: tool.name,
    slug: tool.slug,
    oneLiner: tool.oneLiner,
    description: tool.description,
    category: tool.category,
    mcpReady: tool.mcpReady,
    hasFreeTier: tool.hasFreeTier,
    docsUrl: tool.docsUrl,
    url: `https://salestools.club/tools/${tool.slug}`,
  }));
}

const server = new Server(
  {
    name: "salestools-mcp",
    version: "0.2.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_sales_tools",
        description: "Search for sales tools, APIs, and MCP servers from Salestools Club directory. Use natural language queries like 'enrichment API', 'cold email tools', 'free CRM', etc. Supports filters: mcpReady (boolean), hasFreeTier (boolean), category (enrichment/outreach/dialers/crm/data), limit (number).",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Natural language search query for sales tools (e.g., 'enrichment API', 'cold email', 'CRM for startups')",
            },
            mcpReady: {
              type: "boolean",
              description: "Filter to only return MCP-ready tools that can be directly integrated",
            },
            hasFreeTier: {
              type: "boolean",
              description: "Filter to only return tools with a free tier",
            },
            category: {
              type: "string",
              description: "Filter by category: enrichment, outreach, dialers, crm, data",
            },
            limit: {
              type: "number",
              description: "Maximum number of results to return (default: 20)",
            },
          },
          required: ["query"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "search_sales_tools") {
    const args = SearchArgsSchema.parse(request.params.arguments);
    const filters = {
      mcpReady: args.mcpReady,
      hasFreeTier: args.hasFreeTier,
      category: args.category,
      limit: args.limit,
    };
    const tools = await searchTools(args.query, filters);
    
    // Format response as human-readable text
    let responseText = `Found ${tools.length} tool${tools.length !== 1 ? 's' : ''}`;
    if (filters.mcpReady) responseText += ' (MCP-ready only)';
    if (filters.hasFreeTier) responseText += ' (free tier)';
    if (filters.category) responseText += ` in ${filters.category}`;
    responseText += ':\n\n';
    
    const categoryGroups = {};
    for (const tool of tools) {
      const cat = tool.category || 'Other';
      if (!categoryGroups[cat]) categoryGroups[cat] = [];
      categoryGroups[cat].push(tool);
    }
    
    for (const [cat, catTools] of Object.entries(categoryGroups)) {
      responseText += `## ${cat.charAt(0).toUpperCase() + cat.slice(1)}\n`;
      for (const tool of catTools) {
        responseText += `### ${tool.name}\n`;
        responseText += `${tool.oneLiner || tool.description || 'No description'}\n`;
        const badges = [];
        if (tool.mcpReady) badges.push('MCP Ready');
        if (tool.hasFreeTier) badges.push('Free Tier');
        if (badges.length > 0) responseText += `*${badges.join(' | ')}*\n`;
        responseText += `→ ${tool.url}\n`;
        if (tool.docsUrl) responseText += `📄 Docs: ${tool.docsUrl}\n`;
        responseText += '\n';
      }
    }
    
    return {
      content: [
        {
          type: "text",
          text: responseText.trim(),
        },
      ],
    };
  }
  
  throw new Error(`Unknown tool: ${request.params.name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
