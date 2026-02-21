import json
import re
import os
import sys
import csv
import gspread
from google.oauth2.service_account import Credentials

# Configuration
CREDENTIALS_PATH = "/home/akhilnairmk/ai-tinkering-examples/ga-credentials.json"
SHEET_ID = "1lISM0kMrJJSCs-e8nqBZKkKeNExtoXu5KD-mI4GvZN0"
DATA_FILE = "lib/data.ts"

def get_field_regex(field, text):
    pattern = rf'{field}:\s*(.*?),\n'
    match = re.search(pattern, text)
    if not match: return ""
    val = match.group(1).strip()
    if val.startswith('"') and val.endswith('"'):
        return val[1:-1].replace('\\"', '"').replace('\\n', '\n')
    return val

def extract_tools_from_ts(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    tools_match = re.search(r'export const tools: SalesTool\[\] = \[(.*?)\]\s+export const categories', content, re.DOTALL)
    if not tools_match: return []
    tools_content = tools_match.group(1)
    # Flexible closing bracket matching
    tool_blocks = re.findall(r'\s+\{\n(.*?)\n\s+\},', tools_content, re.DOTALL)
    tools = []
    for block in tool_blocks:
        slug_match = re.search(r'slug: "(.*?)",', block)
        if not slug_match: continue
        slug = slug_match.group(1)
        tool = {
            "slug": slug,
            "name": get_field_regex("name", block),
            "oneLiner": get_field_regex("oneLiner", block),
            "description": get_field_regex("description", block),
            "category": get_field_regex("category", block),
            "logoUrl": get_field_regex("logoUrl", block),
            "websiteUrl": get_field_regex("websiteUrl", block),
            "docsUrl": get_field_regex("docsUrl", block),
            "pricingUrl": get_field_regex("pricingUrl", block),
            "apiType": get_field_regex("apiType", block),
            "authMethod": get_field_regex("authMethod", block),
            "hasFreeTier": get_field_regex("hasFreeTier", block),
            "sdkLanguages": get_field_regex("sdkLanguages", block),
            "hasWebhooks": get_field_regex("hasWebhooks", block),
            "hasOpenApiSpec": get_field_regex("hasOpenApiSpec", block),
            "aiCapabilities": get_field_regex("aiCapabilities", block),
            "aiDifficulty": get_field_regex("aiDifficulty", block),
            "starterPrompt": get_field_regex("starterPrompt", block),
            "mcpReady": get_field_regex("mcpReady", block),
            "isFeatured": get_field_regex("isFeatured", block),
            "alternativeTo": get_field_regex("alternativeTo", block),
            "integrations": ""
        }
        int_match = re.search(r'integrations:\s*(\[.*?\]),', block, re.DOTALL)
        if int_match: tool["integrations"] = int_match.group(1).strip()
        tools.append(tool)
    return tools

def main():
    if not os.path.exists(CREDENTIALS_PATH):
        print("❌ Credentials not found")
        sys.exit(1)
    tools = extract_tools_from_ts(DATA_FILE)
    if not tools:
        print("❌ No tools extracted")
        sys.exit(1)
    scopes = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
    credentials = Credentials.from_service_account_file(CREDENTIALS_PATH, scopes=scopes)
    gc = gspread.authorize(credentials)
    sh = gc.open_by_key(SHEET_ID)
    worksheet = sh.get_worksheet(0)
    headers = list(tools[0].keys())
    data_rows = [headers]
    for tool in tools:
        row = [tool.get(h, "") for h in headers]
        data_rows.append(row)
    worksheet.clear()
    worksheet.update(values=data_rows, range_name='A1')
    print(f"🏁 Successfully synced {len(tools)} tools to Google Sheets.")

if __name__ == "__main__":
    main()
