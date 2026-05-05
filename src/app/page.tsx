import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ListingCard from '@/components/listings/ListingCard'
import type { Listing } from '@/types/database'

async function getFeaturedListings(): Promise<Listing[]> {
  const { data } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(6)
  return (data as Listing[]) ?? []
}

const BASINS = [
  { name: 'Permian Basin', states: 'TX · NM', top: '48%', left: '28%' },
  { name: 'STACK / SCOOP', states: 'OK', top: '46%', left: '40%' },
  { name: 'Eagle Ford', states: 'TX', top: '60%', left: '36%' },
  { name: 'Bakken', states: 'ND · MT', top: '22%', left: '36%' },
  { name: 'DJ Basin', states: 'CO · WY', top: '37%', left: '28%' },
  { name: 'Haynesville', states: 'LA · TX', top: '53%', left: '48%' },
  { name: 'Marcellus', states: 'PA · WV', top: '34%', left: '68%' },
  { name: 'Uinta / Piceance', states: 'UT · CO', top: '40%', left: '24%' },
]

export default async function Home() {
  const listings = await getFeaturedListings()

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-gold text-xs font-medium uppercase tracking-widest mb-4">
              The mineral rights marketplace
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-5">
              Buy &amp; sell{' '}
              <em className="text-gold-light">mineral rights</em>{' '}
              across America
            </h1>
            <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-xl">
              Transparent listings, real well data, and a trusted broker connecting mineral owners with qualified buyers nationwide.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/listings" className="btn-primary text-base px-6 py-3">
                Browse listings
              </Link>
              <Link href="/sell" className="bg-white/10 hover:bg-white/15 text-white font-medium px-6 py-3 rounded-lg text-base transition-colors">
                Get a free valuation →
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap gap-8 md:gap-16">
            {[
              { n: '38', label: 'States covered' },
              { n: '$94M+', label: 'Transacted' },
              { n: '1,200+', label: 'Active listings' },
              { n: '6,400+', label: 'Registered buyers' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-serif text-2xl text-gold-light">{s.n}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl">Featured listings</h2>
          <Link href="/listings" className="btn-ghost">View all →</Link>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-ink/40">
            <p className="text-lg">Listings coming soon</p>
            <p className="text-sm mt-1">Check back shortly or register as a buyer to get alerts.</p>
            <Link href="/buyers" className="btn-primary mt-4 inline-block">Register as a buyer</Link>
          </div>
        )}
      </section>

      {/* Basin map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-ink/8 flex items-center justify-between">
            <div>
              <h2 className="font-medium text-sm">Active listings by basin</h2>
              <p className="text-xs text-ink/50 mt-0.5">Click any basin to explore listings</p>
            </div>
          </div>
          <div className="relative bg-[#E8E4D8] h-64 overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 680 256" preserveAspectRatio="xMidYMid slice">
              <rect width="680" height="256" fill="#E8E4D8"/>
              {/* Rough US outline suggestion */}
              <path d="M60,50 L620,50 L640,90 L635,180 L580,200 L480,210 L380,215 L280,210 L180,205 L100,190 L65,150 Z"
                fill="#DDD8CC" stroke="#C8C3B5" strokeWidth="1" fillOpacity="0.5"/>
            </svg>
            {BASINS.map(b => (
              <Link
                key={b.name}
                href={`/listings?basin=${encodeURIComponent(b.name)}`}
                className="absolute group"
                style={{ top: b.top, left: b.left, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative">
                  <div className="w-3 h-3 bg-gold rounded-full border-2 border-white shadow group-hover:scale-125 transition-transform"/>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-ink text-white text-xs rounded-md px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="font-medium">{b.name}</span>
                    <span className="text-white/60 ml-1">{b.states}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="font-serif text-2xl mb-10 text-center">How Landright works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: '01', title: 'Submit your minerals', body: 'Tell us what you own. We review the production data, nearby activity, and comparable sales to price it right.' },
              { n: '02', title: 'We list & market it', body: 'Your listing goes live to thousands of registered buyers. We handle all inquiries so you don\'t have to.' },
              { n: '03', title: 'Close the deal', body: 'We broker the transaction between you and the buyer. You receive maximum value, we handle the paperwork.' },
            ].map(s => (
              <div key={s.n} className="flex gap-4">
                <div className="font-serif text-3xl text-gold-light/30 leading-none w-10 shrink-0">{s.n}</div>
                <div>
                  <h3 className="font-medium mb-2">{s.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/sell" className="btn-primary text-base px-8 py-3">
              Get a free valuation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
