'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CheckCircle } from 'lucide-react'

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwOTOobg7QeYVIY6xlI_IpTzwupmp74SC5VRtq06YL7ALbRLtElSu3G36ynFYrdkYqt/exec'
const BASINS = ['Permian Basin','STACK / SCOOP','Eagle Ford','Bakken','Marcellus / Utica','DJ Basin','Haynesville','Midcontinent','Anadarko','All / No preference']

export default function BuyersPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    basins: [] as string[],
    min_acres: '', max_budget: '',
    lease_status: '', notes: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const toggleBasin = (b: string) => {
    setForm(p => ({
      ...p,
      basins: p.basins.includes(b) ? p.basins.filter(x => x !== b) : [...p.basins, b]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, basins: form.basins.join(', '), type: 'BUYER' }),
      })
    } catch (e) {}
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
          <h1 className="font-serif text-3xl mb-3">You're registered</h1>
          <p className="text-stone-500 leading-relaxed max-w-sm mx-auto">
            Thanks {form.name.split(' ')[0]}! We'll reach out when we have deals matching your criteria.
          </p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <section className="bg-stone-900 text-white py-14 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-4xl mb-4">Register as a mineral rights buyer</h1>
          <p className="text-white/55 text-lg leading-relaxed">
            Tell us what you're looking for and we'll bring deals directly to you — before they hit the open market.
          </p>
        </div>
      </section>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="card p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Full name *</label>
                <input className="input" required value={form.name} onChange={e => update('name', e.target.value)}/>
              </div>
              <div>
                <label className="label">Email *</label>
                <input className="input" type="email" required value={form.email} onChange={e => update('email', e.target.value)}/>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Phone</label>
                <input className="input" type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}/>
              </div>
              <div>
                <label className="label">Company / fund</label>
                <input className="input" value={form.company} onChange={e => update('company', e.target.value)}/>
              </div>
            </div>

            <div>
              <label className="label">Basins of interest</label>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {BASINS.map(b => (
                  <button type="button" key={b} onClick={() => toggleBasin(b)}
                    className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
                      form.basins.includes(b)
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                    }`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Minimum acreage</label>
                <input className="input" value={form.min_acres} onChange={e => update('min_acres', e.target.value)} placeholder="e.g. 20 NMA"/>
              </div>
              <div>
                <label className="label">Max budget</label>
                <input className="input" value={form.max_budget} onChange={e => update('max_budget', e.target.value)} placeholder="e.g. $500,000"/>
              </div>
            </div>

            <div>
              <label className="label">Lease preference</label>
              <select className="input" value={form.lease_status} onChange={e => update('lease_status', e.target.value)}>
                <option value="">No preference</option>
                <option value="producing">Producing / leased</option>
                <option value="unleased">Unleased</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div>
              <label className="label">Anything else?</label>
              <textarea className="input resize-none" rows={3} value={form.notes}
                placeholder="Specific counties, formations, deal size, structure preferences..."
                onChange={e => update('notes', e.target.value)}/>
            </div>

            <button type="submit" disabled={saving} className="btn-primary w-full text-center text-base py-4 disabled:opacity-50">
              {saving ? 'Submitting...' : 'Register as a buyer →'}
            </button>

            <p className="text-xs text-stone-400 text-center">Free to register · We never share your info · Unsubscribe anytime</p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
