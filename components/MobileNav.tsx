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
        className="text-gray-400 transition-colors hover:text-white"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <nav className="fixed inset-0 top-[60px] z-[999] bg-paper px-6 py-12 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-3xl font-bold tracking-tighter hover:line-through transition-all uppercase"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-ink my-4 opacity-10" />
            <Link 
              href="/submit" 
              onClick={() => setOpen(false)}
              className="text-xl font-mono uppercase font-bold opacity-40 hover:opacity-100 transition-opacity"
            >
              Submit Entry
            </Link>
          </div>
        </nav>
      )}
    </div>
  )
}
