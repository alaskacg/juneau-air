import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Cloud, Plane, Eye, Radio, Heart, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';

export default function Safety() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-900/30 text-emerald-400 px-4 py-2 rounded-full mb-4">
            <Shield className="w-4 h-4" /> Safety First
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Safety at Juneau Air</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Every flight decision starts with safety. From pilot qualifications to real-time weather monitoring, we never compromise.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          {/* FAA Certification */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" /> FAA Part 135 Certification
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              All charter flights arranged through Juneau Air operate under FAA Part 135 air carrier certificates. This means every flight meets federal standards for commercial air transportation including crew qualifications, aircraft maintenance, and operational procedures.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-emerald-400">Part 135</p>
                <p className="text-xs text-slate-400">Air Carrier Certificate</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-emerald-400">Annual</p>
                <p className="text-xs text-slate-400">Safety Audits</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-emerald-400">100%</p>
                <p className="text-xs text-slate-400">Regulatory Compliance</p>
              </div>
            </div>
          </div>

          {/* Pilot Requirements */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-sky-400" /> Pilot Requirements
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              Every pilot on the Juneau Air platform meets or exceeds these minimum requirements:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Minimum 5,000 hours Alaska flying experience',
                'Valid FAA Commercial or ATP certificate',
                'Current FAA medical certificate',
                'IFR rating (instrument proficiency)',
                'Current liability insurance ($1M+ per seat)',
                'Current hull insurance ($250K+)',
                'Background check verified',
                'Admin-approved before first flight',
              ].map((req) => (
                <div key={req} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Decision Model */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-sky-400" /> Weather Decision Model
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              Juneau Air uses an automated GO/NO-GO system based on real-time NOAA METAR and TAF data. Conditions are checked at both departure and arrival airports before every flight.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-4 text-center">
                <p className="font-bold text-emerald-400">Ceiling ≥ 1,000 ft</p>
                <p className="text-xs text-slate-400">Minimum ceiling</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-4 text-center">
                <p className="font-bold text-emerald-400">Visibility ≥ 3 SM</p>
                <p className="text-xs text-slate-400">Minimum visibility</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-4 text-center">
                <p className="font-bold text-emerald-400">Wind ≤ 25 kt</p>
                <p className="text-xs text-slate-400">Max wind (incl. gusts)</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Pilot has final authority to cancel for safety at any time</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> No customer penalty for weather cancellations — full flight credit</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Icing conditions warning issued below 0°C with visible moisture</li>
            </ul>
            <Link to="/weather" className="inline-block mt-4 text-sky-400 hover:text-sky-300 text-sm font-semibold">
              View Live Weather Dashboard →
            </Link>
          </div>

          {/* Aircraft Safety */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-sky-400" /> Aircraft Safety
            </h2>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Annual inspections per FAA regulations</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> 100-hour inspections for all Part 135 aircraft</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Complete maintenance logs available for review</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Pilots verify aircraft airworthiness before every flight</li>
            </ul>
          </div>

          {/* GPS Tracking */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-400" /> GPS Flight Tracking
            </h2>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Real-time position tracking during every flight</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Takeoff and landing verification with GPS coordinates</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Landing photo documentation required for payment release</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Track your flight in real-time from your customer dashboard</li>
            </ul>
          </div>

          {/* Emergency Procedures */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Radio className="w-5 h-5 text-red-400" /> Emergency Procedures
            </h2>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> All aircraft equipped with ELT (Emergency Locator Transmitter)</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Survival gear carried on every flight (food, water, shelter, first aid)</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Float plan filed for all over-water operations</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Satellite communication devices on remote routes</li>
            </ul>
          </div>

          {/* Passenger Briefing */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-sky-400" /> Passenger Safety Briefing
            </h2>
            <p className="text-slate-400 text-sm mb-4">Before every flight, your pilot will brief you on:</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Seat belt operation and emergency exit locations</li>
              <li>• ELT location and activation procedure</li>
              <li>• Survival gear location and contents</li>
              <li>• Communication procedures and emergency frequencies</li>
              <li>• What to expect during the flight (turbulence, noise levels, route)</li>
            </ul>
          </div>

          {/* Insurance */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" /> Insurance Coverage
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              All pilots on the Juneau Air platform carry comprehensive insurance:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-2xl font-bold text-sky-400">$1M+</p>
                <p className="text-xs text-slate-400">Per-seat liability minimum</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-2xl font-bold text-sky-400">$250K+</p>
                <p className="text-xs text-slate-400">Hull insurance minimum</p>
              </div>
            </div>
          </div>

          {/* Alaska-Specific Hazards */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" /> Alaska-Specific Hazards
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              Our pilots are trained to handle Alaska-specific challenges:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Wildlife on runways (moose, bears)',
                'Rapid fog development (especially in SE Alaska)',
                'Icing conditions at altitude',
                'Mountain-induced turbulence and rotor',
                'Short and unimproved runway surfaces',
                'High-density altitude in summer',
                'Tidal changes for float operations',
                'White-out conditions near glaciers',
              ].map((hazard) => (
                <div key={hazard} className="flex items-start gap-2 text-sm text-slate-400">
                  <AlertTriangle className="w-3 h-3 text-yellow-400 shrink-0 mt-1" />
                  <span>{hazard}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
