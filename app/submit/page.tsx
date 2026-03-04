"use client"

import { useState } from "react"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"

const CATEGORIES = [
  "Sales Intelligence",
  "Sales Engagement",
  "Phone & Dialers",
  "CRM & RevOps",
  "Revenue Intelligence",
  "Sales Enablement",
  "Closing & Scheduling",
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

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage("")

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit')
      }

      setStatus('success')
      // Reset form after success
      setFormData({
        toolName: "",
        websiteUrl: "",
        apiDocsUrl: "",
        category: "",
        hasMcp: false,
        hasAgentSkills: false,
        description: "",
        email: "",
      })
    } catch (err: any) {
      console.error(err)
      setStatus('error')
      setErrorMessage(err.message || "Something went wrong. Please try again.")
    }
  }

  const inputClasses =
    "w-full bg-transparent border-b-2 border-ink px-0 py-4 text-black placeholder-black/20 focus:outline-none focus:bg-white/40 transition-all font-mono"

  if (status === 'success') {
    return (
      <div className="flex flex-col min-h-screen bg-paper items-center justify-center text-center px-8">
        <CheckCircle2 className="w-20 h-20 text-green-600 mb-8" />
        <h1 className="type-display mb-4 text-4xl">Submission Received</h1>
        <p className="max-w-md font-serif italic text-2xl text-ink-fade leading-relaxed mb-12">
          Your tool has been submitted. We'll review it within 72 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="font-mono font-bold uppercase text-[0.9rem] border-b-2 border-ink pb-1 hover:opacity-60 transition-opacity"
        >
          Submit another tool
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-8 py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <h1 className="type-display mb-8">Submit Tool</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            Know a sales API or MCP server we&apos;re missing? Add it to the club.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="layout-container">
          <div className="max-w-2xl mx-auto p-16 border border-dashed border-ink/30 bg-white/20">
            <form className="space-y-16" onSubmit={handleSubmit}>
              {/* Tool Name */}
              <div>
                <label htmlFor="toolName" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  01. Tool Name
                </label>
                <input
                  id="toolName"
                  type="text"
                  placeholder="e.g. Apollo, Outreach, HubSpot..."
                  className={inputClasses}
                  value={formData.toolName}
                  onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
                  required
                />
              </div>

              {/* Website URL */}
              <div>
                <label htmlFor="websiteUrl" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  02. Website URL
                </label>
                <input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://..."
                  className={inputClasses}
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  required
                />
              </div>

              {/* API Docs URL */}
              <div>
                <label htmlFor="apiDocsUrl" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  03. API Docs URL
                </label>
                <input
                  id="apiDocsUrl"
                  type="url"
                  placeholder="https://docs..."
                  className={inputClasses}
                  value={formData.apiDocsUrl}
                  onChange={(e) => setFormData({ ...formData, apiDocsUrl: e.target.value })}
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  04. Category
                </label>
                <select
                  id="category"
                  className={inputClasses}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="" className="bg-paper">Select a class...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-paper">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  05. One-liner / Description
                </label>
                <input
                  id="description"
                  type="text"
                  placeholder="What does it do for AI agents?"
                  className={inputClasses}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  06. Your Email (Optional)
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="For verification updates..."
                  className={inputClasses}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
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

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 font-mono text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errorMessage}
                </div>
              )}

              {/* Submit */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full py-6 font-mono font-bold uppercase text-[1.1rem] transition-all hover:rotate-[-1deg] circled accent bg-transparent ${status === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit Tool'} <span>-></span>
                </button>
                <p className="mt-8 font-serif italic text-lg text-ink-fade text-center opacity-60">
                  We'll review your submission and get back to you.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
