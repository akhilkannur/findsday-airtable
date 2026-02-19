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
    "w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:border-club-teal/50 focus:ring-4 focus:ring-club-teal/10 focus:outline-none transition-all"

  return (
    <main className="px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-24">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl italic font-heading">Submit Entry</h1>
          <p className="mt-8 text-xl text-gray-400 leading-relaxed">
            Know a sales API or MCP server we&apos;re missing? Add it to the club.
          </p>
        </div>

        <div className="bg-club-card rounded-[3rem] border border-white/10 p-10 sm:p-16 shadow-2xl">
          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            {/* Tool Name */}
            <div>
              <label htmlFor="toolName" className="mb-4 block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
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
              <label htmlFor="websiteUrl" className="mb-4 block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
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
              <label htmlFor="apiDocsUrl" className="mb-4 block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
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
              <label htmlFor="category" className="mb-4 block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                Category
              </label>
              <select
                id="category"
                className={inputClasses}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="" className="bg-club-dark text-gray-500">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-club-dark text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-6 w-6 rounded-lg border-white/10 bg-white/5 text-club-teal focus:ring-club-teal/50 transition-all"
                  checked={formData.hasMcp}
                  onChange={(e) => setFormData({ ...formData, hasMcp: e.target.checked })}
                />
                <span className="text-base font-bold text-gray-500 group-hover:text-white transition-colors">Has MCP Server?</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-6 w-6 rounded-lg border-white/10 bg-white/5 text-club-teal focus:ring-club-teal/50 transition-all"
                  checked={formData.hasAgentSkills}
                  onChange={(e) => setFormData({ ...formData, hasAgentSkills: e.target.checked })}
                />
                <span className="text-base font-bold text-gray-500 group-hover:text-white transition-colors">Has Agent Skills?</span>
              </label>
            </div>

            {/* Brief Description */}
            <div>
              <label htmlFor="description" className="mb-4 block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                Brief Description
              </label>
              <textarea
                id="description"
                rows={5}
                placeholder="What does this tool do? Why should we list it?"
                className={inputClasses}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Your Email */}
            <div>
              <label htmlFor="email" className="mb-4 block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
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
              className="btn-club w-full justify-center py-5 text-lg"
            >
              <Send className="h-5 w-5" />
              Submit Tool
            </button>
          </form>
        </div>

        <p className="mt-12 text-center text-[11px] font-bold text-gray-600 uppercase tracking-[0.3em]">
          We review every submission within 24 hours.
        </p>
      </div>
    </main>
  )
}

        <p className="mt-10 text-center text-sm font-medium text-gray-500">
          We review every submission within 24 hours.
        </p>
      </div>
    </main>
  )
}
