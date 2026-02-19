import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Plane, Users, MapPin, DollarSign, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Juneau Air</h1>
          <p className="text-xl text-slate-400">Connecting remote Alaska communities by air since day one.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Plane className="w-6 h-6 text-sky-400" /> Our Story
            </h2>
            <p className="text-slate-400 mb-4">
              Juneau Air was founded by pilots who understand Alaska's unique challenges. In a state where 80% of communities are not connected by road, bush aviation isn't a luxury — it's a lifeline.
            </p>
            <p className="text-slate-400">
              We built Juneau Air to make bush charter booking modern, safe, and transparent. No more phone tag with multiple operators. No more uncertainty about pilot qualifications or aircraft condition. One platform, real-time weather safety, GPS-tracked flights, and escrow-protected payments.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-400" /> Our Mission
            </h2>
            <p className="text-slate-400">
              Safe, reliable, affordable bush aviation for everyone. Whether you're a tourist booking a glacier flightseeing tour, a hunter heading to a remote camp, or a resident traveling between communities — Juneau Air connects you with the right pilot and aircraft for the mission.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-sky-400" /> How It Works
            </h2>
            <p className="text-slate-400 mb-4">
              Juneau Air is a marketplace connecting FAA-certified bush pilots with customers. We handle booking, payment processing, weather safety verification, and GPS flight tracking so pilots can focus on flying.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <p className="text-3xl mb-2">🔍</p>
                <p className="font-semibold text-sm">Search & Book</p>
                <p className="text-xs text-slate-400 mt-1">Find routes, check weather, book online</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <p className="text-3xl mb-2">💳</p>
                <p className="font-semibold text-sm">Secure Payment</p>
                <p className="text-xs text-slate-400 mt-1">Funds held in escrow until landing</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <p className="text-3xl mb-2">✈️</p>
                <p className="font-semibold text-sm">Track & Fly</p>
                <p className="text-xs text-slate-400 mt-1">GPS-tracked, pilot releases payment on landing</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-400" /> Pilot-First Economics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-5 text-center">
                <p className="text-4xl font-bold text-emerald-400">95%</p>
                <p className="text-sm text-slate-400 mt-1">Goes directly to the pilot</p>
              </div>
              <div className="bg-sky-900/20 border border-sky-800 rounded-xl p-5 text-center">
                <p className="text-4xl font-bold text-sky-400">5%</p>
                <p className="text-sm text-slate-400 mt-1">Platform fee — among the lowest in aviation</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-4">
              We believe pilots should earn what they deserve. Our 5% platform fee covers payment processing, weather monitoring, GPS tracking, insurance verification, and customer support.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-sky-400" /> Coverage Area
            </h2>
            <p className="text-slate-400 mb-4">
              Juneau Air operates across four major Alaska regions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Tongass National Forest (Southeast Alaska)',
                'Chugach Region (Southcentral Alaska)',
                'Southeast Alaska panhandle',
                'Kenai Peninsula & Cook Inlet',
              ].map((region) => (
                <div key={region} className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="w-3 h-3 text-sky-400 shrink-0" /> {region}
                </div>
              ))}
            </div>
            <Link to="/routes" className="inline-block mt-4 text-sky-400 hover:text-sky-300 text-sm font-semibold">
              View All Routes & Destinations →
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Community Commitment</h2>
            <p className="text-slate-400">
              Juneau Air is committed to supporting rural Alaska access. We partner with local communities, support search and rescue organizations, and work to keep bush aviation affordable for the people who depend on it most.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
