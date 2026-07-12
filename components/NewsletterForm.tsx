"use client"

import { useState } from "react"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit')
      }

      setStatus('success')
      setEmail("")
    } catch (err: any) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="panel mb-6 flex items-center gap-3 px-4 py-3 text-emerald-700 md:mb-8">
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-mono text-sm uppercase tracking-[0.18em]">Welcome to the Club!</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end mb-6 md:mb-8">
      <div className="flex-grow">
        <input
          type="email"
          placeholder="enter your email..."
          className="panel w-full bg-white px-4 py-3 font-mono text-sm uppercase tracking-[0.12em] placeholder:text-ink-fade/45 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'submitting'}
        />
      </div>
      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="rounded-lg bg-ink px-5 py-3 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-ink/90 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'submitting' ? 'Joining...' : 'Join the Club'}
      </button>
      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm font-mono text-red-700">
          <AlertCircle className="w-4 h-4" />
          Failed. Try again.
        </div>
      )}
    </form>
  )
}
