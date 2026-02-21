import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Salestools Club",
  description: "Privacy policy for Salestools Club.",
  alternates: {
    canonical: "https://salestools.club/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--paper)]">
      <section className="px-8 py-24 border-b border-[var(--ink)]">
        <div className="layout-container">
          <Link
            href="/"
            className="font-mono text-[0.75rem] uppercase underline hover:line-through transition-all mb-12 inline-block"
          >
            &lt;- Back to System
          </Link>

          <h1 className="type-display uppercase">
            Privacy Policy
          </h1>
        </div>
      </section>
      
      <div className="layout-container py-24 space-y-24 max-w-4xl">
        <section>
          <div className="font-mono text-[0.75rem] uppercase tracking-widest text-[var(--ink-fade)] mb-6 italic">01. Introduction</div>
          <p className="text-xl font-serif italic text-[var(--ink-fade)] leading-relaxed border-l-2 border-[var(--ink)] pl-6">
            Salestools Club ("we", "us", or "our") respects your privacy. This policy explains how we handle information when you visit our module directory.
          </p>
        </section>

        <section>
          <div className="font-mono text-[0.75rem] uppercase tracking-widest text-[var(--ink-fade)] mb-6 italic">02. Data Collection</div>
          <p className="text-xl font-serif italic text-[var(--ink-fade)] leading-relaxed mb-8">
            We collect minimal protocol data to provide our service:
          </p>
          <ul className="list-disc pl-8 font-serif text-xl italic text-[var(--ink-fade)] space-y-6">
            <li><strong>Usage Data:</strong> We use Google Analytics 4 (GA4) to understand how nodes interact with the site. This includes anonymized IP addresses and page view behavior.</li>
            <li><strong>Email:</strong> If you join our list, we store your email address solely for sending you the newsletter packet.</li>
          </ul>
        </section>

        <section>
          <div className="font-mono text-[0.75rem] uppercase tracking-widest text-[var(--ink-fade)] mb-6 italic">03. External Nodes</div>
          <p className="text-xl font-serif italic text-[var(--ink-fade)] leading-relaxed">
            We link to many third-party sales tools. We are not responsible for the privacy practices of those external nodes. Please check their respective protocols.
          </p>
        </section>

        <section>
          <div className="font-mono text-[0.75rem] uppercase tracking-widest text-[var(--ink-fade)] mb-6 italic">04. Primary Contact</div>
          <p className="text-xl font-serif italic text-[var(--ink-fade)] leading-relaxed mb-8">
            For any questions about your data, contact:
          </p>
          <p className="text-2xl font-bold underline underline-offset-8">
            <a href="mailto:akhil@salestools.club" className="hover:line-through transition-all">akhil@salestools.club</a>
          </p>
        </section>

        <div className="pt-24 border-t border-[var(--ink)]/10 font-mono text-[0.75rem] uppercase tracking-widest text-[var(--ink-fade)] italic">
          Last Revision: February 19, 2026
        </div>
      </div>
    </div>
  )
}
