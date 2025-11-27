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
    // Dark theme category colors
    return "bg-gray-800 text-accent-green border border-gray-700"
  }

  if (!isGridMode) {
    return (
      <button
        onClick={handleClick}
        className={`w-full flex items-center p-4 bg-charcoal-dark border border-gray-800 rounded-xl hover:border-accent-pink transition-all duration-200 text-left group ${className}`}
      >
        <div className="flex-shrink-0 w-16 h-16 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden mr-6 flex items-center justify-center relative">
          {tool.fields.Logo && tool.fields.Logo[0] ? (
            <Image
              src={tool.fields.Logo[0].url || "/placeholder.svg"}
              alt={`${tool.fields.Name} logo`}
              fill
              className="object-contain p-2"
              loading="lazy"
            />
          ) : (
            <div className="text-gray-600 text-2xl">🔧</div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-2 min-w-0">
              <h3 className="text-lg font-bold text-white truncate group-hover:text-accent-pink transition-colors">
                {tool.fields.Name || "Unnamed Tool"}
              </h3>
              {isFeatured && <Star className="w-4 h-4 text-accent-pink fill-current flex-shrink-0" />}
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-accent-pink transition-colors flex-shrink-0 ml-2" />
          </div>

          <p className="text-sm text-gray-400 line-clamp-1 mb-2">
            {tool.fields["Short Description"] || tool.fields.Description || "No description available"}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            {tool.fields.Category && (
              <span
                className={`px-2 py-0.5 text-xs font-semibold rounded-md ${getCategoryColor(tool.fields.Category)}`}
              >
                {tool.fields.Category}
              </span>
            )}
            {tool.fields["Deal Available"] && (
              <span className="bg-green-900/30 text-green-400 border border-green-900/50 px-2 py-0.5 text-xs font-medium rounded-md flex items-center gap-1">
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
      className={`relative w-full bg-charcoal-dark border border-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:border-accent-pink transition-all duration-200 flex flex-col text-left h-[300px] group ${className}`}
      style={{
        backgroundImage:
          tool.fields.Logo && tool.fields.Logo[0] ? `url(${tool.fields.Logo[0].url})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for background readability if it has a background image, or just dark bg */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/90 to-charcoal-dark/40"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between p-6 w-full">
        
        {/* Top Section */}
        <div className="flex justify-between items-start w-full">
           <div className="flex flex-wrap gap-2">
            {tool.fields.Category && (
              <span className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 text-accent-green text-xs font-bold uppercase px-3 py-1 rounded-full">
                {tool.fields.Category}
              </span>
            )}
           </div>
           {isFeatured && (
             <div className="bg-accent-pink/20 backdrop-blur-sm border border-accent-pink/50 p-1.5 rounded-full">
               <Star className="w-4 h-4 text-accent-pink fill-current" />
             </div>
           )}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto">
          <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-accent-pink transition-colors">
            {tool.fields.Name || "Unnamed Tool"}
          </h3>
          
          <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">
            {tool.fields["Short Description"] || tool.fields.Description || "No description available"}
          </p>

          <div className="flex items-center justify-between mt-2">
            <div className="inline-flex items-center justify-center border border-gray-600 text-gray-300 px-3 py-1.5 rounded-full text-xs font-semibold group-hover:border-accent-pink group-hover:text-accent-pink transition-colors bg-charcoal-dark/50 backdrop-blur-sm">
              Visit Website <ExternalLink className="ml-2 h-3 w-3" />
            </div>

            {tool.fields["Deal Available"] && (
              <span className="bg-green-500 text-charcoal px-2 py-1 text-xs font-bold rounded flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current" />
                DEAL
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
