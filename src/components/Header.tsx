import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/routes', label: 'Routes & Destinations' },
    { to: '/fleet', label: 'Fleet' },
    { to: '/weather', label: 'Weather' },
    { to: '/safety', label: 'Safety' },
    { to: '/book', label: 'Book a Flight' },
    { to: '/pilot/register', label: 'For Pilots' },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Plane className="w-7 h-7 text-sky-400" />
            <span className="text-xl font-bold text-white tracking-wide">JUNEAU AIR</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/book"
              className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Book Now
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 pb-4">
          <div className="max-w-7xl mx-auto px-4 space-y-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setMobileOpen(false)}
              className="block mt-2 bg-sky-600 hover:bg-sky-500 text-white text-center px-5 py-2.5 rounded-lg font-semibold transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
