import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Plane, Users, DollarSign, CheckCircle } from 'lucide-react';

interface Aircraft {
  name: string;
  passengers: number;
  rate: string;
  capabilities: string[];
  idealFor: string;
  safety: string;
  description: string;
}

const fleet: Aircraft[] = [
  {
    name: 'Cessna 206 Stationair',
    passengers: 5,
    rate: '$350/hr',
    capabilities: ['Bush landing capable', 'Floats available', 'Cargo pod option', 'Short field takeoff/landing'],
    idealFor: 'Point-to-point charters, lodge access, fishing trips, scenic flights',
    safety: 'Dual nav/com radios, GPS, ELT, survival gear, 100-hour inspections',
    description: 'The versatile workhorse of Alaska bush aviation. Reliable, capable, and at home on gravel strips, grass, and float operations. Perfect for small groups accessing remote Alaska.',
  },
  {
    name: 'DHC-2 Beaver',
    passengers: 6,
    rate: '$500/hr',
    capabilities: ['Float/wheel/ski configurations', 'Legendary STOL performance', 'Heavy cargo capacity', 'Operates from water, snow, or gravel'],
    idealFor: 'Remote lake access, float flying, heavy gear transport, hunting/fishing charters',
    safety: 'Dual ignition, robust airframe, ELT, survival kit, float compartments',
    description: 'The legendary bush plane. No aircraft in history has opened more of Alaska than the de Havilland Beaver. Unmatched short-field performance and the ability to land virtually anywhere.',
  },
  {
    name: 'King Air 350',
    passengers: 8,
    rate: '$1,200/hr',
    capabilities: ['Pressurized cabin', 'All-weather capable', 'Twin turboprop reliability', 'Long range (1,800 nm)'],
    idealFor: 'Premium charters, longer routes, corporate travel, medical transport',
    safety: 'Dual everything, TCAS, weather radar, de-ice systems, pressurized to 28,000 ft',
    description: 'Premium pressurized comfort for longer routes. Flies above most weather with advanced avionics, comfortable seating, and twin-engine reliability. The gold standard for Alaska charter.',
  },
  {
    name: 'Cessna 208 Caravan',
    passengers: 9,
    rate: '$650/hr',
    capabilities: ['Cargo + passenger configuration', 'Floats available', 'Turbine reliability', 'Large cabin door for gear'],
    idealFor: 'Group charters, cargo hauling, mixed passenger/freight, village runs',
    safety: 'Turbine engine, dual GPS, TAWS, ELT, large survival kit',
    description: 'The turbine-powered hauler of Alaska. Carries passengers and cargo with equal ease. A single PT6 turboprop gives reliable all-weather performance on wheels or floats.',
  },
  {
    name: 'Piper PA-18 Super Cub',
    passengers: 1,
    rate: '$250/hr',
    capabilities: ['Backcountry specialist', 'Tundra tires or floats', 'Lands on sandbars and ridges', 'Extremely short takeoff'],
    idealFor: 'Solo backcountry drops, hunting access, ridge landings, scenic adventure flights',
    safety: 'Robust steel tube frame, ELT, survival gear, low stall speed',
    description: 'The ultimate backcountry machine. If there\'s a flat spot, a Super Cub can land on it. Perfect for solo adventurers heading deep into the Alaska wilderness.',
  },
];

export default function Fleet() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-900/30 text-sky-400 px-4 py-2 rounded-full mb-4">
            <Plane className="w-4 h-4" /> Our Fleet
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Aircraft</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From legendary bush planes to pressurized turboprops. These are the aircraft types our pilots fly — actual aircraft vary by pilot and mission.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          {fleet.map((aircraft) => (
            <div key={aircraft.name} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-sky-900/20 to-slate-800 flex items-center justify-center p-8">
                  <Plane className="w-24 h-24 text-sky-400/30" />
                </div>
                <div className="md:w-2/3 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold">{aircraft.name}</h2>
                    <span className="flex items-center gap-1 text-sm bg-sky-900/40 text-sky-400 px-3 py-1 rounded-full">
                      <Users className="w-3 h-3" /> {aircraft.passengers} pax
                    </span>
                    <span className="flex items-center gap-1 text-sm bg-emerald-900/40 text-emerald-400 px-3 py-1 rounded-full">
                      <DollarSign className="w-3 h-3" /> {aircraft.rate}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{aircraft.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-300 mb-2">Capabilities</h3>
                      <ul className="space-y-1">
                        {aircraft.capabilities.map((cap) => (
                          <li key={cap} className="flex items-center gap-2 text-sm text-slate-400">
                            <CheckCircle className="w-3 h-3 text-sky-400 shrink-0" /> {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-300 mb-2">Ideal Missions</h3>
                      <p className="text-sm text-slate-400">{aircraft.idealFor}</p>
                      <h3 className="text-sm font-semibold text-slate-300 mt-3 mb-2">Safety Equipment</h3>
                      <p className="text-sm text-slate-400">{aircraft.safety}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
