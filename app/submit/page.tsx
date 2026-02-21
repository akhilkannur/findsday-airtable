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
    "w-full bg-white/40 border border-ink-black px-6 py-4 text-ink-black placeholder-gray-500 focus:bg-white focus:outline-none transition-all"

  return (
    <div className="flex flex-col">
      <section className="px-6 py-24 md:px-12 md:py-32 border-b border-dashed border-ink-black">
        <div className="type-label mb-6 opacity-40">Entry Submission</div>
        <h1 className="type-display mb-8">Add Entry</h1>
        <p className="max-w-2xl text-xl font-medium opacity-60">
          Know a sales API or MCP server we&apos;re missing? Add it to the club infrastructure.
        </p>
      </section>

      <div className="swiss-grid-bg p-6 md:p-12">
        <div className="max-w-2xl border border-ink-black bg-sage-bg p-10 md:p-16 shadow-[8px_8px_0px_rgba(18,18,18,0.05)]">
          <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
            {/* Tool Name */}
            <div>
              <label htmlFor="toolName" className="type-label mb-4 block opacity-40">
                01. Module Identifier
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
              <label htmlFor="websiteUrl" className="type-label mb-4 block opacity-40">
                02. Primary Node (URL)
              </label>
              <input
                id="websiteUrl"
                type="text"
                placeholder="https://..."
                className={inputClasses}
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              />
            </div>

            {/* API Docs URL */}
            <div>
              <label htmlFor="apiDocsUrl" className="type-label mb-4 block opacity-40">
                03. Spec/Docs Endpoint
              </label>
              <input
                id="apiDocsUrl"
                type="text"
                placeholder="https://docs..."
                className={inputClasses}
                value={formData.apiDocsUrl}
                onChange={(e) => setFormData({ ...formData, apiDocsUrl: e.target.value })}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="type-label mb-4 block opacity-40">
                04. Infrastructure Class
              </label>
              <select
                id="category"
                className={inputClasses}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="" className="bg-sage-bg">Select a class...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-sage-bg">
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
                  className="h-5 w-5 border-2 border-ink-black bg-white checked:bg-accent-orange transition-all appearance-none checked:border-accent-orange relative after:content-[''] after:absolute after:hidden after:left-1.5 after:top-0.5 after:w-1.5 after:h-2.5 after:border-white after:border-r-2 after:border-b-2 after:rotate-45 checked:after:block"
                  checked={formData.hasMcp}
                  onChange={(e) => setFormData({ ...formData, hasMcp: e.target.checked })}
                />
                <span className="text-[0.65rem] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">MCP READY</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-2 border-ink-black bg-white checked:bg-accent-blue transition-all appearance-none checked:border-accent-blue relative after:content-[''] after:absolute after:hidden after:left-1.5 after:top-0.5 after:w-1.5 after:h-2.5 after:border-white after:border-r-2 after:border-b-2 after:rotate-45 checked:after:block"
                  checked={formData.hasAgentSkills}
                  onChange={(e) => setFormData({ ...formData, hasAgentSkills: e.target.checked })}
                />
                <span className="text-[0.65rem] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">AGENT SKILLS</span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-8">
              <button
                type="submit"
                className="swiss-btn swiss-btn-primary w-full py-6 text-sm font-black uppercase tracking-[0.2em] shadow-[8px_8px_0px_#121212] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Deploy to Registry <span>-></span>
              </button>
              <p className="mt-6 text-[0.6rem] font-bold uppercase tracking-widest opacity-30 text-center italic">
                Awaiting manual verification from primary node...
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
