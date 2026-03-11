export interface Skill {
  slug: string
  name: string
  description: string
  category: "Outreach" | "Research" | "CRM" | "Analytics" | "Operations" | "Enablement"
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  worksWithTools: string[]
  promptContent: string
  source: string
  sourceUrl?: string
  installCommand?: string
}

const skills: Skill[] = [
  {
    slug: "apollo-outreach",
    name: "Apollo Outreach",
    description: "Research and enrich B2B leads using the Apollo.io API. Find leads, prospect research, company enrichment, and decision makers.",
    category: "Outreach",
    difficulty: "Intermediate",
    worksWithTools: ["apollo"],
    promptContent: "",
    source: "robertbstillwell",
    sourceUrl: "https://github.com/robertbstillwell/marketing-skills",
    installCommand: "npx add-skill robertbstillwell/marketing-skills",
  },
  {
    slug: "sales-outreach",
    name: "Sales Outreach",
    description: "ABM email personalization, cold outreach drafting, and professional tone frameworks for B2B sales.",
    category: "Outreach",
    difficulty: "Intermediate",
    worksWithTools: ["apollo", "linkedin", "exa-ai"],
    promptContent: "",
    source: "arielperez82",
    sourceUrl: "https://github.com/arielperez82/agents-and-skills",
    installCommand: "npx add-skill arielperez82/agents-and-skills",
  },
  {
    slug: "apollo-core-workflow",
    name: "Apollo Core Workflow",
    description: "Implement Apollo.io lead search and enrichment workflow. Build lead generation features, search contacts, and enrich prospect data.",
    category: "Operations",
    difficulty: "Intermediate",
    worksWithTools: ["apollo"],
    promptContent: "",
    source: "nivkazdan",
    sourceUrl: "https://github.com/nivkazdan/skills-agents-catalog",
    installCommand: "npx add-skill nivkazdan/skills-agents-catalog",
  },
  {
    slug: "marketing-leads-generation",
    name: "Marketing Leads Generation",
    description: "Generate and qualify marketing leads with AI. Build targeted prospect lists for outreach campaigns.",
    category: "Operations",
    difficulty: "Intermediate",
    worksWithTools: [],
    promptContent: "",
    source: "FastMCP",
    sourceUrl: "https://fastmcp.me/Skills/Details/385/marketing-leads-generation",
    installCommand: "mkdir -p .claude/skills/marketing-leads-generation && curl -L -o skill.zip \"https://fastmcp.me/Skills/Download/385\" && unzip -o skill.zip -d .claude/skills/marketing-leads-generation && rm skill.zip",
  },
  {
    slug: "sales-ai-agents",
    name: "Sales AI Agents",
    description: "AI-powered sales automation agents that identify stale deals in HubSpot and generate personalized follow-up emails. Also finds high-engagement Marketing Contacts without deals for re-engagement outreach.",
    category: "Outreach",
    difficulty: "Advanced",
    worksWithTools: ["hubspot", "anthropic-claude", "slack", "fireflies", "apollo"],
    promptContent: "",
    source: "sneurgaonkar",
    sourceUrl: "https://github.com/sneurgaonkar/sales-ai-agents",
    installCommand: "git clone https://github.com/sneurgaonkar/sales-ai-agents.git",
  },
  {
    slug: "salesably-marketplace",
    name: "Salesably Marketplace",
    description: "Claude Code plugins for sales and marketing teams. Includes 10 marketing skills (brand voice, positioning, content strategy, copywriting) and 9 sales skills (deal qualification, prospect research, call preparation).",
    category: "Operations",
    difficulty: "Intermediate",
    worksWithTools: [],
    promptContent: "",
    source: "Salesably",
    sourceUrl: "https://github.com/Salesably/salesably-marketplace",
    installCommand: "/plugin marketplace add Salesably/salesably-marketplace && /plugin install marketing-skills && /plugin install sales-skills",
  },
  {
    slug: "goose-skills",
    name: "Goose Skills",
    description: "Library of 125 GTM skills for Claude Code. Includes skills for ads, brand, competitive intel, content, lead generation, monitoring, outreach, research, and SEO. Features 55 atomic capabilities, 61 composite chains, and 9 playbooks.",
    category: "Operations",
    difficulty: "Intermediate",
    worksWithTools: [],
    promptContent: "",
    source: "athina-ai",
    sourceUrl: "https://github.com/athina-ai/goose-skills",
    installCommand: "npx goose-skills install <slug>",
  },
  {
    slug: "openclaw-skills",
    name: "OpenClaw Skills Collection",
    description: "Collection of OpenClaw skills for sales, outreach, and GTM automation. Browse and install individual skills from the collection.",
    category: "Operations",
    difficulty: "Intermediate",
    worksWithTools: [],
    promptContent: "",
    source: "VoltAgent",
    sourceUrl: "https://github.com/VoltAgent/awesome-openclaw-skills",
    installCommand: "git clone https://github.com/VoltAgent/awesome-openclaw-skills.git ~/.claude/skills/openclaw",
  },
]

export function getAllSkills(): Skill[] {
  return [...skills].reverse()
}

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug)
}

export function getSkillSlugs(): string[] {
  return skills.map((s) => s.slug)
}

export function getSkillsByCategory(category: Skill["category"]): Skill[] {
  return skills.filter((s) => s.category === category)
}

