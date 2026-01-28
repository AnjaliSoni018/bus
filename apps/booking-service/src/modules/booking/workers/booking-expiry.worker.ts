// import { prisma } from '../../../db/prisma';
// import { emitBookingExpired } from '../booking.events';

// export async function runBookingExpiryWorker() {
//   const expiredBookings = await prisma.booking.findMany({
//     where: {
//       status: 'INITIATED',
//       expiresAt: { lt: new Date() },
//     },
//   });

//   for (const booking of expiredBookings) {
//     await emitBookingExpired({
//       bookingId: booking.id,
//     });
//   }
// }
