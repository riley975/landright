import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { PlusCircle, List, Users, TrendingUp } from 'lucide-react'

export default async function AdminDashboard() {
  const [{ count: total }, { count: active }, { count: inquiries }] = await Promise.all([
    supabase.from('listings').select('*', { count: 'exact', head: true }),
    supabase.from('listings').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('buyer_inquiries').select('*', { count: 'exact', head: true }),
  ])

  const { data: recentInquiries } = await supabase
    .from('buyer_inquiries')
    .select('*, listings(title, county, state)')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl">Dashboard</h1>
        <Link href="/admin/listings/new" className="btn-primary flex items-center gap-1.5">
          <PlusCircle size={14}/> New listing
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: List, label: 'Total listings', value: total ?? 0, href: '/admin/listings' },
          { icon: TrendingUp, label: 'Active listings', value: active ?? 0, href: '/admin/listings' },
          { icon: Users, label: 'Buyer inquiries', value: inquiries ?? 0, href: '/admin/inquiries' },
        ].map(({ icon: Icon, label, value, href }) => (
          <Link key={label} href={href} className="card p-4 hover:border-gold/30 transition-colors">
            <div className="flex items-center gap-2 text-ink/40 text-xs mb-2">
              <Icon size={12}/>{label}
            </div>
            <div className="font-serif text-3xl text-ink">{value}</div>
          </Link>
        ))}
      </div>

      {/* Recent inquiries */}
      <div className="card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/8 flex items-center justify-between">
          <h2 className="font-medium text-sm">Recent buyer inquiries</h2>
          <Link href="/admin/inquiries" className="btn-ghost text-xs">View all</Link>
        </div>
        {recentInquiries && recentInquiries.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="text-xs text-ink/40 border-b border-ink/8">
              <tr>
                <th className="px-5 py-2.5 text-left font-medium">Name</th>
                <th className="px-5 py-2.5 text-left font-medium">Email</th>
                <th className="px-5 py-2.5 text-left font-medium">Listing</th>
                <th className="px-5 py-2.5 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {recentInquiries.map((inq: any) => (
                <tr key={inq.id} className="hover:bg-cream/50">
                  <td className="px-5 py-3 font-medium">{inq.name}</td>
                  <td className="px-5 py-3 text-ink/60">{inq.email}</td>
                  <td className="px-5 py-3 text-ink/60">{inq.listings?.title ?? '—'}</td>
                  <td className="px-5 py-3 text-ink/40">{new Date(inq.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-5 py-8 text-sm text-ink/40 text-center">No inquiries yet</p>
        )}
      </div>
    </div>
  )
}
