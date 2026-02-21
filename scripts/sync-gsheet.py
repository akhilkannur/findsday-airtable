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
    # Escaping double quotes and newlines for strings in TS
    escaped = v.replace('"', '\\"').replace('\n', '\\n').replace('\r', '')
    return f'"{escaped}"'

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
        
        # Parse fields
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
        if cat:
            category_counts[cat] = category_counts.get(cat, 0) + 1

    # Read the current lib/data.ts to preserve the categories metadata structure
    with open(OUTPUT_FILE, 'r') as f:
        old_content = f.read()

    # Extract categories array
    cat_match = re.search(r'export const categories: CategoryMeta\[\] = \[(.*?)\]', old_content, re.DOTALL)
    if not cat_match:
        print("❌ Could not find categories array in lib/data.ts")
        sys.exit(1)
    
    cat_text = cat_match.group(1)
    
    # Reconstruct the file
    new_content = 'import type { SalesTool, CategoryMeta } from "./types"\n\n'
    new_content += 'export const tools: SalesTool[] = [\n'
    
    # Group tools by category for readability
    current_cat = None
    for tool in sorted(tools, key=lambda x: (x['category'] or '', x['name'] or '')):
        if tool['category'] != current_cat:
            current_cat = tool['category']
            new_content += f'\n  // ── {current_cat} ──────────────────────────────────────────────\n'
        
        new_content += '  {\n'
        for k, v in tool.items():
            if k == 'integrations':
                val = v if v and v != "[]" else "[]"
                if val.strip().startswith('{') and not val.strip().startswith('['):
                    val = f'[{val}]'
                new_content += f'    {k}: {val},\n'
            elif k in ['githubUrl', 'openApiSpecUrl'] and not v:
                continue
            else:
                new_content += f'    {k}: {format_value(v)},\n'
        new_content += '  },\n'
    
    new_content += ']\n\n'

    # Update counts in cat_text
    for cat_name, count in category_counts.items():
        block_pattern = rf'{{[^}}]*?name: "{cat_name}"[^}}]*?}}'
        block_match = re.search(block_pattern, cat_text, re.DOTALL)
        if block_match:
            block = block_match.group(0)
            new_block = re.sub(r'toolCount: \d+', f'toolCount: {count}', block)
            cat_text = cat_text.replace(block, new_block)

    new_content += 'export const categories: CategoryMeta[] = [' + cat_text + ']\n'

    with open(OUTPUT_FILE, 'w') as f:
        f.write(new_content)
    
    print(f"✅ Success: Updated {len(tools)} tools across {len(category_counts)} categories in {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
