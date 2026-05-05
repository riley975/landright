import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    await supabase.from('seller_leads').insert({
      name: body.name,
      email: body.email,
      phone: body.phone,
      state: body.state,
      county: body.county,
      acres: body.acres,
      lease_status: body.lease_status,
      formation: body.formation,
      notes: body.notes,
    } as any)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
