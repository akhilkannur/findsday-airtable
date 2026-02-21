import csv

# Verification Map (Rigorous check results)
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

input_file = 'tools_export.csv'
output_file = 'tools_fixed_v2.csv'

with open(input_file, mode='r', newline='', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    fieldnames = reader.fieldnames
    
    with open(output_file, mode='w', newline='', encoding='utf-8') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in reader:
            docs_url = row.get('docsUrl', '')
            # Match by substring
            updated = False
            for broken, fixed in corrections.items():
                if broken in docs_url:
                    row['docsUrl'] = fixed
                    updated = True
                    break
            writer.writerow(row)

print(f"Fixed {len(corrections)} links using rigorous research. Saved to {output_file}")
