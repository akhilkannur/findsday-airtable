"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "../../../components/Header"
import DirectoryToolCard from "../../../components/DirectoryToolCard"
import ToolModal from "../../../components/ToolModal"
import type { DirectoryToolRecord } from "@/lib/airtableClient"
import { Filter, Sparkles, Star, Search } from "lucide-react"

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-32">
    <div className="flex flex-col items-center space-y-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-800 border-t-accent-pink rounded-full animate-spin"></div>
        <Sparkles className="w-6 h-6 text-accent-pink absolute top-3 left-3 animate-pulse" />
      </div>
      <p className="text-sm text-gray-400 font-medium tracking-wide">Discovering amazing tools...</p>
    </div>
  </div>
)

const ErrorDisplay = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-32">
    <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-6">
      <div className="w-8 h-8 border-2 border-red-500 rounded-full"></div>
    </div>
    <h3 className="text-xl font-semibold text-white mb-4">Something went wrong</h3>
    <p className="text-sm text-gray-400 text-center mb-8 max-w-md leading-relaxed">{error}</p>
    <button
      onClick={onRetry}
      className="bg-accent-pink text-charcoal px-6 py-3 rounded-md hover:bg-accent-pink/80 transition-colors font-bold uppercase tracking-wide text-sm"
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
  const [selectedTool, setSelectedTool] = useState<DirectoryToolRecord | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

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
    const matchesSearch =
      searchQuery === "" ||
      tool.fields.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.fields.Description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.fields["Short Description"]?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
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

  return (
    <div className="bg-charcoal text-white min-h-screen">
      <Header />

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 border-r border-gray-800 bg-charcoal-dark/50">
          <div className="p-4 lg:p-8 sticky top-0">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-accent-pink" />
                Directory
              </h2>
              
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search tools..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-charcoal border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-accent-pink focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Categories</h3>
                <Filter className="w-3 h-3 text-gray-600" />
              </div>
              
              <nav className="space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
                {categories.map((category) => {
                  const toolCount =
                    category === "All" ? tools.length : tools.filter((tool) => tool.fields.Category === category).length
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? "bg-accent-pink text-charcoal shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="truncate">{category}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedCategory === category
                            ? "bg-charcoal/20 text-charcoal font-bold"
                            : "bg-charcoal-dark text-gray-600"
                        }`}
                      >
                        {toolCount}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 xl:p-12 bg-charcoal">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                Sales Tools <span className="text-gray-600">Directory</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-3xl">
                A curated collection of the finest sales tools, carefully selected for modern teams who value excellence
                and efficiency.
              </p>
            </div>

            {/* Mobile Category Pills */}
            <div className="lg:hidden flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                    selectedCategory === category
                      ? "bg-accent-pink border-accent-pink text-charcoal"
                      : "bg-charcoal-dark border-gray-700 text-gray-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {!loading && !error && (
              <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
                <p className="text-sm text-gray-500">
                  Showing <span className="text-white font-bold">{filteredTools.length}</span>
                  {filteredTools.length === 1 ? " tool" : " tools"}
                  {selectedCategory !== "All" && (
                    <span>
                      {" "}
                      in <span className="text-accent-green">{selectedCategory}</span>
                    </span>
                  )}
                </p>
              </div>
            )}

            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorDisplay error={error} onRetry={handleRetry} />
            ) : filteredTools.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-800 rounded-xl bg-charcoal-dark/30">
                <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No tools found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or category filter.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All")
                    setSearchQuery("")
                  }}
                  className="text-accent-green hover:text-accent-pink transition-colors font-bold"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {featuredTools.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Star className="w-5 h-5 text-accent-pink fill-current" />
                      <h2 className="text-2xl font-bold text-white">Featured Tools</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {featuredTools.map((tool) => (
                        <DirectoryToolCard
                          key={tool.id}
                          tool={tool}
                          viewMode="grid"
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
                      <h2 className="text-2xl font-bold text-white mb-6 mt-8">All Tools</h2>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {regularTools.map((tool) => (
                        <DirectoryToolCard
                          key={tool.id}
                          tool={tool}
                          viewMode="grid"
                          onToolClick={handleToolClick}
                          isFeatured={false}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {selectedTool && <ToolModal tool={selectedTool} onClose={handleCloseModal} />}
    </div>
  )
}
