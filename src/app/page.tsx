import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CheckCircle, Clock, DollarSign, Phone } from 'lucide-react'

export const revalidate = 0

const STATES = ['Oklahoma','Texas','North Dakota','New Mexico','Colorado','Wyoming','Montana','Kansas','Louisiana','West Virginia','Pennsylvania','Ohio','Utah','Mississippi','Alabama','Arkansas','Michigan']

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <p className="text-green-400 text-xs font-medium uppercase tracking-widest mb-4">Mineral rights buyers — all 50 states</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
            We buy mineral rights.<br/>
            <em className="text-green-300">Get your free offer today.</em>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            We have active buyers ready right now. No cost, no obligation — just a fast, fair offer on your oil and gas minerals.
          </p>
          <Link href="/offer" className="btn-primary text-base px-10 py-4 inline-block">
            Get my free offer →
          </Link>
          <p className="text-white/30 text-xs mt-4">Takes 2 minutes · No obligation · We call you</p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-center gap-8 text-sm">
          {['No cost to you', 'Fast closings', 'Active buyers in all 50 states', 'Free valuation'].map(t => (
            <div key={t} className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-300"/>
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif text-3xl text-center mb-12">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Phone, n: '01', title: 'Tell us what you own', body: 'Fill out our simple form. Takes 2 minutes. Just your location and a rough idea of what you have.' },
            { icon: DollarSign, n: '02', title: 'We get you an offer', body: 'We review your minerals, check production data and nearby activity, and bring you a real offer from our buyer network.' },
            { icon: Clock, n: '03', title: 'You choose', body: 'No pressure, no obligation. If you like the offer, we handle everything. You just collect the check.' },
          ].map(({ icon: Icon, n, title, body }) => (
            <div key={n} className="text-center">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon size={22} className="text-green-700"/>
              </div>
              <h3 className="font-medium text-lg mb-2">{title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-serif text-3xl text-center mb-10">Why mineral owners choose us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'We have ready buyers', body: 'We work with an active network of qualified mineral buyers across the country. When you submit your info, we already have people looking.' },
              { title: 'No cost to you — ever', body: 'Our fee comes from the buyer, not you. Getting an offer costs you nothing, and there\'s zero obligation to accept.' },
              { title: 'We do all the work', body: 'Title review, paperwork, closing coordination — we handle it all. You don\'t need a lawyer or a landman. We\'ve got it covered.' },
              { title: 'Fast, fair offers', body: 'Most sellers get an offer within a few business days. We use real production data and comparable sales — no lowball offers.' },
              { title: 'You stay in control', body: 'We work for you. If an offer doesn\'t meet your number, we keep working. No pressure, no deadlines, no games.' },
              { title: 'We know minerals', body: 'From the Permian to the STACK to the Bakken — we know these plays and can tell you exactly what your acreage is worth in today\'s market.' },
            ].map(({ title, body }) => (
              <div key={title} className="card p-5 flex gap-4">
                <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0"/>
                <div>
                  <h3 className="font-medium mb-1">{title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* States */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-serif text-3xl mb-4">We buy minerals in all 50 states</h2>
        <p className="text-stone-500 mb-8">Active buyers in every major producing basin</p>
        <div className="flex flex-wrap justify-center gap-2">
          {STATES.map(s => (
            <span key={s} className="text-xs bg-stone-100 text-stone-600 border border-stone-200 px-3 py-1.5 rounded-full">
              {s}
            </span>
          ))}
          <span className="text-xs bg-stone-100 text-stone-600 border border-stone-200 px-3 py-1.5 rounded-full">+ all others</span>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="font-serif text-3xl mb-4">Ready to find out what your minerals are worth?</h2>
          <p className="text-white/55 mb-8">Free. No obligation. We call you within one business day.</p>
          <Link href="/offer" className="btn-primary text-base px-10 py-4 inline-block">
            Get my free offer →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
