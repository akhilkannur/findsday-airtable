"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
  /**
   * Canonical GA4 event name to fire on a successful copy. Pass one of the
   * `COPY_EVENTS` values from `lib/analytics.ts` so the "is the product
   * useful?" signal is captured. Optional — omit only for non-product copies.
   */
  eventName?: string
  /** Extra context attached to the event, e.g. the tool/skill slug. */
  eventParams?: Record<string, string | number | boolean | undefined>
}

export function CopyButton({ text, label, className, eventName, eventParams }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      if (eventName) trackEvent(eventName, eventParams)
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
