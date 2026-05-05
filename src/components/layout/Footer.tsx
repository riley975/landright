export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <div className="font-serif text-lg text-green-300 mb-2">WeBuyMinerals</div>
          <p className="text-sm text-white/40 max-w-xs">We buy mineral rights nationwide. Fast, fair, no hassle.</p>
        </div>
        <div className="text-sm text-white/40 space-y-1">
          <p>© {new Date().getFullYear()} WeBuyMinerals. All rights reserved.</p>
          <p>Not a licensed broker-dealer. All transactions brokered independently.</p>
        </div>
      </div>
    </footer>
  )
}
