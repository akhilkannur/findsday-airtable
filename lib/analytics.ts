/**
 * Lightweight GA4 event tracking wrapper.
 *
 * Safe in SSR/dev: no-ops when gtag isn't on the window (e.g. during
 * `next build`, ad-blockers, or before the gtag script loads).
 *
 * The canonical event names live here so call sites stay consistent and
 * typos surface as type errors instead of silently missing data.
 */

type GtagEventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: GtagEventParams) => void
  }
}

/** Canonical copy-event names — the core "is the product useful?" signal. */
export const COPY_EVENTS = {
  /** MCP server config JSON — the primary value prop per AGENTS.md. */
  mcpConfig: "mcp_config_copied",
  /** Starter prompt / agent instructions for a skill. */
  prompt: "prompt_copied",
  /** `npx salestools add ...` CLI command. */
  command: "command_copied",
  /** Embeddable "Listed on Salestools Club" badge snippet. */
  badge: "badge_copied",
} as const

export type CopyEventName = (typeof COPY_EVENTS)[keyof typeof COPY_EVENTS]

/**
 * Fire a GA4 event. No-ops silently if gtag is unavailable so this can be
 * called unconditionally from client components without guarding at call sites.
 */
export function trackEvent(eventName: string, params?: GtagEventParams): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", eventName, params)
}
