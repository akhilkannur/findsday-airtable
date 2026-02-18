"use client"

import { useState } from "react"
import { Send } from "lucide-react"

const CATEGORIES = [
  "Prospecting",
  "Email Outreach",
  "CRM",
  "Enrichment",
  "Voice & Calling",
  "Scheduling",
  "Conversation Intelligence",
  "Documents & Proposals",
  "Sales Engagement",
  "Workflow Automation",
]

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    toolName: "",
    websiteUrl: "",
    apiDocsUrl: "",
    category: "",
    hasMcp: false,
    hasAgentSkills: false,
    description: "",
    email: "",
  })

  const inputClasses =
    "w-full bg-charcoal-dark border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-accent-green focus:ring-1 focus:ring-accent-green focus:outline-none transition-colors"

  return (
    <main className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Submit a Tool</h1>
          <p className="mt-4 text-lg text-gray-400">
            Know a sales API or MCP server we&apos;re missing? Tell us about it.
          </p>
        </div>

        <form className="mt-12 space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Tool Name */}
          <div>
            <label htmlFor="toolName" className="mb-2 block text-sm font-medium text-gray-300">
              Tool Name
            </label>
            <input
              id="toolName"
              type="text"
              placeholder="e.g. Apollo, Outreach, HubSpot"
              className={inputClasses}
              value={formData.toolName}
              onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
            />
          </div>

          {/* Website URL */}
          <div>
            <label htmlFor="websiteUrl" className="mb-2 block text-sm font-medium text-gray-300">
              Website URL
            </label>
            <input
              id="websiteUrl"
              type="text"
              placeholder="https://example.com"
              className={inputClasses}
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
            />
          </div>

          {/* API Docs URL */}
          <div>
            <label htmlFor="apiDocsUrl" className="mb-2 block text-sm font-medium text-gray-300">
              API Docs URL
            </label>
            <input
              id="apiDocsUrl"
              type="text"
              placeholder="https://docs.example.com/api"
              className={inputClasses}
              value={formData.apiDocsUrl}
              onChange={(e) => setFormData({ ...formData, apiDocsUrl: e.target.value })}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              id="category"
              className={inputClasses}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-gray-700 bg-charcoal-dark text-accent-green focus:ring-accent-green"
                checked={formData.hasMcp}
                onChange={(e) => setFormData({ ...formData, hasMcp: e.target.checked })}
              />
              <span className="text-sm text-gray-300">Has MCP Server?</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-gray-700 bg-charcoal-dark text-accent-green focus:ring-accent-green"
                checked={formData.hasAgentSkills}
                onChange={(e) => setFormData({ ...formData, hasAgentSkills: e.target.checked })}
              />
              <span className="text-sm text-gray-300">Has Agent Skills?</span>
            </label>
          </div>

          {/* Brief Description */}
          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-300">
              Brief Description
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="What does this tool do? Why should we list it?"
              className={inputClasses}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Your Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
              Your Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="you@example.com"
              className={inputClasses}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-accent-green text-charcoal-dark font-semibold rounded-lg px-6 py-3 transition-colors hover:bg-accent-green/80"
          >
            <Send className="h-4 w-4" />
            Submit Tool
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          We review every submission within a week.
        </p>
      </div>
    </main>
  )
}
