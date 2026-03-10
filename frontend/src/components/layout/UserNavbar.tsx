import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-primary font-bold text-xl tracking-tight">
            Crown Cutz
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-slate-600 hover:text-primary font-medium transition">Home</Link>
          <Link to="/services" className="text-slate-600 hover:text-primary font-medium transition">Services</Link>
          <Link to="/queue" className="text-slate-600 hover:text-primary font-medium transition">Live Queue</Link>
          <Link to="/booking" className="bg-primary text-white px-5 py-2.5 rounded-md font-semibold hover:opacity-90 transition shadow-sm">
            Book Now
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900 p-2">
            <Icon icon={isMenuOpen ? "lucide:x" : "lucide:menu"} width="24" />
          </button>
        </div>
      </nav>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-4">
          <Link to="/" className="block text-slate-600 font-medium">Home</Link>
          <Link to="/services" className="block text-slate-600 font-medium">Services</Link>
          <Link to="/queue" className="block text-slate-600 font-medium">Live Queue</Link>
          <Link to="/booking" className="block bg-primary text-white px-5 py-2.5 rounded-md font-semibold text-center">
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}