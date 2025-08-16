"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "../../../components/Header"
import DirectoryToolCard from "../../../components/DirectoryToolCard"
import ToolModal from "../../../components/ToolModal"
import type { DirectoryToolRecord } from "@/lib/airtableClient"
import { Filter, Grid, List, Sparkles, Star } from "lucide-react"

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-32">
    <div className="flex flex-col items-center space-y-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-700 border-t-accent-green rounded-full animate-spin"></div>
        <Sparkles className="w-6 h-6 text-accent-green absolute top-3 left-3 animate-pulse" />
      </div>
      <p className="text-sm text-gray-400 font-medium tracking-wide">Discovering amazing tools...</p>
    </div>
  </div>
)

const ErrorDisplay = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-32">
    <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-6">
      <div className="w-8 h-8 border-2 border-red-400 rounded-full"></div>
    </div>
    <h3 className="text-xl font-semibold text-white mb-4">Something went wrong</h3>
    <p className="text-sm text-gray-400 text-center mb-8 max-w-md leading-relaxed">{error}</p>
    <button
      onClick={onRetry}
      className="bg-accent-green text-charcoal px-6 py-3 rounded-lg hover:bg-accent-green/80 transition-colors font-medium"
    >
      Try Again
    </button>
  </div>
)

export default function DirectoryPage() {
  const [tools, setTools] = useState<DirectoryToolRecord[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedTool, setSelectedTool] = useState<DirectoryToolRecord | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const toolsResponse = await fetch("/api/directory")

        if (!toolsResponse.ok) {
          const errorData = await toolsResponse.json()
          throw new Error(errorData.details || "Failed to fetch tools")
        }

        const toolsData = await toolsResponse.json()

        const sortedTools = toolsData.sort((a: DirectoryToolRecord, b: DirectoryToolRecord) => {
          const aFeatured = a.fields.Featured === true
          const bFeatured = b.fields.Featured === true
          if (aFeatured && !bFeatured) return -1
          if (!aFeatured && bFeatured) return 1
          return 0
        })

        setTools(sortedTools)

        const uniqueCategories = [
          ...new Set(toolsData.map((tool: DirectoryToolRecord) => tool.fields.Category).filter(Boolean)),
        ].sort()
        setCategories(["All", ...uniqueCategories])
      } catch (e: any) {
        console.error("Error loading directory:", e)
        setError(`${e.message}`)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const toolSlug = searchParams.get("tool")
    if (toolSlug && tools.length > 0) {
      const tool = tools.find(
        (t) =>
          t.fields.Name?.toLowerCase()
            .replace(/[^a-z0-9]/g, "-")
            .replace(/-+/g, "-")
            .trim("-") === toolSlug,
      )
      if (tool) {
        setSelectedTool(tool)
      }
    } else {
      setSelectedTool(null)
    }
  }, [searchParams, tools])

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory === "All" || tool.fields.Category === selectedCategory
    return matchesCategory
  })

  const featuredTools = filteredTools.filter((tool) => tool.fields.Featured === true)
  const regularTools = filteredTools.filter((tool) => tool.fields.Featured !== true)

  const handleRetry = () => {
    window.location.reload()
  }

  const handleToolClick = (tool: DirectoryToolRecord) => {
    const slug = tool.fields.Name?.toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .trim("-")
    router.push(`/sales-tools/directory?tool=${slug}`, { scroll: false })
  }

  const handleCloseModal = () => {
    router.push("/sales-tools/directory", { scroll: false })
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
      Marketing: "bg-yellow-500 text-white",
      "Customer Support": "bg-gray-600 text-white",
      Other: "bg-slate-500 text-white",
    }
    return colors[category as keyof typeof colors] || "bg-gray-500 text-white"
  }

  return (
    <div className="bg-charcoal text-white min-h-screen">
      <Header />

      <div className="flex flex-col lg:flex-row min-h-screen">
        <aside className="w-full lg:w-80 bg-charcoal-dark border-b lg:border-r lg:border-b-0 border-gray-800 flex-shrink-0 shadow-lg">
          <div className="p-4 lg:p-8">
            <div className="mb-6 lg:mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-accent-green to-accent-pink rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-charcoal" />
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white">Sales Directory</h2>
                  <p className="text-xs lg:text-sm text-gray-400">{tools.length} curated tools</p>
                </div>
              </div>
            </div>

            <div className="mb-6 lg:mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs lg:text-sm font-semibold text-white uppercase tracking-wide">Categories</h3>
                <Filter className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
              </div>
              <nav className="grid grid-cols-2 lg:grid-cols-1 gap-1 lg:space-y-1">
                {categories.map((category) => {
                  const toolCount =
                    category === "All" ? tools.length : tools.filter((tool) => tool.fields.Category === category).length
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`group flex items-center justify-between w-full text-left px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 text-sm lg:text-base ${
                        selectedCategory === category
                          ? "bg-accent-green/20 text-accent-green border border-accent-green/30"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <span className="font-medium truncate">{category}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ml-2 ${
                          selectedCategory === category
                            ? "bg-accent-green/20 text-accent-green"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {toolCount}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="mb-6 lg:mb-8">
              <h3 className="text-xs lg:text-sm font-semibold text-white uppercase tracking-wide mb-4">View</h3>
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all flex-1 justify-center ${
                    viewMode === "grid" ? "bg-charcoal-dark text-white shadow-sm" : "text-gray-400"
                  }`}
                >
                  <Grid className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="text-xs lg:text-sm font-medium">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all flex-1 justify-center ${
                    viewMode === "list" ? "bg-charcoal-dark text-white shadow-sm" : "text-gray-400"
                  }`}
                >
                  <List className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="text-xs lg:text-sm font-medium">List</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent-green/10 to-accent-pink/10 rounded-xl p-4 lg:p-6 border border-gray-700">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-accent-green rounded-lg mb-4 flex items-center justify-center">
                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-charcoal" />
              </div>
              <h4 className="font-semibold text-white mb-2 text-sm lg:text-base">Curated Excellence</h4>
              <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
                Every tool is carefully selected and vetted by our team for quality and effectiveness.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 lg:p-8 bg-charcoal-light">
          <div className="mb-6 lg:mb-8">
            <div className="max-w-4xl">
              <h1 className="text-2xl lg:text-4xl font-bold text-white mb-4">Sales Tools —</h1>
              <p className="text-base lg:text-xl text-gray-400 leading-relaxed mb-6 max-w-3xl">
                A curated collection of the finest sales tools, carefully selected for modern teams who value excellence
                and efficiency.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {categories.slice(1).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all hover:scale-105 ${
                      selectedCategory === category
                        ? getCategoryColor(category) + " shadow-lg"
                        : "bg-charcoal-dark text-gray-300 border border-gray-700 hover:border-accent-green"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {!loading && !error && (
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-sm text-gray-400">
                    Showing <span className="font-semibold text-white">{filteredTools.length}</span>
                    {filteredTools.length === 1 ? " tool" : " tools"}
                    {selectedCategory !== "All" && (
                      <span>
                        {" "}
                        in <span className="font-semibold text-accent-green">{selectedCategory}</span>
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorDisplay error={error} onRetry={handleRetry} />
          ) : filteredTools.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your category filter.</p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="bg-accent-green text-charcoal px-6 py-3 rounded-lg hover:bg-accent-green/80 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {featuredTools.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Star className="w-5 h-5 text-accent-green fill-current" />
                    <h2 className="text-xl lg:text-2xl font-bold text-white">Featured Tools</h2>
                  </div>
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
                        : "space-y-4"
                    }
                  >
                    {featuredTools.map((tool) => (
                      <DirectoryToolCard
                        key={tool.id}
                        tool={tool}
                        viewMode={viewMode}
                        onToolClick={handleToolClick}
                        isFeatured={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {regularTools.length > 0 && (
                <div>
                  {featuredTools.length > 0 && (
                    <h2 className="text-xl lg:text-2xl font-bold text-white mb-6">All Tools</h2>
                  )}
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
                        : "space-y-4"
                    }
                  >
                    {regularTools.map((tool) => (
                      <DirectoryToolCard
                        key={tool.id}
                        tool={tool}
                        viewMode={viewMode}
                        onToolClick={handleToolClick}
                        isFeatured={false}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {selectedTool && <ToolModal tool={selectedTool} onClose={handleCloseModal} />}
    </div>
  )
}
