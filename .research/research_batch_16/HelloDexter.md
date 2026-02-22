[ ![Hello Dexter](https://hellodexter.com/assets/logo.png) ](https://app.hellodexter.com/) [Join waitlist [+]](https://hellodexter.com/waitlist.html) [See demo [↗]](https://www.youtube.com/watch?v=VQhN0S3Ndtw)
AI-powered B2B lead generation
#  Find prospects. Enrich data. Ship outreach.
HelloDexter is a sales intelligence platform built for teams who want more signal and less busywork — backed by a massive database, triple-verification, and a waterfall enrichment pipeline. 
[Join waitlist [free]](https://hellodexter.com/waitlist.html) [Watch demo [↗]](https://www.youtube.com/watch?v=VQhN0S3Ndtw)
workflow
endpoints search enrich
base: https://api.hellodexter.com/v1  
  
API Authorization check · GET /auth/check  
Credit check API · GET /credits/check  
Contact API (Cerebria ID) · GET /contact/{cerebria_id}  
Email verification API · POST /verify/email  
Email/Phone Enrichment API · POST /enrich/email-phone  
LinkedIn URL · POST /linkedin/url  
Search People · POST /search/people 
$ curl -s https://api.hellodexter.com/v1/search/people \\\   
-H "Authorization: Bearer $HDX_API_KEY" \\\   
-H "Content-Type: application/json" \\\   
-d '{ "first_name": "Dale", "last_name": "Kirkwood" }'  
  
response:  
{ "cerebria_id": "gJYUJ4sBFoATWK64maoC", "full_name": "dale kirkwood", "linkedin_url": "https://www.linkedin.com/in/dalekirkwood/" } 
$ curl -s https://api.hellodexter.com/v1/credits/check \\\   
-H "Authorization: Bearer $HDX_API_KEY"  
  
$ curl -s https://api.hellodexter.com/v1/enrich/email-phone \\\   
-H "Authorization: Bearer $HDX_API_KEY" \\\   
-H "Content-Type: application/json" \\\   
-d '{ "cerebria_id": "gJYUJ4sBFoATWK64maoC" }'  
  
$ curl -s https://api.hellodexter.com/v1/verify/email \\\   
-H "Authorization: Bearer $HDX_API_KEY" \\\   
-H "Content-Type: application/json" \\\   
-d '{ "email": "name@company.com" }' 
## Demo
[embedded] YouTube video
Tip: if embeds are blocked, open via the [HelloDexterAI YouTube](https://www.youtube.com/@HelloDexterAI) channel.
[More videos [→]](https://www.youtube.com/@HelloDexterAI)
## Key features
built for sales, recruiting, marketing
1
### Verified Lead Database
Search and export from a massive, triple-verified database — emails, phone numbers, and LinkedIn profiles.
![Verified lead database preview](https://hellodexter.com/assets/VerifiedCompressed.gif)
2
### AI‑Personalized Outreach
Generate highly specific outreach using prospect activity, company context, and web signals — without sounding generic.
![AI personalized outreach preview](https://hellodexter.com/assets/NexusCompressed.gif)
3
### Waterfall Enrichment
7+ sources, one flow. Fill missing fields, increase match rate, and raise confidence before you ever hit send.
![Waterfall enrichment preview](https://hellodexter.com/assets/WaterfallCompressed.gif)
4
### CRM Integration
Sync to HubSpot, Salesforce, Pipedrive, and Zoho to keep your pipeline clean, current, and automatically updated.
![CRM sync preview](https://hellodexter.com/assets/EnrichCompressed.gif)
## Pricing
credits-based plans
Plan | Monthly | What you get  
---|---|---  
Free recommended | €0 | 100 Basic / 20 Super Credits (one-time), Unlimited exports.  
Starter | ~€29.99 | 200 Basic / 40 Super Credits, Basic support.  
Growth | ~€49.99 | 1,000 Basic / 150 Super Credits, Priority support, Advanced search.  
Elite | Custom | 10,000+ credits, Dedicated account manager, Custom branding.  
[Join waitlist [→]](https://hellodexter.com/waitlist.html) [Follow on LinkedIn [→]](https://www.linkedin.com/company/hello-dexter)
![EN Funded](https://hellodexter.com/assets/EN_Funded.png)
Hello Dexter — AI-powered B2B lead gen & sales intelligence.  
Built for teams that care about accuracy. 
[Join waitlist](https://hellodexter.com/waitlist.html) [YouTube](https://www.youtube.com/@HelloDexterAI) [LinkedIn](https://www.linkedin.com/company/hello-dexter)
© 2025 Hello Dexter
