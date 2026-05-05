import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import InquiryForm from '@/components/listings/InquiryForm'
import type { Listing } from '@/types/database'
import type { Metadata } from 'next'
import { MapPin, Layers, TrendingUp, FileText, CheckCircle } from 'lucide-react'

async function getListing(id: string): Promise<Listing | null> {
  const { data } = await supabase.from('listings').select('*').eq('id', id).neq('status', 'draft').single()
  return data as Listing | null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const listing = await getListing(params.slug)
  if (!listing) return { title: 'Listing not found' }
  return {
    title: listing.title,
    description: `${listing.net_mineral_acres} net mineral acres in ${listing.county} County, ${listing.state}. ${listing.description.slice(0, 120)}`,
  }
}

export default async function ListingPage({ params }: { params: { slug: string } }) {
  const listing = await getListing(params.slug)
  if (!listing) notFound()

  const price = listing.asking_price
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(listing.asking_price)
    : 'Price on request'

  const leaseLabel: Record<string, string> = {
    leased: 'Leased',
    unleased: 'Unleased',
    held_by_production: 'Held by production',
    unknown: 'Unknown',
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-ink/40 mb-6 flex items-center gap-2">
          <a href="/listings" className="hover:text-gold">Listings</a>
          <span>/</span>
          <span>{listing.state}</span>
          <span>/</span>
          <span className="text-ink/70">{listing.county} County</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-sm text-ink/50 mb-2">
                <MapPin size={13}/>
                <span>{listing.county} County, {listing.state}</span>
              </div>
              <h1 className="font-serif text-3xl text-ink mb-2">{listing.title}</h1>
              <p className="text-sm text-ink/60 leading-relaxed font-mono bg-cream px-3 py-2 rounded-lg border border-ink/8">
                {listing.legal_description}
              </p>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Net mineral acres', value: listing.net_mineral_acres.toString() },
                { label: 'Lease status', value: leaseLabel[listing.lease_status] },
                { label: 'Royalty rate', value: listing.royalty_rate ?? '—' },
                { label: 'Listing type', value: listing.listing_type.replace('_', ' ') },
              ].map(s => (
                <div key={s.label} className="bg-cream rounded-lg p-3 border border-ink/8">
                  <div className="text-xs text-ink/40 mb-1">{s.label}</div>
                  <div className="font-medium text-sm capitalize">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Well activity */}
            {(listing.producing_wells || listing.permitted_wells || listing.operator) && (
              <div className="card p-5">
                <h2 className="font-medium mb-4 flex items-center gap-2">
                  <TrendingUp size={15} className="text-gold"/>
                  Well activity
                </h2>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {listing.operator && (
                    <div>
                      <div className="text-xs text-ink/40 mb-1">Operator</div>
                      <div className="font-medium">{listing.operator}</div>
                    </div>
                  )}
                  {listing.producing_wells != null && (
                    <div>
                      <div className="text-xs text-ink/40 mb-1">Producing wells</div>
                      <div className="font-medium">{listing.producing_wells}</div>
                    </div>
                  )}
                  {listing.permitted_wells != null && (
                    <div>
                      <div className="text-xs text-ink/40 mb-1">Permitted wells</div>
                      <div className="font-medium">{listing.permitted_wells}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Formation */}
            {listing.formation && (
              <div className="card p-5">
                <h2 className="font-medium mb-3 flex items-center gap-2">
                  <Layers size={15} className="text-gold"/>
                  Formation
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listing.formation.split(',').map(f => (
                    <span key={f} className="text-sm bg-cream text-ink/70 border border-ink/10 px-3 py-1.5 rounded-lg">
                      {f.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="card p-5">
              <h2 className="font-medium mb-3 flex items-center gap-2">
                <FileText size={15} className="text-gold"/>
                About this listing
              </h2>
              <p className="text-sm text-ink/70 leading-relaxed">{listing.description}</p>
              {listing.highlights && listing.highlights.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {listing.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                      <CheckCircle size={14} className="text-sage mt-0.5 shrink-0"/>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card p-5 sticky top-20">
              <div className="mb-4 pb-4 border-b border-ink/8">
                <div className="font-serif text-3xl text-ink">{price}</div>
                <div className="text-xs text-ink/40 mt-1">{listing.net_mineral_acres} net mineral acres</div>
                {listing.asking_price && (
                  <div className="text-xs text-ink/40">
                    ~{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(listing.asking_price / listing.net_mineral_acres)}/NMA
                  </div>
                )}
              </div>

              <h3 className="font-medium text-sm mb-3">Request more information</h3>
              <InquiryForm listingId={listing.id} listingTitle={listing.title} />

              <p className="text-xs text-ink/35 mt-3 text-center">
                All inquiries are handled directly by our broker. No spam.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
