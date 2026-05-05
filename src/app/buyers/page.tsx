'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CheckCircle, Bell, Map, Zap } from 'lucide-react'

const BASINS = ['Permian Basin','STACK / SCOOP','Eagle Ford','Bakken','Marcellus / Utica','DJ Basin / Niobrara','Haynesville','Midcontinent','Other']

export default function BuyersPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', basins: [] as string[], min_acres: '', max_budget: '', notes: '' })
  const [done, setDone] = useState(false)

  const toggleBasin = (b: string) => {
    setForm(p => ({ ...p, basins: p.basins.includes(b) ? p.basins.filter(x => x !== b) : [...p.basins, b] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/buyer-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setDone(true)
  }

  if (done) {
    return (
      <>
        <Navbar />
        <main className="max-w-xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="w-14 h-14 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={24} className="text-sage"/>
          </div>
          <h1 className="font-serif text-3xl mb-3">You're registered</h1>
          <p className="text-ink/60 max-w-sm mx-auto leading-relaxed">
            We'll send you new listings matching your criteria as they come available.
          </p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-ink text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-4xl mb-4">Find mineral rights <em className="text-gold-light">before anyone else</em></h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto mb-8">
            Register as a buyer to get new listings delivered to your inbox the moment they go live.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            {[
              [Bell, 'Instant listing alerts'],
              [Map, 'Filter by basin & state'],
              [Zap, 'Early access to off-market deals'],
            ].map(([Icon, text]) => (
              <div key={text as string} className="flex items-center gap-2">
                <Icon size={14} className="text-gold"/>
                {text as string}
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="card p-6 md:p-8">
          <h2 className="font-serif text-2xl mb-1">Register as a buyer</h2>
          <p className="text-sm text-ink/50 mb-6">Free. No obligation. Unsubscribe anytime.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Full name *</label>
                <input className="input" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}/>
              </div>
              <div>
                <label className="label">Email *</label>
                <input className="input" type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Phone</label>
                <input className="input" type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}/>
              </div>
              <div>
                <label className="label">Company / fund</label>
                <input className="input" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))}/>
              </div>
            </div>

            <div>
              <label className="label">Basins of interest</label>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {BASINS.map(b => (
                  <button type="button" key={b}
                    onClick={() => toggleBasin(b)}
                    className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
                      form.basins.includes(b)
                        ? 'bg-ink text-white border-ink'
                        : 'bg-white text-ink/60 border-ink/20 hover:border-ink/40'
                    }`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Min. acreage</label>
                <input className="input" type="number" placeholder="e.g. 20" value={form.min_acres}
                  onChange={e => setForm(p => ({ ...p, min_acres: e.target.value }))}/>
              </div>
              <div>
                <label className="label">Max budget</label>
                <input className="input" placeholder="e.g. $500,000" value={form.max_budget}
                  onChange={e => setForm(p => ({ ...p, max_budget: e.target.value }))}/>
              </div>
            </div>

            <div>
              <label className="label">Anything else?</label>
              <textarea className="input resize-none" rows={2} value={form.notes}
                placeholder="Specific counties, formations, or deal criteria..."
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}/>
            </div>

            <button type="submit" className="btn-primary w-full justify-center">
              Register as a buyer
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
