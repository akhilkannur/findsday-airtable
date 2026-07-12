"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"

interface GitHubData {
  stars: number
  updatedAt: string
}

export function GitHubStars({ 
  githubUrl, 
  variant = "badge",
  githubStars 
}: { 
  githubUrl: string
  variant?: "badge" | "detail"
  githubStars?: number
}) {
  const [data, setData] = useState<GitHubData | null>(null)

  useEffect(() => {
    if (!githubUrl?.includes("github.com")) return
    
    const repo = githubUrl.replace(/^https?:\/\/github\.com\//, "").replace(/\/$/, "")
    
    fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json) {
          setData({
            stars: json.stargazers_count,
            updatedAt: json.pushed_at,
          })
        }
      })
      .catch(() => {})
  }, [githubUrl])

  const stars = data?.stars ?? githubStars
  
  if (!stars) return null

  const formatCount = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : n.toString()

  if (variant === "detail") {
    return (
      <div className="space-y-8">
        <div className="group border-b border-ink/10 pb-6 md:pb-8">
          <div className="mb-2 font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.18em] text-ink-fade transition-colors group-hover:text-ink">GitHub Stars</div>
          <div className="flex items-center gap-2 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.18em] md:text-[0.85rem]">
            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
            {formatCount(stars)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-ink/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-fade">
      <Star className="w-2.5 h-2.5 fill-current text-amber-500" />
      {formatCount(stars)}
    </span>
  )
}
