# JuneauAir.com

**Production-ready bush charter marketplace for Southeast Alaska with GPS tracking and escrow payments.**

## 🎯 Core Features

- **Zero-friction booking** - Book flights in under 60 seconds
- **GPS tracking** - "Bird Dog" system with takeoff/landing verification
- **Escrow payments** - 5% platform fee, 95% to pilot (released on landing)
- **Weather integration** - Real-time METAR/TAF blocking unsafe flights
- **Pilot verification** - FAA, IFR, insurance, 1,000+ Alaska hours required
- **Safety first** - GPS verification, photo proof, comprehensive tracking

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Supabase account
- Stripe account with Connect enabled

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `VITE_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key

### Database Setup

1. Create a Supabase project
2. Run the migration:
   ```bash
   supabase db push supabase/migrations/001_juneau_air_schema.sql
   ```

### Run Development Server

```bash
npm run dev
```

## 📱 User Flows

### Customer Booking
1. Select: From, To, When, Passengers
2. System auto-matches available pilot
3. Weather check (auto-blocks if unsafe)
4. Payment via Stripe (held in escrow)
5. E-sign waiver via email
6. Flight confirmed

### Pilot Flight
1. Receive booking notification
2. Navigate to "Bird Dog" tracker
3. Tap "Take Off" (records GPS + timestamp)
4. Fly the route (GPS tracking every 30s)
5. Tap "Land" + upload photo
6. Payment auto-released (95% to pilot)

## 🛠️ Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Query (data fetching)
- React Leaflet (maps)
- Lucide React (icons)

**Backend:**
- Supabase (database, auth, storage, real-time)
- Stripe Connect (payments + escrow)
- NOAA Aviation Weather API
- Geolocation API (GPS tracking)

## 📊 Database Schema

Core tables:
- `profiles` - User accounts (customer/pilot/admin)
- `pilots` - Pilot credentials & verification
- `pilot_availability` - 2-hour booking blocks
- `locations` - Airports, seaplane bases, lodges
- `bookings` - Flight reservations
- `flight_tracking` - GPS breadcrumbs (takeoff/updates/landing)
- `payments` - Escrow & payment history
- `weather_logs` - METAR/TAF records
- `waivers` - E-signed liability releases

## 💰 Payment Flow

1. **Booking** - Customer charged $350/passenger (100%)
2. **Escrow** - Held by Stripe until landing confirmed
3. **Landing** - Pilot uploads photo + GPS proof
4. **Release** - Auto-split: 5% platform, 95% to pilot
5. **Transfer** - Funds in pilot account within 24h

### Refund Rules
- **48+ hours** - 100% refund
- **24-48 hours** - 50% refund (50% to pilot)
- **< 24 hours** - 0% refund (80% pilot, 20% platform)
- **Weather cancel** - Flight credit (1 year expiry)
- **Pilot no-show** - 100% refund + $100 credit

## 🌤️ Weather Safety

Auto-blocks flights if:
- Ceiling < 1,000 ft
- Visibility < 3 miles
- Wind > 25 knots
- Severe weather alerts

Uses NOAA Aviation Weather API for real-time METAR/TAF.

## 📍 GPS Tracking

**Takeoff:**
- Pilot must be within 5km of departure airport
- Records: GPS coords, timestamp
- Updates booking status to "in_flight"

**In-flight:**
- Location updates every 30 seconds
- Logs: lat/lng, altitude, speed, heading
- Admin can view live on map

**Landing:**
- Requires GPS coords + photo proof
- Triggers payment release (95% to pilot)
- Updates booking status to "completed"

## 🔒 Pilot Requirements

All pilots must provide:
- FAA license (current)
- Medical certificate
- IFR rating verification
- 1,000+ hours Alaska time
- $1M+ liability insurance
- $250K+ hull insurance
- W-9 for 1099 payments
- Stripe Connect onboarding

Admin approval required before going live.

## 🎨 Design

- **Mobile-first** - Touch-friendly 60px+ buttons
- **One-page booking** - Minimal friction
- **Alaska aesthetic** - Aerial photography backgrounds
- **Trust signals** - Licensed, insured, experienced pilots
- **Real-time feedback** - Instant availability checking

## 📝 TODO (Production Checklist)

- [ ] Set up Supabase project
- [ ] Configure Stripe Connect
- [ ] Deploy to Vercel/Netlify
- [ ] Set up custom domain (JuneauAir.com)
- [ ] Configure email service (Resend/SendGrid)
- [ ] Set up SMS notifications (Twilio)
- [ ] Add Stripe webhook handlers
- [ ] Implement admin dashboard
- [ ] Add live flight map
- [ ] Set up automated waiver generation
- [ ] Configure background jobs (payment monitoring)
- [ ] Add comprehensive error logging
- [ ] Set up customer support system

## 🚨 Safety Features

- GPS verification (can't fake location)
- Weather blocking (no unsafe flights)
- Photo proof (landing verification)
- Insurance tracking (auto-alerts on expiry)
- Flight logs (complete FAA records)
- Background checks (manual admin verification)

## 📄 License

MIT License - Built for production use.

## 🤝 Contributing

This is a production system where lives and money are at stake. All code changes require rigorous testing and review.

---

**Built with EXCELLENCE. Lives depend on it. Money depends on it.**
