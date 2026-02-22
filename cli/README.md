# Salestools.club CLI (Beta)

The official CLI for [Salestools.club](https://salestools.club) — **Configure your sales agents in one command.**

## Why?
Non-technical founders and sales ops teams struggle to manually edit JSON configuration files for Claude or Cursor. This CLI automates that process.

## Current Commands (Beta Preview)
- `npx salestools init`: Bootstraps a fresh sales environment with official MCPs (Apollo, HubSpot, etc.).
- `npx salestools add <slug>`: Fetches a specific skill from our Google Sheet registry and installs it locally.

## Development Note
This is a **separate project** inside the `/cli` folder. It uses `commander`, `chalk`, and `ora` for a high-quality terminal experience.

### Test locally:
```bash
cd cli
npm install
node bin/index.js init
node bin/index.js add apollo
```
