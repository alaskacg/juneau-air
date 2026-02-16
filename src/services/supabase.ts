import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          role: 'customer' | 'pilot' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: 'customer' | 'pilot' | 'admin'
        }
        Update: {
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
        }
      }
      pilots: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          license_number: string
          medical_expiry: string
          ifr_certified: boolean
          alaska_hours: number
          aircraft_tail_number: string
          insurance_liability: number
          insurance_hull: number
          license_pdf_url: string | null
          medical_pdf_url: string | null
          insurance_pdf_url: string | null
          w9_pdf_url: string | null
          stripe_connect_account_id: string | null
          approved: boolean
          approval_date: string | null
          approved_by: string | null
          active: boolean
          created_at: string
          updated_at: string
        }
      }
      bookings: {
        Row: {
          id: string
          customer_id: string
          pilot_id: string | null
          from_location_id: string
          to_location_id: string
          flight_date: string
          flight_time: string
          passengers: number
          total_price: number
          platform_fee_5_percent: number
          pilot_payout_95_percent: number
          status: 'pending' | 'confirmed' | 'in_flight' | 'completed' | 'cancelled' | 'weather_cancelled'
          stripe_payment_intent_id: string | null
          stripe_transfer_id: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          takeoff_time: string | null
          landing_time: string | null
          landing_photo_url: string | null
          gps_takeoff_lat: number | null
          gps_takeoff_lng: number | null
          gps_landing_lat: number | null
          gps_landing_lng: number | null
          waiver_signed: boolean
          waiver_signed_at: string | null
          waiver_pdf_url: string | null
          created_at: string
          updated_at: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          code: string | null
          type: 'airport' | 'seaplane_base' | 'lodge' | 'dock'
          latitude: number
          longitude: number
          elevation_ft: number | null
          icao_code: string | null
          active: boolean
          created_at: string
        }
      }
      flight_tracking: {
        Row: {
          id: string
          booking_id: string
          pilot_id: string
          event_type: 'takeoff' | 'location_update' | 'landing'
          latitude: number
          longitude: number
          altitude: number | null
          speed_kts: number | null
          heading: number | null
          photo_url: string | null
          timestamp: string
        }
      }
      payments: {
        Row: {
          id: string
          booking_id: string
          customer_id: string
          pilot_id: string | null
          amount: number
          platform_fee: number
          pilot_payout: number | null
          stripe_payment_intent_id: string | null
          stripe_transfer_id: string | null
          status: 'held' | 'released' | 'refunded' | 'cancelled'
          released_at: string | null
          refunded_at: string | null
          refund_reason: string | null
          refund_amount: number | null
          created_at: string
        }
      }
    }
  }
}
