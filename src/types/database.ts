export type ListingStatus = 'active' | 'pending' | 'sold' | 'draft'
export type ListingType = 'minerals' | 'royalties' | 'overriding_royalty' | 'npri'
export type LeaseStatus = 'leased' | 'unleased' | 'held_by_production' | 'unknown'

export interface Listing {
  id: string
  created_at: string
  updated_at: string
  state: string
  county: string
  legal_description: string
  township?: string
  range?: string
  section?: string
  latitude?: number
  longitude?: number
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
  description: string
  highlights?: string[]
  status: ListingStatus
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

export interface BuyerRegistration {
  id: string
  created_at: string
  name: string
  email: string
  phone?: string
  company?: string
  basins?: string[]
  min_acres?: string
  max_budget?: string
  notes?: string
}

export interface ValuationRequest {
  id: string
  created_at: string
  state?: string
  county?: string
  legal_description?: string
  acres?: string
  lease_status?: string
  formation?: string
  notes?: string
  seller_name?: string
  seller_email?: string
  seller_phone?: string
}

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
      buyer_registrations: {
        Row: BuyerRegistration
        Insert: Omit<BuyerRegistration, 'id' | 'created_at'>
        Update: Partial<BuyerRegistration>
      }
      valuation_requests: {
        Row: ValuationRequest
        Insert: Omit<ValuationRequest, 'id' | 'created_at'>
        Update: Partial<ValuationRequest>
      }
    }
  }
}
