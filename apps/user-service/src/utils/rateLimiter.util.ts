// import redis from '../config/redis.service';
// import { AppError } from '../errors/AppError';

// export type RateLimitOpts = {
//   phone: string;
//   ip: string;
//   deviceId?: string | null;
// };

// const DEFAULT_WINDOW = Number(process.env.OTP_RATE_WINDOW_SEC ?? 300);
// const DEFAULT_PHONE_LIMIT = Number(process.env.OTP_MAX_PER_WINDOW ?? 3);
// const DEFAULT_IP_LIMIT = Number(process.env.OTP_MAX_PER_WINDOW_IP ?? 10);
// const DEFAULT_DEVICE_LIMIT = Number(process.env.OTP_MAX_PER_WINDOW_DEVICE ?? 3);

// const incrAndCheck = async (key: string, limit: number, windowSec: number) => {
//   try {
//     const cnt = await redis.incr(key);
//     if (cnt === 1) {
//       await redis.expire(key, windowSec);
//     }
//     return Number(cnt) <= limit;
//   } catch (err) {
//     console.error('Redis error in incrAndCheck:', err);
//     return true;
//   }
// };

// export const rateLimitOtp = async ({ phone, ip, deviceId }: RateLimitOpts) => {
//   const windowSec = DEFAULT_WINDOW;

//   const phoneKey = `otp:req:phone:${phone}`;
//   const ipKey = `otp:req:ip:${ip}`;
//   const deviceKey = deviceId ? `otp:req:device:${deviceId}` : null;

//   const okPhone = await incrAndCheck(phoneKey, DEFAULT_PHONE_LIMIT, windowSec);
//   if (!okPhone)
//     throw new AppError(
//       'Too many OTP requests for this phone. Try again later.',
//       429
//     );

//   const okIp = await incrAndCheck(ipKey, DEFAULT_IP_LIMIT, windowSec);
//   if (!okIp)
//     throw new AppError(
//       'Too many OTP requests from this IP. Try again later.',
//       429
//     );

//   if (deviceKey) {
//     const okDevice = await incrAndCheck(
//       deviceKey,
//       DEFAULT_DEVICE_LIMIT,
//       windowSec
//     );
//     if (!okDevice)
//       throw new AppError(
//         'Too many OTP requests from this device. Try again later.',
//         429
//       );
//   }
// };
