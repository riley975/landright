'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Listing } from '@/types/database'

type FormData = Omit<Listing, 'id' | 'created_at' | 'updated_at'>

const DEFAULTS: FormData = {
  title: '', state: '', county: '', legal_description: '',
  township: '', range: '', section: '',
  latitude: undefined, longitude: undefined,
  listing_type: 'minerals', net_mineral_acres: 0,
  asking_price: undefined, royalty_rate: '',
  lease_status: 'unknown', formation: '', operator: '',
  producing_wells: undefined, permitted_wells: undefined,
  description: '', highlights: [],
  status: 'draft',
  seller_name: '', seller_email: '', seller_phone: '', internal_notes: '',
}

export default function ListingForm({ existing }: { existing?: Listing }) {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(existing ? { ...existing } : DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [highlightInput, setHighlightInput] = useState('')
  const [tab, setTab] = useState<'details' | 'seller' | 'location'>('details')

  const set = (k: keyof FormData, v: any) => setForm(p => ({ ...p, [k]: v }))

  const addHighlight = () => {
    if (highlightInput.trim()) {
      set('highlights', [...(form.highlights ?? []), highlightInput.trim()])
      setHighlightInput('')
    }
  }

  const removeHighlight = (i: number) => {
    set('highlights', (form.highlights ?? []).filter((_, idx) => idx !== i))
  }

  const save = async (status?: string) => {
    setSaving(true)
    const payload = status ? { ...form, status } : form

    if (existing) {
      await supabase.from('listings').update(payload).eq('id', existing.id)
    } else {
      await supabase.from('listings').insert(payload)
    }
    setSaving(false)
    router.push('/admin/listings')
    router.refresh()
  }

  const TABS = [
    { key: 'details', label: 'Listing details' },
    { key: 'location', label: 'Location' },
    { key: 'seller', label: 'Seller info (private)' },
  ] as const

  return (
    <div className="max-w-3xl">
      <div className="flex gap-1 mb-6 bg-cream rounded-lg p-1 w-fit">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors
              ${tab === t.key ? 'bg-white text-ink shadow-sm' : 'text-ink/50 hover:text-ink'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'details' && (
        <div className="card p-6 space-y-4">
          <div>
            <label className="label">Listing title *</label>
            <input className="input" required value={form.title} onChange={e => set('title', e.target.value)}
              placeholder="e.g. NW/4 Section 28 — Garfield County, OK"/>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Listing type</label>
              <select className="input" value={form.listing_type} onChange={e => set('listing_type', e.target.value as any)}>
                <option value="minerals">Mineral rights</option>
                <option value="royalties">Royalty interest</option>
                <option value="overriding_royalty">Overriding royalty</option>
                <option value="npri">NPRI</option>
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select className="input" value={form.status} onChange={e => set('status', e.target.value as any)}>
                <option value="draft">Draft (hidden)</option>
                <option value="active">Active (live)</option>
                <option value="pending">Under contract</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Net mineral acres *</label>
              <input className="input" type="number" value={form.net_mineral_acres || ''}
                onChange={e => set('net_mineral_acres', parseFloat(e.target.value))}/>
            </div>
            <div>
              <label className="label">Asking price ($)</label>
              <input className="input" type="number" value={form.asking_price || ''}
                onChange={e => set('asking_price', parseFloat(e.target.value))}
                placeholder="Leave blank = price on request"/>
            </div>
            <div>
              <label className="label">Royalty rate</label>
              <input className="input" value={form.royalty_rate ?? ''} onChange={e => set('royalty_rate', e.target.value)}
                placeholder="e.g. 3/16ths"/>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Lease status</label>
              <select className="input" value={form.lease_status} onChange={e => set('lease_status', e.target.value as any)}>
                <option value="unknown">Unknown</option>
                <option value="leased">Leased</option>
                <option value="unleased">Unleased</option>
                <option value="held_by_production">Held by production</option>
              </select>
            </div>
            <div>
              <label className="label">Formation(s)</label>
              <input className="input" value={form.formation ?? ''} onChange={e => set('formation', e.target.value)}
                placeholder="e.g. STACK, Mississippian"/>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Operator</label>
              <input className="input" value={form.operator ?? ''} onChange={e => set('operator', e.target.value)}/>
            </div>
            <div>
              <label className="label">Producing wells</label>
              <input className="input" type="number" value={form.producing_wells ?? ''}
                onChange={e => set('producing_wells', parseInt(e.target.value))}/>
            </div>
            <div>
              <label className="label">Permitted wells</label>
              <input className="input" type="number" value={form.permitted_wells ?? ''}
                onChange={e => set('permitted_wells', parseInt(e.target.value))}/>
            </div>
          </div>

          <div>
            <label className="label">Description (public)</label>
            <textarea className="input resize-none" rows={4} value={form.description}
              onChange={e => set('description', e.target.value)}/>
          </div>

          <div>
            <label className="label">Highlights / bullet points</label>
            <div className="flex gap-2 mb-2">
              <input className="input flex-1" value={highlightInput} onChange={e => setHighlightInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                placeholder="Add a highlight and press Enter"/>
              <button type="button" onClick={addHighlight} className="btn-secondary text-sm px-3">Add</button>
            </div>
            {form.highlights && form.highlights.length > 0 && (
              <ul className="space-y-1">
                {form.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm bg-cream rounded px-3 py-1.5">
                    <span className="flex-1">{h}</span>
                    <button onClick={() => removeHighlight(i)} className="text-ink/30 hover:text-red-500 text-xs">✕</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {tab === 'location' && (
        <div className="card p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">State *</label>
              <input className="input" value={form.state} onChange={e => set('state', e.target.value)} placeholder="Oklahoma"/>
            </div>
            <div>
              <label className="label">County *</label>
              <input className="input" value={form.county} onChange={e => set('county', e.target.value)} placeholder="Garfield"/>
            </div>
          </div>
          <div>
            <label className="label">Legal description *</label>
            <textarea className="input resize-none" rows={3} value={form.legal_description}
              onChange={e => set('legal_description', e.target.value)}
              placeholder="e.g. Lots 1, 2, 5 & 6, NW/4 Section 28, T24N R7W of the Indian Meridian"/>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Township</label>
              <input className="input" value={form.township ?? ''} onChange={e => set('township', e.target.value)} placeholder="24N"/>
            </div>
            <div>
              <label className="label">Range</label>
              <input className="input" value={form.range ?? ''} onChange={e => set('range', e.target.value)} placeholder="7W"/>
            </div>
            <div>
              <label className="label">Section</label>
              <input className="input" value={form.section ?? ''} onChange={e => set('section', e.target.value)} placeholder="28"/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Latitude (optional)</label>
              <input className="input" type="number" step="any" value={form.latitude ?? ''}
                onChange={e => set('latitude', parseFloat(e.target.value))}/>
            </div>
            <div>
              <label className="label">Longitude (optional)</label>
              <input className="input" type="number" step="any" value={form.longitude ?? ''}
                onChange={e => set('longitude', parseFloat(e.target.value))}/>
            </div>
          </div>
        </div>
      )}

      {tab === 'seller' && (
        <div className="card p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800">
            This information is never shown publicly. It's for your reference only.
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Seller name</label>
              <input className="input" value={form.seller_name ?? ''} onChange={e => set('seller_name', e.target.value)}/>
            </div>
            <div>
              <label className="label">Seller email</label>
              <input className="input" type="email" value={form.seller_email ?? ''} onChange={e => set('seller_email', e.target.value)}/>
            </div>
          </div>
          <div>
            <label className="label">Seller phone</label>
            <input className="input" type="tel" value={form.seller_phone ?? ''} onChange={e => set('seller_phone', e.target.value)}/>
          </div>
          <div>
            <label className="label">Internal notes</label>
            <textarea className="input resize-none" rows={4} value={form.internal_notes ?? ''}
              onChange={e => set('internal_notes', e.target.value)}
              placeholder="Title status, deal notes, commission details, etc."/>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6">
        <button onClick={() => save()} disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? 'Saving...' : 'Save'}
        </button>
        {form.status === 'draft' && (
          <button onClick={() => save('active')} disabled={saving} className="btn-secondary disabled:opacity-50">
            Save & publish
          </button>
        )}
        <button onClick={() => router.back()} className="btn-ghost">Cancel</button>
      </div>
    </div>
  )
}
