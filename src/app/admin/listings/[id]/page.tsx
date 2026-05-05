import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ListingForm from '@/components/listings/ListingForm'
import type { Listing } from '@/types/database'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Edit listing' }

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const { data } = await supabase.from('listings').select('*').eq('id', params.id).single()
  if (!data) notFound()

  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">Edit listing</h1>
      <ListingForm existing={data as Listing} />
    </div>
  )
}
