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
    "w-full bg-black border border-[#333333] px-6 py-4 text-white placeholder-white/10 focus:outline-none focus:border-white transition-all shadow-[4px_4px_0px_#050505] focus:shadow-[6px_6px_0px_#111]"

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <section className="px-10 md:px-20 py-24 border-b border-[#333333] bg-[#050505]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#444] mb-6">Entry Submission</div>
        <h1 className="text-[42px] md:text-[64px] font-bold leading-none tracking-[-0.04em] mb-8 text-white">Add Entry</h1>
        <p className="max-w-2xl text-[18px] text-[#888] leading-relaxed">
          Know a sales API or MCP server we&apos;re missing? Add it to the club infrastructure.
        </p>
      </section>

      <div className="p-10 md:p-20 bg-black">
        <div className="max-w-2xl border border-[#333333] bg-[#050505] p-10 md:p-16">
          <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
            {/* Tool Name */}
            <div>
              <label htmlFor="toolName" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444] mb-4 block">
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
              <label htmlFor="websiteUrl" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444] mb-4 block">
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
              <label htmlFor="apiDocsUrl" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444] mb-4 block">
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
              <label htmlFor="category" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444] mb-4 block">
                04. Infrastructure Class
              </label>
              <select
                id="category"
                className={inputClasses}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="" className="bg-black">Select a class...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-black">
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
                  className="h-5 w-5 border border-[#333333] bg-black checked:bg-white transition-all appearance-none checked:border-white relative after:content-[''] after:absolute after:hidden after:left-1.5 after:top-0.5 after:w-1.5 after:h-2.5 after:border-black after:border-r-2 after:border-b-2 after:rotate-45 checked:after:block"
                  checked={formData.hasMcp}
                  onChange={(e) => setFormData({ ...formData, hasMcp: e.target.checked })}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#444] group-hover:text-white transition-colors">MCP READY</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-5 w-5 border border-[#333333] bg-black checked:bg-white transition-all appearance-none checked:border-white relative after:content-[''] after:absolute after:hidden after:left-1.5 after:top-0.5 after:w-1.5 after:h-2.5 after:border-black after:border-r-2 after:border-b-2 after:rotate-45 checked:after:block"
                  checked={formData.hasAgentSkills}
                  onChange={(e) => setFormData({ ...formData, hasAgentSkills: e.target.checked })}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#444] group-hover:text-white transition-colors">AGENT SKILLS</span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-8">
              <button
                type="submit"
                className="w-full py-6 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#ccc] transition-all active:scale-[0.98]"
              >
                Deploy to Registry <span>-></span>
              </button>
              <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.2em] text-[#444] text-center italic">
                Awaiting manual verification from primary node...
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
