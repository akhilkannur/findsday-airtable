import csv
import json
import urllib.request
import re
import sys
import os

# Configuration
# This is the Master Sheet ID
SHEET_ID = "1lISM0kMrJJSCs-e8nqBZKkKeNExtoXu5KD-mI4GvZN0"

# Tab GIDs
TABS = {
    "tools":    "1367773213",       # tools_export
    "skills":   "SKILLS_GID_HERE",  
    "stacks":   "STACKS_GID_HERE",  
    "usecases": "USECASES_GID_HERE",
}

def csv_url(gid):
    return f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={gid}"

def fetch_tab(name):
    gid = TABS[name]
    if "GID_HERE" in gid:
        return None
    print(f"📥 Fetching {name} tab...")
    try:
        req = urllib.request.Request(csv_url(gid), headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            if response.status != 200:
                print(f"❌ Failed to fetch {name}: {response.status}")
                return None
            content = response.read().decode('utf-8')
            return list(csv.DictReader(content.splitlines()))
    except Exception as e:
        print(f"❌ Error fetching {name}: {e}")
        return None

def parse_list(s):
    if not s or s == "[]": return []
    try:
        # Handle cases where it's already valid JSON
        return json.loads(s.replace("'", '"'))
    except:
        # Fallback for comma-separated lists
        if s.startswith("[") and s.endswith("]"): s = s[1:-1]
        return [item.strip().strip('"').strip("'") for item in s.split(",") if item.strip()]

def parse_bool(s):
    if not s: return False
    return s.upper() == "TRUE"

def format_value(v):
    if isinstance(v, bool): return "true" if v else "false"
    if isinstance(v, list): return json.dumps(v)
    if v is None: return "undefined"
    # Basic escaping for strings to prevent breaking TS
    escaped = str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '')
    return f'"{escaped}"'

def escape_ts_string(s):
    """Safely escape a string for use inside backticks."""
    if not s: return ""
    # We escape backslashes and backticks
    return str(s).replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

def format_integrations(val):
    """Robustly format the integrations column JSON for TypeScript."""
    if not val or val == "[]" or val == "":
        return "[]"
    
    try:
        # 1. Clean the input string
        cleaned = val.strip()
        # If it's wrapped in single quotes from the CSV export, remove them
        if cleaned.startswith("'") and cleaned.endswith("'"):
            cleaned = cleaned[1:-1]
        
        # 2. Try to parse as JSON
        # We try replacing common spreadsheet single-quote issues
        try:
            data = json.loads(cleaned)
        except:
            data = json.loads(cleaned.replace("'", '"'))
            
        if not isinstance(data, list):
            data = [data]
            
        # 3. Build the TypeScript string
        formatted = "[\n"
        for item in data:
            formatted += "      {\n"
            for k, v in item.items():
                if k == 'mcpConfig' and v:
                    # Multi-line config is safest in backticks
                    formatted += f"        {k}: `{escape_ts_string(v)}`,\n"
                else:
                    formatted += f"        {k}: {format_value(v)},\n"
            formatted += "      },\n"
        formatted += "    ]"
        return formatted
    except Exception as e:
        # FINAL FALLBACK: If parsing fails, we output a safe empty array 
        # instead of breaking the build with a syntax error.
        print(f"⚠️  Parsing error for integrations: {e}")
        return "[]"

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

        # Map spreadsheet columns to our object structure
        # We use .get() with defaults to ensure missing columns don't crash the script
        tool = {
            "slug": row.get('slug', '').strip(),
            "name": row.get('name', '').strip(),
            "oneLiner": row.get('oneLiner', '').strip(),
            "description": row.get('description', '').strip(),
            "category": row.get('category', 'Sales Intelligence').strip(),
            "logoUrl": row.get('logoUrl', '/placeholder.svg').strip(),
            "websiteUrl": row.get('websiteUrl', '').strip(),
            "docsUrl": row.get('docsUrl', '').strip(),
            "pricingUrl": row.get('pricingUrl', '').strip(),
            "githubUrl": row.get('githubUrl', ''),
            "apiType": parse_list(row.get('apiType', '["REST"]')),
            "authMethod": parse_list(row.get('authMethod', '["API Key"]')),
            "hasFreeTier": parse_bool(row.get('hasFreeTier', 'FALSE')),
            "sdkLanguages": parse_list(row.get('sdkLanguages', '[]')),
            "hasWebhooks": parse_bool(row.get('hasWebhooks', 'FALSE')),
            "hasOpenApiSpec": parse_bool(row.get('hasOpenApiSpec', 'FALSE')),
            "openApiSpecUrl": row.get('openApiSpecUrl', ''),
            "aiCapabilities": parse_list(row.get('aiCapabilities', '[]')),
            "aiDifficulty": row.get('aiDifficulty', 'Beginner-Friendly'),
            "starterPrompt": row.get('starterPrompt', ''),
            "mcpReady": parse_bool(row.get('mcpReady', 'FALSE')),
            "isFeatured": parse_bool(row.get('isFeatured', 'FALSE')),
            "alternativeTo": parse_list(row.get('alternativeTo', '[]')),
            "integrations": row.get('integrations', '')
        }
        tools.append(tool)
        cat = tool['category']
        if cat: category_counts[cat] = category_counts.get(cat, 0) + 1

    content = 'import type { SalesTool, CategoryMeta } from "./types"\n\n'
    content += 'export const tools: SalesTool[] = [\n'

    # Sort tools by category then name
    sorted_tools = sorted(tools, key=lambda x: (x['category'], x['name']))
    
    current_cat = None
    for tool in sorted_tools:
        if tool['category'] != current_cat:
            current_cat = tool['category']
            content += f'\n  // ── {current_cat} ──────────────────────────────────────────────\n'

        content += '  {\n'
        # Define field order for cleaner file
        fields = [
            'slug', 'name', 'oneLiner', 'description', 'category', 'logoUrl', 
            'websiteUrl', 'docsUrl', 'pricingUrl', 'githubUrl', 'apiType', 
            'authMethod', 'hasFreeTier', 'sdkLanguages', 'hasWebhooks', 
            'hasOpenApiSpec', 'openApiSpecUrl', 'aiCapabilities', 'aiDifficulty', 
            'starterPrompt', 'mcpReady', 'isFeatured', 'alternativeTo', 'integrations'
        ]
        
        for k in fields:
            v = tool.get(k)
            if k == 'integrations':
                content += f'    {k}: {format_integrations(v)},\n'
            elif k in ['githubUrl', 'openApiSpecUrl'] and not v:
                continue # Skip optional empty fields
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

def main():
    targets = sys.argv[1:] if len(sys.argv) > 1 else ["tools"]
    for target in targets:
        rows = fetch_tab(target)
        if rows:
            if target == "tools":
                sync_tools(rows)
    print("\n🏁 Sync complete!")

if __name__ == "__main__":
    main()
