"use client"

import { useState } from "react"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"

export default function SubmitStackPage() {
  const [formData, setFormData] = useState({
    yourName: "",
    stackName: "",
    tool1: "",
    tool2: "",
    tool3: "",
    howItWorks: "",
    email: "",
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage("")

    try {
      const response = await fetch('/api/submit-stack', {
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
        yourName: "",
        stackName: "",
        tool1: "",
        tool2: "",
        tool3: "",
        howItWorks: "",
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
        <h1 className="type-display mb-4 text-4xl">Stack Submitted</h1>
        <p className="max-w-md font-serif italic text-2xl text-ink-fade leading-relaxed mb-12">
          Thanks for sharing your workflow. We&apos;ll review and feature the best ones.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="font-mono font-bold uppercase text-[0.9rem] border-b-2 border-ink pb-1 hover:opacity-60 transition-opacity"
        >
          Submit another stack
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <section className="px-8 py-24 border-b border-ink bg-paper-dark/30">
        <div className="layout-container">
          <h1 className="type-display mb-8">Share Your Stack</h1>
          <p className="max-w-2xl font-serif italic text-2xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            Show the community your top 3 API building blocks. The best stacks get featured.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="layout-container">
          <div className="max-w-2xl mx-auto p-16 border border-dashed border-ink/30 bg-white/20">
            <form className="space-y-16" onSubmit={handleSubmit}>
              {/* Your Name */}
              <div>
                <label htmlFor="yourName" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  01. Your Name
                </label>
                <input
                  id="yourName"
                  type="text"
                  placeholder="How should we credit you?"
                  className={inputClasses}
                  value={formData.yourName}
                  onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                  required
                />
              </div>

              {/* Stack Name */}
              <div>
                <label htmlFor="stackName" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  02. Stack Name
                </label>
                <input
                  id="stackName"
                  type="text"
                  placeholder="e.g. My Cold Outreach Machine"
                  className={inputClasses}
                  value={formData.stackName}
                  onChange={(e) => setFormData({ ...formData, stackName: e.target.value })}
                  required
                />
              </div>

              {/* Tool #1 */}
              <div>
                <label htmlFor="tool1" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  03. Tool #1
                </label>
                <input
                  id="tool1"
                  type="text"
                  placeholder="The first tool in your workflow"
                  className={inputClasses}
                  value={formData.tool1}
                  onChange={(e) => setFormData({ ...formData, tool1: e.target.value })}
                  required
                />
              </div>

              {/* Tool #2 */}
              <div>
                <label htmlFor="tool2" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  04. Tool #2
                </label>
                <input
                  id="tool2"
                  type="text"
                  placeholder="Where does data go next?"
                  className={inputClasses}
                  value={formData.tool2}
                  onChange={(e) => setFormData({ ...formData, tool2: e.target.value })}
                  required
                />
              </div>

              {/* Tool #3 */}
              <div>
                <label htmlFor="tool3" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  05. Tool #3
                </label>
                <input
                  id="tool3"
                  type="text"
                  placeholder="The final piece of the puzzle"
                  className={inputClasses}
                  value={formData.tool3}
                  onChange={(e) => setFormData({ ...formData, tool3: e.target.value })}
                  required
                />
              </div>

              {/* How It Works */}
              <div>
                <label htmlFor="howItWorks" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  06. How It Works
                </label>
                <input
                  id="howItWorks"
                  type="text"
                  placeholder="Describe how these 3 tools chain together..."
                  className={inputClasses}
                  value={formData.howItWorks}
                  onChange={(e) => setFormData({ ...formData, howItWorks: e.target.value })}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-2 block">
                  07. Your Email (Optional)
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="So we can feature your name..."
                  className={inputClasses}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
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
                  {status === 'submitting' ? 'Submitting...' : 'Submit Stack'} <span>{'>'}</span>
                </button>
                <p className="mt-8 font-serif italic text-lg text-ink-fade text-center opacity-60">
                  We&apos;ll review your submission and get back to you.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
