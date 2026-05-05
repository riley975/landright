import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="bg-stone-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link href="/" className="font-serif text-xl text-green-300">WeBuyMinerals</Link>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <Link href="/#how-it-works" className="hover:text-white transition-colors hidden sm:block">How it works</Link>
          <Link href="/offer" className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Get free offer
          </Link>
        </div>
      </div>
    </header>
  )
}
