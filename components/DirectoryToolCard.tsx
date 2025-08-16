"use client"

import type React from "react"

import type { DirectoryToolRecord } from "@/lib/airtableClient"
import Image from "next/image"
import { ExternalLink, Zap, Star } from "lucide-react"

interface DirectoryToolCardProps {
  tool: DirectoryToolRecord
  viewMode?: "grid" | "list"
  className?: string
  onToolClick?: (tool: DirectoryToolRecord) => void
  isFeatured?: boolean
}

export default function DirectoryToolCard({
  tool,
  viewMode = "grid",
  className = "",
  onToolClick,
  isFeatured = false,
}: DirectoryToolCardProps) {
  const isGridMode = viewMode === "grid"

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onToolClick) {
      onToolClick(tool)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      CRM: "bg-blue-500 text-white",
      "Lead Generation": "bg-accent-green text-charcoal",
      Analytics: "bg-purple-500 text-white",
      Automation: "bg-orange-500 text-white",
      Communication: "bg-accent-pink text-charcoal",
      "Sales Enablement": "bg-indigo-500 text-white",
      Productivity: "bg-teal-500 text-white",
      Marketing: "bg-yellow-500 text-charcoal",
      "Customer Support": "bg-gray-600 text-white",
      Other: "bg-slate-500 text-white",
    }
    return colors[category as keyof typeof colors] || "bg-gray-500 text-white"
  }

  if (!isGridMode) {
    return (
      <button
        onClick={handleClick}
        className={`group flex items-center p-4 lg:p-6 bg-charcoal-dark border border-gray-800 rounded-xl hover:border-accent-pink hover:shadow-lg transition-all duration-300 w-full text-left ${className}`}
      >
        <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mr-4 lg:mr-6">
          {tool.fields.Logo && tool.fields.Logo[0] ? (
            <Image
              src={tool.fields.Logo[0].url || "/placeholder.svg"}
              alt={`${tool.fields.Name} logo`}
              width={64}
              height={64}
              className="w-full h-full object-contain p-1 lg:p-2"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg lg:text-2xl">🔧</div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <h3 className="font-semibold text-white text-base lg:text-lg group-hover:text-accent-green transition-colors truncate">
                {tool.fields.Name || "Unnamed Tool"}
              </h3>
              {isFeatured && <Star className="w-4 h-4 text-accent-green fill-current flex-shrink-0" />}
            </div>
            <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 group-hover:text-accent-pink transition-colors flex-shrink-0 ml-2" />
          </div>

          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {tool.fields["Short Description"] || tool.fields.Description || "No description available"}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            {tool.fields.Category && (
              <span
                className={`px-2 lg:px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(tool.fields.Category)}`}
              >
                {tool.fields.Category}
              </span>
            )}
            {tool.fields["Pricing Model"] && (
              <span className="bg-gray-800 text-gray-300 px-2 lg:px-3 py-1 text-xs font-medium rounded-full">
                {tool.fields["Pricing Model"]}
              </span>
            )}
            {tool.fields["Deal Available"] && (
              <span className="bg-accent-green text-charcoal px-2 lg:px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Deal
              </span>
            )}
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`group relative bg-charcoal-dark border border-gray-800 rounded-xl overflow-hidden flex flex-col justify-end p-4 lg:p-6 min-h-[240px] lg:min-h-[280px] hover:shadow-lg hover:border-accent-pink transition-all duration-200 w-full text-left ${className}`}
      style={{
        backgroundImage: tool.fields.Logo && tool.fields.Logo[0] ? `url(${tool.fields.Logo[0].url})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {tool.fields.Logo && tool.fields.Logo[0] && <link rel="preload" as="image" href={tool.fields.Logo[0].url} />}

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/80 to-transparent rounded-xl"></div>

      <div className="relative z-10 flex flex-col h-full justify-end">
        <div className="flex items-center justify-between mb-2">
          {tool.fields.Category && (
            <span
              className={`px-2 lg:px-3 py-1 text-xs font-bold uppercase rounded-full ${getCategoryColor(tool.fields.Category)}`}
            >
              {tool.fields.Category}
            </span>
          )}
          {isFeatured && <Star className="w-4 h-4 lg:w-5 lg:h-5 text-accent-green fill-current" />}
        </div>

        <h3 className="text-lg lg:text-xl font-bold text-white mb-2 leading-tight">
          {tool.fields.Name || "Unnamed Tool"}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
          {tool.fields["Short Description"] || tool.fields.Description || "No description available"}
        </p>

        <div className="flex items-center justify-between">
          {tool.fields["Website URL"] && (
            <div className="inline-flex items-center justify-center border border-gray-600 text-gray-300 px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-semibold group-hover:border-accent-pink group-hover:text-accent-pink transition-colors">
              Visit Website <ExternalLink className="ml-2 h-3 w-3 lg:h-4 lg:w-4" />
            </div>
          )}

          {tool.fields["Deal Available"] && (
            <span className="bg-accent-green text-charcoal px-2 lg:px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Deal
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
