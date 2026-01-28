import { prisma } from '../../db/prisma';
import {
  PaymentSuccessEvent,
  PaymentFailedEvent,
  BookingExpiredEvent,
} from './booking.types';

export async function handlePaymentSuccess(event: PaymentSuccessEvent) {
  const booking = await prisma.booking.findUnique({
    where: { id: event.bookingId },
  });

  if (!booking || booking.status !== 'INITIATED') return;

  await prisma.booking.update({
    where: { id: booking.id },
    data: {
      status: 'CONFIRMED',
      paymentStatus: 'SUCCESS',
      transactionId: event.transactionId,
      completedAt: new Date(),
    },
  });
}

export async function handlePaymentFailed(event: PaymentFailedEvent) {
  const booking = await prisma.booking.findUnique({
    where: { id: event.bookingId },
  });

  if (!booking || booking.status !== 'INITIATED') return;

  await prisma.booking.update({
    where: { id: booking.id },
    data: {
      status: 'PAYMENT_FAILED',
      paymentStatus: 'FAILED',
    },
  });
}

export async function handleBookingExpired(event: BookingExpiredEvent) {
  await prisma.booking.update({
    where: { id: event.bookingId },
    data: { status: 'EXPIRED' },
  });
}
