import Link from "next/link"

export interface FaqItem {
  question: string
  answer: string | React.ReactNode
}

export function FaqSection({ items, title = "Frequently Asked Questions" }: { items: FaqItem[], title?: string }) {
  if (items.length === 0) return null

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof item.answer === 'string' ? item.answer : "Refer to the page content for details."
      }
    }))
  }

  return (
    <section className="border-t border-ink/10 bg-white/40 py-16 md:py-24">
      <div className="layout-container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        
        <div className="mb-12">
          <p className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-fade">Support &amp; Guidance</p>
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2 md:gap-y-16 lg:gap-x-24">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-3 group">
              <span className="font-mono text-[0.68rem] text-ink-fade tracking-[0.18em] opacity-40 transition-opacity group-hover:opacity-100">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-semibold transition-colors group-hover:text-ink md:text-2xl">{item.question}</h3>
              <div className="border-l border-ink/10 pl-6 text-base leading-relaxed text-ink-fade">
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
