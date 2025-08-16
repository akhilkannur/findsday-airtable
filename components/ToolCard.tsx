interface ToolCardProps {
  title: string
  category: string
  description: string
  testimonial: string
  makerName: string
  makerTitle: string
  className?: string
}

export default function ToolCard({
  title,
  category,
  description,
  testimonial,
  makerName,
  makerTitle,
  className = "",
}: ToolCardProps) {
  return (
    <div
      className={`bg-charcoal-dark border border-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:border-accent-pink transition-all duration-200 ${className}`}
    >
      <div className="p-6">
        {/* Tool Icon Placeholder */}
        <div className="w-16 h-16 bg-gray-700 border-2 border-dashed border-gray-600 rounded-xl mb-4 flex items-center justify-center">
          <span className="text-gray-500 text-2xl">🔧</span>
        </div>

        {/* Tool Name */}
        <h3 className="font-bold text-xl text-white mb-2">{title}</h3>

        {/* Category Badge */}
        <span className="inline-flex items-center bg-gray-800 text-accent-green text-xs font-medium px-3 py-1 rounded-full mb-3">
          {category}
        </span>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{description}</p>

        {/* Testimonial */}
        <div className="text-xs text-gray-500 border-t border-gray-700 pt-4">
          <p className="italic mb-2">"{testimonial}"</p>
          <p className="font-medium text-gray-400">
            — {makerName}, {makerTitle}
          </p>
        </div>
      </div>
    </div>
  )
}
