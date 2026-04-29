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
<p>You don't need to be a coder to use these. You can use a "Prompt and Execute" workflow with AI agents like Claude Code or Gemini CLI:</p>
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

<h2>How to Use AI Agents (Claude Code) to Build This</h2>
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
    content: `
<h2>What Are Enrichment APIs?</h2>
<p>An enrichment API takes a small piece of data you already have — like an email address or a company domain — and returns a full profile: job title, company size, tech stack, funding history, and verified phone numbers. Instead of your reps spending 10 minutes researching each lead on LinkedIn, your AI agent does it in under a second.</p>

<h3>Enrichment vs. Prospecting</h3>
<p><strong>Prospecting</strong> is finding new leads you don't have yet. <strong>Enrichment</strong> is filling in the blanks on leads you already have. Most modern tools do both, but the API endpoints are different. When you're connecting to Claude or Cursor, you want the enrichment endpoints — they take an input (email, domain, LinkedIn URL) and return structured data your agent can act on.</p>

<h2>How AI Agents Use Enrichment Data</h2>
<p>The real power isn't just getting data — it's what your agent does with it automatically:</p>
<ul>
  <li><strong>Lead Scoring:</strong> Your agent checks company size, funding, and tech stack against your ICP, then tags leads as "Hot," "Warm," or "Skip."</li>
  <li><strong>Personalized Outreach:</strong> Feed enriched data into your email tool so Claude can write a message mentioning the prospect's specific role, recent funding round, or tech they use.</li>
  <li><strong>CRM Hygiene:</strong> Run your entire contact list through an enrichment API to fill missing fields, fix outdated job titles, and flag people who've changed companies.</li>
  <li><strong>Waterfall Strategy:</strong> If Apollo doesn't have a phone number, your script automatically tries Proxycurl, then People Data Labs. You chain providers until you get the data.</li>
</ul>

<h2>Top Enrichment APIs Compared (2026)</h2>
<p>These are the best "Lego blocks" for plugging enrichment into your AI agent stack:</p>

<table>
  <thead>
    <tr>
      <th>API Provider</th>
      <th>Best For</th>
      <th>Key Differentiator</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/apis/apollo"><strong>Apollo.io</strong></a></td>
      <td>All-in-one prospecting + enrichment</td>
      <td>700M+ contacts with built-in AI scoring. Free tier available.</td>
    </tr>
    <tr>
      <td><a href="/apis/proxycurl"><strong>Proxycurl</strong></a></td>
      <td>LinkedIn profile enrichment</td>
      <td>Pulls structured data from LinkedIn profiles via API. Great for AI agents.</td>
    </tr>
    <tr>
      <td><a href="/apis/people-data-labs"><strong>People Data Labs</strong></a></td>
      <td>Bulk enrichment at scale</td>
      <td>1.5B+ person records. Pay-per-record pricing ideal for waterfall setups.</td>
    </tr>
    <tr>
      <td><a href="/apis/uplead"><strong>UpLead</strong></a></td>
      <td>Verified contact data</td>
      <td>95% email accuracy guarantee. Real-time verification on every lookup.</td>
    </tr>
    <tr>
      <td><a href="/apis/full-enrich"><strong>FullEnrich</strong></a></td>
      <td>Waterfall enrichment</td>
      <td>Aggregates 15+ data providers in one API call. Built for the waterfall approach.</td>
    </tr>
    <tr>
      <td><a href="/apis/zoominfo"><strong>ZoomInfo</strong></a></td>
      <td>Enterprise-grade accuracy</td>
      <td>The gold standard for large sales teams. Deep firmographic and intent data.</td>
    </tr>
  </tbody>
</table>

<h2>Claude Code Workflow: Enrich a Lead List</h2>
<p>You don't need to write code from scratch. Here's the 3-step approach:</p>
<ol>
  <li><strong>Pick your provider:</strong> Grab the API docs link for your enrichment tool (e.g., <a href="/apis/proxycurl">Proxycurl's API reference</a>).</li>
  <li><strong>Feed it to Claude:</strong> Paste the docs URL and your CSV of leads into Claude Code or Cursor.</li>
  <li><strong>The Prompt:</strong> <em>"Claude, here are the Proxycurl API docs. Write a script that takes my CSV of LinkedIn URLs, enriches each one with job title, company name, and employee count, and saves the results to a new CSV. Add a 1-second delay between requests to respect rate limits."</em></li>
</ol>

<h3>MCP Configuration (for tools that support it)</h3>
<p>Some enrichment providers have MCP servers, which means Claude can call them directly without you writing any code. Check each tool's page in our directory for the <strong>⚡ MCP Ready</strong> badge and copy-paste config.</p>

<h2>FAQ</h2>
<p><strong>Q: What's a "waterfall" enrichment strategy?</strong><br>A: It means chaining multiple data providers. If Provider A doesn't have the email, your script tries Provider B, then C. Tools like <strong><a href="/apis/full-enrich">FullEnrich</a></strong> do this automatically in a single API call.</p>
<p><strong>Q: How much does enrichment cost?</strong><br>A: Most providers charge per record — anywhere from $0.01 to $0.50 per lookup depending on the data depth. <strong><a href="/apis/apollo">Apollo</a></strong> has a generous free tier. <strong><a href="/apis/people-data-labs">People Data Labs</a></strong> offers pay-as-you-go pricing.</p>
<p><strong>Q: Is it legal to use enrichment APIs?</strong><br>A: Yes. Reputable providers source data from public records, business filings, and opt-in directories. For GDPR-sensitive markets (Europe), check that the provider has compliance certifications.</p>

<h2>Conclusion</h2>
<p>Enrichment APIs are the foundation of any AI-powered sales stack. They turn incomplete contact lists into actionable intelligence your agents can use to score, personalize, and close. Explore our <a href="/categories/sales-intelligence">Sales Intelligence category</a> to find the right data provider for your workflow.</p>
    `,
    categories: ["Sales Intelligence"],
    keywords: ["enrichment", "waterfall", "contact data", "b2b data", "firmographics", "email verification"],
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

<h2>Modern Implementation (Claude Code Workflow)</h2>
<p>You no longer need to write complex code. Here is how you do it with AI:</p>
<ol>
  <li><strong>Pick your tool:</strong> (e.g., UpLead's enrichment page).</li>
  <li><strong>Ask your AI:</strong> Give the documentation to Claude Code or your agent.</li>
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
    content: `
<h2>What Are Phone & Calling APIs?</h2>
<p>A phone API lets your software make, receive, and manage phone calls programmatically. In 2026, this means your AI agent can dial prospects, run voice bots that sound human, record conversations, and transcribe everything — without a human touching a phone. These APIs range from simple click-to-dial tools to full AI voice agents that handle entire sales conversations autonomously.</p>

<h3>Power Dialers vs. AI Voice Agents</h3>
<p>There's a big difference between these two categories:</p>
<ul>
  <li><strong>Power Dialers</strong> (like <a href="/apis/phoneburner"><strong>PhoneBurner</strong></a> and <a href="/apis/orum"><strong>Orum</strong></a>) dial numbers faster so your human reps spend less time waiting. They handle parallel dialing, voicemail drops, and call logging.</li>
  <li><strong>AI Voice Agents</strong> (like <a href="/apis/retell-ai"><strong>Retell AI</strong></a> and <a href="/apis/bland-ai"><strong>Bland AI</strong></a>) replace the human entirely for certain calls. They use LLMs to have natural conversations, qualify leads, and book meetings — 24/7.</li>
</ul>

<h2>What Your AI Agent Can Do With These APIs</h2>
<p>Here's how "AI-Native Operators" are plugging phone APIs into their sales stacks:</p>
<ul>
  <li><strong>Automated Lead Qualification:</strong> Your AI voice agent calls a lead list, asks qualifying questions, and logs results directly into your CRM.</li>
  <li><strong>Parallel Dialing:</strong> Tools like <a href="/apis/orum"><strong>Orum</strong></a> and <a href="/apis/nooks"><strong>Nooks</strong></a> dial 5-10 numbers simultaneously and only connect your rep when a human picks up.</li>
  <li><strong>Call Recording & Transcription:</strong> Every call is recorded, transcribed, and analyzed. Your agent can extract action items, objections, and next steps automatically.</li>
  <li><strong>Voicemail Drops:</strong> Pre-record a message and your dialer drops it instantly when it detects voicemail — no waiting.</li>
</ul>

<h2>Top Phone & Calling APIs Compared (2026)</h2>
<p>The best options for connecting phone capabilities to your AI agent stack:</p>

<table>
  <thead>
    <tr>
      <th>API Provider</th>
      <th>Type</th>
      <th>Key Differentiator</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/apis/retell-ai"><strong>Retell AI</strong></a></td>
      <td>AI Voice Agent</td>
      <td>Build human-sounding voice agents with LLM backends. Sub-second latency.</td>
    </tr>
    <tr>
      <td><a href="/apis/bland-ai"><strong>Bland AI</strong></a></td>
      <td>AI Voice Agent</td>
      <td>Enterprise AI phone calls at scale. Handles inbound and outbound autonomously.</td>
    </tr>
    <tr>
      <td><a href="/apis/orum"><strong>Orum</strong></a></td>
      <td>AI Power Dialer</td>
      <td>AI-powered parallel dialer with live conversation intelligence for sales teams.</td>
    </tr>
    <tr>
      <td><a href="/apis/nooks"><strong>Nooks</strong></a></td>
      <td>AI Power Dialer</td>
      <td>AI dialer + virtual salesfloor. Combines parallel dialing with team collaboration.</td>
    </tr>
    <tr>
      <td><a href="/apis/phoneburner"><strong>PhoneBurner</strong></a></td>
      <td>Power Dialer</td>
      <td>No-pause dialer with CRM integration. Great for teams moving from manual dialing.</td>
    </tr>
    <tr>
      <td><a href="/apis/five9"><strong>Five9</strong></a></td>
      <td>Contact Center</td>
      <td>Enterprise cloud contact center with AI-assisted agent workflows and IVR.</td>
    </tr>
  </tbody>
</table>

<h2>Claude Code Workflow: Build an AI Calling Agent</h2>
<p>Here's how to get a voice agent running with Claude:</p>
<ol>
  <li><strong>Pick your voice API:</strong> Grab the docs for <a href="/apis/retell-ai">Retell AI</a> or <a href="/apis/bland-ai">Bland AI</a> — both have well-documented REST APIs.</li>
  <li><strong>Define the conversation flow:</strong> Write out what the AI should say, what questions to ask, and when to book a meeting.</li>
  <li><strong>The Prompt:</strong> <em>"Claude, here are the Retell AI API docs. Build me a voice agent that calls leads from my CRM, asks if they're interested in a demo, and books a meeting on my Calendly link if they say yes. Log the call outcome back to HubSpot."</em></li>
</ol>

<h3>For Power Dialers (Non-AI Calls)</h3>
<p>If you want human reps on the calls but want AI to handle the logistics:</p>
<p><em>"Claude, write a script using the PhoneBurner API that imports my lead list, creates a dial session, and after each call, updates the lead status in my CRM based on the call disposition."</em></p>

<h2>FAQ</h2>
<p><strong>Q: Can AI voice agents really replace human SDRs?</strong><br>A: For qualification and appointment-setting calls, yes. Tools like <a href="/apis/bland-ai"><strong>Bland AI</strong></a> handle simple conversations well. For complex discovery calls, you still want a human — but the AI can do the first touch and book the meeting.</p>
<p><strong>Q: What about call recording laws?</strong><br>A: Most providers handle compliance by playing an automated disclosure at the start of the call. Check your state/country's consent laws (one-party vs. two-party consent) and configure your API accordingly.</p>
<p><strong>Q: How do parallel dialers work with AI?</strong><br>A: Tools like <a href="/apis/orum"><strong>Orum</strong></a> use AI to detect voicemail, busy signals, and live pickups. They only connect your rep when a real person answers, so reps spend 3x more time in actual conversations.</p>

<h2>Conclusion</h2>
<p>Phone APIs are the fastest way to scale outbound without scaling headcount. Whether you want full AI voice agents or AI-assisted power dialing, these tools plug directly into your existing sales stack. Browse our <a href="/categories/phone-and-dialers">Phone & Dialers category</a> to find the right fit.</p>
    `,
    categories: ["Phone & Dialers"],
    keywords: ["dialer", "voice agent", "call recording", "transcription", "outbound calling", "AI voice"],
  },
  {
    slug: "revenue-intelligence-apis",
    title: "Revenue Intelligence APIs for AI Agents",
    metaDescription:
      "Revenue intelligence APIs for AI agents. Compare conversation intelligence, analytics, forecasting, and deal health monitoring.",
    intro:
      "Every call and deal tells a story. These APIs let your agent analyze conversations, track deal health, and forecast revenue automatically.",
    content: `
<h2>What Are Revenue Intelligence APIs?</h2>
<p>Revenue intelligence APIs capture data from sales calls, emails, and deals, then use AI to analyze it. They answer the questions your VP of Sales asks every Monday: "Which deals are at risk? What are buyers actually saying? Are reps following the playbook?" Instead of relying on reps to self-report in the CRM, these APIs pull the truth directly from conversations.</p>

<h3>Conversation Intelligence vs. Revenue Forecasting</h3>
<p>These tools fall into two buckets:</p>
<ul>
  <li><strong>Conversation Intelligence</strong> records and transcribes sales calls, then uses AI to extract topics, objections, competitor mentions, and action items. Tools like <a href="/apis/gong"><strong>Gong</strong></a> and <a href="/apis/fireflies"><strong>Fireflies.ai</strong></a> do this.</li>
  <li><strong>Revenue Forecasting</strong> analyzes deal activity (emails sent, meetings booked, CRM updates) to predict which deals will close and flag the ones going cold.</li>
</ul>

<h2>What Your AI Agent Can Do With These APIs</h2>
<p>Revenue intelligence APIs turn passive call recordings into active sales intelligence:</p>
<ul>
  <li><strong>Auto-fill CRM Notes:</strong> After every call, your agent extracts the summary, next steps, and deal stage from the transcript and writes it to HubSpot or Salesforce — no rep input needed.</li>
  <li><strong>Competitor Tracking:</strong> Your agent monitors all calls for competitor mentions and builds a real-time dashboard of which competitors come up most often and what buyers say about them.</li>
  <li><strong>Deal Risk Alerts:</strong> If a deal hasn't had activity in 7 days, or the buyer mentioned "budget freeze" on the last call, your agent flags it automatically.</li>
  <li><strong>Coaching Insights:</strong> Analyze talk-to-listen ratios, question counts, and monologue lengths across your team to spot coaching opportunities.</li>
</ul>

<h2>Top Revenue Intelligence APIs Compared (2026)</h2>

<table>
  <thead>
    <tr>
      <th>API Provider</th>
      <th>Focus</th>
      <th>Key Differentiator</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/apis/gong"><strong>Gong</strong></a></td>
      <td>Conversation + Deal Intelligence</td>
      <td>The market leader. Deep call analytics, deal boards, and forecasting in one platform.</td>
    </tr>
    <tr>
      <td><a href="/apis/fireflies"><strong>Fireflies.ai</strong></a></td>
      <td>Meeting Transcription + AI</td>
      <td>Auto-joins meetings, transcribes, and provides searchable AI summaries. Developer-friendly API.</td>
    </tr>
    <tr>
      <td><a href="/apis/attention-tech"><strong>Attention</strong></a></td>
      <td>Real-time Meeting Guidance</td>
      <td>AI listens live and surfaces talk tracks, objection handles, and competitive intel during the call.</td>
    </tr>
    <tr>
      <td><a href="/apis/modjo"><strong>Modjo</strong></a></td>
      <td>Conversation Intelligence</td>
      <td>Strong in European markets. Call analysis with CRM sync and coaching workflows.</td>
    </tr>
    <tr>
      <td><a href="/apis/jiminny"><strong>Jiminny</strong></a></td>
      <td>Conversation Intelligence</td>
      <td>Call and video recording with AI coaching. Good for mid-market teams.</td>
    </tr>
  </tbody>
</table>

<h2>Claude Code Workflow: Automate Deal Intelligence</h2>
<p>Here's how to plug revenue intelligence into your AI workflow:</p>
<ol>
  <li><strong>Connect your recording tool:</strong> Set up <a href="/apis/fireflies">Fireflies</a> or <a href="/apis/gong">Gong</a> to record all sales calls and expose transcripts via their API.</li>
  <li><strong>Feed transcripts to Claude:</strong> Use the API to pull recent call transcripts into your agent's context.</li>
  <li><strong>The Prompt:</strong> <em>"Claude, here's the Fireflies API. After each sales call, pull the transcript, extract the buyer's main objections, next steps, and any competitor mentions. Write a summary to the deal record in HubSpot and flag the deal as 'at risk' if the buyer mentioned budget concerns."</em></li>
</ol>

<h3>Bonus: Weekly Pipeline Review</h3>
<p><em>"Claude, pull all call transcripts from this week via the Gong API. Create a summary of the top 3 objections across all calls, which competitors were mentioned most, and which deals had no activity in the last 5 days."</em></p>

<h2>FAQ</h2>
<p><strong>Q: Do I need to record calls to use revenue intelligence?</strong><br>A: Yes. These tools work by analyzing call recordings and transcripts. Most integrate with Zoom, Google Meet, and Microsoft Teams to auto-record. <a href="/apis/fireflies"><strong>Fireflies</strong></a> can join meetings as a bot — no install needed.</p>
<p><strong>Q: What's the difference between Gong and Fireflies?</strong><br>A: <a href="/apis/gong"><strong>Gong</strong></a> is an all-in-one revenue platform (calls + deals + forecasting) built for large sales teams. <a href="/apis/fireflies"><strong>Fireflies</strong></a> is lighter and more developer-friendly — great for teams that just want transcripts and AI summaries via API.</p>
<p><strong>Q: Can my AI agent listen to calls in real time?</strong><br>A: <a href="/apis/attention-tech"><strong>Attention</strong></a> does this — it provides real-time guidance to reps during live calls. Most other tools process recordings after the call ends.</p>

<h2>Conclusion</h2>
<p>Revenue intelligence APIs turn your sales calls from forgotten recordings into a structured data source your AI agents can mine for insights. Stop guessing which deals will close — let the data tell you. Explore our <a href="/categories/revenue-intelligence">Revenue Intelligence category</a> to find the right tool.</p>
    `,
    categories: ["Revenue Intelligence"],
    keywords: ["conversation intelligence", "call recording", "deal intelligence", "forecasting", "sales coaching"],
  },
  {
    slug: "scheduling-apis",
    title: "Meeting Scheduling APIs for AI Agents",
    metaDescription:
      "Meeting scheduling APIs for AI agents. Compare calendar APIs, booking, availability, and MCP servers for automated scheduling.",
    intro:
      "Never lose a warm lead to calendar friction. These APIs let your agent check availability, book meetings, and handle rescheduling automatically.",
    content: `
<h2>What Are Scheduling APIs?</h2>
<p>A scheduling API lets your software check calendar availability, create bookings, and manage meetings programmatically. For sales teams, this means your AI agent can book a demo the moment a lead says "yes" — no back-and-forth emails, no "Does Tuesday work?" Instead of sending a booking link and hoping, your agent handles the entire flow: check availability, propose a time, confirm, and send calendar invites.</p>

<h3>Scheduling Links vs. Scheduling APIs</h3>
<p>Most people know <strong>Calendly links</strong> — you paste them in emails and let prospects pick a time. A scheduling <strong>API</strong> goes further: your AI agent can query available slots, create events, assign the right rep based on territory or round-robin rules, and handle rescheduling — all without the prospect ever seeing a booking page.</p>

<h2>What Your AI Agent Can Do With These APIs</h2>
<ul>
  <li><strong>Instant Booking After Qualification:</strong> Your AI SDR qualifies a lead via email or chat, then immediately books a meeting on the right rep's calendar using the API — zero friction.</li>
  <li><strong>Smart Routing:</strong> Tools like <a href="/apis/chili-piper"><strong>Chili Piper</strong></a> route meetings to the right rep based on territory, deal size, or round-robin rules — all via API.</li>
  <li><strong>Rescheduling & Reminders:</strong> Your agent monitors for cancellations and automatically proposes new times, reducing no-show rates.</li>
  <li><strong>CRM Sync:</strong> Every booked meeting is logged to your CRM with the lead's details, so reps walk into calls prepared.</li>
</ul>

<h2>Top Scheduling APIs Compared (2026)</h2>

<table>
  <thead>
    <tr>
      <th>API Provider</th>
      <th>Best For</th>
      <th>Key Differentiator</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/apis/cal-com"><strong>Cal.com</strong></a></td>
      <td>Open-source scheduling</td>
      <td>Fully open-source with a powerful API. Self-host or use cloud. Great for custom AI integrations.</td>
    </tr>
    <tr>
      <td><a href="/apis/calendly"><strong>Calendly</strong></a></td>
      <td>Simple team scheduling</td>
      <td>The most widely adopted scheduling tool. Clean API for availability checks and event creation.</td>
    </tr>
    <tr>
      <td><a href="/apis/chili-piper"><strong>Chili Piper</strong></a></td>
      <td>Inbound lead routing</td>
      <td>Built for sales teams. Routes inbound leads to the right rep and books instantly from web forms.</td>
    </tr>
  </tbody>
</table>

<h2>Claude Code Workflow: Auto-Book Meetings</h2>
<p>Here's how to connect scheduling to your AI sales flow:</p>
<ol>
  <li><strong>Pick your scheduling API:</strong> <a href="/apis/cal-com">Cal.com</a> is the best choice if you want full control (open-source). <a href="/apis/calendly">Calendly</a> if you want simplicity.</li>
  <li><strong>Connect it to your lead flow:</strong> Your AI agent needs access to both the scheduling API and your lead source (CRM, enrichment tool, or email tool).</li>
  <li><strong>The Prompt:</strong> <em>"Claude, here are the Cal.com API docs. When a lead replies 'yes' to my outreach email, check my calendar for the next available 30-minute slot, book the meeting, send the lead a Google Meet invite, and log the meeting to HubSpot with the lead's enriched profile."</em></li>
</ol>

<h3>MCP Integration</h3>
<p><a href="/apis/cal-com"><strong>Cal.com</strong></a> has an MCP server, which means Claude can interact with your calendar directly — check availability, create events, and manage bookings — without you writing any integration code. Just add the MCP config and start prompting.</p>

<h2>FAQ</h2>
<p><strong>Q: Should I use Cal.com or Calendly?</strong><br>A: <a href="/apis/cal-com"><strong>Cal.com</strong></a> if you want open-source, self-hosting, and maximum API flexibility — ideal for AI agent builders. <a href="/apis/calendly"><strong>Calendly</strong></a> if your team already uses it and you want a quick integration.</p>
<p><strong>Q: What is "lead routing" in scheduling?</strong><br>A: It's automatically assigning incoming meeting requests to the right sales rep based on rules — territory, company size, round-robin, etc. <a href="/apis/chili-piper"><strong>Chili Piper</strong></a> specializes in this.</p>
<p><strong>Q: Can my AI agent reschedule meetings?</strong><br>A: Yes. All three APIs support updating and canceling events programmatically. Your agent can detect a cancellation, propose 3 new times, and rebook — all without human involvement.</p>

<h2>Conclusion</h2>
<p>Scheduling is the last mile of sales — the moment a "maybe" becomes a booked demo. Don't lose it to email tag. Connect a scheduling API to your AI agent and book meetings the instant a lead is ready. Browse our <a href="/categories/closing-and-scheduling">Closing & Scheduling category</a> to explore all options.</p>
    `,
    categories: ["Closing & Scheduling"],
    keywords: ["calendar", "booking", "scheduling", "meeting", "availability", "round-robin"],
  },
  {
    slug: "sales-enablement-apis",
    title: "Sales Enablement APIs for AI Agents",
    metaDescription:
      "Sales enablement APIs for AI agents. Compare content management, proposals, e-signatures, and document automation.",
    intro:
      "Your reps need the right content at the right time. These APIs let your agent serve up proposals, track engagement, and manage e-signatures automatically.",
    content: `
<h2>What Are Sales Enablement APIs?</h2>
<p>Sales enablement APIs handle everything that happens between "the prospect is interested" and "the deal is signed." They cover proposals, contracts, e-signatures, content libraries, and training materials. Instead of your reps digging through Google Drive for the right case study or manually building proposals in Word, your AI agent pulls the right content, generates documents, sends them for signature, and tracks engagement — automatically.</p>

<h3>Document Automation vs. Content Management</h3>
<ul>
  <li><strong>Document Automation</strong> (proposals, contracts, e-signatures): Tools like <a href="/apis/pandadoc"><strong>PandaDoc</strong></a> and <a href="/apis/docusign"><strong>DocuSign</strong></a> let your agent create, send, and track documents programmatically.</li>
  <li><strong>Content Management</strong> (sales collateral, battle cards, playbooks): Tools like <a href="/apis/highspot"><strong>Highspot</strong></a> and <a href="/apis/guru"><strong>Guru</strong></a> organize your sales content so your agent can surface the right piece at the right moment.</li>
</ul>

<h2>What Your AI Agent Can Do With These APIs</h2>
<ul>
  <li><strong>Auto-Generate Proposals:</strong> Your agent pulls deal data from your CRM, populates a PandaDoc template, and sends a personalized proposal — in seconds, not hours.</li>
  <li><strong>E-Signature Workflows:</strong> Once a proposal is accepted, your agent triggers a DocuSign envelope with the contract, routes it for approval, and notifies your team when it's signed.</li>
  <li><strong>Content Recommendations:</strong> During a deal, your agent checks the prospect's industry and deal stage, then recommends the right case study or one-pager from your content library.</li>
  <li><strong>Engagement Tracking:</strong> Know exactly which pages of your proposal the buyer read, how long they spent on pricing, and whether they forwarded it to their boss.</li>
</ul>

<h2>Top Sales Enablement APIs Compared (2026)</h2>

<table>
  <thead>
    <tr>
      <th>API Provider</th>
      <th>Focus</th>
      <th>Key Differentiator</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/apis/pandadoc"><strong>PandaDoc</strong></a></td>
      <td>Proposals & E-Signatures</td>
      <td>All-in-one document automation. Templates, e-signatures, and analytics. Has an MCP server.</td>
    </tr>
    <tr>
      <td><a href="/apis/docusign"><strong>DocuSign</strong></a></td>
      <td>E-Signatures & CLM</td>
      <td>The industry standard for e-signatures. Powerful API for envelope management and contract lifecycle.</td>
    </tr>
    <tr>
      <td><a href="/apis/highspot"><strong>Highspot</strong></a></td>
      <td>Content Management</td>
      <td>AI-powered content management. Surfaces the right sales collateral based on deal context.</td>
    </tr>
    <tr>
      <td><a href="/apis/guru"><strong>Guru</strong></a></td>
      <td>Knowledge Management</td>
      <td>AI-powered knowledge base for sales teams. Surfaces answers and playbooks in real time.</td>
    </tr>
    <tr>
      <td><a href="/apis/sharpsell"><strong>SharpSell</strong></a></td>
      <td>Sales Playbooks</td>
      <td>AI-driven sales playbook automation with guided selling and dynamic content.</td>
    </tr>
    <tr>
      <td><a href="/apis/spekit"><strong>Spekit</strong></a></td>
      <td>Just-in-Time Enablement</td>
      <td>Surfaces training and playbooks inside the tools reps already use (Salesforce, Slack, etc.).</td>
    </tr>
  </tbody>
</table>

<h2>Claude Code Workflow: Automate Proposals</h2>
<p>Here's how to build an AI-powered proposal workflow:</p>
<ol>
  <li><strong>Set up your templates:</strong> Create proposal templates in <a href="/apis/pandadoc">PandaDoc</a> with merge fields for company name, deal value, and custom terms.</li>
  <li><strong>Connect to your CRM:</strong> Your agent needs read access to deal records (HubSpot, Salesforce, etc.) to pull the data.</li>
  <li><strong>The Prompt:</strong> <em>"Claude, here are the PandaDoc API docs. When a deal in HubSpot moves to 'Proposal Sent' stage, create a new document from my 'Enterprise Proposal' template, fill in the company name, deal amount, and contact info from the deal record, and send it to the primary contact for e-signature."</em></li>
</ol>

<h3>MCP Integration</h3>
<p><a href="/apis/pandadoc"><strong>PandaDoc</strong></a> has an MCP server — Claude can create documents, check signing status, and manage templates directly. No code needed, just add the MCP config to your Claude setup.</p>

<h2>FAQ</h2>
<p><strong>Q: What's the difference between PandaDoc and DocuSign?</strong><br>A: <a href="/apis/pandadoc"><strong>PandaDoc</strong></a> is an all-in-one tool for creating proposals, quotes, and contracts with built-in e-signatures. <a href="/apis/docusign"><strong>DocuSign</strong></a> is more focused on e-signatures and contract lifecycle management — best if you already create documents elsewhere and just need signing.</p>
<p><strong>Q: Can my AI agent track if a prospect read my proposal?</strong><br>A: Yes. Both PandaDoc and DocuSign provide document analytics via API — page views, time spent, and whether the document was forwarded. Your agent can trigger follow-up actions based on this engagement data.</p>
<p><strong>Q: How do content management tools help AI agents?</strong><br>A: Tools like <a href="/apis/highspot"><strong>Highspot</strong></a> and <a href="/apis/guru"><strong>Guru</strong></a> organize your battle cards, case studies, and playbooks with metadata. Your AI agent can query them by industry, competitor, or deal stage to surface exactly the right content during a sales conversation.</p>

<h2>Conclusion</h2>
<p>Sales enablement APIs close the gap between "interested" and "signed." By automating proposals, e-signatures, and content delivery, your AI agents keep deals moving without reps spending hours on document admin. Explore our <a href="/categories/sales-enablement">Sales Enablement category</a> for all available tools.</p>
    `,
    categories: ["Sales Enablement"],
    keywords: ["proposals", "e-signatures", "content management", "document automation", "sales collateral"],
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
