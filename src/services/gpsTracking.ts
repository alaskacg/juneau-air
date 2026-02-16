import { supabase } from './supabase';

export interface GPSCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
  speed_kts?: number;
  heading?: number;
}

export async function recordTakeoff(
  bookingId: string,
  pilotId: string,
  coords: GPSCoordinates
): Promise<void> {
  const { error: trackingError } = await supabase
    .from('flight_tracking')
    .insert({
      booking_id: bookingId,
      pilot_id: pilotId,
      event_type: 'takeoff',
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
      speed_kts: coords.speed_kts,
      heading: coords.heading,
    });

  if (trackingError) throw trackingError;

  const { error: bookingError } = await supabase
    .from('bookings')
    .update({
      status: 'in_flight',
      takeoff_time: new Date().toISOString(),
      gps_takeoff_lat: coords.latitude,
      gps_takeoff_lng: coords.longitude,
    })
    .eq('id', bookingId);

  if (bookingError) throw bookingError;
}

export async function recordLocationUpdate(
  bookingId: string,
  pilotId: string,
  coords: GPSCoordinates
): Promise<void> {
  const { error } = await supabase
    .from('flight_tracking')
    .insert({
      booking_id: bookingId,
      pilot_id: pilotId,
      event_type: 'location_update',
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
      speed_kts: coords.speed_kts,
      heading: coords.heading,
    });

  if (error) throw error;
}

export async function recordLanding(
  bookingId: string,
  pilotId: string,
  coords: GPSCoordinates,
  photoUrl: string
): Promise<void> {
  const { error: trackingError } = await supabase
    .from('flight_tracking')
    .insert({
      booking_id: bookingId,
      pilot_id: pilotId,
      event_type: 'landing',
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
      photo_url: photoUrl,
    });

  if (trackingError) throw trackingError;

  const { error: bookingError } = await supabase
    .from('bookings')
    .update({
      status: 'completed',
      landing_time: new Date().toISOString(),
      gps_landing_lat: coords.latitude,
      gps_landing_lng: coords.longitude,
      landing_photo_url: photoUrl,
    })
    .eq('id', bookingId);

  if (bookingError) throw bookingError;
}

export async function getCurrentPosition(): Promise<GPSCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude || undefined,
          speed_kts: position.coords.speed 
            ? position.coords.speed * 1.94384 // m/s to knots
            : undefined,
          heading: position.coords.heading || undefined,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

export async function uploadLandingPhoto(file: File, bookingId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${bookingId}-${Date.now()}.${fileExt}`;
  const filePath = `landing-photos/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('flight-photos')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('flight-photos')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export function verifyLocationProximity(
  current: { latitude: number; longitude: number },
  expected: { latitude: number; longitude: number },
  maxDistanceMeters: number = 5000
): boolean {
  const distance = calculateDistance(current, expected);
  return distance <= maxDistanceMeters;
}

function calculateDistance(
  coord1: { latitude: number; longitude: number },
  coord2: { latitude: number; longitude: number }
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (coord1.latitude * Math.PI) / 180;
  const φ2 = (coord2.latitude * Math.PI) / 180;
  const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
