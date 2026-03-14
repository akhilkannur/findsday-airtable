# Verified API Tools - Sessions Log

## Batch 6 (uHubs - xiQ area)

| Tool Name | docsUrl Verified | Data Points Verified | Notes |
|-----------|-----------------|---------------------|-------|
| uHubs | ❌ No API Found | ❓ | No public API docs - appears to be sales training platform only |
| xiQ | ❌ No API Found | ❓ | No public API docs - only user guides, no developer API |

---

## Batch 5 (Intellizence - Jebbit area)

| Tool Name | docsUrl Verified | Data Points Verified | Notes |
|-----------|-----------------|---------------------|-------|
| Intellizence | ✅ | ✅ | Fixed docsUrl. API Key auth, hasFreeTier: false, hasWebhooks: true |
| Jebbit | ✅ | ✅ | Fixed docsUrl. OAuth2 (Bearer JWT), hasFreeTier: unverified, hasWebhooks: true |

---

## Batch 4 (JustCall - Outscraper area)

| Tool Name | docsUrl Verified | Data Points Verified | Notes |
|-----------|-----------------|---------------------|-------|
| JustCall | ✅ | ✅ | API Key auth, hasFreeTier: false, hasWebhooks: true |
| Kaspr | ⚠️ Fixed | ✅ | Fixed docsUrl (was empty). Added https://kaspr.stoplight.io/docs/kaspr-api. Bearer Token auth, hasWebhooks: true |
| ~~Katalyz~~ | ❌ Removed | - | No public API docs found - removed entry |
| Journy.io | ⚠️ Fixed | ✅ | Fixed docsUrl (was empty). Added https://developers.journy.io. API Key auth, hasFreeTier: true, hasWebhooks: true |
| Kuration | ✅ | ✅ | GraphQL, API Key auth, hasWebhooks: true |
| LinkedIn Sales Navigator | ✅ | ✅ | OAuth2 auth, hasWebhooks: true |
| Outscraper | ✅ | ✅ | API Key auth, hasFreeTier: true, hasWebhooks: true |
| Perplexity AI | ⚠️ Fixed | ✅ | Fixed docsUrl (was empty). Added https://docs.perplexity.ai. API Key auth, hasFreeTier: false, hasWebhooks: true |

---

## Batch 3 (PhantomBuster - Saber area)

| Tool Name | docsUrl Verified | Data Points Verified | Notes |
|-----------|-----------------|---------------------|-------|
| PhantomBuster | ✅ | ✅ | API Key auth, hasFreeTier: false, hasWebhooks: true |
| Resend | ⚠️ Fixed | ✅ | Fixed docsUrl from /mcp to /docs. API Key auth, hasFreeTier: false, hasWebhooks: true |
| Retell AI | ⚠️ Fixed | ✅ | Fixed docsUrl (was empty). Added https://docs.retellai.com. Bearer Token auth, hasWebhooks: true |
| Tavily | ✅ | ✅ | API Key auth, hasFreeTier: false, hasWebhooks: true |
| Vapi | ✅ | ✅ | Bearer Token auth, hasFreeTier: true, hasWebhooks: true |
| Voyage AI | ⚠️ Fixed | ✅ | Fixed docsUrl (was empty). Added https://docs.voyageai.com. API Key auth, hasFreeTier: true, hasWebhooks: true |
| Saber | ✅ | ✅ | Bearer Token auth, hasFreeTier: true, hasWebhooks: true |

---

## Batch 2 (Browse AI & Crawlbase area)

| Tool Name | docsUrl Verified | Data Points Verified | Notes |
|-----------|-----------------|---------------------|-------|
| Browse AI | ✅ | ✅ | Bearer Token auth, hasFreeTier: true, hasWebhooks: true |
| Crawlbase | ✅ | ⚠️ Fixed | hasWebhooks was false - now true (has webhook support in Crawler) |

---

## Batch 1 (Recently Added - MasterInbox onwards)

| Tool Name | docsUrl Verified | Data Points Verified | Notes |
|-----------|-----------------|---------------------|-------|
| MasterInbox | ✅ | ✅ | Uses Smartlead API (acquired). hasFreeTier: false, hasWebhooks: true |
| PersistIQ | ✅ | ✅ | Fixed docsUrl. API Key auth, hasFreeTier: true, hasWebhooks: false |
| Playbook AI | ✅ | ✅ | OAuth2 auth, hasFreeTier: true, hasWebhooks: false |
| ReachInbox | ✅ | ✅ | API Key auth, hasFreeTier: true, hasWebhooks: true |
| ReachKit | ✅ | ✅ | API Key auth, hasFreeTier: false, hasWebhooks: true |
| Replyify | ✅ | ✅ | OAuth2 auth, hasFreeTier: false, hasWebhooks: false |
| RevReply | ✅ | ✅ | Bearer Token auth, hasFreeTier: true, hasWebhooks: true |
| BriteVerify | ✅ | ✅ | API Key auth, hasFreeTier: false, hasWebhooks: false |
| EmailListVerify | ✅ | ✅ | API Key auth, hasFreeTier: true, hasWebhooks: false |
| Enrichley | ✅ | ✅ | API Key auth, hasFreeTier: false, hasWebhooks: false |
| Mailcheck | ✅ | ⚠️ Rebranded | Now "UserCheck" - check if should update name |
| Firehose | ✅ | ✅ | API Key auth, hasFreeTier: true, hasWebhooks: true |
| Breakcold | ✅ | ✅ | API Key auth, hasFreeTier: true, hasWebhooks: true |
| NetHunt CRM | ✅ | ✅ | API Key auth (Basic), hasFreeTier: true, hasWebhooks: true |
| OnePageCRM | ✅ | ✅ | API Key auth, hasFreeTier: true, hasWebhooks: true |
| Pipeliner CRM | ✅ | ✅ | OAuth2 auth, hasFreeTier: false, hasWebhooks: true |
| Sugar CRM | ✅ | ✅ | OAuth2 auth, hasFreeTier: false, hasWebhooks: true |
| Teamgate | ✅ | ✅ | API Key auth, hasFreeTier: true, hasWebhooks: true |
| Coresignal | ✅ | ✅ | Bearer Token auth, hasFreeTier: false, hasWebhooks: false |

## Issues Found & Fixed
- PersistIQ: Changed docsUrl from `https://apidocs.persistiq.com/` to `https://www.persistq.com/docs`
- Crawlbase: Changed hasWebhooks from false to true (they have webhook support in Crawler)
- Resend: Changed docsUrl from `https://resend.com/mcp` to `https://resend.com/docs`
- Retell AI: Added docsUrl `https://docs.retellai.com` (was empty)
- Voyage AI: Added docsUrl `https://docs.voyageai.com` (was empty)
- Kaspr: Added docsUrl `https://kaspr.stoplight.io/docs/kaspr-api` (was empty)
- Katalyz: Removed entry - no public API available (different company from katalys.com which has API)
- Journy.io: Added docsUrl `https://developers.journy.io` (was empty)
- Intellizence: Added docsUrl `https://docs.intellizence.com` (was empty)
- Jebbit: Added docsUrl `https://developers.jebbit.com` (was empty)
- Perplexity AI: Added docsUrl `https://docs.perplexity.ai` (was empty)

## Notes
- MasterInbox uses Smartlead's API documentation (acquired company)
- Mailcheck has been rebranded to "UserCheck" - may need to update name
- All other data points (apiType, authMethod, hasFreeTier, hasWebhooks) verified against docs

---

## Next Batch to Verify
Start from the tools listed before PhantomBuster in the file (around lines 10100-10220)
