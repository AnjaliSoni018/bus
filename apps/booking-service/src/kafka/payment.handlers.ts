import { prisma } from '../db/prisma';
import { BookingStatus, PaymentStatus } from '@prisma/client';

export async function handlePaymentSuccess(event: any) {
  const { bookingId, transactionId } = event;
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { bookedSeats: true },
  });

  if (!booking) {
    console.error('Booking not found for payment event', event);
    return;
  }

  // 🔐 IDMPOTENCY GUARANTEE
  if (booking.status !== BookingStatus.INITIATED) return;

  await prisma.$transaction(async (tx) => {
    await tx.booking.update({
      where: { id: booking.id },
      data: {
        status: BookingStatus.CONFIRMED,
        paymentStatus: PaymentStatus.SUCCESS,
        transactionId,
        bookedAt: new Date(),
      },
    });

    await tx.bookingSeat.updateMany({
      where: { bookingId: booking.id },
      data: {
        state: 'BOOKED',
        heldUntil: null,
      },
    });

    await tx.auditLog.create({
      data: {
        entity: 'BOOKING',
        entityId: booking.id,
        action: 'PAYMENT_SUCCESS',
        payload: event,
      },
    });
  });
}

export async function handlePaymentFailed(event: any) {
  const { bookingId } = event;

  await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: { bookingRef: bookingId },
    });

    if (!booking) return;
    if (booking.status !== BookingStatus.INITIATED) return;

    await tx.booking.update({
      where: { id: booking.id },
      data: {
        status: BookingStatus.PAYMENT_FAILED,
        paymentStatus: PaymentStatus.FAILED,
        expiresAt: null,
      },
    });

    await tx.bookingSeat.deleteMany({
      where: { bookingId: booking.id },
    });

    await tx.auditLog.create({
      data: {
        entity: 'BOOKING',
        entityId: booking.id,
        action: 'PAYMENT_FAILED',
        payload: event,
      },
    });
  });
}
