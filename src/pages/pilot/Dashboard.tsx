import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  LayoutDashboard,
  Plane,
  DollarSign,
  Calendar,
  Star,
  Settings,
  BarChart3,
} from 'lucide-react';

const sidebarLinks = [
  { to: '/pilot/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/pilot/dashboard/flights', label: 'My Flights', icon: Plane },
  { to: '/pilot/dashboard/earnings', label: 'Earnings', icon: DollarSign },
  { to: '/pilot/dashboard/aircraft', label: 'Aircraft', icon: BarChart3 },
  { to: '/pilot/dashboard/availability', label: 'Availability', icon: Calendar },
  { to: '/pilot/dashboard/reviews', label: 'Reviews', icon: Star },
  { to: '/pilot/dashboard/settings', label: 'Settings', icon: Settings },
];

function PilotDashboardContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome, Pilot</h2>
      <p className="text-slate-400 text-sm">Manage your flights, earnings, and availability from your dashboard.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Upcoming Flights</p>
          <p className="text-3xl font-bold text-sky-400">—</p>
          <p className="text-xs text-slate-500 mt-1">Sign in to view</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Earnings (This Month)</p>
          <p className="text-3xl font-bold text-emerald-400">—</p>
          <p className="text-xs text-slate-500 mt-1">Sign in to view</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Weather Alerts</p>
          <p className="text-3xl font-bold text-yellow-400">—</p>
          <p className="text-xs text-slate-500 mt-1">Check <Link to="/weather" className="text-sky-400 hover:underline">weather dashboard</Link></p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6">
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link to="/pilot/dashboard/availability" className="bg-slate-700 hover:bg-slate-600 rounded-lg p-4 transition text-sm">
            <Calendar className="w-5 h-5 text-sky-400 mb-1" />
            Set Availability
          </Link>
          <Link to="/pilot/dashboard/earnings" className="bg-slate-700 hover:bg-slate-600 rounded-lg p-4 transition text-sm">
            <DollarSign className="w-5 h-5 text-emerald-400 mb-1" />
            View Stripe Dashboard
          </Link>
        </div>
      </div>

      <div className="bg-sky-900/20 border border-sky-800 rounded-xl p-4 text-sm text-slate-400">
        <p><strong className="text-sky-400">Note:</strong> This dashboard requires authentication via Supabase. Sign in to access your flight data, earnings, and settings.</p>
      </div>
    </div>
  );
}

export default function PilotDashboard() {
  const location = useLocation();
  const isRoot = location.pathname === '/pilot/dashboard';

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <h3 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-4 px-2">Pilot Dashboard</h3>
              <nav className="space-y-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                        isActive ? 'bg-sky-900/40 text-sky-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {isRoot ? <PilotDashboardContent /> : <Outlet />}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
