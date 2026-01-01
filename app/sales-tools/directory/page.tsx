"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "../../../components/Header"
import DirectoryToolCard from "../../../components/DirectoryToolCard"
import ToolModal from "../../../components/ToolModal"
import type { DirectoryToolRecord } from "@/lib/airtableClient"
import { Sparkles, Star, Search, Filter } from "lucide-react"

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

function DirectoryContent() {
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
          ...new Set(toolsData.map((tool: DirectoryToolRecord) => {
             const cat = tool.fields.Category
             return typeof cat === 'string' ? cat : String(cat || '') 
          }).filter((c: string) => c !== '')),
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-16 pb-12 px-4 text-center bg-gradient-to-b from-charcoal-dark/50 to-charcoal">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
              Sales Tools <span className="text-gray-600">Directory</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Discover open source alternatives and the finest proprietary sales tools. 
              Curated for modern teams who value excellence and efficiency.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mt-8">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search for tools, categories, or alternatives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-charcoal-dark border border-gray-700 rounded-full py-4 pl-14 pr-6 text-lg text-white placeholder-gray-500 focus:border-accent-pink focus:ring-1 focus:ring-accent-pink focus:outline-none transition-all shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Categories Horizontal Scroll */}
        <section className="border-b border-gray-800 bg-charcoal sticky top-0 z-10 backdrop-blur-md bg-opacity-90">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
             <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-bold uppercase tracking-wider whitespace-nowrap mr-2">
                   <Filter className="w-4 h-4" /> Categories
                </div>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      selectedCategory === category
                        ? "bg-accent-pink border-accent-pink text-charcoal shadow-lg shadow-pink-500/20"
                        : "bg-charcoal-dark border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
             </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            {!loading && !error && (
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-400">
                  Showing <span className="text-white font-bold">{filteredTools.length}</span>
                  {filteredTools.length === 1 ? " tool" : " tools"}
                  {selectedCategory !== "All" && (
                    <span>
                      {" "}in <span className="text-accent-pink">{selectedCategory}</span>
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
                      <Star className="w-6 h-6 text-accent-pink fill-current" />
                      <h2 className="text-2xl font-bold text-white">Featured Tools</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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

      {selectedTool && <ToolModal tool={selectedTool} onClose={handleCloseModal} />}
    </div>
  )
}

export default function DirectoryPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DirectoryContent />
    </Suspense>
  )
}
