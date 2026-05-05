export type ListingStatus = 'active' | 'pending' | 'sold' | 'draft'
export type ListingType = 'minerals' | 'royalties' | 'overriding_royalty' | 'npri'
export type LeaseStatus = 'leased' | 'unleased' | 'held_by_production' | 'unknown'

export interface Listing {
  id: string
  created_at: string
  updated_at: string

  // Location
  state: string
  county: string
  legal_description: string
  township?: string
  range?: string
  section?: string
  latitude?: number
  longitude?: number

  // Details
  title: string
  listing_type: ListingType
  net_mineral_acres: number
  asking_price?: number
  royalty_rate?: string
  lease_status: LeaseStatus
  formation?: string
  operator?: string
  producing_wells?: number
  permitted_wells?: number

  // Content
  description: string
  highlights?: string[]
  status: ListingStatus

  // Contact (broker-only — never shown publicly)
  seller_name?: string
  seller_email?: string
  seller_phone?: string
  internal_notes?: string
}

export interface BuyerInquiry {
  id: string
  created_at: string
  listing_id: string
  name: string
  email: string
  phone?: string
  message?: string
  company?: string
}

// Supabase generated types (simplified)
export interface Database {
  public: {
    Tables: {
      listings: {
        Row: Listing
        Insert: Omit<Listing, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Listing, 'id' | 'created_at'>>
      }
      buyer_inquiries: {
        Row: BuyerInquiry
        Insert: Omit<BuyerInquiry, 'id' | 'created_at'>
        Update: Partial<BuyerInquiry>
      }
    }
  }
}
