import type { DirectoryToolRecord } from "@/lib/airtableClient"
import Image from "next/image"
import Link from "next/link"
import { generateDirectoryToolUrl } from "@/lib/urlUtils" // Import SEO-friendly URL generator

interface DirectoryToolCardProps {
  tool: DirectoryToolRecord
  viewMode?: "grid" | "list"
  className?: string
}

export default function DirectoryToolCard({ tool, viewMode = "grid", className = "" }: DirectoryToolCardProps) {
  const isGridMode = viewMode === "grid"

  const getCategoryColor = (category: string) => {
    const colors = {
      CRM: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200",
      "Lead Generation": "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-200",
      Analytics: "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-purple-200",
      Automation: "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-200",
      Communication: "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-pink-200",
      "Sales Enablement": "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-indigo-200",
      Productivity: "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-teal-200",
      Marketing: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-yellow-200",
      "Customer Support": "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-gray-200",
      Other: "bg-gradient-to-r from-slate-500 to-gray-600 text-white shadow-slate-200",
    }
    return (
      colors[category as keyof typeof colors] || "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-gray-200"
    )
  }

  return (
    <Link
      href={generateDirectoryToolUrl(tool.fields.Name || "", tool.id)} // Use SEO-friendly URL generation
      className={`group relative bg-white border-2 border-gray-100 hover:border-black transition-all duration-500 ease-out overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-gray-400 to-transparent"></div>

      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-white opacity-60"></div>

      <div className="relative p-8">
        <div className="flex items-start gap-6">
          <div className="relative flex-shrink-0 w-16 h-16 bg-black/5 border border-gray-200 group-hover:border-black/20 transition-all duration-300">
            {tool.fields.Logo && tool.fields.Logo[0] ? (
              <Image
                src={tool.fields.Logo[0].url || "/placeholder.svg"}
                alt={`${tool.fields.Name} logo`}
                fill
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-light">🔧</div>
            )}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-black transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-medium text-black text-xl leading-tight tracking-tight group-hover:tracking-wide transition-all duration-300">
                {tool.fields.Name || "Unnamed Tool"}
              </h3>

              {tool.fields["Deal Available"] && (
                <div className="relative">
                  <span className="bg-black text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider border-2 border-black">
                    Deal
                  </span>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400"></div>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light">
              {tool.fields["Short Description"] || tool.fields.Description || "No description available"}
            </p>

            <div className="flex items-center gap-3">
              {tool.fields.Category && (
                <span
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg ${getCategoryColor(tool.fields.Category)}`}
                >
                  {tool.fields.Category}
                </span>
              )}
              {tool.fields["Pricing Model"] && (
                <span className="bg-gray-900 text-white px-3 py-1.5 text-xs font-medium uppercase tracking-wider">
                  {tool.fields["Pricing Model"]}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-500 ease-out"></div>
      </div>
    </Link>
  )
}
