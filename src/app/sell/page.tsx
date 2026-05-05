'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CheckCircle } from 'lucide-react'

const STEPS = ['Your minerals', 'Contact info', 'Done']

export default function SellPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    state: '', county: '', legal_description: '', acres: '',
    lease_status: '', formation: '', notes: '',
    name: '', email: '', phone: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async () => {
    await fetch('/api/valuation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="w-14 h-14 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={24} className="text-sage"/>
          </div>
          <h1 className="font-serif text-3xl mb-3">We'll be in touch</h1>
          <p className="text-ink/60 leading-relaxed max-w-sm mx-auto">
            Thank you, {form.name.split(' ')[0]}. We'll review your minerals and reach out within one business day with a valuation estimate.
          </p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-10">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                  ${i < step ? 'bg-sage text-white' : i === step ? 'bg-gold text-white' : 'bg-ink/10 text-ink/40'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-sm ${i === step ? 'font-medium' : 'text-ink/40'}`}>{s}</span>
                {i < STEPS.length - 1 && <div className="w-8 h-px bg-ink/15 mx-1"/>}
              </div>
            ))}
          </div>

          <div className="card p-6 md:p-8">
            {step === 0 && (
              <>
                <h1 className="font-serif text-2xl mb-1">Tell us about your minerals</h1>
                <p className="text-sm text-ink/50 mb-6">We'll use this to prepare your free valuation estimate.</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">State *</label>
                      <input className="input" required value={form.state} onChange={e => update('state', e.target.value)} placeholder="Oklahoma"/>
                    </div>
                    <div>
                      <label className="label">County *</label>
                      <input className="input" required value={form.county} onChange={e => update('county', e.target.value)} placeholder="Garfield"/>
                    </div>
                  </div>
                  <div>
                    <label className="label">Legal description</label>
                    <textarea className="input resize-none" rows={3} value={form.legal_description}
                      onChange={e => update('legal_description', e.target.value)}
                      placeholder="e.g. NW/4 Section 28, T24N R7W of the Indian Meridian"/>
                    <p className="text-xs text-ink/40 mt-1">Found on your deed or tax statement. Best guess is fine.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Estimated net acres</label>
                      <input className="input" type="number" value={form.acres} onChange={e => update('acres', e.target.value)} placeholder="160"/>
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
                    <label className="label">Formation (if known)</label>
                    <input className="input" value={form.formation} onChange={e => update('formation', e.target.value)} placeholder="e.g. STACK, Woodford, Permian Basin"/>
                  </div>
                  <div>
                    <label className="label">Anything else we should know?</label>
                    <textarea className="input resize-none" rows={2} value={form.notes} onChange={e => update('notes', e.target.value)}/>
                  </div>
                </div>

                <button onClick={() => setStep(1)} disabled={!form.state || !form.county}
                  className="btn-primary mt-6 w-full justify-center disabled:opacity-50">
                  Continue →
                </button>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="font-serif text-2xl mb-1">How should we reach you?</h2>
                <p className="text-sm text-ink/50 mb-6">We'll send your valuation estimate to your email.</p>

                <div className="space-y-4">
                  <div>
                    <label className="label">Full name *</label>
                    <input className="input" required value={form.name} onChange={e => update('name', e.target.value)}/>
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input className="input" type="email" required value={form.email} onChange={e => update('email', e.target.value)}/>
                  </div>
                  <div>
                    <label className="label">Phone</label>
                    <input className="input" type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}/>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="btn-secondary">← Back</button>
                  <button onClick={handleSubmit} disabled={!form.name || !form.email}
                    className="btn-primary flex-1 justify-center disabled:opacity-50">
                    Submit for valuation
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Trust signals */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-ink/40">
            {['No cost to submit', 'No obligation to sell', 'Confidential & secure'].map(t => (
              <div key={t} className="flex flex-col items-center gap-1.5">
                <CheckCircle size={14} className="text-sage"/>
                {t}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FAQ */}
      <section id="faq" className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="font-serif text-2xl mb-6">Common questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How long does the process take?', a: 'Most transactions close within 30–60 days. Simple deals with clean title can close faster.' },
            { q: 'Is there any cost to list?', a: 'No. There is no upfront cost to list or receive a valuation. Our fee is earned when a deal closes.' },
            { q: 'How is my valuation determined?', a: 'We look at your lease status, current production, nearby well activity, comparable sales, and the specific formation and basin your minerals sit in.' },
            { q: 'What documents do I need?', a: "Ideally a deed or title, but we can work from a legal description. We'll guide you through it." },
          ].map(({ q, a }) => (
            <div key={q} className="card p-4">
              <h3 className="font-medium text-sm mb-1.5">{q}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
