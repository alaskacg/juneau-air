import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Plane, MapPin, CreditCard, Star, User } from 'lucide-react';

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
        <p className="text-slate-400 text-sm mb-8">Manage your bookings, track flights, and view credits.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* My Flights */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Plane className="w-6 h-6 text-sky-400" />
              <h2 className="text-lg font-bold">My Flights</h2>
            </div>
            <p className="text-sm text-slate-400 mb-4">View upcoming bookings and past flights.</p>
            <div className="bg-slate-800 rounded-xl p-4 text-center text-sm text-slate-500">
              Sign in to view your flights
            </div>
          </div>

          {/* Track Flight */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-emerald-400" />
              <h2 className="text-lg font-bold">Track Flight</h2>
            </div>
            <p className="text-sm text-slate-400 mb-4">Real-time GPS tracking for active flights.</p>
            <div className="bg-slate-800 rounded-xl p-4 text-center text-sm text-slate-500">
              No active flights to track
            </div>
          </div>

          {/* Credits */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-yellow-400" />
              <h2 className="text-lg font-bold">Flight Credits</h2>
            </div>
            <p className="text-sm text-slate-400 mb-4">Credits from weather cancellations or pilot no-shows.</p>
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-2xl font-bold text-center text-slate-500">$0.00</p>
              <p className="text-xs text-center text-slate-500 mt-1">No active credits</p>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-yellow-400" />
              <h2 className="text-lg font-bold">Reviews</h2>
            </div>
            <p className="text-sm text-slate-400 mb-4">Leave reviews for completed flights.</p>
            <div className="bg-slate-800 rounded-xl p-4 text-center text-sm text-slate-500">
              No completed flights to review
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6 text-sky-400" />
            <h2 className="text-lg font-bold">Profile</h2>
          </div>
          <p className="text-sm text-slate-400 mb-4">Update your name, phone, and emergency contact information.</p>
          <div className="bg-sky-900/20 border border-sky-800 rounded-xl p-4 text-sm text-slate-400">
            <p><strong className="text-sky-400">Note:</strong> Sign in with Supabase to access your profile and booking data.</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/book" className="inline-block bg-sky-600 hover:bg-sky-500 px-8 py-3 rounded-xl font-semibold transition">
            Book a New Flight
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
