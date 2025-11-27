"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, ExternalLink } from "lucide-react"
import type { DirectoryToolRecord } from "@/lib/airtableClient"

interface ToolModalProps {
  tool: DirectoryToolRecord
  onClose: () => void
}

export default function ToolModal({ tool, onClose }: ToolModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  const f = tool.fields
  const name = String(f?.Name ?? "Untitled Tool")
  const description = String(f?.Description ?? "")
  const shortDescription = String(f?.["Short Description"] ?? "")
  const category = String(f?.Category ?? "")
  const website = String(f?.["Website URL"] ?? "")
  const logo = f?.Logo?.[0]?.url
  const status = String(f?.Status ?? "")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-charcoal border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="sticky top-0 z-10 bg-charcoal-dark border-b border-gray-700 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 lg:space-x-4 min-w-0 flex-1">
              {logo && (
                <div className="flex-shrink-0">
                  <Image
                    src={logo || "/placeholder.svg"}
                    alt={`${name} logo`}
                    width={48}
                    height={48}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg object-cover border border-gray-600"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-lg lg:text-2xl font-bold text-white truncate">{name}</h2>
                <p className="text-sm lg:text-base text-gray-400 truncate">{shortDescription}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors ml-4"
            >
              <X className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 lg:gap-4">
                  {category && (
                    <span className="bg-accent-green/20 text-accent-green px-3 py-1 rounded-full text-xs lg:text-sm font-medium">
                      {category}
                    </span>
                  )}
                  {status && (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs lg:text-sm font-medium">
                      {status}
                    </span>
                  )}
                </div>

                {/* Description */}
                {description && (
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3">About {name}</h3>
                    <div className="text-sm lg:text-base text-gray-300 leading-relaxed">
                      <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br>") }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-charcoal-dark rounded-lg p-4 lg:p-6 space-y-4 lg:space-y-6 sticky top-4">
                  
                  {/* Visit Website */}
                  {website && (
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center bg-accent-green text-charcoal font-bold py-3 px-4 rounded-lg hover:bg-accent-green/80 transition-colors text-sm lg:text-base"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Visit Website
                    </a>
                  )}

                  {/* Tool Info */}
                  <div className="border-t border-gray-700 pt-4 space-y-3">
                    <h3 className="text-base lg:text-lg font-bold text-white">Tool Info</h3>

                    <div className="text-sm lg:text-base text-gray-300">
                      <span className="font-semibold text-white">Category:</span> {category || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
