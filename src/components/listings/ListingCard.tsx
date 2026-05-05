import Link from 'next/link'
import { MapPin, Layers, TrendingUp } from 'lucide-react'
import type { Listing } from '@/types/database'
import clsx from 'clsx'

function StatusBadge({ status, leaseStatus }: { status: string; leaseStatus: string }) {
  if (status === 'sold') return <span className="badge-sold">Sold</span>
  if (status === 'pending') return <span className="badge-pending">Under contract</span>
  if (leaseStatus === 'unleased') return <span className="badge-unleased">Unleased</span>
  if (leaseStatus === 'leased' || leaseStatus === 'held_by_production') return <span className="badge-active">Producing</span>
  return <span className="badge-active">Active</span>
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const formattedPrice = listing.asking_price
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(listing.asking_price)
    : 'Price on request'

  return (
    <Link href={`/listings/${listing.id}`} className="card group hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 block">
      {/* Map placeholder — simple grid visual */}
      <div className="h-28 bg-cream relative overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 320 112" preserveAspectRatio="xMidYMid slice">
          <rect width="320" height="112" fill="#EDE9DF"/>
          {[28, 56, 84].map(y => <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#D4CEC0" strokeWidth="0.5"/>)}
          {[80, 160, 240].map(x => <line key={x} x1={x} y1="0" x2={x} y2="112" stroke="#D4CEC0" strokeWidth="0.5"/>)}
          <rect x="80" y="28" width="80" height="56" fill="#B87D2E" fillOpacity="0.25" stroke="#B87D2E" strokeWidth="1.5"/>
          <line x1="0" y1="70" x2="320" y2="65" stroke="#3B6D11" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="120" cy="56" r="4" fill="#B87D2E" stroke="white" strokeWidth="1.5"/>
        </svg>
        <div className="absolute top-2.5 right-2.5">
          <StatusBadge status={listing.status} leaseStatus={listing.lease_status} />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1.5 text-xs text-ink/50 mb-1.5">
          <MapPin size={11}/>
          <span>{listing.county} County, {listing.state}</span>
        </div>

        <h3 className="font-medium text-sm text-ink leading-snug mb-1 group-hover:text-gold transition-colors">
          {listing.title}
        </h3>

        <p className="text-xs text-ink/50 mb-3 line-clamp-2 leading-relaxed">
          {listing.legal_description}
        </p>

        <div className="flex gap-3 mb-3 text-xs text-ink/60">
          <span><strong className="text-ink font-medium">{listing.net_mineral_acres}</strong> NMA</span>
          {listing.royalty_rate && <span><strong className="text-ink font-medium">{listing.royalty_rate}</strong> royalty</span>}
          {listing.producing_wells ? (
            <span><strong className="text-ink font-medium">{listing.producing_wells}</strong> wells</span>
          ) : listing.permitted_wells ? (
            <span><strong className="text-ink font-medium">{listing.permitted_wells}</strong> permits</span>
          ) : null}
        </div>

        {listing.formation && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {listing.formation.split(',').map(f => (
              <span key={f} className="text-xs bg-cream text-ink/50 border border-ink/10 px-2 py-0.5 rounded">
                {f.trim()}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-ink/8">
          <span className="font-serif text-lg text-ink">{formattedPrice}</span>
          <span className="text-xs font-medium text-gold group-hover:translate-x-0.5 transition-transform">
            View details →
          </span>
        </div>
      </div>
    </Link>
  )
}
