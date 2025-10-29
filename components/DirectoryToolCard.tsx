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
    const colors: { [key: string]: string } = {
      CRM: "bg-blue-100 text-blue-800",
      "Lead Generation": "bg-green-100 text-green-800",
      Analytics: "bg-yellow-100 text-yellow-800",
      Automation: "bg-purple-100 text-purple-800",
      Communication: "bg-pink-100 text-pink-800",
      "Sales Enablement": "bg-indigo-100 text-indigo-800",
      Productivity: "bg-gray-100 text-gray-800",
      Marketing: "bg-red-100 text-red-800",
      "Customer Support": "bg-orange-100 text-orange-800",
      Other: "bg-gray-100 text-gray-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  if (!isGridMode) {
    return (
      <button
        onClick={handleClick}
        className={`directory-tool-card-list ${className}`}
      >
        <div className="directory-tool-card-logo-container-list">
          {tool.fields.Logo && tool.fields.Logo[0] ? (
            <Image
              src={tool.fields.Logo[0].url || "/placeholder.svg"}
              alt={`${tool.fields.Name} logo`}
              width={64}
              height={64}
              className="directory-tool-card-logo-list"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl">🔧</div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <h3 className="directory-tool-card-name-list truncate">
                {tool.fields.Name || "Unnamed Tool"}
              </h3>
              {isFeatured && <Star className="w-4 h-4 text-blue-500 fill-current flex-shrink-0" />}
            </div>
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2" />
          </div>

          <p className="directory-tool-card-description-list line-clamp-2">
            {tool.fields["Short Description"] || tool.fields.Description || "No description available"}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            {tool.fields.Category && (
              <span
                className={`directory-tool-card-category-badge ${getCategoryColor(tool.fields.Category)}`}
              >
                {tool.fields.Category}
              </span>
            )}
            {tool.fields["Pricing Model"] && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs font-medium rounded-md border border-gray-200">
                {tool.fields["Pricing Model"]}
              </span>
            )}
            {tool.fields["Deal Available"] && (
              <span className="bg-green-500 text-white px-3 py-1 text-xs font-medium rounded-md flex items-center gap-1">
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
      className={`directory-tool-card-grid ${className}`}
    >
      {tool.fields.Logo && tool.fields.Logo[0] && 
        <Image 
          src={tool.fields.Logo[0].url} 
          alt={`${tool.fields.Name} background`} 
          layout="fill" 
          className="directory-tool-card-grid-bg-image" 
        />
      }
      <div className="directory-tool-card-grid-gradient"></div>
      <div className="directory-tool-card-grid-content">
        <div className="flex items-center justify-between mb-2">
          {tool.fields.Category && (
            <span
              className={`directory-tool-card-category-badge ${getCategoryColor(tool.fields.Category)}`}
            >
              {tool.fields.Category}
            </span>
          )}
          {isFeatured && <Star className="w-5 h-5 text-blue-500 fill-current" />}
        </div>

        <h3 className="directory-tool-card-name-grid">
          {tool.fields.Name || "Unnamed Tool"}
        </h3>

        <p className="directory-tool-card-description-grid">
          {tool.fields["Short Description"] || tool.fields.Description || "No description available"}
        </p>

        <div className="flex items-center justify-between">
          {tool.fields["Website URL"] && (
            <div className="directory-tool-card-visit-button">
              Visit Website <ExternalLink className="ml-2 h-4 w-4" />
            </div>
          )}

          {tool.fields["Deal Available"] && (
            <span className="bg-green-500 text-white px-3 py-1 text-xs font-bold rounded-md flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Deal
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
