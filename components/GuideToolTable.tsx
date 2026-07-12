"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, X, Filter } from "lucide-react"
import type { SalesTool } from "@/lib/types"
import { ToolLogo } from "@/components/ToolLogo"

function ApiBadge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" }) {
  const variants = {
    default: "bg-ink/5 text-ink-fade border-ink/10",
    success: "bg-green-500/10 text-green-700 border-green-500/20",
    warning: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border rounded-md ${variants[variant]} font-bold`}>
      {children}
    </span>
  )
}

export function GuideToolTable({ tools }: { tools: SalesTool[] }) {
  const [mcpOnly, setMcpOnly] = useState(false)
  const [freeOnly, setFreeOnly] = useState(false)

  const filteredTools = tools.filter(t => {
    if (mcpOnly && !t.mcpReady) return false
    if (freeOnly && !t.hasFreeTier) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Table Filters */}
      <div className="panel flex flex-wrap items-center gap-6 p-4">
        <div className="mr-4 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink/45">
          <Filter className="h-3 w-3" />
          <span>Quick Filters:</span>
        </div>
        
        <button 
          onClick={() => setMcpOnly(!mcpOnly)}
          className={`flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${mcpOnly ? 'text-ink font-semibold' : 'text-ink-fade hover:text-ink'}`}
        >
          <div className={`flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-ink/15 ${mcpOnly ? 'bg-ink text-paper' : ''}`}>
            {mcpOnly && <Check className="h-2.5 w-2.5 text-white" />}
          </div>
          MCP Ready
        </button>

        <button 
          onClick={() => setFreeOnly(!freeOnly)}
          className={`flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${freeOnly ? 'text-ink font-semibold' : 'text-ink-fade hover:text-ink'}`}
        >
          <div className={`flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-ink/15 ${freeOnly ? 'bg-ink text-paper' : ''}`}>
            {freeOnly && <Check className="h-2.5 w-2.5 text-white" />}
          </div>
          Free Tier
        </button>

        <div className="ml-auto font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink/40">
          Showing {filteredTools.length} of {tools.length} Tools
        </div>
      </div>

      {/* The Table */}
      <div className="panel overflow-x-auto">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-ink/10 bg-ink/[0.03]">
              <th className="px-6 py-4 text-left font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink font-semibold">Tool</th>
              <th className="px-6 py-4 text-left font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink font-semibold">Auth</th>
              <th className="px-6 py-4 text-left font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink font-semibold">SDKs</th>
              <th className="px-6 py-4 text-center font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink font-semibold">Free</th>
              <th className="px-6 py-4 text-center font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink font-semibold">MCP</th>
            </tr>
          </thead>
          <tbody>
            {filteredTools.map((tool) => (
              <tr key={tool.slug} className="border-b border-ink/10 transition-colors hover:bg-ink/[0.02] last:border-0">
                <td className="px-6 py-5">
                  <Link href={`/apis/${tool.slug}`} className="flex items-center gap-3 hover:underline">
                    <ToolLogo name={tool.name} websiteUrl={tool.websiteUrl} size="sm" />
                    <div>
                      <span className="block text-base font-semibold">{tool.name}</span>
                      <p className="mt-1 max-w-[250px] line-clamp-1 text-sm text-ink-fade">{tool.oneLiner}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1.5">
                    {tool.authMethod.map((auth) => (
                      <ApiBadge key={auth} variant="warning">{auth}</ApiBadge>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5">
                  {tool.sdkLanguages.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {tool.sdkLanguages.slice(0, 2).map((sdk) => (
                        <ApiBadge key={sdk} variant="success">{sdk}</ApiBadge>
                      ))}
                      {tool.sdkLanguages.length > 2 && (
                        <span className="text-[10px] font-mono text-ink/40">+{tool.sdkLanguages.length - 2}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-ink-fade text-xs opacity-40 uppercase font-mono">None</span>
                  )}
                </td>
                <td className="px-6 py-5 text-center">
                  {tool.hasFreeTier ? (
                    <div className="flex justify-center"><Check className="h-5 w-5 text-emerald-700" /></div>
                  ) : (
                    <div className="flex justify-center"><X className="text-ink-fade/20 h-5 w-5" /></div>
                  )}
                </td>
                <td className="px-6 py-5 text-center">
                  {tool.mcpReady ? (
                    <span className="inline-flex items-center gap-1 rounded-md border border-emerald-700/15 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-800">
                      MCP
                    </span>
                  ) : (
                    <div className="flex justify-center"><X className="text-ink-fade/20 h-5 w-5" /></div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      {filteredTools.length === 0 && (
        <div className="py-20 text-center">
            <p className="text-xl text-ink-fade">No tools match your active filters.</p>
            <button 
              onClick={() => { setMcpOnly(false); setFreeOnly(false); }}
              className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
