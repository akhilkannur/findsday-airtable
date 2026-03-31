const fs = require('fs');
const path = require('path');

const CAP_MAPPING = {
  // Mapping existing tags to Canonical Tags
  "prospecting": "Lead Generation",
  "lead discovery": "Lead Generation",
  "lead generation": "Lead Generation",
  "lead search": "Lead Generation",
  "b2b data": "Lead Generation",
  "contact search": "Lead Generation",
  "lead list": "Lead Generation",
  "list building": "Lead Generation",
  "prospect discovery": "Lead Generation",
  "finding leads": "Lead Generation",
  "b2b contacts": "Lead Generation",
  
  "email verification": "Email Verification",
  "validation": "Email Verification",
  "cleaning": "Email Verification",
  "deliverability": "Email Verification",
  "bounce": "Email Verification",
  "verify email": "Email Verification",
  "list cleaning": "Email Verification",
  "contact validation": "Email Verification",
  
  "outreach automation": "Cold Email Outreach",
  "cold email": "Cold Email Outreach",
  "email sequencing": "Cold Email Outreach",
  "email outreach": "Cold Email Outreach",
  "email automation": "Cold Email Outreach",
  "sequencing": "Cold Email Outreach",
  "automated outreach": "Cold Email Outreach",
  
  "linkedin": "LinkedIn Automation",
  "linkedin automation": "LinkedIn Automation",
  "social selling": "LinkedIn Automation",
  "linkedin outreach": "LinkedIn Automation",
  "linkedin personalization": "LinkedIn Automation",
  "connection requests": "LinkedIn Automation",
  "linkedin prospecting": "LinkedIn Automation",
  
  "ai sdr": "AI SDR & Agents",
  "ai bdr": "AI SDR & Agents",
  "ai agents": "AI SDR & Agents",
  "ai sales agent": "AI SDR & Agents",
  "autonomous agents": "AI SDR & Agents",
  "ai worker": "AI SDR & Agents",
  "agent-native": "AI SDR & Agents",
  
  "conversation intelligence": "Conversation Intelligence",
  "call analytics": "Conversation Intelligence",
  "meeting summaries": "Conversation Intelligence",
  "transcript": "Conversation Intelligence",
  "call transcription": "Conversation Intelligence",
  "sentiment": "Conversation Intelligence",
  "meeting prep": "Conversation Intelligence",
  "action item extraction": "Conversation Intelligence",
  
  "crm sync": "CRM Automation",
  "crm integration": "CRM Automation",
  "data automation": "CRM Automation",
  "crm data": "CRM Automation",
  "data sync": "CRM Automation",
  "workflow automation": "Sales Automation",
  "automation": "Sales Automation",
  "sales automation": "Sales Automation",
  
  "contact enrichment": "B2B Data Enrichment",
  "data enrichment": "B2B Data Enrichment",
  "company enrichment": "B2B Data Enrichment",
  "enrichment": "B2B Data Enrichment",
  "company data": "B2B Data Enrichment",
  "firmographic": "B2B Data Enrichment",
  
  "sales enablement": "Sales Enablement",
  "content management": "Sales Enablement",
  "playbook": "Sales Enablement",
  "coaching": "Sales Enablement",
  "learning": "Sales Enablement",
  
  "revenue intelligence": "Revenue Intelligence",
  "deal intelligence": "Revenue Intelligence",
  "forecast": "Revenue Intelligence",
  "pipeline": "Revenue Intelligence",
  "deal health": "Revenue Intelligence",
  
  "meeting scheduling": "Meeting Scheduling",
  "calendar management": "Meeting Scheduling",
  "appointment booking": "Meeting Scheduling",
  "calendar": "Meeting Scheduling",
  "booking": "Meeting Scheduling",
  
  "personalization": "Personalized Outreach",
  "ai writing": "Personalized Outreach",
  "ai personalization": "Personalized Outreach",
  "writing": "Personalized Outreach",
  "copywriting": "Personalized Outreach",
  "content generation": "Personalized Outreach",
  "video": "Personalized Outreach",
  
  "dialer": "AI Voice & Dialers",
  "voice": "AI Voice & Dialers",
  "phone": "AI Voice & Dialers",
  "calling": "AI Voice & Dialers",
  "power dialer": "AI Voice & Dialers",
  "ai voice": "AI Voice & Dialers",
  "cloud calling": "AI Voice & Dialers",
  
  "cpq": "CPQ & Closing",
  "quote": "CPQ & Closing",
  "proposal": "CPQ & Closing",
  "contract": "CPQ & Closing",
  "e-signature": "CPQ & Closing",
  "proposal generation": "CPQ & Closing",
  
  "web scraping": "Web Scraping",
  "data extraction": "Web Scraping",
  "scrape": "Web Scraping",
  "crawl": "Web Scraping",
  "extraction": "Web Scraping",
  
  "intent": "Intent Intelligence",
  "signal": "Intent Intelligence",
  "monitoring": "Intent Intelligence",
  "intent signals": "Intent Intelligence",
  "buyer intent": "Intent Intelligence",
  
  "abm": "ABM Automation",
  "target account": "ABM Automation",
  "account intelligence": "ABM Automation",
  "account management": "ABM Automation",
  
  "sales coaching": "Sales Coaching",
  "coaching feedback": "Sales Coaching",
  "roleplay": "Sales Coaching",
  
  "lead scoring": "Lead Management & Scoring",
  "lead routing": "Lead Management & Scoring",
  "scoring": "Lead Management & Scoring",
  "lead management": "Lead Management & Scoring",
  
  "customer success": "Customer Success",
  "support": "Customer Success",
  "helpdesk": "Customer Success",
  "tickets": "Customer Success",
  
  "gdpr": "Data Privacy",
  "compliance": "Data Privacy",
  "privacy": "Data Privacy"
};

const CATEGORY_FIXES = {
  "chorus-ai": "Revenue Intelligence",
  "jiminny": "Revenue Intelligence",
  "avoma": "Revenue Intelligence",
  "fireflies": "Revenue Intelligence",
  "fathom": "Revenue Intelligence",
  "notta": "Revenue Intelligence",
  "otter-ai": "Revenue Intelligence",
  "recall-ai": "Revenue Intelligence",
};

async function run() {
  const dataPath = path.join(process.cwd(), 'lib/data.ts');
  const content = fs.readFileSync(dataPath, 'utf8');
  const toolRegex = /\{\n\s+slug:\s*"([^"]+)",(.*?)\n\s+\},/gs;
  
  let match;
  let lastIndex = 0;
  let newContent = "";
  let count = 0;

  while ((match = toolRegex.exec(content)) !== null) {
    newContent += content.substring(lastIndex, match.index);
    const slug = match[1];
    let toolBody = match[2];
    
    // Fix Category
    if (CATEGORY_FIXES[slug]) {
      toolBody = toolBody.replace(/category: "[^"]+"/, `category: "${CATEGORY_FIXES[slug]}"`);
    }

    // Add Canonical Capabilities by Mapping Tags
    const capMatch = toolBody.match(/aiCapabilities: \[(.*?)\]/s);
    if (capMatch) {
      const existingCapsStr = capMatch[1];
      const existingCaps = existingCapsStr.split(',').map(c => c.trim().replace(/"/g, '')).filter(c => c);
      const newCaps = [...existingCaps];
      
      existingCaps.forEach(cap => {
        const lowerCap = cap.toLowerCase();
        // Exact match
        if (CAP_MAPPING[lowerCap]) {
          if (!newCaps.includes(CAP_MAPPING[lowerCap])) {
            newCaps.push(CAP_MAPPING[lowerCap]);
          }
        }
        // Substring match for common terms
        Object.entries(CAP_MAPPING).forEach(([trigger, canonical]) => {
          if (lowerCap.includes(trigger) && !newCaps.includes(canonical)) {
            newCaps.push(canonical);
          }
        });
      });

      const newCapsStr = newCaps.map(c => `"${c}"`).join(", ");
      toolBody = toolBody.replace(/aiCapabilities: \[(.*?)\]/s, `aiCapabilities: [${newCapsStr}]`);
    }

    newContent += `{\n    slug: "${slug}",${toolBody}\n  },`;
    lastIndex = toolRegex.lastIndex;
    count++;
  }
  
  newContent += content.substring(lastIndex);
  fs.writeFileSync(dataPath, newContent);
  console.log(`Processed ${count} tools.`);
}

run().catch(err => console.error(err));
