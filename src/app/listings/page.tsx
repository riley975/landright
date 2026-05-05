import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ListingCard from '@/components/listings/ListingCard'
import type { Listing } from '@/types/database'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse Mineral Rights Listings',
  description: 'Browse mineral rights and royalty listings for sale across the United States. Filter by state, county, formation, and more.',
}

const STATES = ['Alabama','Alaska','Arkansas','California','Colorado','Kansas','Louisiana','Michigan','Mississippi','Montana','New Mexico','North Dakota','Ohio','Oklahoma','Pennsylvania','Texas','Utah','West Virginia','Wyoming']
const FORMATIONS = ['Permian Basin','Wolfcamp','Bone Spring','STACK','SCOOP','Mississippian','Woodford','Eagle Ford','Austin Chalk','Bakken','Three Forks','Marcellus','Utica','Haynesville','Niobrara','DJ Basin']

async function getListings(params: Record<string, string>): Promise<Listing[]> {
  let q = supabase.from('listings').select('*').neq('status', 'draft')

  if (params.state) q = q.eq('state', params.state)
  if (params.status === 'producing') q = q.in('lease_status', ['leased', 'held_by_production'])
  if (params.status === 'unleased') q = q.eq('lease_status', 'unleased')

  const { data } = await q.order('created_at', { ascending: false }).limit(50)
  return (data as Listing[]) ?? []
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Record<string, string>
}) {
  const listings = await getListings(searchParams)

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl mb-1">Mineral rights listings</h1>
          <p className="text-ink/50 text-sm">{listings.length} listings available</p>
        </div>

        {/* Filters */}
        <form className="flex flex-wrap gap-3 mb-8 items-end">
          <div>
            <label className="label">State</label>
            <select name="state" defaultValue={searchParams.state ?? ''} className="input w-auto pr-8">
              <option value="">All states</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Status</label>
            <select name="status" defaultValue={searchParams.status ?? ''} className="input w-auto pr-8">
              <option value="">All</option>
              <option value="producing">Producing</option>
              <option value="unleased">Unleased</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Apply filters</button>
          <a href="/listings" className="btn-secondary">Clear</a>
        </form>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-ink/40">
            <p className="text-lg font-medium">No listings match your filters</p>
            <p className="text-sm mt-1">Try broadening your search or <a href="/listings" className="text-gold underline">clear filters</a>.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
