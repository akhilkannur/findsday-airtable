"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

export function CopyButton({ text, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy!", err)
    }
  }

  return (
    <button
      onClick={copy}
      className={`flex items-center justify-center gap-2 transition-all ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-accent-orange" />
          <span className="text-accent-orange">{label ? "Copied!" : "Copied"}</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          <span>{label || "Copy"}</span>
        </>
      )}
    </button>
  )
}
