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
      CRM: "bg-[#8bd3dd] text-[#001858]",
      "Lead Generation": "bg-[#f582ae] text-white",
      Analytics: "bg-[#f3d2c1] text-[#001858]",
      Automation: "bg-[#8bd3dd] text-[#001858]",
      Communication: "bg-[#f582ae] text-white",
      "Sales Enablement": "bg-[#f3d2c1] text-[#001858]",
      Productivity: "bg-[#8bd3dd] text-[#001858]",
      Marketing: "bg-[#f582ae] text-white",
      "Customer Support": "bg-[#f3d2c1] text-[#001858]",
      Other: "bg-[#8bd3dd] text-[#001858]",
    }
    return colors[category as keyof typeof colors] || "bg-[#f3d2c1] text-[#001858]"
  }

  if (!isGridMode) {
    return (
      <button
        onClick={handleClick}
        className={`group flex items-center p-4 lg:p-6 bg-white border border-[#f582ae]/20 rounded-xl hover:border-[#f582ae] hover:shadow-lg transition-all duration-300 w-full text-left ${className}`}
      >
        <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 bg-[#f3d2c1] rounded-lg border border-[#f582ae]/30 overflow-hidden mr-4 lg:mr-6">
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
            <div className="w-full h-full flex items-center justify-center text-[#172c66] text-lg lg:text-2xl">🔧</div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <h3 className="font-semibold text-[#001858] text-base lg:text-lg group-hover:text-[#f582ae] transition-colors truncate">
                {tool.fields.Name || "Unnamed Tool"}
              </h3>
              {isFeatured && <Star className="w-4 h-4 text-[#f582ae] fill-current flex-shrink-0" />}
            </div>
            <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5 text-[#172c66] group-hover:text-[#f582ae] transition-colors flex-shrink-0 ml-2" />
          </div>

          <p className="text-[#172c66] text-sm mb-3 line-clamp-2">
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
              <span className="bg-[#fef6e4] text-[#172c66] px-2 lg:px-3 py-1 text-xs font-medium rounded-full border border-[#f582ae]/20">
                {tool.fields["Pricing Model"]}
              </span>
            )}
            {tool.fields["Deal Available"] && (
              <span className="bg-[#f582ae] text-white px-2 lg:px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1">
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
      className={`group relative bg-white border border-[#f582ae]/20 rounded-xl overflow-hidden flex flex-col justify-end p-4 lg:p-6 min-h-[240px] lg:min-h-[280px] hover:shadow-lg hover:border-[#f582ae] transition-all duration-200 w-full text-left ${className}`}
      style={{
        backgroundImage: tool.fields.Logo && tool.fields.Logo[0] ? `url(${tool.fields.Logo[0].url})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {tool.fields.Logo && tool.fields.Logo[0] && <link rel="preload" as="image" href={tool.fields.Logo[0].url} />}

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent rounded-xl"></div>

      <div className="relative z-10 flex flex-col h-full justify-end">
        <div className="flex items-center justify-between mb-2">
          {tool.fields.Category && (
            <span
              className={`px-2 lg:px-3 py-1 text-xs font-bold uppercase rounded-full ${getCategoryColor(tool.fields.Category)}`}
            >
              {tool.fields.Category}
            </span>
          )}
          {isFeatured && <Star className="w-4 h-4 lg:w-5 lg:h-5 text-[#f582ae] fill-current" />}
        </div>

        <h3 className="text-lg lg:text-xl font-bold text-[#001858] mb-2 leading-tight">
          {tool.fields.Name || "Unnamed Tool"}
        </h3>

        <p className="text-[#172c66] text-sm line-clamp-2 mb-4">
          {tool.fields["Short Description"] || tool.fields.Description || "No description available"}
        </p>

        <div className="flex items-center justify-between">
          {tool.fields["Website URL"] && (
            <div className="inline-flex items-center justify-center border border-[#f582ae] text-[#f582ae] px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-semibold group-hover:bg-[#f582ae] group-hover:text-white transition-colors">
              Visit Website <ExternalLink className="ml-2 h-3 w-3 lg:h-4 lg:w-4" />
            </div>
          )}

          {tool.fields["Deal Available"] && (
            <span className="bg-[#f582ae] text-white px-2 lg:px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Deal
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
