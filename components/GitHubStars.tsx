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
          <div className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-ink-fade mb-2 md:mb-3 group-hover:text-ink transition-colors italic">GitHub Stars</div>
          <div className="font-mono font-bold text-[0.75rem] md:text-[0.85rem] uppercase tracking-widest flex items-center gap-2">
            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
            {formatCount(stars)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full">
      <Star className="w-2.5 h-2.5 fill-current text-amber-500" />
      {formatCount(stars)}
    </span>
  )
}
