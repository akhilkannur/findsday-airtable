export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#A052DE] rounded-full"></div>
            <span className="text-xl font-bold text-[#A052DE] font-serif">Findsday</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-[#A052DE] font-medium hover:text-purple-700">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#A052DE]">Archive</a></li>
              <li><a href="/admin" className="text-gray-600 hover:text-[#A052DE]">Admin</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
