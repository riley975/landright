import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Buyer inquiries' }

export default async function InquiriesPage() {
  const { data } = await supabase
    .from('buyer_inquiries')
    .select('*, listings(title, county, state)')
    .order('created_at', { ascending: false })

  const inquiries = data ?? []

  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">Buyer inquiries</h1>

      <div className="card overflow-hidden">
        {inquiries.length > 0 ? (
          <div className="divide-y divide-ink/5">
            {inquiries.map((inq: any) => (
              <div key={inq.id} className="p-5 hover:bg-cream/30">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="font-medium text-sm">{inq.name}</span>
                    {inq.company && <span className="text-ink/40 text-sm ml-2">· {inq.company}</span>}
                  </div>
                  <span className="text-xs text-ink/40 whitespace-nowrap">
                    {new Date(inq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="text-xs text-ink/50 mb-2 flex gap-4">
                  <a href={`mailto:${inq.email}`} className="text-gold hover:underline">{inq.email}</a>
                  {inq.phone && <span>{inq.phone}</span>}
                </div>
                {inq.listings && (
                  <div className="text-xs bg-cream border border-ink/8 rounded px-2.5 py-1.5 inline-block mb-2 text-ink/60">
                    Re: {inq.listings.title} — {inq.listings.county}, {inq.listings.state}
                  </div>
                )}
                {inq.message && (
                  <p className="text-sm text-ink/60 mt-1 leading-relaxed">{inq.message}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="px-5 py-12 text-sm text-ink/40 text-center">No buyer inquiries yet</p>
        )}
      </div>
    </div>
  )
}
