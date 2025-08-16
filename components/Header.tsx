import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-charcoal-dark border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent-green rounded-full"></div>
              <span className="text-lg sm:text-xl font-bold text-white">FINDSDAY</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/directory" className="text-gray-300 hover:text-accent-green transition-colors font-medium">
              Directory
            </Link>
            <Link href="/admin" className="text-gray-300 hover:text-accent-green transition-colors font-medium">
              Admin
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/directory"
              className="md:hidden text-gray-300 hover:text-accent-green transition-colors font-medium text-sm"
            >
              Directory
            </Link>
            <button className="bg-accent-pink text-charcoal font-bold py-1.5 sm:py-2 px-3 sm:px-4 uppercase tracking-widest text-xs hover:bg-accent-pink/80 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
