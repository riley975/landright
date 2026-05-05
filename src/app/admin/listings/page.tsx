import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { PlusCircle, Pencil } from 'lucide-react'
import type { Listing } from '@/types/database'

export default async function AdminListings() {
  const { data } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })

  const listings = (data as Listing[]) ?? []

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      active: 'badge-active', pending: 'badge-pending',
      sold: 'badge-sold', draft: 'badge-draft',
    }
    return <span className={map[s] ?? 'badge-draft'}>{s}</span>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl">Listings</h1>
        <Link href="/admin/listings/new" className="btn-primary flex items-center gap-1.5 text-sm">
          <PlusCircle size={14}/> New listing
        </Link>
      </div>

      <div className="card overflow-hidden">
        {listings.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="text-xs text-ink/40 border-b border-ink/8 bg-cream/50">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Title</th>
                <th className="px-5 py-3 text-left font-medium">Location</th>
                <th className="px-5 py-3 text-left font-medium">NMA</th>
                <th className="px-5 py-3 text-left font-medium">Price</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {listings.map(l => (
                <tr key={l.id} className="hover:bg-cream/30">
                  <td className="px-5 py-3 font-medium max-w-xs truncate">{l.title}</td>
                  <td className="px-5 py-3 text-ink/60">{l.county}, {l.state}</td>
                  <td className="px-5 py-3">{l.net_mineral_acres}</td>
                  <td className="px-5 py-3">
                    {l.asking_price
                      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(l.asking_price)
                      : '—'}
                  </td>
                  <td className="px-5 py-3">{statusBadge(l.status)}</td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/listings/${l.id}`} className="text-gold hover:text-gold-dark flex items-center gap-1 text-xs">
                      <Pencil size={11}/> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-16 text-ink/40">
            <p className="mb-3">No listings yet</p>
            <Link href="/admin/listings/new" className="btn-primary text-sm">Create your first listing</Link>
          </div>
        )}
      </div>
    </div>
  )
}
