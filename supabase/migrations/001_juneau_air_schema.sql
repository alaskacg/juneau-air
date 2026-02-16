-- JuneauAir.com Database Schema
-- Production-ready bush charter marketplace with GPS tracking and escrow

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (managed by Supabase Auth)
-- Extended with custom fields
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'pilot', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pilots table (FAA certified pilots)
CREATE TABLE pilots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  license_number TEXT NOT NULL UNIQUE,
  medical_expiry DATE NOT NULL,
  ifr_certified BOOLEAN NOT NULL DEFAULT true,
  alaska_hours INTEGER NOT NULL CHECK (alaska_hours >= 1000),
  aircraft_tail_number TEXT NOT NULL,
  insurance_liability INTEGER NOT NULL CHECK (insurance_liability >= 1000000),
  insurance_hull INTEGER NOT NULL CHECK (insurance_hull >= 250000),
  license_pdf_url TEXT,
  medical_pdf_url TEXT,
  insurance_pdf_url TEXT,
  w9_pdf_url TEXT,
  stripe_connect_account_id TEXT,
  approved BOOLEAN NOT NULL DEFAULT false,
  approval_date TIMESTAMPTZ,
  approved_by UUID REFERENCES profiles(id),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pilot availability (2-hour blocks)
CREATE TABLE pilot_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pilot_id UUID NOT NULL REFERENCES pilots(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'booked', 'offline')),
  aircraft_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(pilot_id, date, start_time)
);

-- Locations (airports, docks, lodges)
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('airport', 'seaplane_base', 'lodge', 'dock')),
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  elevation_ft INTEGER,
  icao_code TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pilot_id UUID REFERENCES pilots(id),
  from_location_id UUID NOT NULL REFERENCES locations(id),
  to_location_id UUID NOT NULL REFERENCES locations(id),
  flight_date DATE NOT NULL,
  flight_time TIME NOT NULL,
  passengers INTEGER NOT NULL CHECK (passengers >= 1 AND passengers <= 6),
  total_price DECIMAL(10, 2) NOT NULL,
  platform_fee_5_percent DECIMAL(10, 2) NOT NULL,
  pilot_payout_95_percent DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_flight', 'completed', 'cancelled', 'weather_cancelled')),
  stripe_payment_intent_id TEXT,
  stripe_transfer_id TEXT,
  cancellation_reason TEXT,
  cancelled_at TIMESTAMPTZ,
  cancelled_by UUID REFERENCES profiles(id),
  takeoff_time TIMESTAMPTZ,
  landing_time TIMESTAMPTZ,
  landing_photo_url TEXT,
  gps_takeoff_lat DECIMAL(10, 7),
  gps_takeoff_lng DECIMAL(10, 7),
  gps_landing_lat DECIMAL(10, 7),
  gps_landing_lng DECIMAL(10, 7),
  waiver_signed BOOLEAN NOT NULL DEFAULT false,
  waiver_signed_at TIMESTAMPTZ,
  waiver_pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Flight tracking (GPS breadcrumbs)
CREATE TABLE flight_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  pilot_id UUID NOT NULL REFERENCES pilots(id),
  event_type TEXT NOT NULL CHECK (event_type IN ('takeoff', 'location_update', 'landing')),
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  altitude INTEGER,
  speed_kts INTEGER,
  heading INTEGER,
  photo_url TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES profiles(id),
  pilot_id UUID REFERENCES pilots(id),
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  pilot_payout DECIMAL(10, 2),
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_transfer_id TEXT,
  status TEXT NOT NULL DEFAULT 'held' CHECK (status IN ('held', 'released', 'refunded', 'cancelled')),
  released_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  refund_reason TEXT,
  refund_amount DECIMAL(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Weather logs
CREATE TABLE weather_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id),
  metar TEXT,
  taf TEXT,
  ceiling_ft INTEGER,
  visibility_miles DECIMAL(4, 2),
  wind_speed_kts INTEGER,
  wind_gust_kts INTEGER,
  temperature_c DECIMAL(4, 1),
  is_safe BOOLEAN NOT NULL DEFAULT true,
  blocked_reason TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Waivers
CREATE TABLE waivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES profiles(id),
  signed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  signature_data TEXT NOT NULL,
  ip_address TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications log
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('sms', 'email', 'push')),
  template TEXT NOT NULL,
  sent_to TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Incident reports
CREATE TABLE incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  pilot_id UUID REFERENCES pilots(id),
  reported_by UUID REFERENCES profiles(id),
  incident_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  description TEXT NOT NULL,
  resolution TEXT,
  resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_pilots_user_id ON pilots(user_id);
CREATE INDEX idx_pilots_approved ON pilots(approved);
CREATE INDEX idx_pilot_availability_pilot_date ON pilot_availability(pilot_id, date);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_pilot ON bookings(pilot_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_flight_date ON bookings(flight_date);
CREATE INDEX idx_flight_tracking_booking ON flight_tracking(booking_id);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_weather_logs_location ON weather_logs(location_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pilots ENABLE ROW LEVEL SECURITY;
ALTER TABLE pilot_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE flight_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read own profile, admins can read all
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Pilots: Public can read approved pilots, pilots can update own
CREATE POLICY "Anyone can view approved pilots" ON pilots
  FOR SELECT USING (approved = true);

CREATE POLICY "Pilots can update own profile" ON pilots
  FOR UPDATE USING (auth.uid() = user_id);

-- Bookings: Users can view own bookings, pilots can view assigned bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (
    auth.uid() = customer_id OR 
    auth.uid() IN (SELECT user_id FROM pilots WHERE id = bookings.pilot_id)
  );

CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Insert default locations
INSERT INTO locations (name, code, type, latitude, longitude, elevation_ft, icao_code) VALUES
  ('Juneau International', 'JNU', 'airport', 58.3549, -134.5761, 21, 'PAJN'),
  ('Sitka Rocky Gutierrez', 'SIT', 'airport', 57.0471, -135.3616, 21, 'PASI'),
  ('Ketchikan International', 'KTN', 'airport', 55.3556, -131.7138, 88, 'PAKT'),
  ('Petersburg James Johnson', 'PSG', 'airport', 56.8017, -132.9453, 107, 'PAPG'),
  ('Gustavus', 'GST', 'airport', 58.4253, -135.7074, 35, 'PAGS'),
  ('Skagway', 'SGY', 'airport', 59.4601, -135.3159, 44, 'PAGY'),
  ('Haines', 'HNS', 'airport', 59.2438, -135.5244, 16, 'PAHN'),
  ('Elfin Cove Seaplane Base', 'ELV', 'seaplane_base', 58.1952, -136.3473, 0, NULL),
  ('Tenakee Springs Seaplane Base', 'TKE', 'seaplane_base', 57.7797, -135.2186, 0, NULL),
  ('Hoonah Seaplane Base', 'HNH', 'seaplane_base', 58.1081, -135.4097, 0, NULL);

-- Functions for automated tasks
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER pilots_updated_at BEFORE UPDATE ON pilots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
