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
    "w-full bg-white border-[var(--border-width)] border-black rounded-[var(--radius-md)] px-6 py-4 text-black placeholder-black/20 focus:outline-none focus:bg-[var(--lego-yellow)] transition-all shadow-[inset_3px_3px_0_rgba(0,0,0,0.05)]"

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-5 py-24 border-b-[var(--border-width)] border-black bg-[var(--lego-yellow)]">
        <div className="layout-container">
          <div className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] mb-6 bg-white px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0_black]">Entry Submission</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-8 text-black uppercase">Add Entry</h1>
          <p className="max-w-2xl text-xl font-medium text-black/70 leading-relaxed">
            Know a sales API or MCP server we&apos;re missing? Add it to the club infrastructure.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="layout-container">
          <div className="max-w-2xl mx-auto brick bg-white p-10 md:p-16">
            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
              {/* Tool Name */}
              <div>
                <label htmlFor="toolName" className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 mb-4 block">
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
                <label htmlFor="websiteUrl" className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 mb-4 block">
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
                <label htmlFor="apiDocsUrl" className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 mb-4 block">
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
                <label htmlFor="category" className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 mb-4 block">
                  04. Infrastructure Class
                </label>
                <select
                  id="category"
                  className={inputClasses}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="" className="bg-white">Select a class...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-white">
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
                    className="h-6 w-6 border-[var(--border-width)] border-black rounded-[var(--radius-sm)] bg-white checked:bg-[var(--lego-red)] transition-all appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:left-1 checked:after:top-0"
                    checked={formData.hasMcp}
                    onChange={(e) => setFormData({ ...formData, hasMcp: e.target.checked })}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-black group-hover:text-[var(--lego-red)] transition-colors">MCP READY</span>
                </label>

                <label className="flex items-center gap-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="h-6 w-6 border-[var(--border-width)] border-black rounded-[var(--radius-sm)] bg-white checked:bg-[var(--lego-blue)] transition-all appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:left-1 checked:after:top-0"
                    checked={formData.hasAgentSkills}
                    onChange={(e) => setFormData({ ...formData, hasAgentSkills: e.target.checked })}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-black group-hover:text-[var(--lego-blue)] transition-colors">AGENT SKILLS</span>
                </label>
              </div>

              {/* Submit */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="brick brick-btn bg-[var(--lego-red)] text-white w-full py-6 text-base font-black hover:scale-105 transition-all"
                >
                  Deploy to Registry <span>-></span>
                </button>
                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 text-center italic">
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
