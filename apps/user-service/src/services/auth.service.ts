// import prisma from '../config/prisma.service';
// import { generateOtp, sendOTP } from '../utils/otp.utils';
// import { signJwt } from '../utils/jwt.util';
// import { AppError } from '../errors/AppError';
// import { errorMessages } from '../constants/errorMessages';
// import { SUCCESS_MESSAGES } from '../constants/SuccessMessages';

// export const sendOtp = async (phone: string) => {
//   if (!phone) throw new AppError(errorMessages.PHONE_REQUIRED, 400);

//   const normPhone = phone.trim();

//   const user = await prisma.user.findUnique({ where: { phone: normPhone } });

//   const otp = generateOtp(6);
//   const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

//   await prisma.verificationToken.create({
//     data: {
//       userId: user?.id,
//       phone: normPhone,
//       token: otp,
//       expiresAt,
//     },
//   });
//   const message = `Your OTP code is: ${otp}`;
//   try {
//     await sendOTP(normPhone, message);
//   } catch (error) {
//     console.error(errorMessages.TWILIO_ERROR, error);
//     throw new AppError(errorMessages.OTP_SEND_FAILED, 500);
//   }

//   return { exists: Boolean(user), message: SUCCESS_MESSAGES.OTP_SENT };
// };

// export const verifyOtp = async (
//   phone: string,
//   otp: string,
//   name?: string,
//   email?: string
// ) => {
//   if (!phone || !otp) throw new AppError(errorMessages.PHONE_OTP_REQUIRED, 400);
//   const normPhone = phone.trim();

//   const tokenRecord = await prisma.verificationToken.findFirst({
//     where: { phone: normPhone, token: otp },
//     orderBy: { createdAt: 'desc' },
//   });

//   if (!tokenRecord) throw new AppError(errorMessages.INVALID_OTP, 400);

//   if (tokenRecord.expiresAt < new Date()) {
//     await prisma.verificationToken.update({
//       where: { id: tokenRecord.id },
//       data: { attempts: { increment: 1 } },
//     });
//     throw new AppError(errorMessages.OTP_EXPIRED, 400);
//   }

//   let user = await prisma.user.findUnique({ where: { phone: normPhone } });

//   if (!user) {
//     if (!name || !email) {
//       throw new AppError(errorMessages.NAME_EMAIL_REQUIRED, 400);
//     }

//     user = await prisma.user.create({
//       data: {
//         phone: normPhone,
//         name,
//         email,
//         isVerified: true,
//         role: 'CUSTOMER',
//       },
//     });
//   } else {
//     user = await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         isVerified: true,
//         lastLogin: new Date(),
//       },
//     });
//   }

//   await prisma.verificationToken.deleteMany({ where: { phone: normPhone } });

//   const jwtPayload = { id: user.id, role: user.role, phone: user.phone };
//   const token = signJwt(jwtPayload);

//   await prisma.session.create({
//     data: {
//       userId: user.id,
//       token,
//       expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
//     },
//   });

//   return { token, user };
// };
// import prisma from '../config/prisma.service';
// import redis from '../config/redis.service';
// import { generateOtp, sendOTP } from '../utils/otp.utils';
// import { signJwt } from '../utils/jwt.util';
// import { AppError } from '../errors/AppError';
// import { rateLimitOtp } from '../utils/rateLimiter.util';
// import {
//   OTP_TTL_SECONDS,
//   OTP_MAX_ATTEMPTS,
//   OTP_LOCKOUT_MINUTES,
// } from '../config/constants';
// import { SUCCESS_MESSAGES } from '../constants/SuccessMessages';
// import { errorMessages } from '../constants/errorMessages';

// export const sendOtp = async (
//   phone: string,
//   ip: string,
//   deviceId?: string | null
// ) => {
//   if (!phone) throw new AppError(errorMessages.PHONE_REQUIRED, 400);
//   const normPhone = phone.trim();

//   await rateLimitOtp({ phone: normPhone, ip, deviceId });

//   const otp = generateOtp(6);
//   const expiresAt = new Date(Date.now() + OTP_TTL_SECONDS * 1000);

//   await prisma.verificationToken.create({
//     data: {
//       phone: normPhone,
//       token: otp,
//       expiresAt,
//       attempts: 0,
//     },
//   });

//   const redisOtpKey = `otp:val:phone:${normPhone}`;
//   try {
//     await redis.set(redisOtpKey, otp, { EX: OTP_TTL_SECONDS });
//   } catch (err) {
//     console.warn('Redis set failed for OTP (continuing, DB has record):', err);
//   }

//   const message = `Your verification code is ${otp}. It will expire in ${Math.floor(
//     OTP_TTL_SECONDS / 60
//   )} minutes.`;
//   try {
//     await sendOTP(normPhone, message);
//   } catch (err) {
//     console.error('SMS provider error:', err);
//     throw new AppError(errorMessages.OTP_SEND_FAILED, 500);
//   }

//   return {
//     exists: Boolean(
//       await prisma.user.findUnique({ where: { phone: normPhone } })
//     ),
//     message: SUCCESS_MESSAGES.OTP_SENT,
//   };
// };

// export const verifyOtp = async (
//   phone: string,
//   otp: string,
//   name?: string,
//   email?: string
// ) => {
//   if (!phone || !otp) throw new AppError(errorMessages.PHONE_OTP_REQUIRED, 400);
//   const normPhone = phone.trim();

//   const lockKey = `otp:lock:phone:${normPhone}`;
//   const isLocked = await redis.exists(lockKey);
//   if (isLocked) {
//     throw new AppError(
//       `Too many failed OTP attempts. Try again after ${OTP_LOCKOUT_MINUTES} minutes.`,
//       429
//     );
//   }

//   const redisOtpKey = `otp:val:phone:${normPhone}`;
//   let redisOtp: string | null = null;
//   try {
//     redisOtp = (await redis.get(redisOtpKey)) ?? null;
//   } catch (err) {
//     console.warn('Redis get failed: falling back to DB', err);
//   }

//   const tokenRecord = await prisma.verificationToken.findFirst({
//     where: { phone: normPhone },
//     orderBy: { createdAt: 'desc' },
//   });

//   if (!tokenRecord) {
//     throw new AppError(errorMessages.INVALID_OTP, 400);
//   }

//   if (tokenRecord.expiresAt < new Date()) {
//     await prisma.verificationToken.update({
//       where: { id: tokenRecord.id },
//       data: { attempts: { increment: 1 } },
//     });
//     throw new AppError(errorMessages.OTP_EXPIRED, 400);
//   }

//   if (redisOtp !== null) {
//     if (redisOtp !== otp) {
//       const attempts = tokenRecord.attempts + 1;
//       await prisma.verificationToken.update({
//         where: { id: tokenRecord.id },
//         data: { attempts },
//       });

//       if (attempts >= OTP_MAX_ATTEMPTS) {
//         await redis.set(lockKey, '1', { EX: OTP_LOCKOUT_MINUTES * 60 });
//         throw new AppError(
//           `Too many failed OTP attempts. Phone locked for ${OTP_LOCKOUT_MINUTES} minutes.`,
//           429
//         );
//       }

//       throw new AppError(errorMessages.INVALID_OTP, 400);
//     }
//   } else {
//     if (tokenRecord.token !== otp) {
//       const attempts = tokenRecord.attempts + 1;
//       await prisma.verificationToken.update({
//         where: { id: tokenRecord.id },
//         data: { attempts },
//       });

//       if (attempts >= OTP_MAX_ATTEMPTS) {
//         await redis.set(lockKey, '1', { EX: OTP_LOCKOUT_MINUTES * 60 });
//         throw new AppError(
//           `Too many failed OTP attempts. Phone locked for ${OTP_LOCKOUT_MINUTES} minutes.`,
//           429
//         );
//       }

//       throw new AppError(errorMessages.INVALID_OTP, 400);
//     }
//   }

//   let user = await prisma.user.findUnique({ where: { phone: normPhone } });

//   const jwtPayload = {};
//   const sessionExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

//   const result = await prisma.$transaction(async (tx) => {
//     if (!user) {
//       if (!name || !email)
//         throw new AppError(errorMessages.NAME_EMAIL_REQUIRED, 400);

//       user = await tx.user.create({
//         data: {
//           phone: normPhone,
//           name,
//           email,
//           isVerified: true,
//           role: 'CUSTOMER',
//         },
//       });
//     } else {
//       user = await tx.user.update({
//         where: { id: user.id },
//         data: { isVerified: true, lastLogin: new Date() },
//       });
//     }

//     await tx.verificationToken.deleteMany({ where: { phone: normPhone } });

//     const token = signJwt({ id: user.id, role: user.role, phone: user.phone });
//     await tx.session.create({
//       data: {
//         userId: user.id,
//         token,
//         expiresAt: sessionExpiresAt,
//       },
//     });

//     return { token, user };
//   });

//   try {
//     await redis.del(redisOtpKey);
//   } catch (err) {
//     console.warn('Redis DEL failed on OTP cleanup:', err);
//   }

//   return result;
// };
