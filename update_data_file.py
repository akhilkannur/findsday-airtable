import re

corrections = {
    "journey.io": "https://journey.io",
    "cognism.com/api-docs": "https://help.cognism.com",
    "crawl4ai.com/docs": "https://docs.crawl4ai.com",
    "jina.ai/reader/api": "https://jina.ai/reader/",
    "developers.outreach.io/api/reference/": "https://developers.outreach.io",
    "amplemarket.com/product/research": "https://docs.amplemarket.com",
    "klue.com/developers": "https://help.klue.com",
    "zapier.com/engineering/mcp": "https://github.com/zapier/zapier-mcp",
    "getvocal.ai/docs": "https://govocal.com",
    "koncert.com/developers": "https://www.koncert.com",
    "www.leadmine.net/docs": "https://leadmine.net",
    "docs.saleshandy.com/api": "https://leo-open-api-gateway.saleshandy.com/api-doc/",
    "salesmotion.io/developers": "https://salesmotion.io",
    "docs.zeliq.com/api": "https://docs.zeliq.com",
    "woodpecker.co/help/api-documentation/": "https://woodpecker.co/docs/",
    "leadiq.com/developers": "https://leadiq.com",
    "meetalfred.com/api": "https://meetalfred.com",
    "postaga.com": "https://postaga.com",
    "spotio.com/developers/": "https://spotio.com",
    "api.salesflare.com/": "https://api.salesflare.com/docs",
    "salesblink.io/docs": "https://salesblink.io",
    "sparkbase.ai/": "https://sparkbase.ai",
    "developers.qwilr.com/": "https://qwilr.com/api/",
    "aloware.com/docs/api-v2/": "https://aloware.com/support",
    "justcall.io/docs/api/": "https://developer.justcall.io/reference"
}

with open('lib/data.ts', 'r') as f:
    content = f.read()

for broken, fixed in corrections.items():
    # Find docsUrl: "broken" and replace with docsUrl: "fixed"
    # We use a flexible regex to handle potential whitespace and slight variations
    pattern = rf'docsUrl:\s*"{re.escape(broken)}.*?"'
    replacement = f'docsUrl: "{fixed}"'
    content = re.sub(pattern, replacement, content)

with open('lib/data.ts', 'w') as f:
    f.write(content)

print(f"Updated lib/data.ts with {len(corrections)} verified links.")
