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
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-8 py-24 border-b border-ink">
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
          <div className="font-mono text-[0.75rem] uppercase tracking-widest text-ink-fade mb-6 italic">01. Introduction</div>
          <p className="text-xl font-serif italic text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            Salestools Club ("I") respects your privacy. This policy explains how I handle information when you visit my module directory.
          </p>
        </section>

        <section>
          <div className="font-mono text-[0.75rem] uppercase tracking-widest text-ink-fade mb-6 italic">02. Data Collection</div>
          <p className="text-xl font-serif italic text-ink-fade leading-relaxed mb-8">
            I collect minimal protocol data to provide my service:
          </p>
          <ul className="list-disc pl-8 font-serif text-xl italic text-ink-fade space-y-6">
            <li><strong>Usage Data:</strong> I use Google Analytics 4 (GA4) to understand how nodes interact with the site. This includes anonymized IP addresses and page view behavior.</li>
            <li><strong>Email:</strong> If you join my list, I store your email address solely for sending you the newsletter packet.</li>
          </ul>
        </section>

        <section>
          <div className="font-mono text-[0.75rem] uppercase tracking-widest text-ink-fade mb-6 italic">03. External Nodes</div>
          <p className="text-xl font-serif italic text-ink-fade leading-relaxed">
            I link to many third-party sales tools. I am not responsible for the privacy practices of those external nodes. Please check their respective protocols.
          </p>
        </section>

        <section>
          <div className="font-mono text-[0.75rem] uppercase tracking-widest text-ink-fade mb-6 italic">04. Primary Contact</div>
          <p className="text-xl font-serif italic text-ink-fade leading-relaxed mb-8">
            For any questions about your data, contact:
          </p>
          <p className="text-2xl font-bold underline underline-offset-8">
            <a href="mailto:akhil@salestools.club" className="hover:line-through transition-all">akhil@salestools.club</a>
          </p>
        </section>

        <div className="pt-24 border-t border-ink/10 font-mono text-[0.75rem] uppercase tracking-widest text-ink-fade italic">
          Last Revision: February 19, 2026
        </div>
      </div>
    </div>
  )
}
