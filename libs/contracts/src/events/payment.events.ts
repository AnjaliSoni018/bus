export interface PaymentInitiatedEvent {
  paymentId: string;
  bookingId: string;
  amount: number;
  currency: string;
}

export interface PaymentSuccessEvent {
  paymentId: string;
  bookingId: string;
  transactionId: string;
}

export interface PaymentFailedEvent {
  paymentId: string;
  bookingId: string;
  reason: string;
}
