# Skill: Moving Tools from Monitoring to API Page

## Task
Find tools in the monitoring list (lib/data.ts without docsUrl) that actually have public API documentation, and update their docsUrl field to move them to the main API pages.

## Key Files
- **lib/data.ts** - Main data file containing all tools
- **lib/tools.ts** - Helper functions:
  - `getAllTools()` - Returns tools WITH docsUrl (reversed)
  - `getToolsWithoutDocs()` - Returns tools WITHOUT docsUrl (monitoring list)

## Workflow

### Step 1: Identify candidate tools
Run this to get the list of tools without docsUrl:
```bash
npx tsx -e "
import { tools } from './lib/data';
const noDocs = tools.filter(t => !t.docsUrl || t.docsUrl === '');
noDocs.forEach((t, i) => console.log(\`\${i+1}. \${t.name} - \${t.category}\`));
"
```

### Step 2: Research API docs
Search for each tool's API documentation using web search. Look for:
- `developers.[toolname].com`
- `docs.[toolname].com`
- `api.[toolname].com`
- Check if they have OAuth or API key authentication

### Step 3: Update lib/data.ts
Once you find a valid docsUrl, update the tool entry:
```
docsUrl: "https://developers.example.com",
```

### Important Notes
- Only add docsUrl for tools that have PUBLIC API documentation
- Filter out pure email sending tools (Brevo, Mailgun, Klaviyo, Mailchimp, etc.) - these aren't sales API tools
- Focus on Sales Engagement, CRM, Sales Intelligence categories
- Many popular tools ALREADY have docsUrl in the system (Outreach, Salesloft, Gong, ZoomInfo, etc. should have docsUrl)

### Example Tools to Check (from 676 without docsUrl)
Sales Engagement: Regie.ai, Relevance AI, SalesAPE.ai, SalesCloser AI, Outreach, Salesloft, Instantly, Smartlead, Reply.io, etc.

CRM: ActiveCampaign, Zoho CRM, Bitrix24, Pipedrive, noCRM.io, Zendesk, Freshdesk

Sales Intelligence: ZoomInfo, Clearbit, Cognism, People Data Labs

Revenue Intelligence: Gong, 6sense, Chorus

## Verification
After updates, verify counts:
```bash
npx tsx -e "
import { tools } from './lib/data';
const withDocs = tools.filter(t => t.docsUrl && t.docsUrl !== '');
const withoutDocs = tools.filter(t => !t.docsUrl || t.docsUrl === '');
console.log('With docsUrl:', withDocs.length);
console.log('Without docsUrl:', withoutDocs.length);
"
```
