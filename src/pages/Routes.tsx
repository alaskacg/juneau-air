import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Plane, Clock, DollarSign, MapPin, Mountain } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface LocationCoord {
  name: string;
  icao: string;
  lat: number;
  lng: number;
}

const locations: LocationCoord[] = [
  { name: 'Juneau', icao: 'PAJN', lat: 58.3550, lng: -134.5764 },
  { name: 'Glacier Bay', icao: 'PAGS', lat: 58.4568, lng: -135.7073 },
  { name: 'Skagway', icao: 'PAGY', lat: 59.4601, lng: -135.3164 },
  { name: 'Haines', icao: 'PAHN', lat: 59.2438, lng: -135.5244 },
  { name: 'Sitka', icao: 'PASI', lat: 57.0471, lng: -135.3614 },
  { name: 'Ketchikan', icao: 'PAKT', lat: 55.3556, lng: -131.7139 },
  { name: 'Wrangell', icao: 'PAWG', lat: 56.4843, lng: -132.3698 },
  { name: 'Petersburg', icao: 'PAPG', lat: 56.8017, lng: -132.9453 },
  { name: 'Yakutat', icao: 'PAYA', lat: 59.5033, lng: -139.6604 },
  { name: 'Cordova', icao: 'PACV', lat: 60.4916, lng: -145.4776 },
  { name: 'Valdez', icao: 'PAVD', lat: 61.1339, lng: -146.2483 },
  { name: 'Anchorage', icao: 'PANC', lat: 61.1743, lng: -149.9963 },
  { name: 'Palmer', icao: 'PAAQ', lat: 61.5949, lng: -149.0886 },
  { name: 'Wasilla', icao: 'PAWS', lat: 61.5717, lng: -149.5403 },
  { name: 'Talkeetna', icao: 'PATK', lat: 62.3205, lng: -150.0937 },
  { name: 'Denali/Healy', icao: 'PAHV', lat: 63.8622, lng: -148.9689 },
  { name: 'Kodiak', icao: 'PADQ', lat: 57.7500, lng: -152.4938 },
  { name: 'Homer', icao: 'PAHO', lat: 59.6456, lng: -151.4767 },
];

function getCoord(name: string): [number, number] {
  const loc = locations.find((l) => l.name === name);
  return loc ? [loc.lat, loc.lng] : [0, 0];
}

interface RouteInfo {
  from: string;
  to: string;
  price: string;
  duration: string;
  aircraft: string;
  highlights: string;
}

const routes: RouteInfo[] = [
  { from: 'Juneau', to: 'Glacier Bay', price: '$350/person', duration: '45 min', aircraft: 'Cessna 206 / Beaver', highlights: 'Glacier calving, whale watching, Fairweather Range views' },
  { from: 'Juneau', to: 'Skagway', price: '$275/person', duration: '35 min', aircraft: 'Cessna 206', highlights: 'Lynn Canal, Chilkat Mountains, historic gold rush town' },
  { from: 'Juneau', to: 'Haines', price: '$250/person', duration: '30 min', aircraft: 'Cessna 206', highlights: 'Eagle preserve, Chilkat River valley, mountain panoramas' },
  { from: 'Juneau', to: 'Sitka', price: '$400/person', duration: '55 min', aircraft: 'Cessna 206 / Caravan', highlights: 'Baranof Island, Mt. Edgecumbe volcano, island-hopping' },
  { from: 'Anchorage', to: 'Denali/Healy', price: '$500/person', duration: '1 hr', aircraft: 'King Air 350 / Caravan', highlights: 'Denali (20,310 ft), Alaska Range, Ruth Glacier amphitheater' },
  { from: 'Anchorage', to: 'Valdez', price: '$450/person', duration: '50 min', aircraft: 'Cessna 206 / Caravan', highlights: 'Chugach Mountains, Thompson Pass, Prince William Sound' },
  { from: 'Anchorage', to: 'Homer', price: '$375/person', duration: '45 min', aircraft: 'Cessna 206', highlights: 'Cook Inlet, Kenai Mountains, Kachemak Bay' },
  { from: 'Cordova', to: 'Valdez', price: '$200/person', duration: '25 min', aircraft: 'Cessna 206 / Beaver', highlights: 'Prince William Sound, Copper River Delta, glaciers' },
];

export default function Routes() {
  const center: [number, number] = [60.5, -143];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-900/30 text-sky-400 px-4 py-2 rounded-full mb-4">
            <MapPin className="w-4 h-4" /> Routes & Destinations
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Where We Fly</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            18 destinations across Southeast Alaska and the Chugach region. From glacier landings to remote lodge access.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden border border-slate-800 h-[500px]">
            <MapContainer center={center} zoom={5} className="h-full w-full" scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((loc) => (
                <Marker key={loc.icao} position={[loc.lat, loc.lng]}>
                  <Popup>
                    <strong>{loc.name}</strong><br />{loc.icao}
                  </Popup>
                </Marker>
              ))}
              {routes.map((r) => (
                <Polyline
                  key={`${r.from}-${r.to}`}
                  positions={[getCoord(r.from), getCoord(r.to)]}
                  color="#0ea5e9"
                  weight={2}
                  opacity={0.6}
                  dashArray="6 4"
                />
              ))}
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Route Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routes.map((route) => (
              <div key={`${route.from}-${route.to}`} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sky-400 font-bold">{route.from}</span>
                  <Plane className="w-4 h-4 text-slate-500" />
                  <span className="text-emerald-400 font-bold">{route.to}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {route.duration}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {route.price}</span>
                  <span className="flex items-center gap-1"><Plane className="w-3 h-3" /> {route.aircraft}</span>
                </div>
                <div className="flex items-start gap-1 text-sm text-slate-400 mb-4">
                  <Mountain className="w-3 h-3 shrink-0 mt-1" />
                  <span>{route.highlights}</span>
                </div>
                <Link
                  to="/book"
                  className="block text-center bg-sky-600 hover:bg-sky-500 py-2.5 rounded-xl text-sm font-semibold transition"
                >
                  Book This Route
                </Link>
              </div>
            ))}

            {/* Custom Routes */}
            <div className="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <Plane className="w-12 h-12 text-slate-600 mb-3" />
              <h3 className="text-lg font-bold mb-2">Custom Routes</h3>
              <p className="text-sm text-slate-400 mb-4">
                Need a route not listed? We fly anywhere in Alaska. Contact us for a custom quote.
              </p>
              <Link to="/contact" className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-6 py-2.5 rounded-xl text-sm font-semibold transition">
                Contact for Pricing
              </Link>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-6 text-center">
            Prices are base estimates per person. Final price depends on aircraft type, passenger count, and route specifics.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
