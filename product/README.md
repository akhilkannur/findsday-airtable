# The Salestools Engine (Master Manual)

This package contains the exact modular instructions, design system, and technical blueprints used to build and scale **Salestools.club**.

## Package Contents
- `/skills/researcher.md`: Autonomous software scouting & deep scan logic.
- `/skills/architect.md`: Next.js 15 structure & Sheet-to-Code pipeline.
- `/skills/designer.md`: The "Paper and Ink" design system & CSS hacks.
- `/skills/voice-enforcer.md`: Personal branding rules & punctuation constraints.

## How to Use the Machine
1.  **Install the Skills:** Add these Markdown files to your AI agent (Claude Code, Gemini CLI, or Cursor).
2.  **Assign a Niche:** Say to your agent: *"I want to build a directory for the Recruiting niche. Use the **Niche Researcher** to find 50 tools."*
3.  **Deploy the UI:** *"Now use the **Design System Enforcer** and **System Architect** to build the Next.js site."*
4.  **Polish the Voice:** *"Apply the **Voice Enforcer** rules to all site copy to ensure a solo-founder feel."*

## Prerequisites & Deployment
For the autonomous sync to work on Vercel, the buyer must provide:
- **Google Cloud Service Account:** With Spreadsheet Editor access.
- **Vercel Env Vars:** `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, and `GOOGLE_SHEET_ID`.
- **Domain:** The AI will automatically configure SEO canonicals based on the target domain.

## The Clean Slate Protocol
To start a new directory from scratch:
1.  **Wipe the Sheet:** Clear all rows in your Google Sheet (except the Header Row).
2.  **Clear Local Data:** Run `cat > lib/data.ts <<EOF ... EOF` to reset the local storage.
3.  **Run Researcher:** Initiate the **Niche Researcher** skill to populate your new niche.

## The Technical "Guts"
The engine relies on three critical scripts (included in the root `/scripts` folder of the repository):
- `sync-gsheet.py`: The Vercel-optimized data fetcher.
- `gsheet_manager.py`: The database writer.
- `sync-to-gsheet.py`: The initial migration tool.

---
© 2026 Salestools.club • Engineered by Akhil
