import csv
import json
import requests
import re
import sys
import os

# Configuration
SHEET_ID = "1lISM0kMrJJSCs-e8nqBZKkKeNExtoXu5KD-mI4GvZN0"
GID = "1367773213"
CSV_URL = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={GID}"
OUTPUT_FILE = "lib/data.ts"

def parse_list(s):
    if not s or s == "[]":
        return []
    try:
        # Try to parse as JSON first
        return json.loads(s.replace("'", '"'))
    except:
        # Fallback for simple comma-separated strings if not JSON
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
    # Escaping backslashes and double quotes for TS
    escaped = v.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '')
    return f'"{escaped}"'

# SEO-focused Category Metadata
CATEGORIES_META = [
    {"slug": "sales-intelligence", "name": "Sales Intelligence", "description": "Find prospects and enrich lead lists with real-time B2B contact data and technographic signals.", "icon": "Search"},
    {"slug": "sales-engagement", "name": "Sales Engagement", "description": "Orchestrate automated multichannel outreach across email, LinkedIn, and social media platforms.", "icon": "Zap"},
    {"slug": "phone-and-dialers", "name": "Phone & Dialers", "description": "Scale your outbound volume with power dialers, AI voice agents, and cloud calling infrastructure.", "icon": "Phone"},
    {"slug": "crm-and-revops", "name": "CRM & RevOps", "description": "Manage customer relationships and automate the revenue operations lifecycle with modern sales infrastructure.", "icon": "Users"},
    {"slug": "revenue-intelligence", "name": "Revenue Intelligence", "description": "Analyze sales conversations and deal health to improve pipeline forecasting and revenue growth.", "icon": "BarChart3"},
    {"slug": "sales-enablement", "name": "Sales Enablement", "description": "Equip sales teams with the content, coaching, and playbooks needed to shorten sales cycles.", "icon": "GraduationCap"},
    {"slug": "closing-and-scheduling", "name": "Closing & Scheduling", "description": "Automate meeting booking and simplify the document signing process to close deals faster.", "icon": "Calendar"}
]

def main():
    print(f"📥 Fetching data from Google Sheet...")
    response = requests.get(CSV_URL)
    if response.status_code != 200:
        print(f"❌ Failed to fetch sheet: {response.status_code}")
        sys.exit(1)
    
    content = response.content.decode('utf-8')
    reader = csv.DictReader(content.splitlines())
    
    tools = []
    category_counts = {}
    
    for row in reader:
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

    # Reconstruct the file
    new_content = 'import type { SalesTool, CategoryMeta } from "./types"\n\n'
    new_content += 'export const tools: SalesTool[] = [\n'
    
    current_cat = None
    for tool in sorted(tools, key=lambda x: (x['category'] or '', x['name'] or '')):
        if tool['category'] != current_cat:
            current_cat = tool['category']
            new_content += f'\n  // ── {current_cat} ──────────────────────────────────────────────\n'
        
        new_content += '  {\n'
        for k, v in tool.items():
            if k == 'integrations':
                val = v if v and v != "[]" else "[]"
                # Basic cleanup to ensure TS doesn't break
                if val.strip().startswith('{') and not val.strip().startswith('['):
                    val = f'[{val}]'
                # Check for unbalanced braces (simple fix for cut-off data)
                if val.count('{') > val.count('}'): val += '}' * (val.count('{') - val.count('}'))
                if val.count('[') > val.count(']'): val += ']' * (val.count('[') - val.count(']'))
                # Replace unescaped single quotes inside the config strings if needed
                # For now, we assume the CSV has valid-ish JS object syntax
                new_content += f'    {k}: {val},\n'
            elif k in ['githubUrl', 'openApiSpecUrl'] and not v:
                continue
            else:
                new_content += f'    {k}: {format_value(v)},\n'
        new_content += '  },\n'
    
    new_content += ']\n\n'
    new_content += 'export const categories: CategoryMeta[] = [\n'
    for cat in CATEGORIES_META:
        count = category_counts.get(cat["name"], 0)
        new_content += f'  {{\n    slug: "{cat["slug"]}",\n    name: "{cat["name"]}",\n    description: "{cat["description"]}",\n    icon: "{cat["icon"]}",\n    toolCount: {count},\n  }},\n'
    new_content += ']\n'

    with open(OUTPUT_FILE, 'w') as f:
        f.write(new_content)
    print(f"✅ Success: Updated lib/data.ts")

if __name__ == "__main__":
    main()
