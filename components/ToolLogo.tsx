"use client"

import { useState } from "react"

interface ToolLogoProps {
  name: string
  websiteUrl: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-8 w-8 text-sm",
  md: "h-12 w-12 text-xl",
  lg: "h-16 w-16 md:h-24 md:w-24 text-3xl md:text-5xl",
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}

export function ToolLogo({ name, websiteUrl, size = "md" }: ToolLogoProps) {
  const [failed, setFailed] = useState(false)
  const domain = getDomain(websiteUrl)
  const classes = sizeClasses[size]

  if (failed || !domain) {
    return (
      <div className={`${classes} flex items-center justify-center rounded-xl border border-ink/10 bg-ink text-paper font-mono font-semibold`}>
        {name.charAt(0)}
      </div>
    )
  }

  return (
    <div className={`${classes} overflow-hidden rounded-xl border border-ink/10 bg-white`}>
      <img
        src={`https://img.logo.dev/${domain}?token=pk_cI8SBpmJQJG67HoLPuFNgw&size=64&format=png`}
        alt={`${name} logo`}
        className="h-full w-full object-contain p-1"
        onError={() => setFailed(true)}
        loading="lazy"
      />
    </div>
  )
}
