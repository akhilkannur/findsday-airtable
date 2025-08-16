// app/sales-tools/directory/page.tsx - Updated directory page with new URLs
"use client"

import { useState, useEffect } from "react"
import Header from "../../../components/Header"
import DirectoryToolCard from "../../../components/DirectoryToolCard"
import type { DirectoryToolRecord } from "@/lib/airtableClient"

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-32">
    <div className="flex flex-col items-center space-y-8">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
      <p className="text-sm text-gray-400 font-light tracking-[0.2em] uppercase">Curating Excellence</p>
    </div>
  </div>
)

const ErrorDisplay = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-32">
    <h3 className="text-xl font-light text-gray-900 mb-8 tracking-wide">Something unexpected happened</h3>
    <p className="text-sm text-gray-500 text-center mb-12 max-w-lg leading-relaxed font-light">{error}</p>
    <button
      onClick={onRetry}
      className="text-sm text-black bg-white border border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium tracking-wide uppercase"
    >
      Retry
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
      CRM: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      "Lead Generation": "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
      Analytics: "bg-gradient-to-r from-purple-500 to-violet-600 text-white",
      Automation: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
      Communication: "bg-gradient-to-r from-pink-500 to-rose-600 text-white",
      "Sales Enablement": "bg-gradient-to-r from-indigo-500 to-blue-600 text-white",
      Productivity: "bg-gradient-to-r from-teal-500 to-cyan-600 text-white",
      Marketing: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
      "Customer Support": "bg-gradient-to-r from-gray-700 to-gray-800 text-white",
      Other: "bg-gradient-to-r from-slate-500 to-gray-600 text-white",
    }
    return colors[category as keyof typeof colors] || "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      <div className="flex min-h-screen">
        <aside className="w-72 bg-gray-50 border-r border-gray-100 flex-shrink-0">
          <div className="p-8">
            <div className="mb-12">
              <h2 className="text-3xl font-light text-black mb-3 tracking-tight">sales_dir</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-500 font-light tracking-wide">{tools.length} curated tools</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs text-gray-400 font-medium tracking-[0.2em] uppercase mb-6">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`group flex items-center justify-between w-full text-left px-4 py-3 text-sm rounded-xl transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-black text-white shadow-lg transform scale-[1.02]"
                        : "text-gray-600 hover:text-black hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <span className="font-light tracking-wide">{category.toLowerCase()}</span>
                    {selectedCategory === category && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-16 p-6 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl border border-gray-100">
              <div className="w-8 h-8 bg-black rounded-full mb-4 opacity-10"></div>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Carefully curated tools for modern sales teams. Quality over quantity.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-12">
          <div className="mb-16">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 mb-6">
                <h1 className="text-5xl font-light text-black tracking-tight">Sales Tools</h1>
                <div className="w-12 h-0.5 bg-gradient-to-r from-black to-gray-300 mt-6"></div>
              </div>
              <p className="text-xl text-gray-500 font-light leading-relaxed mb-8 max-w-2xl">
                A curated collection of the finest sales tools, carefully selected for modern teams who value excellence
                and efficiency.
              </p>

              <div className="flex flex-wrap gap-3">
                {categories.slice(1).map((category) => (
                  <span
                    key={category}
                    className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide ${getCategoryColor(category)} shadow-sm`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {!loading && !error && (
              <div className="mt-12 flex items-center space-x-4">
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <p className="text-sm text-gray-400 font-light tracking-wide">
                  {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
                  {selectedCategory !== "All" && ` in ${selectedCategory.toLowerCase()}`}
                </p>
              </div>
            )}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorDisplay error={error} onRetry={handleRetry} />
          ) : filteredTools.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-8 flex items-center justify-center">
                <div className="w-6 h-6 border border-gray-300 rounded-full"></div>
              </div>
              <p className="text-xl text-gray-500 font-light mb-12 tracking-wide">No tools found in this category.</p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-sm text-black bg-white border border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium tracking-wide uppercase rounded-lg"
              >
                View All Tools
              </button>
            </div>
          ) : (
            /* Redesigned grid with sophisticated masonry layout and better spacing */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-max">
              {filteredTools.map((tool, index) => (
                <div
                  key={tool.id}
                  className={`group ${
                    index % 8 === 0
                      ? "md:col-span-2 md:row-span-2"
                      : index % 6 === 0
                        ? "lg:col-span-2"
                        : index % 9 === 0
                          ? "xl:row-span-2"
                          : ""
                  } transform hover:scale-[1.02] transition-all duration-500`}
                >
                  <DirectoryToolCard tool={tool} viewMode="grid" />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
