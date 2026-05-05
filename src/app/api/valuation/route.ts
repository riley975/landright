import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Store in a simple table or just log for now
    // You can replace this with an email send (Resend, SendGrid, etc.)
    const { error } = await supabase.from('valuation_requests').insert({
      state: body.state,
      county: body.county,
      legal_description: body.legal_description,
      acres: body.acres,
      lease_status: body.lease_status,
      formation: body.formation,
      notes: body.notes,
      seller_name: body.name,
      seller_email: body.email,
      seller_phone: body.phone,
    })
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
