import redis from '../config/redis.service';
// import { AppError } from "../errors/AppError";

const MAX_FAILED = Number(process.env.MAX_FAILED_LOGIN ?? 5);
const WINDOW_SEC = Number(process.env.FAILED_LOGIN_WINDOW_SEC ?? 900);
const LOCK_MIN = Number(process.env.FAILED_LOGIN_LOCK_MIN ?? 15);

export const recordFailedLogin = async (email: string, ip: string) => {
  const emailKey = `auth:fail:email:${email}`;
  const ipKey = `auth:fail:ip:${ip}`;

  const r1 = await redis.incr(emailKey);
  if (r1 === 1) await redis.expire(emailKey, WINDOW_SEC);

  const r2 = await redis.incr(ipKey);
  if (r2 === 1) await redis.expire(ipKey, WINDOW_SEC);

  if (r1 >= MAX_FAILED) {
    await redis.set(`auth:lock:email:${email}`, '1', 'EX', LOCK_MIN * 60);
  }
  if (r2 >= MAX_FAILED * 2) {
    await redis.set(`auth:lock:ip:${ip}`, '1', 'EX', LOCK_MIN * 60);
  }
};

export const isLockedLogin = async (email: string, ip: string) => {
  const isEmailLocked = await redis.exists(`auth:lock:email:${email}`);
  const isIpLocked = await redis.exists(`auth:lock:ip:${ip}`);
  return Boolean(isEmailLocked || isIpLocked);
};

export const clearFailedLogin = async (email: string, ip: string) => {
  await redis.del(`auth:fail:email:${email}`);
  await redis.del(`auth:fail:ip:${ip}`);
  await redis.del(`auth:lock:email:${email}`);
  await redis.del(`auth:lock:ip:${ip}`);
};
