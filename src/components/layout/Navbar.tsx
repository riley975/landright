'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gold rounded-md flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M8 1L2 5v8l6 2 6-2V5L8 1zm0 2.2L12 6v5.5L8 13l-4-1.5V6l4-2.8z"/>
            </svg>
          </div>
          <span className="font-serif text-xl text-gold-light">Landright</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/60">
          <Link href="/listings" className="hover:text-white transition-colors">Browse listings</Link>
          <Link href="/sell" className="hover:text-white transition-colors">Sell minerals</Link>
          <Link href="/buyers" className="hover:text-white transition-colors">For buyers</Link>
          <Link href="/listings?edu=1" className="hover:text-white transition-colors">Education</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/sell" className="btn-primary text-sm py-2 px-4">
            Get a free valuation
          </Link>
        </div>

        <button className="md:hidden text-white/70" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ink border-t border-white/10 px-4 pb-4">
          <nav className="flex flex-col gap-3 pt-3 text-sm text-white/70">
            <Link href="/listings" onClick={() => setOpen(false)}>Browse listings</Link>
            <Link href="/sell" onClick={() => setOpen(false)}>Sell minerals</Link>
            <Link href="/buyers" onClick={() => setOpen(false)}>For buyers</Link>
            <Link href="/sell" className="btn-primary mt-2 text-center" onClick={() => setOpen(false)}>
              Get a free valuation
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
