import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Clock, Cloud, DollarSign, AlertTriangle } from 'lucide-react';

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cancellation Policy</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Fair, transparent policies that protect both passengers and pilots.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {/* Customer Cancellation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-sky-400" /> Customer Cancellation
            </h2>
            <div className="space-y-4">
              <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-emerald-400">48+ hours before flight</span>
                  <span className="text-2xl font-bold text-emerald-400">100% refund</span>
                </div>
                <p className="text-sm text-slate-400">Full refund to original payment method. No questions asked.</p>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-yellow-400">24–48 hours before flight</span>
                  <span className="text-2xl font-bold text-yellow-400">50% refund</span>
                </div>
                <p className="text-sm text-slate-400">50% refunded. The remaining 50% is paid to the pilot as a cancellation fee — they may have turned down other bookings.</p>
              </div>
              <div className="bg-red-900/20 border border-red-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-red-400">Under 24 hours / No-show</span>
                  <span className="text-2xl font-bold text-red-400">No refund</span>
                </div>
                <p className="text-sm text-slate-400">80% goes to the pilot, 20% to the platform. The pilot prepared for your flight and deserves compensation.</p>
              </div>
            </div>
          </div>

          {/* Weather Cancellation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-sky-400" /> Weather Cancellation
            </h2>
            <div className="bg-sky-900/20 border border-sky-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sky-400">Weather cancellation</span>
                <span className="text-2xl font-bold text-sky-400">Full flight credit</span>
              </div>
              <p className="text-sm text-slate-400 mb-2">
                If your flight is cancelled due to weather, you receive a full flight credit valid for 1 year from the cancellation date.
              </p>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• Credit equals 100% of original booking amount</li>
                <li>• Valid for any route, any date within 1 year</li>
                <li>• No penalties, no fees</li>
                <li>• Weather determination based on NOAA METAR/TAF data</li>
              </ul>
            </div>
          </div>

          {/* Pilot Cancellation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" /> Pilot Cancellation & No-Show
            </h2>
            <div className="space-y-4">
              <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-emerald-400">Pilot cancels</span>
                  <span className="text-lg font-bold text-emerald-400">100% refund + $100 credit</span>
                </div>
                <p className="text-sm text-slate-400">Full refund to original payment method plus a $100 rebooking credit for the inconvenience.</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-emerald-400">Pilot no-show</span>
                  <span className="text-lg font-bold text-emerald-400">100% refund + $100 credit</span>
                </div>
                <p className="text-sm text-slate-400">Same as pilot cancellation. We take no-shows seriously — repeated pilot no-shows result in platform removal.</p>
              </div>
            </div>
          </div>

          {/* How to Cancel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-sky-400" /> How to Cancel & Refund Processing
            </h2>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                Cancel through your <Link to="/customer/dashboard" className="text-sky-400 hover:underline">booking dashboard</Link>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                Refunds are processed to the original payment method
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                Allow 5–10 business days for refund to appear on your statement
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                Flight credits appear in your dashboard immediately
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                Questions? Email <a href="mailto:fly@juneauair.com" className="text-sky-400 hover:underline">fly@juneauair.com</a> or call <a href="tel:+15103455439" className="text-sky-400 hover:underline">(510) 345-5439</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
