export type BookingStatus =
  | 'INITIATED'
  | 'CONFIRMED'
  | 'PAYMENT_FAILED'
  | 'EXPIRED'
  | 'CANCELLED';

export interface PaymentSuccessEvent {
  bookingId: string;
  transactionId: string;
  amount: number;
}

export interface PaymentFailedEvent {
  bookingId: string;
  reason: string;
}

export interface BookingExpiredEvent {
  bookingId: string;
}
