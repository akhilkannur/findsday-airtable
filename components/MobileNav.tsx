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
        <nav className="fixed inset-0 top-[73px] z-50 bg-club-dark px-6 py-12 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col gap-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-4xl font-extrabold tracking-tight text-white hover:text-club-teal transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-4" />
            <Link 
              href="/submit" 
              onClick={() => setOpen(false)}
              className="text-2xl font-bold text-gray-500 hover:text-white transition-colors"
            >
              Submit a tool
            </Link>
          </div>
        </nav>
      )}
    </div>
  )
}
