'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const login = () => {
    if (pw === (process.env.NEXT_PUBLIC_ADMIN_PW ?? 'landright2024')) {
      sessionStorage.setItem('admin_auth', 'true')
      setAuthed(true)
    } else {
      setErr(true)
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') setAuthed(true)
  }, [])

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    supabase.from('seller_leads').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setLeads(data ?? []); setLoading(false) })
  }, [authed])

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="card p-8 w-full max-w-sm">
          <div className="font-serif text-xl text-green-700 mb-6">WeBuyMinerals Admin</div>
          <label className="label">Password</label>
          <input className="input mb-3" type="password" value={pw}
            onChange={e => { setPw(e.target.value); setErr(false) }}
            onKeyDown={e => e.key === 'Enter' && login()}/>
          {err && <p className="text-xs text-red-500 mb-2">Incorrect password</p>}
          <button onClick={login} className="btn-primary w-full text-center">Sign in</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
        <span className="font-serif text-lg text-green-300">WeBuyMinerals — Seller Leads</span>
        <button onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthed(false) }}
          className="text-xs text-white/40 hover:text-white">Sign out</button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl">Seller leads <span className="text-stone-400 text-lg font-sans">({leads.length})</span></h1>
        </div>

        <div className="card overflow-hidden">
          {loading ? (
            <p className="p-8 text-center text-stone-400">Loading...</p>
          ) : leads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-stone-400 border-b border-stone-200 bg-stone-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">Phone</th>
                    <th className="px-4 py-3 text-left font-medium">Email</th>
                    <th className="px-4 py-3 text-left font-medium">Location</th>
                    <th className="px-4 py-3 text-left font-medium">Acres</th>
                    <th className="px-4 py-3 text-left font-medium">Lease</th>
                    <th className="px-4 py-3 text-left font-medium">Formation</th>
                    <th className="px-4 py-3 text-left font-medium">Notes</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {leads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-stone-50">
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td className="px-4 py-3"><a href={`tel:${lead.phone}`} className="text-green-700 hover:underline">{lead.phone}</a></td>
                      <td className="px-4 py-3 text-stone-500">{lead.email}</td>
                      <td className="px-4 py-3">{lead.county}, {lead.state}</td>
                      <td className="px-4 py-3">{lead.acres ?? '—'}</td>
                      <td className="px-4 py-3 capitalize">{lead.lease_status ?? '—'}</td>
                      <td className="px-4 py-3">{lead.formation ?? '—'}</td>
                      <td className="px-4 py-3 text-stone-400 max-w-xs truncate">{lead.notes ?? '—'}</td>
                      <td className="px-4 py-3 text-stone-400 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-12 text-center text-stone-400">No leads yet — share your site to start getting submissions.</p>
          )}
        </div>
      </div>
    </div>
  )
}
