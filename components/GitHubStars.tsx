"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"

function parseRepo(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname !== "github.com") return null
    const parts = u.pathname.split("/").filter(Boolean)
    if (parts.length < 2) return null
    return `${parts[0]}/${parts[1]}`
  } catch {
    return null
  }
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`
  return n.toString()
}

interface GitHubData {
  stars: number
  updatedAt: string
}

export function GitHubStars({ githubUrl, variant = "badge" }: { githubUrl: string; variant?: "badge" | "detail" }) {
  const [data, setData] = useState<GitHubData | null>(null)
  const repo = parseRepo(githubUrl)

  useEffect(() => {
    if (!repo) return
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
  }, [repo])

  if (!data) return null

  const daysAgo = Math.floor((Date.now() - new Date(data.updatedAt).getTime()) / 86400000)
  const lastUpdated = daysAgo === 0 ? "today" : daysAgo === 1 ? "yesterday" : `${daysAgo}d ago`

  if (variant === "detail") {
    return (
      <div className="space-y-8">
        <div className="group border-b border-ink/10 pb-6 md:pb-8">
          <div className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-ink-fade mb-2 md:mb-3 group-hover:text-ink transition-colors italic">GitHub Stars</div>
          <div className="font-mono font-bold text-[0.75rem] md:text-[0.85rem] uppercase tracking-widest flex items-center gap-2">
            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
            {formatCount(data.stars)}
          </div>
        </div>
        <div className="group border-b border-ink/10 pb-6 md:pb-8">
          <div className="font-mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest text-ink-fade mb-2 md:mb-3 group-hover:text-ink transition-colors italic">Last Commit</div>
          <div className="font-mono font-bold text-[0.75rem] md:text-[0.85rem] uppercase tracking-widest">{lastUpdated}</div>
        </div>
      </div>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/20 rounded-full">
      <Star className="w-2.5 h-2.5 fill-current text-amber-500" />
      {formatCount(data.stars)}
    </span>
  )
}
