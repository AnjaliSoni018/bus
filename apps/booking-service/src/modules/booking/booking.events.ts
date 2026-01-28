import { bookingProducer } from '../../kafka/booking.producer';

const TOPIC = 'booking.created';

export async function emitBookingCreated(payload: {
  bookingId: string;
  bookingRef: string;
  userId: string;
  amount: number;
  currency: string;
}) {
  await bookingProducer.send({
    topic: TOPIC,
    messages: [
      {
        key: payload.bookingId, // 🔐 ordering per booking
        value: JSON.stringify({
          eventType: 'BOOKING_CREATED',
          ...payload,
          occurredAt: new Date().toISOString(),
        }),
      },
    ],
  });
}
