export interface BookingInitiatedEvent {
  bookingId: string;
  bookingRef: string;
  userId: string;
  tripId: string;
  seatIds: string[];
  holdToken: string;
  expiresAt: string;
}

export interface BookingConfirmedEvent {
  bookingId: string;
  tripId: string;
  seatIds: string[];
}

export interface BookingCancelledEvent {
  bookingId: string;
  reason: 'PAYMENT_FAILED' | 'EXPIRED' | 'USER_CANCELLED';
}
