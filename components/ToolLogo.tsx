"use client"

import { useState } from "react"

interface ToolLogoProps {
  name: string
  websiteUrl: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-xl",
  lg: "w-16 h-16 md:w-24 md:h-24 text-3xl md:text-5xl",
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
      <div className={`${classes} bg-ink text-paper flex items-center justify-center font-serif font-bold [clip-path:polygon(0%_0%,100%_2%,98%_100%,2%_98%)]`}>
        {name.charAt(0)}
      </div>
    )
  }

  return (
    <div className={`${classes} flex items-center justify-center overflow-hidden`}>
      <img
        src={`https://img.logo.dev/${domain}?token=pk_cI8SBpmJQJG67HoLPuFNgw&size=64&format=png`}
        alt={`${name} logo`}
        className="w-full h-full object-contain"
        onError={() => setFailed(true)}
        loading="lazy"
      />
    </div>
  )
}
