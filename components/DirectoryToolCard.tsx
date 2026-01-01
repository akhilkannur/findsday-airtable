"use client"

import type React from "react"

import type { DirectoryToolRecord } from "@/lib/airtableClient"
import Image from "next/image"
import { ExternalLink, Star, ArrowRight } from "lucide-react"

interface DirectoryToolCardProps {
  tool: DirectoryToolRecord
  viewMode?: "grid" | "list"
  className?: string
  onToolClick?: (tool: DirectoryToolRecord) => void
  isFeatured?: boolean
}

export default function DirectoryToolCard({
  tool,
  viewMode = "grid", // Note: The new design is primarily grid-focused
  className = "",
  onToolClick,
  isFeatured = false,
}: DirectoryToolCardProps) {
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onToolClick) {
      onToolClick(tool)
    }
  }

  const alternativeTo = tool.fields["Alternative To"]; 

  return (
    <button
      onClick={handleClick}
      className={`group relative flex flex-col w-full h-full bg-charcoal-dark border border-gray-800 rounded-xl overflow-hidden hover:border-accent-pink/50 hover:shadow-xl transition-all duration-300 text-left ${className}`}
    >
      {/* Featured Badge (Top Right) */}
      {isFeatured && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-accent-pink text-charcoal text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            FEATURED
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col h-full">
        {/* Header: Logo & Name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative flex-shrink-0 w-12 h-12 bg-white rounded-lg p-1.5 shadow-sm overflow-hidden">
             {tool.fields.Logo && tool.fields.Logo[0] ? (
              <Image
                src={tool.fields.Logo[0].url || "/placeholder.svg"}
                alt={`${tool.fields.Name} logo`}
                fill
                className="object-contain"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xl">
                🔧
              </div>
            )}
          </div>
          <div className="min-w-0 pt-0.5">
            <h3 className="text-lg font-bold text-white group-hover:text-accent-pink transition-colors truncate pr-6">
              {tool.fields.Name || "Unnamed Tool"}
            </h3>
            <div className="flex items-center gap-2 mt-1">
               {/* Category Pill */}
               {tool.fields.Category && (
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-gray-800 text-gray-400 border border-gray-700">
                    {tool.fields.Category}
                </span>
                )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
          {tool.fields["Short Description"] || tool.fields.Description || "No description available for this tool."}
        </p>

        {/* Footer Section */}
        <div className="mt-auto border-t border-gray-800 pt-4 w-full">
            {alternativeTo ? (
                <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                    <span>Alternative to:</span>
                    <span className="font-semibold text-gray-300 flex items-center gap-1">
                        {/* Placeholder icon for competitor */}
                        <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
                        {alternativeTo}
                    </span>
                </div>
            ) : (
                // If no alternative is specified, show something else or empty space
                <div className="h-0"></div> 
            )}

            <div className="flex items-center justify-between text-xs font-medium text-gray-500 group-hover:text-white transition-colors">
                <span className="flex items-center gap-1">
                    View Details
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-accent-pink" />
            </div>
        </div>
      </div>
    </button>
  )
}