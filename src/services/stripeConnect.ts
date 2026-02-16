import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export interface PaymentIntent {
  id: string;
  amount: number;
  status: string;
  client_secret: string;
}

export async function createBookingPayment(
  bookingId: string,
  amount: number
): Promise<PaymentIntent> {
  const { data, error } = await supabase.functions.invoke('create-payment-intent', {
    body: { bookingId, amount },
  });

  if (error) throw error;
  return data;
}

export async function releasePaymentToPilot(
  bookingId: string,
  pilotStripeAccountId: string
): Promise<void> {
  const booking = await supabase
    .from('bookings')
    .select('pilot_payout_95_percent, stripe_payment_intent_id')
    .eq('id', bookingId)
    .single();

  if (booking.error) throw booking.error;

  const { data, error } = await supabase.functions.invoke('release-payment', {
    body: {
      bookingId,
      pilotStripeAccountId,
      amount: booking.data.pilot_payout_95_percent,
      paymentIntentId: booking.data.stripe_payment_intent_id,
    },
  });

  if (error) throw error;

  await supabase
    .from('payments')
    .update({
      status: 'released',
      released_at: new Date().toISOString(),
      stripe_transfer_id: data.transfer_id,
    })
    .eq('booking_id', bookingId);
}

export async function processRefund(
  bookingId: string,
  refundPercentage: number,
  reason: string
): Promise<void> {
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('total_price, stripe_payment_intent_id')
    .eq('id', bookingId)
    .single();

  if (bookingError) throw bookingError;

  const refundAmount = (booking.total_price * refundPercentage) / 100;

  const { error } = await supabase.functions.invoke('process-refund', {
    body: {
      paymentIntentId: booking.stripe_payment_intent_id,
      amount: refundAmount,
      reason,
    },
  });

  if (error) throw error;

  await supabase
    .from('payments')
    .update({
      status: 'refunded',
      refunded_at: new Date().toISOString(),
      refund_reason: reason,
      refund_amount: refundAmount,
    })
    .eq('booking_id', bookingId);
}

export async function createConnectAccount(pilotId: string, email: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke('create-connect-account', {
    body: { pilotId, email },
  });

  if (error) throw error;
  return data.accountId;
}

export async function getConnectAccountLink(accountId: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke('create-connect-link', {
    body: { accountId },
  });

  if (error) throw error;
  return data.url;
}
