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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-10 md:gap-y-16">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-3 group">
              <span className="font-mono text-[0.7rem] text-ink-fade tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-bold group-hover:text-black transition-colors">{item.question}</h3>
              <div className="text-base md:text-lg text-ink-fade leading-relaxed font-serif italic border-l border-ink/5 pl-6">
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
