import ListingForm from '@/components/listings/ListingForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'New listing' }

export default function NewListingPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">New listing</h1>
      <ListingForm />
    </div>
  )
}
