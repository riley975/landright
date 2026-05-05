import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gold rounded-md flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                  <path d="M8 1L2 5v8l6 2 6-2V5L8 1zm0 2.2L12 6v5.5L8 13l-4-1.5V6l4-2.8z"/>
                </svg>
              </div>
              <span className="font-serif text-xl text-gold-light">Landright</span>
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              The mineral rights marketplace connecting owners with qualified buyers across 38 states.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-white/40 mb-3">Marketplace</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/listings" className="hover:text-white transition-colors">Browse listings</Link></li>
              <li><Link href="/sell" className="hover:text-white transition-colors">Sell minerals</Link></li>
              <li><Link href="/buyers" className="hover:text-white transition-colors">For buyers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-white/40 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/sell" className="hover:text-white transition-colors">Free valuation</Link></li>
              <li><Link href="/sell#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/sell#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Landright. All rights reserved.</p>
          <p>Landright is not a licensed broker-dealer. All transactions are brokered independently. Consult a qualified attorney for legal and title matters.</p>
        </div>
      </div>
    </footer>
  )
}
