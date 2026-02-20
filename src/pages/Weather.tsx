import { useState } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getWeather, checkRouteWeather } from '@/services/weatherAPI';
import type { WeatherData } from '@/services/weatherAPI';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Cloud,
  Wind,
  Thermometer,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plane,
  RefreshCw,
  Shield,
} from 'lucide-react';

interface AirportInfo {
  name: string;
  icao: string;
  region: 'tongass' | 'chugach';
}

const AIRPORTS: AirportInfo[] = [
  { name: 'Juneau', icao: 'PAJN', region: 'tongass' },
  { name: 'Glacier Bay', icao: 'PAGS', region: 'tongass' },
  { name: 'Skagway', icao: 'PAGY', region: 'tongass' },
  { name: 'Haines', icao: 'PAHN', region: 'tongass' },
  { name: 'Sitka', icao: 'PASI', region: 'tongass' },
  { name: 'Ketchikan', icao: 'PAKT', region: 'tongass' },
  { name: 'Wrangell', icao: 'PAWG', region: 'tongass' },
  { name: 'Petersburg', icao: 'PAPG', region: 'tongass' },
  { name: 'Yakutat', icao: 'PAYA', region: 'tongass' },
  { name: 'Cordova', icao: 'PACV', region: 'chugach' },
  { name: 'Valdez', icao: 'PAVD', region: 'chugach' },
  { name: 'Anchorage', icao: 'PANC', region: 'chugach' },
  { name: 'Palmer', icao: 'PAAQ', region: 'chugach' },
  { name: 'Wasilla', icao: 'PAWS', region: 'chugach' },
  { name: 'Talkeetna', icao: 'PATK', region: 'chugach' },
  { name: 'Denali/Healy', icao: 'PAHV', region: 'chugach' },
  { name: 'Kodiak', icao: 'PADQ', region: 'chugach' },
  { name: 'Homer', icao: 'PAHO', region: 'chugach' },
];

function flightCategory(w: WeatherData | undefined): { label: string; color: string; bg: string } {
  if (!w) return { label: 'N/A', color: 'text-slate-400', bg: 'bg-slate-700' };
  const ceil = w.ceiling_ft;
  const vis = w.visibility_miles;
  if (ceil !== null && ceil < 500) return { label: 'LIFR', color: 'text-red-400', bg: 'bg-red-900/30' };
  if (ceil !== null && ceil < 1000) return { label: 'IFR', color: 'text-red-400', bg: 'bg-red-900/30' };
  if ((ceil !== null && ceil < 3000) || (vis !== null && vis < 5))
    return { label: 'MVFR', color: 'text-yellow-400', bg: 'bg-yellow-900/30' };
  return { label: 'VFR', color: 'text-emerald-400', bg: 'bg-emerald-900/30' };
}

function WeatherCard({ airport, data, isLoading }: { airport: AirportInfo; data?: WeatherData; isLoading: boolean }) {
  const cat = flightCategory(data);

  return (
    <div className={`rounded-xl border border-slate-700 p-4 ${cat.bg}`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-semibold text-white text-sm">{airport.name}</h3>
          <span className="text-xs text-slate-400">{airport.icao}</span>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded ${cat.color} ${cat.bg} border border-current/20`}>
          {isLoading ? '...' : cat.label}
        </span>
      </div>
      {isLoading ? (
        <p className="text-xs text-slate-500">Loading...</p>
      ) : data ? (
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-1">
            <Cloud className="w-3 h-3 text-slate-400" />
            {data.ceiling_ft ? `${data.ceiling_ft} ft` : 'CLR'}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3 text-slate-400" />
            {data.visibility_miles ? `${data.visibility_miles} SM` : 'N/A'}
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3 text-slate-400" />
            {data.wind_speed_kts ? `${data.wind_speed_kts}${data.wind_gust_kts ? `G${data.wind_gust_kts}` : ''} kt` : 'Calm'}
          </div>
          <div className="flex items-center gap-1">
            <Thermometer className="w-3 h-3 text-slate-400" />
            {data.temperature_c !== null ? `${data.temperature_c}°C` : 'N/A'}
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-500">No data</p>
      )}
      {data && !data.is_safe && (
        <div className="mt-2 flex items-start gap-1 text-xs text-red-400">
          <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
          <span>{data.blocked_reason}</span>
        </div>
      )}
    </div>
  );
}

export default function Weather() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  const weatherResults = useQueries({
    queries: AIRPORTS.map((airport) => ({
      queryKey: ['weather', airport.icao],
      queryFn: () => getWeather(airport.icao),
      refetchInterval: 5 * 60 * 1000,
      retry: 1,
      staleTime: 4 * 60 * 1000,
    })),
  });

  const weatherQueries = AIRPORTS.map((airport, index) => ({
    airport,
    ...weatherResults[index],
  }));

  const routeWeather = useQuery({
    queryKey: ['routeWeather', departure, arrival],
    queryFn: () => checkRouteWeather(departure, arrival),
    enabled: false,
  });

  const handleCheckRoute = () => {
    if (departure && arrival) {
      routeWeather.refetch();
    }
  };

  const tongassAirports = weatherQueries.filter((q) => q.airport.region === 'tongass');
  const chugachAirports = weatherQueries.filter((q) => q.airport.region === 'chugach');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      {/* Hero */}
      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-900/30 text-sky-400 px-4 py-2 rounded-full mb-4">
            <Cloud className="w-4 h-4" /> Aviation Weather
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Live Weather Dashboard</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Real-time METAR/TAF conditions for all 18 Juneau Air destinations. Auto-refreshes every 5 minutes from NOAA Aviation Weather.
          </p>
        </div>
      </section>

      {/* Route Weather Check */}
      <section className="py-8 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-sky-400" /> Route Weather Check
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500"
              >
                <option value="">Departure</option>
                {AIRPORTS.map((a) => (
                  <option key={a.icao} value={a.icao}>
                    {a.name} ({a.icao})
                  </option>
                ))}
              </select>
              <select
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500"
              >
                <option value="">Arrival</option>
                {AIRPORTS.filter((a) => a.icao !== departure).map((a) => (
                  <option key={a.icao} value={a.icao}>
                    {a.name} ({a.icao})
                  </option>
                ))}
              </select>
              <button
                onClick={handleCheckRoute}
                disabled={!departure || !arrival || routeWeather.isFetching}
                className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-xl px-4 py-3 font-semibold transition flex items-center justify-center gap-2"
              >
                {routeWeather.isFetching ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                Check Route Weather
              </button>
            </div>

            {routeWeather.data && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Departure</h3>
                  <p className={`text-sm ${routeWeather.data.departure.is_safe ? 'text-emerald-400' : 'text-red-400'}`}>
                    {routeWeather.data.departure.is_safe ? '✓ Safe' : '✗ Unsafe'}
                  </p>
                  {routeWeather.data.departure.blocked_reason && (
                    <p className="text-xs text-red-400 mt-1">{routeWeather.data.departure.blocked_reason}</p>
                  )}
                </div>
                <div className="bg-slate-800 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Arrival</h3>
                  <p className={`text-sm ${routeWeather.data.arrival.is_safe ? 'text-emerald-400' : 'text-red-400'}`}>
                    {routeWeather.data.arrival.is_safe ? '✓ Safe' : '✗ Unsafe'}
                  </p>
                  {routeWeather.data.arrival.blocked_reason && (
                    <p className="text-xs text-red-400 mt-1">{routeWeather.data.arrival.blocked_reason}</p>
                  )}
                </div>
                <div className={`rounded-xl p-4 flex items-center justify-center ${routeWeather.data.safe ? 'bg-emerald-900/30 border border-emerald-700' : 'bg-red-900/30 border border-red-700'}`}>
                  {routeWeather.data.safe ? (
                    <div className="text-center">
                      <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-1" />
                      <p className="font-bold text-emerald-400">GO</p>
                      <p className="text-xs text-emerald-300">Route is safe</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <XCircle className="w-8 h-8 text-red-400 mx-auto mb-1" />
                      <p className="font-bold text-red-400">NO-GO</p>
                      <p className="text-xs text-red-300">Conditions unsafe</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tongass Region */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Tongass / Southeast Alaska</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tongassAirports.map((q) => (
              <WeatherCard key={q.airport.icao} airport={q.airport} data={q.data} isLoading={q.isLoading} />
            ))}
          </div>
        </div>
      </section>

      {/* Chugach Region */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Chugach / Southcentral Alaska</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chugachAirports.map((q) => (
              <WeatherCard key={q.airport.icao} airport={q.airport} data={q.data} isLoading={q.isLoading} />
            ))}
          </div>
        </div>
      </section>

      {/* Safety Minimums */}
      <section className="py-12 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-sky-400" /> Flight Safety Minimums
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <Cloud className="w-8 h-8 text-sky-400 mb-2" />
              <h3 className="font-semibold mb-1">Ceiling</h3>
              <p className="text-2xl font-bold text-sky-400">1,000 ft</p>
              <p className="text-xs text-slate-400 mt-1">Minimum ceiling for VFR operations</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <Eye className="w-8 h-8 text-sky-400 mb-2" />
              <h3 className="font-semibold mb-1">Visibility</h3>
              <p className="text-2xl font-bold text-sky-400">3 SM</p>
              <p className="text-xs text-slate-400 mt-1">Minimum 3 statute miles visibility</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <Wind className="w-8 h-8 text-sky-400 mb-2" />
              <h3 className="font-semibold mb-1">Wind</h3>
              <p className="text-2xl font-bold text-sky-400">25 kt</p>
              <p className="text-xs text-slate-400 mt-1">Maximum wind speed including gusts</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <Thermometer className="w-8 h-8 text-yellow-400 mb-2" />
              <h3 className="font-semibold mb-1">Icing</h3>
              <p className="text-2xl font-bold text-yellow-400">&lt; 0°C</p>
              <p className="text-xs text-slate-400 mt-1">Icing conditions warning issued</p>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Decision Model */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Weather Decision Model</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="font-semibold text-sky-400 mb-2">Real-Time NOAA Data</h3>
              <p className="text-sm text-slate-400">
                Juneau Air pulls live METAR and TAF reports from NOAA Aviation Weather for every airport in our network. Data is refreshed every 5 minutes to ensure up-to-date safety decisions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sky-400 mb-2">Automatic Booking Blocks</h3>
              <p className="text-sm text-slate-400">
                When conditions at departure or arrival airports fall below our safety minimums, the system automatically blocks new bookings on affected routes. No manual intervention needed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-400 mb-2">Weather Cancellation = Full Flight Credit</h3>
              <p className="text-sm text-slate-400">
                If your flight is cancelled due to weather, you receive a full flight credit valid for 1 year. No penalties, no questions — safety comes first.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-400 mb-2">Pilot Authority</h3>
              <p className="text-sm text-slate-400">
                Even when automated systems show a GO, the pilot in command has final authority to cancel any flight for safety reasons at any time. Pilot cancellations are treated the same as weather cancellations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Overview */}
      <section className="py-12 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Regional Weather Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-sky-400 mb-3">Tongass / Southeast Alaska</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><strong className="text-slate-300">Best months:</strong> May–September. Longest days, warmest temps, least precipitation.</li>
                <li><strong className="text-slate-300">Common patterns:</strong> Juneau experiences frequent marine fog and low ceilings. Sitka gets Pacific frontal systems. Skagway/Haines can have strong gap winds through Lynn Canal.</li>
                <li><strong className="text-slate-300">Winter:</strong> Short days, frequent IFR conditions, heavy snowfall at altitude. Limited VFR windows.</li>
                <li><strong className="text-slate-300">Watch for:</strong> Rapid ceiling drops in Juneau, turbulence near Taku Inlet, fog banks at Glacier Bay.</li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-sky-400 mb-3">Chugach / Southcentral Alaska</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><strong className="text-slate-300">Best months:</strong> June–August. Stable high pressure systems common.</li>
                <li><strong className="text-slate-300">Common patterns:</strong> Valdez is prone to orographic precipitation and strong winds. Anchorage has reliable conditions most of the year. Talkeetna/Denali can have mountain wave turbulence.</li>
                <li><strong className="text-slate-300">Winter:</strong> Temperature inversions, ice fog in Anchorage, extreme cold at elevation near Denali.</li>
                <li><strong className="text-slate-300">Watch for:</strong> Wind shear in Thompson Pass (Valdez), sea fog in Cordova/Homer, downdrafts near glaciers.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
