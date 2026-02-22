import re
import csv
import os

def parse_ts_file(file_path):
    if not os.path.exists(file_path):
        return []
    with open(file_path, 'r') as f:
        content = f.read()
    
    tools_match = re.search(r'export const tools: SalesTool\[\] = \[(.*?)\]\s+export const categories', content, re.DOTALL)
    if not tools_match:
        return []
    
    tools_content = tools_match.group(1)
    obj_pattern = re.compile(r'\{\s+slug: "(.*?)".*?
\s+\},', re.DOTALL)
    tools = []
    
    for match in obj_pattern.finditer(tools_content):
        obj_text = match.group(0)
        
        def get_field(field, text):
            m = re.search(rf'{field}:\s*(.*?),
', text)
            if not m: return ""
            val = m.group(1).strip()
            if val.startswith('"') and val.endswith('"'):
                return val[1:-1]
            return val

        def get_integrations(text):
            m = re.search(r'integrations:\s*\[(.*?)\]', text, re.DOTALL)
            if not m: return "[]"
            return m.group(1).strip()

        tool = {
            "slug": match.group(1),
            "name": get_field("name", obj_text),
            "oneLiner": get_field("oneLiner", obj_text),
            "description": get_field("description", obj_text),
            "category": get_field("category", obj_text),
            "logoUrl": get_field("logoUrl", obj_text),
            "websiteUrl": get_field("websiteUrl", obj_text),
            "docsUrl": get_field("docsUrl", obj_text),
            "pricingUrl": get_field("pricingUrl", obj_text),
            "apiType": get_field("apiType", obj_text),
            "authMethod": get_field("authMethod", obj_text),
            "hasFreeTier": get_field("hasFreeTier", obj_text),
            "sdkLanguages": get_field("sdkLanguages", obj_text),
            "hasWebhooks": get_field("hasWebhooks", obj_text),
            "aiCapabilities": get_field("aiCapabilities", obj_text),
            "aiDifficulty": get_field("aiDifficulty", obj_text),
            "starterPrompt": get_field("starterPrompt", obj_text),
            "mcpReady": get_field("mcpReady", obj_text),
            "isFeatured": get_field("isFeatured", obj_text),
            "alternativeTo": get_field("alternativeTo", obj_text),
            "integrations": get_integrations(obj_text)
        }
        tools.append(tool)
    return tools

tools = parse_ts_file('lib/data.ts')
if tools:
    keys = tools[0].keys()
    with open('tools_export.csv', 'w', newline='') as f:
        dict_writer = csv.DictWriter(f, keys)
        dict_writer.writeheader()
        dict_writer.writerows(tools)
    print(f"✅ Success: Exported {len(tools)} tools to tools_export.csv")
else:
    print("❌ Error: No tools found to export.")
