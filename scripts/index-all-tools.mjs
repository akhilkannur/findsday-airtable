import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const KEY_FILE = path.join(ROOT, "indexing-key.json");
const SUBMITTED_FILE = path.join(ROOT, ".indexing-submitted.json");
const BASE_URL = "https://salestools.club";

async function main() {
    let submitted = {};
    if (fs.existsSync(SUBMITTED_FILE)) {
        submitted = JSON.parse(fs.readFileSync(SUBMITTED_FILE, "utf8"));
    }

    const today = new Date().toISOString().split("T")[0];

    // 1. Get all tool slugs from lib/data.ts
    const dataContent = fs.readFileSync(path.join(ROOT, "lib/data.ts"), "utf8");
    const slugRegex = /slug:\s*["']([^"']+)["']/g;
    const slugs = [];
    let match;
    while ((match = slugRegex.exec(dataContent)) !== null) {
        slugs.push(match[1]);
    }
    const uniqueSlugs = [...new Set(slugs)];
    const toolUrls = uniqueSlugs.map(slug => `${BASE_URL}/apis/${slug}`);

    // 2. Get categories (approximate from data.ts or hardcoded list)
    // Based on sitemap.ts, categories are also in data.ts but usually in a separate export
    // For now, let's extract all slugs that look like categories or just use common ones
    const categories = [
        "sales-intelligence", "sales-engagement", "crm-and-revops", 
        "revenue-intelligence", "sales-enablement", "phone-and-dialers",
        "closing-and-scheduling"
    ];
    const categoryUrls = categories.map(cat => `${BASE_URL}/categories/${cat}`);

    // 3. Generate VS comparison pages (same logic as sitemap.ts)
    // This requires parsing the alternatives from the file which is complex via regex
    // Let's use the featured ones for now as they are high value
    const featuredVs = [
        "apollo-vs-clay", "apollo-vs-zoominfo", "hubspot-vs-salesforce",
        "instantly-vs-smartlead", "firecrawl-vs-jina-reader", "bland-ai-vs-vapi",
        "cal-com-vs-calendly", "perplexity-vs-tavily"
    ];
    const vsUrls = featuredVs.map(v => `${BASE_URL}/vs/${v}`);

    const allUrls = [...toolUrls, ...categoryUrls, ...vsUrls];
    const toSubmit = allUrls.filter(url => !submitted[url]);

    console.log(`Found ${allUrls.length} total URLs. ${toSubmit.length} pending submission.`);
    
    if (toSubmit.length === 0) {
        console.log("Everything already submitted!");
        return;
    }

    // Daily quota is 200. We already used 100 in the previous run.
    // Let's submit 80 more to be safe.
    const batchSize = 80; 
    const batch = toSubmit.slice(0, batchSize); 
    console.log(`Submitting batch of ${batch.length} URLs...\n`);

    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ["https://www.googleapis.com/auth/indexing"],
    });
    const client = await auth.getClient();

    let success = 0;
    let failed = 0;

    for (const url of batch) {
        try {
            await client.request({
                url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
                method: "POST",
                data: { url, type: "URL_UPDATED" },
            });
            console.log(`✓ ${url}`);
            submitted[url] = today;
            success++;
            await new Promise((r) => setTimeout(r, 500));
        } catch (err) {
            console.error(`✗ ${url} — ${err.message}`);
            failed++;
            if (err.message.includes("quota")) {
                console.log("Daily quota reached.");
                break;
            }
        }
    }

    fs.writeFileSync(SUBMITTED_FILE, JSON.stringify(submitted, null, 2));
    console.log(`\nDone: ${success} submitted, ${failed} failed. ${toSubmit.length - success} remaining.`);
}

main().catch(console.error);
