"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, ExternalLink, Star, Building, CheckCircle, XCircle, Zap } from "lucide-react"
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
  const pricingModel = String(f?.["Pricing Model"] ?? "")
  const startingPrice = String(f?.["Starting Price"] ?? "")
  const companyName = String(f?.["Company Name"] ?? "")
  const keyFeatures = String(f?.["Key Features"] ?? "")
  const useCases = String(f?.["Use Cases"] ?? "")
  const integrations = String(f?.Integrations ?? "")
  const pros = String(f?.Pros ?? "")
  const cons = String(f?.Cons ?? "")
  const userRating = f?.["User Rating"] ? Number(f["User Rating"]) : 0
  const reviewCount = f?.["Review Count"] ? Number(f["Review Count"]) : 0
  const dealAvailable = Boolean(f?.["Deal Available"])
  const dealDescription = String(f?.["Deal Description"] ?? "")
  const dealUrl = String(f?.["Deal URL"] ?? "")

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
                {/* Tags and Rating */}
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
                  {dealAvailable && (
                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs lg:text-sm font-medium flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span>Deal Available</span>
                    </span>
                  )}
                </div>

                {/* Rating */}
                {userRating > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 lg:w-5 lg:h-5 ${i < userRating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {userRating}/5 {reviewCount > 0 && `(${reviewCount} reviews)`}
                    </span>
                  </div>
                )}

                {/* Description */}
                {description && (
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3">About {name}</h3>
                    <div className="text-sm lg:text-base text-gray-300 leading-relaxed">
                      <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br>") }} />
                    </div>
                  </div>
                )}

                {/* Key Features */}
                {keyFeatures && (
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Key Features</h3>
                    <div className="text-sm lg:text-base text-gray-300 leading-relaxed">
                      <div dangerouslySetInnerHTML={{ __html: keyFeatures.replace(/\n/g, "<br>") }} />
                    </div>
                  </div>
                )}

                {/* Use Cases */}
                {useCases && (
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Use Cases</h3>
                    <div className="text-sm lg:text-base text-gray-300 leading-relaxed">
                      <div dangerouslySetInnerHTML={{ __html: useCases.replace(/\n/g, "<br>") }} />
                    </div>
                  </div>
                )}

                {/* Pros and Cons */}
                {(pros || cons) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {pros && (
                      <div>
                        <h3 className="text-base lg:text-lg font-bold text-green-400 mb-3 flex items-center">
                          <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                          Pros
                        </h3>
                        <div className="space-y-2">
                          {pros
                            .split("\n")
                            .filter(Boolean)
                            .map((pro, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm lg:text-base text-gray-300">{pro}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                    {cons && (
                      <div>
                        <h3 className="text-base lg:text-lg font-bold text-red-400 mb-3 flex items-center">
                          <XCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                          Cons
                        </h3>
                        <div className="space-y-2">
                          {cons
                            .split("\n")
                            .filter(Boolean)
                            .map((con, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <XCircle className="w-3 h-3 lg:w-4 lg:h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm lg:text-base text-gray-300">{con}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Integrations */}
                {integrations && (
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Integrations</h3>
                    <div className="flex flex-wrap gap-2">
                      {integrations.split(",").map((integration, index) => (
                        <span
                          key={index}
                          className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs lg:text-sm"
                        >
                          {integration.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-charcoal-dark rounded-lg p-4 lg:p-6 space-y-4 lg:space-y-6 sticky top-4">
                  {/* Deal Section */}
                  {dealAvailable && dealUrl && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                      <h4 className="font-bold text-red-400 mb-2 flex items-center">
                        <Zap className="w-4 h-4 mr-2" />
                        Special Deal
                      </h4>
                      {dealDescription && <p className="text-sm text-red-300 mb-3">{dealDescription}</p>}
                      <a
                        href={dealUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm lg:text-base"
                      >
                        <Zap className="mr-2 h-4 w-4" /> Claim Deal
                      </a>
                    </div>
                  )}

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

                    {companyName && (
                      <div className="text-sm lg:text-base text-gray-300">
                        <span className="font-semibold text-white flex items-center mb-1">
                          <Building className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
                          Company:
                        </span>
                        {companyName}
                      </div>
                    )}

                    <div className="text-sm lg:text-base text-gray-300">
                      <span className="font-semibold text-white">Category:</span> {category || "N/A"}
                    </div>

                    {pricingModel && (
                      <div className="text-sm lg:text-base text-gray-300">
                        <span className="font-semibold text-white">Pricing:</span> {pricingModel}
                        {startingPrice && ` - ${startingPrice}`}
                      </div>
                    )}
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
