import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="bg-stone-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link href="/" className="font-serif text-xl text-green-300">WeBuyMinerals</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/buyers" className="text-white/60 hover:text-white transition-colors hidden sm:block">
            Are you a buyer?
          </Link>
          <Link href="/offer" className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Get free offer
          </Link>
        </div>
      </div>
    </header>
  )
}
