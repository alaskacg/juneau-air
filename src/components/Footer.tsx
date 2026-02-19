import { Link } from 'react-router-dom';
import { Plane, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-6 h-6 text-sky-400" />
              <span className="text-lg font-bold text-white">JUNEAU AIR</span>
            </div>
            <p className="text-sm mb-4">
              Alaska's premier bush aviation booking platform. Connecting passengers with trusted bush pilots across Southeast Alaska and the Chugach.
            </p>
            <p className="text-xs text-slate-500">FAA Part 135 Certified Operations</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/routes" className="hover:text-white transition-colors">Routes & Destinations</Link></li>
              <li><Link to="/fleet" className="hover:text-white transition-colors">Fleet</Link></li>
              <li><Link to="/weather" className="hover:text-white transition-colors">Weather Dashboard</Link></li>
              <li><Link to="/safety" className="hover:text-white transition-colors">Safety</Link></li>
              <li><Link to="/book" className="hover:text-white transition-colors">Book a Flight</Link></li>
              <li><Link to="/pilot/register" className="hover:text-white transition-colors">Pilot Registration</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/cancellation-policy" className="hover:text-white transition-colors">Cancellation Policy</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
            <h3 className="text-white font-semibold mt-6 mb-3">Sister Sites</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://akguidesearch.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">AK Guide Search</a></li>
              <li><a href="https://alaskadronesurvey.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Alaska Drone Survey</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="tel:+15103455439" className="hover:text-white transition-colors">(510) 345-5439</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:fly@juneauair.com" className="hover:text-white transition-colors">fly@juneauair.com</a>
              </li>
            </ul>
            <h4 className="text-white font-semibold mt-5 mb-2 text-sm">Emergency</h4>
            <ul className="space-y-1 text-xs">
              <li>Alaska State Troopers: 911</li>
              <li>USCG Juneau: (907) 463-2000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-500">
          <p>© 2026 Juneau Air. Part of Alaska Consulting Group.</p>
        </div>
      </div>
    </footer>
  );
}
