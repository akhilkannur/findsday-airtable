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
    "w-full bg-transparent border-b-2 border-ink px-0 py-4 text-black placeholder-black/20 focus:outline-none focus:bg-white/40 transition-all font-mono"

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-8 py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <div className="font-mono text-[0.85rem] uppercase tracking-[0.2em] text-ink-fade mb-6 flex items-center gap-3">Entry Submission</div>
          <h1 className="type-display mb-8">Add Entry</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            Know a sales API or MCP server we&apos;re missing? Add it to the club infrastructure.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="layout-container">
          <div className="max-w-2xl mx-auto p-16 border border-dashed border-ink/30 bg-white/20">
            <form className="space-y-16" onSubmit={(e) => e.preventDefault()}>
              {/* Tool Name */}
              <div>
                <label htmlFor="toolName" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-fade mb-2 block">
                  01. Module Identifier
                </label>
                <input
                  id="toolName"
                  type="text"
                  placeholder="e.g. Apollo, Outreach, HubSpot..."
                  className={inputClasses}
                  value={formData.toolName}
                  onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
                />
              </div>

              {/* Website URL */}
              <div>
                <label htmlFor="websiteUrl" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-fade mb-2 block">
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
                <label htmlFor="apiDocsUrl" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-fade mb-2 block">
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
                <label htmlFor="category" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-fade mb-2 block">
                  04. Infrastructure Class
                </label>
                <select
                  id="category"
                  className={inputClasses}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="" className="bg-paper">Select a class...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-paper">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="peer h-6 w-6 border-2 border-ink bg-transparent appearance-none rounded-sm transition-all"
                      checked={formData.hasMcp}
                      onChange={(e) => setFormData({ ...formData, hasMcp: e.target.checked })}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity font-bold">✓</div>
                  </div>
                  <span className="font-mono text-[0.75rem] uppercase tracking-widest text-ink-fade group-hover:text-black transition-colors">MCP READY</span>
                </label>

                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="peer h-6 w-6 border-2 border-ink bg-transparent appearance-none rounded-sm transition-all"
                      checked={formData.hasAgentSkills}
                      onChange={(e) => setFormData({ ...formData, hasAgentSkills: e.target.checked })}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity font-bold">✓</div>
                  </div>
                  <span className="font-mono text-[0.75rem] uppercase tracking-widest text-ink-fade group-hover:text-black transition-colors">AGENT SKILLS</span>
                </label>
              </div>

              {/* Submit */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full py-6 font-mono font-bold uppercase text-[1.1rem] transition-all hover:rotate-[-1deg] circled accent bg-transparent"
                >
                  Deploy to Registry <span>-></span>
                </button>
                <p className="mt-8 font-serif italic text-lg text-ink-fade text-center opacity-60">
                  Awaiting manual verification from primary node...
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
