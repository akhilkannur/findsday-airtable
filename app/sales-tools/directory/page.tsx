"use client"

import { useState, useEffect } from "react"
import Header from "../../../components/Header"
import DirectoryToolCard from "../../../components/DirectoryToolCard"
import type { DirectoryToolRecord } from "@/lib/airtableClient"
import { Search, Filter, Grid, List, Sparkles } from "lucide-react"

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-32">
    <div className="flex flex-col items-center space-y-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-blue-500 rounded-full animate-spin"></div>
        <Sparkles className="w-6 h-6 text-blue-500 absolute top-3 left-3 animate-pulse" />
      </div>
      <p className="text-sm text-gray-500 font-medium tracking-wide">Discovering amazing tools...</p>
    </div>
  </div>
)

const ErrorDisplay = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-32">
    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
      <div className="w-8 h-8 border-2 border-red-200 rounded-full"></div>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Something went wrong</h3>
    <p className="text-sm text-gray-600 text-center mb-8 max-w-md leading-relaxed">{error}</p>
    <button
      onClick={onRetry}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        console.log("[v0] Starting directory data fetch")

        const toolsResponse = await fetch("/api/directory")

        console.log("[v0] API response status:", toolsResponse.status)

        if (!toolsResponse.ok) {
          const errorData = await toolsResponse.json()
          console.log("[v0] API error response:", errorData)
          throw new Error(errorData.details || "Failed to fetch tools")
        }

        const toolsData = await toolsResponse.json()
        console.log("[v0] Received tools data:", toolsData.length, "tools")
        setTools(toolsData)

        const uniqueCategories = [
          ...new Set(toolsData.map((tool: DirectoryToolRecord) => tool.fields.Category).filter(Boolean)),
        ].sort()
        setCategories(["All", ...uniqueCategories])
        console.log("[v0] Categories found:", uniqueCategories)
      } catch (e: any) {
        console.error("[v0] Error loading directory:", e)
        setError(`${e.message}`)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory === "All" || tool.fields.Category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      tool.fields.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.fields.Description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.fields["Short Description"]?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleRetry = () => {
    window.location.reload()
  }

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

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="flex min-h-screen">
        <aside className="w-80 bg-white border-r border-gray-200 flex-shrink-0 shadow-sm">
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Sales Directory</h2>
                  <p className="text-sm text-gray-500">{tools.length} curated tools</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Categories</h3>
                <Filter className="w-4 h-4 text-gray-400" />
              </div>
              <nav className="space-y-1">
                {categories.map((category) => {
                  const toolCount =
                    category === "All" ? tools.length : tools.filter((tool) => tool.fields.Category === category).length
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`group flex items-center justify-between w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        selectedCategory === category
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span className="font-medium">{category}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          selectedCategory === category ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {toolCount}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">View</h3>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all flex-1 justify-center ${
                    viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span className="text-sm font-medium">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all flex-1 justify-center ${
                    viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="text-sm font-medium">List</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="w-10 h-10 bg-blue-500 rounded-lg mb-4 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Curated Excellence</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every tool is carefully selected and vetted by our team for quality and effectiveness.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Sales Tools Directory</h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-6 max-w-3xl">
                Discover powerful sales tools that help modern teams close more deals, automate workflows, and drive
                revenue growth.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {categories.slice(1).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                      selectedCategory === category
                        ? getCategoryColor(category) + " shadow-lg"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {!loading && !error && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-gray-900">{filteredTools.length}</span>
                    {filteredTools.length === 1 ? " tool" : " tools"}
                    {selectedCategory !== "All" && (
                      <span>
                        {" "}
                        in <span className="font-semibold">{selectedCategory}</span>
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
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or category filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            /* Enhanced responsive grid layout */
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredTools.map((tool) => (
                <DirectoryToolCard key={tool.id} tool={tool} viewMode={viewMode} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

