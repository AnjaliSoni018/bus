// import { BookingStatus } from '@prisma/client';

// type BookingEvent =
//   | 'PAYMENT_SUCCESS'
//   | 'PAYMENT_FAILED'
//   | 'EXPIRED'
//   | 'USER_CANCEL'
//   | 'TRIP_COMPLETED'
//   | 'REFUND_COMPLETED';

// const TRANSITIONS: Record<
//   BookingStatus,
//   Partial<Record<BookingEvent, BookingStatus>>
// > = {
//   INITIATED: {
//     PAYMENT_SUCCESS: BookingStatus.CONFIRMED,
//     PAYMENT_FAILED: BookingStatus.PAYMENT_FAILED,
//     EXPIRED: BookingStatus.CANCELLED,
//   },
//   CONFIRMED: {
//     USER_CANCEL: BookingStatus.CANCELLED,
//     TRIP_COMPLETED: BookingStatus.COMPLETED,
//   },
//   CANCELLED: {
//     REFUND_COMPLETED: BookingStatus.REFUNDED,
//   },
//   PAYMENT_FAILED: {},
//   COMPLETED: {},
//   REFUNDED: {},
// };

// export function getNextBookingState(
//   current: BookingStatus,
//   event: BookingEvent
// ): BookingStatus {
//   const next = TRANSITIONS[current]?.[event];

//   if (!next) {
//     throw new Error(`Invalid booking transition: ${current} -> (${event})`);
//   }

//   return next;
// }
