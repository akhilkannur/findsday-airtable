import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Salestools Club",
  description: "Privacy policy for Salestools Club.",
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:px-12 lg:px-24">
      <Link
        href="/"
        className="mb-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <h1 className="mt-12 text-5xl font-extrabold tracking-tight sm:text-7xl italic font-heading">
        Privacy Policy
      </h1>
      
      <div className="mt-20 space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Introduction</h2>
          <p className="text-xl text-gray-500 leading-relaxed">
            Salestools Club ("we", "us", or "our") respects your privacy. This policy explains how we handle information when you visit our directory.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Information We Collect</h2>
          <p className="text-xl text-gray-500 leading-relaxed">
            We collect minimal data to provide our service:
          </p>
          <ul className="list-disc pl-8 text-lg text-gray-500 space-y-4 mt-8">
            <li><strong>Usage Data:</strong> We use Google Analytics 4 (GA4) to understand how visitors interact with the site. This includes anonymized IP addresses and page view behavior.</li>
            <li><strong>Email:</strong> If you join our Sunday list, we store your email address solely for sending you the newsletter.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Third-Party Services</h2>
          <p className="text-xl text-gray-500 leading-relaxed">
            We link to many third-party sales tools. We are not responsible for the privacy practices of those external sites. Please check their respective policies.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Contact</h2>
          <p className="text-xl text-gray-500 leading-relaxed">
            For any questions about your data, contact:
          </p>
          <p className="mt-8 text-2xl font-bold text-club-teal">
            <a href="mailto:akhil@salestools.club" className="hover:underline underline-offset-8">akhil@salestools.club</a>
          </p>
        </section>

        <div className="pt-16 border-t border-white/10 text-[11px] font-bold text-gray-700 uppercase tracking-[0.3em]">
          Last updated: February 19, 2026
        </div>
      </div>
    </main>
  )
}
