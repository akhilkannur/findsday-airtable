"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

interface MobileNavProps {
  links: { href: string; label: string }[]
}

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md border border-ink/10 bg-white p-2 text-ink-fade transition-colors hover:text-ink"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <nav className="fixed inset-0 top-[68px] z-[999] border-t border-ink/10 bg-paper/96 px-4 py-6 backdrop-blur-md">
          <div className="panel mx-auto flex max-w-md flex-col gap-2 p-4 shadow-none">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-lg font-semibold tracking-tight text-ink transition-colors hover:bg-ink/[0.04]"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-ink/10" />
            <Link 
              href="/submit" 
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-ink-fade transition-colors hover:bg-ink/[0.04] hover:text-ink"
            >
              Submit Entry
            </Link>
          </div>
        </nav>
      )}
    </div>
  )
}
