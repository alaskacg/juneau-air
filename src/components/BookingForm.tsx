import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { checkRouteWeather } from '../services/weatherAPI';
import { createBookingPayment } from '../services/stripeConnect';
import { Plane, MapPin, Calendar, Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  code: string;
  icao_code: string;
}

type RouteWeatherResult = Awaited<ReturnType<typeof checkRouteWeather>>;

export default function BookingForm() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [flightTime, setFlightTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [weatherSafe, setWeatherSafe] = useState<boolean | null>(null);
  const [weatherDetails, setWeatherDetails] = useState<RouteWeatherResult | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const { data: locations } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('active', true)
        .order('name');
      
      if (error) throw error;
      return data as Location[];
    },
  });

  const checkWeather = async (): Promise<RouteWeatherResult | null> => {
    setWeatherError(null);

    if (!fromLocation || !toLocation) return null;

    const from = locations?.find(l => l.id === fromLocation);
    const to = locations?.find(l => l.id === toLocation);

    if (!from?.icao_code || !to?.icao_code) return null;

    const weather = await checkRouteWeather(from.icao_code, to.icao_code);
    setWeatherSafe(weather.safe);
    setWeatherDetails(weather);
    return weather;
  };

  const createBooking = useMutation({
    mutationFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('Not authenticated');

      const basePrice = 350;
      const totalPrice = basePrice * passengers;
      const platformFee = totalPrice * 0.05;
      const pilotPayout = totalPrice * 0.95;

      // Find available pilot
      const { data: availablePilots } = await supabase
        .from('pilot_availability')
        .select('pilot_id, pilots(*)')
        .eq('date', flightDate)
        .eq('status', 'available')
        .lte('start_time', flightTime)
        .gte('end_time', flightTime)
        .limit(1);

      if (!availablePilots || availablePilots.length === 0) {
        throw new Error('No pilots available for this time slot');
      }

      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          customer_id: session.session.user.id,
          pilot_id: availablePilots[0].pilot_id,
          from_location_id: fromLocation,
          to_location_id: toLocation,
          flight_date: flightDate,
          flight_time: flightTime,
          passengers,
          total_price: totalPrice,
          platform_fee_5_percent: platformFee,
          pilot_payout_95_percent: pilotPayout,
          status: 'pending',
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Create payment intent
      const payment = await createBookingPayment(booking.id, totalPrice);

      await supabase
        .from('bookings')
        .update({ stripe_payment_intent_id: payment.id })
        .eq('id', booking.id);

      await supabase
        .from('payments')
        .insert({
          booking_id: booking.id,
          customer_id: session.session.user.id,
          pilot_id: availablePilots[0].pilot_id,
          amount: totalPrice,
          platform_fee: platformFee,
          pilot_payout: pilotPayout,
          stripe_payment_intent_id: payment.id,
          status: 'held',
        });

      // Mark availability as booked
      await supabase
        .from('pilot_availability')
        .update({ status: 'booked' })
        .eq('pilot_id', availablePilots[0].pilot_id)
        .eq('date', flightDate);

      return { booking, payment };
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const weather = await checkWeather();

      if (weather && !weather.safe) {
        alert('Flight blocked due to unsafe weather conditions');
        return;
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to verify weather conditions right now.';
      setWeatherError(message);
      return;
    }

    createBooking.mutate();
  };

  const basePrice = 350;
  const totalPrice = basePrice * passengers;
  const bookingErrorMessage =
    createBooking.error instanceof Error ? createBooking.error.message : 'Unable to complete booking.';

  return (
    <div className="min-h-screen bg-gradient-to-b from-alaska-blue to-alaska-glacier">
      <div className="min-h-screen bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-white mb-4">JuneauAir</h1>
              <p className="text-xl text-white/90">Bush Charter Marketplace</p>
              <div className="flex justify-center gap-6 mt-4 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Licensed Pilots
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Fully Insured
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  1,000+ Hours
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <MapPin className="w-5 h-5" />
                  Where from?
                </label>
                <select
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                  required
                >
                  <option value="">Select departure</option>
                  {locations?.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <MapPin className="w-5 h-5" />
                  Where to?
                </label>
                <select
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                  required
                >
                  <option value="">Select destination</option>
                  {locations?.filter(l => l.id !== fromLocation).map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Calendar className="w-5 h-5" />
                    When?
                  </label>
                  <input
                    type="date"
                    value={flightDate}
                    onChange={(e) => setFlightDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Calendar className="w-5 h-5" />
                    Time
                  </label>
                  <input
                    type="time"
                    value={flightTime}
                    onChange={(e) => setFlightTime(e.target.value)}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <Users className="w-5 h-5" />
                  Passengers
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                  required
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'passenger' : 'passengers'}
                    </option>
                  ))}
                </select>
              </div>

              {weatherSafe === false && weatherDetails && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    Flight Blocked - Unsafe Weather
                  </div>
                  <p className="text-sm text-red-600">
                    {weatherDetails.departure.blocked_reason || weatherDetails.arrival.blocked_reason}
                  </p>
                </div>
              )}

              {weatherError && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-sm text-red-700">
                  {weatherError}
                </div>
              )}

              <div className="bg-alaska-glacier border-2 border-alaska-blue rounded-xl p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Base rate</span>
                  <span className="font-semibold">${basePrice}/passenger</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-bold text-alaska-blue">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Includes 5% platform fee • 95% goes to pilot
                </p>
              </div>

              <button
                type="submit"
                disabled={createBooking.isPending || weatherSafe === false}
                className="w-full bg-alaska-blue text-white py-5 px-8 rounded-xl text-xl font-bold hover:bg-alaska-blue/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
              >
                <Plane className="w-6 h-6" />
                {createBooking.isPending ? 'Booking...' : 'Book Flight Now'}
              </button>

              {createBooking.isSuccess && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-green-700 font-semibold">Pilot confirmed. Flight booked!</p>
                  <p className="text-sm text-green-600 mt-1">Check your email for waiver and details.</p>
                </div>
              )}

              {createBooking.isError && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-sm text-red-700">
                  {bookingErrorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
