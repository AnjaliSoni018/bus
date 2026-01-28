import { paymentProducer } from '../../kafka/payment.producer';

export async function emitPaymentSuccess(payload: {
  bookingId: string;
  paymentId: string;
  transactionId: string;
}) {
  await paymentProducer.send({
    topic: 'payment.completed',
    messages: [
      {
        key: payload.bookingId, // ordering per booking
        value: JSON.stringify({
          ...payload,
          occurredAt: new Date().toISOString(),
        }),
      },
    ],
  });
}

export async function emitPaymentFailed(payload: {
  bookingId: string;
  paymentId: string;
  reason?: string;
}) {
  await paymentProducer.send({
    topic: 'payment.failed',
    messages: [
      {
        key: payload.bookingId,
        value: JSON.stringify({
          ...payload,
          occurredAt: new Date().toISOString(),
        }),
      },
    ],
  });
}
