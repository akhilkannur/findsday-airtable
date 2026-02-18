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
    "w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all"

  return (
    <main className="px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Submit a Tool</h1>
          <p className="mt-6 text-lg text-gray-400">
            Know a sales API or MCP server we&apos;re missing? Tell us about it.
          </p>
        </div>

        <div className="bg-ghost-card rounded-3xl border border-white/5 p-8 sm:p-12">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Tool Name */}
            <div>
              <label htmlFor="toolName" className="mb-3 block text-sm font-bold uppercase tracking-wider text-gray-500">
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
              <label htmlFor="websiteUrl" className="mb-3 block text-sm font-bold uppercase tracking-wider text-gray-500">
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
              <label htmlFor="apiDocsUrl" className="mb-3 block text-sm font-bold uppercase tracking-wider text-gray-500">
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
              <label htmlFor="category" className="mb-3 block text-sm font-bold uppercase tracking-wider text-gray-500">
                Category
              </label>
              <select
                id="category"
                className={inputClasses}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="" className="bg-ghost-dark text-gray-500">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-ghost-dark text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-white/10 bg-white/5 text-brand-purple focus:ring-brand-purple transition-colors"
                  checked={formData.hasMcp}
                  onChange={(e) => setFormData({ ...formData, hasMcp: e.target.checked })}
                />
                <span className="text-[15px] font-medium text-gray-400 group-hover:text-white transition-colors">Has MCP Server?</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-white/10 bg-white/5 text-brand-purple focus:ring-brand-purple transition-colors"
                  checked={formData.hasAgentSkills}
                  onChange={(e) => setFormData({ ...formData, hasAgentSkills: e.target.checked })}
                />
                <span className="text-[15px] font-medium text-gray-400 group-hover:text-white transition-colors">Has Agent Skills?</span>
              </label>
            </div>

            {/* Brief Description */}
            <div>
              <label htmlFor="description" className="mb-3 block text-sm font-bold uppercase tracking-wider text-gray-500">
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
              <label htmlFor="email" className="mb-3 block text-sm font-bold uppercase tracking-wider text-gray-500">
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-bold rounded-full px-10 py-4 transition-all hover:bg-white/90 active:scale-[0.98]"
            >
              <Send className="h-4 w-4" />
              Submit Tool
            </button>
          </form>
        </div>

        <p className="mt-10 text-center text-sm font-medium text-gray-500">
          We review every submission within a week.
        </p>
      </div>
    </main>
  )
}
