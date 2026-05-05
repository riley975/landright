'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CheckCircle } from 'lucide-react'

export default function OfferPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    state: '', county: '', acres: '',
    lease_status: '', formation: '', notes: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="max-w-xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-green-600"/>
          </div>
          <h1 className="font-serif text-3xl mb-3">We'll be in touch soon</h1>
          <p className="text-stone-500 leading-relaxed max-w-sm mx-auto">
            Thanks {form.name.split(' ')[0]}! We'll review your minerals and reach out within one business day with a valuation and offer.
          </p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl mb-2">Get your free mineral rights offer</h1>
          <p className="text-stone-500">No cost. No obligation. We call you within one business day.</p>
        </div>

        <div className="card p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Your name *</label>
                <input className="input" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="John Smith"/>
              </div>
              <div>
                <label className="label">Phone number *</label>
                <input className="input" type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="(555) 000-0000"/>
              </div>
            </div>

            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="john@email.com"/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">State *</label>
                <input className="input" required value={form.state} onChange={e => update('state', e.target.value)} placeholder="Oklahoma"/>
              </div>
              <div>
                <label className="label">County *</label>
                <input className="input" required value={form.county} onChange={e => update('county', e.target.value)} placeholder="Garfield"/>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Estimated acres</label>
                <input className="input" value={form.acres} onChange={e => update('acres', e.target.value)} placeholder="e.g. 160"/>
              </div>
              <div>
                <label className="label">Lease status</label>
                <select className="input" value={form.lease_status} onChange={e => update('lease_status', e.target.value)}>
                  <option value="">Not sure</option>
                  <option value="leased">Leased / producing</option>
                  <option value="unleased">Unleased</option>
                  <option value="hbp">Held by production</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Formation or basin (if known)</label>
              <input className="input" value={form.formation} onChange={e => update('formation', e.target.value)} placeholder="e.g. STACK, Permian, Woodford"/>
            </div>

            <div>
              <label className="label">Anything else we should know?</label>
              <textarea className="input resize-none" rows={3} value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Legal description, current operator, royalty rate, etc."/>
            </div>

            <button type="submit" disabled={saving} className="btn-primary w-full text-center text-base py-4 disabled:opacity-50">
              {saving ? 'Submitting...' : 'Get my free offer →'}
            </button>

            <p className="text-xs text-stone-400 text-center">No cost · No obligation · We never share your information</p>
          </form>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center text-xs text-stone-400">
          {['Free to submit', 'No obligation to sell', 'Response within 1 business day'].map(t => (
            <div key={t} className="flex flex-col items-center gap-1.5">
              <CheckCircle size={14} className="text-green-600"/>
              {t}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
