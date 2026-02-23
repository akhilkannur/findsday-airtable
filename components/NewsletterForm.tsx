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
      <div className="flex items-center gap-3 text-green-600 mb-6 md:mb-8">
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-mono text-lg">Welcome to the Club!</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end mb-6 md:mb-8">
      <div className="flex-grow">
        <input
          type="email"
          placeholder="enter your email..."
          className="w-full bg-transparent border-b-2 border-ink font-mono text-lg py-2 focus:outline-none placeholder:italic placeholder:text-ink-fade"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'submitting'}
        />
      </div>
      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="bg-ink text-paper px-8 py-3 font-mono font-bold uppercase text-[0.9rem] hover:bg-ink/90 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Joining...' : 'Join the Club'}
      </button>
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 text-sm font-mono">
          <AlertCircle className="w-4 h-4" />
          Failed. Try again.
        </div>
      )}
    </form>
  )
}
