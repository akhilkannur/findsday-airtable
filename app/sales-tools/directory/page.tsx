"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "../../../components/Header"
import DirectoryToolCard from "../../../components/DirectoryToolCard"
import ToolModal from "../../../components/ToolModal"
import type { DirectoryToolRecord } from "@/lib/airtableClient"
import { Filter, Sparkles, Star } from "lucide-react"
import "./sales-directory.css"

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-32">
    <div className="flex flex-col items-center space-y-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <Sparkles className="w-6 h-6 text-blue-500 absolute top-3 left-3 animate-pulse" />
      </div>
      <p className="text-sm text-gray-700 font-medium tracking-wide">Discovering amazing tools...</p>
    </div>
  </div>
)

const ErrorDisplay = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-32">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
      <div className="w-8 h-8 border-2 border-red-400 rounded-full"></div>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Something went wrong</h3>
    <p className="text-sm text-gray-600 text-center mb-8 max-w-md leading-relaxed">{error}</p>
    <button
      onClick={onRetry}
      className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors font-medium"
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

  return (
    <div className="sales-directory-page">
      <Header />

      <div className="flex flex-col lg:flex-row min-h-screen">
        <aside className="w-full lg:w-80 sales-directory-sidebar flex-shrink-0">
          <div className="p-4 lg:p-8">
            <div className="mb-6 lg:mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 sales-directory-title-icon flex items-center justify-center">
                  <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div>
                  <h2 className="sales-directory-title">Sales Directory</h2>
                  <p className="sales-directory-subtitle">{tools.length} curated tools</p>
                </div>
              </div>
            </div>

            <div className="mb-6 lg:mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="sales-directory-category-title">Categories</h3>
                <Filter className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
              </div>
              <nav className="grid grid-cols-2 lg:grid-cols-1 gap-1 lg:space-y-1">
                {categories.map((category) => {
                  const toolCount =
                    category === "All" ? tools.length : tools.filter((tool) => tool.fields.Category === category).length
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`sales-directory-category-button ${
                        selectedCategory === category ? "selected" : ""
                      }`}
                    >
                      <span className="font-medium truncate">{category}</span>
                      <span
                        className="sales-directory-category-count"
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

        <main className="flex-1 sales-directory-main">
          <div className="mb-6 lg:mb-8">
            <div className="max-w-4xl">
              <h1 className="sales-directory-main-title">Sales Tools —</h1>
              <p className="sales-directory-main-subtitle">
                A curated collection of the finest sales tools, carefully selected for modern teams who value excellence
                and efficiency.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {categories.slice(1).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`sales-directory-category-tag ${
                      selectedCategory === category ? "selected" : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {!loading && !error && (
                <div className="flex items-center justify-between">
                  <p className="sales-directory-tool-count">
                    Showing <span className="count">{filteredTools.length}</span>
                    {filteredTools.length === 1 ? " tool" : " tools"}
                    {selectedCategory !== "All" && (
                      <span>
                        {" "}
                        in <span className="category">{selectedCategory}</span>
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
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No tools found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your category filter.</p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {featuredTools.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Star className="w-5 h-5 text-blue-500 fill-current" />
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Featured Tools</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">All Tools</h2>
                  )}
                  <div className="space-y-4">
                    {regularTools.map((tool) => (
                      <DirectoryToolCard
                        key={tool.id}
                        tool={tool}
                        viewMode="list"
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
