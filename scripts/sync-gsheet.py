import csv
import json
import requests
import re
import sys
import os

# Configuration
SHEET_ID = "1lISM0kMrJJSCs-e8nqBZKkKeNExtoXu5KD-mI4GvZN0"

# Tab GIDs — update these after creating tabs in Google Sheets
TABS = {
    "tools":    "1367773213",       # tools_export (existing)
    "skills":   "SKILLS_GID_HERE",  # skills_export (create this tab)
    "stacks":   "STACKS_GID_HERE",  # stacks_export (create this tab)
    "usecases": "USECASES_GID_HERE",# usecases_export (create this tab)
}

def csv_url(gid):
    return f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={gid}"

def fetch_tab(name):
    gid = TABS[name]
    if "GID_HERE" in gid:
        print(f"⏭️  Skipping {name} — GID not configured yet")
        return None
    print(f"📥 Fetching {name} tab...")
    resp = requests.get(csv_url(gid))
    if resp.status_code != 200:
        print(f"❌ Failed to fetch {name}: {resp.status_code}")
        return None
    return list(csv.DictReader(resp.content.decode('utf-8').splitlines()))

# ── Helpers ──────────────────────────────────────────────

def parse_list(s):
    if not s or s == "[]":
        return []
    try:
        return json.loads(s.replace("'", '"'))
    except:
        if s.startswith("[") and s.endswith("]"):
            s = s[1:-1]
        return [item.strip().strip('"').strip("'") for item in s.split(",") if item.strip()]

def parse_bool(s):
    if not s:
        return False
    return s.upper() == "TRUE"

def format_value(v):
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, list):
        return json.dumps(v)
    if v is None:
        return "undefined"
    escaped = v.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '')
    return f'"{escaped}"'

def escape_ts_string(s):
    """Escape a string for use inside TypeScript backtick template literals."""
    if not s:
        return ""
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

# ── Tools sync (existing logic) ──────────────────────────

CATEGORIES_META = [
    {"slug": "sales-intelligence", "name": "Sales Intelligence", "description": "Find prospects and enrich lead lists with real-time B2B contact data and technographic signals.", "icon": "Search"},
    {"slug": "sales-engagement", "name": "Sales Engagement", "description": "Orchestrate automated multichannel outreach across email, LinkedIn, and social media platforms.", "icon": "Zap"},
    {"slug": "phone-and-dialers", "name": "Phone & Dialers", "description": "Scale your outbound volume with power dialers, AI voice agents, and cloud calling infrastructure.", "icon": "Phone"},
    {"slug": "crm-and-revops", "name": "CRM & RevOps", "description": "Manage customer relationships and automate the revenue operations lifecycle with modern sales infrastructure.", "icon": "Users"},
    {"slug": "revenue-intelligence", "name": "Revenue Intelligence", "description": "Analyze sales conversations and deal health to improve pipeline forecasting and revenue growth.", "icon": "BarChart3"},
    {"slug": "sales-enablement", "name": "Sales Enablement", "description": "Equip sales teams with the content, coaching, and playbooks needed to shorten sales cycles.", "icon": "GraduationCap"},
    {"slug": "closing-and-scheduling", "name": "Closing & Scheduling", "description": "Automate meeting booking and simplify the document signing process to close deals faster.", "icon": "Calendar"}
]

def sync_tools(rows):
    tools = []
    category_counts = {}

    for row in rows:
        if not row.get('slug'): continue

        tool = {
            "slug": row.get('slug'),
            "name": row.get('name'),
            "oneLiner": row.get('oneLiner'),
            "description": row.get('description'),
            "category": row.get('category'),
            "logoUrl": row.get('logoUrl'),
            "websiteUrl": row.get('websiteUrl'),
            "docsUrl": row.get('docsUrl'),
            "pricingUrl": row.get('pricingUrl'),
            "githubUrl": row.get('githubUrl'),
            "apiType": parse_list(row.get('apiType', '[]')),
            "authMethod": parse_list(row.get('authMethod', '[]')),
            "hasFreeTier": parse_bool(row.get('hasFreeTier')),
            "sdkLanguages": parse_list(row.get('sdkLanguages', '[]')),
            "hasWebhooks": parse_bool(row.get('hasWebhooks')),
            "hasOpenApiSpec": parse_bool(row.get('hasOpenApiSpec')),
            "openApiSpecUrl": row.get('openApiSpecUrl'),
            "aiCapabilities": parse_list(row.get('aiCapabilities', '[]')),
            "aiDifficulty": row.get('aiDifficulty', 'Beginner-Friendly'),
            "starterPrompt": row.get('starterPrompt', ''),
            "mcpReady": parse_bool(row.get('mcpReady')),
            "isFeatured": parse_bool(row.get('isFeatured')),
            "alternativeTo": parse_list(row.get('alternativeTo', '[]')),
            "integrations": row.get('integrations', '[]')
        }
        tools.append(tool)
        cat = row.get('category')
        if cat: category_counts[cat] = category_counts.get(cat, 0) + 1

    content = 'import type { SalesTool, CategoryMeta } from "./types"\n\n'
    content += 'export const tools: SalesTool[] = [\n'

    current_cat = None
    for tool in sorted(tools, key=lambda x: (x['category'] or '', x['name'] or '')):
        if tool['category'] != current_cat:
            current_cat = tool['category']
            content += f'\n  // ── {current_cat} ──────────────────────────────────────────────\n'

        content += '  {\n'
        for k, v in tool.items():
            if k == 'integrations':
                val = v if v and v != "[]" else "[]"
                if val.strip().startswith('{') and not val.strip().startswith('['):
                    val = f'[{val}]'
                if val.count('{') > val.count('}'): val += '}' * (val.count('{') - val.count('}'))
                if val.count('[') > val.count(']'): val += ']' * (val.count('[') - val.count(']'))
                content += f'    {k}: {val},\n'
            elif k in ['githubUrl', 'openApiSpecUrl'] and not v:
                continue
            else:
                content += f'    {k}: {format_value(v)},\n'
        content += '  },\n'

    content += ']\n\n'
    content += 'export const categories: CategoryMeta[] = [\n'
    for cat in CATEGORIES_META:
        count = category_counts.get(cat["name"], 0)
        content += f'  {{\n    slug: "{cat["slug"]}",\n    name: "{cat["name"]}",\n    description: "{cat["description"]}",\n    icon: "{cat["icon"]}",\n    toolCount: {count},\n  }},\n'
    content += ']\n'

    with open('lib/data.ts', 'w') as f:
        f.write(content)
    print(f"✅ Updated lib/data.ts ({len(tools)} tools)")

# ── Skills sync ──────────────────────────────────────────
# Sheet columns: slug, name, description, category, difficulty, worksWithTools, promptContent, source, installCommand

def sync_skills(rows):
    skills = []
    for row in rows:
        if not row.get('slug'): continue
        skills.append({
            "slug": row['slug'].strip(),
            "name": row.get('name', '').strip(),
            "description": row.get('description', '').strip(),
            "category": row.get('category', 'Operations').strip(),
            "difficulty": row.get('difficulty', 'Beginner').strip(),
            "worksWithTools": parse_list(row.get('worksWithTools', '[]')),
            "promptContent": row.get('promptContent', '').strip(),
            "source": row.get('source', 'Salestools Club').strip(),
            "installCommand": row.get('installCommand', '').strip(),
        })

    content = '''export interface Skill {
  slug: string
  name: string
  description: string
  category: "Outreach" | "Research" | "CRM" | "Analytics" | "Operations" | "Enablement"
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  worksWithTools: string[]
  promptContent: string
  source: string
  installCommand?: string
}

const skills: Skill[] = [\n'''

    for s in skills:
        content += '  {\n'
        content += f'    slug: {format_value(s["slug"])},\n'
        content += f'    name: {format_value(s["name"])},\n'
        content += f'    description: {format_value(s["description"])},\n'
        content += f'    category: {format_value(s["category"])},\n'
        content += f'    difficulty: {format_value(s["difficulty"])},\n'
        content += f'    worksWithTools: {json.dumps(s["worksWithTools"])},\n'
        content += f'    promptContent: `{escape_ts_string(s["promptContent"])}`,\n'
        content += f'    source: {format_value(s["source"])},\n'
        if s["installCommand"]:
            content += f'    installCommand: {format_value(s["installCommand"])},\n'
        content += '  },\n'

    content += ''']

export function getAllSkills(): Skill[] {
  return skills
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
'''

    with open('lib/skills.ts', 'w') as f:
        f.write(content)
    print(f"✅ Updated lib/skills.ts ({len(skills)} skills)")

# ── Stacks sync ──────────────────────────────────────────
# Sheet columns: slug, name, tagline, description, toolSlugs, workflow
# workflow column format: JSON array of {step, toolSlug, description}

def sync_stacks(rows):
    stacks = []
    for row in rows:
        if not row.get('slug'): continue

        tool_slugs = parse_list(row.get('toolSlugs', '[]'))

        # Parse workflow — expect JSON array
        workflow_raw = row.get('workflow', '[]').strip()
        try:
            workflow = json.loads(workflow_raw.replace("'", '"'))
        except:
            workflow = []

        stacks.append({
            "slug": row['slug'].strip(),
            "name": row.get('name', '').strip(),
            "tagline": row.get('tagline', '').strip(),
            "description": row.get('description', '').strip(),
            "toolSlugs": tool_slugs,
            "workflow": workflow,
        })

    content = '''import { tools } from "./data"
import type { SalesTool } from "./types"

export interface WorkflowStep {
  step: string
  toolSlug: string
  description: string
}

export interface Stack {
  slug: string
  name: string
  tagline: string
  description: string
  toolSlugs: string[]
  workflow: WorkflowStep[]
}

const stacks: Stack[] = [\n'''

    for s in stacks:
        content += '  {\n'
        content += f'    slug: {format_value(s["slug"])},\n'
        content += f'    name: {format_value(s["name"])},\n'
        content += f'    tagline: {format_value(s["tagline"])},\n'
        content += f'    description: {format_value(s["description"])},\n'
        content += f'    toolSlugs: {json.dumps(s["toolSlugs"])},\n'
        content += '    workflow: [\n'
        for w in s["workflow"]:
            step = w.get("step", "").replace('"', '\\"')
            tool_slug = w.get("toolSlug", "").replace('"', '\\"')
            desc = w.get("description", "").replace('"', '\\"')
            content += f'      {{ step: "{step}", toolSlug: "{tool_slug}", description: "{desc}" }},\n'
        content += '    ],\n'
        content += '  },\n'

    content += ''']

export function getAllStacks(): Stack[] {
  return stacks
}

export function getStackBySlug(slug: string): Stack | undefined {
  return stacks.find((s) => s.slug === slug)
}

export function getStackSlugs(): string[] {
  return stacks.map((s) => s.slug)
}

export function getToolsForStack(stack: Stack): SalesTool[] {
  return stack.toolSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is SalesTool => t !== undefined)
}
'''

    with open('lib/stacks.ts', 'w') as f:
        f.write(content)
    print(f"✅ Updated lib/stacks.ts ({len(stacks)} stacks)")

# ── Use Cases sync ───────────────────────────────────────
# Sheet columns: slug, title, metaDescription, intro, categories, capabilityKeywords, includeSlugs

def sync_usecases(rows):
    usecases = []
    for row in rows:
        if not row.get('slug'): continue
        usecases.append({
            "slug": row['slug'].strip(),
            "title": row.get('title', '').strip(),
            "metaDescription": row.get('metaDescription', '').strip(),
            "intro": row.get('intro', '').strip(),
            "categories": parse_list(row.get('categories', '[]')),
            "capabilityKeywords": parse_list(row.get('capabilityKeywords', '[]')),
            "includeSlugs": parse_list(row.get('includeSlugs', '[]')),
        })

    content = '''import { tools } from "./data"
import type { SalesTool } from "./types"

export interface UseCase {
  slug: string
  title: string
  metaDescription: string
  intro: string
  categories: string[]
  capabilityKeywords?: string[]
  includeSlugs?: string[]
}

const usecases: UseCase[] = [\n'''

    for uc in usecases:
        content += '  {\n'
        content += f'    slug: {format_value(uc["slug"])},\n'
        content += f'    title: {format_value(uc["title"])},\n'
        content += f'    metaDescription: {format_value(uc["metaDescription"])},\n'
        content += f'    intro: {format_value(uc["intro"])},\n'
        content += f'    categories: {json.dumps(uc["categories"])},\n'
        if uc["capabilityKeywords"]:
            content += f'    capabilityKeywords: {json.dumps(uc["capabilityKeywords"])},\n'
        if uc["includeSlugs"]:
            content += f'    includeSlugs: {json.dumps(uc["includeSlugs"])},\n'
        content += '  },\n'

    content += ''']

export function getAllUseCases(): UseCase[] {
  return usecases
}

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return usecases.find((uc) => uc.slug === slug)
}

export function getUseCaseSlugs(): string[] {
  return usecases.map((uc) => uc.slug)
}

export function getUseCasesForTool(tool: SalesTool): UseCase[] {
  return usecases.filter((uc) => {
    if (uc.categories.includes(tool.category)) return true
    if (uc.capabilityKeywords?.length) {
      const caps = (tool.aiCapabilities || []).join(" ").toLowerCase()
      return uc.capabilityKeywords.some((kw) => caps.includes(kw.toLowerCase()))
    }
    return false
  })
}

export function getToolsForUseCase(usecase: UseCase): SalesTool[] {
  const matched = new Map<string, SalesTool>()

  for (const tool of tools) {
    if (usecase.categories.includes(tool.category)) {
      matched.set(tool.slug, tool)
    }
  }

  if (usecase.capabilityKeywords?.length) {
    for (const tool of tools) {
      if (matched.has(tool.slug)) continue
      const caps = (tool.aiCapabilities || []).join(" ").toLowerCase()
      const matchesKeyword = usecase.capabilityKeywords.some((kw) =>
        caps.includes(kw.toLowerCase())
      )
      if (matchesKeyword) {
        matched.set(tool.slug, tool)
      }
    }
  }

  if (usecase.includeSlugs?.length) {
    for (const slug of usecase.includeSlugs) {
      const tool = tools.find((t) => t.slug === slug)
      if (tool) {
        matched.set(tool.slug, tool)
      }
    }
  }

  return Array.from(matched.values())
}
'''

    with open('lib/usecases.ts', 'w') as f:
        f.write(content)
    print(f"✅ Updated lib/usecases.ts ({len(usecases)} use cases)")

# ── Main ─────────────────────────────────────────────────

def main():
    # Allow syncing specific tabs: python sync-gsheet.py tools skills
    # Or sync all: python sync-gsheet.py
    targets = sys.argv[1:] if len(sys.argv) > 1 else ["tools", "skills", "stacks", "usecases"]

    for target in targets:
        if target not in TABS:
            print(f"❌ Unknown tab: {target}")
            continue

        rows = fetch_tab(target)
        if rows is None:
            continue

        if target == "tools":
            sync_tools(rows)
        elif target == "skills":
            sync_skills(rows)
        elif target == "stacks":
            sync_stacks(rows)
        elif target == "usecases":
            sync_usecases(rows)

    print("\n🏁 Sync complete!")

if __name__ == "__main__":
    main()
