import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-charcoal-dark border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Placeholder for logo/icon */}
            <div className="w-8 h-8 bg-accent-green rounded-full"></div>
            <span className="text-xl font-bold text-white">UX TOOLS</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="#" className="text-gray-400 font-medium hover:text-accent-green transition-colors">DESIGN TOOLS</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-accent-green transition-colors">RESOURCES</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-accent-green transition-colors">ARTICLES</Link></li>
              <li>
                <button className="bg-accent-pink text-charcoal font-bold py-2 px-4 uppercase tracking-widest text-xs hover:bg-accent-pink/80 transition-colors">
                  Subscribe
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
