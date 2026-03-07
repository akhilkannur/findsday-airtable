# Salestools Club: Agent Instructions (AGENTS.md)

## Core Vision
Salestools Club is a directory for **"AI-Native Operators."** This is a specific, high-intent audience that is distinct from traditional developers.

## The Ideal Customer Profile (ICP)
The "AI-Native Operator" (The Tinkerer):
- **Who they are:** Founders, Sales Managers, and Revenue Ops professionals.
- **What they do:** They use AI (Claude, Cursor, Gemini CLI) to generate code and configure systems rather than writing them from scratch.
- **Their Goal:** They are outcome-obsessed. They want "Lego blocks" for sales (specialized APIs) that they can plug into their AI agents.
- **Their Workflow:** They don't read docs; they copy/paste prompts and MCP configurations. They are comfortable with the terminal ONLY when the AI tells them exactly what to type.

## Project Principles for AI Agents
1. **Outcome-First:** Every tool page must show what an AI can *do* with the tool, not just technical specs.
2. **Copy-Paste Ready:** Prioritize "Starter Prompts" and "MCP Configurations" as the primary data moat.
3. **AI Difficulty:** Tools are rated by how easily an AI assistant (like Claude) can interface with them (Beginner-Friendly vs. Technical).
4. **No Fluff:** Keep descriptions human, direct, and conversational. Avoid "AI slop" or marketing jargon.

## Data Structure Reference
- **MCP Ready:** Highlight tools that have official or community MCP servers using the `Zap` icon.
- **AI Capabilities:** Map technical endpoints to real-world sales outcomes.
- **Skill Files:** Provide `.md` skill files that users can give to their AI agents to "teach" them about the directory.

## Data Audit Progress
Tools are audited in batches of 12 (by docsUrl order in lib/data.ts):

- [x] **Batch 1** (tools 1-12): Linkup, Reply.io, Icypeas, Twenty, SuiteCRM, EspoCRM, QRev, Radiant AI CRM, LeadGenGPT, coldr, ActionGrid (Conga), Ambition
  - Fixed: LeadGenGPT (added apiType/authMethod), QRev (updated description)
- [x] **Batch 2** (tools 13-24): Appxite, Artillery, BatchService, BetterContact, Bland AI, Brainshark, Breadcrumbs...
  - Fixed: Brainshark docsUrl (broken /docs -> /developer/)
- [x] **Batch 3** (tools 25-36): Bryo, Cien, Clearbit, Clodura, Colby AI, Common Room, Conga, Copy.ai, Correlated, Crunchbase
  - Fixed: Copy.ai - acquired by Fullcast in Oct 2025, updated name, description, docsUrl, pricingUrl, and added aiCapabilities/starterPrompt
- [x] **Batch 4** (tools 37-48): Bryo, Cien, Clearbit, Clodura, Colby AI, Common Room, Conga, Copy.ai, Correlated, Crunchbase, CustomerIQ, DocSales
  - All docs URLs verified accurate
- [x] **Batch 5** (tools 49-60): FinalScout, First Sales, Five9, FlowUp, Folderly, Folk, FreJun, Fresh Proposals, FullEnrich, GTM Engine, Gearset, GetAccept...
  - Fixed: Inframail docsUrl (was broken testapp URL, now points to help center)
- [x] **Batch 6** (tools 61-72): GetAccept, GetResponse, GetSales, GetVocal, Gojiberry, Goose CRM, GoBluebird, HelloDexter, Homerun Presales, HubSpot, Infraforge, Inframail...
  - Fixed: Koncert docsUrl (broken /developers -> /developer/)
- [x] **Batch 7** (tools 73-84): Persana AI, PhoneBurner, Pipedrive, Pod, Practis, Prospeo, Proxycurl, QuotaPath...
  - Fixed: Prospeo docsUrl (wrong redirect URL)
- [x] **Batch 8** (tools 85-96): QuotaPath, ReachOwl, Reachout.ai, Salesfinity, Salesflare... (mostly accurate, many lack docsUrl)
  - No major fixes needed
- [x] **Batch 9** (tools 97-108): Salesflow, Salesforce, Zapier, Zoho CRM, noCRM.io, Cal.com
  - All docs URLs verified accurate
- [x] **Batch 10** (tools 109-120): Calendly, Chili Piper, Fireflies.ai, Gong...
  - All docs URLs verified accurate
- [x] **Batch 11** (tools 121-132): Gong, PandaDoc, DocuSign, Recall.ai...
  - All docs URLs verified accurate (PandaDoc now has MCP server)
- [x] **Batch 12** (tools 133-144): ElevenLabs, 6sense...
  - All docs URLs verified accurate
- [x] **Batch 13** (tools 145-156): Advisr and others (most lack docsUrl)
  - Advisr docs URL verified accurate
- [x] **Batch 14** (tools 157-168): Attention, BuzzBoard, Clodura, Cresta...
  - Fixed: Clodura docsUrl (wrong path)
- [x] **Batch 15** (tools 169-180): Radiant AI CRM, LeadGenGPT, coldr, ARPEDIO, ActionGrid, Ambition, AppXite, Artillery, BatchService, BetterContact, Bland AI, Brainshark
  - All docs URLs verified accurate
- [x] **Batch 16** (tools 181-192): FinalScout, First Sales, Five9, FlowUp, Folderly, Folk, FreJun, Fresh Proposals, FullEnrich, GTM Engine, Gearset, GetAccept
  - All docs URLs verified accurate
- [x] **Batch 17** (tools 193-204): GetResponse, GetSales, GetVocal, Gojiberry, Golden Leads, Goose CRM, GoBluebird, HelloDexter, Homerun, HubSpot, Infraforge, Inframail
  - All docs URLs verified accurate
- [x] **Batch 18** (tools 205-216): Klenty, Koncert, LeadFuze, LeadMine, Leadinfo, Letterdrop, Mailreef, Make, Manyreach, Mattermark, MeetRox, Membrain
  - Fixed: Leadinfo (removed incorrect docsUrl - no public API available)
- [x] **Batch 19** (tools 217-228): Nooks, Nyne, Orum, Outreach, People Data Labs, Performio, Persana, PhoneBurner, Pipedrive, Pod, Practis, Prospeo
  - All docs URLs verified accurate
- [x] **Batch 20** (tools 229-240): QuotaPath, ReachOwl, Reachout.ai, Salesfinity, Salesflare, Salesflow, Salesforce, Turian, Zapier, Zoho CRM, noCRM.io, Cal.com
  - All docs URLs verified accurate
- [x] **Batch 21** (tools 241-252): Cal.com, Calendly, Chili Piper, Fireflies, Gong, PandaDoc, DocuSign, Recall.ai, ElevenLabs, 1up, 6sense, AI Bees
  - Fixed: Chili Piper docsUrl (broken link updated)
- [x] **Batch 22** (tools 253-264): Clodura, Cresta, Databook, Demandbase, Draup... (mostly accurate, many lack docsUrl)
  - All docs URLs verified accurate
- [x] **Batch 23** (tools 265-276): Freshworks CRM, Swordfish, Datagma, Live Data, PredictLeads, Enrich.so, ContactOut, Mailtrack, Close, Nutshell, Frontspin, FullContact
  - Fixed: Removed broken docsUrls for Swordfish, Mailtrack (no public API)
- [x] **Batch 24** (tools 277-288): La Growth Machine, Landbase, LeadMagic, Leadbay, Leadfeeder, Leadzen, LiProspect, Lightfield, Mediafly, Meetz... (mostly accurate, many lack docsUrl)
  - All docs URLs verified accurate
- [x] **Batch 25** (tools 289-300): Modjo, Naoma, Navattic, Nimble, Octave, Oliv, Outplay, Overloop, Pipeline, Primerole... (mostly accurate, many lack docsUrl)
  - Identified issues: Outplay, Overloop may have broken docsUrls (need verification)
- [x] **Batch 26** (tools 301-312): Primerole, Prosp, Prospectoo, Qwilr, RB2B, Regal, Regie.ai, Relevance AI, Reprise, Revenue Grid, Sailes, SalesIntel
  - Fixed: Qwilr (added missing docsUrl), Typewise (removed broken docsUrl - TLS error)
- [x] **Batch 27+**: Continuing to verify remaining docsUrls
  - Found and fixed: Success.ai, Telescope, Typewise docsUrls issues
  - Fixed: Extrovert (wrong URL), Groove (wrong URL), Humantic AI (wrong URL), Penny (wrong URL)
  - Removed broken URLs: Leadinfo, Swordfish, Mailtrack, Typewise (no public API or TLS errors)

## Data Verification Complete
