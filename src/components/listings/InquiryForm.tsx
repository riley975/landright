'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function InquiryForm({ listingId, listingTitle }: { listingId: string; listingTitle: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.from('buyer_inquiries').insert({
      listing_id: listingId,
      ...form,
    } as any)
    setStatus(error ? 'error' : 'success')
  }

  if (status === 'success') {
    return (
      <div className="bg-sage-light border border-sage/20 rounded-xl p-5 text-center">
        <div className="text-sage text-2xl mb-2">✓</div>
        <h3 className="font-medium text-ink mb-1">We'll be in touch shortly</h3>
        <p className="text-sm text-ink/60">We typically respond within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Full name *</label>
          <input className="input" required value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
        </div>
        <div>
          <label className="label">Email *</label>
          <input className="input" type="email" required value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Phone</label>
          <input className="input" type="tel" value={form.phone}
            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
        </div>
        <div>
          <label className="label">Company</label>
          <input className="input" value={form.company}
            onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
        </div>
      </div>
      <div>
        <label className="label">Message</label>
        <textarea className="input resize-none" rows={3} value={form.message}
          placeholder={`I'm interested in ${listingTitle}...`}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
      </div>
      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center">
        {status === 'loading' ? 'Sending...' : 'Request more information'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-600 text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
