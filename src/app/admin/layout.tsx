'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, List, PlusCircle, Users, LogOut } from 'lucide-react'

const NAV = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/listings', icon: List, label: 'Listings' },
  { href: '/admin/listings/new', icon: PlusCircle, label: 'New listing' },
  { href: '/admin/inquiries', icon: Users, label: 'Inquiries' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setAuthed(sessionStorage.getItem('admin_auth') === 'true')
  }, [])

  const login = () => {
    // Simple client-side gate — real security comes from Supabase RLS on sensitive data
    if (pw === (process.env.NEXT_PUBLIC_ADMIN_PW ?? 'landright2024')) {
      sessionStorage.setItem('admin_auth', 'true')
      setAuthed(true)
    } else {
      setErr(true)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="card p-8 w-full max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 bg-gold rounded-md flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M8 1L2 5v8l6 2 6-2V5L8 1zm0 2.2L12 6v5.5L8 13l-4-1.5V6l4-2.8z"/></svg>
            </div>
            <span className="font-serif text-lg">Landright Admin</span>
          </div>
          <label className="label">Password</label>
          <input className="input mb-3" type="password" value={pw}
            onChange={e => { setPw(e.target.value); setErr(false) }}
            onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="Enter admin password"/>
          {err && <p className="text-xs text-red-500 mb-2">Incorrect password</p>}
          <button onClick={login} className="btn-primary w-full justify-center">Sign in</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-cream">
      {/* Sidebar */}
      <aside className="w-52 bg-ink text-white flex flex-col shrink-0">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gold rounded flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="white"><path d="M8 1L2 5v8l6 2 6-2V5L8 1zm0 2.2L12 6v5.5L8 13l-4-1.5V6l4-2.8z"/></svg>
            </div>
            <span className="font-serif text-base text-gold-light">Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors
                ${pathname === href ? 'bg-white/10 text-white' : 'text-white/55 hover:text-white hover:bg-white/5'}`}>
              <Icon size={14}/>
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthed(false) }}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors w-full px-3 py-2">
            <LogOut size={12}/> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}
