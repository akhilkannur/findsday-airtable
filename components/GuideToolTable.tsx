"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, X, Filter } from "lucide-react"
import type { SalesTool } from "@/lib/types"

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
      <div className="flex flex-wrap items-center gap-6 p-4 bg-paper border border-ink/10 rounded-lg">
        <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-ink/40 mr-4">
          <Filter className="h-3 w-3" />
          <span>Quick Filters:</span>
        </div>
        
        <button 
          onClick={() => setMcpOnly(!mcpOnly)}
          className={`flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest transition-all ${mcpOnly ? 'text-purple-700 font-bold' : 'text-ink-fade hover:text-ink'}`}
        >
          <div className={`w-3.5 h-3.5 border border-ink/20 flex items-center justify-center rounded-sm ${mcpOnly ? 'bg-purple-600 border-purple-600' : ''}`}>
            {mcpOnly && <Check className="h-2.5 w-2.5 text-white" />}
          </div>
          MCP Ready
        </button>

        <button 
          onClick={() => setFreeOnly(!freeOnly)}
          className={`flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest transition-all ${freeOnly ? 'text-green-700 font-bold' : 'text-ink-fade hover:text-ink'}`}
        >
          <div className={`w-3.5 h-3.5 border border-ink/20 flex items-center justify-center rounded-sm ${freeOnly ? 'bg-green-600 border-green-600' : ''}`}>
            {freeOnly && <Check className="h-2.5 w-2.5 text-white" />}
          </div>
          Free Tier
        </button>

        <div className="ml-auto font-mono text-[0.65rem] text-ink/30 uppercase">
          Showing {filteredTools.length} of {tools.length} Tools
        </div>
      </div>

      {/* The Table */}
      <div className="overflow-x-auto bg-paper border border-ink/20 rounded-xl shadow-sm">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-ink/30 bg-ink/[0.03]">
              <th className="text-left py-5 px-6 font-mono text-[0.85rem] uppercase tracking-wider text-ink font-bold">Tool</th>
              <th className="text-left py-5 px-6 font-mono text-[0.85rem] uppercase tracking-wider text-ink font-bold">Auth</th>
              <th className="text-left py-5 px-6 font-mono text-[0.85rem] uppercase tracking-wider text-ink font-bold">SDKs</th>
              <th className="text-center py-5 px-6 font-mono text-[0.85rem] uppercase tracking-wider text-ink font-bold">Free</th>
              <th className="text-center py-5 px-6 font-mono text-[0.85rem] uppercase tracking-wider text-ink font-bold">MCP</th>
            </tr>
          </thead>
          <tbody>
            {filteredTools.map((tool) => (
              <tr key={tool.slug} className="border-b border-ink/20 hover:bg-ink/[0.04] transition-colors last:border-0">
                <td className="py-5 px-6">
                  <Link href={`/apis/${tool.slug}`} className="hover:underline font-bold text-lg block uppercase">
                    {tool.name}
                  </Link>
                  <p className="text-sm text-ink-fade mt-1 line-clamp-1 max-w-[250px]">{tool.oneLiner}</p>
                </td>
                <td className="py-5 px-6">
                  <div className="flex flex-wrap gap-1.5">
                    {tool.authMethod.map((auth) => (
                      <ApiBadge key={auth} variant="warning">{auth}</ApiBadge>
                    ))}
                  </div>
                </td>
                <td className="py-5 px-6">
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
                <td className="py-5 px-6 text-center">
                  {tool.hasFreeTier ? (
                    <div className="flex justify-center"><Check className="text-green-600 h-5 w-5" /></div>
                  ) : (
                    <div className="flex justify-center"><X className="text-ink-fade/20 h-5 w-5" /></div>
                  )}
                </td>
                <td className="py-5 px-6 text-center">
                  {tool.mcpReady ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border rounded-full bg-purple-500/10 text-purple-700 border-purple-500/20 font-bold">
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
            <p className="font-serif italic text-xl text-ink-fade">No tools match your active filters.</p>
            <button 
              onClick={() => { setMcpOnly(false); setFreeOnly(false); }}
              className="mt-4 font-mono text-[0.7rem] uppercase underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
