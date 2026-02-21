import csv

# Verification Map (Corrected URLs based on research)
corrections = {
    "journey.io": "https://journey.io", # Fallback to homepage
    "cognism.com/api-docs": "https://cognism.com/api",
    "crawl4ai.com/docs": "https://docs.crawl4ai.com",
    "jina.ai/reader/api": "https://jina.ai/reader",
    "developers.outreach.io/api/reference/": "https://developers.outreach.io/api/reference",
    "amplemarket.com/product/research": "https://amplemarket.com/api/guides",
    "klue.com/developers": "https://klue.com", # Fallback
    "zapier.com/engineering/mcp": "https://zapier.com/help/create/customize/model-context-protocol-mcp-in-zapier",
    "getvocal.ai/docs": "https://getvocal.ai", # Fallback
    "koncert.com/developers": "https://www.koncert.com", # Fallback
    "www.leadmine.net/docs": "https://www.leadmine.net/api",
    "docs.saleshandy.com/api": "https://www.saleshandy.com", # Fallback
    "salesmotion.io/developers": "https://salesmotion.io", # Fallback
    "docs.zeliq.com/api": "https://www.zeliq.com", # Fallback
    "woodpecker.co/help/api-documentation/": "https://woodpecker.co/docs",
    "leadiq.com/developers": "https://leadiq.com", # Fallback
    "meetalfred.com/api": "https://meetalfred.com", # Fallback
    "postaga.com": "https://postaga.com", # Keep as is or check
    "spotio.com/developers/": "https://spotio2.com/developer",
    "api.salesflare.com/": "https://api.salesflare.com",
    "salesblink.io/docs": "https://salesblink.io/api-docs",
    "sparkbase.ai/": "https://sparkbase.ai",
    "developers.qwilr.com/": "https://qwilr.com", # Fallback
    "aloware.com/docs/api-v2/": "https://aloware.com" # Fallback
}

input_file = 'tools_export.csv'
output_file = 'tools_fixed.csv'

with open(input_file, mode='r', newline='', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    fieldnames = reader.fieldnames
    
    with open(output_file, mode='w', newline='', encoding='utf-8') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in reader:
            docs_url = row.get('docsUrl', '')
            # Match by substring to be safe with trailing slashes or minor variations
            for broken, fixed in corrections.items():
                if broken in docs_url:
                    row['docsUrl'] = fixed
                    break
            writer.writerow(row)

print(f"Fixed {len(corrections)} potential broken links. Saved to {output_file}")
