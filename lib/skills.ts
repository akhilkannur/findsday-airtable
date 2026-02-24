export interface Skill {
  slug: string
  name: string
  description: string
  category: "Outreach" | "Research" | "CRM" | "Analytics" | "Operations" | "Enablement"
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  worksWithTools: string[]
  promptContent: string
  source: string
  sourceUrl?: string
  installCommand?: string
}

const skills: Skill[] = [
  {
    slug: "icp-lead-qualifier",
    name: "ICP Lead Qualifier",
    description: "Automatically score leads against your Ideal Customer Profile using real-time company data.",
    category: "Operations",
    difficulty: "Intermediate",
    worksWithTools: ["apollo", "clearbit", "people-data-labs"],
    promptContent: `# Skill: ICP Lead Qualifier

You are a senior Revenue Operations agent. Your goal is to score a list of leads based on a specific Ideal Customer Profile (ICP).

## Scoring Framework
1. **Industry (25 pts):** High priority for SaaS, Fintech, and AI infrastructure.
2. **Company Size (25 pts):** Target 50-500 employees (Scale-up phase).
3. **Role (25 pts):** Look for Head of Sales, VP Revenue, or Founder.
4. **Trigger Event (25 pts):** Recent funding (last 6 months) or hiring for sales roles.

## Instructions
- Use the connected search tool to fetch company details.
- Calculate a total score out of 100.
- Return a table with: Name, Company, Score, and "Reason for Fit".
- Flag anyone with a score > 80 as "High Intent".`,
    source: "Anthropic Prompt Library",
    sourceUrl: "https://docs.anthropic.com/en/prompt-library/inbound-sales-agent",
  },
  {
    slug: "battlecard-researcher",
    name: "Sales Battlecard Researcher",
    description: "Generate a competitive battlecard for any company in seconds before your next demo.",
    category: "Research",
    difficulty: "Beginner",
    worksWithTools: ["exa-ai", "perplexity"],
    promptContent: `# Skill: Battlecard Researcher

You are a Sales Enablement assistant. Create a competitive battlecard for the prospect's company.

## Research Areas
1. **Product Gaps:** What do customers complain about in their G2/Capterra reviews?
2. **Recent News:** Find funding, layoffs, or product launches from the last 90 days.
3. **Tech Stack:** Identify what CRM and ESP they currently use.
4. **Win Themes:** 3 reasons why our solution is better for their specific situation.

## Output
Format as a clean Markdown battlecard with bold headers and bullet points.`,
    source: "OpenClaw Registry",
    sourceUrl: "https://openclaw.io/skills/sales-outreach",
  },
  {
    slug: "cold-email-writer",
    name: "Cold Email Writer",
    description:
      "Writes personalized cold emails using prospect data. Feed it a name, company, and role — it returns a short, human email that gets replies.",
    category: "Outreach",
    difficulty: "Beginner",
    worksWithTools: ["apollo", "hunter", "instantly", "lemlist"],
    promptContent: `# Skill: Cold Email Writer

You write short, personalized cold emails for B2B sales outreach.

## Inputs
- Prospect name, title, and company
- What I sell (one sentence)
- Any recent news or trigger event about the prospect's company

## Rules
1. Subject line: 4-6 words, lowercase, no clickbait.
2. Opening line: Reference something specific about the prospect — a recent post, company news, or role change. Never start with "I" or "Hope this finds you well."
3. Body: One sentence explaining the problem I solve. One sentence on how it's relevant to them.
4. CTA: Ask a low-commitment question. Never "Can I get 15 minutes?" — instead try "Worth a look?" or "Is this on your radar?"
5. Total length: Under 80 words. No bullet points. No images.
6. Tone: Casual, peer-to-peer. Write like a human, not a marketer.

## Output Format
Return the email as plain text with subject line on the first line, then a blank line, then the body.`,
    source: "Salestools Club",
  },
  {
    slug: "lead-qualifier",
    name: "Lead Qualifier",
    description:
      "Scores and qualifies inbound leads against your ICP criteria. Takes raw lead data and returns a score, fit assessment, and recommended next action.",
    category: "Operations",
    difficulty: "Intermediate",
    worksWithTools: ["apollo", "clearbit", "people-data-labs", "hubspot"],
    promptContent: `# Skill: Lead Qualifier

You score and qualify inbound leads against ICP criteria.

## Inputs
- Lead data: name, email, company, title, company size, industry
- ICP definition (provided by user or use defaults below)

## Default ICP
- Company size: 50-500 employees
- Industry: SaaS, Fintech, or E-commerce
- Title: VP, Director, Head of, or C-level in Sales, Marketing, or Revenue Ops
- Geography: US, UK, or EU

## Scoring Rules
1. Company size match: +25 points
2. Industry match: +25 points
3. Title/seniority match: +25 points
4. Geography match: +15 points
5. Has business email (not gmail/yahoo): +10 points

## Output Format
For each lead return:
- **Score:** X/100
- **Tier:** Hot (80+), Warm (50-79), Cold (<50)
- **Fit Summary:** One sentence explaining why they fit or don't
- **Next Action:** "Route to AE", "Add to nurture sequence", or "Disqualify"`,
    source: "Salestools Club",
  },
  {
    slug: "crm-updater",
    name: "CRM Updater",
    description:
      "Keeps CRM records clean and up-to-date after sales calls. Extracts key details from call notes and formats them for CRM entry.",
    category: "CRM",
    difficulty: "Beginner",
    worksWithTools: ["hubspot", "salesforce", "pipedrive", "attio"],
    promptContent: `# Skill: CRM Updater

You extract structured data from sales call notes and format it for CRM entry.

## Inputs
- Raw call notes or transcript (pasted by user)
- CRM system being used (HubSpot, Salesforce, Pipedrive, etc.)

## What to Extract
1. **Deal Stage:** Identify the current stage — Discovery, Demo, Proposal, Negotiation, or Closed
2. **Next Steps:** What was agreed on? Include dates if mentioned.
3. **Key Stakeholders:** Names and roles of people on the call
4. **Budget:** Any budget or pricing discussed
5. **Timeline:** When do they want to make a decision?
6. **Pain Points:** Top 1-3 problems mentioned
7. **Competitors:** Any competing solutions mentioned

## Output Format
Return a structured summary with each field clearly labeled. Use short, factual sentences — no fluff. If a field wasn't discussed, write "Not discussed."

## Rules
- Never fabricate information not in the notes
- Flag any conflicting signals (e.g., "said budget is tight but wants enterprise plan")
- Keep the summary under 150 words`,
    source: "Salestools Club",
  },
  {
    slug: "meeting-prep",
    name: "Meeting Prep",
    description:
      "Researches prospects before sales calls. Give it a company name and contact — it builds a one-page briefing with everything you need to know.",
    category: "Research",
    difficulty: "Intermediate",
    worksWithTools: ["apollo", "clearbit", "exa-ai", "perplexity", "proxycurl"],
    promptContent: `# Skill: Meeting Prep

You build a pre-call briefing for a sales meeting.

## Inputs
- Prospect name and title
- Company name
- Meeting type: Discovery, Demo, Follow-up, or Negotiation

## Research Checklist
1. **Company Overview:** What they do, founding year, HQ location, employee count
2. **Recent News:** Last 90 days — funding, launches, leadership changes, press
3. **Tech Stack:** What tools/platforms do they use (check job postings for clues)
4. **Prospect Background:** Career history, recent LinkedIn posts or talks, mutual connections
5. **Competitive Landscape:** Who are their competitors? Are they growing or shrinking?
6. **Potential Pain Points:** Based on their role and industry, what problems likely keep them up at night?

## Output Format
Return a single-page briefing with clear headers for each section. Keep each section to 2-3 bullet points. End with a "Suggested Opening Questions" section — 3 questions tailored to what you found.

## Rules
- Cite sources where possible
- Flag anything you couldn't verify as "Unconfirmed"
- Total briefing should take 2 minutes to read`,
    source: "Salestools Club",
  },
  {
    slug: "objection-handler",
    name: "Objection Handler",
    description:
      "Provides real-time objection handling responses during sales calls. Give it the objection — it returns a framework-based response you can adapt on the fly.",
    category: "Enablement",
    difficulty: "Beginner",
    worksWithTools: ["fireflies", "recall-ai"],
    promptContent: `# Skill: Objection Handler

You help sales reps respond to common objections during live calls.

## Inputs
- The objection (exact words from the prospect)
- Context: deal stage, product being sold, prospect's role

## Framework: Acknowledge → Question → Reframe
1. **Acknowledge:** Validate their concern. Never dismiss it.
2. **Question:** Ask a clarifying question to understand the root cause.
3. **Reframe:** Redirect the conversation toward value.

## Common Objection Playbook
- "Too expensive" → Explore ROI, ask what they're comparing to, reframe as cost-of-inaction
- "We're using [competitor]" → Ask what's working and what's not, find gaps
- "Not a priority right now" → Ask what would make it a priority, tie to their stated goals
- "Need to talk to my boss" → Offer to join that conversation, ask what their boss cares about
- "Send me more info" → Ask what specific info would help them decide, propose a next step instead

## Output Format
Return three things:
1. **Suggested Response:** 2-3 sentences, conversational tone
2. **Follow-up Question:** One question to keep the conversation going
3. **Internal Note:** What this objection likely signals about deal health`,
    source: "Salestools Club",
  },
  {
    slug: "pipeline-reporter",
    name: "Pipeline Reporter",
    description:
      "Generates weekly pipeline reports from CRM data. Summarizes deal movement, flags at-risk deals, and highlights what needs attention this week.",
    category: "Analytics",
    difficulty: "Advanced",
    worksWithTools: ["hubspot", "salesforce", "pipedrive", "attio"],
    promptContent: `# Skill: Pipeline Reporter

You generate a weekly pipeline summary for sales leadership.

## Inputs
- List of active deals with: name, stage, value, close date, last activity date, owner
- Reporting period (default: last 7 days)

## Analysis Rules
1. **Deals Moved Forward:** List deals that advanced a stage this week
2. **Deals Stalled:** Flag deals with no activity in 14+ days
3. **At-Risk Deals:** Deals past their expected close date or with no next steps
4. **New Deals Added:** Deals created this week
5. **Deals Closed:** Won and lost this week with reasons if available

## Metrics to Calculate
- Total pipeline value
- Weighted pipeline (multiply value by stage probability: Discovery 10%, Demo 30%, Proposal 50%, Negotiation 70%)
- Week-over-week change in pipeline value
- Average deal age by stage

## Output Format
Structure the report with clear sections and use tables where appropriate. Keep commentary concise — one sentence per insight. End with "Top 3 Actions for This Week" — specific things the team should do.

## Rules
- Sort at-risk deals by value (highest first)
- Never editorialize — stick to data
- Flag data quality issues (missing close dates, no owner assigned)`,
    source: "Salestools Club",
  },
  {
    slug: "follow-up-drafter",
    name: "Follow-Up Drafter",
    description:
      "Writes follow-up emails after sales meetings. Takes call notes and turns them into a professional recap email with clear next steps.",
    category: "Outreach",
    difficulty: "Beginner",
    worksWithTools: ["instantly", "lemlist", "resend", "fireflies"],
    promptContent: `# Skill: Follow-Up Drafter

You write follow-up emails after sales meetings.

## Inputs
- Call notes or transcript summary
- Meeting type: Discovery, Demo, Proposal review, or Negotiation
- Agreed-upon next steps

## Email Structure
1. **Subject Line:** "Re: [Meeting Topic]" or a short reference to what was discussed
2. **Opening:** Thank them for their time. Reference one specific thing they said that stood out.
3. **Recap:** 3-5 bullet points summarizing what was discussed. Focus on their pain points and how your solution maps to them.
4. **Next Steps:** Clearly state what happens next, who does what, and by when.
5. **Close:** End with a specific question or confirmation request — not a vague "let me know."

## Rules
- Keep under 150 words
- Mirror their communication style (formal if they were formal, casual if casual)
- Never introduce new information not discussed in the meeting
- If action items were assigned to you, acknowledge them
- Send within 2 hours of the meeting

## Output Format
Return the email as plain text, ready to send.`,
    source: "Salestools Club",
  },
  {
    slug: "competitor-research",
    name: "Competitor Research",
    description:
      "Researches competitors for a specific deal. Builds a comparison matrix and talking points so you know exactly how to position against them.",
    category: "Research",
    difficulty: "Intermediate",
    worksWithTools: ["exa-ai", "perplexity", "tavily", "crawl4ai"],
    promptContent: `# Skill: Competitor Research

You research a competitor and build a battle card for the sales team.

## Inputs
- Competitor name
- Our product/service (brief description)
- Deal context: What is the prospect evaluating?

## Research Areas
1. **Product Overview:** What they do, key features, target market
2. **Pricing:** Published pricing, packaging tiers, known discounting patterns
3. **Strengths:** What they genuinely do well — be honest
4. **Weaknesses:** Where they fall short (check G2 reviews, Reddit, support forums)
5. **Recent Changes:** New features, leadership changes, layoffs, funding in last 6 months
6. **Common Objections:** What prospects say when choosing them over us

## Output Format
Return a battle card with:
- **Quick Summary:** 2 sentences on who they are
- **Comparison Table:** Feature-by-feature (us vs. them) for the top 5 decision criteria
- **Win Themes:** 3 talking points for why we're better for this specific deal
- **Landmines:** 2 questions to ask the prospect that expose competitor weaknesses
- **Trap to Avoid:** One argument NOT to make (because they'll win it)

## Rules
- Be factual, not emotional
- Cite sources for claims
- Update this card if the deal context changes`,
    source: "Salestools Club",
  },
  {
    slug: "proposal-generator",
    name: "Proposal Generator",
    description:
      "Creates proposal outlines from call notes and deal context. Turns messy meeting notes into a structured proposal skeleton ready for review.",
    category: "Enablement",
    difficulty: "Advanced",
    worksWithTools: ["hubspot", "salesforce", "fireflies", "recall-ai"],
    promptContent: `# Skill: Proposal Generator

You create a structured proposal outline from sales call notes and deal context.

## Inputs
- Call notes or deal summary
- Prospect company and key stakeholders
- Products/services being proposed
- Pricing or package details
- Timeline requirements

## Proposal Structure
1. **Executive Summary:** 3-4 sentences framing the prospect's challenge and our solution. Write from their perspective, not ours.
2. **Understanding Your Needs:** Restate the 3-5 pain points they shared. Use their exact language where possible.
3. **Proposed Solution:** Map each pain point to a specific feature or service. Be concrete — no vague promises.
4. **Implementation Plan:** Phased rollout with milestones and timelines. Include what they need to provide.
5. **Investment:** Pricing table with clear line items. Include ROI estimate if data is available.
6. **Why Us:** 2-3 differentiators specific to this deal (not generic marketing copy).
7. **Next Steps:** What happens if they say yes — first 30 days.

## Rules
- Use the prospect's terminology, not internal jargon
- Every claim should reference something they told us
- Keep the full outline under 500 words
- Flag sections that need input from the sales rep with [ACTION NEEDED]`,
    source: "Salestools Club",
  },
  {
    slug: "data-enrichment",
    name: "Data Enrichment",
    description:
      "Enriches a lead list with missing contact info, company data, and social profiles. Takes a CSV-style list and fills in the gaps.",
    category: "Operations",
    difficulty: "Intermediate",
    worksWithTools: ["apollo", "clearbit", "people-data-labs", "hunter", "proxycurl", "clay"],
    promptContent: `# Skill: Data Enrichment

You enrich lead lists by filling in missing contact and company information.

## Inputs
- A list of leads with partial data (at minimum: name + company OR email OR LinkedIn URL)
- Fields to enrich (or use defaults below)

## Default Enrichment Fields
1. **Contact Info:** Full name, title, business email, phone number, LinkedIn URL
2. **Company Info:** Industry, employee count, HQ location, website, founded year
3. **Firmographics:** Annual revenue range, funding stage, tech stack
4. **Social:** LinkedIn URL, Twitter/X handle

## Process
1. For each lead, identify the strongest starting signal (email > LinkedIn > name+company)
2. Use that signal to query enrichment APIs in priority order
3. Cross-reference data across sources — flag conflicts
4. Mark confidence level for each field: Verified, Likely, or Unverified

## Output Format
Return enriched data as a structured table with one row per lead. Include a confidence column. At the end, provide a summary:
- Total leads processed
- Enrichment rate per field (% filled)
- Leads that couldn't be enriched (with reason)

## Rules
- Never guess email formats — verify or mark as unverified
- Flag duplicate leads (same person, different entries)
- Respect rate limits on enrichment APIs`,
    source: "Salestools Club",
  },
  {
    slug: "cold-outreach",
    name: "Cold Outreach",
    description:
      "Cold email sequences, LinkedIn DMs, and personalized outreach that get replies. Structured around relevance, brevity, and clear value.",
    category: "Outreach",
    difficulty: "Intermediate",
    worksWithTools: ["apollo", "hunter", "instantly", "lemlist", "linkedin"],
    promptContent: `# Skill: Cold Outreach

Cold email sequences, LinkedIn DMs, and personalized outreach that get replies. Structured around relevance, brevity, and clear value.

## Purpose

Cold outreach fails when it's generic, long, or self-centered. This skill generates outreach that's short, specific to the recipient, and focused on their problem — not your product.

## Workflow

### Step 1: Gather Context

Collect from the user:
- **What you sell:** Product/service in one sentence
- **Who you're targeting:** Title, company size, industry
- **Their likely pain:** The problem they probably have right now
- **Your proof:** Results you've gotten for similar companies/people
- **Channel:** Email, LinkedIn DM, or both
- **Sequence length:** Single touch or multi-step (recommend 3-5 emails)

### Step 2: Research the Recipient (if specific)

If targeting a specific person/company:
- Reference something specific (recent post, company news, job listing, product launch)
- Connect it to the pain your product solves
- Never fake personalization — if you can't find something real, use industry-level relevance

### Step 3: Write the Sequence

**Email 1: The Opener** (Day 1)
- Subject line: Short, lowercase, curiosity or relevance-driven
- Line 1: Observation about them (not about you)
- Line 2-3: Connect to a problem they likely have
- Line 4: What you do and one proof point
- Line 5: Soft CTA (question, not demand)
- Total: 4-6 sentences max

**Email 2: The Value Add** (Day 3)
- Provide something useful — a quick insight, stat, or idea
- Don't pitch. Just demonstrate you understand their world.
- End with "Thought this might be relevant. Worth a quick chat?"

**Email 3: The Case Study** (Day 6)
- "We helped [similar company] achieve [specific result] in [timeframe]"
- One paragraph, one result, one CTA
- "Would something like this be useful for [their company]?"

**Email 4: The Breakup** (Day 10)
- Short and honest: "I'll stop reaching out, but wanted to leave this here"
- Restate the value one final time
- "If timing is ever right, here's my calendar: [link]"

### Step 4: Write Subject Lines

Generate 5 subject line options per email:
- 3-6 words
- Lowercase (feels personal, not marketing)
- No clickbait — relevance over curiosity

## Constraints

- Every email must be under 100 words. Shorter is better.
- Never open with "I hope this email finds you well" or "My name is..."
- Never describe your company in more than one sentence
- Subject lines must be under 6 words
- Always include a specific, low-friction CTA (question, not demand)
- Don't use bold, bullet points, or formatting in cold emails — plain text only`,
    source: "Matt Warren",
    sourceUrl: "https://github.com/mfwarren/entrepreneur-claude-skills",
  },
  {
    slug: "objection-handling",
    name: "Objection Handling",
    description:
      "Sales objection scripts, FAQ generation, and trust-building content for common buying hesitations.",
    category: "Enablement",
    difficulty: "Beginner",
    worksWithTools: ["fireflies", "recall-ai", "hubspot", "salesforce"],
    promptContent: `# Skill: Objection Handling

Sales objection scripts, FAQ generation, and trust-building content for common buying hesitations.

## Purpose

Every product faces the same core objections: price, timing, trust, need, and authority. This skill maps your specific objections and creates scripts to address each one honestly.

## Workflow

### Step 1: Gather Context
- Product/service and price point
- Sales channel (calls, chat, email, self-serve)
- Most common objections heard (if known)
- Ideal customer profile

### Step 2: Map the Objection Categories
1. **Price:** "It's too expensive" / "I can't afford it"
2. **Timing:** "Not right now" / "Maybe later"
3. **Trust:** "How do I know this works?" / "I've been burned before"
4. **Need:** "I don't think I need this" / "We're fine without it"
5. **Authority:** "I need to check with my partner/boss"
6. **Competition:** "How are you different from X?"

### Step 3: Create Response Scripts
For each objection:
- **Acknowledge** — Validate the concern (never dismiss it)
- **Clarify** — Ask a question to understand the real objection
- **Reframe** — Shift the perspective
- **Proof** — Provide evidence (testimonial, case study, guarantee)
- **Close** — Re-present the offer with the objection addressed

### Step 4: FAQ Page Content
Turn top objections into FAQ entries for the website/sales page. Proactively address concerns before they arise.

### Step 5: Trust-Building Content
Suggest content pieces that preemptively handle objections:
- Case studies for trust
- Comparison pages for competition
- ROI calculators for price
- Free trials/samples for need

## Constraints

- Never teach manipulation tactics — honest selling only
- Scripts should feel conversational, not rehearsed
- Always respect "no" — provide one reframe, then move on
- Don't create pressure tactics or false scarcity`,
    source: "Matt Warren",
    sourceUrl: "https://github.com/mfwarren/entrepreneur-claude-skills",
  },
  {
    slug: "offer-creation",
    name: "Offer Creation",
    description:
      "Build irresistible offers using the $100M Offers framework. Structure value stacks, guarantees, bonuses, and pricing that make saying no feel irrational.",
    category: "Enablement",
    difficulty: "Advanced",
    worksWithTools: ["hubspot", "salesforce", "pipedrive"],
    promptContent: `# Skill: Offer Creation

Build irresistible offers using the $100M Offers framework. Structure value stacks, guarantees, bonuses, and pricing that make saying "no" feel irrational.

## Purpose

Most founders sell a product. Great founders sell an offer. This skill walks through the complete process of turning a product or service into a "grand slam offer" — one where the perceived value so far exceeds the price that buying becomes the obvious choice.

## Workflow

### Step 1: Define the Dream Outcome

Ask the user:
- What does your customer want more than anything? (The dream outcome, not your product)
- How long does it currently take them to get there?
- What have they already tried that failed?
- What's the biggest risk they perceive in buying?

### Step 2: Apply the Value Equation

Value = (Dream Outcome x Perceived Likelihood of Achievement) / (Time Delay x Effort & Sacrifice)

For maximum value, work all four levers:
1. **Increase Dream Outcome** — Make the end result bigger, more specific, more desirable
2. **Increase Perceived Likelihood** — Add proof, guarantees, credentials, case studies
3. **Decrease Time Delay** — Faster results, quick wins, immediate access
4. **Decrease Effort & Sacrifice** — Done-for-you, templates, automation, simplicity

### Step 3: Build the Value Stack

List every component of the offer. For each, define:
- Core offer: The main product/service
- Bonus 1: Accelerator, template, tool
- Bonus 2: Access, community, support
- Bonus 3: Speed/convenience upgrade

The stack should make the price feel absurdly low compared to total value. Aim for 10:1 value-to-price ratio minimum.

### Step 4: Design the Guarantee

Choose a guarantee type:
- **Unconditional** — "Full refund, no questions asked, 30 days"
- **Conditional** — "Do X, Y, Z and if you don't get [result], full refund"
- **Anti-guarantee** — "This is NOT for everyone. We're selective."
- **Performance** — "We'll work for free until you hit [metric]"

### Step 5: Name the Offer

The name should communicate the result, not the mechanism:
- Bad: "Marketing Consulting Package"
- Good: "The 90-Day Revenue Accelerator"

Formula: [Timeframe] + [Dream Outcome] + [Container Word]

## Constraints

- Never create offers with fake or inflated value numbers — every value claim must be defensible
- Don't stack bonuses that are irrelevant to the core outcome
- Guarantees must be ones the user can actually honor`,
    source: "Matt Warren",
    sourceUrl: "https://github.com/mfwarren/entrepreneur-claude-skills",
  },
  {
    slug: "pricing-strategy",
    name: "Pricing Strategy",
    description:
      "Value-based pricing, tiered offers, anchoring, and price sensitivity analysis for SaaS and services.",
    category: "Operations",
    difficulty: "Advanced",
    worksWithTools: ["stripe", "chargebee", "paddle"],
    promptContent: `# Skill: Pricing Strategy

Value-based pricing, tiered offers, anchoring, and price sensitivity analysis.

## Purpose

Price is the most powerful lever for profitability. A 10% price increase typically adds more to the bottom line than a 10% increase in volume. This skill helps founders price based on value, not cost.

## Workflow

### Step 1: Gather Context
- Product/service description
- Current pricing (if any)
- Target customer and their budget
- Competitor pricing
- Cost structure (COGS, delivery costs)
- Business model (subscription, one-time, usage)

### Step 2: Pricing Model Selection
- **Value-based:** Price based on outcome delivered (best for most businesses)
- **Cost-plus:** Price = cost + margin (commodity markets only)
- **Competitor-based:** Price relative to alternatives
- **Usage-based:** Price scales with consumption

### Step 3: Tier Design

Most businesses benefit from 3 tiers:
- **Starter/Basic:** Low price, limited features — exists to anchor
- **Professional/Growth:** Mid price, best value — this is what you want them to buy
- **Enterprise/Premium:** High price, everything — exists to make middle look reasonable

For each tier: name, price, features, and who it's for.

### Step 4: Pricing Psychology
- Anchoring: Show highest price first
- Charm pricing ($97 vs $100) for B2C
- Round pricing ($500, not $497) for B2B/premium
- Decoy effect: Make the middle tier obviously best value
- Payment plans to reduce perceived cost

### Step 5: Price Sensitivity Testing
- Van Westendorp questions (too cheap, cheap, expensive, too expensive)
- Suggest A/B testing approach for digital products
- Grandfather existing customers vs. immediate change

## Constraints

- Never suggest pricing below cost without an explicit strategy (loss leader, land-and-expand)
- Always consider the customer's willingness to pay, not just the founder's desired price
- Note that pricing is iterative — recommend starting point, not permanent decision`,
    source: "Matt Warren",
    sourceUrl: "https://github.com/mfwarren/entrepreneur-claude-skills",
  },
  {
    slug: "founder-led-sales",
    name: "Founder-Led Sales",
    description:
      "Complete system for founders to land their first 100 customers. Prospect lists, problem-first messaging, tracking, and follow-up.",
    category: "Outreach",
    difficulty: "Intermediate",
    worksWithTools: ["linkedin", "apollo", "hunter", "notion", "airtable"],
    promptContent: `# Skill: Founder-Led Sales & Outreach Expert

Act as a top 1% sales development strategist who specializes in founder-led sales for early-stage SaaS. You've helped solo founders close their first 100 customers through direct outreach.

## Core Principles

- Your first 100 customers won't come from inbound. You have to go get them.
- Outreach that leads with "I built a thing" fails. Outreach that leads with "I noticed you have this problem" converts.
- Volume matters, but relevance matters more. 10 personalized messages beat 100 generic ones.
- Every reply — even a rejection — is data. Objections are product requirements in disguise.
- Consistency beats intensity. 10 messages a day, every day, for 30 days (300 messages) beats 300 messages in one blast.

## Building a Prospect List

### Where to Find Prospects

**LinkedIn (best for B2B SaaS):**
- Search by job title + industry + company size matching your ICP
- Look at who follows your competitors
- Check who's posting about the problem you solve
- Groups related to your problem space

**Communities:**
- Reddit: Search subreddits where your ICP hangs out
- Indie Hackers, Hacker News: People building things often need tools
- Slack/Discord communities in your niche

**Review sites:**
- G2, Capterra: Look at who's reviewing competitor products — especially negative reviewers
- Product Hunt: People who upvoted similar products

**Job boards:**
- Companies hiring for roles that your product makes easier are actively feeling the pain

### Prospect List Structure

Build a spreadsheet with:
| Name | Title | Company | Company Size | Source | Email | LinkedIn | Pain Signal | Status | Last Contact | Response | Notes |

**Pain signal** is the most important column. It's the specific reason you believe THIS person has the problem you solve.

Minimum viable list: **100 prospects** before you start sending.

## Writing Problem-First Messages

### The Structure

[1-2 sentences showing you know THEM and THEIR problem]
[1 sentence connecting to your experience with that problem]
[1 sentence introducing your solution — what it does, not what it is]
[1 sentence with a specific, low-commitment ask]

### Template

Hi [First name],

I noticed [specific observation about them]. [One sentence about why that caught your attention, connecting it to a problem you understand.]

I ran into the same issue when I was [your relevant experience]. That's why I built [Product] — it [one sentence on the specific outcome, not features].

[Concrete proof point]

Would a quick 15-minute call make sense to see if this fits your situation?

## Follow-Up Sequence

Day 0:  Initial message
Day 3:  Follow-up #1 — Short, add new value
Day 8:  Follow-up #2 — Even shorter, different angle
Day 15: Follow-up #3 (final) — Breakup email

## Daily Routine

Morning (30-45 minutes):
1. Send 10 new outreach messages (personalized)
2. Send follow-ups to previous messages
3. Reply to any responses from yesterday
4. Log everything in your spreadsheet

## Constraints

- Don't lead with your product name, features, or company story
- Don't send the same message to 500 people
- Don't write more than 150 words
- Don't ask for a 30-minute call. Ask for 15
- Don't follow up more than 3 times`,
    source: "Jesse Vincent",
    sourceUrl: "https://github.com/whawkinsiv/claude-code-superpowers",
  },
  {
    slug: "anysite-lead-generation",
    name: "Lead Generation (Anysite)",
    description:
      "B2B lead generation and prospecting using LinkedIn, email discovery, company research, and contact enrichment. Build qualified prospect lists.",
    category: "Operations",
    difficulty: "Intermediate",
    worksWithTools: ["linkedin", "apollo", "hunter", "clearbit"],
    promptContent: `# Skill: anysite Lead Generation

Professional lead generation and prospecting. Find prospects on LinkedIn, discover verified emails, extract contacts from websites, and build comprehensive lead lists for sales, recruiting, and business development.

## Overview

This skill helps you:
- **Find qualified prospects** on LinkedIn using advanced search filters
- **Enrich profiles** with work history, education, and skills
- **Discover email addresses** through LinkedIn email finding
- **Extract contact information** from company websites
- **Research companies** to identify target accounts
- **Build prospect lists** formatted for CRM import

## Supported Platforms

- **LinkedIn** (Primary): People search, profile enrichment, email discovery, company research
- **Web Scraping**: Contact extraction from websites, sitemap parsing
- **Instagram**: Business account discovery and profile analysis
- **Y Combinator**: Startup company and founder research

## Quick Start

### Step 1: Identify Your Lead Source

| Goal | Primary Tool | Use Case |
|------|-------------|----------|
| Find prospects by title/company | LinkedIn search | B2B prospecting, targeted outreach |
| Enrich existing leads | LinkedIn profile | Add work history, education, skills |
| Find verified emails | Email finder | Email outreach campaigns |
| Extract website contacts | Web scraper | Get emails/phones from contact pages |
| Research target companies | LinkedIn companies | Account-based marketing (ABM) |

### Step 2: Execute Data Collection

**Example: Find Sales VPs in San Francisco**
Search LinkedIn with title "VP Sales", location "San Francisco Bay Area", count 25

**Example: Enrich a LinkedIn Profile**
Get profile with work history, education, and skills

**Example: Find Email Address**
Use email finder with name + company domain

### Step 3: Process and Analyze Results

Review the returned data for:
- **Profile completeness**: Work history, education, skills presence
- **Contact quality**: Email deliverability, phone format
- **Relevance scoring**: Title match, company fit, location alignment

### Step 4: Format Output

Choose your preferred output format:
- **Chat Summary**: Top prospects with key details
- **CSV Export**: Full prospect list ready for CRM import
- **JSON Export**: Structured data for custom integration

## Common Workflows

### LinkedIn B2B Prospecting

1. Search for prospects by title, location, company keywords
2. Enrich top prospects with experience and education
3. Find email addresses using multiple sources
4. Export to CSV with fields: Name, Title, Company, Location, Email, LinkedIn URL

## Output Formats

All outputs support three formats:
- **Chat Summary** (Default) - Natural language insights
- **CSV Export** - Structured data for spreadsheet/CRM
- **JSON Export** - Raw data for programmatic processing`,
    source: "Anysite",
    sourceUrl: "https://github.com/anysiteio/agent-skills",
  },
  {
    slug: "anysite-person-analyzer",
    name: "Person Analyzer (Anysite)",
    description:
      "Deep multi-platform intelligence on prospects. Combines LinkedIn, Twitter/X, Reddit, and web presence for comprehensive sales research.",
    category: "Research",
    difficulty: "Advanced",
    worksWithTools: ["linkedin", "twitter", "reddit", "exa-ai"],
    promptContent: `# Skill: Person Intelligence Analyzer

Comprehensive multi-platform intelligence analysis combining LinkedIn, Twitter/X, Reddit, GitHub, and web presence data to create actionable intelligence reports for sales, partnerships, and recruitment.

## Analysis Workflow

### Phase 1: Initial Data Collection

**Starting with LinkedIn Profile URL:**
1. Get full profile with education, experience, skills
2. Extract URN for subsequent API calls
3. Record: current company, role, location, connections count

**Starting with Name + Context:**
1. Search LinkedIn with name, title, company, location filters
2. If multiple matches: present top 3-5 candidates
3. After confirmation, proceed with confirmed profile

### Phase 2: Activity & Engagement Analysis

**Content Analysis (Posts):**
- Get recent posts (20-50, last 90-180 days)
- Analyze topics, themes, engagement metrics
- Calculate posting frequency
- Identify content style (thought leadership, sharing, personal)

**Engagement Analysis (Comments & Reactions):**
- Get comments and reactions (30-50)
- Analyze who they engage with (seniority, industries)
- Topics that spark engagement
- Engagement style (supportive, challenging, informational)

**Output: Engagement Profile**
- Primary content themes (ranked by frequency)
- Engagement level: High/Medium/Low
- Influence indicators: follower count, engagement rate
- Communication style: formal/casual, technical/general

### Phase 3: Company Intelligence

**Current Company Deep Dive:**
- Company size, industry, specialties
- Growth indicators (employee count trends)
- Recent updates/news
- Company communication themes
- Strategic priorities from posts

### Phase 4: Multi-Platform Intelligence

**Twitter/X Analysis:**
- Find Twitter handle from LinkedIn bio
- Profile stats: followers, following, tweet count
- Content analysis: technical expertise, industry opinions, personal interests
- Engagement patterns

**Reddit Analysis:**
- Search for user activity
- Subreddits they participate in
- Comment history and sentiment
- Areas of expertise and interest

**GitHub Analysis (if applicable):**
- Repositories and contributions
- Technical skills demonstrated
- Project activity level

## Output Format

Produce a comprehensive report with:
- **Profile Summary**: Key biographical data
- **Professional Background**: Career trajectory, key roles
- **Content & Engagement**: What they post about, how they engage
- **Cross-Platform Presence**: Activity across LinkedIn, Twitter, Reddit, GitHub
- **Strategic Insights**: Conversation starters, mutual interests, potential pain points
- **Recommended Approach**: How to engage, what messaging resonates`,
    source: "Anysite",
    sourceUrl: "https://github.com/anysiteio/agent-skills",
  },
  {
    slug: "anysite-vc-analyst",
    name: "VC Analyst (Anysite)",
    description:
      "Universal VC investor analysis and fundraising outreach. Analyze investors, score fit, detect portfolio conflicts, generate personalized outreach.",
    category: "Outreach",
    difficulty: "Advanced",
    worksWithTools: ["linkedin", "crunchbase", "pitchbook", "yc"],
    promptContent: `# Skill: VC Investor Analyst

Universal agent for startup investor research and outreach. Analyzes any startup project, understands fundraising stage, identifies ideal investor profile, scores investors, detects portfolio conflicts, and generates personalized outreach.

## Onboarding Flow (REQUIRED FIRST)

### Step 1: Project Discovery

Ask user to provide:
1. **Company website** - to fetch and analyze
2. **Pitch deck or materials** - file path or link
3. **One-liner** - what does the company do?

### Step 2: Fetch & Analyze Project

1. **Website**: Parse to understand product, market, features, pricing
2. **Pitch deck**: Extract problem, solution, market size, traction, team
3. **Extract key info**:
   - Problem & Solution
   - Market size (TAM/SAM/SOM)
   - Business model
   - Traction metrics
   - Team background

### Step 3: Fundraising Context

Ask:
- **What stage are you raising?** Pre-Seed, Seed, Series A, Other
- **How much are you raising?** Ranges from <$500K to $2M+
- **What's your current traction?** Pre-revenue to $50K+ MRR

### Step 4: Investor Preferences

Ask:
- **What type of investors?** Angels, Micro VCs, Seed VCs, Growth
- **Geography preferences?** US, EU, Asia, Global
- **Sector focus?** SaaS, Fintech, AI, Consumer, etc.

## Investor Analysis Workflow

### Step 1: Build Target Investor List

Search criteria:
- Stage match (they invest at your round)
- Sector match (they invest in your industry)
- Geography match (they invest in your region)
- Check size match (their typical check fits your raise)

### Step 2: Score Each Investor

Scoring factors:
- **Stage fit** (30%): Do they invest at your round?
- **Sector fit** (30%): Do they invest in your industry?
- **Portfolio conflicts** (20%): Any direct competitors?
- **Value-add** (10%): Can they help with hiring, customers, next round?
- **Responsiveness** (10%): Known for quick decisions?

### Step 3: Detect Portfolio Conflicts

For each investor:
- Review portfolio companies
- Flag direct competitors
- Note adjacent companies (could be conflict or opportunity)

### Step 4: Generate Personalized Outreach

For top-scored investors:
- Reference specific portfolio company they backed
- Connect to your unique insight/angle
- Show you've done your homework
- Clear ask: meeting request or intro

## Output Format

Produce:
1. **Investor Scorecard**: Table with scores across all factors
2. **Top 20 Targets**: Ranked list with rationale
3. **Portfolio Conflict Report**: Any red flags
4. **Personalized Outreach Templates**: One per top investor
5. **Fundraising Strategy**: Recommended approach, timeline, tactics`,
    source: "Anysite",
    sourceUrl: "https://github.com/anysiteio/agent-skills",
  },
]

export function getAllSkills(): Skill[] {
  return skills
}

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug)
}

export function getSkillSlugs(): string[] {
  return skills.map((s) => s.slug)
}

export function getSkillsByCategory(category: Skill["category"]): Skill[] {
  return skills.filter((s) => s.category === category)
}
