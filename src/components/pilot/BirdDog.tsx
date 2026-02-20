import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getCurrentPosition, recordTakeoff, recordLanding, uploadLandingPhoto } from '../../services/gpsTracking';
import { releasePaymentToPilot } from '../../services/stripeConnect';
import { Plane, Camera, MapPin, CheckCircle } from 'lucide-react';

interface BirdDogProps {
  booking: {
    id: string;
    status: string;
    flight_date: string;
    flight_time: string;
    passengers: number;
    landing_photo_url?: string | null;
    from_location?: { name: string } | null;
    to_location?: { name: string } | null;
  };
  pilot: {
    id: string;
    stripe_connect_account_id?: string | null;
  };
}

export default function BirdDog({ booking, pilot }: BirdDogProps) {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        console.error('GPS error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const handleTakeoff = useMutation({
    mutationFn: async () => {
      const coords = await getCurrentPosition();
      await recordTakeoff(booking.id, pilot.id, coords);
    },
    onSuccess: () => {
      alert('Takeoff recorded! Safe flight.');
    },
  });

  const handleLanding = useMutation({
    mutationFn: async () => {
      if (!photo) throw new Error('Landing photo required');

      const coords = await getCurrentPosition();
      const photoUrl = await uploadLandingPhoto(photo, booking.id);
      await recordLanding(booking.id, pilot.id, coords, photoUrl);

      if (pilot.stripe_connect_account_id) {
        await releasePaymentToPilot(booking.id, pilot.stripe_connect_account_id);
      }
    },
    onSuccess: () => {
      alert('Landing recorded! Payment released to your account.');
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const inFlight = booking.status === 'in_flight';
  const completed = booking.status === 'completed';

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-alaska-blue mb-6 flex items-center gap-3">
          <Plane className="w-8 h-8" />
          Bird Dog - Flight Tracker
        </h2>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Flight Details</h3>
          <div className="space-y-2 text-sm">
            <p><strong>From:</strong> {booking.from_location?.name}</p>
            <p><strong>To:</strong> {booking.to_location?.name}</p>
            <p><strong>Date:</strong> {booking.flight_date} at {booking.flight_time}</p>
            <p><strong>Passengers:</strong> {booking.passengers}</p>
          </div>
        </div>

        {location && (
          <div className="bg-alaska-glacier rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-alaska-blue font-semibold mb-2">
              <MapPin className="w-5 h-5" />
              Current Position
            </div>
            <div className="text-sm text-gray-700">
              <p>Lat: {location.coords.latitude.toFixed(6)}</p>
              <p>Lng: {location.coords.longitude.toFixed(6)}</p>
              <p>Alt: {location.coords.altitude?.toFixed(0) || 'N/A'} ft</p>
              <p>Accuracy: ±{location.coords.accuracy.toFixed(0)}m</p>
            </div>
          </div>
        )}

        {!inFlight && !completed && (
          <button
            onClick={() => handleTakeoff.mutate()}
            disabled={handleTakeoff.isPending || !location}
            className="w-full bg-green-600 text-white py-6 px-8 rounded-xl text-xl font-bold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
          >
            <Plane className="w-6 h-6" />
            {handleTakeoff.isPending ? 'Recording...' : 'Take Off'}
          </button>
        )}

        {inFlight && !completed && (
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="text-green-700 font-semibold">Flight in progress</p>
              <p className="text-sm text-green-600 mt-1">GPS tracking active</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <Camera className="inline w-5 h-5 mr-2" />
                Landing Photo (Required)
              </label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Landing preview"
                  className="mt-4 w-full h-64 object-cover rounded-xl"
                />
              )}
            </div>

            <button
              onClick={() => handleLanding.mutate()}
              disabled={handleLanding.isPending || !photo || !location}
              className="w-full bg-alaska-blue text-white py-6 px-8 rounded-xl text-xl font-bold hover:bg-alaska-blue/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
            >
              <Plane className="w-6 h-6 rotate-45" />
              {handleLanding.isPending ? 'Recording...' : 'Land & Release Payment'}
            </button>
          </div>
        )}

        {completed && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
            <CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-3" />
            <p className="text-blue-700 font-bold text-xl">Flight Completed!</p>
            <p className="text-sm text-blue-600 mt-2">
              Payment has been released to your account.
            </p>
            {booking.landing_photo_url && (
              <img
                src={booking.landing_photo_url}
                alt="Landing"
                className="mt-4 w-full h-48 object-cover rounded-xl"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
