import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Salestools Club",
  description: "Privacy policy for Salestools Club.",
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black">
        <Link
          href="/"
          className="type-label mb-12 inline-block opacity-40 hover:opacity-100 hover:underline"
        >
          &lt;- Back to System
        </Link>

        <h1 className="type-display">
          Privacy Policy
        </h1>
      </section>
      
      <div className="p-12 md:p-24 space-y-16 max-w-4xl">
        <section>
          <div className="type-label mb-6 opacity-40">01. Introduction</div>
          <p className="text-xl font-medium opacity-60 leading-relaxed">
            Salestools Club ("we", "us", or "our") respects your privacy. This policy explains how we handle information when you visit our module directory.
          </p>
        </section>

        <section>
          <div className="type-label mb-6 opacity-40">02. Data Collection</div>
          <p className="text-xl font-medium opacity-60 leading-relaxed">
            We collect minimal protocol data to provide our service:
          </p>
          <ul className="list-disc pl-8 text-lg font-medium opacity-60 space-y-4 mt-8">
            <li><strong>Usage Data:</strong> We use Google Analytics 4 (GA4) to understand how nodes interact with the site. This includes anonymized IP addresses and page view behavior.</li>
            <li><strong>Email:</strong> If you join our Sunday list, we store your email address solely for sending you the newsletter packet.</li>
          </ul>
        </section>

        <section>
          <div className="type-label mb-6 opacity-40">03. External Nodes</div>
          <p className="text-xl font-medium opacity-60 leading-relaxed">
            We link to many third-party sales tools. We are not responsible for the privacy practices of those external nodes. Please check their respective protocols.
          </p>
        </section>

        <section>
          <div className="type-label mb-6 opacity-40">04. Primary Contact</div>
          <p className="text-xl font-medium opacity-60 leading-relaxed">
            For any questions about your data, contact:
          </p>
          <p className="mt-8 text-2xl font-bold underline underline-offset-8">
            <a href="mailto:akhil@salestools.club" className="hover:text-accent-orange">akhil@salestools.club</a>
          </p>
        </section>

        <div className="pt-24 border-t border-ink-black/10 type-label opacity-40">
          Last Revision: February 19, 2026
        </div>
      </div>
    </div>
  )
}
