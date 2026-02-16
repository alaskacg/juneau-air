import { supabase } from '../services/supabase';

export interface RefundRule {
  refundPercentage: number;
  pilotCancellationFee: number;
  platformFee: number;
}

export function calculateRefund(hoursUntilFlight: number): RefundRule {
  if (hoursUntilFlight >= 48) {
    return {
      refundPercentage: 100,
      pilotCancellationFee: 0,
      platformFee: 0,
    };
  } else if (hoursUntilFlight >= 24) {
    return {
      refundPercentage: 50,
      pilotCancellationFee: 50,
      platformFee: 0,
    };
  } else {
    return {
      refundPercentage: 0,
      pilotCancellationFee: 80,
      platformFee: 20,
    };
  }
}

export async function cancelBooking(
  bookingId: string,
  userId: string,
  reason: string
): Promise<void> {
  const { data: booking, error } = await supabase
    .from('bookings')
    .select('flight_date, flight_time, total_price, pilot_id')
    .eq('id', bookingId)
    .single();

  if (error) throw error;

  const flightDateTime = new Date(`${booking.flight_date}T${booking.flight_time}`);
  const now = new Date();
  const hoursUntilFlight = (flightDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  const refundRule = calculateRefund(hoursUntilFlight);

  await supabase
    .from('bookings')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
      cancelled_by: userId,
      cancellation_reason: reason,
    })
    .eq('id', bookingId);

  if (refundRule.refundPercentage > 0) {
    await supabase.functions.invoke('process-refund', {
      body: {
        bookingId,
        refundPercentage: refundRule.refundPercentage,
        reason,
      },
    });
  }

  if (refundRule.pilotCancellationFee > 0 && booking.pilot_id) {
    const cancellationFee = (booking.total_price * refundRule.pilotCancellationFee) / 100;
    
    await supabase.functions.invoke('pay-cancellation-fee', {
      body: {
        bookingId,
        pilotId: booking.pilot_id,
        amount: cancellationFee,
      },
    });
  }
}

export async function handleWeatherCancellation(bookingId: string): Promise<void> {
  const { data: booking, error } = await supabase
    .from('bookings')
    .select('customer_id, total_price')
    .eq('id', bookingId)
    .single();

  if (error) throw error;

  await supabase
    .from('bookings')
    .update({
      status: 'weather_cancelled',
      cancelled_at: new Date().toISOString(),
      cancellation_reason: 'Unsafe weather conditions',
    })
    .eq('id', bookingId);

  await supabase
    .from('payments')
    .update({ status: 'cancelled' })
    .eq('booking_id', bookingId);

  // Create credit for customer (stored in a credits table)
  await supabase
    .from('customer_credits')
    .insert({
      customer_id: booking.customer_id,
      amount: booking.total_price,
      reason: 'Weather cancellation credit',
      booking_id: bookingId,
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
    });
}

export async function handlePilotNoShow(bookingId: string): Promise<void> {
  const { data: booking, error } = await supabase
    .from('bookings')
    .select('customer_id, total_price')
    .eq('id', bookingId)
    .single();

  if (error) throw error;

  await supabase
    .from('bookings')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
      cancellation_reason: 'Pilot no-show',
    })
    .eq('id', bookingId);

  await supabase.functions.invoke('process-refund', {
    body: {
      bookingId,
      refundPercentage: 100,
      reason: 'Pilot no-show',
    },
  });

  await supabase
    .from('customer_credits')
    .insert({
      customer_id: booking.customer_id,
      amount: 100,
      reason: 'Pilot no-show compensation',
      booking_id: bookingId,
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    });
}
