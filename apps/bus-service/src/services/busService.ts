// import prisma from '../config/prisma.service';
// import { v4 as uuidv4 } from 'uuid';

// const createBus = async (payload: any, operatorId: string) => {
//   if (!operatorId) throw new Error('operatorId required');
//   const bus = await prisma.bus.create({
//     data: {
//       id: uuidv4(),
//       operatorId,
//       name: payload.name,
//       registrationNumber: payload.registrationNumber,
//       busType: payload.busType,
//       totalSeats: payload.totalSeats,
//       seatLayout: payload.seatLayout,
//       amenities: payload.amenities || null,
//     },
//   });
//   return bus;
// };

// const getBus = async (id: string) => {
//   return prisma.bus.findUnique({ where: { id } });
// };

// const updateBus = async (id: string, payload: any, operatorId?: string) => {
//   const existing = await prisma.bus.findUnique({ where: { id } });
//   if (!existing) throw new Error('Bus not found');
//   if (operatorId && existing.operatorId !== operatorId)
//     throw new Error('Not authorized');
//   const updated = await prisma.bus.update({
//     where: { id },
//     data: {
//       name: payload.name ?? existing.name,
//       registrationNumber:
//         payload.registrationNumber ?? existing.registrationNumber,
//       busType: payload.busType ?? existing.busType,
//       totalSeats: payload.totalSeats ?? existing.totalSeats,
//       seatLayout: payload.seatLayout ?? existing.seatLayout,
//       amenities: payload.amenities ?? existing.amenities,
//     },
//   });
//   return updated;
// };

// const deactivateBus = async (id: string, operatorId?: string) => {
//   const existing = await prisma.bus.findUnique({ where: { id } });
//   if (!existing) throw new Error('Bus not found');
//   if (operatorId && existing.operatorId !== operatorId)
//     throw new Error('Not authorized');
//   await prisma.bus.update({ where: { id }, data: { isActive: false } });
//   return true;
// };

// const listByOperator = async (operatorId: string) => {
//   return prisma.bus.findMany({ where: { operatorId } });
// };

// export default {
//   createBus,
//   getBus,
//   updateBus,
//   deactivateBus,
//   listByOperator,
// };
