import { tools } from "./data"
import type { SalesTool, ToolCategory } from "./types"

export interface Guide {
  slug: string
  title: string
  metaDescription: string
  intro: string
  content?: string
  categories?: ToolCategory[]
  keywords?: string[]
}

const guides: Guide[] = [
  {
    slug: "crm-apis",
    title: "Best CRM APIs for AI Agents & Sales Ops 2026",
    metaDescription:
      "Scale your sales ops with the best CRM APIs. Compare HubSpot, Salesforce, Attio, and Twenty. Learn about custom objects, webhooks, and agentic workflows.",
    intro:
      "In 2026, a CRM is no longer just a digital rolodex, it is the Source of Truth for your autonomous agents. A CRM API is the programmatic bridge that allows your AI SDRs, research agents, and automated workflows to read and write data without manual entry.",
    content: `
<h2>What is a CRM API?</h2>
<p>Think of a CRM API as a digital librarian. It is a set of rules that allows your external tools, like your AI SDRs or marketing apps, to talk directly to your customer database. It transforms your CRM from a static screen you look at into a dynamic "Central Nervous System," ensuring every tool in your stack has the right data at the right time.</p>

<h3>CRM API vs. CRM Integration</h3>
<p>While people often use these words for the same thing, there is a small difference. The <strong>API</strong> is the "doorway" (the technical path), while the <strong>Integration</strong> is the actual bridge you build to walk through that door and sync data between systems.</p>

<h2>How CRM APIs Work: Simplified Actions</h2>
<p>Most modern CRMs use a standard way of talking called a <strong>REST API</strong>. It works on a simple "Action and Reaction" logic. Your AI uses four basic commands to manage your records:</p>
<ul>
  <li><strong>POST (Create):</strong> Like adding a new contact to your phone from a web form.</li>
  <li><strong>GET (Read):</strong> Like looking up a friend's address before your AI agent calls them.</li>
  <li><strong>PUT (Update):</strong> Like changing a deal from "In Progress" to "Closed" once a contract is signed.</li>
  <li><strong>DELETE (Remove):</strong> Like shredding duplicate or junk files to keep things clean.</li>
</ul>
<p>The system typically responds in <strong>JSON</strong>, which is just a simple, text-based checklist format that AI agents can read and understand instantly.</p>

<h2>Core CRM Parts to Sync</h2>
<p>To build an effective sync, you just need to know how the "folders" in your CRM are labeled:</p>
<ul>
  <li><strong>Leads:</strong> People who might buy, but aren't qualified yet.</li>
  <li><strong>Contacts & Accounts:</strong> The specific people you talk to and the companies they work for.</li>
  <li><strong>Deals:</strong> Where you track the money and what stage the sale is in.</li>
  <li><strong>Custom Objects:</strong> Special folders for unique data (like <code>Investors</code> or <code>Properties</code>) found in flexible CRMs like <strong><a href="/apis/attio">Attio</a></strong>.</li>
</ul>

<h2>Top CRM APIs Compared (2026 Edition)</h2>
<p>We've vetted the market leaders based on how easy they are to use for AI "tinkerers":</p>

<table>
  <thead>
    <tr>
      <th>API Provider</th>
      <th>Category</th>
      <th>Key Differentiator</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/apis/hubspot"><strong>HubSpot</strong></a></td>
      <td>CRM & RevOps</td>
      <td>The friendliest option with great help docs and reliable alerts.</td>
    </tr>
    <tr>
      <td><a href="/apis/salesforce"><strong>Salesforce</strong></a></td>
      <td>CRM & RevOps</td>
      <td>The most powerful option, now with new <strong>Agentforce</strong> AI tools built-in.</td>
    </tr>
    <tr>
      <td><a href="/apis/pipedrive"><strong>Pipedrive</strong></a></td>
      <td>CRM & RevOps</td>
      <td>Simple and fast, great for triggering actions when a deal moves.</td>
    </tr>
    <tr>
      <td><a href="/apis/attio"><strong>Attio</strong></a></td>
      <td>CRM & RevOps</td>
      <td>Built like a flexible database, perfect for teams building custom AI tools.</td>
    </tr>
    <tr>
      <td><a href="/apis/twenty"><strong>Twenty</strong></a></td>
      <td>CRM & RevOps</td>
      <td>An open-source option that gives you full control over your data.</td>
    </tr>
    <tr>
      <td><a href="/apis/activecampaign"><strong>ActiveCampaign</strong></a></td>
      <td>CRM & RevOps</td>
      <td>Great for starting email automations based on what happens in your CRM.</td>
    </tr>
  </tbody>
</table>

<h2>Modern Workflow: The "Find & Map" Logic</h2>
<p>You don't need to be a coder to use these. You can use a "Prompt and Execute" workflow with AI tools like Claude or Cursor:</p>
<ol>
  <li><strong>Get your data:</strong> (e.g., A list of new leads from <strong><a href="/apis/uplead">UpLead</a></strong>).</li>
  <li><strong>Feed the Docs:</strong> Paste the link to your CRM's API help page into Claude.</li>
  <li><strong>The Prompt:</strong> <em>"Claude, write a script that takes this list of leads and puts them into HubSpot. If a lead already exists, just update their phone number."</em></li>
</ol>

<h2>Webhooks: Instant Notifications</h2>
<p>Instead of your AI constantly checking "Is there new data?", it should use <strong>Webhooks</strong>. These are like instant text alerts. For example, when a deal is updated in <strong>Pipedrive</strong>, it can instantly tell a tool like <strong><a href="/apis/relay">Relay</a></strong> to have an AI agent draft a "Thank You" email.</p>

<h2>Security & Safety</h2>
<p>Since CRMs hold private customer info, security is key:</p>
<ul>
  <li><strong>Permissions:</strong> Give your AI its own login with "Limited Access" so it can't accidentally delete your whole database.</li>
  <li><strong>Safe Connections:</strong> Use modern connection methods (like OAuth) which are like "Valet Keys." They let the AI do its job without giving it your master password.</li>
</ul>

<h2>FAQ</h2>
<p><strong>Q: What are rate limits?</strong><br>A: Think of this as a "speed limit" for how many requests you can make per hour. If you go too fast, the CRM will ask you to wait a minute.</p>
<p><strong>Q: Can I build this without writing code?</strong><br>A: Yes! Tools like <strong><a href="/apis/relay">Relay</a></strong> or <strong><a href="/apis/zapier">Zapier</a></strong> let you connect these APIs using simple "if this, then that" blocks.</p>

<h2>Conclusion</h2>
<p>Your CRM API is the engine of your sales machine. By connecting it to AI tools, you stop doing manual data entry and start closing more deals. Check out our <a href="/categories/crm-and-revops">CRM Category</a> to find your next "Lego block."</p>
    `,
    categories: ["CRM & RevOps"],
  },
  {
    slug: "cold-email-apis",
    title: "Best Cold Email APIs for Automated Sales 2026",
    metaDescription:
      "Scale your outbound with the best Cold Email APIs. Compare Instantly, Smartlead, and Mailgun. Learn about mailbox rotation, automated warmup, and agentic workflows.",
    intro:
      "Scaling outbound sales manually is impossible. In 2026, top teams use Cold Email APIs to manage thousands of mailboxes, automate deliverability, and trigger sequences via AI agents. This guide breaks down the best 'Lego blocks' for your outreach stack.",
    content: `
<h2>What is a Cold Email API?</h2>
<p>A Cold Email API is a technical tool built specifically for sending outbound sales emails. Unlike standard email services (like SendGrid), these APIs are designed to handle <strong>Mailbox Rotation</strong>, <strong>Spintax</strong>, and <strong>Automated Warmup</strong>, ensuring your messages actually land in the inbox instead of the spam folder.</p>

<h3>Cold Email vs. Standard Email (Why you shouldn't use Gmail)</h3>
<p>A common mistake is using standard services like Mailchimp or personal Gmail for cold outreach. These are for people who already know you. Cold email requires "human-like" sending. If you send 500 emails at once from a fresh account, you'll be blocked. Cold email APIs solve this by spreading your emails across many different accounts so no single one looks suspicious.</p>

<h2>3 Key Features You Need</h2>
<p>To build a modern sales engine, your API must handle these three things:</p>

<h3>1. Mailbox Rotation</h3>
<p>Modern APIs (like <strong><a href="/apis/instantly">Instantly</a></strong>) let you connect 50 or more email accounts. When you send a campaign, the API "rotates" between them. It’s like having 50 different people send one email each, rather than one person sending 50. This keeps your reputation safe.</p>

<h3>2. Automated "Warmup"</h3>
<p>You can't start sending 100 emails a day from a new domain. APIs like <strong><a href="/apis/smartlead">Smartlead</a></strong> have a "Warmup" mode. It’s like a gym for your email: it automatically sends and receives small messages to prove to Google and Outlook that you are a real person before you start your sales campaign.</p>

<h3>3. "Spintax" (Word Shuffling)</h3>
<p>If you send the exact same email to 1,000 people, spam filters will catch you. <strong>Spintax</strong> lets you write variations like <code>{Hi|Hello|Hey}</code>. The API picks one at random for every email, making each message unique.</p>

<h2>Top Cold Email APIs Compared (2026 Edition)</h2>
<p>We've picked the best options based on how easy they are to plug into an AI stack:</p>

<table>
  <thead>
    <tr>
      <th>API Provider</th>
      <th>Primary Category</th>
      <th>Key Differentiator</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/apis/instantly"><strong>Instantly.ai</strong></a></td>
      <td>Engagement</td>
      <td>The easiest "all-in-one" choice with unlimited accounts and built-in warmup.</td>
    </tr>
    <tr>
      <td><a href="/apis/smartlead"><strong>Smartlead.ai</strong></a></td>
      <td>Engagement</td>
      <td>Built for scale; handles massive amounts of accounts with high reliability.</td>
    </tr>
    <tr>
      <td><a href="/apis/reply-io"><strong>Reply.io</strong></a></td>
      <td>Engagement</td>
      <td>Has a built-in AI named <strong>Jason</strong> that helps manage your follow-ups.</td>
    </tr>
    <tr>
      <td><a href="/apis/mailgun"><strong>Mailgun</strong></a></td>
      <td>Engagement</td>
      <td>For technical teams who want to build their own custom sending tool from scratch.</td>
    </tr>
    <tr>
      <td><a href="/apis/waalaxy"><strong>Waalaxy</strong></a></td>
      <td>Engagement</td>
      <td>Best if you want to combine cold email with LinkedIn automation.</td>
    </tr>
  </tbody>
</table>

<h2>How to Use AI (Claude/Cursor) to Build This</h2>
<p>You don't need to be a developer to connect these tools anymore. Here is the simple 3-step workflow:</p>

<ol>
  <li><strong>Find the goal:</strong> (e.g., A new lead is found by <strong><a href="/apis/uplead">UpLead</a></strong>).</li>
  <li><strong>Grab the docs:</strong> Find the "Add Lead" page in your email tool's help center.</li>
  <li><strong>The Prompt:</strong> <em>"Claude, here is the Smartlead API help page. Write a script that takes leads from my spreadsheet and adds them to my 'New Outreach' campaign in Smartlead automatically."</em></li>
</ol>

<h2>The Technical "ID Card" Checklist</h2>
<p>Even with an API, your email needs a proper "ID" so it doesn't get rejected. Make sure your domain settings include these three (your domain provider can help with this):</p>
<ul>
  <li><strong>SPF:</strong> Proves you are who you say you are.</li>
  <li><strong>DKIM:</strong> A digital signature that ensures your email wasn't tampered with.</li>
  <li><strong>DMARC:</strong> Tells the receiver what to do if the first two checks fail.</li>
</ul>

<h2>FAQ</h2>
<p><strong>Q: Can I just use my personal Gmail?</strong><br>A: No. You will get banned quickly. Use professional tools that rotate accounts.</p>
<p><strong>Q: Do I need to be a coder?</strong><br>A: Nope. Tools like <strong><a href="/apis/relay">Relay</a></strong> or <strong><a href="/apis/zapier">Zapier</a></strong> let you connect these APIs with simple "if this happens, then do that" logic.</p>

<h2>Conclusion</h2>
<p>A Cold Email API is the best way to turn your outreach into a predictable machine. By letting the API handle the "boring" technical stuff like rotation and warmup, you can focus on writing great messages. Explore our <a href="/categories/sales-engagement">Engagement Category</a> to find your setup.</p>
    `,
    categories: ["Sales Engagement"],
  },
  {
    slug: "enrichment-apis",
    title: "Lead Enrichment APIs for AI Agents",
    metaDescription:
      "Lead enrichment APIs for AI agents. Compare data providers, email verification, firmographics, and MCP servers for real-time enrichment.",
    intro:
      "Stop working with bad data. These enrichment APIs let your agent pull verified emails, company info, and intent signals in real time, so every lead is worth reaching.",
    categories: ["Sales Intelligence"],
  },
  {
    slug: "best-lead-enrichment-apis",
    title: "Best Lead Enrichment APIs for 2026",
    metaDescription:
      "Stop wasting time on manual research. Compare the top 15+ lead enhancement APIs, learn about Waterfall Enrichment, and plug your CRM into real-time B2B intelligence.",
    intro:
      "In 2026, manual prospecting is a thing of the past. High-performance sales teams use Lead Enhancement APIs to turn a single email address into a full buyer profile automatically. This guide shows you how to build a real-time intelligence engine using the best-vetted APIs in our directory.",
    content: `
<h2>What is a Lead Enhancement API?</h2>
<p>Think of a Lead Enhancement API as a super-powered research assistant. It is a technical bridge that connects your CRM or AI agents to massive databases. It automates the research that used to take hours, such as finding LinkedIn profiles, seeing what software a company uses, and verifying phone numbers in seconds.</p>

<h3>Enrichment vs. Validation vs. Verification</h3>
<ul>
  <li><strong>Lead Enrichment:</strong> Adding "missing pieces" to your data, like job titles, company size, or recent funding.</li>
  <li><strong>Lead Validation:</strong> Checking if a lead actually fits your target customer profile (e.g., using <strong><a href="/apis/saleshunt-ai">Saleshunt AI</a></strong> to see if they are in the right industry).</li>
  <li><strong>Lead Verification:</strong> Making sure the email is real. Tools like <strong><a href="/apis/neverbounce">Neverbounce</a></strong> or <strong><a href="/apis/zerobounce">ZeroBounce</a></strong> ensure you don't send emails to "dead" addresses.</li>
</ul>

<h2>How the Data Flows (Simply Put)</h2>
<p>Modern APIs follow a simple cycle to get you the right info:</p>
<ol>
  <li><strong>The Key:</strong> You give the API a starting point, like an Email or a LinkedIn URL.</li>
  <li><strong>The Search:</strong> The API searches social profiles and public databases to find a match.</li>
  <li><strong>The Details:</strong> It grabs <strong>Company Basics</strong> (revenue, size), <strong>Tech Stack</strong> (what tools they use), and <strong>Buying Signals</strong> (if they are currently looking to buy).</li>
  <li><strong>The Result:</strong> It hands back a clean, organized list that your AI or CRM can use immediately.</li>
</ol>

<h2>Top Lead Enrichment APIs Compared (2026 Edition)</h2>
<p>Based on our directory, here are the best "Lego blocks" for building your intelligence engine:</p>

<table>
  <thead>
    <tr>
      <th>Tool</th>
      <th>Primary Category</th>
      <th>Key Differentiator</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/apis/apollo"><strong>Apollo.io</strong></a></td>
      <td>Intelligence</td>
      <td>Massive database of 700M+ contacts with built-in AI scoring.</td>
    </tr>
    <tr>
      <td><a href="/apis/zoominfo"><strong>ZoomInfo</strong></a></td>
      <td>Intelligence</td>
      <td>The gold standard for accuracy in large enterprise companies.</td>
    </tr>
    <tr>
      <td><a href="/apis/uplead"><strong>UpLead</strong></a></td>
      <td>Intelligence</td>
      <td>Guarantees 95% accuracy for emails and phone numbers.</td>
    </tr>
    <tr>
      <td><a href="/apis/rocketreach"><strong>RocketReach</strong></a></td>
      <td>Intelligence</td>
      <td>Great for finding decision-makers at very large organizations.</td>
    </tr>
    <tr>
      <td><a href="/apis/cognism"><strong>Cognism</strong></a></td>
      <td>Intelligence</td>
      <td>The best choice for finding compliant phone numbers in Europe.</td>
    </tr>
    <tr>
      <td><a href="/apis/cufinder"><strong>CUFinder</strong></a></td>
      <td>Intelligence</td>
      <td>Offers many small, specific tools for custom AI builders.</td>
    </tr>
  </tbody>
</table>

<h2>Connecting Data to Action</h2>
<p>Once you have the data, you can use it to trigger automatic actions:</p>

<h3>1. Personalized Outreach</h3>
<p>Once <strong><a href="/apis/uplead">UpLead</a></strong> finds a target, tools like <strong><a href="/apis/instantly">Instantly</a></strong> can automatically start an email sequence. If you're using AI SDRs, <strong><a href="/apis/jason-reply">Jason AI</a></strong> can use the enriched data to write a message that mentions the prospect's specific tools or recent news.</p>

<h3>2. Call Cheat Sheets</h3>
<p>You can feed the data into <strong><a href="/apis/docket-ai">DocketAI</a></strong> to give your sales reps a "cheat sheet" of what the prospect's company does and who their competitors are before they even pick up the phone.</p>

<h2>The "Waterfall" (Backup) Strategy</h2>
<p>Smart tinkerers use a "Waterfall" approach. If the first tool (like Apollo) doesn't have a phone number, your script automatically asks a second tool (like Lusha). This ensures you get the data you need nearly 100% of the time.</p>

<h2>Modern Implementation (Claude/Cursor Workflow)</h2>
<p>You no longer need to write complex code. Here is how you do it with AI:</p>
<ol>
  <li><strong>Pick your tool:</strong> (e.g., UpLead's enrichment page).</li>
  <li><strong>Ask your AI:</strong> Give the help docs to Claude or Cursor.</li>
  <li><strong>The Prompt:</strong> <em>"Claude, write a script using the CUFinder API that takes a list of emails, finds their LinkedIn URLs and how much money their company has raised, and saves it all to a CSV file."</em></li>
</ol>

<h2>FAQ</h2>
<p><strong>Q: Is this legal?</strong><br>A: Yes, providers like <strong>Cognism</strong> and <strong>Kaspr</strong> focus on following privacy laws like GDPR.</li>
<p><strong>Q: What format do I get the data in?</strong><br>A: Usually a format called <strong>JSON</strong>, which is just a structured list that AI tools can read very easily.</p>

<h2>Conclusion</h2>
<p>Lead Enrichment APIs are the foundation of modern sales. By automating your research, you remove the "grind" and let your team focus on actually talking to people. Explore our directory to find the right data "Lego block" for your stack.</p>
    `,
    categories: ["Sales Intelligence"],
    keywords: ["enrichment", "waterfall", "contact data", "b2b data"],
  },
  {
    slug: "phone-apis",
    title: "Phone & Calling APIs for AI Agents",
    metaDescription:
      "Phone and calling APIs for AI agents. Compare dialers, voice APIs, recording, transcription, and MCP servers for outbound calling.",
    intro:
      "Scale your outbound without hiring more SDRs. These APIs give your agent access to power dialers, voice bots, call recording, and SMS automation.",
    categories: ["Phone & Dialers"],
  },
  {
    slug: "revenue-intelligence-apis",
    title: "Revenue Intelligence APIs for AI Agents",
    metaDescription:
      "Revenue intelligence APIs for AI agents. Compare conversation intelligence, analytics, forecasting, and deal health monitoring.",
    intro:
      "Every call and deal tells a story. These APIs let your agent analyze conversations, track deal health, and forecast revenue automatically.",
    categories: ["Revenue Intelligence"],
  },
  {
    slug: "scheduling-apis",
    title: "Meeting Scheduling APIs for AI Agents",
    metaDescription:
      "Meeting scheduling APIs for AI agents. Compare calendar APIs, booking, availability, and MCP servers for automated scheduling.",
    intro:
      "Never lose a warm lead to calendar friction. These APIs let your agent check availability, book meetings, and handle rescheduling automatically.",
    categories: ["Closing & Scheduling"],
  },
  {
    slug: "sales-enablement-apis",
    title: "Sales Enablement APIs for AI Agents",
    metaDescription:
      "Sales enablement APIs for AI agents. Compare content management, proposals, e-signatures, and document automation.",
    intro:
      "Your reps need the right content at the right time. These APIs let your agent serve up proposals, track engagement, and manage e-signatures automatically.",
    categories: ["Sales Enablement"],
  },
]

export function getAllGuides(): Guide[] {
  return guides
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}

export function getGuideSlugs(): string[] {
  return guides.map((g) => g.slug)
}

export function getToolsForGuide(guide: Guide): SalesTool[] {
  const withDocs = tools.filter((t) => t.docsUrl && t.docsUrl !== "")
  const matched = new Map<string, SalesTool>()

  for (const tool of withDocs) {
    if (guide.categories?.includes(tool.category)) {
      matched.set(tool.slug, tool)
    }
  }

  if (guide.keywords?.length) {
    for (const tool of withDocs) {
      if (matched.has(tool.slug)) continue
      const caps = (tool.aiCapabilities || []).join(" ").toLowerCase()
      const matchesKeyword = guide.keywords.some((kw) =>
        caps.includes(kw.toLowerCase())
      )
      if (matchesKeyword) {
        matched.set(tool.slug, tool)
      }
    }
  }

  return Array.from(matched.values())
}

export function getFaqForGuide(guide: Guide) {
  const faqs = []
  const category = guide.categories?.[0] || "Sales"

  // Base Questions
  faqs.push({
    question: `What are the benefits of using ${guide.title.split(' ')[0]} APIs?`,
    answer: `Using APIs for ${category.toLowerCase()} allows you to automate repetitive tasks, ensure data consistency across your stack, and enable AI agents like Claude to perform actions on your behalf without manual data entry.`
  })

  // Category Specific Questions
  if (category === "Sales Intelligence") {
    faqs.push({
      question: "How do I ensure high data accuracy with enrichment APIs?",
      answer: "The best practice is to use a 'Waterfall' approach—if the first API doesn't have a result, your script automatically queries a second or third provider. This ensures you get verified emails and phone numbers nearly 100% of the time."
    })
  } else if (category === "Sales Engagement") {
    faqs.push({
      question: "Can these APIs help with email deliverability?",
      answer: "Yes. Many engagement APIs include built-in mailbox rotation, spintax, and automated warmup features that mimic human behavior, keeping your domains safe from spam filters."
    })
  } else if (category === "CRM & RevOps") {
    faqs.push({
      question: "Is it safe to give an AI agent access to my CRM API?",
      answer: "Yes, provided you use limited-scope API keys or OAuth. You should only grant the permissions the agent actually needs (e.g., 'Read/Write Contacts' but not 'Delete Database') to maintain security."
    })
  }

  // AI-Native Question
  faqs.push({
    question: "How do I connect these tools to Claude Code or agentic tools?",
    answer: "Most tools listed here have official MCP servers or well-documented REST APIs. You can simply provide the API documentation link to your agent and ask it to write an integration script or perform a specific task using that tool."
  })

  return faqs
}
