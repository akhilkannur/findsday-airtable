import { tools } from "../lib/data";

function generateSnippets(slug: string) {
  const tool = tools.find(t => t.slug === slug);
  if (!tool) {
    console.log("Tool not found.");
    return;
  }

  const styles = [
    // Style 1: The "Lego Block" approach (X/Twitter)
    `🛠️ New building block for your sales agent: ${tool.name}
    
${tool.oneLiner}

- API Type: ${tool.apiType.join("/")}
- AI Readiness: ${tool.aiDifficulty}
- MCP Support: ${tool.mcpReady ? "✅ Native" : "❌ Manual"}

Starter Prompt: "${tool.starterPrompt}"

Inspect the node: https://salestools.club/tools/${tool.slug}`,

    // Style 2: The "Comparison" approach (X/Twitter)
    `Searching for a ${tool.name} alternative for your AI stack?

${tool.name} is a high-signal node for ${tool.category.toLowerCase()}. 
${tool.mcpReady ? "It's already MCP-ready, meaning you can plug it into Claude Code in seconds." : "It has a clean REST API making it a perfect lego block for agentic workflows."}

Compare it here: https://salestools.club/tools/${tool.slug}`,

    // Style 3: The "Developer/Builder" approach (LinkedIn)
    `Stop digging through messy dev docs. 

We just indexed ${tool.name} into the Salestools Club registry. It's a ${tool.oneLiner.toLowerCase()}

If you're building automated GTM workflows with Claude Code or Cursor, this is a must-have node for your stack.

- Auth: ${tool.authMethod.join(", ")}
- Features: ${tool.aiCapabilities.slice(0, 3).join(", ")}

Check out the technical scorecard: https://salestools.club/tools/${tool.slug}`
  ];

  console.log("--- SOCIAL SNIPPETS FOR " + tool.name.toUpperCase() + " ---");
  styles.forEach((s, i) => {
    console.log(`
[OPTION ${i + 1}]
${s}
`);
  });
}

const targetSlug = process.argv[2];
if (!targetSlug) {
  console.log("Usage: npx tsx scripts/generate-social-copy.ts <tool-slug>");
} else {
  generateSnippets(targetSlug);
}
