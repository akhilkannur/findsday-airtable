import type { DirectoryToolRecord } from "@/lib/airtableClient"
import Image from "next/image"
import Link from "next/link"
import { generateDirectoryToolUrl } from "@/lib/urlUtils"
import { ExternalLink, Zap } from "lucide-react"

interface DirectoryToolCardProps {
  tool: DirectoryToolRecord
  viewMode?: "grid" | "list"
  className?: string
}

export default function DirectoryToolCard({ tool, viewMode = "grid", className = "" }: DirectoryToolCardProps) {
  const isGridMode = viewMode === "grid"

  const getCategoryColor = (category: string) => {
    const colors = {
      CRM: "bg-blue-500 text-white",
      "Lead Generation": "bg-emerald-500 text-white",
      Analytics: "bg-purple-500 text-white",
      Automation: "bg-orange-500 text-white",
      Communication: "bg-pink-500 text-white",
      "Sales Enablement": "bg-indigo-500 text-white",
      Productivity: "bg-teal-500 text-white",
      Marketing: "bg-yellow-500 text-white",
      "Customer Support": "bg-gray-600 text-white",
      Other: "bg-slate-500 text-white",
    }
    return colors[category as keyof typeof colors] || "bg-gray-500 text-white"
  }

  if (!isGridMode) {
    return (
      <Link
        href={generateDirectoryToolUrl(tool.fields.Name || "", tool.id)}
        className={`group flex items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 ${className}`}
      >
        <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden mr-6">
          {tool.fields.Logo && tool.fields.Logo[0] ? (
            <Image
              src={tool.fields.Logo[0].url || "/placeholder.svg"}
              alt={`${tool.fields.Name} logo`}
              width={64}
              height={64}
              className="w-full h-full object-contain p-2"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">🔧</div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
              {tool.fields.Name || "Unnamed Tool"}
            </h3>
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {tool.fields["Short Description"] || tool.fields.Description || "No description available"}
          </p>

          <div className="flex items-center gap-2">
            {tool.fields.Category && (
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(tool.fields.Category)}`}>
                {tool.fields.Category}
              </span>
            )}
            {tool.fields["Pricing Model"] && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium rounded-full">
                {tool.fields["Pricing Model"]}
              </span>
            )}
            {tool.fields["Deal Available"] && (
              <span className="bg-green-100 text-green-700 px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Deal
              </span>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={generateDirectoryToolUrl(tool.fields.Name || "", tool.id)}
      className={`group relative bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
              {tool.fields.Logo && tool.fields.Logo[0] ? (
                <Image
                  src={tool.fields.Logo[0].url || "/placeholder.svg"}
                  alt={`${tool.fields.Name} logo`}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain p-2"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">🔧</div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                {tool.fields.Name || "Unnamed Tool"}
              </h3>
            </div>
          </div>

          {tool.fields["Deal Available"] && (
            <div className="flex-shrink-0">
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Deal
              </span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {tool.fields["Short Description"] || tool.fields.Description || "No description available"}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {tool.fields.Category && (
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(tool.fields.Category)}`}>
                {tool.fields.Category}
              </span>
            )}
          </div>

          {tool.fields["Pricing Model"] && (
            <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium rounded-full">
              {tool.fields["Pricing Model"]}
            </span>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
      </div>
    </Link>
  )
}

