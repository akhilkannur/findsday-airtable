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
        <nav className="fixed inset-0 top-[73px] z-50 bg-ghost-dark px-6 py-8 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-bold text-white hover:opacity-70 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/5 my-4" />
            <Link 
              href="/submit" 
              onClick={() => setOpen(false)}
              className="text-xl font-bold text-gray-400"
            >
              Submit a tool
            </Link>
          </div>
        </nav>
      )}
    </div>
  )
}
