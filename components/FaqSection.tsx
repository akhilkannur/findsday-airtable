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
    <section className="py-16 md:py-24 border-t border-ink/10 bg-paper-dark/5">
      <div className="layout-container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        
        <div className="mb-12">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade mb-4">Support & Guidance</p>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <span className="font-mono text-[0.7rem] text-ink-fade tracking-widest opacity-40">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl font-bold">{item.question}</h3>
              <div className="text-[1rem] text-ink-fade leading-relaxed font-serif italic">
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
