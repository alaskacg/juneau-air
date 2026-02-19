import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin, Calendar, Users, Shield, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const popularRoutes = [
  { from: 'Juneau', to: 'Glacier Bay', duration: '45 min', price: '$350', desc: 'Fly over stunning glaciers and pristine wilderness' },
  { from: 'Anchorage', to: 'Denali', duration: '1h 15m', price: '$550', desc: 'See North America\'s tallest peak from above' },
  { from: 'Fairbanks', to: 'Arctic Village', duration: '1h 30m', price: '$650', desc: 'Cross the Arctic Circle into true wilderness' },
  { from: 'Juneau', to: 'Skagway', duration: '30 min', price: '$275', desc: 'The scenic Lynn Canal route in minutes' },
  { from: 'Anchorage', to: 'Homer', duration: '50 min', price: '$400', desc: 'Cook Inlet views and Kenai Peninsula beauty' },
  { from: 'Fairbanks', to: 'Deadhorse', duration: '2h 30m', price: '$950', desc: 'Fly the Dalton Highway corridor to the Arctic Ocean' },
];

const fleet = [
  { name: 'Cessna 206 Stationair', type: 'Single Engine', passengers: '5', range: '800 nm', desc: 'Versatile workhorse perfect for bush strips and backcountry operations. Float and wheel configurations available.', features: ['Bush-equipped wheels/floats', 'Cargo pod available', 'Short field capable'] },
  { name: 'DHC-2 Beaver', type: 'Single Engine', passengers: '6', range: '455 nm', desc: 'The legendary bush plane. Unmatched short-field performance and the ability to land virtually anywhere in Alaska.', features: ['Float & ski equipped', 'Legendary STOL performance', 'Heavy cargo capacity'] },
  { name: 'King Air 350', type: 'Twin Turboprop', passengers: '9', range: '1,800 nm', desc: 'Premium pressurized cabin for longer routes. All-weather capability with advanced avionics and comfortable seating.', features: ['Pressurized cabin', 'All-weather capable', 'Premium comfort'] },
];

const safetyFeatures = [
  { title: 'FAA Part 135 Certified', desc: 'All charter operations conducted under FAA Part 135 air carrier certificate.' },
  { title: 'Experienced Bush Pilots', desc: 'Minimum 5,000 hours Alaska flying experience. Average 12,000 hours per pilot.' },
  { title: 'Weather Intelligence', desc: 'Real-time weather monitoring with automated go/no-go flight safety protocols.' },
  { title: 'Aircraft Maintenance', desc: 'FAA-certified maintenance facility with 100-hour inspections exceeding requirements.' },
  { title: 'Satellite Tracking', desc: 'Real-time satellite position reporting on every flight for complete peace of mind.' },
  { title: 'Insurance Coverage', desc: 'Full passenger liability coverage. $5M per occurrence with no deductible.' },
];

const testimonials = [
  { quote: "The Glacier Bay flight was the highlight of our entire Alaska trip. Our pilot knew every glacier by name.", author: "Sarah M.", route: "Juneau → Glacier Bay" },
  { quote: "Needed to get gear to a remote hunting camp. Juneau Air made it happen safely with a Beaver on floats.", author: "Mark T.", route: "Fairbanks → Remote Camp" },
  { quote: "Professional from booking to landing. The King Air was comfortable and our pilot handled weather changes expertly.", author: "Jennifer L.", route: "Anchorage → Denali" },
];

const locations = [
  'Juneau', 'Anchorage', 'Fairbanks', 'Glacier Bay', 'Denali', 'Homer',
  'Skagway', 'Haines', 'Sitka', 'Ketchikan', 'Kodiak', 'Valdez',
  'Arctic Village', 'Deadhorse', 'Bethel', 'Nome', 'Barrow', 'King Salmon',
];

export default function Home() {
  const [fromLoc, setFromLoc] = useState('');
  const [toLoc, setToLoc] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      {/* Hero */}
      <section className="relative py-24 md:py-36 bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Plane className="w-10 h-10 text-sky-400" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Juneau Air
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-slate-300 mb-4">Bush Charter Flights Across Alaska</p>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Book experienced bush pilots and legendary aircraft for charter flights anywhere in Alaska. Licensed, insured, and ready to fly.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sky-400" /> FAA Part 135 Certified</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sky-400" /> 50+ Experienced Pilots</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sky-400" /> From $350/hour</span>
          </div>
        </div>
      </section>

      {/* Flight Search */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Search Available Flights</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                    <MapPin className="w-4 h-4" /> From
                  </label>
                  <select value={fromLoc} onChange={(e) => setFromLoc(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500">
                    <option value="">Select departure</option>
                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                    <MapPin className="w-4 h-4" /> To
                  </label>
                  <select value={toLoc} onChange={(e) => setToLoc(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500">
                    <option value="">Select destination</option>
                    {locations.filter(l => l !== fromLoc).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                    <Calendar className="w-4 h-4" /> Date
                  </label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                    <Users className="w-4 h-4" /> Passengers
                  </label>
                  <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => <option key={n} value={n}>{n} {n === 1 ? 'passenger' : 'passengers'}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 py-4 rounded-xl font-semibold transition text-lg flex items-center justify-center gap-2">
                <Plane className="w-5 h-5" /> Search Available Flights
              </button>
              <p className="text-center text-xs text-slate-500">Base rate from $350/hour · 5% platform fee · 95% goes directly to your pilot</p>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Popular Routes</h2>
          <p className="text-slate-400 text-center mb-12">Most-booked flights across Alaska</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route) => (
              <div key={`${route.from}-${route.to}`} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition hover:-translate-y-1 group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sky-400 font-bold">{route.from}</span>
                  <Plane className="w-4 h-4 text-slate-500" />
                  <span className="text-emerald-400 font-bold">{route.to}</span>
                </div>
                <p className="text-sm text-slate-400 mb-4">{route.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm text-slate-400">
                    <span>⏱ {route.duration}</span>
                  </div>
                  <span className="text-xl font-bold text-sky-400">{route.price}</span>
                </div>
                <button onClick={() => { setFromLoc(route.from); setToLoc(route.to); }} className="mt-4 w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 py-2 rounded-xl text-sm font-medium transition">
                  Book This Route
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Fleet</h2>
          <p className="text-slate-400 text-center mb-12">Legendary bush planes and modern aircraft for every mission</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fleet.map((plane) => (
              <div key={plane.name} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition">
                <div className="h-48 bg-gradient-to-br from-sky-900/30 to-slate-800 flex items-center justify-center">
                  <Plane className="w-20 h-20 text-sky-400/30" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium bg-sky-900/50 text-sky-400 px-2 py-1 rounded-full">{plane.type}</span>
                  <h3 className="text-xl font-bold mt-3 mb-1">{plane.name}</h3>
                  <div className="flex gap-4 text-sm text-slate-400 mb-3">
                    <span>👤 {plane.passengers} pax</span>
                    <span>📏 {plane.range}</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">{plane.desc}</p>
                  <ul className="space-y-1">
                    {plane.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-3 h-3 text-sky-400 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-900/30 text-emerald-400 px-4 py-2 rounded-full mb-4">
              <Shield className="w-4 h-4" /> Safety First
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Safety Is Our Mission</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Every flight meets the highest standards of aviation safety</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyFeatures.map((item) => (
              <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="font-bold mb-2 text-emerald-400">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Charter Rates</h2>
          <p className="text-slate-400 text-center mb-12">Transparent pricing with no hidden fees</p>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
              <div>
                <p className="text-3xl font-bold text-sky-400">$350</p>
                <p className="text-sm text-slate-400">/hour — Cessna 206</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sky-400">$500</p>
                <p className="text-sm text-slate-400">/hour — DHC-2 Beaver</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sky-400">$1,200</p>
                <p className="text-sm text-slate-400">/hour — King Air 350</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
              <div className="bg-slate-800 rounded-xl p-4"><p className="text-slate-300 font-medium">Fuel included</p></div>
              <div className="bg-slate-800 rounded-xl p-4"><p className="text-slate-300 font-medium">Pilot included</p></div>
              <div className="bg-slate-800 rounded-xl p-4"><p className="text-slate-300 font-medium">Insurance included</p></div>
              <div className="bg-slate-800 rounded-xl p-4"><p className="text-slate-300 font-medium">No landing fees</p></div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-6">Minimum 1-hour booking · Custom quotes for multi-day charters · 5% platform fee supports our marketplace</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">What Passengers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex text-yellow-400 mb-3 text-sm">★★★★★</div>
                <p className="text-slate-300 italic mb-4">"{t.quote}"</p>
                <p className="font-semibold text-sm">{t.author}</p>
                <p className="text-xs text-slate-500">{t.route}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot Registration CTA */}
      <section className="py-20 bg-gradient-to-r from-sky-900 to-emerald-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Are You a Bush Pilot?</h2>
          <p className="text-xl text-slate-300 mb-8">Join our marketplace and fill your empty seats. Keep 95% of every booking.</p>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div><span className="text-3xl block mb-2">💰</span><span className="font-semibold">95% Pilot Payout</span><p className="text-xs text-slate-300 mt-1">Industry-leading commission</p></div>
              <div><span className="text-3xl block mb-2">📱</span><span className="font-semibold">Easy Dashboard</span><p className="text-xs text-slate-300 mt-1">Manage availability & bookings</p></div>
              <div><span className="text-3xl block mb-2">🛡️</span><span className="font-semibold">Stripe Payments</span><p className="text-xs text-slate-300 mt-1">Automatic secure payouts</p></div>
            </div>
          </div>
          <Link to="/pilot/register" className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition text-lg">
            Register as a Pilot
          </Link>
          <p className="text-sm text-slate-300 mt-3">Contact: fly@juneauair.com · (510) 345-5439</p>
        </div>
      </section>

      {/* Cross Promotion */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Complete Your Alaska Adventure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <a href="https://alaskadronesurvey.com" target="_blank" rel="noopener noreferrer" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-sky-600/50 transition text-center">
              <span className="text-3xl block mb-2">📸</span>
              <h3 className="font-bold text-sky-400">Alaska Drone Survey</h3>
              <p className="text-sm text-slate-400 mt-1">Aerial photography & mapping services</p>
            </a>
            <a href="https://akguidesearch.com" target="_blank" rel="noopener noreferrer" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-600/50 transition text-center">
              <span className="text-3xl block mb-2">🧭</span>
              <h3 className="font-bold text-emerald-400">AK Guide Search</h3>
              <p className="text-sm text-slate-400 mt-1">Find expert guides at your destination</p>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
