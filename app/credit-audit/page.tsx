import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Info, AlertTriangle, CheckCircle2, ShieldCheck, Zap, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Sales API Credit Policy Comparison Guide (2026) | Salestools Club",
  description: "An operator's reference for Sales Intelligence and Enrichment budgets. We audited 20 popular tools to find the fairest credit policies for AI-native workflows.",
  alternates: {
    canonical: "https://salestools.club/credit-audit",
  },
}

const sources = {
  findymail: "https://www.findymail.com/pricing/",
  prospeo: "https://prospeo.io/s/prospeo-pricing",
  clay: "https://docs.clay.com/en/collections/9964379-credits-plans-billing",
  "full-enrich": "https://www.fullenrich.com/pricing",
  "better-contact": "https://bettercontact.rocks/pricing/",
  dropcontact: "https://www.dropcontact.com/pricing",
  getprospect: "https://getpulsesignal.com/pricing/getprospect",
  smartlead: "https://smartlead.io/pricing",
  uplead: "https://www.uplead.com/pricing/",
  instantly: "https://www.instantly.ai/pricing",
  hunter: "https://hunter.io/pricing",
  snovio: "https://snov.io/pricing",
  kaspr: "https://www.kaspr.io/pricing",
  apollo: "https://www.apollo.io/pricing/about-credits",
  leadiq: "https://www.leadiq.com/pricing",
  rocketreach: "https://www.rocketreach.co/pricing",
  lusha: "https://www.lusha.com/pricing",
  pipl: "https://www.saasworthy.com/product/pipl/pricing",
  cognism: "https://www.cognism.com/pricing",
  clearbit: "https://www.hubspot.com/products/crm/breeze-intelligence",
}

const auditData = [
  { name: "Findymail", slug: "findymail", rollover: "Yes (2x Limit)", charging: "Success-only", catchAll: "Free (if verified)", mobile: "10 Credits", bestFor: "Bulk Email & Success-based" },
  { name: "Prospeo", slug: "prospeo", rollover: "No (Monthly)", charging: "Success-only", catchAll: "1 Credit", mobile: "10 Credits", bestFor: "High Accuracy Email" },
  { name: "Clay", slug: "clay", rollover: "Yes (Data 2x)", charging: "Success-only", catchAll: "Varies", mobile: "Varies", bestFor: "AI Orchestration" },
  { name: "FullEnrich", slug: "full-enrich", rollover: "Yes (3 Months)", charging: "Success-only", catchAll: "Free (if risky)", mobile: "10 Credits", bestFor: "Waterfall Enrichment" },
  { name: "BetterContact", slug: "better-contact", rollover: "Yes (2x Limit)", charging: "Success-only", catchAll: "1 Extra Credit", mobile: "10 Credits", bestFor: "Waterfall Mobile" },
  { name: "Dropcontact", slug: "dropcontact", rollover: "Yes (add-on)", charging: "Success-only", catchAll: "Free", mobile: "N/A", bestFor: "GDPR Enrichment" },
  { name: "GetProspect", slug: "getprospect", rollover: "Yes (1 Month)", charging: "Success-only", catchAll: "Free", mobile: "N/A", bestFor: "LinkedIn Prospecting" },
  { name: "Smartlead", slug: "smartlead", rollover: "No", charging: "Success-only", catchAll: "Free", mobile: "N/A", bestFor: "Outreach & Search" },
  { name: "UpLead", slug: "uplead", rollover: "No (Annual upfront)", charging: "95% Guarantee", catchAll: "Free (if invalid)", mobile: "1 Credit", bestFor: "Verified Lists" },
  { name: "Instantly", slug: "instantly", rollover: "Yes (2 Months)", charging: "Per Reveal", catchAll: "Paid (Risky)", mobile: "1-2 Credits", bestFor: "Search & Outreach" },
  { name: "Hunter.io", slug: "hunter", rollover: "No (Monthly)", charging: "Per Request", catchAll: "0.5 Credits", mobile: "N/A", bestFor: "Domain Search" },
  { name: "Snov.io", slug: "snovio", rollover: "No", charging: "Per Request", catchAll: "Paid (Verifier)", mobile: "N/A", bestFor: "Cold Outreach" },
  { name: "Kaspr", slug: "kaspr", rollover: "Yes (Starter+)", charging: "Per Reveal", catchAll: "Paid", mobile: "1 Credit", bestFor: "Direct Mobiles" },
  { name: "Apollo.io", slug: "apollo", rollover: "No", charging: "Per Reveal", catchAll: "Paid", mobile: "8 Credits", bestFor: "Large Scale Database" },
  { name: "LeadIQ", slug: "leadiq", rollover: "No", charging: "Per Reveal", catchAll: "Paid", mobile: "10 Credits", bestFor: "Enterprise Teams" },
  { name: "RocketReach", slug: "rocketreach", rollover: "No", charging: "Per Reveal", catchAll: "Paid", mobile: "1 Credit", bestFor: "Broad Search" },
  { name: "Lusha", slug: "lusha", rollover: "Yes (2x Limit)", charging: "Per Reveal", catchAll: "Paid", mobile: "1 Credit", bestFor: "Individual Lookups" },
  { name: "Pipl", slug: "pipl", rollover: "No (Annual)", charging: "Per Reveal", catchAll: "Paid", mobile: "1 Credit", bestFor: "Identity Discovery" },
  { name: "Cognism", slug: "cognism", rollover: "No (Fair Use)", charging: "License-based", catchAll: "N/A", mobile: "1 Credit", bestFor: "European Data" },
  { name: "Clearbit", slug: "clearbit", rollover: "No", charging: "Per Request", catchAll: "Paid", mobile: "N/A", bestFor: "Company Enrichment" },
]

function SourceLink({ slug }: { slug: string }) {
  const url = sources[slug as keyof typeof sources]
  if (!url) return null
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[0.65rem] text-ink-fade hover:text-ink ml-2"
      title="View source"
    >
      <ExternalLink className="h-3 w-3" />
      <span>[src]</span>
    </a>
  )
}

export default function CreditAuditPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="px-4 py-12 md:px-8 md:py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <Link
            href="/api"
            className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase underline hover:line-through transition-all mb-8 md:mb-12 inline-block"
          >
            &lt;- Back to APIs
          </Link>

          <h1 className="type-display mb-6 md:mb-8 text-3xl md:text-5xl lg:text-7xl">
            The 2026 Credit <br className="hidden md:block" />
            <span className="circled">Policy Guide.</span>
          </h1>
          <p className="max-w-2xl font-serif italic text-xl md:text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-4 md:pl-6">
            Most sales tools handle credits differently. Some allow rollovers, while others charge for every request, regardless of whether a verified email is found. This guide breaks down the fine print for 20 industry leaders.
          </p>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-12 md:py-24 border-b border-ink">
        <div className="layout-container">
          <div className="mb-12">
            <h2 className="font-mono text-[0.8rem] uppercase tracking-widest font-bold text-ink mb-4">Comparison Matrix</h2>
            <p className="font-serif italic text-lg text-ink-fade">A side-by-side look at rollover policies and charging models. Click [src] to verify each claim.</p>
          </div>

          <div className="overflow-x-auto border border-ink">
            <table className="w-full text-left font-mono text-[0.75rem] md:text-[0.8rem]">
              <thead>
                <tr className="bg-ink text-paper uppercase tracking-widest">
                  <th className="p-4 border-r border-paper/20">Tool</th>
                  <th className="p-4 border-r border-paper/20">Rollover?</th>
                  <th className="p-4 border-r border-paper/20">Charging Model</th>
                  <th className="p-4 border-r border-paper/20">Catch-all</th>
                  <th className="p-4 border-r border-paper/20">Mobile</th>
                  <th className="p-4">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink">
                {auditData.map((tool) => (
                  <tr key={tool.slug} className="hover:bg-paper-dark/20 transition-colors group">
                    <td className="p-4 border-r border-ink font-bold">
                      <Link href={`/apis/${tool.slug}`} className="hover:underline underline-offset-4 flex items-center gap-2">
                        {tool.name} <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    </td>
                    <td className="p-4 border-r border-ink">
                      {tool.rollover}
                      <SourceLink slug={tool.slug} />
                    </td>
                    <td className="p-4 border-r border-ink">{tool.charging}</td>
                    <td className="p-4 border-r border-ink">{tool.catchAll}</td>
                    <td className="p-4 border-r border-ink">{tool.mobile}</td>
                    <td className="p-4 italic text-ink-fade">{tool.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-ink-fade font-mono">
            Sources: Official pricing pages. Last verified: April 2026.
          </p>
        </div>
      </section>

      {/* Deep Dives */}
      <section className="py-12 md:py-24 border-b border-ink bg-white/40">
        <div className="layout-container grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h2 className="font-mono text-[0.8rem] uppercase tracking-widest font-bold text-ink mb-8 md:mb-12">Operator Nuances</h2>
            <div className="space-y-12 md:space-y-16">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-ink">
                  <Zap className="h-5 w-5" />
                  <h3 className="font-serif text-xl md:text-2xl font-bold">The Annual Bucket</h3>
                </div>
                <p className="text-lg text-ink-fade leading-relaxed font-serif italic">
                  Annual plans for tools like <strong>Hunter.io</strong>, <strong>Instantly</strong>, or <strong>UpLead</strong> provide a 12-month lump sum of credits. This removes the monthly "use-it-or-lose-it" pressure, effectively solving the rollover problem for power users who have fluctuating volume.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-ink">
                  <AlertTriangle className="h-5 w-5" />
                  <h3 className="font-serif text-xl md:text-2xl font-bold">The "Guessed" Credit Leak</h3>
                </div>
                <p className="text-lg text-ink-fade leading-relaxed font-serif italic">
                  Legacy providers like <strong>Apollo.io</strong> often charge for "extrapolated" or "guessed" emails. These have a significantly higher bounce rate. Most tools refuse to refund credits for these contacts, even if the data is 100% incorrect.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-ink">
                  <Info className="h-5 w-5" />
                  <h3 className="font-serif text-xl md:text-2xl font-bold">Actions vs. Data (Clay)</h3>
                </div>
                <p className="text-lg text-ink-fade leading-relaxed font-serif italic">
                  In <strong>Clay</strong>, your <strong>Data Credits</strong> (finding emails) roll over up to a 2x cap, but your <strong>Actions</strong> (the platform compute steps) reset every month. Don&apos;t hoard data credits only to find you&apos;ve run out of "Actions" to actually use them.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 border-2 border-ink bg-paper shadow-[12px_12px_0px_rgba(26,25,23,0.1)]">
            <h2 className="font-mono text-[0.8rem] uppercase tracking-widest font-bold text-ink mb-8 md:mb-10">Why it matters for AI</h2>
            <div className="space-y-8">
              <p className="font-serif text-xl leading-relaxed italic">
                &quot;When building with <strong>Claude Code</strong> or <strong>Cowork</strong>, an agent can pull data much faster than a human operator. If you&apos;re on a 'Pay-per-Request' or 'No Rollover' plan, an agent can burn your entire monthly budget in minutes on low-quality data.&quot;
              </p>
              <div className="h-px bg-ink/10 w-full"></div>
              <div className="space-y-6">
                <h4 className="font-mono text-[0.7rem] uppercase font-bold tracking-widest text-ink/40 text-center">Operator Checklist</h4>
                <ul className="space-y-4 font-mono text-sm">
                  <li className="flex gap-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-ink" />
                    <span>Does my tool charge for 'Invalid' or 'Catch-all' results?</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-ink" />
                    <span>Is there a cap on my rollover credits (e.g. 2x monthly)?</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-ink" />
                    <span>Does my annual plan provide credits upfront or monthly?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-32 bg-ink text-paper text-center">
        <div className="layout-container max-w-3xl">
          <h2 className="type-display text-3xl md:text-5xl mb-8">Build your <span className="underline decoration-paper/30 underline-offset-8">AI-Native</span> Sales Stack.</h2>
          <p className="font-serif italic text-xl md:text-2xl opacity-70 mb-12">Stop paying for dead data. Use the APIs that respect your budget.</p>
          <Link href="/api" className="circled font-mono font-bold uppercase tracking-widest hover:bg-paper hover:text-ink transition-all">
            Browse All APIs
          </Link>
        </div>
      </section>
    </div>
  )
}