import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { error } = await supabase.from('buyer_registrations').insert({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      basins: body.basins,
      min_acres: body.min_acres,
      max_budget: body.max_budget,
      notes: body.notes,
    } as any)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
